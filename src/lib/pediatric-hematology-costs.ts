export const PEDIATRIC_HEMATOLOGY_COST: Record<string, { us: string; partner: string; stay: string }> = {
  "Pediatric Bone Marrow Transplantation": {
    us: "$180,000–$420,000",
    partner: "$28,000–$75,000",
    stay: "6–12 weeks with a parent nearby",
  },
  "Matched Sibling Donor Transplant": {
    us: "$180,000–$380,000",
    partner: "$28,000–$70,000",
    stay: "6–10 weeks with a parent nearby",
  },
  "Hematopoietic Stem Cell Transplantation": {
    us: "$150,000–$400,000",
    partner: "$24,000–$70,000",
    stay: "4–10 weeks in a paediatric unit",
  },
};

export const PEDIATRIC_HEMATOLOGY_SUMMARIES: Record<string, string> = {
  "Pediatric Bone Marrow Transplantation":
    "A child’s BMT is a paediatric-unit protocol: conditioning, infection windows and a parent who can stay. Adult transplant floors are not a substitute because a brochure says they treat ‘all ages’.",
  "Matched Sibling Donor Transplant":
    "A fully matched brother or sister as donor. HLA confirmation, donor work-up and GVHD plan are written before anyone books six weeks in Delhi NCR with a child.",
  "Hematopoietic Stem Cell Transplantation":
    "HSCT for paediatric leukaemia, marrow failure or selected solid tumours. The product is a named paediatric transplant physician and a unit that already runs children — not a first international experiment.",
};
