/**
 * What the Arabic facet gates would publish, and why the rest stay suppressed.
 *
 * The publication decision is the site owner's, not the code's: every
 * ARABIC_TEMPLATE_APPROVED flag is false and opening one is a deliberate act.
 * This prints the page counts behind that act, measured against the real
 * Arabic catalog through the same parser the router uses.
 *
 *   npm run analyze:ar-facets
 *
 * The stage totals it reports are asserted in
 * src/server-tests/arabic-publication-gate.test.ts, so the two cannot drift.
 */
import { doctors, hospitals } from "@/lib/data";
import { doctorsForLocale, hospitalsForLocale } from "@/lib/locale-catalog";
import { filterDoctors, filterHospitals } from "@/lib/catalog";
import { parentCatalogQuery, type CatalogQuery } from "@/lib/catalog-options";
import { doctorsPath, hospitalsPath } from "@/lib/catalog-links";
import { parsePrettyCatalogSegments } from "@/lib/pretty-catalog-path";
import { doctorSpecialtySitemapPaths } from "@/lib/doctor-discovery";
import { hospitalSpecialtySitemapPaths } from "@/lib/radiation-hospital-page";
import { INDIA_CITIES, SPECIALTIES } from "@/lib/taxonomy";
import { localePageState } from "@/lib/i18n/locale-publication";
import { canonicalFacetPath } from "@/lib/i18n/facet-canonical";

const arDoctors = doctorsForLocale("ar");
const arHospitals = hospitalsForLocale("ar");

function candidatePaths() {
  const paths = new Set<string>();
  for (const path of doctorSpecialtySitemapPaths(doctors)) paths.add(path);
  for (const path of hospitalSpecialtySitemapPaths(hospitals, doctors)) paths.add(path);
  paths.add(doctorsPath({ destination: "India" }));
  paths.add(hospitalsPath({ destination: "India" }));
  for (const city of INDIA_CITIES) {
    paths.add(doctorsPath({ destination: "India", city }));
    paths.add(hospitalsPath({ destination: "India", city }));
  }
  for (const s of SPECIALTIES) {
    paths.add(doctorsPath({ destination: "India", specialty: s.name }));
    paths.add(hospitalsPath({ destination: "India", specialty: s.name }));
  }
  return [...paths];
}

type Facet = { entity: "doctors" | "hospitals"; path: string; query: CatalogQuery };

/** Parsed exactly the way locale-publication.ts parses a request. */
function facetFor(path: string): Facet | undefined {
  const segments = path.split("/").filter(Boolean).map((s) => decodeURIComponent(s));
  const entity = segments[0] === "doctors" ? "doctors" : "hospitals";
  const query = parsePrettyCatalogSegments(segments.slice(1));
  return query ? { entity, path, query } : undefined;
}

const count = (entity: Facet["entity"], query: CatalogQuery) =>
  entity === "doctors"
    ? filterDoctors(query, arDoctors).length
    : filterHospitals(query, arHospitals).length;

function depthOf(q: CatalogQuery) {
  if (q.procedure) return q.city ? "country/city/specialty/procedure" : "country/specialty/procedure";
  if (q.specialty) return q.city ? "country/city/specialty" : "country/specialty";
  if (q.city) return "country/city";
  return "country";
}

const noindex = candidatePaths()
  .filter((path) => localePageState("ar", path) === "noindex")
  .map(facetFor)
  .filter((f): f is Facet => Boolean(f));

const published = candidatePaths()
  .filter((path) => localePageState("ar", path) === "published")
  .map(facetFor)
  .filter((f): f is Facet => Boolean(f));

console.log("=== Published today");
for (const entity of ["doctors", "hospitals"] as const) {
  const rows = published.filter((f) => f.entity === entity);
  const selfCanonical = rows.filter((f) => canonicalFacetPath(f.path, "ar") === f.path);
  console.log(
    `  ${entity.padEnd(10)} ${String(rows.length).padStart(4)} published, ` +
      `${String(selfCanonical.length).padStart(4)} self-canonical and listed in sitemap-ar.xml`,
  );
}

console.log(`\nStill held (noindex): ${noindex.length}`);

const DEPTHS = [
  "country",
  "country/city",
  "country/specialty",
  "country/city/specialty",
  "country/specialty/procedure",
  "country/city/specialty/procedure",
];

type Bucket = { total: number; thin: number; identical: number; over90: number; distinct: number; noParent: number };

