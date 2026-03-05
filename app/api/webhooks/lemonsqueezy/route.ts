import { NextResponse } from "next/server";
import { env } from "@/lib/config";
import { logger } from "@/lib/logger";
import { parseLemonPayload, resolveCatalogEffect, verifyLemonSignature } from "@/lib/payments/lemonsqueezy";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const rawBody = await request.text();

  if (!env.LEMON_SQUEEZY_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Webhook secret missing" }, { status: 500 });
  }

  const signature = request.headers.get("x-signature");
  const verified = verifyLemonSignature(rawBody, env.LEMON_SQUEEZY_WEBHOOK_SECRET, signature);

  if (!verified) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  try {
    const payload = JSON.parse(rawBody);
    const event = parseLemonPayload(payload);
    const effect = resolveCatalogEffect(event);
    const admin = createAdminClient();

    const { data: existingPayment } = await admin
      .from("payments")
      .select("id")
      .eq("lemonsqueezy_event_id", event.eventId)
      .maybeSingle();

    if (existingPayment) {
      return NextResponse.json({ ok: true, duplicate: true });
    }

    const userLookup = await admin.auth.admin.listUsers();
    const matched = userLookup.data.users.find((user) => user.email === event.email);

    if (!matched) {
      throw new Error(`No user found for ${event.email}`);
    }

    const { error } = await admin.rpc("apply_payment_event", {
      p_user_id: matched.id,
      p_lemonsqueezy_event_id: event.eventId,
      p_payment_type: effect.type,
      p_amount: event.amount,
      p_currency: event.currency,
      p_credits_added: effect.creditsAdded,
      p_plan_tier_after: effect.planTierAfter,
      p_raw_payload: payload,
    });

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    logger.error("Lemon webhook failed", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 400 });
  }
}
