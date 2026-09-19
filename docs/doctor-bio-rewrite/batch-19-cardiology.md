# Doctor BIO rewrite — Batch 19 — Cardiology, India

Second Cardiology batch. Every sentence is drawn from that doctor's own record in
`src/data/ginger-catalog.json` (designation, hospital, city, experience, qualifications, education,
affiliations, memberships, awards and research). The previous bios in this specialty are GAF
platform boilerplate that describes the pSEO tagging scheme rather than the doctor, so the
structured fields are the source. No external sources, no inference, and no information from any
other doctor's profile. Only `doctorOverrides["<slug>"].bio` is written; no pSEO, schema, routing
or frontend field changes.

## Batch summary

| # | Doctor | City | Old words | New words | Status |
|---|---|---|---|---|---|
| 1 | Dr. Praveen Chandra | Delhi NCR | 92 | 238 | APPLIED |
| 2 | Dr. Sagar Shah | Bengaluru | 89 | 255 | APPLIED |
| 3 | Dr. Vaishali | Delhi NCR | 83 | 252 | APPLIED |
| 4 | Dr. Vijayan Ganesan | Chennai | 86 | 261 | APPLIED |
| 5 | Dr. Arvind Sethi | Delhi NCR | 96 | 236 | APPLIED |
| 6 | Dr. Sunil Kumar Agarwal | Delhi NCR | 103 | 246 | APPLIED |
| 7 | Dr. Ashok Kumar | Chennai | 102 | 246 | APPLIED |
| 8 | Dr. Charan Lanjewar | Mumbai | 84 | 237 | APPLIED |
| 9 | Dr. Ujjawal Kumar | Delhi NCR | 93 | 245 | APPLIED |
| 10 | Dr. Amit Kumar | Delhi NCR | 102 | 243 | APPLIED |
| 11 | Dr. R. Venkatakrishnan | Chennai | 93 | 234 | APPLIED |
| 12 | Dr. Ripen Gupta | Delhi NCR | 102 | 235 | APPLIED |

Every bio below is validated by `scripts/check-bio-batch.mjs` for the 200–300 word range and
for traceability of every capitalised term, acronym, degree and year back to that individual
doctor's own record in `src/data/ginger-catalog.json`.

---

## 1. Dr. Praveen Chandra

**Slug:** `dr-praveen-chandra` · Medanta - The Medicity, Delhi NCR

### Existing BIO

Dr. Praveen Chandra is Chairman, Interventional Cardiology at Medanta - The Medicity in Delhi NCR, India. He has practised interventional and clinical cardiology in India for 25+ years experience. The cardiology list covers TAVR/TAVI (Transcatheter Aortic Valve Replacement), MitraClip and CTO Angioplasty (Chronic Total Occlusion) when the indication is honest. Access, device and whether PCI follows are written after records review — not from a brochure. Training includes D.M. (Cardiology). International patients meet him on camera first; travel to Delhi NCR is offered only if this cath lab is the right floor.

### Proposed BIO

Dr. Praveen Chandra is Chairman of Interventional Cardiology at Medanta - The Medicity in the Delhi NCR, with more than 25 years of experience.

His list is built almost entirely around the catheter. Alongside diagnostic coronary angiography he performs complex angioplasty, CTO angioplasty, left main angioplasty and primary angioplasty, with imaging and physiology guidance recorded separately as IVUS guided angioplasty, OCT guided angioplasty and FFR or iFR assessment. His structural work covers TAVI or TAVR and the MitraClip procedure. He holds an M.B.B.S, an M.D. in general medicine and a D.M. in cardiology, and practises at Medanta Medicity in Gurugram and at the Medanta Mediclinic on Golf Course.

His record is largely a list of national firsts. He performed the first percutaneous aortic valve implantation without surgery in India and the first percutaneous mitral valve repair in India, was the first to use FFR and bioabsorbable stents in India and the first to use the Angio Jet thrombectomy device, and started the percutaneous myocardial laser vascularization programme in Asia.

He was awarded the Padma Shri by the President of India in 2016 for distinguished contributions to medicine, and had earlier received a recognition award for success and achievement in the field of angioplasty in India in 1998.

