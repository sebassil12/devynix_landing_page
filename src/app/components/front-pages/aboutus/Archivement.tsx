import type { Dictionary } from "@/i18n/dictionaries";
import { WarpBand } from "@/app/components/front-pages/macana/WarpBand";

type ArchivementProps = {
  copy: Dictionary["about"]["achievement"];
};

// `/aboutus`'s Macana shell (WU5). PRODUCT.md marks these figures
// "true-but-placeholder"/"unverified" — kept unchanged, they are not one of
// the forbidden claim types (no testimonials, client logos, team photos,
// case studies, pricing, benchmarks, customer counts, or address). Server
// component, no client interactivity — `page.tsx` passes this slice as a
// prop.
export function Archivement({ copy }: ArchivementProps) {
  return (
    <WarpBand>
      <h2 className="max-w-[75ch] text-3xl font-medium text-macana-cotton lg:text-44">
        {copy.title}
      </h2>
      <dl className="mt-warp-2 flex flex-wrap gap-warp-2 border-t border-macana-figure/30 pt-warp-half">
        {copy.stats.map((stat) => (
          <div key={stat.label}>
            <dd className="text-5xl font-medium leading-tight text-macana-figure lg:text-64">
              {stat.value}
            </dd>
            <dt className="mt-2 text-15 text-macana-cotton/80">
              {stat.label}
            </dt>
          </div>
        ))}
      </dl>
    </WarpBand>
  );
}

export default Archivement;
