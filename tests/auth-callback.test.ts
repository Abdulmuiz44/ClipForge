import { afterEach, describe, expect, it, vi } from "vitest";

afterEach(() => {
  vi.resetModules();
  vi.restoreAllMocks();
  delete process.env.NEXTAUTH_URL;
  delete process.env.APP_URL;
  delete process.env.NEXTAUTH_SECRET;
  delete process.env.AUTH_GOOGLE_ID;
  delete process.env.AUTH_GOOGLE_SECRET;
});

describe("auth callback", () => {
  it("redirects to friendly error when profile sync fails", async () => {
    process.env.NEXTAUTH_URL = "https://clip-forge.netlify.app";
    process.env.NEXTAUTH_SECRET = "test-secret";
    process.env.AUTH_GOOGLE_ID = "google-id";
    process.env.AUTH_GOOGLE_SECRET = "google-secret";

    const upsert = vi.fn().mockResolvedValue({ error: { message: "db down" } });

    vi.doMock("@/lib/supabase/admin", () => ({
      createAdminClient: () => ({
        from: () => ({ upsert }),
      }),
    }));

    const loggerError = vi.fn();
    vi.doMock("@/lib/logger", () => ({ logger: { error: loggerError, warn: vi.fn(), info: vi.fn() } }));

    const { authOptions } = await import("@/lib/auth");
    const result = await authOptions.callbacks!.signIn!({
      user: { email: "user@example.com" },
      account: { provider: "google" },
      profile: undefined,
      email: undefined,
      credentials: undefined,
    } as never);

    expect(result).toBe("/auth/error?error=ProfileSync");
    expect(loggerError).toHaveBeenCalledOnce();
  });
});
