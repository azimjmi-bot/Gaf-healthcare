# Doctor BIO rewrite — Batch 07 — Radiation Oncology, India

Final batch of the India Radiation Oncology rewrite. Every sentence is drawn from that
doctor's own record in `src/data/ginger-catalog.json` (designation, hospital, city, experience,
qualifications, education, affiliations, memberships, awards, research and existing bio).
No external sources, no inference, and no information from any other doctor's profile.
Only `doctorOverrides["<slug>"].bio` is written; no pSEO, schema, routing or frontend field changes.

One doctor in this batch is flagged for manual review rather than rewritten: the record does not
contain enough factual material to support 200 meaningful words without padding or invention.

## Batch summary

| # | Doctor | City | Old words | New words | Status |
|---|---|---|---|---|---|
| 1 | Dr. Divya Gupta | Delhi NCR | 174 | 201 | APPLIED |
| 2 | Dr. Sapna Nangia | Chennai | 172 | 215 | APPLIED |
| 3 | Dr. Deepak Gupta | Delhi NCR | 169 | 204 | APPLIED |
| 4 | Dr. Neha Kakkar | Delhi NCR | 131 | 207 | APPLIED |
| 5 | Dr. S. Usha | Chennai | 172 | 208 | APPLIED |
| 6 | Dr. Mathangi J | Bengaluru | 154 | 206 | APPLIED |
| 7 | Dr. Sapna Manocha Verma | Delhi NCR | 62 | 208 | APPLIED |
| 8 | Dr. Sravanthi Reddy T | Hyderabad | 183 | 204 | APPLIED |
| 9 | Dr. Gowhar Ahmad Shigan | Delhi NCR | 176 | 200 | APPLIED |
| 10 | Dr. Sri Sai Tejaswini Muddana | Hyderabad | 89 | — | **FLAGGED — INSUFFICIENT SOURCE INFORMATION** |

Every bio below is validated by `scripts/check-bio-batch.mjs` for the 200–300 word range and
for traceability of every capitalised term, acronym, degree and year back to that individual
doctor's own record in `src/data/ginger-catalog.json`.

---

## 1. Dr. Divya Gupta

**Slug:** `dr-divya-gupta` · Sarvodaya Hospital, Faridabad, Delhi NCR

### Existing BIO

Dr. Divya Gupta is a Senior Consultant in Radiation Oncology at Sarvodaya Hospital, Faridabad, in Delhi NCR, with 17+ years of experience. Her clinical focus includes brain tumours, supported by dedicated fellowship training in the field. Her radiotherapy expertise encompasses intensity-modulated and image-guided treatment, stereotactic radiosurgery, stereotactic body radiation therapy, volumetric modulated arc therapy, brachytherapy, and total body irradiation. She also has experience with CyberKnife and Gamma Knife radiosurgery, PET-based radiation planning, electron therapy, and 4D gating.

Dr. Gupta completed her MBBS and MD in Radiation Oncology at Indira Gandhi Medical College, Shimla. She then undertook a fellowship in brain tumours at Tata Memorial Hospital in Mumbai, adding focused neuro-oncology experience to her broader radiation training.

She is currently affiliated with Sarvodaya Hospital, Sector 8, Faridabad, and is a life member of the Association of Radiation Oncologists of India. Her professional activity also includes research and clinical-trial involvement. Her work brings together brain-tumour training and a wide range of contemporary radiation techniques, from image-guided external-beam planning to stereotactic radiosurgery, brachytherapy, and total body irradiation.

### Proposed BIO

Dr. Divya Gupta is a Senior Consultant in Radiation Oncology at Sarvodaya Hospital, Faridabad, Delhi NCR, with more than 17 years of experience. Brain tumours are the focus of her clinical work, supported by dedicated fellowship training in the field.

Her radiotherapy expertise encompasses intensity-modulated and image-guided treatment, stereotactic radiosurgery, stereotactic body radiation therapy, volumetric modulated arc therapy, brachytherapy and total body irradiation. She also has experience with CyberKnife and Gamma Knife radiosurgery, PET-based radiation planning, electron therapy and 4D gating. The last of these accounts for tumour movement during breathing, and together with PET-based planning it belongs to the part of radiotherapy concerned with defining and tracking the target accurately — which matters most for the intracranial and stereotactic work at the centre of her practice.

