# Homepage Bands Specification

## Purpose

The homepage renders as six ordered bands (① URDIMBRE ② EL MÉTODO ③ LAS BANDAS
④ DEVYNIX ⑤ FAQ ⑥ FLECO) built on the Macana visual system, replacing the
removed template sections.

## Requirements

### Requirement: Six-Band Sequence

The homepage MUST render bands in this order: URDIMBRE, EL MÉTODO, LAS BANDAS,
DEVYNIX, FAQ, FLECO. `OurClients`, `FeatureTabs`, and `Packages` MUST be
removed, not merely hidden.

#### Scenario: Order and removal

- GIVEN the homepage `page.tsx`
- WHEN its rendered section order is inspected
- THEN the six bands MUST appear in the stated order
- AND no `OurClients`, `FeatureTabs`, or `Packages` component MUST be imported
  or rendered

### Requirement: Band Width Supports 2–6 Products Without Redesign

LAS BANDAS MUST render correctly for as few as 2 and as many as 6 product
plates using the same layout, with no per-count layout branch.

#### Scenario: Range holds

- GIVEN LAS BANDAS is given a products list of length 2, and separately of
  length 6
- WHEN each is rendered
- THEN both MUST produce a valid, non-overflowing layout without a distinct
  code path per count

### Requirement: Numbered Product Plates

Each product in LAS BANDAS MUST render its number and name together as one
plate (e.g. "01 GRIDCANOPY"), MUST include its stated proof form (data-drawn
SVG, text+plate+link, or screenshot+link per product), and MUST NOT be cropped
to a teaser lacking its name or number.

#### Scenario: Plate completeness

- GIVEN the three current products
- WHEN each plate is rendered
- THEN GridCanopy's plate MUST show "01 GRIDCANOPY", GeoAI Academy's "02 GEOAI
  ACADEMY", and FinNix's "03 FINNIX"
- AND none MUST render name or number alone

### Requirement: Reserved Flash Color in Homepage Bands

`#D14338` MUST appear on homepage bands only for the corridor's urgent-span
state or the FLECO conversion CTA; it MUST NOT be used decoratively elsewhere
in the six bands.

#### Scenario: Homepage flash audit

- GIVEN all six homepage bands
- WHEN every `#D14338` usage is enumerated
- THEN each MUST be an urgent-span mark inside band ① or the FLECO WhatsApp CTA

### Requirement: Mobile Collapse Preserves Warp Rhythm

On mobile viewports, bands MUST collapse to a single column while an edge rule
preserves the warp rhythm established on desktop.

#### Scenario: Mobile edge rule

- GIVEN a viewport narrower than the desktop breakpoint
- WHEN the homepage renders
- THEN bands MUST stack in a single column
- AND a visible edge rule reflecting the warp unit MUST remain present

### Requirement: No Fabricated Claims on the Homepage

The homepage MUST NOT present testimonials, third-party client logos, team
photos, case studies, pricing, benchmarks, customer counts, or a physical
address.

#### Scenario: Fabrication check

- GIVEN the rendered homepage content and locale strings
- WHEN checked against `PRODUCT.md`'s absent-evidence list
- THEN none of the forbidden claim types MUST appear anywhere in the six bands

### Requirement: Locale-Sourced Band Copy with EN/ES Parity

Every visible string in the six bands MUST come from
`src/locales/{en,es}.json`; both files MUST change together with matching
leaf-key sets and matching array lengths for any band-related key.

#### Scenario: Parity check

- GIVEN a homepage-bands copy change
- WHEN `en.json` and `es.json` are diffed for `home.*` keys touched by this
  change
- THEN both files MUST have the identical set of leaf keys and identical array
  lengths for those keys
