# Doctor BIO rewrite — Batch 11 — Surgical Oncology, India

Fourth Surgical Oncology batch. Every sentence is drawn from that doctor's own record in
`src/data/ginger-catalog.json` (designation, hospital, city, experience, qualifications, education,
affiliations, memberships, awards and research). The previous bios in this specialty are GAF
platform boilerplate and carry no doctor-specific facts, so the structured fields are the source.
No external sources, no inference, and no information from any other doctor's profile.
Only `doctorOverrides["<slug>"].bio` is written; no pSEO, schema, routing or frontend field changes.

One doctor is flagged rather than rewritten: his education field is seven bare qualification
abbreviations with no institution, date or place attached to any of them.

## Batch summary

| # | Doctor | City | Old words | New words | Status |
|---|---|---|---|---|---|
| 1 | Dr. Manish Jain | Delhi NCR | 72 | 229 | APPLIED |
| 2 | Dr. Manjunath Bale | Hyderabad | 92 | 221 | APPLIED |
| 3 | Dr. Mohan Venkatesh Pulle | Delhi NCR | 76 | 202 | APPLIED |
| 4 | Dr. P. Saravanan | Chennai | 78 | 221 | APPLIED |
| 5 | Dr. Saraansh Bansal | Delhi NCR | 77 | 202 | APPLIED |
| 6 | Dr. Sivaram Ganesamoni | Chennai | 79 | 220 | APPLIED |
| 7 | Dr. Vivek Venkatramani | Mumbai | 71 | 220 | APPLIED |
| 8 | Dr. Deepak Sarin | Delhi NCR | 78 | 209 | APPLIED |
| 9 | Dr. Keshavarajan G | Chennai | 78 | 230 | APPLIED |
| 10 | Dr. Parveen Yadav | Delhi NCR | 81 | 214 | APPLIED |
| 11 | Dr. Phanendra Kumar Gubbala | Chennai | 73 | 223 | APPLIED |
| 12 | Dr. S. Srivishnu | Chennai | 72 | 208 | APPLIED |
| 13 | Dr. Akshay Tiwari | Delhi NCR | 77 | 203 | APPLIED |
| 14 | Dr. Arvind Kumar | Delhi NCR | 75 | — | **FLAGGED — INSUFFICIENT SOURCE INFORMATION** |

Every bio below is validated by `scripts/check-bio-batch.mjs` for the 200–300 word range and
for traceability of every capitalised term, acronym, degree and year back to that individual
doctor's own record in `src/data/ginger-catalog.json`.

---

## 1. Dr. Manish Jain

**Slug:** `dr-manish-jain-1` · BLK-Max Super Speciality Hospital, Delhi NCR

### Existing BIO

Dr. Manish Jain is Director & Unit Head of Gastrointestinal Oncosurgery at BLK-Max Super Speciality Hospital in Delhi NCR. He has practised for 20+ years experience. The operating list includes Esophagectomy and Gastrectomy; Rectal Cancer Surgery stays on the table when the indication is honest. Peer review happens before anyone books a flight. Training includes MBBS. Travelling patients meet him on camera first; a date is offered only after the records hold.

### Proposed BIO

Dr. Manish Jain is Director and Unit Head of Gastrointestinal Oncosurgery at BLK-Max Super Speciality Hospital in the Delhi NCR, with more than 20 years of experience. He works across surgical oncology and surgical gastroenterology, and his practice is defined by an organ system rather than by a single tumour type.

His operating list runs the length of the digestive tract: esophageal and gastric cancer surgery, small intestine and colorectal cancer surgery, and the hepatopancreatobiliary group of pancreatic, gallbladder and bile duct cancer surgery, together with liver cancer. Where disease has seeded the peritoneal cavity he performs cytoreductive surgery with hyperthermic intraperitoneal chemotherapy, and he is a certified PIPAC surgeon.

He qualified MBBS, took an MS in General Surgery and completed a DrNB in Surgical Gastroenterology. He is a certified robotic surgeon and a proctor for Intuitive on the Da Vinci X and Xi systems, which means he trains other consultants on the platform as well as operating on it.

