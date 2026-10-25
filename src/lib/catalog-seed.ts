import { contentStorage } from "@/lib/storage";

/**
 * The static doctor and hospital catalog (`src/data/ginger-catalog.json`)
 * is read through content storage at runtime instead of being imported into
 * the server bundle. Bundled, webpack kept the 4.6 MB literal in the script
 * source twice (server-components and SSR layers) plus a parsed copy alive
 * for the life of the process; on Workers that was ~17 MiB of a 128 MiB
 * isolate (docs/cloudflare-stage-3.md §4). Read once and dropped after the
 * derived arrays are built, it costs only the arrays themselves.
 *
 * On Hostinger the file-system backend reads the file from the checkout,
 * next to `content/`. On Workers it ships as a Worker asset and is loaded
 * by the R2 backend during hydration, so it is part of the deploy and never
 * depends on a seeded bucket. A missing or malformed file throws; there is
 * no empty catalog.
 */
export const CATALOG_SEED_KEY = "src/data/ginger-catalog.json";

/** The file's shape, taken from the file itself; type-only, so nothing is bundled. */
export type CatalogSeed = typeof import("@/data/ginger-catalog.json");
export type DoctorSeed = CatalogSeed["doctors"][number];
export type HospitalSeed = CatalogSeed["hospitals"][number];

export class CatalogUnavailableError extends Error {
  constructor(message: string, options?: { cause?: unknown }) {
    super(`catalog: ${CATALOG_SEED_KEY} ${message}`, options);
    this.name = "CatalogUnavailableError";
  }
}

let scoped: CatalogSeed | undefined;
let depth = 0;

/**
 * Run `build` with the parsed seed. The parsed object is shared with nested
 * calls (building the doctors needs the hospitals, which are built from the
 * same seed) and released when the outermost call returns, so the 8 MB
 * object graph lives only while the derived arrays are being built.
 */
export function withCatalogSeed<T>(build: (seed: CatalogSeed) => T): T {
  depth += 1;
  try {
    scoped ??= readCatalogSeed();
    return build(scoped);
  } finally {
    depth -= 1;
    if (depth === 0) scoped = undefined;
  }
}

function readCatalogSeed(): CatalogSeed {
  let raw: string | null;
  try {
    raw = contentStorage().read(CATALOG_SEED_KEY);
  } catch (error) {
    throw new CatalogUnavailableError(
      `could not be read: ${error instanceof Error ? error.message : String(error)}`,
      { cause: error },
    );
  }
  if (raw === null) throw new CatalogUnavailableError("is missing from content storage");
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    throw new CatalogUnavailableError("is not valid JSON", { cause: error });
  }
  if (!isCatalogSeed(parsed)) {
    throw new CatalogUnavailableError("does not have the expected `doctors` and `hospitals` arrays");
  }
  return parsed;
}

function isCatalogSeed(value: unknown): value is CatalogSeed {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as { doctors?: unknown; hospitals?: unknown };
  return (
    Array.isArray(candidate.doctors) &&
    candidate.doctors.length > 0 &&
    Array.isArray(candidate.hospitals) &&
    candidate.hospitals.length > 0
  );
}
