import { BARIATRIC_PROCEDURES, CARDIOLOGY_PROCEDURES, CARDIAC_SURGERY_PROCEDURES, COSMETIC_PROCEDURES, ENT_PROCEDURES, GASTROENTEROLOGY_PROCEDURES, GYNECOLOGY_PROCEDURES, HEMATOLOGY_PROCEDURES, MEDICAL_ONCOLOGY_PROCEDURES, NEPHROLOGY_PROCEDURES, NEUROLOGY_PROCEDURES, NEUROSURGERY_PROCEDURES, OPHTHALMOLOGY_PROCEDURES, ORTHOPEDICS_PROCEDURES, PEDIATRIC_CARDIAC_SURGERY_PROCEDURES, PEDIATRIC_HEMATOLOGY_PROCEDURES, PEDIATRIC_ORTHOPAEDIC_PROCEDURES, PULMONOLOGY_PROCEDURES, RADIATION_PROCEDURES, SPINE_SURGERY_PROCEDURES, SURGICAL_GASTROENTEROLOGY_PROCEDURES, SURGICAL_ONCOLOGY_PROCEDURES, UROLOGY_PROCEDURES } from "@/lib/taxonomy";

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
  { test: /esophagect|oesophagect|esophageal cancer|oesophageal cancer/i, name: "Esophagectomy" },
  { test: /gastric cancer|stomach cancer/i, name: "Gastrectomy" },
  { test: /rectal cancer surg|low anterior|\blar\b|abdominoperineal|\bapr\b|total mesorectal|\btme\b|colorectal cancer surg/i, name: "Rectal Cancer Surgery" },
  { test: /colectomy|hemicolectomy|colon cancer|colorectal cancer/i, name: "Colectomy" },
  { test: /hepatec|liver resect|liver cancer surg/i, name: "Liver Resection (Hepatectomy)" },
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
  return ["Mastectomy", "Lung Cancer Surgery"];
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
  { test: /esophagect|oesophagect|esophageal cancer surg|oesophageal cancer/i, name: "Esophagectomy" },
  { test: /gastric cancer|stomach cancer/i, name: "Gastrectomy" },
  { test: /gastric bypass|roux/i, name: "Gastric Bypass Surgery" },
  { test: /sleeve/i, name: "Sleeve Gastrectomy" },
];

export function mapSurgicalGastroenterologyProcedures(texts: string[], fallback = true) {
  const found = applyRules(texts, SURGICAL_GASTRO_RULES);
  if (found.length > 0 || !fallback) return found;
  return ["Liver Transplantation", "Liver Resection (Hepatectomy)", "Whipple Procedure (Pancreaticoduodenectomy)"];
}

