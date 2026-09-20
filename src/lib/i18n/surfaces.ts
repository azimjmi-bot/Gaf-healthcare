import "server-only";
import { publishedCuratedTreatments } from "@/lib/cms/curated-treatment-store";
import type { AppLocale } from "@/lib/i18n/languages";
import {
  localeSurfaceIsAvailable,
  type LocaleSurface,
} from "@/lib/i18n/locale-availability";

const ALL_SURFACES: readonly LocaleSurface[] = [
  "home",
  "consult",
  "doctors",
  "hospitals",
  "treatments",
  "costs",
  "specialties",
  "blogs",
];

/**
 * Resolved once per request in the root layout and handed to the client through
 * LocaleProvider, because deciding which nav links exist needs the treatment
 * store and header, footer and CTA bands are all client components.
 */
export function availableSurfaces(locale: AppLocale): LocaleSurface[] {
  const facts = { treatmentsPublished: publishedCuratedTreatments(locale).length > 0 };
  return ALL_SURFACES.filter((surface) => localeSurfaceIsAvailable(locale, surface, facts));
}

/** For server components, which cannot reach the client-side locale context. */
export function surfaceIsAvailable(locale: AppLocale, surface: LocaleSurface) {
  return availableSurfaces(locale).includes(surface);
}
