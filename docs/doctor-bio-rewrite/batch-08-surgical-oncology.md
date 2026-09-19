# Doctor BIO rewrite — Batch 08 — Surgical Oncology, India

First Surgical Oncology batch. Every sentence is drawn from that doctor's own record in
`src/data/ginger-catalog.json` (designation, hospital, city, experience, qualifications, education,
affiliations, memberships, awards and research). The previous bios in this specialty are GAF
platform boilerplate and carry no doctor-specific facts, so the structured fields are the source.
No external sources, no inference, and no information from any other doctor's profile.
Only `doctorOverrides["<slug>"].bio` is written; no pSEO, schema, routing or frontend field changes.

## Batch summary

| # | Doctor | City | Old words | New words | Status |
|---|---|---|---|---|---|
| 1 | Dr. Chinnababu Sunkavalli | Hyderabad | 74 | 265 | APPLIED |
| 2 | Dr. SVS Deo | Delhi NCR | 81 | 270 | APPLIED |
| 3 | Dr. Tapan Singh Chauhan | Delhi NCR | 66 | 257 | APPLIED |
| 4 | Dr. Balaji Ramani | Chennai | 81 | 245 | APPLIED |
| 5 | Dr. Sachin Marda | Hyderabad | 75 | 246 | APPLIED |
| 6 | Dr. D. Pon Jeeva Mathan | Chennai | 78 | 249 | APPLIED |
| 7 | Dr. Tushar Jadhav | Mumbai | 66 | 246 | APPLIED |
| 8 | Dr. Balasubramoniam K R | Hyderabad | 95 | 254 | APPLIED |
| 9 | Dr. Hemanth Vudayaraju | Hyderabad | 83 | 244 | APPLIED |
| 10 | Dr. Rajesh Goud E | Hyderabad | 81 | 241 | APPLIED |
| 11 | Dr. Kamran Ali | Delhi NCR | 78 | 257 | APPLIED |
| 12 | Dr. Pramod Kumar Julka | Delhi NCR | 80 | 249 | APPLIED |

Every bio below is validated by `scripts/check-bio-batch.mjs` for the 200–300 word range and
for traceability of every capitalised term, acronym, degree and year back to that individual
doctor's own record in `src/data/ginger-catalog.json`.

---

## 1. Dr. Chinnababu Sunkavalli

**Slug:** `dr-chinnababu-sunkavalli` · Yashoda Hospitals, Hi-Tech City, Hyderabad

### Existing BIO

Dr. Chinnababu Sunkavalli is Clinical Director of Surgical Oncology at Yashoda Hospitals in Hyderabad. He has practised for 23+ years experience. The operating list includes Mastectomy and Esophagectomy; Gastrectomy stays on the table when the indication is honest. Peer review happens before anyone books a flight. Training includes MBBS, Jagadguru Jayadeva Murugarajendra Medical College (JJM Medical College), Davangere. Travelling patients meet him on camera first; a date is offered only after the records hold.

### Proposed BIO

Dr. Chinnababu Sunkavalli is Clinical Director of Surgical Oncology at Yashoda Hospitals, Hi-Tech City, Hyderabad, with more than 23 years of experience. He works in robotic surgical oncology and minimally invasive oncosurgery, and his operating range covers breast, cervical, ovarian and endometrial cancers, colorectal, gastric and esophageal cancers, oral and head and neck tumours, thyroid, kidney and lung cancers.

He completed his MBBS at JJM Medical College, Davangere, and his MS in General Surgery at Government Medical College, Surat, as a gold medalist and university topper. His MCh in Surgical Oncology followed at Gujarat Cancer Research Institute, Ahmedabad, where he placed second in the university, and he holds the FIAGES fellowship in minimally invasive GI surgery and a Professional Diploma in Clinical Research. His subsequent training was taken abroad: an advanced liver surgery fellowship at New Tokyo Hospital in Japan, robotic surgery training in Paris and at Roswell Park Cancer Institute in Buffalo, and fellowships at Memorial Sloan Kettering Cancer Institute in New York and Long Beach Memorial Hospital.

Before Yashoda Hospitals he worked at Apollo Hospitals from 2012 to 2022, Kamineni Institute of Medical Sciences from 2007 to 2012, and Gujarat Cancer and Research Institute.

