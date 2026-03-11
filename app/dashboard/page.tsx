import { BuyButtons } from "@/components/buy-buttons";
import { CreditBadge } from "@/components/credit-badge";
import { JobForm } from "@/components/job-form";
import { JobsLiveRefresh } from "@/components/jobs-live-refresh";
import { JobsTable } from "@/components/jobs-table";
import { Reveal } from "@/components/reveal";
import { PageIntro, SectionCard, StatCard } from "@/components/ui";
import { getProfileForCurrentUser, getRecentJobsForCurrentUser } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [profile, jobs] = await Promise.all([
    getProfileForCurrentUser(),
    getRecentJobsForCurrentUser(),
  ]);
  const hasActiveJobs = jobs.some((job) => job.status === "QUEUED" || job.status === "PROCESSING");

  return (
    <main className="mx-auto max-w-7xl space-y-8 px-4 py-8 md:px-6">
      <Reveal className="rounded-2xl border bg-card px-6 py-8 shadow-sm md:px-8 md:py-10">
        <PageIntro
          eyebrow="Clip studio"
          title="Create short AI videos from a single prompt."
          body="Write a prompt, set duration and format, and generate a 10 to 30 second clip for content, marketing, or storytelling."
          actions={<BuyButtons />}
        />
      </Reveal>

      <section className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <div className="space-y-6">
          <Reveal className="grid gap-4 md:grid-cols-3">
            <StatCard label="Credits" value={String(profile.credits_balance)} hint="Available to generate clips" />
            <StatCard label="Access" value={profile.has_paid_access ? "Credit unlocked" : "Demo"} hint={profile.has_paid_access ? "Pay-as-you-go generation" : "2 free watermarked clips"} />
            <StatCard label="Demo clips" value={`${profile.demo_generations_used}/2`} hint="Watermarked previews" />
          </Reveal>
          <Reveal delay={0.08}>
            <SectionCard title="Recent clip generations" description="Track render progress and open any clip to preview or download.">
              <JobsLiveRefresh hasActiveJobs={hasActiveJobs} />
              <JobsTable jobs={jobs} />
            </SectionCard>
          </Reveal>
        </div>

        <div className="space-y-6">
          <Reveal delay={0.12}>
            <SectionCard title="Generate a new clip" description="Start with a clear prompt, then set clip length, format, and style.">
              <div className="mb-5">
                <CreditBadge credits={profile.credits_balance} />
              </div>
              <JobForm />
            </SectionCard>
          </Reveal>
          <Reveal delay={0.16} className="rounded-xl border bg-muted/30 p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-primary">Before you generate</p>
            <div className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
              <p>ClipForge is designed for short 10–30 second outputs that are easy to repurpose across channels.</p>
              <p>Credits are reserved when you queue a job and automatically released if generation fails.</p>
              <p>Use vertical (9:16) for social, landscape (16:9) for ads and explainers, or square (1:1) for feeds.</p>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
