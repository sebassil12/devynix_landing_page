import Image from "next/image";
import type { Dictionary } from "@/i18n/dictionaries";
import { WarpBand } from "@/app/components/front-pages/macana/WarpBand";
import { PRODUCTS } from "@/app/components/front-pages/macana/products";
import { CORRIDOR } from "@/app/components/front-pages/macana/corridor";
import type { SpanStatus } from "@/app/components/front-pages/macana/corridor";
import finnixScreenshot from "@public/images/projects/finnix.png";

type BandasProps = {
  copy: Dictionary["home"]["bandas"];
};

// Graphics-only palette use (design.md D9): WCAG 1.4.11 (non-text contrast,
// 3:1) applies here, not the 4.5:1 text threshold — the same mapping
// `CorridorFigure` uses for band ①.
const STATUS_FILL: Record<SpanStatus, string> = {
  urgent: "#D14338",
  action: "#FFBD59",
  stable: "#F0EBE0",
};

// Decorative micro-figure reusing the real Cuenca corridor data (design.md
// D3) at plate scale. `aria-hidden`: the same 12 figures are already
// readable text via `copy.claim` below, and the accessible `<table>` for
// this data lives once, in band ①'s `CorridorFigure` — this avoids a second
// source of truth for the same figures.
function CorridorChips() {
  const chipWidth = 6;
  const gap = 2;
  const width = CORRIDOR.spans.length * (chipWidth + gap) - gap;
  return (
    <svg
      viewBox={`0 0 ${width} 24`}
      className="mt-2 h-6 w-full max-w-[200px]"
      aria-hidden="true"
      focusable="false"
    >
      {CORRIDOR.spans.map((span, index) => (
        <rect
          key={span.id}
          x={index * (chipWidth + gap)}
          y={0}
          width={chipWidth}
          height={24}
          fill={STATUS_FILL[span.status]}
        />
      ))}
    </svg>
  );
}

// Band ③ LAS BANDAS (docs/homepage-brief-macana.md §2/§4): the three
// products, each carrying its plate — brief discipline #3, name and number
// set together, never cropped to a teaser. The grid is one responsive
// layout with no per-count branch, so it holds 2–6 plates unchanged
// (design.md D5; homepage-bands spec "Band Width Supports 2–6 Products").
//
// Same eyebrow deviation as `Metodo.tsx`: no `eyebrow` key is added to
// `home.bandas`, per craft-floor's absolute kicker ban.
export function Bandas({ copy }: BandasProps) {
  return (
    <WarpBand id="products">
      <h2 className="max-w-[75ch] text-3xl font-medium text-macana-cotton lg:text-44">
        {copy.title}
      </h2>
      <div className="mt-warp-2 grid grid-cols-1 gap-warp-2 md:grid-cols-2 xl:grid-cols-3">
        {PRODUCTS.map((product, index) => {
          const plate = copy.products[index];
          if (!plate) return null;
          const isSecondaryLink = product.proof === "screenshot";
          return (
            <article
              key={product.id}
              className="border-t border-macana-figure/30 pt-warp-half"
            >
              <h3 className="text-22 font-bold text-macana-cotton">
                {plate.plate} {plate.name}
              </h3>
              <p className="mt-2 text-15 text-macana-cotton/90">
                {plate.claim}
              </p>
              {product.proof === "corridor" && <CorridorChips />}
              {product.proof === "screenshot" && (
                <Image
                  src={finnixScreenshot}
                  alt={plate.claim}
                  className="mt-warp-half w-full rounded-tw"
                />
              )}
              <a
                href={product.href}
                target="_blank"
                rel="noopener noreferrer"
                className={
                  isSecondaryLink
                    ? "mt-warp-half inline-block text-13 font-medium text-macana-cotton/70 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-macana-figure"
                    : "mt-warp-half inline-block font-bold text-macana-figure underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-macana-figure"
                }
              >
                {plate.proofLabel}
              </a>
            </article>
          );
        })}
      </div>
    </WarpBand>
  );
}

export default Bandas;
