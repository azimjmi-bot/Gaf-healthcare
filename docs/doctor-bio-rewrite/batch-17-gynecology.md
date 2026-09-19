# Doctor BIO rewrite — Batch 17 — Gynecology, India

Final Gynecology batch, clearing the remaining eligible records in the specialty. Every sentence is
drawn from that doctor's own record in `src/data/ginger-catalog.json` (designation, hospital, city,
experience, qualifications, education, affiliations, memberships, awards and research). The previous
bios in this specialty are GAF platform boilerplate that describes the pSEO tagging scheme rather
than the doctor, so the structured fields are the source. No external sources, no inference, and no
information from any other doctor's profile. Only `doctorOverrides["<slug>"].bio` is written; no
pSEO, schema, routing or frontend field changes.

## Batch summary

| # | Doctor | City | Old words | New words | Status |
|---|---|---|---|---|---|
| 1 | Dr. Nymphaea Walecha | Delhi NCR | 120 | 240 | APPLIED |
| 2 | Dr. Raina Chawla | Delhi NCR | 116 | 245 | APPLIED |
| 3 | Dr. Kashika Kathuria | Delhi NCR | 113 | 227 | APPLIED |
| 4 | Dr. G. Nikila Reddy | Hyderabad | 121 | 224 | APPLIED |
| 5 | Dr. Karuna Ratwani | Delhi NCR | 116 | 225 | APPLIED |
| 6 | Dr. Manju Khemani | Delhi NCR | 130 | 229 | APPLIED |
| 7 | Dr. Anuradha Kapur | Delhi NCR | 130 | 236 | APPLIED |
| 8 | Dr. Sunita Varma | Delhi NCR | 117 | 218 | APPLIED |
| 9 | Dr. Sujata Dalvi | Mumbai | 110 | 240 | APPLIED |
| 10 | Dr. Harsha Jain | Delhi NCR | 125 | 223 | APPLIED |
| 11 | Dr. Nidhi Sharma | Delhi NCR | 124 | 230 | APPLIED |
| 12 | Dr. Shweta Gangal | Delhi NCR | 124 | 235 | APPLIED |
| 13 | Dr. Navaneetha Elati | Hyderabad | 122 | 220 | APPLIED |

Every bio below is validated by `scripts/check-bio-batch.mjs` for the 200–300 word range and
for traceability of every capitalised term, acronym, degree and year back to that individual
doctor's own record in `src/data/ginger-catalog.json`.

---

## 1. Dr. Nymphaea Walecha

**Slug:** `dr-nymphaea-walecha` · Fortis Hospital, Shalimar Bagh, Delhi NCR

### Existing BIO

Dr. Nymphaea Walecha is Director & Unit Head of Obstetrics & Gynaecology at Fortis Hospital in Delhi NCR, India. She has practised gynecology in India for 21+ years experience. Hysterectomy, myomectomy, endometriosis, cyst and pelvic-floor lists are tagged for later pSEO under country, city, specialty and procedure — Robotic Hysterectomy, Endometriosis Surgery and Ovarian Cyst Surgery when MRI, ultrasound or hysteroscopy already make the indication honest. Laparoscopic versus robotic, vaginal or abdominal hysterectomy, uterus-sparing myomectomy versus hysterectomy, and excision versus ablation for endometriosis are written after records review — not from a brochure robot count. Training includes MBBS. International patients meet her on camera first; travel to Delhi NCR is offered only if this gynecology floor is the right list.

### Proposed BIO

Dr. Nymphaea Walecha is Director and Unit Head of Obstetrics and Gynaecology at Fortis Hospital, Shalimar Bagh, in the Delhi NCR, with more than 21 years of experience across obstetrics and gynaecology and infertility and IVF.

She manages uterine fibroids, ovarian cysts, abnormal uterine bleeding and endometriosis, the last recorded as both treatment and surgery. Her operating list covers hysterectomy performed by open, laparoscopic and robotic routes, myomectomy and laparoscopic myomectomy, ovarian cyst surgery and endometriosis surgery. She holds an MBBS and an MS in obstetrics and gynaecology.

Fertility is where the rest of her record sits, and it sits there consistently. She won the second best clinical paper award at the World Congress of the International Federation of Fertility Societies in 2016, and has received the Abdul Kalam Azad Award for excellence in fertility care.

