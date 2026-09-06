# Macana Visual System Specification

## Purpose

Shared design-system primitives (palette, warp unit, vector mark, feathered-edge
technique, motion and accessibility rules) that every Macana-world page and band
consumes. This is the load-bearing layer other Macana capabilities build on.

## Requirements

### Requirement: Macana Palette Tokens

The system MUST expose exactly four palette values as design tokens: ground
`#0E2422`, figure/thread `#FFBD59`, raw cotton `#F0EBE0`, and flash `#D14338`. No
other brand color MUST be introduced for Macana surfaces.

#### Scenario: Token definition

- GIVEN the Macana token source (Tailwind config or CSS custom properties)
- WHEN the four Macana colors are declared
- THEN each MUST match its measured hex value exactly and MUST NOT be redefined
  elsewhere with a different value

### Requirement: Reserved Flash Color

`#D14338` MUST NOT appear in any decorative role (backgrounds, borders,
illustrative fills, accents) anywhere in the Macana visual system. It MUST be
reserved for urgent or active states only.

#### Scenario: Flash color audit

- GIVEN the full set of Macana-styled components across all three pages
- WHEN every use of `#D14338` (or its token) is enumerated
- THEN each use MUST map to a named urgent or active state (e.g. a corridor
  urgent span, the primary conversion CTA)
- AND no decorative use MUST exist

### Requirement: Warp Band Unit Equals Page Grid Unit

The system MUST derive both the warp band's structural unit and the page content
width (currently `.container-1218`) from exactly one declared numeric constant.

#### Scenario: Single source of truth

- GIVEN the Macana design tokens
- WHEN the page content max-width and the warp band repeat unit are each read
  from the codebase
- THEN both values MUST resolve to the same declared constant, directly or as an
  exact integer multiple of it
- AND no second, independently hardcoded width literal MUST exist for either

### Requirement: Hand-Traced Vector Mark

The Devynix mark MUST exist as a hand-authored SVG (drawn paths — strokes,
rounded caps, square frame) reproducing `Logo Devynix.png`, replacing all
raster/broken references.

#### Scenario: Build no longer broken

- GIVEN `Logo.tsx`, `FullLogo.tsx`, and `Footer.tsx`
- WHEN each imports the mark
- THEN each import MUST resolve to an existing traced SVG file, not the deleted
  `dark-logo.svg`, `light-logo.svg`, or `logo-icon.svg`
- AND `pnpm build` MUST succeed

#### Scenario: Geometry is drawn, not auto-traced

- GIVEN the traced SVG source
- WHEN its path data is inspected
- THEN it MUST consist of authored strokes/paths with no embedded raster, no
  `<image>` element, and no autotrace artifact noise

### Requirement: Feathered Edge Technique

Any ikat/feathered edge effect in the Macana system MUST be produced with SVG
`feTurbulence` + `feDisplacementMap` filters. CSS blur MUST NOT be used to
simulate this effect.

#### Scenario: Filter provenance

- GIVEN any element styled with a feathered/ikat edge
- WHEN its implementation is inspected
- THEN it MUST contain an SVG `<filter>` combining `feTurbulence` and
  `feDisplacementMap`
- AND no CSS blur property MUST be applied to fake the same visual effect

### Requirement: Reduced Motion and Accessibility Baseline

The system MUST honor `prefers-reduced-motion` for any Macana animation, MUST
render visible amber focus rings on interactive elements, and text over the
pine ground MUST meet WCAG AA contrast.

#### Scenario: Reduced motion respected

- GIVEN a visitor with `prefers-reduced-motion: reduce`
- WHEN a Macana page loads
- THEN scroll-entry or weave animations MUST be skipped or reduced to an
  instant state change

#### Scenario: Contrast and focus

- GIVEN body text or a link rendered over `#0E2422`
- WHEN contrast is measured
- THEN it MUST meet or exceed WCAG AA (4.5:1 for normal text)
- AND WHEN an interactive element receives keyboard focus THEN an amber focus
  ring MUST be visible
