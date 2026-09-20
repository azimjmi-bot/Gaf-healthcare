/**
 * Resolves the country and city segments of a Treatment Cost URL onto the records the
 * cost CMS actually holds for that procedure.
 *
 * Country records live in `CostArticle.destinations` and city records in
 * `CostArticle.cities`. Neither is keyed by taxonomy, so this module is the single
 * place that joins editorial rows to `COUNTRIES` / `CITIES`. A country or city with no
 * record resolves to `undefined`, which is what keeps the routes from inventing a page
 * for a place the CMS has never described.
 */
import type { CityEditorial, CostArticle, DestinationRow } from "@/data/cost-articles/types";
import {
  getCity,
  getCountry,
  isPrimaryCountry,
  type CityTaxon,
  type CountryTaxon,
} from "@/lib/taxonomy";

export type CostCountryRecord = {
  /** Taxonomy row. Owns the URL segment and the canonical path. */
  country: CountryTaxon;
  /** Name as written in the CMS row, which is what headings and copy use. */
  label: string;
  row: DestinationRow;
  isPrimary: boolean;
};

export type CostCityRecord = {
  city: CityTaxon;
  country: CountryTaxon;
  editorial: CityEditorial;
};

/** The destination row for one country, or undefined when the CMS has no row for it. */
export function costCountryRecord(
  article: Pick<CostArticle, "destinations">,
  countryNameOrSlug?: string,
): CostCountryRecord | undefined {
  const country = getCountry(countryNameOrSlug ?? "India");
  if (!country) return undefined;
  const row = article.destinations.find((entry) => getCountry(entry.country)?.slug === country.slug);
  if (!row) return undefined;
  return {
    country,
    label: row.country,
    row,
    isPrimary: isPrimaryCountry(country.slug),
  };
}

/** Countries this procedure can be published under, in CMS order. */
export function costCountryRecords(article: Pick<CostArticle, "destinations">): CostCountryRecord[] {
  const seen = new Set<string>();
  const rows: CostCountryRecord[] = [];
  for (const entry of article.destinations) {
    const record = costCountryRecord(article, entry.country);
    if (!record || seen.has(record.country.slug)) continue;
    seen.add(record.country.slug);
    rows.push(record);
  }
  return rows;
}

/**
 * The city record for one country/city pair. The city must belong to the country in the
 * taxonomy, so /costs/Turkiye/Mumbai/... never resolves even though Mumbai has records.
 */
export function costCityRecord(
  article: Pick<CostArticle, "cities">,
  countryNameOrSlug: string | undefined,
  cityNameOrSlug: string,
): CostCityRecord | undefined {
  const country = getCountry(countryNameOrSlug ?? "India");
  const city = getCity(cityNameOrSlug);
  if (!country || !city || city.countrySlug !== country.slug) return undefined;
  const editorial = article.cities.find((row) => row.citySlug === city.slug);
  if (!editorial) return undefined;
  return { city, country, editorial };
}

/** Cities this procedure can be published under for one country, in CMS order. */
export function costCityRecords(
  article: Pick<CostArticle, "cities">,
  countryNameOrSlug?: string,
): CostCityRecord[] {
  const rows: CostCityRecord[] = [];
  for (const entry of article.cities) {
    const record = costCityRecord(article, countryNameOrSlug, entry.citySlug);
    if (record) rows.push(record);
  }
  return rows;
}

/** "Istanbul, Turkey" for a city page, "Turkey" for a country page. */
export function costPlaceLabel(countryLabel: string, cityName?: string) {
  return cityName ? `${cityName}, ${countryLabel}` : countryLabel;
}
