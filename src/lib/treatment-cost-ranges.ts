/**
 * Cost ranges, category clusters, and shared-procedure exclusions for the
 * treatment catalog. Summary prose stays in the specialty modules so the
 * bare /costs directory can load this file without constructing it.
 */
export type CostRange = { us: string; partner: string; stay: string };

export const BARIATRIC_COST: Record<string, { us: string; partner: string; stay: string }> = {
  "Sleeve Gastrectomy": {
    us: "$15,000–$28,000",
    partner: "$4,500–$8,500",
    stay: "2–5 nights",
  },
  "Gastric Bypass (Roux-en-Y)": {
    us: "$20,000–$38,000",
    partner: "$6,000–$11,000",
    stay: "3–6 nights",
  },
  "Mini Gastric Bypass (OAGB/MGB)": {
    us: "$18,000–$35,000",
    partner: "$5,500–$10,000",
    stay: "3–6 nights",
  },
  "Gastric Balloon": {
    us: "$6,000–$12,000",
    partner: "$2,000–$4,500",
    stay: "Day-care or overnight",
  },
  "Endoscopic Sleeve Gastroplasty (ESG)": {
    us: "$12,000–$22,000",
    partner: "$4,500–$9,000",
    stay: "1–3 nights",
  },
  "Metabolic Surgery for Type 2 Diabetes": {
    us: "$20,000–$40,000",
    partner: "$6,000–$12,000",
    stay: "3–7 nights",
  },
  "Gastric Sleeve Revision Surgery": {
    us: "$22,000–$45,000",
    partner: "$7,000–$14,000",
    stay: "3–7 nights",
  },
  "SADI-S Surgery": {
    us: "$25,000–$48,000",
    partner: "$8,000–$16,000",
    stay: "4–8 nights",
  },
  "Duodenal Switch (BPD/DS)": {
    us: "$28,000–$55,000",
    partner: "$9,000–$18,000",
    stay: "5–10 nights",
  },
  "Gastric Banding (Lap-Band)": {
    us: "$10,000–$22,000",
    partner: "$3,500–$7,500",
    stay: "1–3 nights",
  },
  "Gastric Band Removal": {
    us: "$6,000–$15,000",
    partner: "$2,200–$5,500",
    stay: "1–3 nights",
  },
};


export const CARDIAC_SURGERY_COST: Record<string, { us: string; partner: string; stay: string }> = {
  "CABG (Coronary Artery Bypass Grafting)": {
    us: "$70,000–$200,000",
    partner: "$5,500–$14,000",
    stay: "7–14 nights, then nearby recovery",
  },
  "Heart Valve Replacement": {
    us: "$80,000–$220,000",
    partner: "$7,000–$18,000",
    stay: "8–16 nights",
  },
  "Heart Valve Repair": {
    us: "$75,000–$200,000",
    partner: "$6,500–$16,500",
    stay: "7–14 nights",
  },
  "Heart Transplant Surgery": {
    us: "$800,000–$1,700,000",
    partner: "$45,000–$95,000",
    stay: "6–12 weeks nearby after listing",
  },
  "Aortic Root Replacement": {
    us: "$90,000–$250,000",
    partner: "$10,000–$24,000",
    stay: "10–18 nights",
  },
  "Mitral Valve Repair": {
    us: "$80,000–$210,000",
    partner: "$7,500–$18,000",
    stay: "7–14 nights",
  },
  "Aortic Valve Replacement": {
    us: "$80,000–$220,000",
    partner: "$7,000–$18,500",
    stay: "8–16 nights",
  },
  "TAVR/TAVI (Transcatheter Aortic Valve Replacement)": {
    us: "$50,000–$150,000",
    partner: "$18,000–$42,000",
    stay: "3–7 nights typical",
  },
  "Aortic Aneurysm Surgery": {
    us: "$90,000–$260,000",
    partner: "$9,000–$22,000",
    stay: "8–16 nights",
  },
  "Minimally Invasive Cardiac Surgery": {
    us: "$75,000–$210,000",
    partner: "$8,000–$20,000",
    stay: "5–12 nights",
  },
  "Robotic Cardiac Surgery": {
    us: "$90,000–$250,000",
    partner: "$10,000–$24,000",
    stay: "5–12 nights",
  },
  "LVAD Implantation": {
    us: "$250,000–$600,000",
    partner: "$70,000–$140,000",
    stay: "3–8 weeks with device training",
  },
  "Redo CABG": {
    us: "$90,000–$250,000",
    partner: "$8,500–$20,000",
    stay: "10–18 nights",
  },
  "Double Valve Replacement": {
    us: "$110,000–$280,000",
    partner: "$12,000–$28,000",
    stay: "10–18 nights",
  },
  "Congenital Heart Surgery": {
    us: "$80,000–$250,000",
    partner: "$8,000–$28,000",
    stay: "7–21 nights; parent stay expected",
  },
};


export const CARDIOLOGY_COST: Record<string, { us: string; partner: string; stay: string }> = {
  "Coronary Angioplasty & Stenting": {
    us: "$25,000–$70,000",
    partner: "$3,200–$8,500",
    stay: "1–3 nights typical",
  },
  "Coronary Angiography": {
    us: "$5,000–$15,000",
    partner: "$400–$1,200",
    stay: "Day-care or overnight",
  },
  "Atrial Fibrillation Ablation": {
    us: "$40,000–$90,000",
    partner: "$6,500–$16,000",
    stay: "1–3 nights",
  },
  "Pacemaker Implantation": {
    us: "$20,000–$50,000",
    partner: "$3,500–$9,000",
    stay: "1–3 nights",
  },
  MitraClip: {
    us: "$70,000–$150,000",
    partner: "$18,000–$38,000",
    stay: "3–7 nights",
  },
  "ICD Implantation (Implantable Cardioverter-Defibrillator)": {
    us: "$40,000–$100,000",
    partner: "$8,000–$18,000",
    stay: "1–4 nights",
  },
  "CTO Angioplasty (Chronic Total Occlusion)": {
    us: "$35,000–$85,000",
    partner: "$5,500–$14,000",
    stay: "1–4 nights",
  },
  "Radiofrequency Ablation": {
    us: "$30,000–$75,000",
    partner: "$5,000–$13,000",
    stay: "1–3 nights",
  },
  "Balloon Mitral Valvotomy": {
    us: "$25,000–$60,000",
    partner: "$4,000–$10,000",
    stay: "2–5 nights",
  },
  "CRT/CRT-D Implantation": {
    us: "$45,000–$110,000",
    partner: "$10,000–$22,000",
    stay: "2–5 nights",
  },
  "ASD Device Closure": {
    us: "$30,000–$70,000",
    partner: "$5,000–$12,000",
    stay: "1–3 nights",
  },
  "Peripheral Angioplasty": {
    us: "$20,000–$55,000",
    partner: "$3,000–$8,500",
    stay: "1–3 nights",
  },
  "Carotid Artery Stenting": {
    us: "$25,000–$65,000",
    partner: "$5,500–$13,000",
    stay: "1–4 nights",
  },
  "Leadless Pacemaker Implantation": {
    us: "$40,000–$90,000",
    partner: "$12,000–$25,000",
    stay: "1–3 nights",
  },
};


export const COSMETIC_COST: Record<string, { us: string; partner: string; stay: string }> = {
  Rhinoplasty: {
    us: "$8,000–$18,000",
    partner: "$2,500–$5,500",
    stay: "1–3 nights",
  },
  Liposuction: {
    us: "$4,000–$12,000",
    partner: "$1,500–$4,200",
    stay: "Day-care to 2 nights",
  },
  "Breast Augmentation": {
    us: "$6,500–$15,000",
    partner: "$3,000–$6,500",
    stay: "1–3 nights",
  },
  "Tummy Tuck": {
    us: "$8,000–$16,000",
    partner: "$3,500–$7,200",
    stay: "2–5 nights",
  },
  "Breast Reduction": {
    us: "$8,000–$16,000",
    partner: "$3,200–$6,800",
    stay: "1–4 nights",
  },
  Facelift: {
    us: "$12,000–$28,000",
    partner: "$4,000–$9,500",
    stay: "1–4 nights",
  },
  "Hair Transplant": {
    us: "$4,000–$15,000",
    partner: "$1,500–$5,000",
    stay: "Day-care; grafts quoted separately",
  },
  "Breast Lift": {
    us: "$7,000–$15,000",
    partner: "$3,000–$6,500",
    stay: "1–3 nights",
  },
  Blepharoplasty: {
    us: "$4,000–$9,000",
    partner: "$1,500–$3,800",
    stay: "Day-care or overnight",
  },
  "Gynecomastia Surgery": {
    us: "$5,000–$11,000",
    partner: "$1,800–$4,200",
    stay: "1–2 nights",
  },
  "Brazilian Butt Lift": {
    us: "$8,000–$18,000",
    partner: "$3,500–$8,000",
    stay: "2–5 nights",
  },
  "Fat Transfer": {
    us: "$4,000–$12,000",
    partner: "$2,000–$5,500",
    stay: "1–3 nights",
  },
  Otoplasty: {
    us: "$4,000–$8,500",
    partner: "$1,500–$3,500",
    stay: "Day-care or overnight",
  },
  "Neck Lift": {
    us: "$8,000–$18,000",
    partner: "$3,500–$7,800",
    stay: "1–4 nights",
  },
  "Arm Lift": {
    us: "$6,000–$13,000",
    partner: "$2,800–$6,200",
    stay: "1–3 nights",
  },
};


