import { afterEach, describe, expect, it, vi } from "vitest";

afterEach(() => {
  vi.resetModules();
  vi.restoreAllMocks();
});

describe("profile recovery", () => {
  it("self-heals missing profile rows for authenticated users", async () => {
    const single = vi
      .fn()
      .mockResolvedValueOnce({ data: null, error: { code: "PGRST116", message: "not found" } })
      .mockResolvedValueOnce({
        data: {
          id: "user@example.com",
          email: "user@example.com",
          credits_balance: 0,
          reserved_credits: 0,
          trial_credits_granted: 100,
          trial_credits_expires_at: null,
          trial_credits_consumed: 0,
          plan_tier: "FREE",
          has_paid_access: false,
          demo_generations_used: 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        error: null,
      });

    const upsert = vi.fn().mockResolvedValue({ error: null });
    const eq = vi.fn().mockReturnThis();
    const select = vi.fn().mockReturnValue({ eq, single });

    vi.doMock("react", () => ({
      cache: (fn: unknown) => fn,
    }));

    vi.doMock("next-auth", () => ({
      getServerSession: vi.fn().mockResolvedValue({ user: { id: "user@example.com", email: "user@example.com" } }),
    }));

    vi.doMock("next/navigation", () => ({
      redirect: vi.fn((url: string) => {
        throw new Error(`redirect:${url}`);
      }),
    }));

    vi.doMock("@/lib/supabase/admin", () => ({
      createAdminClient: () => ({
        from: () => ({ select, upsert }),
      }),
    }));

    vi.doMock("@/lib/logger", () => ({ logger: { error: vi.fn(), warn: vi.fn(), info: vi.fn() } }));

    const { getProfileForCurrentUser } = await import("@/lib/queries");
    const profile = await getProfileForCurrentUser();

    expect(upsert).toHaveBeenCalledOnce();
    expect(profile.id).toBe("user@example.com");
  });
});
