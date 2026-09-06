# WhatsApp Conversion Specification

## Purpose

The WhatsApp number `+593 98 787 7191` is the primary, working conversion path
across the homepage, `/contact`, and `/aboutus`, replacing the non-functional
contact form as the site's call to action.

## Requirements

### Requirement: Working WhatsApp Deep Link on All Three Pages

Each of the homepage, `/contact`, and `/aboutus` MUST expose at least one
`wa.me` (or `api.whatsapp.com`) deep link that opens a chat pre-addressed to
`+593 98 787 7191`.

#### Scenario: Link present and correct

- GIVEN each of the three pages
- WHEN its primary CTA is inspected
- THEN an `href` matching a WhatsApp deep-link pattern encoding `593987877191`
  MUST be present

#### Scenario: FLECO CTA

- GIVEN the homepage's FLECO band
- WHEN its CTA is rendered
- THEN it MUST be the WhatsApp deep link described above

### Requirement: Flash Color Permitted Only as Active Conversion State

The FLECO WhatsApp CTA MAY use `#D14338` because it is an active/actionable
conversion element, not decoration; no other WhatsApp-related element MUST use
the flash color.

#### Scenario: CTA is the sole flash use

- GIVEN the FLECO band
- WHEN its flash-colored elements are enumerated
- THEN only the WhatsApp CTA itself MUST use `#D14338`

### Requirement: No Dead or Placeholder Contact Paths

The redesigned `PurchaseTemp` component and any other former CTA surface MUST
route to the WhatsApp link, not to the non-functional `ContactForm`.

#### Scenario: CTA destination

- GIVEN a CTA that previously pointed at `ContactForm.tsx` (which has no
  handler)
- WHEN it is re-rendered under this change
- THEN it MUST point at the WhatsApp deep link instead

### Requirement: Locale-Sourced CTA Copy with EN/ES Parity

All WhatsApp CTA labels MUST come from `src/locales/{en,es}.json`; both files
MUST update together with matching keys.

#### Scenario: Parity check

- GIVEN a new or changed WhatsApp CTA key
- WHEN `en.json` and `es.json` are diffed
- THEN both MUST contain the same key with a translated Spanish value, not a
  copy-pasted English string
