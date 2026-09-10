import { NextResponse, type NextRequest } from "next/server";
import { LOCALE_HEADER, isTargetLocale } from "@/lib/i18n/languages";

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

function withLocale(request: NextRequest, locale: string, pathname?: string) {
  const headers = new Headers(request.headers);
  headers.set(LOCALE_HEADER, locale);
  if (!pathname || pathname === request.nextUrl.pathname) {
    const response = NextResponse.next({ request: { headers } });
    response.headers.set("x-gaf-locale", locale);
    return response;
  }
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  const response = NextResponse.rewrite(url, { request: { headers } });
  response.headers.set("x-gaf-locale", locale);
  return response;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const parts = pathname.split("/").filter(Boolean);
  const head = parts[0];

  if (head && isTargetLocale(head)) {
    const rest = parts.length > 1 ? `/${parts.slice(1).join("/")}` : "/";
    if (rest.startsWith("/cms") || rest.startsWith("/api")) {
      const url = request.nextUrl.clone();
      url.pathname = rest;
      return NextResponse.redirect(url);
    }
    return withLocale(request, head, rest);
  }

  const isCms = pathname.startsWith("/cms") || pathname.startsWith("/api/cms");
  if (!isCms) {
    return withLocale(request, "en");
  }

  if (pathname === "/cms/login" || pathname === "/api/cms/login") {
    return NextResponse.next();
  }
  const expected = await cmsToken(cmsPassword());
  const token = request.cookies.get(CMS_COOKIE)?.value;
  if (token === expected) {
    return NextResponse.next();
  }
  if (pathname.startsWith("/api/cms")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const login = new URL("/cms/login", request.url);
  login.searchParams.set("next", pathname);
  return NextResponse.redirect(login);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|uploads/|.*\\..*).*)",
  ],
};
