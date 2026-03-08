export function CreditBadge({ credits }: { credits: number }) {
  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-[#7be0c3]/20 bg-[#7be0c3]/10 px-4 py-2 text-sm font-semibold text-[#dffaf1]">
      <span className="size-2 rounded-full bg-[#7be0c3]" />
      {credits} credits available
    </div>
  );
}
