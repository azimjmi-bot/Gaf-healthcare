import { indiaSpecialtyProfile } from "./india-specialty-profile";

export const neurosurgeryIndiaProfile = indiaSpecialtyProfile({
  specialtySlug: "neurosurgery",
  terminology: {
    careItem: "neurosurgical procedure",
    careItems: "neurosurgical procedures",
    practitioner: "neurosurgeon",
    practitioners: "neurosurgeons",
    durationLabel: "Typical procedure or stay",
  },
  definition:
    "Neurosurgery treats selected brain, spine, nerve and cerebrovascular conditions using open, endoscopic, stereotactic or endovascular techniques. Planning depends on neurological findings, lesion location, imaging, pathology, urgency, functional risk and comparison with observation, radiation or medical care.",
  selectionFocus: [
    "brain, spine, nerve or vascular anatomy",
    "neurological deficit, seizure, pressure and urgency",
    "open, endoscopic, stereotactic, endovascular and non-operative alternatives",
  ],
  records: [
    "Brain or spine MRI and CT images in DICOM format",
    "Angiography, functional imaging or tractography when performed",
    "Neurological, seizure and medicine history",
    "Pathology and previous neurosurgical procedure notes",
  ],
  costFocus: [
    "the exact lesion, approach and open or minimally invasive technique",
    "navigation, monitoring, implants, intensive care and pathology",
  ],
  relatedSpecialtySlugs: ["neurology", "spine-surgery", "radiation-oncology"],
});
