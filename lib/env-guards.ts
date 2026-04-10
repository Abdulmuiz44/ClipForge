import { env } from "@/lib/config";
import { resolveAuthBaseUrl } from "@/lib/auth-config";

export function requireSupabaseClientEnv() {
  if (!env.NEXT_PUBLIC_SUPABASE_URL) {
    throw new Error("Supabase URL is not configured (NEXT_PUBLIC_SUPABASE_URL).");
  }
}

export function requireSupabaseServiceKey() {
  if (!env.NEXT_PUBLIC_SUPABASE_URL) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL while creating Supabase admin client.");
  }

  if (!env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY while creating Supabase admin client.");
  }
}

export function requireAuthBaseUrl() {
  const baseUrl = resolveAuthBaseUrl(env.NEXTAUTH_URL, env.APP_URL);
  if (!baseUrl) {
    throw new Error("Missing auth base URL. Set NEXTAUTH_URL (preferred) or APP_URL.");
  }
}

export function requireReplicateEnv() {
  if (!env.REPLICATE_API_TOKEN || !env.REPLICATE_MODEL_VERSION) {
    throw new Error("Replicate env vars are not configured.");
  }
}
