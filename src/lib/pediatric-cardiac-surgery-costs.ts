export const PEDIATRIC_CARDIAC_SURGERY_COST: Record<string, { us: string; partner: string; stay: string }> = {
  "ASD Closure (Atrial Septal Defect)": {
    us: "$30,000–$80,000",
    partner: "$4,000–$9,500",
    stay: "5–10 nights; parent stay expected",
  },
  "VSD Closure (Ventricular Septal Defect)": {
    us: "$35,000–$90,000",
    partner: "$4,500–$11,000",
    stay: "6–12 nights; parent stay expected",
  },
  "TOF Repair (Tetralogy of Fallot)": {
    us: "$50,000–$140,000",
    partner: "$6,500–$16,000",
    stay: "8–16 nights; parent stay expected",
  },
  "Glenn Procedure": {
    us: "$60,000–$160,000",
    partner: "$8,000–$18,000",
    stay: "8–16 nights; parent stay expected",
  },
  "Fontan Procedure": {
    us: "$70,000–$180,000",
    partner: "$9,000–$22,000",
    stay: "10–18 nights; parent stay expected",
  },
  "Arterial Switch Operation": {
    us: "$80,000–$200,000",
    partner: "$12,000–$26,000",
    stay: "10–21 nights; parent stay expected",
  },
  "PDA Closure (Patent Ductus Arteriosus)": {
    us: "$20,000–$60,000",
    partner: "$3,500–$8,500",
    stay: "3–8 nights; parent stay expected",
  },
  "Norwood Procedure": {
    us: "$120,000–$280,000",
    partner: "$18,000–$40,000",
    stay: "3–8 weeks in a paediatric cardiac ICU",
  },
  "Coarctation Repair": {
    us: "$40,000–$110,000",
    partner: "$6,000–$15,000",
    stay: "6–14 nights; parent stay expected",
  },
  "AVSD Repair (Atrioventricular Septal Defect)": {
    us: "$55,000–$150,000",
    partner: "$8,000–$18,500",
    stay: "8–16 nights; parent stay expected",
  },
  "TAPVC Repair (Total Anomalous Pulmonary Venous Connection)": {
    us: "$70,000–$180,000",
    partner: "$10,000–$24,000",
    stay: "10–21 nights; parent stay expected",
  },
  "Pediatric Heart Transplantation": {
    us: "$800,000–$1,800,000",
    partner: "$50,000–$120,000",
    stay: "6–12 weeks nearby after listing; parent stay required",
  },
};

export const PEDIATRIC_CARDIAC_SURGERY_SUMMARIES: Record<string, string> = {
  "ASD Closure (Atrial Septal Defect)":
    "Close an atrial septal defect on a paediatric cardiac list. Adult CABG theatres are not a substitute because a brochure says they treat children.",
  "VSD Closure (Ventricular Septal Defect)":
    "Close a ventricular septal defect when the anatomy belongs on a named paediatric surgeon’s list. Echo, not hotel length, decides the city.",
  "TOF Repair (Tetralogy of Fallot)":
    "Complete repair of tetralogy. Timing, transannular patch and a paediatric cardiac ICU are written after records — not from a package price.",
  "Glenn Procedure":
    "A superior cavopulmonary connection in single-ventricle palliation. Stage, saturations and a parent who can stay decide whether this floor should run it.",
  "Fontan Procedure":
    "The third stage of single-ventricle palliation. Fenestration, pleural drains and a unit that already runs Fontans — not a first international experiment.",
  "Arterial Switch Operation":
    "Switch the great arteries in transposition. Coronary transfer and a neonatal cardiac ICU are the product, not a tourist week in Chennai.",
  "PDA Closure (Patent Ductus Arteriosus)":
    "Ligate or device-close a PDA when the neonate or child belongs on that protocol. Prematurity and pulmonary pressure are not inferred from a US cash number.",
  "Norwood Procedure":
    "First-stage palliation for hypoplastic left heart. Circulatory arrest, a dedicated paediatric cardiac ICU and a parent who can stay weeks.",
  "Coarctation Repair":
    "Repair of aortic coarctation. Arch anatomy and a named paediatric list decide Delhi NCR versus another city — not a brochure ‘heart package’.",
  "AVSD Repair (Atrioventricular Septal Defect)":
    "Repair of a complete or partial AV canal. Valve competence and Down-syndrome work-up are written before anyone books ten nights.",
  "TAPVC Repair (Total Anomalous Pulmonary Venous Connection)":
    "Reconnect anomalous pulmonary veins. Obstruction and a neonatal theatre that already runs TAPVC — not an adult mitral list with a smaller retractor.",
  "Pediatric Heart Transplantation":
    "Orthotopic transplant in a child after listing. Donor, a paediatric transplant unit and a parent who can stay. Adult heart floors are not assumed to be equivalent.",
};
