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

export const MEDICAL_SUMMARIES: Record<string, string> = {
  Chemotherapy:
    "Cytotoxic chemotherapy remains the backbone for many solid tumours and lymphomas. Protocol, cycles and supportive drugs are set after pathology — not from a package price.",
  Immunotherapy:
    "Checkpoint and other immune therapies can replace or follow chemotherapy when the tumour and the patient allow it. Eligibility is a medical decision, not a brochure add-on.",
  "Targeted Therapy":
    "Drugs aimed at a defined pathway — EGFR, HER2, BRAF and the rest — only after the target is documented. A named medical oncologist reads the report before anyone books a vial.",
  "Hormone Therapy":
    "Endocrine therapy for hormone-receptor-positive disease, often for years. It is cheap compared with immuno, and it is still a protocol with bone and clot risks to name.",
  "Precision Oncology":
    "Genomic profiling plus a clinic that will actually change the next line. A panel without a tumour board is a PDF, not precision care.",
  "Molecular Targeted Therapy":
    "Therapy matched to a molecular lesion — fusions, mutations, copy-number events. If the assay is old or the clone has changed, the drug list changes with it.",
  "Immune Checkpoint Inhibitor Therapy":
    "PD-1, PD-L1 or CTLA-4 blockade for selected cancers. irAE coverage and a team that has managed colitis on this floor matter more than the brand on the bag.",
  "Neoadjuvant Chemotherapy":
    "Systemic therapy before surgery to downstage or test response. The surgical date is held until the medical oncologist and the surgeon agree the last cycle is done.",
  "Adjuvant Chemotherapy":
    "Post-operative cycles aimed at residual microscopic disease. Start windows are real; flying after a delayed first cycle is not a plan.",
  "Palliative Chemotherapy":
    "Treatment whose job is symptoms and time, not cure. The dossier should say so in writing before anyone packs for six cycles of hope.",
  "Antibody-Drug Conjugate Therapy":
    "An antibody carrying a cytotoxic payload to a surface target. Monitoring for pneumonitis, neuropathy or cytopenias is part of the campus check.",
  "Maintenance Therapy":
    "Lower-intensity treatment after a response, to delay progression. It is a duration decision, not an automatic extra year of invoices.",
  "Intraperitoneal Chemotherapy":
    "Drug delivered into the peritoneal cavity, often with cytoreduction. Not every ovarian or peritoneal case is an IP case.",
  "Intrathecal Chemotherapy":
    "Drug into CSF for leptomeningeal or prophylactic CNS treatment. Ommaya versus lumbar access is decided with neuro-oncology, not at the airport.",
  "CAR-T Cell Therapy":
    "Engineered T cells after apheresis, lymphodepletion and a CRS-ready ICU. GAF Healthcare only matches programmes that already run CAR-T, not a first international experiment.",
  "Bone Marrow Transplantation":
    "Allogeneic or selected autologous transplant with a donor, conditioning and GVHD plan. The unit’s infection protocol is the product.",
  "Stem Cell Transplantation":
    "Autologous or allogeneic HCT. Donor search, HLA, and weeks of nearby housing are booked around the medical oncologist or transplant physician — not around a hotel deal.",
  "Dendritic Cell Therapy":
    "Autologous dendritic-cell vaccine programmes in selected settings. It is adjunctive, evidence-limited, and refused when standard immuno or targeted therapy is the honest next line.",
};