Her positions in professional bodies follow the same line. She is Vice President of the Delhi Gynaecologists Forum, Web Editor of the Indian Fertility Society, and Joint Secretary of the Fertility Preservation Society of India, so two of her three offices are held in fertility organisations rather than in general gynaecology ones.

Her written output is recorded as multiple national and international research publications together with book chapters.

Taken together the record describes a unit head whose theatre work spans the full range of uterine surgery, from open to robotic, and whose academic standing and society roles are concentrated in fertility and fertility preservation.

**Word count:** 240

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 2. Dr. Raina Chawla

**Slug:** `dr-raina-chawla` · Sarvodaya Hospital, Faridabad, Delhi NCR

### Existing BIO

Dr. Raina Chawla is Associate Director at Sarvodaya Hospital in Delhi NCR, India. She has practised gynecology in India for 21+ years experience. Hysterectomy, myomectomy, endometriosis, cyst and pelvic-floor lists are tagged for later pSEO under country, city, specialty and procedure — Endometriosis Surgery, Ovarian Cyst Surgery and Pelvic Organ Prolapse Surgery when MRI, ultrasound or hysteroscopy already make the indication honest. Laparoscopic versus robotic, vaginal or abdominal hysterectomy, uterus-sparing myomectomy versus hysterectomy, and excision versus ablation for endometriosis are written after records review — not from a brochure robot count. Training includes MBBS. International patients meet her on camera first; travel to Delhi NCR is offered only if this gynecology floor is the right list.

### Proposed BIO

Dr. Raina Chawla is Associate Director at Sarvodaya Hospital, Faridabad, in the Delhi NCR, with more than 21 years of experience in gynaecology.

Her clinical range covers uterine fibroids, adenomyosis, ovarian cysts, abnormal uterine bleeding, chronic pelvic pain and endometriosis, the last listed as both treatment and surgery. Her operating list runs to hysterectomy and laparoscopic hysterectomy, myomectomy and laparoscopic myomectomy, ovarian cyst surgery, endometriosis surgery, pelvic organ prolapse surgery, endometrial ablation, and therapeutic dilation and curettage.

She holds an MBBS and an MS in obstetrics and gynaecology, a master of surgery in the subject. Her two further qualifications are both by examination and election rather than by course: she is a Fellow of the Indian College of Obstetrics and Gynecology, the FICOG, and she has cleared Parts 1 and 2 of the MRCOG examinations of the Royal College of Obstetricians and Gynaecologists.

Her society work is concentrated close to where she practises. She is a life member of the Faridabad Obstetrics and Gynaecology Society and sits on its editorial board, which places her in a publishing role within her local professional body. At national level she is a member of the Practical Obstetric Committee of FOGSI, the Federation of Obstetric and Gynaecological Societies of India.

Taken together the record describes a gynaecologist with a broad benign operating list, both Indian and UK postgraduate examinations behind her, and an editorial and committee role in the professional societies of her own district and of the country.

**Word count:** 245

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, memberships, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 3. Dr. Kashika Kathuria

**Slug:** `dr-kashika-kathuria` · Fortis Hospital, Shalimar Bagh, Delhi NCR

### Existing BIO

Dr. Kashika Kathuria is Consultant at Fortis Hospital in Delhi NCR, India. She has practised gynecology in India for 15+ years experience. Hysterectomy, myomectomy, endometriosis, cyst and pelvic-floor lists are tagged for later pSEO under country, city, specialty and procedure — Endometriosis Surgery, Hysteroscopic Polypectomy and Ovarian Cyst Surgery when MRI, ultrasound or hysteroscopy already make the indication honest. Laparoscopic versus robotic, vaginal or abdominal hysterectomy, uterus-sparing myomectomy versus hysterectomy, and excision versus ablation for endometriosis are written after records review — not from a brochure robot count. Training includes MBBS. International patients meet her on camera first; travel to Delhi NCR is offered only if this gynecology floor is the right list.

### Proposed BIO

Dr. Kashika Kathuria is a Consultant at Fortis Hospital, Shalimar Bagh, in the Delhi NCR, with more than 15 years of experience across obstetrics and gynaecology and infertility and IVF.

