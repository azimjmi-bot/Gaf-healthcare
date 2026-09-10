export const SURGICAL_COST: Record<string, { us: string; partner: string; stay: string }> = {
  "Breast-Conserving Surgery (Lumpectomy)": {
    us: "$15,000–$30,000",
    partner: "$3,500–$8,000",
    stay: "1–3 nights",
  },
  Mastectomy: {
    us: "$20,000–$40,000",
    partner: "$4,500–$10,000",
    stay: "3–6 nights",
  },
  "Nipple-Sparing Mastectomy": {
    us: "$22,000–$45,000",
    partner: "$5,500–$12,000",
    stay: "3–6 nights",
  },
  "Oncoplastic Breast Surgery": {
    us: "$18,000–$38,000",
    partner: "$4,500–$11,000",
    stay: "2–5 nights",
  },
  "Breast Reconstruction": {
    us: "$25,000–$70,000",
    partner: "$6,000–$18,000",
    stay: "4–8 nights",
  },
  "Sentinel Lymph Node Biopsy": {
    us: "$8,000–$18,000",
    partner: "$2,000–$5,500",
    stay: "1–2 nights",
  },
  Esophagectomy: {
    us: "$50,000–$120,000",
    partner: "$12,000–$28,000",
    stay: "10–18 nights",
  },
  Gastrectomy: {
    us: "$40,000–$90,000",
    partner: "$9,000–$22,000",
    stay: "7–14 nights",
  },
  Colectomy: {
    us: "$30,000–$70,000",
    partner: "$7,000–$18,000",
    stay: "5–10 nights",
  },
  "Rectal Cancer Surgery": {
    us: "$35,000–$85,000",
    partner: "$8,000–$20,000",
    stay: "6–12 nights",
  },
  "Liver Resection (Hepatectomy)": {
    us: "$45,000–$110,000",
    partner: "$10,000–$26,000",
    stay: "7–14 nights",
  },
  "Whipple Procedure": {
    us: "$60,000–$150,000",
    partner: "$14,000–$32,000",
    stay: "10–18 nights",
  },
  "Pancreatic Surgery": {
    us: "$50,000–$130,000",
    partner: "$12,000–$30,000",
    stay: "8–16 nights",
  },
  "Cytoreductive Surgery": {
    us: "$40,000–$100,000",
    partner: "$10,000–$24,000",
    stay: "7–14 nights",
  },
  "Cytoreductive Surgery with HIPEC": {
    us: "$70,000–$180,000",
    partner: "$18,000–$40,000",
    stay: "10–21 nights",
  },
  PIPAC: {
    us: "$25,000–$55,000",
    partner: "$7,000–$16,000",
    stay: "2–5 nights",
  },
  "Radical Hysterectomy": {
    us: "$25,000–$55,000",
    partner: "$6,000–$14,000",
    stay: "4–8 nights",
  },
  "Ovarian Cancer Cytoreductive Surgery": {
    us: "$35,000–$80,000",
    partner: "$8,000–$20,000",
    stay: "6–12 nights",
  },
  "Thyroidectomy for Thyroid Cancer": {
    us: "$18,000–$40,000",
    partner: "$4,000–$10,000",
    stay: "2–4 nights",
  },
  "Neck Dissection": {
    us: "$20,000–$45,000",
    partner: "$4,500–$12,000",
    stay: "3–6 nights",
  },
  "Oral Cancer Surgery": {
    us: "$25,000–$60,000",
    partner: "$6,000–$16,000",
    stay: "5–10 nights",
  },
  "Transoral Robotic Surgery (TORS)": {
    us: "$35,000–$80,000",
    partner: "$9,000–$20,000",
    stay: "3–7 nights",
  },
  "Microvascular Free Flap Reconstruction": {
    us: "$40,000–$100,000",
    partner: "$10,000–$24,000",
    stay: "8–14 nights",
  },
  "Lung Cancer Surgery": {
    us: "$40,000–$90,000",
    partner: "$9,000–$22,000",
    stay: "5–10 nights",
  },
  Lobectomy: {
    us: "$40,000–$85,000",
    partner: "$9,000–$20,000",
    stay: "5–10 nights",
  },
  "VATS Lung Surgery": {
    us: "$35,000–$80,000",
    partner: "$8,000–$19,000",
    stay: "4–8 nights",
  },
  "Robotic Thoracic Surgery": {
    us: "$45,000–$100,000",
    partner: "$12,000–$26,000",
    stay: "4–8 nights",
  },
  "Radical Prostatectomy": {
    us: "$30,000–$70,000",
    partner: "$7,000–$18,000",
    stay: "3–7 nights",
  },
  "Partial Nephrectomy": {
    us: "$28,000–$65,000",
    partner: "$7,000–$16,000",
    stay: "3–6 nights",
  },
  "Radical Cystectomy": {
    us: "$45,000–$110,000",
    partner: "$11,000–$26,000",
    stay: "7–14 nights",
  },
};

