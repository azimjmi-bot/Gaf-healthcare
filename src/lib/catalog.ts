import {
  doctors,
  getHospital,
  hospitals,
  treatments,
  type Doctor,
  type Hospital,
  type Treatment,
} from "@/lib/data";

export type CatalogQuery = {
  destination?: string;
  city?: string;
  specialty?: string;
  condition?: string;
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
    condition: one("condition"),
    procedure: one("procedure"),
  };
}

export const catalogDestinations = Array.from(
  new Set(hospitals.map((h) => h.country)),
).sort();

export const catalogCities = Array.from(new Set(hospitals.map((h) => h.city))).sort();

export const catalogSpecialties = Array.from(
  new Set(doctors.map((d) => d.specialty)),
).sort();

export const catalogConditions = Array.from(
  new Set(treatments.flatMap((t) => t.conditions)),
).sort();

export const catalogProcedures = Array.from(
  new Set(treatments.flatMap((t) => t.procedures)),
).sort();

export function citiesForDestination(destination?: string) {
  const list = destination
    ? hospitals.filter((h) => h.country === destination).map((h) => h.city)
    : hospitals.map((h) => h.city);
  return Array.from(new Set(list)).sort();
}

function hospitalMatches(h: Hospital, q: CatalogQuery) {
  if (q.destination && h.country !== q.destination) return false;
  if (q.city && h.city !== q.city) return false;
  return true;
}

function treatmentMatchesClinical(t: Treatment, q: CatalogQuery) {
  if (q.condition && !t.conditions.includes(q.condition)) return false;
  if (q.procedure && !t.procedures.includes(q.procedure)) return false;
  return true;
}

export function filterHospitals(q: CatalogQuery): Hospital[] {
  return hospitals.filter((h) => {
    if (!hospitalMatches(h, q)) return false;
    const faculty = doctors.filter((d) => d.hospitalSlug === h.slug);
    const pathways = treatments.filter((t) => t.hospitalSlugs.includes(h.slug));
    if (q.specialty && !faculty.some((d) => d.specialty === q.specialty)) return false;
    if (q.condition || q.procedure) {
      if (!pathways.some((t) => treatmentMatchesClinical(t, q))) return false;
    }
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
    const pathways = treatments.filter((t) => d.treatmentSlugs.includes(t.slug));
    if (q.condition || q.procedure) {
      if (!pathways.some((t) => treatmentMatchesClinical(t, q))) return false;
    }
    return true;
  });
}