She manages uterine fibroids, ovarian cysts, abnormal uterine bleeding and endometriosis, the last recorded as both treatment and surgery. Her operating list covers hysterectomy and laparoscopic hysterectomy, myomectomy and laparoscopic myomectomy, ovarian cyst surgery, endometriosis surgery, and uterine polyp removal by hysteroscopic polypectomy.

Her qualifications are unusually numerous and each one accounts for a different part of that practice. She holds an MBBS and took her MS in obstetrics and gynaecology at Safdarjung Hospital in New Delhi, followed by the DNB in the same subject. Her fertility qualification is the FNB in reproductive medicine from Maulana Azad Medical College in Delhi, which is what the infertility and IVF line in her profile rests on.

Two further credentials cover the surgical side. The FMAS is a fellowship in minimal access surgery, and the DGE is an international gynecological endoscopy certification taken in Germany, so her endoscopic training was formalised both in India and abroad. She is also a Member of the National Academy of Medical Sciences, the MNAMS.

Alongside Fortis Hospital in Shalimar Bagh she has been associated with the ESIC Medical College and Base Hospital, which her record also names as the Army College of Medical Sciences.

**Word count:** 227

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 4. Dr. G. Nikila Reddy

**Slug:** `dr-g-nikila-reddy` · Yashoda Hospitals, Secunderabad, Hyderabad

### Existing BIO

Dr. G. Nikila Reddy is Consultant Gynaecologist and Obstetrician at Yashoda Hospitals in Hyderabad, India. She has practised gynecology in India for 11+ years experience. Hysterectomy, myomectomy, endometriosis, cyst and pelvic-floor lists are tagged for later pSEO under country, city, specialty and procedure — Endometriosis Surgery, Ovarian Cyst Surgery and Oophorectomy when MRI, ultrasound or hysteroscopy already make the indication honest. Laparoscopic versus robotic, vaginal or abdominal hysterectomy, uterus-sparing myomectomy versus hysterectomy, and excision versus ablation for endometriosis are written after records review — not from a brochure robot count. Training includes MBBS — Kakatiya Medical College, Warangal, Telangana (2006). International patients meet her on camera first; travel to Hyderabad is offered only if this gynecology floor is the right list.

### Proposed BIO

Dr. G. Nikila Reddy is a Consultant Gynaecologist and Obstetrician at Yashoda Hospitals, Secunderabad, Hyderabad, with more than 11 years of experience across obstetrics and gynaecology and infertility and IVF.

She manages uterine fibroids, ovarian cysts and abnormal uterine bleeding. Her operating list covers hysterectomy and laparoscopic hysterectomy, myomectomy and laparoscopic myomectomy, ovarian cyst surgery, oophorectomy, endometriosis surgery, uterine polyp removal and pelvic floor repair.

Her degrees were taken in two states. She qualified MBBS at Kakatiya Medical College in Warangal, Telangana, in 2006, and took her MS in obstetrics and gynaecology at Jawaharlal Nehru Medical College in Belgaum, Karnataka, in 2015.

Three separate fellowships follow, and each points to a different part of her practice. Her infertility fellowship was taken at OASIS in Hyderabad, which is the basis of the IVF side of her profile. Her urogynaecology fellowship was taken through Kiel University at Nagpur, which is the basis of the pelvic floor repair on her list. Her fellowship in cosmetic gynaecology was taken in Dubai, the only part of her training undertaken outside India.

Her memberships line up with the same divisions: a urogynaecology membership, an endoscopy membership, and membership of FOGSI, the Federation of Obstetric and Gynaecological Societies of India. The record therefore describes a gynaecologist who has deliberately added three distinct subspecialty qualifications to a general obstetrics and gynaecology base.

**Word count:** 224

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, memberships, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 5. Dr. Karuna Ratwani

**Slug:** `dr-karuna-ratwani` · Indraprastha Apollo Hospital, Delhi NCR

### Existing BIO

Dr. Karuna Ratwani is Specialist at Indraprastha Apollo Hospital in Delhi NCR, India. She has practised gynecology in India for 11+ years experience. Hysterectomy, myomectomy, endometriosis, cyst and pelvic-floor lists are tagged for later pSEO under country, city, specialty and procedure — Endometriosis Surgery, Ovarian Cyst Surgery and Pelvic Organ Prolapse Surgery when MRI, ultrasound or hysteroscopy already make the indication honest. Laparoscopic versus robotic, vaginal or abdominal hysterectomy, uterus-sparing myomectomy versus hysterectomy, and excision versus ablation for endometriosis are written after records review — not from a brochure robot count. Training includes MBBS. International patients meet her on camera first; travel to Delhi NCR is offered only if this gynecology floor is the right list.

