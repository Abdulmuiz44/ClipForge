"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { getCheckoutLinks } from "@/lib/config";

export function BuyButtons() {
  const links = getCheckoutLinks();

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
