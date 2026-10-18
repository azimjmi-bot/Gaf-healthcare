import "server-only";
import { LINAC_PROCEDURE_PAGES_AR } from "@/data/doctor-pages/radiation-procedures-linac-ar";
import { STEREO_PROCEDURE_PAGES_AR } from "@/data/doctor-pages/radiation-procedures-stereo-ar";
import { COMPLEX_PROCEDURE_PAGES_AR } from "@/data/doctor-pages/radiation-procedures-complex-ar";
import {
  applyRadiationProcedurePatch,
  procedureCopyIssues,
  type RadiationProcedureCopy,
} from "@/lib/i18n/radiation-procedure-page";
import { RADIATION_ONCOLOGY_SELECTION_NOTE_AR, RADIATION_ONCOLOGY_SOURCES_AR } from "@/data/doctor-pages/radiation-oncology-ar";
import { filterDoctors, type CatalogQuery } from "@/lib/catalog";
import { costPath, doctorsPath } from "@/lib/catalog-links";
import { doctorProcedurePath, DOCTOR_PROCEDURE_INDEX_MIN } from "@/lib/doctor-discovery";
import { paginateDoctors, uniqueDoctorsSorted, type Doctor } from "@/lib/doctors";
import type { Hospital } from "@/lib/hospitals";
import { arabicDocumentMeta, type ArabicDocumentMeta } from "@/lib/i18n/arabic-doctor-directory";
import { countedNoun } from "@/lib/i18n/arabic-grammar";
import { localePageIsRenderable } from "@/lib/i18n/locale-publication";
import { taxonomyLabel } from "@/lib/i18n/taxonomy-labels";
import { doctorsForLocale, hospitalsForLocale } from "@/lib/locale-catalog";
import { loadCatalogCms } from "@/lib/cms/catalog-store";
import type { RadiationProcedurePagePatch } from "@/lib/cms/catalog-types";
import { getProcedure } from "@/lib/taxonomy";
import { consultToWhatsappHref } from "@/lib/site";
import { treatments } from "@/lib/data";

const EBRT = "External Beam Radiotherapy (EBRT)";

function procedureBenchmarks(procedure: string): ArabicRadiationProcedureData["benchmarks"] {
  const treatment = treatments.find((row) => row.name === procedure);
  if (!treatment?.partnerRange || !treatment.usRange) return undefined;
  return {
    indiaUsd: treatment.partnerRange,
    usUsd: treatment.usRange,
    uaeLevel: "2.2–3.6×",
    ...(procedure === EBRT
      ? {
          session: "غالبًا 10–20 دقيقة على طاولة الجهاز",
          fractions: "غالبًا 15–35 جلسة في أيام العمل",
          course: "4–7 أسابيع من الجلسات في السجل، والحضور في أيام العمل. معظم الخطط خارجية بلا عدد ليالٍ ثابت.",
        }
      : {}),
  };
}

const SPECIALTY = "Radiation Oncology";

export const RADIATION_PROCEDURE_PAGES_AR: Record<string, RadiationProcedureCopy> = Object.fromEntries(
  [...LINAC_PROCEDURE_PAGES_AR, ...STEREO_PROCEDURE_PAGES_AR, ...COMPLEX_PROCEDURE_PAGES_AR].map((page) => [
    page.procedure,
    page,
  ]),
);

export const RADIATION_PROCEDURE_REVIEW_AR = {
  attribution: "فريق محتوى GAF Healthcare",
  updated: "2026-10-18",
  note: "النصوص التعليمية لم تخضع لمراجعة طبية بشرية مستقلة. هي شرح عام للتقنية كما تُستخدم في علاج الأورام بالإشعاع، وليست خطة لحالة بعينها. تعداد الأطباء والمستشفيات يُحسب من علاقات الدليل المنشورة لا من جرد أجهزة.",
  sources: RADIATION_ONCOLOGY_SOURCES_AR,
};

export type ArabicRadiationProcedureData = {
  copy: RadiationProcedureCopy;
  meta: ArabicDocumentMeta;
  path: string;
  parentPath: string;
  consultHref: string;
  selectionNote: string;
  review: typeof RADIATION_PROCEDURE_REVIEW_AR;
  doctorCount: number;
  hospitalCount: number;
  doctorCountLabel: string;
  hospitalCountLabel: string;
  crumbs: { name: string; path: string }[];
  doctors: Doctor[];
  paging: ReturnType<typeof paginateDoctors>;
  hospitals: { hospital: Hospital; count: number }[];
  cities: { name: string; href: string; count: number }[];
  related: { name: string; href: string }[];
  peerHref?: string;
  costHref?: string;
  /** Stored planning figures. Absent when the catalog has no cost row. */
  benchmarks?: {
    indiaUsd: string;
    usUsd: string;
    /** Relative UAE level from the radiation destination table, not a sourced price. */
    uaeLevel: string;
    session?: string;
    fractions?: string;
    course?: string;
  };
};

export function listRadiationProcedureNames() {
  return Object.keys(RADIATION_PROCEDURE_PAGES_AR);
}

