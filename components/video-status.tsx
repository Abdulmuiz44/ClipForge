"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { type VideoJobRow } from "@/lib/types";

function statusTone(status: string) {
  switch (status) {
    case "COMPLETED":
      return "bg-[#7be0c3]/14 text-[#7be0c3]";
    case "FAILED":
      return "bg-[#ff8e9d]/12 text-[#ff8e9d]";
    case "PROCESSING":
      return "bg-[#82d2ff]/12 text-[#82d2ff]";
    default:
      return "bg-white/8 text-white/55";
  }
}

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
    <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="panel-strong p-5 md:p-6">
        {job.status === "COMPLETED" && job.video_url ? (
          <div className="space-y-4">
            <video className="w-full rounded-[24px] border border-white/10 bg-black" src={job.video_url} controls />
            <a href={job.video_url} download className="button-primary">
              Download video
            </a>
          </div>
        ) : (
          <div className="flex min-h-[360px] items-center justify-center rounded-[24px] border border-dashed border-white/12 bg-[#08111d]/60 px-6 text-center text-sm leading-6 text-[#8fa3bd]">
            Render output will appear here automatically. The worker keeps polling queued and processing jobs until they reach a terminal state.
          </div>
        )}
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="space-y-4">
        <div className="panel-strong p-5">
          <p className="text-xs uppercase tracking-[0.26em] text-white/35">Lifecycle</p>
          <div className="mt-4 flex items-center gap-3">
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusTone(job.status)}`}>{job.status}</span>
            <span className="text-xs uppercase tracking-[0.22em] text-white/35">{job.cost_credits} credits</span>
          </div>
          {job.error_message ? <p className="mt-4 text-sm text-[#ff8e9d]">{job.error_message}</p> : null}
        </div>
        <div className="soft-card p-5">
          <p className="text-sm font-medium text-white">Prompt details</p>
          <p className="mt-3 text-sm leading-6 text-[#8fa3bd]">{job.prompt}</p>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-white/72">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">Duration: {job.duration_seconds}s</div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">Ratio: {job.aspect_ratio}</div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">Style: {job.style}</div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">Provider: {job.provider_name}</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
