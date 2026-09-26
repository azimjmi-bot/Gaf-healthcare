import type { AppLocale } from "@/lib/i18n/languages";

/**
 * One representative English URL per page type, with the locales its hreflang
 * block currently advertises. Shared by the regression test and by
 * scripts/check-english-alternates.ts so the unit pin and the end-to-end check
 * can never drift apart.
 *
 * Arabic entries are expected to move as phases land; English entries are not.
 * Canonicals, the `en` alternate and `x-default` have never changed and must
 * not: the only edits this table has taken are locales being removed from a
 * hreflang block, never an English URL moving.
 *
 * Last updated by Phase 3, which opened the doctor and hospital facet gates
 * and added `ar` to the seven facet rows whose Arabic page is published and
 * self-canonical. The rest stay English-only for one of three reasons, each
 * noted at the row: the Arabic facet returns exactly its parent's records and
 * names the parent as canonical, it is below the three-record floor, or it
 * reproduces 90% or more of its parent.
 *
 * Before that, the Arabic publication gate removed:
 *   - `ar` from all 13 facet rows, since no pSEO template was approved
 *   - `ru`, `fr`, `sw` everywhere, since those locales are not live
 *   - `ar` from /treatments, since no curated treatment is published
 */
/**
 * What the running server is currently expected to put in <head>, which is not
 * always what withLocaleMetadata() would compute for the path — some routes
 * build metadata without going through it.
 *
 * - "hreflang":       canonical plus the full alternates block (the norm)
 * - "canonical-only": canonical but no alternates, because the route bypasses
 *                     withLocaleMetadata. No route does this any more.
 * - "noindex":        deliberately excluded from search, no canonical
 * - "404":            no such page; present only to pin the empty-locales case
 */
export type ServedHead = "hreflang" | "canonical-only" | "noindex" | "404";

export type AlternatesBaseline = {
  label: string;
  path: string;
  published: AppLocale[];
  served?: ServedHead;
};

