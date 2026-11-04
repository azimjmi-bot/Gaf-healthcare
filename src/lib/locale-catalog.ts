import "server-only";
import {
  DOCTOR_OVERLAY_KEYS,
  HOSPITAL_OVERLAY_KEYS,
  TREATMENT_OVERLAY_KEYS,
  pickHospitalPatch,
  pickOverlay,
  pickTreatmentPatch,
  translationStatus,
  type CatalogCms,
  type HospitalPatch,
  type RadiationProcedurePagePatch,
  type TreatmentPatch,
} from "@/lib/cms/catalog-types";
import { applyCatalogLayer, catalogCmsKey, getCatalogGeneration } from "@/lib/cms/catalog-store";
import { listingBio } from "@/lib/doctor-profile";
import {
  doctors as englishDoctors,
  doctorsForHospital as englishDoctorsForHospital,
  doctorsForTreatment as englishDoctorsForTreatment,
  getDoctor as getEnglishDoctor,
  getHospital as getEnglishHospital,
  hospitals as englishHospitals,
  hospitalsInCity as englishHospitalsInCity,
  treatments as englishTreatments,
} from "@/lib/server-catalog";
import { contentStorage } from "@/lib/storage";
import { TtlLru } from "@/lib/ttl-lru";
import type { Doctor } from "@/lib/doctors";
import type { Hospital } from "@/lib/hospitals";
import type { Treatment } from "@/lib/treatments";
import type { AppLocale } from "@/lib/i18n/languages";

function materialize<T extends { slug: string }>(rows: T[]): T[] {
  return rows.filter(() => true);
}

function hasText(value: unknown) {
  return typeof value === "string" && value.trim().length > 0;
}

/**
 * Having the text is necessary but no longer sufficient: a translation is only
 * live once someone has explicitly marked it published. Drafts and records
 * awaiting native-speaker review stay out of the locale catalog entirely, which
 * is what makes their pages 404 rather than serve unreviewed copy.
 */
function doctorPatchIsPublished(patch: Record<string, unknown> | undefined) {
  return Boolean(
    patch &&
      translationStatus(patch) === "published" &&
      hasText(patch.name) &&
      hasText(patch.title) &&
      hasText(patch.bio),
  );
}

function hospitalPatchIsPublished(patch: Record<string, unknown> | undefined) {
  return Boolean(
    patch &&
      translationStatus(patch) === "published" &&
      (hasText(patch.bio) || hasText(patch.summary)),
  );
}

function treatmentPatchIsPublished(patch: Record<string, unknown> | undefined) {
  return Boolean(
    patch &&
      translationStatus(patch) === "published" &&
      hasText(patch.summary) &&
      hasText(patch.notes) &&
      hasText(patch.stay) &&
      Array.isArray(patch.includes) &&
      patch.includes.length > 0,
  );
}

/**
 * Fields a directory, search, or collection card actually renders. Long-form
 * profile fields (full biography, specializations, affiliations, memberships,
 * awards, research, and education past the three lines on the card) are not
 * copied onto list rows.
 */
const LIST_DOCTOR_KEYS = [
  "image",
  "imageAlt",
  "name",
  "title",
  "qualifications",
  "experience",
  "languages",
] as const;

const EMPTY_TEXT: string[] = Object.freeze([]) as unknown as string[];

/**
 * Full Arabic profiles are inflated one slug at a time from the packed
 * catalogue bytes. 32 entries is enough for a profile page plus the
 * colleagues and hreflang lookups around it, and the cap is what stops a
 * sweep of every doctor from retaining every biography.
 */
export const DOCTOR_PROFILE_CACHE_MAX = 32;
const DOCTOR_PROFILE_CACHE_TTL_MS = 5 * 60 * 1000;

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

/**
 * JSON.parse hands back strings sliced from the source. A listing excerpt
 * sliced again from a biography keeps the whole biography alive, and any
 * leftover slice keeps the whole catalogue string. Copying through UTF-8
 * gives the index its own characters so the source can be collected.
 */