export function radiationProcedurePatch(procedureName: string): RadiationProcedurePagePatch | undefined {
  const slug = getProcedure(procedureName)?.slug;
  if (!slug) return undefined;
  return loadCatalogCms("ar").radiationProcedurePageOverrides?.[slug];
}

/**
 * The reviewed baseline is what the public India page renders.
 * A draft overlay hides the long form. A published overlay replaces the
 * editable fields only when the merged copy still passes the FAQ checks.
 */
export function resolveRadiationProcedureCopy(
  procedureName: string,
  patch: RadiationProcedurePagePatch | undefined = radiationProcedurePatch(procedureName),
): RadiationProcedureCopy | undefined {
  const base = RADIATION_PROCEDURE_PAGES_AR[procedureName];
  if (!base) return undefined;
  if (patch?.status === "draft") return undefined;
  const merged = patch?.status === "published" ? applyRadiationProcedurePatch(base, patch) : base;
  if (procedureCopyIssues(merged).length > 0) return undefined;
  return merged;
}

export function isArabicRadiationProcedureQuery(query: CatalogQuery) {
  return (
    query.destination === "India" &&
    !query.city &&
    query.specialty === SPECIALTY &&
    Boolean(query.procedure && RADIATION_PROCEDURE_PAGES_AR[query.procedure])
  );
}

export function buildArabicRadiationProcedure(
  query: CatalogQuery,
  page = 1,
  rows: Doctor[] = doctorsForLocale("ar"),
  hospitalRows: Hospital[] = hospitalsForLocale("ar"),
  patch?: RadiationProcedurePagePatch,
): ArabicRadiationProcedureData | undefined {
  if (!isArabicRadiationProcedureQuery(query) || !query.procedure) return undefined;
  const copy = resolveRadiationProcedureCopy(query.procedure, patch ?? radiationProcedurePatch(query.procedure));
  if (!copy) return undefined;
  const path = doctorsPath(query);
  const meta = arabicDocumentMeta(path);
  if (meta.state === "missing") return undefined;

  const matched = uniqueDoctorsSorted(
    filterDoctors({ destination: "India", specialty: SPECIALTY, procedure: query.procedure }, rows),
  );
  if (matched.length < DOCTOR_PROCEDURE_INDEX_MIN) return undefined;
  const paging = paginateDoctors(matched, page);
  const hospitalCounts = new Map<string, number>();
  for (const doctor of matched) hospitalCounts.set(doctor.hospitalSlug, (hospitalCounts.get(doctor.hospitalSlug) ?? 0) + 1);
  const hospitals = hospitalRows
    .filter((hospital) => hospitalCounts.has(hospital.slug))
    .map((hospital) => ({ hospital, count: hospitalCounts.get(hospital.slug) ?? 0 }))
    .sort((a, b) => b.count - a.count || a.hospital.name.localeCompare(b.hospital.name));

  const cityCounts = new Map<string, number>();
  for (const doctor of matched) cityCounts.set(doctor.city, (cityCounts.get(doctor.city) ?? 0) + 1);
  const cities = [...cityCounts.entries()]
    .filter(([, count]) => count >= DOCTOR_PROCEDURE_INDEX_MIN)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([city, count]) => ({
      name: taxonomyLabel(city, "ar"),
      href: doctorProcedurePath(SPECIALTY, query.procedure as string, city),
      count,
    }));

  const related = copy.related
    .filter((name) => name !== query.procedure && resolveRadiationProcedureCopy(name))
    .map((name) => ({ name: taxonomyLabel(name, "ar"), href: doctorProcedurePath(SPECIALTY, name) }));

  const peerHref =
    copy.comparisonPeer && resolveRadiationProcedureCopy(copy.comparisonPeer)
      ? doctorProcedurePath(SPECIALTY, copy.comparisonPeer)
      : undefined;
  const cost = costPath(query.procedure);
  const costHref = localePageIsRenderable("ar", cost) ? cost : undefined;
  const parentPath = doctorsPath({ destination: "India", specialty: SPECIALTY });

  return {
    copy,
    meta,
    path,
    parentPath,
    consultHref: consultToWhatsappHref(`/consult?specialty=radiation-oncology`),
    selectionNote: RADIATION_ONCOLOGY_SELECTION_NOTE_AR,
    review: RADIATION_PROCEDURE_REVIEW_AR,
    doctorCount: matched.length,
    hospitalCount: hospitals.length,
    doctorCountLabel: countedNoun(matched.length, "publishedDoctor"),
    hospitalCountLabel: countedNoun(hospitals.length, "hospital"),
    crumbs: [
      { name: "الأطباء", path: "/doctors" },
      { name: "الهند", path: "/doctors/India" },
      { name: taxonomyLabel(SPECIALTY, "ar"), path: parentPath },
      { name: taxonomyLabel(query.procedure, "ar"), path },
    ],
    doctors: paging.items,
    paging,
    hospitals,
    cities,
    related,
    peerHref,
    costHref,
    benchmarks: procedureBenchmarks(query.procedure),
  };
}