### Proposed BIO

Dr. Karuna Ratwani is a Specialist at Indraprastha Apollo Hospital in the Delhi NCR, with more than 11 years of experience across obstetrics and gynaecology and infertility and IVF.

Her clinical range covers uterine fibroids, adenomyosis, ovarian cysts, abnormal uterine bleeding, chronic pelvic pain and endometriosis, the last recorded as both treatment and surgery. Her operating list runs to hysterectomy and laparoscopic hysterectomy, myomectomy and laparoscopic myomectomy, ovarian cyst surgery, endometriosis surgery, pelvic organ prolapse surgery, and therapeutic dilation and curettage.

She holds an MBBS and an MS in obstetrics and gynaecology. Her postgraduate additions are unusually wide and largely taken abroad. The FMAS covers minimal access surgery and the FICRS sits alongside her election as a Fellow of the International College of Robotic Surgeons, so both the keyhole and the robotic approaches are formally credentialled.

Her German training came in two parts: a diploma in reproductive medicine at Kiel and a masters in cosmetic gynaecology at Greifswald. Her imaging qualification is a masterclass in obstetrics and gynaecology ultrasound taken with ISUOG in the United Kingdom.

That combination is what distinguishes the record. Within eleven years she has assembled separate qualifications in minimal access surgery, robotic surgery, reproductive medicine, cosmetic gynaecology and ultrasound, three of them taken abroad, and now brings them to a general gynaecology and fertility practice at Apollo Hospitals Indraprastha in Delhi.

**Word count:** 225

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 6. Dr. Manju Khemani

**Slug:** `dr-manju-khemani` · Max Smart Super Speciality Hospital, Saket, Delhi NCR

### Existing BIO

Dr. Manju Khemani is Principal Director of Obstetrics & Gynaecology and Head of Unit at Max Smart Super Speciality Hospital in Delhi NCR, India. She has practised gynecology in India for 45+ years experience. Hysterectomy, myomectomy, endometriosis, cyst and pelvic-floor lists are tagged for later pSEO under country, city, specialty and procedure — Endometriosis Surgery, Ovarian Cyst Surgery and Laparoscopic Myomectomy when MRI, ultrasound or hysteroscopy already make the indication honest. Laparoscopic versus robotic, vaginal or abdominal hysterectomy, uterus-sparing myomectomy versus hysterectomy, and excision versus ablation for endometriosis are written after records review — not from a brochure robot count. Training includes Fellowship in Endoscopy — BEAMS Mumbai. International patients meet her on camera first; travel to Delhi NCR is offered only if this gynecology floor is the right list.

### Proposed BIO

Dr. Manju Khemani is Principal Director of Obstetrics and Gynaecology and Head of Unit at Max Smart Super Speciality Hospital, Saket, in the Delhi NCR. Her record shows more than 45 years in practice across three areas: obstetrics and gynaecology, gynaecological laparoscopy, and high-risk pregnancy management.

Her clinical work covers uterine fibroids, adenomyosis, ovarian cysts, post-menopausal bleeding and menopause management. Her operating list is laparoscopic myomectomy, ovarian cyst surgery and endometriosis surgery.

Her degrees were both taken at Gandhi Medical College in Bhopal: the MBBS and then the MD in obstetrics and gynaecology. Her later qualification is a fellowship in endoscopy at BEAMS in Mumbai, which is the formal basis of the laparoscopy strand in her profile.

The most substantial part of her record is her hospital history, which runs almost entirely through the major Delhi teaching and institutional hospitals. She spent four years at AIIMS in New Delhi and ten years at Lady Hardinge Medical College, then eight years at Sitaram Bhartia Hospital. From 2013 she has been at Saket City Hospital, and her current post is at Max Smart Super Speciality Hospital in Saket.

Those figures account for the length of her career directly: more than two decades of it are documented in named posts, first in the public teaching sector and then across two private Saket hospitals, with laparoscopy and high-risk obstetrics as the constants throughout.

**Word count:** 229

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 7. Dr. Anuradha Kapur

