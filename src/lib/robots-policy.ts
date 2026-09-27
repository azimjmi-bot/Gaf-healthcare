import type { MetadataRoute } from "next";
import { LOCALES, isTargetLocale } from "@/lib/i18n/languages";
import { localeIsPublished } from "@/lib/i18n/locale-gating";
import { SITE_URL, absoluteUrl } from "@/lib/seo-url";

/**
 * Crawl policy for /robots.txt. Keep this in lockstep with `src/app/robots.txt`
 * — the static file is what crawlers and PageSpeed fetch. A generated
 * `robots.ts` route was timing out in Lighthouse and advertising
 * `Host: https://…`, which is invalid (Host is a hostname, not a URL).
 */
export function robotsPolicy(): MetadataRoute.Robots {
  return {
    rules: [
      // Nothing that carries a noindex tag may be disallowed here: unpublished
      // Arabic facets have to stay crawlable for the tag to ever be read.
      { userAgent: "*", allow: "/", disallow: ["/cms", "/api/cms", "/doctors/compare"] },
    ],
    sitemap: [
      absoluteUrl("/sitemap.xml"),
      ...LOCALES.filter(
        (locale) => !isTargetLocale(locale) || localeIsPublished(locale),
      ).map((locale) => absoluteUrl(`/sitemap-${locale}.xml`)),
      absoluteUrl("/sitemap-blogs.xml"),
    ],
    host: new URL(SITE_URL).host,
  };
}

export function robotsTxtBody(policy: MetadataRoute.Robots = robotsPolicy()) {
  const rules = Array.isArray(policy.rules) ? policy.rules : [policy.rules];
  const lines: string[] = [];
  for (const rule of rules) {
    for (const agent of [rule.userAgent ?? "*"].flat()) {
      lines.push(`User-Agent: ${agent}`);
    }
    for (const allow of [rule.allow ?? []].flat()) {
      lines.push(`Allow: ${allow}`);
    }
    for (const disallow of [rule.disallow ?? []].flat()) {
      lines.push(`Disallow: ${disallow}`);
    }
    lines.push("");
  }
  if (policy.host) lines.push(`Host: ${policy.host}`);
  for (const sitemap of [policy.sitemap ?? []].flat()) {
    lines.push(`Sitemap: ${sitemap}`);
  }
  lines.push("");
  return lines.join("\n");
}
