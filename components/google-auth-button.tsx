"use client";

import { signIn, signOut } from "next-auth/react";

type Props = {
  mode: "signin" | "signup" | "signout";
};

export function GoogleAuthButton({ mode }: Props) {
  if (mode === "signout") {
    return (
      <button
        type="button"
        onClick={() => signOut({ callbackUrl: "/" })}
        className="rounded-full border border-black/10 bg-white/80 px-4 py-2 text-sm font-medium hover:bg-black hover:text-white"
      >
        Sign out
      </button>
    );
  }

  const label = mode === "signup" ? "Continue with Google" : "Continue with Google";

  return (
    <button
      type="button"
      onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
      className="inline-flex items-center justify-center rounded-full bg-black px-5 py-3 text-sm font-medium text-white"
    >
      {label}
    </button>
  );
}
