"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { env } from "@/lib/config";

export function BuyButtons() {
  const baseUrl = env.NEXT_PUBLIC_LS_CREDIT_CHECKOUT_URL ?? "#";
  const links = [
    { label: "Buy 100 credits", url: baseUrl === "#" ? "#" : `${baseUrl}?quantity=100` },
    { label: "Buy 500 credits", url: baseUrl === "#" ? "#" : `${baseUrl}?quantity=500` },
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {links.map((item) => (
        <motion.div key={item.label} whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
          <Link href={item.url} className="button-secondary">
            {item.label}
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
