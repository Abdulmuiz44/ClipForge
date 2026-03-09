"use client";

import { useState } from "react";
import { Reveal } from "@/components/reveal";
import { SectionCard } from "@/components/ui";
import { appConfig, env } from "@/lib/config";
import { formatCurrency } from "@/lib/utils";
import { PlanCard } from "@/components/plan-card";

export default function PricingPage() {
  const [credits, setCredits] = useState(100);
  const price = credits * appConfig.creditPrice;

  const handleCheckout = (amount?: number) => {
    const finalCredits = amount ?? credits;
    const baseUrl = env.NEXT_PUBLIC_LS_CREDIT_CHECKOUT_URL;
    if (!baseUrl || baseUrl === "#") {
      alert("Checkout URL not configured");
      return;
    }
    const checkoutUrl = new URL(baseUrl);
    checkoutUrl.searchParams.set("quantity", finalCredits.toString());
    window.location.href = checkoutUrl.toString();
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 md:py-24">
      <Reveal className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold md:text-6xl tracking-tight">Simple, credit-based pricing.</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          No subscriptions. No hidden fees. Pay only for what you use. Buy credits as you need them.
        </p>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-3 mb-16">
        {[100, 500, 2000].map((amount, i) => (
          <Reveal key={amount} delay={0.1 * i}>
            <PlanCard credits={amount} onClick={() => handleCheckout(amount)} />
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.3}>
        <SectionCard title="Custom Amount" description="Choose exactly how many credits you want to purchase.">
          <div className="space-y-8 py-4">
            <div className="space-y-4">
              <div className="flex justify-between text-sm font-medium">
                <span>Amount: {credits} credits</span>
                <span>{formatCurrency(price)}</span>
              </div>
              <input
                type="range"
                min="10"
                max="5000"
                step="10"
                value={credits}
                onChange={(e) => setCredits(parseInt(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-secondary accent-primary"
              />
            </div>

            <div className="rounded-xl bg-muted/50 p-6 text-center">
              <p className="mb-2 text-sm text-muted-foreground">Total Price</p>
              <p className="mb-6 text-5xl font-extrabold">{formatCurrency(price)}</p>
              <button
                onClick={() => handleCheckout()}
                className="button-primary w-full max-w-xs py-4 text-lg"
              >
                Buy {credits} credits
              </button>
            </div>

            <p className="text-center text-xs text-muted-foreground">
              Payments are securely processed by Lemon Squeezy. Credits never expire.
            </p>
          </div>
        </SectionCard>
      </Reveal>
    </main>
  );
}
