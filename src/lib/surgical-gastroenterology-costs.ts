export const SURGICAL_GASTROENTEROLOGY_COST: Record<string, { us: string; partner: string; stay: string }> = {
  "Liver Transplantation": {
    us: "$150,000–$400,000",
    partner: "$28,000–$55,000",
    stay: "14–28 nights; outpatient follow-up in-city",
  },
  "Living Donor Liver Transplantation": {
    us: "$180,000–$450,000",
    partner: "$32,000–$62,000",
    stay: "Donor 7–12 nights; recipient 14–28 nights",
  },
  "Deceased Donor Liver Transplantation": {
    us: "$150,000–$380,000",
    partner: "$28,000–$52,000",
    stay: "14–28 nights; wait-list timing varies",
  },
  "Pediatric Liver Transplantation": {
    us: "$180,000–$450,000",
    partner: "$32,000–$65,000",
    stay: "18–35 nights; paediatric ICU",
  },
  "Liver Retransplantation": {
    us: "$200,000–$500,000",
    partner: "$35,000–$70,000",
    stay: "18–35 nights",
  },
  "Whipple Procedure (Pancreaticoduodenectomy)": {
    us: "$60,000–$150,000",
    partner: "$14,000–$32,000",
    stay: "10–18 nights",
  },
  "Distal Pancreatectomy": {
    us: "$40,000–$95,000",
    partner: "$9,000–$22,000",
    stay: "6–12 nights",
  },
  Pancreatectomy: {
    us: "$50,000–$130,000",
    partner: "$12,000–$30,000",
    stay: "8–16 nights",
  },
  "Biliary Reconstruction": {
    us: "$35,000–$85,000",
    partner: "$8,000–$20,000",
    stay: "7–14 nights",
  },
  "Gallbladder Cancer Surgery": {
    us: "$30,000–$80,000",
    partner: "$7,000–$18,000",
    stay: "6–12 nights",
  },
  "Bile Duct Cancer Surgery": {
    us: "$45,000–$110,000",
    partner: "$10,000–$26,000",
    stay: "8–16 nights",
  },
  "Anti-Reflux Surgery (Nissen Fundoplication)": {
    us: "$18,000–$40,000",
    partner: "$4,000–$9,500",
    stay: "2–5 nights",
  },
  "Hiatal Hernia Surgery": {
    us: "$16,000–$38,000",
    partner: "$3,800–$9,000",
    stay: "2–5 nights",
  },
  "Heller Myotomy for Achalasia": {
    us: "$20,000–$45,000",
    partner: "$4,500–$11,000",
    stay: "3–6 nights",
  },
  "Colorectal Cancer Surgery": {
    us: "$35,000–$85,000",
    partner: "$8,000–$20,000",
    stay: "6–12 nights",
  },
  "Colorectal Resection": {
    us: "$30,000–$75,000",
    partner: "$7,000–$18,000",
    stay: "5–10 nights",
  },
  "Low Anterior Resection (LAR)": {
    us: "$35,000–$85,000",
    partner: "$8,000–$20,000",
    stay: "6–12 nights",
  },
  "Abdominoperineal Resection (APR)": {
    us: "$40,000–$95,000",
    partner: "$9,000–$22,000",
    stay: "7–14 nights",
  },
  "Total Mesorectal Excision (TME)": {
    us: "$38,000–$90,000",
    partner: "$8,500–$21,000",
    stay: "6–12 nights",
  },
  "Ostomy / Stoma Surgery": {
    us: "$12,000–$30,000",
    partner: "$2,500–$6,800",
    stay: "4–8 nights",
  },
  "Gastric Bypass Surgery": {
    us: "$20,000–$38,000",
    partner: "$6,000–$11,000",
    stay: "3–6 nights",
  },
};

