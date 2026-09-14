import { indiaSpecialtyProfile } from "./india-specialty-profile";

export const nephrologyIndiaProfile = indiaSpecialtyProfile({
  specialtySlug: "nephrology",
  terminology: {
    careItem: "kidney-care service",
    careItems: "kidney-care services",
    practitioner: "nephrologist",
    practitioners: "nephrologists",
    durationLabel: "Typical session, procedure or stay",
  },
  definition:
    "Nephrology manages acute and chronic kidney disease, dialysis, immune-mediated kidney disorders and medical aspects of transplantation. Decisions depend on kidney function trend, urine findings, fluid and electrolyte status, blood pressure, imaging, biopsy evidence, comorbidities and transplant eligibility.",
  selectionFocus: [
    "acute versus chronic kidney dysfunction and cause",
    "fluid, electrolyte, blood-pressure and dialysis needs",
    "biopsy, immune treatment, access and transplant pathways",
  ],
  records: [
    "Serial creatinine, eGFR, electrolyte and urine-protein results",
    "Urinalysis, immune and infection investigations",
    "Kidney ultrasound, CT or biopsy report and slides",
    "Dialysis prescription, vascular-access and transplant records",
  ],
  costFocus: [
    "consultation, biopsy, dialysis session, access procedure or transplant programme",
    "medicines, laboratory monitoring, disposables, donor work and admission",
  ],
  relatedSpecialtySlugs: ["urology", "cardiology", "hematology"],
});
