import type { MetadataRoute } from "next";
import { absoluteUrl, SITE_URL } from "@/lib/seo";
import { LOCALES } from "@/lib/i18n/languages";
import { LANGUAGE_SITEMAP_PATHS } from "@/lib/i18n/sitemap-entries";

/** Verified Google Search Console property: https://gaf.healthcare */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/cms", "/api/cms", "/doctors/compare"] },
    ],
    sitemap: LOCALES.map((locale) =>
      absoluteUrl(LANGUAGE_SITEMAP_PATHS[locale]),
    ),
    host: SITE_URL,
  };
}