export const ENT_COST: Record<string, { us: string; partner: string; stay: string }> = {
  "Cochlear Implantation": {
    us: "$50,000–$100,000",
    partner: "$15,000–$32,000",
    stay: "3–7 nights; mapping follows",
  },
  "FESS (Functional Endoscopic Sinus Surgery)": {
    us: "$8,000–$20,000",
    partner: "$2,000–$5,200",
    stay: "1–3 nights",
  },
  Septoplasty: {
    us: "$5,000–$12,000",
    partner: "$1,500–$3,800",
    stay: "Day-care or overnight",
  },
  Tympanoplasty: {
    us: "$8,000–$18,000",
    partner: "$2,000–$4,800",
    stay: "1–3 nights",
  },
  Tonsillectomy: {
    us: "$4,000–$10,000",
    partner: "$1,000–$2,600",
    stay: "1–2 nights",
  },
  Mastoidectomy: {
    us: "$15,000–$32,000",
    partner: "$3,500–$7,500",
    stay: "2–5 nights",
  },
  Adenoidectomy: {
    us: "$4,000–$9,000",
    partner: "$800–$2,200",
    stay: "Day-care or overnight",
  },
  "Sleep Apnea Surgery": {
    us: "$15,000–$40,000",
    partner: "$4,000–$10,000",
    stay: "2–5 nights",
  },
  "Stapedectomy / Stapedotomy": {
    us: "$10,000–$25,000",
    partner: "$2,500–$6,200",
    stay: "1–3 nights",
  },
  "Balloon Sinuplasty": {
    us: "$6,000–$15,000",
    partner: "$2,000–$5,000",
    stay: "Day-care or overnight",
  },
  "BAHA Implantation (Bone Anchored Hearing Aid)": {
    us: "$20,000–$45,000",
    partner: "$8,000–$16,000",
    stay: "1–3 nights; processor fitting follows",
  },
  "Skull Base Surgery": {
    us: "$40,000–$110,000",
    partner: "$8,000–$22,000",
    stay: "5–12 nights",
  },
  "Head & Neck Cancer Surgery": {
    us: "$25,000–$80,000",
    partner: "$5,000–$16,000",
    stay: "5–14 nights",
  },
  "Thyroid Surgery": {
    us: "$12,000–$30,000",
    partner: "$2,500–$6,800",
    stay: "1–4 nights",
  },
  "Vocal Cord Surgery": {
    us: "$8,000–$20,000",
    partner: "$2,000–$5,200",
    stay: "Day-care to 2 nights",
  },
  "Microlaryngeal Surgery": {
    us: "$8,000–$18,000",
    partner: "$2,000–$5,000",
    stay: "Day-care to 2 nights",
  },
};


export const GASTROENTEROLOGY_COST: Record<string, { us: string; partner: string; stay: string }> = {
  "Upper GI Endoscopy (Gastroscopy)": {
    us: "$1,200–$3,500",
    partner: "$150–$450",
    stay: "Day-care",
  },
  Colonoscopy: {
    us: "$2,000–$5,000",
    partner: "$200–$550",
    stay: "Day-care",
  },
  ERCP: {
    us: "$8,000–$22,000",
    partner: "$1,500–$4,200",
    stay: "Day-care to 2 nights",
  },
  "Endoscopic Ultrasound (EUS)": {
    us: "$3,000–$9,000",
    partner: "$400–$1,400",
    stay: "Day-care",
  },
  "Capsule Endoscopy": {
    us: "$1,800–$4,500",
    partner: "$400–$950",
    stay: "Outpatient",
  },
  Enteroscopy: {
    us: "$4,500–$12,000",
    partner: "$800–$2,600",
    stay: "Day-care to overnight",
  },
  "Biliary Stenting": {
    us: "$10,000–$25,000",
    partner: "$2,000–$5,500",
    stay: "1–3 nights",
  },
  "Bile Duct Stone Removal": {
    us: "$8,000–$20,000",
    partner: "$1,800–$5,000",
    stay: "Day-care to 2 nights",
  },
  Cholangioscopy: {
    us: "$12,000–$28,000",
    partner: "$2,500–$6,500",
    stay: "Day-care to 2 nights",
  },
  "Peroral Endoscopic Myotomy (POEM)": {
    us: "$18,000–$40,000",
    partner: "$4,000–$9,500",
    stay: "2–4 nights",
  },
  "G-POEM": {
    us: "$14,000–$32,000",
    partner: "$3,500–$8,200",
    stay: "2–4 nights",
  },
  "Z-POEM": {
    us: "$16,000–$35,000",
    partner: "$4,000–$8,800",
    stay: "2–4 nights",
  },
  "Endoscopic Mucosal Resection (EMR)": {
    us: "$4,000–$12,000",
    partner: "$800–$2,600",
    stay: "Day-care to overnight",
  },
  "Endoscopic Submucosal Dissection (ESD)": {
    us: "$8,000–$22,000",
    partner: "$2,000–$5,800",
    stay: "1–3 nights",
  },
  "STER (Submucosal Tunneling Endoscopic Resection)": {
    us: "$15,000–$35,000",
    partner: "$4,000–$10,000",
    stay: "2–4 nights",
  },
  "Endoscopic Hemostasis": {
    us: "$3,000–$12,000",
    partner: "$500–$1,800",
    stay: "Overnight to 3 nights",
  },
  "Variceal Band Ligation": {
    us: "$2,500–$8,000",
    partner: "$400–$1,500",
    stay: "Overnight to 2 nights",
  },
  "Foreign Body Removal": {
    us: "$2,000–$8,000",
    partner: "$300–$1,200",
    stay: "Day-care to overnight",
  },
  "Liver Biopsy": {
    us: "$2,000–$5,500",
    partner: "$250–$800",
    stay: "Day-care to overnight",
  },
  "Transjugular Liver Biopsy": {
    us: "$4,000–$12,000",
    partner: "$800–$2,400",
    stay: "Overnight to 2 nights",
  },
  "PTBD (Percutaneous Transhepatic Biliary Drainage)": {
    us: "$8,000–$22,000",
    partner: "$1,500–$4,500",
    stay: "2–5 nights",
  },
  "Esophageal Manometry": {
    us: "$800–$2,200",
    partner: "$150–$420",
    stay: "Outpatient",
  },
  "Anorectal Manometry": {
    us: "$600–$1,800",
    partner: "$120–$380",
    stay: "Outpatient",
  },
  "Bariatric / Metabolic Endoscopy": {
    us: "$8,000–$22,000",
    partner: "$2,500–$6,800",
    stay: "Day-care to 2 nights",
  },
};


export const GYNECOLOGY_COST: Record<string, { us: string; partner: string; stay: string }> = {
  "Laparoscopic Hysterectomy": {
    us: "$15,000–$35,000",
    partner: "$3,000–$7,000",
    stay: "1–3 nights",
  },
  "Robotic Hysterectomy": {
    us: "$20,000–$45,000",
    partner: "$5,000–$10,000",
    stay: "1–3 nights",
  },
  "Vaginal Hysterectomy": {
    us: "$12,000–$28,000",
    partner: "$2,500–$6,000",
    stay: "1–3 nights",
  },
  "Abdominal Hysterectomy": {
    us: "$15,000–$35,000",
    partner: "$3,000–$7,500",
    stay: "2–5 nights",
  },
  "Laparoscopic Myomectomy": {
    us: "$12,000–$30,000",
    partner: "$2,800–$7,000",
    stay: "1–3 nights",
  },
  "Robotic Myomectomy": {
    us: "$18,000–$40,000",
    partner: "$4,500–$9,000",
    stay: "1–3 nights",
  },
  "Hysteroscopic Myomectomy": {
    us: "$6,000–$15,000",
    partner: "$1,200–$3,500",
    stay: "Outpatient or 1 night",
  },
  "Endometriosis Surgery": {
    us: "$15,000–$40,000",
    partner: "$3,000–$8,000",
    stay: "1–3 nights",
  },
  "Hysteroscopic Polypectomy": {
    us: "$4,000–$10,000",
    partner: "$800–$2,500",
    stay: "Outpatient",
  },
  "Ovarian Cyst Surgery": {
    us: "$8,000–$20,000",
    partner: "$1,800–$4,500",
    stay: "1–2 nights",
  },
  Oophorectomy: {
    us: "$10,000–$25,000",
    partner: "$2,000–$5,500",
    stay: "1–3 nights",
  },
  "Salpingo-Oophorectomy": {
    us: "$12,000–$28,000",
    partner: "$2,500–$6,500",
    stay: "1–3 nights",
  },
  "Pelvic Organ Prolapse Surgery": {
    us: "$15,000–$35,000",
    partner: "$3,000–$7,500",
    stay: "2–4 nights",
  },
  "Pelvic Floor Repair": {
    us: "$12,000–$30,000",
    partner: "$2,500–$6,500",
    stay: "1–3 nights",
  },
  "Gynecologic Cancer Surgery": {
    us: "$20,000–$50,000",
    partner: "$5,000–$12,000",
    stay: "3–7 nights",
  },
};


export const GYNECOLOGY_CLUSTER_BY_PROCEDURE: Record<string, string> = {
  "Laparoscopic Hysterectomy": "Hysterectomy",
  "Robotic Hysterectomy": "Hysterectomy",
  "Vaginal Hysterectomy": "Hysterectomy",
  "Abdominal Hysterectomy": "Hysterectomy",
  "Laparoscopic Myomectomy": "Myomectomy",
  "Robotic Myomectomy": "Myomectomy",
  "Hysteroscopic Myomectomy": "Myomectomy",
  "Endometriosis Surgery": "Benign Gynecology",
  "Hysteroscopic Polypectomy": "Benign Gynecology",
  "Ovarian Cyst Surgery": "Benign Gynecology",
  Oophorectomy: "Benign Gynecology",
  "Salpingo-Oophorectomy": "Benign Gynecology",
  "Pelvic Organ Prolapse Surgery": "Pelvic Floor",
  "Pelvic Floor Repair": "Pelvic Floor",
  "Gynecologic Cancer Surgery": "Gynecologic Oncology",
};


