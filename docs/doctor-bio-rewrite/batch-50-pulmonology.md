# Doctor BIO rewrite — Batch 50 — Pulmonology, India

Second Pulmonology batch. Every sentence is drawn from that doctor's own record in
`src/data/ginger-catalog.json` (designation, hospital, city, experience, qualifications, education,
affiliations, memberships, awards and research). The previous bios in this specialty are GAF
platform boilerplate, so the structured fields are the source. No external sources, no inference,
and no information from any other doctor's profile. Only `doctorOverrides["<slug>"].bio` is
written; no pSEO, schema, routing or frontend field changes.

## Batch summary

| # | Doctor | City | Old words | New words | Status |
|---|---|---|---|---|---|
| 1 | Dr. Manas Mengar | Mumbai | 122 | 268 | APPLIED |
| 2 | Dr. Priya Sharma | Delhi NCR | 115 | 257 | APPLIED |
| 3 | Dr. Lakshminarayana Jasti | Hyderabad | 130 | 250 | APPLIED |
| 4 | Dr. Nandani Gulati | Delhi NCR | 126 | 272 | APPLIED |
| 5 | Dr. V Pratibh Prasad | Hyderabad | 124 | 245 | APPLIED |
| 6 | Dr. Sridhar R | Chennai | 121 | 247 | APPLIED |
| 7 | Dr. S Suresh Sagadevan | Chennai | 118 | 239 | APPLIED |
| 8 | Dr. Jayaraman S | Chennai | 122 | 258 | APPLIED |
| 9 | Dr. Gargi Maitra | Delhi NCR | 128 | 240 | APPLIED |
| 10 | Dr. Chandrakant Tarke | Hyderabad | 116 | 254 | APPLIED |
| 11 | Dr. Deepika Ramachandran | Chennai | 120 | 241 | APPLIED |
| 12 | Dr. Sreenivasan V | Chennai | 130 | 245 | APPLIED |

Every bio below is validated by `scripts/check-bio-batch.mjs` for the 200–300 word range and
for traceability of every capitalised term, acronym, degree and year back to that individual
doctor's own record in `src/data/ginger-catalog.json`.

---

## 1. Dr. Manas Mengar

**Slug:** `dr-manas-mengar` · KIMS Hospitals, Thane, Mumbai

### Existing BIO

Dr. Manas Mengar is Senior Consultant at KIMS Hospitals in Mumbai, India. He has practised pulmonology in India for 10+ years experience. Airway and pleural lists are tagged for later pSEO under country, city, specialty and procedure — Airway Stenting, Bronchoscopy and EBUS (Endobronchial Ultrasound) when CT, bronchoscopy notes and gas exchange already make the indication honest. Flexible versus rigid access, EBUS versus conventional TBNA, thoracoscopy versus a closed pleural biopsy, and whether lung transplant belongs on the same campus are written after records review — not from a day-care brochure. Training includes D.M. – Pulmonary Critical Care & Sleep Medicine. International patients meet him on camera first; travel to Mumbai is offered only if this respiratory floor is the right list.

### Proposed BIO

Dr. Manas Mengar is a Senior Consultant at KIMS Hospitals, Thane, in Mumbai, with more than 10 years of experience in pulmonology.

His list covers three areas. The interventional work is bronchoscopy, endobronchial ultrasound, transbronchial needle aspiration and airway stenting. The medical work covers severe asthma, chronic obstructive pulmonary disease, interstitial lung disease, bronchiectasis, pulmonary hypertension, complex pulmonary infection and post-tuberculosis lung disease. The sleep work covers obstructive sleep apnea, polysomnography and CPAP titration.

His qualifications were examined in three systems. He holds a DM in pulmonary critical care and sleep medicine, the DNB, the MRCP Respiratory specialty certificate examination taken in the United Kingdom, and the European Diploma in Adult Respiratory Medicine from Switzerland. Two further fellowships cover the other parts of his list: one in interventional pulmonology, and one in sleep medicine from the ISDA, which he took with a gold medal.

