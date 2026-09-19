# Doctor BIO rewrite — test batch 01 (India · Radiation Oncology)

**Status: REVIEW ONLY. Nothing has been written to `content/catalog-cms.json` or any other production data.**

Source of truth for every bio below is the individual doctor's existing GAF profile record in
`src/data/ginger-catalog.json` (`doctors[]`): name, specialty, designation, hospital, city,
experience, qualifications, specializations, proceduresExpertise, education, affiliations,
memberships, awards, research, and the doctor's own existing bio. No external site, no web
research, no other doctor's record was used.

On approval, the only write is `doctorOverrides["<slug>"] = { "bio": "<new text>" }` in
`content/catalog-cms.json`. That overlay is filtered through `DOCTOR_OVERLAY_KEYS` and cannot
touch any `PSEO_LOCKED_KEYS` field (slug, city, country, specialty, procedure, hospital mappings).

Accepted consequence per approval: the Physician structured-data `description` in
`src/lib/seo.ts` derives from the bio and will follow the new text. No schema or
meta-description code is being changed.

---

## Batch summary

| # | Doctor | City | Old words | New words | Status |
|---|---|---|---|---|---|
| 1 | Dr. Ashwin M Shah | Hyderabad | 194 | 269 | READY FOR REVIEW |
| 2 | Dr. Dodul Mondal | Delhi NCR | 197 | 269 | READY FOR REVIEW |
| 3 | Dr. Sridhar P S | Bengaluru | 189 | 264 | READY FOR REVIEW |
| 4 | Dr. Pradeep Kumar Karumanchi | Hyderabad | 204 | 261 | READY FOR REVIEW |
| 5 | Dr. Naman Utreja | Delhi NCR | 195 | 273 | READY FOR REVIEW |
| 6 | Dr. M. Janarthinakani | Chennai | 192 | 269 | READY FOR REVIEW |
| 7 | Dr. S. Alex Antony Prasad | Chennai | 210 | 267 | READY FOR REVIEW |
| 8 | Dr. Dipali Bhorikar Borade | Mumbai | 177 | 260 | READY FOR REVIEW |
| 9 | Dr. Anil Kumar Anand | Delhi NCR | 197 | 257 | READY FOR REVIEW |
| 10 | Dr. B. Ramakrishna Prasad | Hyderabad | 150 | — | **FLAGGED — INSUFFICIENT SOURCE INFORMATION** |

Word counts are verified by `scripts/check-bio-batch.mjs`, which also re-checks every capitalised
term, degree, institution and year in each proposed bio against that doctor's own source record.

---

## 1. Dr. Ashwin M Shah

**Slug:** `dr-ashwin-m-shah` · Apollo Hospital, Jubilee Hills, Hyderabad

### Existing BIO

Dr. Ashwin M Shah is a Senior Consultant in Radiation Oncology at Apollo Hospital, Jubilee Hills, Hyderabad, with 31+ years of experience. His radiation practice includes external-beam radiotherapy, intensity-modulated radiation therapy, image-guided radiation therapy and 3D conformal radiotherapy. He also has expertise in stereotactic body radiation therapy, stereotactic radiosurgery, CyberKnife radiosurgery, intraoperative radiation therapy, and intracavitary and interstitial brachytherapy.

Dr. Shah holds MBBS, MD and DNB qualifications in radiotherapy, a Fellowship in Brachytherapy and FIRO. His brachytherapy fellowship was part of a collaborative programme involving Memorial Sloan Kettering Cancer Center and Apollo Hospitals, with training exposure at Tata Memorial Hospital and Gujarat Cancer Research Institute. His previous affiliations include KIMS Hospital, Yashoda Hospitals, Nizam's Institute of Medical Sciences, Basavatarakam Indo-American Cancer Hospital and Government General Hospital in Tirupati. His academic interests include chemoradiotherapy in oesophageal and cervical cancers, hypofractionated radiation, and brachytherapy for cervical and endometrial cancers. He has also contributed to studies involving brain metastases, breast cancer and prostate cancer, as well as research on IMRT, image guidance and 3D conformal techniques. His professional associations include the American Society for Radiation Oncology and the Indian radiation-oncology body represented by his FIRO credential.

### Proposed BIO

Dr. Ashwin M Shah is a Senior Consultant in Radiation Oncology at Apollo Hospital, Jubilee Hills, Hyderabad, and has worked in the field for more than 31 years.

His listed radiation practice covers the conventional and conformal range — external beam radiotherapy, 3D conformal radiotherapy, intensity-modulated radiation therapy and image-guided radiation therapy — together with the focused techniques used for smaller, well-defined targets: stereotactic body radiation therapy, stereotactic radiosurgery and CyberKnife radiosurgery. He also performs intraoperative radiation therapy.

