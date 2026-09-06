// Shared feathered "ikat" edge filter (design.md D4; macana-visual-system
// spec "Feathered Edge Technique"). Real SVG displacement — feTurbulence +
// feDisplacementMap with static seeds — never a CSS blur.
//
//   ikat-hi  desktop: 2 octaves, displacement scale 21.
//   ikat-lo  <767px:  1 octave,  displacement scale 10 — cheaper to
//            rasterize on mobile GPUs (design.md D4 perf budget).
//
// Both filters share the seed 616 — the corridor's own risk index, reused
// rather than an arbitrary invented number, kept static so the effect never
// re-renders per frame.
//
// Callers apply the filter via the `.ikat-edge` CSS class (macana.css),
// which switches from `url(#ikat-hi)` to `url(#ikat-lo)` under the mobile
// media query without any JavaScript. Per D4's hard rule, an element that
// carries this filter must never also be animated or transformed.
const IKAT_SEED = 616;

export function IkatEdge() {
  return (
    <svg
      width="0"
      height="0"
      style={{ position: "absolute" }}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <filter id="ikat-hi" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.02 0.06"
            numOctaves={2}
            seed={IKAT_SEED}
            result="n"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="n"
            scale={21}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
        <filter id="ikat-lo" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.02 0.06"
            numOctaves={1}
            seed={IKAT_SEED}
            result="n"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="n"
            scale={10}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}

export default IkatEdge;
