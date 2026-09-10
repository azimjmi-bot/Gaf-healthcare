import { NextResponse, type NextRequest } from "next/server";
import {
  catalogQueryFromSearchParams,
  catalogQueryToSearchString,
  hasCatalogFacets,
  parsePrettyCatalogSegments,
  prettyCatalogPath,
  type CatalogBasePath,
} from "@/lib/pretty-catalog-path";

const BASES = new Set<CatalogBasePath>(["/costs", "/doctors", "/hospitals"]);

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const parts = pathname.split("/").filter(Boolean);
  const root = `/${parts[0] ?? ""}` as CatalogBasePath;
  if (!BASES.has(root)) return NextResponse.next();

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

export const config = {
  matcher: [
    "/costs",
    "/costs/:path*",
    "/doctors",
    "/doctors/:path*",
    "/hospitals",
    "/hospitals/:path*",
  ],
};
