"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { type PlanCatalogEntry } from "@/lib/config";

export function PlanCard({ plan }: { plan: PlanCatalogEntry }) {
  return (
    <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.22 }} className="panel-strong flex h-full flex-col p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-[#7be0c3]">{plan.tier}</p>
          <h3 className="mt-3 text-3xl font-semibold text-white">{plan.name}</h3>
          <p className="mt-3 text-sm leading-6 text-[#8fa3bd]">{plan.description}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-right">
          <p className="text-xs uppercase tracking-[0.24em] text-white/45">Monthly</p>
          <p className="mt-2 text-2xl font-semibold text-white">${plan.monthlyPrice}</p>
        </div>
      </div>
      <div className="mt-6 rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
        <p className="text-sm text-white/55">Credits included</p>
        <p className="mt-2 text-3xl font-semibold text-[#dffaf1]">{plan.creditsPerMonth}</p>
      </div>
      <Link href={plan.checkoutUrl} className="button-primary mt-6">
        Choose {plan.name}
      </Link>
    </motion.div>
  );
}
