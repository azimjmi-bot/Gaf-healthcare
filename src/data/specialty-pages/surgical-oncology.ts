import { indiaSpecialtyProfile } from "./india-specialty-profile";

export const surgicalOncologyIndiaProfile = indiaSpecialtyProfile({
  specialtySlug: "surgical-oncology",
  terminology: {
    careItem: "cancer operation",
    careItems: "cancer operations",
    practitioner: "surgical oncologist",
    practitioners: "surgical oncologists",
    durationLabel: "Typical operation or stay",
  },
  definition:
    "Surgical oncology evaluates whether a solid tumour can and should be removed, how wide the operation must be, and how surgery fits with systemic therapy or radiation. The plan depends on tumour site, stage, resectability, pathology, reconstruction needs and the patient’s operative fitness.",
  selectionFocus: [
    "site-specific staging and resectability",
    "margin, nodal and organ-preservation goals",
    "reconstruction, anaesthesia and postoperative support",
  ],
  records: [
    "Pathology report, slides or blocks",
    "Site-specific staging images in DICOM format",
    "Prior chemotherapy, immunotherapy or radiation summary",
    "Operative notes from previous cancer surgery",
  ],
  costFocus: [
    "the exact resection and reconstruction planned",
    "theatre time, implants, pathology, ward or intensive-care requirements",
  ],
  relatedSpecialtySlugs: ["medical-oncology", "radiation-oncology", "gastroenterology"],
});
