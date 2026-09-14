import { indiaSpecialtyProfile } from "./india-specialty-profile";

export const pediatricCardiacSurgeryIndiaProfile = indiaSpecialtyProfile({
  specialtySlug: "pediatric-cardiac-surgery",
  terminology: {
    careItem: "congenital heart procedure",
    careItems: "congenital heart procedures",
    practitioner: "pediatric cardiac surgeon",
    practitioners: "pediatric cardiac surgeons",
    durationLabel: "Typical procedure or stay",
  },
  definition:
    "Pediatric cardiac surgery treats congenital heart defects in newborns, children and selected adults with congenital disease. Timing and technique depend on precise anatomy, oxygenation, pressure and flow effects, growth, previous palliation and the need for staged treatment.",
  selectionFocus: [
    "segmental congenital anatomy and haemodynamics",
    "age, weight, oxygenation and growth",
    "single-stage repair, palliation or catheter-based alternatives",
  ],
  records: [
    "Congenital echocardiogram images and report",
    "Cardiac CT, MRI or catheterization data",
    "Birth, growth, oxygen-saturation and medication history",
    "Prior shunt, repair or catheter-procedure notes",
  ],
  costFocus: [
    "the exact repair, palliation or catheter procedure",
    "pediatric perfusion, implants, intensive care and possible staged treatment",
  ],
  relatedSpecialtySlugs: ["cardiac-surgery", "cardiology", "pediatric-hematology"],
});
