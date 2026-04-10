import Link from "next/link";
import { GoogleAuthButton } from "@/components/google-auth-button";
import { Reveal } from "@/components/reveal";
import { getAuthConfigIssue, isGoogleSignInAvailable } from "@/lib/auth";

export default function SignUpPage() {
  const authEnabled = isGoogleSignInAvailable();
  const authIssue = getAuthConfigIssue();

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 md:px-6">
      <div className="grid gap-12 lg:grid-cols-2 items-center min-h-[70vh]">
        <Reveal className="flex justify-center lg:justify-start order-2 lg:order-1">
          <div className="w-full max-w-md rounded-2xl border bg-card p-8 shadow-xl">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">Workspace setup</p>
            <h2 className="mt-4 text-3xl font-bold">Create your account</h2>
            <p className="mt-2 text-muted-foreground">
              Start with two demo renders, then top up with credits when you are ready.
            </p>
            <div className="mt-8">
              <GoogleAuthButton mode="signup" authEnabled={authEnabled} disabledReason={authIssue ?? undefined} />
            </div>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account? <Link href="/auth/signin" className="font-semibold text-primary hover:underline underline-offset-4">Sign in</Link>
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="space-y-6 order-1 lg:order-2">
          <p className="text-sm font-bold uppercase tracking-widest text-primary">Designed for clarity</p>
          <h1 className="text-5xl font-extrabold tracking-tight md:text-6xl">
            A dashboard built <br />
            <span className="text-primary">for creators.</span>
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground leading-relaxed">
            ClipForge provides a low-friction, high-visibility interface that keeps your billing and render states perfectly clear.
          </p>
          <div className="grid gap-4 pt-4 md:grid-cols-2">
            <div className="rounded-xl border bg-card p-4">
              <p className="text-sm font-bold">2 demo renders</p>
              <p className="mt-1 text-sm text-muted-foreground">Test prompts for free before you buy credits.</p>
            </div>
            <div className="rounded-xl border bg-card p-4">
              <p className="text-sm font-bold">Credit-aware</p>
              <p className="mt-1 text-sm text-muted-foreground">Full transparency on render costs and refunds.</p>
            </div>
            <div className="rounded-xl border bg-card p-4 md:col-span-2">
              <p className="text-sm font-bold">Google-first authentication</p>
              <p className="mt-1 text-sm text-muted-foreground">Secure, fast, and simple access with one click.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