Dr. Gupta completed her MBBS and her MD in Radiation Oncology at Indira Gandhi Medical College, Shimla. She then undertook a fellowship in brain tumours at Tata Memorial Hospital, Mumbai, adding focused neuro-oncology experience to her broader radiation training.

She practises at Sarvodaya Hospital, Sector 8, Faridabad, and is a life member of the Association of Radiation Oncologists of India. Her professional activity also includes research and clinical trial involvement alongside her clinical responsibilities.

**Word count:** 201

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, memberships, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 2. Dr. Sapna Nangia

**Slug:** `dr-sapna-nangia` · Apollo Proton Cancer Centre, Chennai

### Existing BIO

Dr. Sapna Nangia is a Senior Consultant in Radiation Oncology at Apollo Proton Cancer Centre, Chennai, with 33+ years of experience. Her practice spans proton therapy, external-beam radiotherapy, stereotactic treatment, and brachytherapy, providing a broad technical foundation for radiation treatment planning.

She works with proton beam therapy as well as photon-based techniques such as intensity-modulated radiation therapy, image-guided radiation therapy, 3D conformal radiotherapy, and external-beam radiotherapy. Her stereotactic expertise includes stereotactic body radiation therapy, stereotactic radiosurgery (SRS), and CyberKnife radiosurgery. She also performs intracavitary and interstitial brachytherapy, which deliver radiation from a source positioned within or close to the treatment area.

Dr. Nangia completed her MBBS before earning an MD in Radiotherapy/Radiation Oncology. She currently practices at Apollo Proton Cancer Centre, where proton and photon modalities can be considered within the radiation-oncology setting. Her professional associations also include an affiliation with Apollo Hospitals in Delhi. With experience across conformal, image-guided, stereotactic, proton, and internally delivered radiation, her clinical background is defined by the breadth of radiation techniques available for individualized treatment planning.

### Proposed BIO

Dr. Sapna Nangia is a Senior Consultant in Radiation Oncology at Apollo Proton Cancer Centre, Chennai, with more than 33 years of experience.

She works with proton beam therapy as well as photon-based techniques including intensity-modulated radiation therapy, image-guided radiation therapy, 3D conformal radiotherapy and external beam radiotherapy. Her stereotactic expertise covers stereotactic body radiation therapy, stereotactic radiosurgery and CyberKnife radiosurgery, and she also performs intracavitary and interstitial brachytherapy, which deliver radiation from a source positioned within or close to the treatment area.

Having proton and photon options available in the same centre is the practical distinction in her practice: the modality itself becomes part of the treatment decision rather than a fixed starting point, and the choice can be made against the site of the tumour and the tissue around it.

Dr. Nangia completed her MBBS before earning an MD in Radiotherapy and Radiation Oncology. Her professional associations also include an affiliation with Apollo Hospitals in Delhi, and she currently practises at Apollo Proton Cancer Centre in Chennai.

With more than three decades of experience across conformal, image-guided, stereotactic, proton and internally delivered radiation, her background is defined by the breadth of techniques she can bring to an individual treatment plan — a relevant consideration for patients travelling to Chennai specifically for proton therapy.

**Word count:** 215

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 3. Dr. Deepak Gupta

**Slug:** `dr-deepak-gupta` · Medanta - The Medicity, Delhi NCR

### Existing BIO

Dr. Deepak Gupta is Associate Director of Radiation Oncology at Medanta – The Medicity in Delhi NCR, with 17+ years of experience. His clinical focus includes head and neck cancers, hepatobiliary cancers, and adult lymphomas. He works with stereotactic body radiation therapy, stereotactic radiosurgery, volumetric modulated arc therapy, image-guided radiation therapy, intensity-modulated radiation therapy, 3D conformal radiotherapy, and external-beam radiotherapy.

Dr. Gupta holds an MBBS and an MD in Radiation Oncology, along with a post-doctoral certificate in clinical research. His professional background includes affiliations with Medanta in Gurugram and Tata Memorial Hospital in Mumbai. This combination of specialist medical education, cancer-centre experience, and research training informs his work in contemporary radiation planning and delivery.

His honours include an ESTRO–Accuray Award in 2014 for work associated with radiation-therapy research and practice and an ESMO travel grant in 2016. As an associate director, he brings together organ-specific interests and experience across conformal, image-guided, and stereotactic approaches. His radiation-oncology practice is particularly oriented toward selected head and neck, hepatobiliary, and haematologic malignancies.

