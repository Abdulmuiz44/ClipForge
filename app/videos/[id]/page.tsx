import { notFound } from "next/navigation";
import { PageIntro } from "@/components/ui";
import { VideoStatus } from "@/components/video-status";
import { Reveal } from "@/components/reveal";
import { getJobForCurrentUser } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function VideoDetailPage({ params }: { params: { id: string } }) {
  try {
    const job = await getJobForCurrentUser(params.id);

    return (
      <main className="mx-auto max-w-7xl space-y-8 px-4 py-8 md:px-6">
        <Reveal className="rounded-2xl border bg-card px-6 py-8 shadow-sm md:px-8 md:py-10">
          <PageIntro
            eyebrow="Clip output"
            title="Preview, track, and export your generated video"
            body={job.prompt}
          />
        </Reveal>
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <VideoStatus initialJob={job} />
        </div>
      </main>
    );
  } catch {
    notFound();
  }
}
