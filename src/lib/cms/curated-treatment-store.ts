import "server-only";

import { mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { randomUUID } from "node:crypto";
import { getCountry, getSpecialty, toSlug } from "@/lib/taxonomy";
import { LOCALES, type AppLocale } from "@/lib/i18n/languages";
import {
  blankTreatmentTranslation,
  type CuratedTreatment,
  type CuratedTreatmentStore,
  type CuratedTreatmentTranslation,
} from "@/lib/cms/curated-treatment-types";
import { doctorsForLocale, hospitalsForLocale } from "@/lib/locale-catalog";
import { catalogTreatments } from "@/lib/treatments";

const STORE_FILE = join(process.cwd(), "content/curated-treatments.json");

function hasText(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function unique(values: string[]) {
  return [...new Set(values.map((value) => value.trim()).filter(Boolean))];
}

function normalizeTranslation(
  value: Partial<CuratedTreatmentTranslation> | undefined,
): CuratedTreatmentTranslation {
  const blank = blankTreatmentTranslation();
  if (!value) return blank;
  return {
    ...blank,
    ...value,
    status: value.status === "published" ? "published" : "draft",
    searchKeywords: unique(value.searchKeywords ?? []),
    process: (value.process ?? []).map((step) => ({
      id: step.id || randomUUID(),
      title: String(step.title ?? ""),
      description: String(step.description ?? ""),
    })),
    faqs: (value.faqs ?? []).map((faq) => ({
      id: faq.id || randomUUID(),
      question: String(faq.question ?? ""),
      answer: String(faq.answer ?? ""),
    })),
  };
}

export function normalizeCuratedTreatment(
  value: CuratedTreatment,
): CuratedTreatment {
  const translations: CuratedTreatment["translations"] = {};
  for (const locale of LOCALES) {
    if (value.translations?.[locale]) {
      translations[locale] = normalizeTranslation(value.translations[locale]);
    }
  }
  return {
    ...value,
    slug: toSlug(value.slug),
    previousSlugs: unique(value.previousSlugs ?? []).filter(
      (slug) => slug !== toSlug(value.slug),
    ),
    destinationSlugs: unique(value.destinationSlugs ?? []),
    doctorSlugs: unique(value.doctorSlugs ?? []),
    hospitalSlugs: unique(value.hospitalSlugs ?? []),
    costPageSlugs: unique(value.costPageSlugs ?? []),
    relatedTreatmentSlugs: unique(value.relatedTreatmentSlugs ?? []).filter(
      (slug) => slug !== toSlug(value.slug),
    ),
    featured: Boolean(value.featured),
    sortOrder: Number.isFinite(Number(value.sortOrder))
      ? Number(value.sortOrder)
      : 0,
    translations,
  };
}

export function loadCuratedTreatments(): CuratedTreatmentStore {
  try {
    const parsed = JSON.parse(
      readFileSync(STORE_FILE, "utf8"),
    ) as CuratedTreatmentStore;
    return {
      treatments: Array.isArray(parsed.treatments)
        ? parsed.treatments.map(normalizeCuratedTreatment)
        : [],
    };
  } catch {
    return { treatments: [] };
  }
}

export function saveCuratedTreatments(store: CuratedTreatmentStore) {
  mkdirSync(dirname(STORE_FILE), { recursive: true });
  const next = `${STORE_FILE}.${process.pid}.${Date.now()}.tmp`;
  writeFileSync(next, `${JSON.stringify(store, null, 2)}\n`, "utf8");
  renameSync(next, STORE_FILE);
}

export function uniqueCuratedTreatmentSlug(
  store: CuratedTreatmentStore,
  value: string,
  exceptId?: string,
) {
  const base = toSlug(value) || "untitled-treatment";
  let slug = base;
  let suffix = 2;
  const used = new Set(
    store.treatments
      .filter((row) => row.id !== exceptId)
      .flatMap((row) => [row.slug, ...(row.previousSlugs ?? [])]),
  );
  while (used.has(slug)) slug = `${base}-${suffix++}`;
  return slug;
}

export function blankCuratedTreatment(
  store: CuratedTreatmentStore,
): CuratedTreatment {
  const now = new Date().toISOString();
  return {
    id: randomUUID(),
    slug: uniqueCuratedTreatmentSlug(store, "untitled-treatment"),
    previousSlugs: [],
    baseName: "",
    specialtySlug: "",
    subspecialty: "",
    category: "",
    image: "",
    destinationSlugs: [],
    doctorSlugs: [],
    hospitalSlugs: [],
    costPageSlugs: [],
    relatedTreatmentSlugs: [],
    status: "draft",
    featured: false,
    sortOrder: 0,
    createdAt: now,
    updatedAt: now,
    translations: {},
  };
}

export function validateTreatmentForSave(
  treatment: CuratedTreatment,
  store?: CuratedTreatmentStore,
) {
  const errors: string[] = [];
  if (!hasText(treatment.slug)) errors.push("Slug is required.");
  if (hasText(treatment.specialtySlug) && !getSpecialty(treatment.specialtySlug)) {
    errors.push("Select a valid existing specialty.");
  }
  for (const destination of treatment.destinationSlugs) {
    if (!getCountry(destination)) {
      errors.push(`Unknown destination: ${destination}.`);
    }
  }
  if (store) {
    const doctorSlugs = new Set(doctorsForLocale("en").map((row) => row.slug));
    const hospitalSlugs = new Set(
      hospitalsForLocale("en").map((row) => row.slug),
    );
    const costSlugs = new Set(catalogTreatments.map((row) => row.slug));
    const relatedSlugs = new Set(
      store.treatments
        .filter((row) => row.id !== treatment.id)
        .map((row) => row.slug),
    );
    for (const slug of treatment.doctorSlugs) {
      if (!doctorSlugs.has(slug)) errors.push(`Unknown doctor: ${slug}.`);
    }
    for (const slug of treatment.hospitalSlugs) {
      if (!hospitalSlugs.has(slug)) errors.push(`Unknown hospital: ${slug}.`);
    }
    for (const slug of treatment.costPageSlugs) {
      if (!costSlugs.has(slug)) errors.push(`Unknown cost page: ${slug}.`);
    }
    for (const slug of treatment.relatedTreatmentSlugs) {
      if (!relatedSlugs.has(slug)) errors.push(`Unknown related Treatment: ${slug}.`);
    }
  }
  const authored = LOCALES.filter((locale) => treatment.translations[locale]);
  for (const locale of authored) {
    const translation = treatment.translations[locale];
    if (!translation || translation.status !== "published") continue;
    if (!hasText(translation.name)) {
      errors.push(`${locale.toUpperCase()}: treatment name is required to publish.`);
    }
    if (!hasText(translation.shortDescription)) {
      errors.push(`${locale.toUpperCase()}: short description is required to publish.`);
    }
    if (
      !hasText(translation.editorialBody) &&
      !hasText(translation.fullDescription) &&
      !hasText(translation.overview) &&
      !hasText(translation.whatIsIt)
    ) {
      errors.push(`${locale.toUpperCase()}: add substantive treatment content to publish.`);
    }
    if (
      translation.faqs.some(
        (faq) => !hasText(faq.question) || !hasText(faq.answer),
      )
    ) {
      errors.push(`${locale.toUpperCase()}: each FAQ needs a question and answer.`);
    }
  }
  if (treatment.status === "published") {
    if (!hasText(treatment.baseName)) errors.push("Base name is required to publish.");
    if (!getSpecialty(treatment.specialtySlug)) {
      errors.push("Select a specialty before publishing.");
    }
    if (authored.length === 0) {
      errors.push("Add at least one language version before publishing.");
    }
    if (
      !LOCALES.some(
        (locale) => treatment.translations[locale]?.status === "published",
      )
    ) {
      errors.push("Publish at least one language version before publishing the Treatment.");
    }
  }
  return errors;
}

export function publishedCuratedTreatments(locale: AppLocale) {
  return loadCuratedTreatments()
    .treatments.filter(
      (row) =>
        row.status === "published" &&
        row.translations[locale]?.status === "published",
    )
    .sort(
      (a, b) =>
        Number(b.featured) - Number(a.featured) ||
        a.sortOrder - b.sortOrder ||
        (a.translations[locale]?.name ?? "").localeCompare(
          b.translations[locale]?.name ?? "",
        ),
    );
}

export function getPublishedCuratedTreatment(
  slug: string,
  locale: AppLocale,
) {
  return publishedCuratedTreatments(locale).find((row) => row.slug === slug);
}

export function resolvePublishedCuratedTreatment(
  slug: string,
  locale: AppLocale,
) {
  return publishedCuratedTreatments(locale).find(
    (row) => row.slug === slug || row.previousSlugs.includes(slug),
  );
}

export function treatmentTranslationStatus(
  treatment: CuratedTreatment,
  locale: AppLocale,
) {
  return treatment.translations[locale]?.status ?? "missing";
}