export const DENTISTRY_COST: Record<string, { us: string; partner: string; stay: string }> = {
  "Dental Implants": {
    us: "$3,000–$6,500",
    partner: "$350–$900",
    stay: "Outpatient or 1 night",
  },
  "Full Mouth Dental Implants": {
    us: "$25,000–$60,000",
    partner: "$4,500–$15,000",
    stay: "3–7 nights",
  },
  "Dental Crowns and Bridges": {
    us: "$2,500–$8,000",
    partner: "$800–$3,500",
    stay: "Outpatient",
  },
  Dentures: {
    us: "$1,500–$5,000",
    partner: "$300–$1,200",
    stay: "Outpatient",
  },
  "Full Mouth Rehabilitation": {
    us: "$20,000–$50,000",
    partner: "$3,500–$12,000",
    stay: "5–14 nights",
  },
  "Braces and Orthodontic Treatment": {
    us: "$5,000–$10,000",
    partner: "$800–$2,500",
    stay: "Outpatient",
  },
  "Clear Aligners": {
    us: "$3,500–$8,000",
    partner: "$1,200–$3,500",
    stay: "Outpatient",
  },
  "Wisdom Tooth Removal": {
    us: "$800–$3,000",
    partner: "$100–$500",
    stay: "Outpatient or 1 night",
  },
  "Jaw Surgery": {
    us: "$20,000–$50,000",
    partner: "$4,000–$12,000",
    stay: "2–5 nights",
  },
  "Root Canal Treatment": {
    us: "$1,000–$2,500",
    partner: "$80–$350",
    stay: "Outpatient",
  },
  "Gum Surgery": {
    us: "$2,000–$6,000",
    partner: "$400–$1,500",
    stay: "Outpatient or 1 night",
  },
  "Smile Makeover": {
    us: "$8,000–$25,000",
    partner: "$1,500–$6,000",
    stay: "Outpatient",
  },
  "Dental Veneers": {
    us: "$8,000–$20,000",
    partner: "$1,200–$4,500",
    stay: "Outpatient",
  },
  "Teeth Whitening": {
    us: "$400–$1,200",
    partner: "$80–$350",
    stay: "Outpatient",
  },
  "Dental Fillings": {
    us: "$200–$600",
    partner: "$25–$120",
    stay: "Outpatient",
  },
  "Tooth Extraction": {
    us: "$200–$800",
    partner: "$30–$150",
    stay: "Outpatient",
  },
};

export const DENTISTRY_CLUSTER_BY_PROCEDURE: Record<string, string> = {
  "Dental Implants": "Implants",
  "Full Mouth Dental Implants": "Implants",
  "Dental Crowns and Bridges": "Restorative",
  Dentures: "Restorative",
  "Dental Fillings": "Restorative",
  "Full Mouth Rehabilitation": "Rehabilitation",
  "Smile Makeover": "Rehabilitation",
  "Braces and Orthodontic Treatment": "Orthodontics",
  "Clear Aligners": "Orthodontics",
  "Wisdom Tooth Removal": "Oral Surgery",
  "Jaw Surgery": "Oral Surgery",
  "Tooth Extraction": "Oral Surgery",
  "Root Canal Treatment": "Endodontics",
  "Gum Surgery": "Periodontics",
  "Dental Veneers": "Cosmetic Dentistry",
  "Teeth Whitening": "Cosmetic Dentistry",
};

export const INFERTILITY_IVF_COST: Record<string, { us: string; partner: string; stay: string }> = {
  "IVF Treatment": {
    us: "$12,000–$25,000",
    partner: "$2,500–$5,500",
    stay: "14–21 days",
  },
  "ICSI Treatment": {
    us: "$13,000–$28,000",
    partner: "$2,800–$6,000",
    stay: "14–21 days",
  },
  "IUI Treatment": {
    us: "$500–$4,000",
    partner: "$150–$700",
    stay: "Outpatient",
  },
  "IMSI Treatment": {
    us: "$14,000–$30,000",
    partner: "$3,200–$6,500",
    stay: "14–21 days",
  },
  "Frozen Embryo Transfer (FET)": {
    us: "$3,000–$7,000",
    partner: "$700–$1,800",
    stay: "7–14 days",
  },
  "Blastocyst Transfer": {
    us: "$3,500–$8,000",
    partner: "$800–$2,000",
    stay: "7–14 days",
  },
  "Donor Egg IVF": {
    us: "$20,000–$40,000",
    partner: "$4,500–$9,000",
    stay: "14–28 days",
  },
  "Donor Sperm IVF": {
    us: "$14,000–$30,000",
    partner: "$3,000–$6,500",
    stay: "14–21 days",
  },
  "Ovulation Induction": {
    us: "$500–$3,000",
    partner: "$100–$600",
    stay: "Outpatient",
  },
  "Ovarian Stimulation": {
    us: "$2,000–$8,000",
    partner: "$400–$1,800",
    stay: "8–14 days",
  },
  "Egg Freezing": {
    us: "$8,000–$18,000",
    partner: "$1,800–$4,000",
    stay: "10–16 days",
  },
  "Embryo Freezing": {
    us: "$1,000–$4,000",
    partner: "$250–$800",
    stay: "Laboratory episode",
  },
  "Fertility Preservation": {
    us: "$8,000–$20,000",
    partner: "$2,000–$5,000",
    stay: "7–16 days",
  },
  "PGT-A Testing": {
    us: "$3,000–$8,000",
    partner: "$800–$2,500",
    stay: "Laboratory episode",
  },
  "PGT-M / PGD Testing": {
    us: "$5,000–$12,000",
    partner: "$1,500–$4,000",
    stay: "Laboratory episode",
  },
  "Embryo Biopsy": {
    us: "$1,500–$4,000",
    partner: "$400–$1,200",
    stay: "Laboratory episode",
  },
  Hysteroscopy: {
    us: "$3,000–$10,000",
    partner: "$700–$2,500",
    stay: "Outpatient or 1 night",
  },
  Laparoscopy: {
    us: "$6,000–$18,000",
    partner: "$1,500–$4,500",
    stay: "0–2 nights",
  },
  "Micro-TESE": {
    us: "$8,000–$20,000",
    partner: "$1,800–$4,500",
    stay: "0–2 nights",
  },
  "TESE / TESA": {
    us: "$4,000–$12,000",
    partner: "$800–$2,500",
    stay: "Outpatient or 1 night",
  },
  "PESA / MESA": {
    us: "$4,000–$12,000",
    partner: "$800–$2,800",
    stay: "Outpatient or 1 night",
  },
  "Fibroid Removal (Myomectomy)": {
    us: "$10,000–$30,000",
    partner: "$2,500–$7,000",
    stay: "1–3 nights",
  },
  "Ovarian Cyst Removal": {
    us: "$8,000–$20,000",
    partner: "$1,800–$4,500",
    stay: "0–2 nights",
  },
};

export const INFERTILITY_IVF_CLUSTER_BY_PROCEDURE: Record<string, string> = {
  "IVF Treatment": "IVF and ICSI",
  "ICSI Treatment": "IVF and ICSI",
  "IMSI Treatment": "IVF and ICSI",
  "Donor Egg IVF": "IVF and ICSI",
  "Donor Sperm IVF": "IVF and ICSI",
  "IUI Treatment": "IUI and Induction",
  "Ovulation Induction": "IUI and Induction",
  "Ovarian Stimulation": "IUI and Induction",
  "Frozen Embryo Transfer (FET)": "Embryo Transfer and Freezing",
  "Blastocyst Transfer": "Embryo Transfer and Freezing",
  "Egg Freezing": "Embryo Transfer and Freezing",
  "Embryo Freezing": "Embryo Transfer and Freezing",
  "Fertility Preservation": "Embryo Transfer and Freezing",
  "PGT-A Testing": "Genetic Testing",
  "PGT-M / PGD Testing": "Genetic Testing",
  "Embryo Biopsy": "Genetic Testing",
  Hysteroscopy: "Fertility Surgery",
  Laparoscopy: "Fertility Surgery",
  "Micro-TESE": "Male Fertility Surgery",
  "TESE / TESA": "Male Fertility Surgery",
  "PESA / MESA": "Male Fertility Surgery",
  "Fibroid Removal (Myomectomy)": "Fertility Surgery",
  "Ovarian Cyst Removal": "Fertility Surgery",
};


export const HEMATOLOGY_COST: Record<string, { us: string; partner: string; stay: string }> = {
  "Autologous Stem Cell Transplant": {
    us: "$140,000–$320,000",
    partner: "$18,000–$48,000",
    stay: "3–5 weeks in or near the unit",
  },
  "Allogeneic Stem Cell Transplant": {
    us: "$200,000–$420,000",
    partner: "$30,000–$80,000",
    stay: "6–10 weeks nearby",
  },
  "Haploidentical Stem Cell Transplant": {
    us: "$220,000–$450,000",
    partner: "$35,000–$85,000",
    stay: "6–10 weeks nearby",
  },
  "Bone Marrow Biopsy": {
    us: "$2,000–$6,000",
    partner: "$300–$900",
    stay: "Day-care",
  },
  "Bone Marrow Aspiration": {
    us: "$1,500–$5,000",
    partner: "$250–$800",
    stay: "Day-care",
  },
  "Matched Unrelated Donor Transplant": {
    us: "$250,000–$500,000",
    partner: "$40,000–$95,000",
    stay: "6–12 weeks nearby",
  },
};


export const MEDICAL_COST: Record<string, { us: string; partner: string; stay: string }> = {
  Chemotherapy: {
    us: "$10,000–$50,000",
    partner: "$1,500–$8,000+",
    stay: "Outpatient cycles · 3–6 months typical",
  },
  Immunotherapy: {
    us: "$100,000–$250,000",
    partner: "$15,000–$45,000",
    stay: "Outpatient q2–6 weeks",
  },
  "Targeted Therapy": {
    us: "$80,000–$160,000",
    partner: "$8,000–$30,000",
    stay: "Oral or infusion · months of therapy",
  },
  "Hormone Therapy": {
    us: "$5,000–$25,000",
    partner: "$1,000–$4,500",
    stay: "Outpatient · often years of tablets",
  },
  "Precision Oncology": {
    us: "$8,000–$25,000",
    partner: "$2,000–$7,000",
    stay: "NGS panel + clinic visit",
  },
  "Molecular Targeted Therapy": {
    us: "$90,000–$180,000",
    partner: "$10,000–$32,000",
    stay: "Oral or infusion by mutation",
  },
  "Immune Checkpoint Inhibitor Therapy": {
    us: "$120,000–$280,000",
    partner: "$18,000–$50,000",
    stay: "Outpatient infusions q2–6 weeks",
  },
  "Neoadjuvant Chemotherapy": {
    us: "$15,000–$45,000",
    partner: "$2,500–$10,000",
    stay: "Cycles before surgery · 2–4 months",
  },
  "Adjuvant Chemotherapy": {
    us: "$15,000–$45,000",
    partner: "$2,500–$10,000",
    stay: "Cycles after surgery · 3–6 months",
  },
  "Palliative Chemotherapy": {
    us: "$8,000–$35,000",
    partner: "$1,500–$7,000",
    stay: "Outpatient · goal is control, not cure",
  },
  "Antibody-Drug Conjugate Therapy": {
    us: "$150,000–$320,000",
    partner: "$25,000–$70,000",
    stay: "Infusion day-care · weeks to months",
  },
  "Maintenance Therapy": {
    us: "$20,000–$90,000",
    partner: "$4,000–$18,000",
    stay: "Lower-intensity cycles after induction",
  },
  "Intraperitoneal Chemotherapy": {
    us: "$20,000–$55,000",
    partner: "$5,000–$14,000",
    stay: "Tied to cytoreduction or IP ports",
  },
  "Intrathecal Chemotherapy": {
    us: "$15,000–$40,000",
    partner: "$3,000–$10,000",
    stay: "Day-care LP or Ommaya access",
  },
  "CAR-T Cell Therapy": {
    us: "$400,000–$550,000",
    partner: "$80,000–$180,000",
    stay: "Apheresis + 3–6 weeks nearby",
  },
  "Bone Marrow Transplantation": {
    us: "$150,000–$400,000",
    partner: "$25,000–$70,000",
    stay: "4–8 weeks in or near the unit",
  },
  "Stem Cell Transplantation": {
    us: "$140,000–$380,000",
    partner: "$22,000–$65,000",
    stay: "Auto or allo · 3–8 weeks",
  },
  "Dendritic Cell Therapy": {
    us: "$30,000–$80,000",
    partner: "$8,000–$22,000",
    stay: "Leukapheresis + staged infusions",
  },
};


