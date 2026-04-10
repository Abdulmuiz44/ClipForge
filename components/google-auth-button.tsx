"use client";

import { motion } from "framer-motion";
import { signIn, signOut } from "next-auth/react";

type Props = {
  mode: "signin" | "signup" | "signout";
  authEnabled?: boolean;
  disabledReason?: string;
};

export function GoogleAuthButton({ mode, authEnabled = true, disabledReason }: Props) {
  if (mode === "signout") {
    return (
      <motion.button
        type="button"
        whileHover={{ y: -2, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => signOut({ callbackUrl: "/" })}
        className="button-secondary"
      >
        Sign out
      </motion.button>
    );
  }

  if (!authEnabled) {
    return (
      <div className="space-y-3">
        <button
          type="button"
          disabled
          aria-disabled="true"
          className="button-primary w-full cursor-not-allowed gap-3 py-4 opacity-60"
        >
          <div className="flex size-6 items-center justify-center rounded-full bg-white text-black font-bold text-sm">G</div>
          Google sign-in unavailable
        </button>
        <p className="text-sm text-muted-foreground">{disabledReason ?? "Authentication is temporarily unavailable."}</p>
      </div>
    );
  }

  return (
    <motion.button
      type="button"
      whileHover={{ y: -3, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
      className="button-primary w-full gap-3 py-4"
    >
      <div className="flex size-6 items-center justify-center rounded-full bg-white text-black font-bold text-sm">G</div>
      Continue with Google
    </motion.button>
  );
}
