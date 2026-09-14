import { indiaSpecialtyProfile } from "./india-specialty-profile";

export const entIndiaProfile = indiaSpecialtyProfile({
  specialtySlug: "ent",
  terminology: {
    careItem: "ENT procedure",
    careItems: "ENT procedures",
    practitioner: "ENT specialist",
    practitioners: "ENT specialists",
    durationLabel: "Typical procedure or stay",
  },
  definition:
    "Ear, nose and throat care covers hearing, sinus, airway, voice, swallowing, sleep and head-and-neck disorders. Procedure choice depends on examination, endoscopy, hearing or vestibular tests, imaging, pathology, airway risk and the functional outcome being pursued.",
  selectionFocus: [
    "ear, nasal, sinus, airway, voice or swallowing diagnosis",
    "endoscopic, audiological and imaging findings",
    "hearing, breathing, speech and nerve-preservation goals",
  ],
  records: [
    "ENT examination and endoscopy reports",
    "Audiogram, tympanometry or vestibular testing",
    "CT or MRI images for sinus, temporal-bone or neck disease",
    "Pathology and previous ENT operation notes",
  ],
  costFocus: [
    "the exact endoscopic, microscopic, airway or implant procedure",
    "navigation, hearing implant, prosthesis, pathology and postoperative monitoring",
  ],
  relatedSpecialtySlugs: ["pulmonology", "neurosurgery", "cosmetic-surgery"],
});
