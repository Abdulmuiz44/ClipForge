import { createClient } from "@supabase/supabase-js";
import { env } from "@/lib/config";
import { requireSupabaseServiceKey } from "@/lib/env-guards";
import { logger } from "@/lib/logger";

export function createAdminClient() {
  try {
    requireSupabaseServiceKey();

    return createClient(env.NEXT_PUBLIC_SUPABASE_URL!, env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
  } catch (error) {
    logger.error("Failed to initialize Supabase admin client", {
      hasSupabaseUrl: Boolean(env.NEXT_PUBLIC_SUPABASE_URL),
      hasServiceRoleKey: Boolean(env.SUPABASE_SERVICE_ROLE_KEY),
      error: error instanceof Error ? error.message : "Unknown error",
    });
    throw error;
  }
}
