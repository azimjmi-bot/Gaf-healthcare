import assert from "node:assert/strict";
import test from "node:test";
import { ArabicRadiationProcedureSsrDocument } from "@/components/arabic-radiation-procedure-ssr";
import { faqJsonLd } from "@/lib/seo";
import {
  buildArabicRadiationProcedure,
  resolveRadiationProcedureCopy,
} from "@/lib/i18n/ar-radiation-procedure";
import { renderArabicDoctorDirectoryHtml } from "@/lib/i18n/arabic-radiation-html";
import { doctorsForLocale } from "@/lib/locale-catalog";
import { filterDoctors } from "@/lib/catalog";
import { DOCTOR_PROCEDURE_INDEX_MIN } from "@/lib/doctor-discovery";
import { publishedFacetPaths } from "@/lib/i18n/facet-candidates";
import { absoluteUrl } from "@/lib/seo-url";
import { RADIATION_PROCEDURES } from "@/lib/taxonomy";
import { uniqueDoctorsSorted } from "@/lib/doctors";
import { parsePrettyCatalogSegments, prettyCatalogPath, toPrettySegment } from "@/lib/pretty-catalog-path";

const IMRT = "Intensity-Modulated Radiotherapy (IMRT)";
const PUBLISHED = { status: "published" as const };

test("baseline long form is public, and a draft or a short FAQ list hides it", () => {
  assert.ok((resolveRadiationProcedureCopy(IMRT, undefined)?.faqs.length ?? 0) >= 18);
  assert.equal(resolveRadiationProcedureCopy(IMRT, { status: "draft" }), undefined);
  assert.equal(
    resolveRadiationProcedureCopy(IMRT, { status: "published", faqs: [{ q: "سؤال", a: "جواب" }] }),
    undefined,
  );
  assert.ok(resolveRadiationProcedureCopy(IMRT, PUBLISHED)?.faqs.length);
});

test("IMRT India page lists only doctors linked to IMRT", () => {
  const page = buildArabicRadiationProcedure(
    { destination: "India", specialty: "Radiation Oncology", procedure: IMRT },
    1,
    doctorsForLocale("ar"),
    undefined,
    PUBLISHED,
  );
  assert.ok(page);
  assert.match(page.copy.h1, /IMRT/);
  assert.ok(page.copy.faqs.length >= 18);
  const matched = filterDoctors(
    { destination: "India", specialty: "Radiation Oncology", procedure: IMRT },
    doctorsForLocale("ar"),
  );
  assert.equal(page.doctorCount, new Set(matched.map((doctor) => doctor.slug)).size);
  for (const doctor of page.doctors) assert.ok(doctor.procedures.includes(IMRT));
  const allowedHospitals = new Set(matched.map((doctor) => doctor.hospitalSlug));
  for (const row of page.hospitals) assert.ok(allowedHospitals.has(row.hospital.slug));
  assert.equal(
    buildArabicRadiationProcedure(
      { destination: "India", city: "Delhi", specialty: "Radiation Oncology", procedure: IMRT },
      1,
      doctorsForLocale("ar"),
      undefined,
      PUBLISHED,
    ),
    undefined,
  );
});

test("public India procedure HTML renders the long form, and a city URL does not", () => {
  const html = renderArabicDoctorDirectoryHtml({
    destination: "India",
    specialty: "Radiation Oncology",
    procedure: IMRT,
  });
  assert.ok(html);
  assert.equal(html.includes("procedure-quick-answer"), true);
  assert.equal(html.includes("ملاحظة حول العلاج الإشعاعي المعدل الشدة"), true);
  const cityHtml = renderArabicDoctorDirectoryHtml({
    destination: "India",
    city: "Delhi NCR",
    specialty: "Radiation Oncology",
    procedure: IMRT,
  });
  assert.ok(cityHtml);
  assert.equal(cityHtml.includes("procedure-quick-answer"), false);
  const page = buildArabicRadiationProcedure(
    { destination: "India", specialty: "Radiation Oncology", procedure: IMRT },
    1,
    doctorsForLocale("ar"),
    undefined,
    PUBLISHED,
  );
  assert.ok(page);
  const schema = faqJsonLd(page.copy.faqs, { path: page.path, locale: "ar" });
  const questions = (schema.mainEntity as { name: string }[]).map((row) => row.name);
  assert.deepEqual(questions, page.copy.faqs.map((row) => row.q));
  const markup = JSON.stringify(ArabicRadiationProcedureSsrDocument({ data: page }));
  for (const question of page.copy.faqs) assert.ok(markup.includes(question.q));
  assert.ok(markup.includes(page.copy.h1));
});

