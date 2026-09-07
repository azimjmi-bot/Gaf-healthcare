export const ENT_COST: Record<string, { us: string; partner: string; stay: string }> = {
  "Cochlear Implantation": {
    us: "$50,000–$100,000",
    partner: "$15,000–$32,000",
    stay: "3–7 nights; mapping follows",
  },
  "FESS (Functional Endoscopic Sinus Surgery)": {
    us: "$8,000–$20,000",
    partner: "$2,000–$5,200",
    stay: "1–3 nights",
  },
  Septoplasty: {
    us: "$5,000–$12,000",
    partner: "$1,500–$3,800",
    stay: "Day-care or overnight",
  },
  Tympanoplasty: {
    us: "$8,000–$18,000",
    partner: "$2,000–$4,800",
    stay: "1–3 nights",
  },
  Tonsillectomy: {
    us: "$4,000–$10,000",
    partner: "$1,000–$2,600",
    stay: "1–2 nights",
  },
  Mastoidectomy: {
    us: "$15,000–$32,000",
    partner: "$3,500–$7,500",
    stay: "2–5 nights",
  },
  Adenoidectomy: {
    us: "$4,000–$9,000",
    partner: "$800–$2,200",
    stay: "Day-care or overnight",
  },
  "Sleep Apnea Surgery": {
    us: "$15,000–$40,000",
    partner: "$4,000–$10,000",
    stay: "2–5 nights",
  },
  "Stapedectomy / Stapedotomy": {
    us: "$10,000–$25,000",
    partner: "$2,500–$6,200",
    stay: "1–3 nights",
  },
  "Balloon Sinuplasty": {
    us: "$6,000–$15,000",
    partner: "$2,000–$5,000",
    stay: "Day-care or overnight",
  },
  "BAHA Implantation (Bone Anchored Hearing Aid)": {
    us: "$20,000–$45,000",
    partner: "$8,000–$16,000",
    stay: "1–3 nights; processor fitting follows",
  },
  "Skull Base Surgery": {
    us: "$40,000–$110,000",
    partner: "$8,000–$22,000",
    stay: "5–12 nights",
  },
  "Head & Neck Cancer Surgery": {
    us: "$25,000–$80,000",
    partner: "$5,000–$16,000",
    stay: "5–14 nights",
  },
  "Thyroid Surgery": {
    us: "$12,000–$30,000",
    partner: "$2,500–$6,800",
    stay: "1–4 nights",
  },
  "Vocal Cord Surgery": {
    us: "$8,000–$20,000",
    partner: "$2,000–$5,200",
    stay: "Day-care to 2 nights",
  },
  "Microlaryngeal Surgery": {
    us: "$8,000–$18,000",
    partner: "$2,000–$5,000",
    stay: "Day-care to 2 nights",
  },
};

export const ENT_SUMMARIES: Record<string, string> = {
  "Cochlear Implantation":
    "A cochlear implant when residual hearing and candidacy tests allow it. Mapping, a named implant surgeon and an audiology clinic that already programmes that device — not a tourist implant weekend.",
  "FESS (Functional Endoscopic Sinus Surgery)":
    "Endoscopic sinus work when medical therapy has failed. CT, polyps and a named FESS list decide Delhi NCR versus Mumbai.",
  Septoplasty:
    "Straighten a septum that actually blocks the airway. Cosmetic rhinoplasty is a different sitting unless records already say otherwise.",
  Tympanoplasty:
    "Repair a drum when infection is quiet. Approach and a named otology list — not a same-week tourist graft.",
  Tonsillectomy:
    "Remove tonsils when the indication is honest — sleep, infection or both. Adult versus child lists are not assumed to be equivalent.",
  Mastoidectomy:
    "Clear mastoid disease when cholesteatoma or chronic otitis is the brief. Facial-nerve monitoring and a named otology list are the product.",
  Adenoidectomy:
    "Remove adenoids when obstruction or otitis is honest. Often paired with tonsils; that pairing is written after examination.",
  "Sleep Apnea Surgery":
    "Airway surgery when CPAP is not the honest first option. Sleep study and a named sleep-surgery list decide the city.",
  "Stapedectomy / Stapedotomy":
    "Reconstruct the stapes for otosclerosis. Prosthesis and a named otology list — not a first international experiment.",
  "Balloon Sinuplasty":
    "Dilate a sinus ostium when FESS is not the honest first option. Anatomy on CT decides, not a package name.",
  "BAHA Implantation (Bone Anchored Hearing Aid)":
    "A bone-anchored processor when the ear canal or middle ear cannot take a conventional aid. Osseointegration and a named implant list are the product.",
  "Skull Base Surgery":
    "Approach a skull-base lesion with ENT and neurosurgery on the same map. Approach and a named list — not a brochure corridor.",
  "Head & Neck Cancer Surgery":
    "Resect an ENT primary when the tumour board has already sat. Reconstruction is a separate brief unless records already say otherwise.",
  "Thyroid Surgery":
    "Thyroidectomy for goitre, nodules or selected cancer when ENT holds the list. Recurrent-nerve monitoring is written before anyone books two nights. Oncologic thyroidectomy for thyroid cancer also sits on the surgical-oncology sheet.",
  "Vocal Cord Surgery":
    "Operate a cord for lesion, paralysis or voice when stroboscopy is honest. Speech therapy after is part of the product.",
  "Microlaryngeal Surgery":
    "Microscope work on the larynx. Pathology on the specimen and a named microlaryngology list — not a hotel length in Chennai.",
};
