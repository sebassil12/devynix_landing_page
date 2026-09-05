import React from "react";
import type { Metadata } from "next";
import ContactMap from "@/app/components/front-pages/contactus/ContactMap";
import ContactForm from "@/app/components/front-pages/contactus/ContactForm";
import PurchaseTemp from "@/app/components/front-pages/homepage/PurchaseTemp";
import FrontEndBreadcrumb from "@/app/components/shared/breadcrumb/FrontBreadcrumb";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return { title: dict.meta.contact.title };
}

const page = () => {
  return (
    <>
      <div className="bg-lightgray dark:bg-darkgray">
        <FrontEndBreadcrumb
          titleKey="contact.breadcrumbTitle"
          linkKey="contact.breadcrumbLink"
        />
        <div className="lg:pb-24 pb-12">
          <ContactMap />
          <ContactForm />
        </div>
        <PurchaseTemp />
      </div>
    </>
  );
};

export default page;