### Proposed BIO

Dr. Deepak Gupta is Associate Director of Radiation Oncology at Medanta – The Medicity, Delhi NCR, with more than 17 years of experience. His clinical focus covers head and neck cancers, hepatobiliary cancers and adult lymphomas — three groups where the position of the target and its proximity to healthy tissue shape the choice of technique.

He works with stereotactic body radiation therapy and stereotactic radiosurgery, volumetric modulated arc therapy, image-guided radiation therapy, intensity-modulated radiation therapy, 3D conformal radiotherapy and external beam radiotherapy.

Dr. Gupta holds an MBBS and an MD in Radiation Oncology, along with a Post-Doctoral Certificate in Clinical Research. His professional background includes Tata Memorial Hospital in Mumbai as well as his current appointment at Medanta in Gurugram, so his experience spans a national cancer centre and a large private tertiary hospital.

His honours reflect the research side of that training. In 2014 he received the ESTRO Accuray Award from the European Society for Radiotherapy and Oncology in collaboration with Accuray, recognising excellence in radiation therapy research and practice, and in 2016 he received a travel grant from the European Society for Medical Oncology. As associate director he combines those organ-specific clinical interests with experience across conformal, image-guided and stereotactic approaches.

**Word count:** 204

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 4. Dr. Neha Kakkar

**Slug:** `dr-neha-kakkar` · Fortis Memorial Research Institute, Delhi NCR

### Existing BIO

Dr. Neha Kakkar is a Consultant in Radiation Oncology at Fortis Memorial Research Institute in Delhi NCR, with 12+ years of experience. Her radiation practice includes stereotactic radiosurgery (SRS) and extracranial stereotactic body radiation therapy (SBRT), together with image-guided radiation therapy (IGRT) and intensity-modulated radiation therapy (IMRT). She also works with 3D conformal radiotherapy, external-beam radiotherapy, and intracavitary and interstitial brachytherapy.

Dr. Kakkar holds an MBBS and an MD with postgraduate specialization in Radiation Oncology. Before joining Fortis Memorial Research Institute in Gurugram, she worked at Safdarjung Hospital in New Delhi and Max Super Speciality Hospital, Saket. These appointments have given her experience in both public-sector and multispecialty cancer services.

Alongside clinical practice, Dr. Kakkar participates in radiation-oncology education and research. Her work has appeared in indexed national and international journals.

### Proposed BIO

Dr. Neha Kakkar is a Consultant in Radiation Oncology at Fortis Memorial Research Institute, Delhi NCR, with more than 12 years of experience.

Her radiation practice includes stereotactic radiosurgery and extracranial stereotactic body radiation therapy, in which a high dose is concentrated on a small, well-defined target over a few sessions. Alongside these she works with image-guided radiation therapy and intensity-modulated radiation therapy, where the dose is shaped to the tumour and its position confirmed against imaging, as well as 3D conformal radiotherapy and conventional external beam radiotherapy. She also performs intracavitary and interstitial brachytherapy, placing the radiation source within a cavity or directly into tissue close to the area being treated.

Dr. Kakkar holds an MBBS and an MD with postgraduate specialization in Radiation Oncology. Before joining Fortis Memorial Research Institute in Gurgaon she worked at Safdarjung Hospital in New Delhi and at Max Super Speciality Hospital, Saket, so her experience covers both public sector and multispecialty cancer services — a useful background when treatment has to be coordinated across different systems of care.

Alongside clinical practice she takes part in radiation oncology education and research, and her work has appeared in indexed national and international journals alongside her consultant practice at Fortis Memorial Research Institute.

**Word count:** 207

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 5. Dr. S. Usha

**Slug:** `dr-s-usha` · Rela Hospital, Chennai

### Existing BIO

Dr. S. Usha is a Radiation Oncologist at Rela Hospital, Chennai. Her work with solid tumors has a particular focus on breast and gynecologic cancers, including cancers of the cervix, vagina, and vulva. Training in palliative medicine complements her radiotherapy practice and supports symptom-focused care for people with advanced illness.

