# Design: Macana Visual World Across the Public Site

## Technical Approach

One geometry module (`macana/warp.ts`) exports the numbers the mark, the page grid, the corridor
figure and the fringe are all built from. Every Macana surface reads those constants, so brief
discipline #5 ("the weave IS the logo enlarged") is a code dependency, not a claim. Bands become
**server components**; the only motion is CSS scroll-driven, so the no-JS corridor fallback is real
server DOM by construction rather than by discipline.

## Architecture Decisions

### D1 — Warp unit = 42px; `.container-1218` keeps its name and is redefined in terms of it

1218 = 2·3·7·29. The only divisors legible as a woven band at page scale are 21, 29, 42.

| Unit | Threads | Tradeoff |
|---|---|---|
| 14px | 87 | Reads as hatching, not weave; 3× filter/DOM cost. |
| 21px | 58 | Odd spacing base; 2× thread count for no visual gain. |
| **42px** | **29** | Pitch legible at page scale; prime thread count (no accidental mirror); 42 = 6·7 so 21/14/7 are integer sub-steps. **Chosen.** |
| 58px / 87px | 21 / 14 | Coarse; gutters swallow the content column. |

Migration for the 16 files: **keep the class name, redefine the rule.** `29 × 42 = 1218` exactly, so
the name stays literally true and the 16-file diff is zero — it does not smear across all five PRs.

```css
:root { --warp: 42px; --warp-threads: 29; }
.container-1218 {
  max-width: calc(var(--warp) * var(--warp-threads)); /* 1218px, unchanged */
  padding-inline: var(--warp);                        /* was 20px */
}
@media (max-width: 767px) { .container-1218 { padding-inline: calc(var(--warp) / 2); } }
```

Content box becomes 27 units (1134px) with one-unit gutters, so content sits on the warp. Rejected:
renaming to `max-w-warp` across 16 files (pure churn, breaks slice cohesion); changing 1218 to 1200
(gratuitous visual change to header/footer/contact/aboutus, outside the brief).

### D2 — The mark is a React component sharing constants with the page warp

The raster is 45° strokes with round caps on a regular lattice inside a square frame. It is redrawn
as JSX paths in `macana/DevynixMark.tsx` (viewBox `0 0 84 84`, lattice pitch 6, stroke-width 4,
`stroke-linecap="round"`, `#FFBD59`). **No `.svg` file and no `next/image`**: an `<img>` cannot share
a stroke scale with the page, which is precisely what discipline #5 requires.

```ts
export const MARK_PITCH = 6, MARK_STROKE = 4, WARP_SCALE = 7;
export const WARP = MARK_PITCH * WARP_SCALE;         // 42  — page grid unit
export const WARP_STROKE = MARK_STROKE * WARP_SCALE; // 28  — page thread width
export const PAGE_WIDTH = WARP * 29;                 // 1218
```

`Logo.tsx`, `FullLogo.tsx` and `Footer.tsx` drop the three missing-file imports and render
`<DevynixMark/>` — this is what unbreaks the build. Rejected: autotrace (brief forbids), committing a
static `.svg` (loses the shared scale, keeps three near-duplicate assets).

### D3 — Corridor: static data, server component, `<table>` is the source of truth

`"use client"` is **dropped** on every band. Bands are pure output; `page.tsx` already awaits
`getDictionary(lang)` for metadata, so it passes the dict slice down as props.

> **Declared deviation.** `proposal.md` assumed bands stay inside the existing `"use client"`
> components. This supersedes that assumption. It is not required by the no-JS spec requirement —
> client components are server-rendered too — but D8 removes the last need for client interactivity,
> so keeping the directive would leave a client bundle nothing uses. Figures live in
`macana/corridor.ts` as a frozen literal — no `Math.random()`, no `Date.now()`, no fetch.

```ts
export type Span = { id: string; status: "urgent" | "action" | "stable"; risk: number };
export const CORRIDOR = { name: "Cuenca", riskIndex: 616, spans: [/* 12: 3 urgent, 7 action, 2 stable */] } as const;
```

