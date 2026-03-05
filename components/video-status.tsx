"use client";

import { useEffect, useState } from "react";
import { type VideoJobRow } from "@/lib/types";

export function VideoStatus({ initialJob }: { initialJob: VideoJobRow }) {
  const [job, setJob] = useState(initialJob);

  useEffect(() => {
    if (job.status === "COMPLETED" || job.status === "FAILED") {
      return;
    }

    const interval = setInterval(async () => {
      const response = await fetch(`/api/jobs/${job.id}`, { cache: "no-store" });
      if (!response.ok) {
        return;
      }

      const nextJob = (await response.json()) as VideoJobRow;
      setJob(nextJob);
    }, 4000);

    return () => clearInterval(interval);
  }, [job.id, job.status]);

  return (
    <div className="space-y-5">
      <div className="glass-card p-5">
        <p className="text-xs uppercase tracking-[0.22em] text-black/55">Status</p>
        <p className="mt-3 text-3xl font-semibold">{job.status}</p>
        {job.error_message ? <p className="mt-3 text-sm text-red-600">{job.error_message}</p> : null}
      </div>

      {job.status === "COMPLETED" && job.video_url ? (
        <div className="space-y-4">
          <video
            className="w-full rounded-[24px] border border-black/10 bg-black"
            src={job.video_url}
            controls
          />
          <a
            href={job.video_url}
            download
            className="inline-flex rounded-full bg-black px-4 py-3 text-sm font-medium text-white"
          >
            Download video
          </a>
        </div>
      ) : (
        <div className="rounded-[24px] border border-dashed border-black/15 bg-white/60 px-5 py-8 text-sm text-black/60">
          Polling for job updates. The worker route will keep advancing queued and processing jobs.
        </div>
      )}
    </div>
  );
}
