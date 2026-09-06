# Homepage Surface Brief — "Macana"

Confirmed design brief for the Devynix homepage redesign. Produced by `/impeccable shape homepage`
and locked by the user. This is an input to the SDD cycle, not a running record — it changes only
when the user changes it.

- **Surface:** `/[lang]` homepage (en, es)
- **Visitor mode:** Persuade
- **Direction:** Macana (locked from concept-seed roll `1d961acc`, assigned index 4)
- **Build path:** code-led (no image generation available in this harness)

---

## 1. Job and audience

An investor or partner doing due diligence, in a browser, skeptical, with five other tabs open.
They are **not** here to buy GeoNix or FinNix. They are here to decide whether Devynix is a real
engineering company or another deck. Success: they finish convinced there is a repeatable method,
and they open WhatsApp.

## 2. Outcome and proof

| Band | Proof it carries | Form |
|---|---|---|
| 01 GridCanopy | Cuenca corridor · 12 spans · 3 urgent · 7 need action · corridor risk index 616 | **Data drawn natively** as generated SVG. No screenshot. |
| 02 GeoAI Academy | 7 phases · 18 activities · GeoAI domain depth | Text + plate + link. No screenshot. |
| 03 FinNix | Shipping app with real data | Screenshot as primary proof; link secondary. |

Factual anchors: founded 2025 · Ecuador · `devynixcorp@gmail.com` · WhatsApp `+593 98 787 7191`.

Live URLs:
- `https://geoai.sebastiansilva.dev/` — GeoNix / GeoAI Studio; hosts **both** GridCanopy and GeoAI Academy.
- `https://financial-devynix-app.onrender.com/` — FinNix.

## 3. Selected direction

The pattern exists in the threads before the cloth exists; each product is a band of the same cloth.

**Palette (measured from brand files, not chosen):**

| Role | Value | Source |
|---|---|---|
| Ground | `#0E2422` | deep pine, derived from FinNix `#204747` |
| Figure / thread | `#FFBD59` | Devynix logo mark, exact |
| Raw cotton | `#F0EBE0` | undyed warp |
| Urgent flash | `#D14338` | GridCanopy urgent span state |

**Five non-negotiable disciplines:**

1. The warp is **load-bearing structure**, never texture laid over an otherwise normal layout.
2. **One reserved flash color** — `#D14338` appears only on urgent or active states. Never decorative.
3. Every product carries a **plate**: name and number set together (01 GRIDCANOPY, 02 GEOAI ACADEMY,
   03 FINNIX). No product is ever cropped to a teaser.
4. The feathered ikat edge is produced by **real displacement** (`feTurbulence` + `feDisplacementMap`),
   never a CSS blur.
5. The weave **is the Devynix logo enlarged**. The mark is already an interlaced textile glyph; the
   page's warp is its continuation, not an imported metaphor.

**Implementation consequence:** the warp band unit is the page's grid unit. If those are not the same
number, the direction was not executed.

## 4. Sequence

```
① URDIMBRE   the real Cuenca corridor traced as an ikat figure in amber,
             spans as marks on the band — drawn, never captured
② EL MÉTODO  industry problem → focused instrument → measurement
③ LAS BANDAS 01 GRIDCANOPY · 02 GEOAI ACADEMY · 03 FINNIX
④ DEVYNIX    2025, Ecuador
⑤ FAQ        reworded, without the agency contradiction
⑥ FLECO      macramé fringe generated from the real product count · WhatsApp CTA in the flash color
```

**Focal moment:** ①. The real corridor rendered in the language of the cloth — the one proof no
competitor can copy, and now native rather than pasted.

**Removed:** `OurClients`, `FeatureTabs`, `Packages`, `PurchaseTemp`, `ContactMap`. `Highlights` and
`ContactBar` fold into ② and ⑥.

## 5. Ranges and states

Three products today; the warp must hold 2–6 bands without redesign. Spanish strings run ~30% longer
than English. With JavaScript disabled the warp must stay legible and the corridor tracing degrades
to the figures in a table.

## 6. Interaction and layout

Full-bleed vertical bands on desktop; on mobile they collapse to a single column while the warp
rhythm survives as an edge rule. The ikat weaves in once on scroll entry, honoring
`prefers-reduced-motion`. Focus rings in amber. AA contrast over pine.

## 7. Constraints and open items

- Next.js 16 App Router · Tailwind pinned at 3.4.4 · `en.json` and `es.json` change in the same
  commit · no invented claims of any kind.
- Typography is the implementer's call within the direction. The following faces are excluded as
  saturated defaults: Fraunces, Playfair Display, Cormorant, Lora, Crimson, Newsreader, Syne,
  Space Grotesk, Space Mono, IBM Plex, Inter-as-display, DM Sans, DM Serif, Outfit,
  Plus Jakarta Sans, Instrument Sans.
- **External dependency, non-blocking:** the `geoai.sebastiansilva.dev` SPA has no fallback rewrite —
  `/gridcanopy`, `/academy`, `/dashboard`, `/studio` all return server 404. Until a `/* → /index.html`
  rewrite is added there, bands 01 and 02 link to the root URL only.
- `financial-devynix-app.onrender.com` runs on Render free tier and cold-starts in roughly 50s, which
  is why the FinNix screenshot is the primary proof and the link is secondary.
- Existing product screenshots live at `public/images/projects/{finnix,geoaiacademy,gridcaopy}.png`
  (1678×792). Only `finnix.png` is used. Note the `gridcaopy` filename typo.
- No public physical address exists, which is why `ContactMap` is removed rather than corrected.
