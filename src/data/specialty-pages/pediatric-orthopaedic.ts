import { indiaSpecialtyProfile } from "./india-specialty-profile";

export const pediatricOrthopaedicIndiaProfile = indiaSpecialtyProfile({
  specialtySlug: "pediatric-orthopaedic",
  terminology: {
    careItem: "pediatric orthopaedic procedure",
    careItems: "pediatric orthopaedic procedures",
    practitioner: "pediatric orthopaedic surgeon",
    practitioners: "pediatric orthopaedic surgeons",
    durationLabel: "Typical procedure or stay",
  },
  definition:
    "Pediatric orthopaedics treats congenital, developmental, growth-related and traumatic bone and joint conditions in children. Decisions depend on age, growth remaining, alignment, function, neuromuscular status, imaging and the effect of treatment on future development.",
  selectionFocus: [
    "age, growth remaining and developmental stage",
    "alignment, gait, function and neuromuscular status",
    "casting, guided growth, reconstruction and staged-treatment alternatives",
  ],
  records: [
    "Growth chart and developmental history",
    "Standing or age-appropriate X-rays and relevant MRI or CT",
    "Gait, neurological and physiotherapy assessments",
    "Previous casting, bracing or operation records",
  ],
  costFocus: [
    "the exact correction, side, level and whether treatment is staged",
    "pediatric implants, casts, imaging, rehabilitation and family stay",
  ],
  relatedSpecialtySlugs: ["orthopedics", "spine-surgery", "neurology"],
});