Layout is grid-locked: span width `WARP` (42), pitch `2·WARP` (84), first span at `3·WARP` (126) —
extent 966, margins 126 each side, all integer multiples of 42.

The `<table>` is not a conditional branch. Both the `<svg>` (`aria-hidden`) and the `<table>`
(`.sr-only`) are unconditionally server-rendered from the same literal, so neither depends on
JavaScript and the two can never disagree. With JS off the SVG still paints — it is HTML, not a
mount — and the table remains the readable figures for screen readers and for any client that drops
the SVG. Rejected: rendering the table only in a `<noscript>` (invisible to screen readers, and
untestable from build output).

```mermaid
sequenceDiagram
    participant B as Browser
    participant N as Next server
    participant P as page.tsx (server)
    participant C as CorridorFigure (server)
    B->>N: GET /es
    N->>P: render, await getDictionary("es")
    P->>C: <CorridorFigure data={CORRIDOR} copy={dict.home.urdimbre} />
    C-->>P: <svg aria-hidden> + <table> (same figures)
    P-->>B: HTML with both, zero JS for this band
    Note over B: JS off → table visible, figures intact
    Note over B: JS on → CSS only; no hydration, no layout shift
```

### D4 — Ikat edge as a reusable filter primitive, with a proposed perf budget

`macana/IkatEdge.tsx` emits one `<defs>` block once per page with two static-seed filters and applies
them via CSS so the cost can be dialled by media query without JS:

```xml
<filter id="ikat-hi"><feTurbulence type="fractalNoise" baseFrequency="0.02 0.06"
  numOctaves="2" seed="616" result="n"/><feDisplacementMap in="SourceGraphic" in2="n"
  scale="21" xChannelSelector="R" yChannelSelector="G"/></filter>
<!-- ikat-lo: numOctaves="1", scale="10" -->
```

No perf budget exists in this repo, so this change proposes one:

| Rule | Value |
|---|---|
| Filtered element height | ≤ 1 warp unit (42px). Never a whole band, never text, never an image. |
| Filtered surfaces per page | ≤ 8 (5 interior band edges, 2 page edges, 1 fringe). |
| Mobile ≤767px | `filter: url(#ikat-lo)` via media query — one octave, half displacement. |
| **Hard rule** | A filtered element MUST NOT also be animated or transformed. Filter + animation forces per-frame re-rasterisation; static filters paint once. |

Enforcement is structural (count `url(#ikat-` occurrences) plus one throttled-mobile DevTools paint
check recorded in WU2's evidence. Rejected: CSS `blur()` (brief forbids), animated `seed` (unbounded
cost, and it is motion the brief did not ask for).

### D5 — FLECO generated from the product count, in the shared layout

`macana/products.ts` holds the three products with their plates (01/02/03); `Fleco.tsx` hangs 29
strands (one per warp thread) gathered into `PRODUCTS.length` bundles with knots at
`round(29·k/n)`. Strand length is a pure function of thread index and distance to its knot, so
adding a fourth product visibly re-knots the fringe. Holds 2–6 by construction.

It lives in `(frontend-pages)/layout.tsx`, so all three pages get it. **`PurchaseTemp.tsx` is deleted
and its job is absorbed here** — `/contact` and `/aboutus` gain a better closing CTA than they lose,
which is what "redesigned, not merely unlinked" has to mean once the CTA is layout-owned.

> **Declared deviation.** `specs/secondary-pages-macana/spec.md` says the redesigned `PurchaseTemp`
> "MUST NOT remove their presence". This design satisfies that requirement's *scenario* — both pages
> keep a working closing CTA — but not its description's literal wording, because the component file
> is deleted. `docs/homepage-brief-macana.md` lists `PurchaseTemp` under Removed, and the locked
> brief is the resolving authority. The spec text is corrected to match.

### D6 — The redundant `<Flowbite>` wrapper: removing it belongs in this change

