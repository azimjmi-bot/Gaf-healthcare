import { doctors, type Doctor } from "@/lib/doctors";
import { hospitals, type Hospital } from "@/lib/hospitals";
import { treatments, type Treatment } from "@/lib/treatments";
import { INDIA_CITIES, SPECIALTIES, getSpecialty } from "@/lib/taxonomy";
import { citiesForDestination, type CatalogEntity, type CatalogQuery } from "@/lib/catalog-options";

export { INDIA_CITIES };
export type { CatalogEntity, CatalogQuery, CityChipStats } from "@/lib/catalog-options";
export {
  catalogCities,
  catalogDestinations,
  catalogProcedures,
  catalogProceduresFor,
  catalogSpecialties,
  citiesForDestination,
  parseCatalogQuery,
} from "@/lib/catalog-options";

function snapshot<T>(rows: readonly T[]): T[] {
  return typeof (rows as T[]).slice === "function" ? (rows as T[]).slice() : [...rows];
}

function hospitalIndex(campuses: Hospital[]) {
  return new Map(campuses.map((h) => [h.slug, h]));
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
  if (entity === "treatments") {
    const bySlug = hospitalIndex(snapshot(hospitals));
    for (const city of cities) {
      counts[city] = (rows as Treatment[]).filter((row) =>
        row.hospitalSlugs.some((slug) => bySlug.get(slug)?.city === city),
      ).length;
    }
  } else {
    for (const city of cities) {
      counts[city] = rows.filter((row) => (row as Doctor | Hospital).city === city).length;
    }
  }
  return { total: rows.length, counts };
}

function hospitalMatches(h: Hospital, q: CatalogQuery) {
  if (q.destination && h.country !== q.destination) return false;
  if (q.city && h.city !== q.city) return false;
  return true;
}

export function filterHospitals(q: CatalogQuery, rows: Hospital[] = hospitals): Hospital[] {
  const list = snapshot(rows);
  return list.filter((h) => {
    if (!hospitalMatches(h, q)) return false;
    if (q.specialty && !h.specialties.includes(q.specialty) && h.specialty !== q.specialty) {
      return false;
    }
    if (q.procedure && !h.procedures.includes(q.procedure) && !h.procedureSlugs.includes(q.procedure)) {
      return false;
    }
    return true;
  });
}

/** Specialties that still have cost rows after destination/city filters. */
export function listCostSpecialtyGroups(
  q: CatalogQuery,
  rows: Treatment[] = treatments,
  campuses: Hospital[] = hospitals,
) {
  const pool = filterTreatments({ destination: q.destination, city: q.city }, rows, campuses);
  return SPECIALTIES.map((specialty) => ({
    ...specialty,
    items: pool.filter((t) => t.specialtySlugs.includes(specialty.slug)),
  })).filter((group) => group.items.length > 0);
}

export function filterTreatments(
  q: CatalogQuery,
  rows: Treatment[] = treatments,
  campuses: Hospital[] = hospitals,
): Treatment[] {
  const list = snapshot(rows);
  const bySlug = hospitalIndex(snapshot(campuses));
  const spec = q.specialty ? getSpecialty(q.specialty) : undefined;
  return list.filter((t) => {
    if (q.procedure && !t.procedures.includes(q.procedure) && t.procedureSlug !== q.procedure) {
      return false;
    }
    if (q.destination || q.city) {
      const matched = t.hospitalSlugs.map((slug) => bySlug.get(slug)).filter((h): h is Hospital => Boolean(h));
      if (q.destination && !matched.some((h) => h.country === q.destination)) return false;
      if (q.city && !matched.some((h) => h.city === q.city)) return false;
    }
    if (q.specialty) {
      if (spec ? !t.specialtySlugs.includes(spec.slug) && t.specialtySlug !== spec.slug : t.category !== q.specialty) {
        return false;
      }
    }
    return true;
  });
}

export function filterDoctors(q: CatalogQuery, rows: Doctor[] = doctors): Doctor[] {
  const list = snapshot(rows);
  return list.filter((d) => {
    if (q.destination && d.country !== q.destination) return false;
    if (q.city && d.city !== q.city) return false;
    if (q.specialty && d.specialty !== q.specialty) return false;
    if (q.procedure && !d.procedures.includes(q.procedure) && !d.procedureSlugs.includes(q.procedure)) {
      return false;
    }
    return true;
  });
}
