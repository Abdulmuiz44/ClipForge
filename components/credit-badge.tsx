export function CreditBadge({ credits }: { credits: number }) {
  return (
    <div className="inline-flex items-center rounded-full border border-black/10 bg-white/80 px-4 py-2 text-sm font-medium">
      {credits} credits
    </div>
  );
}
