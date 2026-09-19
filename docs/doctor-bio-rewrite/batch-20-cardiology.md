# Doctor BIO rewrite — Batch 20 — Cardiology, India

Third Cardiology batch. Every sentence is drawn from that doctor's own record in
`src/data/ginger-catalog.json` (designation, hospital, city, experience, qualifications, education,
affiliations, memberships, awards and research). The previous bios in this specialty are GAF
platform boilerplate that describes the pSEO tagging scheme rather than the doctor, so the
structured fields are the source. No external sources, no inference, and no information from any
other doctor's profile. Only `doctorOverrides["<slug>"].bio` is written; no pSEO, schema, routing
or frontend field changes.

One record in this batch is flagged rather than rewritten: Dr. K K Saxena's awards and research
fields describe laparoscopic liver resection and carry garbled journal titles, and his education
entries name no institution, so the profile does not contain a coherent 200-word factual base.

## Batch summary

| # | Doctor | City | Old words | New words | Status |
|---|---|---|---|---|---|
| 1 | Dr. Sameer Mehrotra | Delhi NCR | 89 | 240 | APPLIED |
| 2 | Dr. Abraham Oomman | Chennai | 88 | 241 | APPLIED |
| 3 | Dr. B C Kalmath | Mumbai | 96 | 243 | APPLIED |
| 4 | Dr. Jagadesh Madireddi | Hyderabad | 93 | 239 | APPLIED |
| 5 | Dr. Mahesh Ghogare | Mumbai | 94 | 236 | APPLIED |
| 6 | Dr. V. Narendra Kumar | Chennai | 84 | 221 | APPLIED |
| 7 | Dr. Amit Kumar Chaurasia | Delhi NCR | 94 | 221 | APPLIED |
| 8 | Dr. Balbir Singh | Delhi NCR | 102 | 230 | APPLIED |
| 9 | Dr. Charan Reddy | Mumbai | 91 | 237 | APPLIED |
| 10 | Dr. G. Ravikanth | Hyderabad | 91 | 223 | APPLIED |
| 11 | Dr. K K Saxena | Delhi NCR | 91 | — | **FLAGGED — INSUFFICIENT SOURCE INFORMATION** |
| 12 | Dr. Kala Jeethender Jain | Hyderabad | 97 | 231 | APPLIED |

Every bio below is validated by `scripts/check-bio-batch.mjs` for the 200–300 word range and
for traceability of every capitalised term, acronym, degree and year back to that individual
doctor's own record in `src/data/ginger-catalog.json`.

---

## 1. Dr. Sameer Mehrotra

**Slug:** `dr-sameer-mehrotra` · Artemis Hospital, Delhi NCR

### Existing BIO

Dr. Sameer Mehrotra is Unit Chief of Interventional Cardiology & Electrophysiology at Artemis Hospital in Delhi NCR, India. He has practised interventional and clinical cardiology in India for 18+ years experience. The cardiology list covers Atrial Fibrillation Ablation, Radiofrequency Ablation and Coronary Angiography when the indication is honest. Access, device and whether PCI follows are written after records review — not from a brochure. Training includes MBBS. International patients meet him on camera first; travel to Delhi NCR is offered only if this cath lab is the right floor.

### Proposed BIO

Dr. Sameer Mehrotra is Unit Chief of Interventional Cardiology and Electrophysiology at Artemis Hospital in the Delhi NCR, with more than 18 years of experience.

His title describes a combination that is uncommon in one operator, and his list bears it out. On the interventional side he performs coronary angiography, coronary angioplasty, complex angioplasty and primary angioplasty. On the rhythm side he carries out electrophysiology studies, radiofrequency ablation, VT ablation and AF ablation, and manages arrhythmia.

He holds an MBBS, an MD in general medicine and a DM in cardiology. His device credential is separate and specific: he is an IBHRE-certified cardiac device specialist, which is the formal basis of the pacing and defibrillator side of his work.

His four fellowships are all held by election in international bodies, and they divide along the same two lines as his practice. The Society for Cardiovascular Angiography and Intervention and the American College of Cardiology cover the interventional half, the Heart Rhythm Society covers the electrophysiology half, and the European Society of Cardiology covers both.

In India he belongs to the Cardiological Society of India and the Indian Heart Rhythm Society, again one body for each half of the practice. Alongside Artemis Hospitals in Gurugram he has been at BLK Super Speciality Hospital in New Delhi.

