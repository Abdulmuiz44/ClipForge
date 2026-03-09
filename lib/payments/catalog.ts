import { env } from "@/lib/config";
import { type PaymentType, type PlanTier } from "@/lib/types";

export type CatalogEffect = {
  variantId: string;
  creditsAdded: number;
  planTierAfter: PlanTier;
  type: PaymentType;
};

// Now we use a dynamic or single variant for credits
export const catalog: CatalogEffect[] = [
  {
    variantId: env.LS_CREDIT_VARIANT_ID ?? "credits",
    creditsAdded: 0, // This will be dynamic
    planTierAfter: "FREE",
    type: "ONE_TIME",
  },
];

export function getCatalogEffect(variantId: string) {
  return catalog.find((item) => item.variantId === variantId) ?? null;
}
