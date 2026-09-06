import { doctors, doctorsMatchingPseo, type DoctorPseoFacet } from "@/lib/doctors";
import { CITIES, COUNTRIES, PROCEDURES, SPECIALTIES } from "@/lib/taxonomy";

/**
 * Intended pSEO routes (not mounted yet):
 *   /doctors/{countrySlug}
 *   /doctors/{countrySlug}/{citySlug}
 *   /doctors/{countrySlug}/{citySlug}/{specialtySlug}
 *   /doctors/{countrySlug}/{citySlug}/{specialtySlug}/{procedureSlug}
 *
 * Every tuple below already has at least one doctor, so those pages will not 404.
 */

export type DoctorLanding = {
  countrySlug: string;
  country: string;
  citySlug: string;
  city: string;
  specialtySlug: string;
  specialty: string;
  procedureSlug: string;
  procedure: string;
  count: number;
};

export function listDoctorLandings(): DoctorLanding[] {
  const landings: DoctorLanding[] = [];
  for (const country of COUNTRIES) {
    for (const city of CITIES.filter((c) => c.countrySlug === country.slug)) {
      for (const specialty of SPECIALTIES) {
        for (const procedure of PROCEDURES.filter((p) => p.specialtySlug === specialty.slug)) {
          const facet: DoctorPseoFacet = {
            countrySlug: country.slug,
            citySlug: city.slug,
            specialtySlug: specialty.slug,
            procedureSlug: procedure.slug,
          };
          const count = doctorsMatchingPseo(facet).length;
          if (count === 0) continue;
          landings.push({
            countrySlug: country.slug,
            country: country.name,
            citySlug: city.slug,
            city: city.name,
            specialtySlug: specialty.slug,
            specialty: specialty.name,
            procedureSlug: procedure.slug,
            procedure: procedure.name,
            count,
          });
        }
      }
    }
  }
  return landings;
}

export function doctorCoverage() {
  return {
    doctors: doctors.length,
    countries: COUNTRIES.length,
    cities: CITIES.length,
    specialties: SPECIALTIES.length,
    procedures: PROCEDURES.length,
    landings: listDoctorLandings().length,
  };
}
