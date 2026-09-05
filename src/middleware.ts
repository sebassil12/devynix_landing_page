import { NextResponse, type NextRequest } from "next/server";
import { locales, defaultLocale, isLocale } from "@/i18n/config";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const matched = locales.find(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (matched) {
    // not-found.tsx renders outside the [lang] layout, so it cannot read the
    // route params or the TranslationProvider. This header is how it learns
    // which locale the visitor asked for.
    const headers = new Headers(request.headers);
    headers.set("x-locale", matched);
    return NextResponse.next({ request: { headers } });
  }

  // ponytail: first Accept-Language tag is enough; no full RFC 4647 negotiation
  // until someone actually needs quality-value weighting.
  const preferred = request.headers
    .get("accept-language")
    ?.split(",")[0]
    ?.split("-")[0]
    ?.toLowerCase();

  const locale = preferred && isLocale(preferred) ? preferred : defaultLocale;

  return NextResponse.redirect(
    new URL(`/${locale}${pathname === "/" ? "" : pathname}`, request.url)
  );
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|images|favicon.svg).*)"],
};