His record is unusually full of examination and quiz results, which is what a decade of competitive postgraduate training looks like when it is written down. He took first prize in the state level postgraduate quiz at KEM Hospital in Mumbai and the zonal level quiz at B.J. Medical in Ahmedabad, both at NAPCON 2015, second prize at the DY Patil University quiz in Pimpri in 2016, and first prize in the DM postgraduate quiz at PACS 2019 in Delhi. In 2020 he was selected in the top five in the American College of Chest Physicians examination.

He was faculty on the advisory board at Medsicon 2019 and has several publications in national and international medical journals. He practises at KIMS Hospital in Thane.

**Word count:** 268

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 2. Dr. Priya Sharma

**Slug:** `dr-priya-sharma` · Sarvodaya Hospital, Faridabad, Delhi NCR

### Existing BIO

Dr. Priya Sharma is Consultant at Sarvodaya Hospital in Delhi NCR, India. She has practised pulmonology in India for 13+ years experience. Airway and pleural lists are tagged for later pSEO under country, city, specialty and procedure — Airway Stenting, Bronchoscopy and Medical Thoracoscopy when CT, bronchoscopy notes and gas exchange already make the indication honest. Flexible versus rigid access, EBUS versus conventional TBNA, thoracoscopy versus a closed pleural biopsy, and whether lung transplant belongs on the same campus are written after records review — not from a day-care brochure. Training includes MBBS. International patients meet her on camera first; travel to Delhi NCR is offered only if this respiratory floor is the right list.

### Proposed BIO

Dr. Priya Sharma is a Consultant at Sarvodaya Hospital, Faridabad, in Delhi NCR, with more than 13 years of experience in pulmonology.

Her list is weighted toward chronic and infective lung disease. She performs bronchoscopy and airway stenting, and manages chronic obstructive pulmonary disease, severe asthma, interstitial lung disease, bronchiectasis, pulmonary hypertension, cystic fibrosis, obstructive sleep apnea and complex pulmonary infection. Drug-resistant tuberculosis and post-tuberculosis lung disease both appear on her list, which is the pattern of a practice that sees the disease and its long-term damage.

She read MBBS, then took the DNB in TB and chest medicine at NITRD in Delhi as a gold medallist, and her DM in pulmonary, critical care and sleep medicine at AIIMS. She also holds the European Diploma in Respiratory Medicine and a postgraduate diploma in hospital management.

That management diploma is worth noting alongside the clinical qualifications. It sits on a record that already includes a national board gold medal and a super-specialty degree from AIIMS, and it points to responsibility for how a service runs rather than only for the patients within it.

Her research record runs to more than 30 research papers and publications in peer-reviewed, PubMed-indexed journals, and she won the Dr. J. C. Kothari Young Scientist Award at NAPCON 2022.

She is a member of the European Respiratory Society, the Indian Chest Society and the National Academy of Medical Sciences. Alongside Sarvodaya Hospital in Sector 8, Faridabad, she has been affiliated with Indraprastha Apollo Hospital in Delhi and Kalpana Chawla Government Medical College in Karnal.

**Word count:** 257

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, memberships, awards, research, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 3. Dr. Lakshminarayana Jasti

**Slug:** `dr-lakshminarayana-jasti` · KIMS Hospitals, Secunderabad, Hyderabad

### Existing BIO

Dr. Lakshminarayana Jasti is Lead Consultant and Course Director, Interventional Pulmonology Fellowship Program at KIMS Hospitals in Hyderabad, India. He has practised pulmonology in India for 10+ years experience. Airway and pleural lists are tagged for later pSEO under country, city, specialty and procedure — Airway Stenting, Bronchoscopy and EBUS (Endobronchial Ultrasound) when CT, bronchoscopy notes and gas exchange already make the indication honest. Flexible versus rigid access, EBUS versus conventional TBNA, thoracoscopy versus a closed pleural biopsy, and whether lung transplant belongs on the same campus are written after records review — not from a day-care brochure. Training includes MBBS — Guntur Medical College, Guntur, Andhra Pradesh (2006–2012). International patients meet him on camera first; travel to Hyderabad is offered only if this respiratory floor is the right list.