**Slug:** `dr-anuradha-kapur-1` · Max Smart Super Speciality Hospital, Saket, Delhi NCR

### Existing BIO

Dr. Anuradha Kapur is Principal Director & Head of Unit, Obstetrics & Gynaecology at Max Smart Super Speciality Hospital in Delhi NCR, India. She has practised gynecology in India for 36+ years experience. Hysterectomy, myomectomy, endometriosis, cyst and pelvic-floor lists are tagged for later pSEO under country, city, specialty and procedure — Endometriosis Surgery, Hysteroscopic Polypectomy and Ovarian Cyst Surgery when MRI, ultrasound or hysteroscopy already make the indication honest. Laparoscopic versus robotic, vaginal or abdominal hysterectomy, uterus-sparing myomectomy versus hysterectomy, and excision versus ablation for endometriosis are written after records review — not from a brochure robot count. Training includes MBBS — Maulana Azad Medical College, Delhi. International patients meet her on camera first; travel to Delhi NCR is offered only if this gynecology floor is the right list.

### Proposed BIO

Dr. Anuradha Kapur is Principal Director and Head of Unit in Obstetrics and Gynaecology at Max Smart Super Speciality Hospital, Saket, in the Delhi NCR, with more than 36 years of experience across obstetrics and gynaecology and infertility and IVF.

Her clinical range is wide. She manages uterine fibroids, adenomyosis, ovarian cysts, abnormal uterine bleeding, chronic pelvic pain, post-menopausal bleeding and menopause, with endometriosis recorded as both treatment and surgery. Her operating list covers hysterectomy and laparoscopic hysterectomy, myomectomy and laparoscopic myomectomy, oophorectomy, ovarian cyst surgery, endometriosis surgery, endometrial ablation, and uterine polyp removal by hysteroscopic polypectomy.

Her degrees were both taken in Delhi: the MBBS at Maulana Azad Medical College and the MD at Maulana Azad Medical College and LNJP Hospital.

Her later training accounts for the two halves of her present practice, and both parts were taken abroad. Her diploma in advanced endoscopy was taken in Germany, and she holds a second diploma in advanced endoscopy for gynaecological laparoscopy through WALS. Her assisted reproductive techniques training was taken in Singapore, and she is separately recorded as trained in infertility and IVF.

Alongside her post in Saket she practises at the Max Multi Speciality Centre in Panchsheel Park. She has received a Physician Appreciation Award from Max Healthcare, Saket.

The record therefore describes a long-serving unit head whose endoscopic and fertility credentials were both obtained overseas and whose list spans the full benign gynaecology range.

**Word count:** 236

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 8. Dr. Sunita Varma

**Slug:** `dr-sunita-varma` · Fortis Hospital, Shalimar Bagh, Delhi NCR

### Existing BIO

Dr. Sunita Varma is Senior Director and Head of Department at Fortis Hospital in Delhi NCR, India. She has practised gynecology in India for 32+ years experience. Hysterectomy, myomectomy, endometriosis, cyst and pelvic-floor lists are tagged for later pSEO under country, city, specialty and procedure — Robotic Hysterectomy, Laparoscopic Hysterectomy and Abdominal Hysterectomy when MRI, ultrasound or hysteroscopy already make the indication honest. Laparoscopic versus robotic, vaginal or abdominal hysterectomy, uterus-sparing myomectomy versus hysterectomy, and excision versus ablation for endometriosis are written after records review — not from a brochure robot count. Training includes MBBS. International patients meet her on camera first; travel to Delhi NCR is offered only if this gynecology floor is the right list.

### Proposed BIO

Dr. Sunita Varma is Senior Director and Head of Department at Fortis Hospital, Shalimar Bagh, in the Delhi NCR, with more than 32 years of experience. Her profile records two areas, obstetrics and gynaecology and robotic surgery.

Her operating list covers all three surgical routes. She performs hysterectomy abdominally, laparoscopically and robotically, so the choice of approach is documented rather than assumed. Laparoscopically she also performs myomectomy and endometriosis surgery; hysteroscopically she performs myomectomy and polypectomy. The rest of the list is ovarian cyst surgery, oophorectomy and salpingo-oophorectomy, and she manages ovarian cysts and abnormal uterine bleeding. On the obstetric side she provides advanced obstetric surgical care.