export const SURGICAL_SUMMARIES: Record<string, string> = {
  "Breast-Conserving Surgery (Lumpectomy)":
    "Lumpectomy removes the tumour with a margin of breast tissue, usually followed by radiation. The named surgeon confirms the margin plan on camera before you fly.",
  Mastectomy:
    "Mastectomy removes the breast as the oncological operation. Reconstruction, if indicated, is a separate decision — not bundled because a brochure says so.",
  "Nipple-Sparing Mastectomy":
    "Nipple-sparing mastectomy keeps the skin envelope when oncology and anatomy allow. It is refused when the tumour sits too close to the nipple-areola complex.",
  "Oncoplastic Breast Surgery":
    "Oncoplastic surgery removes the tumour with a margin and reshapes the remaining breast in the same sitting when conservation is oncologically sound. It is cancer surgery first, not a cosmetic add-on.",
  "Breast Reconstruction":
    "Reconstruction restores breast shape after mastectomy or a large conservation defect. Implant-based and autologous (flap) techniques, and immediate versus delayed timing, follow anatomy and the radiation plan — not a brochure upgrade.",
  "Sentinel Lymph Node Biopsy":
    "Sentinel node biopsy maps and removes the first draining nodes for staging when the basin looks clinically clear. It is not a smaller dissection, and it is not used for every patient.",
  Esophagectomy:
    "Esophagectomy removes part or most of the oesophagus — usually for selected oesophageal or junction cancers — then reconstructs a food passage. GAF Healthcare matches centres that already run this list, with ICU that has seen anastomotic leaks.",
  Gastrectomy:
    "Gastrectomy removes part or all of the stomach — usually for selected gastric cancers — then reconstructs a food passage. Extent of lymph-node dissection is set after staging, not after you have already booked the ward.",
  Colectomy:
    "Colectomy removes part or all of the colon — usually for selected colon or colorectal cancers, and sometimes for other bowel disease where resection is necessary — then reconnects remaining bowel or, in selected cases, forms a stoma. Extent follows disease location, not a brochure upgrade.",
  "Rectal Cancer Surgery":
    "Rectal resection may include TME, diversion, and a later reversal. Neoadjuvant radiation, when indicated, is sequenced with the named teams before travel.",
  "Liver Resection (Hepatectomy)":
    "Hepatectomy for primary or metastatic disease. Future-liver-remnant volume and anaesthesia ICU are checked before a date is offered.",
  "Whipple Procedure":
    "Pancreaticoduodenectomy is a long operation with a long recovery. We match volume centres, not a first-time international Whipple.",
  "Pancreatic Surgery":
    "Pancreatic resections beyond or including Whipple — distal pancreatectomy, enucleation when appropriate. Vascular reconstruction, if likely, is named in the plan.",
  "Cytoreductive Surgery":
    "Cytoreduction aims at complete macroscopic clearance of peritoneal disease. Completeness-of-cytoreduction scores matter more than the length of the incision.",
  "Cytoreductive Surgery with HIPEC":
    "CRS plus heated intraperitoneal chemotherapy. Not every peritoneal case is a HIPEC case. The surgical oncologist says so before you pack for three weeks.",
  PIPAC:
    "Pressurised intraperitoneal aerosol chemotherapy is a laparoscopy-based option for selected peritoneal disease, often as a sequence of short stays rather than one mega-operation.",
  "Radical Hysterectomy":
    "Radical hysterectomy for cervical or selected uterine cancers. Fertility-sparing alternatives, when oncology allows, are discussed on the same call.",
  "Ovarian Cancer Cytoreductive Surgery":
    "Ovarian cytoreduction may be primary or interval after chemotherapy. The gynaecologic oncologist, not a general list, owns this floor.",
  "Thyroidectomy for Thyroid Cancer":
    "Thyroidectomy for differentiated or medullary thyroid cancer, with nerve monitoring where the campus runs it. Calcium protocol is part of discharge, not an afterthought.",
  "Neck Dissection":
    "Selective or comprehensive neck dissection for nodal disease. It is often paired with the primary head-and-neck resection on the same admission.",
  "Oral Cancer Surgery":
    "Resection of oral cavity tumours with appropriate neck work. Reconstruction, when the defect needs a flap, is scheduled as one theatre, not two holidays.",
  "Transoral Robotic Surgery (TORS)":
    "TORS reaches selected oropharyngeal tumours through the mouth. Robot availability and a surgeon who already has a TORS list are the product.",
  "Microvascular Free Flap Reconstruction":
    "Free-flap reconstruction after head-and-neck ablation. Two-team operating and a flap-watch protocol overnight are required, not optional.",
  "Lung Cancer Surgery":
    "Resection for primary lung cancer after staging. The approach — open, VATS, or robotic — follows the tumour and the thoracic surgeon, not a marketing robot.",
  Lobectomy:
    "Lobectomy removes a lobe. Fitness for lung resection is documented before travel; a video consult does not replace pulmonary function tests.",
  "VATS Lung Surgery":
    "Video-assisted thoracic surgery for selected lung resections. Conversion to open is planned for, not treated as a scandal.",
  "Robotic Thoracic Surgery":
    "Robotic thoracic resection when the named surgeon’s indication is real. A robot in the building is not the indication.",
  "Radical Prostatectomy":
    "Prostatectomy for localised prostate cancer, open or robotic. Continence and nerve-sparing goals are written before the ticket.",
  "Partial Nephrectomy":
    "Nephron-sparing surgery when the mass and the remaining kidney allow it. Radical nephrectomy remains the honest alternative when they do not.",
  "Radical Cystectomy":
    "Cystectomy with urinary diversion. Ileal conduit versus neobladder is a counselling conversation, not a surprise in recovery.",
};
