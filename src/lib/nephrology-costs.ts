export { NEPHROLOGY_COST, NEPHROLOGY_CLUSTER_BY_PROCEDURE, NEPHROLOGY_SHARED } from "./treatment-cost-ranges";
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