const EBRT = "External Beam Radiotherapy (EBRT)";

test("EBRT pretty URL drops parentheses and the old segment still resolves", () => {
  assert.equal(toPrettySegment(EBRT), "External-Beam-Radiotherapy-EBRT");
  assert.equal(
    prettyCatalogPath("/doctors", { destination: "India", specialty: "Radiation Oncology", procedure: EBRT }),
    "/doctors/India/Radiation-Oncology/External-Beam-Radiotherapy-EBRT",
  );
  for (const segment of ["External-Beam-Radiotherapy-(EBRT)", "External-Beam-Radiotherapy-EBRT"]) {
    assert.equal(
      parsePrettyCatalogSegments(["India", "Radiation-Oncology", segment])?.procedure,
      EBRT,
      segment,
    );
  }
});

test("EBRT Arabic HTML is extractable and does not invent ratings or prices", () => {
  const html = renderArabicDoctorDirectoryHtml({
    destination: "India",
    specialty: "Radiation Oncology",
    procedure: EBRT,
  });
  assert.ok(html);
  assert.match(html, /lang="ar"/);
  assert.match(html, /dir="rtl"/);
  assert.match(html, /rel="canonical" href="https:\/\/gaf\.healthcare\/ar\/doctors\/india\/radiation-oncology\/external-beam-radiotherapy-ebrt"/);
  assert.equal(html.includes("External-Beam-Radiotherapy-(EBRT)"), false);
  assert.match(html, /hrefLang="ar"/);
  assert.match(html, /hrefLang="en"/);
  assert.match(html, /hrefLang="x-default"/);
  assert.match(html, /property="og:title"/);
  assert.match(html, /name="twitter:card"/);
  assert.match(html, /<form class="catalog-filter catalog-filter--sticky"/);
  assert.match(html, /action="\/ar\/doctors\/filter"/);
  assert.match(html, /name="destination"/);
  assert.match(html, /name="city"/);
  assert.match(html, /name="specialty"/);
  assert.match(html, /name="procedure"/);
  assert.match(html, /كل الوجهات/);
  assert.match(html, /كل الإجراءات/);
  assert.match(html, /عرض النتائج/);
  assert.match(html, /data-href="\/ar\/doctors\/india\/radiation-oncology\/external-beam-radiotherapy-ebrt"/);
  assert.match(html, /value="External Beam Radiotherapy \(EBRT\)" data-href="[^"]+" selected/);
  assert.match(html, /value="India" data-href="[^"]+" selected/);
  assert.match(html, /value="Radiation Oncology" data-href="[^"]+" selected/);
  assert.match(html, /data-href="\/ar\/doctors\/india\/delhi-ncr\/radiation-oncology\/external-beam-radiotherapy-ebrt"/);
  assert.match(html, /data-href="\/ar\/doctors\/india\/medical-oncology"/);
  assert.ok(html.indexOf("<h1") < html.indexOf("catalog-filter"));
  assert.ok(html.indexOf("catalog-filter") < html.indexOf("procedure-quick-answer"));
  assert.match(html, /نظرة عامة/);
  assert.match(html, /EBRT وIMRT وسايبر نايف/);
  assert.match(html, /لم تُراجع هذه الصفحة طبيًا بشكل مستقل/);
  assert.equal(html.includes("AggregateRating"), false);
  assert.equal(html.includes("نسبة نجاح"), false);
  assert.match(html, /\$1,000–\$6,000\+/);
  assert.match(html, /\$12,000–\$25,000/);
  assert.match(html, /10–20 دقيقة/);
  assert.match(html, /15–35 جلسة/);
  assert.match(html, /لا تحوّلها إلى الريال/);
  assert.equal(html.includes("SAR"), false);
  const page = buildArabicRadiationProcedure(
    { destination: "India", specialty: "Radiation Oncology", procedure: EBRT },
    1,
    doctorsForLocale("ar"),
    undefined,
    PUBLISHED,
  );
  assert.ok(page);
  const markup = JSON.stringify(ArabicRadiationProcedureSsrDocument({ data: page }));
  assert.match(markup, /MedicalProcedure/);
  assert.match(markup, /howPerformed/);
  assert.match(markup, /bodyLocation/);
  assert.match(markup, /procedureType.{0,12}Radiation/);
  assert.match(markup, /hospitalAffiliation/);
  assert.match(markup, /alumniOf/);
  assert.match(markup, /FAQPage/);
  assert.match(markup, /BreadcrumbList/);
  assert.match(markup, /EducationalOccupationalCredential|jobTitle/);
  assert.equal(markup.includes("AggregateRating"), false);
  assert.equal(markup.includes('"code"'), false);
});

