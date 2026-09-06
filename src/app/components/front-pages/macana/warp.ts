// Geometry shared by the Devynix mark (`DevynixMark`) and the page's warp
// grid. Every Macana surface derives its measurements from these constants,
// so the page grid is a literal continuation of the mark's own lattice
// rather than an independently chosen number (see design.md D1/D2).

export const MARK_PITCH = 6; // px between lattice threads inside the mark
export const MARK_STROKE = 4; // px stroke width of a single mark thread
export const WARP_SCALE = 7; // multiplier from mark scale to page scale

export const WARP = MARK_PITCH * WARP_SCALE; // 42 — page grid unit
export const WARP_STROKE = MARK_STROKE * WARP_SCALE; // 28 — page thread width
export const PAGE_WIDTH = WARP * 29; // 1218 — .container-1218, 29 warp threads
