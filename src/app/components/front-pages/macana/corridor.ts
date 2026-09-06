// Frozen Cuenca corridor figures for band ① URDIMBRE (design.md D3).
//
// GridCanopy's real output for this corridor: 12 monitored spans, of which 3
// are urgent, 7 need action, and 2 are stable, at a corridor risk index of
// 616. These are the only real figures on hand (docs/homepage-brief-macana.md
// §2) — nothing here is randomized, timestamped, or fetched, so a server
// render and any later re-render always agree byte-for-byte (corridor-figure
// spec, "Corridor Data Is Static").
//
// Per-span severity is not real data GridCanopy has published, so spans
// carry only an id and a status — no invented per-span risk score.

export type SpanStatus = "urgent" | "action" | "stable";

export type Span = {
  id: string;
  status: SpanStatus;
};

export type Corridor = {
  name: string;
  riskIndex: number;
  spans: readonly Span[];
};

export const CORRIDOR: Corridor = {
  name: "Cuenca",
  riskIndex: 616,
  spans: [
    { id: "01", status: "urgent" },
    { id: "02", status: "action" },
    { id: "03", status: "action" },
    { id: "04", status: "stable" },
    { id: "05", status: "urgent" },
    { id: "06", status: "action" },
    { id: "07", status: "action" },
    { id: "08", status: "action" },
    { id: "09", status: "stable" },
    { id: "10", status: "action" },
    { id: "11", status: "action" },
    { id: "12", status: "urgent" },
  ],
};
