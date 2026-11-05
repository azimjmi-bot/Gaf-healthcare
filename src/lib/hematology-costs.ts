export { HEMATOLOGY_COST } from "./treatment-cost-ranges";
export const HEMATOLOGY_SUMMARIES: Record<string, string> = {
  "Autologous Stem Cell Transplant":
    "The patient’s own stem cells are collected, high-dose therapy is given, then the cells return. It is a haematology protocol with an infection window — not a day-care infusion.",
  "Allogeneic Stem Cell Transplant":
    "A donor graft after conditioning. GVHD, CMV and a named transplant physician are the product, not a hotel week in Hyderabad.",
  "Haploidentical Stem Cell Transplant":
    "A half-matched related donor when a full match is not on the registry. PTCy and infection protocol decide whether this floor should run it.",
  "Bone Marrow Biopsy":
    "A trephine for diagnosis or staging. The report belongs to haematopathology, not a screenshot of a cell count.",
  "Bone Marrow Aspiration":
    "Marrow aspirate for morphology, flow and genetics. Often paired with biopsy on the same sitting.",
  "Matched Unrelated Donor Transplant":
    "An unrelated donor from a registry. Search time, HLA and graft source are written before anyone books six weeks in Delhi NCR.",
};
