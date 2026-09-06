import { AboutDevynix } from "@/app/components/front-pages/homepage/AboutDevynix";
import { Bandas } from "@/app/components/front-pages/homepage/Bandas";
import ContactBar from "@/app/components/front-pages/homepage/ContactBar";
import { FAQ } from "@/app/components/front-pages/homepage/FAQ";
import MainBanner from "@/app/components/front-pages/homepage/MainBanner";
import { Metodo } from "@/app/components/front-pages/homepage/Metodo";
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
// urdimbre -> metodo -> bandas -> about -> contactBar -> faq -> purchase.
// `urdimbre`, `metodo` and `bandas` are Macana server bands (design.md D3)
// reading their copy from the awaited dictionary; the rest are unchanged
// pending WU4/WU5.
const page = async ({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) => {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <>
      <MainBanner copy={dict.home.urdimbre} />
      <Metodo copy={dict.home.metodo} />
      <Bandas copy={dict.home.bandas} />
      <AboutDevynix />
      <ContactBar />
      <FAQ />
      <PurchaseTemp />
    </>
  );
};

export default page;
