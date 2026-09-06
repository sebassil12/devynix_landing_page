# Secondary Pages Macana Specification

## Purpose

`/contact` and `/aboutus` share the Macana visual system and remove content
`PRODUCT.md` forbids, without breaking the components they share with the
homepage.

## Requirements

### Requirement: Shared Macana World

`/contact` and `/aboutus` MUST use the same Macana palette, warp unit, and
typography established by `macana-visual-system`, not the prior template
styling.

#### Scenario: Visual consistency

- GIVEN `/contact` and `/aboutus`
- WHEN their rendered styles are inspected
- THEN both MUST reference the same Macana design tokens as the homepage, with
  no leftover `data-color-theme` palette values

### Requirement: ContactMap Removed, No Address Substituted

`ContactMap.tsx` MUST be deleted and MUST NOT be replaced by any other
physical address, map, or location claim.

#### Scenario: No address anywhere

- GIVEN `/contact`
- WHEN its rendered content is inspected
- THEN no map component and no physical address string MUST be present
  anywhere on the page

### Requirement: Redesigned Shared FAQ and PurchaseTemp Stay Functional on All Consumers

The redesigned `FAQ` component remains imported by `/contact` and `/aboutus`
in addition to the homepage's own use. `PurchaseTemp` is removed as a component
per `docs/homepage-brief-macana.md`; its closing-CTA job MUST be absorbed by the
layout-level FLECO so that `/contact` and `/aboutus` keep a working closing call
to action. Neither page MAY lose its conversion path or break.

#### Scenario: Shared component integrity

- GIVEN `/contact` and `/aboutus` after the redesign
- WHEN each page is rendered
- THEN each MUST still render a working `FAQ` section and a working
  `PurchaseTemp`/conversion section
- AND neither page MUST lose its closing CTA section as a result of this
  change

### Requirement: No Fabricated Claims on Secondary Pages

`/contact` and `/aboutus` MUST NOT present testimonials, third-party client
logos, team photos, case studies, pricing, benchmarks, customer counts, or a
physical address.

#### Scenario: Fabrication check

- GIVEN the rendered `/contact` and `/aboutus` content and locale strings
- WHEN checked against `PRODUCT.md`'s absent-evidence list
- THEN none of the forbidden claim types MUST appear

### Requirement: Locale Parity Across Secondary Pages

Any locale key touched for `/contact` or `/aboutus` content MUST update
`en.json` and `es.json` together with matching leaf-key sets and array
lengths.

#### Scenario: Parity check

- GIVEN a copy change on either secondary page
- WHEN `en.json` and `es.json` are diffed
- THEN both MUST have identical leaf-key sets and array lengths for the
  touched keys
