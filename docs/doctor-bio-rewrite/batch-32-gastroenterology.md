# Doctor BIO rewrite — Batch 32 — Gastroenterology, India

Final Gastroenterology batch, completing the specialty. Every sentence is drawn from that doctor's
own record in `src/data/ginger-catalog.json` (designation, hospital, city, experience,
qualifications, education, affiliations, memberships, awards and research). The previous bios in
this specialty are GAF platform boilerplate that describes the pSEO tagging scheme rather than the
doctor, so the structured fields are the source. No external sources, no inference, and no
information from any other doctor's profile. Only `doctorOverrides["<slug>"].bio` is written; no
pSEO, schema, routing or frontend field changes.

## Batch summary

| # | Doctor | City | Old words | New words | Status |
|---|---|---|---|---|---|
| 1 | Dr. Kapil Dev Jamwal | Delhi NCR | 92 | 216 | APPLIED |
| 2 | Dr. Ramesh Garg | Delhi NCR | 94 | 217 | APPLIED |
| 3 | Dr. S. Babu Kumar | Chennai | 90 | 227 | APPLIED |
| 4 | Dr. Vishal Garg | Delhi NCR | 80 | 228 | APPLIED |

Every bio below is validated by `scripts/check-bio-batch.mjs` for the 200–300 word range and
for traceability of every capitalised term, acronym, degree and year back to that individual
doctor's own record in `src/data/ginger-catalog.json`.

---

## 1. Dr. Kapil Dev Jamwal

**Slug:** `dr-kapil-dev-jamwal` · Artemis Hospital, Delhi NCR

### Existing BIO

Dr. Kapil Dev Jamwal is Chief – Innovation & GI Interventions and Head at Artemis Hospital in Delhi NCR, India. He has practised gastroenterology in India for 17+ years experience. The endoscopy list covers ERCP, Endoscopic Hemostasis and ERCP when imaging and labs make the indication honest. Stent, histology and whether ERCP follows are written after records review — not from a brochure. Training includes Fellowship in Advanced GI Endoscopy (FAGIE). International patients meet him on camera first; travel to Delhi NCR is offered only if this suite is the right floor.

### Proposed BIO

Dr. Kapil Dev Jamwal is Chief of Innovation and GI Interventions and a department head at Artemis Hospital in the Delhi NCR, with more than 17 years of experience in gastroenterology.

His title names intervention before anything else, and his list matches it. He performs ERCP, therapeutic endoscopy, advanced polypectomy, endoscopic dilatation, endoscopic hemostasis and GI stenting. Six of the twelve entries on his list are procedures rather than conditions, which is unusual even among therapeutic endoscopists.

On the medical side he manages acute and chronic pancreatitis, biliary strictures, non-alcoholic fatty liver disease, gastroesophageal reflux disease and severe functional GI disorders. The pancreas and the bile duct account for three of those, which is the territory ERCP and stenting are used in.

He holds an MBBS, an MD in general medicine and a DM in gastroenterology and hepatology, and completed a fellowship in advanced GI endoscopy, the FAGIE after his name. His education record also lists Japan, the USA and South Korea.

He practises at Artemis Hospitals in Gurgaon. The innovation half of his title has no separate entry in his record, but the shape of the rest of it, a procedure-led list, a dedicated advanced endoscopy fellowship and education recorded in three countries, describes a practice organised around technique rather than around a single organ.

**Word count:** 216

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 2. Dr. Ramesh Garg

**Slug:** `dr-ramesh-garg` · Fortis Hospital, Shalimar Bagh, Delhi NCR

### Existing BIO

Dr. Ramesh Garg is Senior Consultant at Fortis Hospital in Delhi NCR, India. He has practised gastroenterology in India for 20+ years experience. The endoscopy list covers Bile Duct Stone Removal, ERCP and Endoscopic Hemostasis when imaging and labs make the indication honest. Stent, histology and whether ERCP follows are written after records review — not from a brochure. Training includes MBBS — Maulana Azad Medical College, Delhi (associated with Lok Nayak Hospital). International patients meet him on camera first; travel to Delhi NCR is offered only if this suite is the right floor.

### Proposed BIO

Dr. Ramesh Garg is a Senior Consultant at Fortis Hospital, Shalimar Bagh, in the Delhi NCR, with more than 20 years of experience in gastroenterology and hepatology.

His list is led by endoscopic procedures. He performs ERCP, therapeutic endoscopy, GI stenting, endoscopic hemostasis and advanced polypectomy, and manages biliary strictures and choledocholithiasis endoscopically. Beyond the endoscope he manages acute and chronic pancreatitis, chronic liver disease, malabsorption syndromes, and inflammatory bowel disease as Crohn's disease and ulcerative colitis.