He is a proctor and mentor for the Da Vinci robot and a principal investigator for multiple phase trials. A pioneer of low-cost cancer screening in India through a mobile screening campaign, he holds Guinness World Records for the largest breast cancer and oral cancer screenings and a Limca record for cervical cancer screening, and was named Young Oncologist of the Year by the Times of India in 2018.

**Word count:** 265

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, memberships, awards, research, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 2. Dr. SVS Deo

**Slug:** `dr-svs-deo` · Max Smart Super Speciality Hospital, Saket, Delhi NCR

### Existing BIO

Dr. SVS Deo is Chairman, Surgical Oncology at Max Smart Super Speciality Hospital in Delhi NCR. He has practised for 39+ years experience. The operating list includes Oncoplastic Breast Surgery and Breast-Conserving Surgery (Lumpectomy); Mastectomy stays on the table when the indication is honest. Peer review happens before anyone books a flight. Training includes MBBS — Rangaraya Medical College, Andhra University (Gold Medal and Distinction). Travelling patients meet him on camera first; a date is offered only after the records hold.

### Proposed BIO

Dr. SVS Deo is Chairman of Surgical Oncology at Max Smart Super Speciality Hospital, Saket, Delhi NCR, with more than 39 years of experience. His work spans surgical oncology together with organ-based multimodality management and intraoperative radiotherapy.

Breast surgery is the clearest thread in his practice: oncoplastic breast surgery, breast-conserving surgery, mastectomy and sentinel lymph node biopsy. He also operates on esophageal, gastric, gallbladder, liver, lung, oral and head and neck cancers, performs neck dissection and soft tissue sarcoma surgery, and carries out cytoreductive surgery with HIPEC for peritoneal disease.

He completed his MBBS at Rangaraya Medical College, Andhra University, with a gold medal and distinction in 1987. His fellowship training then ran almost continuously through leading cancer centres in the United States, Taiwan and the United Kingdom: UICC at Memorial Sloan Kettering Cancer Centre in 1998, UICC Geneva in 1999, oncoplasty and microvascular surgery at Chang Gung Memorial Hospital in Taiwan in 2001, IASO-Detroit at Karmanos Cancer Centre in 2002, UICC intraoperative radiotherapy at Ohio State University in 2003, the American College of Surgeons in 2003 and at MD Anderson Cancer Center in 2004, and an honorary fellowship from the Royal College of Surgeons of Edinburgh in 2024.

His awards include the International Guest Scholar Award of the American College of Surgeons, two UICC ICRETT cancer research fellowships, two Young Scientist Awards from the Indian Society of Oncology and the 2023 Rolling Stone Award. He is a former president of the Association of Breast Surgeons of India, the Indian Association of Surgical Oncology and the Indian Association of Peritoneal Surface Malignancies, and a council member of Breast Surgery International.

**Word count:** 270

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 3. Dr. Tapan Singh Chauhan

**Slug:** `dr-tapan-singh-chauhan` · Artemis Hospital, Delhi NCR

### Existing BIO

Dr. Tapan Singh Chauhan is Senior Consultant at Artemis Hospital in Delhi NCR. He has practised for 12+ years experience. The operating list includes Esophagectomy and Gastrectomy; Rectal Cancer Surgery stays on the table when the indication is honest. Peer review happens before anyone books a flight. Training includes MBBS. Travelling patients meet him on camera first; a date is offered only after the records hold.

### Proposed BIO

Dr. Tapan Singh Chauhan is a Senior Consultant at Artemis Hospital, Delhi NCR, with more than 12 years of experience. His practice combines surgical oncology with surgical gastroenterology, hepatopancreatobiliary and transplant surgery, and HIPEC.

Peritoneal surface malignancy is a defined focus. He performs cytoreductive surgery with HIPEC alongside esophageal, gastric, colorectal, pancreatic, liver and gallbladder cancer surgery, ovarian cancer debulking, radical cystectomy, cervical cancer surgery and soft tissue sarcoma surgery.

He holds an MBBS and an MS in General Surgery from Pt. B.D. Sharma PGIMS, Rohtak, the MRCS from the Royal College of Surgeons in the United Kingdom, and an MCh in Surgical Oncology from Gujarat Cancer Research Institute, Ahmedabad. He was formerly a senior resident in surgical oncology at AIIMS, New Delhi. His fellowship training covers GI and HPB oncology in Germany at Heidelberg, minimal access oncology at the Indo-American Cancer Institute in Hyderabad, and an ESSO fellowship in cytoreductive surgery, HIPEC and PIPAC at Lyon in France.

