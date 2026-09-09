import { mkdirSync, readFileSync, renameSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import "server-only";
import { emptyCatalogCms, type CatalogCms } from "@/lib/cms/catalog-types";

const FILE = join(process.cwd(), "content/catalog-cms.json");

export function loadCatalogCms(): CatalogCms {
  try {
    const data = JSON.parse(readFileSync(FILE, "utf8")) as CatalogCms;
    return { ...emptyCatalogCms(), ...data };
  } catch {
    return emptyCatalogCms();
  }
}

export function saveCatalogCms(store: CatalogCms) {
  mkdirSync(dirname(FILE), { recursive: true });
  const tmp = `${FILE}.tmp`;
  writeFileSync(tmp, `${JSON.stringify(store, null, 2)}\n`);
  renameSync(tmp, FILE);
  return store;
}

export function applyCatalogLayer<T extends { slug: string }>(
  list: T[],
  deleted: string[],
  overrides: Record<string, object>,
  added: T[],
): T[] {
  const gone = new Set(deleted);
  const merged = list
    .filter((row) => !gone.has(row.slug))
    .map((row) => {
      const patch = overrides[row.slug];
      return patch ? { ...row, ...patch } : row;
    });
  for (const extra of added) {
    if (gone.has(extra.slug)) continue;
    if (merged.some((row) => row.slug === extra.slug)) continue;
    const patch = overrides[extra.slug];
    merged.push(patch ? { ...extra, ...patch } : extra);
  }
  return merged;
}

export function liveArray<T extends { slug: string }>(base: T[], apply: (rows: T[]) => T[]): T[] {
  return new Proxy([] as T[], {
    get(_target, prop) {
      const rows = apply(base);
      const value = Reflect.get(rows, prop, rows);
      if (typeof value === "function") return (value as (...args: unknown[]) => unknown).bind(rows);
      return value;
    },
    ownKeys() {
      return Reflect.ownKeys(apply(base));
    },
    getOwnPropertyDescriptor(_target, prop) {
      return Object.getOwnPropertyDescriptor(apply(base), prop);
    },
  });
}
