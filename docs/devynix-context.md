# Devynix — Project Context

The single context doc for this repo. Read it before changing anything; update it
when something here stops being true.

`PRODUCT.md` (repo root) holds confirmed product truth — audience, conversion, and
the explicit list of facts that must never be fabricated. `docs/homepage-brief-macana.md`
holds the locked visual brief. Spec-driven artifacts for the Macana redesign live under
`openspec/changes/redesign-homepage-macana/`; this doc stays the entry point.

Last updated: 2026-09-06

**Skills kept (uncertain)** — pruned `.claude/skills/` down to this stack; these were
left in place deliberately:

- `go-testing`, `gentle-ai-bench` — removed from this repo, but still indexed from
  `~/.config/opencode/skills/`. That path is machine-global and shared with every
  other project, so pruning it is not this repo's call.
- `rdd-defect-workflow` — gentle-ai's own receipt-driven-development workflow.
  Language-agnostic, but oriented at the gentle-ai repo rather than this site.
- `branch-pr`, `issue-creation`, `systemic-issue-triage`, `comment-writer` — general
  GitHub workflow skills, authored by gentle-ai but not tied to its stack.
- `sdd-*` — several carry Go, Python and Rust snippets as *examples*; the skills
  themselves are language-agnostic.

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

**Homepage order** — the six Macana bands:

```
① URDIMBRE → ② EL MÉTODO → ③ LAS BANDAS
→ ④ DEVYNIX → ⑤ FAQ → ⑥ FLECO (in the shared layout)
```

Components in `src/app/components/front-pages/homepage/`: `MainBanner`, `Metodo`,
`Bandas`, `AboutDevynix`, `FAQ`. The shared warp system lives in
`front-pages/macana/`: `warp.ts`, `DevynixMark.tsx`, `WarpBand.tsx`, `IkatEdge.tsx`,
`CorridorFigure.tsx`, `Fleco.tsx`, `corridor.ts`, `products.ts`, `contact-links.ts`,
`cta.ts`.

Deleted in the redesign: `OurClients`, `FeatureTabs`, `Packages`, `Highlights`,
`ContactBar`, `PurchaseTemp`, `ContactMap`, `FrontBreadcrumb`.

**The warp unit is the page grid unit.** `WARP` is 42px and `WARP_THREADS` is 29, so
`.container-1218` keeps its name and its 1218px width literally true. `WARP_STROKE`
(20) is derived from `MARK_STROKE_RATIO` (0.48), measured off the vector logo — not
chosen. Never hardcode 42, 1218 or 20; import from `macana/warp.ts`.

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

Resolved by the Macana redesign: the dead contact form (now a WhatsApp deep link to
`+593 98 787 7191` plus `devynixcorp@gmail.com`), the New York map (`ContactMap`
deleted — no public address exists), the missing brand facts (founded 2025; socials
are Facebook, Instagram and TikTok only, no LinkedIn or X), the dead footer links,
and the `Packages`/FAQ contradiction (`Packages` deleted).

Still open:

- **Announcement bar** still says "New pages available" and links to the homepage.
- **Never visually verified**: the `.container-1218` padding change from 20px to one
  warp unit (42px), which reaches all 16 consuming files; and a throttled-mobile paint
  check for the `feTurbulence`/`feDisplacementMap` ikat filter. Neither has an
  automated equivalent in this repo.
- **`impeccable` sits in production `dependencies`** in `package.json`. It is a design
  tool the site never imports at runtime; it belongs in `devDependencies`.
- **`geoai.sebastiansilva.dev` has no SPA fallback rewrite** — deep links return
  server 404s, so bands ① and ② can only link to its root URL until `/* → /index.html`
  is added there.
- **`next.config.mjs`** needs `output: 'standalone'` for the later Coolify deploy
  (inert on Vercel), and `reactStrictMode` back to `true`.
- **Privacy policy / terms** — absent, while the contact form collects names, emails
  and phone numbers.
- **98 lint warnings** remain, all inherited template code, none load-bearing and
  none in redesigned files.
