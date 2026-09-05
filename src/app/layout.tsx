import React from "react";
import { Inter } from "next/font/google";
import "./css/globals.css";
import { ThemeModeScript } from "flowbite-react";
import { headers } from "next/headers";
import { defaultLocale, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

const localeFromHeaders = async () => {
  const locale = (await headers()).get("x-locale");
  return isLocale(locale ?? "") ? (locale as string) : defaultLocale;
};

// not-found.tsx cannot export generateMetadata, and it has no page metadata of
// its own, so it inherits this. Real pages override it in [lang]/layout.tsx and
// in their own generateMetadata, which is why the 404 copy is safe as default.
export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary(
    (await localeFromHeaders()) as typeof defaultLocale
  );
  return {
    title: dict.meta.notFound.title,
    description: dict.meta.notFound.description,
  };
}

// Owns <html>/<body> for every route, including not-found.tsx. The locale
// cannot come from route params here (not-found has none), so it comes from
// the header the middleware sets on each locale-prefixed request.
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const lang = await localeFromHeaders();

  return (
    <html lang={lang}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <ThemeModeScript />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
