import React from "react";
import Landingpage from "@/app/components/landingpage";
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
  return { title: dict.meta.landing.title };
}

const page = () => {
  return (
    <>
      <Landingpage />
    </>
  );
};

export default page;
