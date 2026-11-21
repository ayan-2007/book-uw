# The Limitless Black Book

The marketing site for **The Limitless Black Book** by Farhan Khawaja, PhD — a
21-day neuroscience protocol for fear, comfort and status.

The site is a statically rendered Next.js application with a single long-form
landing page, a policies page, and a small set of metadata routes.

## Stack

- **Next.js 16** (App Router, static prerendering)
- **React 19** and **TypeScript**
- **Tailwind CSS 3** for utilities, with a custom CSS design system in
  `app/globals.css`
- **next/font** — Newsreader for editorial display type and Geist for UI/body
  type
- **next/image** with `sharp` for AVIF/WebP delivery

## Local development

Requirements: Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

The site runs at `http://localhost:3000`.

Available scripts:

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run typecheck` | Run TypeScript without emitting files |

## Environment variables

Copy `.env.example` to `.env.local` and fill in the values you need.

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_CHECKOUT_URL` | Recommended | Checkout destination for every buy button. Falls back to the on-page offer when omitted. |
| `NEXT_PUBLIC_SALE_END` | Optional | ISO 8601 timestamp. Shows the countdown only when the date is valid and still in the future. |
| `NEXT_PUBLIC_NOINDEX` | Optional | Set to `true` to add `noindex` metadata and block crawlers. |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical origin used by metadata, Open Graph and the sitemap. |

## Content and structure

- `app/page.tsx` — all landing-page sections and their copy.
- `app/policies/page.tsx` — contact, privacy, terms, refunds and shipping.
- `data/locks.ts` — the three locks, their protocols and outcomes.
- `data/testimonials.ts` — reader quotes and attribution.
- `lib/site.ts` — product name, author, email, prices and checkout URL.
- `lib/images.ts` — image metadata and alt text.
- `public/img/` — all editorial imagery used by the page.
- `download-images.mjs` and `scripts/generate-placeholder-art.mjs` — asset
  utilities kept with the project.

## Routes

| Route | Description |
| --- | --- |
| `/` | Landing page |
| `/policies` | Policies and contact |
| `/sitemap.xml` | Generated sitemap |
| `/robots.txt` | Generated robots file |
| `/manifest.webmanifest` | Web app manifest |
| `/opengraph-image.jpg` | Social sharing image |

## Build and deploy

```bash
npm run build
npm run start
```

The build is fully static. Deploy to Vercel or any Node host that supports
Next.js, and set the `NEXT_PUBLIC_*` variables in the hosting environment before
the production build.

## Editorial rules

All product facts, prices, guarantees, testimonials and author credentials shown
on the site come from the source content. Do not add claims, testimonials or
pricing that are not in the project data. See `UI_DESIGN_RULES.md` for the visual
and accessibility rules used by the redesign.
