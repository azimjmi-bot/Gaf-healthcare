import type { Metadata } from "next";
import {
  costCountryPageIsPublishable,
  resolveCostCountryPage,
} from "@/lib/cost-country-page";
import { costPlaceLabel } from "@/lib/cost-geo";
import type { CatalogQuery } from "@/lib/catalog";
import { absoluteUrl } from "@/lib/seo";

export function costCountryMetadata(query: CatalogQuery): Metadata | undefined {
  const resolved = resolveCostCountryPage(query);
  if (!resolved) return undefined;
  const { record, city, range, stay, path, heading, brief, specialty } = resolved;
  const page = city?.editorial.page ?? record.row.page;
  const place = costPlaceLabel(record.label, city?.city.name);
  const title = page?.seoTitle ?? `${heading}: ${specialty} Prices & What to Confirm`;
  const description =
    page?.seoDescription ??
    `${brief} planning cost in ${place}: ${range}, ${stay.toLowerCase()}. ${record.row.positioning ?? "Private self-pay market"}. Compare against the India band before you ask for a written quotation.`;
  const url = absoluteUrl(path);
  const publishable = costCountryPageIsPublishable(resolved);
  return {
    title,
    description,
    robots: publishable ? undefined : { index: false, follow: true },
    alternates: publishable ? { canonical: url } : { canonical: url, languages: {} },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      ...(publishable ? {} : { alternateLocale: [] }),
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
