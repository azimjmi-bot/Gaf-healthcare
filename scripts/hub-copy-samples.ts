/**
 * Prints the hub copy a locale would render, as text, for review.
 *
 * A hub page is mostly generated prose, so the only honest way to review it is
 * to read it at the sizes the real catalog produces — a specialty with seventy
 * doctors and a procedure facet with three read very differently from the same
 * template. This prints the four fields that decide whether the page is worth
 * indexing, for a spread of query shapes.
 *
 * The copy comes from arabic-hub.ts, the module the routes call, so what this
 * prints is what the URL serves rather than a parallel reconstruction of it.
 *
 *   npm run samples:hub
 *   npm run samples:hub -- --locale ar
 */
import type { CatalogQuery } from "@/lib/catalog-options";
import { arabicDoctorHub, arabicHospitalHub } from "@/lib/i18n/arabic-hub";
import { doctorsPath, hospitalsPath } from "@/lib/catalog-links";
import { localePageState } from "@/lib/i18n/locale-publication";
import type { AppLocale } from "@/lib/i18n/languages";
import type { HubCopy } from "@/lib/i18n/hub-copy";

const flag = process.argv.indexOf("--locale");
const locale = (flag === -1 ? "ar" : process.argv[flag + 1]) as AppLocale;

const DOCTOR_SAMPLES: CatalogQuery[] = [
  { destination: "India", specialty: "Radiation Oncology" },
  { destination: "India", city: "Chennai", specialty: "Radiation Oncology" },
  {
    destination: "India",
    specialty: "Radiation Oncology",
    procedure: "Stereotactic Radiosurgery (SRS)",
  },
];

const HOSPITAL_SAMPLES: CatalogQuery[] = [
  { destination: "India", specialty: "Radiation Oncology" },
  { destination: "India", city: "Delhi NCR", specialty: "Radiation Oncology" },
  {
    destination: "India",
    specialty: "Radiation Oncology",
    procedure: "Image-Guided Radiotherapy (IGRT)",
  },
];

function show(path: string, copy: HubCopy | undefined) {
  if (!copy) return;
  const state = localePageState(locale, path);
  console.log(`\n${"─".repeat(78)}`);
  console.log(`URL      /${locale}${path}`);
  console.log(`state    ${state}`);
  console.log(`eyebrow  ${copy.eyebrow}`);
  console.log(`h1       ${copy.heading}`);
  console.log(`title    ${copy.title}`);
  console.log(`meta     ${copy.description}`);
  console.log(`         (${copy.description.length} characters)`);
  console.log("intro");
  for (const paragraph of copy.intro) console.log(`  · ${paragraph}`);
}

console.log(`\n${"═".repeat(78)}\nDOCTOR HUB — ${locale}\n${"═".repeat(78)}`);
for (const query of DOCTOR_SAMPLES) {
  show(doctorsPath(query), arabicDoctorHub(query, locale));
}

console.log(`\n\n${"═".repeat(78)}\nHOSPITAL HUB — ${locale}\n${"═".repeat(78)}`);
for (const query of HOSPITAL_SAMPLES) {
  show(hospitalsPath(query), arabicHospitalHub(query, locale));
}
console.log();