His career has passed through several of the major surgical and cancer units in Delhi. He has worked at Rajiv Gandhi Cancer Institute and Research Centre, at Max Super Speciality Hospital in Saket, at Action Cancer Hospital and Sri Balaji Action Medical Institute, at Guru Teg Bahadur Hospital with the University College of Medical Sciences, and at GB Pant Hospital, before his present post at BLK-Max in New Delhi.

**Word count:** 229

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 2. Dr. Manjunath Bale

**Slug:** `dr-manjunath-bale` · Yashoda Hospitals, Hi-Tech City, Hyderabad

### Existing BIO

Dr. Manjunath Bale is Consultant Robotic and Minimally Invasive Thoracic Surgeon and Lung Transplant Surgeon at Yashoda Hospitals in Hyderabad. He has practised for 17+ years experience. The operating list includes Lung Cancer Surgery and reconstruction when the defect needs it; a second look in theatre stays on the table when the indication is honest. Peer review happens before anyone books a flight. Training includes MCh — All India Institute of Medical Sciences (AIIMS), New Delhi. Travelling patients meet him on camera first; a date is offered only after the records hold.

### Proposed BIO

Dr. Manjunath Bale is Consultant Robotic and Minimally Invasive Thoracic Surgeon and Lung Transplant Surgeon at Yashoda Hospitals, Hi-Tech City, Hyderabad, with more than 17 years of experience. He has also worked at Apollo Health City in Jubilee Hills, Hyderabad.

His surgical practice is confined to the chest. He operates on lung cancer, on chest wall and mediastinal tumours, and on pleural mesothelioma, and his title carries a lung transplant remit alongside the cancer work.

He qualified MBBS from S Nijalingappa Medical College, Bagalkot, between 2004 and 2009, then spent four years at the All India Institute of Medical Sciences in New Delhi for his MS in General Surgery, from 2010 to 2014. His MCh was also taken at AIIMS.

The rest of his training reads as a deliberate accumulation of technique for operating through small incisions. He completed basic laparoscopy training at AIIMS in 2013 and basic VATS training with Ethicon in New Delhi the same year, and holds Advanced Trauma Life Support from JPNATC at AIIMS, certified in 2013. In 2019 he completed an MIS fellowship in minimal access surgery at AIIMS. That same year he travelled twice to China as a clinical observer: to the Uniportal VATS Training Programme at Shanghai Pulmonary Hospital, and to the Uniportal VATS Complex Lung Resections Masterclass at Yunnan Cancer Hospital in Kunming.

**Word count:** 221

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 3. Dr. Mohan Venkatesh Pulle

**Slug:** `dr-mohan-venkatesh-pulle` · Medanta - The Medicity, Delhi NCR

### Existing BIO

Dr. Mohan Venkatesh Pulle is Consultant, Lung Transplant and Chest Surgery at Medanta - The Medicity in Delhi NCR. He has practised for 13+ years experience. The operating list includes Esophagectomy and Lung Cancer Surgery; a second look in theatre stays on the table when the indication is honest. Peer review happens before anyone books a flight. Training includes MBBS. Travelling patients meet him on camera first; a date is offered only after the records hold.

### Proposed BIO

Dr. Mohan Venkatesh Pulle is Consultant in Lung Transplant and Chest Surgery at Medanta – The Medicity, Gurugram, in the Delhi NCR, with more than 13 years of experience.

His surgical work is entirely thoracic. He operates on lung cancer and esophageal cancer, on mediastinal and chest wall tumours, and on pleural mesothelioma, and the transplant side of his title sits alongside that cancer practice.

His training was taken through the National Board of Examinations. After qualifying MBBS he completed a DNB in General Surgery and then a DNB in Thoracic Surgery, finishing as a gold medalist in both. The Board awarded him the President's Gold Medal in General Surgery and, separately, the President's Gold Medal in Thoracic Surgery — the same distinction twice, at two different stages of his training. He subsequently completed a clinical observership in thoracic oncology at Tata Memorial Hospital in Mumbai.

The Association of Surgeons of India gave him the Torrent's Young Scholar Award in 2015. He has been a leading contributor to the Minimally Invasive Chest Surgery Programme in India, and is lead author of numerous original articles in reputed national and international journals. He is a member of various national and international thoracic surgical societies.

