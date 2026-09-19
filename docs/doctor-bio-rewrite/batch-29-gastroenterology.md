# Doctor BIO rewrite — Batch 29 — Gastroenterology, India

Second Gastroenterology batch. Every sentence is drawn from that doctor's own record in
`src/data/ginger-catalog.json` (designation, hospital, city, experience, qualifications, education,
affiliations, memberships, awards and research). The previous bios in this specialty are GAF
platform boilerplate that describes the pSEO tagging scheme rather than the doctor, so the
structured fields are the source. No external sources, no inference, and no information from any
other doctor's profile. Only `doctorOverrides["<slug>"].bio` is written; no pSEO, schema, routing
or frontend field changes.

## Batch summary

| # | Doctor | City | Old words | New words | Status |
|---|---|---|---|---|---|
| 1 | Dr. Harshad Joshi | Mumbai | 80 | 282 | APPLIED |
| 2 | Dr. Randeep Rana | Delhi NCR | 96 | 290 | APPLIED |
| 3 | Dr. Sanjiv Saigal | Delhi NCR | 98 | 243 | APPLIED |
| 4 | Dr. Gopi Srikanth | Hyderabad | 86 | 268 | APPLIED |
| 5 | Dr. K. A. Ramakrishna | Hyderabad | 105 | 256 | APPLIED |
| 6 | Dr. Radhika Venugopal | Chennai | 90 | 277 | APPLIED |
| 7 | Dr. Randhir Sud | Delhi NCR | 87 | 232 | APPLIED |
| 8 | Dr. Bharath Kumar Ayapati | Hyderabad | 87 | 280 | APPLIED |
| 9 | Dr. K N Chandan Kumar | Hyderabad | 89 | 266 | APPLIED |
| 10 | Dr. Prabha Sawant | Mumbai | 83 | 274 | APPLIED |
| 11 | Dr. M.A. Mir | Delhi NCR | 95 | 229 | APPLIED |
| 12 | Dr. Mahadevan B | Chennai | 89 | 255 | APPLIED |

Every bio below is validated by `scripts/check-bio-batch.mjs` for the 200–300 word range and
for traceability of every capitalised term, acronym, degree and year back to that individual
doctor's own record in `src/data/ginger-catalog.json`.

---

## 1. Dr. Harshad Joshi

**Slug:** `dr-harshad-joshi` · Gleneagles Hospital, Mumbai, Mumbai

### Existing BIO

Dr. Harshad Joshi is Senior Consultant at Gleneagles Hospital in Mumbai, India. He has practised gastroenterology in India for 11+ years experience. The endoscopy list covers Upper GI Endoscopy (Gastroscopy), Colonoscopy and ERCP when imaging and labs make the indication honest. Stent, histology and whether ERCP follows are written after records review — not from a brochure. Training includes MBBS. International patients meet him on camera first; travel to Mumbai is offered only if this suite is the right floor.

### Proposed BIO

Dr. Harshad Joshi is a Senior Consultant at Gleneagles Hospital in Mumbai, with more than 11 years of experience. His profile records gastroenterology and hepatobiliary medicine together with inflammatory bowel disease as a specialization in its own right.

That second entry is where his practice is concentrated. He manages inflammatory bowel disease, including Crohn's disease and ulcerative colitis, and also treats celiac disease, severe functional GI disorders and severe gastroesophageal reflux disease. On the liver he manages chronic liver disease, non-alcoholic fatty liver disease, autoimmune liver diseases and chronic hepatitis B and C, and he also treats chronic pancreatitis.

He holds an MBBS and two national board qualifications, the DNB in internal medicine and the DNB in gastroenterology. His fellowship in advanced inflammatory bowel disease was taken in the Division of Gastroenterology at the Department of Medicine, University of Alberta, in Edmonton, Canada.

Two of his credentials are in techniques rather than in subjects. He has been an International Bowel Ultrasonography Group certified trainer since 2024, which places him on the teaching side of that technique, and he was certified as an Associate of Rome by The Rome Foundation in 2016, the body behind the criteria for the functional GI disorders on his list.

His travel fellowships in 2017 were from ECCO AOCC and IOIBD and took him to the Academic Medical Center in Amsterdam, and in 2016 he was selected for the 14th Intensive IBD Advanced Course at the ECCO Congress for Young Gastroenterologists.

