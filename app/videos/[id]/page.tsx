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
      <main className="app-frame space-y-8">
        <Reveal className="panel-strong px-6 py-8 md:px-8 md:py-10">
          <PageIntro
            eyebrow="Video detail"
            title="Playback, lifecycle, and output diagnostics in one screen."
            body={job.prompt}
          />
        </Reveal>
        <VideoStatus initialJob={job} />
      </main>
    );
  } catch {
    notFound();
  }
}
