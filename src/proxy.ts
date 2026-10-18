import { NextResponse, type NextRequest } from "next/server";
import { LOCALE_HEADER, PATH_HEADER, isTargetLocale } from "@/lib/i18n/languages";
import { LEGACY_GONE_HTML, isLegacyGonePath } from "@/lib/legacy-urls";

const CMS_COOKIE = "gaf_cms";

function cmsPassword() {
  return process.env.CMS_PASSWORD || "gaf-local";
}

async function cmsToken(password: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode("gaf-cms-desk"),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(password));
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function noindex(response: NextResponse) {
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

const PUBLIC_HTML_CACHE = "public, s-maxage=300, stale-while-revalidate=86400";

// Old WordPress/theme-demo URLs: a cacheable 410 straight from the proxy so
// neither the App Router nor the CMS stores are touched for crawl leftovers.
function legacyGone() {
  return new NextResponse(LEGACY_GONE_HTML, {
    status: 410,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "CDN-Cache-Control": "public, s-maxage=86400",
      "X-Robots-Tag": "noindex",
    },
  });
}

// Mirror of isArabicDoctorHtmlPath in src/lib/i18n/arabic-radiation-html.ts;
// the proxy cannot import server-only modules.
function isArabicDoctorHtmlPath(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] !== "ar" || parts[1] !== "doctors" || parts[2] !== "India") return false;
  return parts.length >= 3 && parts.length <= 6;
}

function withPublicHtmlCache(request: NextRequest, response: NextResponse) {
  if (request.method !== "GET" && request.method !== "HEAD") return response;
  if (request.cookies.get(CMS_COOKIE)) return response;
  const path = request.nextUrl.pathname;
  if (path.startsWith("/cms") || path.startsWith("/api")) return response;
  response.headers.set("Cache-Control", PUBLIC_HTML_CACHE);
  response.headers.set("CDN-Cache-Control", PUBLIC_HTML_CACHE);
  return response;
}

function withLocale(request: NextRequest, locale: string, pathname?: string) {
  const headers = new Headers(request.headers);
  headers.set(LOCALE_HEADER, locale);
  headers.set(PATH_HEADER, pathname ?? request.nextUrl.pathname);
  if (!pathname || pathname === request.nextUrl.pathname) {
    const response = NextResponse.next({ request: { headers } });
    response.headers.set("x-gaf-locale", locale);
    return withPublicHtmlCache(request, response);
  }
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  const response = NextResponse.rewrite(url, { request: { headers } });
  response.headers.set("x-gaf-locale", locale);
  return withPublicHtmlCache(request, response);
}

/** 301 a parenthesized procedure segment to the canonical hyphenated form. */
function catalogParenRedirect(request: NextRequest) {
  const next = request.nextUrl.pathname.replace(
    /\/([A-Za-z0-9]+(?:-[A-Za-z0-9]+)*)-\(([A-Za-z0-9]+(?:-[A-Za-z0-9]+)*)\)/g,
    "/$1-$2",
  );
  if (next === request.nextUrl.pathname) return null;
  const url = request.nextUrl.clone();
  url.pathname = next;
  return NextResponse.redirect(url, 301);
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const parts = pathname.split("/").filter(Boolean);
  const head = parts[0];

  if (isLegacyGonePath(pathname)) return legacyGone();
  const parenRedirect = catalogParenRedirect(request);
  if (parenRedirect) return parenRedirect;

  if (head && isTargetLocale(head)) {
    const rest = parts.length > 1 ? `/${parts.slice(1).join("/")}` : "/";
    if (isLegacyGonePath(rest)) return legacyGone();
    if (rest.startsWith("/cms") || rest.startsWith("/api")) {
      const url = request.nextUrl.clone();
      url.pathname = rest;
      return NextResponse.redirect(url);
    }
    // Arabic India doctor directories keep their /ar URL so a static HTML
    // route can answer crawlers without the locale-rewrite App Router cost.
    // That route is force-static and cannot see search params, so anything
    // paginated or filtered (?page=, ?hospital=, ?experience=) takes the
    // rewrite and renders the requested page through the App Router.
    if (head === "ar" && isArabicDoctorHtmlPath(pathname) && !request.nextUrl.search) {
      const response = withLocale(request, "ar");
      response.headers.set("Cache-Control", "public, max-age=0, must-revalidate");
      response.headers.set("CDN-Cache-Control", "public, s-maxage=300");
      return response;
    }
    return withLocale(request, head, rest);
  }

  const isCms = pathname.startsWith("/cms") || pathname.startsWith("/api/cms");
  if (!isCms) {
    return withLocale(request, "en");
  }

  if (pathname === "/cms/login" || pathname === "/api/cms/login") {
    return noindex(NextResponse.next());
  }
  const expected = await cmsToken(cmsPassword());
  const token = request.cookies.get(CMS_COOKIE)?.value;
  if (token === expected) {
    return noindex(NextResponse.next());
  }
  if (pathname.startsWith("/api/cms")) {
    return noindex(NextResponse.json({ error: "Unauthorized" }, { status: 401 }));
  }
  const login = new URL("/cms/login", request.url);
  login.searchParams.set("next", pathname);
  return noindex(NextResponse.redirect(login));
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap\\.xml|sitemap_index\\.xml|sitemap-[\\w-]+\\.xml|uploads/|.*\\..*).*)",
    // Dotted WordPress leftovers the pattern above skips (wp-login.php,
    // xmlrpc.php, wp-content/*.css); answered 410 by isLegacyGonePath.
    "/(wp-.*)",
    "/(.*\\.php)",
  ],
};
