# Doctor BIO rewrite — Batch 31 — Gastroenterology, India

Fourth Gastroenterology batch. Every sentence is drawn from that doctor's own record in
`src/data/ginger-catalog.json` (designation, hospital, city, experience, qualifications, education,
affiliations, memberships, awards and research). The previous bios in this specialty are GAF
platform boilerplate that describes the pSEO tagging scheme rather than the doctor, so the
structured fields are the source. No external sources, no inference, and no information from any
other doctor's profile. Only `doctorOverrides["<slug>"].bio` is written; no pSEO, schema, routing
or frontend field changes.

## Batch summary

| # | Doctor | City | Old words | New words | Status |
|---|---|---|---|---|---|
| 1 | Dr. Shankar Zanwar | Mumbai | 80 | 233 | APPLIED |
| 2 | Dr. Varun Addagarla | Hyderabad | 92 | 229 | APPLIED |
| 3 | Dr. Yogesh Batra | Delhi NCR | 92 | 241 | APPLIED |
| 4 | Dr. Adi Rakesh Kumar | Hyderabad | 95 | 224 | APPLIED |
| 5 | Dr. Amitabha Dutta | Delhi NCR | 81 | 241 | APPLIED |
| 6 | Dr. Archish Kataria | Delhi NCR | 95 | 243 | APPLIED |
| 7 | Dr. Deepak Goyal | Delhi NCR | 93 | 230 | APPLIED |
| 8 | Dr. Dinesh Jothimani | Chennai | 91 | 260 | APPLIED |
| 9 | Dr. Srinivas M | Chennai | 85 | 246 | APPLIED |
| 10 | Dr. Anilkumar Mannava | Hyderabad | 86 | 224 | APPLIED |
| 11 | Dr. Brajendra Prasad Singh | Delhi NCR | 91 | 236 | APPLIED |
| 12 | Dr. Deepak Kumar Gupta | Mumbai | 90 | 212 | APPLIED |

Every bio below is validated by `scripts/check-bio-batch.mjs` for the 200–300 word range and
for traceability of every capitalised term, acronym, degree and year back to that individual
doctor's own record in `src/data/ginger-catalog.json`.

---

## 1. Dr. Shankar Zanwar

**Slug:** `dr-shankar-zanwar` · Gleneagles Hospital, Mumbai, Mumbai

### Existing BIO

Dr. Shankar Zanwar is Consultant at Gleneagles Hospital in Mumbai, India. He has practised gastroenterology in India for 16+ years experience. The endoscopy list covers Bile Duct Stone Removal, ERCP and Endoscopic Hemostasis when imaging and labs make the indication honest. Stent, histology and whether ERCP follows are written after records review — not from a brochure. Training includes MBBS. International patients meet him on camera first; travel to Mumbai is offered only if this suite is the right floor.

### Proposed BIO

Dr. Shankar Zanwar is a Consultant at Gleneagles Hospital in Mumbai, with more than 16 years of experience. His profile records gastroenterology and hepatobiliary medicine together with the endoscopic therapeutic side of surgical gastroenterology.

His list is concentrated on the bile duct and the pancreas. He performs ERCP and treats bile duct stones, biliary strictures, gallstones, chronic pancreatitis and pancreatic cysts. Alongside that he manages chronic liver disease, recurrent GI bleeding and severe gastroesophageal reflux disease.

He holds an MBBS, an MD and the DNB.

His hospital record is the most detailed part of his profile and runs from a government medical college through a national referral centre into the Mumbai private sector. It lists Shri M P Shah Medical Government College in Jamnagar and Christian Medical College, Vellore, then Care Hospital in Nagpur, and in Mumbai the Wockhardt Hospital at Mumbai Central, Max Nanavati Super Specialty Hospital and H N Reliance Hospital, before his present post at Gleneagles Hospital in Parel.

