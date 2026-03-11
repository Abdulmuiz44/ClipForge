alter table public.video_jobs
  add column if not exists resolution text not null default 'hd',
  add column if not exists quality_tier text not null default 'standard';

alter table public.video_jobs
  add constraint video_jobs_resolution_check check (resolution in ('sd', 'hd', 'fullhd'));

alter table public.video_jobs
  add constraint video_jobs_quality_tier_check check (quality_tier in ('draft', 'standard', 'premium'));
