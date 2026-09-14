import { indiaSpecialtyProfile } from "./india-specialty-profile";

export const spineSurgeryIndiaProfile = indiaSpecialtyProfile({
  specialtySlug: "spine-surgery",
  terminology: {
    careItem: "spine procedure",
    careItems: "spine procedures",
    practitioner: "spine surgeon",
    practitioners: "spine surgeons",
    durationLabel: "Typical procedure or stay",
  },
  definition:
    "Spine surgery treats selected compression, instability, deformity, trauma and tumour conditions after symptoms, neurological findings and imaging are correlated. The plan must distinguish decompression from fusion, define levels and approach, and compare surgery with non-operative care where appropriate.",
  selectionFocus: [
    "symptom, examination and imaging correlation",
    "neurological deficit, instability, deformity and pain source",
    "levels, approach, implants and non-operative alternatives",
  ],
  records: [
    "Spine MRI and CT images in DICOM format",
    "Standing X-rays or dynamic films where relevant",
    "Neurological examination and electrodiagnostic reports",
    "Previous spine procedure and implant records",
  ],
  costFocus: [
    "region, number of levels, approach and decompression or fusion scope",
    "implants, navigation, monitoring, graft, intensive care and rehabilitation",
  ],
  relatedSpecialtySlugs: ["neurosurgery", "neurology", "orthopedics"],
});