function ownString(value: string): string {
  return textDecoder.decode(textEncoder.encode(value));
}

function ownUnknown<T>(value: T): T {
  if (typeof value === "string") return ownString(value) as T;
  if (Array.isArray(value)) return value.map((item) => ownUnknown(item)) as T;
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [key, item] of Object.entries(value)) out[key] = ownUnknown(item);
    return out as T;
  }
  return value;
}

type PublicSlice = {
  token: string;
  hospitalOverrides: Record<string, HospitalPatch>;
  hospitalsAdded: CatalogCms["hospitalsAdded"];
  hospitalsDeleted: string[];
  treatmentOverrides: Record<string, TreatmentPatch>;
  treatmentsAdded: CatalogCms["treatmentsAdded"];
  treatmentsDeleted: string[];
  radiationProcedurePageOverrides: CatalogCms["radiationProcedurePageOverrides"];
};

/**
 * Character spans into the uncompressed catalogue. The bytes themselves are
 * not kept: a profile reads them again and parses only its own span, so a
 * directory sweep never inflates every biography and the index does not pin
 * an 8 MiB copy next to the list rows.
 */
type DoctorSpans = {
  token: string;
  spans: Map<string, [number, number]>;
};

const slices = new Map<AppLocale, PublicSlice>();
const doctorLists = new Map<AppLocale, { token: string; rows: Doctor[] }>();
const hospitalLists = new Map<AppLocale, { token: string; rows: Hospital[] }>();
const doctorSpans = new Map<AppLocale, DoctorSpans>();
const profileCache = new TtlLru<Doctor>(DOCTOR_PROFILE_CACHE_MAX, DOCTOR_PROFILE_CACHE_TTL_MS);
let loadingLocale: AppLocale | undefined;

function editionToken(locale: AppLocale) {
  const storage = contentStorage();
  return `${getCatalogGeneration()}\0${storage.kind}\0${storage.version(catalogCmsKey(locale)) ?? ""}`;
}

function parseCatalogBytes(bytes: Uint8Array): Partial<CatalogCms> {
  try {
    const data = JSON.parse(textDecoder.decode(bytes)) as unknown;
    if (!data || typeof data !== "object" || Array.isArray(data)) return {};
    return data as Partial<CatalogCms>;
  } catch {
    return {};
  }
}

function skipWhitespace(bytes: Uint8Array, index: number) {
  while (index < bytes.length && bytes[index]! <= 32) index += 1;
  return index;
}

/** `index` points at the opening quote. Returns the index just past the string. */
function jsonStringEnd(bytes: Uint8Array, index: number) {
  let cursor = index + 1;
  while (cursor < bytes.length) {
    if (bytes[cursor] === 0x5c) {
      cursor += 2;
      continue;
    }
    if (bytes[cursor] === 0x22) return cursor + 1;
    cursor += 1;
  }
  return bytes.length;
}

function jsonString(bytes: Uint8Array, index: number) {
  const end = jsonStringEnd(bytes, index);
  return { end, value: JSON.parse(textDecoder.decode(bytes.subarray(index, end))) as string };
}

/** `index` points at the first byte of a JSON value. */
function jsonValueEnd(bytes: Uint8Array, index: number) {
  index = skipWhitespace(bytes, index);
  const open = bytes[index];
  if (open === 0x22) return jsonStringEnd(bytes, index);
  if (open === 0x7b || open === 0x5b) {
    const close = open === 0x7b ? 0x7d : 0x5d;
    let depth = 0;
    let cursor = index;
    while (cursor < bytes.length) {
      const byte = bytes[cursor]!;
      if (byte === 0x22) {
        cursor = jsonStringEnd(bytes, cursor);
        continue;
      }
      if (byte === open) depth += 1;
      else if (byte === close) {
        depth -= 1;
        if (depth === 0) return cursor + 1;
      }
      cursor += 1;
    }
    return bytes.length;
  }
  let cursor = index;
  while (
    cursor < bytes.length &&
    bytes[cursor]! > 32 &&
    bytes[cursor] !== 0x2c &&
    bytes[cursor] !== 0x7d &&
    bytes[cursor] !== 0x5d
  ) {
    cursor += 1;
  }
  return cursor;
}