Brachytherapy is a distinct strand of his work, covering both intracavitary and interstitial placement. After MBBS, MD (Radiotherapy) and DNB (Radiotherapy), he completed a Fellowship in Brachytherapy through a collaborative programme involving Memorial Sloan Kettering Cancer Center and Apollo Hospitals, with training exposure at Tata Memorial Hospital and the Gujarat Cancer Research Institute. He also trained for a year at S.V. Medical College, Tirupati, through RIMS Hospital, and holds the FIRO national fellowship of the Indian Association of Radiation Oncologists.

Before Apollo Health City in Jubilee Hills, Dr. Shah was associated with KIMS Hospital and Yashoda Hospitals in Hyderabad, the Indo-American Cancer Hospital and Research Institute, Nizam's Institute of Medical Sciences, Basavatarakam Indo-American Cancer Hospital, and Government General Hospital in Tirupati.

He has authored and co-authored peer-reviewed publications on chemoradiotherapy in oesophageal and cervical cancers, hypofractionated radiation outcomes, and brachytherapy for cervical and endometrial cancers, alongside studies on brain metastases, breast cancer and prostate cancer, radiation technique comparisons across IMRT, 3D conformal radiotherapy and IGRT, and concurrent chemoradiation versus radiation alone in solid tumours. He is a member of ASTRO and of the Indian Association of Radiation Oncologists across all chapters.

**Word count:** 269

**Existing GAF profile fields used:** name, designation, specialty, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, research, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** READY FOR REVIEW

---

## 2. Dr. Dodul Mondal

**Slug:** `dr-dodul-mondal` · Max Super Speciality Hospital, Saket, Delhi NCR

### Existing BIO

Dr. Dodul Mondal is Principal Director of Radiation Oncology at Max Super Speciality Hospital, Saket, Delhi NCR. His clinical interests include musculoskeletal tumours, head-and-neck cancer, neuro-oncology, breast cancer, gastrointestinal and hepatobiliary cancers, thoracic cancers and paediatric oncology. His radiation expertise encompasses proton beam therapy, image-guided radiation therapy, stereotactic body radiation therapy, stereotactic radiosurgery and CyberKnife radiosurgery. He also works with brachytherapy and total body irradiation.

Dr. Mondal completed an MBBS with honours and a gold medal, followed by MD and DNB qualifications in Radiation Oncology. He undertook a UICC fellowship in the United States and additional US fellowship training in precision radiation oncology and proton beam therapy. His previous appointments include Indraprastha Apollo Hospitals, the National Cancer Institute at AIIMS Delhi and Dharamshila Narayana Hospital. His professional memberships span the Indian College of Radiation Oncology, National Academy of Medical Sciences, European Society for Radiotherapy and Oncology, American Society for Radiation Oncology, American Brachytherapy Society, Association of Radiation Oncologists of India and Indian Society of Oncology. His academic honours include a 2016 UICC-ICRETT fellowship and travel support associated with presentations at the 2016 World Cancer Congress in Paris and the 2015 St Gallen Breast Cancer Conference in Vienna.

### Proposed BIO

Dr. Dodul Mondal is Principal Director of Radiation Oncology at Max Super Speciality Hospital, Saket, in Delhi NCR, with more than 18 years in the specialty.

The cancers he works with are broad: musculoskeletal tumours, head-and-neck cancer, neuro-oncology, breast cancer, gastrointestinal and hepatobiliary cancers, thoracic cancers and paediatric oncology. His profile also records involvement in surgical oncology across head and neck, breast, gastrointestinal and thoracic sites, which places his radiation planning alongside the surgical side of those programmes.

Technically, his listed expertise includes proton beam therapy, image-guided radiation therapy, stereotactic body radiation therapy, stereotactic radiosurgery and CyberKnife radiosurgery, as well as brachytherapy and total body irradiation.

Dr. Mondal completed MBBS with honours and a gold medal, then MD and DNB in Radiation Oncology. He went on to a UICC fellowship in the United States and further US fellowship training in precision radiation oncology and proton beam therapy, which is consistent with the proton work listed on his profile. Before Max Healthcare he was at Indraprastha Apollo Hospitals in New Delhi, the National Cancer Institute at AIIMS Delhi, and Dharamshila Narayana Hospital.

He is a member of the Indian College of Radiation Oncology, the National Academy of Medical Sciences, India, ESTRO, ASTRO, the American Brachytherapy Society, the Association of Radiation Oncologists of India, and the Indian Society of Oncology. His recognitions include the UICC-ICRETT Fellowship awarded in 2016 by the Union for International Cancer Control, a CSIR travel grant for the 2016 World Cancer Congress in Paris, and travel grants from the St Gallen Cancer Committee and ICMR for the 14th St Gallen Breast Cancer Conference in Vienna in 2015.

