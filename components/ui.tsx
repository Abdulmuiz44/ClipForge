import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PageIntro({
  eyebrow,
  title,
  body,
  actions,
}: {
  eyebrow: string;
  title: string;
  body: string;
  actions?: ReactNode;
}) {
  return (
    <div className="space-y-4">
      <p className="text-xs uppercase tracking-[0.24em] text-black/55">{eyebrow}</p>
      <h1 className="font-[var(--font-display)] text-4xl leading-none md:text-6xl">{title}</h1>
      <p className="max-w-2xl text-base leading-7 text-black/68">{body}</p>
      {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
    </div>
  );
}

export function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="glass-card p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-black/50">{label}</p>
      <p className="mt-3 text-3xl font-semibold">{value}</p>
      {hint ? <p className="mt-1 text-sm text-black/60">{hint}</p> : null}
    </div>
  );
}

export function SectionCard({
  title,
  description,
  className,
  children,
}: {
  title: string;
  description?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section className={cn("glass-card p-6", className)}>
      <div className="mb-5">
        <h2 className="text-xl font-semibold">{title}</h2>
        {description ? <p className="mt-1 text-sm text-black/60">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}

export function EmptyState({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-[20px] border border-dashed border-black/15 bg-white/55 px-5 py-8 text-center">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-black/60">{body}</p>
    </div>
  );
}
