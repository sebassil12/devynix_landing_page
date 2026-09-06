# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary visitor: **investors and partners evaluating Devynix as a company** — not
product buyers. They arrive to judge whether Devynix is a real, credible technology
company worth backing, partnering with, or referring. Their job is due diligence:
understand what Devynix does, whether the portfolio thesis holds, and who to talk to.

Secondary audiences reach the site but are not who the homepage is optimized for:

- **GeoNix prospects** — SMEs, public-sector-adjacent organizations and industry
  players in Latin America with geospatial / land-use problems (B2B/B2G).
- **FinNix prospects** — individuals and micro-entrepreneurs in Latin America
  looking for personal finance and budgeting tooling (B2C).

## Product Purpose

Devynix is a technology company that identifies important problems inside specific
industries and solves them with focused software products. This repository is the
public bilingual (EN/ES) marketing site for that portfolio — it is not an
application.

Two products are active today:

- **GeoNix** — geospatial / GIS technology for environmental and land-use
  intelligence, aimed at organizations and public-sector-adjacent workflows.
- **FinNix** — personal finance and budgeting for individuals and
  micro-entrepreneurs.

Success for the site is an investor or partner finishing a visit convinced Devynix is
legitimate and specific, and starting a conversation over WhatsApp.

## Positioning

Devynix is defined by the industry problem, not by a technology stack. Technology can
change, industries can change, and products can be created, pivoted, retired or
replaced — the portfolio thesis is the durable claim. Devynix is explicitly not a
generic software agency and not a generic "AI company".

## Operating Context

- Market is Latin America; the company was founded in 2025.
- The site is fully public and static: no authentication, no login, signup,
  dashboard, sessions, protected content, or API routes.
- Every visible string comes from `src/locales/en.json` and `src/locales/es.json`.
  EN and ES ship together, in the same commit, with matching array lengths. A missing
  key renders its key path so breakage is visible.
- Routes live under `/[lang]` where `lang ∈ {en, es}`: homepage, `/contact`,
  `/aboutus`, plus a localized server-rendered 404.

## Capabilities and Constraints

- Next.js 16.3.3 (App Router), React 19.2, TypeScript 5, Tailwind CSS 3.4.4,
  flowbite-react 0.10.1. Deploys to Vercel; a self-hosted VPS via Coolify is the
  later target.
- Tailwind stays on v3.4.4 — a v4 migration breaks flowbite-react 0.10.1 and the
  `src/app/css/` layer structure. It needs its own decision.
- The root layout owns `<html>`/`<body>`; moving them into `[lang]/layout.tsx` ships
  the 404 with an empty body and no `lang` attribute.
- **Primary conversion is a WhatsApp deep link**, not a form. CTAs route to
  `+593 98 787 7191`. The existing `ContactForm.tsx` has no `<form>`, no handler and
  no destination; it is not the conversion path.
- Bilingual EN/ES parity is a hard requirement, not a nice-to-have.

### Explicitly undecided

- **No public physical address.** `ContactMap.tsx` currently embeds a New York
  Google Maps query that is not Devynix's location. Do not present any address as
  real until one is confirmed.
- **No public phone line** beyond the WhatsApp number.
- Whether more products join GeoNix and FinNix, and on what horizon.

## Brand Commitments

- Name: **Devynix**. Products: **GeoNix**, **FinNix**.
- Tagline: "Industry-focused technology products".
- Values: industry first, evidence-driven, focused products, adaptability,
  technical excellence.
- Voice: clear, objective, problem-oriented. No hype, no generic "AI company"
  claims. Canonical source is `memory/brand_core.json`; product facts are in
  `memory/product_catalog.json`. Copy must stay consistent with both.
- Logos: `public/images/logos/Logo Devynix.png` (master mark), `finnix-192.png`,
  `finnix-512.png`. The Devynix mark is a **woven textile glyph** — interlaced
  strokes inside a square frame — in amber `#FFBD59`. FinNix uses deep pine
  `#204747` with amber `#F6C751`. These are measured from the files, not chosen.

## Evidence on Hand

**Real and publishable:**

- Founded 2025.
- Support / general email: `devynixcorp@gmail.com`.
- WhatsApp: `+593 98 787 7191`.
- Facebook: `https://www.facebook.com/profile.php?id=61577856333772`
- Instagram: `https://www.instagram.com/devynix12/`
- TikTok: `https://www.tiktok.com/@devynix`
- Product descriptions and audiences in `memory/product_catalog.json`.

**Absent — must not be fabricated:**

- No customer testimonials, no third-party client logos, no card-processor logos, no
  team portraits. All four were deleted from this site for being unattributable.
  Do not reintroduce them, including as placeholders.
- No case studies, benchmarks, revenue figures, headcount, or customer counts.
- No LinkedIn or X/Twitter profile. Only Facebook, Instagram and TikTok exist.
- No public address. No pricing.
- `about.achievement` currently holds true-but-placeholder figures; treat them as
  unverified.
- No privacy policy or terms exist.

## Product Principles

1. **Claims must be backable.** A logo, quote, statistic or testimonial ships only
   when it is attributable and true. Absence is stated, never filled with a
   placeholder.
2. **Credibility over persuasion volume.** The primary visitor is doing due
   diligence; specificity beats superlatives.
3. **Industry problem first, technology second.** Lead with the problem being solved,
   not the stack solving it.
4. **The portfolio is the story.** GeoNix and FinNix are evidence of a repeatable
   method, not two unrelated bets.
5. **Bilingual parity is structural.** Nothing ships in one language only.

## Accessibility & Inclusion

No product-specific standard has been established. Baseline WCAG AA contrast and
keyboard operability apply. Both locales must be equally usable; `lang` attributes
must stay correct per route, which is why the root layout owns `<html>`.
