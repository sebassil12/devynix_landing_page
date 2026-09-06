# Corridor Figure Specification

## Purpose

Band ① URDIMBRE renders GridCanopy's real Cuenca corridor figures as a
generated SVG ikat figure, using the shared feathered-edge technique, and
degrades to a real server-rendered table without JavaScript. This is the
homepage's focal proof moment.

## Requirements

### Requirement: Corridor Data Is Static

The corridor figure MUST be rendered from static, hardcoded props (12 spans, 3
urgent, 7 need action, corridor risk index 616, Cuenca corridor identity). The
system MUST NOT compute any of these figures with `Math.random()` or
`Date.now()` at render time.

#### Scenario: Deterministic render

- GIVEN the corridor component is rendered twice with no data change
- WHEN the SVG output is compared
- THEN both outputs MUST be structurally identical: same span count, same
  urgent/needs-action marks, same risk index value

### Requirement: Drawn SVG, Not a Screenshot

The 12 spans MUST be rendered as individual generated SVG marks on the warp
band, using the shared feathered-edge filter from `macana-visual-system`, and
MUST NOT be an image or screenshot asset.

#### Scenario: No raster substitute

- GIVEN band ① URDIMBRE
- WHEN its DOM is inspected
- THEN it MUST NOT contain an `<img>` or background-image screenshot standing
  in for the corridor figure
- AND it MUST contain SVG elements representing exactly 12 spans, of which
  exactly 3 are marked urgent and 7 marked "needs action" using tokens from
  `macana-visual-system`

### Requirement: Server-Rendered No-JS Fallback

With JavaScript disabled, the corridor figures MUST still be legible as a real
server-rendered `<table>` (not an image, not a JS-injected node) listing the
12 spans and their status.

#### Scenario: No-JS degrade

- GIVEN a request rendered without executing client JavaScript (SSR HTML, as
  verified in `pnpm build` output)
- WHEN the corridor section markup is inspected
- THEN a `<table>` element MUST be present in the initial HTML containing the
  12 spans, their urgent/needs-action status, and the corridor risk index
- AND this table MUST NOT depend on a script tag to appear

### Requirement: Reduced Motion for the Scroll-Entry Weave

The corridor's one scroll-entry weave animation MUST honor
`prefers-reduced-motion`.

#### Scenario: Motion-safe entry

- GIVEN `prefers-reduced-motion: reduce` is set
- WHEN band ① scrolls into view
- THEN the weave-in animation MUST be skipped, showing the final drawn state
  directly