/**
 * Byte spans of `doctorOverrides` values and of `doctorsAdded` elements, so a
 * profile can parse one object without inflating every biography. An added
 * doctor does not replace an override for the same slug.
 */
function doctorOverrideSpans(bytes: Uint8Array): Map<string, [number, number]> {
  const spans = new Map<string, [number, number]>();
  let index = skipWhitespace(bytes, 0);
  if (bytes[index] !== 0x7b) return spans;
  index += 1;
  while (index < bytes.length) {
    index = skipWhitespace(bytes, index);
    if (bytes[index] === 0x7d) break;
    if (bytes[index] === 0x2c) {
      index += 1;
      continue;
    }
    if (bytes[index] !== 0x22) break;
    const key = jsonString(bytes, index);
    index = skipWhitespace(bytes, key.end);
    if (bytes[index] !== 0x3a) break;
    index = skipWhitespace(bytes, index + 1);
    const start = index;
    const end = jsonValueEnd(bytes, index);
    if (key.value === "doctorOverrides" && bytes[start] === 0x7b) collectOverrideObjects(bytes, start, spans);
    else if (key.value === "doctorsAdded" && bytes[start] === 0x5b) collectAddedDoctors(bytes, start, spans);
    index = end;
  }
  return spans;
}

function collectOverrideObjects(bytes: Uint8Array, openBrace: number, spans: Map<string, [number, number]>) {
  let index = openBrace + 1;
  while (index < bytes.length) {
    index = skipWhitespace(bytes, index);
    if (bytes[index] === 0x7d) return;
    if (bytes[index] === 0x2c) {
      index += 1;
      continue;
    }
    if (bytes[index] !== 0x22) return;
    const key = jsonString(bytes, index);
    index = skipWhitespace(bytes, key.end);
    if (bytes[index] !== 0x3a) return;
    index = skipWhitespace(bytes, index + 1);
    const start = index;
    const end = jsonValueEnd(bytes, index);
    spans.set(key.value, [start, end]);
    index = end;
  }
}

function collectAddedDoctors(bytes: Uint8Array, openBracket: number, spans: Map<string, [number, number]>) {
  let index = openBracket + 1;
  while (index < bytes.length) {
    index = skipWhitespace(bytes, index);
    if (bytes[index] === 0x5d) return;
    if (bytes[index] === 0x2c) {
      index += 1;
      continue;
    }
    const start = index;
    const end = jsonValueEnd(bytes, index);
    if (bytes[start] === 0x7b) {
      try {
        const record = JSON.parse(textDecoder.decode(bytes.subarray(start, end))) as { slug?: unknown };
        if (typeof record.slug === "string" && !spans.has(record.slug)) spans.set(record.slug, [start, end]);
      } catch {
        // One bad added record does not hide the override map.
      }
    }
    index = end;
  }
}

function mapHospitalOverrides(map: Record<string, HospitalPatch> | undefined) {
  const next: Record<string, HospitalPatch> = {};
  for (const [slug, patch] of Object.entries(map || {})) next[slug] = ownUnknown(pickHospitalPatch(patch));
  return next;
}

function mapTreatmentOverrides(map: Record<string, TreatmentPatch> | undefined) {
  const next: Record<string, TreatmentPatch> = {};
  for (const [slug, patch] of Object.entries(map || {})) next[slug] = ownUnknown(pickTreatmentPatch(patch));
  return next;
}

function listingEducation(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((line): line is string => typeof line === "string" && Boolean(line)).slice(0, 3);
}

function textList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
}

