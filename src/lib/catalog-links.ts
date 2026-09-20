import {
  getProcedure,
  getSpecialty,
  PRIMARY_COUNTRY_NAME,
  SPECIALTIES,
  toSlug,
} from "@/lib/taxonomy";
import { prettyCatalogPath, type CatalogBasePath } from "@/lib/pretty-catalog-path";
import type { Treatment } from "@/lib/treatments";

/** Cluster labels such as "Joint Replacement" are not catalog specialties. */
export function catalogSpecialtyName(treatment: Pick<Treatment, "category" | "specialtySlug">) {
  if (SPECIALTIES.some((row) => row.name === treatment.category)) return treatment.category;
  return SPECIALTIES.find((row) => row.slug === treatment.specialtySlug)?.name ?? treatment.category;
}

/**
 * The original flat cost sheet URL. It is still served so existing links and indexed
 * pages keep working, but it now points its canonical at the country path below.
 */
export function legacyCostSheetPath(procedureName: string) {
  return `/costs/${toSlug(procedureName)}`;
}

/** Canonical cost URL for a procedure in the default destination. */
export function costPath(procedureName: string) {
  return costsFilterPath({ procedure: procedureName });
}

/** The specialty a procedure files under, so a cost URL is never missing that segment. */
function specialtyForProcedure(procedureName: string) {
  const procedure = getProcedure(procedureName) ?? getProcedure(toSlug(procedureName));
  return procedure ? getSpecialty(procedure.specialtySlug)?.name : undefined;
}

function catalogHref(
  base: CatalogBasePath,
  opts: {
    destination?: string;
    city?: string;
    specialty?: string;
    procedure?: string;
  },
) {
  return prettyCatalogPath(base, opts);
}

/** Pretty filter path: /costs/India/Surgical-Oncology/Mastectomy */
export function costsFilterPath(opts: {
  destination?: string;
  city?: string;
  specialty?: string;
  procedure?: string;
}) {
  if (!opts.procedure) return catalogHref("/costs", opts);
  // Every procedure page is addressed the same way, country first, so one country
  // reads no differently from the next. A procedure the taxonomy does not know cannot
  // be placed under a country and falls back to its flat sheet.
  const specialty = opts.specialty ?? specialtyForProcedure(opts.procedure);
  if (!specialty) return legacyCostSheetPath(opts.procedure);
  return catalogHref("/costs", {
    ...opts,
    destination: opts.destination ?? PRIMARY_COUNTRY_NAME,
    specialty,
  });
}

export function doctorsPath(opts: {
  procedure?: string;
  city?: string;
  destination?: string;
  specialty?: string;
}) {
  return catalogHref("/doctors", opts);
}

/** Directory path for one specialty's cost table. Never a lowercase pSEO landing. */
export function costsSpecialtyPath(opts: {
  destination?: string;
  city?: string;
  specialty: string;
}) {
  return costsFilterPath({
    destination: opts.destination,
    city: opts.city,
    specialty: opts.specialty,
  });
}

export function hospitalsPath(opts: {
  procedure?: string;
  city?: string;
  destination?: string;
  specialty?: string;
}) {
  return catalogHref("/hospitals", opts);
}