Her radiation-oncology expertise includes brachytherapy, stereotactic body radiation therapy, and total body irradiation. Within brachytherapy, she has experience with intracavitary applications and implants, techniques that place the radiation source in or close to the treatment area. This background is especially relevant to her work with gynecologic cancers, where brachytherapy can form part of a radiation treatment plan.

Dr. Usha completed both her MBBS and Diploma in Medical Radiotherapy at Madras Medical College in Chennai. She later completed a course in palliative medicine through the Indian Association of Palliative Care. She practices in the Cancer Centre and Radiation Oncology Department at Rela Hospital, bringing together site-specific experience in breast and gynecologic oncology, internal radiation techniques, stereotactic treatment, total body irradiation, and palliative-care training.

### Proposed BIO

Dr. S. Usha is a Radiation Oncologist at Rela Hospital, Chennai, with more than 14 years of experience. Her work with solid tumors has a particular focus on breast and gynecologic cancers, including cancers of the cervix, vagina and vulva.

Her radiation oncology expertise includes brachytherapy, stereotactic body radiation therapy, image-guided radiation therapy and total body irradiation. Within brachytherapy she has experience with intracavitary applications and implants, techniques that place the radiation source in or close to the treatment area. That is directly relevant to her gynecologic practice, where brachytherapy often forms part of the radiation plan rather than an optional addition to it. Her practice also extends to hormone therapy for breast cancer and for gynecologic cancers, so the systemic and radiation sides of treatment can be considered together.

Dr. Usha completed both her MBBS and her Diploma in Medical Radiotherapy at Madras Medical College in Chennai. She later completed a course in palliative medicine through the Indian Association of Palliative Care, and that training complements her radiotherapy practice by supporting symptom-focused care for people with advanced illness.

She practises in the Cancer Centre and Radiation Oncology Department at Rela Institute & Medical Centre in Chennai, where her listed specialisations cover both radiation oncology and medical oncology.

**Word count:** 208

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 6. Dr. Mathangi J

**Slug:** `dr-mathangi-j` · Gleneagles Hospitals, Bengaluru, Bengaluru

### Existing BIO

Dr. Mathangi J is Senior Consultant and In-Charge of Radiation Oncology at Gleneagles Hospitals, Bengaluru, in Bengaluru, with 19+ years of experience. She is based at Gleneagles BGS Hospital in Kengeri and holds MBBS, DMRT, and DNB qualifications.

Her practice encompasses cancer radiotherapy and brachytherapy, together with several specialized external-beam techniques. She has experience in image-guided and intensity-modulated radiation therapy, stereotactic body radiation therapy, and stereotactic radiosurgery (SRS). CyberKnife radiosurgery is another part of her technical scope.

Dr. Mathangi also works with total body irradiation, in which radiation is delivered across the body for specific clinical indications, and intraoperative radiation therapy, which delivers radiation during an operation. These sit alongside her experience with focused stereotactic methods and brachytherapy. Her combination of senior departmental responsibility, formal medical and radiotherapy qualifications, and experience across multiple radiation-delivery techniques reflects a career centered on Radiation Oncology and the selection of an appropriate radiation approach for each clinical setting.

### Proposed BIO

Dr. Mathangi J is Senior Consultant and In-Charge of Radiation Oncology at Gleneagles Hospitals, Bengaluru, with more than 19 years of experience. She is based at Gleneagles BGS Hospital in Kengeri and holds MBBS, DMRT and DNB qualifications.

Her practice encompasses radiation therapy for cancer and brachytherapy together with several specialised external beam techniques. She has experience in image-guided and intensity-modulated radiation therapy, stereotactic body radiation therapy and stereotactic radiosurgery, and CyberKnife radiosurgery is a further part of her technical scope.

Two less common techniques extend that range in useful directions. She works with total body irradiation, in which radiation is delivered across the whole body for specific clinical indications, and with intraoperative radiation therapy, where the dose is given during an operation while the tumour bed is exposed. Both sit alongside her focused stereotactic work and her brachytherapy practice, in which the radiation source is placed within or close to the area being treated rather than directed at it from outside.

Taken together, her senior departmental responsibility, her formal medical and radiotherapy qualifications and her experience across external, focused, internal, intraoperative and whole-body radiation reflect a career centred on radiation oncology and on matching the delivery method to the clinical situation in front of her.

**Word count:** 206

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 7. Dr. Sapna Manocha Verma

