import { indiaSpecialtyProfile } from "./india-specialty-profile";

export const ophthalmologyIndiaProfile = indiaSpecialtyProfile({
  specialtySlug: "ophthalmology",
  terminology: {
    careItem: "eye procedure",
    careItems: "eye procedures",
    practitioner: "ophthalmologist",
    practitioners: "ophthalmologists",
    durationLabel: "Typical procedure or recovery",
  },
  definition:
    "Ophthalmology evaluates and treats cataract, corneal, retinal, glaucoma, refractive and ocular-motility conditions. Procedure choice depends on visual function, examination, ocular imaging, pressure, biometry, retinal or optic-nerve status and realistic visual goals.",
  selectionFocus: [
    "anterior-segment, retinal, glaucoma or motility diagnosis",
    "visual acuity, pressure, imaging and biometry",
    "lens, corneal, retinal and refractive alternatives",
  ],
  records: [
    "Visual-acuity and refraction records",
    "Slit-lamp, retinal, OCT and pressure findings",
    "Biometry, corneal topography or visual-field tests",
    "Previous eye procedure and implanted-lens details",
  ],
  costFocus: [
    "eye, procedure, lens or device and whether treatment is staged",
    "imaging, consumables, anaesthesia, medicines and follow-up",
  ],
  relatedSpecialtySlugs: ["neurology", "pediatric-orthopaedic", "cosmetic-surgery"],
});
