import { SPECIALTIES, toSlug } from "@/lib/taxonomy";
import { prettyCatalogPath, type CatalogBasePath } from "@/lib/pretty-catalog-path";
import type { Treatment } from "@/lib/treatments";

/** Cluster labels such as "Joint Replacement" are not catalog specialties. */
export function catalogSpecialtyName(treatment: Pick<Treatment, "category" | "specialtySlug">) {
  if (SPECIALTIES.some((row) => row.name === treatment.category)) return treatment.category;
  return SPECIALTIES.find((row) => row.slug === treatment.specialtySlug)?.name ?? treatment.category;
}

export function costPath(procedureName: string) {
  return `/costs/${toSlug(procedureName)}`;
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
  return catalogHref("/costs", opts);
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
