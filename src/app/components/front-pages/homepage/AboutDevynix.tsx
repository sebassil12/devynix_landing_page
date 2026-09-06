import type { Dictionary } from "@/i18n/dictionaries";
import { WarpBand } from "@/app/components/front-pages/macana/WarpBand";

type AboutDevynixProps = {
  copy: Dictionary["home"]["devynix"];
};

// Band ④ DEVYNIX (docs/homepage-brief-macana.md §4): the only established
// facts are founded 2025, Ecuador (PRODUCT.md) — no headcount, address,
// customers, or revenue are claimed here or implied by `copy.founded` /
// `copy.country`. Server component, no client interactivity (design.md D3):
// `page.tsx` awaits the dictionary and passes this slice down as a prop.
//
// Declared deviation from design.md D7: the locale tree there lists an
// `eyebrow` field for this band. Same precedent as WU2's `home.urdimbre` and
// WU3's `home.metodo`/`home.bandas` — craft-floor bans a kicker/eyebrow above
// a heading absolutely ("no brief earns it back"), so no `eyebrow` key is
// added and the title carries the copy alone.
export function AboutDevynix({ copy }: AboutDevynixProps) {
  return (
    <WarpBand id="devynix">
      <h2 className="max-w-[75ch] text-3xl font-medium text-macana-cotton lg:text-44">
        {copy.title}
      </h2>
      <p className="mt-warp max-w-[75ch] text-17 text-macana-cotton/90">
        {copy.body}
      </p>
      <ul className="mt-warp-2 flex flex-wrap gap-warp-2 border-t border-macana-figure/30 pt-warp-half text-15 font-semibold text-macana-cotton">
        <li>{copy.founded}</li>
        <li>{copy.country}</li>
      </ul>
    </WarpBand>
  );
}

export default AboutDevynix;
