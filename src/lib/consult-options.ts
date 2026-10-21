import { catalogHospitals } from "@/lib/hospitals";
import { catalogTreatments } from "@/lib/treatments";

/** One choice in the consultation form's treatment or hospital select. */
export type ConsultOption = { slug: string; name: string };

/**
 * The choices the consultation form offers, computed on the server and passed
 * to the client component as props. The form used to import `hospitals` and
 * `treatments` directly, which pulled the whole static catalog (4.6 MB of
 * JSON) into the browser bundle of `/consult` and into the SSR layer of the
 * server bundle, to show 37 hospital names and 380 treatment names. The lists
 * are the same static catalog rows in the same order as before; the CMS
 * overlay never applied here and still does not.
 */
export function consultTreatmentOptions(): ConsultOption[] {
  return catalogTreatments.map((t) => ({ slug: t.slug, name: t.name }));
}

export function consultHospitalOptions(): ConsultOption[] {
  return catalogHospitals.map((h) => ({ slug: h.slug, name: h.name }));
}
