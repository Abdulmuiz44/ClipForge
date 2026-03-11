import { env } from "@/lib/config";
import { requireReplicateEnv } from "@/lib/env-guards";

export async function createVideoJob({
  prompt,
  durationSeconds,
  aspectRatio,
  style,
  referenceImageDataUrl,
}: {
  prompt: string;
  durationSeconds: number;
  aspectRatio: string;
  style: string;
  referenceImageDataUrl?: string;
}): Promise<{ providerJobId: string }> {
  requireReplicateEnv();

  const response = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      Authorization: `Token ${env.REPLICATE_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      version: env.REPLICATE_MODEL_VERSION,
      input: {
        prompt,
        duration: durationSeconds,
        aspect_ratio: aspectRatio,
        style,
        ...(referenceImageDataUrl ? { reference_image: referenceImageDataUrl } : {}),
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Replicate create job failed with ${response.status}.`);
  }

  const payload = await response.json();
  return { providerJobId: payload.id as string };
}

export async function getVideoJobStatus(providerJobId: string): Promise<{
  status: "processing" | "completed" | "failed";
  videoUrl?: string;
  error?: string;
}> {
  requireReplicateEnv();

  const response = await fetch(`https://api.replicate.com/v1/predictions/${providerJobId}`, {
    headers: {
      Authorization: `Token ${env.REPLICATE_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Replicate status fetch failed with ${response.status}.`);
  }

  const payload = await response.json();
  const status = payload.status as string;

  if (status === "failed" || status === "canceled") {
    return { status: "failed", error: payload.error as string };
  }

  if (status === "succeeded") {
    const output = Array.isArray(payload.output) ? payload.output[0] : payload.output;
    return { status: "completed", videoUrl: output as string };
  }

  return { status: "processing" };
}
