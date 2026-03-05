import Link from "next/link";
import { AuthForm } from "@/components/auth-form";
import { PageIntro } from "@/components/ui";

export default function ForgotPasswordPage() {
  return (
    <main className="shell pb-16 pt-10">
      <div className="panel mx-auto max-w-2xl p-8 md:p-10">
        <PageIntro
          eyebrow="Authentication"
          title="Send a password reset link"
          body="Use the email tied to your PromptClips account."
        />
        <div className="mt-8">
          <AuthForm mode="forgot-password" />
          <p className="mt-6 text-sm text-black/60">
            Back to{" "}
            <Link href="/auth/signin" className="underline underline-offset-4">
              sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
