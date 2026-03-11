import { addMinutes } from "date-fns";
import { appConfig } from "@/lib/config";
import { canCreateNonDemoJob, canUseDemo, calculateCreditsCost, hasEnoughCredits, type QualityTier, type ResolutionTier } from "@/lib/credits";
import { logger } from "@/lib/logger";
import { createAdminClient } from "@/lib/supabase/admin";
import { createVideoJob, getVideoJobStatus } from "@/lib/videoProvider";
import { type ProfileRow, type VideoJobRow } from "@/lib/types";

export function buildProviderPrompt(prompt: string, isDemo: boolean) {
  if (!isDemo) {
    return prompt;
  }

  return `${prompt}. Add a subtle but visible ClipForge watermark overlay in a corner.`;
}

export function buildJobInsert(profile: ProfileRow, params: {
  prompt: string;
  durationSeconds: number;
  aspectRatio: string;
  style: string;
  resolution: ResolutionTier;
  qualityTier: QualityTier;
}) {
  const cost = calculateCreditsCost({
    durationSeconds: params.durationSeconds,
    aspectRatio: params.aspectRatio,
    resolution: params.resolution,
    qualityTier: params.qualityTier,
  });
  const isPaid = canCreateNonDemoJob(profile);
  const isDemo = !isPaid;

  if (isDemo && !canUseDemo(profile)) {
    throw new Error("Free demo limit reached. Buy credits or upgrade to continue.");
  }

  if (!isDemo && !hasEnoughCredits(profile, cost)) {
    throw new Error("Insufficient credits for this render.");
  }

  return {
    user_id: profile.id,
    prompt: buildProviderPrompt(params.prompt, isDemo),
    duration_seconds: params.durationSeconds,
    aspect_ratio: params.aspectRatio,
    style: params.style,
    resolution: params.resolution,
    quality_tier: params.qualityTier,
    status: "QUEUED",
    cost_credits: cost,
    credits_reserved: isDemo ? 0 : cost,
    is_demo: isDemo,
    watermarked: isDemo,
    provider_name: appConfig.providerName,
  };
}

export async function reserveCreditsForQueuedJob(profileId: string, credits: number, isDemo: boolean) {
  if (isDemo || credits <= 0) {
    return;
  }

  const admin = createAdminClient();
  const { error } = await admin.rpc("reserve_credits_for_profile", {
    p_profile_id: profileId,
    p_credits: credits,
  });

  if (error) {
    throw new Error(error.message);
  }
}

export async function incrementDemoUsage(profileId: string) {
  const admin = createAdminClient();
  const { error } = await admin.rpc("increment_demo_usage", { p_profile_id: profileId });
  if (error) {
    throw new Error(error.message);
  }
}

export async function processQueuedJobs(batchSize = 5) {
  const admin = createAdminClient();
  const now = new Date().toISOString();
  const { data: jobs, error } = await admin
    .from("video_jobs")
    .select("*")
    .or(`status.eq.QUEUED,and(status.eq.PROCESSING,next_retry_at.lte.${now})`)
    .order("created_at", { ascending: true })
    .limit(batchSize)
    .returns<VideoJobRow[]>();

  if (error) {
    throw new Error(error.message);
  }

  for (const job of jobs ?? []) {
    try {
      if (!job.provider_job_id) {
        const created = await createVideoJob({
          prompt: job.prompt,
          durationSeconds: job.duration_seconds,
          aspectRatio: job.aspect_ratio,
          style: job.style,
          resolution: job.resolution,
          qualityTier: job.quality_tier,
        });

        await admin
          .from("video_jobs")
          .update({
            status: "PROCESSING",
            provider_job_id: created.providerJobId,
            attempts: job.attempts + 1,
            last_polled_at: now,
          })
          .eq("id", job.id);

        continue;
      }

      const providerStatus = await getVideoJobStatus(job.provider_job_id);

      if (providerStatus.status === "completed") {
        await admin.rpc("complete_video_job", {
          p_job_id: job.id,
          p_video_url: providerStatus.videoUrl ?? "",
        });
        continue;
      }

      if (providerStatus.status === "failed") {
        await admin.rpc("fail_video_job", {
          p_job_id: job.id,
          p_error_message: providerStatus.error ?? "Video generation failed.",
        });
        continue;
      }

      const nextRetry = addMinutes(new Date(), Math.min(2 * (job.attempts + 1), 10));
      await admin
        .from("video_jobs")
        .update({
          status: "PROCESSING",
          attempts: job.attempts + 1,
          last_polled_at: now,
          next_retry_at: nextRetry.toISOString(),
        })
        .eq("id", job.id);
    } catch (error) {
      logger.error("Job processing failed", { jobId: job.id, error });
      await admin.rpc("mark_job_retry", {
        p_job_id: job.id,
        p_error_message: error instanceof Error ? error.message : "Unknown processing error.",
      });
    }
  }
}
