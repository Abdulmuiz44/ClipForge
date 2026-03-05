import { notFound } from "next/navigation";
import { PageIntro } from "@/components/ui";
import { VideoStatus } from "@/components/video-status";
import { getJobForCurrentUser } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function VideoDetailPage({ params }: { params: { id: string } }) {
  try {
    const job = await getJobForCurrentUser(params.id);

    return (
      <main className="shell space-y-8 pb-16 pt-10">
        <PageIntro
          eyebrow="Video detail"
          title="Render lifecycle and final asset"
          body={job.prompt}
        />
        <VideoStatus initialJob={job} />
      </main>
    );
  } catch {
    notFound();
  }
}
