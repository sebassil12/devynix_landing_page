import type { Locale } from "./config";

// ponytail: plain dynamic imports, no i18n library. Next code-splits each
// locale, so a visitor only downloads the dictionary they actually use.
const dictionaries = {
  en: () => import("@/locales/en.json").then((m) => m.default),
  es: () => import("@/locales/es.json").then((m) => m.default),
};

export const getDictionary = (locale: Locale) => dictionaries[locale]();

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