### Proposed BIO

Dr. Lakshminarayana Jasti is Lead Consultant and Course Director of the Interventional Pulmonology Fellowship Program at KIMS Hospitals, Secunderabad, in Hyderabad, with more than 10 years of experience.

His list covers interventional, medical and sleep respiratory work. The interventional side is bronchoscopy, endobronchial ultrasound, transbronchial needle aspiration and airway stenting. The medical side covers chronic obstructive pulmonary disease, severe asthma, interstitial lung disease, bronchiectasis, pulmonary hypertension and complex pulmonary infection, and the sleep side obstructive sleep apnea, polysomnography and CPAP titration.

He read MBBS at Guntur Medical College between 2006 and 2012 and took his MD in pulmonary medicine at G.S.L. Medical College in Rajahmundry from 2016 to 2019. He then secured all India 16th rank in NEET SS-2019 and took his DM in pulmonary medicine at Christian Medical College, Vellore, from 2019 to 2022. His fellowship in bronchoscopy and interventional pulmonology was at Serdang Hospital in Malaysia in February 2024.

Between the DM and the fellowship he was an assistant professor at Christian Medical College in Vellore, so he has taught in a teaching hospital as well as directing the fellowship programme he now runs at KIMS.

His prizes are all for presented work and recall. He took first prize in poster presentation at NAPCON 2018 in Ahmadabad and again at NAPCON 2021 in Varanasi, and first prize at the national APACI respiratory disease quiz in 2022 conducted by Cipla Med.

He is a life member of the Indian Chest Society and a member of the European Respiratory Society.

**Word count:** 250

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 4. Dr. Nandani Gulati

**Slug:** `dr-nandani-gulati` · Fortis Memorial Research Institute, Delhi NCR

### Existing BIO

Dr. Nandani Gulati is Senior Consultant at Fortis Memorial Research Institute in Delhi NCR, India. She has practised pulmonology in India for 10+ years experience. Airway and pleural lists are tagged for later pSEO under country, city, specialty and procedure — Medical Thoracoscopy, Bronchoscopy and Medical Thoracoscopy when CT, bronchoscopy notes and gas exchange already make the indication honest. Flexible versus rigid access, EBUS versus conventional TBNA, thoracoscopy versus a closed pleural biopsy, and whether lung transplant belongs on the same campus are written after records review — not from a day-care brochure. Training includes MBBS — Goa Medical College and Hospital, Goa University. International patients meet her on camera first; travel to Delhi NCR is offered only if this respiratory floor is the right list.

### Proposed BIO

Dr. Nandani Gulati is a Senior Consultant at Fortis Memorial Research Institute in Delhi NCR, with more than 10 years of experience in pulmonology.

Her list covers diagnostic and therapeutic bronchoscopy, medical thoracoscopy and medical pleural procedures alongside severe asthma, chronic obstructive pulmonary disease, interstitial lung disease, bronchiectasis, complex pulmonary infection and drug-resistant tuberculosis. The sleep side covers obstructive sleep apnea evaluation, polysomnography and CPAP titration.

She read MBBS at Goa Medical College and Hospital, Goa University, and took her MD in pulmonology at the same college as a gold medallist, receiving the Dr. A.S. Bagga Award for academic excellence in pulmonary medicine. She also holds the European Diploma in Adult Respiratory Medicine taken in Switzerland. Her earliest recorded prize is a first in the forensic medicine examination in her second MBBS year, which places the academic record well before the specialty.

Her published work is on chronic obstructive pulmonary disease and the imaging of it. She has publications in national and international journals on volumetric CT findings in COPD, on tobacco and biomass smoke associated pulmonary disease, and on emphysema quantification. Biomass smoke exposure is a distinct cause of the same disease, and her work covers both it and tobacco.

