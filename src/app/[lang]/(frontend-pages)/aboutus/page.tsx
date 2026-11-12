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
const page = () => {
  return (
    <>
      <HeroText />
      <SetupProcess />
      <Archivement />
      <FAQ />
      <PurchaseTemp />
    </>
  );
};

export default page;
