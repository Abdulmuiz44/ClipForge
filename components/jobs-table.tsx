import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { EmptyState } from "@/components/ui";
import { type VideoJobRow } from "@/lib/types";

function statusTone(status: string) {
  switch (status) {
    case "COMPLETED":
      return "bg-moss/10 text-moss";
    case "FAILED":
      return "bg-red-500/10 text-red-600";
    case "PROCESSING":
      return "bg-teal/10 text-teal";
    default:
      return "bg-black/5 text-black/60";
  }
}

export function JobsTable({ jobs }: { jobs: VideoJobRow[] }) {
  if (!jobs.length) {
    return <EmptyState title="No videos yet" body="Your last 10 jobs will appear here." />;
  }

  return (
    <div className="overflow-hidden rounded-[24px] border border-black/10">
      <table className="w-full border-collapse text-left text-sm">
        <thead className="bg-black text-white">
          <tr>
            <th className="px-4 py-3 font-medium">Prompt</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Credits</th>
            <th className="px-4 py-3 font-medium">Created</th>
            <th className="px-4 py-3 font-medium">View</th>
          </tr>
        </thead>
        <tbody className="bg-white/75">
          {jobs.map((job) => (
            <tr key={job.id} className="border-t border-black/8">
              <td className="px-4 py-4">
                <p className="max-w-md truncate font-medium">{job.prompt}</p>
                <p className="mt-1 text-xs text-black/55">
                  {job.duration_seconds}s • {job.aspect_ratio} • {job.style}
                </p>
              </td>
              <td className="px-4 py-4">
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusTone(job.status)}`}>
                  {job.status}
                </span>
              </td>
              <td className="px-4 py-4">{job.cost_credits}</td>
              <td className="px-4 py-4 text-black/60">
                {formatDistanceToNow(new Date(job.created_at), { addSuffix: true })}
              </td>
              <td className="px-4 py-4">
                <Link href={`/videos/${job.id}`} className="font-medium underline underline-offset-4">
                  Open
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