His memberships are unusually broad and map onto that subspecialty work: the Association of Surgeons of India, the Indian Association of Surgical Oncology, the Indian Society of Peritoneal Surface Malignancy, the Indian Society of Oncology, the Association of Breast Surgeons of India, the European Society of Surgical Oncology, the European Society of Medical Oncology, the Society of Surgical Oncology in the US, the European Association of Hepatopancreatobiliary Oncology and the Clinical Robotic Surgery Association.

He received the Boehringer-Ingelheim travel grant for the 2017 EHPBA Congress, an ESMO travel award in 2017 and the ESSO Fellowship Award in 2019.

**Word count:** 257

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, memberships, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 4. Dr. Balaji Ramani

**Slug:** `dr-balaji-ramani` · Gleneagles HealthCity Chennai, Chennai

### Existing BIO

Dr. Balaji Ramani is Director, Gleneagles Institute of Oncology at Gleneagles HealthCity Chennai in Chennai. He has practised for 17+ years experience. The operating list includes Oncoplastic Breast Surgery and Breast-Conserving Surgery (Lumpectomy); Mastectomy stays on the table when the indication is honest. Peer review happens before anyone books a flight. Training includes M.B.B.S. – Govt. Stanley Medical College & Hospital, Chennai, India (March 2004). Travelling patients meet him on camera first; a date is offered only after the records hold.

### Proposed BIO

Dr. Balaji Ramani is Director of the Gleneagles Institute of Oncology at Gleneagles HealthCity Chennai, with more than 17 years of experience in surgical oncology and cancer care.

His operating practice divides into two main areas. In gynaecological cancer he performs ovarian, cervical and endometrial cancer surgery, radical hysterectomy and cytoreductive surgery with HIPEC. In breast cancer he performs breast-conserving surgery, oncoplastic breast surgery, mastectomy and sentinel lymph node biopsy.

He completed his MBBS at Govt. Stanley Medical College & Hospital, Chennai, in 2004 and his MS in General Surgery at Govt. Rajaji Hospital & Madurai Medical College in 2007. He took the MRCS at the Royal College of Surgeons, Edinburgh, in 2008, followed by an MCh in Surgical Oncology at the Cancer Institute (W.I.A.), Adyar, Chennai, in 2012 and a DNB in Surgical Oncology from the National Board of Examinations in the same year. He also holds the FALS fellowship in laparoscopic oncology surgery and the FARIS fellowship in robotic surgery.

Before his current role he worked at Apollo Specialty Hospitals, Teynampet, MGM Healthcare & Cancer Institute and the Cancer Institute (W.I.A.), Adyar, all in Chennai.

His academic record is heavily decorated. It includes the Madurai ASICON 1977 Gold Medal and four endowment prizes for his MS in General Surgery in 2007, the Dr. Snehalatha Memorial Gold Medal for his MCh in Surgical Oncology in 2012, recognition as best outgoing student in surgical oncology at the Cancer Institute, and national quiz honours at ASICON.

**Word count:** 245

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 5. Dr. Sachin Marda

**Slug:** `dr-sachin-marda` · Yashoda Hospitals, Somajiguda, Hyderabad

### Existing BIO

Dr. Sachin Marda is Senior Consultant Oncologist and Robotic Surgeon at Yashoda Hospitals in Hyderabad. He has practised for 19+ years experience. The operating list includes Oncoplastic Breast Surgery and Breast-Conserving Surgery (Lumpectomy); Mastectomy stays on the table when the indication is honest. Peer review happens before anyone books a flight. Training includes Fellowship in Robotic Surgery (June 2016). Travelling patients meet him on camera first; a date is offered only after the records hold.

### Proposed BIO

Dr. Sachin Marda is Senior Consultant Oncologist and Robotic Surgeon at Yashoda Hospitals, Somajiguda, Hyderabad, with more than 19 years of experience.

Breast cancer forms the core of his operating list: breast-conserving surgery, oncoplastic breast surgery, mastectomy and sentinel lymph node biopsy. He also performs oral cancer surgery and neck dissection, thyroid, esophageal, gastric and colorectal cancer surgery, and radical hysterectomy.

