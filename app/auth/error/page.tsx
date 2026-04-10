import Link from "next/link";
import { Reveal } from "@/components/reveal";

type ErrorPageProps = {
  searchParams: {
    error?: string;
  };
};

const errorCopy: Record<string, { title: string; message: string }> = {
  ProviderUnavailable: {
    title: "Google sign-in unavailable",
    message: "Google OAuth is not fully configured right now. Please try again in a moment or contact support.",
  },
  ProfileSync: {
    title: "Could not finish sign-in",
    message: "We could not prepare your account profile. Please retry sign-in. If this keeps happening, contact support.",
  },
  ProfileFetch: {
    title: "Account setup incomplete",
    message: "Your session is valid, but we could not load account data. Please sign in again.",
  },
  Configuration: {
    title: "Authentication configuration error",
    message: "Authentication settings appear incomplete. Please contact support.",
  },
  OAuthCallback: {
    title: "Google callback mismatch",
    message: "The OAuth callback did not validate. Confirm the production callback URL in Google Cloud and Netlify env vars.",
  },
  AccessDenied: {
    title: "Sign-in was denied",
    message: "We could not verify your Google account information. Please try again.",
  },
  Default: {
    title: "Sign-in failed",
    message: "Something went wrong during authentication. Please retry.",
  },
};

export default function AuthErrorPage({ searchParams }: ErrorPageProps) {
  const code = searchParams.error ?? "Default";
  const copy = errorCopy[code] ?? errorCopy.Default;

  return (
    <main className="mx-auto max-w-3xl px-4 py-16 md:px-6">
      <Reveal className="rounded-2xl border bg-card p-8 shadow-xl md:p-10">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">Authentication error</p>
        <h1 className="mt-4 text-3xl font-bold md:text-4xl">{copy.title}</h1>
        <p className="mt-4 text-muted-foreground leading-relaxed">{copy.message}</p>
        <p className="mt-3 text-sm text-muted-foreground">Error code: <span className="font-mono">{code}</span></p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/auth/signin" className="button-primary">Try sign-in again</Link>
          <Link href="/" className="button-secondary">Back to home</Link>
        </div>
      </Reveal>
    </main>
  );
}
