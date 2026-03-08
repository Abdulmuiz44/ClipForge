import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Film, Sparkles, Wallet } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { appConfig } from "@/lib/config";

const insights = [
  { label: "Prompt to video", value: "Fast", note: "Short clips in a simple workflow", icon: Sparkles },
  { label: "Credit billing", value: "Clear", note: "Know the cost before you generate", icon: Wallet },
  { label: "Export ready", value: "HD", note: "Download completed clips anytime", icon: Film },
];

export const metadata: Metadata = {
  title: "AI Video Generator",
  description:
    "Create AI videos from a text prompt with simple pricing, fast generation, and a clean dashboard.",
};

export default function Home() {
  return (
    <main className="app-frame space-y-8">
      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal className="panel-strong overflow-hidden px-6 py-8 md:px-8 md:py-10">
          <div className="max-w-4xl space-y-6">
            <p className="inline-flex rounded-full border border-[#7be0c3]/20 bg-[#7be0c3]/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-[#7be0c3]">
              Simple AI video generation
            </p>
            <div className="space-y-4">
              <h1 className="max-w-4xl font-[var(--font-display)] text-5xl leading-none text-white md:text-7xl">
                Turn text into short AI videos in minutes.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-[#8fa3bd] md:text-lg">
                {appConfig.appName} helps you create 10 to 30 second AI video clips from a simple prompt. Write an idea, choose a style, and generate.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/auth/signup" className="button-primary gap-2">
                Create your first video
                <ArrowRight className="size-4" />
              </Link>
              <Link href="/pricing" className="button-secondary">
                See pricing
              </Link>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="grid gap-4">
          <div className="panel-strong p-6">
            <p className="text-xs uppercase tracking-[0.26em] text-[#7be0c3]">Example video prompt</p>
            <div className="mt-4 rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(123,224,195,0.14),rgba(130,210,255,0.05))] p-5">
              <p className="text-2xl font-semibold text-white">A chrome koi fish crossing a rooftop infinity pool at sunset.</p>
              <p className="mt-3 text-sm leading-6 text-[#8fa3bd]">
                The product is built to stay simple. You enter a prompt, generate a short clip, and track the result from one dashboard.
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
              <p className="font-semibold text-white">1. Enter a prompt</p>
              <p className="mt-2">Describe the video you want to create in plain language.</p>
            </div>
            <div className="soft-card p-4">
              <p className="font-semibold text-white">2. Generate the clip</p>
              <p className="mt-2">Pick a duration, ratio, and style, then start the render.</p>
            </div>
            <div className="soft-card p-4">
              <p className="font-semibold text-white">3. Review and download</p>
              <p className="mt-2">Watch completed videos, check job status, and download the final file.</p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.08} className="grid gap-4 md:grid-cols-3">
          <div className="metric-card p-6 md:col-span-1">
            <p className="text-sm font-medium text-white">Simple workflow</p>
            <p className="mt-3 text-sm leading-6 text-[#8fa3bd]">No extra steps, no confusing menus, just prompt, generate, and download.</p>
          </div>
          <div className="metric-card p-6 md:col-span-1">
            <p className="text-sm font-medium text-white">Built for speed</p>
            <p className="mt-3 text-sm leading-6 text-[#8fa3bd]">The dashboard keeps your renders, credits, and downloads in one place.</p>
          </div>
          <div className="metric-card p-6 md:col-span-1">
            <p className="text-sm font-medium text-white">Clear pricing</p>
            <p className="mt-3 text-sm leading-6 text-[#8fa3bd]">Choose a small starter plan or scale up when you need more credits.</p>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
