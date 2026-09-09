export const OPHTHALMOLOGY_COST: Record<string, { us: string; partner: string; stay: string }> = {
  "Cataract Surgery": {
    us: "$3,500–$8,000 per eye",
    partner: "$800–$2,500 per eye",
    stay: "Outpatient or 1 night",
  },
  "Phacoemulsification Cataract Surgery": {
    us: "$4,000–$9,000 per eye",
    partner: "$900–$2,800 per eye",
    stay: "Outpatient",
  },
  "Femto Laser Cataract Surgery": {
    us: "$5,500–$12,000 per eye",
    partner: "$1,600–$3,800 per eye",
    stay: "Outpatient",
  },
  "LASIK Eye Surgery": {
    us: "$2,000–$4,500 per eye",
    partner: "$700–$1,800 per eye",
    stay: "Outpatient",
  },
  "SMILE Eye Surgery": {
    us: "$2,500–$5,500 per eye",
    partner: "$1,000–$2,500 per eye",
    stay: "Outpatient",
  },
  "ICL (Implantable Collamer Lens)": {
    us: "$4,000–$8,000 per eye",
    partner: "$1,800–$3,800 per eye",
    stay: "Outpatient",
  },
  "Corneal Transplantation": {
    us: "$15,000–$30,000",
    partner: "$2,500–$6,500",
    stay: "1–3 nights",
  },
  DMEK: {
    us: "$16,000–$32,000",
    partner: "$3,200–$7,500",
    stay: "1–3 nights",
  },
  DSEK: {
    us: "$15,000–$30,000",
    partner: "$3,000–$7,000",
    stay: "1–3 nights",
  },
  DALK: {
    us: "$16,000–$32,000",
    partner: "$3,200–$7,500",
    stay: "1–3 nights",
  },
  "Glaucoma Surgery": {
    us: "$8,000–$20,000",
    partner: "$1,500–$4,500",
    stay: "1–2 nights",
  },
  "Laser Glaucoma Surgery": {
    us: "$2,000–$6,000",
    partner: "$500–$1,600",
    stay: "Outpatient",
  },
  Trabeculectomy: {
    us: "$8,000–$18,000",
    partner: "$1,200–$3,800",
    stay: "1–2 nights",
  },
  "Glaucoma Drainage Device / Valve Implantation": {
    us: "$12,000–$25,000",
    partner: "$2,500–$6,500",
    stay: "1–3 nights",
  },
  Vitrectomy: {
    us: "$8,000–$20,000",
    partner: "$2,000–$5,500",
    stay: "1–2 nights",
  },
  "Retinal Detachment Surgery": {
    us: "$10,000–$25,000",
    partner: "$2,500–$7,000",
    stay: "1–3 nights",
  },
  "Intravitreal Anti-VEGF Injection": {
    us: "$1,800–$4,500 per injection",
    partner: "$300–$900 per injection",
    stay: "Outpatient",
  },
  "Macular Hole Surgery": {
    us: "$10,000–$22,000",
    partner: "$2,500–$6,500",
    stay: "1–2 nights",
  },
  "Pediatric Cataract Surgery": {
    us: "$6,000–$15,000 per eye",
    partner: "$1,200–$3,800 per eye",
    stay: "1–2 nights",
  },
  "Squint / Strabismus Surgery": {
    us: "$5,000–$12,000",
    partner: "$1,000–$3,200",
    stay: "Outpatient or 1 night",
  },
  "Oculoplastic Surgery": {
    us: "$4,000–$12,000",
    partner: "$1,200–$4,000",
    stay: "Outpatient or 1 night",
  },
  "Eyelid Reconstruction Surgery": {
    us: "$6,000–$18,000",
    partner: "$1,500–$5,000",
    stay: "1–2 nights",
  },
  "Dacryocystorhinostomy (DCR) / Tear Duct Surgery": {
    us: "$6,000–$15,000",
    partner: "$1,200–$3,800",
    stay: "Outpatient or 1 night",
  },
  "Corneal Cross-Linking (C3R)": {
    us: "$2,500–$6,000 per eye",
    partner: "$700–$2,000 per eye",
    stay: "Outpatient",
  },
};

