export const batch = {
  title: "Batch 10 — Surgical Oncology, India",
  intro: `
Third Surgical Oncology batch. Every sentence is drawn from that doctor's own record in
\`src/data/ginger-catalog.json\` (designation, hospital, city, experience, qualifications, education,
affiliations, memberships, awards and research). The previous bios in this specialty are GAF
platform boilerplate and carry no doctor-specific facts, so the structured fields are the source.
No external sources, no inference, and no information from any other doctor's profile.
Only \`doctorOverrides["<slug>"].bio\` is written; no pSEO, schema, routing or frontend field changes.

One doctor is flagged rather than rewritten because his record carries no training data and no
verified procedure list.
`,
  doctors: [
    {
      slug: "dr-manikandan-venkatasubramaniyan",
      bio: `Dr. Manikandan Venkatasubramaniyan is a Senior Consultant in surgical oncology at MGM Healthcare, Chennai, with more than 10 years of experience. His practice centres on thoracic and head and neck cancer surgery: lung, esophageal, chest wall and mediastinal tumour resections on one side, and oral, oropharyngeal, hypopharyngeal, laryngeal and thyroid cancer surgery with neck dissection on the other. He also performs mastectomy and sentinel lymph node biopsy for breast cancer.

He qualified MBBS at Thanjavur Medical College in Tamil Nadu in 2011 and took his MS in General Surgery at Armed Forces Medical College, Pune, in 2015. He was awarded FIAGES, the fellowship of the Indian Association of Gastro-Endoscopic Surgeons, in 2018, and completed his DrNB in Surgical Oncology at Rajiv Gandhi Cancer Institute and Research Centre, New Delhi, in 2020.

Endoscopic and robotic technique runs through that training. He trained internationally in uniportal VATS for lung cancer at Shanghai Pulmonary Hospital in China, and is a certified console surgeon in robotic surgery with more than 100 robotic operations recorded. He acts as a proctor for robotic oesophagectomy workshops, teaching the approach to other surgeons.

His academic record includes gold medals at leading surgical oncology conferences including IHPBA and ICC, best poster recognitions at the same national meetings, and multiple national awards for clinical research. He is an invited speaker at ICC, RGCON and other oncology forums, and has authored numerous peer-reviewed publications in surgical oncology.`,
    },
    {
      slug: "dr-puneet-ahluwalia",
      bio: `Dr. Puneet Ahluwalia is Senior Director and Head of Uro Oncology and Robotic Surgery at Medanta – The Medicity, Gurugram, in the Delhi NCR, with more than 20 years of experience. He operates across the urological cancers: radical prostatectomy and other prostate cancer surgery, radical cystectomy and bladder cancer surgery, kidney cancer surgery and testicular cancer surgery.

He holds an MBBS, an MS in General Surgery and an MCh in Urology, and completed a Fellowship in Robotic Urology through advanced robotic urology training at the University of Miami in the United States. He is a member of the International Bladder Cancer Group.

Robotic surgery is also where his teaching sits. He is Program Director of the one-year clinical fellowship in Robotic Uro-Oncology recognised by the USI, and a certified proctor for Intuitive Surgical's Da Vinci robotic systems in India, a role that puts him in theatre alongside surgeons adopting the platform.

His research was recognised with first prize for the best poster at the national USICON conference in Pune in 2013, for a case report with review of the literature on kidney carcinoma associated with Xp 11.2 translocation and TFE3 gene fusion. The Delhi Urological Society gave him its Club Best Award and its Achievers Award at DUSCON in 2019, the latter for exemplary contribution to the field. He reviews for several peer-reviewed international journals and is convenor of the Delhi Uro-Oncology Forum.`,
    },
    {
      slug: "dr-raghuram-k",
      bio: `Dr. Raghuram K is Senior Director of surgical oncology at Max Smart Super Speciality Hospital, Saket, in the Delhi NCR, with more than 20 years of experience.

His surgical range is broad and centred on the gastrointestinal tract: esophageal, gastric, colorectal and rectal cancer surgery, pancreatic and liver cancer surgery, and resection of gallbladder and bile duct cancers. He also operates on head and neck disease, including oral and laryngeal cancer with neck dissection, and on lung cancer.

His postgraduate training was completed at the All India Institute of Medical Sciences in New Delhi, where he took his MS in General Surgery in 2011 and his MCh in Surgical Oncology in 2016. He had qualified MBBS in 2006 from Madurai Medical College under The Tamil Nadu Dr. M.G.R. Medical University in Chennai.

He is currently with Max Healthcare in New Delhi. Earlier posts were at Indraprastha Apollo Hospital in New Delhi, at AIIMS and NCI in New Delhi, at AIIMS Bhubaneswar, and at Mahatma Gandhi Medical College and Research Institute in Puducherry.

His published work follows his operating interests. He reported pathological and long-term oncological outcomes comparing minimally invasive with open esophagectomy for malignancy in the Indian Journal of Surgical Oncology in 2025, and validated clinical T stage by depth of invasion in oral squamous cell carcinoma against imaging in Oral Oncology Reports in 2024. He received Best Paper awards at the Indian Cancer Congress in Mumbai in 2023 and at NATCON IASO in New Delhi in 2021.`,
    },
    {
      slug: "dr-rama-joshi",
      bio: `Dr. Rama Joshi is Chairman of Gynae Oncology and Robotic Surgery at Fortis Memorial Research Institute in the Delhi NCR, where she has practised for more than 32 years.

Her operating practice covers the gynaecological cancers. She performs radical hysterectomy and surgery for cervical, ovarian, endometrial, vulvar and vaginal cancer, and takes on cytoreductive surgery with HIPEC where disease has spread within the abdomen. Sentinel lymph node biopsy forms part of her nodal staging, and she also operates on breast cancer, including mastectomy.

She qualified MBBS as a gold medalist and took her MS in Gynae and Obstetrics. Her subspecialty training was a gynae oncology fellowship at Tata Memorial Hospital in Mumbai. Further training followed abroad: a UICC fellowship at B.G.H. in Buffalo, a period at the Comprehensive Cancer Centre of the University of Michigan, and training at the University of Lyon in France. Her robotic training was taken with da Vinci Intuitive at Sunnyvale, California, which underpins the robotic half of her present role.

Six gold medals were awarded during her academic career, among them the Pfizer Gold Medal for post-graduate excellence, and she holds the Bhamashah Award for academic excellence. Her clinical work has since been recognised with the Double Helical National Health Award in 2017 and a Gold Award for exceptional contributions to women's cancer care and management at the Cancer Care Award.`,
    },
    {
      slug: "dr-rohit-nayyar",
      bio: "",
      note: `NONE — no bio proposed. This record carries no training data and no verified procedure list.
Both the \`education\` and \`proceduresExpertise\` fields contain the affiliations list verbatim — Max
Healthcare, Asian Institute of Medical Sciences Faridabad, Artemis Hospital Gurgaon, Indraprastha
Apollo Hospital New Delhi and Gujarat Cancer Research Institute Ahmedabad — so the profile states
nothing about where he trained and nothing about what he operates on. What remains is a designation,
a hospital, a city, "27+ Years Experience", the degree string MBBS, MS, MCh and three memberships.
The only operations named anywhere on the profile appear in the GAF boilerplate bio, whose contents
cannot be traced to the record's own procedure field because that field holds hospital names. Writing
a surgical biography would mean asserting a training history and an operating range the profile does
not contain, so the doctor is flagged for manual review and left unchanged.`,
    },
    {
      slug: "dr-tushar-aditya-narain",
      bio: `Dr. Tushar Aditya Narain is Director of Urological Oncology and Robotic Surgery at Max Smart Super Speciality Hospital, Saket, in the Delhi NCR, with more than 13 years of experience. He also practises at Max Hospital in Gurgaon.

His operating list is built around cancers of the urinary tract and the male reproductive organs: radical prostatectomy and other prostate cancer surgery, radical cystectomy and bladder cancer surgery, and testicular cancer surgery. He also performs rectal cancer surgery and sentinel lymph node biopsy.

He qualified MBBS at Seth G.S. Medical College and KEM Hospital in Mumbai in 2006, took his MS in Surgery at AIIMS, New Delhi, in 2012, and completed his MCh in Urology at PGIMER, Chandigarh, in 2015. Robotic training followed abroad in two stages. In 2022 he trained in prostate and bladder cancer and robotic surgery at University College London Hospital and completed a fellowship there in robotic pelvic uro-oncology. In 2024 he added a fellowship in single port robotic surgery at the Cleveland Clinic in the United States, supported by a fellowship award from the Indian American Urological Association.

Training other surgeons forms a substantial part of his work: he has taught more than 50 consultant surgeons across 30 hospitals in robotic surgery and uro-oncology. He has published more than 50 papers in national and international indexed journals and written more than five book chapters in uro-oncology and robotic surgery. The Government of NCT of Delhi gave him its Award of Excellence in 2025.`,
    },
    {
      slug: "dr-vimalathithan-s",
      bio: `Dr. Vimalathithan S is Clinical Lead and Senior Consultant in surgical oncology at Gleneagles HealthCity Chennai, with more than 10 years of experience.

Breast cancer surgery is the centre of his practice, and he offers the full range of it: mastectomy, breast-conserving surgery, oncoplastic breast surgery for patients who need reconstruction built into the cancer operation, and sentinel lymph node biopsy for nodal staging. Beyond the breast he operates on colorectal and gastric cancer, ovarian cancer, thyroid cancer, and head and neck disease including oral cancer. He also performs cytoreductive surgery with HIPEC.

His qualifications are unusually layered. He took his MBBS at Thanjavur Medical College and his MS in General Surgery at Stanley Medical College, Chennai, then completed his MCh in Surgical Oncology at Kidwai Memorial Institute of Oncology, Bengaluru, and a DNB in the same subject from the National Board. He is a Member of the Royal College of Surgeons, Edinburgh, holds FMAS in minimal access surgery and FAIRS in robotic surgery, and is a Fellow of the Association of Surgeons of India. He completed a clinical observership at the Nebraska Cancer Center in Omaha.

Within Chennai he has worked at Gleneagles Hospital in Perumbakkam, at Apollo Cancer Hospital in Teynampet and at SIMS Hospitals in Vadapalani, and has been associated with SRM Medical College.`,
    },
    {
      slug: "dr-anil-k-d-cruz",
      bio: `Dr. Anil K D'Cruz is Senior Consultant in Surgical Oncology at Apollo Athenaa Women's Cancer Centre in the Delhi NCR, with more than 33 years of experience. He has also practised within Apollo Hospitals in Mumbai, Chennai and Delhi.

His surgical work is concentrated in the head and neck. He operates on oral, oropharyngeal, hypopharyngeal and laryngeal cancer, on thyroid cancer including thyroidectomy, and on head and neck tumours generally. Neck dissection and sentinel lymph node biopsy are central to how he manages the nodes of the neck.

He holds an MBBS, an MS and a DNB in General Surgery, and was awarded an honorary FRCS by the Royal College of Surgeons in London.

The question of how aggressively to treat the neck in oral cancer runs through his published work. He has reported on elective versus therapeutic neck dissection in oral cancer and, separately, in node-negative oral cancer — the comparison that decides whether a patient with no clinically involved nodes should have them removed at the first operation. He has also published on predictors of prognosis for squamous cell carcinoma of the oral tongue and a review of current management strategies in oral cancer.

He was President Elect of the Union International for Cancer Control from 2018 to 2020 and its President from 2020 to 2022, the first Indian to hold that position at an organisation headquartered in Geneva.`,
    },
    {
      slug: "dr-ashwin-sunil-tamhankar",
      bio: `Dr. Ashwin Sunil Tamhankar is Consultant Surgical Oncologist and Robotic Surgeon at Apollo Hospitals, Navi Mumbai, with more than 9 years of experience. He previously worked at Tata Memorial Hospital in Mumbai.

His practice is uro-oncological. He performs radical prostatectomy, radical cystectomy and bladder cancer surgery, kidney cancer surgery and testicular cancer surgery, and the robotic platform sits in his title rather than as an occasional addition to it.

He holds an MBBS, an MS, an MCh in Urology and a DNB in Urology. Three fellowships followed, each in a different operating technology. He completed the Vattikuti Robotic Uro-oncology Fellowship at Max Institute of Cancer Care, New Delhi, between February 2017 and February 2018. He then took a laser urological robotic fellowship approved by the Royal College of Surgeons of England and the British Association of Urological Surgeons. The third, the Olympus Laparoscopic Endo-Urology Fellowship, was completed at the Asian Institute of Nephrology and Urology in Hyderabad.

His academic record is built on national prizes. He placed second nationally for the Dr. G. M. Phadke Travelling Fellowship in 2016, first nationally for the Dr. Sitharaman Memorial Prize for best essay in 2018 on the future of urology research in India, and first nationally for the Dr. Brij Kishore Patna Prize Paper for the best scientific paper at USICON in 2019.`,
    },
    {
      slug: "dr-pakhee-aggarwal",
      bio: `Dr. Pakhee Aggarwal is a Senior Consultant at Indraprastha Apollo Hospital in the Delhi NCR, with more than 20 years of experience. She also works at the Apollo Athenea Women's Cancer Centre.

Her surgical practice is in gynaecological cancer. She performs radical hysterectomy and operates on cervical, ovarian and endometrial cancer, as well as on the less common vulvar and vaginal cancers, and uses sentinel lymph node biopsy for nodal assessment. She also operates on breast cancer.

She qualified MBBS and took an MS, and holds three further postgraduate memberships: MRCOG from the Royal College of Obstetricians and Gynaecologists in the United Kingdom, FICOG from the Indian College of Obstetricians and Gynaecologists, and MIPHA from the Indian Public Health Association. Her subspecialty training was taken abroad on two fellowships. The first was a UICC Robotic Gynae-Oncology Fellowship at McGill University in Montreal, Canada; the second a Commonwealth Gynae-Oncology Fellowship at Oxford, following the specialised training standard set by the European Society of Gynaecological Oncology.

She collected more than 20 gold, silver and bronze medals during her residency training. Training others is now part of her role. She is a resource faculty trainer for the Royal College of Obstetricians and Gynaecologists in London, acting as a clinical examiner for the Part 3 MRCOG examinations, and a resource faculty trainer for the National Institute of Cytology and Preventive Oncology, which sits under ICMR and the Ministry of Health and Family Welfare.`,
    },
    {
      slug: "dr-shruti-bhatia",
      bio: `Dr. Shruti Bhatia is Director of Gynaecological Surgical Oncology at BLK-Max Super Speciality Hospital in the Delhi NCR, with more than 27 years of experience.

Her practice is confined to the gynaecological cancers and covers them in depth. She performs radical hysterectomy and surgery for cervical, endometrial, vulvar and vaginal cancer, and takes on ovarian cancer including debulking and cytoreductive surgery where disease is extensive. Node management runs from sentinel lymph node biopsy through to full gynecologic cancer lymphadenectomy. Robotic gynecologic oncology surgery is part of her operating repertoire, and she also manages hormonal therapy for gynaecologic cancers, so her care continues past the operation itself.

She qualified MBBS and took an MD in Obstetrics and Gynaecology, followed by a DNB in the same subject. She is also MNAMS.

Her career has been built in Delhi and shows a steady progression through its cancer units. She began as a junior consultant at Sunderlal Jain Hospital, at Rajiv Gandhi Cancer Institute and at Sri Balaji Action Medical Institute. She moved to BLK Super Speciality Hospital as consultant in surgical oncology and gynae oncology, and then to Action Cancer Hospital as principal consultant and head of gynae oncology. She now holds her directorship at BLK-Max Super Speciality Hospital in New Delhi.`,
    },
    {
      slug: "dr-sivakumar-mahalingam",
      bio: `Dr. Sivakumar Mahalingam is a Senior Consultant in surgical oncology at MGM Healthcare, Chennai, with more than 22 years of experience.

His operating practice sits across two areas that are often kept separate. On one side are the urological cancers: kidney, bladder, prostate and testicular cancer surgery. On the other is musculoskeletal oncology, covering bone cancer and bone tumour surgery, soft tissue sarcoma surgery, and limb salvage surgery, where the aim is to clear the tumour while preserving the limb.

He qualified MBBS in 2004 from Vinayaka Mission's Research Foundation, a deemed-to-be university in Salem, Tamil Nadu, and completed his MS in General Surgery at Madurai Medical College in 2009. His super-specialty training was at the Cancer Institute (WIA) in Chennai, where he took his MCh in Surgical Oncology in 2014; the National Board of Examinations awarded him a DNB in Surgical Oncology in the same year. In 2017 he added a Fellowship in Minimal Access Surgery from the Association of Minimal Access Surgeons of India.

He holds membership of six professional bodies: the Indian Medical Association, the Association of Surgeons of India, the Indian Association of Surgical Oncology, the Association of Minimal Access Surgeons of India, the Indian Society of Oncology and the Society of Surgical Oncology.`,
    },
    {
      slug: "dr-sumedha-gupta",
      bio: `Dr. Sumedha Gupta is an Associate Consultant at Medanta – The Medicity, Gurugram, in the Delhi NCR, with more than 15 years of experience. Her work spans gynecologic oncology within surgical oncology and general obstetrics and gynaecology.

Her surgical practice covers the gynaecological cancers. She performs radical hysterectomy and operates on cervical, endometrial, ovarian and vulvar cancer, and uses sentinel lymph node biopsy to assess the regional nodes rather than removing them all as a matter of course.

Her training was completed largely in New Delhi. She qualified MBBS at Vardhman Mahavir Medical College and Safdarjung Hospital and stayed there for her MS in Obstetrics and Gynaecology. She then took a DNB in Obstetrics and Gynaecology, and subspecialised with a DrNB in Gynaecological Oncology from the National Board of Examinations.

Two of her certifications are in minimal access surgery. FMAS and DMAS were both awarded in recognition of advanced skills in operating through small incisions, and they explain why her cancer operations are not limited to open approaches. Her ESGO certification, from the European Society of Gynaecological Oncology, reflects adherence to international standards in gynaecological oncology.

She was a medalist during her medical training, recognised for academic excellence, and she is a published researcher with multiple papers in indexed international journals.`,
    },
    {
      slug: "dr-kanika-rana",
      bio: `Dr. Kanika Rana is a Senior Consultant at Medanta – The Medicity, Gurugram, in the Delhi NCR, with more than 14 years of experience in head and neck surgical oncology.

Her operating practice covers cancers of the upper aerodigestive tract and the glands around it. She performs oral cancer surgery, oropharyngeal cancer surgery and laryngeal cancer surgery, along with laryngeal surgery for non-malignant disease. She also carries out parathyroidectomy, salivary gland tumour removal and other salivary gland surgery.

She came to oncology through ear, nose and throat surgery. After qualifying MBBS she completed her M.S. in ENT at Maulana Azad Medical College in 2012 and holds a D.N.B. in the same subject. Her subspecialty training was a fellowship in head and neck oncology at Medanta, where she now practises.

She has twice observed at major American centres. In 2015 she undertook a clinical observership in head and neck surgery at Johns Hopkins Hospital in Baltimore, supported by an International Visiting Scholarship from the American Academy of Otolaryngology–Head and Neck Surgery. In 2022 she returned for a clinical observership in head and neck oncology at Memorial Sloan Kettering Cancer Center.

Her earlier academic record was built at conferences of the AOI: first prize in the quiz at the 38th annual state conference in Delhi in 2015, second prize at the 36th in 2013, and first prize for poster presentation at the 62nd annual national conference in Mumbai in 2010.`,
    },
  ],
};
