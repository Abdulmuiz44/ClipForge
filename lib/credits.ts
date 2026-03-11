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

export function getActiveTrialCredits(profile: ProfileRow) {
  if (!profile.trial_credits_expires_at) {
    return 0;
  }

  return new Date(profile.trial_credits_expires_at).getTime() > Date.now()
    ? profile.trial_credits_balance
    : 0;
}

export function canCreateNonDemoJob(profile: ProfileRow) {
  return profile.has_paid_access || getActiveTrialCredits(profile) > 0;
}

export function canUseDemo(profile: ProfileRow) {
  return profile.demo_generations_used < appConfig.demoGenerationLimit;
}

export function hasEnoughCredits(profile: ProfileRow, creditsCost: number) {
  return profile.credits_balance + getActiveTrialCredits(profile) >= creditsCost;
}