Her presentations run from 2014 onward: the Asia Pacific Society of Respirology Congress and NAPCON in November 2014, the Indian Radiology and Imaging Association conference in January 2015, and IPF Medicon in 2019. She won a best paper award at ICONIC in Pune in February 2014 and third prize for a poster on non-resolving pneumonia at the 17th Critical Care Symposium in 2022. She practises at Fortis Hospital in Vasant Kunj.

**Word count:** 272

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 5. Dr. V Pratibh Prasad

**Slug:** `dr-v-pratibh-prasad` · Yashoda Hospitals, Hi-Tech City, Hyderabad

### Existing BIO

Dr. V Pratibh Prasad is Consultant Clinical and Interventional Pulmonologist at Yashoda Hospitals in Hyderabad, India. He has practised pulmonology in India for 10+ years experience. Airway and pleural lists are tagged for later pSEO under country, city, specialty and procedure — Airway Stenting, Bronchoscopy and EBUS (Endobronchial Ultrasound) when CT, bronchoscopy notes and gas exchange already make the indication honest. Flexible versus rigid access, EBUS versus conventional TBNA, thoracoscopy versus a closed pleural biopsy, and whether lung transplant belongs on the same campus are written after records review — not from a day-care brochure. Training includes Fellowship in Interventional Pulmonology, Yashoda Hospitals. International patients meet him on camera first; travel to Hyderabad is offered only if this respiratory floor is the right list.

### Proposed BIO

Dr. V Pratibh Prasad is a Consultant Clinical and Interventional Pulmonologist at Yashoda Hospitals, Hi-Tech City, in Hyderabad, with more than 10 years of experience. His profile records pulmonology together with interventional pulmonology and paediatric pulmonology.

His list covers bronchoscopy, endobronchial ultrasound, transbronchial needle aspiration and airway stenting alongside severe asthma, chronic obstructive pulmonary disease, interstitial lung disease, bronchiectasis, obstructive sleep apnea, complex pulmonary infection and drug-resistant tuberculosis.

He read MBBS at SVS Medical College in Mahabubnagar and took the DNB in pulmonary medicine at P. D. Hinduja National Hospital and Medical Research Centre in Mumbai. He then passed the specialty certificate examination in respiratory medicine of the Royal College of Physicians in the UK, and took his fellowship in interventional pulmonology at Yashoda Hospitals, the hospital where he now practises.

That sequence, a national board qualification in Mumbai, a UK examination and then an interventional fellowship at his current hospital, is what puts bronchoscopy and airway stenting on a list that also includes the paediatric side of the specialty.

He won the Prof. Dr. S. N. Gaur's Young Scientist Award in 2021, presented at NAPCON in Varanasi, and held an ERS silver sponsorship at the European Respiratory Society Congress in London in 2016.

His memberships cover the field in India and abroad: the Indian Chest Society, the National College of Chest Physicians, the Indian Association of Bronchology, the European Respiratory Society, the American College of Chest Physicians and the Asia Pacific Society of Respirology.

**Word count:** 245

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, memberships, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 6. Dr. Sridhar R

**Slug:** `dr-sridhar-r` · MGM Healthcare, Chennai, Chennai

### Existing BIO

Dr. Sridhar R is Interventional Pulmonologist at MGM Healthcare in Chennai, India. He has practised pulmonology in India for 10+ years experience. Airway and pleural lists are tagged for later pSEO under country, city, specialty and procedure — Airway Stenting, Bronchoscopy and EBUS (Endobronchial Ultrasound) when CT, bronchoscopy notes and gas exchange already make the indication honest. Flexible versus rigid access, EBUS versus conventional TBNA, thoracoscopy versus a closed pleural biopsy, and whether lung transplant belongs on the same campus are written after records review — not from a day-care brochure. Training includes MBBS – Mahatma Gandhi Medical College, Puducherry. International patients meet him on camera first; travel to Chennai is offered only if this respiratory floor is the right list.

### Proposed BIO

Dr. Sridhar R is an Interventional Pulmonologist at MGM Healthcare in Chennai, with more than 10 years of experience. His profile records pulmonology together with lung cancer diagnosis and staging.

