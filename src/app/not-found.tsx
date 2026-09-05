import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import ErrorImg from "@public/images/backgrounds/errorimg.svg";
import { defaultLocale, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

// Server component on purpose: a not-found boundary renders outside the
// [lang] layout, so useTranslation() has no provider and the page would only
// appear after hydration. The locale comes from the header the middleware
// sets on every locale-prefixed request.
const NotFound = async () => {
  const locale = (await headers()).get("x-locale");
  const lang = isLocale(locale ?? "") ? (locale as typeof defaultLocale) : defaultLocale;
  const dict = await getDictionary(lang);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-darkgray px-5 py-12">
      <div className="text-center max-w-[560px]">
        <Image src={ErrorImg} alt="" aria-hidden className="mb-6 mx-auto" />
        <h1 className="text-ld text-4xl font-bold mb-4">
          {dict.notFound.heading}
        </h1>
        <p className="text-17 leading-[32px] text-darklink">
          {dict.meta.notFound.description}
        </p>
        <div className="flex flex-wrap gap-4 justify-center mt-8">
          <Link
            href={`/${lang}`}
            className="rounded-md bg-primary px-5 py-2.5 font-semibold text-white hover:bg-primaryemphasis"
          >
            {dict.notFound.backToHome}
          </Link>
          <Link
            href={`/${lang}/contact`}
            className="rounded-md border border-primary px-5 py-2.5 font-semibold text-primary hover:bg-lightprimary"
          >
            {dict.notFound.contactCta}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
