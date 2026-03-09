"use client";

import { motion } from "framer-motion";
import { formatCurrency } from "@/lib/utils";
import { appConfig } from "@/lib/config";

export function PlanCard({ credits, onClick }: { credits: number, onClick: () => void }) {
  const price = credits * appConfig.creditPrice;
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.22 }}
      className="panel-strong flex h-full flex-col p-6 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-primary">Credit Pack</p>
          <h3 className="mt-3 text-3xl font-semibold">{credits} Credits</h3>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Top up your balance with {credits} credits for immediate use.
          </p>
        </div>
      </div>
      <div className="mt-6 rounded-[22px] border border-border bg-muted/30 p-4 text-center">
        <p className="text-5xl font-extrabold">{formatCurrency(price)}</p>
      </div>
      <button className="button-primary mt-6 w-full" onClick={onClick}>
        Buy {credits} credits
      </button>
    </motion.div>
  );
}
