import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "ClipForge | AI text-to-video clips for content and marketing",
  description:
    "Turn short text prompts into high-quality 10 to 30 second AI video clips for content, marketing, and storytelling.",
};

const useCases = [
  {
    title: "Social content clips",
    body: "Generate short vertical scenes for Reels, Shorts, and TikTok from one prompt.",
  },
  {
    title: "Marketing videos",
    body: "Create fast product teasers, launch visuals, and ad concepts without a full production pipeline.",
  },
  {
    title: "Storytelling scenes",
    body: "Draft mood-driven visual scenes to pitch ideas, scripts, or creative directions.",
  },
];

const benefits = [
  {
    title: "Built for 10–30 second clips",
    body: "ClipForge is optimized for short-form outputs so your videos feel focused and platform-ready.",
  },
  {
    title: "Simple prompt-to-video flow",
    body: "Describe the shot, choose duration and aspect ratio, then generate in one clean workflow.",
  },
  {
    title: "Production-friendly controls",
    body: "Keep consistency with style options, track job status, and download outputs in one dashboard.",
  },
];

export default function Home() {
  return (
    <main className="flex flex-col gap-16 py-12 md:gap-24 md:py-20">
      <section className="px-4">
        <div className="mx-auto max-w-6xl rounded-3xl border bg-card px-6 py-12 text-center shadow-sm md:px-10 md:py-16">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-primary">AI video creation platform</p>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-6xl">
              Turn short text prompts into
              <span className="text-primary"> high-quality 10–30 second video clips</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-3xl text-base text-muted-foreground md:text-xl">
              ClipForge helps creators, marketers, and storytellers generate polished short videos fast—without a complex editing workflow.
            </p>
          </Reveal>
          <Reveal delay={0.2} className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/auth/signup" className="button-primary px-8 py-3.5 text-base">
              Start creating clips
            </Link>
            <Link href="/dashboard" className="button-secondary px-8 py-3.5 text-base">
              See the generation flow
            </Link>
          </Reveal>
          <Reveal delay={0.3} className="mt-6 text-sm text-muted-foreground">
            <p>Pay only for what you use • No monthly subscription charges • Supports 10s, 15s, 20s, 25s, and 30s clips</p>
          </Reveal>
        </div>
      </section>

      <section className="px-4">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {benefits.map((benefit, i) => (
            <Reveal key={benefit.title} delay={0.08 * i} className="rounded-2xl border bg-card p-6">
              <h2 className="text-lg font-semibold">{benefit.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{benefit.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-muted/30 py-14">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <h2 className="text-center text-3xl font-bold tracking-tight">How ClipForge works</h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                step: "1",
                title: "Write a short prompt",
                desc: "Describe subject, scene, camera feel, and movement in one concise brief.",
              },
              {
                step: "2",
                title: "Set clip format",
                desc: "Choose duration (10–30s), aspect ratio, and style for your use case.",
              },
              {
                step: "3",
                title: "Generate and download",
                desc: "Track render status in the dashboard and download your final video clip.",
              },
            ].map((item, i) => (
              <Reveal key={item.step} delay={0.1 * i} className="rounded-xl border bg-card p-6">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {item.step}
                </span>
                <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tight">Use cases teams start with</h2>
          </Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {useCases.map((item, i) => (
              <Reveal key={item.title} delay={0.08 * i} className="rounded-2xl border bg-card p-6">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.body}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.25} className="mt-10 rounded-2xl border bg-card p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Social proof placeholder</p>
            <p className="mt-3 text-lg font-medium">
              Teams use ClipForge to turn creative ideas into short video assets in minutes.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Add customer logos, testimonials, or case studies here as adoption grows.
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
