import "server-only";
import { HOME_DESTINATIONS, HOME_REVIEWS, HOME_VIDEOS } from "@/data/home";
import { localizeInternalHref } from "@/lib/i18n/path";
import { homeExtraCatalogFor, uiCatalogFor } from "@/lib/i18n/ui-catalogs";
import type { AppLocale } from "@/lib/i18n/languages";
import { COST_FAQS, DOCTOR_FAQS, HOSPITAL_FAQS } from "@/lib/seo";
import type { Article } from "@/lib/cms/types";
import type { CostArticle } from "@/data/cost-articles/types";
import { getCostArticle } from "@/data/cost-articles";
import { COST_FAQS_AR, DOCTOR_FAQS_AR, HOSPITAL_FAQS_AR } from "@/lib/i18n/faqs-ar";
import { getDoctorForLocale, getHospitalForLocale } from "@/lib/locale-catalog";
import type { Doctor } from "@/lib/doctors";
import type { Hospital } from "@/lib/hospitals";
import type { Treatment } from "@/lib/treatments";

export async function localizeMessages(locale: AppLocale) {
  return uiCatalogFor(locale);
}

export async function localizeDoctor(doctor: Doctor, locale: AppLocale) {
  if (locale === "en") return doctor;
  return getDoctorForLocale(doctor.slug, locale);
}

export async function localizeHospital(hospital: Hospital, locale: AppLocale) {
  if (locale === "en") return hospital;
  return getHospitalForLocale(hospital.slug, locale);
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

export async function localizeFaqs(kind: "doctors" | "hospitals" | "costs", locale: AppLocale) {
  if (locale === "ar") {
    return kind === "doctors" ? DOCTOR_FAQS_AR : kind === "hospitals" ? HOSPITAL_FAQS_AR : COST_FAQS_AR;
  }
  return kind === "doctors" ? DOCTOR_FAQS : kind === "hospitals" ? HOSPITAL_FAQS : COST_FAQS;
}

export async function localizeHomeExtras(locale: AppLocale) {
  const fields = homeExtraCatalogFor(locale);
  const destinations = HOME_DESTINATIONS.map((place, index) =>
    locale === "en"
      ? place
      : {
          ...place,
          name: fields[`dest.${index}.name`] || "",
          blurb: fields[`dest.${index}.blurb`] || "",
          imageAlt: fields[`dest.${index}.imageAlt`] || "",
        },
  ).filter((place) => locale === "en" || Boolean(place.name && place.blurb));
  const videos = HOME_VIDEOS.map((video, index) =>
    locale === "en"
      ? video
      : { ...video, title: fields[`video.${index}.title`] || "" },
  ).filter((video) => locale === "en" || Boolean(video.title));
  const reviews = HOME_REVIEWS.map((review, index) =>
    locale === "en"
      ? review
      : { ...review, text: fields[`review.${index}.text`] || "" },
  ).filter((review) => locale === "en" || Boolean(review.text));
  return { destinations, videos, reviews };
}

export async function localizeCopy(
  _sourceId: string,
  fields: Record<string, string>,
  _locale: AppLocale,
) {
  return fields;
}
