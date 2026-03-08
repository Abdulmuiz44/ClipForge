import Link from "next/link";
import { ArrowRight, Film, Sparkles, Wallet } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { appConfig } from "@/lib/config";

const insights = [
  { label: "Average render window", value: "14m", note: "Queue to delivery", icon: Sparkles },
  { label: "Credit efficiency", value: "94%", note: "Recovered on failed jobs", icon: Wallet },
  { label: "Clip ownership", value: "100%", note: "Download every completed file", icon: Film },
];

export default function Home() {
  return (
    <main className="app-frame space-y-8">
      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal className="panel-strong overflow-hidden px-6 py-8 md:px-8 md:py-10">
          <div className="max-w-4xl space-y-6">
            <p className="inline-flex rounded-full border border-[#7be0c3]/20 bg-[#7be0c3]/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-[#7be0c3]">
              Inspired by high-trust product dashboards
            </p>
            <div className="space-y-4">
              <h1 className="max-w-4xl font-[var(--font-display)] text-5xl leading-none text-white md:text-7xl">
                Direct AI video generation in a calm, operational workspace.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-[#8fa3bd] md:text-lg">
                {appConfig.appName} turns text prompts into short production-ready clips, with credits, billing, and job visibility built into one portal.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/auth/signup" className="button-primary gap-2">
                Start with Google
                <ArrowRight className="size-4" />
              </Link>
              <Link href="/pricing" className="button-secondary">
                View plans
              </Link>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="grid gap-4">
          <div className="panel-strong p-6">
            <p className="text-xs uppercase tracking-[0.26em] text-[#7be0c3]">Today render preview</p>
            <div className="mt-4 rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(123,224,195,0.14),rgba(130,210,255,0.05))] p-5">
              <p className="text-2xl font-semibold text-white">Chrome koi fish crossing a rooftop infinity pool.</p>
              <p className="mt-3 text-sm leading-6 text-[#8fa3bd]">
                The UI takes cues from modern patient portals: composure, trust, information density, and soft contrast. The product layer stays creator-focused.
              </p>
              <div className="mt-5 flex flex-wrap gap-2 text-xs uppercase tracking-[0.22em] text-white/60">
                <span className="rounded-full border border-white/10 px-3 py-1">20 seconds</span>
                <span className="rounded-full border border-white/10 px-3 py-1">16:9</span>
                <span className="rounded-full border border-white/10 px-3 py-1">cinematic</span>
              </div>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {insights.map(({ label, value, note, icon: Icon }, index) => (
              <Reveal key={label} delay={0.12 + index * 0.05} className="metric-card p-5">
                <Icon className="size-5 text-[#7be0c3]" />
                <p className="mt-4 text-xs uppercase tracking-[0.22em] text-white/45">{label}</p>
                <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
                <p className="mt-2 text-sm text-[#8fa3bd]">{note}</p>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="grid gap-4 lg:grid-cols-[0.7fr_1.3fr]">
        <Reveal className="panel-strong p-6">
          <p className="text-xs uppercase tracking-[0.28em] text-[#7be0c3]">How it works</p>
          <div className="mt-5 space-y-4 text-sm leading-6 text-[#8fa3bd]">
            <div className="soft-card p-4">
              <p className="font-semibold text-white">1. Write the scene</p>
              <p className="mt-2">Describe movement, framing, subject, lighting, and the aesthetic direction.</p>
            </div>
            <div className="soft-card p-4">
              <p className="font-semibold text-white">2. Queue the render</p>
              <p className="mt-2">ClipForge prices by duration, reserves credits, and keeps a visible audit trail.</p>
            </div>
            <div className="soft-card p-4">
              <p className="font-semibold text-white">3. Review and download</p>
              <p className="mt-2">Completed jobs stay in your portal with playback, status history, and download access.</p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.08} className="grid gap-4 md:grid-cols-3">
          <div className="metric-card p-6 md:col-span-1">
            <p className="text-sm font-medium text-white">Control panel feel</p>
            <p className="mt-3 text-sm leading-6 text-[#8fa3bd]">The redesign borrows the portal cadence of high-trust dashboards while preserving a fast creator workflow.</p>
          </div>
          <div className="metric-card p-6 md:col-span-1">
            <p className="text-sm font-medium text-white">Responsive motion</p>
            <p className="mt-3 text-sm leading-6 text-[#8fa3bd]">Cards reveal on scroll, primary actions lift on hover, and dense sections avoid visual stiffness.</p>
          </div>
          <div className="metric-card p-6 md:col-span-1">
            <p className="text-sm font-medium text-white">Billing clarity</p>
            <p className="mt-3 text-sm leading-6 text-[#8fa3bd]">Plans, packs, and credit usage remain visible across landing, pricing, and dashboard views.</p>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
