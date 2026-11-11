/**
 * Lightweight rows for the bare /costs directory.
 *
 * Display fields come from the same procedure lists and cost maps as
 * `catalogTreatments`. Summary prose, notes, conditions, images and
 * hospital-slug scans stay in `treatments.ts` and are not evaluated here.
 * `src/lib/cost-directory-index.test.ts` locks this projection to the full
 * catalog so the two cannot drift.
 */
import {
  BARIATRIC_COST,
  CARDIAC_SURGERY_COST,
  CARDIOLOGY_COST,
  COSMETIC_COST,
  ENT_COST,
  GASTROENTEROLOGY_COST,
  GYNECOLOGY_CLUSTER_BY_PROCEDURE,
  GYNECOLOGY_COST,
  DENTISTRY_CLUSTER_BY_PROCEDURE,
  DENTISTRY_COST,
  HEMATOLOGY_COST,
  MEDICAL_COST,
  NEPHROLOGY_CLUSTER_BY_PROCEDURE,
  NEPHROLOGY_COST,
  NEPHROLOGY_SHARED,
  NEUROLOGY_CLUSTER_BY_PROCEDURE,
  NEUROLOGY_COST,
  NEUROLOGY_SHARED,
  NEUROSURGERY_CLUSTER_BY_PROCEDURE,
  NEUROSURGERY_COST,
  NEUROSURGERY_SHARED,
  OPHTHALMOLOGY_CLUSTER_BY_PROCEDURE,
  OPHTHALMOLOGY_COST,
  ORTHOPEDICS_CLUSTER_BY_PROCEDURE,
  ORTHOPEDICS_COST,
  PEDIATRIC_CARDIAC_SURGERY_COST,
  PEDIATRIC_HEMATOLOGY_COST,
  PEDIATRIC_ORTHOPAEDIC_COST,
  PULMONOLOGY_COST,
  RADIATION_COST,
  SPINE_SURGERY_COST,
  SURGICAL_COST,
  SURGICAL_GASTROENTEROLOGY_COST,
  UROLOGY_COST,
} from "@/lib/treatment-cost-ranges";
import {
  BARIATRIC_PROCEDURES,
  CARDIAC_SURGERY_PROCEDURES,
  CARDIOLOGY_PROCEDURES,
  COSMETIC_PROCEDURES,
  ENT_PROCEDURES,
  GASTROENTEROLOGY_PROCEDURES,
  GYNECOLOGY_PROCEDURES,
  DENTISTRY_PROCEDURES,
  HEMATOLOGY_PROCEDURES,
  MEDICAL_ONCOLOGY_PROCEDURES,
  NEPHROLOGY_PROCEDURES,
  NEUROLOGY_PROCEDURES,
  NEUROSURGERY_PROCEDURES,
  OPHTHALMOLOGY_PROCEDURES,
  ORTHOPEDICS_PROCEDURES,
  PEDIATRIC_CARDIAC_SURGERY_PROCEDURES,
  PEDIATRIC_HEMATOLOGY_PROCEDURES,
  PEDIATRIC_ORTHOPAEDIC_PROCEDURES,
  PULMONOLOGY_PROCEDURES,
  RADIATION_PROCEDURES,
  SPECIALTIES,
  SPINE_SURGERY_PROCEDURES,
  SURGICAL_GASTROENTEROLOGY_PROCEDURES,
  SURGICAL_ONCOLOGY_PROCEDURES,
  UROLOGY_PROCEDURES,
  getProcedure,
  toSlug,
} from "@/lib/taxonomy";

export type DirectoryCostRow = {
  slug: string;
  name: string;
  category: string;
  specialtySlug: string;
  specialtySlugs: string[];
  procedureSlug: string;
  usRange: string;
  partnerRange: string;
  stay: string;
};

export type DirectoryCostGroup = {
  name: string;
  slug: string;
  items: DirectoryCostRow[];
};

type CostMap = Record<string, { us: string; partner: string; stay: string }>;

function slugsForProcedureName(name: string) {
  const row = getProcedure(name);
  if (!row) throw new Error(`Unmapped procedure ${name}`);
  return row.specialtySlugs;
}

function rowsFrom(
  names: readonly string[],
  costs: CostMap,
  specialtySlug: string,
  category: string | ((name: string) => string),
  label: string,
): DirectoryCostRow[] {
  return names.map((name) => {
    const cost = costs[name];
    if (!cost) throw new Error(`Missing ${label} cost for ${name}`);
    const slug = toSlug(name);
    return {
      slug,
      name,
      category: typeof category === "function" ? category(name) : category,
      specialtySlug,
      specialtySlugs: slugsForProcedureName(name),
      procedureSlug: slug,
      usRange: cost.us,
      partnerRange: cost.partner,
      stay: cost.stay,
    };
  });
}