const UROLOGY_RULES: { test: RegExp; name: (typeof UROLOGY_PROCEDURES)[number] }[] = [
  { test: /abo[\s-]*incompat/i, name: "ABO-Incompatible Kidney Transplantation" },
  { test: /living donor kidney|live donor kidney/i, name: "Living Donor Kidney Transplantation" },
  { test: /deceased donor kidney|cadaver.{0,12}kidney/i, name: "Deceased Donor Kidney Transplantation" },
  { test: /kidney transplant|renal transplant/i, name: "Kidney Transplantation" },
  { test: /\bpcnl\b|percutaneous nephrolith/i, name: "PCNL (Percutaneous Nephrolithotomy)" },
  { test: /\brirs\b|retrograde intrarenal/i, name: "RIRS (Retrograde Intrarenal Surgery)" },
  { test: /\beswl\b|shock[\s-]*wave lithotrips/i, name: "ESWL (Extracorporeal Shock Wave Lithotripsy)" },
  { test: /ureteroscop/i, name: "Ureteroscopy" },
  { test: /pyeloplast/i, name: "Pyeloplasty" },
  { test: /radical nephr/i, name: "Radical Nephrectomy" },
  { test: /partial nephr/i, name: "Partial Nephrectomy" },
  { test: /\bholep\b|holmium.{0,20}enucleat/i, name: "HoLEP (Holmium Laser Enucleation)" },
  { test: /green[\s-]*light|photoselective vapori/i, name: "GreenLight Laser Surgery" },
  { test: /\bturp\b|transurethral resection of the prostate/i, name: "TURP (Transurethral Resection of the Prostate)" },
  { test: /prostatect/i, name: "Radical Prostatectomy" },
  { test: /\bturbt\b|transurethral resection of bladder/i, name: "TURBT (Transurethral Resection of Bladder Tumor)" },
  { test: /cystect/i, name: "Radical Cystectomy" },
  { test: /bladder reconstr|neobladder|augmentation cystoplast/i, name: "Bladder Reconstruction" },
  { test: /urinary diversion|ileal conduit/i, name: "Urinary Diversion" },
  { test: /urethroplast/i, name: "Urethroplasty" },
  { test: /\bviu\b|internal urethrotom/i, name: "VIU (Visual Internal Urethrotomy)" },
  { test: /urinary tract reconstr|ureteric reimplant|ureteral reconstr/i, name: "Urinary Tract Reconstruction" },
  { test: /hypospadias/i, name: "Hypospadias Repair" },
  { test: /pediatric urolog|paediatric urolog/i, name: "Pediatric Urological Surgery" },
  { test: /penile implant|penile prosthes/i, name: "Penile Implant" },
  { test: /varicocele/i, name: "Varicocele Surgery" },
];

export function mapUrologyProcedures(texts: string[], fallback = true) {
  const found = applyRules(texts, UROLOGY_RULES);
  if (found.length > 0 || !fallback) return found;
  return ["PCNL (Percutaneous Nephrolithotomy)", "TURP (Transurethral Resection of the Prostate)", "Kidney Transplantation"];
}

const SPINE_RULES: { test: RegExp; name: (typeof SPINE_SURGERY_PROCEDURES)[number] }[] = [
  { test: /\bplif\b|posterior lumbar interbody/i, name: "PLIF (Posterior Lumbar Interbody Fusion)" },
  { test: /\btlif\b|transforaminal lumbar/i, name: "TLIF (Transforaminal Lumbar Interbody Fusion)" },
  { test: /\balif\b|anterior lumbar interbody/i, name: "ALIF (Anterior Lumbar Interbody Fusion)" },
  { test: /\bacdf\b|anterior cervical discectomy/i, name: "ACDF (Anterior Cervical Discectomy and Fusion)" },
  { test: /microdiscect|micro[\s-]*discect/i, name: "Microdiscectomy" },
  { test: /discect|diskect/i, name: "Discectomy" },
  { test: /laminect/i, name: "Laminectomy" },
  { test: /kyphoplast/i, name: "Kyphoplasty" },
  { test: /vertebroplast/i, name: "Vertebroplasty" },
  { test: /disc replacement|arthroplasty|artificial disc|adr\b/i, name: "Disc Replacement" },
  { test: /scoliosis/i, name: "Scoliosis Correction" },
  { test: /deformity/i, name: "Spinal Deformity Correction" },
  { test: /revision spine|revision fusion|failed back/i, name: "Revision Spine Surgery" },
  { test: /spinal tumor|spine tumor|intradural|intramedullary|metastatic spine/i, name: "Spinal Tumor Surgery" },
  { test: /decompress/i, name: "Spinal Decompression" },
  { test: /spinal fusion|lumbar fusion|cervical fusion|instrumented fusion/i, name: "Spinal Fusion" },
];

export function mapSpineSurgeryProcedures(texts: string[], fallback = true) {
  const found = applyRules(texts, SPINE_RULES);
  if (found.length > 0 || !fallback) return found;
  return ["Spinal Fusion", "Microdiscectomy", "ACDF (Anterior Cervical Discectomy and Fusion)"];
}

