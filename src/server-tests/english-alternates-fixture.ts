import type { AppLocale } from "@/lib/i18n/languages";

/**
 * One representative English URL per page type, with the locales its hreflang
 * block currently advertises. Shared by the regression test and by
 * scripts/check-english-alternates.mjs so the unit pin and the end-to-end check
 * can never drift apart.
 *
 * Arabic entries are expected to move in later phases; English entries are not.
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
  { label: "home", path: "/", published: ["en", "ru", "fr", "ar", "sw"] },

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
  {
    label: "doctor facet: country/specialty",
    path: "/doctors/India/Radiation-Oncology",
    published: ["en", "ar"],
  },
  {
    label: "doctor facet: country/city/specialty",
    path: "/doctors/India/Delhi-NCR/Radiation-Oncology",
    published: ["en", "ar"],
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
  // Thinnest Arabic doctor facet in the catalog: exactly 3 matching profiles.
  // No doctor facet sits at 1 or 2, so a 3-profile threshold is a no-op here
  // and only the Phase 3 template gate will move this row.
  {
    label: "doctor facet at the 3-profile floor",
    path: "/doctors/India/Mumbai/Radiation-Oncology",
    published: ["en", "ar"],
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
  // Hospital facets do sit below the 3-record threshold: 12 have one Arabic
  // record and 8 have two. These three bracket that boundary so the threshold
  // introduced in the next commit group cannot move English hreflang unnoticed.
  {
    label: "hospital facet with 1 Arabic record",
    path: "/hospitals/India/Bengaluru/Radiation-Oncology/External-Beam-Radiotherapy-(EBRT)",
    published: ["en", "ar"],
  },
  {
    label: "hospital facet with 2 Arabic records",
    path: "/hospitals/India/Chennai/Radiation-Oncology/External-Beam-Radiotherapy-(EBRT)",
    published: ["en", "ar"],
  },
  {
    label: "hospital facet at the 3-record floor",
    path: "/hospitals/India/Bengaluru/Radiation-Oncology",
    published: ["en", "ar"],
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

  { label: "treatments index", path: "/treatments", published: ["en", "ru", "fr", "ar", "sw"] },
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