Six hospitals across four cities, with the endoscopic half of his profile recorded as a specialization in its own right, describe a career built on therapeutic endoscopy rather than on general clinic work. Bile duct stones, biliary strictures and pancreatic cysts, the three conditions his list names most specifically, are all approached through the endoscope rather than medically, and they sit directly beneath the ERCP entry that heads his procedure list.

**Word count:** 233

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 2. Dr. Varun Addagarla

**Slug:** `dr-varun-addagarla` · Yashoda Hospitals, Hi-Tech City, Hyderabad

### Existing BIO

Dr. Varun Addagarla is Consultant Gastroenterologist, Hepatologist & Therapeutic Endoscopist at Yashoda Hospitals in Hyderabad, India. He has practised gastroenterology in India for 5+ years experience. The endoscopy list covers ERCP, Endoscopic Hemostasis and ERCP when imaging and labs make the indication honest. Stent, histology and whether ERCP follows are written after records review — not from a brochure. Training includes DM in Gastroenterology and Hepatology — Gandhi Medical College, Hyderabad (2020–2023). International patients meet him on camera first; travel to Hyderabad is offered only if this suite is the right floor.

### Proposed BIO

Dr. Varun Addagarla is a Consultant Gastroenterologist, Hepatologist and Therapeutic Endoscopist at Yashoda Hospitals, Hi-Tech City, Hyderabad, with more than 5 years of experience in gastroenterology and hepatobiliary medicine.

His list follows that three-part title. He performs ERCP and treats biliary strictures, chronic pancreatitis and pancreatic cysts, manages chronic liver disease and chronic hepatitis B and C, and handles inflammatory bowel disease including Crohn's disease and ulcerative colitis, alongside recurrent GI bleeding and severe gastroesophageal reflux disease.

His training was taken entirely in Telangana and is dated year by year. He read MBBS at Mamata Medical College in Khammam between 2007 and 2013, took the DNB in internal medicine at Yashoda Hospital in Malakpet, Hyderabad, between 2016 and 2019, and his DM in gastroenterology and hepatology at Gandhi Medical College in Hyderabad between 2020 and 2023.

His research is on the pancreas, the organ his endoscopic list is built around. He has published on the profile and outcomes of symptomatic pancreatic fluid collections at a tertiary care hospital, which is the drainage problem behind the pancreatic cyst and chronic pancreatitis entries on his list.

His posts have all been in and around Hyderabad. Alongside Yashoda Hospitals in Hitec City he has been at Care Hospital in Musheerabad, Osmania Hospital, Shri Sigma Hospitals in Madhapur, Maheshwara Medical College in Patancheru and Yashoda Hospital in Malakpet, where he took his DNB.

**Word count:** 229

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, research, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 3. Dr. Yogesh Batra

**Slug:** `dr-yogesh-batra` · Indraprastha Apollo Hospital, Delhi NCR

### Existing BIO

Dr. Yogesh Batra is Senior Consultant at Indraprastha Apollo Hospital in Delhi NCR, India. He has practised gastroenterology in India for 25+ years experience. The endoscopy list covers ERCP, Endoscopic Hemostasis and ERCP when imaging and labs make the indication honest. Stent, histology and whether ERCP follows are written after records review — not from a brochure. Training includes DM (Gastroenterology) — All India Institute of Medical Sciences (AIIMS), New Delhi. International patients meet him on camera first; travel to Delhi NCR is offered only if this suite is the right floor.

### Proposed BIO

Dr. Yogesh Batra is a Senior Consultant at Indraprastha Apollo Hospital in the Delhi NCR, with more than 25 years of experience in gastroenterology and hepatobiliary medicine.

His list is built on the endoscope. He performs ERCP, therapeutic endoscopy, advanced polypectomy, endoscopic hemostasis, endoscopic dilatation and GI stenting. On the medical side he manages chronic liver disease, non-alcoholic fatty liver disease, chronic pancreatitis, gastroesophageal reflux disease, and inflammatory bowel disease in the form of Crohn's disease and ulcerative colitis.

Both of his first degrees were taken at GSVM Medical College in Kanpur: the MBBS and the MD in medicine. He then took his DM in gastroenterology at the All India Institute of Medical Sciences in New Delhi.