const PULMONOLOGY_RULES: { test: RegExp; name: (typeof PULMONOLOGY_PROCEDURES)[number] }[] = [
  { test: /\bebus\b|endobronchial ultrasound/i, name: "EBUS (Endobronchial Ultrasound)" },
  { test: /rigid bronchoscop/i, name: "Rigid Bronchoscopy" },
  { test: /airway stent|tracheal stent|bronchial stent/i, name: "Airway Stenting" },
  { test: /thoracoscop/i, name: "Medical Thoracoscopy" },
  { test: /pleuroscop/i, name: "Medical Pleuroscopy" },
  { test: /cryo[\s-]*lung|cryobiops|cryo[\s-]*biops/i, name: "Cryo-Lung Biopsy" },
  { test: /transbronchial lung|tblb\b/i, name: "Transbronchial Lung Biopsy" },
  { test: /endobronchial biops/i, name: "Endobronchial Biopsy" },
  { test: /\btbna\b|transbronchial needle/i, name: "TBNA (Transbronchial Needle Aspiration)" },
  { test: /debulk|tumou?r debulk/i, name: "Bronchoscopic Tumor Debulking" },
  { test: /foreign body.{0,24}bronch|inhaled foreign|airway foreign/i, name: "Foreign Body Removal by Bronchoscopy" },
  { test: /pleural biops/i, name: "Pleural Biopsy" },
  { test: /chest tube|intercostal drain|\bicd\b/i, name: "Chest Tube / Intercostal Drainage" },
  { test: /lung transplant/i, name: "Lung Transplantation" },
  { test: /bronchoscop/i, name: "Bronchoscopy" },
];

export function mapPulmonologyProcedures(texts: string[], fallback = true) {
  const found = applyRules(texts, PULMONOLOGY_RULES);
  const blob = texts.join(" ");
  if (/interventional pulmonol/i.test(blob)) {
    for (const name of [
      "Bronchoscopy",
      "EBUS (Endobronchial Ultrasound)",
      "TBNA (Transbronchial Needle Aspiration)",
    ] as const) {
      if (!found.includes(name)) found.push(name);
    }
  }
  if (found.length > 0 || !fallback) return found;
  return ["Bronchoscopy", "EBUS (Endobronchial Ultrasound)", "Medical Thoracoscopy"];
}

const PEDIATRIC_ORTHOPAEDIC_RULES: {
  test: RegExp;
  name: (typeof PEDIATRIC_ORTHOPAEDIC_PROCEDURES)[number];
}[] = [
  { test: /\bscfe\b|slipped capital femoral/i, name: "SCFE Hip Surgery (Slipped Capital Femoral Epiphysis)" },
  { test: /\bddh\b|developmental dysplasia|hip dysplasia/i, name: "Developmental Dysplasia of Hip Surgery" },
  { test: /clubfoot|talipes|\bctev\b|ponseti/i, name: "Clubfoot Correction Surgery" },
  { test: /pediatric scoliosis|paediatric scoliosis|child.{0,12}scoliosis/i, name: "Pediatric Scoliosis Surgery" },
  { test: /\bscoliosis\b|growing rod/i, name: "Pediatric Scoliosis Surgery" },
  {
    test: /pediatric spinal deformity|paediatric spinal deformity|congenital scoliosis|neuromuscular scoliosis/i,
    name: "Pediatric Spinal Deformity Correction",
  },
  { test: /cerebral palsy|semls\b|single-event multilevel/i, name: "Cerebral Palsy Orthopedic Surgery" },
  { test: /hip preservation|periacetabular|impingement/i, name: "Hip Preservation Surgery" },
  { test: /pediatric hip reconstr|paediatric hip reconstr|pelvic osteotomy|perthes/i, name: "Pediatric Hip Reconstruction" },
  { test: /limb lengthen|ilizarov.{0,12}length/i, name: "Limb Lengthening Surgery" },
  { test: /limb reconstr/i, name: "Limb Reconstruction Surgery" },
  { test: /pediatric foot|paediatric foot|pediatric ankle|paediatric ankle/i, name: "Pediatric Foot & Ankle Surgery" },
  { test: /tendon repair|tendon transfer/i, name: "Tendon Repair Surgery" },
  { test: /fracture fixation|k[\s-]*wire|elastic nailing|\btens\b/i, name: "Pediatric Fracture Fixation" },
  { test: /pediatric fracture|paediatric fracture|child.{0,12}fracture/i, name: "Pediatric Fracture Surgery" },
  { test: /pediatric deformity|paediatric deformity|limb deformity|\bdeformity\b/i, name: "Pediatric Deformity Correction" },
];

