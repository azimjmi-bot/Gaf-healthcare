import { indiaSpecialtyProfile } from "./india-specialty-profile";

export const cardiacSurgeryIndiaProfile = indiaSpecialtyProfile({
  specialtySlug: "cardiac-surgery",
  terminology: {
    careItem: "heart operation",
    careItems: "heart operations",
    practitioner: "cardiac surgeon",
    practitioners: "cardiac surgeons",
    durationLabel: "Typical operation or stay",
  },
  definition:
    "Cardiac surgery treats selected coronary, valve, aortic and structural heart disease through open, minimally invasive or hybrid operations. Selection depends on anatomy, symptom burden, ventricular function, coronary and valve findings, operative risk and whether catheter-based treatment is appropriate.",
  selectionFocus: [
    "coronary, valve and aortic anatomy",
    "ventricular, lung, kidney and neurological risk",
    "open, minimally invasive, hybrid and catheter alternatives",
  ],
  records: [
    "Echocardiogram images and report",
    "Coronary angiogram or CT angiography in DICOM format",
    "ECG, rhythm monitoring and cardiac-function records",
    "Previous cardiac operation or catheter-procedure notes",
  ],
  costFocus: [
    "the named operation, graft, valve or aortic prosthesis",
    "heart-lung bypass, intensive care, blood products and rehabilitation",
  ],
  relatedSpecialtySlugs: ["cardiology", "pediatric-cardiac-surgery", "pulmonology"],
});
