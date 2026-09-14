import { indiaSpecialtyProfile } from "./india-specialty-profile";

export const bariatricSurgeryIndiaProfile = indiaSpecialtyProfile({
  specialtySlug: "bariatric-surgery",
  terminology: {
    careItem: "metabolic operation",
    careItems: "metabolic operations",
    practitioner: "bariatric surgeon",
    practitioners: "bariatric surgeons",
    durationLabel: "Typical operation or stay",
  },
  definition:
    "Bariatric and metabolic surgery treats selected patients with obesity and related metabolic disease through procedures that alter stomach capacity, intestinal flow or both. Selection requires body-mass and comorbidity assessment, previous weight treatment, nutrition and psychological review, anaesthetic risk and commitment to lifelong follow-up.",
  selectionFocus: [
    "weight history and obesity-related disease",
    "nutrition, eating behaviour and psychological readiness",
    "reflux, previous abdominal surgery and long-term follow-up capacity",
  ],
  records: [
    "Weight, height and longitudinal weight history",
    "Diabetes, sleep-apnoea, liver and cardiovascular assessments",
    "Nutrition and psychological evaluations",
    "Previous bariatric or abdominal operation notes",
  ],
  costFocus: [
    "the exact primary or revision operation",
    "stapling devices, anaesthesia, leak assessment, ward stay and nutritional follow-up",
  ],
  relatedSpecialtySlugs: ["gastroenterology", "surgical-gastroenterology", "cardiology"],
});
