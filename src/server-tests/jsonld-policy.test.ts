import test from "node:test";
import assert from "node:assert/strict";
import { SOURCE_LOCALE, TARGET_LOCALES, type AppLocale } from "@/lib/i18n/languages";
import { localePathIsPublished } from "@/lib/i18n/locale-publication";
import { taxonomyLabel } from "@/lib/i18n/taxonomy-labels";
import {
  LOCALISED_DOCUMENT_TYPES,
  alternateName,
  compact,
  crawlableUrl,
  documentId,
  entityId,
} from "@/lib/jsonld";
import {
  breadcrumbJsonLd,
  doctorItemListJsonLd,
  doctorProfilePageJsonLd,
  faqJsonLd,
  hospitalItemListJsonLd,
  hospitalJsonLd,
  medicalWebPageJsonLd,
  physicianJsonLd,
} from "@/lib/seo";
import { doctorsForLocale, getDoctorForLocale, getHospitalForLocale, hospitalsForLocale } from "@/lib/locale-catalog";

/**
 * Structured data is the one place where the same real-world thing is described
 * twice, once per language, and a crawler has to work out that it is one thing.
 * These tests pin the two halves of that: entity nodes keep one identity across
 * languages, documents keep one identity per URL, and nothing in either points
 * a crawler at a URL we have not published.
 *
 * The English byte-for-byte guarantee lives in scripts/jsonld-snapshot.ts,
 * which needs a rendered page; everything assertable from the emitters alone is
 * here so it runs in `npm test`.
 */

const SITE = "https://gaf.healthcare";

/** A doctor and a hospital that exist in both English and Arabic. */
const SAMPLE_DOCTOR = doctorsForLocale("ar")[0]!;
const SAMPLE_HOSPITAL = hospitalsForLocale("ar")[0]!;

function doctorIn(locale: AppLocale) {
  const row = getDoctorForLocale(SAMPLE_DOCTOR.slug, locale);
  assert.ok(row, `doctor ${SAMPLE_DOCTOR.slug} missing in ${locale}`);
  return row;
}

function hospitalIn(locale: AppLocale) {
  const row = getHospitalForLocale(SAMPLE_HOSPITAL.slug, locale);
  assert.ok(row, `hospital ${SAMPLE_HOSPITAL.slug} missing in ${locale}`);
  return row;
}

/** Every node a page type emits, in one locale, ready to assert over. */
function blocksFor(locale: AppLocale) {
  const doctor = doctorIn(locale);
  const hospital = hospitalIn(locale);
  const doctorPath = `/doctors/${doctor.slug}`;
  const hospitalPath = `/hospitals/${hospital.slug}`;
  const english = locale === SOURCE_LOCALE ? doctor : doctorIn(SOURCE_LOCALE);
  return {
    physician: physicianJsonLd(doctor, locale, english),
    profilePage: doctorProfilePageJsonLd(doctor, locale, { english }),
    hospital: hospitalJsonLd(hospital, locale),
    breadcrumb: breadcrumbJsonLd(
      [
        { name: "Doctors", path: "/doctors" },
        { name: doctor.name, path: doctorPath },
      ],
      locale,
    ),
    webPage: medicalWebPageJsonLd({
      name: "Sample",
      description: "Sample description",
      // A path published in both languages: an unpublished page emits no
      // JSON-LD at all (see components/json-ld.tsx), so the emitters are only
      // ever asked for a page that exists.
      path: doctorPath,
      lastReviewed: "2026-01-01",
      procedureName: "External Beam Radiotherapy (EBRT)",
      specialty: "Radiation Oncology",
      about: "Sample about",
      locale,
    }),
    faq: faqJsonLd([{ q: "Question?", a: "Answer." }], { path: "/doctors", locale }),
    doctorList: doctorItemListJsonLd([doctor], { name: "Doctors", path: "/doctors", locale }),
    hospitalList: hospitalItemListJsonLd([hospital], { name: "Hospitals", path: "/hospitals", locale }),
    _paths: { doctorPath, hospitalPath },
  };
}

const EN = blocksFor(SOURCE_LOCALE);
const AR = blocksFor("ar");