export function mapPediatricOrthopaedicProcedures(texts: string[], fallback = true) {
  const found = applyRules(texts, PEDIATRIC_ORTHOPAEDIC_RULES);
  if (found.length > 0 || !fallback) return found;
  return [
    "Clubfoot Correction Surgery",
    "Pediatric Fracture Surgery",
    "Developmental Dysplasia of Hip Surgery",
  ];
}

const ORTHOPEDICS_RULES: { test: RegExp; name: (typeof ORTHOPEDICS_PROCEDURES)[number] }[] = [
  { test: /robotic knee|mako.{0,12}knee|rosa knee/i, name: "Robotic Knee Replacement" },
  { test: /revision knee|knee revision/i, name: "Revision Knee Replacement" },
  { test: /partial knee|unicompartmental|\buka\b/i, name: "Partial Knee Replacement" },
  { test: /total knee|\btkr\b|\btka\b|knee replacement/i, name: "Total Knee Replacement" },
  { test: /revision hip|hip revision/i, name: "Revision Hip Replacement" },
  { test: /hip resurfac/i, name: "Hip Resurfacing" },
  { test: /total hip|\bthr\b|\btha\b|hip replacement/i, name: "Total Hip Replacement" },
  { test: /joint replacement/i, name: "Total Knee Replacement" },
  { test: /joint replacement/i, name: "Total Hip Replacement" },
  { test: /shoulder replacement|reverse shoulder|shoulder arthroplast/i, name: "Shoulder Replacement" },
  { test: /sports medicine|sports injur|sports.{0,20}orthop/i, name: "ACL Reconstruction (Anterior Cruciate Ligament)" },
  { test: /sports medicine|sports injur|sports.{0,20}orthop/i, name: "Arthroscopic Surgery" },
  { test: /\bpcl\b|posterior cruciate/i, name: "PCL Reconstruction (Posterior Cruciate Ligament)" },
  { test: /\bacl\b|anterior cruciate/i, name: "ACL Reconstruction (Anterior Cruciate Ligament)" },
  { test: /meniscus/i, name: "Meniscus Repair" },
  { test: /rotator cuff/i, name: "Rotator Cuff Repair" },
  { test: /arthroscop/i, name: "Arthroscopic Surgery" },
  { test: /non[\s-]*union/i, name: "Non-Union Repair" },
  { test: /\borif\b|open reduction/i, name: "ORIF (Open Reduction and Internal Fixation)" },
  { test: /fracture fixation|internal fixation/i, name: "Fracture Fixation" },
  { test: /carpal tunnel/i, name: "Carpal Tunnel Release" },
  { test: /hand reconstr/i, name: "Hand Reconstruction" },
  { test: /tendon repair/i, name: "Tendon Repair" },
  { test: /ankle replacement|ankle arthroplast/i, name: "Ankle Replacement" },
  { test: /bunion|hallux valgus/i, name: "Bunion Surgery" },
  { test: /achilles/i, name: "Achilles Repair" },
];

export function mapOrthopedicsProcedures(texts: string[], fallback = true) {
  const found = applyRules(texts, ORTHOPEDICS_RULES);
  if (found.length > 0 || !fallback) return found;
  return [
    "Total Knee Replacement",
    "ACL Reconstruction (Anterior Cruciate Ligament)",
    "Fracture Fixation",
  ];
}

