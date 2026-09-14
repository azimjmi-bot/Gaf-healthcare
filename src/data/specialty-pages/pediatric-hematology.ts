import { indiaSpecialtyProfile } from "./india-specialty-profile";

export const pediatricHematologyIndiaProfile = indiaSpecialtyProfile({
  specialtySlug: "pediatric-hematology",
  terminology: {
    careItem: "pediatric blood-care service",
    careItems: "pediatric blood-care services",
    practitioner: "pediatric hematologist",
    practitioners: "pediatric hematologists",
    durationLabel: "Typical course or stay",
  },
  definition:
    "Pediatric hematology manages blood and marrow disorders in infants, children and adolescents using age- and weight-specific assessment. The pathway must account for diagnosis, growth, development, prior treatment, infection and transfusion history, donor options and long-term effects.",
  selectionFocus: [
    "age-specific disease classification and dosing",
    "growth, fertility and late-effect considerations",
    "family support, donor assessment and pediatric intensive-care access",
  ],
  records: [
    "Pediatric blood counts and smear reports",
    "Marrow, flow-cytometry, cytogenetic and molecular reports",
    "Growth chart, vaccination and infection history",
    "Transfusion, donor and HLA records",
  ],
  costFocus: [
    "weight-based treatment, diagnostic episode or transplant programme",
    "pediatric ward, donor work, blood products, isolation and family accommodation",
  ],
  relatedSpecialtySlugs: ["hematology", "medical-oncology", "pediatric-cardiac-surgery"],
});
