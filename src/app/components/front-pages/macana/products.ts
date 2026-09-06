// Product plates for band ③ LAS BANDAS (design.md D5/D7). Holds 2–6 products
// by construction: `Bandas.tsx` (and `Fleco.tsx` in a later work unit) derive
// their layout and knot count from `PRODUCTS.length`, never from a
// hardcoded three.
//
// The only real facts on hand (docs/homepage-brief-macana.md §2):
//   GridCanopy    — Cuenca corridor, 12 spans, 3 urgent, 7 need action,
//                    corridor risk index 616. No screenshot exists.
//   GeoAI Academy — 7 phases, 18 activities. No screenshot exists.
//   FinNix        — shipping app with real data; its screenshot is the
//                    primary proof, the link is secondary (Render free tier
//                    cold-starts ~50s).
//
// GridCanopy and GeoAI Academy both live on the same SPA
// (geoai.sebastiansilva.dev), which has no fallback rewrite — deep links
// 404. Both link to its root URL only (brief §7).

export type ProofKind = "corridor" | "text" | "screenshot";

export type Product = {
  /** Matches its index into `home.bandas.products` in the dictionary. */
  id: "gridcanopy" | "geoaiacademy" | "finnix";
  href: string;
  proof: ProofKind;
};

export const PRODUCTS: readonly Product[] = [
  {
    id: "gridcanopy",
    href: "https://geoai.sebastiansilva.dev/",
    proof: "corridor",
  },
  {
    id: "geoaiacademy",
    href: "https://geoai.sebastiansilva.dev/",
    proof: "text",
  },
  {
    id: "finnix",
    href: "https://financial-devynix-app.onrender.com/",
    proof: "screenshot",
  },
] as const;
