// Geometry shared by the Devynix mark and the page's warp grid.
//
// The mark (`DevynixMark`) is an irregular woven labyrinth, not a repeating
// tile, so the page grid cannot be a literal tiling of it. What the two DO
// share is the mark's own proportion, measured off the vector source
// `public/images/logos/Logo Devynix.svg` rather than chosen:
//
//   perpendicular stroke  32.5 units   (horizontal scan 46.0 / sqrt(2))
//   perpendicular pitch   67.7 units   (horizontal scan 95.8 / sqrt(2))
//   ratio                 0.48
//
// The 32.5 figure cross-checks against the frame thickness implied by the
// path data (222.76 outer edge, 255.17 inner edge = 32.4), so the ratio is
// measured twice by independent methods.

/** Stroke-to-pitch ratio measured from the vector mark. */
export const MARK_STROKE_RATIO = 0.48;

/** Page grid unit, in px. 29 of these are one content width. */
export const WARP = 42;

/** Warp threads across the content width. Prime, so the band has no
 *  accidental mirror symmetry. */
export const WARP_THREADS = 29;

/** 1218 — the width `.container-1218` is named for, kept literally true. */
export const PAGE_WIDTH = WARP * WARP_THREADS;

/** Thread width, inheriting the mark's measured proportion (42 * 0.48). */
export const WARP_STROKE = Math.round(WARP * MARK_STROKE_RATIO); // 20

/** Tight bounding box of the mark inside the 1080 source viewBox. */
export const MARK_VIEWBOX = "222 178 636 724";
