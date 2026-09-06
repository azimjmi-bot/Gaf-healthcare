import { RADIATION_PROCEDURES } from "@/lib/taxonomy";

const PROCEDURE_RULES: { test: RegExp; name: (typeof RADIATION_PROCEDURES)[number] }[] = [
  { test: /cyber\s*knife/i, name: "CyberKnife" },
  { test: /gamma\s*knife/i, name: "Gamma Knife" },
  { test: /proton/i, name: "Proton Beam Therapy" },
  { test: /\btbi\b|total body/i, name: "Total Body Irradiation (TBI)" },
  { test: /\biort\b|intraoperative/i, name: "Intraoperative Radiotherapy (IORT)" },
  { test: /plaque/i, name: "Plaque Brachytherapy" },
  { test: /interstitial/i, name: "Interstitial Brachytherapy" },
  { test: /intracavitary/i, name: "Intracavitary Brachytherapy" },
  { test: /brachytherapy/i, name: "Brachytherapy" },
  { test: /\bsbrt\b|stereotactic body/i, name: "Stereotactic Body Radiotherapy (SBRT)" },
  { test: /\bsrs\b|stereotactic radio/i, name: "Stereotactic Radiosurgery (SRS)" },
  { test: /\bimrt\b|intensity-modulated/i, name: "Intensity-Modulated Radiotherapy (IMRT)" },
  { test: /\bigrt\b|image-guided/i, name: "Image-Guided Radiotherapy (IGRT)" },
  { test: /3d|conformal/i, name: "3D Conformal Radiotherapy (3D-CRT)" },
  { test: /\bebrt\b|external beam/i, name: "External Beam Radiotherapy (EBRT)" },
];

export function mapCatalogProcedures(texts: string[], fallback = true) {
  const found = new Set<(typeof RADIATION_PROCEDURES)[number]>();
  for (const text of texts) {
    for (const rule of PROCEDURE_RULES) {
      if (rule.test.test(text)) found.add(rule.name);
    }
  }
  if (fallback && found.size === 0) found.add("External Beam Radiotherapy (EBRT)");
  return [...found];
}
