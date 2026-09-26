import { SOURCE_LOCALE, type AppLocale } from "@/lib/i18n/languages";
import { localePath } from "@/lib/i18n/path";

export const SITE_URL = "https://gaf.healthcare";

/**
 * Lives apart from seo.ts so the JSON-LD identity helpers can build URLs
 * without seo.ts and jsonld.ts importing each other.
 */
export function absoluteUrl(path = "/", locale: AppLocale = SOURCE_LOCALE) {
  if (!path.startsWith("/")) path = `/${path}`;
  return new URL(localePath(path, locale), SITE_URL).toString();
}
