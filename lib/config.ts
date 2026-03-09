import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
  NEXTAUTH_URL: z.string().url().optional(),
  NEXTAUTH_SECRET: z.string().optional(),
  AUTH_GOOGLE_ID: z.string().optional(),
  AUTH_GOOGLE_SECRET: z.string().optional(),
  REPLICATE_API_TOKEN: z.string().optional(),
  REPLICATE_MODEL_VERSION: z.string().optional(),
  LEMON_SQUEEZY_WEBHOOK_SECRET: z.string().optional(),
  LS_CREDIT_VARIANT_ID: z.string().optional(),
  NEXT_PUBLIC_LS_CREDIT_CHECKOUT_URL: z.string().url().optional(),
  CRON_SECRET: z.string().optional(),
});

const parsedEnv = envSchema.parse(process.env);

export const appConfig = {
  appName: "ClipForge",
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
  creditPrice: 0.1, // $0.10 per credit
} as const;

export const env = parsedEnv;
