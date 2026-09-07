/**
 * Canonical taxonomy for later programmatic SEO.
 * Paths should use slugs only: /doctors/{country}/{city}/{specialty}/{procedure}
 * Display names never go in the URL. Seeds must resolve through these tables.
 */

export type Taxon = {
  name: string;
  slug: string;
};

export type CityTaxon = Taxon & {
  countrySlug: string;
};

export type ProcedureTaxon = Taxon & {
  specialtySlug: string;
};

export function toSlug(value: string) {
  return value
    .normalize("NFKD")
    .replace(/ı/g, "i")
    .replace(/İ/g, "i")
    .toLowerCase()
    .replace(/[()]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function taxon(name: string, slug = toSlug(name)): Taxon {
  return { name, slug };
}

export const COUNTRIES: Taxon[] = [
  taxon("India"),
  taxon("South Korea"),
  taxon("Türkiye", "turkiye"),
  taxon("Thailand"),
  taxon("United Arab Emirates"),
  taxon("Singapore"),
  taxon("Mexico"),
];

export const CITIES: CityTaxon[] = [
  { name: "Delhi NCR", slug: "delhi-ncr", countrySlug: "india" },
  { name: "Mumbai", slug: "mumbai", countrySlug: "india" },
  { name: "Bengaluru", slug: "bengaluru", countrySlug: "india" },
  { name: "Chennai", slug: "chennai", countrySlug: "india" },
  { name: "Hyderabad", slug: "hyderabad", countrySlug: "india" },
  { name: "Seoul", slug: "seoul", countrySlug: "south-korea" },
  { name: "Istanbul", slug: "istanbul", countrySlug: "turkiye" },
  { name: "Bangkok", slug: "bangkok", countrySlug: "thailand" },
  { name: "Dubai", slug: "dubai", countrySlug: "united-arab-emirates" },
  { name: "Singapore", slug: "singapore", countrySlug: "singapore" },
  { name: "Mexico City", slug: "mexico-city", countrySlug: "mexico" },
];

export const INDIA_CITIES = CITIES.filter((c) => c.countrySlug === "india").map((c) => c.name);

export const SPECIALTIES: Taxon[] = [
  taxon("Radiation Oncology"),
  taxon("Surgical Oncology"),
  taxon("Medical Oncology"),
];

export function compareSpecialties(aSlug: string, bSlug: string) {
  const ia = SPECIALTIES.findIndex((s) => s.slug === aSlug);
  const ib = SPECIALTIES.findIndex((s) => s.slug === bSlug);
  return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
}

export const RADIATION_PROCEDURES = [
  "External Beam Radiotherapy (EBRT)",
  "3D Conformal Radiotherapy (3D-CRT)",
  "Intensity-Modulated Radiotherapy (IMRT)",
  "Image-Guided Radiotherapy (IGRT)",
  "Stereotactic Radiosurgery (SRS)",
  "Stereotactic Body Radiotherapy (SBRT)",
  "CyberKnife",
  "Gamma Knife",
  "Proton Beam Therapy",
  "Brachytherapy",
  "Intracavitary Brachytherapy",
  "Interstitial Brachytherapy",
  "Plaque Brachytherapy",
  "Intraoperative Radiotherapy (IORT)",
  "Total Body Irradiation (TBI)",
] as const;

export const SURGICAL_ONCOLOGY_PROCEDURES = [
  "Breast-Conserving Surgery (Lumpectomy)",
  "Mastectomy",
  "Nipple-Sparing Mastectomy",
  "Oncoplastic Breast Surgery",
  "Breast Reconstruction",
  "Sentinel Lymph Node Biopsy",
  "Esophagectomy",
  "Gastrectomy",
  "Colectomy",
  "Rectal Cancer Surgery",
  "Liver Resection (Hepatectomy)",
  "Whipple Procedure",
  "Pancreatic Surgery",
  "Cytoreductive Surgery",
  "Cytoreductive Surgery with HIPEC",
  "PIPAC",
  "Radical Hysterectomy",
  "Ovarian Cancer Cytoreductive Surgery",
  "Thyroidectomy for Thyroid Cancer",
  "Neck Dissection",
  "Oral Cancer Surgery",
  "Transoral Robotic Surgery (TORS)",
  "Microvascular Free Flap Reconstruction",
  "Lung Cancer Surgery",
  "Lobectomy",
  "VATS Lung Surgery",
  "Robotic Thoracic Surgery",
  "Radical Prostatectomy",
  "Partial Nephrectomy",
  "Radical Cystectomy",
] as const;

export const MEDICAL_ONCOLOGY_PROCEDURES = [
  "Chemotherapy",
  "Immunotherapy",
  "Targeted Therapy",
  "Hormone Therapy",
  "Precision Oncology",
  "Molecular Targeted Therapy",
  "Immune Checkpoint Inhibitor Therapy",
  "Neoadjuvant Chemotherapy",
  "Adjuvant Chemotherapy",
  "Palliative Chemotherapy",
  "Antibody-Drug Conjugate Therapy",
  "Maintenance Therapy",
  "Intraperitoneal Chemotherapy",
  "Intrathecal Chemotherapy",
  "CAR-T Cell Therapy",
  "Bone Marrow Transplantation",
  "Stem Cell Transplantation",
  "Dendritic Cell Therapy",
] as const;

export const ATHENAA_SURGICAL_PROCEDURES = [
  "Breast-Conserving Surgery (Lumpectomy)",
  "Mastectomy",
  "Nipple-Sparing Mastectomy",
  "Oncoplastic Breast Surgery",
  "Breast Reconstruction",
  "Sentinel Lymph Node Biopsy",
  "Radical Hysterectomy",
  "Ovarian Cancer Cytoreductive Surgery",
] as const;

export const PROCEDURES: ProcedureTaxon[] = [
  ...RADIATION_PROCEDURES.map((name) => ({
    name,
    slug: toSlug(name),
    specialtySlug: "radiation-oncology",
  })),
  ...SURGICAL_ONCOLOGY_PROCEDURES.map((name) => ({
    name,
    slug: toSlug(name),
    specialtySlug: "surgical-oncology",
  })),
  ...MEDICAL_ONCOLOGY_PROCEDURES.map((name) => ({
    name,
    slug: toSlug(name),
    specialtySlug: "medical-oncology",
  })),
];

export const PROCEDURE_CLUSTERS = {
  linac: [
    "External Beam Radiotherapy (EBRT)",
    "3D Conformal Radiotherapy (3D-CRT)",
    "Intensity-Modulated Radiotherapy (IMRT)",
    "Image-Guided Radiotherapy (IGRT)",
  ],
  stereo: [
    "Stereotactic Radiosurgery (SRS)",
    "Stereotactic Body Radiotherapy (SBRT)",
    "CyberKnife",
    "Gamma Knife",
  ],
  complex: [
    "Proton Beam Therapy",
    "Brachytherapy",
    "Intracavitary Brachytherapy",
    "Interstitial Brachytherapy",
    "Plaque Brachytherapy",
    "Intraoperative Radiotherapy (IORT)",
    "Total Body Irradiation (TBI)",
  ],
} as const;

export type ProcedureCluster = keyof typeof PROCEDURE_CLUSTERS;

function indexByName<T extends Taxon>(rows: T[]) {
  return new Map(rows.map((row) => [row.name, row]));
}

function indexBySlug<T extends Taxon>(rows: T[]) {
  return new Map(rows.map((row) => [row.slug, row]));
}

const countriesByName = indexByName(COUNTRIES);
const countriesBySlug = indexBySlug(COUNTRIES);
const citiesByName = indexByName(CITIES);
const citiesBySlug = indexBySlug(CITIES);
const specialtiesByName = indexByName(SPECIALTIES);
const specialtiesBySlug = indexBySlug(SPECIALTIES);
const proceduresByName = indexByName(PROCEDURES);
const proceduresBySlug = indexBySlug(PROCEDURES);

export function getCountry(nameOrSlug: string) {
  return countriesByName.get(nameOrSlug) ?? countriesBySlug.get(nameOrSlug);
}

export function getCity(nameOrSlug: string) {
  return citiesByName.get(nameOrSlug) ?? citiesBySlug.get(nameOrSlug);
}

export function getSpecialty(nameOrSlug: string) {
  return specialtiesByName.get(nameOrSlug) ?? specialtiesBySlug.get(nameOrSlug);
}

export function getProcedure(nameOrSlug: string) {
  return proceduresByName.get(nameOrSlug) ?? proceduresBySlug.get(nameOrSlug);
}

export function citiesInCountry(countryNameOrSlug: string) {
  const country = getCountry(countryNameOrSlug);
  if (!country) return [];
  return CITIES.filter((c) => c.countrySlug === country.slug);
}

export function proceduresForSpecialty(specialtyNameOrSlug: string) {
  const specialty = getSpecialty(specialtyNameOrSlug);
  if (!specialty) return [];
  return PROCEDURES.filter((p) => p.specialtySlug === specialty.slug);
}

export function radiationProcedureSlug(name: string) {
  return toSlug(name);
}

function assertUnique(rows: Taxon[], label: string) {
  const slugs = new Set<string>();
  for (const row of rows) {
    if (slugs.has(row.slug)) {
      throw new Error(`Duplicate ${label} slug: ${row.slug}`);
    }
    slugs.add(row.slug);
  }
}

assertUnique(COUNTRIES, "country");
assertUnique(CITIES, "city");
assertUnique(SPECIALTIES, "specialty");
assertUnique(PROCEDURES, "procedure");

for (const city of CITIES) {
  if (!countriesBySlug.has(city.countrySlug)) {
    throw new Error(`City ${city.slug} points at unknown country ${city.countrySlug}`);
  }
}

for (const procedure of PROCEDURES) {
  if (!specialtiesBySlug.has(procedure.specialtySlug)) {
    throw new Error(`Procedure ${procedure.slug} points at unknown specialty ${procedure.specialtySlug}`);
  }
}