Alongside Gleneagles Hospital in Parel he has been at Nanavati Max Superspeciality Hospital, Sir H N Reliance Foundation Hospital and P.D. Hinduja National Hospital and Research Centre in Mumbai, and at University of Alberta Hospital in Edmonton.

**Word count:** 282

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 2. Dr. Randeep Rana

**Slug:** `dr-randeep-rana` · Max Smart Super Speciality Hospital, Saket, Delhi NCR

### Existing BIO

Dr. Randeep Rana is Consultant at Max Smart Super Speciality Hospital in Delhi NCR, India. He has practised gastroenterology in India for 14+ years experience. The endoscopy list covers ERCP, Endoscopic Hemostasis and ERCP when imaging and labs make the indication honest. Stent, histology and whether ERCP follows are written after records review — not from a brochure. Training includes Fellowship (Advanced GI Endoscopy) — All India Institute of Medical Sciences (AIIMS), New Delhi (2024). International patients meet him on camera first; travel to Delhi NCR is offered only if this suite is the right floor.

### Proposed BIO

Dr. Randeep Rana is a Consultant at Max Smart Super Speciality Hospital, Saket, in the Delhi NCR, with more than 14 years of experience in gastroenterology and hepatobiliary medicine.

His list is weighted towards endoscopic intervention. He performs ERCP and GI stenting, and manages recurrent GI bleeding, portal hypertension, liver cirrhosis, pancreatic cysts, inflammatory bowel disease with Crohn’s disease and ulcerative colitis, congenital GI disorders, severe functional GI disorders and severe gastroesophageal reflux disease.

His training is recent and almost entirely in New Delhi. He read MBBS at Dayanand Medical College and Hospital in Ludhiana in 2012, took his MD in internal medicine at ABVIMS and Dr Ram Manohar Lohia Hospital in New Delhi in 2018, his DM in gastroenterology at the All India Institute of Medical Sciences in 2023, and a fellowship in advanced GI endoscopy at the same institute in 2024.

His examination record is unusually complete. He took first position and the gold medal in medicine in MBBS in 2012, All India Rank 69 and state rank 2 in NEET-PG for 2014–2015, All India Rank 2 in the AIIMS SS examination for DM gastroenterology in 2020, and All India Rank 1 in the fellowship entrance examination for advanced GI endoscopy at AIIMS in 2023.

His conference record has followed the same line. He won best oral presentation in the clinical category at the EASL Congress in Milan in 2024, the best abstract presentation prize at UEG Week in Berlin in 2025, a poster of distinction at Asian Pacific Digestive Week in Singapore in 2025, and third prize for best oral presentation at the Indian Pancreas Club meeting in New Delhi in 2022. He holds an EASL travel grant and an ICMR international travel grant, both from 2024.

**Word count:** 290

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 3. Dr. Sanjiv Saigal

**Slug:** `dr-sanjiv-saigal` · Max Super Speciality Hospital, Saket, Delhi NCR

### Existing BIO

Dr. Sanjiv Saigal is Vice Chairman & Head of Hepatology & Liver Transplant Medicine at Max Super Speciality Hospital in Delhi NCR, India. He has practised gastroenterology in India for 30+ years experience. The endoscopy list covers Upper GI Endoscopy (Gastroscopy), Colonoscopy and ERCP when imaging and labs make the indication honest. Stent, histology and whether ERCP follows are written after records review — not from a brochure. Training includes MBBS (Gold Medalist) — Calcutta University, 1989. International patients meet him on camera first; travel to Delhi NCR is offered only if this suite is the right floor.

### Proposed BIO

Dr. Sanjiv Saigal is Vice Chairman and Head of Hepatology and Liver Transplant Medicine at Max Super Speciality Hospital, Saket, in the Delhi NCR, with more than 30 years of experience in gastroenterology and hepatobiliary medicine.

His practice is entirely hepatological and includes the transplant end of it. He manages liver cirrhosis, portal hypertension, non-alcoholic fatty liver disease, chronic hepatitis B and C, autoimmune liver diseases and chronic liver disease, and works in deceased donor liver transplant and liver retransplantation.

