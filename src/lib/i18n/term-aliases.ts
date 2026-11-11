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
  IVF: "IVF Treatment",
  "In Vitro Fertilization": "IVF Treatment",
  "In-Vitro Fertilisation": "IVF Treatment",
  ICSI: "ICSI Treatment",
  "Intracytoplasmic Sperm Injection": "ICSI Treatment",
  IUI: "IUI Treatment",
  "Intrauterine Insemination": "IUI Treatment",
  IMSI: "IMSI Treatment",
  FET: "Frozen Embryo Transfer (FET)",
  "Frozen Embryo Transfer": "Frozen Embryo Transfer (FET)",
  "PGT-A": "PGT-A Testing",
  "PGT A": "PGT-A Testing",
  PGS: "PGT-A Testing",
  "PGT-M": "PGT-M / PGD Testing",
  "PGT M": "PGT-M / PGD Testing",
  PGD: "PGT-M / PGD Testing",
  "Preimplantation Genetic Diagnosis": "PGT-M / PGD Testing",
  "Micro TESE": "Micro-TESE",
  MicroTESE: "Micro-TESE",
  TESE: "TESE / TESA",
  TESA: "TESE / TESA",
  PESA: "PESA / MESA",
  MESA: "PESA / MESA",
  Myomectomy: "Fibroid Removal (Myomectomy)",
  "Ovarian Cystectomy": "Ovarian Cyst Removal",
  "Cystectomy Ovarian": "Ovarian Cyst Removal",
  "Dental Implant": "Dental Implants",
  Implantology: "Dental Implants",
  "Tooth Implant": "Dental Implants",
  "All-on-4": "Full Mouth Dental Implants",
  "All on 4": "Full Mouth Dental Implants",
  "All-on-6": "Full Mouth Dental Implants",
  "All on 6": "Full Mouth Dental Implants",
  "Full Arch Implants": "Full Mouth Dental Implants",
  Crowns: "Dental Crowns and Bridges",
  Bridges: "Dental Crowns and Bridges",
  "Dental Crowns": "Dental Crowns and Bridges",
  "Dental Bridges": "Dental Crowns and Bridges",
  Orthodontics: "Braces and Orthodontic Treatment",
  Braces: "Braces and Orthodontic Treatment",
  "Orthodontic Treatment": "Braces and Orthodontic Treatment",
  Invisalign: "Clear Aligners",
  Aligners: "Clear Aligners",
  RCT: "Root Canal Treatment",
  "Root Canal": "Root Canal Treatment",
  Endodontics: "Root Canal Treatment",
  Periodontics: "Gum Surgery",
  "Periodontal Surgery": "Gum Surgery",
  Veneers: "Dental Veneers",
  "Porcelain Veneers": "Dental Veneers",
  Whitening: "Teeth Whitening",
  Bleaching: "Teeth Whitening",
  "Dental Whitening": "Teeth Whitening",
  Extraction: "Tooth Extraction",
  "Dental Extraction": "Tooth Extraction",
  "Tooth Removal": "Tooth Extraction",
  "Wisdom Teeth Removal": "Wisdom Tooth Removal",
  "Third Molar Extraction": "Wisdom Tooth Removal",
  Orthognathic: "Jaw Surgery",
  "Orthognathic Surgery": "Jaw Surgery",
  "Maxillofacial Surgery": "Jaw Surgery",
  Fillings: "Dental Fillings",
  "Composite Filling": "Dental Fillings",
};

/** The spelling a term should be looked up under. */
export function canonicalTermKey(name: string): string {
  return PROCEDURE_TERM_ALIASES[name] ?? name;
}