**Word count:** 202

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 4. Dr. P. Saravanan

**Slug:** `dr-p-saravanan` · Rela Hospital, Chennai

### Existing BIO

Dr. P. Saravanan is Visiting Consultant – Surgical Oncologist at Rela Hospital in Chennai. He has practised for 30+ years experience. The operating list includes Esophagectomy and Gastrectomy; Thyroidectomy for Thyroid Cancer stays on the table when the indication is honest. Peer review happens before anyone books a flight. Training includes M.Ch (Surgical Oncology) – Govt Kilpauk Medical College, Chennai, August 2010. Travelling patients meet him on camera first; a date is offered only after the records hold.

### Proposed BIO

Dr. P. Saravanan is Visiting Consultant and Surgical Oncologist at Rela Hospital, Chennai, with more than 30 years of experience.

His operating practice is divided between the head and neck and the upper gastrointestinal tract. He performs oral cancer surgery, thyroid cancer surgery and head and neck tumour surgery with neck dissection, and also operates on gastric and esophageal cancer.

He qualified MBBS from Madurai Medical College in 1996. His postgraduate path ran through the National Board of Examinations, which awarded him a DNB in General Surgery in 2004, and the Royal College of Surgeons of Edinburgh, which elected him to MRCS in general surgery in 2005. He completed his M.Ch in Surgical Oncology at Govt Kilpauk Medical College, Chennai, in 2010, and placed first in the final examination for that degree.

His clinical career has been spent almost entirely in Chennai. He has worked in the department of surgical oncology at Global Health City, at Govt Royapettah Hospital and Govt Kilpauk Medical College, at Sri Kanchi Kamakoti Hospital in Perumbakkam and at Southern Railway Headquarters Hospital in Perumbur, before his present appointment at Rela Hospital.

His research interest extends into musculoskeletal oncology. An oral paper on pelvic resections in musculoskeletal tumors of the bony pelvis won the Best Paper Award at the Surgical Oncology Conference held at Calcutta in 2009.

**Word count:** 221

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 5. Dr. Saraansh Bansal

**Slug:** `dr-saraansh-bansal` · BLK-Max Super Speciality Hospital, Delhi NCR

### Existing BIO

Dr. Saraansh Bansal is Consultant, Thoracic Surgery and Minimally Invasive Thoracic Surgery at BLK-Max Super Speciality Hospital in Delhi NCR. He has practised for 10+ years experience. The operating list includes Esophagectomy and Lung Cancer Surgery; a second look in theatre stays on the table when the indication is honest. Peer review happens before anyone books a flight. Training includes MBBS. Travelling patients meet him on camera first; a date is offered only after the records hold.

### Proposed BIO

Dr. Saraansh Bansal is Consultant in Thoracic Surgery and Minimally Invasive Thoracic Surgery at BLK-Max Super Speciality Hospital in the Delhi NCR, with more than 10 years of experience.

His operating practice covers lung cancer surgery and esophageal cancer surgery, mediastinal tumour surgery and chest wall tumour surgery, and surgery for pleural mesothelioma. His profile also records interventional bronchoscopy within pulmonology, which places the airway procedures used to diagnose and relieve chest disease inside the same practice as the resections.

He qualified MBBS, took an MS in General Surgery and completed an MCh in Thoracic Surgery. His later training was directed at operating through smaller incisions. He holds robotic thoracic surgery training and uniportal VATS training, and is a Fellow of the Minimal Access Surgeons of India, the qualification recorded against his name as FMAS. He has also held international clinical fellow posts in Singapore, Thailand and Portugal.

His appointments in New Delhi have covered both the respiratory and the oncological sides of chest surgery. He has worked at the National Institute of Tuberculosis and Respiratory Diseases, at the National Cancer Institute and National University Hospital, and at Dr. RML Hospital. He now practises at BLK-Max Super Speciality Hospital in New Delhi.

**Word count:** 202

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 6. Dr. Sivaram Ganesamoni

**Slug:** `dr-sivaram-ganesamoni` · MGM Healthcare, Chennai, Chennai

### Existing BIO

