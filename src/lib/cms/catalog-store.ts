import "server-only";
import type { CmsEdition } from "@/lib/cms/edition";
import { arrayView } from "@/lib/array-view";
import { contentStorage, onContentReplaced } from "@/lib/storage";
import {
  emptyCatalogCms,
  pickDoctorPatch,
  pickHospitalPatch,
  pickTreatmentPatch,
  pickOverlay,
  PSEO_LOCKED_KEYS,
  type CatalogCms,
  type DoctorPatch,
  type HospitalPatch,
  type TreatmentPatch,
} from "@/lib/cms/catalog-types";

/** Storage key of an edition's catalog overlay store. */
export function catalogCmsKey(edition: CmsEdition = "en") {
  return edition === "en" ? "content/catalog-cms.json" : `content/${edition}/catalog-cms.json`;
}

function mapHospitalOverrides(map: Record<string, HospitalPatch> | undefined) {
  const next: Record<string, HospitalPatch> = {};
  for (const [slug, patch] of Object.entries(map || {})) {
    next[slug] = pickHospitalPatch(patch);
  }
  return next;
}

function mapDoctorOverrides(map: Record<string, DoctorPatch> | undefined) {
  const next: Record<string, DoctorPatch> = {};
  for (const [slug, patch] of Object.entries(map || {})) {
    next[slug] = pickDoctorPatch(patch);
  }
  return next;
}

function mapTreatmentOverrides(map: Record<string, TreatmentPatch> | undefined) {
  const next: Record<string, TreatmentPatch> = {};
  for (const [slug, patch] of Object.entries(map || {})) {
    next[slug] = pickTreatmentPatch(patch);
  }
  return next;
}

const cmsCache = new Map<CmsEdition, { generation: number; data: CatalogCms }>();
let catalogGeneration = 0;

// A backend that re-hydrates a catalog overlay written elsewhere must drop
// the parsed copy too; on the file-system backend this never fires.
onContentReplaced((key) => {
  if (key.endsWith("/catalog-cms.json")) catalogGeneration += 1;
});

export function getCatalogGeneration() {
  return catalogGeneration;
}

/** Whether the CMS editor cache is holding this edition's full document. */
export function catalogCmsIsCached(edition: CmsEdition) {
  const cached = cmsCache.get(edition);
  return Boolean(cached && cached.generation === catalogGeneration);
}

/**
 * Drop parsed CMS documents. Public catalogue reads do not use this cache;
 * tests use the hook to prove a public read left it empty. Generation is
 * unchanged, so the next CMS read still reloads from storage.
 */
export function clearCatalogCmsCache() {
  cmsCache.clear();
}

export function loadCatalogCms(edition: CmsEdition = "en"): CatalogCms {
  const cached = cmsCache.get(edition);
  if (cached && cached.generation === catalogGeneration) return cached.data;
  try {
    const raw = contentStorage().read(catalogCmsKey(edition));
    if (raw === null) throw new Error(`${catalogCmsKey(edition)} is missing`);
    const data = JSON.parse(raw) as CatalogCms;
    const cms = { ...emptyCatalogCms(), ...data };
    cms.hospitalOverrides = mapHospitalOverrides(cms.hospitalOverrides);
    cms.doctorOverrides = mapDoctorOverrides(cms.doctorOverrides);
    cms.treatmentOverrides = mapTreatmentOverrides(cms.treatmentOverrides);
    cmsCache.set(edition, { generation: catalogGeneration, data: cms });
    return cms;
  } catch {
    const empty = emptyCatalogCms();
    cmsCache.set(edition, { generation: catalogGeneration, data: empty });
    return empty;
  }
}

export function saveCatalogCms(store: CatalogCms, edition: CmsEdition = "en") {
  contentStorage().write(catalogCmsKey(edition), `${JSON.stringify(store, null, 2)}\n`);
  catalogGeneration += 1;
  cmsCache.set(edition, { generation: catalogGeneration, data: store });
  return store;
}

function stripLockedKeys(patch: object): Record<string, unknown> {
  const src = patch as Record<string, unknown>;
  const locked = new Set<string>(PSEO_LOCKED_KEYS);
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(src)) {
    // status is review metadata, never content to merge onto a row.
    if (locked.has(key) || key === "slug" || key === "status") continue;
    if (value === undefined) continue;
    out[key] = value;
  }
  return out;
}

function mergeRow<T extends { slug: string }>(
  row: T,
  patch: object | undefined,
  allowedKeys?: readonly string[],
): T {
  if (!patch) return row;
  const overlay = allowedKeys ? pickOverlay(patch, allowedKeys) : stripLockedKeys(patch);
  return { ...row, ...overlay, slug: row.slug };
}

export function applyCatalogLayer<T extends { slug: string }>(
  list: T[],
  deleted: string[],
  overrides: Record<string, object>,
  added: T[],
  allowedKeys?: readonly string[],
): T[] {
  const gone = new Set(deleted);
  const merged = list
    .filter((row) => !gone.has(row.slug))
    .map((row) => mergeRow(row, overrides[row.slug], allowedKeys));
  for (const extra of added) {
    if (gone.has(extra.slug)) continue;
    if (merged.some((row) => row.slug === extra.slug)) continue;
    merged.push(mergeRow(extra, overrides[extra.slug], allowedKeys));
  }
  return merged;
}

export function liveArray<T extends { slug: string }>(base: T[], apply: (rows: T[]) => T[]): T[] {
  let memo: { generation: number; rows: T[] } | undefined;
  return arrayView(() => {
    if (memo && memo.generation === catalogGeneration) return memo.rows;
    const next = apply(base);
    memo = { generation: catalogGeneration, rows: next };
    return next;
  });
}
