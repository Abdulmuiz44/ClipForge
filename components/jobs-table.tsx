"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";
import { EmptyState } from "@/components/ui";
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

export function JobsTable({ jobs }: { jobs: VideoJobRow[] }) {
  if (!jobs.length) {
    return <EmptyState title="No videos yet" body="Your recent renders will populate this queue once you submit a job." />;
  }

  return (
    <div className="space-y-4">
      {jobs.map((job, index) => (
        <motion.div
          key={job.id}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: index * 0.05 }}
          className="soft-card flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between"
        >
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusTone(job.status)}`}>
                {job.status}
              </span>
              <span className="text-xs uppercase tracking-[0.22em] text-white/35">{job.cost_credits} credits</span>
            </div>
            <p className="mt-3 truncate text-base font-semibold text-white md:text-lg">{job.prompt}</p>
            <p className="mt-2 text-sm text-[#8fa3bd]">
              {job.duration_seconds}s | {job.aspect_ratio} | {job.style} | {formatDistanceToNow(new Date(job.created_at), { addSuffix: true })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link href={`/videos/${job.id}`} className="button-secondary">
              View details
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
