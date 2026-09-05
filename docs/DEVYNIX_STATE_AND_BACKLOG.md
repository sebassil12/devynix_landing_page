# Devynix — State & Backlog

Canonical textual spec for this repository. Update this file when the spec changes;
treat it as the reference future sessions read before making changes.

Last updated: 2026-09-05

---

## Current Spec & Architecture

Public, bilingual (EN/ES) marketing site for Devynix and its product portfolio
(GeoNix, FinNix, future products). Not an application: no accounts, no protected
content, no data layer.

**Stack** — Next.js 16.3.3 (App Router) · React 19.2 · TypeScript 5 ·
Tailwind CSS 3.4.4 · flowbite-react 0.10.1. Deploy target: Vercel now,
self-hosted VPS via Coolify later (`output: 'standalone'` is the enabling change,
not yet applied — see backlog).

**Routes** (all under `/[lang]`, `lang ∈ {en, es}`)

| Path | Purpose |
|---|---|
| `/[lang]` | Homepage |
| `/[lang]/contact` | Contact page (breadcrumb, map, form) |
| `/[lang]/aboutus` | Company story |
| `not-found` | Global 404, localized, server-rendered |

**Layout hierarchy** — deliberate, do not flatten:

- `src/app/layout.tsx` — root. Owns `<html>`/`<body>`, fonts, theme script.
  Reads locale from the `x-locale` header because it has no route params.
  Its `generateMetadata` supplies the 404 title/description; every real page
  overrides it.
- `src/app/[lang]/layout.tsx` — dictionary + theme providers only. Calls
  `notFound()` on an unsupported locale segment.
- `src/app/[lang]/(frontend-pages)/layout.tsx` — announcement bar, header, footer.
- `src/app/not-found.tsx` — global 404. Server component; locale from `x-locale`.

**Homepage section order** (mirrors `home.*` key order in the locale files):

```
banner → clients → featureTabs → highlights → packages
       → about → contactBar → faq → purchase
```

**Components** — `src/app/components/front-pages/homepage/`:
`MainBanner`, `OurClients`, `FeatureTabs`, `Highlights`, `Packages`,
`AboutDevynix`, `ContactBar`, `FAQ`, `PurchaseTemp`.

**Localization** — `src/locales/en.json` and `src/locales/es.json` are the single
source of truth for every visible string. Current state: 104 leaf keys each,
0 EN-only, 0 ES-only, 0 unresolved references, 0 array-length mismatches,
0 unreferenced keys. `src/middleware.ts` handles locale routing and sets the
`x-locale` request header. `src/i18n/provider.tsx` exposes `t()` and `tList<T>()`;
a missing key renders the key path, so breakage is visible rather than silent.

**Brand memory** — `memory/brand_core.json`, `memory/brand_core.md`,
`memory/product_catalog.json`. Copy must stay consistent with these files.

**Quality gates** — `npx tsc --noEmit` clean, `pnpm lint` 0 errors / 4 warnings
(all pre-existing template code), `pnpm build` succeeds, 8 static pages.

---

## Decisions Made

**No unearned trust signals.** Deleted outright — components and locale keys,
git history is the archive:

- `ClientReviews` — testimonials attributed to unnamed "partner organizations".
- `OurTeam` — four stock portraits under one generic entry.
- `Companies` — Intel/Oracle/Dell/Samsung/Infosys/Capgemini logos, none customers.
- `Payments` — Visa/Mastercard/PayPal/Amex logos on a site with no checkout.

Rule going forward: a logo, quote, or number ships only when it is attributable
and true. This is the project's sharpest constraint — it overrides conversion
tactics that assume social proof exists.

**Landing-only.** No auth, signup, dashboard, or protected content. Removed the
"Log in" buttons (they linked to the page they sat on), all `/api/*` handlers
(blog + userprofile mock data), `BlogContext`, `UserDataContext`, and the
`(DashboardLayout)` route group. Its three surviving shared files moved to
`src/app/components/shared/`.

**Removed non-spec routes.** `/blog`, `/blog/detail/[slug]`, `/portfolio`,
`/pricing`, `/landingpage` (an unlinked parallel homepage) and their component
trees. Kept: home, contact, aboutus, 404.

**Fabricated figures replaced.** `about.achievement` claimed "2019 · when we
founded Devynix", "300k+ customers", "25k+ products built". Now
`2 active products · 2 industries served · LATAM`, all verifiable from
`product_catalog.json`. The founding year was dropped rather than guessed.

**Template residue cleared.** Lorem ipsum, invented customer counts
(45.000 / 52.589), template pricing (49 $ / 89 $), fake team names, and MaterialM's
Discord invite are gone from both locales.

