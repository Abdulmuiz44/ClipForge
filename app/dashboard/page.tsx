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
    <main className="mx-auto max-w-7xl px-4 py-8 md:px-6 space-y-8">
      <Reveal className="rounded-2xl border bg-card px-6 py-8 md:px-8 md:py-10 shadow-sm">
        <PageIntro
          eyebrow="Control Center"
          title="Monitor video operations in your AI portal."
          body="Your central workspace for generating clips, tracking renders, and managing your credit balance."
          actions={<BuyButtons />}
        />
      </Reveal>

      <section className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <div className="space-y-6">
          <Reveal className="grid gap-4 md:grid-cols-3">
            <StatCard label="Credits" value={String(profile.credits_balance)} hint="Available balance" />
            <StatCard label="Status" value={profile.has_paid_access ? "Pro" : "Free"} hint={profile.has_paid_access ? "Paid access active" : "Demo mode"} />
            <StatCard label="Demo usage" value={`${profile.demo_generations_used}/2`} hint="Watermarked renders" />
          </Reveal>
          <Reveal delay={0.08}>
            <SectionCard title="Render queue" description="Your most recent jobs, organized for quick status scanning.">
              <JobsTable jobs={jobs} />
            </SectionCard>
          </Reveal>
        </div>

        <div className="space-y-6">
          <Reveal delay={0.12}>
            <SectionCard title="New video job" description="Shape, duration, and style controls for your next render.">
              <div className="mb-5">
                <CreditBadge credits={profile.credits_balance} />
              </div>
              <JobForm />
            </SectionCard>
          </Reveal>
          <Reveal delay={0.16} className="rounded-xl border bg-muted/30 p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-primary">Ops notes</p>
            <div className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
              <p>Credits are reserved on queue creation and released automatically if the job fails.</p>
              <p>Demo renders remain available until you exhaust the free allowance.</p>
              <p>Payments top up the same balance surfaced in this workspace.</p>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