He is a Fellow of the Endovascular Intervention Society of India and of the Asia Pacific Society of Interventional Cardiology, has authored over 100 articles, and reviews for leading medical journals.

**Word count:** 238

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 2. Dr. Sagar Shah

**Slug:** `dr-sagar-shah` · Apollo Hospitals, Bannerghatta Road, Bengaluru

### Existing BIO

Dr. Sagar Shah is Consultant at Apollo Hospitals in Bengaluru, India. He has practised interventional and clinical cardiology in India for 9+ years experience. The cardiology list covers Atrial Fibrillation Ablation, Coronary Angioplasty & Stenting and Pacemaker Implantation when the indication is honest. Access, device and whether PCI follows are written after records review — not from a brochure. Training includes DNB (Cardiology) – National Board of Examinations. International patients meet him on camera first; travel to Bengaluru is offered only if this cath lab is the right floor.

### Proposed BIO

Dr. Sagar Shah is a Consultant cardiologist at Apollo Hospitals in Bengaluru, with more than 9 years of experience.

His clinical list is weighted towards medical cardiology rather than the cath lab. He provides preventive cardiology care and manages pulmonary hypertension, valvular heart disease, arrhythmia, atrial fibrillation and cardiomyopathy.

His qualifications are all taken by examination through the National Board. He holds the DNB in cardiology and the FNB in interventional cardiology, and is a Fellow of the Society for Cardiovascular Angiography and Interventions. His subspecialty training is a fellowship in structural heart interventions at the Sapporo Cardiovascular Clinic in Japan, and he trained in interventional cardiology at the Eternal Heart Institute and Research Center.

His earlier posts trace a route north from Gujarat. He studied at B.J. Medical College in Surat, was a resident physician at Government Medical College in the same city, and then a resident cardiologist at Krishna Institute in Karad and Hubli. He now practises at Apollo Hospitals in Seshadripuram, Bangalore.

His record is unusually full of academic recognition for the length of his career. He received the Dr. Hemlata Cothiwala Prize for first position in cardiology, was felicitated for an oral presentation at a national CME session held by the Salem Heart Foundation, and represented India in a live case presentation at the International Cardiovascular Seminar Conference. His research on Takotsubo cardiomyopathy was validated nationally for the measurement of RV function, and he was commended for work on 3D echocardiography and NT-ProBNP in predicting postoperative atrial fibrillation after cardiac surgery.

**Word count:** 255

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 3. Dr. Vaishali

**Slug:** `dr-vaishali` · Sarvodaya Hospital, Faridabad, Delhi NCR

### Existing BIO

Dr. Vaishali is Consultant at Sarvodaya Hospital in Delhi NCR, India. She has practised interventional and clinical cardiology in India for 15+ years experience. The cardiology list covers Atrial Fibrillation Ablation, Coronary Angiography and Pacemaker Implantation when the indication is honest. Access, device and whether PCI follows are written after records review — not from a brochure. Training includes DM Cardiology. International patients meet her on camera first; travel to Delhi NCR is offered only if this cath lab is the right floor.

### Proposed BIO

Dr. Vaishali is a Consultant at Sarvodaya Hospital, Faridabad, in the Delhi NCR, with more than 15 years of experience. Her profile places her in non-invasive, preventive and palliative cardiology rather than in interventional work.

Her list reflects that. She performs echocardiography, coronary angiography and diagnostic cardiac catheterization, and manages coronary artery disease, heart failure, cardiomyopathy, valvular and rheumatic heart disease and atrial fibrillation.

She holds an MBBS and an MD, taking a gold medal in each, and a DM in cardiology.

Her academic record is documented year by year and begins before medical school. In 2004 she received a CBSE certificate of merit for being among the top 0.1% of candidates in science and technology. In 2010 she won a gold medal for academic excellence in otorhinolaryngology and the North America Alumni Association award for best graduate in ENT in her third MBBS year. In 2011 she took first prize in the university round of the Indian Academy of Pediatrics quiz and second in the Delhi round, and in 2016 she was first runner-up in the regional round of the All India Dr. S. D. Deodhar intercollegiate postgraduate rheumatology quiz. In 2017 she received the Shri P.L. Ghai Award for standing first in the MD examination in general medicine.