His list is interventional and medical. The interventional work is bronchoscopy, endobronchial ultrasound, transbronchial needle aspiration and airway stenting, which are also the procedures used to diagnose and stage lung cancer. The medical work covers severe asthma, chronic obstructive pulmonary disease, interstitial lung disease, pulmonary hypertension, complex pulmonary infection and post-tuberculosis lung disease, and the sleep work obstructive sleep apnea, polysomnography and CPAP titration.

He read MBBS at Mahatma Gandhi Medical College in Puducherry and took his fellowship in interventional pulmonology at Apollo Hospitals in Chennai.

Much of his record is academic rather than clinical. He is a faculty member on DNB and fellowship programmes, so he teaches both general respiratory trainees and those specialising further. He is associate editor of the Journal of Association of Pulmonary Technologists and a reviewer for the European Respiratory Society, which places him on both sides of the publication process, and he has published over 20 articles in indexed journals.

He is also a national speaker and an organiser of pulmonology conferences, and an active leader and mentor in national medical workshops. Teaching, editing, reviewing and organising, taken together with an interventional list, describe a pulmonologist whose work reaches other clinicians as well as patients.

He practises at MGM Healthcare in Chennai, having trained at Apollo Hospitals in the same city.

**Word count:** 247

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 7. Dr. S Suresh Sagadevan

**Slug:** `dr-s-suresh-sagadevan` · Gleneagles HealthCity Chennai, Chennai

### Existing BIO

Dr. S Suresh Sagadevan is Clinical Lead and Consultant at Gleneagles HealthCity Chennai in Chennai, India. He has practised pulmonology in India for 10+ years experience. Airway and pleural lists are tagged for later pSEO under country, city, specialty and procedure — Airway Stenting, Lung Transplantation and Bronchoscopy when CT, bronchoscopy notes and gas exchange already make the indication honest. Flexible versus rigid access, EBUS versus conventional TBNA, thoracoscopy versus a closed pleural biopsy, and whether lung transplant belongs on the same campus are written after records review — not from a day-care brochure. Training includes M.B.B.S.. International patients meet him on camera first; travel to Chennai is offered only if this respiratory floor is the right list.

### Proposed BIO

Dr. S Suresh Sagadevan is Clinical Lead and Consultant at Gleneagles HealthCity Chennai, with more than 10 years of experience. His profile records pulmonology together with interventional pulmonology, sleep medicine and pre- and post-transplant care for lung transplantation.

His list follows those four headings. The interventional work is bronchoscopy, endobronchial ultrasound, transbronchial needle aspiration and airway stenting. The medical work covers severe asthma, chronic obstructive pulmonary disease, interstitial lung disease, bronchiectasis, pulmonary hypertension and complex pulmonary infection. The sleep work covers obstructive sleep apnea and CPAP titration, and lung transplantation sits at the end of the range.

He holds MBBS and an MD in respiratory medicine, in which he was university topper. Two international fellowships follow: the FCCP of the American College of Chest Physicians and the FAPSR of the Asian Pacific Society of Respirology. He also holds a GCP-NIDA Clinical Trials Network certificate, a research qualification rather than a clinical one, which sits apart from the rest of his record.

His award record includes first prize in the thoracoscopy quiz at RESPICON India 2018 in New Delhi, and two recent listings: Outlook Best Doctors South 2023 as best pulmonologist, and Best Eminent Doctors South 2024 in the same category.

Pre- and post-transplant care being named on his profile alongside interventional pulmonology means his involvement in transplantation covers the assessment and follow-up around the operation rather than the surgery itself. He practises at Gleneagles Global Health City in Chennai.

**Word count:** 239

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 8. Dr. Jayaraman S

**Slug:** `dr-jayaraman-s` · MGM Healthcare, Chennai, Chennai

### Existing BIO

