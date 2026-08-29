import FrontEndBreadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/FrontBreadcrumb";
import { Packages } from "@/app/components/front-pages/homepage/Packages";
import { PaymentOptions } from "@/app/components/front-pages/homepage/Payments";
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
  return { title: dict.meta.pricing.title };
}

const Pricing = () => {
  return (
    <>
      <FrontEndBreadcrumb
        titleKey="pricing.breadcrumbTitle"
        linkKey="pricing.breadcrumbLink"
      />
      <Packages />
      <div className="sm:pb-14 pb-8">
        <PaymentOptions />
      </div>
      <PurchaseTemp />
    </>
  );
};

export default Pricing;
