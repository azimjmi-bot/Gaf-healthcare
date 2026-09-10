import "server-only";
import { getCostArticle } from "@/data/cost-articles";
import { HOME_DESTINATIONS, HOME_REVIEWS, HOME_VIDEOS } from "@/data/home";
import { getPost, listPublishedPosts } from "@/lib/blogs";
import { getDoctor, getHospital, getTreatment, doctors, hospitals, treatments } from "@/lib/data";
import {
  applyBlogFields,
  applyCostArticleFields,
  applyDoctorFields,
  applyFaqFields,
  applyHospitalFields,
  applyTreatmentFields,
  extractBlogFields,
  extractDirectoryFaqs,
  extractDoctorFields,
  extractHospitalFields,
  extractTreatmentFields,
  extractUiFields,
} from "@/lib/i18n/extract";
import { localizeInternalHref } from "@/lib/i18n/path";
import { UI_MESSAGE_FIELDS } from "@/lib/i18n/messages";
import { homeExtraCatalogFor, uiCatalogFor } from "@/lib/i18n/ui-catalogs";
import { completedLocalesFor, getLocalizedFields } from "@/lib/i18n/service";
import { translationConfigured } from "@/lib/i18n/google";
import { getTranslation } from "@/lib/i18n/store";
import type { AppLocale } from "@/lib/i18n/languages";
import type { SourceType, TranslationFields } from "@/lib/i18n/types";
import { COST_FAQS, DOCTOR_FAQS, HOSPITAL_FAQS } from "@/lib/seo";
import { blogSettings } from "@/lib/blogs";
import type { Article } from "@/lib/cms/types";
import type { CostArticle } from "@/data/cost-articles/types";
import type { Doctor } from "@/lib/doctors";
import type { Hospital } from "@/lib/hospitals";
import type { Treatment } from "@/lib/treatments";

function extractHomeFields(): TranslationFields {
  const fields: TranslationFields = {};
  HOME_DESTINATIONS.forEach((place, index) => {
    fields[`dest.${index}.name`] = place.name;
    fields[`dest.${index}.blurb`] = place.blurb;
    fields[`dest.${index}.imageAlt`] = place.imageAlt;
  });
  HOME_VIDEOS.forEach((video, index) => {
    fields[`video.${index}.title`] = video.title;
  });
  HOME_REVIEWS.forEach((review, index) => {
    fields[`review.${index}.text`] = review.text;
  });
  return fields;
}

export function englishFieldsFor(sourceType: SourceType, sourceId: string): TranslationFields | null {
  if (sourceType === "ui" && sourceId === "chrome") return extractUiFields();
  if (sourceType === "page" && sourceId === "home") return extractHomeFields();
  if (sourceType === "page" && sourceId === "doctors-faqs") return extractDirectoryFaqs("doctors");
  if (sourceType === "page" && sourceId === "hospitals-faqs") return extractDirectoryFaqs("hospitals");
  if (sourceType === "page" && sourceId === "costs-faqs") return extractDirectoryFaqs("costs");
  if (sourceType === "page" && sourceId === "blogs-index") {
    const settings = blogSettings();
    return {
      blogEyebrow: settings.blogEyebrow,
      blogTitle: settings.blogTitle,
      blogLede: settings.blogLede,
    };
  }
  if (sourceType === "doctor") {
    const doctor = getDoctor(sourceId);
    return doctor ? extractDoctorFields(doctor) : null;
  }
  if (sourceType === "hospital") {
    const hospital = getHospital(sourceId);
    return hospital ? extractHospitalFields(hospital) : null;
  }
  if (sourceType === "cost") {
    const treatment = getTreatment(sourceId);
    if (!treatment) return null;
    return extractTreatmentFields(treatment, getCostArticle(treatment.slug));
  }
  if (sourceType === "blog") {
    const post = getPost(sourceId);
    return post ? extractBlogFields(post) : null;
  }
  if (sourceType === "copy") {
    return null;
  }
  return null;
}

export async function localizeMessages(locale: AppLocale, generateIfMissing = locale !== "en") {
  const fallback = uiCatalogFor(locale);
  if (locale === "en") return fallback;
  if (generateIfMissing && translationConfigured()) {
    await getLocalizedFields({
      sourceType: "ui",
      sourceId: "chrome",
      language: locale,
      fields: extractUiFields(),
      generateIfMissing: true,
    });
  }
  const record = getTranslation("ui", "chrome", locale);
  const stored = record?.status === "completed" ? record.fields : {};
  return { ...fallback, ...stored };
}