function slimDoctor(base: Doctor, patch: Record<string, unknown>, campusName: Map<string, string>): Doctor {
  const overlay = pickOverlay(patch, LIST_DOCTOR_KEYS);
  for (const key of LIST_DOCTOR_KEYS) {
    if (typeof overlay[key] === "string") overlay[key] = ownString(overlay[key]);
  }
  const row: Doctor = {
    ...base,
    ...overlay,
    slug: base.slug,
    specializations: EMPTY_TEXT,
    affiliations: EMPTY_TEXT,
    memberships: EMPTY_TEXT,
    awards: EMPTY_TEXT,
    research: EMPTY_TEXT,
  };
  const bio = typeof patch.bio === "string" ? patch.bio : base.bio;
  row.bio = ownString(listingBio({ bio } as Doctor));
  row.education = (Object.prototype.hasOwnProperty.call(patch, "education")
    ? listingEducation(patch.education)
    : listingEducation(base.education)
  ).map(ownString);
  if (Object.prototype.hasOwnProperty.call(patch, "proceduresExpertise")) {
    row.proceduresExpertise = textList(patch.proceduresExpertise).map(ownString);
  }
  const hospitalName = campusName.get(row.hospitalSlug);
  if (hospitalName && hospitalName !== row.hospitalName) row.hospitalName = ownString(hospitalName);
  return row;
}

function buildSlimDoctors(data: Partial<CatalogCms>, campusName: Map<string, string>): Doctor[] {
  const overrides = data.doctorOverrides ?? {};
  const gone = new Set(data.doctorsDeleted ?? []);
  const rows: Doctor[] = [];
  for (const row of materialize(englishDoctors)) {
    if (gone.has(row.slug)) continue;
    const patch = overrides[row.slug] as Record<string, unknown> | undefined;
    if (!doctorPatchIsPublished(patch)) continue;
    rows.push(slimDoctor(row, patch as Record<string, unknown>, campusName));
  }
  for (const extra of (data.doctorsAdded ?? []) as Doctor[]) {
    if (gone.has(extra.slug) || rows.some((row) => row.slug === extra.slug)) continue;
    if (!doctorPatchIsPublished(extra as unknown as Record<string, unknown>)) continue;
    const patch = (overrides[extra.slug] as Record<string, unknown> | undefined) ?? (extra as unknown as Record<string, unknown>);
    rows.push(slimDoctor(extra, patch, campusName));
  }
  return rows;
}

function sliceFrom(token: string, data: Partial<CatalogCms>, hospitalOverrides: Record<string, HospitalPatch>): PublicSlice {
  return {
    token,
    hospitalOverrides,
    hospitalsAdded: ownUnknown(data.hospitalsAdded ?? []),
    hospitalsDeleted: ownUnknown(data.hospitalsDeleted ?? []),
    treatmentOverrides: mapTreatmentOverrides(data.treatmentOverrides),
    treatmentsAdded: ownUnknown(data.treatmentsAdded ?? []),
    treatmentsDeleted: ownUnknown(data.treatmentsDeleted ?? []),
    radiationProcedurePageOverrides: ownUnknown(data.radiationProcedurePageOverrides ?? {}),
  };
}

/**
 * One parse of the locale catalogue. The parsed `doctorOverrides` object is
 * not stored: list rows keep only the fields collection pages render, and a
 * profile request parses the file again for that single slug.
 */
function ensureEdition(locale: AppLocale) {
  const token = editionToken(locale);
  if (
    doctorLists.get(locale)?.token === token &&
    hospitalLists.get(locale)?.token === token &&
    slices.get(locale)?.token === token &&
    doctorSpans.get(locale)?.token === token
  ) {
    return;
  }
  if (loadingLocale === locale) {
    throw new Error(`locale catalog re-entered for ${locale}`);
  }
  loadingLocale = locale;
  try {
    const bytes = contentStorage().readBytes(catalogCmsKey(locale));
    const data = bytes ? parseCatalogBytes(bytes) : {};
    const hospitalOverrides = mapHospitalOverrides(data.hospitalOverrides);
    const hospitals = buildHospitalsFrom(hospitalOverrides, data);
    const campusName = new Map(hospitals.map((hospital) => [hospital.slug, hospital.name]));
    const doctors = buildSlimDoctors(data, campusName);
    slices.set(locale, sliceFrom(token, data, hospitalOverrides));
    hospitalLists.set(locale, { token, rows: hospitals });
    doctorLists.set(locale, { token, rows: doctors });
    let spans = new Map<string, [number, number]>();
    if (bytes) {
      try {
        spans = doctorOverrideSpans(bytes);
      } catch {
        spans = new Map();
      }
    }
    doctorSpans.set(locale, { token, spans });
  } finally {
    loadingLocale = undefined;
  }
}