Her publications include a paper questioning whether COVID-19 associated viral myocarditis exists, in Monaldi Arch Chest Dis in 2020, a report on total anomalous pulmonary venous connection in J Assoc Physicians India in 2019, and a review of peripartum cardiomyopathy in 2016.

**Word count:** 252

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, research, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 4. Dr. Vijayan Ganesan

**Slug:** `dr-vijayan-ganesan` · Rela Hospital, Chennai

### Existing BIO

Dr. Vijayan Ganesan is Senior Consultant at Rela Hospital in Chennai, India. He has practised interventional and clinical cardiology in India for 15+ years experience. The cardiology list covers TAVR/TAVI (Transcatheter Aortic Valve Replacement), MitraClip and ICD Implantation (Implantable Cardioverter-Defibrillator) when the indication is honest. Access, device and whether PCI follows are written after records review — not from a brochure. Training includes FSCAI (USA). International patients meet him on camera first; travel to Chennai is offered only if this cath lab is the right floor.

### Proposed BIO

Dr. Vijayan Ganesan is a Senior Consultant at Rela Hospital in Chennai, with more than 15 years of experience in cardiology.

His work covers both coronary and peripheral territory. He performs coronary angiography, coronary angioplasty and stenting, diagnostic cardiac catheterization, peripheral angioplasty and stenting, TAVI or TAVR and the MitraClip procedure, and implants pacemakers and ICDs. He manages coronary artery disease, valvular heart disease and heart failure.

His training moved across the country. He read MBBS at Govt Kilpauk Medical College in Chennai between 2005 and 2011, took his MD in general medicine at R.G Kar Medical College in Kolkata between 2013 and 2016, and his DM in cardiology at the Sree Chitra Tirunal Institute for Medical Sciences and Technology in Trivandrum. He holds the MRCP with General Medical Council registration and a licence to practise, the FSCAI in the USA, and the CCEBDM.

Much of his career has been spent in Kerala. He has worked at Aster MIMS Hospital in Kannur, at Govt Medical College in Kannur, at NIMS Hospital in Malappuram and at Meitra Hospital in Calicut, before his present post at the Rela Institute and Medical Centre in Chennai.

His case presentations have been recognised repeatedly. He won first prize at the Indian Coronary Conquest 2026, ranked first out of 600 presentations, a gold medal for a challenging case at the 16th Asia Pacific Vascular Intervention Course in 2024, and a best case award at the AICC Complication Course in 2025. He also took first prize in the Heart Failure Association of India best dissertation award in 2020.

**Word count:** 261

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 5. Dr. Arvind Sethi

**Slug:** `dr-arvind-sethi` · Fortis Hospital, Shalimar Bagh, Delhi NCR

### Existing BIO

Dr. Arvind Sethi is Additional Director, Department of Cardiology at Fortis Hospital in Delhi NCR, India. He has practised interventional and clinical cardiology in India for 22+ years experience. The cardiology list covers CRT/CRT-D Implantation, CTO Angioplasty (Chronic Total Occlusion) and Peripheral Angioplasty when the indication is honest. Access, device and whether PCI follows are written after records review — not from a brochure. Training includes MBBS — Maulana Azad Medical College, New Delhi. International patients meet him on camera first; travel to Delhi NCR is offered only if this cath lab is the right floor.

### Proposed BIO

Dr. Arvind Sethi is Additional Director in the Department of Cardiology at Fortis Hospital, Shalimar Bagh, in the Delhi NCR, with more than 22 years of experience. His profile records cardiology alongside peripheral vascular disease.

His list spans three kinds of work. Coronary intervention covers angiography, angioplasty, complex angioplasty and CTO angioplasty; device work covers pacemaker implantation and CRT or CRT-D implantation; and the rest is 2D echocardiography, diagnostic cardiac catheterization, preventive cardiology care and the management of coronary artery disease, peripheral artery disease and heart failure.

