import crypto from "crypto";
import { getCatalogEffect } from "@/lib/payments/catalog";
import { logger } from "@/lib/logger";

export type LemonEvent = {
  eventName: string;
  eventId: string;
  email: string;
  amount: number;
  currency: string;
  variantId: string;
  quantity: number;
};

export function verifyLemonSignature(rawBody: string, secret: string, signature: string | null) {
  if (!signature) {
    return false;
  }

  const digest = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
  if (digest.length !== signature.length) {
    return false;
  }

  return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signature));
}

export function parseLemonPayload(payload: any): LemonEvent {
  const attributes = payload?.data?.attributes ?? {};
  const custom = attributes.custom_data ?? {};
  const variantId = String(attributes.variant_id ?? "");
  const email = String(custom.user_email ?? attributes.user_email ?? attributes.email ?? "");
  const quantity = Number(attributes.first_order_item?.quantity ?? attributes.quantity ?? 1);

  if (!payload?.meta?.event_name || !payload?.data?.id || !email || !variantId) {
    throw new Error("Invalid Lemon Squeezy payload.");
  }

  return {
    eventName: String(payload.meta.event_name),
    eventId: String(payload.data.id),
    email,
    amount: Number(attributes.total ?? attributes.subtotal ?? 0),
    currency: String(attributes.currency ?? "USD"),
    variantId,
    quantity,
  };
}

export function resolveCatalogEffect(payload: LemonEvent) {
  const effect = getCatalogEffect(payload.variantId);

  if (!effect) {
    logger.error("Unknown Lemon Squeezy variant", payload);
    throw new Error("No catalog mapping found for Lemon Squeezy variant.");
  }

  // If the variant is for credits, the quantity is the number of credits
  if (payload.variantId === (process.env.LS_CREDIT_VARIANT_ID ?? "credits")) {
    return {
      ...effect,
      creditsAdded: payload.quantity,
    };
  }

  return effect;
}