**Slug:** `dr-sapna-manocha-verma` · Indraprastha Apollo Hospital, Delhi NCR

### Existing BIO

Dr. Sapna Manocha Verma is a Senior Consultant in Radiation Oncology at Indraprastha Apollo Hospital in Delhi NCR, with 22+ years of experience. Her work in cancer radiotherapy includes brachytherapy, stereotactic body radiation therapy (SBRT) and stereotactic radiosurgery (SRS).

Dr. Verma holds an MBBS and an MD in Radiotherapy. She practises within the Radiation Oncology service at Indraprastha Apollo Hospitals in Delhi.

### Proposed BIO

Dr. Sapna Manocha Verma is a Senior Consultant in Radiation Oncology at Indraprastha Apollo Hospital, Delhi NCR, with more than 22 years of experience.

Her radiation work includes radiation therapy for cancer, brachytherapy, stereotactic body radiation therapy and stereotactic radiosurgery. These cover the main ways a dose can be delivered: shaped from outside the body over a course of treatment, concentrated on a small defined target in a few sessions, or given from a source placed within or close to the area being treated.

What distinguishes her profile is that it extends past radiation into systemic treatment. Her practice also takes in chemotherapy for cancer, cancer immunotherapy and targeted therapy for cancer, so the drug and radiation components of a plan can be considered together rather than referred separately.

A third strand is hormone-based treatment, covering hormonal therapy for gynaecologic cancers and hormone therapy for breast cancer. Those two groups are where hormone-directed treatment is most often combined with radiation, and their presence in her practice points to where her clinical experience is concentrated.

Dr. Verma holds an MBBS and an MD in Radiotherapy, and practises within the radiation oncology service at Indraprastha Apollo Hospitals in Delhi, where she has spent her recent career as a senior consultant.

**Word count:** 208

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 8. Dr. Sravanthi Reddy T

**Slug:** `dr-sravanthi-reddy-t` · Yashoda Hospitals, Secunderabad, Hyderabad

### Existing BIO

Dr. Sravanthi Reddy T is a Consultant Radiation Oncologist at Yashoda Hospitals, Secunderabad, Hyderabad, with 11+ years of experience. Her work has a particular focus on gynecological oncology and also incorporates pain and palliative care. Participation in clinico-pathological and clinico-radiological meetings supports coordination across the disciplines involved in cancer diagnosis and treatment.

Her radiation practice includes brachytherapy and stereotactic body radiation therapy, alongside broader radiation therapy for cancer. Brachytherapy delivers radiation from a source positioned within or close to the treatment area, while stereotactic body radiation therapy delivers focused external radiation to selected targets. These techniques form part of her specialist work in radiation oncology, including care for patients with gynecological cancers.

Dr. Reddy earned her MBBS at Osmania Medical College in Hyderabad. She later completed her Diplomate of National Board training in the Department of Radiotherapy at Yashoda Hospitals, Somajiguda. Her professional experience includes affiliations with Yashoda Hospitals in both Somajiguda and Secunderabad, where she now practices as a consultant. Her background brings together radiotherapy training, focused experience in gynecological oncology, brachytherapy, stereotactic radiation, palliative care, and participation in multidisciplinary case review.

### Proposed BIO

Dr. Sravanthi Reddy T is a Consultant Radiation Oncologist at Yashoda Hospitals, Secunderabad, Hyderabad, with more than 11 years of experience. Her work has a particular focus on gynecological oncology and also incorporates pain and palliative care.

Her radiation practice includes brachytherapy, image-guided radiation therapy and stereotactic body radiation therapy alongside broader radiation therapy for cancer. Brachytherapy delivers radiation from a source positioned within or close to the treatment area, while stereotactic body radiation therapy concentrates focused external radiation on selected targets. Her practice also extends to chemotherapy for cancer and hormone therapy for gynecologic cancers, which means the systemic and radiation elements of a gynecological cancer plan can be considered side by side.

Dr. Reddy earned her MBBS at Osmania Medical College in Hyderabad and later completed her Diplomate of National Board training in the Department of Radiotherapy at Yashoda Hospitals, Somajiguda. She has since been affiliated with Yashoda Hospitals at both Somajiguda and Secunderabad, where she now practises as a consultant.

She takes part in clinico-pathological and clinico-radiological meetings, the forums where pathology, imaging and treatment teams review cases together — a routine but important part of coordinating a cancer diagnosis and the treatment that follows for the patients under her care.