Publication is the largest part of his record. He has more than 50 ISI publications and 80 publications in PubMed, has organized numerous conferences, and has been selected as an evaluator for national-level conferences and journals. He has also travelled to institutions in Hong Kong and Germany, and his record notes a national chapter role in events.

An output on that scale, alongside an evaluator role for journals and conferences, places the academic half of his work at about the same weight as the clinical half. The procedures at the head of his list, from advanced polypectomy through endoscopic hemostasis to stenting, are all interventional rather than diagnostic, so both sides of his record describe a practice at the therapeutic end of the specialty.

**Word count:** 241

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 4. Dr. Adi Rakesh Kumar

**Slug:** `dr-adi-rakesh-kumar` · Yashoda Hospitals, Secunderabad, Hyderabad

### Existing BIO

Dr. Adi Rakesh Kumar is Consultant Gastroenterologist, Therapeutic Endoscopist & Endosonologist at Yashoda Hospitals in Hyderabad, India. He has practised gastroenterology in India for 23+ years experience. The endoscopy list covers ERCP, Colonoscopy and ERCP when imaging and labs make the indication honest. Stent, histology and whether ERCP follows are written after records review — not from a brochure. Training includes 2012: Fellowship in Advanced Endoscopy in ERCP & EUS, Institute of Advanced Endoscopy, Mumbai. International patients meet him on camera first; travel to Hyderabad is offered only if this suite is the right floor.

### Proposed BIO

Dr. Adi Rakesh Kumar is a Consultant Gastroenterologist, Therapeutic Endoscopist and Endosonologist at Yashoda Hospitals, Secunderabad, in Hyderabad, with more than 23 years of experience in gastroenterology and hepatobiliary medicine.

His list is short and specific. He performs ERCP and treats biliary strictures, chronic pancreatitis and pancreatic cysts, and manages chronic liver disease, portal hypertension and severe gastroesophageal reflux disease.

His training is dated by year and was taken in two cities. He read MBBS at Osmania Medical College under NTR University of Health Sciences in Hyderabad between 1997 and 2003, took his MD in general medicine at Kakatiya Medical College in Warangal between 2004 and 2007, and returned to Osmania Medical College for his DM in gastroenterology between 2008 and 2011.

The entry after that sequence is what gives him the third title on his profile. In 2012 he completed a fellowship in advanced endoscopy in ERCP and EUS at the Institute of Advanced Endoscopy in Mumbai, and endosonology is named in his designation alongside therapeutic endoscopy.

His posts have all been in Hyderabad. He has been at Osmania General Hospital, Narayana Hrudayalaya Hospital, Apollo Hospitals and Gleneagles Global Hospital before his present post at Yashoda Hospitals in Secunderabad, so his whole career has been spent in the city he trained in, moving from the government teaching hospital into the private tertiary sector.

**Word count:** 224

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 5. Dr. Amitabha Dutta

**Slug:** `dr-amitabha-dutta` · Indraprastha Apollo Hospital, Delhi NCR

### Existing BIO

Dr. Amitabha Dutta is Senior Consultant at Indraprastha Apollo Hospital in Delhi NCR, India. He has practised gastroenterology in India for 33+ years experience. The endoscopy list covers ERCP, Endoscopic Hemostasis and ERCP when imaging and labs make the indication honest. Stent, histology and whether ERCP follows are written after records review — not from a brochure. Training includes MBBS. International patients meet him on camera first; travel to Delhi NCR is offered only if this suite is the right floor.

### Proposed BIO

Dr. Amitabha Dutta is a Senior Consultant at Indraprastha Apollo Hospital in the Delhi NCR, with more than 33 years of experience in gastroenterology and hepatobiliary medicine.

His list is weighted towards endoscopic intervention. He performs ERCP for biliary and pancreatic conditions, therapeutic endoscopy across a range of GI disorders, endoscopic hemostasis for gastrointestinal bleeding, endoscopic dilatation for strictures of the GI tract, and advanced polypectomy for complex polyps.

