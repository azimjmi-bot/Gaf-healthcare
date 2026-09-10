import { parseCatalogQuery } from "@/lib/catalog";
import { redirectPrettyCatalog } from "@/lib/catalog-route";
import { CostsDirectory, costsDirectoryMetadata } from "@/app/costs/directory";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}): Promise<Metadata> {
  return costsDirectoryMetadata(parseCatalogQuery(await searchParams));
}

export default async function CostsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = parseCatalogQuery(await searchParams);
  redirectPrettyCatalog("/costs", query);
  return <CostsDirectory query={query} />;
}