**Word count:** 269

**Existing GAF profile fields used:** name, designation, hospitalName, city, experience, qualifications, specializations, proceduresExpertise, education, affiliations, memberships, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** READY FOR REVIEW

---

## 3. Dr. Sridhar P S

**Slug:** `dr-sridhar-p-s` · Apollo Hospitals, Bannerghatta Road, Bengaluru

### Existing BIO

Dr. Sridhar P S is a Consultant in Radiation Oncology at Apollo Hospitals, Bannerghatta Road, Bengaluru, with 28+ years of experience. His practice spans intensity-modulated radiation therapy, image-guided radiation therapy, 3D conformal radiotherapy and external beam radiotherapy. He also works with stereotactic body radiation therapy and stereotactic radiosurgery (SRS), along with CyberKnife and Gamma Knife radiosurgery.

Brachytherapy is another part of Dr. Sridhar's clinical expertise, including both intracavitary and interstitial techniques. His qualifications include a Diploma in Radiation Therapy (DMRT), Diplomate of National Board training in radiotherapy and Fellowship of the Royal College of Radiologists (FRCR). He is proficient in English, Kannada and Hindi.

Dr. Sridhar has served as President of the Association of Radiation Oncologists of India and has held roles connected with the Neuro Oncology Society in Bengaluru and the Indian Association of Hyperthermic Oncology. His professional memberships include ASTRO, ASCO, AROI and ESMO. His distinctions include international and travelling fellowships, a Commonwealth Fellowship focused on cancer research in the United Kingdom, and a teaching scholarship. This combination of clinical practice, professional leadership and fellowship experience supports his work across conformal, image-guided, stereotactic and brachytherapy techniques.

### Proposed BIO

Dr. Sridhar P S is a Consultant in Radiation Oncology at Apollo Hospitals, Bannerghatta Road, Bengaluru, with more than 28 years in the specialty.

His listed techniques run from the established to the highly focused. Day-to-day work includes external beam radiotherapy, 3D conformal radiotherapy, intensity-modulated radiation therapy and image-guided radiation therapy. Where a target is small and sharply defined, his profile records stereotactic body radiation therapy and stereotactic radiosurgery, delivered with CyberKnife and Gamma Knife radiosurgery. Brachytherapy forms a separate part of the practice and covers both intracavitary and interstitial placement.

His qualifications are DMRT, a Diploma in Radiation Therapy, DNB training in radiotherapy, and FRCR, Fellow of the Royal College of Radiologists. He is proficient in English, Kannada and Hindi.

Alongside clinical work, Dr. Sridhar has held a substantial amount of professional office. He has served as President of the Association of Radiation Oncology of India, as Joint Secretary of the Association of Radiation Oncologists of India, as Joint Secretary of the Neuro Oncology Society in Bangalore, and as Secretary of the Indian Association of Hyperthermic Oncology. His memberships include ASTRO, ASCO, AROI, ESMO, and the Indian Academy of Medical Sciences with the National Malhotra Society of Medical Oncology.

His fellowships and awards are recorded across several years: an International and Travelling Fellowship in Radiation Oncologists of India from 2003 to 2007, the Best Association of Radiation Oncologists of India Fellowship for 2007–2008, a Commonwealth Fellowship from 2005 to 2006 covering cancer research from India to the United Kingdom, and a Teaching Scholarship awarded by the Bihar Pradesh chapter of AROI in 2009.

**Word count:** 264

**Existing GAF profile fields used:** name, designation, hospitalName, city, experience, qualifications, proceduresExpertise, education, memberships, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** READY FOR REVIEW

---

## 4. Dr. Pradeep Kumar Karumanchi

**Slug:** `dr-pradeep-kumar-karumanchi` · Yashoda Hospitals, Somajiguda, Hyderabad

### Existing BIO

Dr. Pradeep Kumar Karumanchi is a Consultant Radiation Oncologist at Yashoda Hospitals, Somajiguda, Hyderabad, with 16+ years of experience. He treats head and neck, brain, breast, lung, prostate, gastrointestinal, and gynaecological cancers with radiation and has additional training in thoracic and uro-oncology. His technical scope includes CyberKnife radiosurgery, SRS, SBRT, image-guided radiation therapy, brachytherapy, and total body irradiation. He is also trained in MR-LINAC, adaptive MRI-guided radiotherapy, 4D gated radiation therapy, hypofractionation, and functional radiosurgery for selected benign conditions.

