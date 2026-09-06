import {
  doctors,
  getHospital,
  hospitals,
  RADIATION_PROCEDURES,
  treatments,
  type Doctor,
  type Hospital,
  type Treatment,
} from "@/lib/data";

export const INDIA_CITIES = [
  "Delhi NCR",
  "Mumbai",
  "Bengaluru",
  "Chennai",
  "Hyderabad",
] as const;

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

export const catalogDestinations = Array.from(
  new Set(hospitals.map((h) => h.country)),
).sort();

export const catalogCities = Array.from(new Set(hospitals.map((h) => h.city))).sort();

export const catalogSpecialties = ["Radiation Oncology"];

export const catalogProcedures = [...RADIATION_PROCEDURES];

export function citiesForDestination(destination?: string) {
  if (destination === "India") return [...INDIA_CITIES];
  const list = destination
    ? hospitals.filter((h) => h.country === destination).map((h) => h.city)
    : hospitals.map((h) => h.city);
  return Array.from(new Set(list)).sort();
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
      if (entity === "hospitals") return (row as (typeof hospitals)[number]).city === city;
      if (entity === "doctors") {
        const h = getHospital((row as (typeof doctors)[number]).hospitalSlug);
        return h?.city === city;
      }
      const campuses = (row as (typeof treatments)[number]).hospitalSlugs
        .map((s) => getHospital(s))
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

function treatmentMatchesClinical(t: Treatment, q: CatalogQuery) {
  if (q.procedure && !t.procedures.includes(q.procedure)) return false;
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
    if (!treatmentMatchesClinical(t, q)) return false;
    const campuses = t.hospitalSlugs
      .map((s) => getHospital(s))
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
    const hospital = getHospital(d.hospitalSlug);
    if (!hospital || !hospitalMatches(hospital, q)) return false;
    if (q.specialty && d.specialty !== q.specialty) return false;
    if (q.procedure && !d.procedures.includes(q.procedure)) return false;
    return true;
  });
}