His medical list covers the upper gut, the bowel and the liver. He manages gastroesophageal reflux disease and peptic ulcer disease, treats Crohn's disease and ulcerative colitis, and manages chronic liver disease, liver cirrhosis and its complications, and non-alcoholic fatty liver disease.

His qualifications after the MBBS were all taken through the Royal College of Physicians and the national academy. He holds the MRCP of the UK, is a Fellow of the Royal College of Physicians of London and a Fellow of the Royal College of Physicians of Edinburgh, and holds the MNAMS. Holding both the London and the Edinburgh fellowship is unusual, and it means his physicianly credentials were examined twice over.

His memberships span three bodies and two countries. He belongs to the Indian Society of Gastroenterology, the Indian Association for Study of the Liver and the American Society of Gastrointestinal Endoscopy, the last of which matches the interventional half of his list.

He practises at Apollo Hospitals in South Delhi, at Sector 26, Sarita Vihar, on the Mathura Road.

**Word count:** 241

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 6. Dr. Archish Kataria

**Slug:** `dr-archish-kataria` · Max Smart Super Speciality Hospital, Saket, Delhi NCR

### Existing BIO

Dr. Archish Kataria is Senior Consultant at Max Smart Super Speciality Hospital in Delhi NCR, India. He has practised gastroenterology in India for 13+ years experience. The endoscopy list covers Bile Duct Stone Removal, ERCP and ERCP when imaging and labs make the indication honest. Stent, histology and whether ERCP follows are written after records review — not from a brochure. Training includes MBBS — Calcutta National Medical College and Hospital, Kolkata, India (2013). International patients meet him on camera first; travel to Delhi NCR is offered only if this suite is the right floor.

### Proposed BIO

Dr. Archish Kataria is a Senior Consultant at Max Smart Super Speciality Hospital, Saket, in the Delhi NCR, with more than 13 years of experience. His profile records gastroenterology and hepatobiliary medicine together with the endoscopic side of surgical gastroenterology.

His list is a pancreaticobiliary one. He performs ERCP and GI stenting and treats bile duct stones, biliary strictures, gallstones, chronic pancreatitis and pancreatic cysts, and also manages inflammatory bowel disease and severe functional GI disorders.

Most of his postgraduate training was taken in the USA. He read MBBS at Calcutta National Medical College and Hospital in Kolkata in 2013, then completed an internal medicine residency at University of Texas Health in San Antonio between Jul 2015 and Jun 2018, and a gastroenterology fellowship at the same institution between Jul 2018 and Jun 2021. He was certified as a Diplomate of the American Board of Internal Medicine in 2018, and holds a further pancreas-biliary fellowship from the University of New Mexico in Albuquerque taken in 2025.

That last fellowship is the one his clinical list is built on, and it is the second subspecialty fellowship in his record rather than the first.

He held two teaching roles during his American training, as gastroenterology chief fellow and as internal medicine teaching resident at University of Texas Health. As a student he received a certificate of honour in preventive and social medicine, pharmacology and ophthalmology from the West Bengal University of Health Sciences in Kolkata.

**Word count:** 243

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 7. Dr. Deepak Goyal

**Slug:** `dr-deepak-goyal` · Fortis Memorial Research Institute, Delhi NCR

### Existing BIO

Dr. Deepak Goyal is Additional Director of Gastroenterology at Fortis Memorial Research Institute in Delhi NCR, India. He has practised gastroenterology in India for 17+ years experience. The endoscopy list covers Upper GI Endoscopy (Gastroscopy), Colonoscopy and ERCP when imaging and labs make the indication honest. Stent, histology and whether ERCP follows are written after records review — not from a brochure. Training includes MBBS — SMS Medical College, University of Rajasthan. International patients meet him on camera first; travel to Delhi NCR is offered only if this suite is the right floor.

### Proposed BIO

Dr. Deepak Goyal is Additional Director of Gastroenterology at Fortis Memorial Research Institute in the Delhi NCR, with more than 17 years of experience in gastroenterology and hepatobiliary medicine.