test("every radiation procedure with enough linked doctors publishes one Arabic India page", () => {
  const doctors = doctorsForLocale("ar");
  const sitemap = new Set(publishedFacetPaths("ar").map((path) => absoluteUrl(path, "ar")));
  const eligible: string[] = [];
  const withheld: string[] = [];
  for (const procedure of RADIATION_PROCEDURES) {
    const count = uniqueDoctorsSorted(
      filterDoctors({ destination: "India", specialty: "Radiation Oncology", procedure }, doctors),
    ).length;
    const page = buildArabicRadiationProcedure(
      { destination: "India", specialty: "Radiation Oncology", procedure },
      1,
      doctors,
      undefined,
      PUBLISHED,
    );
    if (count < DOCTOR_PROCEDURE_INDEX_MIN) {
      assert.equal(page, undefined, procedure);
      withheld.push(`${procedure} (${count} doctors)`);
      continue;
    }
    assert.ok(page, procedure);
    assert.ok(page.copy.faqs.length >= 18, procedure);
    assert.equal(page.doctorCount, count);
    const html = renderArabicDoctorDirectoryHtml({
      destination: "India",
      specialty: "Radiation Oncology",
      procedure,
    });
    assert.ok(html, procedure);
    assert.match(html, /procedure-quick-answer/);
    assert.match(html, /dir="rtl"/);
    assert.equal(html.includes("AggregateRating"), false);
    assert.equal(html.includes("نسبة نجاح"), false);
    assert.equal(html.includes("SAR"), false);
    const canonical = absoluteUrl(page.path, "ar");
    assert.match(html, new RegExp(`rel="canonical" href="${canonical.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`));
    assert.match(canonical, /^https:\/\/gaf\.healthcare\/ar\/doctors\/india\/radiation-oncology\//);
    assert.ok(sitemap.has(canonical), `${procedure} missing from Arabic sitemap: ${canonical}`);
    eligible.push(`${procedure} (${page.copy.faqs.length} FAQs, ${count} doctors)`);
  }
  assert.ok(eligible.length > 0, withheld.join("; "));
  assert.equal(eligible.length + withheld.length, RADIATION_PROCEDURES.length);
});

test("stored stay is shown for non-EBRT procedures and couch time stays on EBRT", () => {
  const imrt = renderArabicDoctorDirectoryHtml({
    destination: "India",
    specialty: "Radiation Oncology",
    procedure: IMRT,
  });
  assert.ok(imrt);
  assert.match(imrt, /4–7 أسابيع من الجلسات/);
  assert.equal(imrt.includes("10–20 دقيقة"), false);
  const gamma = renderArabicDoctorDirectoryHtml({
    destination: "India",
    specialty: "Radiation Oncology",
    procedure: "Gamma Knife",
  });
  assert.ok(gamma);
  assert.match(gamma, /جلسة واحدة في العادة/);
  assert.match(gamma, /عدد الليالي غير مخزّن/);
  const iort = renderArabicDoctorDirectoryHtml({
    destination: "India",
    specialty: "Radiation Oncology",
    procedure: "Intraoperative Radiotherapy (IORT)",
  });
  assert.ok(iort);
  assert.match(iort, /مرتبطة بمدة الإقامة الجراحية/);
});
