import { NextResponse } from "next/server";
import { env } from "@/lib/config";
import { processQueuedJobs } from "@/lib/jobs";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "");

  if (env.CRON_SECRET && token !== env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await processQueuedJobs();
  return NextResponse.json({ ok: true });
}
