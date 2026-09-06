import { cva } from "class-variance-authority";

// Shared CTA link treatments across Macana bands (design.md D9). `primary`
// is a button-style CTA in the amber figure colour (9.8:1 on pine, safe at
// any text size) for ordinary internal navigation. `secondary` is a plain
// underlined link. `flash` is reserved for the WhatsApp CTA alone: flash
// fails AA at normal text size on pine (3.9:1), so this variant bakes in the
// 19px/700 AA-Large treatment the hard constraint requires — every WhatsApp
// CTA reads it from here instead of re-deriving the size on its own.
export const ctaLinkVariants = cva(
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-macana-figure",
  {
    variants: {
      emphasis: {
        primary:
          "inline-block rounded-tw bg-macana-figure px-warp py-3 font-bold text-macana-ground",
        flash:
          "inline-block rounded-tw bg-macana-flash px-warp py-3 text-[19px] font-bold text-macana-cotton",
        secondary:
          "text-15 font-medium text-macana-figure underline underline-offset-4",
      },
    },
    defaultVariants: { emphasis: "secondary" },
  }
);