His qualifications reflect a consistently decorated training record. He completed his MBBS at Shivaji University in 2000 with a third rank, an MS in General Surgery at Mumbai University in 2005 with three gold medals, and an MCh in Surgical Oncology at Gujarat University in 2009 with two gold medals. He holds DNB and MNAMS qualifications in both general surgery and surgical oncology, and took the MRCS at the Royal College of Surgeons, Edinburgh, in 2006. His fellowship training covers robotic surgery in 2016, surgical GI oncology from 2009 to 2010, and laparoscopic surgery, including an Ethicon fellowship in GI and laparoscopic surgery in Mumbai.

He is a member of the Royal College of Surgeons, Edinburgh, the Association of Surgeons of India, the Indian Association of Surgical Oncology and the Association of Robotic Surgeons of India.

Beyond his degrees, he received the first prize for best resident in general surgery in India with a scholarship from the B. BRAUN Medical Trust Foundation in 2004, the Mother Teresa Award from the Global Achievers Foundation in 2016 and the Divya Marathi Excellence in Healthcare Award in 2019.

**Word count:** 246

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, memberships, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 6. Dr. D. Pon Jeeva Mathan

**Slug:** `dr-d-pon-jeeva-mathan` · Rela Hospital, Chennai

### Existing BIO

Dr. D. Pon Jeeva Mathan is Consultant at Rela Hospital in Chennai. He has practised for 10+ years experience. The operating list includes Breast-Conserving Surgery (Lumpectomy) and Mastectomy; Sentinel Lymph Node Biopsy stays on the table when the indication is honest. Peer review happens before anyone books a flight. Training includes Post-Doctoral Fellowship in Surgical Oncology — Tata Medical Center, Kolkata (2021–2023). Travelling patients meet him on camera first; a date is offered only after the records hold.

### Proposed BIO

Dr. D. Pon Jeeva Mathan is a Consultant at Rela Hospital, Chennai, with more than 10 years of experience across surgical oncology and minimal access surgery.

His operating list centres on breast and gynaecological cancer: breast-conserving surgery, mastectomy, sentinel lymph node biopsy and breast cancer surgery, together with cervical and ovarian cancer surgery.

He completed his MBBS at Rajah Muthiah Medical College and Hospital, Chidambaram, under Annamalai University in 2009, an internship at Stanley Medical College and Hospital, Chennai, and an MS in General Surgery at Sree Balaji Medical College and Hospital, Chennai, between 2014 and 2017. He then took a post-doctoral fellowship in minimal access surgery at GEM Hospital & Research Center, Coimbatore, from 2018 to 2020, a senior fellowship at Dr. Rela Institute and Medical Centre in 2020 to 2021, and a post-doctoral fellowship in surgical oncology at Tata Medical Center, Kolkata, from 2021 to 2023.

His recent training has been in endoscopic and robotic technique specifically: advanced endoscopic breast surgery at Changhua Christian Hospital in Taiwan in December 2024, robotic surgery in gynaecology in Moscow in July 2025, and hands-on transoral endoscopic thyroidectomy via the vestibular approach at the National Cancer Hospital in Vietnam in September 2025.

That focus carries into his research. He reported endoscopic breast conservation surgery for early-stage invasive carcinoma as the first such case from India in 2025, and has published case reports on splenic artery aneurysm, extrapulmonary tuberculosis and urachal actinomycosis, alongside paper and video presentations at ASICON, ICES and Laparosurg.

**Word count:** 249

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, research, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 7. Dr. Tushar Jadhav

**Slug:** `dr-tushar-jadhav` · Gleneagles Hospital, Mumbai, Mumbai

### Existing BIO

Dr. Tushar Jadhav is Consultant at Gleneagles Hospital in Mumbai. He has practised for 20+ years experience. The operating list includes Oncoplastic Breast Surgery and Breast Reconstruction; Breast-Conserving Surgery (Lumpectomy) stays on the table when the indication is honest. Peer review happens before anyone books a flight. Training includes MBBS. Travelling patients meet him on camera first; a date is offered only after the records hold.

### Proposed BIO

Dr. Tushar Jadhav is a Consultant at Gleneagles Hospital, Parel, Mumbai, with more than 20 years of experience. His practice covers surgical oncology, breast cancer oncology and breast reconstruction.

