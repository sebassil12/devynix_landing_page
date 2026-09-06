import type { Dictionary } from "@/i18n/dictionaries";
import { WarpBand } from "./WarpBand";
import { PRODUCTS } from "./products";
import { WHATSAPP_HREF, EMAIL_HREF } from "./contact-links";
import { ctaLinkVariants } from "./cta";
import { PAGE_WIDTH, WARP, WARP_THREADS } from "./warp";

type FlecoProps = {
  copy: Dictionary["shared"]["cta"];
};

const MIN_STRAND = WARP;
const MAX_STRAND = WARP * 2.5;

/**
 * Pure fringe geometry (design.md D5): `threadCount` warp strands gathered
 * into `bundleCount` bundles, with knots at `round(threadCount * k / n)`.
 * Strand length is a function of thread index and distance to its bundle's
 * center, so changing `PRODUCTS.length` moves every boundary and visibly
 * re-knots the whole fringe — nothing here is hardcoded to 3.
 */
function fringeGeometry(threadCount: number, bundleCount: number) {
  const boundaries = Array.from({ length: bundleCount + 1 }, (_, k) =>
    Math.round((threadCount * k) / bundleCount)
  );
  const strands = Array.from({ length: threadCount }, (_, i) => {
    let bundle = 0;
    while (bundle < bundleCount - 1 && i >= boundaries[bundle + 1]) bundle++;
    const start = boundaries[bundle];
    const end = boundaries[bundle + 1];
    const half = Math.max((end - start) / 2, 1);
    const center = start + half;
    const t = Math.max(0, 1 - Math.abs(i + 0.5 - center) / half);
    return { index: i, length: MIN_STRAND + t * (MAX_STRAND - MIN_STRAND) };
  });
  // Interior boundaries only — the two frame edges (0 and threadCount) are
  // not physical knots.
  return { strands, knots: boundaries.slice(1, -1) };
}

/**
 * Band ⑥ FLECO (docs/homepage-brief-macana.md §4): the macramé fringe
 * generated from the real product count, closing every page with the
 * WhatsApp CTA. Lives in `(frontend-pages)/layout.tsx` (design.md D6), so
 * the homepage, `/contact`, and `/aboutus` all get it by construction.
 * Server component, no client interactivity (design.md D3/D8).
 */
export function Fleco({ copy }: FlecoProps) {
  const { strands, knots } = fringeGeometry(WARP_THREADS, PRODUCTS.length);

  return (
    <WarpBand>
      <svg
        viewBox={`0 0 ${PAGE_WIDTH} ${MAX_STRAND}`}
        className="h-auto w-full"
        aria-hidden="true"
        focusable="false"
      >
        {strands.map((strand) => (
          <line
            key={strand.index}
            x1={strand.index * WARP + WARP / 2}
            x2={strand.index * WARP + WARP / 2}
            y1={0}
            y2={strand.length}
            stroke="#FFBD59"
            strokeWidth={2}
          />
        ))}
        {knots.map((knotIndex) => (
          <circle
            key={knotIndex}
            cx={knotIndex * WARP}
            cy={MIN_STRAND}
            r={4}
            fill="#F0EBE0"
          />
        ))}
      </svg>
      <div className="mt-warp-2 flex flex-col items-center gap-warp-half text-center">
        <h2 className="max-w-[60ch] text-3xl font-medium text-macana-cotton lg:text-44">
          {copy.title}
        </h2>
        <p className="max-w-[60ch] text-15 text-macana-cotton/90">
          {copy.lead}
        </p>
        <div className="mt-warp flex flex-wrap items-center justify-center gap-warp-half">
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className={ctaLinkVariants({ emphasis: "flash" })}
          >
            {copy.whatsappCta}
          </a>
          <a href={EMAIL_HREF} className={ctaLinkVariants({ emphasis: "secondary" })}>
            {copy.emailCta}
          </a>
        </div>
      </div>
    </WarpBand>
  );
}

export default Fleco;