export const OPHTHALMOLOGY_SUMMARIES: Record<string, string> = {
  "Cataract Surgery":
    "Remove a lens when films already write cataract and not a refractive brochure. Phaco, femto-laser and paediatric cataract sit on neighbouring Ophthalmology slugs.",
  "Phacoemulsification Cataract Surgery":
    "Phacoemulsification when a named India list already writes ultrasound and IOL after biometry — not from a package implant count. Femto-laser cataract is a different slug.",
  "Femto Laser Cataract Surgery":
    "Femto-laser cataract when capsulotomy and fragmentation already belong on a laser list. Conventional phaco remains the neighbouring slug.",
  "LASIK Eye Surgery":
    "LASIK when corneal thickness and refraction already write surface laser. SMILE and ICL sit on separate refractive slugs.",
  "SMILE Eye Surgery":
    "SMILE when a lenticule list is already honest after tomography. LASIK and ICL remain neighbouring refractive products.",
  "ICL (Implantable Collamer Lens)":
    "Implant a collamer lens when cornea is too thin or prescription too high for LASIK. Exchange versus primary implant is written after anterior-chamber depth.",
  "Corneal Transplantation":
    "Replace a failed cornea when PK is still the honest graft. DMEK, DSEK and DALK sit on endothelial or lamellar slugs, not this full-thickness sheet.",
  DMEK:
    "DMEK when endothelium already failed and a Descemet membrane graft is the honest tool. DSEK and penetrating keratoplasty stay on neighbouring cornea slugs.",
  DSEK:
    "DSEK when endothelial failure already writes a stromal-endothelial graft. DMEK is the thinner membrane slug; PK remains full-thickness.",
  DALK:
    "DALK when stroma is scarred but endothelium still holds. Penetrating keratoplasty is the full-thickness neighbour.",
  "Glaucoma Surgery":
    "Operate when IOP, fields and disc already write surgery. Laser, trabeculectomy and valve implantation keep their own Ophthalmology slugs.",
  "Laser Glaucoma Surgery":
    "Laser when SLT or similar already belongs on a named glaucoma list. Trabeculectomy and valves sit on neighbouring slugs.",
  Trabeculectomy:
    "Trabeculectomy when a filtering bleb is still the honest drop-sparing tool. Valves and laser remain separate products.",
  "Glaucoma Drainage Device / Valve Implantation":
    "Implant a drainage device when prior filters already failed. Ahmed or Baerveldt choice is written after conjunctiva — not from a brochure valve count.",
  Vitrectomy:
    "Vitrectomy when vitreous, bleed or membrane already needs a cutter. Retinal detachment, macular hole and anti-VEGF keep their own slugs.",
  "Retinal Detachment Surgery":
    "Reattach a retina when examination already writes a buckle, vitrectomy or both. Macular hole is a different retina product.",
  "Intravitreal Anti-VEGF Injection":
    "Inject anti-VEGF when OCT already writes wet AMD, DME or RVO. Surgery is not this day-care slug.",
  "Macular Hole Surgery":
    "Close a macular hole when OCT already writes a peel and gas. Detachment repair stays on the neighbouring retina slug.",
  "Pediatric Cataract Surgery":
    "Clear a child’s cataract when examination already writes a paediatric IOL or aphakia plan. Adult phaco remains on the adult cataract slugs.",
  "Squint / Strabismus Surgery":
    "Straighten a squint when measurements already write recession or resection. Amblyopia work is written after orthoptics — not from a brochure muscle count.",
  "Oculoplastic Surgery":
    "Oculoplastics when lid, orbit or lacrimal already need more than a cosmetic blepharoplasty. Reconstruction, DCR and blepharoplasty keep neighbouring slugs.",
  "Eyelid Reconstruction Surgery":
    "Reconstruct an eyelid when tumour, trauma or lagophthalmos already writes a flap or graft. Cosmetic blepharoplasty remains the shared cosmetic slug.",
  "Dacryocystorhinostomy (DCR) / Tear Duct Surgery":
    "Open a blocked sac when syringing already writes DCR. External versus endoscopic is written after imaging.",
  "Corneal Cross-Linking (C3R)":
    "Cross-link a keratoconic cornea when tomography already writes C3R. Transplant remains the graft neighbour when ectasia has gone too far.",
};

export const OPHTHALMOLOGY_CLUSTER_BY_PROCEDURE: Record<string, string> = {
  "Cataract Surgery": "Cataract",
  "Phacoemulsification Cataract Surgery": "Cataract",
  "Femto Laser Cataract Surgery": "Cataract",
  "Pediatric Cataract Surgery": "Cataract",
  "LASIK Eye Surgery": "Refractive",
  "SMILE Eye Surgery": "Refractive",
  "ICL (Implantable Collamer Lens)": "Refractive",
  "Corneal Transplantation": "Cornea",
  DMEK: "Cornea",
  DSEK: "Cornea",
  DALK: "Cornea",
  "Corneal Cross-Linking (C3R)": "Cornea",
  "Glaucoma Surgery": "Glaucoma",
  "Laser Glaucoma Surgery": "Glaucoma",
  Trabeculectomy: "Glaucoma",
  "Glaucoma Drainage Device / Valve Implantation": "Glaucoma",
  Vitrectomy: "Retina",
  "Retinal Detachment Surgery": "Retina",
  "Intravitreal Anti-VEGF Injection": "Retina",
  "Macular Hole Surgery": "Retina",
  "Squint / Strabismus Surgery": "Pediatric & Strabismus",
  "Oculoplastic Surgery": "Oculoplastics",
  "Eyelid Reconstruction Surgery": "Oculoplastics",
  "Dacryocystorhinostomy (DCR) / Tear Duct Surgery": "Oculoplastics",
};