const medicalOncology = new Set<string>(MEDICAL_ONCOLOGY_PROCEDURES);
const neurosurgeryShared = new Set<string>(NEUROSURGERY_SHARED);
const neurologyShared = new Set<string>(NEUROLOGY_SHARED);
const nephrologyShared = new Set<string>(NEPHROLOGY_SHARED);

function primaryOnly(name: string, specialtySlug: string, exclusive: boolean) {
  const row = getProcedure(name);
  if (row?.specialtySlug !== specialtySlug) return false;
  return exclusive ? row.specialtySlugs.length === 1 : true;
}

export const directoryCostRows: DirectoryCostRow[] = [
  ...rowsFrom(RADIATION_PROCEDURES, RADIATION_COST, "radiation-oncology", "Radiation Oncology", "radiation"),
  ...rowsFrom(SURGICAL_ONCOLOGY_PROCEDURES, SURGICAL_COST, "surgical-oncology", "Surgical Oncology", "surgical"),
  ...rowsFrom(MEDICAL_ONCOLOGY_PROCEDURES, MEDICAL_COST, "medical-oncology", "Medical Oncology", "medical"),
  ...rowsFrom(
    HEMATOLOGY_PROCEDURES.filter((name) => !medicalOncology.has(name)),
    HEMATOLOGY_COST,
    "hematology",
    "Hematology",
    "hematology",
  ),
  ...rowsFrom(
    PEDIATRIC_HEMATOLOGY_PROCEDURES.filter((name) => primaryOnly(name, "pediatric-hematology", true)),
    PEDIATRIC_HEMATOLOGY_COST,
    "pediatric-hematology",
    "Pediatric Hematology",
    "pediatric hematology",
  ),
  ...rowsFrom(CARDIAC_SURGERY_PROCEDURES, CARDIAC_SURGERY_COST, "cardiac-surgery", "Cardiac Surgery", "cardiac surgery"),
  ...rowsFrom(
    PEDIATRIC_CARDIAC_SURGERY_PROCEDURES,
    PEDIATRIC_CARDIAC_SURGERY_COST,
    "pediatric-cardiac-surgery",
    "Pediatric Cardiac Surgery",
    "pediatric cardiac surgery",
  ),
  ...rowsFrom(
    CARDIOLOGY_PROCEDURES.filter((name) => primaryOnly(name, "cardiology", true)),
    CARDIOLOGY_COST,
    "cardiology",
    "Cardiology",
    "cardiology",
  ),
  ...rowsFrom(BARIATRIC_PROCEDURES, BARIATRIC_COST, "bariatric-surgery", "Bariatric Surgery", "bariatric"),
  ...rowsFrom(COSMETIC_PROCEDURES, COSMETIC_COST, "cosmetic-surgery", "Cosmetic Surgery", "cosmetic"),
  ...rowsFrom(
    ENT_PROCEDURES.filter((name) => primaryOnly(name, "ent", false)),
    ENT_COST,
    "ent",
    "ENT",
    "ENT",
  ),
  ...rowsFrom(GASTROENTEROLOGY_PROCEDURES, GASTROENTEROLOGY_COST, "gastroenterology", "Gastroenterology", "gastroenterology"),
  ...rowsFrom(
    SURGICAL_GASTROENTEROLOGY_PROCEDURES.filter((name) => primaryOnly(name, "surgical-gastroenterology", true)),
    SURGICAL_GASTROENTEROLOGY_COST,
    "surgical-gastroenterology",
    "Surgical Gastroenterology",
    "surgical gastroenterology",
  ),
  ...rowsFrom(
    UROLOGY_PROCEDURES.filter((name) => primaryOnly(name, "urology", false)),
    UROLOGY_COST,
    "urology",
    "Urology",
    "urology",
  ),
  ...rowsFrom(SPINE_SURGERY_PROCEDURES, SPINE_SURGERY_COST, "spine-surgery", "Spine Surgery", "spine"),
  ...rowsFrom(PULMONOLOGY_PROCEDURES, PULMONOLOGY_COST, "pulmonology", "Pulmonology", "pulmonology"),
  ...rowsFrom(
    PEDIATRIC_ORTHOPAEDIC_PROCEDURES,
    PEDIATRIC_ORTHOPAEDIC_COST,
    "pediatric-orthopaedic",
    "Pediatric Orthopaedic",
    "pediatric orthopaedic",
  ),
  ...rowsFrom(
    ORTHOPEDICS_PROCEDURES,
    ORTHOPEDICS_COST,
    "orthopedics",
    (name) => ORTHOPEDICS_CLUSTER_BY_PROCEDURE[name] ?? "Orthopedics",
    "orthopedics",
  ),
  ...rowsFrom(
    OPHTHALMOLOGY_PROCEDURES.filter((name) => name !== "Blepharoplasty"),
    OPHTHALMOLOGY_COST,
    "ophthalmology",
    (name) => OPHTHALMOLOGY_CLUSTER_BY_PROCEDURE[name] ?? "Ophthalmology",
    "ophthalmology",
  ),
  ...rowsFrom(
    GYNECOLOGY_PROCEDURES.filter((name) => name !== "Radical Hysterectomy"),
    GYNECOLOGY_COST,
    "gynecology",
    (name) => GYNECOLOGY_CLUSTER_BY_PROCEDURE[name] ?? "Gynecology",
    "gynecology",
  ),
  ...rowsFrom(
    DENTISTRY_PROCEDURES,
    DENTISTRY_COST,
    "dentistry",
    (name) => DENTISTRY_CLUSTER_BY_PROCEDURE[name] ?? "Dentistry",
    "dentistry",
  ),
  ...rowsFrom(
    NEUROSURGERY_PROCEDURES.filter((name) => !neurosurgeryShared.has(name)),
    NEUROSURGERY_COST,
    "neurosurgery",
    (name) => NEUROSURGERY_CLUSTER_BY_PROCEDURE[name] ?? "Neurosurgery",
    "neurosurgery",
  ),
  ...rowsFrom(
    NEUROLOGY_PROCEDURES.filter((name) => !neurologyShared.has(name)),
    NEUROLOGY_COST,
    "neurology",
    (name) => NEUROLOGY_CLUSTER_BY_PROCEDURE[name] ?? "Neurology",
    "neurology",
  ),
  ...rowsFrom(
    NEPHROLOGY_PROCEDURES.filter((name) => !nephrologyShared.has(name)),
    NEPHROLOGY_COST,
    "nephrology",
    (name) => NEPHROLOGY_CLUSTER_BY_PROCEDURE[name] ?? "Nephrology",
    "nephrology",
  ),
];