Breast surgery is where almost all of his operating work sits: breast cancer surgery, mastectomy, breast-conserving surgery, oncoplastic breast surgery, sentinel lymph node biopsy and breast biopsy. He also performs skin cancer and melanoma surgery.

His qualifications follow the same line. After an MBBS and an MS in General Surgery from Mumbai University, he completed a DNB super-specialty in surgical oncology at the Regional Cancer Centre, Kolkata, an MCh in Breast Oncoplasty at the University of East Anglia in the United Kingdom, and a postdoctoral fellowship at Tata Memorial Hospital, Mumbai. He holds the European Board of Surgery Qualification in breast surgery, which is a formal European specialist credential in the field rather than a general surgical one.

His advanced international training has concentrated on reconstruction: perforator-based flaps, image-guided breast surgery and whole breast reconstruction at institutes in Spain, Italy, Singapore, the United Kingdom at Guy's Hospital in London, and Germany at MHDCC in Düsseldorf.

He is a member of the Association of Surgeons of India, the Association of Breast Surgeons of India, the Indian Medical Association, the European Society of Surgical Oncology, the Society of Surgical Oncology in the United States and the Brazilian Society of Surgical Oncology. For patients weighing reconstruction alongside cancer clearance, that combination of oncological and oncoplastic credentials is the relevant point.

**Word count:** 246

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, memberships, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 8. Dr. Balasubramoniam K R

**Slug:** `dr-balasubramoniam-k-r` · Yashoda Hospitals, Secunderabad, Hyderabad

### Existing BIO

Dr. Balasubramoniam K R is Consultant Robotic, Minimally Invasive Thoracic and Lung Transplant Surgeon at Yashoda Hospitals in Hyderabad. He has practised for 18+ years experience. The operating list includes Lung Cancer Surgery and reconstruction when the defect needs it; a second look in theatre stays on the table when the indication is honest. Peer review happens before anyone books a flight. Training includes MCh (CVTS) — Sree Chitra Tirunal Institute for Medical Sciences and Technology (SCTIMST), Thiruvananthapuram (2008–2010). Travelling patients meet him on camera first; a date is offered only after the records hold.

### Proposed BIO

Dr. Balasubramoniam K R is Consultant Robotic, Minimally Invasive Thoracic and Lung Transplant Surgeon at Yashoda Hospitals, Secunderabad, Hyderabad, with more than 18 years of experience. His operating practice covers lung cancer surgery, mediastinal and chest wall tumour surgery and pleural mesothelioma surgery.

He completed his MBBS at Government Medical College, Thiruvananthapuram, between 1995 and 2001, an MS in General Surgery at the same institution from 2003 to 2006, and an MCh in cardiovascular and thoracic surgery at Sree Chitra Tirunal Institute for Medical Sciences and Technology from 2008 to 2010.

His subsequent training tracks the development of minimally invasive thoracic surgery almost year by year: video assisted thoracoscopic surgery at National University Hospital, Singapore, in 2013 and at Cedar Sinai Hospital in Los Angeles in 2014, advanced aortic surgery at the Cleveland Clinic in 2014, lung transplantation at the University of Vienna in 2015, robotic thoracic surgery at the University of Alabama in 2016 and the University of Rouen in 2017, and uniportal VATS at Shanghai Pulmonary Hospital in 2018.

He established the first robotic thoracic surgery unit in Kerala at AIMS, Kochi, performing the state's first robotic thoracic procedure in 2016, and started the first IACTS-accredited VATS fellowship programme in India. He was lead thoracic surgeon for India's first tracheal allotransplant and served as faculty for the Asian Thoracoscopic Educational Program in 2016, 2017 and 2018. His research has appeared in the Indian Journal of Chest Diseases and Allied Sciences, the Indian Journal of Plastic Surgery and ACS Applied Materials & Interfaces.

**Word count:** 254

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 9. Dr. Hemanth Vudayaraju

**Slug:** `dr-hemanth-vudayaraju` · Yashoda Hospitals, Secunderabad, Hyderabad

### Existing BIO

Dr. Hemanth Vudayaraju is Senior Consultant Surgical Oncologist & Robotic Surgeon at Yashoda Hospitals in Hyderabad. He has practised for 20+ years experience. The operating list includes Esophagectomy and Radical Hysterectomy; Ovarian Cancer Cytoreductive Surgery stays on the table when the indication is honest. Peer review happens before anyone books a flight. Training includes Robotic Surgery Training — Roswell Park Cancer Institute, Buffalo, New York, USA (2016). Travelling patients meet him on camera first; a date is offered only after the records hold.

