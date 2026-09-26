/**
 * Spellings of a procedure that are not the one the router uses.
 *
 * The catalog was assembled from hospital sources that do not agree with each
 * other, so one procedure arrives as "Stereotactic Body Radiotherapy (SBRT)",
 * "Stereotactic Body Radiation Therapy (SBRT)" and "Stereotactic Body Radiation
 * Therapy". Only the first is routable — it is the name in PROCEDURES, so it is
 * the name in the URL — but all three reach a translation table, and a term
 * maintained in three places drifts into three readings.
 *
 * The variants are redirected here rather than deleted, because they are still
 * what the source data says and a future import will say it again. What they
 * lose is a translation of their own: every spelling of a procedure resolves to
 * the canonical key and therefore to one Arabic reading.
 */
export const PROCEDURE_TERM_ALIASES: Record<string, string> = {
  "3D Conformal Radiotherapy": "3D Conformal Radiotherapy (3D-CRT)",
  "External Beam Radiotherapy": "External Beam Radiotherapy (EBRT)",
  "Image-Guided Radiation Therapy": "Image-Guided Radiotherapy (IGRT)",
  "Image-Guided Radiation Therapy (IGRT)": "Image-Guided Radiotherapy (IGRT)",
  "Intensity-Modulated Radiation Therapy": "Intensity-Modulated Radiotherapy (IMRT)",
  "Intensity-Modulated Radiation Therapy (IMRT)": "Intensity-Modulated Radiotherapy (IMRT)",
  "Intraoperative Radiation Therapy (IORT)": "Intraoperative Radiotherapy (IORT)",
  "Stereotactic Body Radiation Therapy": "Stereotactic Body Radiotherapy (SBRT)",
  "Stereotactic Body Radiation Therapy (SBRT)": "Stereotactic Body Radiotherapy (SBRT)",
};

/** The spelling a term should be looked up under. */
export function canonicalTermKey(name: string): string {
  return PROCEDURE_TERM_ALIASES[name] ?? name;
}
