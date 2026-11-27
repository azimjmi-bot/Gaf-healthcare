import { catalogHospitals } from "@/lib/hospitals";
import { catalogTreatments } from "@/lib/treatments";
import type { AppLocale } from "@/lib/i18n/languages";
import { hospitalsForLocale, treatmentsForLocale } from "@/lib/locale-catalog";

/** One choice in the consultation form's treatment or hospital select. */
export type ConsultOption = { slug: string; name: string };

/**
 * The choices the consultation form offers, computed on the server and passed
 * to the client component as props. The form used to import `hospitals` and
 * `treatments` directly, which pulled the whole static catalog (4.6 MB of
 * JSON) into the browser bundle of `/consult` and into the SSR layer of the
 * server bundle, to show 37 hospital names and 380 treatment names.
 */
export function consultTreatmentOptions(locale: AppLocale = "en"): ConsultOption[] {
  if (locale === "en") {
    return catalogTreatments.map((t) => ({ slug: t.slug, name: t.name }));
  }
  const localized = treatmentsForLocale(locale);
  return (localized.length > 0 ? localized : catalogTreatments).map((t) => ({
    slug: t.slug,
    name: t.name,
  }));
}

export function consultHospitalOptions(locale: AppLocale = "en"): ConsultOption[] {
  if (locale === "en") {
    return catalogHospitals.map((h) => ({ slug: h.slug, name: h.name }));
  }
  const localized = hospitalsForLocale(locale);
  return (localized.length > 0 ? localized : catalogHospitals).map((h) => ({
    slug: h.slug,
    name: h.name,
  }));
}
