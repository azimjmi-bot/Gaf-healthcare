import "server-only";
import {
  pickTreatmentPatch,
  translationStatus,
  type CatalogCms,
  type RadiationProcedurePagePatch,
  type TreatmentPatch,
} from "@/lib/cms/catalog-types";
import { catalogCmsKey, getCatalogGeneration } from "@/lib/cms/catalog-store";
import type { AppLocale } from "@/lib/i18n/languages";
import { contentStorage } from "@/lib/storage";

export type TreatmentSlice = {
  token: string;
  treatmentOverrides: Record<string, TreatmentPatch>;
  treatmentsAdded: CatalogCms["treatmentsAdded"];
  treatmentsDeleted: string[];
  radiationProcedurePageOverrides: CatalogCms["radiationProcedurePageOverrides"];
};

const slices = new Map<AppLocale, TreatmentSlice>();
const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

function hasText(value: unknown) {
  return typeof value === "string" && value.trim().length > 0;
}

export function treatmentPatchIsPublished(patch: Record<string, unknown> | undefined) {
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

function skipWhitespace(bytes: Uint8Array, index: number) {
  while (index < bytes.length && bytes[index]! <= 32) index += 1;
  return index;
}

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

function mapTreatmentOverrides(map: Record<string, TreatmentPatch> | undefined) {
  const next: Record<string, TreatmentPatch> = {};
  for (const [slug, patch] of Object.entries(map || {})) next[slug] = ownUnknown(pickTreatmentPatch(patch));
  return next;
}

const SLICE_KEYS = new Set([
  "treatmentOverrides",
  "treatmentsAdded",
  "treatmentsDeleted",
  "radiationProcedurePageOverrides",
]);

/**
 * Extract only the treatment and radiation-procedure slices from a locale
 * catalogue without JSON-parsing `doctorOverrides` (~95% of `ar/catalog-cms.json`).
 */
export function parseTreatmentSliceBytes(bytes: Uint8Array): Partial<CatalogCms> {
  const out: Partial<CatalogCms> = {};
  let index = skipWhitespace(bytes, 0);
  if (bytes[index] !== 0x7b) return out;
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
    if (SLICE_KEYS.has(key.value)) {
      try {
        (out as Record<string, unknown>)[key.value] = JSON.parse(
          textDecoder.decode(bytes.subarray(start, end)),
        );
      } catch {
        // Malformed slice section falls back to empty defaults below.
      }
    }
    index = end;
  }
  return out;
}

function sliceToken(locale: AppLocale) {
  const storage = contentStorage();
  return `${getCatalogGeneration()}\0${storage.kind}\0${storage.version(catalogCmsKey(locale)) ?? ""}`;
}

export function localeTreatmentSlice(locale: AppLocale): TreatmentSlice {
  const token = sliceToken(locale);
  const existing = slices.get(locale);
  if (existing && existing.token === token) return existing;

  const bytes = contentStorage().readBytes(catalogCmsKey(locale));
  const data = bytes ? parseTreatmentSliceBytes(bytes) : {};
  const slice: TreatmentSlice = {
    token,
    treatmentOverrides: mapTreatmentOverrides(data.treatmentOverrides),
    treatmentsAdded: ownUnknown(data.treatmentsAdded ?? []),
    treatmentsDeleted: ownUnknown(data.treatmentsDeleted ?? []),
    radiationProcedurePageOverrides: ownUnknown(data.radiationProcedurePageOverrides ?? {}),
  };
  slices.set(locale, slice);
  return slice;
}

export function localeRadiationProcedureOverride(
  locale: AppLocale,
  slug: string,
): RadiationProcedurePagePatch | undefined {
  return localeTreatmentSlice(locale).radiationProcedurePageOverrides?.[slug];
}

export function clearLocaleTreatmentSliceCache() {
  slices.clear();
}