Dr. Karumanchi earned his MBBS at Osmania Medical College in Hyderabad and his DNB in Radiation Oncology at Healthcare Global Cancer Hospital. His further education includes precision oncology at the University of Geneva, thoracic oncology at the University of Michigan, and CyberKnife CNS and physician training through Accuray in the United States. He also holds ECFMG certification and has undertaken training at Memorial Sloan Kettering Cancer Center.

His professional memberships include the American Society of Clinical Oncology, Association of Radiation Oncologists of India, Bangalore Oncology Group, and International Association of Oncology, where he serves on the executive committee. He is also an organising committee member of the Asia Pacific Cancer Congress. His academic interests include radiomics, artificial intelligence in oncology, scientific publication, and conference presentation.

### Proposed BIO

Dr. Pradeep Kumar Karumanchi is a Consultant Radiation Oncologist at Yashoda Hospitals, Somajiguda, Hyderabad, with more than 16 years of experience.

He treats head and neck, brain, breast, lung, prostate, gastrointestinal and gynaecological cancers with radiation, and has additional training in thoracic and uro-oncology. His technical scope is recorded as CyberKnife radiosurgery, stereotactic radiosurgery, stereotactic body radiation therapy, image-guided radiation therapy, brachytherapy and total body irradiation. He is also trained in MR-LINAC and adaptive MRI-guided radiotherapy, 4D gated radiation therapy, hypofractionation, and functional radiosurgery for selected benign conditions.

His training is split between India and abroad. He completed MBBS at Osmania Medical College in Hyderabad and DNB in Radiation Oncology at Healthcare Global Cancer Hospital. He then studied precision oncology at the Université de Genève in Switzerland and thoracic oncology at the University of Michigan in the United States, completed CyberKnife CNS and physician training with Accuray in the United States, and has undertaken training at Memorial Sloan Kettering Cancer Center. He holds ECFMG certification.

Dr. Karumanchi is a member of the American Society of Clinical Oncology, the Association of Radiation Oncologists of India and the Bangalore Oncology Group. He sits on the executive committee of the International Association of Oncology, the organising committee of the Asia Pacific Cancer Congress, and the international core group of the student movement of International Physicians for the Prevention of Nuclear War. His recognitions include India's Best Doctor Award for Excellence in Oncology in 2024 and the APJ Abdul Kalam Health Awards the same year. His academic interests include radiomics and artificial intelligence in oncology.

**Word count:** 261

**Existing GAF profile fields used:** name, designation, hospitalName, city, experience, qualifications, proceduresExpertise, education, memberships, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** READY FOR REVIEW

---

## 5. Dr. Naman Utreja

**Slug:** `dr-naman-utreja` · Sarvodaya Hospital, Faridabad, Delhi NCR

### Existing BIO

Dr. Naman Utreja is Head of Department and Senior Consultant in Radiation Oncology at Sarvodaya Hospital, Faridabad, Delhi NCR, with 13+ years of experience. His radiation oncology practice covers head and neck, thoracic, breast, gynaecological, musculoskeletal, genitourinary, and paediatric cancers. He also works in geriatric oncology and pain, palliative, and end-of-life oncology care. His radiotherapy techniques include image-guided radiation therapy, VMAT, RapidArc, stereotactic body radiation therapy, stereotactic radiosurgery, and brachytherapy.

Dr. Utreja completed his MBBS at MGM Medical College in Aurangabad, Maharashtra, and his MD in Radiation Oncology at Swami Rama Himalayan Institute in Dehradun. He also holds a fellowship in treating oncology patients during COVID-19 from Scientia in Los Angeles. His earlier affiliations include Fortis Hospital Noida, Max hospitals in Shalimar Bagh and Saket, Asian Institute and Hospital in Faridabad, and Medanta – The Medicity in Gurgaon.

His academic work includes neuro-oncology research and a presentation on SBRT and SRS. He served as a co-investigator in multi-institutional phase III studies concerning lung cancer and prostate cancer. Dr. Utreja is a life member of the Association of Radiation Oncologists of India and its North Zone association, and a member of the ICAN Care Tobacco Control Initiative.

### Proposed BIO

Dr. Naman Utreja is Head of Department and Senior Consultant in Radiation Oncology at Sarvodaya Hospital, Sector 8, Faridabad, in Delhi NCR, with more than 13 years of experience.

His practice covers head and neck, thoracic, breast, gynaecological, musculoskeletal, genitourinary and paediatric cancers, and his profile also lists medical oncology among his specializations. Two further areas are recorded separately: geriatric oncology, and pain, palliative and end-of-life oncology care. His radiotherapy techniques include image-guided radiation therapy, VMAT and RapidArc, stereotactic body radiation therapy, stereotactic radiosurgery and brachytherapy.

