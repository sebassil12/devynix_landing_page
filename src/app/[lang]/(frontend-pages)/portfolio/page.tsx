import React from "react";
import type { Metadata } from "next";
import FrontEndBreadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/FrontBreadcrumb";
import GalleryPortfolio from "@/app/components/front-pages/portfolio/GalleryPortfolio";
import PurchaseTemp from "@/app/components/front-pages/homepage/PurchaseTemp";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return { title: dict.meta.portfolio.title };
}

const page = () => {
  return (
    <>
      <FrontEndBreadcrumb
        titleKey="portfolio.breadcrumbTitle"
        linkKey="portfolio.breadcrumbLink"
      />
      <GalleryPortfolio />
      <PurchaseTemp />
    </>
  );
};

export default page;
