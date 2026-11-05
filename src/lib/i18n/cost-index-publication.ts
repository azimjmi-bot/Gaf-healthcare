import "server-only";
import { loadCatalogCms } from "@/lib/cms/catalog-store";
import { translationStatus } from "@/lib/cms/catalog-types";
import { directoryCostRows } from "@/lib/cost-directory-index";
import { localeIsPublished } from "@/lib/i18n/locale-gating";
import { isTargetLocale, SOURCE_LOCALE, type AppLocale } from "@/lib/i18n/languages";
import { stripLocalePrefix } from "@/lib/i18n/path";

/**
 * Whether a locale publishes the bare /costs index.
 *
 * English is the directory itself. Other locales are published only when an
 * authored treatment patch is live. This reads catalog CMS documents and the
 * slim cost rows, not full treatment objects.
 */
export function costIndexHasRows(locale: AppLocale): boolean {
  if (locale === SOURCE_LOCALE) return true;
  const slugs = englishCostSlugs();
  const cms = loadCatalogCms(locale);
  const deleted = new Set(cms.treatmentsDeleted);
  for (const slug of slugs) {
    if (deleted.has(slug)) continue;
    if (treatmentPatchIsPublished(cms.treatmentOverrides[slug] as Record<string, unknown> | undefined)) return true;
  }
  for (const extra of cms.treatmentsAdded) {
    const slug = extra.slug;
    if (typeof slug !== "string" || !slug || deleted.has(slug) || slugs.has(slug)) continue;
    if (treatmentPatchIsPublished(extra)) return true;
  }
  return false;
}

function englishCostSlugs() {
  const cms = loadCatalogCms("en");
  const slugs = new Set(directoryCostRows.map((row) => row.slug));
  for (const slug of cms.treatmentsDeleted) slugs.delete(slug);
  for (const extra of cms.treatmentsAdded) {
    const slug = extra.slug;
    if (typeof slug === "string" && slug) slugs.add(slug);
  }
  return slugs;
}

function treatmentPatchIsPublished(patch: Record<string, unknown> | undefined) {
  return Boolean(
    patch &&
      translationStatus(patch) === "published" &&
      hasText(patch.summary) &&
      hasText(patch.notes) &&
      hasText(patch.stay) &&
      Array.isArray(patch.includes) &&
      patch.includes.length > 0,
  );
}

function hasText(value: unknown) {
  return typeof value === "string" && value.trim().length > 0;
}

function segmentsFor(path: string) {
  return stripLocalePrefix(path).pathname.split("/").filter(Boolean);
}

/**
 * Publication for paths that do not need the treatment catalog.
 * Undefined means the caller has to ask the full locale-publication module.
 */
export function lightLocalePageState(locale: AppLocale, path: string): "published" | "noindex" | "missing" | undefined {
  const segments = segmentsFor(path);
  if (segments[0] === "treatments") return undefined;
  if (locale === SOURCE_LOCALE) return "published";
  if (!isTargetLocale(locale)) return undefined;
  if (!(segments[0] === "costs" && segments.length === 1)) return undefined;
  const state = costIndexHasRows(locale) ? "published" : "missing";
  if (!localeIsPublished(locale)) return state === "published" ? "noindex" : state;
  return state;
}

export function lightLocalePathIsPublished(locale: AppLocale, path: string): boolean | undefined {
  const state = lightLocalePageState(locale, path);
  if (state === undefined) return undefined;
  return state === "published";
}