export const NEPHROLOGY_COST: Record<string, { us: string; partner: string; stay: string }> = {
  "Paired Kidney Exchange (Swap Transplant)": {
    us: "$150,000–$400,000",
    partner: "$15,000–$30,000",
    stay: "7–14 nights",
  },
  "Kidney Transplant Evaluation and Follow-up": {
    us: "$3,000–$8,000",
    partner: "$400–$1,200",
    stay: "Outpatient",
  },
  Hemodialysis: {
    us: "$70,000–$150,000 / year",
    partner: "$8,000–$18,000 / year",
    stay: "Three sessions a week typical",
  },
  "Peritoneal Dialysis": {
    us: "$50,000–$90,000 / year",
    partner: "$6,000–$14,000 / year",
    stay: "Training 3–7 nights, then home",
  },
  "Continuous Renal Replacement Therapy (CRRT)": {
    us: "$8,000–$25,000",
    partner: "$1,500–$4,500",
    stay: "ICU days as quoted",
  },
  "Sustained Low-Efficiency Dialysis (SLED)": {
    us: "$5,000–$15,000",
    partner: "$1,000–$3,200",
    stay: "ICU or HDU days as quoted",
  },
  "Dialysis Catheter Placement": {
    us: "$2,000–$6,000",
    partner: "$400–$1,200",
    stay: "Outpatient or 1 night",
  },
  "AV Fistula Creation": {
    us: "$8,000–$20,000",
    partner: "$1,200–$3,500",
    stay: "Day-care or 1–2 nights",
  },
  "Dialysis Access Management": {
    us: "$3,000–$10,000",
    partner: "$500–$1,800",
    stay: "Outpatient or 1 night",
  },
  "Percutaneous Renal Biopsy": {
    us: "$3,000–$8,000",
    partner: "$400–$1,200",
    stay: "Day-care or 1 night",
  },
  "Kidney Transplant Graft Biopsy": {
    us: "$4,000–$10,000",
    partner: "$600–$1,500",
    stay: "Day-care or 1 night",
  },
  "CAPD Catheter Insertion": {
    us: "$6,000–$15,000",
    partner: "$1,000–$2,800",
    stay: "1–3 nights",
  },
  "Central Venous Catheter (Permcath) Insertion": {
    us: "$3,000–$8,000",
    partner: "$500–$1,500",
    stay: "Outpatient or 1 night",
  },
};


export const NEPHROLOGY_CLUSTER_BY_PROCEDURE: Record<string, string> = {
  "Kidney Transplantation": "Kidney Transplantation",
  "Living Donor Kidney Transplantation": "Kidney Transplantation",
  "Deceased Donor Kidney Transplantation": "Kidney Transplantation",
  "ABO-Incompatible Kidney Transplantation": "Kidney Transplantation",
  "Paired Kidney Exchange (Swap Transplant)": "Kidney Transplantation",
  "Kidney Transplant Evaluation and Follow-up": "Kidney Transplantation",
  Hemodialysis: "Dialysis & Renal Replacement",
  "Peritoneal Dialysis": "Dialysis & Renal Replacement",
  "Continuous Renal Replacement Therapy (CRRT)": "Dialysis & Renal Replacement",
  "Sustained Low-Efficiency Dialysis (SLED)": "Dialysis & Renal Replacement",
  Plasmapheresis: "Dialysis & Renal Replacement",
  "Dialysis Catheter Placement": "Interventional & Access",
  "AV Fistula Creation": "Interventional & Access",
  "Dialysis Access Management": "Interventional & Access",
  "CAPD Catheter Insertion": "Interventional & Access",
  "Central Venous Catheter (Permcath) Insertion": "Interventional & Access",
  "Percutaneous Renal Biopsy": "Diagnostics & Biopsy",
  "Kidney Transplant Graft Biopsy": "Diagnostics & Biopsy",
};


export const NEPHROLOGY_SHARED = [
  "Kidney Transplantation",
  "Living Donor Kidney Transplantation",
  "Deceased Donor Kidney Transplantation",
  "ABO-Incompatible Kidney Transplantation",
  "Plasmapheresis",
] as const;

export const NEUROLOGY_COST: Record<string, { us: string; partner: string; stay: string }> = {
  EEG: {
    us: "$400–$1,500",
    partner: "$80–$250",
    stay: "Outpatient",
  },
  "Video EEG": {
    us: "$3,000–$15,000",
    partner: "$800–$2,500",
    stay: "1–5 nights of monitoring",
  },
  "Electromyography (EMG)": {
    us: "$400–$1,500",
    partner: "$80–$280",
    stay: "Outpatient",
  },
  "Nerve Conduction Study": {
    us: "$350–$1,200",
    partner: "$70–$220",
    stay: "Outpatient",
  },
  "Evoked Potentials": {
    us: "$300–$1,200",
    partner: "$70–$220",
    stay: "Outpatient",
  },
  "Lumbar Puncture": {
    us: "$1,500–$4,000",
    partner: "$200–$600",
    stay: "Outpatient or 1 night",
  },
  "IV Thrombolysis": {
    us: "$10,000–$30,000",
    partner: "$1,500–$4,500",
    stay: "3–7 nights (stroke ICU)",
  },
  "Transcranial Doppler (TCD)": {
    us: "$400–$1,200",
    partner: "$80–$250",
    stay: "Outpatient",
  },
  "Carotid Doppler": {
    us: "$300–$900",
    partner: "$50–$180",
    stay: "Outpatient",
  },
  "MRI-Guided Focused Ultrasound (MRgFUS)": {
    us: "$40,000–$80,000",
    partner: "$12,000–$25,000",
    stay: "1–3 nights",
  },
  "Botulinum Toxin Therapy": {
    us: "$1,500–$4,000",
    partner: "$250–$800",
    stay: "Outpatient",
  },
  Plasmapheresis: {
    us: "$8,000–$25,000",
    partner: "$1,500–$4,500",
    stay: "5–10 sessions typical",
  },
  "IVIG (Intravenous Immunoglobulin)": {
    us: "$10,000–$40,000",
    partner: "$2,000–$8,000",
    stay: "2–5 infusion days",
  },
  "Nerve and Muscle Biopsy": {
    us: "$4,000–$12,000",
    partner: "$800–$2,500",
    stay: "Outpatient or 1 night",
  },
  "Vagus Nerve Stimulation (VNS)": {
    us: "$30,000–$60,000",
    partner: "$8,000–$18,000",
    stay: "1–3 nights",
  },
  "Sleep Study (Polysomnography)": {
    us: "$1,500–$5,000",
    partner: "$250–$700",
    stay: "1 night in the sleep lab",
  },
  "Migraine Nerve Block": {
    us: "$800–$2,500",
    partner: "$150–$500",
    stay: "Outpatient",
  },
};


export const NEUROLOGY_CLUSTER_BY_PROCEDURE: Record<string, string> = {
  EEG: "Neurodiagnostics",
  "Video EEG": "Neurodiagnostics",
  "Electromyography (EMG)": "Neurodiagnostics",
  "Nerve Conduction Study": "Neurodiagnostics",
  "Evoked Potentials": "Neurodiagnostics",
  "Lumbar Puncture": "Neurodiagnostics",
  "IV Thrombolysis": "Stroke & Neurovascular",
  "Stroke Thrombectomy": "Stroke & Neurovascular",
  "Transcranial Doppler (TCD)": "Stroke & Neurovascular",
  "Carotid Doppler": "Stroke & Neurovascular",
  "Deep Brain Stimulation": "Movement Disorders",
  "MRI-Guided Focused Ultrasound (MRgFUS)": "Movement Disorders",
  "Botulinum Toxin Therapy": "Movement Disorders",
  Plasmapheresis: "Neuromuscular",
  "IVIG (Intravenous Immunoglobulin)": "Neuromuscular",
  "Nerve and Muscle Biopsy": "Neuromuscular",
  "Vagus Nerve Stimulation (VNS)": "Epilepsy",
  "Sleep Study (Polysomnography)": "Sleep / Headache",
  "Migraine Nerve Block": "Sleep / Headache",
};


export const NEUROLOGY_SHARED = ["Deep Brain Stimulation", "Stroke Thrombectomy"] as const;

