import { createClient } from "@supabase/supabase-js";
import { env } from "@/lib/config";
import { requireSupabaseServiceKey } from "@/lib/env-guards";

export function createAdminClient() {
  requireSupabaseServiceKey();
  return createClient(env.NEXT_PUBLIC_SUPABASE_URL!, env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
