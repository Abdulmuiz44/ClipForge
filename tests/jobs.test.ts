import { describe, expect, it } from "vitest";
import { buildProviderPrompt } from "@/lib/jobs";

describe("job helpers", () => {
  it("adds a watermark instruction for demo jobs", () => {
    expect(buildProviderPrompt("prompt", true)).toContain("PromptClips watermark");
  });

  it("leaves paid prompts unchanged", () => {
    expect(buildProviderPrompt("prompt", false)).toBe("prompt");
  });
});
