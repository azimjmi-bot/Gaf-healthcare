import { indiaSpecialtyProfile } from "./india-specialty-profile";

export const cardiologyIndiaProfile = indiaSpecialtyProfile({
  specialtySlug: "cardiology",
  terminology: {
    careItem: "cardiology procedure",
    careItems: "cardiology procedures",
    practitioner: "cardiologist",
    practitioners: "cardiologists",
    durationLabel: "Typical procedure or stay",
  },
  definition:
    "Cardiology assesses and treats coronary, rhythm, valve, structural and heart-failure conditions with medicines, imaging and catheter-based procedures. A safe plan requires a defined diagnosis, anatomy, symptom burden, ventricular function, rhythm and comparison with medical or surgical alternatives.",
  selectionFocus: [
    "coronary, rhythm, valve or structural diagnosis",
    "ventricular function and kidney, bleeding or stroke risk",
    "medical, catheter-based and surgical alternatives",
  ],
  records: [
    "ECG and rhythm-monitoring reports",
    "Echocardiogram images and report",
    "Coronary angiogram, CT or cardiac MRI",
    "Current cardiac medicines and prior intervention notes",
  ],
  costFocus: [
    "diagnostic study, device or named catheter intervention",
    "contrast, implants, electrophysiology mapping, observation and intensive care",
  ],
  relatedSpecialtySlugs: ["cardiac-surgery", "pediatric-cardiac-surgery", "nephrology"],
});
