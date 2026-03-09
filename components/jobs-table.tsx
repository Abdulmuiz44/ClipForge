"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";
import { EmptyState } from "@/components/ui";
import { type VideoJobRow } from "@/lib/types";
import { cn } from "@/lib/utils";

function statusTone(status: string) {
  switch (status) {
    case "COMPLETED":
      return "bg-primary/10 text-primary border-primary/20";
    case "FAILED":
      return "bg-destructive/10 text-destructive border-destructive/20";
    case "PROCESSING":
      return "bg-accent/10 text-accent border-accent/20";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
}

export function JobsTable({ jobs }: { jobs: VideoJobRow[] }) {
  if (!jobs.length) {
    return <EmptyState title="No videos yet" body="Your recent renders will populate this queue once you submit a job." />;
  }

  return (
    <div className="space-y-3">
      {jobs.map((job, index) => (
        <motion.div
          key={job.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: index * 0.05 }}
          className="group relative rounded-xl border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-md md:p-5"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="min-w-0 flex-1 space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <span className={cn("rounded-full border px-2.5 py-0.5 text-xs font-bold", statusTone(job.status))}>
                  {job.status}
                </span>
                <span className="text-xs font-medium text-muted-foreground/60">{job.cost_credits} credits</span>
              </div>
              <p className="truncate text-base font-bold text-foreground md:text-lg">{job.prompt}</p>
              <p className="text-xs font-medium text-muted-foreground">
                {job.duration_seconds}s • {job.aspect_ratio} • {job.style} • {formatDistanceToNow(new Date(job.created_at), { addSuffix: true })}
              </p>
            </div>
            <div className="flex items-center">
              <Link href={`/videos/${job.id}`} className="button-secondary w-full md:w-auto">
                View details
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
