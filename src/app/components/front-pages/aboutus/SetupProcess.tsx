import type { Dictionary } from "@/i18n/dictionaries";
import { WarpBand } from "@/app/components/front-pages/macana/WarpBand";

type SetupProcessProps = {
  copy: Dictionary["about"]["setupProcess"];
};

// `/aboutus`'s Macana shell (WU5). The old version was a 4-up grid of
// same-size icon+heading+text cards — exactly the scaffold craft-floor
// refuses ("Cards are the lazy container"). Numbered steps instead, same
// treatment `Metodo.tsx` (band ②) already uses for the homepage's own
// problem→instrument→measurement steps. Server component, no client
// interactivity — `page.tsx` passes this slice as a prop.
export function SetupProcess({ copy }: SetupProcessProps) {
  return (
    <WarpBand>
      <h2 className="max-w-[75ch] text-3xl font-medium text-macana-cotton lg:text-44">
        {copy.title}
      </h2>
      <ol className="mt-warp-2 grid grid-cols-1 gap-warp-2 md:grid-cols-2 xl:grid-cols-4">
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
            <p className="mt-2 text-15 text-macana-cotton/90">
              {step.subtitle}
            </p>
          </li>
        ))}
      </ol>
    </WarpBand>
  );
}

export default SetupProcess;
