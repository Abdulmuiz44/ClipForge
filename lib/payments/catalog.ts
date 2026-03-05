import { env } from "@/lib/config";
import { type PaymentType, type PlanTier } from "@/lib/types";

export type CatalogEffect = {
  variantId: string;
  creditsAdded: number;
  planTierAfter: PlanTier;
  type: PaymentType;
};

export const catalog: CatalogEffect[] = [
  {
    variantId: env.LS_CREDIT_PACK_100_VARIANT_ID ?? "pack_100",
    creditsAdded: 100,
    planTierAfter: "FREE",
    type: "ONE_TIME",
  },
  {
    variantId: env.LS_CREDIT_PACK_500_VARIANT_ID ?? "pack_500",
    creditsAdded: 500,
    planTierAfter: "FREE",
    type: "ONE_TIME",
  },
  {
    variantId: env.LS_CREDIT_PACK_2000_VARIANT_ID ?? "pack_2000",
    creditsAdded: 2000,
    planTierAfter: "FREE",
    type: "ONE_TIME",
  },
  {
    variantId: env.LS_STARTER_VARIANT_ID ?? "starter",
    creditsAdded: 120,
    planTierAfter: "STARTER",
    type: "SUBSCRIPTION",
  },
  {
    variantId: env.LS_PRO_VARIANT_ID ?? "pro",
    creditsAdded: 400,
    planTierAfter: "PRO",
    type: "SUBSCRIPTION",
  },
  {
    variantId: env.LS_ENTERPRISE_VARIANT_ID ?? "enterprise",
    creditsAdded: 2000,
    planTierAfter: "ENTERPRISE",
    type: "SUBSCRIPTION",
  },
];

export function getCatalogEffect(variantId: string) {
  return catalog.find((item) => item.variantId === variantId) ?? null;
}