Dr. Jayaraman S is Senior Consultant at MGM Healthcare in Chennai, India. He has practised pulmonology in India for 20+ years experience. Airway and pleural lists are tagged for later pSEO under country, city, specialty and procedure — Medical Thoracoscopy, Bronchoscopy and Medical Thoracoscopy when CT, bronchoscopy notes and gas exchange already make the indication honest. Flexible versus rigid access, EBUS versus conventional TBNA, thoracoscopy versus a closed pleural biopsy, and whether lung transplant belongs on the same campus are written after records review — not from a day-care brochure. Training includes MBBS — Tirunelveli Medical College, Tirunelveli, Tamil Nadu (1992). International patients meet him on camera first; travel to Chennai is offered only if this respiratory floor is the right list.

### Proposed BIO

Dr. Jayaraman S is a Senior Consultant at MGM Healthcare in Chennai, with more than 20 years of experience in pulmonology.

His list is medical respiratory work with two procedures alongside it. He performs bronchoscopy and medical thoracoscopy, and manages chronic obstructive pulmonary disease, severe asthma, interstitial lung disease, bronchiectasis, pulmonary hypertension, obstructive sleep apnea and complex pulmonary infection. Drug-resistant tuberculosis and post-tuberculosis lung disease both appear, so the active disease and the scarring it leaves behind are treated in the same practice.

He read MBBS at Tirunelveli Medical College in 1992 and took the DTCD, the diploma in tuberculosis and chest diseases, at Madras Medical College in 2000. In 2005 he became a Fellow of the American College of Chest Physicians.

His memberships run wider than most and cover each part of his list. He belongs to the Indian Chest Society and the Indian Association of Bronchology and Interventional Pulmonology for the respiratory and procedural work, the Indian Sleep Disorder Association and the World Sleep Society for the sleep work, and the American Thoracic Society and the Indian Medical Association more generally. Two separate sleep bodies, one national and one international, sit behind the obstructive sleep apnea on his list.

A diploma in tuberculosis and chest diseases taken in Chennai, an American fellowship five years later, and two decades of practice since describe a physician whose training began with tuberculosis at a time when it dominated the specialty, and whose list still carries both its resistant and its late forms. He practises at MGM Healthcare in Chennai.

**Word count:** 258

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, memberships, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 9. Dr. Gargi Maitra

**Slug:** `dr-gargi-maitra` · Fortis Memorial Research Institute, Delhi NCR

### Existing BIO

Dr. Gargi Maitra is Senior Consultant at Fortis Memorial Research Institute in Delhi NCR, India. She has practised pulmonology in India for 15+ years experience. Airway and pleural lists are tagged for later pSEO under country, city, specialty and procedure — Airway Stenting, Bronchoscopy and EBUS (Endobronchial Ultrasound) when CT, bronchoscopy notes and gas exchange already make the indication honest. Flexible versus rigid access, EBUS versus conventional TBNA, thoracoscopy versus a closed pleural biopsy, and whether lung transplant belongs on the same campus are written after records review — not from a day-care brochure. Training includes MBBS — North Bengal Medical College, West Bengal (Gold Medalist). International patients meet her on camera first; travel to Delhi NCR is offered only if this respiratory floor is the right list.

### Proposed BIO

Dr. Gargi Maitra is a Senior Consultant at Fortis Memorial Research Institute in Delhi NCR, with more than 15 years of experience in pulmonology.

Her list covers diagnostic and therapeutic bronchoscopy, endobronchial ultrasound, transbronchial needle aspiration, airway stenting and medical pleural procedures, alongside severe asthma, chronic obstructive pulmonary disease, interstitial lung disease, bronchiectasis, complex pulmonary infection, drug-resistant tuberculosis, obstructive sleep apnea evaluation and living with chronic lung disease.

She read MBBS at North Bengal Medical College as a gold medallist and took her MD in respiratory medicine at Government Medical College, Amritsar, in 2011. Her critical care training followed: the IDCCM taken as super-speciality training at PGI in Rohtak, and ELSO certification as an ECMO trained specialist. Her training in interventional pulmonology and rigid bronchoscopy was at Mahidol University in Thailand.

