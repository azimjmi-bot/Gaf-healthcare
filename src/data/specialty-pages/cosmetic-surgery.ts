import { indiaSpecialtyProfile } from "./india-specialty-profile";

export const cosmeticSurgeryIndiaProfile = indiaSpecialtyProfile({
  specialtySlug: "cosmetic-surgery",
  terminology: {
    careItem: "plastic surgery procedure",
    careItems: "plastic surgery procedures",
    practitioner: "plastic surgeon",
    practitioners: "plastic surgeons",
    durationLabel: "Typical procedure or stay",
  },
  definition:
    "Cosmetic and reconstructive plastic surgery changes form, restores tissue or addresses functional consequences using procedure-specific operative planning. Suitability depends on anatomy, goals, skin and tissue quality, previous surgery, healing risk, anaesthesia and whether expectations are clinically achievable.",
  selectionFocus: [
    "anatomy, function and clearly defined treatment goals",
    "skin, scar, smoking, healing and anaesthetic risk",
    "implant, graft, staged-procedure and revision considerations",
  ],
  records: [
    "Standardized clinical photographs when appropriate",
    "Previous plastic-surgery procedure and implant records",
    "Medical conditions, medicines, smoking and healing history",
    "Relevant imaging or specialist reports for reconstructive cases",
  ],
  costFocus: [
    "the named procedure, treated areas and whether surgery is staged",
    "implants, garments, grafts, anaesthesia, facility and aftercare",
  ],
  relatedSpecialtySlugs: ["ent", "surgical-oncology", "ophthalmology"],
});
