import type { Metadata } from "next";
import ContactForm from "@/app/components/front-pages/contactus/ContactForm";
import { FAQ } from "@/app/components/front-pages/homepage/FAQ";
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

// Macana shell (WU5): `ContactMap` (a false New York address) and
// `PurchaseTemp` (deleted, design.md D5 — its closing-CTA job is absorbed by
// the layout-level `Fleco`) are both gone. `ContactForm` is now the page's
// own WhatsApp/email conversion band, and `FAQ` stays — both pages it is
// shared with (home, `/aboutus`) keep it, and `secondary-pages-macana`'s
// spec requires it here too.
const page = async ({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) => {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <>
      <ContactForm copy={dict.contact} />
      <FAQ copy={dict.shared.faq} locale={lang} />
    </>
  );
};

export default page;
