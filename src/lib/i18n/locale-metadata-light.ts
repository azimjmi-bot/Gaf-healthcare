import type { Metadata } from "next";
import { lightLocalePageState } from "@/lib/i18n/cost-index-publication";
import { LANGUAGE_OG, LOCALES, SOURCE_LOCALE, type AppLocale } from "@/lib/i18n/languages";
import { localePath } from "@/lib/i18n/path";

const SITE_ORIGIN = "https://gaf.healthcare";

function localizedAbsoluteUrl(path: string, locale: AppLocale = SOURCE_LOCALE) {
  return new URL(localePath(path, locale), SITE_ORIGIN).toString();
}

function hreflangLanguages(englishPath: string, locales: readonly AppLocale[]) {
  const languages: Record<string, string> = {};
  if (locales.includes("en")) languages["x-default"] = localizedAbsoluteUrl(englishPath, "en");
  for (const locale of locales) languages[locale] = localizedAbsoluteUrl(englishPath, locale);
  return languages;
}

/**
 * The same alternates block as `withLocaleMetadata` for paths whose publication
 * does not depend on full treatment objects. Returns null when a locale still
 * needs the full publication module.
 */
export function withLightLocaleMetadata(
  meta: Metadata,
  englishPath: string,
  locale: AppLocale,
  availableLocales: readonly AppLocale[] = LOCALES,
): Metadata | null {
  const states = new Map(availableLocales.map((candidate) => [candidate, lightLocalePageState(candidate, englishPath)]));
  if ([...states.values()].some((state) => state === undefined)) return null;
  const self = states.get(locale);
  const selfPublished = self === "published";
  // Cost index paths are not doctor or hospital facets, so they stay self-canonical.
  const segments = englishPath.split("?")[0]?.split("/").filter(Boolean) ?? [];
  if (segments[0] === "doctors" || segments[0] === "hospitals") return null;
  const url = localizedAbsoluteUrl(englishPath, locale);
  const published = new Set(
    selfPublished ? availableLocales.filter((candidate) => states.get(candidate) === "published") : [],
  );
  const alternateLocales = availableLocales.filter((candidate) => candidate !== locale && published.has(candidate));
  const languages = selfPublished ? hreflangLanguages(englishPath, availableLocales.filter((candidate) => published.has(candidate))) : {};
  const og = meta.openGraph ? { ...meta.openGraph } : {};
  const twitter = meta.twitter ? { ...meta.twitter } : {};
  const robots = selfPublished ? meta.robots : { index: false, follow: true };
  return {
    ...meta,
    robots,
    alternates: {
      ...meta.alternates,
      canonical: url,
      languages,
    },
    openGraph: {
      ...og,
      url,
      locale: LANGUAGE_OG[locale],
      alternateLocale: alternateLocales.map((candidate) => LANGUAGE_OG[candidate]),
      siteName: typeof og.siteName === "string" ? og.siteName : "GAF Healthcare",
    },
    twitter,
  };
}
