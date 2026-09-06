import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries";
import { WarpBand } from "@/app/components/front-pages/macana/WarpBand";
import { ctaLinkVariants } from "@/app/components/front-pages/macana/cta";

type HeroTextProps = {
  copy: Dictionary["about"]["hero"];
  locale: string;
};

// `/aboutus`'s Macana shell (WU5): same warp band, palette, and typography
// scale as the homepage bands (design.md), not the old
// `bg-lightgray dark:bg-darkgray` template. Server component, no client
// interactivity — `page.tsx` awaits the dictionary and passes this slice as
// a prop, same pattern as the homepage bands.
export function HeroText({ copy, locale }: HeroTextProps) {
  return (
    <WarpBand>
      <h1 className="max-w-[60ch] text-4xl font-medium text-macana-cotton lg:text-56 lg:leading-[64px]">
        {copy.title}
        {copy.titleSuffix ? ` ${copy.titleSuffix}` : ""}
      </h1>
      <p className="mt-warp max-w-[75ch] text-17 text-macana-cotton/90">
        {copy.lead} <b className="text-macana-cotton">{copy.brandPhrase}</b>{" "}
        {copy.leadRest}
      </p>
      <div className="mt-warp-2 flex flex-wrap items-center gap-warp-half">
        <Link
          href={`/${locale}/contact`}
          className={ctaLinkVariants({ emphasis: "primary" })}
        >
          {copy.primaryCta}
        </Link>
        <Link
          href={`/${locale}#products`}
          className={ctaLinkVariants({ emphasis: "secondary" })}
        >
          {copy.secondaryCta}
        </Link>
      </div>
    </WarpBand>
  );
}

export default HeroText;
