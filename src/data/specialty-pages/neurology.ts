import { indiaSpecialtyProfile } from "./india-specialty-profile";

export const neurologyIndiaProfile = indiaSpecialtyProfile({
  specialtySlug: "neurology",
  terminology: {
    careItem: "neurology service",
    careItems: "neurology services",
    practitioner: "neurologist",
    practitioners: "neurologists",
    durationLabel: "Typical test, treatment or stay",
  },
  definition:
    "Neurology diagnoses and manages disorders of the brain, spinal cord, nerves and muscles using clinical examination, imaging, electrophysiology and disease-specific treatment. The pathway depends on onset, neurological pattern, urgency, test validity, functional impact and whether a procedural or surgical opinion is needed.",
  selectionFocus: [
    "time course and localization of neurological symptoms",
    "imaging, EEG, nerve, muscle and laboratory evidence",
    "stroke, seizure, movement, immune and neuromuscular treatment risks",
  ],
  records: [
    "Neurology clinic and examination notes",
    "Brain or spine MRI and CT images",
    "EEG, EMG, nerve-conduction or sleep-study reports",
    "Medicine trials, response and adverse-effect history",
  ],
  costFocus: [
    "diagnostic test, monitoring admission or named treatment course",
    "devices, medicines, imaging, laboratory work and rehabilitation",
  ],
  relatedSpecialtySlugs: ["neurosurgery", "spine-surgery", "ophthalmology"],
});
