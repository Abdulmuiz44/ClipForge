import { appConfig } from "@/lib/config";
import { type ProfileRow } from "@/lib/types";

export function calculateCreditsCost(durationSeconds: number): number {
  const band = appConfig.creditBands.find(
    (item) => durationSeconds >= item.min && durationSeconds <= item.max,
  );

  if (!band) {
    throw new Error("Duration must be between 10 and 30 seconds.");
  }

  return band.credits;
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