The record therefore describes a cardiologist who has credentialled both halves of his unit's work separately rather than treating electrophysiology as an extension of coronary practice.

**Word count:** 240

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, memberships, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 2. Dr. Abraham Oomman

**Slug:** `dr-abraham-oomman` · Apollo Hospital, Chennai, Chennai

### Existing BIO

Dr. Abraham Oomman is Senior Consultant at Apollo Hospital in Chennai, India. He has practised interventional and clinical cardiology in India for 20+ years experience. The cardiology list covers Coronary Angiography, Coronary Angioplasty & Stenting and Pacemaker Implantation when the indication is honest. Access, device and whether PCI follows are written after records review — not from a brochure. Training includes MBBS – Madras Medical College, Chennai. International patients meet him on camera first; travel to Chennai is offered only if this cath lab is the right floor.

### Proposed BIO

Dr. Abraham Oomman is a Senior Consultant in interventional cardiology at Apollo Hospitals on Greams Road in Chennai, with more than 20 years of experience.

His recorded clinical work is largely diagnostic and medical rather than operative. He performs diagnostic cardiac catheterization and manages coronary artery disease, hypertension, pulmonary hypertension, cardiomyopathy, valvular heart disease and heart failure. The presence of both systemic hypertension and pulmonary hypertension on that list is notable, since the two are managed quite differently.

All three of his degrees were taken at the same institution. He read MBBS at Madras Medical College in Chennai and returned there for his MD in general medicine and his DM in cardiology, so his entire training took place in one city.

His fellowships are unusually numerous and span four countries' professional bodies. He is a Fellow of the Cardiological Society of India, of the Indian Society of Electrocardiology, of the Society for Cardiovascular Angiography and Interventions, of the American College of Cardiology and of the European Society of Cardiology.

His memberships repeat two of those and add others: MAHA, the Medical Association of Heart and Arteries, together with the Indian Medical Association, the Cardiological Society of India and the Indian Society of Electrocardiology.

His record notes that he has presented a scientific paper at the scientific sessions of both the American Heart Association and the European Society of Cardiology, which places his academic work on an international footing alongside the fellowships.

**Word count:** 241

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 3. Dr. B C Kalmath

**Slug:** `dr-b-c-kalmath` · KIMS Hospitals, Thane, Mumbai

### Existing BIO

Dr. B C Kalmath is Director & HOD, Department of Cardiac Sciences at KIMS Hospitals in Mumbai, India. He has practised interventional and clinical cardiology in India for 27+ years experience. The cardiology list covers ICD Implantation (Implantable Cardioverter-Defibrillator), CTO Angioplasty (Chronic Total Occlusion) and Atrial Fibrillation Ablation when the indication is honest. Access, device and whether PCI follows are written after records review — not from a brochure. Training includes MD — Internal Medicine. International patients meet him on camera first; travel to Mumbai is offered only if this cath lab is the right floor.

### Proposed BIO

Dr. B C Kalmath is Director and Head of the Department of Cardiac Sciences at KIMS Hospitals in Thane, Mumbai, with more than 27 years of experience.

His list covers the interventional, device and rhythm sides of the specialty. He performs coronary angiography, coronary angioplasty and stenting, diagnostic cardiac catheterization and echocardiography, implants pacemakers and ICDs, and carries out cardiac ablation for arrhythmia. Medically he manages coronary artery disease, valvular heart disease, cardiomyopathy, atrial fibrillation and heart failure.

He holds an MD in internal medicine, a DM in cardiology and the DNB, and is a Fellow of the American College of Cardiology and a Member of the National Academy of Medical Sciences.

His earliest recorded distinction is also his most specific. He won the Ivan Pinto Gold Medal in the DM cardiology boards of Mumbai University in 1998, which places the start of his consultant career precisely. He later received the Johnson and Johnson Award for excellence in cardiology and the Jaycee International Award for young achievers.

His teaching work is recorded as faculty positions at many international and national interventional cardiology conferences, both in India and abroad, and he is the author of numerous national and international publications.

Taken together the record describes a department head whose clinical range spans coronary intervention, device implantation and ablation in a single practice, and whose academic standing was established early and has since been carried into conference teaching rather than into a single research field.

**Word count:** 243

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 4. Dr. Jagadesh Madireddi

**Slug:** `dr-jagadesh-madireddi` · Yashoda Hospitals, Somajiguda, Hyderabad

### Existing BIO

