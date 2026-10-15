import { NextResponse } from "next/server";
import { arabicRadiationCityUniquenessReport } from "@/lib/i18n/ar-radiation-directory";
import { renderArabicRadiationHtml } from "@/lib/i18n/arabic-radiation-html";
import { parsePrettyCatalogSegments, toPrettySegment } from "@/lib/pretty-catalog-path";

export const runtime = "nodejs";
export const dynamic = "force-static";
export const revalidate = 300;

export function generateStaticParams() {
  return [
    { segments: ["India", "Radiation-Oncology"] },
    ...arabicRadiationCityUniquenessReport().map((row) => ({
      segments: ["India", toPrettySegment(row.city), "Radiation-Oncology"],
    })),
  ];
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ segments: string[] }> },
) {
  const { segments } = await context.params;
  const query = parsePrettyCatalogSegments(segments);
  if (!query) return new NextResponse("Not Found", { status: 404 });
  const html = renderArabicRadiationHtml(query);
  if (!html) return new NextResponse("Not Found", { status: 404 });
  return new NextResponse(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=86400",
      "CDN-Cache-Control": "public, s-maxage=300, stale-while-revalidate=86400",
      "x-gaf-locale": "ar",
    },
  });
}