Dr. Sivaram Ganesamoni is Senior Surgical Oncologist and Head of Department at MGM Healthcare in Chennai. He has practised for 24+ years experience. The operating list includes Oncoplastic Breast Surgery and Breast-Conserving Surgery (Lumpectomy); Mastectomy stays on the table when the indication is honest. Peer review happens before anyone books a flight. Training includes MBBS — Madurai Medical College, Madurai, Tamil Nadu (2002). Travelling patients meet him on camera first; a date is offered only after the records hold.

### Proposed BIO

Dr. Sivaram Ganesamoni is Senior Surgical Oncologist and Head of Department at MGM Healthcare, Chennai, with more than 24 years of experience.

Breast and gastrointestinal cancer surgery account for most of his work. On the breast he performs mastectomy, breast conserving surgery and oncoplastic breast surgery, so the choice between removing the breast and reshaping it around the tumour is one he can offer either way. In the abdomen he operates on gastric, colorectal and rectal cancer, and on ovarian and endometrial cancer. For disease that has spread across the peritoneal surfaces he performs cytoreductive surgery with HIPEC.

His training took him through five qualifying institutions in eleven years. He qualified MBBS from Madurai Medical College in Tamil Nadu in 2002 and completed his MS in General Surgery at JIPMER, Puducherry, in 2008. The Royal College of Surgeons of Edinburgh admitted him to MRCS in 2009, and the National Board of Examinations in New Delhi awarded him a DNB in General Surgery in 2010. His super-specialty training followed at the Cancer Institute (WIA) in Chennai, where he took his MCh in Surgical Oncology in 2013.

He is a member of five professional bodies: the Indian Medical Association, the Association of Surgeons of India, the Indian Association of Surgical Oncology, the Indian Society of Oncology and the Society of Surgical Oncology.

**Word count:** 220

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, memberships, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 7. Dr. Vivek Venkatramani

**Slug:** `dr-vivek-venkatramani` · Apollo Hospitals, Navi Mumbai, Mumbai

### Existing BIO

Dr. Vivek Venkatramani is Visiting Consultant Uro-Oncologist and Robotic Surgeon at Apollo Hospitals in Mumbai. He has practised for 16+ years experience. The operating list includes Radical Prostatectomy and Partial Nephrectomy; Radical Cystectomy stays on the table when the indication is honest. Peer review happens before anyone books a flight. Training includes M.Ch. in Urology. Travelling patients meet him on camera first; a date is offered only after the records hold.

### Proposed BIO

Dr. Vivek Venkatramani is Visiting Consultant Uro-Oncologist and Robotic Surgeon at Apollo Hospitals, Navi Mumbai, with more than 16 years of experience.

He operates on the urological cancers: radical prostatectomy and other prostate cancer surgery, radical cystectomy and bladder cancer surgery, kidney cancer surgery and testicular cancer surgery.

He holds an M.S. in General Surgery and an M.Ch. in Urology, and completed a fellowship in urologic oncology in Miami.

His published work is concentrated on diagnosis and technique. In Urology in 2017 he re-examined prostate-specific antigen density, defining the optimal PSA range and the patients for whom PSA density predicts prostate cancer on extended template biopsy. In the Journal of Urology in 2014 he reported a single centre, parallel arm, randomized controlled trial comparing monopolar with bipolar transurethral resection of bladder tumors. He wrote an editorial comment in the same journal in 2016 on reoperations following robot-assisted radical cystectomy, and contributed Urovision 2020, a piece on the future of urology, in 2015.

His academic record began early. At the final M.B.B.S examination he secured distinctions in Paediatrics and Obstetrics and Gynaecology and ranked first in his college in Paediatrics. In 2004 he won the undergraduate open quiz at the 31st annual conference of the Research Society of B.J. Medical College, and took the Best Poster Award at the same meeting.

**Word count:** 220

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, research, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 8. Dr. Deepak Sarin

**Slug:** `dr-deepak-sarin` · Medanta - The Medicity, Delhi NCR

### Existing BIO

Dr. Deepak Sarin is Chairman at Medanta - The Medicity in Delhi NCR. He has practised for 32+ years experience. The operating list includes Sentinel Lymph Node Biopsy and Thyroidectomy for Thyroid Cancer; Neck Dissection stays on the table when the indication is honest. Peer review happens before anyone books a flight. Training includes Fellowship — Head and Neck Oncology, D.N.B. (Otorhinolaryngology). Travelling patients meet him on camera first; a date is offered only after the records hold.

