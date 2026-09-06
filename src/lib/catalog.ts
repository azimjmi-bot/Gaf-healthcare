import { doctors, type Doctor } from "@/lib/doctors";
import { hospitals, type Hospital } from "@/lib/hospitals";
import { treatments, type Treatment } from "@/lib/treatments";
import {
  CITIES,
  COUNTRIES,
  INDIA_CITIES,
  PROCEDURES,
  SPECIALTIES,
  citiesInCountry,
} from "@/lib/taxonomy";

export { INDIA_CITIES };

export type CatalogEntity = "doctors" | "hospitals" | "treatments";

export type CatalogQuery = {
  destination?: string;
  city?: string;
  specialty?: string;
  procedure?: string;
};

export function parseCatalogQuery(
  params: Record<string, string | string[] | undefined>,
): CatalogQuery {
  const one = (k: keyof CatalogQuery) => {
    const v = params[k];
    const s = Array.isArray(v) ? v[0] : v;
    return s && s !== "all" ? s : undefined;
  };
  return {
    destination: one("destination"),
    city: one("city"),
    specialty: one("specialty"),
    procedure: one("procedure"),
  };
}

export const catalogDestinations = COUNTRIES.map((c) => c.name);

export const catalogCities = CITIES.map((c) => c.name);

export const catalogSpecialties = SPECIALTIES.map((s) => s.name);

export const catalogProcedures = PROCEDURES.map((p) => p.name);

export function citiesForDestination(destination?: string) {
  if (!destination) return catalogCities;
  return citiesInCountry(destination).map((c) => c.name);
}

export function cityResultCounts(entity: CatalogEntity, q: CatalogQuery) {
  const withoutCity = { ...q, city: undefined };
  const rows =
    entity === "doctors"
      ? filterDoctors(withoutCity)
      : entity === "hospitals"
        ? filterHospitals(withoutCity)
        : filterTreatments(withoutCity);
  const cities = citiesForDestination(q.destination);
  const counts: Record<string, number> = {};
  for (const city of cities) {
    counts[city] = rows.filter((row) => {
      if (entity === "hospitals") return (row as Hospital).city === city;
      if (entity === "doctors") return (row as Doctor).city === city;
      const campuses = (row as Treatment).hospitalSlugs
        .map((s) => hospitals.find((h) => h.slug === s))
        .filter(Boolean);
      return campuses.some((h) => h?.city === city);
    }).length;
  }
  return { total: rows.length, counts };
}

function hospitalMatches(h: Hospital, q: CatalogQuery) {
  if (q.destination && h.country !== q.destination) return false;
  if (q.city && h.city !== q.city) return false;
  return true;
}

export function filterHospitals(q: CatalogQuery): Hospital[] {
  return hospitals.filter((h) => {
    if (!hospitalMatches(h, q)) return false;
    const faculty = doctors.filter((d) => d.hospitalSlug === h.slug);
    if (q.specialty && !faculty.some((d) => d.specialty === q.specialty)) return false;
    const procedure = q.procedure;
    if (procedure && !faculty.some((d) => d.procedures.includes(procedure))) return false;
    return true;
  });
}

export function filterTreatments(q: CatalogQuery): Treatment[] {
  return treatments.filter((t) => {
    if (q.procedure && !t.procedures.includes(q.procedure) && t.procedureSlug !== q.procedure) {
      return false;
    }
    const campuses = t.hospitalSlugs
      .map((s) => hospitals.find((h) => h.slug === s))
      .filter((h): h is Hospital => Boolean(h));
    if (q.destination && !campuses.some((h) => h.country === q.destination)) return false;
    if (q.city && !campuses.some((h) => h.city === q.city)) return false;
    if (q.specialty) {
      const faculty = doctors.filter(
        (d) => d.treatmentSlugs.includes(t.slug) && d.specialty === q.specialty,
      );
      if (faculty.length === 0) return false;
    }
    return true;
  });
}

export function filterDoctors(q: CatalogQuery): Doctor[] {
  return doctors.filter((d) => {
    if (q.destination && d.country !== q.destination) return false;
    if (q.city && d.city !== q.city) return false;
    if (q.specialty && d.specialty !== q.specialty) return false;
    if (q.procedure && !d.procedures.includes(q.procedure) && !d.procedureSlugs.includes(q.procedure)) {
      return false;
    }
    return true;
  });
}