function buildHospitalsFrom(
  hospitalOverrides: Record<string, HospitalPatch>,
  data: Partial<CatalogCms>,
): Hospital[] {
  const base = materialize(englishHospitals);
  const authored = base.filter((row) =>
    hospitalPatchIsPublished(hospitalOverrides[row.slug] as Record<string, unknown> | undefined),
  );
  return applyCatalogLayer(
    authored,
    data.hospitalsDeleted ?? [],
    hospitalOverrides,
    ((data.hospitalsAdded ?? []) as Hospital[]).filter((row) =>
      hospitalPatchIsPublished(row as unknown as Record<string, unknown>),
    ),
    HOSPITAL_OVERLAY_KEYS,
  );
}

function withCampusName(doctor: Doctor, locale: AppLocale): Doctor {
  const name = hospitalsForLocale(locale).find((hospital) => hospital.slug === doctor.hospitalSlug)?.name;
  if (!name || name === doctor.hospitalName) return doctor;
  return { ...doctor, hospitalName: name };
}

function inflateDoctor(locale: AppLocale, slug: string): Doctor | undefined {
  const key = `${editionToken(locale)}\0${slug}`;
  const hit = profileCache.get(key);
  if (hit) return hit;
  const packed = doctorSpans.get(locale);
  const span = packed?.spans.get(slug);
  if (!packed || !span) return undefined;
  let patch: Record<string, unknown>;
  try {
    const bytes = contentStorage().readBytes(catalogCmsKey(locale));
    if (!bytes) return undefined;
    const parsed = JSON.parse(textDecoder.decode(bytes.subarray(span[0], span[1]))) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return undefined;
    patch = parsed as Record<string, unknown>;
  } catch {
    return undefined;
  }
  if (!doctorPatchIsPublished(patch)) return undefined;
  const english = getEnglishDoctor(slug);
  // An override has no slug of its own. An added doctor is the whole record
  // and becomes the base row when English has nothing to overlay.
  const added = english ? [] : [{ ...(patch as unknown as Doctor), slug }];
  const layered = applyCatalogLayer(
    english ? [english] : [],
    [],
    { [slug]: patch },
    added,
    DOCTOR_OVERLAY_KEYS,
  );
  const doctor = layered.find((row) => row.slug === slug);
  if (!doctor) return undefined;
  return profileCache.set(key, detachDoctor(withCampusName(doctor, locale)));
}

/** Profile strings must not keep the catalogue bytes alive through a slice. */
function detachDoctor(doctor: Doctor): Doctor {
  const next: Doctor = { ...doctor };
  for (const key of DOCTOR_OVERLAY_KEYS) {
    const value = next[key] as unknown;
    if (typeof value === "string") {
      (next as unknown as Record<string, unknown>)[key] = ownString(value);
    } else if (Array.isArray(value)) {
      (next as unknown as Record<string, unknown>)[key] = value.map((item) =>
        typeof item === "string" ? ownString(item) : item,
      );
    }
  }
  if (next.hospitalName) next.hospitalName = ownString(next.hospitalName);
  return next;
}

export function doctorsForLocale(locale: AppLocale): Doctor[] {
  const base = materialize(englishDoctors);
  if (locale === "en") return base;
  ensureEdition(locale);
  return doctorLists.get(locale)?.rows ?? [];
}