export const ENGLISH_ALTERNATES_BASELINE: AlternatesBaseline[] = [
  { label: "home", path: "/", published: ["en", "ar"] },

  { label: "doctors index", path: "/doctors", published: ["en", "ar"] },
  {
    label: "doctor profile",
    path: "/doctors/dr-anil-kumar-anand",
    published: ["en", "ar"],
  },
  { label: "doctor facet: country", path: "/doctors/India", published: ["en", "ar"] },
  {
    label: "doctor facet: country/city",
    path: "/doctors/India/Delhi-NCR",
    published: ["en", "ar"],
  },
  // Published in Arabic but not advertised: all 70 translated doctors are
  // radiation oncologists, so this facet returns exactly what /doctors/India
  // returns and names it as canonical. A page that defers to another URL is
  // not the address of a language version, so English does not claim it is.
  {
    label: "doctor facet: country/specialty",
    path: "/doctors/India/Radiation-Oncology",
    published: ["en"],
  },
  {
    label: "doctor facet: country/city/specialty",
    path: "/doctors/India/Delhi-NCR/Radiation-Oncology",
    published: ["en"],
  },
  {
    label: "doctor facet: country/city/specialty/procedure",
    path: "/doctors/India/Delhi-NCR/Radiation-Oncology/External-Beam-Radiotherapy-(EBRT)",
    published: ["en", "ar"],
  },
  {
    label: "doctor facet with no Arabic profiles",
    path: "/doctors/India/Nephrology",
    published: ["en"],
  },
  // Thinnest Arabic doctor facet in the catalog: exactly 3 matching profiles,
  // so it clears FACET_MIN_ARABIC_PROFILES. It is still not advertised, for the
  // same reason as the two rows above — Mumbai's radiation roster is Mumbai's
  // whole roster — which is the floor being irrelevant here rather than broken.
  {
    label: "doctor facet at the 3-profile floor",
    path: "/doctors/India/Mumbai/Radiation-Oncology",
    published: ["en"],
  },
  {
    label: "doctor compare",
    path: "/doctors/compare",
    published: ["en"],
    served: "noindex",
  },

  { label: "hospitals index", path: "/hospitals", published: ["en", "ar"] },
  {
    label: "hospital profile",
    path: "/hospitals/apollo-delhi",
    published: ["en", "ar"],
  },
  {
    label: "hospital faculty sub-page",
    path: "/hospitals/apollo-delhi/doctors",
    published: ["en", "ar"],
  },
  {
    label: "hospital procedures sub-page",
    path: "/hospitals/apollo-delhi/procedures",
    published: ["en"],
  },
  { label: "hospital facet: country", path: "/hospitals/India", published: ["en", "ar"] },
  {
    label: "hospital facet: country/city",
    path: "/hospitals/India/Delhi-NCR",
    published: ["en", "ar"],
  },
  // 16 of the 18 Arabic campuses in Delhi NCR, which is 89% — just inside the
  // 0.9 overlap gate. The country/specialty facet above it returns all 37 and
  // stays suppressed.
  {
    label: "hospital facet: country/city/specialty",
    path: "/hospitals/India/Delhi-NCR/Radiation-Oncology",
    published: ["en", "ar"],
  },
  {
    label: "hospital facet: country/city/specialty/procedure",
    path: "/hospitals/India/Delhi-NCR/Radiation-Oncology/External-Beam-Radiotherapy-(EBRT)",
    published: ["en", "ar"],
  },
  // These three bracket the profile-count floor: one Arabic record, two, and
  // three. All three stay English-only with hospitalFacet approved, but for
  // two different reasons — the first two are below the 3-record floor, and
  // the third clears it and is then caught by the overlap gate at 3 of 3. If
  // either of the first two ever regains an ar alternate, the floor has
  // stopped working.
  {
    label: "hospital facet with 1 Arabic record",
    path: "/hospitals/India/Bengaluru/Radiation-Oncology/External-Beam-Radiotherapy-(EBRT)",
    published: ["en"],
  },
  {
    label: "hospital facet with 2 Arabic records",
    path: "/hospitals/India/Chennai/Radiation-Oncology/External-Beam-Radiotherapy-(EBRT)",
    published: ["en"],
  },
  {
    label: "hospital facet at the 3-record floor",
    path: "/hospitals/India/Bengaluru/Radiation-Oncology",
    published: ["en"],
  },

  { label: "costs index", path: "/costs", published: ["en"] },
  { label: "cost facet: country", path: "/costs/India", published: ["en"] },
  // This branch used to overwrite alternates wholesale, dropping the block
  // catalogPageMetadata had just built. It now goes through the wrapper.
  {
    label: "cost facet: country/specialty",
    path: "/costs/India/Radiation-Oncology",
    published: ["en"],
  },
  // Same cause, different branch: a procedure with no city used to return
  // costsProcedureMetadata directly. Adding a city always reached the wrapper,
  // which is why the row after this one never lost its block.
  {
    label: "cost facet: country/specialty/procedure",
    path: "/costs/India/Radiation-Oncology/External-Beam-Radiotherapy-(EBRT)",
    published: ["en"],
  },
  {
    label: "cost facet: country/city/specialty/procedure",
    path: "/costs/India/Delhi-NCR/Radiation-Oncology/External-Beam-Radiotherapy-(EBRT)",
    published: ["en"],
  },
  // Serves 200 and points its canonical at the hierarchical country path
  // rather than at itself. That cross-canonical is deliberate.
  {
    label: "flat cost sheet alias",
    path: "/costs/external-beam-radiotherapy-ebrt",
    published: ["en"],
  },

  { label: "treatments index", path: "/treatments", published: ["en"] },
  {
    label: "curated treatment with no published record",
    path: "/treatments/does-not-exist",
    published: [],
    served: "404",
  },

  { label: "specialties index", path: "/specialties", published: ["en"] },
  { label: "blogs index", path: "/blogs", published: ["en"] },
  { label: "blog post", path: "/blogs/imrt-vs-3d-crt", published: ["en"] },
  { label: "consult", path: "/consult", published: ["en"] },
];