import { BARIATRIC_PROCEDURES, CARDIOLOGY_PROCEDURES, CARDIAC_SURGERY_PROCEDURES, COSMETIC_PROCEDURES, ENT_PROCEDURES, GASTROENTEROLOGY_PROCEDURES, HEMATOLOGY_PROCEDURES, MEDICAL_ONCOLOGY_PROCEDURES, PEDIATRIC_CARDIAC_SURGERY_PROCEDURES, PEDIATRIC_HEMATOLOGY_PROCEDURES, RADIATION_PROCEDURES, SURGICAL_GASTROENTEROLOGY_PROCEDURES, SURGICAL_ONCOLOGY_PROCEDURES } from "@/lib/taxonomy";

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

const PEDIATRIC_CARDIAC_RULES: { test: RegExp; name: (typeof PEDIATRIC_CARDIAC_SURGERY_PROCEDURES)[number] }[] = [
  { test: /pediatric heart transplant|paediatric heart transplant|heart transplant/i, name: "Pediatric Heart Transplantation" },
  { test: /tapvc|anomalous pulmonary/i, name: "TAPVC Repair (Total Anomalous Pulmonary Venous Connection)" },
  { test: /avsd|atrioventricular septal|av canal/i, name: "AVSD Repair (Atrioventricular Septal Defect)" },
  { test: /coarct/i, name: "Coarctation Repair" },
  { test: /norwood/i, name: "Norwood Procedure" },
  { test: /\bpda\b|patent ductus/i, name: "PDA Closure (Patent Ductus Arteriosus)" },
  { test: /arterial switch|jatene/i, name: "Arterial Switch Operation" },
  { test: /fontan/i, name: "Fontan Procedure" },
  { test: /glenn|cavopulmonary/i, name: "Glenn Procedure" },
  { test: /\btof\b|tetralogy/i, name: "TOF Repair (Tetralogy of Fallot)" },
  { test: /\bvsd\b|ventricular septal/i, name: "VSD Closure (Ventricular Septal Defect)" },
  { test: /\basd\b|atrial septal/i, name: "ASD Closure (Atrial Septal Defect)" },
];

export function mapPediatricCardiacSurgeryProcedures(texts: string[], fallback = true) {
  const found = applyRules(texts, PEDIATRIC_CARDIAC_RULES);
  if (found.length > 0 || !fallback) return found;
  return ["ASD Closure (Atrial Septal Defect)", "VSD Closure (Ventricular Septal Defect)", "TOF Repair (Tetralogy of Fallot)"];
}

const CARDIOLOGY_RULES: { test: RegExp; name: (typeof CARDIOLOGY_PROCEDURES)[number] }[] = [
  { test: /tavr|tavi|transcatheter aortic/i, name: "TAVR/TAVI (Transcatheter Aortic Valve Replacement)" },
  { test: /leadless/i, name: "Leadless Pacemaker Implantation" },
  { test: /mitraclip|mitra[\s-]*clip/i, name: "MitraClip" },
  { test: /crt[\s/-]*d|\bcrt\b|resynchron/i, name: "CRT/CRT-D Implantation" },
  { test: /\bicd\b|defibrillator/i, name: "ICD Implantation (Implantable Cardioverter-Defibrillator)" },
  { test: /cto|chronic total/i, name: "CTO Angioplasty (Chronic Total Occlusion)" },
  { test: /balloon mitral|bmv|ptmc/i, name: "Balloon Mitral Valvotomy" },
  { test: /asd device|device closure/i, name: "ASD Device Closure" },
  { test: /carotid/i, name: "Carotid Artery Stenting" },
  { test: /peripheral/i, name: "Peripheral Angioplasty" },
  { test: /atrial fibrillation|af ablation|pvi /i, name: "Atrial Fibrillation Ablation" },
  { test: /radiofrequency|\brfa\b|rf ablation/i, name: "Radiofrequency Ablation" },
  { test: /pacemaker/i, name: "Pacemaker Implantation" },
  { test: /angiography|angiogram/i, name: "Coronary Angiography" },
  { test: /angioplasty|stenting|pci|ptca/i, name: "Coronary Angioplasty & Stenting" },
];

