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
      className="button-primary gap-3"
    >
      <span className="grid size-8 place-items-center rounded-full bg-[#08111d] text-[#7be0c3]">G</span>
      Continue with Google
    </motion.button>
  );
}
