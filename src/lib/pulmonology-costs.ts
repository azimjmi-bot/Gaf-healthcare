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

export const PULMONOLOGY_SUMMARIES: Record<string, string> = {
  Bronchoscopy:
    "Flexible airway inspection when cough, bleed or a mass already belongs on a named pulmonology list in Delhi NCR, Mumbai, Bengaluru, Chennai or Hyderabad. Biopsy and lavage are written after imaging — not from a day-care brochure.",
  "EBUS (Endobronchial Ultrasound)":
    "Ultrasound-guided nodal sampling when mediastinal staging already needs tissue. TBNA sits on a separate slug; this sheet is the EBUS list for later pSEO.",
  "Rigid Bronchoscopy":
    "Rigid airway access when stent, foreign body or bulk already make a flexible scope dishonest. Theatre time and a named interventional pulmonologist in India.",
  "Airway Stenting":
    "Place a silicone or metal airway stent when obstruction already fails lesser tools. Rigid bronchoscopy is often the corridor; this slug is the stent itself.",
  "Medical Thoracoscopy":
    "Medical thoracoscopy for undiagnosed effusion or selected pleural disease when imaging already points at the pleura. Pleuroscopy shares the idea under a neighbouring slug.",
  "Medical Pleuroscopy":
    "Pleuroscopy when a medical pleural look is the honest first step. Talc, biopsy and drain plan are written after records, not from a hotel length.",
  "Transbronchial Lung Biopsy":
    "Sample lung parenchyma through the bronchoscope when ILD or a selected nodule already needs histology. Cryo-biopsy is a different sheet when freeze is the honest tool.",
  "Cryo-Lung Biopsy":
    "Cryoprobe lung biopsy when a larger parenchymal core already belongs on the table. Pneumothorax risk is written before anyone books two nights in Hyderabad.",
  "Endobronchial Biopsy":
    "Forceps biopsy of a visible endobronchial lesion when the scope already sees the target. Debulking is a separate slug if bulk, not diagnosis, is the product.",
  "TBNA (Transbronchial Needle Aspiration)":
    "Needle aspiration of a node or mass through the airway wall. EBUS-TBNA is the ultrasound sheet; this slug covers conventional TBNA when that is still the honest tool.",
  "Bronchoscopic Tumor Debulking":
    "Laser, cryo or mechanical debulking of an obstructing airway tumour when a named interventional list already agrees. Oncology sheets remain separate; this is the airway product.",
  "Foreign Body Removal by Bronchoscopy":
    "Retrieve an inhaled foreign body when the airway, not the gut, holds it. Gastroenterology’s ingested-body sheet is a different slug so later pSEO can use either path.",
  "Pleural Biopsy":
    "Sample pleura when cytology already failed or was never honest. Closed versus thoracoscopic route is written after imaging.",
  "Chest Tube / Intercostal Drainage":
    "Place an intercostal drain for pneumothorax, effusion or empyema when the chest already needs a tube. Duration is not assumed from a day-care price.",
  "Lung Transplantation":
    "Replace a failing lung when ILD, CF or pulmonary hypertension already sit on a named transplant list. Living-lobe versus deceased donor is written after records — not from a brochure wait-list.",
};
