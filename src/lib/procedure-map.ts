import { CARDIAC_SURGERY_PROCEDURES, HEMATOLOGY_PROCEDURES, MEDICAL_ONCOLOGY_PROCEDURES, PEDIATRIC_HEMATOLOGY_PROCEDURES, RADIATION_PROCEDURES, SURGICAL_ONCOLOGY_PROCEDURES } from "@/lib/taxonomy";

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

const MEDICAL_RULES: { test: RegExp; name: (typeof MEDICAL_ONCOLOGY_PROCEDURES)[number] }[] = [
  { test: /car[\s-]*t/i, name: "CAR-T Cell Therapy" },
  { test: /dendritic/i, name: "Dendritic Cell Therapy" },
  { test: /bone marrow|allogeneic|allogenic|\ballo\b/i, name: "Bone Marrow Transplantation" },
  { test: /stem cell|autologous|\bauto\b|transplant/i, name: "Stem Cell Transplantation" },
  { test: /intrathecal/i, name: "Intrathecal Chemotherapy" },
  { test: /intraperitoneal|\bip chemo\b/i, name: "Intraperitoneal Chemotherapy" },
  { test: /antibody[\s-]*drug|adc\b/i, name: "Antibody-Drug Conjugate Therapy" },
  { test: /checkpoint|pd[\s-]*1|pd[\s-]*l1|ctla/i, name: "Immune Checkpoint Inhibitor Therapy" },
  { test: /neoadjuvant/i, name: "Neoadjuvant Chemotherapy" },
  { test: /adjuvant/i, name: "Adjuvant Chemotherapy" },
  { test: /palliative/i, name: "Palliative Chemotherapy" },
  { test: /maintenance/i, name: "Maintenance Therapy" },
  { test: /precision|ngs|genomic|next[\s-]*gen/i, name: "Precision Oncology" },
  { test: /molecular targeted/i, name: "Molecular Targeted Therapy" },
  { test: /hormon|endocrine|aromatase|tamoxifen/i, name: "Hormone Therapy" },
  { test: /immunotherap|immuno[\s-]*onc/i, name: "Immunotherapy" },
  { test: /targeted/i, name: "Targeted Therapy" },
  { test: /chemo/i, name: "Chemotherapy" },
];