const OPHTHALMOLOGY_RULES: { test: RegExp; name: (typeof OPHTHALMOLOGY_PROCEDURES)[number] }[] = [
  { test: /femto.{0,20}cataract|flacs|femtosecond.{0,20}cataract/i, name: "Femto Laser Cataract Surgery" },
  { test: /phacoemulsif|phaco cataract|\bphaco\b/i, name: "Phacoemulsification Cataract Surgery" },
  { test: /pediatric cataract|paediatric cataract|congenital cataract/i, name: "Pediatric Cataract Surgery" },
  { test: /cataract/i, name: "Cataract Surgery" },
  { test: /relex smile|smile eye|\bsmile\b.{0,16}(laser|lenticule|refract)/i, name: "SMILE Eye Surgery" },
  { test: /\bicl\b|collamer|implantable contact lens/i, name: "ICL (Implantable Collamer Lens)" },
  { test: /lasik|laser vision correction|\bprk\b/i, name: "LASIK Eye Surgery" },
  { test: /\bdmek\b|descemet membrane endothelial/i, name: "DMEK" },
  { test: /\bdsek\b|\bdsaek\b|descemet stripping/i, name: "DSEK" },
  { test: /\bdalk\b|deep anterior lamellar/i, name: "DALK" },
  { test: /corneal transplant|penetrating keratoplasty|\bkeratoplasty\b/i, name: "Corneal Transplantation" },
  { test: /cross[\s-]*link|\bc3r\b|collagen cross/i, name: "Corneal Cross-Linking (C3R)" },
  { test: /laser glaucoma|\bslt\b|selective laser trabeculoplasty/i, name: "Laser Glaucoma Surgery" },
  { test: /trabeculectomy/i, name: "Trabeculectomy" },
  { test: /drainage device|ahmed valve|baerveldt|glaucoma valve/i, name: "Glaucoma Drainage Device / Valve Implantation" },
  { test: /glaucoma/i, name: "Glaucoma Surgery" },
  { test: /macular hole/i, name: "Macular Hole Surgery" },
  { test: /retinal detach/i, name: "Retinal Detachment Surgery" },
  { test: /anti[\s-]*vegf|intravitreal|avastin|lucentis|eylea/i, name: "Intravitreal Anti-VEGF Injection" },
  { test: /vitrectomy/i, name: "Vitrectomy" },
  { test: /squint|strabismus/i, name: "Squint / Strabismus Surgery" },
  { test: /eyelid reconstr/i, name: "Eyelid Reconstruction Surgery" },
  { test: /blepharoplasty/i, name: "Blepharoplasty" },
  { test: /\bdcr\b|dacryocyst|tear duct/i, name: "Dacryocystorhinostomy (DCR) / Tear Duct Surgery" },
  { test: /oculoplast|orbit/i, name: "Oculoplastic Surgery" },
];

export function mapOphthalmologyProcedures(texts: string[], fallback = true) {
  const found = applyRules(texts, OPHTHALMOLOGY_RULES);
  if (found.length > 0 || !fallback) return found;
  return ["Cataract Surgery", "LASIK Eye Surgery", "Glaucoma Surgery"];
}

const GYNECOLOGY_RULES: { test: RegExp; name: (typeof GYNECOLOGY_PROCEDURES)[number] }[] = [
  { test: /robotic hysterect/i, name: "Robotic Hysterectomy" },
  { test: /laparoscopic hysterect|tlh\b|lap hysterect/i, name: "Laparoscopic Hysterectomy" },
  { test: /vaginal hysterect|\btvh\b/i, name: "Vaginal Hysterectomy" },
  { test: /abdominal hysterect|tah\b|open hysterect/i, name: "Abdominal Hysterectomy" },
  { test: /radical hysterect/i, name: "Radical Hysterectomy" },
  { test: /robotic myomect/i, name: "Robotic Myomectomy" },
  { test: /laparoscopic myomect|lap myomect/i, name: "Laparoscopic Myomectomy" },
  { test: /hysteroscopic myomect|hysteroscopic.{0,12}fibroid/i, name: "Hysteroscopic Myomectomy" },
  { test: /endometriosis/i, name: "Endometriosis Surgery" },
  { test: /polypectomy|endometrial polyp/i, name: "Hysteroscopic Polypectomy" },
  { test: /ovarian cyst|cystectom/i, name: "Ovarian Cyst Surgery" },
  { test: /salpingo[\s-]*oophorect/i, name: "Salpingo-Oophorectomy" },
  { test: /oophorect/i, name: "Oophorectomy" },
  { test: /pelvic organ prolapse|vault prolapse|uterine prolapse/i, name: "Pelvic Organ Prolapse Surgery" },
  { test: /pelvic floor/i, name: "Pelvic Floor Repair" },
  { test: /gynae?cologic cancer|cervical cancer surgery|endometrial cancer surgery|ovarian cancer/i, name: "Gynecologic Cancer Surgery" },
  { test: /hysterect/i, name: "Laparoscopic Hysterectomy" },
  { test: /myomect|fibroid/i, name: "Laparoscopic Myomectomy" },
];

