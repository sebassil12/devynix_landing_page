import AnnouncementBar from "@/app/components/front-pages/layout/AnnouncementBar";
import FrontHeader from "@/app/components/front-pages/layout/Header";
import { Footer } from "@/app/components/front-pages/layout/Footer";
import { Fleco } from "@/app/components/front-pages/macana/Fleco";
import { defaultLocale, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

// Server component (design.md D6): converting this away from a client
// component is what makes `await getDictionary(lang)` possible here, which
// is what FLECO needs to render for all three pages. The `<Flowbite>`
// wrapper this file used to carry is dropped — `[lang]/layout.tsx` already
// provides one, and it was the only thing forcing `"use client"` here.
// `<html>`/`<body>` stay in the root layout untouched (PRODUCT.md — the
// localized 404 depends on it).
export default async function HomeLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(isLocale(lang) ? lang : defaultLocale);

  return (
    <div className="frontend-page bg-white dark:bg-dark">
      {/* Header */}
      <AnnouncementBar />
      <FrontHeader />
      {/* Content */}
      <section>{children}</section>
      {/* Band ⑥ FLECO — closing WhatsApp CTA on every page (design.md D5). */}
      <Fleco copy={dict.shared.cta} />
      {/* Footer */}
      <Footer />
    </div>
  );
}
