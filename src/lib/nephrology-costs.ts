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

export const NEPHROLOGY_SUMMARIES: Record<string, string> = {
  "Paired Kidney Exchange (Swap Transplant)":
    "Swap when blood-group or HLA mismatch already writes a paired exchange rather than a directed living graft. Kidney Transplantation remains the shared Urology slug. Living-donor, deceased-donor and ABO-incompatible sit on neighbouring shared sheets.",
  "Kidney Transplant Evaluation and Follow-up":
    "Work-up and graft follow-up when a nephrology list already writes HLA, DSA, protocol labs and biopsy thresholds — not a brochure listing. The operation itself stays on the shared Kidney Transplantation slug with Urology.",
  Hemodialysis:
    "Thrice-weekly HD when GFR and volume already write a dialysis list in Delhi NCR, Mumbai, Bengaluru, Chennai or Hyderabad. Peritoneal dialysis, CRRT and SLED keep neighbouring Nephrology slugs. This is a planning range, not a quote.",
  "Peritoneal Dialysis":
    "CAPD or APD when residual function and home training already write peritoneal dialysis rather than in-centre HD. CAPD catheter insertion is a neighbouring access slug.",
  "Continuous Renal Replacement Therapy (CRRT)":
    "Continuous ICU replacement when shock and anuria already write CRRT, not intermittent HD. SLED is the neighbouring hybrid slug.",
  "Sustained Low-Efficiency Dialysis (SLED)":
    "Hybrid ICU dialysis when haemodynamics already write SLED rather than CRRT or a short HD run. CRRT stays the continuous neighbour.",
  "Dialysis Catheter Placement":
    "Temporary or tunnelled catheter when access is needed before a mature fistula. Permcath insertion and AV fistula keep neighbouring slugs.",
  "AV Fistula Creation":
    "Create an arteriovenous fistula when a durable HD access already writes surgery rather than a long-term catheter. Dialysis access management covers later stenosis or thrombosis.",
  "Dialysis Access Management":
    "Fistuloplasty, thrombectomy or revision when a mature access already writes salvage rather than a new fistula. AV fistula creation stays the construction slug.",
  "Percutaneous Renal Biopsy":
    "Native-kidney biopsy when proteinuria, unexplained AKI or a glomerular list already write histology. Graft biopsy is a neighbouring transplant slug.",
  "Kidney Transplant Graft Biopsy":
    "Allograft biopsy when creatinine, DSA or protocol follow-up already write histology of the graft, not the native kidney. Percutaneous renal biopsy stays the native slug.",
  "CAPD Catheter Insertion":
    "Place a peritoneal catheter when home PD already writes access. Peritoneal dialysis is the therapy slug; permcath is a haemodialysis access neighbour.",
  "Central Venous Catheter (Permcath) Insertion":
    "Tunnelled cuffed catheter when HD is needed and a fistula is not yet ready. Dialysis catheter placement covers non-tunnelled lines; AV fistula is the durable access slug.",
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

export const NEPHROLOGY_CONDITIONS = [
  "Chronic kidney disease",
  "End-stage kidney disease",
  "Acute kidney injury",
  "Glomerulonephritis",
  "Nephrotic syndrome",
  "Diabetic kidney disease",
  "Hypertensive kidney disease",
  "Kidney transplant listing and follow-up",
  "Antibody-mediated rejection",
];

export const NEPHROLOGY_SHARED = [
  "Kidney Transplantation",
  "Living Donor Kidney Transplantation",
  "Deceased Donor Kidney Transplantation",
  "ABO-Incompatible Kidney Transplantation",
  "Plasmapheresis",
] as const;