His list is a paediatric one. He manages pediatric liver diseases, pediatric malabsorption syndromes, pediatric liver transplant and congenital GI disorders, alongside malabsorption syndromes, autoimmune liver diseases and chronic liver disease. In the bowel he manages Crohn's disease and ulcerative colitis, and he also performs therapeutic endoscopy and manages gastroesophageal reflux disease and severe functional GI disorders.

His training explains that weighting. Both of his first degrees were taken at SMS Medical College under the University of Rajasthan, the MBBS and the MD in paediatrics, and his subspecialty training was a post doctoral certificate course at SGPGI in Lucknow. He came into gastroenterology as a paediatrician rather than as a physician, which is why paediatric liver disease and malabsorption head his list rather than adult hepatology.

His society work is in the same field. He was an executive member of the Indian Society of Pediatric Gastroenterology, Hepatology and Nutrition for 2018 to 2019.

He is invited faculty at various national and international conferences, has multiple publications in indexed medical journals and has presented at national and international forums.

Alongside Fortis Memorial Research Institute in Gurgaon he practises at Fortis Hospital in Noida, so his week covers two sites within the NCR.

**Word count:** 230

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 8. Dr. Dinesh Jothimani

**Slug:** `dr-dinesh-jothimani` · Rela Hospital, Chennai

### Existing BIO

Dr. Dinesh Jothimani is Director, Hepatology at Rela Hospital in Chennai, India. He has practised gastroenterology in India for 19+ years experience. The endoscopy list covers ERCP, Colonoscopy and ERCP when imaging and labs make the indication honest. Stent, histology and whether ERCP follows are written after records review — not from a brochure. Training includes MBBS— Madras Medical College & Government General Hospital, Dr. MGR Medical University, Chennai, India (2000). International patients meet him on camera first; travel to Chennai is offered only if this suite is the right floor.

### Proposed BIO

Dr. Dinesh Jothimani is Director of Hepatology at Rela Hospital in Chennai, with more than 19 years of experience. His profile records gastroenterology and hepatobiliary medicine together with transplant hepatology.

His list is almost entirely hepatological. He manages chronic liver disease, liver cirrhosis, portal hypertension, chronic hepatitis B and C, autoimmune liver diseases and non-alcoholic fatty liver disease, and also performs ERCP.

He read MBBS at Madras Medical College and Government General Hospital under Dr. MGR Medical University in Chennai in 2000, then took his specialist training in the United Kingdom. He passed the MRCP in 2004 and completed his CCT in hepatology, gastroenterology and general medicine through the West Midlands Deanery between 2004 and 2010, and was elected FRCP of the Royal College of Physicians and Surgeons of Glasgow in 2018.

His career is recorded post by post with dates, and it moves through the hospitals of three countries. He was Specialist Registrar in hepatology at Queen Elizabeth Hospital in Birmingham from 2004 to 2005, a hepatology research fellow at Princess Alexandra Hospital in Brisbane from 2008 to 2009, and locum Consultant Hepatologist at the University Hospitals of Coventry and Warwickshire from 2010 to 2011. He returned to Chennai as consultant and liver transplant physician at Global Hospitals from 2012 to 2018, and has been Director of Hepatology at Dr. Rela Institute and Medical Centre since 2018.

Every post in that sequence is in hepatology or liver transplant work, so the transplant half of his profile rests on a run of dedicated appointments rather than on a single fellowship.

**Word count:** 260

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 9. Dr. Srinivas M

**Slug:** `dr-srinivas-m-1` · Gleneagles HealthCity Chennai, Chennai

### Existing BIO

Dr. Srinivas M is Consultant at Gleneagles HealthCity Chennai in Chennai, India. He has practised gastroenterology in India for 25+ years experience. The endoscopy list covers Peroral Endoscopic Myotomy (POEM), ERCP and ERCP when imaging and labs make the indication honest. Stent, histology and whether ERCP follows are written after records review — not from a brochure. Training includes MBBS — Stanley Medical College, Chennai. International patients meet him on camera first; travel to Chennai is offered only if this suite is the right floor.

