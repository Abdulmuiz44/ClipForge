import { BuyButtons } from "@/components/buy-buttons";
import { CreditBadge } from "@/components/credit-badge";
import { JobForm } from "@/components/job-form";
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

  return (
    <main className="app-frame space-y-8">
      <Reveal className="panel-strong px-6 py-8 md:px-8 md:py-10">
        <PageIntro
          eyebrow="Dashboard"
          title="Monitor video operations in a portal-grade control room."
          body="The dashboard mirrors the structure of the healthcare reference: dense summary blocks, a primary workspace, and clearly separated actions."
          actions={<BuyButtons />}
        />
      </Reveal>

      <section className="grid gap-4 xl:grid-cols-[1.35fr_0.65fr]">
        <div className="space-y-4">
          <Reveal className="grid gap-4 md:grid-cols-3">
            <StatCard label="Credits" value={String(profile.credits_balance)} hint="Ready for paid renders" />
            <StatCard label="Plan tier" value={profile.plan_tier} hint={profile.has_paid_access ? "Paid access active" : "Demo mode"} />
            <StatCard label="Demo usage" value={`${profile.demo_generations_used}/2`} hint="Watermarked generation count" />
          </Reveal>
          <Reveal delay={0.08}>
            <SectionCard title="Render queue" description="Your most recent jobs, organized for quick status scanning and follow-up.">
              <JobsTable jobs={jobs} />
            </SectionCard>
          </Reveal>
        </div>

        <div className="space-y-4">
          <Reveal delay={0.12}>
            <SectionCard title="New video job" description="Shape, duration, and style controls stay visible while you write the brief.">
              <div className="mb-5">
                <CreditBadge credits={profile.credits_balance} />
              </div>
              <JobForm />
            </SectionCard>
          </Reveal>
          <Reveal delay={0.16} className="soft-card p-5">
            <p className="text-xs uppercase tracking-[0.26em] text-[#7be0c3]">Ops notes</p>
            <div className="mt-4 space-y-3 text-sm leading-6 text-[#8fa3bd]">
              <p>Credits are reserved on queue creation and released automatically if the job fails.</p>
              <p>Demo renders remain available until you exhaust the free allowance.</p>
              <p>Lemon Squeezy purchases top up the same balance surfaced in this workspace.</p>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
