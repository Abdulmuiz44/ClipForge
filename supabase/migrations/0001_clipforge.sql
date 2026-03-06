create extension if not exists "pgcrypto";

create type public.plan_tier as enum ('FREE', 'STARTER', 'PRO', 'ENTERPRISE');
create type public.job_status as enum ('QUEUED', 'PROCESSING', 'COMPLETED', 'FAILED');
create type public.payment_type as enum ('ONE_TIME', 'SUBSCRIPTION');

create table if not exists public.plans (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  tier public.plan_tier not null unique,
  monthly_price integer not null,
  credits_per_month integer not null,
  description text not null,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.profiles (
  id text primary key,
  email text not null unique,
  credits_balance integer not null default 0,
  reserved_credits integer not null default 0,
  plan_tier public.plan_tier not null default 'FREE',
  has_paid_access boolean not null default false,
  demo_generations_used integer not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.video_jobs (
  id uuid primary key default gen_random_uuid(),
  user_id text not null references public.profiles(id) on delete cascade,
  prompt text not null,
  duration_seconds integer not null check (duration_seconds between 10 and 30),
  aspect_ratio text not null,
  style text not null,
  status public.job_status not null default 'QUEUED',
  video_url text,
  error_message text,
  cost_credits integer not null default 0,
  credits_reserved integer not null default 0,
  is_demo boolean not null default false,
  watermarked boolean not null default false,
  provider_name text not null,
  provider_job_id text,
  attempts integer not null default 0,
  last_polled_at timestamptz,
  next_retry_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  user_id text not null references public.profiles(id) on delete cascade,
  lemonsqueezy_event_id text not null unique,
  type public.payment_type not null,
  amount integer not null default 0,
  currency text not null default 'USD',
  credits_added integer not null default 0,
  plan_tier_after public.plan_tier not null default 'FREE',
  raw_payload jsonb not null,
  created_at timestamptz not null default timezone('utc', now())
);

insert into public.plans (name, tier, monthly_price, credits_per_month, description)
values
  ('Starter', 'STARTER', 19, 120, 'Launch with enough credits for weekly iteration.'),
  ('Pro', 'PRO', 49, 400, 'For creators running a steady clip pipeline.'),
  ('Enterprise', 'ENTERPRISE', 199, 2000, 'High-volume teams with room for experimentation.')
on conflict (tier) do nothing;

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists profiles_touch_updated_at on public.profiles;
create trigger profiles_touch_updated_at
before update on public.profiles
for each row execute procedure public.touch_updated_at();

drop trigger if exists video_jobs_touch_updated_at on public.video_jobs;
create trigger video_jobs_touch_updated_at
before update on public.video_jobs
for each row execute procedure public.touch_updated_at();

create or replace function public.reserve_credits_for_profile(p_profile_id text, p_credits integer)
returns void
language plpgsql
security definer
as $$
begin
  update public.profiles
  set credits_balance = credits_balance - p_credits,
      reserved_credits = reserved_credits + p_credits
  where id = p_profile_id and credits_balance >= p_credits;

  if not found then
    raise exception 'Insufficient credits';
  end if;
end;
$$;

create or replace function public.increment_demo_usage(p_profile_id text)
returns void
language plpgsql
security definer
as $$
begin
  update public.profiles
  set demo_generations_used = demo_generations_used + 1
  where id = p_profile_id;
end;
$$;

create or replace function public.complete_video_job(p_job_id uuid, p_video_url text)
returns void
language plpgsql
security definer
as $$
declare
  v_job public.video_jobs;
begin
  select * into v_job from public.video_jobs where id = p_job_id for update;

  update public.video_jobs
  set status = 'COMPLETED',
      video_url = p_video_url,
      error_message = null
  where id = p_job_id;

  if v_job.credits_reserved > 0 then
    update public.profiles
    set reserved_credits = greatest(reserved_credits - v_job.credits_reserved, 0)
    where id = v_job.user_id;
  end if;
end;
$$;

create or replace function public.fail_video_job(p_job_id uuid, p_error_message text)
returns void
language plpgsql
security definer
as $$
declare
  v_job public.video_jobs;
begin
  select * into v_job from public.video_jobs where id = p_job_id for update;

  update public.video_jobs
  set status = 'FAILED',
      error_message = p_error_message
  where id = p_job_id;

  if v_job.credits_reserved > 0 then
    update public.profiles
    set credits_balance = credits_balance + v_job.credits_reserved,
        reserved_credits = greatest(reserved_credits - v_job.credits_reserved, 0)
    where id = v_job.user_id;
  end if;
end;
$$;

create or replace function public.mark_job_retry(p_job_id uuid, p_error_message text)
returns void
language plpgsql
security definer
as $$
declare
  next_retry timestamptz;
begin
  next_retry = timezone('utc', now()) + interval '2 minute';

  update public.video_jobs
  set attempts = attempts + 1,
      error_message = p_error_message,
      next_retry_at = next_retry
  where id = p_job_id;
end;
$$;

create or replace function public.apply_payment_event(
  p_user_id text,
  p_lemonsqueezy_event_id text,
  p_payment_type public.payment_type,
  p_amount integer,
  p_currency text,
  p_credits_added integer,
  p_plan_tier_after public.plan_tier,
  p_raw_payload jsonb
)
returns void
language plpgsql
security definer
as $$
begin
  update public.profiles
  set credits_balance = credits_balance + p_credits_added,
      plan_tier = p_plan_tier_after,
      has_paid_access = true
  where id = p_user_id;

  insert into public.payments (
    user_id,
    lemonsqueezy_event_id,
    type,
    amount,
    currency,
    credits_added,
    plan_tier_after,
    raw_payload
  ) values (
    p_user_id,
    p_lemonsqueezy_event_id,
    p_payment_type,
    p_amount,
    p_currency,
    p_credits_added,
    p_plan_tier_after,
    p_raw_payload
  );
end;
$$;

create index if not exists idx_video_jobs_status_created_at on public.video_jobs(status, created_at);
create index if not exists idx_video_jobs_user_id on public.video_jobs(user_id);
create index if not exists idx_video_jobs_next_retry_at on public.video_jobs(next_retry_at);

alter table public.profiles enable row level security;
alter table public.video_jobs enable row level security;
alter table public.payments enable row level security;
alter table public.plans enable row level security;

create policy "plans public read" on public.plans
for select using (true);
