import { createBrowserClient } from "@supabase/ssr";
import { env } from "@/lib/config";
import { requireSupabaseClientEnv } from "@/lib/env-guards";

export function createClient() {
  requireSupabaseClientEnv();

  return createBrowserClient(
    env.NEXT_PUBLIC_SUPABASE_URL!,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
