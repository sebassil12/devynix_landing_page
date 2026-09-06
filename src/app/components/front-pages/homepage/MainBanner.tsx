import type { Dictionary } from "@/i18n/dictionaries";
import { CORRIDOR } from "@/app/components/front-pages/macana/corridor";
import { CorridorFigure } from "@/app/components/front-pages/macana/CorridorFigure";
import { WarpBand } from "@/app/components/front-pages/macana/WarpBand";

type MainBannerProps = {
  copy: Dictionary["home"]["urdimbre"];
};

// Band ① URDIMBRE — the homepage's focal moment (docs/homepage-brief-macana.md
// §4): the real Cuenca corridor, drawn as an ikat figure rather than pasted
// in as a screenshot. Server component, no client interactivity (design.md
// D3): `page.tsx` awaits the dictionary and passes this slice as a prop.
export function MainBanner({ copy }: MainBannerProps) {
  return (
    <WarpBand>
      <h1 className="text-4xl font-medium text-macana-cotton lg:text-56 lg:leading-[64px]">
        {copy.title}
      </h1>
      <p className="mt-warp max-w-[75ch] text-17 text-macana-cotton/90">
        {copy.lead}
      </p>
      <div className="mt-warp-2">
        <CorridorFigure data={CORRIDOR} copy={copy} />
      </div>
      <a
        href="#method"
        className="mt-warp-2 inline-block rounded-tw bg-macana-figure px-warp py-3 font-bold text-macana-ground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-macana-figure"
      >
        {copy.cta}
      </a>
    </WarpBand>
  );
}

export default MainBanner;