She holds an MBBS and an MD in obstetrics and gynaecology.

Her recognition spans more than a quarter of a century and comes from several directions. She received the Pfizer Postgraduate Award in 1990, near the start of her career, and the Chairman's Award of Max Healthcare in 2004. Her academic recognition is the best paper award of IAGE in 2013, which places her contribution with the gynaecological endoscopy body rather than with a general obstetrics one.

Two later honours are broader. She received the APJ Abdul Kalam Award for Excellence from the Delhi Gynecologist Forum, and in 2018 ET Healthworld named her among the most inspiring gynecologists of North India.

**Word count:** 218

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 9. Dr. Sujata Dalvi

**Slug:** `dr-sujata-dalvi` · Gleneagles Hospital, Mumbai, Mumbai

### Existing BIO

Dr. Sujata Dalvi is Consultant at Gleneagles Hospital in Mumbai, India. She has practised gynecology in India for 29+ years experience. Hysterectomy, myomectomy, endometriosis, cyst and pelvic-floor lists are tagged for later pSEO under country, city, specialty and procedure — Endometriosis Surgery, Ovarian Cyst Surgery and Oophorectomy when MRI, ultrasound or hysteroscopy already make the indication honest. Laparoscopic versus robotic, vaginal or abdominal hysterectomy, uterus-sparing myomectomy versus hysterectomy, and excision versus ablation for endometriosis are written after records review — not from a brochure robot count. Training includes MBBS. International patients meet her on camera first; travel to Mumbai is offered only if this gynecology floor is the right list.

### Proposed BIO

Dr. Sujata Dalvi is a Consultant in obstetrics and gynaecology at Gleneagles Hospital in Parel, Mumbai, with more than 29 years of experience.

Her practice is general gynaecology across the benign range. She manages uterine fibroids, ovarian cysts, abnormal uterine bleeding, chronic pelvic pain and endometriosis, and provides menopause management. Endometriosis is recorded twice in her profile, once as treatment and once as surgery, so the condition is handled medically as well as in theatre.

Her operating list follows the same conditions through to surgery. She performs hysterectomy by both open and laparoscopic routes and myomectomy by both, along with ovarian cyst surgery, oophorectomy and endometriosis surgery. The pairing of an open and a keyhole version of the same two operations is what her list records, rather than a single fixed approach.

Her qualifications are four in number. She holds an MBBS and an MD in obstetrics and gynaecology, together with the DGO and the FCPS.

Her hospital history runs entirely within Mumbai and largely within its public hospitals. She has worked at K.E.M. Hospital, at R.N. Cooper Hospital and at Rajawadi Hospital, three of the city's municipal institutions, before her present post at Gleneagles Hospital in Parel.

Taken together the record describes a gynaecologist of nearly three decades whose training and early career were built in the Mumbai public hospital system and whose current work is a broad benign gynaecology list in the private sector in the same city.

**Word count:** 240

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 10. Dr. Harsha Jain

**Slug:** `dr-harsha-jain` · Fortis Hospital, Shalimar Bagh, Delhi NCR

### Existing BIO

Dr. Harsha Jain is Senior Consultant, Obstetrics & Gynaecology at Fortis Hospital in Delhi NCR, India. She has practised gynecology in India for 22+ years experience. Hysterectomy, myomectomy, endometriosis, cyst and pelvic-floor lists are tagged for later pSEO under country, city, specialty and procedure — Endometriosis Surgery, Ovarian Cyst Surgery and Pelvic Organ Prolapse Surgery when MRI, ultrasound or hysteroscopy already make the indication honest. Laparoscopic versus robotic, vaginal or abdominal hysterectomy, uterus-sparing myomectomy versus hysterectomy, and excision versus ablation for endometriosis are written after records review — not from a brochure robot count. Training includes M.B.B.S. — RNT Medical College, Udaipur, Rajasthan. International patients meet her on camera first; travel to Delhi NCR is offered only if this gynecology floor is the right list.

### Proposed BIO

Dr. Harsha Jain is a Senior Consultant in Obstetrics and Gynaecology at Fortis Hospital, Shalimar Bagh, in the Delhi NCR, with more than 22 years of experience.

