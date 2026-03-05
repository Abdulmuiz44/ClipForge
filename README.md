# PromptClips

PromptClips is a lean AIVideo-style MVP built with Next.js 14, Supabase, Replicate, and Lemon Squeezy. It turns a short text prompt into a 10-30 second AI video job with credit accounting, paid access control, and a simple dashboard.

## Stack

- Next.js 14 App Router + TypeScript
- Tailwind CSS
- Supabase Auth + Postgres
- Replicate text-to-video adapter in `lib/videoProvider.ts`
- Lemon Squeezy checkout links + webhook handling
- Vercel Cron compatible worker endpoint at `/api/jobs/process`

## Local setup

1. Install dependencies:

```bash
pnpm install
```

2. Copy `.env.example` to `.env.local` and fill in:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `REPLICATE_API_TOKEN`
- `REPLICATE_MODEL_VERSION`
- `LEMON_SQUEEZY_WEBHOOK_SECRET`
- Lemon checkout URLs and variant IDs
- `CRON_SECRET`

3. Apply the SQL schema in `supabase/migrations/0001_promptclips.sql` to your Supabase project.

4. Run the dev server:

```bash
pnpm dev
```

## Product behavior

- Users can sign up and sign in with Supabase email/password auth.
- Unpaid users get `2` watermarked demo generations.
- Paid users can render non-demo clips if they have enough credits.
- Credit cost is configurable in `lib/credits.ts`.
- Credits are reserved at queue time, finalized on completion, and refunded on failure.
- Job state machine: `QUEUED -> PROCESSING -> COMPLETED | FAILED`

## Lemon Squeezy

- Checkout URLs are displayed on `/pricing` and `/dashboard`.
- Webhook endpoint: `/api/webhooks/lemonsqueezy`
- Variant-to-credit/plan mapping lives in `lib/payments/catalog.ts`
- Webhook verification and parsing live in `lib/payments/lemonsqueezy.ts`

Recommended webhook custom data:

```json
{
  "user_email": "customer@example.com"
}
```

## Video provider swap

Replicate is isolated behind `lib/videoProvider.ts`. To switch providers, keep the same `createVideoJob` and `getVideoJobStatus` contract and replace only that module.

## Tests

```bash
pnpm test
```

Current tests cover:

- Credit cost boundaries
- Demo gating and job payload creation
- Lemon Squeezy signature parsing and mapping
- Prompt watermark behavior for demo jobs
