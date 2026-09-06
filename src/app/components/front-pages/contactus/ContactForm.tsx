import type { Dictionary } from "@/i18n/dictionaries";
import { WarpBand } from "@/app/components/front-pages/macana/WarpBand";
import { WHATSAPP_HREF, EMAIL_HREF } from "@/app/components/front-pages/macana/contact-links";
import { ctaLinkVariants } from "@/app/components/front-pages/macana/cta";

type ContactFormProps = {
  copy: Dictionary["contact"];
};

// Replaces the old `ContactForm`: that component rendered `<TextInput>`s
// with no `<form>`, no submit handler, and no destination (PRODUCT.md) — it
// never worked. WhatsApp is the site's one real, working conversion path, so
// `/contact`'s own band now offers it directly instead of a dead form.
// Server component, no client interactivity (design.md D3).
export function ContactForm({ copy }: ContactFormProps) {
  return (
    <WarpBand id="contact">
      <h1 className="max-w-[60ch] text-3xl font-medium text-macana-cotton lg:text-44">
        {copy.hero.title}
      </h1>
      <p className="mt-warp max-w-[65ch] text-17 text-macana-cotton/90">
        {copy.hero.lead}
      </p>
      <div className="mt-warp-2 flex flex-wrap items-center gap-warp-half">
        <a
          href={WHATSAPP_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className={ctaLinkVariants({ emphasis: "flash" })}
        >
          {copy.whatsappCta}
        </a>
        <a href={EMAIL_HREF} className={ctaLinkVariants({ emphasis: "secondary" })}>
          {copy.emailCta}
        </a>
      </div>
      <p className="mt-warp-2 max-w-[65ch] border-t border-macana-figure/30 pt-warp-half text-15 text-macana-cotton/80">
        <span className="font-semibold text-macana-cotton">
          {copy.location.title}:
        </span>{" "}
        {copy.location.description}
      </p>
    </WarpBand>
  );
}

export default ContactForm;
