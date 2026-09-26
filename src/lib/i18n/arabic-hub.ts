import "server-only";
import { filterDoctors, filterHospitals } from "@/lib/catalog";
import { citiesForDestination, type CatalogQuery } from "@/lib/catalog-options";
import { doctorsForLocale, hospitalsForLocale } from "@/lib/locale-catalog";
import type { AppLocale } from "@/lib/i18n/languages";
import { doctorHubCopy, hospitalHubCopy, type HubCopy } from "@/lib/i18n/hub-copy";

/**
 * The counts the hub copy quotes, measured once, here.
 *
 * The route and the samples script both come through this module rather than
 * each assembling their own facts, because a sample that was produced by
 * different arithmetic from the page is not a sample of the page. Reviewing
 * `npm run samples:hub` is only worth anything if what it prints is what the
 * URL serves.
 */

function doctorFacts(query: CatalogQuery, locale: AppLocale) {
  const doctors = doctorsForLocale(locale);
  return {
    doctors: filterDoctors(query, doctors).length,
    // The campus count answers "where could I be treated", which a procedure
    // filter would understate: a house is listed for the specialty whether or
    // not this particular procedure is mapped at it.
    hospitals: filterHospitals({ ...query, procedure: undefined }, hospitalsForLocale(locale)).length,
    cities: citiesForDestination(query.destination ?? "India").filter(
      (city) => filterDoctors({ ...query, city }, doctors).length > 0,
    ).length,
  };
}

function hospitalFacts(query: CatalogQuery, locale: AppLocale) {
  const staff = filterDoctors(query, doctorsForLocale(locale));
  return {
    hospitals: filterHospitals(query, hospitalsForLocale(locale)).length,
    doctors: staff.length,
    procedures: query.procedure
      ? 1
      : new Set(staff.flatMap((doctor) => doctor.procedures ?? [])).size,
  };
}

export function arabicDoctorHub(query: CatalogQuery, locale: AppLocale): HubCopy | undefined {
  if (!query.specialty) return undefined;
  return doctorHubCopy(locale, query, doctorFacts(query, locale));
}

export function arabicHospitalHub(query: CatalogQuery, locale: AppLocale): HubCopy | undefined {
  if (!query.specialty) return undefined;
  return hospitalHubCopy(locale, query, hospitalFacts(query, locale));
}
