import { formatDistanceToNowStrict } from "date-fns";

export function CreditBadge({
  credits,
  trialCredits,
  trialExpiresAt,
}: {
  credits: number;
  trialCredits?: number;
  trialExpiresAt?: string | null;
}) {
  const hasActiveTrial = Boolean(
    trialCredits && trialCredits > 0 && trialExpiresAt && new Date(trialExpiresAt).getTime() > Date.now(),
  );

  return (
    <div className="space-y-2 rounded-xl border border-primary/20 bg-primary/10 p-4 text-sm">
      <div className="inline-flex items-center gap-2 font-bold text-primary">
        <span className="size-2 animate-pulse rounded-full bg-primary" />
        {credits} paid credits available
      </div>
      {hasActiveTrial ? (
        <p className="text-xs text-primary/90">
          + {trialCredits} free trial credits expire in {formatDistanceToNowStrict(new Date(trialExpiresAt as string))}
        </p>
      ) : null}
    </div>
  );
}