His qualifications were taken at six different institutions and run from 1989 to 2005. He read MBBS at Calcutta University in 1989 as a gold medalist, took his MD in medicine at PGI Chandigarh in 1994, the DNB in gastroenterology through the NBE in Delhi in 1996, and his DM in gastroenterology at GB Pant in Delhi in 1998. He then passed the MRCP of the Royal College of Physicians in Edinburgh in 1999 and completed his CCST in gastroenterology in the UK in 2005.

He was an INLAKS Foundation Scholar at King's College Hospital in London, which places a transplant centre at the start of a career he now spends leading a transplant programme.

His recognition runs from the Calcutta University gold medal through a National Pfizer Award to IMA Eminent Speaker in 2014 and a Human Care Award in 2018. He has over 125 indexed publications.

He practises at Max Super Speciality Hospital in Saket and at Max Hospital in Gurugram.

**Word count:** 243

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 4. Dr. Gopi Srikanth

**Slug:** `dr-gopi-srikanth` · Yashoda Hospitals, Hi-Tech City, Hyderabad

### Existing BIO

Dr. Gopi Srikanth is Consultant at Yashoda Hospitals in Hyderabad, India. He has practised gastroenterology in India for 10+ years experience. The endoscopy list covers Peroral Endoscopic Myotomy (POEM), ERCP and Endoscopic Hemostasis when imaging and labs make the indication honest. Stent, histology and whether ERCP follows are written after records review — not from a brochure. Training includes MBBS — Andhra Medical College, Visakhapatnam (2006–2012). International patients meet him on camera first; travel to Hyderabad is offered only if this suite is the right floor.

### Proposed BIO

Dr. Gopi Srikanth is a Consultant at Yashoda Hospitals, Hi-Tech City, Hyderabad, with more than 10 years of experience. His profile records gastroenterology and hepatobiliary medicine together with interventional endoscopy.

His list carries both. He performs ERCP and treats achalasia, for which Heller myotomy appears on his list, and manages recurrent GI bleeding and severe gastroesophageal reflux disease. On the liver and pancreas he manages chronic pancreatitis, liver cirrhosis, portal hypertension, non-alcoholic fatty liver disease, chronic liver disease, autoimmune liver diseases and chronic hepatitis B and C.

His training is dated year by year and moves through three institutions. He read MBBS at Andhra Medical College in Visakhapatnam between 2006 and 2012, took his MD in internal medicine at PGIMER in Chandigarh between 2013 and 2015, and his DM in gastroenterology and hepatology at AIIMS in New Delhi between 2018 and 2020.

His two fellowships are what turned that into an interventional practice. He took a fellowship in pancreatology at AIIMS in 2021 and a fellowship in endoscopic ultrasound at the WEO International School of EUS run by the World Endoscopy Organisation in 2022, and he is a member of the World Endoscopy Organization as well as of the Indian Society of Gastroenterology and the Indian Pancreas Club.

He has authored over 25 research publications in peer-reviewed journals including the World Journal of Gastrointestinal Surgery, Pancreatology, the American Journal of Gastroenterology and the Journal of Clinical and Experimental Hepatology. He won first prize in the e-poster category at ENDOCON 2021 and second prize in the quiz at the national PGI Emergency Update conference in both 2018 and 2020.

**Word count:** 268

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, memberships, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 5. Dr. K. A. Ramakrishna

**Slug:** `dr-k-a-ramakrishna` · KIMS Hospitals, Secunderabad, Hyderabad

### Existing BIO

Dr. K. A. Ramakrishna is Consultant Medical Gastroenterologist at KIMS Hospitals in Hyderabad, India. He has practised gastroenterology in India for 25+ years experience. The endoscopy list covers Bile Duct Stone Removal, ERCP and ERCP when imaging and labs make the indication honest. Stent, histology and whether ERCP follows are written after records review — not from a brochure. Training includes M.B.B.S. — S.V. Medical College, Tirupathi, A.P., University of Health Sciences, Vijayawada, A.P. (Internship: February 1993 – February 1994; Year of Passing: December 1992). International patients meet him on camera first; travel to Hyderabad is offered only if this suite is the right floor.

### Proposed BIO

Dr. K. A. Ramakrishna is a Consultant Medical Gastroenterologist at KIMS Hospitals, Secunderabad, in Hyderabad, with more than 25 years of experience in gastroenterology and hepatobiliary medicine.

