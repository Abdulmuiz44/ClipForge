import { NextResponse } from "next/server";
import { getJobForCurrentUser } from "@/lib/queries";

export const dynamic = "force-dynamic";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const job = await getJobForCurrentUser(params.id);
    return NextResponse.json(job);
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
