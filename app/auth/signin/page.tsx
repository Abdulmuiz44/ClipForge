import Link from "next/link";
import { GoogleAuthButton } from "@/components/google-auth-button";
import { Reveal } from "@/components/reveal";
import { getAuthConfigIssue, isGoogleSignInAvailable } from "@/lib/auth";

export default function SignInPage() {
  const authEnabled = isGoogleSignInAvailable();
  const authIssue = getAuthConfigIssue();

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 md:px-6">
      <div className="grid gap-12 lg:grid-cols-2 items-center min-h-[70vh]">
        <Reveal className="space-y-6">
          <p className="text-sm font-bold uppercase tracking-widest text-primary">Secure access</p>
          <h1 className="text-5xl font-extrabold tracking-tight md:text-6xl">
            Sign in to the <br />
            <span className="text-primary">ClipForge portal.</span>
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground leading-relaxed">
            A focused command space for prompt-to-video generation, credit tracking, and delivery visibility.
          </p>
          <div className="grid gap-4 pt-4">
            <div className="rounded-xl border bg-card p-4 text-sm font-medium">Google OAuth only. No password friction.</div>
            <div className="rounded-xl border bg-card p-4 text-sm font-medium">Status-aware dashboard with billing and render control.</div>
            <div className="rounded-xl border bg-card p-4 text-sm font-medium">Safe retries and credit refunds on failed jobs.</div>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="flex justify-center lg:justify-end">
          <div className="w-full max-w-md rounded-2xl border bg-card p-8 shadow-xl">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">Authentication</p>
            <h2 className="mt-4 text-3xl font-bold">Welcome back</h2>
            <p className="mt-2 text-muted-foreground">
              Continue with the Google account you use for production work.
            </p>
            <div className="mt-8">
              <GoogleAuthButton mode="signin" authEnabled={authEnabled} disabledReason={authIssue ?? undefined} />
            </div>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              New here? <Link href="/auth/signup" className="font-semibold text-primary hover:underline underline-offset-4">Create your workspace</Link>
            </p>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