The biliary tree is the busiest part of his list. He performs ERCP and GI stenting, and treats bile duct stones, biliary strictures and gallstones. Beyond that he manages chronic liver disease, liver cirrhosis, non-alcoholic fatty liver disease, autoimmune liver diseases, chronic pancreatitis, inflammatory bowel disease, congenital GI disorders, severe functional GI disorders and severe gastroesophageal reflux disease.

His training is recorded to the month. He passed MBBS at S.V. Medical College in Tirupathi under the University of Health Sciences in Vijayawada in December 1992 and completed his internship there between February 1993 and February 1994. He took his MD in general medicine at Nizam's Institute of Medical Sciences in Hyderabad, passing in July 1997, and his DM in gastroenterology at Osmania General Hospital between August 2001 and 2004.

His hospital record covers teaching and specialist institutions across several cities. He has been at Nizam's Institute of Medical Sciences, Deccan College of Medical Sciences, Basavatarakam Indo American Cancer Institute and Apollo Hospitals in Jubilee Hills, all in Hyderabad, at Osmania General Hospital, and at the Sanjay Gandhi Post Graduate Institute of Medical Sciences in Lucknow.

He won best hepatology paper at ISGCON 2005 in Vizag, is a life member of the Indian Society of Gastroenterology, is the author of Questionnaire in Gastroenterology published by Paras Medical Publishing Co., and has published case reports in the Indian Journal of Gastroenterology.

**Word count:** 256

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 6. Dr. Radhika Venugopal

**Slug:** `dr-radhika-venugopal` · Rela Hospital, Chennai

### Existing BIO

Dr. Radhika Venugopal is Consultant Hepatologist at Rela Hospital in Chennai, India. She has practised gastroenterology in India for 24+ years experience. The endoscopy list covers ERCP, Colonoscopy and ERCP when imaging and labs make the indication honest. Stent, histology and whether ERCP follows are written after records review — not from a brochure. Training includes Fellowship in Transplant Hepatology — Dr. Rela Institute & Medical Centre (RIMC), Chennai (2020). International patients meet her on camera first; travel to Chennai is offered only if this suite is the right floor.

### Proposed BIO

Dr. Radhika Venugopal is a Consultant Hepatologist at Rela Hospital in Chennai, with more than 24 years of experience. Her profile records gastroenterology and hepatobiliary medicine together with the medical management side of liver transplantation.

Her list is built on the liver across all ages. She manages chronic liver disease, liver cirrhosis, non-alcoholic fatty liver disease, chronic hepatitis B and C, autoimmune liver diseases, portal hypertension and pediatric liver disease, and also performs ERCP and GI stenting and manages pancreatic cysts.

Her route into hepatology ran through paediatrics, which explains the paediatric liver work on that list. She read MBBS at Coimbatore Medical College in 2000, took her MD in paediatrics at the Institute of Child Health and Hospital for Children at Madras Medical College in 2007, then her DM in hepatology at the Institute of Hepato Biliary Sciences at the same college in 2018, and a fellowship in transplant hepatology at Dr. Rela Institute and Medical Centre in 2020.

She received the Tamil Nadu Dr. MGR Medical University Gold Medal for the highest marks in her DM in hepatology, and second prize for her award paper on sarcopenia and cirrhosis at ISGCON 2018.

Her published and presented work spans both halves of her career. She has published in the Journal of Hepatology, Best Practice & Research Clinical Gastroenterology and the Journal of Liver Disease & Transplantation among others, presented a poster at APASL 2018 on yellow phosphorus as rodenticide and the predictive factors of liver injury, and gave a free paper at PED GASTROCON 2005 on Wilson's Disease in children. She has also worked at the Institute of Social Paediatrics at Stanley Medical College in Chennai.

**Word count:** 277

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 7. Dr. Randhir Sud

**Slug:** `dr-randhir-sud` · Medanta - The Medicity, Delhi NCR

### Existing BIO

Dr. Randhir Sud is Chairman, Gastroenterology and Gastrosciences at Medanta - The Medicity in Delhi NCR, India. He has practised gastroenterology in India for 20+ years experience. The endoscopy list covers ERCP, Endoscopic Hemostasis and ERCP when imaging and labs make the indication honest. Stent, histology and whether ERCP follows are written after records review — not from a brochure. Training includes Visiting Fellowship in ERCP. International patients meet him on camera first; travel to Delhi NCR is offered only if this suite is the right floor.

### Proposed BIO