She manages uterine fibroids, adenomyosis, ovarian cysts, abnormal uterine bleeding, chronic pelvic pain and endometriosis, the last recorded as both treatment and surgery. Her operating list covers hysterectomy and laparoscopic hysterectomy, myomectomy and laparoscopic myomectomy, ovarian cyst surgery, endometriosis surgery and pelvic organ prolapse surgery.

Both of her degrees were taken at the same institution. She read M.B.B.S. at RNT Medical College in Udaipur, Rajasthan, and returned there for her M.S. in obstetrics and gynecology.

Her later training was taken in three separate places and each part maps onto a different element of her practice. Her infertility training was the FOGSI Fellowship at Shri Gangaram Hospital in Delhi, which her record lists both as a qualification and as an award. Her laparoscopic work rests on intensive training in laparoscopic surgeries and minimal access surgery at Sunrise Hospital in Kochi, taken under Dr. Hafiz Rehman. She has also completed advanced USG training, which covers the imaging side.

Her record notes that she is a regular attendee and participant at international and national meetings in obstetrics and gynecology, so continuing academic involvement sits alongside the clinical work. Her practice is based at Fortis Hospital in Shalimar Bagh, Delhi.

**Word count:** 223

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 11. Dr. Nidhi Sharma

**Slug:** `dr-nidhi-sharma` · Sarvodaya Hospital, Faridabad, Delhi NCR

### Existing BIO

Dr. Nidhi Sharma is Consultant at Sarvodaya Hospital in Delhi NCR, India. She has practised gynecology in India for 15+ years experience. Hysterectomy, myomectomy, endometriosis, cyst and pelvic-floor lists are tagged for later pSEO under country, city, specialty and procedure — Endometriosis Surgery, Ovarian Cyst Surgery and Laparoscopic Hysterectomy when MRI, ultrasound or hysteroscopy already make the indication honest. Laparoscopic versus robotic, vaginal or abdominal hysterectomy, uterus-sparing myomectomy versus hysterectomy, and excision versus ablation for endometriosis are written after records review — not from a brochure robot count. Training includes MRCOG Part 1 (Member of the Royal College of Obstetricians and Gynaecologists). International patients meet her on camera first; travel to Delhi NCR is offered only if this gynecology floor is the right list.

### Proposed BIO

Dr. Nidhi Sharma is a Consultant at Sarvodaya Hospital, Faridabad, in the Delhi NCR, with more than 15 years of experience across obstetrics and gynaecology and infertility and IVF.

Her clinical work covers uterine fibroids, ovarian cysts, abnormal uterine bleeding, chronic pelvic pain and endometriosis, together with menopause management. Endometriosis appears in her profile as both treatment and surgery. Her operating list runs to hysterectomy and laparoscopic hysterectomy, myomectomy and laparoscopic myomectomy, ovarian cyst surgery, endometriosis surgery, and therapeutic dilation and curettage.

She holds an MBBS and an MD in obstetrics and gynaecology, and has cleared Part 1 of the MRCOG of the Royal College of Obstetricians and Gynaecologists.

Her career has moved across three cities. She has worked at GIMS in Gulbarga, then in Pune at RHC and at Aditya Birla Hospital, before her present work in the Delhi NCR. Alongside the hospital in Faridabad she also practises at the Sarvodaya Health Clinic in Sector 87, Greater Faridabad, so her work is split between the main hospital and a clinic in the newer part of the same city.

She is a member of FOGSI, the Federation of Obstetric and Gynecological Societies of India.

The record describes a gynaecologist whose list is weighted towards the medical and minimal access management of fibroids, cysts, bleeding and endometriosis, and whose posts have taken her from Gulbarga through Pune to the Delhi NCR.

**Word count:** 230

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, memberships, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 12. Dr. Shweta Gangal

**Slug:** `dr-shweta-gangal` · Fortis Memorial Research Institute, Delhi NCR

### Existing BIO

Dr. Shweta Gangal is Senior Consultant at Fortis Memorial Research Institute in Delhi NCR, India. She has practised gynecology in India for 13+ years experience. Hysterectomy, myomectomy, endometriosis, cyst and pelvic-floor lists are tagged for later pSEO under country, city, specialty and procedure — Endometriosis Surgery, Hysteroscopic Polypectomy and Ovarian Cyst Surgery when MRI, ultrasound or hysteroscopy already make the indication honest. Laparoscopic versus robotic, vaginal or abdominal hysterectomy, uterus-sparing myomectomy versus hysterectomy, and excision versus ablation for endometriosis are written after records review — not from a brochure robot count. Training includes MBBS (Gold Medalist) — Sawai Mansingh Medical College, Jaipur. International patients meet her on camera first; travel to Delhi NCR is offered only if this gynecology floor is the right list.

