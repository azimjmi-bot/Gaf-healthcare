import { NextResponse } from "next/server";
import { catalogFilterTarget } from "@/lib/catalog-filter";
import { getRequestLocale } from "@/lib/i18n/request";
import { localePath } from "@/lib/i18n/path";
import { catalogQueryFromSearchParams, type CatalogBasePath } from "@/lib/pretty-catalog-path";

/** No-JavaScript submit target: turn the four fields into the pretty catalog URL. */
export async function redirectCatalogFilter(request: Request, base: CatalogBasePath) {
  const locale = await getRequestLocale();
  const query = catalogQueryFromSearchParams(new URL(request.url).searchParams);
  const target = localePath(catalogFilterTarget(base, query), locale);
  return NextResponse.redirect(new URL(target, request.url), 302);
}