**Dead links fixed.** Hero CTA, closing CTA, aboutus CTAs and FAQ CTAs all pointed
at the page they sat on or at MaterialM's Discord. Now `/[lang]/contact` and
`#products`.

**Unused dependencies removed.** `aos`, `chance`, `date-fns`, `lodash`,
`react-icons`, `swr`, plus three `@types` packages.

**Root layout exists on purpose.** Without it, `not-found.tsx` shipped an empty
body — content arrived only after hydration, `<html>` lost its `lang`, and a
`[lang]`-scoped not-found never fired for genuinely unmatched paths. Moving
`<html>`/`<body>` to a root layout fixed server rendering, the `lang` attribute,
and double-rendering in one change. Do not move them back into `[lang]`.

**Non-Claude agent installs removed.** `.codeium/`, `.copilot/`, `.gemini/`,
`.windsurf/`, `.config/`, `.atl/` — 376 files, all gentle-ai SDD mirrors. Kept
`.claude/` and `.mcp.json`.

---

## Open Backlog

Ordered by what blocks a real launch.

1. **Wire the contact form.** `ContactForm.tsx` renders inputs and a submit button
   with no `<form>` element, no handler, and no destination. Every CTA on the site
   points here. Decide: a POST route handler with an email provider, a third-party
   form service, or replace the form with a `mailto:` link and a stated response time.

2. **Fix the contact map.** `ContactMap.tsx` embeds a Google Maps iframe for
   *New York* — literally `q=newyork+(My%20Businnewyoess%20Name)`. Either point it
   at a real location or remove the section; a wrong address is worse than none.

3. **Supply the missing brand facts.** Founding year, whether Devynix has a public
   address, and the real support channels. `about.achievement` currently carries
   placeholder-but-true figures; they should become real ones.

4. **Footer social links go nowhere.** All three (`facebook`, `twitter`,
   `instagram`) are `href="/"`. Point them at real profiles or delete the block.

5. **Announcement bar says "New pages available."** Template copy linking to the
   homepage. Give it a real message or remove the component from the layout.

6. **Add `output: 'standalone'` to `next.config.mjs`.** Inert on Vercel, required
   for the Coolify Docker build later. One line now avoids a migration then.
   Also flip `reactStrictMode` back to `true` — it was disabled by the template,
   and the components that would have failed under it are gone.

7. **Add privacy policy and terms pages, or confirm they are not needed.** The
   footer links to them were removed because the routes never existed. A contact
   form collecting names, emails and phone numbers usually needs a privacy notice.

8. **English is missing pages Spanish never had.** Both locales are at parity now,
   but that parity was reached by deleting; if blog or pricing return, both files
   must be written together.

---

## Nice-to-Have / Future Ideas

- **Blog / news section.** Previously scoped as "later". The old implementation
  ran on a mock API and was removed; a real one would need a content source.
- **Tailwind v4 migration** (`SPEC-0001`). Out of scope by standing decision.
  Breaks `flowbite-react@0.10.1` and the `src/app/css/` layer structure; needs its
  own spec.
- **Repurpose `Packages` as engagement models.** Currently "Product collaboration /
  Product pilot / Strategic partnership", all priced "Contact us". Note the tension:
  `faq.items[1]` says Devynix is *not* a generic software agency, while this section
  sells pilots and partnerships. Resolve both together.
- **`FeatureTabs` heading vs. FinNix.** Reads "Built for specific industries", but
  FinNix targets individuals and micro-entrepreneurs. Accurate for GeoNix, strained
  for a consumer app.
- **Clear the 4 remaining lint warnings** — `eslint.config.mjs` anonymous export,
  unused `activeMode` in `CardBox`, an `any` in `CustomizerContext`, unused
  `actionTypes` in `use-toast`. All inherited, none load-bearing.
- **Structured data / OG images.** No `openGraph` metadata or JSON-LD anywhere yet.
- **Sitemap and robots.** Neither exists; both are cheap in the App Router.
- **Automate the i18n audit.** The parity and unresolved-key checks currently run
  as ad-hoc scripts. A `pnpm i18n:check` in CI would stop drift from returning.

---

## Working Rules

- Locales are the source of truth for copy. No hardcoded user-facing strings.
- EN and ES change together, in the same commit, with matching array lengths.
- Copy is checked against `memory/brand_core.json` — problem-oriented, no hype,
  no generic "AI company" claims.
- Deleted code is not commented out. Git history is the archive.
- After any structural change: `npx tsc --noEmit`, `pnpm lint`, `pnpm build`.
