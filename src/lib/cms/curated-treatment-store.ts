import "server-only";

import { randomUUID } from "node:crypto";
import { invalidateCachedJsonFile, readCachedJsonDirectory, readCachedJsonFile } from "@/lib/cms/json-file-cache";
import { contentStorage } from "@/lib/storage";
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

/** Storage key of the curated Treatment records (English source of record). */
export const CURATED_TREATMENTS_KEY = "content/curated-treatments.json";
/** Storage prefix of the one-file-per-slug Arabic treatment translations. */
export const ARABIC_TREATMENTS_KEY = "content/ar/treatments";

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
    const raw = contentStorage().read(CURATED_TREATMENTS_KEY);
    if (raw === null) return { treatments: [] };
    const parsed = JSON.parse(raw) as CuratedTreatmentStore;
    return {
      treatments: Array.isArray(parsed.treatments)
        ? parsed.treatments.map(normalizeCuratedTreatment)
        : [],
    };
  } catch {
    return { treatments: [] };
  }
}

/**
 * Shared, read-only view for rendering and publication gating. Writers keep
 * using `loadCuratedTreatments`, which they mutate in place before saving.
 */
export function readCuratedTreatments(): CuratedTreatmentStore {
  return readCachedJsonFile(CURATED_TREATMENTS_KEY, loadCuratedTreatments);
}

export function saveCuratedTreatments(store: CuratedTreatmentStore) {
  contentStorage().write(CURATED_TREATMENTS_KEY, `${JSON.stringify(store, null, 2)}\n`);
  invalidateCachedJsonFile(CURATED_TREATMENTS_KEY);
}

/**
 * Write a Treatment by id. A draft can vanish from disk after a Hostinger
 * git deploy (this file is empty in git), so Save must recreate the record
 * instead of 404ing on the open editor.
 */
export function applyCuratedTreatmentPatch(
  store: CuratedTreatmentStore,
  id: string,
  patch: Partial<CuratedTreatment>,
) {
  const index = store.treatments.findIndex((row) => row.id === id);
  const created = index < 0;
  const current = created
    ? { ...blankCuratedTreatment(store), id }
    : store.treatments[index];
  const requestedSlug = patch.slug ?? current.slug;
  const slug = uniqueCuratedTreatmentSlug(store, requestedSlug, current.id);
  const previousSlugs =
    slug === current.slug
      ? current.previousSlugs
      : [...current.previousSlugs, current.slug];
  const translations = {
    ...current.translations,
    ...(patch.translations ?? {}),
  };
  const baseName = hasText(patch.baseName) ? patch.baseName : current.baseName;
  if (!translations.en && hasText(baseName)) {
    translations.en = {
      ...blankTreatmentTranslation(),
      name: baseName,
    };
  }
  const requested = normalizeCuratedTreatment({
    ...current,
    ...patch,
    id: current.id,
    createdAt: current.createdAt,
    slug,
    previousSlugs,
    translations,
    updatedAt: new Date().toISOString(),
  });
  const errors = validateTreatmentForSave(requested, store);
  const treatment =
    errors.length > 0 && requested.status === "published"
      ? { ...requested, status: "draft" as const }
      : requested;
  if (created) store.treatments.unshift(treatment);
  else store.treatments[index] = treatment;
  return { treatment, created, errors };
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

/**
 * One file per slug: `{ slug, translation }`. Applied only for Arabic reads so
 * the English store stays the source record.
 */
function arabicTreatmentTranslations() {
  return readCachedJsonDirectory(ARABIC_TREATMENTS_KEY, loadArabicTreatmentTranslations);
}

function loadArabicTreatmentTranslations() {
  const overlays = new Map<string, CuratedTreatmentTranslation>();
  const storage = contentStorage();
  for (const key of storage.list(ARABIC_TREATMENTS_KEY)) {
    if (!key.endsWith(".json")) continue;
    try {
      const raw = storage.read(key);
      if (raw === null) continue;
      const parsed = JSON.parse(raw) as {
        slug?: string;
        translation?: CuratedTreatmentTranslation;
      };
      if (parsed.slug && parsed.translation) {
        overlays.set(parsed.slug, normalizeTranslation(parsed.translation));
      }
    } catch {
      // A half-written translation must not hide the rest of the directory.
    }
  }
  return overlays;
}

function withArabicTranslation(row: CuratedTreatment, locale: AppLocale, overlays: Map<string, CuratedTreatmentTranslation>) {
  if (locale !== "ar") return row;
  const translation = overlays.get(row.slug);
  if (!translation) return row;
  return { ...row, translations: { ...row.translations, ar: translation } };
}

export function publishedCuratedTreatments(locale: AppLocale) {
  const overlays = locale === "ar" ? arabicTreatmentTranslations() : new Map<string, CuratedTreatmentTranslation>();
  return readCuratedTreatments()
    .treatments.map((row) => withArabicTranslation(row, locale, overlays))
    .filter(
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