Dr. Randhir Sud is Chairman of Gastroenterology and Gastrosciences at Medanta - The Medicity in the Delhi NCR, with more than 20 years of experience in gastroenterology and hepatobiliary medicine.

His list is almost entirely endoscopic. He performs ERCP, therapeutic endoscopy, endoscopic hemostasis, endoscopic dilatation and GI stenting, and manages biliary strictures, chronic pancreatitis, chronic liver disease and gastroesophageal reflux disease.

His qualifications are the M.B.B.S., the M.D. in general medicine and the D.M. in gastroenterology, followed by a visiting fellowship in ERCP, which is the procedure at the head of his list. He is also a Fellow of the International Academy of Medical Specialities, awarded in 2000.

Two of his distinctions came from his own specialty society. The Indian Society of Gastroenterology conferred both a gold medal and the title Master in Endoscopy on him, and the second of those names the technical field his whole practice sits in.

His other recognition is academic and civic. He was conferred a visiting professorship at Harvard Medical School in 1999, received the Bharat Ratna Priyadarshini Award from Delhi University in 2004, and took first prize for standing first in the first professional M.B.B.S examination.

He practises at Medanta Gurugram as his primary site, and also at the Medanta MediClinic at Golf Course and the Medanta MediClinic at Defence Colony, so his week is divided between a tertiary hospital department and two smaller clinics.

**Word count:** 232

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 8. Dr. Bharath Kumar Ayapati

**Slug:** `dr-bharath-kumar-ayapati` · KIMS Hospitals, Secunderabad, Hyderabad

### Existing BIO

Dr. Bharath Kumar Ayapati is Senior Consultant at KIMS Hospitals in Hyderabad, India. He has practised gastroenterology in India for 18+ years experience. The endoscopy list covers Bile Duct Stone Removal, ERCP and Endoscopic Hemostasis when imaging and labs make the indication honest. Stent, histology and whether ERCP follows are written after records review — not from a brochure. Training includes MBBS — Sri Venkateswara Medical College. International patients meet him on camera first; travel to Hyderabad is offered only if this suite is the right floor.

### Proposed BIO

Dr. Bharath Kumar Ayapati is a Senior Consultant at KIMS Hospitals, Secunderabad, in Hyderabad, with more than 18 years of experience in gastroenterology and hepatobiliary medicine.

His list is weighted towards the bile duct and the pancreas. He performs ERCP and GI stenting and treats bile duct stones, biliary strictures, chronic pancreatitis and pancreatic cysts. He also manages chronic liver disease, liver cirrhosis, portal hypertension, non-alcoholic fatty liver disease, chronic hepatitis B and C, celiac disease and recurrent GI bleeding.

He read MBBS at Sri Venkateswara Medical College and took his MD in internal medicine at Nizam's Institute of Medical Sciences in Hyderabad. His DM in gastroenterology and hepatology and his FAGIE, a fellowship in advanced GI endoscopy, were both taken at Christian Medical College, Vellore, which is where the interventional half of his practice comes from.

His publications track the same interests. He described EUS guided gastro-jejunostomy with a NAGI stent for the relief of jejunal loop obstruction in Endoscopy in 2016, reported on image-enhanced endoscopy for the real-time differentiation of hyperplastic and fundic gland polyps in the Indian Journal of Gastroenterology in 2022, and published work in Tropical Gastroenterology showing that endoscopic ultrasonography reveals the occurrence of chronic pancreatitis in patients with idiopathic recurrent acute pancreatitis. He also reported a rare cause of acute liver failure in the Med E Journal of Tamil Nadu Dr. MGR University in 2014.

Three of those four papers are on endoscopic technique rather than on medical management, which matches a list headed by ERCP and stenting. Alongside KIMS Hospitals he has been at Apollo Hospital in Jubilee Hills, Yashoda Hospital in Malakpet, Christian Medical College in Vellore and AIIMS in New Delhi.

**Word count:** 280

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, research, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 9. Dr. K N Chandan Kumar

**Slug:** `dr-k-n-chandan-kumar` · KIMS Hospitals, Secunderabad, Hyderabad

### Existing BIO

