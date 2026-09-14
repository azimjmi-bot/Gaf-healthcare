import { indiaSpecialtyProfile } from "./india-specialty-profile";

export const urologyIndiaProfile = indiaSpecialtyProfile({
  specialtySlug: "urology",
  terminology: {
    careItem: "urology procedure",
    careItems: "urology procedures",
    practitioner: "urologist",
    practitioners: "urologists",
    durationLabel: "Typical procedure or stay",
  },
  definition:
    "Urology treats urinary-tract, prostate, kidney, bladder and selected male-reproductive conditions with endoscopic, percutaneous, laparoscopic, robotic or open procedures. Choice depends on diagnosis, anatomy, stone or tumour burden, kidney function, infection, continence and fertility goals.",
  selectionFocus: [
    "kidney, ureter, bladder, prostate or reproductive diagnosis",
    "imaging, renal function, infection and obstruction",
    "organ preservation, continence, fertility and minimally invasive alternatives",
  ],
  records: [
    "Urinary CT, MRI, ultrasound or nuclear-renogram images",
    "Urine culture, kidney-function and PSA results where relevant",
    "Pathology and cystoscopy reports",
    "Previous stone, prostate, bladder or kidney procedure notes",
  ],
  costFocus: [
    "the exact endoscopic, stone, reconstructive or cancer procedure",
    "laser, disposable scopes, stents, implants, pathology and admission",
  ],
  relatedSpecialtySlugs: ["nephrology", "surgical-oncology", "gynecology"],
});
