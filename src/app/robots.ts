import type { MetadataRoute } from "next";
import { absoluteUrl, SITE_URL } from "@/lib/seo";
import { LOCALES, isTargetLocale } from "@/lib/i18n/languages";
import { localeIsPublished } from "@/lib/i18n/locale-gating";
import { LANGUAGE_SITEMAP_PATHS } from "@/lib/i18n/sitemap-entries";

/** Verified Google Search Console property: https://gaf.healthcare */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Nothing that carries a noindex tag may be disallowed here: unpublished
      // Arabic facets have to stay crawlable for the tag to ever be read.
      { userAgent: "*", allow: "/", disallow: ["/cms", "/api/cms", "/doctors/compare"] },
    ],
    sitemap: LOCALES.filter(
      (locale) => !isTargetLocale(locale) || localeIsPublished(locale),
    ).map((locale) => absoluteUrl(LANGUAGE_SITEMAP_PATHS[locale])),
    host: SITE_URL,
  };
}