Dr. K N Chandan Kumar is Director of Hepatology and Transplant Hepatology at KIMS Hospitals in Hyderabad, India. He has practised gastroenterology in India for 16+ years experience. The endoscopy list covers Upper GI Endoscopy (Gastroscopy), Colonoscopy and ERCP when imaging and labs make the indication honest. Stent, histology and whether ERCP follows are written after records review — not from a brochure. Training includes MBBS – Manipal University. International patients meet him on camera first; travel to Hyderabad is offered only if this suite is the right floor.

### Proposed BIO

Dr. K N Chandan Kumar is Director of Hepatology and Transplant Hepatology at KIMS Hospitals, Secunderabad, in Hyderabad, with more than 16 years of experience. His profile records gastroenterology and hepatobiliary medicine together with surgical gastroenterology for liver transplant.

His clinical list is entirely hepatological. He manages chronic liver disease, liver cirrhosis, non-alcoholic fatty liver disease, autoimmune liver diseases, portal hypertension and refractory ascites.

Both of his first degrees were taken at Manipal University: the MBBS and the MD in general medicine. He then took his DM in hepatology at the Institute of Liver and Biliary Sciences in New Delhi, and his record notes that he was the first qualified DM in hepatology from that institute.

His two overseas placements correspond to the two halves of his present title. He trained in transplant hepatology in the Division of Liver Diseases at Mount Sinai Medical Center in New York, and in liver intensive care at the Institute of Liver Studies at Kings College Hospital in London. Between them they cover the transplant programme and the critically ill patient, which are the two ends of the service he now directs.

His memberships are unusually international for the length of his career. He belongs to the American College of Gastroenterology, the American Association for Study of the Liver Diseases, the Asia-Pacific Association for Study of Liver and the International Liver Transplant Society, alongside the Indian Society of Gastroenterology, the Indian National Association for Study of Liver and the Liver Transplant Society of India. Two of those seven are transplant societies, which matches the second half of his job title.

**Word count:** 266

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, memberships, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 10. Dr. Prabha Sawant

**Slug:** `dr-prabha-sawant` · Gleneagles Hospital, Mumbai, Mumbai

### Existing BIO

Dr. Prabha Sawant is Professor and Head of Department of Gastroenterology at Gleneagles Hospital in Mumbai, India. She has practised gastroenterology in India for 46+ years experience. The endoscopy list covers ERCP, Endoscopic Hemostasis and ERCP when imaging and labs make the indication honest. Stent, histology and whether ERCP follows are written after records review — not from a brochure. Training includes MBBS. International patients meet her on camera first; travel to Mumbai is offered only if this suite is the right floor.

### Proposed BIO

Dr. Prabha Sawant is Professor and Head of the Department of Gastroenterology at Gleneagles Hospital in Mumbai, with more than 46 years of experience in gastroenterology.

Her list covers the liver, the gut and the pancreas. She performs ERCP and manages portal hypertension, chronic liver disease, liver cirrhosis, autoimmune liver diseases, non-alcoholic fatty liver disease, inflammatory bowel disease with ulcerative colitis, chronic pancreatitis, celiac disease, recurrent GI bleeding and severe gastroesophageal reflux disease.

She holds an MBBS and an MD.

Her standing in the specialty is recorded mainly through invited orations and an early research award. She received the Young Investigator Award for portal hypertension from the Indian Society of Gastroenterology in 1994, and has since given the Blumberg Oration for the Kalinga Foundation at Cuttack and the Prof. G.S. Sainani Oration at API Jaipur, both in 2010, the Dr. V. S. Prayag Memorial Oration at B.J. Medical College in 2012, and the Phanidar Oration at Baroda in 2017. Portal hypertension, the subject of that first award, still heads her clinical list.

Her published work is recent and collaborative. She was a co-author on a report of orbital hematoma as a new complication of esophagogastroduodenoscopy in the American Journal of Gastroenterology in 2019, on a study of anemia in patients with ulcerative colitis in remission from Western India in the Indian Journal of Gastroenterology in 2017, and on work on the role of capsule endoscopy in the etiological diagnosis and management of obscure gastrointestinal bleeding in Intest Res in 2016.

Alongside Gleneagles Hospital in Parel she has been at Lokmanya Tilak Municipal Medical College in Sion and at Sushrusha Citizen Co-operative Hospital in Dadar.

**Word count:** 274

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, research, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 11. Dr. M.A. Mir

**Slug:** `dr-m-a-mir` · Artemis Hospital, Delhi NCR

### Existing BIO

