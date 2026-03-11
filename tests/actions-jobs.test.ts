import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  revalidatePath: vi.fn(),
  getProfileForCurrentUser: vi.fn(),
  buildJobInsert: vi.fn(),
  reserveCreditsForQueuedJob: vi.fn(),
  incrementDemoUsage: vi.fn(),
  triggerJobProcessingKick: vi.fn(),
  loggerWarn: vi.fn(),
  insert: vi.fn(),
}));

vi.mock("next/cache", () => ({ revalidatePath: mocks.revalidatePath }));
vi.mock("@/lib/queries", () => ({ getProfileForCurrentUser: mocks.getProfileForCurrentUser }));
vi.mock("@/lib/logger", () => ({ logger: { warn: mocks.loggerWarn } }));
vi.mock("@/lib/jobs", () => ({
  buildJobInsert: mocks.buildJobInsert,
  reserveCreditsForQueuedJob: mocks.reserveCreditsForQueuedJob,
  incrementDemoUsage: mocks.incrementDemoUsage,
  triggerJobProcessingKick: mocks.triggerJobProcessingKick,
}));
vi.mock("@/lib/supabase/admin", () => ({
  createAdminClient: () => ({
    from: () => ({ insert: mocks.insert }),
  }),
}));

import { createVideoJobAction } from "@/lib/actions/jobs";

describe("createVideoJobAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.getProfileForCurrentUser.mockResolvedValue({ id: "user-1" });
    mocks.buildJobInsert.mockReturnValue({
      user_id: "user-1",
      prompt: "A valid prompt for test",
      duration_seconds: 10,
      aspect_ratio: "16:9",
      style: "cinematic",
      credits_reserved: 5,
      is_demo: false,
    });
    mocks.insert.mockResolvedValue({ error: null });
    mocks.reserveCreditsForQueuedJob.mockResolvedValue(undefined);
    mocks.incrementDemoUsage.mockResolvedValue(undefined);
    mocks.triggerJobProcessingKick.mockImplementation(() => undefined);
  });

  it("creates a job and triggers immediate processing kick", async () => {
    const formData = new FormData();
    formData.set("prompt", "A valid prompt for test");
    formData.set("durationSeconds", "10");
    formData.set("aspectRatio", "16:9");
    formData.set("style", "cinematic");

    const result = await createVideoJobAction({ error: "", success: "" }, formData);

    expect(mocks.insert).toHaveBeenCalledOnce();
    expect(mocks.triggerJobProcessingKick).toHaveBeenCalledOnce();
    expect(result).toEqual({ error: "", success: "Video job queued." });
    expect(mocks.revalidatePath).toHaveBeenCalledWith("/dashboard");
  });

  it("keeps job queued for cron fallback when immediate trigger fails", async () => {
    mocks.triggerJobProcessingKick.mockImplementation(() => {
      throw new Error("kick failure");
    });

    const formData = new FormData();
    formData.set("prompt", "A valid prompt for test");
    formData.set("durationSeconds", "10");
    formData.set("aspectRatio", "16:9");
    formData.set("style", "cinematic");

    const result = await createVideoJobAction({ error: "", success: "" }, formData);

    expect(mocks.insert).toHaveBeenCalledOnce();
    expect(result).toEqual({ error: "", success: "Video job queued." });
    expect(mocks.loggerWarn).toHaveBeenCalledOnce();
  });
});
