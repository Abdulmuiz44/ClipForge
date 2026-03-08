import Link from "next/link";
import { GoogleAuthButton } from "@/components/google-auth-button";
import { Reveal } from "@/components/reveal";

export default function SignInPage() {
  return (
    <main className="app-frame grid min-h-[calc(100vh-110px)] items-center">
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <Reveal className="panel-strong px-6 py-8 md:px-8 md:py-10">
          <p className="text-xs uppercase tracking-[0.28em] text-[#7be0c3]">Secure access</p>
          <h1 className="mt-4 font-[var(--font-display)] text-5xl leading-none text-white md:text-6xl">
            Sign in to the ClipForge portal.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-[#8fa3bd]">
            A focused command space for prompt-to-video generation, credit tracking, and delivery visibility.
          </p>
          <div className="mt-8 space-y-4 text-sm text-[#8fa3bd]">
            <div className="soft-card p-4">Google OAuth only. No password friction.</div>
            <div className="soft-card p-4">Status-aware dashboard with billing and render control in one view.</div>
            <div className="soft-card p-4">Safe retries, credit refunds on failed jobs, and downloadable outputs.</div>
          </div>
        </Reveal>
        <Reveal delay={0.08} className="panel flex items-center justify-center px-6 py-8 md:px-10">
          <div className="w-full max-w-md rounded-[28px] border border-white/10 bg-[#0a1421]/80 p-6 md:p-7">
            <p className="text-xs uppercase tracking-[0.28em] text-white/40">Authentication</p>
            <h2 className="mt-4 text-3xl font-semibold text-white">Welcome back</h2>
            <p className="mt-3 text-sm leading-6 text-[#8fa3bd]">
              Continue with the Google account you use for production work and reviews.
            </p>
            <div className="mt-8">
              <GoogleAuthButton mode="signin" />
            </div>
            <p className="mt-6 text-sm text-[#8fa3bd]">
              New here? <Link href="/auth/signup" className="text-white underline underline-offset-4">Create your workspace</Link>
            </p>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