export const NEUROSURGERY_COST: Record<string, { us: string; partner: string; stay: string }> = {
  "Brain Tumor Surgery": {
    us: "$50,000–$150,000",
    partner: "$6,000–$15,000",
    stay: "5–10 nights",
  },
  "Glioma Surgery": {
    us: "$55,000–$160,000",
    partner: "$7,000–$16,000",
    stay: "5–12 nights",
  },
  "Meningioma Surgery": {
    us: "$50,000–$140,000",
    partner: "$6,500–$15,000",
    stay: "5–10 nights",
  },
  "Pituitary Tumor Surgery": {
    us: "$40,000–$100,000",
    partner: "$5,000–$12,000",
    stay: "3–7 nights",
  },
  "Skull Base Surgery": {
    us: "$60,000–$180,000",
    partner: "$8,000–$20,000",
    stay: "6–12 nights",
  },
  "Endoscopic Brain Surgery": {
    us: "$30,000–$80,000",
    partner: "$5,000–$12,000",
    stay: "3–7 nights",
  },
  "Endoscopic Skull Base Surgery": {
    us: "$40,000–$110,000",
    partner: "$6,000–$15,000",
    stay: "4–8 nights",
  },
  "Stereotactic Brain Biopsy": {
    us: "$10,000–$25,000",
    partner: "$2,000–$6,000",
    stay: "1–3 nights",
  },
  "Aneurysm Clipping": {
    us: "$50,000–$120,000",
    partner: "$8,000–$18,000",
    stay: "7–14 nights",
  },
  "Aneurysm Coiling": {
    us: "$50,000–$150,000",
    partner: "$10,000–$25,000",
    stay: "3–8 nights",
  },
  "AVM Surgery": {
    us: "$50,000–$130,000",
    partner: "$8,000–$20,000",
    stay: "7–14 nights",
  },
  "AVM Embolization": {
    us: "$40,000–$100,000",
    partner: "$8,000–$18,000",
    stay: "2–6 nights",
  },
  "Stroke Thrombectomy": {
    us: "$40,000–$90,000",
    partner: "$8,000–$16,000",
    stay: "5–12 nights",
  },
  "Cerebral Bypass": {
    us: "$60,000–$150,000",
    partner: "$10,000–$22,000",
    stay: "7–14 nights",
  },
  "Deep Brain Stimulation": {
    us: "$70,000–$150,000",
    partner: "$20,000–$40,000",
    stay: "3–7 nights",
  },
  "Epilepsy Surgery": {
    us: "$50,000–$150,000",
    partner: "$8,000–$20,000",
    stay: "5–10 nights",
  },
  "Stereotactic Brain Surgery": {
    us: "$30,000–$80,000",
    partner: "$6,000–$15,000",
    stay: "2–5 nights",
  },
  "Hydrocephalus Surgery": {
    us: "$20,000–$50,000",
    partner: "$3,000–$8,000",
    stay: "3–7 nights",
  },
  "Endoscopic Third Ventriculostomy (ETV)": {
    us: "$20,000–$50,000",
    partner: "$3,000–$8,000",
    stay: "2–5 nights",
  },
  "Chiari Surgery": {
    us: "$30,000–$80,000",
    partner: "$5,000–$12,000",
    stay: "4–8 nights",
  },
  "Craniosynostosis Surgery": {
    us: "$40,000–$100,000",
    partner: "$6,000–$15,000",
    stay: "4–8 nights",
  },
};


export const NEUROSURGERY_CLUSTER_BY_PROCEDURE: Record<string, string> = {
  "Brain Tumor Surgery": "Neuro-Oncology",
  "Glioma Surgery": "Neuro-Oncology",
  "Meningioma Surgery": "Neuro-Oncology",
  "Pituitary Tumor Surgery": "Neuro-Oncology",
  "Spinal Tumor Surgery": "Neuro-Oncology",
  "Skull Base Surgery": "Skull Base & Neuroendoscopy",
  "Endoscopic Brain Surgery": "Skull Base & Neuroendoscopy",
  "Endoscopic Skull Base Surgery": "Skull Base & Neuroendoscopy",
  "Stereotactic Brain Biopsy": "Skull Base & Neuroendoscopy",
  "Aneurysm Clipping": "Neurovascular",
  "Aneurysm Coiling": "Neurovascular",
  "AVM Surgery": "Neurovascular",
  "AVM Embolization": "Neurovascular",
  "Stroke Thrombectomy": "Neurovascular",
  "Cerebral Bypass": "Neurovascular",
  "Deep Brain Stimulation": "Functional Neurosurgery",
  "Epilepsy Surgery": "Functional Neurosurgery",
  "Stereotactic Brain Surgery": "Functional Neurosurgery",
  "Gamma Knife": "Radiosurgery",
  CyberKnife: "Radiosurgery",
  "Stereotactic Radiosurgery (SRS)": "Radiosurgery",
  "Hydrocephalus Surgery": "Pediatric Neurosurgery",
  "Endoscopic Third Ventriculostomy (ETV)": "Pediatric Neurosurgery",
  "Chiari Surgery": "Pediatric Neurosurgery",
  "Craniosynostosis Surgery": "Pediatric Neurosurgery",
};


export const NEUROSURGERY_SHARED = [
  "Gamma Knife",
  "CyberKnife",
  "Stereotactic Radiosurgery (SRS)",
  "Spinal Tumor Surgery",
  "Skull Base Surgery",
] as const;

export const OPHTHALMOLOGY_COST: Record<string, { us: string; partner: string; stay: string }> = {
  "Cataract Surgery": {
    us: "$3,500–$8,000 per eye",
    partner: "$800–$2,500 per eye",
    stay: "Outpatient or 1 night",
  },
  "Phacoemulsification Cataract Surgery": {
    us: "$4,000–$9,000 per eye",
    partner: "$900–$2,800 per eye",
    stay: "Outpatient",
  },
  "Femto Laser Cataract Surgery": {
    us: "$5,500–$12,000 per eye",
    partner: "$1,600–$3,800 per eye",
    stay: "Outpatient",
  },
  "LASIK Eye Surgery": {
    us: "$2,000–$4,500 per eye",
    partner: "$700–$1,800 per eye",
    stay: "Outpatient",
  },
  "SMILE Eye Surgery": {
    us: "$2,500–$5,500 per eye",
    partner: "$1,000–$2,500 per eye",
    stay: "Outpatient",
  },
  "ICL (Implantable Collamer Lens)": {
    us: "$4,000–$8,000 per eye",
    partner: "$1,800–$3,800 per eye",
    stay: "Outpatient",
  },
  "Corneal Transplantation": {
    us: "$15,000–$30,000",
    partner: "$2,500–$6,500",
    stay: "1–3 nights",
  },
  DMEK: {
    us: "$16,000–$32,000",
    partner: "$3,200–$7,500",
    stay: "1–3 nights",
  },
  DSEK: {
    us: "$15,000–$30,000",
    partner: "$3,000–$7,000",
    stay: "1–3 nights",
  },
  DALK: {
    us: "$16,000–$32,000",
    partner: "$3,200–$7,500",
    stay: "1–3 nights",
  },
  "Glaucoma Surgery": {
    us: "$8,000–$20,000",
    partner: "$1,500–$4,500",
    stay: "1–2 nights",
  },
  "Laser Glaucoma Surgery": {
    us: "$2,000–$6,000",
    partner: "$500–$1,600",
    stay: "Outpatient",
  },
  Trabeculectomy: {
    us: "$8,000–$18,000",
    partner: "$1,200–$3,800",
    stay: "1–2 nights",
  },
  "Glaucoma Drainage Device / Valve Implantation": {
    us: "$12,000–$25,000",
    partner: "$2,500–$6,500",
    stay: "1–3 nights",
  },
  Vitrectomy: {
    us: "$8,000–$20,000",
    partner: "$2,000–$5,500",
    stay: "1–2 nights",
  },
  "Retinal Detachment Surgery": {
    us: "$10,000–$25,000",
    partner: "$2,500–$7,000",
    stay: "1–3 nights",
  },
  "Intravitreal Anti-VEGF Injection": {
    us: "$1,800–$4,500 per injection",
    partner: "$300–$900 per injection",
    stay: "Outpatient",
  },
  "Macular Hole Surgery": {
    us: "$10,000–$22,000",
    partner: "$2,500–$6,500",
    stay: "1–2 nights",
  },
  "Pediatric Cataract Surgery": {
    us: "$6,000–$15,000 per eye",
    partner: "$1,200–$3,800 per eye",
    stay: "1–2 nights",
  },
  "Squint / Strabismus Surgery": {
    us: "$5,000–$12,000",
    partner: "$1,000–$3,200",
    stay: "Outpatient or 1 night",
  },
  "Oculoplastic Surgery": {
    us: "$4,000–$12,000",
    partner: "$1,200–$4,000",
    stay: "Outpatient or 1 night",
  },
  "Eyelid Reconstruction Surgery": {
    us: "$6,000–$18,000",
    partner: "$1,500–$5,000",
    stay: "1–2 nights",
  },
  "Dacryocystorhinostomy (DCR) / Tear Duct Surgery": {
    us: "$6,000–$15,000",
    partner: "$1,200–$3,800",
    stay: "Outpatient or 1 night",
  },
  "Corneal Cross-Linking (C3R)": {
    us: "$2,500–$6,000 per eye",
    partner: "$700–$2,000 per eye",
    stay: "Outpatient",
  },
};


export const OPHTHALMOLOGY_CLUSTER_BY_PROCEDURE: Record<string, string> = {
  "Cataract Surgery": "Cataract",
  "Phacoemulsification Cataract Surgery": "Cataract",
  "Femto Laser Cataract Surgery": "Cataract",
  "Pediatric Cataract Surgery": "Cataract",
  "LASIK Eye Surgery": "Refractive",
  "SMILE Eye Surgery": "Refractive",
  "ICL (Implantable Collamer Lens)": "Refractive",
  "Corneal Transplantation": "Cornea",
  DMEK: "Cornea",
  DSEK: "Cornea",
  DALK: "Cornea",
  "Corneal Cross-Linking (C3R)": "Cornea",
  "Glaucoma Surgery": "Glaucoma",
  "Laser Glaucoma Surgery": "Glaucoma",
  Trabeculectomy: "Glaucoma",
  "Glaucoma Drainage Device / Valve Implantation": "Glaucoma",
  Vitrectomy: "Retina",
  "Retinal Detachment Surgery": "Retina",
  "Intravitreal Anti-VEGF Injection": "Retina",
  "Macular Hole Surgery": "Retina",
  "Squint / Strabismus Surgery": "Pediatric & Strabismus",
  "Oculoplastic Surgery": "Oculoplastics",
  "Eyelid Reconstruction Surgery": "Oculoplastics",
  "Dacryocystorhinostomy (DCR) / Tear Duct Surgery": "Oculoplastics",
};

