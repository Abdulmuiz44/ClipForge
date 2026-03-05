import { PlanCard } from "@/components/plan-card";
import { PageIntro, SectionCard } from "@/components/ui";
import { formatCurrency } from "@/lib/utils";
import { planCatalog } from "@/lib/config";

const packs = [
  { label: "100 credits", price: 12 },
  { label: "500 credits", price: 45 },
  { label: "2000 credits", price: 149 },
];

export default function PricingPage() {
  return (
    <main className="shell space-y-8 pb-16 pt-10">
      <PageIntro
        eyebrow="Pricing"
        title="Credits for one-off work. Plans for steady throughput."
        body="Keep billing legible: short clips cost a small fixed credit amount, subscriptions preload monthly capacity, and failed jobs release reserved credits."
      />
      <section className="grid gap-4 md:grid-cols-3">
        {planCatalog.map((plan) => (
          <PlanCard key={plan.tier} plan={plan} />
        ))}
      </section>
      <SectionCard
        title="Credit packs"
        description="One-time purchases top up the same balance used by paid render jobs."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {packs.map((pack) => (
            <div key={pack.label} className="rounded-[22px] border border-black/10 bg-white/80 p-5">
              <p className="text-lg font-semibold">{pack.label}</p>
              <p className="mt-2 text-sm text-black/60">{formatCurrency(pack.price)}</p>
            </div>
          ))}
        </div>
      </SectionCard>
    </main>
  );
}
