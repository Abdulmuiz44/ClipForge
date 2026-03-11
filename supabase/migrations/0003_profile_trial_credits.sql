alter table if exists public.profiles
add column if not exists trial_credits_consumed integer not null default 0;