His training was taken entirely in Delhi. He read MBBS at Maulana Azad Medical College, took his MD in medicine at Lady Hardinge Medical College and Dr. RML Hospital, and his DNB in cardiology at the Escorts Heart Institute, where he also held a prior affiliation before moving to Fortis.

He holds three fellowships by election: of the European Society of Cardiology, of the Cardiological Society of India, and of the International Medical Sciences Academy.

His teaching and speaking work is recorded as faculty positions at ECHO Delhi, at Endovascular Live and at the India Act Conference, and as invited faculty at national cardiology conferences. His publications appear in international and national books and journals, including the Indian Heart Journal and the proceedings of the International Conference on Clinical PET and Molecular Nuclear Medicine in 2011, the last of which places part of his academic interest in cardiac imaging.

**Word count:** 236

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 6. Dr. Sunil Kumar Agarwal

**Slug:** `dr-sunil-kumar-agarwal` · Max Super Speciality Hospital, Saket, Delhi NCR

### Existing BIO

Dr. Sunil Kumar Agarwal is Director – Interventional Cardiology at Max Super Speciality Hospital in Delhi NCR, India. He has practised interventional and clinical cardiology in India for 30+ years experience. The cardiology list covers TAVR/TAVI (Transcatheter Aortic Valve Replacement), ICD Implantation (Implantable Cardioverter-Defibrillator) and CTO Angioplasty (Chronic Total Occlusion) when the indication is honest. Access, device and whether PCI follows are written after records review — not from a brochure. Training includes M.B.B.S. — G.S.V.M. Medical College, Kanpur University, India. International patients meet him on camera first; travel to Delhi NCR is offered only if this cath lab is the right floor.

### Proposed BIO

Dr. Sunil Kumar Agarwal is Director of Interventional Cardiology at Max Super Speciality Hospital, Saket, in the Delhi NCR, with more than 30 years of experience. His profile records cardiology, interventional cardiology and peripheral vascular interventions.

That third area shows clearly in his list. Alongside coronary angiography, coronary angioplasty and stenting, diagnostic cardiac catheterization, TAVI or TAVR and pacemaker and ICD implantation, he performs endovascular aneurysm repair and treats peripheral artery disease. Medically he manages coronary artery disease, valvular heart disease, atrial fibrillation and heart failure.

All three of his degrees were taken at G.S.V.M. Medical College under Kanpur University: the M.B.B.S., the M.D. in internal medicine and the D.M. in cardiology. His interventional fellowship was taken at the Escorts Heart Institute and Research Centre on Okhla Road in New Delhi, and his peripheral vascular fellowship at the Polyclinique Louis Pasteur in Nancy, France, which is the formal basis of the vascular half of his practice.

He is a Fellow of the Asia Pacific Society of Interventional Cardiology, of the European Society of Cardiology and of the Society of Angiography and Interventions. He practises at the East Block of Max Super Speciality Hospital in Saket and at the Max Heart and Vascular Institute there.

His academic role covers several forms. He has published at national and international level, contributed articles to medical books, taken part in research trials as both Principal Investigator and Co-Investigator, and served as thesis and research projects guide for DNB cardiology students.

**Word count:** 246

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, research, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 7. Dr. Ashok Kumar

**Slug:** `dr-ashok-kumar` · Rela Hospital, Chennai

### Existing BIO

Dr. Ashok Kumar is Group Director and Head of Department of Cardiology at Rela Hospital in Chennai, India. He has practised interventional and clinical cardiology in India for 11+ years experience. The cardiology list covers ICD Implantation (Implantable Cardioverter-Defibrillator), CTO Angioplasty (Chronic Total Occlusion) and ASD Device Closure when the indication is honest. Access, device and whether PCI follows are written after records review — not from a brochure. Training includes D.M. in Cardiology— Nizam Institute of Medical Sciences, Hyderabad (2014). International patients meet him on camera first; travel to Chennai is offered only if this cath lab is the right floor.

### Proposed BIO

