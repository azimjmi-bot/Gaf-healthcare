import { mkdirSync, readFileSync, renameSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import "server-only";
import type { CmsEdition } from "@/lib/cms/edition";
import {
  emptyCatalogCms,
  pickDoctorPatch,
  pickHospitalPatch,
  pickOverlay,
  PSEO_LOCKED_KEYS,
  type CatalogCms,
  type DoctorPatch,
  type HospitalPatch,
} from "@/lib/cms/catalog-types";

function catalogFile(edition: CmsEdition = "en") {
  return edition === "ar"
    ? join(process.cwd(), "content/ar/catalog-cms.json")
    : join(process.cwd(), "content/catalog-cms.json");
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

const cmsCache = new Map<CmsEdition, { at: number; data: CatalogCms }>();
let catalogGeneration = 0;

export function loadCatalogCms(edition: CmsEdition = "en"): CatalogCms {
  const now = Date.now();
  const cached = cmsCache.get(edition);
  if (cached && now - cached.at < 1000) return cached.data;
  try {
    const data = JSON.parse(readFileSync(catalogFile(edition), "utf8")) as CatalogCms;
    const cms = { ...emptyCatalogCms(), ...data };
    cms.hospitalOverrides = mapHospitalOverrides(cms.hospitalOverrides);
    cms.doctorOverrides = mapDoctorOverrides(cms.doctorOverrides);
    cmsCache.set(edition, { at: now, data: cms });
    return cms;
  } catch {
    const empty = emptyCatalogCms();
    cmsCache.set(edition, { at: now, data: empty });
    return empty;
  }
}

export function saveCatalogCms(store: CatalogCms, edition: CmsEdition = "en") {
  const file = catalogFile(edition);
  mkdirSync(dirname(file), { recursive: true });
  const tmp = `${file}.tmp`;
  writeFileSync(tmp, `${JSON.stringify(store, null, 2)}\n`);
  renameSync(tmp, file);
  cmsCache.set(edition, { at: Date.now(), data: store });
  catalogGeneration += 1;
  return store;
}

function stripLockedKeys(patch: object): Record<string, unknown> {
  const src = patch as Record<string, unknown>;
  const locked = new Set<string>(PSEO_LOCKED_KEYS);
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(src)) {
    if (locked.has(key) || key === "slug") continue;
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
  const rows = () => {
    if (memo && memo.generation === catalogGeneration) return memo.rows;
    const next = apply(base);
    memo = { generation: catalogGeneration, rows: next };
    return next;
  };
  return new Proxy([] as T[], {
    get(_target, prop) {
      const list = rows();
      const value = Reflect.get(list, prop, list);
      if (typeof value === "function") return (value as (...args: unknown[]) => unknown).bind(list);
      return value;
    },
    ownKeys() {
      return Reflect.ownKeys(rows());
    },
    getOwnPropertyDescriptor(_target, prop) {
      return Object.getOwnPropertyDescriptor(rows(), prop);
    },
  });
}
