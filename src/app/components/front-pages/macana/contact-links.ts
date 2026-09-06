// Single source for the site's one real, working conversion path (PRODUCT.md):
// WhatsApp, plus the real support email. `wa.me` wants digits only, no
// `+`/spaces. `Fleco.tsx` (the closing CTA on every page) and `ContactForm.tsx`
// (the `/contact` page's own CTA) both point at these constants so the number
// and address are never duplicated as separate literals.
export const WHATSAPP_NUMBER = "593987877191";
export const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_NUMBER}`;
export const EMAIL_ADDRESS = "devynixcorp@gmail.com";
export const EMAIL_HREF = `mailto:${EMAIL_ADDRESS}`;
