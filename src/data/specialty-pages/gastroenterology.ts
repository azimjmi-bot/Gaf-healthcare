import { indiaSpecialtyProfile } from "./india-specialty-profile";

export const gastroenterologyIndiaProfile = indiaSpecialtyProfile({
  specialtySlug: "gastroenterology",
  terminology: {
    careItem: "digestive-care procedure",
    careItems: "digestive-care procedures",
    practitioner: "gastroenterologist",
    practitioners: "gastroenterologists",
    durationLabel: "Typical procedure or stay",
  },
  definition:
    "Gastroenterology evaluates and treats diseases of the oesophagus, stomach, bowel, liver, pancreas and bile ducts using clinical assessment, endoscopy, imaging and medical therapy. The correct procedure depends on symptoms, anatomy, laboratory findings, bleeding or infection risk and the diagnostic or therapeutic goal.",
  selectionFocus: [
    "upper GI, bowel, liver, pancreatic or biliary diagnosis",
    "endoscopic findings, imaging and laboratory evidence",
    "bleeding, infection, sedation and perforation risk",
  ],
  records: [
    "Prior endoscopy reports, images and pathology",
    "Abdominal CT, MRI, MRCP or ultrasound images",
    "Liver tests, blood count and coagulation results",
    "Digestive symptoms, medicines and previous procedure notes",
  ],
  costFocus: [
    "diagnostic versus therapeutic endoscopy and the exact intervention",
    "sedation, devices, pathology, imaging guidance and admission",
  ],
  relatedSpecialtySlugs: ["surgical-gastroenterology", "bariatric-surgery", "surgical-oncology"],
});
