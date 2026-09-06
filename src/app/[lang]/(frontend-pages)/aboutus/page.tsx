import Archivement from "@/app/components/front-pages/aboutus/Archivement";
import HeroText from "@/app/components/front-pages/aboutus/HeroText";
import SetupProcess from "@/app/components/front-pages/aboutus/SetupProcess";
import { FAQ } from "@/app/components/front-pages/homepage/FAQ";
import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return { title: dict.meta.about.title };
}

// Company story only: hero, how we work, portfolio figures, FAQ. Macana
// shell (WU5): every band below now reads the same warp system, palette and
// typography as the homepage bands (dict slices as props, no context — same
// pattern `page.tsx`'s homepage bands use). `PurchaseTemp` is deleted
// (design.md D5); its closing-CTA job is absorbed by the layout-level
// `Fleco`, so this page keeps a working closing CTA without re-rendering
// one here.
const page = async ({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) => {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <>
      <HeroText copy={dict.about.hero} locale={lang} />
      <SetupProcess copy={dict.about.setupProcess} />
      <Archivement copy={dict.about.achievement} />
      <FAQ copy={dict.shared.faq} locale={lang} />
    </>
  );
};

export default page;