### Proposed BIO

Dr. Deepak Sarin is Chairman at Medanta – The Medicity, Gurugram, in the Delhi NCR, with more than 32 years of experience in surgical oncology.

His practice is in the head and neck. He performs oral cancer surgery, laryngeal, hypopharyngeal and oropharyngeal cancer surgery, thyroid cancer surgery including thyroidectomy, and parathyroidectomy. Composite resection is on his list for tumours that cross tissue planes and require more than one structure to be taken together. His approach to the neck is graded rather than uniform: selective neck dissection and sentinel lymph node biopsy where the nodes permit it, wider neck dissection where they do not.

He came to oncology from ear, nose and throat surgery. He qualified M.B.B.S., took an M.S. in Otolaryngology with a gold medal, and holds a D.N.B. in Otorhinolaryngology together with a fellowship in head and neck oncology. He then trained in the United States as a clinical fellow in head and neck ablative surgery at the Sylvester Comprehensive Cancer Center, University of Miami.

Before Medanta he was at Artemis Health Institute and at Sir Ganga Ram Hospital in New Delhi.

His awards include the Chandler Society Award in 2005, the Mukut Saharia Award, and the Kamani Charity Book Prize, which accompanied his gold medal in M.S.

**Word count:** 209

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 9. Dr. Keshavarajan G

**Slug:** `dr-keshavarajan-g` · Rela Hospital, Chennai

### Existing BIO

Dr. Keshavarajan G is Consultant at Rela Hospital in Chennai. He has practised for 17+ years experience. The operating list includes PIPAC and reconstruction when the defect needs it; a second look in theatre stays on the table when the indication is honest. Peer review happens before anyone books a flight. Training includes MCh, Surgical Oncology — Regional Cancer Centre, Thiruvananthapuram (2019). Travelling patients meet him on camera first; a date is offered only after the records hold.

### Proposed BIO

Dr. Keshavarajan G is a Consultant at Rela Hospital, Chennai, attached to its cancer centre. He has practised for more than 17 years, and his profile records two areas of work: surgical oncology and general surgery.

His education runs from Mysore to Chennai by way of Thiruvananthapuram. He completed pre-university studies at Sri Ramakrishna Vidyashala in Mysore in 2003 and qualified MBBS from JSS Medical College in the same city in 2009. His MS in General Surgery was taken at Madras Medical College, Chennai, in 2013. He then moved to the Regional Cancer Centre, Thiruvananthapuram, for his MCh in Surgical Oncology, completed in 2019, the super-specialty qualification that defines his present practice.

He is a certified PIPAC surgeon. Pressurized intraperitoneal aerosol chemotherapy delivers chemotherapy into the abdominal cavity, and the certification sits on his profile alongside his degrees.

His professional memberships map onto the technical side of his training. He belongs to the Indian Association of Surgical Oncology and the Association of Surgeons of India, and to two bodies concerned with how operations are performed rather than with what they treat: the Association of Minimal Access Surgeons of India and the Clinical Robotic Surgery Association.

Taken together, the record describes a surgeon who trained in general surgery before cancer surgery, holds certification in an intraperitoneal chemotherapy technique, and is affiliated to national bodies for both minimal access and robotic operating.

**Word count:** 230

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, memberships, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 10. Dr. Parveen Yadav

**Slug:** `dr-parveen-yadav` · Artemis Hospital, Delhi NCR

### Existing BIO

Dr. Parveen Yadav is Chief & Senior Consultant, Minimal Invasive, Robotic & Thoracic Onco Surgery at Artemis Hospital in Delhi NCR. He has practised for 20+ years experience. The operating list includes Esophagectomy and VATS Lung Surgery; Lobectomy stays on the table when the indication is honest. Peer review happens before anyone books a flight. Training includes MBBS and MS (General Surgery) — FAIS, FAIGES. Travelling patients meet him on camera first; a date is offered only after the records hold.

### Proposed BIO