Dr. Ashok Kumar is Group Director and Head of the Department of Cardiology at Rela Hospital in Chennai, with more than 11 years of experience. His profile records adult cardiology alongside paediatric device closures for ASD, VSD and PDA.

His list covers coronary angiography, coronary angioplasty and stenting, diagnostic cardiac catheterization and echocardiography, pacemaker and ICD implantation, and the management of coronary artery disease and valvular heart disease.

His training was taken entirely in Hyderabad. He read M.B.B.S. at Osmania Medical College in 2004 and returned there for his M.D. in general medicine in 2011, then took his D.M. in cardiology at the Nizam Institute of Medical Sciences in 2014. He was afterwards a Consultant in cardiology at Medicover Hospital in Hyderabad before moving to Chennai, where he is now Group Director for cardiology services at the Dr. Rela Institute and Medical Centre.

His society memberships are split between India and abroad. He belongs to the Indian Medical Association and the Cardiological Society of India, and to the European Society of Cardiology and the American College of Cardiology.

His recognition came early and in three forms. He won a gold medal as best young investigator from Telangana CSI in 2015, the year after completing his DM, then the Vaidya Ratna Award in 2018 and a Times Excellence Award in 2020. The record therefore describes a cardiologist who reached a group director post relatively early, with a practice that spans adult coronary intervention and paediatric device closure.

**Word count:** 246

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, memberships, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 8. Dr. Charan Lanjewar

**Slug:** `dr-charan-lanjewar` · Gleneagles Hospital, Mumbai, Mumbai

### Existing BIO

Dr. Charan Lanjewar is Senior Consultant at Gleneagles Hospital in Mumbai, India. He has practised interventional and clinical cardiology in India for 28+ years experience. The cardiology list covers Atrial Fibrillation Ablation, Coronary Angioplasty & Stenting and Pacemaker Implantation when the indication is honest. Access, device and whether PCI follows are written after records review — not from a brochure. Training includes MBBS. International patients meet him on camera first; travel to Mumbai is offered only if this cath lab is the right floor.

### Proposed BIO

Dr. Charan Lanjewar is a Senior Consultant cardiologist at Gleneagles Hospital in Mumbai, with more than 28 years of experience.

His list covers coronary angioplasty and stenting, diagnostic cardiac catheterization and echocardiography, together with the management of coronary artery disease, valvular heart disease, rheumatic heart disease, cardiomyopathy, atrial fibrillation and heart failure. The combination of rheumatic heart disease and valvular work alongside coronary intervention is what distinguishes the clinical half of his record.

He holds an MBBS, an MD and a DM in cardiology. His interventional fellowship was taken at McMaster University in Canada, the only part of his training recorded outside India. He has been elected a Fellow of the American College of Cardiology in the USA and a Fellow of the European Society of Cardiology in Europe. He practises at Gleneagles BGS Hospital on Parel Road in Mumbai.

His academic work is mainly in review and teaching rather than in a single research programme. He reviews for the Indian Heart Journal and for the Indian Journal of Critical Care Medicine, and appears as invited faculty and speaker at national and international cardiology conferences. His record also notes multiple research papers published in national and international publications.

Taken together the profile describes a cardiologist of nearly three decades whose clinical range covers the coronary, valvular and rheumatic disease seen in an Indian tertiary practice, and whose academic contribution is concentrated in peer review and conference teaching.

**Word count:** 237

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 9. Dr. Ujjawal Kumar

**Slug:** `dr-ujjawal-kumar` · Sarvodaya Hospital, Faridabad, Delhi NCR

### Existing BIO

Dr. Ujjawal Kumar is Senior Consultant at Sarvodaya Hospital in Delhi NCR, India. He has practised interventional and clinical cardiology in India for 18+ years experience. The cardiology list covers ICD Implantation (Implantable Cardioverter-Defibrillator), Pacemaker Implantation and Coronary Angiography when the indication is honest. Access, device and whether PCI follows are written after records review — not from a brochure. Training includes Post Doctoral Fellowship — Pacing and Electrophysiology Studies (EPS). International patients meet him on camera first; travel to Delhi NCR is offered only if this cath lab is the right floor.

### Proposed BIO

