import type { AppLocale } from "@/lib/i18n/languages";

export type LocaleSurface =
  | "home"
  | "consult"
  | "doctors"
  | "hospitals"
  | "costs"
  | "specialties"
  | "blogs";

/** Public navigation must expose only surfaces with authored locale content. */
export function localeSurfaceIsAvailable(
  locale: AppLocale,
  surface: LocaleSurface,
) {
  if (locale === "en" || surface === "home") return true;
  if (locale === "ar") {
    return surface === "doctors" || surface === "hospitals";
  }
  return false;
}
