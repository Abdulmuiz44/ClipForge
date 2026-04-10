# ClipForge

ClipForge is a lean AI video generation platform built with Next.js 14, NextAuth Google OAuth, Supabase, Replicate, and Lemon Squeezy. It features a modern UI inspired by Claude Cowork, supporting both light and dark modes, and turns text prompts into 10-30 second AI videos using a flexible credit-based pricing model.

## Redesigned UI

The platform features a clean, high-performance interface based on the Claude Cowork design system:
- **Dynamic Theming:** Seamless support for Light and Dark modes.
- **Modern Typography:** Uses 'Instrument Serif' for display and 'Space Grotesk' for interface elements.
- **Responsive Design:** Fully optimized for mobile and desktop experiences.
- **Modern Color Palette:** Built using OKLCH/HSL CSS variables for consistent and accessible styling.

## Credit-Based Pricing

ClipForge uses a "pay-as-you-go" credit system instead of traditional subscriptions:
- **No Monthly Fees:** Users only pay for the credits they need.
- **Custom Amounts:** Users can purchase predefined packs (100, 500, 2000 credits) or select a custom amount via a slider.
- **Secure Payments:** Integrated with Lemon Squeezy for handling checkouts and dynamic credit allocations.
- **Non-Expiring Credits:** Credits are added to the user balance and never expire.

## Stack

- Next.js 14 App Router + TypeScript
- Tailwind CSS (with `next-themes` for dark mode)
- NextAuth Google OAuth
- Supabase Postgres + storage
- Replicate text-to-video adapter in `lib/videoProvider.ts`
- Lemon Squeezy checkout integration (dynamic quantities)
- Vercel Cron compatible worker endpoint at `/api/jobs/process`

## Local setup

1. Install dependencies:

```bash
pnpm install
```

2. Copy `.env.example` to `.env.local` and fill in:

- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXTAUTH_URL` (primary auth base URL)
- `APP_URL` (optional fallback if `NEXTAUTH_URL` is missing)
- `NEXTAUTH_SECRET`
- `AUTH_GOOGLE_ID`
- `AUTH_GOOGLE_SECRET`
- `REPLICATE_API_TOKEN`
- `REPLICATE_MODEL_VERSION`
- `LEMON_SQUEEZY_WEBHOOK_SECRET`
- `LS_CREDIT_VARIANT_ID`: Your Lemon Squeezy variant ID for credits.
- `NEXT_PUBLIC_LS_CREDIT_CHECKOUT_URL`: Your Lemon Squeezy checkout URL.
- `CRON_SECRET`

3. Apply the SQL schema in `supabase/migrations/0001_clipforge.sql` to your Supabase project.

4. In Google Cloud Console, configure an OAuth client with:

- Authorized JavaScript origin: `http://localhost:3000`
- Authorized redirect URI: `http://localhost:3000/api/auth/callback/google`

5. Run the dev server:

```bash
pnpm dev
```

## Netlify production auth setup

Set these environment variables in Netlify (Site configuration → Environment variables):

- `NEXTAUTH_URL=https://clip-forge.netlify.app` (recommended primary)
- `APP_URL=https://clip-forge.netlify.app` (optional fallback)
- `NEXTAUTH_SECRET=<strong random secret>`
- `AUTH_GOOGLE_ID=<Google OAuth client id>`
- `AUTH_GOOGLE_SECRET=<Google OAuth client secret>`
- Supabase env vars (`NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`)

In Google Cloud Console for the same OAuth client:

- Authorized JavaScript origin: `https://clip-forge.netlify.app`
- Authorized redirect URI: `https://clip-forge.netlify.app/api/auth/callback/google`

If the callback URL or auth base URL does not match exactly, Google sign-in will fail with callback/configuration errors.

## Product behavior

- Users sign in with Google OAuth via NextAuth.
- Unpaid users get `2` watermarked demo generations.
- Paid users can render non-demo clips if they have enough credits.
- Credit cost is determined at generation time; the price per credit is configurable in `lib/config.ts`.
- Credits are reserved at queue time, finalized on completion, and refunded on failure.
- Job state machine: `QUEUED -> PROCESSING -> COMPLETED | FAILED`

## Lemon Squeezy Integration

- Checkout links are dynamically generated with `quantity` parameters to support "pay-for-what-you-use".
- Webhook endpoint: `/api/webhooks/lemonsqueezy`
- Webhook handler resolves credits based on the quantity purchased in the order.
- Variant mapping lives in `lib/payments/catalog.ts`

## Tests

```bash
pnpm test
```

Current tests cover:
- Credit cost boundaries and allocation logic.
- Demo gating and job payload creation.
- Lemon Squeezy signature verification and quantity-based credit mapping.
- UI theme support and overall platform behavior.