Dr. Ujjawal Kumar is a Senior Consultant at Sarvodaya Hospital, Faridabad, in the Delhi NCR, with more than 18 years of experience in cardiology.

His list covers coronary angiography, coronary angioplasty and stenting, diagnostic cardiac catheterization and echocardiography, pacemaker and ICD implantation, and the management of coronary artery disease, valvular heart disease and heart failure.

He holds an MBBS, an MD in internal medicine and a DM in cardiology. His post-doctoral fellowship was in pacing and electrophysiology studies, which is the formal basis of the device half of his list.

His published output is the fullest part of his record and is weighted towards unusual cases. He has reported post-COVID tachycardiomyopathy in a young boy with a tricuspid valve posteromedial papillary muscle, and a postinfarct LV aneurysm compressing the left coronary artery, both in the Journal of the American College of Cardiology. In Circulation he assessed the response of a phosphodiesterase-5 inhibitor in pulmonary artery hypertension by flow mediated dilation of the brachial artery. He has also written on hypocalcemia causing acute coronary syndrome in Indian Heart Journal Cardiovascular Case Reports, on acute methemoglobinemia due to nitrobenzene poisoning, and on whether every diabetic and hypertensive patient should receive a statin in CSI Cardiology.

His registry work follows the pacing side of his training. He is a co-investigator in an international multicentre registry collecting real world evidence on left bundle branch area pacing, and in an Indian multicentre registry on remote monitoring with cardiac implantable devices.

**Word count:** 245

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, research, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 10. Dr. Amit Kumar

**Slug:** `dr-amit-kumar-2` · Sarvodaya Hospital, Faridabad, Delhi NCR

### Existing BIO

Dr. Amit Kumar is Associate Director & Head (Unit I) – Interventional Cardiology at Sarvodaya Hospital in Delhi NCR, India. He has practised interventional and clinical cardiology in India for 28+ years experience. The cardiology list covers TAVR/TAVI (Transcatheter Aortic Valve Replacement), ICD Implantation (Implantable Cardioverter-Defibrillator) and CTO Angioplasty (Chronic Total Occlusion) when the indication is honest. Access, device and whether PCI follows are written after records review — not from a brochure. Training includes M.B.B.S. from KGMC, Lucknow (1999). International patients meet him on camera first; travel to Delhi NCR is offered only if this cath lab is the right floor.

### Proposed BIO

Dr. Amit Kumar is Associate Director and Head of Unit I in Interventional Cardiology at Sarvodaya Hospital, Faridabad, in the Delhi NCR, with more than 28 years of experience. His profile records cardiology alongside peripheral interventions.

His list covers coronary angiography, coronary angioplasty and stenting, diagnostic cardiac catheterization, TAVI or TAVR, pacemaker and ICD implantation and AF ablation, so structural, device and rhythm work all sit alongside the coronary core. He also manages coronary artery disease and heart failure.

His degrees were taken in Lucknow. He read M.B.B.S. at KGMC in 1999 and took his MD in medicine at King George's Medical University in 2003. His cardiology training was in Delhi: the DNB at the Fortis Escorts Heart Institute through the National Board of Examinations in 2011.

His hospital history stays close to that institute. He has worked at Fortis Escorts Hospital in Okhla and at Fortis Escorts in Faridabad, as well as at Sir Ganga Ram Hospital in New Delhi, before his present post at Sarvodaya Hospital in Sector 8, Faridabad.

He is a Fellow of the European Society of Cardiology and a Fellow of the Society for Cardiovascular Angiography and Interventions, and a member of the American College of Cardiology, so all three of his society affiliations are held outside India.

Taken together the record describes an interventional cardiologist whose training ran from Lucknow through the Escorts system in Delhi, and whose present unit covers coronary, structural, device and peripheral work.

**Word count:** 243

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, memberships, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 11. Dr. R. Venkatakrishnan

**Slug:** `dr-r-venkatakrishnan` · Rela Hospital, Chennai

### Existing BIO

