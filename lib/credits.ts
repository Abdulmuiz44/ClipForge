import { appConfig } from "@/lib/config";
import { type ProfileRow } from "@/lib/types";

export type ResolutionTier = keyof typeof appConfig.resolutionTiers;
export type QualityTier = keyof typeof appConfig.qualityTiers;

export function calculateCreditsCost(params: {
  durationSeconds: number;
  aspectRatio: string;
  resolution: ResolutionTier;
  qualityTier: QualityTier;
}): number {
  const durationBand = appConfig.baseCreditsByDuration.find(
    (item) => params.durationSeconds >= item.min && params.durationSeconds <= item.max,
  );

  if (!durationBand) {
    throw new Error("Duration must be between 10 and 30 seconds.");
  }

  const aspectMultiplier = appConfig.aspectRatioMultipliers[params.aspectRatio as keyof typeof appConfig.aspectRatioMultipliers];
  if (!aspectMultiplier) {
    throw new Error("Invalid aspect ratio for pricing.");
  }

  const resolution = appConfig.resolutionTiers[params.resolution];
  if (!resolution) {
    throw new Error("Invalid resolution tier.");
  }

  const quality = appConfig.qualityTiers[params.qualityTier];
  if (!quality) {
    throw new Error("Invalid quality tier.");
  }

  return Math.ceil(durationBand.credits * aspectMultiplier * resolution.multiplier * quality.multiplier);
}

export function canCreateNonDemoJob(profile: ProfileRow) {
  return profile.has_paid_access;
}

export function canUseDemo(profile: ProfileRow) {
  return profile.demo_generations_used < appConfig.demoGenerationLimit;
}

export function hasEnoughCredits(profile: ProfileRow, creditsCost: number) {
  return profile.credits_balance >= creditsCost;
}
