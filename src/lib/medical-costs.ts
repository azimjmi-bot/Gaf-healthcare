export { MEDICAL_COST } from "./treatment-cost-ranges";
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
