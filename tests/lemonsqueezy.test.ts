import { describe, expect, it } from "vitest";
import { parseLemonPayload, resolveCatalogEffect, verifyLemonSignature } from "@/lib/payments/lemonsqueezy";

describe("lemon webhook helpers", () => {
  it("verifies payload signatures", () => {
    const body = JSON.stringify({ ok: true });
    const crypto = require("crypto");
    const signature = crypto.createHmac("sha256", "secret").update(body).digest("hex");

    expect(verifyLemonSignature(body, "secret", signature)).toBe(true);
    expect(verifyLemonSignature(body, "secret", "bad")).toBe(false);
  });

  it("parses webhook payloads", () => {
    const payload = parseLemonPayload({
      meta: { event_name: "order_created" },
      data: {
        id: "evt_1",
        attributes: {
          total: 1900,
          currency: "USD",
          variant_id: "starter",
          custom_data: {
            user_email: "test@example.com",
          },
        },
      },
    });

    expect(payload.email).toBe("test@example.com");
    expect(payload.variantId).toBe("starter");
  });

  it("resolves catalog mappings", () => {
    const effect = resolveCatalogEffect({
      eventName: "order_created",
      eventId: "evt_1",
      email: "test@example.com",
      amount: 1900,
      currency: "USD",
      variantId: "starter",
    });

    expect(effect.planTierAfter).toBe("STARTER");
    expect(effect.creditsAdded).toBe(120);
  });
});