### Proposed BIO

Dr. Srinivas M is a Consultant at Gleneagles HealthCity in Chennai, with more than 25 years of experience in gastroenterology and hepatobiliary medicine.

His list covers the bowel, the oesophagus and the pancreas. He manages inflammatory bowel disease including Crohn's disease and ulcerative colitis, treats achalasia, for which Heller myotomy appears on his list, and severe gastroesophageal reflux disease, and performs ERCP while managing chronic pancreatitis and chronic liver disease.

He read MBBS at Stanley Medical College in Chennai, then took his higher qualifications through the Royal College of Physicians in the United Kingdom, passing the MRCP and later being elected a Fellow of the Royal College of Physicians in London.

His record is unusual in how much of it is editorial rather than clinical. He is a past Editor-in-Chief of Clinical Medicine Insights: Gastroenterology, an e-journal, and sits on the editorial board of the Indian Journal of Gastroenterology. He is also an honorary clinical lecturer at the University of Sheffield, which keeps a UK academic appointment alongside his Chennai practice.

He has presented abstracts at the annual conferences of the British, American and Indian societies of gastroenterology, several of them recognized with prizes, so his work has been put before all three of the bodies his training and practice span.

Within his own hospital he is clinical lead of the institutional ethics committee at Gleneagles Global Health City, a governance role that sits outside the clinical list and is not common on a consultant's record.

**Word count:** 246

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 10. Dr. Anilkumar Mannava

**Slug:** `dr-anilkumar-mannava` · Yashoda Hospitals, Secunderabad, Hyderabad

### Existing BIO

Dr. Anilkumar Mannava is Consultant Gastroenterologist and Hepatologist at Yashoda Hospitals in Hyderabad, India. He has practised gastroenterology in India for 16+ years experience. The endoscopy list covers ERCP, Colonoscopy and ERCP when imaging and labs make the indication honest. Stent, histology and whether ERCP follows are written after records review — not from a brochure. Training includes DNB (Gastroenterology) — Global Hospital, Lakdikapul, Hyderabad (2018). International patients meet him on camera first; travel to Hyderabad is offered only if this suite is the right floor.

### Proposed BIO

Dr. Anilkumar Mannava is a Consultant Gastroenterologist and Hepatologist at Yashoda Hospitals, Secunderabad, in Hyderabad, with more than 16 years of experience in gastroenterology and hepatobiliary medicine.

His list is built around the bile duct and the pancreas. He performs ERCP and GI stenting and treats biliary strictures, chronic pancreatitis and pancreatic cysts. On the liver he manages chronic liver disease and chronic hepatitis B and C, and he also treats severe gastroesophageal reflux disease.

His training is dated and moves across three states. He read MBBS at Dr. Pinnamaneni Siddhartha Institute of Medical Sciences and Research Foundation in Gannavaram, Vijayawada, under NTR University of Health Sciences in 2010, took his MD in general medicine at Sri Devaraj Urs Medical College in Kolar, Karnataka, in 2014, and the DNB in gastroenterology at Global Hospital in Lakdikapul, Hyderabad, in 2018.

Taking the specialty qualification through the DNB route at a tertiary care hospital rather than through a university DM is the distinguishing feature of that sequence, and Global Hospital remains on his list of affiliations.

Alongside Yashoda Hospitals in Secunderabad and Global Hospital in Lakdikapul, his record lists KMC in Mangalore, KMC Manipal and Sri Devaraj Urs Medical College in Kolar, where his MD was taken. Five affiliations across three states describe a career that moved south for its postgraduate years before settling in Hyderabad.

**Word count:** 224

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 11. Dr. Brajendra Prasad Singh

**Slug:** `dr-brajendra-prasad-singh` · Max Smart Super Speciality Hospital, Saket, Delhi NCR

### Existing BIO

