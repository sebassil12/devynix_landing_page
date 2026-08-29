"use client";

import React, { createContext, useContext, useMemo } from "react";
import type { Locale } from "./config";

type Dict = Record<string, unknown>;

const TranslationContext = createContext<{ dict: Dict; locale: Locale }>({
  dict: {},
  locale: "en",
});

export function TranslationProvider({
  dict,
  locale,
  children,
}: {
  dict: Dict;
  locale: Locale;
  children: React.ReactNode;
}) {
  const value = useMemo(() => ({ dict, locale }), [dict, locale]);
  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
}

/**
 * t("contact.form.email") -> "Email"
 * t("consents.grantedAt", { date }) -> "Accepted on 3 Mar 2026"
 * t("pricing.tiers") on a non-string node returns the key, so a bad path is
 * visible in the UI instead of rendering "[object Object]" or empty.
 */
export function useTranslation() {
  const { dict, locale } = useContext(TranslationContext);

  const t = (path: string, vars?: Record<string, string | number>): string => {
    const raw = path
      .split(".")
      .reduce<unknown>(
        (node, key) =>
          node && typeof node === "object"
            ? (node as Dict)[key]
            : undefined,
        dict
      );

    if (typeof raw !== "string") return path;
    if (!vars) return raw;
    return raw.replace(/\{(\w+)\}/g, (_, k) =>
      k in vars ? String(vars[k]) : `{${k}}`
    );
  };

  /** Arrays of strings/objects (FAQ entries, feature lists, review quotes). */
  const tList = <T,>(path: string): T[] => {
    const raw = path
      .split(".")
      .reduce<unknown>(
        (node, key) =>
          node && typeof node === "object"
            ? (node as Dict)[key]
            : undefined,
        dict
      );
    return Array.isArray(raw) ? (raw as T[]) : [];
  };

  return { t, tList, locale };
}