### Proposed BIO

Dr. Hemanth Vudayaraju is Senior Consultant Surgical Oncologist and Robotic Surgeon at Yashoda Hospitals, Secunderabad, Hyderabad, with more than 20 years of experience.

His operating range is broad for a single surgeon: head and neck tumour surgery, thyroid cancer surgery, lung and chest wall tumour surgery, esophageal cancer surgery, and ovarian, endometrial and kidney cancer surgery. He also works alongside medical oncology in collaborative care.

He completed his MBBS at Gandhi Medical College under Dr. NTR University of Health Sciences between 1992 and 1998, and an MS in General Surgery at Kakatiya Medical College, Warangal, from 2001 to 2004. He then took first rank in the all-India MCh entrance examination for Gujarat University in July 2004 and completed his MCh in Surgical Oncology at Gujarat Cancer & Research Institute, B.J. Medical College, from 2004 to 2007, finishing as gold medalist and university first. A DNB in surgical oncology followed in 2009, and he trained in robotic surgery at Roswell Park Cancer Institute in Buffalo, New York, in 2016.

His earlier appointments include Apollo Cancer Institute at Apollo Health City, Jubilee Hills, Krishna Institute of Medical Sciences in Secunderabad, St. Anns Cancer & General Hospital in Kazipet and the MNJ Institute of Oncology and Regional Cancer Center in Hyderabad.

He is a member of the Indian Medical Association, the Association of Surgeons of India, the Indian Association of Surgical Oncology, the Indian Association of Gastrointestinal Endo Surgeons and the Association of Breast Surgeons of India.

**Word count:** 244

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, memberships, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 10. Dr. Rajesh Goud E

**Slug:** `dr-rajesh-goud-e` · Yashoda Hospitals, Hi-Tech City, Hyderabad

### Existing BIO

Dr. Rajesh Goud E is Senior Consultant Surgical Oncologist, Minimal Invasive & Robotic Surgeon at Yashoda Hospitals in Hyderabad. He has practised for 16+ years experience. The operating list includes Oncoplastic Breast Surgery and Breast-Conserving Surgery (Lumpectomy); Mastectomy stays on the table when the indication is honest. Peer review happens before anyone books a flight. Training includes Fellowship in Minimal Access Surgery (FMAS) — 2018. Travelling patients meet him on camera first; a date is offered only after the records hold.

### Proposed BIO

Dr. Rajesh Goud E is Senior Consultant Surgical Oncologist and a minimal invasive and robotic surgeon at Yashoda Hospitals, Hi-Tech City, Hyderabad, with more than 16 years of experience.

His operating list runs across several cancer groups. In breast cancer he performs breast-conserving surgery, oncoplastic breast surgery and sentinel lymph node biopsy. In urological cancer he performs radical prostatectomy, radical cystectomy and kidney cancer surgery. He also operates on cervical, colorectal, head and neck and lung cancers, and works alongside medical oncology in supportive and collaborative care.

He completed his MBBS at Osmania Medical College, Hyderabad, in 2009 and an MS in General Surgery at Kakatiya Medical College, Warangal, in 2013. His MCh in Surgical Oncology followed at Osmania Medical College in 2017, where he won a gold medal, and he took a Fellowship in Minimal Access Surgery in 2018.

Before his current post he worked at Basavatarakam Indo-American Cancer Hospital & Research Institute, the American Oncology Institute, Century Super Specialty Hospital, MNJIO & Regional Cancer Centre and Kamineni Medical College, all in Hyderabad.

He is a member of the Telangana Medical Council, the Association of Surgeons of India and the Indian Association of Surgical Oncology. His recognitions include the APJ Abdul Kalam Excellence Award in Oncology and the Top Oncologist Award at the 2023 HMTV Medical Professionals Awards, and he has published case reports on pilomatricoma of the sternum, primary Ewing sarcoma of the kidney and liposarcoma of the mesorectum.

**Word count:** 241

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, memberships, awards, research, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 11. Dr. Kamran Ali

**Slug:** `dr-kamran-ali-1` · Max Super Speciality Hospital, Saket, Delhi NCR