export const ORTHOPEDICS_COST: Record<string, { us: string; partner: string; stay: string }> = {
  "Total Knee Replacement": {
    us: "$35,000–$70,000",
    partner: "$5,500–$12,000",
    stay: "4–7 nights",
  },
  "Robotic Knee Replacement": {
    us: "$40,000–$80,000",
    partner: "$7,000–$15,000",
    stay: "4–7 nights",
  },
  "Partial Knee Replacement": {
    us: "$25,000–$50,000",
    partner: "$4,500–$10,000",
    stay: "3–5 nights",
  },
  "Revision Knee Replacement": {
    us: "$50,000–$100,000",
    partner: "$9,000–$18,000",
    stay: "5–10 nights",
  },
  "Total Hip Replacement": {
    us: "$40,000–$80,000",
    partner: "$6,000–$13,000",
    stay: "4–7 nights",
  },
  "Revision Hip Replacement": {
    us: "$55,000–$110,000",
    partner: "$10,000–$20,000",
    stay: "5–10 nights",
  },
  "Hip Resurfacing": {
    us: "$30,000–$65,000",
    partner: "$6,500–$14,000",
    stay: "4–7 nights",
  },
  "Shoulder Replacement": {
    us: "$30,000–$60,000",
    partner: "$6,000–$13,000",
    stay: "3–6 nights",
  },
  "ACL Reconstruction (Anterior Cruciate Ligament)": {
    us: "$15,000–$40,000",
    partner: "$2,500–$6,500",
    stay: "1–3 nights",
  },
  "PCL Reconstruction (Posterior Cruciate Ligament)": {
    us: "$18,000–$45,000",
    partner: "$3,000–$7,500",
    stay: "1–3 nights",
  },
  "Meniscus Repair": {
    us: "$8,000–$22,000",
    partner: "$1,800–$4,500",
    stay: "Outpatient or 1 night",
  },
  "Rotator Cuff Repair": {
    us: "$15,000–$40,000",
    partner: "$2,800–$7,000",
    stay: "1–3 nights",
  },
  "Arthroscopic Surgery": {
    us: "$10,000–$30,000",
    partner: "$2,000–$5,500",
    stay: "Outpatient or 1–2 nights",
  },
  "Fracture Fixation": {
    us: "$12,000–$40,000",
    partner: "$2,500–$8,000",
    stay: "2–6 nights",
  },
  "ORIF (Open Reduction and Internal Fixation)": {
    us: "$15,000–$45,000",
    partner: "$3,000–$9,000",
    stay: "2–6 nights",
  },
  "Non-Union Repair": {
    us: "$25,000–$70,000",
    partner: "$5,000–$14,000",
    stay: "4–8 nights",
  },
  "Carpal Tunnel Release": {
    us: "$4,000–$12,000",
    partner: "$800–$2,200",
    stay: "Outpatient",
  },
  "Tendon Repair": {
    us: "$8,000–$22,000",
    partner: "$1,500–$5,000",
    stay: "Outpatient or 1–2 nights",
  },
  "Hand Reconstruction": {
    us: "$15,000–$45,000",
    partner: "$3,500–$10,000",
    stay: "2–5 nights",
  },
  "Ankle Replacement": {
    us: "$30,000–$70,000",
    partner: "$7,000–$16,000",
    stay: "3–6 nights",
  },
  "Bunion Surgery": {
    us: "$8,000–$20,000",
    partner: "$1,500–$4,500",
    stay: "Outpatient or 1 night",
  },
  "Achilles Repair": {
    us: "$10,000–$28,000",
    partner: "$2,000–$6,000",
    stay: "1–3 nights",
  },
};


export const ORTHOPEDICS_CLUSTER_BY_PROCEDURE: Record<string, string> = {
  "Total Knee Replacement": "Joint Replacement",
  "Robotic Knee Replacement": "Joint Replacement",
  "Partial Knee Replacement": "Joint Replacement",
  "Revision Knee Replacement": "Joint Replacement",
  "Total Hip Replacement": "Joint Replacement",
  "Revision Hip Replacement": "Joint Replacement",
  "Hip Resurfacing": "Joint Replacement",
  "Shoulder Replacement": "Joint Replacement",
  "ACL Reconstruction (Anterior Cruciate Ligament)": "Sports & Arthroscopy",
  "PCL Reconstruction (Posterior Cruciate Ligament)": "Sports & Arthroscopy",
  "Meniscus Repair": "Sports & Arthroscopy",
  "Rotator Cuff Repair": "Sports & Arthroscopy",
  "Arthroscopic Surgery": "Sports & Arthroscopy",
  "Fracture Fixation": "Trauma",
  "ORIF (Open Reduction and Internal Fixation)": "Trauma",
  "Non-Union Repair": "Trauma",
  "Carpal Tunnel Release": "Hand & Upper Limb",
  "Tendon Repair": "Hand & Upper Limb",
  "Hand Reconstruction": "Hand & Upper Limb",
  "Ankle Replacement": "Foot & Ankle",
  "Bunion Surgery": "Foot & Ankle",
  "Achilles Repair": "Foot & Ankle",
};

export const PEDIATRIC_CARDIAC_SURGERY_COST: Record<string, { us: string; partner: string; stay: string }> = {
  "ASD Closure (Atrial Septal Defect)": {
    us: "$30,000–$80,000",
    partner: "$4,000–$9,500",
    stay: "5–10 nights; parent stay expected",
  },
  "VSD Closure (Ventricular Septal Defect)": {
    us: "$35,000–$90,000",
    partner: "$4,500–$11,000",
    stay: "6–12 nights; parent stay expected",
  },
  "TOF Repair (Tetralogy of Fallot)": {
    us: "$50,000–$140,000",
    partner: "$6,500–$16,000",
    stay: "8–16 nights; parent stay expected",
  },
  "Glenn Procedure": {
    us: "$60,000–$160,000",
    partner: "$8,000–$18,000",
    stay: "8–16 nights; parent stay expected",
  },
  "Fontan Procedure": {
    us: "$70,000–$180,000",
    partner: "$9,000–$22,000",
    stay: "10–18 nights; parent stay expected",
  },
  "Arterial Switch Operation": {
    us: "$80,000–$200,000",
    partner: "$12,000–$26,000",
    stay: "10–21 nights; parent stay expected",
  },
  "PDA Closure (Patent Ductus Arteriosus)": {
    us: "$20,000–$60,000",
    partner: "$3,500–$8,500",
    stay: "3–8 nights; parent stay expected",
  },
  "Norwood Procedure": {
    us: "$120,000–$280,000",
    partner: "$18,000–$40,000",
    stay: "3–8 weeks in a paediatric cardiac ICU",
  },
  "Coarctation Repair": {
    us: "$40,000–$110,000",
    partner: "$6,000–$15,000",
    stay: "6–14 nights; parent stay expected",
  },
  "AVSD Repair (Atrioventricular Septal Defect)": {
    us: "$55,000–$150,000",
    partner: "$8,000–$18,500",
    stay: "8–16 nights; parent stay expected",
  },
  "TAPVC Repair (Total Anomalous Pulmonary Venous Connection)": {
    us: "$70,000–$180,000",
    partner: "$10,000–$24,000",
    stay: "10–21 nights; parent stay expected",
  },
  "Pediatric Heart Transplantation": {
    us: "$800,000–$1,800,000",
    partner: "$50,000–$120,000",
    stay: "6–12 weeks nearby after listing; parent stay required",
  },
};


export const PEDIATRIC_HEMATOLOGY_COST: Record<string, { us: string; partner: string; stay: string }> = {
  "Pediatric Bone Marrow Transplantation": {
    us: "$180,000–$420,000",
    partner: "$28,000–$75,000",
    stay: "6–12 weeks with a parent nearby",
  },
  "Matched Sibling Donor Transplant": {
    us: "$180,000–$380,000",
    partner: "$28,000–$70,000",
    stay: "6–10 weeks with a parent nearby",
  },
  "Hematopoietic Stem Cell Transplantation": {
    us: "$150,000–$400,000",
    partner: "$24,000–$70,000",
    stay: "4–10 weeks in a paediatric unit",
  },
};


export const PEDIATRIC_ORTHOPAEDIC_COST: Record<string, { us: string; partner: string; stay: string }> = {
  "Clubfoot Correction Surgery": {
    us: "$6,000–$18,000",
    partner: "$1,200–$3,800",
    stay: "1–3 nights; staged casts may follow",
  },
  "Pediatric Fracture Surgery": {
    us: "$8,000–$25,000",
    partner: "$1,500–$4,800",
    stay: "1–3 nights",
  },
  "Pediatric Deformity Correction": {
    us: "$20,000–$60,000",
    partner: "$4,500–$13,000",
    stay: "4–10 nights",
  },
  "Limb Lengthening Surgery": {
    us: "$50,000–$150,000",
    partner: "$12,000–$28,000",
    stay: "7–14 nights; outpatient lengthening in-city",
  },
  "Limb Reconstruction Surgery": {
    us: "$40,000–$120,000",
    partner: "$10,000–$25,000",
    stay: "7–14 nights",
  },
  "Developmental Dysplasia of Hip Surgery": {
    us: "$15,000–$40,000",
    partner: "$3,500–$9,500",
    stay: "3–7 nights",
  },
  "Pediatric Hip Reconstruction": {
    us: "$25,000–$70,000",
    partner: "$6,000–$16,000",
    stay: "4–8 nights",
  },
  "Hip Preservation Surgery": {
    us: "$20,000–$55,000",
    partner: "$5,000–$14,000",
    stay: "3–6 nights",
  },
  "Pediatric Scoliosis Surgery": {
    us: "$80,000–$180,000",
    partner: "$12,000–$28,000",
    stay: "7–14 nights",
  },
  "Pediatric Spinal Deformity Correction": {
    us: "$90,000–$200,000",
    partner: "$14,000–$32,000",
    stay: "8–16 nights",
  },
  "Cerebral Palsy Orthopedic Surgery": {
    us: "$18,000–$70,000",
    partner: "$4,000–$14,000",
    stay: "4–10 nights",
  },
  "Pediatric Foot & Ankle Surgery": {
    us: "$8,000–$25,000",
    partner: "$1,800–$6,000",
    stay: "1–4 nights",
  },
  "Pediatric Fracture Fixation": {
    us: "$10,000–$30,000",
    partner: "$2,000–$7,000",
    stay: "1–4 nights",
  },
  "Tendon Repair Surgery": {
    us: "$8,000–$22,000",
    partner: "$1,500–$5,000",
    stay: "Outpatient or 1–2 nights",
  },
  "SCFE Hip Surgery (Slipped Capital Femoral Epiphysis)": {
    us: "$15,000–$45,000",
    partner: "$3,500–$10,000",
    stay: "2–5 nights",
  },
};