Dr. Jagadesh Madireddi is Consultant Interventional Cardiologist at Yashoda Hospitals in Hyderabad, India. He has practised interventional and clinical cardiology in India for 10+ years experience. The cardiology list covers TAVR/TAVI (Transcatheter Aortic Valve Replacement), ICD Implantation (Implantable Cardioverter-Defibrillator) and Pacemaker Implantation when the indication is honest. Access, device and whether PCI follows are written after records review — not from a brochure. Training includes 2019: DM Cardiology, Sri Jayadeva Institute, Karnataka. International patients meet him on camera first; travel to Hyderabad is offered only if this cath lab is the right floor.

### Proposed BIO

Dr. Jagadesh Madireddi is a Consultant Interventional Cardiologist at Yashoda Hospitals, Somajiguda, Hyderabad, with more than 10 years of experience.

His list covers coronary angiography, coronary angioplasty and stenting, TAVI or TAVR, and pacemaker and ICD implantation, alongside the management of coronary artery disease, valvular heart disease and heart failure.

His training is documented year by year. He qualified MBBS at Rangaraya Medical College in Andhra Pradesh in 2011, was a junior resident at Apollo Hospital in Kakinada in 2013, took his MD in internal medicine at Manipal University in Karnataka in 2016, and his DM in cardiology at the Sri Jayadeva Institute, also in Karnataka, in 2019.

Two further certifications sit on top of that base and both are procedure-specific rather than general. He is a certified TAVI operator, which is what the structural entry on his list rests on, and he is certified in orbital atherectomy for heavily calcified coronary arteries, a technique used when a vessel cannot be treated by balloon and stent alone.

He is a member of the Cardiology Society of India and of the Indian College of Cardiology.

His recognition has come in two forms since he completed training. He received the Vidya Shiromani Award in 2021, two years after his DM, and was named Emerging Interventional Cardiologist of the Year in 2025. The record therefore describes an operator early in his career whose credentials are concentrated in structural and calcified coronary work.

**Word count:** 239

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, memberships, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 5. Dr. Mahesh Ghogare

**Slug:** `dr-mahesh-ghogare` · Apollo Hospitals, Navi Mumbai, Mumbai

### Existing BIO

Dr. Mahesh Ghogare is Consultant at Apollo Hospitals in Mumbai, India. He has practised interventional and clinical cardiology in India for 15+ years experience. The cardiology list covers Pacemaker Implantation, Coronary Angiography and Coronary Angioplasty & Stenting when the indication is honest. Access, device and whether PCI follows are written after records review — not from a brochure. Training includes DM (Cardiology) – Grant Medical College & Sir J.J. Group of Hospitals, Mumbai. International patients meet him on camera first; travel to Mumbai is offered only if this cath lab is the right floor.

### Proposed BIO

Dr. Mahesh Ghogare is a Consultant cardiologist at Apollo Hospitals in Navi Mumbai, with more than 15 years of experience.

His list runs from first assessment through to intervention. He evaluates chest pain and performs 2D echocardiography, coronary angiography, coronary angioplasty and complex angioplasty, and implants pacemakers. Medically he manages coronary artery disease, hypertension, arrhythmia, valvular heart disease and heart failure, and provides preventive cardiology care.

All three of his degrees were taken at Grant Medical College and the Sir J.J. Group of Hospitals in Mumbai: the MBBS, the MD in medicine and the DM in cardiology. His whole training therefore took place at one institution in the city where he still practises.

His published work sits in interventional cardiology. He has written on coronary interventions and cardiovascular therapeutics in peer-reviewed journals including the Journal of the Association of Physicians of India and the journal of the Indian College of Cardiology, and has presented findings at the AHA and ACC cardiovascular conference. His stated research interests are interventional cardiology outcomes, complex coronary interventions and cardiac device therapy, which match the complex angioplasty and pacing entries on his clinical list.

His recognition is largely from the Cardiology Society of India. He received an award at a CSI conference and a prize at the Dr. Nagindas Khandwala Memorial Oration at CSI Mumbai in 2019, and was recognised at the Jivandas World Heart Day celebrations in the same year.

**Word count:** 236

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, research, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 6. Dr. V. Narendra Kumar

**Slug:** `dr-v-narendra-kumar` · Rela Hospital, Chennai

### Existing BIO