export function mapGynecologyProcedures(texts: string[], fallback = true) {
  const found = applyRules(texts, GYNECOLOGY_RULES);
  if (found.length > 0 || !fallback) return found;
  return ["Laparoscopic Hysterectomy", "Laparoscopic Myomectomy", "Endometriosis Surgery"];
}

const NEUROSURGERY_RULES: { test: RegExp; name: (typeof NEUROSURGERY_PROCEDURES)[number] }[] = [
  { test: /glioma/i, name: "Glioma Surgery" },
  { test: /meningioma/i, name: "Meningioma Surgery" },
  { test: /pituitary/i, name: "Pituitary Tumor Surgery" },
  { test: /spinal tumor|spine tumor|intradural|intramedullary/i, name: "Spinal Tumor Surgery" },
  { test: /brain tumor|brain tumour|craniotom/i, name: "Brain Tumor Surgery" },
  { test: /endoscopic skull|endonasal|transsphenoidal/i, name: "Endoscopic Skull Base Surgery" },
  { test: /endoscopic brain|neuroendoscop/i, name: "Endoscopic Brain Surgery" },
  { test: /skull base/i, name: "Skull Base Surgery" },
  { test: /stereotactic.{0,12}biopsy|brain biopsy/i, name: "Stereotactic Brain Biopsy" },
  { test: /aneurysm clip/i, name: "Aneurysm Clipping" },
  { test: /aneurysm coil|coiling/i, name: "Aneurysm Coiling" },
  { test: /avm embol/i, name: "AVM Embolization" },
  { test: /\bavm\b|arteriovenous malformation/i, name: "AVM Surgery" },
  { test: /thrombectomy|mechanical thromb/i, name: "Stroke Thrombectomy" },
  { test: /cerebral bypass|sta[\s-]*mca|moyamoya/i, name: "Cerebral Bypass" },
  { test: /\bdbs\b|deep brain stim/i, name: "Deep Brain Stimulation" },
  { test: /epilepsy/i, name: "Epilepsy Surgery" },
  { test: /gamma\s*knife/i, name: "Gamma Knife" },
  { test: /cyber\s*knife/i, name: "CyberKnife" },
  { test: /\bsrs\b|stereotactic radio/i, name: "Stereotactic Radiosurgery (SRS)" },
  { test: /stereotactic/i, name: "Stereotactic Brain Surgery" },
  { test: /\betv\b|third ventriculostom/i, name: "Endoscopic Third Ventriculostomy (ETV)" },
  { test: /hydrocephalus|vp shunt|ventriculoperitoneal/i, name: "Hydrocephalus Surgery" },
  { test: /chiari/i, name: "Chiari Surgery" },
  { test: /craniosynostos/i, name: "Craniosynostosis Surgery" },
];

export function mapNeurosurgeryProcedures(texts: string[], fallback = true) {
  const found = applyRules(texts, NEUROSURGERY_RULES);
  if (found.length > 0 || !fallback) return found;
  return ["Brain Tumor Surgery", "Aneurysm Clipping", "Deep Brain Stimulation"];
}

