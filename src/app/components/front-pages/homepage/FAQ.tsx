import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries";
import { WarpBand } from "@/app/components/front-pages/macana/WarpBand";
import { EMAIL_HREF } from "@/app/components/front-pages/macana/contact-links";

type FAQProps = {
  copy: Dictionary["shared"]["faq"];
  locale: string;
};

// Band ⑤ FAQ (homepage-bands spec). Reworded to drop the "not a generic
// agency" / "pilots and experiments" contradiction that existed while
// `Packages` still sold pilots on the homepage (`Packages` is deleted in
// WU3). Shared across the homepage, `/contact`, and `/aboutus` (design.md
// D7), so its copy now lives under `shared.faq`, not `home.faq` — rewording
// the homepage no longer silently rewords `/aboutus`.
//
// Native `<details>`/`<summary>`: zero JavaScript, zero new dependency. Per
// the task brief, `components.json` ships no Accordion primitive to reuse
// (only `toast.tsx`/`toaster.tsx` exist under the `ui` alias, and only
// `@radix-ui/react-toast` is installed) — adding one would be a new
// dependency, not a reuse, and would also cost the server-component/no-JS
// guarantee design.md D8 already relies on for this band.
//
// Consequential fix (WU5): `copy.emailCta` ("send us an email"/"escríbenos
// un correo") pointed at `/contact` instead of an actual email link — a
// dead-labelled link on both `/contact` and `/aboutus`, the two pages WU5
// owns. Now a real `mailto:` via the shared `EMAIL_HREF` constant.
export function FAQ({ copy, locale }: FAQProps) {
  return (
    <WarpBand id="faq">
      <h2 className="max-w-[75ch] text-3xl font-medium text-macana-cotton lg:text-44">
        {copy.title}
      </h2>
      <div className="mt-warp-2 flex flex-col gap-4">
        {copy.items.map((item) => (
          <details
            key={item.question}
            className="group border-t border-macana-figure/30 pt-warp-half"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-17 font-medium text-macana-cotton focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-macana-figure [&::-webkit-details-marker]:hidden">
              {item.question}
              {/* CSS-drawn plus/minus toggle — no icon library, no unicode
                  glyph standing in for one (craft-floor). */}
              <span aria-hidden="true" className="relative h-4 w-4 shrink-0">
                <span className="absolute left-0 top-1/2 h-[2px] w-4 -translate-y-1/2 bg-macana-figure" />
                <span className="absolute left-1/2 top-0 h-4 w-[2px] -translate-x-1/2 bg-macana-figure transition-transform duration-200 group-open:rotate-90" />
              </span>
            </summary>
            <p className="mt-2 text-15 text-macana-cotton/90">{item.answer}</p>
          </details>
        ))}
      </div>
      <p className="mt-warp-2 text-15 text-macana-cotton/80">
        {copy.stillHaveQuestion}{" "}
        <Link
          href={`/${locale}/contact`}
          className="underline underline-offset-4 hover:text-macana-figure"
        >
          {copy.contactCta}
        </Link>{" "}
        {copy.or}{" "}
        <a
          href={EMAIL_HREF}
          className="underline underline-offset-4 hover:text-macana-figure"
        >
          {copy.emailCta}
        </a>
      </p>
    </WarpBand>
  );
}

export default FAQ;