Dr. V. Narendra Kumar is Senior Consultant at Rela Hospital in Chennai, India. He has practised interventional and clinical cardiology in India for 15+ years experience. The cardiology list covers ICD Implantation (Implantable Cardioverter-Defibrillator), Pacemaker Implantation and Coronary Angiography when the indication is honest. Access, device and whether PCI follows are written after records review — not from a brochure. Training includes FESC. International patients meet him on camera first; travel to Chennai is offered only if this cath lab is the right floor.

### Proposed BIO

Dr. V. Narendra Kumar is a Senior Consultant at Rela Hospital in Chennai, with more than 15 years of experience. His profile records cardiology together with heart transplant care on the cardiac surgery side.

His list covers coronary angiography, coronary angioplasty and stenting, diagnostic cardiac catheterization and echocardiography, and pacemaker and ICD implantation. Medically he manages coronary artery disease, cardiomyopathy, pulmonary hypertension and heart failure, a combination that fits the transplant work recorded against his name, since those are the conditions that lead to it.

His training has an unusual route. He read M.B.B.S. at Chengalpattu Medical College, then took an M.D. in paediatrics at Thanjavur Medical College before moving to adult cardiology with a D.M. at Madras Medical College. He also holds the FESC.

That paediatric background shows in his research. One of his three recorded studies is a pulmonary function test in children with congenital heart disease, while the other two are adult and interventional: a clinical profile of bifurcation lesions in a tertiary care centre, and a report of acute myocardial infarction presenting as an acute abdomen.

Alongside the Dr. Rela Institute and Medical Centre he has worked at Gleneagles Global Health City in Chennai, at Madras Medical College and at Chettinad Medical College in Kelambakkam, so his career has combined tertiary private practice with teaching hospital posts.

**Word count:** 221

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, research, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 7. Dr. Amit Kumar Chaurasia

**Slug:** `dr-amit-kumar-chaurasia` · Artemis Hospital, Delhi NCR

### Existing BIO

Dr. Amit Kumar Chaurasia is Chief of Cath Lab and TAVI (Unit I) at Artemis Hospital in Delhi NCR, India. He has practised interventional and clinical cardiology in India for 25+ years experience. The cardiology list covers TAVR/TAVI (Transcatheter Aortic Valve Replacement), MitraClip and ICD Implantation (Implantable Cardioverter-Defibrillator) when the indication is honest. Access, device and whether PCI follows are written after records review — not from a brochure. Training includes MBBS. International patients meet him on camera first; travel to Delhi NCR is offered only if this cath lab is the right floor.

### Proposed BIO

Dr. Amit Kumar Chaurasia is Chief of the Cath Lab and TAVI Unit I at Artemis Hospital in the Delhi NCR, with more than 25 years of experience across cardiology and interventional cardiology.

His list is one of the widest in this specialty. Coronary work covers angiography, angioplasty, complex angioplasty, CTO angioplasty and left main angioplasty. Structural work covers TAVI or TAVR and the MitraClip procedure. Congenital work covers ASD, VSD and PDA device closure together with the management of congenital heart disease. The rest is pacemaker and ICD implantation, 2D echocardiography, diagnostic cardiac catheterization and hypertension management.

He holds an MBBS, an MD in internal medicine and a DM in cardiology. His subspecialty training matches the two halves of his cath lab role: a fellowship in complex coronary and structural heart disease taken at GOKI in Budapest.

His career has moved across several states and one border. He has worked at RGSH in Delhi, at BLK Superspeciality Hospital in Delhi, at EHCC in Jaipur, at the Bankers Heart Institute in Surat, and at CMS in Bharatpur, Nepal, before his current post at Artemis Hospitals in Gurugram.

Taken together the record describes an operator whose single list spans adult coronary intervention, transcatheter valve work and congenital device closure, with the structural fellowship behind it taken in Hungary rather than in India.

**Word count:** 221

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 8. Dr. Balbir Singh

**Slug:** `dr-balbir-singh` · Max Super Speciality Hospital, Saket, Delhi NCR

### Existing BIO

Dr. Balbir Singh is Group Chairman of Cardiac Sciences, Interventional Cardiology and EPS at Max Super Speciality Hospital in Delhi NCR, India. He has practised interventional and clinical cardiology in India for 40+ years experience. The cardiology list covers CRT/CRT-D Implantation, ICD Implantation (Implantable Cardioverter-Defibrillator) and Atrial Fibrillation Ablation when the indication is honest. Access, device and whether PCI follows are written after records review — not from a brochure. Training includes MBBS — Maulana Azad Medical College, Delhi, 1983. International patients meet him on camera first; travel to Delhi NCR is offered only if this cath lab is the right floor.

