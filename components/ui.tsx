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
      <p className="text-xs uppercase tracking-[0.28em] text-[#7be0c3]">{eyebrow}</p>
      <h1 className="max-w-4xl font-[var(--font-display)] text-4xl leading-none text-white md:text-6xl">
        {title}
      </h1>
      <p className="max-w-3xl text-base leading-7 text-[#8fa3bd] md:text-lg">{body}</p>
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
    <div className="metric-card p-5">
      <p className="text-xs uppercase tracking-[0.24em] text-white/45">{label}</p>
      <p className="mt-4 text-3xl font-semibold text-white">{value}</p>
      {hint ? <p className="mt-2 text-sm text-[#8fa3bd]">{hint}</p> : null}
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
    <section className={cn("panel-strong p-6 md:p-7", className)}>
      <div className="mb-6 flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-white md:text-2xl">{title}</h2>
        {description ? <p className="text-sm leading-6 text-[#8fa3bd]">{description}</p> : null}
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
    <div className="soft-card px-5 py-10 text-center">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-[#8fa3bd]">{body}</p>
    </div>
  );
}