Dr. Parveen Yadav is Chief and Senior Consultant for Minimal Invasive, Robotic and Thoracic Onco Surgery at Artemis Hospital, Gurugram, in the Delhi NCR, with more than 20 years of experience.

His practice covers both the operating theatre and the endoscopy suite. He performs esophageal cancer surgery, including minimally invasive esophageal cancer resection, and lung cancer surgery by VATS and robotic approaches, with lobectomy among the operations he offers. He operates on chest wall tumours and on mediastinal disease, including mediastinal masses and thymomas. On the diagnostic side he performs bronchoscopy and mediastinoscopy, and his therapeutic bronchoscopy extends to stenting and other interventional procedures. He also carries out invasive pleural procedures: thoracoscopy, pleural biopsy and pleural taps.

He qualified MBBS and took an MS in General Surgery, and holds FAIS and FAIGES. His surgical oncology training was at AIIMS, New Delhi, and he completed the IRCH fellowship in thoracic surgery at Tata Memorial Hospital, Mumbai. He is a Fellow of the American College of Surgeons and a DNB certified cardiothoracic surgeon.

He took the Best Poster Award at the Indian Cancer Congress in 2011. He appears as guest faculty and as chairperson at national and international conferences, and has organised national and regional meetings himself, among them ASVSCOR in 2013 and IAGES in 2017.

**Word count:** 214

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 11. Dr. Phanendra Kumar Gubbala

**Slug:** `dr-phanendra-kumar-gubbala` · Apollo Proton Cancer Centre, Chennai

### Existing BIO

Dr. Phanendra Kumar Gubbala is Consultant, Gynaecological Oncologist at Apollo Proton Cancer Centre in Chennai. He has practised for 9+ years experience. The operating list includes Sentinel Lymph Node Biopsy and Cytoreductive Surgery with HIPEC; Radical Hysterectomy stays on the table when the indication is honest. Peer review happens before anyone books a flight. Training includes MBBS. Travelling patients meet him on camera first; a date is offered only after the records hold.

### Proposed BIO

Dr. Phanendra Kumar Gubbala is Consultant Gynaecological Oncologist at Apollo Proton Cancer Centre, Chennai, with more than 9 years of experience. He has also practised at Apollo Hospitals in Ahmedabad.

His surgical work covers the gynaecological cancers. He performs radical hysterectomy and operates on cervical, ovarian and endometrial cancer, as well as on the less common vulvar and vaginal cancers. Sentinel lymph node biopsy is used for nodal assessment, so that the nodes most at risk can be examined without clearing the whole basin. For disease that has spread across the peritoneum he performs cytoreductive surgery with HIPEC.

He qualified MBBS and is a Member of the Royal College of Obstetricians and Gynaecologists. His subspecialty training was a fellowship in gynaecological oncology at The Christie Cancer Hospital in Manchester, United Kingdom, and he holds the Fellowship of the European Board of Gynaecologists, a qualification held by only a few Indian physicians. Both credentials were earned outside India, and between them they cover the British and the European training standards for the specialty.

One operation stands out on his record by volume: he has performed over 175 Piver-Rutledge radical hysterectomies at Apollo Hospitals, Ahmedabad, a first in the history of that institution.

He has presented research at Irish, British, European, American and World conferences, and has participated in multi-centric international drug trials in Ireland.

**Word count:** 223

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 12. Dr. S. Srivishnu

**Slug:** `dr-s-srivishnu` · MGM Healthcare, Chennai, Chennai

### Existing BIO

Dr. S. Srivishnu is Consultant at MGM Healthcare in Chennai. He has practised for 13+ years experience. The operating list includes Oncoplastic Breast Surgery and Breast-Conserving Surgery (Lumpectomy); Mastectomy stays on the table when the indication is honest. Peer review happens before anyone books a flight. Training includes M.S. in General Surgery – Kilpauk Medical College. Travelling patients meet him on camera first; a date is offered only after the records hold.

### Proposed BIO

Dr. S. Srivishnu is a Consultant in surgical oncology at MGM Healthcare, Chennai, with more than 13 years of experience.