Dr. Utreja completed MBBS at MGM Medical College in Aurangabad, Maharashtra, and MD in Radiation Oncology at the Swami Rama Himalayan Institute in Dehradun. He also holds a fellowship in treating oncology patients during COVID-19 from Scientia in Los Angeles. Before Sarvodaya, he was associated with the GS Cancer Research Institute and Medical College, Fortis Hospital in Noida, Max Hospital at Shalimar Bagh and at Saket, the Asian Institute and Hospital in Faridabad, and Medanta – The Medicity in Gurgaon.

His academic record is documented across several years. He published in AROICON neuro-oncology in 2014, took second prize in the best paper category in neuro-oncology in 2015, presented a poster at NZAROICON in Hisar in 2017, was faculty at the Breast Cancer Contouring Masterclass at Max Hospital PPG in 2018, and gave an oral presentation at the SBRT and SRS Masterclass at Medanta in 2019. He was a co-investigator on the multi-institutional phase III KINDLE lung cancer study in 2020 and a phase III prostate cancer study in 2022. He is a life member of the Association of Radiation Oncologists of India and its North Zone association.

**Word count:** 273

**Existing GAF profile fields used:** name, designation, hospitalName, city, experience, specializations, proceduresExpertise, education, affiliations, memberships, awards, research, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** READY FOR REVIEW

---

## 6. Dr. M. Janarthinakani

**Slug:** `dr-m-janarthinakani` · Rela Hospital, Chennai

### Existing BIO

Dr. M. Janarthinakani is a Senior Consultant in Radiation Oncology at Rela Hospital in Chennai, with 25+ years of experience. Clinical work includes cancer radiotherapy, image-guided and intensity-modulated radiation therapy, stereotactic body radiation therapy, and brachytherapy. Areas of disease-specific study include cervical cancer and hypopharyngeal carcinoma, particularly their radiation management.

Dr. Janarthinakani earned an MBBS from Madurai Medical College after studying there from 1995 to 2001, then completed an MD in Radiation Oncology at Cancer Institute Adyar (WIA), Chennai, between 2001 and 2004. Further preparation includes a certified palliative-care course and hands-on training in molecular-oncology techniques sponsored by India's Department of Science and Technology. Dr. Janarthinakani also passed the ESMO examination in Chennai in 2016.

Research experience includes co-investigator roles in phase III studies involving metastatic colorectal cancer and cancers of the gastric–esophageal junction. A dissertation explored hyperthermia for locally advanced cervical carcinoma, while a presentation at the 2005 Tamil Nadu state AROI meeting examined postoperative irradiation compared with irradiation alone in hypopharyngeal carcinoma.

Previous appointments include Cancer Institute Adyar, Government Medical College Tuticorin, RGGGH–BIRO, Kumaran Hospital, Billroth Hospital, and Apollo Hospital Teynampet. Professional memberships include AROI and ICON.

### Proposed BIO

Dr. M. Janarthinakani is a Senior Consultant in Radiation Oncology at Rela Hospital in Chennai, with more than 25 years of experience and medical oncology listed alongside radiation oncology among his specializations.

His clinical work covers radiation therapy for cancer, image-guided and intensity-modulated radiation therapy, stereotactic body radiation therapy and brachytherapy. His profile also records chemotherapy for cancer and cancer immunotherapy, and two disease sites where he handles the radiation management specifically: cervical cancer and hypopharyngeal cancer.

He completed MBBS at Madurai Medical College in Tamil Nadu between 1995 and 2001, then MD in Radiation Oncology at Cancer Institute Adyar (WIA) in Chennai between 2001 and 2004. In February 2004 he undertook hands-on training in newer techniques in molecular oncology sponsored by the Department of Science and Technology in New Delhi. He completed a certified palliative training course at the Lakshmi Palliative Care Centre in 2016 and passed the ESMO examination in Chennai on 8 October of the same year.

His research includes co-investigator roles in a phase III study of chemotherapy plus immunotherapy in metastatic colorectal cancer between 2008 and 2010, and a phase III gastric–oesophageal junction study between 2009 and 2012. His dissertation examined the role of hyperthermia in managing locally advanced carcinoma of the uterine cervix, and at the 2005 Tamil Nadu state AROI meeting he presented on surgery followed by postoperative irradiation compared with irradiation alone in hypopharyngeal carcinoma.

Earlier appointments include Cancer Institute (WIA) Adyar, Government Medical College Tuticorin, RGGGH–BIRO in Chennai, Kumaran Hospital under the Madras Cancer Care Foundation, Billroth Hospital and Apollo Hospital Teynampet. He is a member of AROI and ICON.

**Word count:** 269

