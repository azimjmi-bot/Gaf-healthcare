import { indiaSpecialtyProfile } from "./india-specialty-profile";

export const dentistryIndiaProfile = indiaSpecialtyProfile({
  specialtySlug: "dentistry",
  terminology: {
    careItem: "dental procedure",
    careItems: "dental procedures",
    practitioner: "dentist",
    practitioners: "dentists",
    durationLabel: "Typical procedure or stay",
  },
  definition:
    "Dentistry treats teeth, gums, bite and jaw conditions through restorative, implant, orthodontic, surgical and aesthetic care. Selection depends on diagnosis, imaging, remaining tooth structure, periodontal health, occlusion, medical fitness and the patient's functional and aesthetic goals.",
  selectionFocus: [
    "tooth, gum, bite or jaw diagnosis",
    "imaging, periodontal status and remaining tooth structure",
    "materials, staging, occlusion and long-term maintenance",
  ],
  records: [
    "Recent dental radiographs, OPG or CBCT where relevant",
    "Periodontal charting and existing restoration inventory",
    "Orthodontic or occlusal records for bite-change plans",
    "Medical history, anticoagulants and allergy list",
  ],
  costFocus: [
    "the exact restorative, implant, orthodontic or surgical procedure",
    "materials, laboratory fees, staging visits, imaging and aftercare",
  ],
  relatedSpecialtySlugs: ["ent", "cosmetic-surgery", "orthopedics"],
});
