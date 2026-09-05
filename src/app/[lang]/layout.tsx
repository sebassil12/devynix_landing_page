import React from "react";
import type { Metadata } from "next";
import { Flowbite } from "flowbite-react";
import customTheme from "@/utils/theme/custom-theme";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/app/components/shadcn-ui/Default-Ui/toaster";
import { CustomizerContextProvider } from "../context/CustomizerContext";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { TranslationProvider } from "@/i18n/provider";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(isLocale(lang) ? lang : ("en" as Locale));
  return {
    title: dict.meta.site.title,
    description: dict.meta.site.description,
  };
}

// <html>/<body> live in the root layout so not-found.tsx gets a proper shell.
// This layer only supplies the locale dictionary and the theme providers.
export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  // An unsupported locale segment is a missing page, not a server error.
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);

  return (
    <TranslationProvider dict={dict} locale={lang as Locale}>
      <Flowbite theme={{ theme: customTheme }}>
        <NextTopLoader color="var(--color-primary)" />
        <CustomizerContextProvider>{children}</CustomizerContextProvider>
      </Flowbite>
      <Toaster />
    </TranslationProvider>
  );
}
