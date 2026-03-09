"use client";

import { motion } from "framer-motion";
import { signIn, signOut } from "next-auth/react";

type Props = {
  mode: "signin" | "signup" | "signout";
};

export function GoogleAuthButton({ mode }: Props) {
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
