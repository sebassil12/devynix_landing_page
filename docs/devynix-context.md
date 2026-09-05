# Devynix — Project Context

The single context doc for this repo. Read it before changing anything; update it
when something here stops being true. There is no separate spec, plan, or task tree,
and this project does not need one.

Last updated: 2026-09-05

---

## Purpose

Devynix is a technology company that finds important problems in specific industries
and solves them with focused software products. Two products today: **GeoNix**
(geospatial and land-use intelligence, B2B/B2G) and **FinNix** (personal finance for
individuals and micro-entrepreneurs, B2C). More may follow; products can be pivoted
or retired.

This repo is the **public marketing site** for that portfolio — bilingual (EN/ES),
aimed at Latin America. It is not an application. Current focus: an honest landing
page plus working contact and about pages.

Brand facts live in `memory/brand_core.json` and `memory/product_catalog.json`.
Copy must stay consistent with them.

---

## Architecture at a glance

**Stack** — Next.js 16.3.3 (App Router) · React 19.2 · TypeScript 5 ·
Tailwind CSS 3.4.4 · flowbite-react 0.10.1. Deploys to Vercel; a self-hosted VPS
via Coolify is the later target.

**Routes** — all under `/[lang]`, where `lang ∈ {en, es}`:

| Path | Purpose |
|---|---|
| `/[lang]` | Homepage |
| `/[lang]/contact` | Contact page |
| `/[lang]/aboutus` | Company story |
| `not-found` | Global 404, localized, server-rendered |

**Layouts** — three levels, deliberate:

- `src/app/layout.tsx` — root. Owns `<html>`/`<body>`. Gets the locale from the
  `x-locale` header (it has no route params). Its metadata is the 404 title;
  real pages override it.
- `src/app/[lang]/layout.tsx` — dictionary + theme providers. `notFound()` on an
  unsupported locale.
- `src/app/[lang]/(frontend-pages)/layout.tsx` — announcement bar, header, footer.

**Homepage order** — mirrors the `home.*` key order in the locale files:

```
banner → clients → featureTabs → highlights → packages
       → about → contactBar → faq → purchase
```

Components in `src/app/components/front-pages/homepage/`: `MainBanner`,
`OurClients`, `FeatureTabs`, `Highlights`, `Packages`, `AboutDevynix`,
`ContactBar`, `FAQ`, `PurchaseTemp`.

**Locales** — `src/locales/en.json` and `es.json` are the only source of visible
strings. Currently 104 leaf keys each, full parity, nothing unresolved.
`src/middleware.ts` routes by locale and sets `x-locale`. `src/i18n/provider.tsx`
exposes `t()` and `tList<T>()`; a missing key renders the key path, so breakage
shows up instead of failing silently.

---

## Rules

- **Claims must be backable.** A logo, quote, statistic or testimonial ships only
  when it is attributable and true. Testimonials, a stock-portrait team, third-party
  client logos and card-processor logos were all deleted for failing this. Do not
  reintroduce them as placeholders.
- **No auth.** No login, signup, dashboard, sessions or protected content. All API
  routes were removed; the site is fully public and static.
- **Locales are the source of truth for copy.** No hardcoded user-facing strings.
  EN and ES change together, in the same commit, with matching array lengths.
- **Tone follows `brand_core.json`** — problem-oriented, no hype, no generic
  "AI company" claims.
- **Delete, don't comment out.** Git history is the archive.
- **After any structural change:** `npx tsc --noEmit`, `pnpm lint`, `pnpm build`.
- **Don't move `<html>`/`<body>` into `[lang]/layout.tsx`.** Without a root layout,
  the 404 ships an empty body and loses its `lang` attribute.
- **Tailwind stays on v3.4.4.** A v4 migration breaks flowbite-react 0.10.1 and the
  `src/app/css/` layer structure; it needs its own decision, not a drive-by upgrade.

---

## Open backlog

- **Contact form is dead** — `ContactForm.tsx` has no `<form>`, no handler, no
  destination, and every CTA points at it. Pick: route handler + email provider,
  a form service, or a `mailto:` link.
- **Contact map shows New York** — `ContactMap.tsx` embeds
  `q=newyork+(My%20Businnewyoess%20Name)`. Fix the location or drop the section.
- **Missing brand facts** — founding year, whether there is a public address, real
  support channels. `about.achievement` holds true-but-placeholder figures.
- **Footer social links** all point at `href="/"`. Real profiles or delete the block.
- **Announcement bar** still says "New pages available" and links to the homepage.
- **`next.config.mjs`** needs `output: 'standalone'` for the later Coolify deploy
  (inert on Vercel), and `reactStrictMode` back to `true`.
- **Privacy policy / terms** — absent, while the contact form collects names, emails
  and phone numbers.
- **`Packages` vs. FAQ contradiction** — the section sells pilots and partnerships
  while `faq.items[1]` says Devynix is not a generic software agency.
- **4 lint warnings** remain, all inherited template code, none load-bearing.
