export const BARIATRIC_COST: Record<string, { us: string; partner: string; stay: string }> = {
  "Sleeve Gastrectomy": {
    us: "$15,000–$28,000",
    partner: "$4,500–$8,500",
    stay: "2–5 nights",
  },
  "Gastric Bypass (Roux-en-Y)": {
    us: "$20,000–$38,000",
    partner: "$6,000–$11,000",
    stay: "3–6 nights",
  },
  "Mini Gastric Bypass (OAGB/MGB)": {
    us: "$18,000–$35,000",
    partner: "$5,500–$10,000",
    stay: "3–6 nights",
  },
  "Gastric Balloon": {
    us: "$6,000–$12,000",
    partner: "$2,000–$4,500",
    stay: "Day-care or overnight",
  },
  "Endoscopic Sleeve Gastroplasty (ESG)": {
    us: "$12,000–$22,000",
    partner: "$4,500–$9,000",
    stay: "1–3 nights",
  },
  "Metabolic Surgery for Type 2 Diabetes": {
    us: "$20,000–$40,000",
    partner: "$6,000–$12,000",
    stay: "3–7 nights",
  },
  "Gastric Sleeve Revision Surgery": {
    us: "$22,000–$45,000",
    partner: "$7,000–$14,000",
    stay: "3–7 nights",
  },
  "SADI-S Surgery": {
    us: "$25,000–$48,000",
    partner: "$8,000–$16,000",
    stay: "4–8 nights",
  },
  "Duodenal Switch (BPD/DS)": {
    us: "$28,000–$55,000",
    partner: "$9,000–$18,000",
    stay: "5–10 nights",
  },
  "Gastric Banding (Lap-Band)": {
    us: "$10,000–$22,000",
    partner: "$3,500–$7,500",
    stay: "1–3 nights",
  },
  "Gastric Band Removal": {
    us: "$6,000–$15,000",
    partner: "$2,200–$5,500",
    stay: "1–3 nights",
  },
};

export const BARIATRIC_SUMMARIES: Record<string, string> = {
  "Sleeve Gastrectomy":
    "Remove most of the stomach along a staple line. The product is a named bariatric surgeon and a leak-aware ICU — not a same-week tourist sleeve.",
  "Gastric Bypass (Roux-en-Y)":
    "Roux-en-Y reconstruction when BMI, reflux or diabetes says a sleeve is not the honest first option. Limb length and a named list are written after records, not from a brochure.",
  "Mini Gastric Bypass (OAGB/MGB)":
    "One-anastomosis bypass when the anatomy and the metabolic brief allow it. Bile reflux risk and a named surgeon decide the city.",
  "Gastric Balloon":
    "A temporary balloon for selected BMI, not a substitute for surgery when the indication is surgical. Placement, fill and removal dates sit on the same sheet.",
  "Endoscopic Sleeve Gastroplasty (ESG)":
    "Endoscopic plication of the stomach when a surgical sleeve is not the honest first option. Endoscopy skills and follow-up dietetics are the product.",
  "Metabolic Surgery for Type 2 Diabetes":
    "Bypass or sleeve chosen for glycaemic effect, not only kilograms. HbA1c, duration of diabetes and a named metabolic list decide Delhi NCR versus Mumbai.",
  "Gastric Sleeve Revision Surgery":
    "Revise a prior sleeve when reflux, dilation or weight regain is honest. Prior films and a named revisional list — not a first international experiment.",
  "SADI-S Surgery":
    "Single-anastomosis duodeno-ileal with sleeve when malabsorption is part of the brief. Nutritional follow-up in India and at home is written before anyone books.",
  "Duodenal Switch (BPD/DS)":
    "Biliopancreatic diversion with duodenal switch for selected super-obesity. Protein, vitamins and a named DS list are the product, not a hotel length.",
  "Gastric Banding (Lap-Band)":
    "An adjustable band is uncommon as a first operation now. Listed when a named surgeon still holds that indication — not because a 2010 brochure survived.",
  "Gastric Band Removal":
    "Take a band out when erosion, slip or intolerance is honest. Conversion to sleeve or bypass is a separate sitting unless records already say otherwise.",
};