Not as cleanup. `(frontend-pages)/layout.tsx` must become a server component to `await
getDictionary(lang)` for the FLECO; `<Flowbite>` is client-only and is the thing preventing that. It
is already provided by `[lang]/layout.tsx`, so the duplicate is removed because it blocks D5, not
because it is ugly.

### D7 — Locale key tree; shared copy leaves `home.*`

`FAQ` and the closing CTA are used by three pages, so keeping their strings under `home.*` is the
bug that made this scope ambiguous in the first place.

```
home.urdimbre { eyebrow, title, lead, table{caption,colSpan,colStatus,colRisk}, status{urgent,action,stable}, cta }
home.metodo   { eyebrow, title, steps[3]{title,body}, note }          ← absorbs home.highlights
home.bandas   { eyebrow, title, products[3]{plate,name,claim,proofLabel} }
home.devynix  { eyebrow, title, body, founded, country }              ← from home.about
shared.faq    { title, items[6]{question,answer}, stillHaveQuestion, contactCta, or, emailCta }
shared.cta    { title, lead, whatsappCta, emailCta }   ← FLECO; absorbs home.contactBar + home.purchase
```

Deleted: `home.{banner,clients,featureTabs,packages,highlights,about,contactBar,purchase,faq}`.
Figures (12, 3, 7, 616) stay in `corridor.ts` and reach copy through the existing `t(path, vars)`
interpolation — one source for the number, one source for the sentence.

Spanish +30% is a layout constraint, not a copy one: no fixed-width text box anywhere; plates use
`min-inline-size` in warp units and wrap; EN step bodies cap at ~140 chars so ES stays ≤180 in a
9-unit column. The `-2086px` marquee offset dies with `Highlights`.

### D8 — Motion: zero JavaScript

```css
@keyframes warp-weave { from { clip-path: inset(0 100% 0 0) } to { clip-path: inset(0 0 0 0) } }
.macana-band__warp { animation: warp-weave 900ms linear both;
  animation-timeline: view(block); animation-range: entry 0% cover 30%; }
@media (prefers-reduced-motion: reduce) { .macana-band__warp { animation: none } }
```

Where `animation-timeline` is unsupported the animation falls back to the document timeline and plays
once on load with `both` holding the final state — degradation, not breakage. Rejected:
IntersectionObserver (re-clients every band to buy a fallback CSS already gives). Per D4 the animated
warp layer is a **sibling** of the filtered edge layer, never the same element.

### D9 — AA over pine: measured, and `#D14338` is not a text colour

**Hard constraint:** raw cotton `#F0EBE0` MUST NEVER sit behind amber `#FFBD59`. That pair measures
1.40:1 — unusable at any size, for text or for graphics. Raw cotton is a foreground colour over the
pine ground only; no surface in this design inverts it, and none may.

| Pair | Ratio | Verdict |
|---|---|---|
| `#F0EBE0` on `#0E2422` | 13.7:1 | Body copy. |
| `#FFBD59` on `#0E2422` | 9.8:1 | Figure, threads, focus rings. |
| `#D14338` on `#0E2422` | **3.5:1** | Fails AA normal text. Graphics and ≥18.66px/700 only. |
| `#F0EBE0` on `#D14338` | **3.9:1** | Fails AA normal text. |

The flash colour fails AA normal text against every other palette member. The brief's flash-coloured
WhatsApp CTA therefore ships as `#D14338` fill with a `#F0EBE0` label at **19px/700** (AA-Large,
3.9 ≥ 3.0). This is a hard constraint, not a preference: shrinking that label below 18.66px breaks AA.

## Data Flow

```
warp.ts ──┬─→ DevynixMark ──→ Logo / FullLogo / Footer   (build fix)
          ├─→ macana.css (--warp) ──→ .container-1218 (16 files, untouched)
          ├─→ WarpBand ──→ bands ①–⑥ ──→ IkatEdge (static defs)
          ├─→ CorridorFigure ←── corridor.ts (frozen figures)
          └─→ Fleco       ←── products.ts (count → knots)

page.tsx (server) ─ getDictionary(lang) ─→ dict slices ─→ bands (props, no context)
layout.tsx (server) ─ getDictionary(lang) ─→ Fleco ─→ home + contact + aboutus
```

