import { indiaSpecialtyProfile } from "./india-specialty-profile";

export const hematologyIndiaProfile = indiaSpecialtyProfile({
  specialtySlug: "hematology",
  terminology: {
    careItem: "hematology service",
    careItems: "hematology services",
    practitioner: "hematologist",
    practitioners: "hematologists",
    durationLabel: "Typical course or stay",
  },
  definition:
    "Hematology assesses disorders of blood, marrow and lymphatic tissue, including malignant and non-malignant disease. Diagnosis and treatment depend on blood counts, morphology, marrow findings, flow cytometry, molecular results, transfusion needs, infection risk and organ function.",
  selectionFocus: [
    "confirmed lineage and disease classification",
    "donor, HLA and transplant eligibility where relevant",
    "cytopenia, infection, bleeding and organ-function risk",
  ],
  records: [
    "Serial complete blood counts and peripheral-smear reports",
    "Bone-marrow aspirate, biopsy, flow-cytometry and cytogenetic reports",
    "Molecular testing and treatment-response records",
    "Transfusion, infection and HLA-typing history",
  ],
  costFocus: [
    "diagnostic episode, treatment cycle or complete transplant programme",
    "donor work-up, medicines, blood products, isolation and complication support",
  ],
  relatedSpecialtySlugs: ["medical-oncology", "pediatric-hematology", "nephrology"],
});
