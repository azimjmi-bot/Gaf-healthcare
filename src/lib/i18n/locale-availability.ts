import type { AppLocale } from "@/lib/i18n/languages";

export type LocaleSurface =
  | "home"
  | "consult"
  | "doctors"
  | "hospitals"
  | "treatments"
  | "costs"
  | "specialties"
  | "blogs";

export type SurfaceFacts = {
  /** Whether this locale has at least one published curated treatment. */
  treatmentsPublished: boolean;
};

/**
 * Public navigation must expose only surfaces with authored locale content.
 *
 * `treatments` used to be hardcoded as always available, which linked every
 * Arabic page to a directory that has nothing in it. It now follows the same
 * rule as the page itself, so the nav and the route agree.
 */
export function localeSurfaceIsAvailable(
  locale: AppLocale,
  surface: LocaleSurface,
  facts: SurfaceFacts,
) {
  if (surface === "treatments") {
    return locale === "en" || facts.treatmentsPublished;
  }
  if (locale === "en" || surface === "home") return true;
  if (locale === "ar") {
    return surface === "doctors" || surface === "hospitals";
  }
  return false;
}
