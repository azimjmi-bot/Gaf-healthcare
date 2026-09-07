export const HEMATOLOGY_COST: Record<string, { us: string; partner: string; stay: string }> = {
  "Autologous Stem Cell Transplant": {
    us: "$140,000–$320,000",
    partner: "$18,000–$48,000",
    stay: "3–5 weeks in or near the unit",
  },
  "Allogeneic Stem Cell Transplant": {
    us: "$200,000–$420,000",
    partner: "$30,000–$80,000",
    stay: "6–10 weeks nearby",
  },
  "Haploidentical Stem Cell Transplant": {
    us: "$220,000–$450,000",
    partner: "$35,000–$85,000",
    stay: "6–10 weeks nearby",
  },
  "Bone Marrow Biopsy": {
    us: "$2,000–$6,000",
    partner: "$300–$900",
    stay: "Day-care",
  },
  "Bone Marrow Aspiration": {
    us: "$1,500–$5,000",
    partner: "$250–$800",
    stay: "Day-care",
  },
  "Matched Unrelated Donor Transplant": {
    us: "$250,000–$500,000",
    partner: "$40,000–$95,000",
    stay: "6–12 weeks nearby",
  },
};

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
