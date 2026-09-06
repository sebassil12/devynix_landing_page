import { AboutDevynix } from "@/app/components/front-pages/homepage/AboutDevynix";
import { Bandas } from "@/app/components/front-pages/homepage/Bandas";
import { FAQ } from "@/app/components/front-pages/homepage/FAQ";
import MainBanner from "@/app/components/front-pages/homepage/MainBanner";
import { Metodo } from "@/app/components/front-pages/homepage/Metodo";
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

// Six-band sequence (homepage-bands spec): urdimbre -> metodo -> bandas ->
// devynix -> faq -> fleco. The first five bands render here; FLECO is band
// ⑥ but lives in `(frontend-pages)/layout.tsx` (design.md D5/D6) so the
// same closing CTA reaches `/contact` and `/aboutus` too, not just this
// page.
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
      <AboutDevynix copy={dict.home.devynix} />
      <FAQ copy={dict.shared.faq} locale={lang} />
    </>
  );
};

export default page;