**Word count:** 204

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 9. Dr. Gowhar Ahmad Shigan

**Slug:** `dr-gowhar-ahmad-shigan` · Paras Hospitals, Gurugram, Delhi NCR

### Existing BIO

Dr. Gowhar Ahmad Shigan is a Senior Consultant in Radiation Oncology at Paras Hospitals, Gurugram, in Delhi NCR, with 13+ years of experience. He works with stereotactic radiosurgery, stereotactic body radiation therapy, image-guided radiation therapy, intensity-modulated radiation therapy, volumetric modulated arc therapy, 3D conformal radiotherapy, and external-beam radiotherapy. His practice also includes intracavitary and interstitial brachytherapy, including brachytherapy for gynaecological and other malignancies.

Dr. Shigan holds an MBBS and a DNB in Radiation Oncology. During his DNB course, he received the Best Resident Award in Radiation Oncology. He is currently affiliated with Paras Health in Gurugram, where his technical range covers conformal, image-guided, stereotactic, external-beam, and brachytherapy approaches.

Alongside clinical care, Dr. Shigan participates in academic teaching, oncology research, and the training of younger oncologists. His experience includes the management of both common and complex cancers, supported by a broad selection of precision radiation methods. These capabilities allow treatment planning to draw from conventional external-beam radiotherapy as well as highly focused stereotactic techniques and brachytherapy, according to the requirements of the individual cancer and treatment site.

### Proposed BIO

Dr. Gowhar Ahmad Shigan is a Senior Consultant in Radiation Oncology at Paras Hospitals, Gurugram, Delhi NCR, with more than 13 years of experience.

He works with stereotactic radiosurgery and stereotactic body radiation therapy, image-guided radiation therapy, intensity-modulated radiation therapy, volumetric modulated arc therapy, 3D conformal radiotherapy and external beam radiotherapy. His practice also includes intracavitary and interstitial brachytherapy, among them brachytherapy for gynaecological and other malignancies, where the radiation source is placed within or beside the tissue being treated.

That range allows treatment planning to draw on conventional external beam radiotherapy as well as highly focused stereotactic techniques and brachytherapy, according to the requirements of the individual cancer and treatment site. His experience covers the management of both common and complex cancers.

Dr. Shigan holds an MBBS and a DNB in Radiation Oncology, and during his DNB course he received the Best Resident Award in Radiation Oncology.

Alongside clinical care at Paras Health in Gurugram, he takes part in academic teaching, oncology research and the training of younger oncologists. For patients, the relevant point is a consultant practice that covers conformal, image-guided, stereotactic, external beam and brachytherapy approaches within one service, backed by continuing academic involvement in the specialty.

**Word count:** 200

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 10. Dr. Sri Sai Tejaswini Muddana

**Slug:** `dr-sri-sai-tejaswini-muddana` · Apollo Hospital, Jubilee Hills, Hyderabad, Hyderabad

### Existing BIO

Dr. Sri Sai Tejaswini Muddana is a Radiation Oncologist at Apollo Hospital, Jubilee Hills, Hyderabad, with 4+ years of experience. She practises within the Radiation Oncology service at Apollo Health City in Jubilee Hills.

Her clinical work includes cancer treatment planning as part of a multidisciplinary oncology team. This involves considering the role of radiotherapy within the wider care plan and adapting treatment decisions to the patient's diagnosis and clinical requirements. Her current appointment establishes her specialty as Radiation Oncology and her practice location as Apollo Hospital in Hyderabad.

### Proposed BIO

NOT GENERATED.

**Word count:** —

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, existing bio.

**New factual information introduced:** NONE — no bio proposed. The record holds only the designation, hospital, city, 4+ years of
experience, an MBBS from Katihar Medical College, a list of radiation techniques, and an existing
89-word bio that states no disease sites, memberships, awards or research. The qualifications field
("MBBS, DM") and the education list ("M.B.B.S.", "DNB") also disagree on the postgraduate degree.
Reaching 200 words would require padding a technique glossary or inventing facts, so this doctor is
flagged for manual review and left unchanged, as with Dr. B. Ramakrishna Prasad in batch 01.

**Other fields that would change:** NONE (bio only)

**Status:** FLAGGED — no change proposed

---
