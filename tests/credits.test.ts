import { describe, expect, it } from "vitest";
import { calculateCreditsCost, canUseDemo } from "@/lib/credits";
import { buildJobInsert } from "@/lib/jobs";
import { type ProfileRow } from "@/lib/types";

const baseProfile: ProfileRow = {
  id: "user-1",
  email: "test@example.com",
  credits_balance: 20,
  reserved_credits: 0,
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
