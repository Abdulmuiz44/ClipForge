import { BuyButtons } from "@/components/buy-buttons";
import { CreditBadge } from "@/components/credit-badge";
import { JobForm } from "@/components/job-form";
import { JobsTable } from "@/components/jobs-table";
import { Reveal } from "@/components/reveal";
import { getProfileForCurrentUser, getRecentJobsForCurrentUser } from "@/lib/queries";

export const dynamic = "force-dynamic";

const sidebarTools = [
  "New clip",
  "My generations",
  "Reference files",
  "Templates",
  "Billing",
  "Support",
];

export default async function DashboardPage() {
  const [profile, jobs] = await Promise.all([
    getProfileForCurrentUser(),
    getRecentJobsForCurrentUser(),
  ]);

  return (
    <main className="mx-auto grid max-w-7xl gap-6 px-4 py-6 md:px-6 lg:grid-cols-[240px_1fr]">
      <aside className="rounded-3xl border bg-card/70 p-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Workspace</p>
        <nav className="space-y-2">
          {sidebarTools.map((tool, index) => (
            <button
              key={tool}
              className={`w-full rounded-xl px-3 py-2 text-left text-sm ${index === 0 ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
            >
              {tool}
            </button>
          ))}
        </nav>
        <div className="mt-4">
          <BuyButtons />
        </div>
      </aside>

      <section className="space-y-6">
        <Reveal className="rounded-3xl border bg-card p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">ClipForge Studio</p>
          <h1 className="mt-3 text-3xl font-bold md:text-4xl">What video should we create next?</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Type your idea, optionally upload a reference image, and press send. We&apos;ll generate your 10–30 second clip in the background and charge credits based on clip length.
          </p>

          <div className="mt-5">
            <CreditBadge
              credits={profile.credits_balance}
              trialCredits={profile.trial_credits_balance}
              trialExpiresAt={profile.trial_credits_expires_at}
            />
          </div>

          <div className="mt-6">
            <JobForm />
          </div>
        </Reveal>

        <Reveal delay={0.08} className="rounded-3xl border bg-card p-6">
          <h2 className="mb-4 text-xl font-semibold">Recent generations</h2>
          <JobsTable jobs={jobs} />
        </Reveal>
      </section>
    </main>
  );
}