## File Changes

| File | Action | Description |
|---|---|---|
| `src/app/components/front-pages/macana/warp.ts` | Create | Mark↔page geometry constants. |
| `…/macana/DevynixMark.tsx` | Create | Hand-drawn mark; replaces 3 missing `.svg` imports. |
| `…/macana/WarpBand.tsx` | Create | Band shell: pine ground, threads, plate slot. |
| `…/macana/IkatEdge.tsx` | Create | `ikat-hi` / `ikat-lo` filter defs + edge path. |
| `…/macana/corridor.ts` | Create | Frozen 12-span Cuenca figures. |
| `…/macana/CorridorFigure.tsx` | Create | SVG + always-rendered `<table>`. |
| `…/macana/products.ts`, `…/macana/Fleco.tsx` | Create | Product plates; fringe from count. |
| `src/app/css/pages/macana.css` | Create | `--warp`, weave keyframes, band rules. |
| `src/app/css/pages/frontpages.css` | Modify | `.container-1218` via `--warp`; delete `-2086px` marquee. |
| `tailwind.config.ts` | Modify | Macana colours + `spacing.warp` scale (no v4 upgrade). |
| `(frontend-pages)/layout.tsx` | Modify | Server component; drop duplicate `<Flowbite>`; FLECO. |
| `(frontend-pages)/page.tsx` | Modify | Six bands, dict passed as props. |
| `contact/page.tsx`, `aboutus/page.tsx` | Modify | Macana shell; drop `ContactMap`/`PurchaseTemp`. |
| `shared/logo/{Logo,FullLogo}.tsx`, `layout/Footer.tsx` | Modify | Render `<DevynixMark/>`. |
| `homepage/{MainBanner,AboutDevynix,FAQ}.tsx` | Modify | Bands ①, ④, ⑤; `"use client"` removed; FAQ uses `<details>`. |
| `homepage/{OurClients,FeatureTabs,Packages,Highlights,ContactBar,PurchaseTemp}.tsx` | Delete | Forbidden by PRODUCT.md or folded into bands. |
| `contactus/ContactMap.tsx` | Delete | No public address exists. |
| `src/locales/{en,es}.json` | Modify | New tree, same commit, matching array lengths. |

## Testing Strategy

No test runner exists and none is added.

| Layer | What | How |
|---|---|---|
| Types | Corridor/product literals, dict prop shapes | `npx tsc --noEmit` |
| Lint | Server/client boundary, unused imports | `pnpm lint` |
| Build | Missing-asset imports (the current break) | `pnpm build` |
| Parity | Equal leaf keys + array lengths EN/ES | `node -e` leaf-set diff, per work unit |
| No-JS | Corridor `<table>` present in emitted HTML | grep the built HTML for the 12 span ids |
| Perf | ≤8 `url(#ikat-` occurrences; one throttled paint check | Structural count + DevTools, recorded in WU2 |
| A11y | Flash colour never on normal-size text | Manual check against the D9 table |

## Threat Matrix

N/A — no routing logic, shell, subprocess, VCS/PR automation, executable-file classification, or
process-integration boundary. The one external URL (`wa.me/593987877191`) is a compile-time constant
and is never assembled from user input.

## Migration / Rollout

No data migration. Five work units per the proposal, Feature Branch Chain behind a draft tracker PR;
WU1 (D1 + D2) must land first because it unblocks the build and every other unit imports `warp.ts`.
Reverting WU1 alone restores the build break, so it reverts only with the whole chain.

## Open Questions

- [ ] None blocking. `animation-timeline: view()` coverage is the one assumption; its stated fallback
      (play once on load) is acceptable and needs no decision.
