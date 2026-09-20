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
 * Last updated by the Arabic publication gate, which removed:
 *   - `ar` from all 13 facet rows, since no pSEO template is approved yet
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
 *                     withLocaleMetadata. Commit group (c) closes these.
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
  { label: "doctor facet: country", path: "/doctors/India", published: ["en"] },
  {
    label: "doctor facet: country/city",
    path: "/doctors/India/Delhi-NCR",
    published: ["en"],
  },
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
    published: ["en"],
  },
  {
    label: "doctor facet with no Arabic profiles",
    path: "/doctors/India/Nephrology",
    published: ["en"],
  },
  // Thinnest Arabic doctor facet in the catalog: exactly 3 matching profiles,
  // so it clears FACET_MIN_ARABIC_PROFILES and is held back purely by the
  // unapproved template. Approving doctorFacet in Phase 3 should republish it.
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
  { label: "hospital facet: country", path: "/hospitals/India", published: ["en"] },
  {
    label: "hospital facet: country/city",
    path: "/hospitals/India/Delhi-NCR",
    published: ["en"],
  },
  {
    label: "hospital facet: country/city/specialty",
    path: "/hospitals/India/Delhi-NCR/Radiation-Oncology",
    published: ["en"],
  },
  {
    label: "hospital facet: country/city/specialty/procedure",
    path: "/hospitals/India/Delhi-NCR/Radiation-Oncology/External-Beam-Radiotherapy-(EBRT)",
    published: ["en"],
  },
  // These three bracket the profile-count floor: one Arabic record, two, and
  // three. All are held back by the unapproved template today, but once
  // hospitalFacet is approved only the third may come back. If the first two
  // ever regain an ar alternate, the floor has stopped working.
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
  // costsDirectoryMetadata returns the specialty-profile metadata as-is, so
  // this branch never reaches withLocaleMetadata and serves no alternates.
  {
    label: "cost facet: country/specialty",
    path: "/costs/India/Radiation-Oncology",
    published: ["en"],
    served: "canonical-only",
  },
  // Same cause, different branch: a procedure with no city returns
  // costsProcedureMetadata directly. Adding a city does reach the wrapper,
  // which is why the next row serves a full block.
  {
    label: "cost facet: country/specialty/procedure",
    path: "/costs/India/Radiation-Oncology/External-Beam-Radiotherapy-(EBRT)",
    published: ["en"],
    served: "canonical-only",
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