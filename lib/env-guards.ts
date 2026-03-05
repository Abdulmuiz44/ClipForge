import { env } from "@/lib/config";

export function requireSupabaseClientEnv() {
  if (!env.NEXT_PUBLIC_SUPABASE_URL || !env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error("Supabase public env vars are not configured.");
  }
}

export function requireSupabaseServiceKey() {
  if (!env.NEXT_PUBLIC_SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Supabase service role env vars are not configured.");
  }
}

export function requireReplicateEnv() {
  if (!env.REPLICATE_API_TOKEN || !env.REPLICATE_MODEL_VERSION) {
    throw new Error("Replicate env vars are not configured.");
  }
}
