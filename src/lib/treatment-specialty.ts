import type { Treatment } from "@/lib/treatments";

/**
 * Kept apart from `treatments.ts` on purpose: `hospital-profile.ts` needs
 * only this predicate, and it is reached from a client component
 * (`hospital-gallery.tsx`). Importing it from `treatments.ts` would pull the
 * whole treatment catalog, the hospitals and content storage into the
 * browser bundle.
 */
export function treatmentMatchesSpecialty(t: Pick<Treatment, "specialtySlugs">, specialtySlug: string) {
  return t.specialtySlugs.includes(specialtySlug);
}
