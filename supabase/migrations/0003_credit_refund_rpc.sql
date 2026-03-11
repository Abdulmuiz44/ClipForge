create or replace function public.refund_reserved_credits_for_profile_v2(
  p_profile_id text,
  p_reserved_paid integer,
  p_reserved_trial integer
)
returns void
language plpgsql
security definer
as $$
declare
  v_profile public.profiles;
  v_trial_refund integer;
  v_total integer;
begin
  select * into v_profile from public.profiles where id = p_profile_id for update;

  if not found then
    raise exception 'Profile not found';
  end if;

  v_trial_refund := greatest(p_reserved_trial, 0);
  if v_profile.trial_credits_expires_at is null or v_profile.trial_credits_expires_at <= timezone('utc', now()) then
    v_trial_refund := 0;
  end if;

  v_total := greatest(p_reserved_paid, 0) + greatest(p_reserved_trial, 0);

  update public.profiles
  set credits_balance = credits_balance + greatest(p_reserved_paid, 0),
      trial_credits_balance = trial_credits_balance + v_trial_refund,
      reserved_credits = greatest(reserved_credits - v_total, 0)
  where id = p_profile_id;
end;
$$;