/** Walks a node and yields every absolute site URL it asserts. */
function urlsIn(value: unknown, out: string[] = []) {
  if (typeof value === "string") {
    if (value.startsWith(SITE)) out.push(value);
  } else if (Array.isArray(value)) {
    for (const item of value) urlsIn(item, out);
  } else if (value && typeof value === "object") {
    for (const item of Object.values(value)) urlsIn(item, out);
  }
  return out;
}

/** Splits a site URL back into the locale it addresses and the bare path. */
function localeAndPath(url: string) {
  const path = url.slice(SITE.length).split("#")[0] || "/";
  for (const locale of TARGET_LOCALES) {
    if (path === `/${locale}`) return { locale, path: "/" };
    if (path.startsWith(`/${locale}/`)) return { locale, path: path.slice(locale.length + 1) };
  }
  return { locale: SOURCE_LOCALE, path };
}

test("entity @ids are identical across languages and anchored to English", () => {
  assert.equal(EN.physician["@id"], AR.physician["@id"]);
  assert.equal(EN.physician["@id"], `${SITE}${EN._paths.doctorPath}#person`);
  assert.equal(EN.hospital["@id"], AR.hospital["@id"]);
  assert.equal(EN.hospital["@id"], `${SITE}${EN._paths.hospitalPath}#hospital`);

  // The same hospital reached through a doctor's worksFor must be the same node
  // as the hospital page's own, or a crawler sees two hospitals.
  const worksFor = (AR.physician.worksFor as { "@id": string })["@id"];
  assert.equal(worksFor, entityId(`/hospitals/${doctorIn("ar").hospitalSlug}`, "hospital"));
  assert.equal(worksFor, (EN.physician.worksFor as { "@id": string })["@id"]);

  const arListed = (AR.doctorList.itemListElement[0] as { item: { "@id": string } }).item["@id"];
  const enListed = (EN.doctorList.itemListElement[0] as { item: { "@id": string } }).item["@id"];
  assert.equal(arListed, enListed);
  assert.equal(arListed, AR.physician["@id"]);
});

test("document @ids differ per URL and match their own canonical", () => {
  const pairs: [string, unknown, unknown, string, string][] = [
    ["ProfilePage", EN.profilePage["@id"], AR.profilePage["@id"], EN._paths.doctorPath, "profilepage"],
    ["BreadcrumbList", EN.breadcrumb["@id"], AR.breadcrumb["@id"], EN._paths.doctorPath, "breadcrumb"],
    ["FAQPage", EN.faq["@id"], AR.faq["@id"], "/doctors", "faq"],
    ["doctor ItemList", EN.doctorList["@id"], AR.doctorList["@id"], "/doctors", "doctor-list"],
    ["hospital ItemList", EN.hospitalList["@id"], AR.hospitalList["@id"], "/hospitals", "hospital-list"],
  ];
  for (const [label, en, ar, path, fragment] of pairs) {
    assert.notEqual(en, ar, `${label} must be a different document per language`);
    assert.equal(en, documentId(path, SOURCE_LOCALE, fragment), label);
    assert.equal(ar, documentId(path, "ar", fragment), label);
    assert.ok(String(ar).startsWith(`${SITE}/ar/`), `${label} Arabic @id should sit under /ar`);
  }
});

test("document nodes declare the page locale, entity nodes declare no language", () => {
  const documents = new Set(["profilePage", "breadcrumb", "webPage", "faq", "doctorList", "hospitalList"]);
  const entities = new Set(["physician", "hospital"]);
  for (const [locale, blocks] of [[SOURCE_LOCALE, EN], ["ar", AR]] as const) {
    for (const [name, node] of Object.entries(blocks)) {
      if (name.startsWith("_")) continue;
      const tagged = node as Record<string, unknown>;
      if (documents.has(name)) {
        assert.equal(tagged.inLanguage, locale, `${name} in ${locale}`);
        const types = [tagged["@type"]].flat();
        assert.ok(
          types.some((type) => (LOCALISED_DOCUMENT_TYPES as readonly string[]).includes(String(type))),
          `${name} is tagged with a language but is not a document type`,
        );
      } else if (entities.has(name)) {
        assert.ok(
          !("inLanguage" in tagged),
          `${name} is an entity with a cross-language @id and must not claim one language`,
        );
      } else {
        assert.fail(`unclassified sample node: ${name}`);
      }
    }
  }
  // The nested entity inside a document node follows the entity rule too.
  assert.ok(!("inLanguage" in (AR.profilePage.mainEntity as Record<string, unknown>)));
});

