import Link from "next/link";
import { AuthForm } from "@/components/auth-form";
import { PageIntro } from "@/components/ui";

export default function SignUpPage() {
  return (
    <main className="shell pb-16 pt-10">
      <div className="panel mx-auto max-w-2xl p-8 md:p-10">
        <PageIntro
          eyebrow="Authentication"
          title="Create your PromptClips account"
          body="Start with two watermarked demos, then unlock full renders with a paid plan or credit pack."
        />
        <div className="mt-8">
          <AuthForm mode="signup" />
          <p className="mt-6 text-sm text-black/60">
            Already have an account?{" "}
            <Link href="/auth/signin" className="underline underline-offset-4">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