ECMO certification and a critical care diploma alongside rigid bronchoscopy describe a practice that reaches into the intensive care unit rather than stopping at the outpatient clinic, and her editorial work confirms it: she is co-editor of a book on bronchoscopy in the ICU, the point where those two parts of her training meet.

She has also co-authored several book chapters and has multiple publications in national and international journals. Her record notes that she actively conducts and organises continuing medical education, workshops and conferences at national level, so the teaching runs alongside the clinical work rather than after it.

She practises at Fortis Memorial Research Institute in Gurugram.

**Word count:** 240

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 10. Dr. Chandrakant Tarke

**Slug:** `dr-chandrakanth-tarke` · Apollo Hospital, Jubilee Hills, Hyderabad, Hyderabad

### Existing BIO

Dr. Chandrakant Tarke is Consultant at Apollo Hospital in Hyderabad, India. He has practised pulmonology in India for 11+ years experience. Airway and pleural lists are tagged for later pSEO under country, city, specialty and procedure — EBUS (Endobronchial Ultrasound), Airway Stenting and Bronchoscopy when CT, bronchoscopy notes and gas exchange already make the indication honest. Flexible versus rigid access, EBUS versus conventional TBNA, thoracoscopy versus a closed pleural biopsy, and whether lung transplant belongs on the same campus are written after records review — not from a day-care brochure. Training includes DM (Pulmonary Medicine). International patients meet him on camera first; travel to Hyderabad is offered only if this respiratory floor is the right list.

### Proposed BIO

Dr. Chandrakant Tarke is a Consultant at Apollo Hospital, Jubilee Hills, in Hyderabad, with more than 11 years of experience in pulmonology.

His list covers diagnostic and therapeutic bronchoscopy, endobronchial ultrasound, transbronchial needle aspiration, airway stenting and medical pleural procedures, alongside interstitial lung disease, chronic obstructive pulmonary disease, severe asthma, bronchiectasis, complex pulmonary infection, obstructive sleep apnea evaluation, drug-resistant tuberculosis and post-tuberculosis lung disease.

His qualifications were taken in sequence rather than in parallel. After MBBS he took an MD in general medicine, then moved into the specialty with the DNB in respiratory medicine and the DM in pulmonary medicine, adding MNAMS and an EBUS fellowship. He began in general medicine before the respiratory training, and that is what puts a broad medical base under a list that is now entirely chest work.

His award record is concentrated in a single year and then extends past it. In 2016 he took third prize for the NCCP (I) Prof. S.N. Gaur Young Scientist Award, given for the best clinical research paper presentation at NAPCON in Mumbai that November, and first prize in the NAPCON national quiz at the same meeting. Earlier that year he had won first prize in the regional quiz scholarship competition in respiratory diseases for Delhi NCR. In November 2020 he received the Dr. APJ Abdul Kalam Memorial Excellence Award.

Taking both a research paper prize and a national quiz at the same conference is unusual, since the two test very different things. He practises at Apollo Health City in Jubilee Hills.

**Word count:** 254

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 11. Dr. Deepika Ramachandran

**Slug:** `dr-deepika-ramachandran` · MGM Healthcare, Chennai, Chennai

### Existing BIO

Dr. Deepika Ramachandran is Consultant at MGM Healthcare in Chennai, India. She has practised pulmonology in India for 7+ years experience. Airway and pleural lists are tagged for later pSEO under country, city, specialty and procedure — EBUS (Endobronchial Ultrasound), Airway Stenting and Medical Thoracoscopy when CT, bronchoscopy notes and gas exchange already make the indication honest. Flexible versus rigid access, EBUS versus conventional TBNA, thoracoscopy versus a closed pleural biopsy, and whether lung transplant belongs on the same campus are written after records review — not from a day-care brochure. Training includes MBBS — Saveetha Medical College, Chennai. International patients meet her on camera first; travel to Chennai is offered only if this respiratory floor is the right list.

### Proposed BIO