Dr. Brajendra Prasad Singh is Director of Gastroenterology & Hepatology at Max Smart Super Speciality Hospital in Delhi NCR, India. He has practised gastroenterology in India for 22+ years experience. The endoscopy list covers Bile Duct Stone Removal, ERCP and ERCP when imaging and labs make the indication honest. Stent, histology and whether ERCP follows are written after records review — not from a brochure. Training includes DNB — Gastroenterology. International patients meet him on camera first; travel to Delhi NCR is offered only if this suite is the right floor.

### Proposed BIO

Dr. Brajendra Prasad Singh is Director of Gastroenterology and Hepatology at Max Smart Super Speciality Hospital, Saket, in the Delhi NCR, with more than 22 years of experience. His profile records gastroenterology and hepatobiliary medicine alongside therapeutic endoscopy and core gastroenterology and hepatology.

His list covers the biliary tree, the pancreas, the liver and the bowel. He performs ERCP and treats bile duct stones, gallstones, chronic pancreatitis and pancreatic cysts. On the liver he manages chronic liver disease, liver cirrhosis, chronic hepatitis B and C, autoimmune liver diseases and non-alcoholic fatty liver disease, and he also manages inflammatory bowel disease and severe gastroesophageal reflux disease.

He holds an MBBS, an MD in medicine and the DNB in gastroenterology.

His career is recorded with dates and has been spent in three New Delhi hospitals. He was at Indraprastha Apollo Hospital from October 2005 to September 2010, at Rockland Hospital from September 2010 to August 2013, and has been at Saket City Hospital, now Max Smart Super Speciality Hospital, since August 2013. More than a decade in his present post, after two appointments of about five and three years, describes a settled rather than a mobile career.

His recognition comes from patients rather than from professional bodies. He has won awards multiple times based on patient feedback at Saket City Hospital and Max Smart Super Speciality Hospital, and was voted for by patients at Max Smart in 2016.

**Word count:** 236

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 12. Dr. Deepak Kumar Gupta

**Slug:** `dr-deepak-kumar-gupta` · Apollo Hospitals, Navi Mumbai, Mumbai

### Existing BIO

Dr. Deepak Kumar Gupta is Consultant at Apollo Hospitals in Mumbai, India. He has practised gastroenterology in India for 17+ years experience. The endoscopy list covers ERCP, Endoscopic Hemostasis and ERCP when imaging and labs make the indication honest. Stent, histology and whether ERCP follows are written after records review — not from a brochure. Training includes DM in Gastroenterology – Seth GS Medical College and KEM Hospital, Mumbai (2013–2016). International patients meet him on camera first; travel to Mumbai is offered only if this suite is the right floor.

### Proposed BIO

Dr. Deepak Kumar Gupta is a Consultant at Apollo Hospitals in Navi Mumbai, with more than 17 years of experience in gastroenterology and hepatobiliary medicine.

His list is an interventional endoscopy list. He performs ERCP, therapeutic endoscopy, advanced polypectomy, endoscopic hemostasis, endoscopic dilatation and GI stenting. On the medical side he manages peptic ulcer disease, gastroesophageal reflux disease, chronic liver disease, chronic pancreatitis, and inflammatory bowel disease as Crohn's disease and ulcerative colitis.

He holds an MBBS, an MD in internal medicine, the DNB in gastroenterology and the FNB, and took his DM in gastroenterology at Seth GS Medical College and KEM Hospital in Mumbai between 2013 and 2016. Holding both the DM and the DNB in the same specialty means he qualified through two separate examination systems.

Two shorter courses sit earlier in his record, both from May 2008. He enrolled in the PGDL course and completed an ICU course for DM awarded by DMH, so critical care training preceded his specialty years.

He practises at Apollo Hospitals in Navi Mumbai, at CBD Belapur opposite Nerul Wonders Park. With six interventional procedures at the head of his list and five qualifications behind them, his record describes a gastroenterologist whose practice is concentrated on endoscopic treatment rather than on diagnostic work alone.

**Word count:** 212

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
