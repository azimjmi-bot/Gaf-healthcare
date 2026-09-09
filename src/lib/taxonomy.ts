/**
 * Canonical taxonomy for later programmatic SEO.
 * Paths should use slugs only: /doctors/{country}/{city}/{specialty}/{procedure}
 * Display names never go in the URL. Seeds must resolve through these tables.
 */

export type Taxon = {
  name: string;
  slug: string;
};

export type CityTaxon = Taxon & {
  countrySlug: string;
};

export type ProcedureTaxon = Taxon & {
  specialtySlug: string;
  specialtySlugs: string[];
};

export function toSlug(value: string) {
  return value
    .normalize("NFKD")
    .replace(/ı/g, "i")
    .replace(/İ/g, "i")
    .toLowerCase()
    .replace(/[()]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function taxon(name: string, slug = toSlug(name)): Taxon {
  return { name, slug };
}

export const COUNTRIES: Taxon[] = [
  taxon("India"),
  taxon("South Korea"),
  taxon("Türkiye", "turkiye"),
  taxon("Thailand"),
  taxon("United Arab Emirates"),
  taxon("Singapore"),
  taxon("Mexico"),
];

export const CITIES: CityTaxon[] = [
  { name: "Delhi NCR", slug: "delhi-ncr", countrySlug: "india" },
  { name: "Mumbai", slug: "mumbai", countrySlug: "india" },
  { name: "Bengaluru", slug: "bengaluru", countrySlug: "india" },
  { name: "Chennai", slug: "chennai", countrySlug: "india" },
  { name: "Hyderabad", slug: "hyderabad", countrySlug: "india" },
  { name: "Seoul", slug: "seoul", countrySlug: "south-korea" },
  { name: "Istanbul", slug: "istanbul", countrySlug: "turkiye" },
  { name: "Bangkok", slug: "bangkok", countrySlug: "thailand" },
  { name: "Dubai", slug: "dubai", countrySlug: "united-arab-emirates" },
  { name: "Singapore", slug: "singapore", countrySlug: "singapore" },
  { name: "Mexico City", slug: "mexico-city", countrySlug: "mexico" },
];

export const INDIA_CITIES = CITIES.filter((c) => c.countrySlug === "india").map((c) => c.name);

export const SPECIALTIES: Taxon[] = [
  taxon("Radiation Oncology"),
  taxon("Surgical Oncology"),
  taxon("Medical Oncology"),
  taxon("Hematology"),
  taxon("Pediatric Hematology"),
  taxon("Cardiac Surgery"),
  taxon("Pediatric Cardiac Surgery"),
  taxon("Cardiology"),
  taxon("Bariatric Surgery"),
  taxon("Cosmetic Surgery"),
  taxon("ENT"),
  taxon("Gastroenterology"),
  taxon("Surgical Gastroenterology"),
  taxon("Urology"),
  taxon("Spine Surgery"),
  taxon("Pulmonology"),
  taxon("Pediatric Orthopaedic"),
  taxon("Orthopedics"),
  taxon("Ophthalmology"),
  taxon("Gynecology"),
  taxon("Neurosurgery"),
  taxon("Neurology"),
];

export function compareSpecialties(aSlug: string, bSlug: string) {
  const ia = SPECIALTIES.findIndex((s) => s.slug === aSlug);
  const ib = SPECIALTIES.findIndex((s) => s.slug === bSlug);
  return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
}

export const RADIATION_PROCEDURES = [
  "External Beam Radiotherapy (EBRT)",
  "3D Conformal Radiotherapy (3D-CRT)",
  "Intensity-Modulated Radiotherapy (IMRT)",
  "Image-Guided Radiotherapy (IGRT)",
  "Stereotactic Radiosurgery (SRS)",
  "Stereotactic Body Radiotherapy (SBRT)",
  "CyberKnife",
  "Gamma Knife",
  "Proton Beam Therapy",
  "Brachytherapy",
  "Intracavitary Brachytherapy",
  "Interstitial Brachytherapy",
  "Plaque Brachytherapy",
  "Intraoperative Radiotherapy (IORT)",
  "Total Body Irradiation (TBI)",
] as const;

export const SURGICAL_ONCOLOGY_PROCEDURES = [
  "Breast-Conserving Surgery (Lumpectomy)",
  "Mastectomy",
  "Nipple-Sparing Mastectomy",
  "Oncoplastic Breast Surgery",
  "Breast Reconstruction",
  "Sentinel Lymph Node Biopsy",
  "Esophagectomy",
  "Gastrectomy",
  "Colectomy",
  "Rectal Cancer Surgery",
  "Liver Resection (Hepatectomy)",
  "Whipple Procedure",
  "Pancreatic Surgery",
  "Cytoreductive Surgery",
  "Cytoreductive Surgery with HIPEC",
  "PIPAC",
  "Radical Hysterectomy",
  "Ovarian Cancer Cytoreductive Surgery",
  "Thyroidectomy for Thyroid Cancer",
  "Neck Dissection",
  "Oral Cancer Surgery",
  "Transoral Robotic Surgery (TORS)",
  "Microvascular Free Flap Reconstruction",
  "Lung Cancer Surgery",
  "Lobectomy",
  "VATS Lung Surgery",
  "Robotic Thoracic Surgery",
  "Radical Prostatectomy",
  "Partial Nephrectomy",
  "Radical Cystectomy",
] as const;

export const MEDICAL_ONCOLOGY_PROCEDURES = [
  "Chemotherapy",
  "Immunotherapy",
  "Targeted Therapy",
  "Hormone Therapy",
  "Precision Oncology",
  "Molecular Targeted Therapy",
  "Immune Checkpoint Inhibitor Therapy",
  "Neoadjuvant Chemotherapy",
  "Adjuvant Chemotherapy",
  "Palliative Chemotherapy",
  "Antibody-Drug Conjugate Therapy",
  "Maintenance Therapy",
  "Intraperitoneal Chemotherapy",
  "Intrathecal Chemotherapy",
  "CAR-T Cell Therapy",
  "Bone Marrow Transplantation",
  "Stem Cell Transplantation",
  "Dendritic Cell Therapy",
] as const;

export const HEMATOLOGY_PROCEDURES = [
  "Bone Marrow Transplantation",
  "Stem Cell Transplantation",
  "Autologous Stem Cell Transplant",
  "Allogeneic Stem Cell Transplant",
  "Haploidentical Stem Cell Transplant",
  "CAR-T Cell Therapy",
  "Bone Marrow Biopsy",
  "Bone Marrow Aspiration",
  "Matched Unrelated Donor Transplant",
  "Intrathecal Chemotherapy",
] as const;

export const PEDIATRIC_HEMATOLOGY_PROCEDURES = [
  "Pediatric Bone Marrow Transplantation",
  "Haploidentical Stem Cell Transplant",
  "Allogeneic Stem Cell Transplant",
  "Autologous Stem Cell Transplant",
  "Matched Unrelated Donor Transplant",
  "Matched Sibling Donor Transplant",
  "CAR-T Cell Therapy",
  "Hematopoietic Stem Cell Transplantation",
  "Bone Marrow Biopsy",
  "Bone Marrow Aspiration",
] as const;

export const CARDIAC_SURGERY_PROCEDURES = [
  "CABG (Coronary Artery Bypass Grafting)",
  "Heart Valve Replacement",
  "Heart Valve Repair",
  "Heart Transplant Surgery",
  "Aortic Root Replacement",
  "Mitral Valve Repair",
  "Aortic Valve Replacement",
  "TAVR/TAVI (Transcatheter Aortic Valve Replacement)",
  "Aortic Aneurysm Surgery",
  "Minimally Invasive Cardiac Surgery",
  "Robotic Cardiac Surgery",
  "LVAD Implantation",
  "Redo CABG",
  "Double Valve Replacement",
  "Congenital Heart Surgery",
] as const;

export const PEDIATRIC_CARDIAC_SURGERY_PROCEDURES = [
  "ASD Closure (Atrial Septal Defect)",
  "VSD Closure (Ventricular Septal Defect)",
  "TOF Repair (Tetralogy of Fallot)",
  "Glenn Procedure",
  "Fontan Procedure",
  "Arterial Switch Operation",
  "PDA Closure (Patent Ductus Arteriosus)",
  "Norwood Procedure",
  "Coarctation Repair",
  "AVSD Repair (Atrioventricular Septal Defect)",
  "TAPVC Repair (Total Anomalous Pulmonary Venous Connection)",
  "Pediatric Heart Transplantation",
] as const;

export const CARDIOLOGY_PROCEDURES = [
  "Coronary Angioplasty & Stenting",
  "Coronary Angiography",
  "TAVR/TAVI (Transcatheter Aortic Valve Replacement)",
  "Atrial Fibrillation Ablation",
  "Pacemaker Implantation",
  "MitraClip",
  "ICD Implantation (Implantable Cardioverter-Defibrillator)",
  "CTO Angioplasty (Chronic Total Occlusion)",
  "Radiofrequency Ablation",
  "Balloon Mitral Valvotomy",
  "CRT/CRT-D Implantation",
  "ASD Device Closure",
  "Peripheral Angioplasty",
  "Carotid Artery Stenting",
  "Leadless Pacemaker Implantation",
] as const;

export const BARIATRIC_PROCEDURES = [
  "Sleeve Gastrectomy",
  "Gastric Bypass (Roux-en-Y)",
  "Mini Gastric Bypass (OAGB/MGB)",
  "Gastric Balloon",
  "Endoscopic Sleeve Gastroplasty (ESG)",
  "Metabolic Surgery for Type 2 Diabetes",
  "Gastric Sleeve Revision Surgery",
  "SADI-S Surgery",
  "Duodenal Switch (BPD/DS)",
  "Gastric Banding (Lap-Band)",
  "Gastric Band Removal",
] as const;

export const COSMETIC_PROCEDURES = [
  "Rhinoplasty",
  "Liposuction",
  "Breast Augmentation",
  "Tummy Tuck",
  "Breast Reduction",
  "Facelift",
  "Hair Transplant",
  "Breast Lift",
  "Blepharoplasty",
  "Gynecomastia Surgery",
  "Brazilian Butt Lift",
  "Fat Transfer",
  "Otoplasty",
  "Neck Lift",
  "Arm Lift",
] as const;

export const ENT_PROCEDURES = [
  "Cochlear Implantation",
  "FESS (Functional Endoscopic Sinus Surgery)",
  "Septoplasty",
  "Rhinoplasty",
  "Tympanoplasty",
  "Tonsillectomy",
  "Mastoidectomy",
  "Adenoidectomy",
  "Sleep Apnea Surgery",
  "Stapedectomy / Stapedotomy",
  "Balloon Sinuplasty",
  "BAHA Implantation (Bone Anchored Hearing Aid)",
  "Skull Base Surgery",
  "Head & Neck Cancer Surgery",
  "Thyroid Surgery",
  "Vocal Cord Surgery",
  "Microlaryngeal Surgery",
  "Transoral Robotic Surgery (TORS)",
] as const;

export const GASTROENTEROLOGY_PROCEDURES = [
  "Upper GI Endoscopy (Gastroscopy)",
  "Colonoscopy",
  "ERCP",
  "Endoscopic Ultrasound (EUS)",
  "Capsule Endoscopy",
  "Enteroscopy",
  "Biliary Stenting",
  "Bile Duct Stone Removal",
  "Cholangioscopy",
  "Peroral Endoscopic Myotomy (POEM)",
  "G-POEM",
  "Z-POEM",
  "Endoscopic Mucosal Resection (EMR)",
  "Endoscopic Submucosal Dissection (ESD)",
  "STER (Submucosal Tunneling Endoscopic Resection)",
  "Endoscopic Hemostasis",
  "Variceal Band Ligation",
  "Foreign Body Removal",
  "Liver Biopsy",
  "Transjugular Liver Biopsy",
  "PTBD (Percutaneous Transhepatic Biliary Drainage)",
  "Esophageal Manometry",
  "Anorectal Manometry",
  "Bariatric / Metabolic Endoscopy",
] as const;

export const SURGICAL_GASTROENTEROLOGY_PROCEDURES = [
  "Liver Transplantation",
  "Living Donor Liver Transplantation",
  "Deceased Donor Liver Transplantation",
  "Pediatric Liver Transplantation",
  "Liver Retransplantation",
  "Liver Resection (Hepatectomy)",
  "Whipple Procedure (Pancreaticoduodenectomy)",
  "Distal Pancreatectomy",
  "Pancreatectomy",
  "Biliary Reconstruction",
  "Gallbladder Cancer Surgery",
  "Bile Duct Cancer Surgery",
  "Gastrectomy",
  "Esophagectomy",
  "Anti-Reflux Surgery (Nissen Fundoplication)",
  "Hiatal Hernia Surgery",
  "Heller Myotomy for Achalasia",
  "Colorectal Cancer Surgery",
  "Colorectal Resection",
  "Low Anterior Resection (LAR)",
  "Abdominoperineal Resection (APR)",
  "Total Mesorectal Excision (TME)",
  "Ostomy / Stoma Surgery",
  "Sleeve Gastrectomy",
  "Gastric Bypass Surgery",
] as const;

export const UROLOGY_PROCEDURES = [
  "PCNL (Percutaneous Nephrolithotomy)",
  "RIRS (Retrograde Intrarenal Surgery)",
  "Ureteroscopy",
  "ESWL (Extracorporeal Shock Wave Lithotripsy)",
  "Pyeloplasty",
  "Partial Nephrectomy",
  "Radical Nephrectomy",
  "TURP (Transurethral Resection of the Prostate)",
  "HoLEP (Holmium Laser Enucleation)",
  "GreenLight Laser Surgery",
  "Radical Prostatectomy",
  "TURBT (Transurethral Resection of Bladder Tumor)",
  "Radical Cystectomy",
  "Bladder Reconstruction",
  "Urinary Diversion",
  "Kidney Transplantation",
  "Living Donor Kidney Transplantation",
  "Deceased Donor Kidney Transplantation",
  "ABO-Incompatible Kidney Transplantation",
  "Urethroplasty",
  "VIU (Visual Internal Urethrotomy)",
  "Urinary Tract Reconstruction",
  "Hypospadias Repair",
  "Pediatric Urological Surgery",
  "Penile Implant",
  "Varicocele Surgery",
] as const;

export const SPINE_SURGERY_PROCEDURES = [
  "Spinal Fusion",
  "PLIF (Posterior Lumbar Interbody Fusion)",
  "TLIF (Transforaminal Lumbar Interbody Fusion)",
  "ALIF (Anterior Lumbar Interbody Fusion)",
  "ACDF (Anterior Cervical Discectomy and Fusion)",
  "Discectomy",
  "Microdiscectomy",
  "Laminectomy",
  "Spinal Decompression",
  "Disc Replacement",
  "Scoliosis Correction",
  "Spinal Deformity Correction",
  "Vertebroplasty",
  "Kyphoplasty",
  "Spinal Tumor Surgery",
  "Revision Spine Surgery",
] as const;

export const PULMONOLOGY_PROCEDURES = [
  "Bronchoscopy",
  "EBUS (Endobronchial Ultrasound)",
  "Rigid Bronchoscopy",
  "Airway Stenting",
  "Medical Thoracoscopy",
  "Medical Pleuroscopy",
  "Transbronchial Lung Biopsy",
  "Cryo-Lung Biopsy",
  "Endobronchial Biopsy",
  "TBNA (Transbronchial Needle Aspiration)",
  "Bronchoscopic Tumor Debulking",
  "Foreign Body Removal by Bronchoscopy",
  "Pleural Biopsy",
  "Chest Tube / Intercostal Drainage",
  "Lung Transplantation",
] as const;

export const PEDIATRIC_ORTHOPAEDIC_PROCEDURES = [
  "Clubfoot Correction Surgery",
  "Pediatric Fracture Surgery",
  "Pediatric Deformity Correction",
  "Limb Lengthening Surgery",
  "Limb Reconstruction Surgery",
  "Developmental Dysplasia of Hip Surgery",
  "Pediatric Hip Reconstruction",
  "Hip Preservation Surgery",
  "Pediatric Scoliosis Surgery",
  "Pediatric Spinal Deformity Correction",
  "Cerebral Palsy Orthopedic Surgery",
  "Pediatric Foot & Ankle Surgery",
  "Pediatric Fracture Fixation",
  "Tendon Repair Surgery",
  "SCFE Hip Surgery (Slipped Capital Femoral Epiphysis)",
] as const;

export const ORTHOPEDICS_PROCEDURES = [
  "Total Knee Replacement",
  "Robotic Knee Replacement",
  "Partial Knee Replacement",
  "Revision Knee Replacement",
  "Total Hip Replacement",
  "Revision Hip Replacement",
  "Hip Resurfacing",
  "Shoulder Replacement",
  "ACL Reconstruction (Anterior Cruciate Ligament)",
  "PCL Reconstruction (Posterior Cruciate Ligament)",
  "Meniscus Repair",
  "Rotator Cuff Repair",
  "Arthroscopic Surgery",
  "Fracture Fixation",
  "ORIF (Open Reduction and Internal Fixation)",
  "Non-Union Repair",
  "Carpal Tunnel Release",
  "Tendon Repair",
  "Hand Reconstruction",
  "Ankle Replacement",
  "Bunion Surgery",
  "Achilles Repair",
] as const;

export const OPHTHALMOLOGY_PROCEDURES = [
  "Cataract Surgery",
  "Phacoemulsification Cataract Surgery",
  "Femto Laser Cataract Surgery",
  "LASIK Eye Surgery",
  "SMILE Eye Surgery",
  "ICL (Implantable Collamer Lens)",
  "Corneal Transplantation",
  "DMEK",
  "DSEK",
  "DALK",
  "Glaucoma Surgery",
  "Laser Glaucoma Surgery",
  "Trabeculectomy",
  "Glaucoma Drainage Device / Valve Implantation",
  "Vitrectomy",
  "Retinal Detachment Surgery",
  "Intravitreal Anti-VEGF Injection",
  "Macular Hole Surgery",
  "Pediatric Cataract Surgery",
  "Squint / Strabismus Surgery",
  "Oculoplastic Surgery",
  "Blepharoplasty",
  "Eyelid Reconstruction Surgery",
  "Dacryocystorhinostomy (DCR) / Tear Duct Surgery",
  "Corneal Cross-Linking (C3R)",
] as const;

export const GYNECOLOGY_PROCEDURES = [
  "Laparoscopic Hysterectomy",
  "Robotic Hysterectomy",
  "Vaginal Hysterectomy",
  "Abdominal Hysterectomy",
  "Laparoscopic Myomectomy",
  "Robotic Myomectomy",
  "Hysteroscopic Myomectomy",
  "Endometriosis Surgery",
  "Hysteroscopic Polypectomy",
  "Ovarian Cyst Surgery",
  "Oophorectomy",
  "Salpingo-Oophorectomy",
  "Pelvic Organ Prolapse Surgery",
  "Pelvic Floor Repair",
  "Radical Hysterectomy",
  "Gynecologic Cancer Surgery",
] as const;

export const NEUROSURGERY_PROCEDURES = [
  "Brain Tumor Surgery",
  "Glioma Surgery",
  "Meningioma Surgery",
  "Pituitary Tumor Surgery",
  "Spinal Tumor Surgery",
  "Skull Base Surgery",
  "Endoscopic Brain Surgery",
  "Endoscopic Skull Base Surgery",
  "Stereotactic Brain Biopsy",
  "Aneurysm Clipping",
  "Aneurysm Coiling",
  "AVM Surgery",
  "AVM Embolization",
  "Stroke Thrombectomy",
  "Cerebral Bypass",
  "Deep Brain Stimulation",
  "Epilepsy Surgery",
  "Stereotactic Brain Surgery",
  "Gamma Knife",
  "CyberKnife",
  "Stereotactic Radiosurgery (SRS)",
  "Hydrocephalus Surgery",
  "Endoscopic Third Ventriculostomy (ETV)",
  "Chiari Surgery",
  "Craniosynostosis Surgery",
] as const;

export const NEUROLOGY_PROCEDURES = [
  "EEG",
  "Video EEG",
  "Electromyography (EMG)",
  "Nerve Conduction Study",
  "Evoked Potentials",
  "Lumbar Puncture",
  "IV Thrombolysis",
  "Stroke Thrombectomy",
  "Transcranial Doppler (TCD)",
  "Carotid Doppler",
  "Deep Brain Stimulation",
  "MRI-Guided Focused Ultrasound (MRgFUS)",
  "Botulinum Toxin Therapy",
  "Plasmapheresis",
  "IVIG (Intravenous Immunoglobulin)",
  "Nerve and Muscle Biopsy",
  "Vagus Nerve Stimulation (VNS)",
  "Sleep Study (Polysomnography)",
  "Migraine Nerve Block",
] as const;

export const ATHENAA_SURGICAL_PROCEDURES = [
  "Breast-Conserving Surgery (Lumpectomy)",
  "Mastectomy",
  "Nipple-Sparing Mastectomy",
  "Oncoplastic Breast Surgery",
  "Breast Reconstruction",
  "Sentinel Lymph Node Biopsy",
  "Radical Hysterectomy",
  "Ovarian Cancer Cytoreductive Surgery",
] as const;

function procedureTaxon(name: string, specialtySlugs: string[]): ProcedureTaxon {
  return {
    name,
    slug: toSlug(name),
    specialtySlug: specialtySlugs[0],
    specialtySlugs,
  };
}

const HEMATOLOGY_NAMES = new Set<string>(HEMATOLOGY_PROCEDURES);
const OPHTHALMOLOGY_NAMES = new Set<string>(OPHTHALMOLOGY_PROCEDURES);
const GYNECOLOGY_NAMES = new Set<string>(GYNECOLOGY_PROCEDURES);
const NEUROSURGERY_NAMES = new Set<string>(NEUROSURGERY_PROCEDURES);
const NEUROLOGY_NAMES = new Set<string>(NEUROLOGY_PROCEDURES);
const RADIATION_NAMES = new Set<string>(RADIATION_PROCEDURES);
const SPINE_NAMES = new Set<string>(SPINE_SURGERY_PROCEDURES);
const COSMETIC_NAMES = new Set<string>(COSMETIC_PROCEDURES);
const PEDIATRIC_HEMATOLOGY_NAMES = new Set<string>(PEDIATRIC_HEMATOLOGY_PROCEDURES);
const CARDIOLOGY_NAMES = new Set<string>(CARDIOLOGY_PROCEDURES);
const ENT_NAMES = new Set<string>(ENT_PROCEDURES);
const SURGICAL_GASTRO_NAMES = new Set<string>(SURGICAL_GASTROENTEROLOGY_PROCEDURES);
const BARIATRIC_NAMES = new Set<string>(BARIATRIC_PROCEDURES);
const SURGICAL_ONCOLOGY_NAMES = new Set<string>(SURGICAL_ONCOLOGY_PROCEDURES);
const UROLOGY_NAMES = new Set<string>(UROLOGY_PROCEDURES);

function withPediatric(name: string, specs: string[]) {
  return PEDIATRIC_HEMATOLOGY_NAMES.has(name) ? [...specs, "pediatric-hematology"] : specs;
}

function withCardiology(name: string, specs: string[]) {
  return CARDIOLOGY_NAMES.has(name) ? [...specs, "cardiology"] : specs;
}

function withEnt(name: string, specs: string[]) {
  return ENT_NAMES.has(name) ? [...specs, "ent"] : specs;
}

function withSurgicalGastro(name: string, specs: string[]) {
  return SURGICAL_GASTRO_NAMES.has(name) ? [...specs, "surgical-gastroenterology"] : specs;
}

function withUrology(name: string, specs: string[]) {
  return UROLOGY_NAMES.has(name) ? [...specs, "urology"] : specs;
}

function withOphthalmology(name: string, specs: string[]) {
  return OPHTHALMOLOGY_NAMES.has(name) ? [...specs, "ophthalmology"] : specs;
}

function withGynecology(name: string, specs: string[]) {
  return GYNECOLOGY_NAMES.has(name) ? [...specs, "gynecology"] : specs;
}

function withNeurosurgery(name: string, specs: string[]) {
  return NEUROSURGERY_NAMES.has(name) ? [...specs, "neurosurgery"] : specs;
}

function withNeurology(name: string, specs: string[]) {
  return NEUROLOGY_NAMES.has(name) ? [...specs, "neurology"] : specs;
}

export const PROCEDURES: ProcedureTaxon[] = [
  ...RADIATION_PROCEDURES.map((name) => procedureTaxon(name, withNeurosurgery(name, ["radiation-oncology"]))),
  ...SURGICAL_ONCOLOGY_PROCEDURES.map((name) =>
    procedureTaxon(name, withGynecology(name, withUrology(name, withSurgicalGastro(name, withEnt(name, ["surgical-oncology"]))))),
  ),
  ...MEDICAL_ONCOLOGY_PROCEDURES.map((name) =>
    procedureTaxon(
      name,
      withPediatric(name, HEMATOLOGY_NAMES.has(name) ? ["medical-oncology", "hematology"] : ["medical-oncology"]),
    ),
  ),
  ...HEMATOLOGY_PROCEDURES.filter(
    (name) => !MEDICAL_ONCOLOGY_PROCEDURES.includes(name as (typeof MEDICAL_ONCOLOGY_PROCEDURES)[number]),
  ).map((name) => procedureTaxon(name, withPediatric(name, ["hematology"]))),
  ...PEDIATRIC_HEMATOLOGY_PROCEDURES.filter(
    (name) => !HEMATOLOGY_NAMES.has(name) && !MEDICAL_ONCOLOGY_PROCEDURES.includes(name as (typeof MEDICAL_ONCOLOGY_PROCEDURES)[number]),
  ).map((name) => procedureTaxon(name, ["pediatric-hematology"])),
  ...CARDIAC_SURGERY_PROCEDURES.map((name) => procedureTaxon(name, withCardiology(name, ["cardiac-surgery"]))),
  ...PEDIATRIC_CARDIAC_SURGERY_PROCEDURES.map((name) => procedureTaxon(name, ["pediatric-cardiac-surgery"])),
  ...CARDIOLOGY_PROCEDURES.filter(
    (name) => !CARDIAC_SURGERY_PROCEDURES.includes(name as (typeof CARDIAC_SURGERY_PROCEDURES)[number]),
  ).map((name) => procedureTaxon(name, ["cardiology"])),
  ...BARIATRIC_PROCEDURES.map((name) => procedureTaxon(name, withSurgicalGastro(name, ["bariatric-surgery"]))),
  ...COSMETIC_PROCEDURES.map((name) =>
    procedureTaxon(name, withOphthalmology(name, withEnt(name, ["cosmetic-surgery"]))),
  ),
  ...ENT_PROCEDURES.filter(
    (name) =>
      !COSMETIC_PROCEDURES.includes(name as (typeof COSMETIC_PROCEDURES)[number]) &&
      !SURGICAL_ONCOLOGY_PROCEDURES.includes(name as (typeof SURGICAL_ONCOLOGY_PROCEDURES)[number]),
  ).map((name) => procedureTaxon(name, withNeurosurgery(name, ["ent"]))),
  ...GASTROENTEROLOGY_PROCEDURES.map((name) => procedureTaxon(name, ["gastroenterology"])),
  ...SURGICAL_GASTROENTEROLOGY_PROCEDURES.filter(
    (name) => !SURGICAL_ONCOLOGY_NAMES.has(name) && !BARIATRIC_NAMES.has(name),
  ).map((name) => procedureTaxon(name, ["surgical-gastroenterology"])),
  ...UROLOGY_PROCEDURES.filter((name) => !SURGICAL_ONCOLOGY_NAMES.has(name)).map((name) =>
    procedureTaxon(name, ["urology"]),
  ),
  ...SPINE_SURGERY_PROCEDURES.map((name) => procedureTaxon(name, withNeurosurgery(name, ["spine-surgery"]))),
  ...PULMONOLOGY_PROCEDURES.map((name) => procedureTaxon(name, ["pulmonology"])),
  ...PEDIATRIC_ORTHOPAEDIC_PROCEDURES.map((name) => procedureTaxon(name, ["pediatric-orthopaedic"])),
  ...ORTHOPEDICS_PROCEDURES.map((name) => procedureTaxon(name, ["orthopedics"])),
  ...OPHTHALMOLOGY_PROCEDURES.filter((name) => !COSMETIC_NAMES.has(name)).map((name) =>
    procedureTaxon(name, ["ophthalmology"]),
  ),
  ...GYNECOLOGY_PROCEDURES.filter((name) => !SURGICAL_ONCOLOGY_NAMES.has(name)).map((name) =>
    procedureTaxon(name, ["gynecology"]),
  ),
  ...NEUROSURGERY_PROCEDURES.filter(
    (name) => !RADIATION_NAMES.has(name) && !SPINE_NAMES.has(name) && !ENT_NAMES.has(name),
  ).map((name) => procedureTaxon(name, withNeurology(name, ["neurosurgery"]))),
  ...NEUROLOGY_PROCEDURES.filter((name) => !NEUROSURGERY_NAMES.has(name)).map((name) =>
    procedureTaxon(name, ["neurology"]),
  ),
];

export const PROCEDURE_CLUSTERS = {
  linac: [
    "External Beam Radiotherapy (EBRT)",
    "3D Conformal Radiotherapy (3D-CRT)",
    "Intensity-Modulated Radiotherapy (IMRT)",
    "Image-Guided Radiotherapy (IGRT)",
  ],
  stereo: [
    "Stereotactic Radiosurgery (SRS)",
    "Stereotactic Body Radiotherapy (SBRT)",
    "CyberKnife",
    "Gamma Knife",
  ],
  complex: [
    "Proton Beam Therapy",
    "Brachytherapy",
    "Intracavitary Brachytherapy",
    "Interstitial Brachytherapy",
    "Plaque Brachytherapy",
    "Intraoperative Radiotherapy (IORT)",
    "Total Body Irradiation (TBI)",
  ],
} as const;

export type ProcedureCluster = keyof typeof PROCEDURE_CLUSTERS;

function indexByName<T extends Taxon>(rows: T[]) {
  return new Map(rows.map((row) => [row.name, row]));
}

function indexBySlug<T extends Taxon>(rows: T[]) {
  return new Map(rows.map((row) => [row.slug, row]));
}

const countriesByName = indexByName(COUNTRIES);
const countriesBySlug = indexBySlug(COUNTRIES);
const citiesByName = indexByName(CITIES);
const citiesBySlug = indexBySlug(CITIES);
const specialtiesByName = indexByName(SPECIALTIES);
const specialtiesBySlug = indexBySlug(SPECIALTIES);
const proceduresByName = indexByName(PROCEDURES);
const proceduresBySlug = indexBySlug(PROCEDURES);

export function getCountry(nameOrSlug: string) {
  return countriesByName.get(nameOrSlug) ?? countriesBySlug.get(nameOrSlug);
}

export function getCity(nameOrSlug: string) {
  return citiesByName.get(nameOrSlug) ?? citiesBySlug.get(nameOrSlug);
}

export function getSpecialty(nameOrSlug: string) {
  return specialtiesByName.get(nameOrSlug) ?? specialtiesBySlug.get(nameOrSlug);
}

export function getProcedure(nameOrSlug: string) {
  return proceduresByName.get(nameOrSlug) ?? proceduresBySlug.get(nameOrSlug);
}

export function citiesInCountry(countryNameOrSlug: string) {
  const country = getCountry(countryNameOrSlug);
  if (!country) return [];
  return CITIES.filter((c) => c.countrySlug === country.slug);
}

export function proceduresForSpecialty(specialtyNameOrSlug: string) {
  const specialty = getSpecialty(specialtyNameOrSlug);
  if (!specialty) return [];
  return PROCEDURES.filter((p) => p.specialtySlugs.includes(specialty.slug));
}

export function radiationProcedureSlug(name: string) {
  return toSlug(name);
}

function assertUnique(rows: Taxon[], label: string) {
  const slugs = new Set<string>();
  for (const row of rows) {
    if (slugs.has(row.slug)) {
      throw new Error(`Duplicate ${label} slug: ${row.slug}`);
    }
    slugs.add(row.slug);
  }
}

assertUnique(COUNTRIES, "country");
assertUnique(CITIES, "city");
assertUnique(SPECIALTIES, "specialty");
assertUnique(PROCEDURES, "procedure");

for (const city of CITIES) {
  if (!countriesBySlug.has(city.countrySlug)) {
    throw new Error(`City ${city.slug} points at unknown country ${city.countrySlug}`);
  }
}

for (const procedure of PROCEDURES) {
  for (const spec of procedure.specialtySlugs) {
    if (!specialtiesBySlug.has(spec)) {
      throw new Error(`Procedure ${procedure.slug} points at unknown specialty ${spec}`);
    }
  }
}
