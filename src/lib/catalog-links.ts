import { toSlug } from "@/lib/taxonomy";
import { prettyCatalogPath, type CatalogBasePath } from "@/lib/pretty-catalog-path";

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