export const PULMONOLOGY_COST: Record<string, { us: string; partner: string; stay: string }> = {
  Bronchoscopy: {
    us: "$2,000–$6,000",
    partner: "$400–$1,200",
    stay: "Outpatient or 1 night",
  },
  "EBUS (Endobronchial Ultrasound)": {
    us: "$4,000–$12,000",
    partner: "$800–$2,500",
    stay: "Outpatient or 1 night",
  },
  "Rigid Bronchoscopy": {
    us: "$5,000–$15,000",
    partner: "$1,200–$3,500",
    stay: "1–3 nights",
  },
  "Airway Stenting": {
    us: "$8,000–$25,000",
    partner: "$2,000–$6,500",
    stay: "1–3 nights",
  },
  "Medical Thoracoscopy": {
    us: "$8,000–$20,000",
    partner: "$1,800–$5,000",
    stay: "2–4 nights",
  },
  "Medical Pleuroscopy": {
    us: "$7,500–$18,000",
    partner: "$1,600–$4,800",
    stay: "2–4 nights",
  },
  "Transbronchial Lung Biopsy": {
    us: "$3,000–$8,000",
    partner: "$600–$1,800",
    stay: "Outpatient or 1 night",
  },
  "Cryo-Lung Biopsy": {
    us: "$5,000–$14,000",
    partner: "$1,200–$3,500",
    stay: "1–2 nights",
  },
  "Endobronchial Biopsy": {
    us: "$2,500–$7,000",
    partner: "$500–$1,500",
    stay: "Outpatient or 1 night",
  },
  "TBNA (Transbronchial Needle Aspiration)": {
    us: "$3,000–$9,000",
    partner: "$700–$2,000",
    stay: "Outpatient or 1 night",
  },
  "Bronchoscopic Tumor Debulking": {
    us: "$8,000–$22,000",
    partner: "$2,000–$6,000",
    stay: "1–3 nights",
  },
  "Foreign Body Removal by Bronchoscopy": {
    us: "$4,000–$12,000",
    partner: "$800–$2,500",
    stay: "Outpatient or 1 night",
  },
  "Pleural Biopsy": {
    us: "$3,000–$8,000",
    partner: "$600–$1,800",
    stay: "1–2 nights",
  },
  "Chest Tube / Intercostal Drainage": {
    us: "$2,000–$6,000",
    partner: "$350–$1,200",
    stay: "2–5 nights if the drain stays",
  },
  "Lung Transplantation": {
    us: "$150,000–$400,000",
    partner: "$28,000–$70,000",
    stay: "21–45 nights; outpatient follow-up in-city",
  },
};


export const SPINE_SURGERY_COST: Record<string, { us: string; partner: string; stay: string }> = {
  "Spinal Fusion": {
    us: "$80,000–$150,000",
    partner: "$8,000–$18,000",
    stay: "4–8 nights",
  },
  "PLIF (Posterior Lumbar Interbody Fusion)": {
    us: "$90,000–$160,000",
    partner: "$9,000–$20,000",
    stay: "4–8 nights",
  },
  "TLIF (Transforaminal Lumbar Interbody Fusion)": {
    us: "$90,000–$160,000",
    partner: "$9,000–$20,000",
    stay: "4–8 nights",
  },
  "ALIF (Anterior Lumbar Interbody Fusion)": {
    us: "$95,000–$170,000",
    partner: "$10,000–$22,000",
    stay: "4–8 nights",
  },
  "ACDF (Anterior Cervical Discectomy and Fusion)": {
    us: "$40,000–$80,000",
    partner: "$5,000–$12,000",
    stay: "2–4 nights",
  },
  Discectomy: {
    us: "$25,000–$50,000",
    partner: "$3,500–$8,000",
    stay: "1–3 nights",
  },
  Microdiscectomy: {
    us: "$20,000–$45,000",
    partner: "$3,000–$7,500",
    stay: "1–3 nights",
  },
  Laminectomy: {
    us: "$30,000–$65,000",
    partner: "$4,000–$9,500",
    stay: "2–5 nights",
  },
  "Spinal Decompression": {
    us: "$28,000–$60,000",
    partner: "$4,000–$9,000",
    stay: "2–5 nights",
  },
  "Disc Replacement": {
    us: "$40,000–$80,000",
    partner: "$8,000–$16,000",
    stay: "2–5 nights",
  },
  "Scoliosis Correction": {
    us: "$100,000–$250,000",
    partner: "$12,000–$28,000",
    stay: "7–14 nights",
  },
  "Spinal Deformity Correction": {
    us: "$110,000–$260,000",
    partner: "$14,000–$32,000",
    stay: "7–14 nights",
  },
  Vertebroplasty: {
    us: "$15,000–$35,000",
    partner: "$2,500–$6,500",
    stay: "0–2 nights",
  },
  Kyphoplasty: {
    us: "$18,000–$40,000",
    partner: "$3,000–$7,500",
    stay: "0–2 nights",
  },
  "Spinal Tumor Surgery": {
    us: "$50,000–$150,000",
    partner: "$10,000–$24,000",
    stay: "5–12 nights",
  },
  "Revision Spine Surgery": {
    us: "$90,000–$200,000",
    partner: "$12,000–$26,000",
    stay: "5–12 nights",
  },
};


export const SURGICAL_COST: Record<string, { us: string; partner: string; stay: string }> = {
  "Breast-Conserving Surgery (Lumpectomy)": {
    us: "$15,000–$30,000",
    partner: "$3,500–$8,000",
    stay: "1–3 nights",
  },
  Mastectomy: {
    us: "$20,000–$40,000",
    partner: "$4,500–$10,000",
    stay: "3–6 nights",
  },
  "Nipple-Sparing Mastectomy": {
    us: "$22,000–$45,000",
    partner: "$5,500–$12,000",
    stay: "3–6 nights",
  },
  "Oncoplastic Breast Surgery": {
    us: "$18,000–$38,000",
    partner: "$4,500–$11,000",
    stay: "2–5 nights",
  },
  "Breast Reconstruction": {
    us: "$25,000–$70,000",
    partner: "$6,000–$18,000",
    stay: "4–8 nights",
  },
  "Sentinel Lymph Node Biopsy": {
    us: "$8,000–$18,000",
    partner: "$2,000–$5,500",
    stay: "1–2 nights",
  },
  Esophagectomy: {
    us: "$50,000–$120,000",
    partner: "$12,000–$28,000",
    stay: "10–18 nights",
  },
  Gastrectomy: {
    us: "$40,000–$90,000",
    partner: "$9,000–$22,000",
    stay: "7–14 nights",
  },
  Colectomy: {
    us: "$30,000–$70,000",
    partner: "$7,000–$18,000",
    stay: "5–10 nights",
  },
  "Rectal Cancer Surgery": {
    us: "$35,000–$85,000",
    partner: "$8,000–$20,000",
    stay: "6–12 nights",
  },
  "Liver Resection (Hepatectomy)": {
    us: "$45,000–$110,000",
    partner: "$10,000–$26,000",
    stay: "7–14 nights",
  },
  "Whipple Procedure": {
    us: "$60,000–$150,000",
    partner: "$14,000–$32,000",
    stay: "10–18 nights",
  },
  "Pancreatic Surgery": {
    us: "$50,000–$130,000",
    partner: "$12,000–$30,000",
    stay: "8–16 nights",
  },
  "Cytoreductive Surgery": {
    us: "$40,000–$100,000",
    partner: "$10,000–$24,000",
    stay: "7–14 nights",
  },
  "Cytoreductive Surgery with HIPEC": {
    us: "$70,000–$180,000",
    partner: "$18,000–$40,000",
    stay: "10–21 nights",
  },
  PIPAC: {
    us: "$25,000–$55,000",
    partner: "$7,000–$16,000",
    stay: "2–5 nights",
  },
  "Radical Hysterectomy": {
    us: "$25,000–$55,000",
    partner: "$6,000–$14,000",
    stay: "4–8 nights",
  },
  "Ovarian Cancer Cytoreductive Surgery": {
    us: "$35,000–$80,000",
    partner: "$8,000–$20,000",
    stay: "6–12 nights",
  },
  "Thyroidectomy for Thyroid Cancer": {
    us: "$18,000–$40,000",
    partner: "$4,000–$10,000",
    stay: "2–4 nights",
  },
  "Neck Dissection": {
    us: "$20,000–$45,000",
    partner: "$4,500–$12,000",
    stay: "3–6 nights",
  },
  "Oral Cancer Surgery": {
    us: "$25,000–$60,000",
    partner: "$6,000–$16,000",
    stay: "5–10 nights",
  },
  "Transoral Robotic Surgery (TORS)": {
    us: "$35,000–$80,000",
    partner: "$9,000–$20,000",
    stay: "3–7 nights",
  },
  "Microvascular Free Flap Reconstruction": {
    us: "$40,000–$100,000",
    partner: "$10,000–$24,000",
    stay: "8–14 nights",
  },
  "Lung Cancer Surgery": {
    us: "$40,000–$90,000",
    partner: "$9,000–$22,000",
    stay: "5–10 nights",
  },
  Lobectomy: {
    us: "$40,000–$85,000",
    partner: "$9,000–$20,000",
    stay: "5–10 nights",
  },
  "VATS Lung Surgery": {
    us: "$35,000–$80,000",
    partner: "$8,000–$19,000",
    stay: "4–8 nights",
  },
  "Robotic Thoracic Surgery": {
    us: "$45,000–$100,000",
    partner: "$12,000–$26,000",
    stay: "4–8 nights",
  },
  "Radical Prostatectomy": {
    us: "$30,000–$70,000",
    partner: "$7,000–$18,000",
    stay: "3–7 nights",
  },
  "Partial Nephrectomy": {
    us: "$28,000–$65,000",
    partner: "$7,000–$16,000",
    stay: "3–6 nights",
  },
  "Radical Cystectomy": {
    us: "$45,000–$110,000",
    partner: "$11,000–$26,000",
    stay: "7–14 nights",
  },
};


