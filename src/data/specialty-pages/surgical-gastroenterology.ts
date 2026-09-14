import { indiaSpecialtyProfile } from "./india-specialty-profile";

export const surgicalGastroenterologyIndiaProfile = indiaSpecialtyProfile({
  specialtySlug: "surgical-gastroenterology",
  terminology: {
    careItem: "digestive operation",
    careItems: "digestive operations",
    practitioner: "GI surgeon",
    practitioners: "GI surgeons",
    durationLabel: "Typical operation or stay",
  },
  definition:
    "Surgical gastroenterology treats selected oesophageal, stomach, bowel, liver, pancreatic, biliary and abdominal-wall disease. Planning depends on diagnosis, anatomy, disease extent, nutrition, organ function, previous operations and whether endoscopic, laparoscopic, robotic or open treatment is most appropriate.",
  selectionFocus: [
    "site-specific anatomy and disease extent",
    "nutrition, liver, pancreatic and bowel function",
    "endoscopic, minimally invasive and open alternatives",
  ],
  records: [
    "Endoscopy, pathology and prior biopsy reports",
    "Abdominal CT, MRI, MRCP or PET images",
    "Liver, kidney, nutrition and coagulation tests",
    "Previous abdominal-operation notes and discharge summaries",
  ],
  costFocus: [
    "the named resection, reconstruction or transplant programme",
    "staplers, energy devices, implants, pathology, intensive care and nutrition support",
  ],
  relatedSpecialtySlugs: ["gastroenterology", "surgical-oncology", "bariatric-surgery"],
});
