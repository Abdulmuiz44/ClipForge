import { addDays, subDays } from "date-fns";
import { describe, expect, it } from "vitest";
import {
  calculateCreditsCost,
  canUseDemo,
  getSpendableCredits,
  getTrialCreditsRemaining,
  hasEnoughCredits,
} from "@/lib/credits";
import { buildJobInsert } from "@/lib/jobs";
import { type ProfileRow } from "@/lib/types";

const baseProfile: ProfileRow = {
  id: "user-1",
  email: "test@example.com",
  credits_balance: 20,
  reserved_credits: 0,
  trial_credits_granted: 100,
  trial_credits_consumed: 0,
  trial_credits_expires_at: addDays(new Date(), 7).toISOString(),
  plan_tier: "FREE",
  has_paid_access: false,
  demo_generations_used: 0,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

describe("credit calculation", () => {
  it("charges 5 credits for 10 to 20 seconds", () => {
    expect(calculateCreditsCost(10)).toBe(5);
    expect(calculateCreditsCost(20)).toBe(5);
  });

  it("charges 8 credits for 21 to 30 seconds", () => {
    expect(calculateCreditsCost(21)).toBe(8);
    expect(calculateCreditsCost(30)).toBe(8);
  });

  it("rejects invalid duration", () => {
    expect(() => calculateCreditsCost(9)).toThrow();
    expect(() => calculateCreditsCost(31)).toThrow();
  });
});

describe("trial credit availability", () => {
  it("fresh signup has 100 usable credits", () => {
    const signupProfile: ProfileRow = {
      ...baseProfile,
      credits_balance: 100,
      has_paid_access: true,
      trial_credits_consumed: 0,
      trial_credits_expires_at: addDays(new Date(), 7).toISOString(),
    };

    expect(getTrialCreditsRemaining(signupProfile)).toBe(100);
    expect(getSpendableCredits(signupProfile)).toBe(100);
    expect(hasEnoughCredits(signupProfile, 100)).toBe(true);
  });

  it("credits become unusable after expiry", () => {
    const expiredProfile: ProfileRow = {
      ...baseProfile,
      credits_balance: 100,
      has_paid_access: true,
      trial_credits_consumed: 0,
      trial_credits_expires_at: subDays(new Date(), 1).toISOString(),
    };

    expect(getTrialCreditsRemaining(expiredProfile)).toBe(0);
    expect(getSpendableCredits(expiredProfile)).toBe(0);
    expect(hasEnoughCredits(expiredProfile, 1)).toBe(false);
  });

  it("non-expired users can still spend normally", () => {
    const activeProfile: ProfileRow = {
      ...baseProfile,
      credits_balance: 80,
      has_paid_access: true,
      trial_credits_consumed: 20,
      trial_credits_expires_at: addDays(new Date(), 2).toISOString(),
    };

    expect(getTrialCreditsRemaining(activeProfile)).toBe(80);
    expect(getSpendableCredits(activeProfile)).toBe(80);
    expect(hasEnoughCredits(activeProfile, 8)).toBe(true);

    const payload = buildJobInsert(activeProfile, {
      prompt: "A bright city bike cutting through rain at golden hour.",
      durationSeconds: 25,
      aspectRatio: "16:9",
      style: "cinematic",
    });

    expect(payload.is_demo).toBe(false);
    expect(payload.credits_reserved).toBe(8);
  });
});

describe("demo access", () => {
  it("allows demo usage below the cap", () => {
    expect(canUseDemo(baseProfile)).toBe(true);
    expect(canUseDemo({ ...baseProfile, demo_generations_used: 2 })).toBe(false);
  });

  it("creates demo jobs for unpaid users", () => {
    const payload = buildJobInsert(baseProfile, {
      prompt: "A bright city bike cutting through rain at golden hour.",
      durationSeconds: 10,
      aspectRatio: "16:9",
      style: "cinematic",
    });

    expect(payload.is_demo).toBe(true);
    expect(payload.watermarked).toBe(true);
    expect(payload.credits_reserved).toBe(0);
  });

  it("reserves credits for paid users", () => {
    const payload = buildJobInsert(
      { ...baseProfile, has_paid_access: true, plan_tier: "STARTER" },
      {
        prompt: "A bright city bike cutting through rain at golden hour.",
        durationSeconds: 25,
        aspectRatio: "16:9",
        style: "cinematic",
      },
    );

    expect(payload.is_demo).toBe(false);
    expect(payload.credits_reserved).toBe(8);
  });
});