test("no emitter references an unpublished localised URL", () => {
  for (const [locale, blocks] of [[SOURCE_LOCALE, EN], ["ar", AR]] as const) {
    for (const [name, node] of Object.entries(blocks)) {
      if (name.startsWith("_")) continue;
      for (const url of urlsIn(node)) {
        const target = localeAndPath(url);
        if (target.locale === SOURCE_LOCALE) continue;
        assert.ok(
          localePathIsPublished(target.locale, target.path),
          `${name} in ${locale} points at unpublished ${url}`,
        );
      }
    }
  }
});

// A hospital facet reproducing the whole country's campuses: it renders in
// Arabic but the overlap gate keeps it unpublished, which is the state this
// fallback exists for.
const UNPUBLISHED_AR_FACET = "/hospitals/India/Radiation-Oncology";

test("crawlableUrl falls back to English for an unpublished Arabic page", () => {
  assert.equal(localePathIsPublished("ar", UNPUBLISHED_AR_FACET), false);
  assert.equal(crawlableUrl(UNPUBLISHED_AR_FACET, "ar"), `${SITE}${UNPUBLISHED_AR_FACET}`);
  assert.equal(crawlableUrl("/doctors", "ar"), `${SITE}/ar/doctors`);
  // And a published facet keeps the Arabic address, now that stage 1 is open.
  assert.equal(
    crawlableUrl("/doctors/India", "ar"),
    `${SITE}/ar/doctors/India`,
  );
});

test("breadcrumb trails route around unpublished Arabic facets", () => {
  const trail = breadcrumbJsonLd(
    [
      { name: "المستشفيات", path: "/hospitals" },
      { name: "علاج الأورام بالإشعاع", path: UNPUBLISHED_AR_FACET },
      { name: "Hospital", path: `/doctors/${SAMPLE_DOCTOR.slug}` },
    ],
    "ar",
  );
  const items = trail.itemListElement.map((row) => (row as { item: string }).item);
  assert.equal(items[0], `${SITE}/ar/hospitals`);
  assert.equal(
    items[1],
    `${SITE}${UNPUBLISHED_AR_FACET}`,
    "unpublished facet crumb must stay English",
  );
  assert.equal(items[2], `${SITE}/ar/doctors/${SAMPLE_DOCTOR.slug}`);
});

test("Arabic entities carry the Arabic name with the Latin name alongside", () => {
  const ar = doctorIn("ar");
  const en = doctorIn(SOURCE_LOCALE);
  assert.notEqual(ar.name, en.name, "fixture doctor should have a translated name");
  assert.equal(AR.physician.name, ar.name);
  assert.equal(AR.physician.alternateName, en.name);
  assert.equal(AR.physician.medicalSpecialty, taxonomyLabel(en.specialty, "ar"));
  assert.notEqual(AR.physician.medicalSpecialty, en.specialty);
});

test("English entities carry no alternateName", () => {
  assert.equal(EN.physician.alternateName, undefined);
  assert.ok(!("alternateName" in EN.physician));
});

test("alternateName never repeats the name it sits beside", () => {
  assert.equal(alternateName("Max Healthcare", "Max Healthcare"), undefined);
  assert.equal(alternateName("  Max Healthcare  ", "Max Healthcare"), undefined);
  assert.equal(alternateName("د. أنيل", "Dr. Anil"), "Dr. Anil");
  assert.equal(alternateName("", "Dr. Anil"), undefined);
});

test("compact omits a field rather than asserting it empty", () => {
  assert.deepEqual(
    compact({ name: "Keep", description: "", tags: [], missing: undefined, nulled: null, zero: 0 }),
    { name: "Keep", zero: 0 },
  );
});

test("every emitted node is JSON serialisable and parses back identically", () => {
  for (const blocks of [EN, AR]) {
    for (const [name, node] of Object.entries(blocks)) {
      if (name.startsWith("_")) continue;
      const text = JSON.stringify(node);
      assert.deepEqual(JSON.parse(text), JSON.parse(JSON.stringify(node)), name);
      assert.ok(text.includes('"@context":"https://schema.org"'), `${name} missing @context`);
    }
  }
});
