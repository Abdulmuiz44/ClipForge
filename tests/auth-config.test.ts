import { describe, expect, it } from "vitest";
import { isGoogleAuthConfiguredFromEnv, resolveAuthBaseUrl } from "@/lib/auth-config";

describe("auth config helpers", () => {
  it("uses NEXTAUTH_URL first and APP_URL as fallback", () => {
    expect(resolveAuthBaseUrl("https://clip-forge.netlify.app", "https://fallback.example.com")).toBe("https://clip-forge.netlify.app");
    expect(resolveAuthBaseUrl("", "https://clip-forge.netlify.app")).toBe("https://clip-forge.netlify.app");
    expect(resolveAuthBaseUrl(undefined, undefined)).toBeNull();
  });

  it("only enables Google provider when both credentials exist", () => {
    expect(isGoogleAuthConfiguredFromEnv("id", "secret")).toBe(true);
    expect(isGoogleAuthConfiguredFromEnv("id", "")).toBe(false);
    expect(isGoogleAuthConfiguredFromEnv(undefined, "secret")).toBe(false);
  });
});
