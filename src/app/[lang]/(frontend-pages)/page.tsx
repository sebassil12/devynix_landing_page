import { AboutDevynix } from "@/app/components/front-pages/homepage/AboutDevynix";
import ContactBar from "@/app/components/front-pages/homepage/ContactBar";
import { FAQ } from "@/app/components/front-pages/homepage/FAQ";
import FeatureTabs from "@/app/components/front-pages/homepage/FeatureTabs";
import { Highlights } from "@/app/components/front-pages/homepage/Highlights";
import MainBanner from "@/app/components/front-pages/homepage/MainBanner";
import OurClients from "@/app/components/front-pages/homepage/OurClients";
import { Packages } from "@/app/components/front-pages/homepage/Packages";
import PurchaseTemp from "@/app/components/front-pages/homepage/PurchaseTemp";
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
  return { title: dict.meta.home.title };
}

// Section order mirrors the `home.*` key order in src/locales/*.json:
// banner -> clients -> featureTabs -> highlights -> packages -> about
// -> contactBar -> faq -> purchase.
const page = () => {
  return (
    <>
      <MainBanner />
      <OurClients />
      <FeatureTabs />
      <Highlights />
      <Packages />
      <AboutDevynix />
      <ContactBar />
      <FAQ />
      <PurchaseTemp />
    </>
  );
};

export default page;
