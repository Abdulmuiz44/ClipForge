import { describe, expect, it } from "vitest";
import { calculateCreditsCost, canUseDemo } from "@/lib/credits";
import { buildJobInsert } from "@/lib/jobs";
import { type ProfileRow } from "@/lib/types";

const baseProfile: ProfileRow = {
  id: "user-1",
  email: "test@example.com",
  credits_balance: 80,
  reserved_credits: 0,
  plan_tier: "FREE",
  has_paid_access: false,
  demo_generations_used: 0,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

describe("credit calculation", () => {
  it("charges base amount for short draft 16:9 hd jobs", () => {
    expect(calculateCreditsCost({ durationSeconds: 10, aspectRatio: "16:9", resolution: "hd", qualityTier: "draft" })).toBe(7);
  });

  it("increases cost for longer premium 1080p jobs", () => {
    expect(calculateCreditsCost({ durationSeconds: 30, aspectRatio: "16:9", resolution: "fullhd", qualityTier: "premium" })).toBe(21);
  });

  it("applies aspect-ratio multiplier for square videos", () => {
    expect(calculateCreditsCost({ durationSeconds: 21, aspectRatio: "1:1", resolution: "hd", qualityTier: "standard" })).toBe(13);
  });

  it("rejects invalid pricing inputs", () => {
    expect(() => calculateCreditsCost({ durationSeconds: 9, aspectRatio: "16:9", resolution: "hd", qualityTier: "standard" })).toThrow();
    expect(() => calculateCreditsCost({ durationSeconds: 10, aspectRatio: "4:3", resolution: "hd", qualityTier: "standard" })).toThrow();
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
      resolution: "hd",
      qualityTier: "standard",
    });

    expect(payload.is_demo).toBe(true);
    expect(payload.watermarked).toBe(true);
    expect(payload.credits_reserved).toBe(0);
    expect(payload.resolution).toBe("hd");
    expect(payload.quality_tier).toBe("standard");
  });

  it("reserves credits for paid users", () => {
    const payload = buildJobInsert(
      { ...baseProfile, has_paid_access: true, plan_tier: "STARTER" },
      {
        prompt: "A bright city bike cutting through rain at golden hour.",
        durationSeconds: 25,
        aspectRatio: "16:9",
        style: "cinematic",
        resolution: "fullhd",
        qualityTier: "premium",
      },
    );

    expect(payload.is_demo).toBe(false);
    expect(payload.credits_reserved).toBe(21);
  });
});
