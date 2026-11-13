/**
 * Singular WordPress section URLs (`/doctor|/hospital|/blog/:slug`) that still
 * have a live successor. Used by `src/proxy.ts` so unknown slugs can answer
 * 410 without a bounce through the plural route.
 *
 * Doctor and hospital membership comes from the catalog seed slug set (built
 * once per isolate — not a full Doctor/Hospital hydration per request). Blog
 * membership uses the published CMS article lookup. Proxy cannot import
 * `server-only` modules, so CMS catalog overlays are not applied here.
 */
import { CatalogUnavailableError, withCatalogSeed } from "@/lib/catalog-seed";
import { getPublishedBySlug } from "@/lib/cms/store";

export type LegacyEntityDecision =
  | { kind: "redirect"; destination: string }
  | { kind: "gone" }
  | null;

let doctorSlugs: Set<string> | undefined;
let hospitalSlugs: Set<string> | undefined;

function loadDoctorSlugs(): Set<string> {
  doctorSlugs ??= withCatalogSeed((seed) => new Set(seed.doctors.map((row) => row.slug)));
  return doctorSlugs;
}

function loadHospitalSlugs(): Set<string> {
  hospitalSlugs ??= withCatalogSeed((seed) => new Set(seed.hospitals.map((row) => row.slug)));
  return hospitalSlugs;
}

function catalogHasSlug(load: () => Set<string>, slug: string): boolean | null {
  try {
    return load().has(slug);
  } catch (error) {
    if (error instanceof CatalogUnavailableError) {
      doctorSlugs = undefined;
      hospitalSlugs = undefined;
      return null;
    }
    throw error;
  }
}

/**
 * Resolve a single-segment singular legacy path. Returns null when the path
 * is not a singular entity URL this helper owns.
 *
 * When the catalog seed cannot be read, doctor/hospital paths fall back to a
 * same-slug redirect so a transient storage miss does not 410 a real profile.
 */
export function resolveLegacyEntityPath(pathname: string): LegacyEntityDecision {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length !== 2) return null;
  const [section, slug] = parts;
  if (!section || !slug) return null;

  if (section === "doctor") {
    const found = catalogHasSlug(loadDoctorSlugs, slug);
    if (found === false) return { kind: "gone" };
    return { kind: "redirect", destination: `/doctors/${slug}` };
  }

  if (section === "hospital") {
    const found = catalogHasSlug(loadHospitalSlugs, slug);
    if (found === false) return { kind: "gone" };
    return { kind: "redirect", destination: `/hospitals/${slug}` };
  }

  if (section === "blog") {
    if (getPublishedBySlug(slug, "en")) {
      return { kind: "redirect", destination: `/blogs/${slug}` };
    }
    return { kind: "gone" };
  }

  return null;
}
