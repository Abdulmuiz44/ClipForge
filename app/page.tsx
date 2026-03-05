import Link from "next/link";
import { ArrowRight, Film, Sparkles, Wallet } from "@/components/icons";
import { appConfig, planCatalog } from "@/lib/config";

const highlights = [
  {
    title: "Prompt to clip",
    body: "Generate 10-30 second AI videos from a single prompt with style and aspect controls.",
    icon: Sparkles,
  },
  {
    title: "Credit rails",
    body: "Reserve credits when a render starts, finalize on success, refund on failure.",
    icon: Wallet,
  },
  {
    title: "Own the output",
    body: "Track every job, replay finished videos, and download the final asset from your library.",
    icon: Film,
  },
];

export default function Home() {
  return (
    <main className="pb-16">
      <section className="shell pt-8 md:pt-14">
        <div className="panel grid gap-10 overflow-hidden px-6 py-8 md:grid-cols-[1.2fr_0.8fr] md:px-10 md:py-12">
          <div className="space-y-6">
            <p className="inline-flex rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs uppercase tracking-[0.24em] text-black/60">
              Lean AI video MVP
            </p>
            <div className="space-y-4">
              <h1 className="max-w-3xl font-[var(--font-display)] text-5xl leading-none md:text-7xl">
                Create short AI videos from text. Bill with credits, not complexity.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-black/70 md:text-lg">
                {appConfig.appName} focuses on one job: take a prompt, render a short clip,
                charge the right credits, and keep the workflow legible.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/auth/signup"
                className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-medium text-white"
              >
                Start building
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-5 py-3 text-sm font-medium text-black"
              >
                View pricing
              </Link>
            </div>
          </div>
          <div className="glass-card grid gap-4 p-5">
            <div className="rounded-[20px] bg-black px-4 py-5 text-white">
              <p className="text-xs uppercase tracking-[0.24em] text-white/60">Example render</p>
              <p className="mt-3 text-xl font-medium">
                “A chrome koi fish orbiting a sunlit Lagos rooftop pool, cinematic”
              </p>
              <div className="mt-5 flex gap-2 text-xs text-white/70">
                <span className="rounded-full bg-white/10 px-3 py-1">20s</span>
                <span className="rounded-full bg-white/10 px-3 py-1">16:9</span>
                <span className="rounded-full bg-white/10 px-3 py-1">Cinematic</span>
              </div>
            </div>
            <div className="grid gap-3">
              {planCatalog.slice(0, 2).map((plan) => (
                <div
                  key={plan.name}
                  className="rounded-[20px] border border-black/10 bg-white/70 px-4 py-4"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">{plan.name}</p>
                    <p className="text-sm text-black/60">${plan.monthlyPrice}/mo</p>
                  </div>
                  <p className="mt-2 text-sm text-black/65">
                    {plan.creditsPerMonth} credits per month
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="shell mt-8 grid gap-4 md:grid-cols-3">
        {highlights.map(({ title, body, icon: Icon }) => (
          <div key={title} className="glass-card p-6">
            <Icon className="size-5 text-coral" />
            <h2 className="mt-4 text-xl font-semibold">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-black/65">{body}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
