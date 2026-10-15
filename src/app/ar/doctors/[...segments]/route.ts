import { NextResponse } from "next/server";
import { arabicRadiationCityUniquenessReport } from "@/lib/i18n/ar-radiation-directory";
import { renderArabicDoctorDirectoryHtml } from "@/lib/i18n/arabic-radiation-html";
import { localePath } from "@/lib/i18n/path";
import {
  parsePrettyCatalogSegments,
  prettyCatalogPath,
  toPrettySegment,
} from "@/lib/pretty-catalog-path";

// Static on purpose: the proxy only lets query-less /ar/doctors/India/... URLs
// reach this route, so every document it serves is page 1 of its facet and can
// be cached by path alone. Paginated or filtered requests (?page=, ?hospital=,
// ?experience=) are rewritten to the App Router, which reads search params.
export const runtime = "nodejs";
export const dynamic = "force-static";
export const revalidate = 300;

export function generateStaticParams() {
  return [
    { segments: ["India"] },
    { segments: ["India", "Radiation-Oncology"] },
    ...arabicRadiationCityUniquenessReport().map((row) => ({
      segments: ["India", toPrettySegment(row.city), "Radiation-Oncology"],
    })),
  ];
}

const HTML_HEADERS = {
  "Content-Type": "text/html; charset=utf-8",
  "Cache-Control": "public, s-maxage=300, stale-while-revalidate=86400",
  "CDN-Cache-Control": "public, s-maxage=300, stale-while-revalidate=86400",
  "x-gaf-locale": "ar",
};

export async function GET(
  _request: Request,
  context: { params: Promise<{ segments: string[] }> },
) {
  const { segments } = await context.params;
  const query = parsePrettyCatalogSegments(segments);
  if (!query || !query.destination) return new NextResponse("Not Found", { status: 404 });

  // Aliases (lower-case, slug spellings) resolve to one Title-Case address,
  // exactly as canonicalizePrettyPath does for the App Router.
  const pretty = prettyCatalogPath("/doctors", query);
  if (pretty !== `/doctors/${segments.join("/")}`) {
    return new NextResponse(null, {
      status: 308,
      headers: { Location: localePath(pretty, "ar"), "x-gaf-locale": "ar" },
    });
  }

  const html = renderArabicDoctorDirectoryHtml(query);
  if (!html) return new NextResponse("Not Found", { status: 404 });
  return new NextResponse(html, { status: 200, headers: HTML_HEADERS });
}