const NEUROLOGY_RULES: { test: RegExp; name: (typeof NEUROLOGY_PROCEDURES)[number] }[] = [
  { test: /video\s*eeg|v-?eeg|long[\s-]*term.{0,12}eeg|epilepsy monitor/i, name: "Video EEG" },
  { test: /\bvns\b|vagus nerve stim/i, name: "Vagus Nerve Stimulation (VNS)" },
  { test: /\beeg\b|electroencephal|epilepsy|seizure/i, name: "EEG" },
  { test: /nerve conduction|\bncs\b|\bncv\b|neuropathy|entrapment/i, name: "Nerve Conduction Study" },
  { test: /\bemg\b|electromyograph|myopath/i, name: "Electromyography (EMG)" },
  { test: /evoked potential|\bvep\b|\bbaer\b|\bssep\b|multiple sclerosis/i, name: "Evoked Potentials" },
  { test: /lumbar puncture|spinal tap|csf\b/i, name: "Lumbar Puncture" },
  { test: /thrombectomy|mechanical thromb/i, name: "Stroke Thrombectomy" },
  { test: /thrombolys|alteplase|tenecteplase|\btpa\b|iv tpa|\bstroke\b|\btia\b|cerebrovascular/i, name: "IV Thrombolysis" },
  { test: /transcranial doppler|\btcd\b/i, name: "Transcranial Doppler (TCD)" },
  { test: /carotid doppler|carotid duplex|carotid ultrasound|carotid stenosis/i, name: "Carotid Doppler" },
  { test: /\bdbs\b|deep brain stim|parkinson|movement disorder|tremor/i, name: "Deep Brain Stimulation" },
  { test: /mrgfus|focused ultrasound|hifu.{0,12}brain/i, name: "MRI-Guided Focused Ultrasound (MRgFUS)" },
  { test: /botulinum|botox|dystonia|spasticity|hemifacial/i, name: "Botulinum Toxin Therapy" },
  { test: /plasmapheresis|plasma exchange|\bplex\b/i, name: "Plasmapheresis" },
  { test: /\bivig\b|intravenous immunoglobulin|myasthenia|cidp|guillain/i, name: "IVIG (Intravenous Immunoglobulin)" },
  { test: /nerve.{0,8}biopsy|muscle.{0,8}biopsy|nerve\/muscle/i, name: "Nerve and Muscle Biopsy" },
  { test: /sleep study|polysomnograph|\bpsg\b|sleep apn|narcolepsy/i, name: "Sleep Study (Polysomnography)" },
  { test: /migraine|occipital.{0,8}block|nerve block.{0,12}migraine|headache/i, name: "Migraine Nerve Block" },
];

export function mapNeurologyProcedures(texts: string[], fallback = true) {
  const found = applyRules(texts, NEUROLOGY_RULES);
  if (found.length > 0 || !fallback) return found;
  return ["EEG", "Electromyography (EMG)", "IV Thrombolysis"];
}

const NEPHROLOGY_RULES: { test: RegExp; name: (typeof NEPHROLOGY_PROCEDURES)[number] }[] = [
  { test: /paired kidney|swap transplant|kidney exchange|kidney paired/i, name: "Paired Kidney Exchange (Swap Transplant)" },
  { test: /abo[\s-]*incompat/i, name: "ABO-Incompatible Kidney Transplantation" },
  { test: /living donor kidney|live donor kidney/i, name: "Living Donor Kidney Transplantation" },
  { test: /deceased donor kidney|cadaver.{0,12}kidney/i, name: "Deceased Donor Kidney Transplantation" },
  { test: /graft biopsy|allograft biopsy|transplant biopsy/i, name: "Kidney Transplant Graft Biopsy" },
  { test: /transplant evaluation|transplant follow|post[\s-]*transplant/i, name: "Kidney Transplant Evaluation and Follow-up" },
  { test: /kidney transplant|renal transplant/i, name: "Kidney Transplantation" },
  { test: /\bcrrt\b|continuous renal replacement/i, name: "Continuous Renal Replacement Therapy (CRRT)" },
  { test: /\bsled\b|sustained low[\s-]*efficiency/i, name: "Sustained Low-Efficiency Dialysis (SLED)" },
  { test: /peritoneal dialysis|\bcapd\b|\bapd\b/i, name: "Peritoneal Dialysis" },
  { test: /hemodialysis|haemodialysis|maintenance dialysis|\bdialysis\b|ckd|esrd|end[\s-]*stage kidney|chronic kidney/i, name: "Hemodialysis" },
  { test: /capd catheter|pd catheter|peritoneal catheter/i, name: "CAPD Catheter Insertion" },
  { test: /permcath|perm[\s-]*cath|tunnelled.{0,12}catheter|cuffed catheter/i, name: "Central Venous Catheter (Permcath) Insertion" },
  { test: /dialysis catheter|vascath|non[\s-]*tunnel/i, name: "Dialysis Catheter Placement" },
  { test: /av fistula|arteriovenous fistula|cimino/i, name: "AV Fistula Creation" },
  { test: /dialysis access|fistuloplasty|access thromb/i, name: "Dialysis Access Management" },
  { test: /renal biopsy|kidney biopsy|native.{0,8}biopsy|glomerulo|nephrotic/i, name: "Percutaneous Renal Biopsy" },
  { test: /plasmapheresis|plasma exchange|\bplex\b/i, name: "Plasmapheresis" },
];