export async function localizeDoctor(doctor: Doctor, locale: AppLocale, generateIfMissing = locale !== "en") {
  const fields = await getLocalizedFields({
    sourceType: "doctor",
    sourceId: doctor.slug,
    language: locale,
    fields: extractDoctorFields(doctor),
    generateIfMissing,
  });
  return applyDoctorFields(doctor, fields);
}

export async function localizeHospital(hospital: Hospital, locale: AppLocale, generateIfMissing = locale !== "en") {
  const fields = await getLocalizedFields({
    sourceType: "hospital",
    sourceId: hospital.slug,
    language: locale,
    fields: extractHospitalFields(hospital),
    generateIfMissing,
  });
  return applyHospitalFields(hospital, fields);
}

export async function localizeCost(
  treatment: Treatment,
  locale: AppLocale,
  generateIfMissing = locale !== "en",
): Promise<{ treatment: Treatment; article?: CostArticle; fields: TranslationFields }> {
  const article = getCostArticle(treatment.slug);
  const fields = await getLocalizedFields({
    sourceType: "cost",
    sourceId: treatment.slug,
    language: locale,
    fields: extractTreatmentFields(treatment, article),
    generateIfMissing,
  });
  return {
    treatment: applyTreatmentFields(treatment, fields),
    article: article ? applyCostArticleFields(article, fields) : undefined,
    fields,
  };
}

export async function localizeBlog(post: Article, locale: AppLocale, generateIfMissing = locale !== "en") {
  const fields = await getLocalizedFields({
    sourceType: "blog",
    sourceId: post.slug,
    language: locale,
    fields: extractBlogFields(post),
    generateIfMissing,
  });
  const localized = applyBlogFields(post, fields);
  localized.relatedLinks = localized.relatedLinks.map((link) => ({
    ...link,
    href: localizeInternalHref(link.href, locale),
  }));
  localized.blocks = localized.blocks.map((block) =>
    block.type === "button" ? { ...block, href: localizeInternalHref(block.href, locale) } : block,
  );
  return localized;
}

export async function localizeFaqs(
  kind: "doctors" | "hospitals" | "costs",
  locale: AppLocale,
  generateIfMissing = locale !== "en",
) {
  const sourceId = `${kind}-faqs`;
  const english = kind === "doctors" ? DOCTOR_FAQS : kind === "hospitals" ? HOSPITAL_FAQS : COST_FAQS;
  const fields = await getLocalizedFields({
    sourceType: "page",
    sourceId,
    language: locale,
    fields: extractDirectoryFaqs(kind),
    generateIfMissing,
  });
  return applyFaqFields(english, fields, "faq");
}

export async function localizeHomeExtras(locale: AppLocale, generateIfMissing = locale !== "en") {
  const seeded = homeExtraCatalogFor(locale);
  if (generateIfMissing && locale !== "en" && translationConfigured()) {
    await getLocalizedFields({
      sourceType: "page",
      sourceId: "home",
      language: locale,
      fields: extractHomeFields(),
      generateIfMissing: true,
    });
  }
  const record = locale === "en" ? null : getTranslation("page", "home", locale);
  const stored = record?.status === "completed" ? record.fields : {};
  const fields = { ...extractHomeFields(), ...seeded, ...stored };
  const destinations = HOME_DESTINATIONS.map((place, index) => ({
    ...place,
    name: fields[`dest.${index}.name`] || place.name,
    blurb: fields[`dest.${index}.blurb`] || place.blurb,
    imageAlt: fields[`dest.${index}.imageAlt`] || place.imageAlt,
  }));
  const videos = HOME_VIDEOS.map((video, index) => ({
    ...video,
    title: fields[`video.${index}.title`] || video.title,
  }));
  const reviews = HOME_REVIEWS.map((review, index) => ({
    ...review,
    text: fields[`review.${index}.text`] || review.text,
  }));
  return { destinations, videos, reviews };
}

export async function localizeCopy(
  sourceId: string,
  fields: TranslationFields,
  locale: AppLocale,
  generateIfMissing = locale !== "en",
) {
  return getLocalizedFields({
    sourceType: "copy",
    sourceId,
    language: locale,
    fields,
    generateIfMissing,
  });
}

export function availableLocales(sourceType: SourceType, sourceId: string, fields?: TranslationFields) {
  return completedLocalesFor(sourceType, sourceId, fields);
}

export function eligibleInventory() {
  return {
    doctors: doctors.length,
    hospitals: hospitals.length,
    costs: treatments.length,
    blogs: listPublishedPosts().length,
    ui: 1,
    pages: 5,
  };
}

export { extractUiFields, extractHomeFields };