export function mapCardiologyProcedures(texts: string[], fallback = true) {
  const found = applyRules(texts, CARDIOLOGY_RULES);
  if (found.length > 0 || !fallback) return found;
  return ["Coronary Angiography", "Coronary Angioplasty & Stenting", "Pacemaker Implantation"];
}

const BARIATRIC_RULES: { test: RegExp; name: (typeof BARIATRIC_PROCEDURES)[number] }[] = [
  { test: /band.{0,12}remov|remov.{0,12}band|explant/i, name: "Gastric Band Removal" },
  { test: /sleeve.{0,12}revision|revisional sleeve|re-sleeve/i, name: "Gastric Sleeve Revision Surgery" },
  { test: /sadi|sips/i, name: "SADI-S Surgery" },
  { test: /duodenal switch|bpd[\s/-]*ds|biliopancreatic/i, name: "Duodenal Switch (BPD/DS)" },
  { test: /endoscopic sleeve|\besg\b|gastroplasty/i, name: "Endoscopic Sleeve Gastroplasty (ESG)" },
  { test: /balloon/i, name: "Gastric Balloon" },
  { test: /metabolic|diabetes.{0,12}surg/i, name: "Metabolic Surgery for Type 2 Diabetes" },
  { test: /mini gastric|oagb|\bmgb\b|one[\s-]*anastomosis/i, name: "Mini Gastric Bypass (OAGB/MGB)" },
  { test: /roux|gastric bypass|\brygb\b/i, name: "Gastric Bypass (Roux-en-Y)" },
  { test: /lap[\s-]*band|gastric band|adjustable band/i, name: "Gastric Banding (Lap-Band)" },
  { test: /sleeve/i, name: "Sleeve Gastrectomy" },
];

export function mapBariatricProcedures(texts: string[], fallback = true) {
  const found = applyRules(texts, BARIATRIC_RULES);
  if (found.length > 0 || !fallback) return found;
  return ["Sleeve Gastrectomy", "Gastric Bypass (Roux-en-Y)", "Mini Gastric Bypass (OAGB/MGB)"];
}

const COSMETIC_RULES: { test: RegExp; name: (typeof COSMETIC_PROCEDURES)[number] }[] = [
  { test: /brazilian|bbl|butt lift/i, name: "Brazilian Butt Lift" },
  { test: /gynecomastia|male breast/i, name: "Gynecomastia Surgery" },
  { test: /breast[\s-]*aug|augmentation|implants/i, name: "Breast Augmentation" },
  { test: /breast[\s-]*red|reduction mammo/i, name: "Breast Reduction" },
  { test: /breast[\s-]*lift|mastopexy/i, name: "Breast Lift" },
  { test: /hair transplant|fue|fut|follicular/i, name: "Hair Transplant" },
  { test: /tummy tuck|abdominoplasty/i, name: "Tummy Tuck" },
  { test: /blepharoplasty|eyelid/i, name: "Blepharoplasty" },
  { test: /otoplasty|ear pinning|prominent ear/i, name: "Otoplasty" },
  { test: /neck lift|platysma/i, name: "Neck Lift" },
  { test: /arm lift|brachioplasty/i, name: "Arm Lift" },
  { test: /facelift|rhytidectomy/i, name: "Facelift" },
  { test: /rhinoplasty|nose job|septorhino/i, name: "Rhinoplasty" },
  { test: /fat transfer|fat graft|lipofilling/i, name: "Fat Transfer" },
  { test: /liposuction|\blipo\b/i, name: "Liposuction" },
];

export function mapCosmeticProcedures(texts: string[], fallback = true) {
  const found = applyRules(texts, COSMETIC_RULES);
  if (found.length > 0 || !fallback) return found;
  return ["Rhinoplasty", "Liposuction", "Breast Augmentation"];
}

