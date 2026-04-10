import { cache } from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { logger } from "@/lib/logger";
import { createAdminClient } from "@/lib/supabase/admin";
import { type ProfileRow, type VideoJobRow } from "@/lib/types";

function isMissingRowError(error: { code?: string } | null) {
  return error?.code === "PGRST116";
}

async function ensureProfileForUser(userId: string, email?: string | null) {
  const admin = createAdminClient();
  const { error } = await admin
    .from("profiles")
    .upsert({ id: userId, email: email ?? userId }, { onConflict: "id", ignoreDuplicates: true });

  if (error) {
    throw new Error(error.message);
  }
}

export const getCurrentUser = cache(async () => {
  try {
    const session = await getServerSession(authOptions);
    return session?.user ?? null;
  } catch {
    return null;
  }
});

export async function requireUser() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/signin");
  }

  return user;
}

export async function getProfileForCurrentUser() {
  const user = await requireUser();
  const admin = createAdminClient();

  const { data, error } = await admin
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single<ProfileRow>();

  if (error && !isMissingRowError(error)) {
    logger.error("Failed to fetch profile", { userId: user.id, error: error.message });
    redirect("/auth/error?error=ProfileFetch");
  }

  if (data) {
    return data;
  }

  try {
    await ensureProfileForUser(user.id, user.email);
  } catch (recoveryError) {
    logger.error("Failed to self-heal missing profile", {
      userId: user.id,
      error: recoveryError instanceof Error ? recoveryError.message : "Unknown error",
    });
    redirect("/auth/error?error=ProfileSync");
  }

  const { data: recoveredProfile, error: recoveredError } = await admin
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single<ProfileRow>();

  if (recoveredError || !recoveredProfile) {
    logger.error("Profile self-heal succeeded but fetch still failed", {
      userId: user.id,
      error: recoveredError?.message ?? "No profile row returned",
    });
    redirect("/auth/error?error=ProfileFetch");
  }

  return recoveredProfile;
}

export async function getRecentJobsForCurrentUser(limit = 10) {
  const user = await requireUser();
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("video_jobs")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(limit)
    .returns<VideoJobRow[]>();

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function getJobForCurrentUser(jobId: string) {
  const user = await requireUser();
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("video_jobs")
    .select("*")
    .eq("id", jobId)
    .eq("user_id", user.id)
    .single<VideoJobRow>();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