His operating range covers three regions. On the breast he performs mastectomy, breast-conserving surgery and oncoplastic breast surgery, with sentinel lymph node biopsy for nodal staging. In the head and neck he operates on laryngeal, oropharyngeal and hypopharyngeal cancer and on head and neck tumours generally, with neck dissection where the nodes require it. In the abdomen and chest he performs esophageal cancer surgery and ovarian cancer surgery, and cytoreductive surgery with HIPEC for peritoneal disease.

He took his M.S. in General Surgery at Kilpauk Medical College and his M.Ch. in Surgical Oncology at Tata Memorial Hospital, Mumbai. He is a Member of the Royal College of Surgeons, Edinburgh, and holds a DrNB in Surgical Oncology. He then completed a one year fellowship in robotic and minimal access surgical oncology at Fortis Cancer Institute, Bangalore.

Before his present post he was a Consultant at Valentis Robotic and Cyberknife Cancer Hospital in the Delhi NCR. His earlier appointments were the training posts themselves, at Kilpauk Medical College for his M.S. and at Tata Memorial Hospital for his M.Ch., together with the fellowship year at Fortis Cancer Institute in Bangalore.

**Word count:** 208

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 13. Dr. Akshay Tiwari

**Slug:** `dr-akshay-tiwari-1` · Indraprastha Apollo Hospital, Delhi NCR

### Existing BIO

Dr. Akshay Tiwari is Senior Orthopedic Oncologist at Indraprastha Apollo Hospital in Delhi NCR. He has practised for 22+ years experience. The operating list includes Sentinel Lymph Node Biopsy and reconstruction when the defect needs it; a second look in theatre stays on the table when the indication is honest. Peer review happens before anyone books a flight. Training includes MBBS. Travelling patients meet him on camera first; a date is offered only after the records hold.

### Proposed BIO

Dr. Akshay Tiwari is Senior Orthopedic Oncologist at Indraprastha Apollo Hospital in the Delhi NCR, with more than 22 years of experience. He also works at the Apollo Athenea Women's Cancer Centre.

His field is musculoskeletal oncology, the cancer surgery of bone and soft tissue. He performs bone cancer surgery and bone tumour surgery, and soft tissue sarcoma surgery. Limb salvage surgery is central to the practice: the tumour is removed and the limb rebuilt rather than amputated. He also treats metastatic bone disease, operates on chest wall tumours, and performs sentinel lymph node biopsy.

He qualified MBBS, winning the gold medal for the highest marks in anatomy in his first professional examinations, and took an MS in Orthopedics. His subspecialty training was a fellowship in musculoskeletal oncology at the Rizzoli Orthopedic Institute in Italy. He also holds a Diploma in Tissue Banking, a qualification that sits close to the reconstructive half of his operating work.

His published work has been recognised twice, with a Best Paper Award at ICC in 2013 and a Best Published Paper Award at RGCON in 2011. Together with the anatomy medal at the start of his training, those are the three formal recognitions recorded against his name.

**Word count:** 203

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 14. Dr. Arvind Kumar

**Slug:** `dr-arvind-kumar-1` · Medanta - The Medicity, Delhi NCR

### Existing BIO

Dr. Arvind Kumar is Chairman, Lung Transplant and Chest Surgery at Medanta - The Medicity in Delhi NCR. He has practised for 36+ years experience. The operating list includes Esophagectomy and Lung Cancer Surgery; a second look in theatre stays on the table when the indication is honest. Peer review happens before anyone books a flight. Training includes MBBS. Travelling patients meet him on camera first; a date is offered only after the records hold.

### Proposed BIO

NOT GENERATED.

**Word count:** —

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, existing bio.

**New factual information introduced:** NONE — no bio proposed. The education field is seven qualification abbreviations with no
institution, no place and no date attached to any of them: MBBS, MS (Surgery), MNAMS, FUICC, FACS,
FICS and FIAGES. Only two of the seven are expanded on the record at all. There are no memberships,
no awards and no research. What remains is a designation, one hospital and a second Medanta clinic,
a city, "36+ Years Experience" and five procedure names. A 200-word biography of a surgeon with
36 years behind him would have to say where he trained or what he has contributed, and this profile
states neither, so the doctor is flagged for manual review and left unchanged.

**Other fields that would change:** NONE (bio only)

**Status:** FLAGGED — no change proposed

---
