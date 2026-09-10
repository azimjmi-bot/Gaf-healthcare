import { NextResponse, type NextRequest } from "next/server";
import {
  catalogQueryFromSearchParams,
  catalogQueryToSearchString,
  hasCatalogFacets,
  parsePrettyCatalogSegments,
  prettyCatalogPath,
  type CatalogBasePath,
} from "@/lib/pretty-catalog-path";

const CMS_COOKIE = "gaf_cms";
const CATALOG_BASES = new Set<CatalogBasePath>(["/costs", "/doctors", "/hospitals"]);

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

async function protectCms(request: NextRequest) {
  const { pathname } = request.nextUrl;
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

function rewriteCatalog(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const parts = pathname.split("/").filter(Boolean);
  const root = `/${parts[0] ?? ""}` as CatalogBasePath;
  if (!CATALOG_BASES.has(root)) return NextResponse.next();

  if (parts.length === 1) {
    const query = catalogQueryFromSearchParams(searchParams);
    if (!hasCatalogFacets(query)) return NextResponse.next();
    const pretty = prettyCatalogPath(root, query);
    // Specialty/procedure without a country stay as query strings so they
    // cannot collide with /costs/{procedure-slug} sheets.
    if (pretty.includes("?") || pretty === root) return NextResponse.next();
    const target = request.nextUrl.clone();
    target.pathname = pretty;
    const leftover = new URLSearchParams(searchParams.toString());
    leftover.delete("destination");
    leftover.delete("city");
    leftover.delete("specialty");
    leftover.delete("procedure");
    leftover.delete("condition");
    target.search = leftover.toString();
    return NextResponse.redirect(target, 301);
  }

  const query = parsePrettyCatalogSegments(parts.slice(1));
  if (!query) return NextResponse.next();

  const pretty = prettyCatalogPath(root, query);
  if (pathname !== pretty) {
    const target = request.nextUrl.clone();
    target.pathname = pretty;
    return NextResponse.redirect(target, 301);
  }

  const rewrite = request.nextUrl.clone();
  rewrite.pathname = root;
  const nextSearch = new URLSearchParams(catalogQueryToSearchString(query));
  const page = searchParams.get("page");
  if (page) nextSearch.set("page", page);
  rewrite.search = nextSearch.toString();
  return NextResponse.rewrite(rewrite);
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/cms") || pathname.startsWith("/api/cms")) {
    return protectCms(request);
  }
  return rewriteCatalog(request);
}

export const config = {
  matcher: [
    "/cms/:path*",
    "/api/cms/:path*",
    "/costs",
    "/costs/:path*",
    "/doctors",
    "/doctors/:path*",
    "/hospitals",
    "/hospitals/:path*",
  ],
};