**Existing GAF profile fields used:** name, designation, hospitalName, city, experience, specializations, proceduresExpertise, education, affiliations, memberships, research, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** READY FOR REVIEW

---

## 7. Dr. S. Alex Antony Prasad

**Slug:** `dr-s-alex-antony-prasad` · MGM Healthcare, Chennai

### Existing BIO

Dr. S. Alex Antony Prasad is a Senior Consultant in Radiation Oncology at MGM Healthcare in Chennai, with 30+ years of experience. His clinical focus includes brain tumours, head and neck cancers, breast cancers and other solid tumours. He uses a range of radiation approaches, including image-guided radiation therapy, stereotactic body radiation therapy, stereotactic radiosurgery, brachytherapy, total body irradiation and plaque brachytherapy.

Dr. Prasad completed his MBBS at Madurai Kamaraj University. He then trained at Tata Memorial Hospital, earning a DMRT in Medical Radiation Therapy and an MD in Radiotherapy and Clinical Oncology through the University of Bombay. He later completed the DNB in Radiotherapy from the National Board of Examinations in New Delhi. His international experience includes an International Outreach Fellowship at St. Jude Children's Research Hospital in the United States and training at Christie Hospital in the United Kingdom.

His professional responsibilities have extended to specialty leadership and academic service. He has served as President of the Tamil Nadu and Puducherry chapter of the Association of Radiation Oncologists of India and as National Joint Secretary of the Indian Brachytherapy Society. He has also participated in the ASTRO International Committee and UICC International Review Panel and served on the editorial board of the South Asian Journal of Cancer.

### Proposed BIO

Dr. S. Alex Antony Prasad is a Senior Consultant in Radiation Oncology at MGM Healthcare in Chennai, with more than 30 years of experience and medical oncology recorded alongside radiation oncology among his specializations.

His clinical focus is brain tumours, head and neck cancers, breast cancers and other solid tumours. The techniques listed on his profile include image-guided radiation therapy, stereotactic body radiation therapy and stereotactic radiosurgery, along with brachytherapy, plaque brachytherapy and total body irradiation.

His training was largely completed at two of the institutions most associated with Indian radiotherapy. After MBBS at Madurai Kamaraj University, he took a DMRT in Medical Radiation Therapy and an MD in Radiotherapy and Clinical Oncology at Tata Memorial Hospital through the University of Bombay, then the DNB in Radiotherapy from the National Board of Examinations in New Delhi. Internationally, he was an International Outreach Fellow at St. Jude Children's Research Hospital in the United States and trained at Christie Hospital in the United Kingdom.

Beyond MGM Healthcare and MGM Cancer Institute, he is a visiting consultant at Kauvery Hospital, Kovilambakkam, and Dr. Rai Memorial Hospital. He has served as President of the Tamil Nadu and Puducherry chapter of the Association of Radiation Oncologists of India and as National Joint Secretary of the Indian Brachytherapy Society. He is a member of the ASTRO International Committee and the UICC International Review Panel, an editorial board member of the South Asian Journal of Cancer, and has been faculty, speaker and panelist at ASCO, ESMO, ESTRO and AROI meetings. He received the Best Doctor Award from The Tamil Nadu Dr. M.G.R. Medical University.

**Word count:** 267

**Existing GAF profile fields used:** name, designation, hospitalName, city, experience, qualifications, specializations, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** READY FOR REVIEW

---

## 8. Dr. Dipali Bhorikar Borade

**Slug:** `dr-dipali-bhorikar-borade` · Apollo Hospitals, Navi Mumbai

### Existing BIO

Dr. Dipali Bhorikar Borade is a Consultant in Radiation Oncology at Apollo Hospitals, Navi Mumbai, Mumbai. Her disease-site focus includes gastrointestinal, head-and-neck, breast and gynaecological cancers. She works with intensity-modulated radiation therapy, image-guided radiation therapy, 3D conformal radiotherapy, stereotactic body radiation therapy and external-beam radiotherapy. Her radiation expertise also includes CyberKnife radiosurgery and both intracavitary and interstitial brachytherapy.

Dr. Borade holds an MBBS, an MD in Radiation Oncology and a DNB in Radiation Oncology. Her advanced credentials and training cover ECRT, ARRT, IGRT, VMAT, SRS and SBRT. She has trained or worked at Tata Memorial Hospital in Mumbai, Homi Bhabha Cancer Hospital in Varanasi, Mahatma Gandhi Cancer Hospital in Visakhapatnam, Maharashtra Cancer Centre in Pune and Apollo Hospital in Navi Mumbai. She is associated with the Association of Radiation Oncologists of India. Her academic activity includes oral-presentation recognition at a European Society for Radiotherapy and Oncology meeting in Barcelona, presentations at national AROI forums and poster presentations at international oncology conferences. Her peer-reviewed work has addressed stereotactic body radiotherapy, treatment combinations and outcomes across several cancer types.

