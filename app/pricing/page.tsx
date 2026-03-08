import { PlanCard } from "@/components/plan-card";
import { Reveal } from "@/components/reveal";
import { PageIntro, SectionCard } from "@/components/ui";
import { formatCurrency } from "@/lib/utils";
import { planCatalog } from "@/lib/config";

const packs = [
  { label: "100 credits", price: 12, note: "Fast prompt experiments" },
  { label: "500 credits", price: 45, note: "For weekly production cycles" },
  { label: "2000 credits", price: 149, note: "High-throughput creator teams" },
];

export default function PricingPage() {
  return (
    <main className="app-frame space-y-8">
      <Reveal className="panel-strong px-6 py-8 md:px-8 md:py-10">
        <PageIntro
          eyebrow="Pricing"
          title="A billing surface that feels operational, not chaotic."
          body="Borrowing from the reference portal design, this pricing view keeps plans, packs, and usage logic visible in a composed high-trust layout."
        />
      </Reveal>
      <section className="grid gap-4 xl:grid-cols-3">
        {planCatalog.map((plan, index) => (
          <Reveal key={plan.tier} delay={0.05 * index}>
            <PlanCard plan={plan} />
          </Reveal>
        ))}
      </section>
      <Reveal delay={0.12}>
        <SectionCard
          title="Credit packs"
          description="One-time purchases top up the same credit balance used by paid renders and retries."
        >
          <div className="grid gap-4 md:grid-cols-3">
            {packs.map((pack) => (
              <div key={pack.label} className="soft-card p-5">
                <p className="text-xs uppercase tracking-[0.22em] text-[#7be0c3]">Pack</p>
                <p className="mt-3 text-2xl font-semibold text-white">{pack.label}</p>
                <p className="mt-2 text-sm text-[#8fa3bd]">{pack.note}</p>
                <p className="mt-5 text-xl font-semibold text-white">{formatCurrency(pack.price)}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </Reveal>
    </main>
  );
}
