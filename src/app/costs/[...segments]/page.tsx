import { notFound, permanentRedirect } from "next/navigation";
import { CostSheet, costSheetMetadata } from "@/app/costs/cost-sheet";
import { CostsDirectory, costsDirectoryMetadata } from "@/app/costs/directory";
import { canonicalizePrettyPath, readCatalogPage } from "@/lib/catalog-route";
import { treatments } from "@/lib/data";
import { parsePrettyCatalogSegments } from "@/lib/pretty-catalog-path";
import { getRequestLocale } from "@/lib/i18n/request";
import { localePath } from "@/lib/i18n/path";
import { localePathIsPublished } from "@/lib/i18n/locale-publication";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export function generateStaticParams() {
  return treatments.map((t) => ({ segments: [t.slug] }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ segments: string[] }>;
}): Promise<Metadata> {
  const { segments } = await params;
  const locale = await getRequestLocale();
  if (!localePathIsPublished(locale, `/costs/${segments.join("/")}`)) {
    return { robots: { index: false, follow: false } };
  }
  const filter = parsePrettyCatalogSegments(segments);
  if (filter) return costsDirectoryMetadata(filter);
  if (segments.length === 1) return costSheetMetadata(segments[0]);
  return { title: "Treatment Cost" };
}

export default async function CostsCatchAllPage({
  params,
  searchParams,
}: {
  params: Promise<{ segments: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { segments } = await params;
  const locale = await getRequestLocale();
  if (!localePathIsPublished(locale, `/costs/${segments.join("/")}`)) notFound();
  const page = readCatalogPage(await searchParams);
  const filter = parsePrettyCatalogSegments(segments);
  if (filter) {
    if (filter.procedure && !filter.city) {
      const treatment = treatments.find((row) => row.name === filter.procedure);
      if (treatment) {
        permanentRedirect(localePath(`/costs/${treatment.slug}`, locale));
      }
    }
    canonicalizePrettyPath("/costs", segments, filter, page, locale);
    return <CostsDirectory query={filter} />;
  }
  if (segments.length === 1) return <CostSheet slug={segments[0]} />;
  notFound();
}