const ENT_RULES: { test: RegExp; name: (typeof ENT_PROCEDURES)[number] }[] = [
  { test: /tors|transoral robotic/i, name: "Transoral Robotic Surgery (TORS)" },
  { test: /cochlear/i, name: "Cochlear Implantation" },
  { test: /baha|bone[\s-]*anchored/i, name: "BAHA Implantation (Bone Anchored Hearing Aid)" },
  { test: /balloon sinus/i, name: "Balloon Sinuplasty" },
  { test: /\bfess\b|endoscopic sinus/i, name: "FESS (Functional Endoscopic Sinus Surgery)" },
  { test: /staped/i, name: "Stapedectomy / Stapedotomy" },
  { test: /skull[\s-]*base/i, name: "Skull Base Surgery" },
  { test: /head[\s&]*neck cancer|head and neck cancer/i, name: "Head & Neck Cancer Surgery" },
  { test: /microlaryngeal|microlaryng/i, name: "Microlaryngeal Surgery" },
  { test: /vocal cord|voice/i, name: "Vocal Cord Surgery" },
  { test: /sleep apnea|osa|uppp/i, name: "Sleep Apnea Surgery" },
  { test: /mastoid/i, name: "Mastoidectomy" },
  { test: /tympanoplasty|myringoplasty/i, name: "Tympanoplasty" },
  { test: /adenoid/i, name: "Adenoidectomy" },
  { test: /tonsil/i, name: "Tonsillectomy" },
  { test: /septoplasty|deviated septum/i, name: "Septoplasty" },
  { test: /rhinoplasty/i, name: "Rhinoplasty" },
  { test: /thyroid/i, name: "Thyroid Surgery" },
];

export function mapEntProcedures(texts: string[], fallback = true) {
  const found = applyRules(texts, ENT_RULES);
  if (found.length > 0 || !fallback) return found;
  return ["FESS (Functional Endoscopic Sinus Surgery)", "Septoplasty", "Tonsillectomy"];
}

const GASTROENTEROLOGY_RULES: { test: RegExp; name: (typeof GASTROENTEROLOGY_PROCEDURES)[number] }[] = [
  { test: /transjugular/i, name: "Transjugular Liver Biopsy" },
  { test: /\bptbd\b|percutaneous transhepatic/i, name: "PTBD (Percutaneous Transhepatic Biliary Drainage)" },
  { test: /g[\s-]*poem|gastroparesis.{0,20}myotomy|pyloromyotomy/i, name: "G-POEM" },
  { test: /z[\s-]*poem|zenker/i, name: "Z-POEM" },
  { test: /\bpoem\b|peroral endoscopic myotomy|achalasia.{0,12}myotomy/i, name: "Peroral Endoscopic Myotomy (POEM)" },
  { test: /\bster\b|submucosal tunneling endoscopic/i, name: "STER (Submucosal Tunneling Endoscopic Resection)" },
  { test: /\besd\b|submucosal dissection/i, name: "Endoscopic Submucosal Dissection (ESD)" },
  { test: /\bemr\b|mucosal resection/i, name: "Endoscopic Mucosal Resection (EMR)" },
  { test: /cholangioscop|spyglass/i, name: "Cholangioscopy" },
  { test: /biliary stent|metal stent|plastic stent/i, name: "Biliary Stenting" },
  { test: /bile duct stone|choledocholith|cbd stone/i, name: "Bile Duct Stone Removal" },
  { test: /\bercp\b|endoscopic retrograde/i, name: "ERCP" },
  { test: /\beus\b|endoscopic ultrasound/i, name: "Endoscopic Ultrasound (EUS)" },
  { test: /capsule/i, name: "Capsule Endoscopy" },
  { test: /enteroscop/i, name: "Enteroscopy" },
  { test: /variceal|banding|evl\b/i, name: "Variceal Band Ligation" },
  { test: /hemostasis|haemostasis|gi bleed|ulcer bleed/i, name: "Endoscopic Hemostasis" },
  { test: /foreign body|ingested/i, name: "Foreign Body Removal" },
  { test: /liver biopsy/i, name: "Liver Biopsy" },
  { test: /esophageal manometr|oesophageal manometr/i, name: "Esophageal Manometry" },
  { test: /anorectal manometr/i, name: "Anorectal Manometry" },
  { test: /bariatric.{0,20}endoscop|metabolic endoscop|endoscopic sleeve|gastric balloon/i, name: "Bariatric / Metabolic Endoscopy" },
  { test: /colonoscop/i, name: "Colonoscopy" },
  { test: /gastroscop|upper gi|ogd\b|egd\b|oesophagogastro/i, name: "Upper GI Endoscopy (Gastroscopy)" },
];

export function mapGastroenterologyProcedures(texts: string[], fallback = true) {
  const found = applyRules(texts, GASTROENTEROLOGY_RULES);
  if (found.length > 0 || !fallback) return found;
  return ["Upper GI Endoscopy (Gastroscopy)", "Colonoscopy", "ERCP"];
}

