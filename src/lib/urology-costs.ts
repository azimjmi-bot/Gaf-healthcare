export const UROLOGY_COST: Record<string, { us: string; partner: string; stay: string }> = {
  "PCNL (Percutaneous Nephrolithotomy)": {
    us: "$15,000–$35,000",
    partner: "$3,200–$7,500",
    stay: "2–5 nights",
  },
  "RIRS (Retrograde Intrarenal Surgery)": {
    us: "$14,000–$32,000",
    partner: "$3,000–$7,200",
    stay: "1–3 nights",
  },
  Ureteroscopy: {
    us: "$8,000–$20,000",
    partner: "$1,800–$4,800",
    stay: "0–2 nights",
  },
  "ESWL (Extracorporeal Shock Wave Lithotripsy)": {
    us: "$5,000–$12,000",
    partner: "$800–$2,400",
    stay: "Outpatient or 1 night",
  },
  Pyeloplasty: {
    us: "$20,000–$45,000",
    partner: "$4,500–$10,000",
    stay: "3–6 nights",
  },
  "Radical Nephrectomy": {
    us: "$30,000–$70,000",
    partner: "$7,500–$18,000",
    stay: "4–8 nights",
  },
  "TURP (Transurethral Resection of the Prostate)": {
    us: "$12,000–$25,000",
    partner: "$2,500–$6,200",
    stay: "2–4 nights",
  },
  "HoLEP (Holmium Laser Enucleation)": {
    us: "$16,000–$32,000",
    partner: "$3,800–$8,500",
    stay: "2–4 nights",
  },
  "GreenLight Laser Surgery": {
    us: "$14,000–$28,000",
    partner: "$3,200–$7,800",
    stay: "1–3 nights",
  },
  "TURBT (Transurethral Resection of Bladder Tumor)": {
    us: "$15,000–$35,000",
    partner: "$3,000–$8,000",
    stay: "1–3 nights",
  },
  "Bladder Reconstruction": {
    us: "$40,000–$90,000",
    partner: "$10,000–$24,000",
    stay: "7–14 nights",
  },
  "Urinary Diversion": {
    us: "$35,000–$80,000",
    partner: "$9,000–$22,000",
    stay: "7–14 nights",
  },
  "Kidney Transplantation": {
    us: "$150,000–$400,000",
    partner: "$13,000–$25,000",
    stay: "10–21 nights; outpatient follow-up in-city",
  },
  "Living Donor Kidney Transplantation": {
    us: "$160,000–$420,000",
    partner: "$14,000–$28,000",
    stay: "Donor 5–8 nights; recipient 10–21 nights",
  },
  "Deceased Donor Kidney Transplantation": {
    us: "$140,000–$380,000",
    partner: "$12,000–$24,000",
    stay: "10–21 nights; wait-list timing varies",
  },
  "ABO-Incompatible Kidney Transplantation": {
    us: "$180,000–$450,000",
    partner: "$18,000–$35,000",
    stay: "14–28 nights; desensitisation first",
  },
  Urethroplasty: {
    us: "$15,000–$40,000",
    partner: "$3,500–$9,000",
    stay: "3–7 nights",
  },
  "VIU (Visual Internal Urethrotomy)": {
    us: "$6,000–$15,000",
    partner: "$1,200–$3,500",
    stay: "0–2 nights",
  },
  "Urinary Tract Reconstruction": {
    us: "$25,000–$70,000",
    partner: "$6,000–$16,000",
    stay: "5–12 nights",
  },
  "Hypospadias Repair": {
    us: "$12,000–$30,000",
    partner: "$2,500–$7,000",
    stay: "2–5 nights; paediatric ward",
  },
  "Pediatric Urological Surgery": {
    us: "$15,000–$40,000",
    partner: "$3,000–$8,500",
    stay: "2–6 nights; paediatric ward",
  },
  "Penile Implant": {
    us: "$18,000–$40,000",
    partner: "$5,000–$12,000",
    stay: "1–3 nights",
  },
  "Varicocele Surgery": {
    us: "$8,000–$18,000",
    partner: "$1,500–$4,200",
    stay: "0–2 nights",
  },
};

