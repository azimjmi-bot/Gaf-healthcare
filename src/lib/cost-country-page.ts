/**
 * Resolves `/costs/{country}/{specialty}/{procedure}` and
 * `/costs/{country}/{city}/{specialty}/{procedure}` for every destination other than
 * the primary one, whose long-form article keeps its own flat cost sheet.
 *
 * Nothing here knows a country by name. A URL resolves only when the procedure's CMS
 * record describes that country — and, for a city URL, that city — so a destination the
 * catalog has never written about 404s instead of inheriting another country's page.
 */
import "server-only";
import type { CostArticle } from "@/data/cost-articles/types";
import { getCostArticle } from "@/data/cost-articles";
import { costsFilterPath } from "@/lib/catalog-links";
import type { CatalogQuery } from "@/lib/catalog-options";
import {
  catalogSpecialtyName,
  costDestinationRows,
  interpolateCostArticle,
} from "@/lib/cost-article";
import {
  costCityRecord,
  costCountryRecord,
  costPlaceLabel,
  type CostCityRecord,
  type CostCountryRecord,
} from "@/lib/cost-geo";
import { treatments } from "@/lib/data";
import { withContextualTreatmentImages } from "@/lib/treatment-images";
import type { Treatment } from "@/lib/treatments";

export type CostCountryPage = {
  treatment: Treatment;
  article: CostArticle;
  record: CostCountryRecord;
  /** Set on `/costs/{country}/{city}/...`, absent on the country page. */
  city?: CostCityRecord;
  /** Band for this place: the city figure, else the country figure, else the modelled one. */
  range: string;
  modelled: boolean;
  relative: string;
  stay: string;
  /** Canonical path for this country/city combination. */
  path: string;
  heading: string;
  brief: string;
  specialty: string;
};

export function resolveCostCountryPage(query: CatalogQuery): CostCountryPage | undefined {
  const treatment = query.procedure
    ? treatments.find((row) => row.name === query.procedure)
    : undefined;
  if (!treatment) return undefined;
  const raw = getCostArticle(treatment.slug);
  if (!raw) return undefined;
  const article = withContextualTreatmentImages(interpolateCostArticle(raw, treatment), treatment);

  const record = costCountryRecord(article, query.destination);
  if (!record || record.isPrimary) return undefined;

  const { rows } = costDestinationRows(article, treatment);
  const row = rows.find((entry) => entry.country === record.row.country);
  if (!row) return undefined;

  const city = query.city ? costCityRecord(article, record.country.name, query.city) : undefined;
  if (query.city && !city) return undefined;

  const specialty = query.specialty || catalogSpecialtyName(treatment);
  const brief = article.briefName || article.procedure;
  const cityPage = city?.editorial.page;
  const heading =
    cityPage?.heading ??
    (city
      ? `${brief} Cost in ${costPlaceLabel(record.label, city.city.name)}`
      : (record.row.page?.heading ?? `${brief} Cost in ${record.label}`));

  return {
    treatment,
    article,
    record,
    city,
    range: city?.editorial.costRange ?? row.range,
    modelled: city?.editorial.costRange ? false : row.modelled,
    relative: row.relative,
    stay: city?.editorial.stay ?? row.stay,
    path: costsFilterPath({
      destination: record.country.name,
      city: city?.city.name,
      specialty,
      procedure: treatment.name,
    }),
    heading,
    brief,
    specialty,
  };
}

/**
 * A country or city page is indexable once the CMS carries page copy for it, the same
 * bar the primary destination's city pages clear. Until then the URL resolves but stays
 * out of the index and the sitemap, so a bare destination row never becomes a thin
 * landing page.
 */
export function costCountryPageIsPublishable(page: CostCountryPage) {
  return Boolean(page.city ? page.city.editorial.page : page.record.row.page);
}
