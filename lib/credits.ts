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

export function getTrialCreditsRemaining(profile: ProfileRow, now = new Date()): number {
  if (!profile.trial_credits_expires_at) {
    return Math.max(profile.trial_credits_granted - profile.trial_credits_consumed, 0);
  }

  if (new Date(profile.trial_credits_expires_at) <= now) {
    return 0;
  }

  return Math.max(profile.trial_credits_granted - profile.trial_credits_consumed, 0);
}

export function getSpendableCredits(profile: ProfileRow, now = new Date()): number {
  const trialRemaining = getTrialCreditsRemaining(profile, now);
  const expiredTrial =
    profile.trial_credits_expires_at &&
    new Date(profile.trial_credits_expires_at) <= now
      ? Math.max(profile.trial_credits_granted - profile.trial_credits_consumed, 0)
      : 0;

  return Math.max(profile.credits_balance - expiredTrial, 0);
}

export function hasEnoughCredits(profile: ProfileRow, creditsCost: number, now = new Date()) {
  return getSpendableCredits(profile, now) >= creditsCost;
}
