import "server-only";

import { pickDoctorPatch, pickHospitalPatch } from "@/lib/cms/catalog-types";
import { loadCatalogCms, saveCatalogCms } from "@/lib/cms/catalog-store";
import {
  loadCuratedTreatments,
  normalizeCuratedTreatment,
  saveCuratedTreatments,
  validateTreatmentForSave,
} from "@/lib/cms/curated-treatment-store";
import { blankTreatmentTranslation } from "@/lib/cms/curated-treatment-types";
import { loadCms, saveCms } from "@/lib/cms/store";
import { newId } from "@/lib/cms/types";
import type { CmsEdition } from "@/lib/cms/edition";
import { composeEditorialBody } from "@/lib/ai/schema";
import type { AiContentType, AiGenerationRecord, StudioFields } from "@/lib/ai/types";

export type ApplyMode = "draft" | "publish";

function assertNoUrlWrite(output: StudioFields, currentSlug: string) {
  if (output.suggested_slug && currentSlug && output.suggested_slug !== currentSlug) {
    return;
  }
}

function applyTreatment(record: AiGenerationRecord, mode: ApplyMode, edition: CmsEdition) {
  const store = loadCuratedTreatments();
  const index = store.treatments.findIndex(
    (row) => row.id === record.recordId || row.slug === record.recordId,
  );
  if (index < 0) return { error: "Treatment not found." };
  const current = store.treatments[index];
  assertNoUrlWrite(record.output, current.slug);
  const live = current.status === "published" && current.translations[edition]?.status === "published";
  if (mode === "draft" && live) {
    return { error: "This treatment is already live. Use Publish to change the public page." };
  }
  const prev = current.translations[edition] ?? blankTreatmentTranslation();
  const body = composeEditorialBody(record.output) || record.output.section_rewritten || prev.editorialBody;
  const translation = {
    ...prev,
    name: record.output.title || prev.name,
    shortDescription: record.output.introduction || record.output.quick_answer || prev.shortDescription,
    editorialBody: body || prev.editorialBody,
    seoTitle: record.output.meta_title || prev.seoTitle,
    metaDescription: record.output.meta_description || prev.metaDescription,
    faqs: record.output.faqs.length
      ? record.output.faqs.map((faq) => ({ id: newId("faq"), question: faq.question, answer: faq.answer }))
      : prev.faqs,
    status: mode === "publish" ? "published" : "draft",
  };
  const next = normalizeCuratedTreatment({
    ...current,
    slug: current.slug,
    previousSlugs: current.previousSlugs,
    specialtySlug: current.specialtySlug,
    destinationSlugs: current.destinationSlugs,
    doctorSlugs: current.doctorSlugs,
    hospitalSlugs: current.hospitalSlugs,
    costPageSlugs: current.costPageSlugs,
    relatedTreatmentSlugs: current.relatedTreatmentSlugs,
    status: mode === "publish" ? "published" : current.status,
    translations: { ...current.translations, [edition]: translation },
    updatedAt: new Date().toISOString(),
  });
  const errors = validateTreatmentForSave(next, store);
  if (errors.length) return { error: errors.join(" ") };
  store.treatments[index] = next;
  saveCuratedTreatments(store);
  return { ok: true, url: `/treatments/${current.slug}` };
}

function applyDoctor(record: AiGenerationRecord, mode: ApplyMode, edition: CmsEdition) {
  if (mode === "draft") {
    return { error: "Doctor overlays go live when saved. Use Publish to write the bio through the existing catalog save." };
  }
  const cms = loadCatalogCms(edition);
  const slug = record.recordId;
  const prev = pickDoctorPatch(cms.doctorOverrides[slug]);
  cms.doctorOverrides[slug] = pickDoctorPatch({
    ...prev,
    bio: record.output.bio || record.output.section_rewritten || record.output.introduction || prev.bio,
  });
  saveCatalogCms(cms, edition);
  return { ok: true, url: `/doctors/${slug}` };
}

function applyHospital(record: AiGenerationRecord, mode: ApplyMode, edition: CmsEdition) {
  if (mode === "draft") {
    return { error: "Hospital overlays go live when saved. Use Publish to write the bio through the existing catalog save." };
  }
  const cms = loadCatalogCms(edition);
  const slug = record.recordId;
  const prev = pickHospitalPatch(cms.hospitalOverrides[slug]);
  cms.hospitalOverrides[slug] = pickHospitalPatch({
    ...prev,
    bio: record.output.bio || record.output.section_rewritten || record.output.introduction || prev.bio,
    summary: record.output.quick_answer || prev.summary,
  });
  saveCatalogCms(cms, edition);
  return { ok: true, url: `/hospitals/${slug}` };
}

function applyArticle(record: AiGenerationRecord, mode: ApplyMode, edition: CmsEdition) {
  const store = loadCms(edition);
  const index = store.articles.findIndex((row) => row.id === record.recordId);
  if (index < 0) return { error: "Article not found." };
  const current = store.articles[index];
  if (mode === "draft" && current.status === "published") {
    return { error: "This article is already live. Use Publish to change the public page." };
  }
  const body = composeEditorialBody(record.output) || record.output.section_rewritten;
  const blocks = body
    ? [{ id: current.blocks[0]?.id || newId("b"), type: "paragraph" as const, text: body }]
    : current.blocks;
  store.articles[index] = {
    ...current,
    slug: current.slug,
    canonical: current.canonical,
    title: record.output.title || current.title,
    excerpt: record.output.introduction || record.output.quick_answer || current.excerpt,
    seoTitle: record.output.meta_title || current.seoTitle,
    seoDescription: record.output.meta_description || current.seoDescription,
    relatedLinks: record.output.internal_links.length
      ? record.output.internal_links.map((link) => ({ label: link.anchor, href: link.url }))
      : current.relatedLinks,
    blocks,
    status: mode === "publish" ? "published" : "draft",
    publishedAt:
      mode === "publish" ? current.publishedAt || new Date().toISOString() : current.publishedAt,
    updatedAt: new Date().toISOString(),
  };
  saveCms(store, edition);
  return { ok: true, url: current.slug ? `/blogs/${current.slug}` : "" };
}

export function applyGeneration(
  record: AiGenerationRecord,
  mode: ApplyMode,
  edition: CmsEdition,
  contentType: AiContentType = record.contentType,
) {
  if (contentType === "treatment") return applyTreatment(record, mode, edition);
  if (contentType === "doctor") return applyDoctor(record, mode, edition);
  if (contentType === "hospital") return applyHospital(record, mode, edition);
  return applyArticle(record, mode, edition);
}