export const SURGICAL_GASTROENTEROLOGY_SUMMARIES: Record<string, string> = {
  "Liver Transplantation":
    "Replace a failing liver when MELD, imaging and a named HPB list already agree. Living versus deceased donor is a different sheet; immunosuppression is written after records, not from a brochure wait-list.",
  "Living Donor Liver Transplantation":
    "A related or altruistic donor graft when anatomy and ethics already allow it. Donor and recipient lists in the same Indian city — not two tourist theatres.",
  "Deceased Donor Liver Transplantation":
    "A deceased-donor graft when the wait-list and blood group are honest. Allocation rules and a named transplant ICU in Delhi NCR, Mumbai, Bengaluru, Chennai or Hyderabad.",
  "Pediatric Liver Transplantation":
    "A child’s graft when biliary atresia, metabolic disease or acute failure is the brief. Paediatric hepatology and a paediatric ICU on the same campus.",
  "Liver Retransplantation":
    "A second graft when the first has failed. Cause of failure and a named retransplant list — not a first international experiment.",
  "Whipple Procedure (Pancreaticoduodenectomy)":
    "Resect the pancreatic head, duodenum and bile duct when imaging already says the lesion is operable. The surgical-oncology Whipple sheet shares the clinical idea; this slug is the HPB list for later pSEO.",
  "Distal Pancreatectomy":
    "Remove the pancreatic body and tail, with or without spleen, when the lesion sits left of the portal vein. Approach and a named HPB list — not a hotel length in Hyderabad.",
  Pancreatectomy:
    "Resect pancreas beyond a distal or Whipple template when the disease map requires it. Reconstruction and enzyme replacement are written after records.",
  "Biliary Reconstruction":
    "Repair or reconstruct a bile duct after injury, stricture or resection. Hepaticojejunostomy and a named HPB list in India.",
  "Gallbladder Cancer Surgery":
    "Radical cholecystectomy and liver bed when staging already allows it. Port-site and node plan are not assumed from a package name.",
  "Bile Duct Cancer Surgery":
    "Resect cholangiocarcinoma when future-liver remnant and vascular anatomy already allow it. Drainage first if ERCP or PTBD is still the honest bridge.",
  "Anti-Reflux Surgery (Nissen Fundoplication)":
    "Wrap the fundus when manometry and pH already prove reflux that medicine cannot hold. Endoscopic POEM is a different specialty sheet.",
  "Hiatal Hernia Surgery":
    "Reduce a hiatus hernia and restore the crura when imaging is honest. Mesh versus suture and a named foregut list — not a same-week tourist wrap.",
  "Heller Myotomy for Achalasia":
    "Surgical myotomy when POEM is not the honest first option. Manometry first; a named foregut list second.",
  "Colorectal Cancer Surgery":
    "Resect a colorectal primary when the tumour board has already sat. LAR, APR and TME sit on separate sheets when the anatomy needs a named operation.",
  "Colorectal Resection":
    "Segmental resection when cancer is not the only brief — diverticular disease, IBD or a selected polyp. Stoma risk is written before anyone books six nights.",
  "Low Anterior Resection (LAR)":
    "Sphincter-preserving rectal resection when height and TME plane allow it. Diverting stoma is a separate conversation, not a surprise in recovery.",
  "Abdominoperineal Resection (APR)":
    "Remove rectum and anus when sphincter salvage is not honest. Permanent stoma teaching before travel, not after the perineal wound.",
  "Total Mesorectal Excision (TME)":
    "The plane for rectal cancer when quality of mesorectum is the product. Neoadjuvant radiation, if indicated, is matched on the radiation sheet.",
  "Ostomy / Stoma Surgery":
    "Form or revise a stoma when diversion is the honest operation. Appliance teaching and a named colorectal list in India.",
  "Gastric Bypass Surgery":
    "Roux-en-Y or equivalent bypass when a surgical-gastroenterology list holds the case. The bariatric Roux-en-Y sheet shares the metabolic idea under a different slug so later pSEO can use either path.",
};