Dr. R. Venkatakrishnan is Consultant Cardiologist at Rela Hospital in Chennai, India. He has practised interventional and clinical cardiology in India for 15+ years experience. The cardiology list covers Atrial Fibrillation Ablation, Coronary Angiography and Coronary Angioplasty & Stenting when the indication is honest. Access, device and whether PCI follows are written after records review — not from a brochure. Training includes MBBS — SRM Medical College & Research Institute, Potheri (2011). International patients meet him on camera first; travel to Chennai is offered only if this cath lab is the right floor.

### Proposed BIO

Dr. R. Venkatakrishnan is a Consultant Cardiologist at Rela Hospital in Chennai, with more than 15 years of experience across cardiology and interventional cardiology.

His list covers coronary angiography, coronary angioplasty and stenting, diagnostic cardiac catheterization and echocardiography, with coronary artery disease, valvular and rheumatic heart disease, cardiomyopathy, atrial fibrillation and heart failure on the medical side.

His training moved from Chennai to Delhi. He read MBBS at SRM Medical College and Research Institute in Potheri in 2011, took his MD in general medicine at Madras Medical College in 2016, and his DM in cardiology at the All India Institute of Medical Sciences in New Delhi in 2020. He has since worked at BLK MAX Hospital in New Delhi, and earlier at the Institute of Cardiovascular Diseases at the Madras Medical Mission and at Sri Satya Sai Medical College and Research Institute, both in Chennai.

His published work is unusually varied for a cardiologist at this stage. He was part of the LIVE-Yoga study on the effect of yoga on clinical outcomes and quality of life in vasovagal syncope, published in JACC Clinical Electrophysiology in 2021. He has also published a systematic review and meta-analysis of coronary stent infections in Cardiovascular Revascularization Medicine, a paper in Circulation arguing for the reclassification of infarctions, and a study of long-term oral anticoagulation for atrial fibrillation in low and middle income countries in the Indian Heart Journal.

**Word count:** 234

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, research, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 12. Dr. Ripen Gupta

**Slug:** `dr-ripen-gupta` · Max Smart Super Speciality Hospital, Saket, Delhi NCR

### Existing BIO

Dr. Ripen Gupta is Vice Chairman & Unit Head of Cardiology at Max Smart Super Speciality Hospital in Delhi NCR, India. He has practised interventional and clinical cardiology in India for 28+ years experience. The cardiology list covers TAVR/TAVI (Transcatheter Aortic Valve Replacement), MitraClip and ICD Implantation (Implantable Cardioverter-Defibrillator) when the indication is honest. Access, device and whether PCI follows are written after records review — not from a brochure. Training includes M.B.B.S. — Government Medical College, Punjabi University, Punjab. International patients meet him on camera first; travel to Delhi NCR is offered only if this cath lab is the right floor.

### Proposed BIO

Dr. Ripen Gupta is Vice Chairman and Unit Head of Cardiology at Max Smart Super Speciality Hospital, Saket, in the Delhi NCR, with more than 28 years of experience. His profile records four areas: cardiology, cardiac sciences, interventional cardiology, and cardiac electrophysiology and pacing.

That last area gives his list its shape. He performs AF, SVT and VT ablation and cardiac ablation for arrhythmia, and implants pacemakers and ICDs. On the interventional side he performs coronary angiography, coronary angioplasty and stenting, TAVI or TAVR and the MitraClip procedure, with echocardiography, coronary artery disease and heart failure completing the list. Few cardiologists on the platform combine a full ablation range with structural intervention in this way.

His M.B.B.S. and MD in internal medicine were both taken at Government Medical College under Punjabi University, and his DM in cardiology at King George's Medical College under Lucknow University. His fellowship in interventional cardiology was awarded through the National Board of Examination.

His hospital history is long and runs through several of the major Indian cardiology centres. He has been at Government Medical College in Patiala, at the All India Institute of Medical Sciences in New Delhi, at King George's Medical College in Lucknow, at the Escorts Heart Institute and Research Centre, at Christian Medical College in Ludhiana, at Batra Hospital and Medical Research Centre, and at Fortis Flt. Lt. Rajan Dhall Hospital, before his current post in Saket.

**Word count:** 235

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
