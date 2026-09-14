import { indiaSpecialtyProfile } from "./india-specialty-profile";

export const gynecologyIndiaProfile = indiaSpecialtyProfile({
  specialtySlug: "gynecology",
  terminology: {
    careItem: "gynecology procedure",
    careItems: "gynecology procedures",
    practitioner: "gynecologist",
    practitioners: "gynecologists",
    durationLabel: "Typical procedure or stay",
  },
  definition:
    "Gynecology treats uterine, ovarian, cervical, pelvic-floor and reproductive-health conditions through medical, endoscopic, minimally invasive or open care. Selection depends on diagnosis, symptoms, imaging, pathology, fertility goals, menopausal status and cancer risk.",
  selectionFocus: [
    "uterine, ovarian, cervical or pelvic-floor diagnosis",
    "bleeding, pain, imaging, pathology and anaemia",
    "fertility, organ preservation and minimally invasive alternatives",
  ],
  records: [
    "Pelvic ultrasound and MRI images where relevant",
    "Cervical screening, hysteroscopy and pathology reports",
    "Menstrual, obstetric and fertility history",
    "Previous pelvic-operation notes and current blood tests",
  ],
  costFocus: [
    "the exact diagnostic, fertility-preserving or definitive procedure",
    "laparoscopy or robotics, pathology, blood products and postoperative care",
  ],
  relatedSpecialtySlugs: ["urology", "surgical-oncology", "medical-oncology"],
});
