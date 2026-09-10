import { HospitalsDirectory, hospitalsDirectoryMetadata } from "@/app/hospitals/directory";
import { parseCatalogQuery } from "@/lib/catalog-options";
import { readCatalogPage, redirectPrettyCatalog } from "@/lib/catalog-route";
import { getRequestLocale } from "@/lib/i18n/request";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}): Promise<Metadata> {
  return hospitalsDirectoryMetadata(parseCatalogQuery(await searchParams));
}

export default async function HospitalsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const raw = await searchParams;
  const query = parseCatalogQuery(raw);
  const page = readCatalogPage(raw);
  redirectPrettyCatalog("/hospitals", query, page, await getRequestLocale());
  return <HospitalsDirectory query={query} page={page} />;
}