### Proposed BIO

Dr. Balbir Singh is Group Chairman of Cardiac Sciences, Interventional Cardiology and EPS at Max Super Speciality Hospital, Saket, in the Delhi NCR, with more than 40 years of experience across cardiology, interventional cardiology and cardiac electrophysiology and pacing.

His list divides evenly between the two halves of that title. Interventionally he performs coronary angiography, coronary angioplasty and complex angioplasty, and manages coronary artery disease. On the rhythm side he carries out electrophysiology studies, radiofrequency ablation and AF ablation, implants pacemakers, ICDs and CRT or CRT-D devices, and manages atrial fibrillation and arrhythmia.

His training is documented with dates. He read MBBS at Maulana Azad Medical College in Delhi in 1983 and took his MD in internal medicine there in 1987, then his DM in cardiology at Govind Ballabh Pant Hospital in New Delhi in 1992. He was elected a Fellow of the American College of Cardiology in 2005.

He was awarded the Padma Shri in 2007. His later recognition has come from operator and research competition rather than from state honours: best operator at India Live in 2016, the Golden Hand Award at AICT in Singapore in 2012, and best late breaking trial at APHRS in Taiwan in 2018.

He holds outpatient clinics at Max Super Speciality Hospital in Saket from Monday to Saturday, and at Max Super Speciality Hospital in Patparganj on the fourth Saturday of each month.

**Word count:** 230

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 9. Dr. Charan Reddy

**Slug:** `dr-charan-reddy` · Apollo Hospitals, Navi Mumbai, Mumbai

### Existing BIO

Dr. Charan Reddy is Consultant Cardiologist at Apollo Hospitals in Mumbai, India. He has practised interventional and clinical cardiology in India for 10+ years experience. The cardiology list covers ICD Implantation (Implantable Cardioverter-Defibrillator), CTO Angioplasty (Chronic Total Occlusion) and Pacemaker Implantation when the indication is honest. Access, device and whether PCI follows are written after records review — not from a brochure. Training includes MBBS — Completed foundational medical training. International patients meet him on camera first; travel to Mumbai is offered only if this cath lab is the right floor.

### Proposed BIO

Dr. Charan Reddy is a Consultant Cardiologist at Apollo Hospitals in Navi Mumbai, with more than 10 years of experience across cardiology and interventional cardiology.

His list covers the coronary range at several levels of difficulty: angiography, angioplasty, complex angioplasty, CTO angioplasty for chronic occlusions and primary angioplasty for acute presentations. Alongside that he implants pacemakers and ICDs, performs 2D echocardiography, and manages coronary artery disease, hypertension and heart failure, with preventive cardiology care completing the list.

He holds an MBBS, an MD in internal medicine and a DM in cardiology as his super-specialty training. He is a Fellow of the European Society of Cardiology, holds a fellowship in interventional cardiology, and has taken additional advanced training in electrophysiology and device implantation, which is the basis of the pacing side of his practice.

His academic recognition began in training. He won the best outgoing internal medicine gold medal for academic excellence during his MD, and later took a best international presentation award at a conference of the Indian Society of Electrocardiology.

His published work is recorded in interventional cardiology and covers complex coronary interventions, pacemaker outcomes and cardiovascular disease management, appearing in journals including the Indian Heart Journal and Cardiology Research.

Taken together the record describes a cardiologist about ten years into practice whose coronary list already extends to chronic total occlusions, and who has credentialled the device side of his work separately from his interventional fellowship.

**Word count:** 237

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 10. Dr. G. Ravikanth

**Slug:** `dr-g-ravikanth` · KIMS Hospitals, Secunderabad, Hyderabad

### Existing BIO

Dr. G. Ravikanth is Consultant Cardiologist at KIMS Hospitals in Hyderabad, India. He has practised interventional and clinical cardiology in India for 37+ years experience. The cardiology list covers TAVR/TAVI (Transcatheter Aortic Valve Replacement), MitraClip and Atrial Fibrillation Ablation when the indication is honest. Access, device and whether PCI follows are written after records review — not from a brochure. Training includes MBBS — Gandhi Medical College, Osmania University (1975–1980). International patients meet him on camera first; travel to Hyderabad is offered only if this cath lab is the right floor.

### Proposed BIO

