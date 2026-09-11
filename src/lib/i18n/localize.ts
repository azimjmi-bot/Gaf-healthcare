import "server-only";
import { HOME_DESTINATIONS, HOME_REVIEWS, HOME_VIDEOS } from "@/data/home";
import { localizeInternalHref } from "@/lib/i18n/path";
import { homeExtraCatalogFor, uiCatalogFor } from "@/lib/i18n/ui-catalogs";
import type { AppLocale } from "@/lib/i18n/languages";
import { COST_FAQS, DOCTOR_FAQS, HOSPITAL_FAQS } from "@/lib/seo";
import type { Article } from "@/lib/cms/types";
import type { CostArticle } from "@/data/cost-articles/types";
import { getCostArticle } from "@/data/cost-articles";
import type { Doctor } from "@/lib/doctors";
import type { Hospital } from "@/lib/hospitals";
import type { Treatment } from "@/lib/treatments";

export async function localizeMessages(locale: AppLocale) {
  return uiCatalogFor(locale);
}

export async function localizeDoctor(doctor: Doctor, _locale: AppLocale) {
  return doctor;
}

export async function localizeHospital(hospital: Hospital, _locale: AppLocale) {
  return hospital;
}

export async function localizeCost(
  treatment: Treatment,
  _locale: AppLocale,
): Promise<{ treatment: Treatment; article?: CostArticle; fields: Record<string, string> }> {
  return {
    treatment,
    article: getCostArticle(treatment.slug),
    fields: {},
  };
}

export async function localizeBlog(post: Article, locale: AppLocale) {
  return {
    ...post,
    relatedLinks: post.relatedLinks.map((link) => ({
      ...link,
      href: localizeInternalHref(link.href, locale),
    })),
    blocks: post.blocks.map((block) =>
      block.type === "button" ? { ...block, href: localizeInternalHref(block.href, locale) } : block,
    ),
  };
}

export async function localizeFaqs(kind: "doctors" | "hospitals" | "costs", _locale: AppLocale) {
  return kind === "doctors" ? DOCTOR_FAQS : kind === "hospitals" ? HOSPITAL_FAQS : COST_FAQS;
}

export async function localizeHomeExtras(locale: AppLocale) {
  const fields = homeExtraCatalogFor(locale);
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
  _sourceId: string,
  fields: Record<string, string>,
  _locale: AppLocale,
) {
  return fields;
}