export function mapNephrologyProcedures(texts: string[], fallback = true) {
  const found = applyRules(texts, NEPHROLOGY_RULES);
  if (found.length > 0 || !fallback) return found;
  return ["Hemodialysis", "Kidney Transplantation", "Percutaneous Renal Biopsy"];
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
  if (specialty === "Cosmetic Surgery") {
    const found = mapCosmeticProcedures(texts);
    const blob = texts.join(" ");
    // Reconstructive breast surgery is listed on plastic-surgery records and is the
    // same catalog procedure as surgical-oncology Breast Reconstruction.
    if (/breast[\s-]*reconstr|reconstruction of the breast/i.test(blob)) {
      return found.includes("Breast Reconstruction") ? found : [...found, "Breast Reconstruction"];
    }
    return found;
  }
  if (specialty === "ENT") return mapEntProcedures(texts);
  if (specialty === "Gastroenterology") return mapGastroenterologyProcedures(texts);
  if (specialty === "Surgical Gastroenterology") {
    const found = mapSurgicalGastroenterologyProcedures(texts);
    const blob = texts.join(" ");
    const extras: string[] = [];
    const colorectal =
      /colectomy|hemicolectomy|colorectal cancer surg|colorectal surgeon/i.test(blob) ||
      (/colorectal resect/i.test(blob) && /colorectal cancer/i.test(blob));
    const rectal =
      /rectal cancer surg|low anterior|\blar\b|abdominoperineal|\bapr\b|total mesorectal|\btme\b|colorectal cancer surg|colorectal surgeon/i.test(
        blob,
      ) || (/colorectal resect/i.test(blob) && /colorectal cancer/i.test(blob));
    if (colorectal) extras.push("Colectomy");
    if (rectal) extras.push("Rectal Cancer Surgery");
    if (/whipple|pancreaticoduoden/i.test(blob)) extras.push("Whipple Procedure");
    return extras.length ? [...found, ...extras] : found;
  }
  if (specialty === "Urology") return mapUrologyProcedures(texts);
  if (specialty === "Spine Surgery") return mapSpineSurgeryProcedures(texts);
  if (specialty === "Pulmonology") return mapPulmonologyProcedures(texts);
  if (specialty === "Pediatric Orthopaedic") return mapPediatricOrthopaedicProcedures(texts);
  if (specialty === "Orthopedics") return mapOrthopedicsProcedures(texts);
  if (specialty === "Ophthalmology") return mapOphthalmologyProcedures(texts);
  if (specialty === "Gynecology") return mapGynecologyProcedures(texts);
  if (specialty === "Neurosurgery") return mapNeurosurgeryProcedures(texts);
  if (specialty === "Neurology") return mapNeurologyProcedures(texts);
  if (specialty === "Nephrology") return mapNephrologyProcedures(texts);
  return mapCatalogProcedures(texts);
}
