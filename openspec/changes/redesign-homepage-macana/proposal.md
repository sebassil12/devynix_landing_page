# Proposal: Macana Visual World Across the Public Site

## Intent

The public site reads as a template, not as evidence. Its primary visitor — an investor doing due
diligence — needs proof of a repeatable method, and today gets client logos, packages and feature
tabs that PRODUCT.md forbids or contradicts. `docs/homepage-brief-macana.md` locks the replacement
world (Macana) and its five non-negotiable disciplines. This change executes that brief.

The site also does not build: `public/images/logos/{dark-logo,light-logo,logo-icon}.svg` are deleted
but still imported by `FullLogo.tsx`, `Logo.tsx` and `Footer.tsx`. Brief discipline #5 requires the
Devynix mark as vector anyway, so the fix belongs here.

## Scope

### In Scope

- Six-band homepage `/[lang]`: ① URDIMBRE · ② EL MÉTODO · ③ LAS BANDAS · ④ DEVYNIX · ⑤ FAQ · ⑥ FLECO.
- Hand-authored vector trace of `Logo Devynix.png` (drawn paths, not autotrace); repairs the broken imports.
- Macana palette + warp band unit reconciled with `.container-1218` (16 files).
- `/[lang]/contact` and `/[lang]/aboutus` carried into the same world; `ContactMap` removed (no public address).
- `PurchaseTemp` and shared `FAQ` redesigned, not merely unlinked.
- WhatsApp deep link `+593 98 787 7191` as the conversion path (net-new).
- `en.json`/`es.json` rewritten in parity, same commit as each unit.

### Out of Scope

- Test framework (none configured; verification is `npx tsc --noEmit`, `pnpm lint`, `pnpm build`).
- Tailwind v4, the unrelated `data-color-theme` switcher, `next.config.mjs` backlog, privacy/terms.
- `es.json` `about.hero.lead` drift (pre-existing, outside `home.*`).

## Capabilities

### New Capabilities

- `macana-visual-system`: palette, warp unit as page grid unit, traced mark, reduced-motion, AA over pine.
- `corridor-figure`: 12-span Cuenca corridor drawn as SVG with `feTurbulence`/`feDisplacementMap`, static props, server-rendered `<table>` fallback.
- `homepage-bands`: the six-band sequence, plate rule (01/02/03), reserved `#D14338` flash, 2–6 band range.
- `whatsapp-conversion`: WhatsApp CTA as primary conversion across all three pages.
- `secondary-pages-macana`: `/contact` and `/aboutus` under the same world, minus `ContactMap`.

### Modified Capabilities

None — `openspec/specs/` is empty; this is the first recorded change.

## Approach

Bottom-up: land the vector mark and the design-system constants first (they unblock the build and
every band), then bands in sequence order, then the shared layout, then the secondary pages. Bands
are inline `<svg>` JSX in existing `"use client"` components — no SVGR, no webpack config. Corridor
data ships as static props; no `Math.random()`/`Date.now()` at render.

## Work Units and Delivery

`delivery_strategy: auto-chain`, `review_budget_lines: 800`. Forecast is additions + deletions,
locale edits included.

| # | Work unit | Key paths | Est. lines |
|---|---|---|---|
| 1 | Traced mark + Macana tokens; repair broken imports | `public/images/logos/*.svg`, `shared/logo/{Logo,FullLogo}.tsx`, `layout/Footer.tsx`, `tailwind.config.ts`, `css/pages/frontpages.css` | ~250 |
| 2 | Band ① URDIMBRE + corridor figure | new `homepage/CorridorWarp.tsx`, `MainBanner.tsx`, locales | ~380 |
| 3 | Bands ② + ③; delete `OurClients`, `FeatureTabs`, `Packages` | `homepage/*`, locales | ~420 |
| 4 | Bands ④ ⑤ ⑥ + FLECO footer/WhatsApp in shared layout | `AboutDevynix.tsx`, `FAQ.tsx`, `ContactBar.tsx`, `(frontend-pages)/layout.tsx`, locales | ~450 |
| 5 | `/contact` + `/aboutus`; remove `ContactMap`; redesign `PurchaseTemp` | `contact/page.tsx`, `aboutus/page.tsx`, `contactus/ContactMap.tsx`, `PurchaseTemp.tsx`, locales | ~350 |

Total ≈ **1850 lines** → `400-line budget risk: High`. Recommended: **Feature Branch Chain** with a
draft tracker PR (a half-Macana homepage must not reach `main`). PR #1 targets the tracker; each
later PR targets its immediate parent. One PR per work unit; five PRs, each under the 800 budget.

## Locale Parity Impact

`home.clients`, `home.featureTabs`, `home.packages` are removed. `home.highlights` folds into ②;
`home.contactBar` folds into ⑥. `home.faq.*` is reworded and is shared with `/aboutus`. Every unit
edits `en.json` and `es.json` in the **same commit** with matching array lengths. Spanish runs ~30%
longer — the `-2086px` marquee offset in `frontpages.css` dies with `Highlights`, not carried over.

## Risks

| Risk | Likelihood | Mitigation |
|---|---|---|
| Traced mark is not faithful to the raster | Med | Draw geometry (strokes, rounded caps, square frame) at `#FFBD59`; compare against the PNG before WU1 lands |
| `.container-1218` change ripples through 16 files | High | WU1 makes the warp unit divide 1218 exactly; no per-component width overrides |
| Displacement filter cost / motion sensitivity | Med | One scroll-entry weave, `prefers-reduced-motion` honored, static filter seeds |
| No-JS corridor fallback silently regresses | Med | Fallback is real server-rendered `<table>` markup, verified in `pnpm build` output |
| Locale array-length drift between EN and ES | Med | Parity check per unit; missing keys render key paths (fail-loud) |
| Chain drift across five stacked PRs | Med | Rebase each child until its diff shows only its own unit |

## Rollback Plan

Each work unit is one commit on its own chain branch, revertible in reverse order (5 → 2) without
touching the others; locale keys return from git history with the same revert. **WU1 is the
exception**: reverting it alone restores the pre-existing build break, so it is reverted only
together with the whole chain. Full rollback = drop the tracker branch; `main` is untouched until
the chain integrates.

## Dependencies

- None new. No package installs, no Tailwind upgrade, no test runner.
- Non-blocking external: `geoai.sebastiansilva.dev` has no SPA fallback rewrite, so bands ① and ②
  link to its root URL only.

## Success Criteria

- [ ] `npx tsc --noEmit`, `pnpm lint`, `pnpm build` all pass (the build passes for the first time).
- [ ] Warp band unit and the page content width are the same number.
- [ ] `#D14338` appears only on urgent/active states; all three products carry a numbered plate.
- [ ] Corridor renders from static data and degrades to a real table with JS disabled.
- [ ] `en.json` and `es.json` have equal leaf-key sets and array lengths; no hardcoded visible strings.
- [ ] WhatsApp deep link is reachable from all three pages; no address and no unattributable claim ships.
