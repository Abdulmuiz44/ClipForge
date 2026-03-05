import { z } from "zod";
import { type PlanTier } from "@/lib/types";

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
  APP_URL: z.string().url().optional(),
  REPLICATE_API_TOKEN: z.string().optional(),
  REPLICATE_MODEL_VERSION: z.string().optional(),
  LEMON_SQUEEZY_WEBHOOK_SECRET: z.string().optional(),
  LS_STARTER_VARIANT_ID: z.string().optional(),
  LS_PRO_VARIANT_ID: z.string().optional(),
  LS_ENTERPRISE_VARIANT_ID: z.string().optional(),
  LS_CREDIT_PACK_100_VARIANT_ID: z.string().optional(),
  LS_CREDIT_PACK_500_VARIANT_ID: z.string().optional(),
  LS_CREDIT_PACK_2000_VARIANT_ID: z.string().optional(),
  NEXT_PUBLIC_LS_STARTER_CHECKOUT_URL: z.string().url().optional(),
  NEXT_PUBLIC_LS_PRO_CHECKOUT_URL: z.string().url().optional(),
  NEXT_PUBLIC_LS_ENTERPRISE_CHECKOUT_URL: z.string().url().optional(),
  NEXT_PUBLIC_LS_CREDIT_PACK_100_URL: z.string().url().optional(),
  NEXT_PUBLIC_LS_CREDIT_PACK_500_URL: z.string().url().optional(),
  NEXT_PUBLIC_LS_CREDIT_PACK_2000_URL: z.string().url().optional(),
  CRON_SECRET: z.string().optional(),
});

const parsedEnv = envSchema.parse(process.env);

export const appConfig = {
  appName: "PromptClips",
  demoGenerationLimit: 2,
  minimumDuration: 10,
  maximumDuration: 30,
  creditBands: [
    { min: 10, max: 20, credits: 5 },
    { min: 21, max: 30, credits: 8 },
  ],
  styles: ["cinematic", "product", "anime", "surreal"],
  aspectRatios: ["16:9", "9:16", "1:1"],
  providerName: "replicate",
} as const;

export type PlanCatalogEntry = {
  name: string;
  tier: PlanTier;
  monthlyPrice: number;
  creditsPerMonth: number;
  description: string;
  checkoutUrl: string;
};

export const planCatalog: PlanCatalogEntry[] = [
  {
    name: "Starter",
    tier: "STARTER",
    monthlyPrice: 19,
    creditsPerMonth: 120,
    description: "Launch with enough credits for weekly iteration.",
    checkoutUrl: parsedEnv.NEXT_PUBLIC_LS_STARTER_CHECKOUT_URL ?? "#",
  },
  {
    name: "Pro",
    tier: "PRO",
    monthlyPrice: 49,
    creditsPerMonth: 400,
    description: "For creators running a steady clip pipeline.",
    checkoutUrl: parsedEnv.NEXT_PUBLIC_LS_PRO_CHECKOUT_URL ?? "#",
  },
  {
    name: "Enterprise",
    tier: "ENTERPRISE",
    monthlyPrice: 199,
    creditsPerMonth: 2000,
    description: "High-volume teams with room for experimentation.",
    checkoutUrl: parsedEnv.NEXT_PUBLIC_LS_ENTERPRISE_CHECKOUT_URL ?? "#",
  },
];

export function getCheckoutLinks() {
  return [
    { label: "Buy 100 credits", url: parsedEnv.NEXT_PUBLIC_LS_CREDIT_PACK_100_URL ?? "#" },
    { label: "Buy 500 credits", url: parsedEnv.NEXT_PUBLIC_LS_CREDIT_PACK_500_URL ?? "#" },
    { label: "Upgrade plan", url: parsedEnv.NEXT_PUBLIC_LS_PRO_CHECKOUT_URL ?? "#" },
  ];
}

export const env = parsedEnv;
