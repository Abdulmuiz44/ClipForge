import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles, Wallet, Film } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { appConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "ClipForge | Automate your video creation with AI",
  description: "Real workflows, tested prompts, and credit-based pricing for AI video generation.",
};

export default function Home() {
  return (
    <main className="flex flex-col gap-16 py-12 md:py-24">
      {/* Hero Section */}
      <section className="px-4">
        <div className="mx-auto max-w-5xl text-center space-y-8">
          <Reveal>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
              Automate your work <br />
              <span className="text-primary">with ClipForge AI</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
              Real workflows, tested prompt packs, and easy AI video generation for creators.
            </p>
          </Reveal>
          <Reveal delay={0.2} className="flex items-center justify-center gap-4">
            <Link href="/auth/signup" className="button-primary px-8 py-4 text-base">
              Browse workflows
            </Link>
            <Link href="/pricing" className="button-secondary px-8 py-4 text-base">
              Explore pricing
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Info Section */}
      <section className="bg-muted/30 py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Get started in 3 steps</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                step: "1",
                title: "Create an Account",
                desc: "Sign up and get started with our easy-to-use dashboard.",
              },
              {
                step: "2",
                title: "Buy Credits",
                desc: "Choose a credit pack that fits your needs. Pay only for what you use.",
              },
              {
                step: "3",
                title: "Generate Video",
                desc: "Enter your prompt, select your style, and let ClipForge do the rest.",
              },
            ].map((item, i) => (
              <Reveal key={item.step} delay={0.1 * i} className="rounded-xl border bg-card p-6">
                <span className="mb-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {item.step}
                </span>
                <h3 className="mb-2 font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-center">
            <Link href="/auth/signup" className="font-medium text-primary hover:underline">
              Read the full getting-started guide →
            </Link>
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-4">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                title: "Workflows",
                desc: "Tested recipes with exact permission scopes.",
                link: "/dashboard",
                linkText: "View all →",
              },
              {
                title: "Prompt packs",
                desc: "Curated sets of AI prompts. Copy and run.",
                link: "/dashboard",
                linkText: "Browse →",
              },
              {
                title: "Connectors",
                desc: "Connect to Gmail, Google Drive, and more.",
                link: "/dashboard",
                linkText: "See guides →",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={0.1 * i} className="rounded-xl border bg-card p-6">
                <h3 className="mb-2 font-semibold">{item.title}</h3>
                <p className="mb-4 text-sm text-muted-foreground">{item.desc}</p>
                <Link href={item.link} className="text-sm font-medium text-primary hover:underline">
                  {item.linkText}
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-secondary py-12 text-secondary-foreground">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="space-y-4">
              <h3 className="text-lg font-bold">⚡</h3>
              <p className="text-sm opacity-75">
                The operator&apos;s manual for AI video generation. Workflows, prompt packs, and safety guidance for real work.
              </p>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide">Resources</h4>
              <ul className="space-y-2 text-sm opacity-75">
                <li><Link href="/">Start Here</Link></li>
                <li><Link href="/dashboard">Workflows</Link></li>
                <li><Link href="/dashboard">Prompt Packs</Link></li>
                <li><Link href="/dashboard">Connectors</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide">Legal</h4>
              <ul className="space-y-2 text-sm opacity-75">
                <li><Link href="#">About</Link></li>
                <li><Link href="#">Privacy</Link></li>
                <li><Link href="#">Terms</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide">Newsletter</h4>
              <p className="mb-4 text-sm opacity-75">1 new workflow + prompt pack weekly.</p>
              <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
                Get the Drops
              </button>
            </div>
          </div>
          <div className="mt-12 border-t pt-8 text-center text-xs opacity-50">
            <p>© {new Date().getFullYear()} ClipForge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
