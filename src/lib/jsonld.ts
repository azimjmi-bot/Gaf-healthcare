import "server-only";
import { SOURCE_LOCALE, type AppLocale } from "@/lib/i18n/languages";
import { localePathIsPublished } from "@/lib/i18n/locale-publication";
import { absoluteUrl } from "@/lib/seo-url";

/**
 * Two kinds of node, two kinds of identity.
 *
 * A doctor, a hospital or the clinic itself is one real-world thing however
 * many languages describe it, so its @id is anchored to the English canonical
 * and never varies. That is what lets an Arabic page say "this is the same
 * physician as the English page" instead of inventing a second person.
 *
 * A page is not a real-world thing; it is a document, and the Arabic document
 * is genuinely a different document from the English one. Those keep a per-URL
 * @id so the two never collapse into one node.
 */
export function entityId(path: string, fragment: string) {
  return `${absoluteUrl(path, SOURCE_LOCALE)}#${fragment}`;
}

export function documentId(path: string, locale: AppLocale, fragment: string) {
  return `${absoluteUrl(path, locale)}#${fragment}`;
}

/**
 * The same split decides where `inLanguage` belongs.
 *
 * Document nodes carry it: a page is written in one language, and the node is
 * scoped to that URL. Entity nodes must not, for two reasons. schema.org only
 * declares `inLanguage` on CreativeWork and friends, so a physician has no such
 * property; and because an entity's @id is shared across languages, tagging it
 * would assert that one node is simultaneously English and Arabic. The language
 * of the prose describing an entity is a fact about the page, not the entity.
 *
 * scripts/validate-jsonld.ts enforces this against the published vocabulary.
 */
export const LOCALISED_DOCUMENT_TYPES = [
  "WebPage",
  "MedicalWebPage",
  "ProfilePage",
  "CollectionPage",
  "FAQPage",
  "BreadcrumbList",
  "ItemList",
] as const;

/** The organisation behind every page, and the only entity with no own page. */
export const ORGANISATION_ID = entityId("/", "organisation");

/**
 * A URL for `path` in `locale`, falling back to English when this locale does
 * not publish it.
 *
 * Structured data is a set of assertions a crawler will follow, so pointing at
 * an Arabic URL that 404s or carries noindex is worse than pointing at the
 * English page that does exist.
 */
export function crawlableUrl(path: string, locale: AppLocale) {
  return localePathIsPublished(locale, path)
    ? absoluteUrl(path, locale)
    : absoluteUrl(path, SOURCE_LOCALE);
}

/** Drops keys whose value is absent or empty, so no field is asserted blank. */
export function compact<T extends Record<string, unknown>>(node: T): T {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(node)) {
    if (value === undefined || value === null || value === "") continue;
    if (Array.isArray(value) && value.length === 0) continue;
    out[key] = value;
  }
  return out as T;
}

/**
 * The Latin form of a name, for alternateName on an Arabic page. Returns
 * undefined when it would only repeat what name already says, so a node never
 * carries the same string twice.
 */
export function alternateName(localised: string, english: string) {
  return localised.trim() && localised.trim() !== english.trim() ? english : undefined;
}
