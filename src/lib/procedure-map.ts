import { RADIATION_PROCEDURES, SURGICAL_ONCOLOGY_PROCEDURES } from "@/lib/taxonomy";

const RADIATION_RULES: { test: RegExp; name: (typeof RADIATION_PROCEDURES)[number] }[] = [
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

const SURGICAL_RULES: { test: RegExp; name: (typeof SURGICAL_ONCOLOGY_PROCEDURES)[number] }[] = [
  { test: /nipple[\s-]*sparing/i, name: "Nipple-Sparing Mastectomy" },
  { test: /oncoplastic|oncoplasty/i, name: "Oncoplastic Breast Surgery" },
  { test: /breast[\s-]*reconstr|reconstruction of the breast/i, name: "Breast Reconstruction" },
  { test: /lumpectomy|breast[\s-]*conserv|wide local/i, name: "Breast-Conserving Surgery (Lumpectomy)" },
  { test: /mastectomy|breast cancer surgery/i, name: "Mastectomy" },
  { test: /sentinel/i, name: "Sentinel Lymph Node Biopsy" },
  { test: /esophag/i, name: "Esophagectomy" },
  { test: /gastrect|gastric cancer/i, name: "Gastrectomy" },
  { test: /rectal/i, name: "Rectal Cancer Surgery" },
  { test: /colect|colon cancer|colorectal/i, name: "Colectomy" },
  { test: /hepatec|liver resect/i, name: "Liver Resection (Hepatectomy)" },
  { test: /whipple|pancreaticoduoden/i, name: "Whipple Procedure" },
  { test: /pancrea/i, name: "Pancreatic Surgery" },
  { test: /pipac/i, name: "PIPAC" },
  { test: /hipec|crs\s*\+|crs \+/i, name: "Cytoreductive Surgery with HIPEC" },
  { test: /cytoreduct/i, name: "Cytoreductive Surgery" },
  { test: /hysterect|cervical cancer surgery|endometrial/i, name: "Radical Hysterectomy" },
  { test: /ovarian/i, name: "Ovarian Cancer Cytoreductive Surgery" },
  { test: /thyroid/i, name: "Thyroidectomy for Thyroid Cancer" },
  { test: /neck dissection|head\s*(&|and)\s*neck/i, name: "Neck Dissection" },
  { test: /tors|transoral robotic/i, name: "Transoral Robotic Surgery (TORS)" },
  { test: /free flap|microvascular/i, name: "Microvascular Free Flap Reconstruction" },
  { test: /oral cancer/i, name: "Oral Cancer Surgery" },
  { test: /vats/i, name: "VATS Lung Surgery" },
  { test: /robotic thoracic|robotic chest/i, name: "Robotic Thoracic Surgery" },
  { test: /lobectomy/i, name: "Lobectomy" },
  { test: /lung cancer|thoracic/i, name: "Lung Cancer Surgery" },
  { test: /prostatect/i, name: "Radical Prostatectomy" },
  { test: /partial nephr|kidney cancer|nephrect/i, name: "Partial Nephrectomy" },
  { test: /cystect|bladder cancer/i, name: "Radical Cystectomy" },
];

function applyRules<T extends string>(
  texts: string[],
  rules: { test: RegExp; name: T }[],
): T[] {
  const found = new Set<T>();
  for (const text of texts) {
    for (const rule of rules) {
      if (rule.test.test(text)) found.add(rule.name);
    }
  }
  return [...found];
}

export function mapCatalogProcedures(texts: string[], fallback = true) {
  const found = applyRules(texts, RADIATION_RULES);
  if (fallback && found.length === 0) found.push("External Beam Radiotherapy (EBRT)");
  return found;
}

export function mapSurgicalProcedures(texts: string[], fallback = true) {
  const found = applyRules(texts, SURGICAL_RULES);
  if (found.length > 0 || !fallback) return found;
  const hint = texts.join(" ").toLowerCase();
  if (hint.includes("breast")) {
    return [
      "Breast-Conserving Surgery (Lumpectomy)",
      "Mastectomy",
      "Sentinel Lymph Node Biopsy",
    ];
  }
  if (/(gynae|gynec|ovarian|cervi)/i.test(hint)) {
    return ["Radical Hysterectomy", "Ovarian Cancer Cytoreductive Surgery"];
  }
  if (/(thoracic|lung|chest|vats)/i.test(hint)) {
    return ["Lung Cancer Surgery", "Lobectomy", "VATS Lung Surgery"];
  }
  if (/(head|neck|thyroid|oral)/i.test(hint)) {
    return ["Oral Cancer Surgery", "Neck Dissection", "Thyroidectomy for Thyroid Cancer"];
  }
  if (/(colorectal|rectal|colon|gastro)/i.test(hint)) {
    return ["Colectomy", "Rectal Cancer Surgery"];
  }
  if (/(hepato|liver)/i.test(hint)) return ["Liver Resection (Hepatectomy)"];
  if (/pancrea/i.test(hint)) return ["Whipple Procedure", "Pancreatic Surgery"];
  if (/prostate/i.test(hint)) return ["Radical Prostatectomy"];
  return ["Mastectomy", "Gastrectomy", "Lung Cancer Surgery"];
}

export function mapDoctorProcedures(specialty: string, texts: string[]) {
  if (specialty === "Surgical Oncology") return mapSurgicalProcedures(texts);
  return mapCatalogProcedures(texts);
}