export const SURGICAL_GASTROENTEROLOGY_COST: Record<string, { us: string; partner: string; stay: string }> = {
  "Liver Transplantation": {
    us: "$150,000–$400,000",
    partner: "$28,000–$55,000",
    stay: "14–28 nights; outpatient follow-up in-city",
  },
  "Living Donor Liver Transplantation": {
    us: "$180,000–$450,000",
    partner: "$32,000–$62,000",
    stay: "Donor 7–12 nights; recipient 14–28 nights",
  },
  "Deceased Donor Liver Transplantation": {
    us: "$150,000–$380,000",
    partner: "$28,000–$52,000",
    stay: "14–28 nights; wait-list timing varies",
  },
  "Pediatric Liver Transplantation": {
    us: "$180,000–$450,000",
    partner: "$32,000–$65,000",
    stay: "18–35 nights; paediatric ICU",
  },
  "Liver Retransplantation": {
    us: "$200,000–$500,000",
    partner: "$35,000–$70,000",
    stay: "18–35 nights",
  },
  "Whipple Procedure (Pancreaticoduodenectomy)": {
    us: "$60,000–$150,000",
    partner: "$14,000–$32,000",
    stay: "10–18 nights",
  },
  "Distal Pancreatectomy": {
    us: "$40,000–$95,000",
    partner: "$9,000–$22,000",
    stay: "6–12 nights",
  },
  Pancreatectomy: {
    us: "$50,000–$130,000",
    partner: "$12,000–$30,000",
    stay: "8–16 nights",
  },
  "Biliary Reconstruction": {
    us: "$35,000–$85,000",
    partner: "$8,000–$20,000",
    stay: "7–14 nights",
  },
  "Gallbladder Cancer Surgery": {
    us: "$30,000–$80,000",
    partner: "$7,000–$18,000",
    stay: "6–12 nights",
  },
  "Bile Duct Cancer Surgery": {
    us: "$45,000–$110,000",
    partner: "$10,000–$26,000",
    stay: "8–16 nights",
  },
  "Anti-Reflux Surgery (Nissen Fundoplication)": {
    us: "$18,000–$40,000",
    partner: "$4,000–$9,500",
    stay: "2–5 nights",
  },
  "Hiatal Hernia Surgery": {
    us: "$16,000–$38,000",
    partner: "$3,800–$9,000",
    stay: "2–5 nights",
  },
  "Heller Myotomy for Achalasia": {
    us: "$20,000–$45,000",
    partner: "$4,500–$11,000",
    stay: "3–6 nights",
  },
  "Colorectal Cancer Surgery": {
    us: "$35,000–$85,000",
    partner: "$8,000–$20,000",
    stay: "6–12 nights",
  },
  "Colorectal Resection": {
    us: "$30,000–$75,000",
    partner: "$7,000–$18,000",
    stay: "5–10 nights",
  },
  "Low Anterior Resection (LAR)": {
    us: "$35,000–$85,000",
    partner: "$8,000–$20,000",
    stay: "6–12 nights",
  },
  "Abdominoperineal Resection (APR)": {
    us: "$40,000–$95,000",
    partner: "$9,000–$22,000",
    stay: "7–14 nights",
  },
  "Total Mesorectal Excision (TME)": {
    us: "$38,000–$90,000",
    partner: "$8,500–$21,000",
    stay: "6–12 nights",
  },
  "Ostomy / Stoma Surgery": {
    us: "$12,000–$30,000",
    partner: "$2,500–$6,800",
    stay: "4–8 nights",
  },
  "Gastric Bypass Surgery": {
    us: "$20,000–$38,000",
    partner: "$6,000–$11,000",
    stay: "3–6 nights",
  },
};


export const UROLOGY_COST: Record<string, { us: string; partner: string; stay: string }> = {
  "PCNL (Percutaneous Nephrolithotomy)": {
    us: "$15,000–$35,000",
    partner: "$3,200–$7,500",
    stay: "2–5 nights",
  },
  "RIRS (Retrograde Intrarenal Surgery)": {
    us: "$14,000–$32,000",
    partner: "$3,000–$7,200",
    stay: "1–3 nights",
  },
  Ureteroscopy: {
    us: "$8,000–$20,000",
    partner: "$1,800–$4,800",
    stay: "0–2 nights",
  },
  "ESWL (Extracorporeal Shock Wave Lithotripsy)": {
    us: "$5,000–$12,000",
    partner: "$800–$2,400",
    stay: "Outpatient or 1 night",
  },
  Pyeloplasty: {
    us: "$20,000–$45,000",
    partner: "$4,500–$10,000",
    stay: "3–6 nights",
  },
  "Radical Nephrectomy": {
    us: "$30,000–$70,000",
    partner: "$7,500–$18,000",
    stay: "4–8 nights",
  },
  "TURP (Transurethral Resection of the Prostate)": {
    us: "$12,000–$25,000",
    partner: "$2,500–$6,200",
    stay: "2–4 nights",
  },
  "HoLEP (Holmium Laser Enucleation)": {
    us: "$16,000–$32,000",
    partner: "$3,800–$8,500",
    stay: "2–4 nights",
  },
  "GreenLight Laser Surgery": {
    us: "$14,000–$28,000",
    partner: "$3,200–$7,800",
    stay: "1–3 nights",
  },
  "TURBT (Transurethral Resection of Bladder Tumor)": {
    us: "$15,000–$35,000",
    partner: "$3,000–$8,000",
    stay: "1–3 nights",
  },
  "Bladder Reconstruction": {
    us: "$40,000–$90,000",
    partner: "$10,000–$24,000",
    stay: "7–14 nights",
  },
  "Urinary Diversion": {
    us: "$35,000–$80,000",
    partner: "$9,000–$22,000",
    stay: "7–14 nights",
  },
  "Kidney Transplantation": {
    us: "$150,000–$400,000",
    partner: "$13,000–$25,000",
    stay: "10–21 nights; outpatient follow-up in-city",
  },
  "Living Donor Kidney Transplantation": {
    us: "$160,000–$420,000",
    partner: "$14,000–$28,000",
    stay: "Donor 5–8 nights; recipient 10–21 nights",
  },
  "Deceased Donor Kidney Transplantation": {
    us: "$140,000–$380,000",
    partner: "$12,000–$24,000",
    stay: "10–21 nights; wait-list timing varies",
  },
  "ABO-Incompatible Kidney Transplantation": {
    us: "$180,000–$450,000",
    partner: "$18,000–$35,000",
    stay: "14–28 nights; desensitisation first",
  },
  Urethroplasty: {
    us: "$15,000–$40,000",
    partner: "$3,500–$9,000",
    stay: "3–7 nights",
  },
  "VIU (Visual Internal Urethrotomy)": {
    us: "$6,000–$15,000",
    partner: "$1,200–$3,500",
    stay: "0–2 nights",
  },
  "Urinary Tract Reconstruction": {
    us: "$25,000–$70,000",
    partner: "$6,000–$16,000",
    stay: "5–12 nights",
  },
  "Hypospadias Repair": {
    us: "$12,000–$30,000",
    partner: "$2,500–$7,000",
    stay: "2–5 nights; paediatric ward",
  },
  "Pediatric Urological Surgery": {
    us: "$15,000–$40,000",
    partner: "$3,000–$8,500",
    stay: "2–6 nights; paediatric ward",
  },
  "Penile Implant": {
    us: "$18,000–$40,000",
    partner: "$5,000–$12,000",
    stay: "1–3 nights",
  },
  "Varicocele Surgery": {
    us: "$8,000–$18,000",
    partner: "$1,500–$4,200",
    stay: "0–2 nights",
  },
};

export const RADIATION_COST: Record<string, { us: string; partner: string; stay: string }> = {
  "External Beam Radiotherapy (EBRT)": {
    us: "$12,000–$25,000",
    partner: "$1,000–$6,000+",
    stay: "15–35 sessions typical · 4–7 weeks",
  },
  "3D Conformal Radiotherapy (3D-CRT)": {
    us: "$14,000–$28,000",
    partner: "$700–$2,500+",
    stay: "15–35 sessions typical · usually outpatient",
  },
  "Intensity-Modulated Radiotherapy (IMRT)": {
    us: "$18,000–$40,000",
    partner: "$6,500–$14,500",
    stay: "4–7 weeks of fractions",
  },
  "Image-Guided Radiotherapy (IGRT)": {
    us: "$20,000–$45,000",
    partner: "$7,200–$16,000",
    stay: "4–7 weeks of fractions",
  },
  "Stereotactic Radiosurgery (SRS)": {
    us: "$25,000–$55,000",
    partner: "$8,500–$18,000",
    stay: "1–5 sessions",
  },
  "Stereotactic Body Radiotherapy (SBRT)": {
    us: "$22,000–$50,000",
    partner: "$8,000–$17,500",
    stay: "1–5 sessions",
  },
  CyberKnife: {
    us: "$30,000–$70,000",
    partner: "$11,000–$24,000",
    stay: "1–5 sessions",
  },
  "Gamma Knife": {
    us: "$28,000–$65,000",
    partner: "$10,500–$22,000",
    stay: "1 session typical",
  },
  "Proton Beam Therapy": {
    us: "$90,000–$180,000",
    partner: "$28,000–$55,000",
    stay: "4–8 weeks of fractions",
  },
  Brachytherapy: {
    us: "$15,000–$35,000",
    partner: "$5,500–$13,000",
    stay: "1–7 nights",
  },
  "Intracavitary Brachytherapy": {
    us: "$16,000–$38,000",
    partner: "$6,000–$14,000",
    stay: "1–7 nights",
  },
  "Interstitial Brachytherapy": {
    us: "$18,000–$42,000",
    partner: "$6,800–$15,500",
    stay: "2–8 nights",
  },
  "Plaque Brachytherapy": {
    us: "$20,000–$45,000",
    partner: "$7,500–$16,000",
    stay: "3–7 nights",
  },
  "Intraoperative Radiotherapy (IORT)": {
    us: "$22,000–$48,000",
    partner: "$8,200–$17,000",
    stay: "Tied to theatre stay",
  },
  "Total Body Irradiation (TBI)": {
    us: "$35,000–$80,000",
    partner: "$12,000–$28,000",
    stay: "By transplant protocol",
  },
};