export const UROLOGY_SUMMARIES: Record<string, string> = {
  "PCNL (Percutaneous Nephrolithotomy)":
    "Percutaneous stone clearance when bulk, hardness or location already make shock-wave or RIRS dishonest. A named urologist in Delhi NCR, Mumbai, Bengaluru, Chennai or Hyderabad writes tract and residual-stone plan after CT — not from a brochure package.",
  "RIRS (Retrograde Intrarenal Surgery)":
    "Flexible ureteroscopic laser lithotripsy when the stone map already fits a retrograde list. Stent, dusting versus basketing and a named India campus — not a same-week tourist laser.",
  Ureteroscopy:
    "Rigid or semi-rigid ureteroscopy when a ureteric stone or stricture is the brief. Basket, laser and stent are written after imaging, not assumed from a day-care price.",
  "ESWL (Extracorporeal Shock Wave Lithotripsy)":
    "Shock-wave fragmentation when stone size, density and anatomy already allow it. Residual fragments and a named urology list in India — not an airport stop between flights.",
  Pyeloplasty:
    "Reconstruct the pelvi-ureteric junction when drainage studies already prove obstruction. Robotic versus open and a named reconstructive list — not a hotel length in Hyderabad.",
  "Radical Nephrectomy":
    "Remove the kidney when nephron-sparing is not honest. Partial nephrectomy stays on the shared surgical-oncology slug; this sheet is the urology list for later pSEO.",
  "TURP (Transurethral Resection of the Prostate)":
    "Resect obstructing prostate when flow, residuals and a named TURP list already agree. HoLEP and GreenLight sit on separate sheets when laser enucleation is the honest tool.",
  "HoLEP (Holmium Laser Enucleation)":
    "Holmium enucleation when gland volume already prefers laser over TURP. Morcellation, catheter time and a named prostate list in India.",
  "GreenLight Laser Surgery":
    "Photoselective vaporisation when bleeding risk or a selected gland already prefers GreenLight. TURP and HoLEP remain different slugs so later pSEO can use either path.",
  "TURBT (Transurethral Resection of Bladder Tumor)":
    "Resect a bladder tumour for diagnosis and local control when cystoscopy already shows the lesion. Muscle sampling and a named uro-oncology list — not a package named after a hotel.",
  "Bladder Reconstruction":
    "Rebuild or augment the bladder when diversion is not the only honest option. Neobladder versus augmentation is written after records, not from a brochure.",
  "Urinary Diversion":
    "Ileal conduit or continent diversion when the bladder cannot stay. Stoma teaching before travel; a named cystectomy list on the same India campus.",
  "Kidney Transplantation":
    "Replace a failing kidney when GFR, immunology and a named transplant list already agree. Living versus deceased donor and ABO-incompatible sit on separate Urology sheets.",
  "Living Donor Kidney Transplantation":
    "A related or altruistic donor graft when anatomy and ethics already allow it. Donor and recipient lists in the same Indian city — not two tourist theatres.",
  "Deceased Donor Kidney Transplantation":
    "A deceased-donor graft when the wait-list and blood group are honest. Allocation rules and a named transplant ICU in Delhi NCR, Mumbai, Bengaluru, Chennai or Hyderabad.",
  "ABO-Incompatible Kidney Transplantation":
    "Desensitisation and an ABO-mismatched graft when a compatible living donor is not the honest first option. Antibody titres first; a named transplant list second.",
  Urethroplasty:
    "Reconstruct a urethral stricture when dilation and VIU have already failed or were never honest. Buccal graft versus anastomotic and a named reconstructive list in India.",
  "VIU (Visual Internal Urethrotomy)":
    "Endoscopic incision of a selected stricture when urethroplasty is not yet the brief. Recurrence risk is written before anyone books two nights.",
  "Urinary Tract Reconstruction":
    "Rebuild ureter, bladder neck or a complex tract when stone, trauma or congenital disease is the map. A named reconstructive urologist in India — not a same-week tourist repair.",
  "Hypospadias Repair":
    "Correct hypospadias when staging and a paediatric urology list already agree. Single versus staged repair is not assumed from a package name.",
  "Pediatric Urological Surgery":
    "A child’s urology list — obstruction, reflux, undescended testis or a selected reconstruction — on a paediatric ward in India. Adult TURP sheets are a different path.",
  "Penile Implant":
    "Inflatable or malleable prosthesis when medical therapy already failed. Device choice and a named andrology list after records, not from a brochure implant.",
  "Varicocele Surgery":
    "Ligate a varicocele when fertility or pain already makes the indication honest. Microsurgical versus laparoscopic and a named andrology list in India.",
};