### Proposed BIO

Dr. Dipali Bhorikar Borade is a Consultant in Radiation Oncology at Apollo Hospitals, Navi Mumbai, with more than nine years of experience.

Her disease-site focus is gastrointestinal, head-and-neck, breast and gynaecological cancers. The techniques recorded on her profile include intensity-modulated radiation therapy, image-guided radiation therapy, 3D conformal radiotherapy, external beam radiotherapy and stereotactic body radiation therapy, together with CyberKnife radiosurgery. Brachytherapy forms a separate part of her practice and covers both intracavitary and interstitial placement. Her profile also lists chemotherapy for solid tumours and adjuvant chemotherapy, the drug treatment given after primary treatment to reduce the chance of recurrence.

Dr. Borade holds an MBBS, an MD in Radiation Oncology and a DNB in Radiation Oncology, and her listed qualifications extend to advanced certifications and training in ECRT, ARRT, IGRT, VMAT, SRS and SBRT. Her training and previous posts span Tata Memorial Hospital in Mumbai, Homi Bhabha Cancer Hospital in Varanasi, Mahatma Gandhi Cancer Hospital in Vizag, Maharashtra Cancer Centre in Pune, and Apollo Hospital in Navi Mumbai, where she now practises.

Her academic record sits alongside that clinical work. She received oral presentation awards at a Best Paper session of the European Society for Radiotherapy and Oncology meeting in Barcelona, has presented papers at AROI national conferences and symposia, and has given multiple poster presentations at international cancer conferences including ESMO and ASTRO related forums. Her peer-reviewed publications have covered stereotactic body radiotherapy, chemotherapy combinations, and treatment outcomes across several cancer types.

She is a member of the Association of Radiation Oncologists of India and of the Indian Medical Council.

**Word count:** 260

**Existing GAF profile fields used:** name, designation, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, memberships, awards, existing bio.

**New factual information introduced:** NONE. The "more than nine years of experience" sentence uses the `experience` field ("9+ Years Experience"), which the existing bio omitted.

**Other fields that would change:** NONE (bio only)

**Status:** READY FOR REVIEW

---

## 9. Dr. Anil Kumar Anand

**Slug:** `dr-anil-kumar-anand` · Fortis Memorial Research Institute, Delhi NCR

### Existing BIO

Dr. Anil Kumar Anand is Principal Director and Head of the Department of Radiation Oncology at Fortis Memorial Research Institute in Delhi NCR. His practice encompasses a broad range of external-beam and brachytherapy approaches, including stereotactic body radiation therapy (SBRT), stereotactic radiosurgery (SRS), intensity-modulated radiation therapy, image-guided radiation therapy and 3D conformal radiotherapy. He also has expertise in CyberKnife radiosurgery, intraoperative radiation therapy, conventional external-beam radiotherapy, and intracavitary and interstitial brachytherapy. His background in head-and-neck oncology includes specialist radiotherapy training at The Middlesex Hospital Medical School in London.

Dr. Anand earned his MBBS from Dayanand Medical College in Ludhiana and completed an MD in Radiotherapy and Oncology at the Post Graduate Institute of Medical Education and Research in Chandigarh. He later pursued radiation-therapy training at New York Hospital Medical Centre of Queens in the United States. Before joining Fortis Memorial Research Institute, he worked at institutions including Max Hospital, Saket; Rajiv Gandhi Cancer Institute; Batra Hospital; and PGI Chandigarh. His professional memberships include the Indian Society of Oncology, the American Society for Radiation Oncology and the Association of Radiation Oncologists of India. He also serves on the editorial board of the Journal of Cancer Research and Therapeutics.

### Proposed BIO

Dr. Anil Kumar Anand is Principal Director and Head of the Department of Radiation Oncology at Fortis Memorial Research Institute in Delhi NCR, with more than 33 years of experience.

His practice spans both the external-beam and brachytherapy sides of the specialty. On the external-beam side his profile lists conventional external beam radiotherapy, 3D conformal radiotherapy, intensity-modulated radiation therapy and image-guided radiation therapy, alongside the focused techniques used for compact targets: stereotactic body radiation therapy, stereotactic radiosurgery and CyberKnife radiosurgery. He also performs intraoperative radiation therapy, delivered during surgery, and works with intracavitary and interstitial brachytherapy.

