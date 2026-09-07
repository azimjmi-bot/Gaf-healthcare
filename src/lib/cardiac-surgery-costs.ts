export const CARDIAC_SURGERY_COST: Record<string, { us: string; partner: string; stay: string }> = {
  "CABG (Coronary Artery Bypass Grafting)": {
    us: "$70,000–$200,000",
    partner: "$5,500–$14,000",
    stay: "7–14 nights, then nearby recovery",
  },
  "Heart Valve Replacement": {
    us: "$80,000–$220,000",
    partner: "$7,000–$18,000",
    stay: "8–16 nights",
  },
  "Heart Valve Repair": {
    us: "$75,000–$200,000",
    partner: "$6,500–$16,500",
    stay: "7–14 nights",
  },
  "Heart Transplant Surgery": {
    us: "$800,000–$1,700,000",
    partner: "$45,000–$95,000",
    stay: "6–12 weeks nearby after listing",
  },
  "Aortic Root Replacement": {
    us: "$90,000–$250,000",
    partner: "$10,000–$24,000",
    stay: "10–18 nights",
  },
  "Mitral Valve Repair": {
    us: "$80,000–$210,000",
    partner: "$7,500–$18,000",
    stay: "7–14 nights",
  },
  "Aortic Valve Replacement": {
    us: "$80,000–$220,000",
    partner: "$7,000–$18,500",
    stay: "8–16 nights",
  },
  "TAVR/TAVI (Transcatheter Aortic Valve Replacement)": {
    us: "$50,000–$150,000",
    partner: "$18,000–$42,000",
    stay: "3–7 nights typical",
  },
  "Aortic Aneurysm Surgery": {
    us: "$90,000–$260,000",
    partner: "$9,000–$22,000",
    stay: "8–16 nights",
  },
  "Minimally Invasive Cardiac Surgery": {
    us: "$75,000–$210,000",
    partner: "$8,000–$20,000",
    stay: "5–12 nights",
  },
  "Robotic Cardiac Surgery": {
    us: "$90,000–$250,000",
    partner: "$10,000–$24,000",
    stay: "5–12 nights",
  },
  "LVAD Implantation": {
    us: "$250,000–$600,000",
    partner: "$70,000–$140,000",
    stay: "3–8 weeks with device training",
  },
  "Redo CABG": {
    us: "$90,000–$250,000",
    partner: "$8,500–$20,000",
    stay: "10–18 nights",
  },
  "Double Valve Replacement": {
    us: "$110,000–$280,000",
    partner: "$12,000–$28,000",
    stay: "10–18 nights",
  },
  "Congenital Heart Surgery": {
    us: "$80,000–$250,000",
    partner: "$8,000–$28,000",
    stay: "7–21 nights; parent stay expected",
  },
};

export const CARDIAC_SURGERY_SUMMARIES: Record<string, string> = {
  "CABG (Coronary Artery Bypass Grafting)":
    "Bypass grafts for coronary disease. The product is a named cardiac surgeon, conduit choice and a cardiac ICU — not a brochure ‘heart package’ in Delhi NCR.",
  "Heart Valve Replacement":
    "A prosthetic valve when repair will not hold. Tissue versus mechanical, anticoagulation and echo follow-up are written after records, not from a price list.",
  "Heart Valve Repair":
    "Preserve the native valve when anatomy allows. Repair is not cheaper CABG by another name — the surgeon decides after imaging.",
  "Heart Transplant Surgery":
    "Orthotopic transplant after listing. Donor, UNOS-equivalent work-up and a unit that already runs hearts — not a first international experiment.",
  "Aortic Root Replacement":
    "Root and valve together when aneurysm or aortopathy demands it. Circulatory arrest and a named aortic surgeon are the product.",
  "Mitral Valve Repair":
    "Repair of the mitral leaflets or annulus. Repairability is an echo question, not a hotel-length question in Mumbai.",
  "Aortic Valve Replacement":
    "Surgical AVR when TAVR is not the honest indication. Size, prosthesis and a cardiac ICU stay are quoted after CT and echo.",
  "TAVR/TAVI (Transcatheter Aortic Valve Replacement)":
    "A transcatheter aortic valve when the heart team says the chest should stay closed. Access, valve type and pacemaker risk are not inferred from a US cash number.",
  "Aortic Aneurysm Surgery":
    "Open or hybrid repair of the thoracic aorta. Diameter, connective-tissue history and a named aortic list decide the city.",
  "Minimally Invasive Cardiac Surgery":
    "Smaller incisions when the pathology actually fits a mini approach. ‘Minimally invasive’ is not a reason to skip sternotomy if the valve or grafts need a full field.",
  "Robotic Cardiac Surgery":
    "Robot-assisted mitral, CABG or related work on a console the hospital already runs weekly — not a tourist robot.",
  "LVAD Implantation":
    "A durable left-ventricular assist device as destination or bridge. Device clinic, anticoagulation and a parent or partner who can train are part of the stay.",
  "Redo CABG":
    "Second-time bypass. Adhesions, conduit scarcity and a longer ICU window. First-time CABG pricing does not apply.",
  "Double Valve Replacement":
    "Two valves in one sitting. Bypass time, dual prostheses and a longer recovery than a single AVR.",
  "Congenital Heart Surgery":
    "Paediatric or adult congenital repair on a dedicated list. Adult cardiac theatres are not assumed to be equivalent because a brochure says ‘all ages’.",
};