const SURGICAL_GASTRO_RULES: { test: RegExp; name: (typeof SURGICAL_GASTROENTEROLOGY_PROCEDURES)[number] }[] = [
  { test: /pediatric liver transplant|paediatric liver transplant/i, name: "Pediatric Liver Transplantation" },
  { test: /living donor liver|ldlt\b/i, name: "Living Donor Liver Transplantation" },
  { test: /deceased donor liver|ddlt\b|cadaver.{0,12}liver/i, name: "Deceased Donor Liver Transplantation" },
  { test: /retransplant/i, name: "Liver Retransplantation" },
  { test: /liver transplant/i, name: "Liver Transplantation" },
  { test: /whipple|pancreaticoduoden/i, name: "Whipple Procedure (Pancreaticoduodenectomy)" },
  { test: /distal pancrea/i, name: "Distal Pancreatectomy" },
  { test: /pancreatect/i, name: "Pancreatectomy" },
  { test: /biliary reconstruct|hepaticojejun/i, name: "Biliary Reconstruction" },
  { test: /gallbladder cancer/i, name: "Gallbladder Cancer Surgery" },
  { test: /bile duct cancer|cholangiocarcinoma.{0,12}surg/i, name: "Bile Duct Cancer Surgery" },
  { test: /nissen|fundoplication|anti[\s-]*reflux/i, name: "Anti-Reflux Surgery (Nissen Fundoplication)" },
  { test: /hiatal hernia|hiatus hernia/i, name: "Hiatal Hernia Surgery" },
  { test: /heller/i, name: "Heller Myotomy for Achalasia" },
  { test: /\btme\b|total mesorectal/i, name: "Total Mesorectal Excision (TME)" },
  { test: /\blar\b|low anterior/i, name: "Low Anterior Resection (LAR)" },
  { test: /\bapr\b|abdominoperineal/i, name: "Abdominoperineal Resection (APR)" },
  { test: /ostomy|stoma|ileostomy|colostomy/i, name: "Ostomy / Stoma Surgery" },
  { test: /colorectal cancer/i, name: "Colorectal Cancer Surgery" },
  { test: /colorectal resect|colectomy|colon resect/i, name: "Colorectal Resection" },
  { test: /hepatec|liver resect/i, name: "Liver Resection (Hepatectomy)" },
  { test: /esophagect|oesophagect/i, name: "Esophagectomy" },
  { test: /gastrect/i, name: "Gastrectomy" },
  { test: /gastric bypass|roux/i, name: "Gastric Bypass Surgery" },
  { test: /sleeve/i, name: "Sleeve Gastrectomy" },
];

export function mapSurgicalGastroenterologyProcedures(texts: string[], fallback = true) {
  const found = applyRules(texts, SURGICAL_GASTRO_RULES);
  if (found.length > 0 || !fallback) return found;
  return ["Liver Transplantation", "Liver Resection (Hepatectomy)", "Whipple Procedure (Pancreaticoduodenectomy)"];
}

export function mapDoctorProcedures(specialty: string, texts: string[]) {
  if (specialty === "Surgical Oncology") return mapSurgicalProcedures(texts);
  if (specialty === "Medical Oncology") return mapMedicalProcedures(texts);
  if (specialty === "Hematology") return mapHematologyProcedures(texts);
  if (specialty === "Pediatric Hematology") return mapPediatricHematologyProcedures(texts);
  if (specialty === "Cardiac Surgery") return mapCardiacSurgeryProcedures(texts);
  if (specialty === "Pediatric Cardiac Surgery") return mapPediatricCardiacSurgeryProcedures(texts);
  if (specialty === "Cardiology") return mapCardiologyProcedures(texts);
  if (specialty === "Bariatric Surgery") return mapBariatricProcedures(texts);
  if (specialty === "Cosmetic Surgery") return mapCosmeticProcedures(texts);
  if (specialty === "ENT") return mapEntProcedures(texts);
  if (specialty === "Gastroenterology") return mapGastroenterologyProcedures(texts);
  if (specialty === "Surgical Gastroenterology") return mapSurgicalGastroenterologyProcedures(texts);
  return mapCatalogProcedures(texts);
}