Head-and-neck oncology is a distinct thread in his background. After MBBS at Dayanand Medical College in Ludhiana and an MD in Radiotherapy and Oncology at the Post Graduate Institute of Medical Education and Research in Chandigarh, he completed specialised training in radiation therapy at the New York Hospital Medical Centre of Queens in the United States and specialised training in radiotherapy of head and neck cancers at The Middlesex Hospital Medical School in London.

Before Fortis Memorial Research Institute in Gurgaon, he worked at Max Hospital in Saket, the Rajiv Gandhi Cancer Institute, Batra Hospital in New Delhi, the Medical Research Center in New Delhi, and PGI Chandigarh.

Dr. Anand is a member of the Indian Society of Oncology, the American Society of Radiation Oncology and the Association of Radiation Oncologists of India. He has served as an advisor to ICRO, the WHO and other UN organisations, and is an editorial board member of the Journal of Cancer Research and Therapeutics.

**Word count:** 257

**Existing GAF profile fields used:** name, designation, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, memberships, existing bio.

**New factual information introduced:** NONE. The "more than 33 years" sentence uses the `experience` field ("33+ Years Experience"), which the existing bio omitted.

**Other fields that would change:** NONE (bio only)

**Status:** READY FOR REVIEW

---

## 10. Dr. B. Ramakrishna Prasad — FLAGGED FOR MANUAL REVIEW

**Slug:** `dr-b-ramakrishna-prasad` · Yashoda Hospitals, Secunderabad, Hyderabad

### Existing BIO

Dr. B. Ramakrishna Prasad is a Consultant Radiation Oncologist at Yashoda Hospitals, Secunderabad, Hyderabad. He provides radiation care for adult and paediatric malignancies, drawing on experience with both externally delivered treatment and brachytherapy. His technical expertise includes stereotactic body radiation therapy and stereotactic radiosurgery, two focused approaches used within radiation oncology. He also works with brachytherapy and plaque brachytherapy.

Dr. Prasad holds an MD in Radiation Oncology and is based at Yashoda Hospitals in Secunderabad. His practice brings together several distinct methods of delivering radiation. Stereotactic treatment directs radiation at defined targets from outside the body, while brachytherapy positions a radiation source close to the treatment area. Plaque brachytherapy is a further component of his expertise. This range of modalities supports his work with cancer cases across adult and paediatric care. Radiation therapy for cancer is another area of his expertise, alongside his more specific stereotactic and brachytherapy clinical work.

### Proposed BIO

NOT GENERATED.

### Why this doctor is flagged

The entire source record contains nine usable facts:

- Designation: Consultant Radiation Oncologist
- Hospital and city: Yashoda Hospitals, Secunderabad, Hyderabad
- Experience: 20+ years
- Qualification: MD (Radiation Oncology) — the only entry in both `qualifications` and `education`
- Six procedures: radiation therapy for cancer, brachytherapy, SBRT, SRS, IGRT, plaque brachytherapy
- One affiliation, which is the current hospital
- `memberships`, `awards` and `research` are all empty

There is no medical school, no postgraduate institution, no fellowship, no previous post, no
society, no award, no publication and no named disease site anywhere in the record. The existing
150-word bio already pads this out by explaining what stereotactic treatment and brachytherapy
are in general terms and by restating the same modality list three times. Reaching 200 words
would require either more of that filler or facts that do not exist in the profile, and both are
out of scope.

**Recommendation:** have the GAF editorial team add source facts to this profile — medical school,
postgraduate training, previous hospitals, disease-site focus, memberships — and re-run the bio
rewrite afterwards. Until then, leave the existing bio in place.

**Status:** FLAGGED — INSUFFICIENT SOURCE INFORMATION. No change proposed.

---

## Batch-level confirmations

**No new factual information was introduced anywhere in this batch.** Every name, degree,
institution, society, award, year, technique and disease site in the nine proposed bios appears
in that same doctor's own record in `src/data/ginger-catalog.json`. Verified mechanically by
`scripts/check-bio-batch.mjs`, which extracts capitalised terms, acronyms, degrees and four-digit
years from each proposed bio and requires a match in that doctor's source record only.

**No other field would change.** The write on approval is a single key per doctor:
`doctorOverrides["<slug>"].bio`. Doctor name, slug, URL, specialty, subspecialty, designation,
hospital, city, experience, qualifications, procedures, conditions, images, SEO titles, meta
descriptions, FAQs, breadcrumbs, internal links, pSEO templates and all specialty, city, hospital
and procedure mappings are untouched, and the overlay whitelist makes it structurally impossible
for them to be written.

**Known and approved side effect.** The Physician structured-data `description` at
`src/lib/seo.ts:341` is derived from the bio and will reflect the new text. No schema code and no
meta-description code is modified.

**Nothing has been written to production.** `content/catalog-cms.json` is unchanged and still
contains zero doctor overrides.