export function getDoctorForLocale(slug: string, locale: AppLocale) {
  if (locale === "en") return getEnglishDoctor(slug);
  // Unpublished and draft slugs are absent from the index, so a direct
  // profile URL 404s without parsing the rest of the catalogue.
  if (!doctorsForLocale(locale).some((row) => row.slug === slug)) return undefined;
  return inflateDoctor(locale, slug);
}

export function doctorsForHospitalLocale(hospitalSlug: string, locale: AppLocale) {
  if (locale === "en") return englishDoctorsForHospital(hospitalSlug);
  return doctorsForLocale(locale).filter((row) => row.hospitalSlug === hospitalSlug);
}

export function doctorsForTreatmentLocale(procedureSlug: string, locale: AppLocale) {
  if (locale === "en") return englishDoctorsForTreatment(procedureSlug);
  return doctorsForLocale(locale).filter(
    (row) => row.procedureSlugs.includes(procedureSlug) || row.treatmentSlugs.includes(procedureSlug),
  );
}

export function hospitalsForLocale(locale: AppLocale): Hospital[] {
  const base = materialize(englishHospitals);
  if (locale === "en") return base;
  ensureEdition(locale);
  return hospitalLists.get(locale)?.rows ?? [];
}

export function getHospitalForLocale(slug: string, locale: AppLocale) {
  if (locale === "en") return getEnglishHospital(slug);
  return hospitalsForLocale(locale).find((row) => row.slug === slug);
}

export function hospitalsInCityLocale(citySlug: string, locale: AppLocale) {
  if (locale === "en") return englishHospitalsInCity(citySlug);
  return hospitalsForLocale(locale).filter((row) => row.citySlug === citySlug);
}

export function treatmentsForLocale(locale: AppLocale): Treatment[] {
  const base = materialize(englishTreatments);
  if (locale === "en") return base;
  ensureEdition(locale);
  const slice = slices.get(locale);
  if (!slice) return [];
  const authored = base.filter((row) =>
    treatmentPatchIsPublished(slice.treatmentOverrides[row.slug] as Record<string, unknown> | undefined),
  );
  return applyCatalogLayer(
    authored,
    slice.treatmentsDeleted,
    slice.treatmentOverrides,
    (slice.treatmentsAdded as Treatment[]).filter((row) =>
      treatmentPatchIsPublished(row as unknown as Record<string, unknown>),
    ),
    TREATMENT_OVERLAY_KEYS,
  );
}

export function getTreatmentForLocale(slug: string, locale: AppLocale) {
  return treatmentsForLocale(locale).find((row) => row.slug === slug);
}

/** Arabic radiation-procedure editorial, without retaining doctor overrides. */
export function arabicRadiationProcedureOverride(slug: string): RadiationProcedurePagePatch | undefined {
  ensureEdition("ar");
  return slices.get("ar")?.radiationProcedurePageOverrides?.[slug];
}

/** Test hook. Drops the public index and profile LRU; CMS generation is unchanged. */
export function clearLocaleCatalogCache() {
  slices.clear();
  doctorLists.clear();
  hospitalLists.clear();
  doctorSpans.clear();
  profileCache.clear();
}

export function doctorProfileCacheSize() {
  return profileCache.size;
}

/** Test hook: list-index shape, to prove the full override map was not retained. */
export function inspectLocaleDoctorIndex(locale: AppLocale) {
  const rows = doctorsForLocale(locale);
  let bioChars = 0;
  let longFormEntries = 0;
  for (const row of rows) {
    bioChars += row.bio.length;
    longFormEntries +=
      row.research.length +
      row.awards.length +
      row.affiliations.length +
      row.memberships.length +
      row.specializations.length;
  }
  const slice = slices.get(locale);
  return {
    doctors: rows.length,
    bioChars,
    longFormEntries,
    retainsDoctorOverrides: Boolean(slice && "doctorOverrides" in (slice as object)),
    profileCacheSize: profileCache.size,
    profileCacheMax: DOCTOR_PROFILE_CACHE_MAX,
  };
}
