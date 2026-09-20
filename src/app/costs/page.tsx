import { permanentRedirect } from "next/navigation";
import { parseCatalogQuery } from "@/lib/catalog-options";
import { costsFilterPath } from "@/lib/catalog-links";
import { redirectPrettyCatalog } from "@/lib/catalog-route";
import { CostsDirectory, costsDirectoryMetadata } from "@/app/costs/directory";
import { treatments } from "@/lib/data";
import { localePath } from "@/lib/i18n/path";
import { getRequestLocale } from "@/lib/i18n/request";
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
  const locale = await getRequestLocale();
  // A ?procedure= query has no destination of its own, so send it to that
  // procedure's canonical country path rather than rendering it here.
  if (query.procedure && !query.city && !query.destination) {
    const treatment = treatments.find((row) => row.name === query.procedure);
    if (treatment) {
      permanentRedirect(
        localePath(costsFilterPath({ specialty: query.specialty, procedure: treatment.name }), locale),
      );
    }
  }
  redirectPrettyCatalog("/costs", query, 1, locale);
  return <CostsDirectory query={query} />;
}
