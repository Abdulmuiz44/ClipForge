alter table public.profiles
  add column if not exists trial_credits_balance integer not null default 0,
  add column if not exists trial_credits_expires_at timestamptz;

alter table public.video_jobs
  add column if not exists credits_reserved_paid integer not null default 0,
  add column if not exists credits_reserved_trial integer not null default 0,
  add column if not exists reference_image_data_url text,
  add column if not exists reference_image_name text;

create or replace function public.reserve_credits_for_profile_v2(p_profile_id text, p_credits integer)
returns table (reserved_trial integer, reserved_paid integer)
language plpgsql
security definer
as $$
declare
  v_profile public.profiles;
  v_available_trial integer;
  v_trial integer;
  v_paid integer;
begin
  select * into v_profile from public.profiles where id = p_profile_id for update;

  if not found then
    raise exception 'Profile not found';
  end if;

  if v_profile.trial_credits_expires_at is not null and v_profile.trial_credits_expires_at > timezone('utc', now()) then
    v_available_trial := v_profile.trial_credits_balance;
  else
    v_available_trial := 0;
  end if;

  if (v_profile.credits_balance + v_available_trial) < p_credits then
    raise exception 'Insufficient credits';
  end if;

  v_trial := least(v_available_trial, p_credits);
  v_paid := p_credits - v_trial;

  update public.profiles
  set trial_credits_balance = greatest(trial_credits_balance - v_trial, 0),
      credits_balance = credits_balance - v_paid,
      reserved_credits = reserved_credits + p_credits
  where id = p_profile_id;

  return query select v_trial, v_paid;
end;
$$;

create or replace function public.fail_video_job(p_job_id uuid, p_error_message text)
returns void
language plpgsql
security definer
as $$
declare
  v_job public.video_jobs;
  v_profile public.profiles;
  v_refund_trial integer;
  v_refund_paid integer;
begin
  select * into v_job from public.video_jobs where id = p_job_id for update;
  select * into v_profile from public.profiles where id = v_job.user_id for update;

  update public.video_jobs
  set status = 'FAILED',
      error_message = p_error_message
  where id = p_job_id;

  if v_job.credits_reserved > 0 then
    v_refund_trial := coalesce(v_job.credits_reserved_trial, 0);
    v_refund_paid := coalesce(v_job.credits_reserved_paid, v_job.credits_reserved);

    if v_profile.trial_credits_expires_at is null or v_profile.trial_credits_expires_at <= timezone('utc', now()) then
      v_refund_trial := 0;
    end if;

    update public.profiles
    set credits_balance = credits_balance + v_refund_paid,
        trial_credits_balance = trial_credits_balance + v_refund_trial,
        reserved_credits = greatest(reserved_credits - v_job.credits_reserved, 0)
    where id = v_job.user_id;
  end if;
end;
$$;
