import Link from "next/link";
import { GoogleAuthButton } from "@/components/google-auth-button";
import { Reveal } from "@/components/reveal";

export default function SignUpPage() {
  return (
    <main className="app-frame grid min-h-[calc(100vh-110px)] items-center">
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <Reveal className="panel flex items-center justify-center px-6 py-8 md:px-10">
          <div className="w-full max-w-md rounded-[28px] border border-white/10 bg-[#0a1421]/80 p-6 md:p-7">
            <p className="text-xs uppercase tracking-[0.28em] text-white/40">Workspace setup</p>
            <h2 className="mt-4 text-3xl font-semibold text-white">Create your account</h2>
            <p className="mt-3 text-sm leading-6 text-[#8fa3bd]">
              Start with two demo renders, then upgrade into production usage when you are ready.
            </p>
            <div className="mt-8">
              <GoogleAuthButton mode="signup" />
            </div>
            <p className="mt-6 text-sm text-[#8fa3bd]">
              Already inside? <Link href="/auth/signin" className="text-white underline underline-offset-4">Sign in</Link>
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.08} className="panel-strong px-6 py-8 md:px-8 md:py-10">
          <p className="text-xs uppercase tracking-[0.28em] text-[#7be0c3]">Designed for clarity</p>
          <h1 className="mt-4 font-[var(--font-display)] text-5xl leading-none text-white md:text-6xl">
            A creator dashboard with portal-level composure.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-[#8fa3bd]">
            The onboarding mirrors the overall product tone: low friction, high visibility, and a measured interface that keeps billing and output states understandable.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="soft-card p-4">
              <p className="text-sm font-semibold text-white">2 demo renders</p>
              <p className="mt-2 text-sm leading-6 text-[#8fa3bd]">Useful for prompt testing before any purchase.</p>
            </div>
            <div className="soft-card p-4">
              <p className="text-sm font-semibold text-white">Credit-aware workflow</p>
              <p className="mt-2 text-sm leading-6 text-[#8fa3bd]">Every render advertises cost, state, and refund behavior.</p>
            </div>
            <div className="soft-card p-4 md:col-span-2">
              <p className="text-sm font-semibold text-white">Google-first authentication</p>
              <p className="mt-2 text-sm leading-6 text-[#8fa3bd]">One provider, one button, fewer support issues.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