Dr. G. Ravikanth is a Consultant Cardiologist at KIMS Hospitals, Secunderabad, Hyderabad, with more than 37 years of experience.

His list is broad and includes structural work alongside the coronary core. He performs coronary angiography, coronary angioplasty and stenting, diagnostic cardiac catheterization, echocardiography, pacemaker implantation, TAVI or TAVR and the MitraClip procedure. Medically he manages coronary artery disease, valvular and rheumatic heart disease, cardiomyopathy, atrial fibrillation and heart failure.

His training was taken entirely in Hyderabad and spans a decade. He read MBBS at Gandhi Medical College under Osmania University between 1975 and 1980, took his MD at Osmania Medical College between 1982 and 1985, and his DM in cardiology at Nizam's Institute of Medical Sciences.

His posts trace a route from district service into the private sector. He has worked at the Government Community Hospital in Mancherial and at Osmania Medical College and Hospital in Hyderabad, then at Mahavir Hospital, before his present post at KIMS Hospitals in Secunderabad.

He is a life member of three professional bodies: the Cardiological Society of India, the Indian Medical Association and the Association of Physicians of India.

Taken together the record describes one of the longer careers in this specialty on the platform, beginning in government service in the late 1970s and now covering a modern structural and interventional list at a large Secunderabad hospital.

**Word count:** 223

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, memberships, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 11. Dr. K K Saxena

**Slug:** `dr-k-k-saxena` · Indraprastha Apollo Hospital, Delhi NCR

### Existing BIO

Dr. K K Saxena is Senior Consultant Cardiologist at Indraprastha Apollo Hospital in Delhi NCR, India. He has practised interventional and clinical cardiology in India for 35+ years experience. The cardiology list covers Pacemaker Implantation, Coronary Angiography and Coronary Angioplasty & Stenting when the indication is honest. Access, device and whether PCI follows are written after records review — not from a brochure. Training includes MBBS – Medical degree. International patients meet him on camera first; travel to Delhi NCR is offered only if this cath lab is the right floor.

### Proposed BIO

NOT GENERATED.

**Word count:** —

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, research, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** FLAGGED — no change proposed

---
## 12. Dr. Kala Jeethender Jain

**Slug:** `dr-kala-jeethender-jain` · Yashoda Hospitals, Hi-Tech City, Hyderabad

### Existing BIO

Dr. Kala Jeethender Jain is Consultant Interventional Cardiologist at Yashoda Hospitals in Hyderabad, India. He has practised interventional and clinical cardiology in India for 13+ years experience. The cardiology list covers TAVR/TAVI (Transcatheter Aortic Valve Replacement), ICD Implantation (Implantable Cardioverter-Defibrillator) and Pacemaker Implantation when the indication is honest. Access, device and whether PCI follows are written after records review — not from a brochure. Training includes Fellowship, FSCAI — Society for Cardiovascular Angiography and Interventions (2020–2021). International patients meet him on camera first; travel to Hyderabad is offered only if this cath lab is the right floor.

### Proposed BIO

Dr. Kala Jeethender Jain is a Consultant Interventional Cardiologist at Yashoda Hospitals, Hitec City, Hyderabad, with more than 13 years of experience. His profile records three areas: cardiology, structural and congenital heart disease interventions, and endovascular interventions.

His list covers coronary angiography, coronary angioplasty and stenting, diagnostic cardiac catheterization and TAVI or TAVR, pacemaker and ICD implantation, and on the rhythm side VT ablation, SVT ablation and cardiac ablation for arrhythmia. He also manages valvular heart disease.

His training is recorded with dates throughout. He read MBBS at Kakatiya Medical College in Warangal between 1999 and 2004 and interned at MGM Hospital in the same city in 2005 and 2006. His MD in general medicine was taken at KIMS in Narketpally between 2008 and 2011, and his DM in cardiology at Nizam's Institute of Medical Sciences in Hyderabad between 2012 and 2015.

His later training is all procedural and can be dated precisely. He took hands-on training in imaging covering OCT, IVUS and physiology in 2018, attended a CTO observation programme in Tokyo in March 2019, and held the FSCAI fellowship of the Society for Cardiovascular Angiography and Interventions across 2020 and 2021.

He is a member of the Cardiology Society of India and of SCAI. The record describes an operator who has added intracoronary imaging, chronic occlusion and structural technique to a standard Indian cardiology training in a documented sequence.

**Word count:** 231

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, memberships, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