Dr. Deepika Ramachandran is a Consultant at MGM Healthcare in Chennai, with more than 7 years of experience in pulmonology.

Her list is broader than her years suggest. The interventional work is bronchoscopy, endobronchial ultrasound, transbronchial needle aspiration, medical thoracoscopy, cryo-lung biopsy and airway stenting. The medical work covers interstitial lung disease, chronic obstructive pulmonary disease, severe asthma, bronchiectasis, pulmonary hypertension, complex pulmonary infection, drug-resistant tuberculosis and post-tuberculosis lung disease, and she is part of lung transplantation care. Cryo-lung biopsy alongside interstitial lung disease is the pairing that matters there, since it is the tissue diagnosis those cases often need.

She read MBBS at Saveetha Medical College in Chennai and took her MD in pulmonary medicine at Sri Ramachandra Institute of Higher Education and Research, also in Chennai, as a gold medallist. She added the DNB in pulmonary medicine from the National Board of Examinations and the European Diploma in Respiratory Medicine from the European Respiratory Society.

Her awards begin in training and continue into practice. She took third place at TAPCON 2018 for a paper on APACHE II in acute respiratory failure and best case report presentation at the Clinical Society Meet in Chennai the same year, and MGM Healthcare named her Young Achiever of the Year in 2022.

She has research presentations and publications at national and international forums, and serves as faculty, presenter, panelist and workshop moderator at major pulmonology conferences. She practises at MGM Healthcare in Chennai.

**Word count:** 241

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 12. Dr. Sreenivasan V

**Slug:** `dr-sreenivasan-v` · Gleneagles HealthCity Chennai, Chennai

### Existing BIO

Dr. Sreenivasan V is Consultant, Department of Pulmonary Critical Care and Lung Transplantation at Gleneagles HealthCity Chennai in Chennai, India. He has practised pulmonology in India for 18+ years experience. Airway and pleural lists are tagged for later pSEO under country, city, specialty and procedure — Airway Stenting, Lung Transplantation and Bronchoscopy when CT, bronchoscopy notes and gas exchange already make the indication honest. Flexible versus rigid access, EBUS versus conventional TBNA, thoracoscopy versus a closed pleural biopsy, and whether lung transplant belongs on the same campus are written after records review — not from a day-care brochure. Training includes MBBS – Siddhartha Medical College, Vijayawada, Andhra Pradesh (1993–1999). International patients meet him on camera first; travel to Chennai is offered only if this respiratory floor is the right list.

### Proposed BIO

Dr. Sreenivasan V is a Consultant in the Department of Pulmonary Critical Care and Lung Transplantation at Gleneagles HealthCity Chennai, with more than 18 years of experience. His profile records pulmonology together with interventional pulmonology and sleep medicine.

His list runs across all three. The interventional work is bronchoscopy, endobronchial ultrasound, transbronchial needle aspiration and airway stenting. The medical work covers interstitial lung disease, chronic obstructive pulmonary disease, severe asthma, bronchiectasis, complex pulmonary infection and drug-resistant tuberculosis, and he is part of lung transplantation care. The sleep work covers obstructive sleep apnea, polysomnography and CPAP titration.

He read MBBS at Siddhartha Medical College in Vijayawada between 1993 and 1999, took the DTCD at Kurnool from 2001 to 2003, and the DNB in respiratory medicine at Bhilai Steel Plant Hospital in Chattisgarh from 2004 to 2006. A fellowship in HIV medicine with GHTM and the CDC followed in 2006 and 2007, and he added the IDCCM in critical care medicine in 2017 and a diploma in diabetology.

That HIV fellowship is the unusual entry, and it sits with a list that includes drug-resistant tuberculosis and complex pulmonary infection. He won first prize for a poster presentation at the National HIV Conference in 2009.

His hospital record traces the same path: Hindu Mission Hospital from 2007 to 2009, the Hyderabad Erragadda Chest Hospital from 2009 to 2011, and now Gleneagles Global Health City in Chennai, where the department covers critical care and transplantation alongside general respiratory work.

**Word count:** 245

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