for (const entity of ["hospitals", "doctors"] as const) {
  const rows = noindex.filter((f) => f.entity === entity);
  const buckets = new Map<string, Bucket>();
  const classify = (f: Facet) => {
    const own = count(entity, f.query);
    const parent = parentCatalogQuery(f.query);
    const parentCount = parent ? count(entity, parent) : undefined;
    const ratio = parentCount === undefined || parentCount === 0 ? undefined : own / parentCount;
    return { own, parentCount, ratio };
  };

  for (const f of rows) {
    const depth = depthOf(f.query);
    const b = buckets.get(depth) ?? { total: 0, thin: 0, identical: 0, over90: 0, distinct: 0, noParent: 0 };
    b.total += 1;
    const { own, parentCount, ratio } = classify(f);
    if (own < 3) b.thin += 1;
    if (ratio === undefined) {
      b.noParent += 1;
      if (own >= 3) b.distinct += 1;
    } else if (own >= 3) {
      if (own === parentCount) b.identical += 1;
      else if (ratio >= 0.9) b.over90 += 1;
      else b.distinct += 1;
    }
    buckets.set(depth, b);
  }

  console.log(`\n=== ${entity} (${rows.length})   [counts below the 3-record floor excluded from overlap columns]`);
  const head = ["depth", "facets", "thin (<3)", "identical", ">=90%", "narrower", "no parent"];
  console.log(head.map((h, i) => (i === 0 ? h.padEnd(34) : h.padStart(12))).join(""));
  const t: Bucket = { total: 0, thin: 0, identical: 0, over90: 0, distinct: 0, noParent: 0 };
  for (const depth of DEPTHS) {
    const b = buckets.get(depth);
    if (!b) continue;
    for (const k of Object.keys(t) as (keyof Bucket)[]) t[k] += b[k];
    console.log(
      [depth.padEnd(34), b.total, b.thin, b.identical, b.over90, b.distinct, b.noParent]
        .map((v, i) => (i === 0 ? String(v) : String(v).padStart(12)))
        .join(""),
    );
  }
  console.log(
    ["TOTAL".padEnd(34), t.total, t.thin, t.identical, t.over90, t.distinct, t.noParent]
      .map((v, i) => (i === 0 ? String(v) : String(v).padStart(12)))
      .join(""),
  );
}

console.log("\n=== Remaining staging levers, over what is still held (>=3 records; overlap gate on hospitals only)");
const docs = noindex.filter((f) => f.entity === "doctors");
const hosp = noindex.filter((f) => f.entity === "hospitals");
const floorOk = (f: Facet) => count(f.entity, f.query) >= 3;
const shallow = (f: Facet) => !f.query.specialty && !f.query.procedure;
const ratio = (f: Facet) => {
  const parent = parentCatalogQuery(f.query);
  if (!parent) return undefined;
  const pc = count(f.entity, parent);
  return pc === 0 ? undefined : count(f.entity, f.query) / pc;
};
const narrower = (f: Facet) => {
  const r = ratio(f);
  return r === undefined || r < 0.9;
};

const s1 = docs.filter(floorOk);
const s2 = hosp.filter((f) => shallow(f) && floorOk(f) && narrower(f));
const s3 = hosp.filter((f) => !shallow(f) && floorOk(f) && narrower(f));
const dupes = hosp.filter((f) => floorOk(f) && !narrower(f));
const thin = [...docs, ...hosp].filter((f) => !floorOk(f));

console.log(`stage 1  doctor facets (no overlap gate):           ${String(s1.length).padStart(5)}`);
console.log(`stage 2  hospital facets at country + city depth:   ${String(s2.length).padStart(5)}`);
console.log(`stage 3  deeper hospital facets under 90% overlap:  ${String(s3.length).padStart(5)}`);
console.log(`-------  cumulative after stage 3:                  ${String(s1.length + s2.length + s3.length).padStart(5)}`);
console.log(`held     hospital facets >=90% of their parent:     ${String(dupes.length).padStart(5)}`);
console.log(`held     facets below the 3-record floor:           ${String(thin.length).padStart(5)}`);
console.log(`total                                               ${String(docs.length + hosp.length).padStart(5)}`);

console.log("\nStage 3 by depth:");
const byDepth = new Map<string, number>();
for (const f of s3) byDepth.set(depthOf(f.query), (byDepth.get(depthOf(f.query)) ?? 0) + 1);
for (const d of DEPTHS) if (byDepth.has(d)) console.log(`  ${String(byDepth.get(d)).padStart(5)}  ${d}`);
console.log("\nStage 3 by specialty:");
const bySpec = new Map<string, number>();
for (const f of s3) bySpec.set(f.query.specialty ?? "-", (bySpec.get(f.query.specialty ?? "-") ?? 0) + 1);
for (const [k, v] of [...bySpec].sort((a, b) => b[1] - a[1])) console.log(`  ${String(v).padStart(5)}  ${k}`);
console.log("\nDoctor facets identical to their parent (exempt from the gate):");
console.log(`  ${docs.filter((f) => ratio(f) === 1).length} of ${docs.length}`);