const DIRECTORY_STAY = "stay";

function stringField(row: Record<string, unknown>, key: string) {
  const value = row[key];
  if (typeof value !== "string" || !value) {
    throw new Error(`Added treatment ${String(row.slug)} is missing ${key}`);
  }
  return value;
}

function slimAdded(row: Record<string, unknown>): DirectoryCostRow {
  const slugs = row.specialtySlugs;
  if (!Array.isArray(slugs) || slugs.some((slug) => typeof slug !== "string")) {
    throw new Error(`Added treatment ${String(row.slug)} is missing specialtySlugs`);
  }
  return {
    slug: stringField(row, "slug"),
    name: stringField(row, "name"),
    category: stringField(row, "category"),
    specialtySlug: stringField(row, "specialtySlug"),
    specialtySlugs: slugs as string[],
    procedureSlug: typeof row.procedureSlug === "string" ? row.procedureSlug : stringField(row, "slug"),
    usRange: stringField(row, "usRange"),
    partnerRange: stringField(row, "partnerRange"),
    stay: stringField(row, "stay"),
  };
}

/**
 * Public English treatment overlays merge every unlocked patch field. The
 * directory renders only `stay` from that set; names and routing stay on the
 * base row. Deletes and added rows follow `applyCatalogLayer`.
 */
export function overlayDirectoryRows(
  rows: readonly DirectoryCostRow[],
  cms: {
    treatmentsDeleted: readonly string[];
    treatmentOverrides: Record<string, { stay?: string }>;
    treatmentsAdded: readonly Record<string, unknown>[];
  },
): DirectoryCostRow[] {
  const gone = new Set(cms.treatmentsDeleted);
  const merged = rows
    .filter((row) => !gone.has(row.slug))
    .map((row) => {
      const patch = cms.treatmentOverrides[row.slug];
      if (!patch || !Object.prototype.hasOwnProperty.call(patch, DIRECTORY_STAY) || patch.stay === undefined) {
        return row;
      }
      return { ...row, stay: patch.stay };
    });
  for (const extra of cms.treatmentsAdded) {
    const row = slimAdded(extra);
    if (gone.has(row.slug) || merged.some((existing) => existing.slug === row.slug)) continue;
    const patch = cms.treatmentOverrides[row.slug];
    merged.push(
      patch && Object.prototype.hasOwnProperty.call(patch, DIRECTORY_STAY) && patch.stay !== undefined
        ? { ...row, stay: patch.stay }
        : row,
    );
  }
  return merged;
}

export function listDirectoryCostGroups(rows: readonly DirectoryCostRow[] = directoryCostRows): DirectoryCostGroup[] {
  return SPECIALTIES.map((specialty) => ({
    name: specialty.name,
    slug: specialty.slug,
    items: rows.filter((row) => row.specialtySlugs.includes(specialty.slug)),
  })).filter((group) => group.items.length > 0);
}
