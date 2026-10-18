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
