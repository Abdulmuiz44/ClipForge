import { BuyButtons } from "@/components/buy-buttons";
import { CreditBadge } from "@/components/credit-badge";
import { JobForm } from "@/components/job-form";
import { JobsTable } from "@/components/jobs-table";
import { PageIntro, SectionCard, StatCard } from "@/components/ui";
import { getProfileForCurrentUser, getRecentJobsForCurrentUser } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [profile, jobs] = await Promise.all([
    getProfileForCurrentUser(),
    getRecentJobsForCurrentUser(),
  ]);

  return (
    <main className="shell space-y-8 pb-16 pt-10">
      <PageIntro
        eyebrow="Dashboard"
        title="Control credits, queue clips, and monitor job output."
        body="PromptClips keeps the rendering path narrow: write the prompt, choose the clip shape, and let the worker finish the lifecycle."
        actions={<BuyButtons />}
      />
      <section className="grid gap-4 md:grid-cols-3">
        <StatCard label="Credits" value={String(profile.credits_balance)} hint="Available for paid renders" />
        <StatCard label="Plan" value={profile.plan_tier} hint={profile.has_paid_access ? "Paid access active" : "Demo only"} />
        <StatCard label="Demo usage" value={`${profile.demo_generations_used}/2`} hint="Watermarked demo renders" />
      </section>
      <SectionCard title="Create video" description="10-30 seconds, one render job per submission.">
        <div className="mb-4">
          <CreditBadge credits={profile.credits_balance} />
        </div>
        <JobForm />
      </SectionCard>
      <SectionCard title="My videos" description="Latest 10 jobs across queued, processing, completed, and failed states.">
        <JobsTable jobs={jobs} />
      </SectionCard>
    </main>
  );
}
