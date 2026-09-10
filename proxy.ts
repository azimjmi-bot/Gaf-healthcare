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

function localeRewrite(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const parts = pathname.split("/").filter(Boolean);
  const head = parts[0];
  if (!head || !isTargetLocale(head)) {
    const headers = new Headers(request.headers);
    headers.set(LOCALE_HEADER, "en");
    return NextResponse.next({ request: { headers } });
  }

  const rest = `/${parts.slice(1).join("/")}` || "/";
  const restPath = rest === "/" ? "/" : rest.replace(/\/$/, "") || "/";

  if (restPath.startsWith("/cms") || restPath.startsWith("/api")) {
    const url = request.nextUrl.clone();
    url.pathname = restPath;
    return NextResponse.redirect(url);
  }

  const url = request.nextUrl.clone();
  url.pathname = restPath;
  const headers = new Headers(request.headers);
  headers.set(LOCALE_HEADER, head);
  return NextResponse.rewrite(url, { request: { headers } });
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] && isTargetLocale(parts[0])) {
    return localeRewrite(request);
  }

  const isCms = pathname.startsWith("/cms") || pathname.startsWith("/api/cms");
  if (!isCms) {
    return localeRewrite(request);
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
    "/cms/:path*",
    "/api/cms/:path*",
    "/ru",
    "/ru/:path*",
    "/fr",
    "/fr/:path*",
    "/ar",
    "/ar/:path*",
    "/sw",
    "/sw/:path*",
  ],
};
