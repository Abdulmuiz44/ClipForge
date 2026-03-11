alter table public.profiles
  add column if not exists trial_credits_granted integer not null default 100,
  add column if not exists trial_credits_expires_at timestamptz,
  add column if not exists trial_credits_consumed integer not null default 0;

update public.profiles
set
  trial_credits_granted = coalesce(trial_credits_granted, 100),
  trial_credits_expires_at = coalesce(
    trial_credits_expires_at,
    created_at + interval '7 days'
  ),
  trial_credits_consumed = coalesce(
    trial_credits_consumed,
    case
      when has_paid_access then 0
      else least(greatest(100 - credits_balance, 0), 100)
    end
  );

alter table public.profiles
  alter column trial_credits_granted set not null,
  alter column trial_credits_consumed set not null;

alter table public.profiles
  add constraint profiles_trial_credits_granted_nonnegative
    check (trial_credits_granted >= 0),
  add constraint profiles_trial_credits_consumed_bounds
    check (trial_credits_consumed >= 0 and trial_credits_consumed <= trial_credits_granted);

create or replace function public.reserve_credits_for_profile(p_profile_id text, p_credits integer)
returns void
language plpgsql
security definer
as $$
declare
  v_trial_remaining integer;
  v_spendable integer;
  v_trial_to_consume integer;
begin
  if p_credits <= 0 then
    raise exception 'Credits to reserve must be positive';
  end if;

  select
    case
      when trial_credits_expires_at is not null and trial_credits_expires_at <= timezone('utc', now())
        then 0
      else greatest(trial_credits_granted - trial_credits_consumed, 0)
    end,
    credits_balance
      - case
          when trial_credits_expires_at is not null and trial_credits_expires_at <= timezone('utc', now())
            then greatest(trial_credits_granted - trial_credits_consumed, 0)
          else 0
        end
  into v_trial_remaining, v_spendable
  from public.profiles
  where id = p_profile_id
  for update;

  if not found then
    raise exception 'Profile not found';
  end if;

  if v_spendable < p_credits then
    raise exception 'Insufficient credits';
  end if;

  v_trial_to_consume := least(v_trial_remaining, p_credits);

  update public.profiles
  set credits_balance = credits_balance - p_credits,
      reserved_credits = reserved_credits + p_credits,
      trial_credits_consumed = trial_credits_consumed + v_trial_to_consume
  where id = p_profile_id;
end;
$$;
