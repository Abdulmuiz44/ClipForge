"use server";

import { revalidatePath } from "next/cache";
import { appConfig } from "@/lib/config";
import {
  buildJobInsert,
  incrementDemoUsage,
  refundReservedCreditsForAbortedJob,
  reserveCreditsForQueuedJob,
} from "@/lib/jobs";
import { getProfileForCurrentUser } from "@/lib/queries";
import { createAdminClient } from "@/lib/supabase/admin";

type FormState = { error: string; success: string };

function asString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

async function parseReferenceImage(formData: FormData) {
  const image = formData.get("referenceImage");
  if (!(image instanceof File) || image.size === 0) {
    return { dataUrl: "", fileName: "" };
  }

  if (!image.type.startsWith("image/")) {
    throw new Error("Reference file must be an image.");
  }

  if (image.size > 2 * 1024 * 1024) {
    throw new Error("Reference image must be 2MB or smaller.");
  }

  const bytes = Buffer.from(await image.arrayBuffer()).toString("base64");
  return {
    dataUrl: `data:${image.type};base64,${bytes}`,
    fileName: image.name,
  };
}

export async function createVideoJobAction(_: FormState, formData: FormData): Promise<FormState> {
  let reservedPaid = 0;
  let reservedTrial = 0;
  let reservedForUserId = "";

  try {
    const profile = await getProfileForCurrentUser();
    const prompt = asString(formData, "prompt");
    const durationSeconds = Number(asString(formData, "durationSeconds"));
    const aspectRatio = asString(formData, "aspectRatio");
    const style = asString(formData, "style");
    const { dataUrl, fileName } = await parseReferenceImage(formData);

    if (!prompt || prompt.length < 10) {
      throw new Error("Prompt must be at least 10 characters.");
    }

    if (!appConfig.aspectRatios.includes(aspectRatio as (typeof appConfig.aspectRatios)[number])) {
      throw new Error("Invalid aspect ratio.");
    }

    if (!appConfig.styles.includes(style as (typeof appConfig.styles)[number])) {
      throw new Error("Invalid style.");
    }

    const payload = buildJobInsert(profile, {
      prompt,
      durationSeconds,
      aspectRatio,
      style,
      referenceImageDataUrl: dataUrl,
      referenceImageName: fileName,
    });

    const reservation = await reserveCreditsForQueuedJob(profile.id, payload.credits_reserved, payload.is_demo);
    reservedPaid = reservation.reservedPaid;
    reservedTrial = reservation.reservedTrial;
    reservedForUserId = profile.id;

    const admin = createAdminClient();
    const { error } = await admin.from("video_jobs").insert({
      ...payload,
      credits_reserved_paid: reservation.reservedPaid,
      credits_reserved_trial: reservation.reservedTrial,
    });

    if (error) {
      throw new Error(error.message);
    }

    if (payload.is_demo) {
      await incrementDemoUsage(profile.id);
    }

    revalidatePath("/dashboard");
    return { error: "", success: "Video generation started." };
  } catch (error) {
    if (reservedForUserId && (reservedPaid > 0 || reservedTrial > 0)) {
      try {
        await refundReservedCreditsForAbortedJob(reservedForUserId, reservedPaid, reservedTrial);
      } catch {
        // Intentionally swallowed to preserve original error returned to UI.
      }
    }

    return { error: error instanceof Error ? error.message : "Could not queue job.", success: "" };
  }
}
