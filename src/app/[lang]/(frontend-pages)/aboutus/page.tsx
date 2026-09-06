import Archivement from "@/app/components/front-pages/aboutus/Archivement";
import HeroText from "@/app/components/front-pages/aboutus/HeroText";
import SetupProcess from "@/app/components/front-pages/aboutus/SetupProcess";
import { FAQ } from "@/app/components/front-pages/homepage/FAQ";
import PurchaseTemp from "@/app/components/front-pages/homepage/PurchaseTemp";
import React from "react";
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

// Company story only: hero, how we work, portfolio figures, FAQ, CTA.
//
// Consequential fix (WU4, not a WU5 redesign): `FAQ` moved to a required
// `copy`/`locale` prop pair in this work unit (design.md D7, `shared.faq`),
// so this call site needs the dictionary awaited here too. The Macana shell
// for this page (dropping `PurchaseTemp`, forbidden-claims audit, etc.) is
// still WU5's job — untouched here.
const page = async ({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) => {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <>
      <HeroText />
      <SetupProcess />
      <Archivement />
      <FAQ copy={dict.shared.faq} locale={lang} />
      <PurchaseTemp />
    </>
  );
};

export default page;
