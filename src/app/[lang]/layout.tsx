import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../css/globals.css";
import { Flowbite, ThemeModeScript } from "flowbite-react";
import customTheme from "@/utils/theme/custom-theme";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/app/components/shadcn-ui/Default-Ui/toaster";
import { CustomizerContextProvider } from "../context/CustomizerContext";
import { locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { TranslationProvider } from "@/i18n/provider";

const inter = Inter({ subsets: ["latin"] });

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  return {
    title: dict.meta.site.title,
    description: dict.meta.site.description,
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <html lang={lang}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <ThemeModeScript />
      </head>
      <body className={`${inter.className}`}>
        <TranslationProvider dict={dict} locale={lang as Locale}>
          <Flowbite theme={{ theme: customTheme }}>
            <NextTopLoader color="var(--color-primary)" />
            <CustomizerContextProvider>{children}</CustomizerContextProvider>
          </Flowbite>
          <Toaster />
        </TranslationProvider>
      </body>
    </html>
  );
}