const HEMATOLOGY_RULES: { test: RegExp; name: (typeof HEMATOLOGY_PROCEDURES)[number] }[] = [
  { test: /haplo/i, name: "Haploidentical Stem Cell Transplant" },
  { test: /matched unrelated|\bmud\b|unrelated donor/i, name: "Matched Unrelated Donor Transplant" },
  { test: /autologous/i, name: "Autologous Stem Cell Transplant" },
  { test: /allogeneic|allogenic/i, name: "Allogeneic Stem Cell Transplant" },
  { test: /marrow biopsy|trephine/i, name: "Bone Marrow Biopsy" },
  { test: /marrow aspiration|aspirate/i, name: "Bone Marrow Aspiration" },
  { test: /car[\s-]*t/i, name: "CAR-T Cell Therapy" },
  { test: /intrathecal/i, name: "Intrathecal Chemotherapy" },
  { test: /bone marrow/i, name: "Bone Marrow Transplantation" },
  { test: /stem cell|transplant/i, name: "Stem Cell Transplantation" },
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

export function mapMedicalProcedures(texts: string[], fallback = true) {
  const found = applyRules(texts, MEDICAL_RULES);
  if (found.length > 0 || !fallback) return found;
  return ["Chemotherapy", "Targeted Therapy", "Immunotherapy"];
}

const PEDIATRIC_HEMATOLOGY_RULES: { test: RegExp; name: (typeof PEDIATRIC_HEMATOLOGY_PROCEDURES)[number] }[] = [
  { test: /sibling/i, name: "Matched Sibling Donor Transplant" },
  { test: /hematopoietic|haematopoietic|\bhsct\b/i, name: "Hematopoietic Stem Cell Transplantation" },
  { test: /haplo/i, name: "Haploidentical Stem Cell Transplant" },
  { test: /matched unrelated|\bmud\b|unrelated donor/i, name: "Matched Unrelated Donor Transplant" },
  { test: /autologous/i, name: "Autologous Stem Cell Transplant" },
  { test: /allogeneic|allogenic/i, name: "Allogeneic Stem Cell Transplant" },
  { test: /marrow biopsy|trephine/i, name: "Bone Marrow Biopsy" },
  { test: /marrow aspiration|aspirate/i, name: "Bone Marrow Aspiration" },
  { test: /car[\s-]*t/i, name: "CAR-T Cell Therapy" },
  { test: /bone marrow|bmt|transplant|pediatric|paediatric/i, name: "Pediatric Bone Marrow Transplantation" },
];

export function mapHematologyProcedures(texts: string[], fallback = true) {
  const found = applyRules(texts, HEMATOLOGY_RULES);
  if (found.length > 0 || !fallback) return found;
  return ["Bone Marrow Transplantation", "Stem Cell Transplantation", "Bone Marrow Biopsy"];
}

export function mapPediatricHematologyProcedures(texts: string[], fallback = true) {
  const found = applyRules(texts, PEDIATRIC_HEMATOLOGY_RULES);
  if (found.length > 0 || !fallback) return found;
  return ["Pediatric Bone Marrow Transplantation", "Allogeneic Stem Cell Transplant", "Bone Marrow Biopsy"];
}

const CARDIAC_SURGERY_RULES: { test: RegExp; name: (typeof CARDIAC_SURGERY_PROCEDURES)[number] }[] = [
  { test: /tavr|tavi|transcatheter/i, name: "TAVR/TAVI (Transcatheter Aortic Valve Replacement)" },
  { test: /\blvad\b|ventricular assist/i, name: "LVAD Implantation" },
  { test: /heart transplant|cardiac transplant/i, name: "Heart Transplant Surgery" },
  { test: /congenital/i, name: "Congenital Heart Surgery" },
  { test: /robotic/i, name: "Robotic Cardiac Surgery" },
  { test: /minimally invasive|mini[\s-]*mitral|mini[\s-]*avr/i, name: "Minimally Invasive Cardiac Surgery" },
  { test: /redo.{0,12}cabg|re-?do cabg|second.{0,8}bypass/i, name: "Redo CABG" },
  { test: /double valve/i, name: "Double Valve Replacement" },
  { test: /aortic root|bentall|david procedure/i, name: "Aortic Root Replacement" },
  { test: /aortic aneurysm|thoracic aneurysm/i, name: "Aortic Aneurysm Surgery" },
  { test: /mitral valve repair|mitral repair/i, name: "Mitral Valve Repair" },
  { test: /aortic valve replacement|\bavr\b(?!.*transcatheter)/i, name: "Aortic Valve Replacement" },
  { test: /valve repair/i, name: "Heart Valve Repair" },
  { test: /valve replacement/i, name: "Heart Valve Replacement" },
  { test: /\bcabg\b|coronary artery bypass|bypass graft/i, name: "CABG (Coronary Artery Bypass Grafting)" },
];

export function mapCardiacSurgeryProcedures(texts: string[], fallback = true) {
  const found = applyRules(texts, CARDIAC_SURGERY_RULES);
  if (found.length > 0 || !fallback) return found;
  return ["CABG (Coronary Artery Bypass Grafting)", "Heart Valve Replacement", "Heart Valve Repair"];
}

export function mapDoctorProcedures(specialty: string, texts: string[]) {
  if (specialty === "Surgical Oncology") return mapSurgicalProcedures(texts);
  if (specialty === "Medical Oncology") return mapMedicalProcedures(texts);
  if (specialty === "Hematology") return mapHematologyProcedures(texts);
  if (specialty === "Pediatric Hematology") return mapPediatricHematologyProcedures(texts);
  if (specialty === "Cardiac Surgery") return mapCardiacSurgeryProcedures(texts);
  return mapCatalogProcedures(texts);
}
