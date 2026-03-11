"use server";

import { revalidatePath } from "next/cache";
import { appConfig } from "@/lib/config";
import { buildJobInsert, incrementDemoUsage, reserveCreditsForQueuedJob } from "@/lib/jobs";
import { getProfileForCurrentUser } from "@/lib/queries";
import { createAdminClient } from "@/lib/supabase/admin";

type FormState = { error: string; success: string };

function asString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

export async function createVideoJobAction(_: FormState, formData: FormData): Promise<FormState> {
  try {
    const profile = await getProfileForCurrentUser();
    const prompt = asString(formData, "prompt");
    const durationSeconds = Number(asString(formData, "durationSeconds"));
    const aspectRatio = asString(formData, "aspectRatio");
    const style = asString(formData, "style");
    const resolution = asString(formData, "resolution");
    const qualityTier = asString(formData, "qualityTier");

    if (!prompt || prompt.length < 10) {
      throw new Error("Prompt must be at least 10 characters.");
    }

    if (!appConfig.aspectRatios.includes(aspectRatio as (typeof appConfig.aspectRatios)[number])) {
      throw new Error("Invalid aspect ratio.");
    }

    if (!appConfig.styles.includes(style as (typeof appConfig.styles)[number])) {
      throw new Error("Invalid style.");
    }

    if (!(resolution in appConfig.resolutionTiers)) {
      throw new Error("Invalid resolution tier.");
    }

    if (!(qualityTier in appConfig.qualityTiers)) {
      throw new Error("Invalid quality tier.");
    }

    const payload = buildJobInsert(profile, {
      prompt,
      durationSeconds,
      aspectRatio,
      style,
      resolution: resolution as keyof typeof appConfig.resolutionTiers,
      qualityTier: qualityTier as keyof typeof appConfig.qualityTiers,
    });
    const admin = createAdminClient();
    const { error } = await admin.from("video_jobs").insert(payload);

    if (error) {
      throw new Error(error.message);
    }

    await reserveCreditsForQueuedJob(profile.id, payload.credits_reserved, payload.is_demo);
    if (payload.is_demo) {
      await incrementDemoUsage(profile.id);
    }

    revalidatePath("/dashboard");
    return { error: "", success: "Video job queued." };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Could not queue job.", success: "" };
  }
}