His training was taken in Delhi at two institutions. He read MBBS at Maulana Azad Medical College, associated with Lok Nayak Hospital, and took his MD in medicine at the same college, then his DM in gastroenterology at G B Pant Hospital.

His hospital record has stayed in the same city. He has been at Jaipur Golden Hospital and Saroj Hospital before his present post at Fortis Hospital in Shalimar Bagh, so the whole of his training and practice has been in Delhi.

He is a member of the Indian Association of Gastroenterology and of the Indian Society of Gastrointestinal Endoscopy. The second of those matches the half of his list that is procedural: with five endoscopic procedures named separately, and choledocholithiasis listed specifically as endoscopic management, his own record describes an interventional practice rather than a purely medical one.

**Word count:** 217

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, memberships, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 3. Dr. S. Babu Kumar

**Slug:** `dr-s-babu-kumar` · Gleneagles HealthCity Chennai, Chennai

### Existing BIO

Dr. S. Babu Kumar is Senior Consultant at Gleneagles HealthCity Chennai in Chennai, India. He has practised gastroenterology in India for 19+ years experience. The endoscopy list covers Bile Duct Stone Removal, ERCP and ERCP when imaging and labs make the indication honest. Stent, histology and whether ERCP follows are written after records review — not from a brochure. Training includes DM in Gastroenterology – Kilpauk Medical College, Chennai (2011). International patients meet him on camera first; travel to Chennai is offered only if this suite is the right floor.

### Proposed BIO

Dr. S. Babu Kumar is a Senior Consultant at Gleneagles HealthCity in Chennai, with more than 19 years of experience. His profile records gastroenterology and hepatobiliary medicine alongside medical gastroenterology and interventional endoscopy.

His list carries both of those last two headings. On the interventional side he performs ERCP and treats biliary strictures and bile duct stones. Medically he manages chronic liver disease, liver cirrhosis, portal hypertension, non-alcoholic fatty liver disease, chronic hepatitis B, chronic pancreatitis, inflammatory bowel disease, severe functional GI disorders and severe gastroesophageal reflux disease.

His training is dated and moves between two cities. He read MBBS at Coimbatore Medical College in 2000 and took his MD in general medicine at the same college in 2005, then his DM in gastroenterology at Kilpauk Medical College in Chennai in 2011.

Between the MD and the DM he ranked 1st in Tamil Nadu in the DM entrance examinations of 2008, which is the most specific achievement in his record.

His academic work is recorded in three forms. He has presented various topics in scientific forums, authored numerous original articles and case reports in peer-reviewed journals, and guided Ph.D. students as an expert advisor for their theses. The last of those is a supervisory role rather than a publishing one, and it is uncommon on a consultant gastroenterologist's record.

He practises at Gleneagles Global Hospital in Chennai.

**Word count:** 227

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 4. Dr. Vishal Garg

**Slug:** `dr-vishal-garg` · Indraprastha Apollo Hospital, Delhi NCR

### Existing BIO

Dr. Vishal Garg is Consultant Gastroenterologist at Indraprastha Apollo Hospital in Delhi NCR, India. He has practised gastroenterology in India for 16+ years experience. The endoscopy list covers ERCP, Colonoscopy and ERCP when imaging and labs make the indication honest. Stent, histology and whether ERCP follows are written after records review — not from a brochure. Training includes MBBS. International patients meet him on camera first; travel to Delhi NCR is offered only if this suite is the right floor.

### Proposed BIO

Dr. Vishal Garg is a Consultant Gastroenterologist at Indraprastha Apollo Hospital in the Delhi NCR, with more than 16 years of experience in gastroenterology and hepatobiliary medicine.

The liver takes up most of his list. He manages chronic liver disease, liver cirrhosis, portal hypertension, chronic hepatitis B and C, autoimmune liver diseases and non-alcoholic fatty liver disease. Beyond the liver he performs ERCP and therapeutic endoscopy and manages peptic ulcer disease, inflammatory bowel disease and gastroesophageal reflux disease.

He holds an MBBS, took his MD in medicine at Maulana Azad Medical College in New Delhi, and his DM in gastroenterology at G.B. Pant Hospital, also in New Delhi.

His student record carries two silver medals, both for second place in a professional examination: microbiology in the second professional examination in 1999, and ophthalmology in the final professional examination in 2000. Neither subject is gastroenterological, which places those distinctions in his general medical years rather than in the specialty he went on to.

His one recorded presentation is at the top of his field. He gave an oral presentation at the annual meeting of the American Association for the Study of the Liver in Boston in 2010, which sits on the hepatology half of his practice, the half his clinical list is weighted towards.

He practises at Indraprastha Apollo Hospital in New Delhi and at Apollo Hospitals in Noida.

**Word count:** 228

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
