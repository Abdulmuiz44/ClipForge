import Link from "next/link";
import { type PlanCatalogEntry } from "@/lib/config";

export function PlanCard({ plan }: { plan: PlanCatalogEntry }) {
  return (
    <div className="glass-card flex h-full flex-col p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-2xl font-semibold">{plan.name}</h3>
          <p className="mt-2 text-sm text-black/60">{plan.description}</p>
        </div>
        <div className="rounded-full bg-black px-3 py-1 text-xs uppercase tracking-[0.18em] text-white">
          {plan.tier}
        </div>
      </div>
      <p className="mt-5 text-4xl font-semibold">${plan.monthlyPrice}</p>
      <p className="mt-2 text-sm text-black/60">{plan.creditsPerMonth} credits / month</p>
      <Link
        href={plan.checkoutUrl}
        className="mt-6 inline-flex rounded-full bg-black px-4 py-3 text-sm font-medium text-white"
      >
        Choose {plan.name}
      </Link>
    </div>
  );
}
