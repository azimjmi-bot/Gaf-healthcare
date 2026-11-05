import { SOURCE_LOCALE } from "@/lib/i18n/languages";
import { stripLocalePrefix } from "@/lib/i18n/path";
import { getRequestLocale, getRequestPath } from "@/lib/i18n/request";

/**
 * Structured data is a set of claims about a page a crawler is meant to index.
 * A page carrying noindex is making no such claim, and the nodes it would emit
 * name themselves by their own URL, so emitting them would hand Google entity
 * and document identities for URLs we have just asked it to drop. Unpublished
 * pages therefore render no JSON-LD at all.
 */
export async function JsonLd({ data }: { data: unknown }) {
  const locale = await getRequestLocale();
  const path = await getRequestPath();
  const segments = stripLocalePrefix(path).pathname.split("/").filter(Boolean);
  const english = locale === SOURCE_LOCALE && segments[0] !== "treatments";
  const published = english
    ? true
    : (await import("@/lib/i18n/locale-publication")).localePathIsPublished(locale, path);
  if (!published) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