### Existing BIO

Dr. Kamran Ali is Associate Director at Max Super Speciality Hospital in Delhi NCR. He has practised for 13+ years experience. The operating list includes Esophagectomy and Lung Cancer Surgery; a second look in theatre stays on the table when the indication is honest. Peer review happens before anyone books a flight. Training includes MBBS — Jawaharlal Nehru Medical College, AMU, Aligarh. Travelling patients meet him on camera first; a date is offered only after the records hold.

### Proposed BIO

Dr. Kamran Ali is Associate Director at Max Super Speciality Hospital, Saket, Delhi NCR, with more than 13 years of experience. His work sits at the meeting point of thoracic surgical oncology and lung transplant surgery, and his operating list covers lung cancer surgery, mediastinal and chest wall tumour surgery, esophageal cancer surgery and pleural mesothelioma surgery.

He completed his MBBS at Jawaharlal Nehru Medical College, AMU, Aligarh, and a DNB in surgery at Sir Ganga Ram Hospital, New Delhi, where he was named best resident trainee of the hospital overall and best resident trainee in general surgery in 2013. He is a Fellow of the American College of Surgeons. His specialist training includes a thoracic surgery fellowship at Medanta the Medicity, an ASCVTS fellowship in thoracic surgery at Seoul National University, a lung transplant fellowship at the Medical University of Vienna, and travelling fellowships at the National Cancer Centre and Tokyo University in Japan and National Taiwan University Hospital.

He was part of the surgical team that performed Europe's first and the world's second lung transplant for COVID-19 ARDS.

His awards are concentrated in international thoracic surgery. He won the thoracic track of the ISMICS 2015 poster competition in Berlin for work on awake thoracic surgery, received an ESTS scholarship for the Antalya School of Thoracic Surgery in 2015, represented Team Asia in the Thoracic Surgery Masters Cup at ESTS 2014 in Copenhagen, held the ASCVTS Fellowship Award for 2016 to 2017, and received a Hyundai Motor Company travel grant for the 2023 ASCVTS annual meeting.

**Word count:** 257

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 12. Dr. Pramod Kumar Julka

**Slug:** `dr-pramod-kumar-julka` · Max Smart Super Speciality Hospital, Saket, Delhi NCR

### Existing BIO

Dr. Pramod Kumar Julka is Vice Chairman at Max Smart Super Speciality Hospital in Delhi NCR. He has practised for 47+ years experience. The operating list includes Oncoplastic Breast Surgery and Mastectomy; Esophagectomy stays on the table when the indication is honest. Peer review happens before anyone books a flight. Training includes M.D. (Radiotherapy & Oncology) — Maulana Azad Medical College, New Delhi, India. Travelling patients meet him on camera first; a date is offered only after the records hold.

### Proposed BIO

Dr. Pramod Kumar Julka is Vice Chairman at Max Smart Super Speciality Hospital, Saket, Delhi NCR, with more than 47 years of experience. His listed specialisations span surgical oncology, medical oncology, radiation oncology and haematology with bone marrow transplant, which is an unusually wide span and reflects a career spent across the whole of cancer treatment rather than one modality.

The cancer groups covered in his practice include breast, ovarian, endometrial, vaginal and vulvar cancers, oral and head and neck tumours, esophageal, gastric, gallbladder, pancreatic and rectal cancers, bladder, prostate and testicular cancers, bone tumours, chest wall tumours and skin cancer and melanoma.

He holds an MD in Radiotherapy & Oncology from Maulana Azad Medical College, New Delhi, and is a Fellow of the National Academy of Medical Sciences. His higher training was taken on a WHO fellowship at MD Anderson Cancer Hospital in Houston and Long Beach Memorial Cancer Centre in California in 1995, and in 1998 he performed a peripheral blood stem cell transplant following high-dose chemotherapy.

He was awarded the Padma Shri in 2013, the fourth-highest civilian award in India. His other honours include the OISCA Foundation UN Award in 2001 for contribution to cancer treatment and research, the IMA Award for Medical Education and Research, the Indian Medical Association Award for Clinical Oncology in 2006, recognition as a Leading Scientist of the World in 2005, a Life Time Achievement Award from the Association of Radiation Oncologists of India in 2013, and emeritus membership of ASCO.

**Word count:** 249

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
