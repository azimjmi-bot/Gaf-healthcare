import { DoctorsDirectory, doctorsDirectoryMetadata } from "@/app/doctors/directory";
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
  return doctorsDirectoryMetadata(parseCatalogQuery(await searchParams));
}

export default async function DoctorsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const raw = await searchParams;
  const query = parseCatalogQuery(raw);
  const page = readCatalogPage(raw);
  redirectPrettyCatalog("/doctors", query, page, await getRequestLocale());
  return <DoctorsDirectory query={query} page={page} />;
}
