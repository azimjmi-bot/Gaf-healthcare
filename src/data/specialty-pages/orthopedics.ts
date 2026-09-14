import { indiaSpecialtyProfile } from "./india-specialty-profile";

export const orthopedicsIndiaProfile = indiaSpecialtyProfile({
  specialtySlug: "orthopedics",
  terminology: {
    careItem: "orthopaedic procedure",
    careItems: "orthopaedic procedures",
    practitioner: "orthopaedic surgeon",
    practitioners: "orthopaedic surgeons",
    durationLabel: "Typical procedure or stay",
  },
  definition:
    "Orthopaedics treats joint degeneration, sports injury, trauma, non-union and limb conditions using non-operative care, arthroscopy, fixation, reconstruction or replacement. Selection depends on symptoms, examination, imaging, alignment, bone quality, activity goals and previous treatment.",
  selectionFocus: [
    "joint, ligament, fracture or limb diagnosis",
    "pain, instability, alignment, bone quality and function",
    "rehabilitation, implant and joint-preservation alternatives",
  ],
  records: [
    "Weight-bearing X-rays and relevant MRI or CT",
    "Clinical examination and functional assessment",
    "Previous injection, physiotherapy and operation records",
    "Implant details for revision surgery",
  ],
  costFocus: [
    "the exact joint, side, implant and primary or revision scope",
    "navigation or robotics, grafts, fixation, ward stay and rehabilitation",
  ],
  relatedSpecialtySlugs: ["pediatric-orthopaedic", "spine-surgery", "neurology"],
});
