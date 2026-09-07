export const CARDIOLOGY_COST: Record<string, { us: string; partner: string; stay: string }> = {
  "Coronary Angioplasty & Stenting": {
    us: "$25,000–$70,000",
    partner: "$3,200–$8,500",
    stay: "1–3 nights typical",
  },
  "Coronary Angiography": {
    us: "$5,000–$15,000",
    partner: "$400–$1,200",
    stay: "Day-care or overnight",
  },
  "Atrial Fibrillation Ablation": {
    us: "$40,000–$90,000",
    partner: "$6,500–$16,000",
    stay: "1–3 nights",
  },
  "Pacemaker Implantation": {
    us: "$20,000–$50,000",
    partner: "$3,500–$9,000",
    stay: "1–3 nights",
  },
  MitraClip: {
    us: "$70,000–$150,000",
    partner: "$18,000–$38,000",
    stay: "3–7 nights",
  },
  "ICD Implantation (Implantable Cardioverter-Defibrillator)": {
    us: "$40,000–$100,000",
    partner: "$8,000–$18,000",
    stay: "1–4 nights",
  },
  "CTO Angioplasty (Chronic Total Occlusion)": {
    us: "$35,000–$85,000",
    partner: "$5,500–$14,000",
    stay: "1–4 nights",
  },
  "Radiofrequency Ablation": {
    us: "$30,000–$75,000",
    partner: "$5,000–$13,000",
    stay: "1–3 nights",
  },
  "Balloon Mitral Valvotomy": {
    us: "$25,000–$60,000",
    partner: "$4,000–$10,000",
    stay: "2–5 nights",
  },
  "CRT/CRT-D Implantation": {
    us: "$45,000–$110,000",
    partner: "$10,000–$22,000",
    stay: "2–5 nights",
  },
  "ASD Device Closure": {
    us: "$30,000–$70,000",
    partner: "$5,000–$12,000",
    stay: "1–3 nights",
  },
  "Peripheral Angioplasty": {
    us: "$20,000–$55,000",
    partner: "$3,000–$8,500",
    stay: "1–3 nights",
  },
  "Carotid Artery Stenting": {
    us: "$25,000–$65,000",
    partner: "$5,500–$13,000",
    stay: "1–4 nights",
  },
  "Leadless Pacemaker Implantation": {
    us: "$40,000–$90,000",
    partner: "$12,000–$25,000",
    stay: "1–3 nights",
  },
};

export const CARDIOLOGY_SUMMARIES: Record<string, string> = {
  "Coronary Angioplasty & Stenting":
    "Open a coronary stenosis with a balloon and stent. The product is a named interventional cardiologist and a lab that already runs complexes — not a same-day tourist stent.",
  "Coronary Angiography":
    "Diagnostic coronary pictures. Access, contrast and whether PCI follows in the same sitting are written after records, not from a brochure price.",
  "Atrial Fibrillation Ablation":
    "Isolate pulmonary veins for AF when drugs have failed or the patient wants a rhythm strategy. Mapping system and a named electrophysiologist decide the city.",
  "Pacemaker Implantation":
    "A transvenous pacemaker for bradycardia. Device, lead and a follow-up clinic that already programmes that generator — not a weekend implant.",
  MitraClip:
    "Edge-to-edge mitral repair on a catheter when surgery is not the honest first option. Anatomy on transoesophageal echo decides, not a hotel length in Mumbai.",
  "ICD Implantation (Implantable Cardioverter-Defibrillator)":
    "A defibrillator for sudden-death risk. Primary versus secondary prevention and a named EP list are written before anyone books two nights in Delhi NCR.",
  "CTO Angioplasty (Chronic Total Occlusion)":
    "Open a chronic total occlusion when the indication is honest. Dual access, contrast load and a lab that already runs CTOs — not a first international experiment.",
  "Radiofrequency Ablation":
    "Burn a pathway or focus for SVT, flutter or VT. The EP study, not a package name, decides whether RFA belongs on this floor.",
  "Balloon Mitral Valvotomy":
    "Split a stenotic mitral valve with a balloon when Wilkins score allows. Surgery is still the right answer when the valve is not a BMV valve.",
  "CRT/CRT-D Implantation":
    "Resynchronisation pacing, with or without a defibrillator, when QRS and EF say the left ventricle needs both. Lead position and a device clinic are the product.",
  "ASD Device Closure":
    "Close an atrial septal defect with a device when rims allow. Surgical ASD closure sits on a different list; this is a catheter sitting, not a sternotomy.",
  "Peripheral Angioplasty":
    "Open a limb or visceral stenosis. Run-off, stents and a named peripheral list — not a coronary package with a different artery written in.",
  "Carotid Artery Stenting":
    "Stent a carotid stenosis when endarterectomy is not the honest first option. Stroke risk and a hybrid lab decide the city.",
  "Leadless Pacemaker Implantation":
    "A capsule in the right ventricle when leads should stay out. Not every bradycardia is a leadless indication because the brochure is newer.",
};
