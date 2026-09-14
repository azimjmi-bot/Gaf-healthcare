import { costArticles } from "@/data/cost-articles";
import type { SpecialtyCityEditorial } from "./types";

function withoutProcedureTokens(value: string) {
  return value
    .replace(/\[INDIA_COST\]/g, "the stored India planning range")
    .replace(/\[US_COST\]/g, "the stored US comparison range")
    .replace(/\[STAY\]/g, "the procedure-specific stay guidance");
}

function unique(values: Array<string | undefined>) {
  return [
    ...new Set(
      values
        .filter((value): value is string => Boolean(value?.trim()))
        .map(withoutProcedureTokens),
    ),
  ];
}

/**
 * Reuses researched city information already attached to procedure articles.
 * It never creates a city or capability claim from a specialty name alone.
 */
export function cityEditorialsFromProcedureArticles(
  procedureSlugs: string[],
): SpecialtyCityEditorial[] {
  const articles = procedureSlugs
    .map((slug) => costArticles[slug])
    .filter((article) => Boolean(article));
  const citySlugs = new Set(
    articles.flatMap((article) =>
      article.cities.filter((city) => city.page).map((city) => city.citySlug),
    ),
  );

  return [...citySlugs].flatMap((citySlug) => {
    const rows = articles
      .map((article) => article.cities.find((city) => city.citySlug === citySlug))
      .filter((city) => Boolean(city?.page));
    const introduction = unique([
      ...rows.map((city) => city?.ecosystem),
      ...rows.map((city) => city?.page?.intro[0]),
    ]).slice(0, 2);
    const whyCity = unique(
      rows.flatMap((city) => city?.page?.hospitalDiscussion ?? []),
    ).slice(0, 2);
    const planning = unique(
      rows.flatMap((city) => city?.page?.medicalTourism ?? []),
    ).slice(0, 2);
    const logistics = unique([
      ...rows.map((city) => city?.logistics),
      ...rows.map((city) => city?.page?.medicalTourism[1]),
    ]).slice(0, 2);
    const faqExtras = rows
      .flatMap((city) => city?.page?.faqs ?? [])
      .filter(
        (faq, index, all) =>
          all.findIndex((candidate) => candidate.q === faq.q) === index,
      )
      .map((faq) => ({
        q: withoutProcedureTokens(faq.q),
        a: withoutProcedureTokens(faq.a),
      }))
      .slice(0, 3);

    if (
      introduction.length === 0 ||
      whyCity.length === 0 ||
      planning.length === 0 ||
      logistics.length === 0 ||
      faqExtras.length === 0
    ) {
      return [];
    }
    return [{
      citySlug,
      introduction,
      whyCity,
      planning,
      logistics,
      faqExtras,
    }];
  });
}
