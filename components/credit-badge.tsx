export function CreditBadge({ credits }: { credits: number }) {
  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-bold text-primary">
      <span className="size-2 rounded-full bg-primary animate-pulse" />
      {credits} credits available
    </div>
  );
}