### Proposed BIO

Dr. Shweta Gangal is a Senior Consultant at the Fortis Memorial Research Institute in the Delhi NCR, with more than 13 years of experience in obstetrics and gynaecology.

Her clinical work covers uterine fibroids, ovarian cysts and abnormal uterine bleeding. Her operating list runs to hysterectomy and laparoscopic hysterectomy, myomectomy and laparoscopic myomectomy, ovarian cyst surgery, endometriosis surgery, endometrial ablation, therapeutic dilation and curettage, and uterine polyp removal by hysteroscopic polypectomy.

Both of her degrees were taken at Sawai Mansingh Medical College in Jaipur. She qualified MBBS there as a gold medalist and returned for her MS in obstetrics and gynaecology, so her entire primary and postgraduate training took place at a single institution.

Four further qualifications sit on top of that base, and they divide neatly in two. On the surgical side she holds the F.MAS, a fellowship in minimal access surgery, and the D.MAS, a diploma in minimal access surgery awarded through WALS at World Laparoscopy Hospital, which together account for the laparoscopic and hysteroscopic weighting of her list. On the other side she holds the FICMCH of the Indian College of Maternal and Child Health and the FRM, a fellowship in reproductive medicine.

Her practice is based at the Fortis Memorial Research Institute in Gurugram. The record therefore describes a gynaecologist who trained wholly in Jaipur and then built a doubly credentialled minimal access practice alongside maternal health and reproductive medicine qualifications.

**Word count:** 235

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 13. Dr. Navaneetha Elati

**Slug:** `dr-navaneetha-elati` · Yashoda Hospitals, Somajiguda, Hyderabad

### Existing BIO

Dr. Navaneetha Elati is Consultant Obstetric & Gynaecologic Laparoscopic Surgeon at Yashoda Hospitals in Hyderabad, India. She has practised gynecology in India for 9+ years experience. Hysterectomy, myomectomy, endometriosis, cyst and pelvic-floor lists are tagged for later pSEO under country, city, specialty and procedure — Endometriosis Surgery, Ovarian Cyst Surgery and Laparoscopic Myomectomy when MRI, ultrasound or hysteroscopy already make the indication honest. Laparoscopic versus robotic, vaginal or abdominal hysterectomy, uterus-sparing myomectomy versus hysterectomy, and excision versus ablation for endometriosis are written after records review — not from a brochure robot count. Training includes MBBS — Kamineni Institute of Medical Sciences. International patients meet her on camera first; travel to Hyderabad is offered only if this gynecology floor is the right list.

### Proposed BIO

Dr. Navaneetha Elati is a Consultant Obstetric and Gynaecologic Laparoscopic Surgeon at Yashoda Hospitals, Somajiguda, Hyderabad, with more than 9 years of experience in obstetrics and gynaecology.

Laparoscopy is named in her designation, and the operating list follows it. She performs laparoscopic myomectomy, ovarian cyst surgery, endometriosis surgery and endometrial ablation. On the medical side she manages uterine fibroids, ovarian cysts and abnormal uterine bleeding, and provides menopause management, so the same conditions are covered both in clinic and in theatre.

Her training was taken at two institutions. She qualified MBBS at the Kamineni Institute of Medical Sciences, then moved to Bangalore Baptist Hospital for her DNB.

Her posts since then have brought her back. She has worked at Bangalore Baptist Hospital, where she trained, and at the ESIC Medical College, and within the Yashoda group she has been at both the Secunderabad hospital and her present base at Somajiguda in Hyderabad.

She belongs to two professional bodies, one national and one local: FOGSI, the Federation of Obstetrics and Gynaecological Society of India, and the Obstetrics and Gynaecological Society of Hyderabad, the OGSH.

Taken together the record describes a gynaecologist early in her consultant career whose practice is defined by the keyhole approach named in her title, applied to fibroids, cysts, endometriosis and abnormal bleeding at a large Hyderabad hospital.

**Word count:** 220

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, memberships, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
