import type { Dictionary } from "@/i18n/dictionaries";
import { WarpBand } from "@/app/components/front-pages/macana/WarpBand";

type MetodoProps = {
  copy: Dictionary["home"]["metodo"];
};

// Band ② EL MÉTODO (docs/homepage-brief-macana.md §4): industry problem ->
// focused instrument -> measurement. Absorbs `home.highlights` (design.md
// D7) — the old tech-badge marquee and its fragile `-2086px` offset are
// removed, not reworked. Server component, no client interactivity
// (design.md D3): `page.tsx` awaits the dictionary and passes this slice
// down as a prop.
//
// Declared deviation from design.md D7: the locale tree there lists an
// `eyebrow` field for this band. `impeccable`'s craft-floor bans a
// kicker/eyebrow above a heading absolutely ("no brief earns it back",
// already applied the same way in WU2's `home.urdimbre`), so no `eyebrow`
// key is added here and the title carries the copy alone.
export function Metodo({ copy }: MetodoProps) {
  return (
    <WarpBand id="method">
      <h2 className="max-w-[75ch] text-3xl font-medium text-macana-cotton lg:text-44">
        {copy.title}
      </h2>
      <ol className="mt-warp-2 grid grid-cols-1 gap-warp-2 md:grid-cols-3">
        {copy.steps.map((step, index) => (
          <li
            key={step.title}
            className="border-t border-macana-figure/30 pt-warp-half"
          >
            <span
              aria-hidden="true"
              className="text-13 font-bold tracking-wider text-macana-figure"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-2 text-22 font-semibold text-macana-cotton">
              {step.title}
            </h3>
            <p className="mt-2 text-15 text-macana-cotton/90">{step.body}</p>
          </li>
        ))}
      </ol>
      <p className="mt-warp-2 max-w-[75ch] text-15 text-macana-cotton/80">
        {copy.note}
      </p>
    </WarpBand>
  );
}

export default Metodo;
