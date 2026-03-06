import Link from "next/link";
import { GoogleAuthButton } from "@/components/google-auth-button";
import { PageIntro } from "@/components/ui";

export default function SignInPage() {
  return (
    <main className="shell pb-16 pt-10">
      <div className="panel mx-auto max-w-2xl p-8 md:p-10">
        <PageIntro
          eyebrow="Authentication"
          title="Sign in to your workspace"
          body="Use Google to access your credits, queue new renders, and review finished videos."
        />
        <div className="mt-8">
          <GoogleAuthButton mode="signin" />
          <p className="mt-2 text-sm text-black/60">
            Need an account?{" "}
            <Link href="/auth/signup" className="underline underline-offset-4">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
