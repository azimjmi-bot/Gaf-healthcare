import type { Metadata } from "next";
import { LANGUAGE_OG, SOURCE_LOCALE, type AppLocale } from "@/lib/i18n/languages";
import { localePath } from "@/lib/i18n/path";
import { localePageState, publishedLocalesForPath } from "@/lib/i18n/locale-publication";
import { canonicalFacetPath } from "@/lib/i18n/facet-canonical";

export const SITE_ORIGIN = "https://gaf.healthcare";

export function localizedAbsoluteUrl(path: string, locale: AppLocale = SOURCE_LOCALE) {
  const prefixed = localePath(path, locale);
  return new URL(prefixed, SITE_ORIGIN).toString();
}

export function hreflangLanguages(englishPath: string, locales: readonly AppLocale[]) {
  const languages: Record<string, string> = {};
  if (locales.includes("en")) {
    languages["x-default"] = localizedAbsoluteUrl(englishPath, "en");
  }
  for (const locale of locales) {
    languages[locale] = localizedAbsoluteUrl(englishPath, locale);
  }
  return languages;
}

export function withLocaleMetadata(
  meta: Metadata,
  englishPath: string,
  locale: AppLocale,
  availableLocales: readonly AppLocale[],
): Metadata {
  const selfPublished = localePageState(locale, englishPath) === "published";

  // A facet that returns exactly its parent's records names the parent instead
  // of itself, so the duplicate consolidates rather than competing. Returns
  // englishPath unchanged for English and for anything that is not a duplicate
  // facet; see facet-canonical.ts for why English is excluded.
  const canonicalPath = canonicalFacetPath(englishPath, locale);
  const canonicalizedAway = canonicalPath !== englishPath;
  const url = localizedAbsoluteUrl(canonicalPath, locale);

  // A noindex page is not part of any language set. Advertising alternates
  // from one is a claim Google discards for lack of reciprocity, so these
  // pages go bare: canonical and robots only. A page that points its canonical
  // at another URL is making the same non-claim about itself — hreflang belongs
  // on the canonical of a language set, not on a duplicate that defers to one.
  const inLanguageSet = selfPublished && !canonicalizedAway;
  const published = new Set(inLanguageSet ? publishedLocalesForPath(englishPath) : []);
  const alternateLocales = availableLocales.filter(
    (candidate) => candidate !== locale && published.has(candidate),
  );
  const languages = inLanguageSet
    ? hreflangLanguages(englishPath, availableLocales.filter((c) => published.has(c)))
    : {};

  const og = meta.openGraph ? { ...meta.openGraph } : {};
  const twitter = meta.twitter ? { ...meta.twitter } : {};
  // Single place that turns "this page is not published in this locale" into a
  // robots tag, so no route can forget it. Callers keep any stricter robots
  // value they set themselves.
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
