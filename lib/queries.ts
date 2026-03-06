import { cache } from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { type ProfileRow, type VideoJobRow } from "@/lib/types";

export const getCurrentUser = cache(async () => {
  const session = await getServerSession(authOptions);
  return session?.user ?? null;
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

  if (error) {
    throw new Error(error.message);
  }

  return data;
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
