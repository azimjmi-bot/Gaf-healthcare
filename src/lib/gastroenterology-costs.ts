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

export const GASTROENTEROLOGY_SUMMARIES: Record<string, string> = {
  "Upper GI Endoscopy (Gastroscopy)":
    "Look at the oesophagus, stomach and duodenum when dyspepsia, bleeding or Barrett’s is the brief. Sedation and biopsy are written after records — not a tourist camera pass in Delhi NCR.",
  Colonoscopy:
    "Examine the colon when screening, bleeding or IBD is honest. Prep quality and a named GI list decide Mumbai versus Bengaluru; polypectomy is a separate sitting unless already indicated.",
  ERCP:
    "Reach the bile and pancreatic ducts when stones, stricture or a leak is the indication. Sphincterotomy, stent and a named ERCP list — not a first international experiment.",
  "Endoscopic Ultrasound (EUS)":
    "Stage a lesion or sample a node from inside the gut. FNA versus FNB and a named EUS list in India are the product, not a same-week tourist puncture.",
  "Capsule Endoscopy":
    "A swallowable camera for obscure small-bowel bleeding when standard scopes have already been honest. Retention risk is written before the capsule leaves the packet.",
  Enteroscopy:
    "Deep small-bowel work when capsule or imaging has already named a target. Balloon or spiral technique is chosen after records, not from a brochure length of stay.",
  "Biliary Stenting":
    "Drain or bridge a bile-duct obstruction. Plastic versus metal and a named ERCP/EUS list — not a hotel night in Chennai sold as the procedure.",
  "Bile Duct Stone Removal":
    "Clear choledocholithiasis when MRCP or ultrasound has already shown stone. Balloon, basket or lithotripsy is written after the cholangiogram, not before you fly.",
  Cholangioscopy:
    "Direct vision inside the duct when fluoroscopy is not enough. SpyGlass-class work and a named advanced-endoscopy list in Hyderabad or Delhi NCR.",
  "Peroral Endoscopic Myotomy (POEM)":
    "Myotomy for achalasia when manometry and timed barium already agree. Length of myotomy and a named POEM list — not a first-in-country tourist tunnel.",
  "G-POEM":
    "Gastric pyloromyotomy when gastroparesis has failed medical therapy. Gastric emptying studies first; a named third-space list second.",
  "Z-POEM":
    "Tunnelled myotomy for a Zenker diverticulum when the pouch is honest on swallow study. Recurrence risk is written before anyone books two nights.",
  "Endoscopic Mucosal Resection (EMR)":
    "Lift and snare a mucosal lesion when ESD is not the honest first option. Piecemeal versus en-bloc is decided on the lesion, not the package name.",
  "Endoscopic Submucosal Dissection (ESD)":
    "En-bloc resection of an early GI neoplasm when histology and invasion depth allow it. A named ESD list in India, not a same-week tourist dissection.",
  "STER (Submucosal Tunneling Endoscopic Resection)":
    "Tunnelled resection of a submucosal tumour when surgery is not the honest first option. Location, size and a named third-space list are the product.",
  "Endoscopic Hemostasis":
    "Stop GI bleeding with clip, injection, thermal or spray when the source is already seen. ICU backup on that campus is part of the quote conversation.",
  "Variceal Band Ligation":
    "Band oesophageal varices when portal hypertension is the brief. Beta-blockers, banding sessions and a named hepatology list — not a tourist overnight.",
  "Foreign Body Removal":
    "Retrieve an ingested object when timing and anatomy make endoscopy the honest tool. Airway cover is written before the list, not hoped for in theatre.",
  "Liver Biopsy":
    "Percutaneous core when clotting and imaging already allow it. Transjugular is a different sheet if ascites or coagulopathy is the problem.",
  "Transjugular Liver Biopsy":
    "Sample the liver from the vein when percutaneous biopsy is unsafe. Pressure studies and a named interventional-hepatology list in India.",
  "PTBD (Percutaneous Transhepatic Biliary Drainage)":
    "External or internal-external drain when ERCP cannot reach the obstruction. Interventional radiology and a named GI list on the same map.",
  "Esophageal Manometry":
    "High-resolution pressures before POEM, fundoplication or unexplained dysphagia. Chicago classification is the product, not a printout without a named reader.",
  "Anorectal Manometry":
    "Pressures and sensation when incontinence, constipation or pre-operative pelvic work is honest. Biofeedback after is part of the plan if indicated.",
  "Bariatric / Metabolic Endoscopy":
    "Endoscopic weight-loss or metabolic work — sleeve gastroplasty, balloons or similar — when a surgeon’s bypass is not the honest first option. ESG as a named surgical-bariatric pathway sits on a separate sheet.",
};
