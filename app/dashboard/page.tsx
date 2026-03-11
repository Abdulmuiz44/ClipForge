import { BuyButtons } from "@/components/buy-buttons";
import { CreditBadge } from "@/components/credit-badge";
import { JobForm } from "@/components/job-form";
import { JobsTable } from "@/components/jobs-table";
import { Reveal } from "@/components/reveal";
import { PageIntro, SectionCard } from "@/components/ui";
import { getProfileForCurrentUser, getRecentJobsForCurrentUser } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [profile, jobs] = await Promise.all([
    getProfileForCurrentUser(),
    getRecentJobsForCurrentUser(),
  ]);

  return (
    <main className="mx-auto max-w-7xl space-y-6 px-4 py-8 md:px-6">
      <Reveal className="rounded-2xl border bg-card px-6 py-8 shadow-sm md:px-8 md:py-10">
        <PageIntro
          eyebrow="Clip studio"
          title="Create short AI videos from a single prompt."
          body="Use the large prompt canvas below to describe your scene in detail, then generate and monitor progress in one place."
        />
      </Reveal>

      <section className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <Reveal className="rounded-2xl border bg-card p-4 lg:sticky lg:top-6 lg:h-fit">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Workspace</p>
          <h2 className="mt-2 text-lg font-semibold">Tools & actions</h2>
          <div className="mt-4 space-y-3">
            <BuyButtons />
          </div>
          <div className="mt-5 rounded-lg border border-border/70 bg-muted/40 p-3 text-xs text-muted-foreground">
            <p>{profile.has_paid_access ? "Credit mode enabled" : "Demo mode enabled"}</p>
            <p className="mt-1">Demo clips used: {profile.demo_generations_used}/2</p>
          </div>
        </Reveal>

        <div className="space-y-6">
          <Reveal delay={0.08}>
            <SectionCard title="Prompt composer" description="Use the large text area to write detailed prompts and generate polished clips faster.">
              <div className="mb-4 flex items-center justify-end">
                <CreditBadge credits={profile.credits_balance} />
              </div>
              <JobForm />
            </SectionCard>
          </Reveal>

          <Reveal delay={0.12}>
            <SectionCard
              title="Recent clip generations"
              description="Secondary view for tracking render status, previews, and downloads."
            >
              <JobsTable jobs={jobs} />
            </SectionCard>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