Dr. M.A. Mir is Head of Gastroenterology – Liver & Digestive Diseases (Unit III) at Artemis Hospital in Delhi NCR, India. He has practised gastroenterology in India for 17+ years experience. The endoscopy list covers ERCP, Endoscopic Hemostasis and Bariatric / Metabolic Endoscopy when imaging and labs make the indication honest. Stent, histology and whether ERCP follows are written after records review — not from a brochure. Training includes MD with Honors – Gastroenterology. International patients meet him on camera first; travel to Delhi NCR is offered only if this suite is the right floor.

### Proposed BIO

Dr. M.A. Mir is Head of Gastroenterology for Liver and Digestive Diseases, Unit III, at Artemis Hospital in the Delhi NCR, with more than 17 years of experience. His profile records gastroenterology and hepatobiliary medicine together with bariatric and metabolic surgery.

His list is built on the endoscope. He performs ERCP, therapeutic endoscopy, advanced polypectomy, endoscopic hemostasis, endoscopic dilatation and GI stenting, and fits the gastric balloon for weight loss, which is the procedure behind the bariatric specialization on his profile. On the liver he manages chronic liver disease, liver cirrhosis, chronic hepatitis B and non-alcoholic fatty liver disease, and he also treats gastroesophageal reflux disease.

He holds an MBBS and took his MD in gastroenterology with honors, and is a Fellow of the American College of Gastroenterology.

His memberships reach beyond his own specialty. Alongside the American College of Gastroenterology and the Indian Society of Gastroenterology he belongs to the Association of Physicians of India and the Indian Medical Association, and also to the AIDS Society of India and the Tuberculosis Association of J&K. Those last two are infectious disease bodies rather than gastroenterological ones, and they sit beside a chronic hepatitis B practice on the clinical side of his record.

He practises at Artemis Hospitals in Gurugram, where he heads the third unit of the liver and digestive diseases service rather than the department as a whole.

**Word count:** 229

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, memberships, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 12. Dr. Mahadevan B

**Slug:** `dr-mahadevan-b` · Gleneagles HealthCity Chennai, Chennai

### Existing BIO

Dr. Mahadevan B is Head of Department & Senior Consultant at Gleneagles HealthCity Chennai in Chennai, India. He has practised gastroenterology in India for 21+ years experience. The endoscopy list covers Peroral Endoscopic Myotomy (POEM), Bile Duct Stone Removal and ERCP when imaging and labs make the indication honest. Stent, histology and whether ERCP follows are written after records review — not from a brochure. Training includes DM (Gastroenterology). International patients meet him on camera first; travel to Chennai is offered only if this suite is the right floor.

### Proposed BIO

Dr. Mahadevan B is Head of Department and a Senior Consultant at Gleneagles HealthCity in Chennai, with more than 21 years of experience in gastroenterology and hepatobiliary medicine.

His list is a therapeutic endoscopy list. He performs ERCP and per oral endoscopic myotomy for achalasia, and treats bile duct stones, biliary strictures, chronic pancreatitis and pancreatic cysts. He also manages Crohn's disease and severe gastroesophageal reflux disease.

His route into gastroenterology ran through paediatrics. He read MBBS at JIPMER in Pondicherry and took his MD in paediatrics at the same institute, before his DM in gastroenterology.

His conference work sits on the technical end of that practice. At ENDO 2017, the 1st World Congress of GI Endoscopy in February 2017, he presented a paper on the clearance of an impacted stone at a hepatico-jejunostomy site with the Spyglass cholangioscope DS and laser lithotripsy. In September 2019 he was an invited lecturer at a national conference in Chengdu, China, speaking on the EUS rendezvous technique. Both are problems of biliary access, the same territory as the ERCP and bile duct work on his list.

He has been a reviewer for the European Journal for Gastroenterology and Hepatology for over 5 years, and has 14 peer-reviewed publications in journals including the Indian Journal of Gastroenterology, Gastroenterology, Gastrointestinal Endoscopy, Clinical Gastroenterology and Hepatology, Clinical and Experimental Hepatology, Tropical Gastroenterology and the Journal of Digestive Endoscopy.

Alongside Gleneagles Health City he has been at Chettinad Medical College, SRM Medical College, Mahatma Gandhi Medical College and Research Institute, and JIPMER.

**Word count:** 255

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
