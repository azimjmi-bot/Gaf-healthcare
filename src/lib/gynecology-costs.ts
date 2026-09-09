export const GYNECOLOGY_COST: Record<string, { us: string; partner: string; stay: string }> = {
  "Laparoscopic Hysterectomy": {
    us: "$15,000–$35,000",
    partner: "$3,000–$7,000",
    stay: "1–3 nights",
  },
  "Robotic Hysterectomy": {
    us: "$20,000–$45,000",
    partner: "$5,000–$10,000",
    stay: "1–3 nights",
  },
  "Vaginal Hysterectomy": {
    us: "$12,000–$28,000",
    partner: "$2,500–$6,000",
    stay: "1–3 nights",
  },
  "Abdominal Hysterectomy": {
    us: "$15,000–$35,000",
    partner: "$3,000–$7,500",
    stay: "2–5 nights",
  },
  "Laparoscopic Myomectomy": {
    us: "$12,000–$30,000",
    partner: "$2,800–$7,000",
    stay: "1–3 nights",
  },
  "Robotic Myomectomy": {
    us: "$18,000–$40,000",
    partner: "$4,500–$9,000",
    stay: "1–3 nights",
  },
  "Hysteroscopic Myomectomy": {
    us: "$6,000–$15,000",
    partner: "$1,200–$3,500",
    stay: "Outpatient or 1 night",
  },
  "Endometriosis Surgery": {
    us: "$15,000–$40,000",
    partner: "$3,000–$8,000",
    stay: "1–3 nights",
  },
  "Hysteroscopic Polypectomy": {
    us: "$4,000–$10,000",
    partner: "$800–$2,500",
    stay: "Outpatient",
  },
  "Ovarian Cyst Surgery": {
    us: "$8,000–$20,000",
    partner: "$1,800–$4,500",
    stay: "1–2 nights",
  },
  Oophorectomy: {
    us: "$10,000–$25,000",
    partner: "$2,000–$5,500",
    stay: "1–3 nights",
  },
  "Salpingo-Oophorectomy": {
    us: "$12,000–$28,000",
    partner: "$2,500–$6,500",
    stay: "1–3 nights",
  },
  "Pelvic Organ Prolapse Surgery": {
    us: "$15,000–$35,000",
    partner: "$3,000–$7,500",
    stay: "2–4 nights",
  },
  "Pelvic Floor Repair": {
    us: "$12,000–$30,000",
    partner: "$2,500–$6,500",
    stay: "1–3 nights",
  },
  "Gynecologic Cancer Surgery": {
    us: "$20,000–$50,000",
    partner: "$5,000–$12,000",
    stay: "3–7 nights",
  },
};

export const GYNECOLOGY_SUMMARIES: Record<string, string> = {
  "Laparoscopic Hysterectomy":
    "Remove a uterus by laparoscopy when fibroids, adenomyosis or bleeding already write hysterectomy and not a myomectomy. Robotic, vaginal and abdominal hysterectomy sit on neighbouring Gynecology slugs. Radical hysterectomy remains the shared surgical-oncology product.",
  "Robotic Hysterectomy":
    "Robotic hysterectomy when a named India list already writes a console after MRI and not a brochure robot count. Laparoscopic and vaginal hysterectomy stay neighbouring approach slugs.",
  "Vaginal Hysterectomy":
    "Remove a uterus by the vagina when descent already makes that route honest. Laparoscopic and abdominal hysterectomy remain neighbouring slugs; prolapse repair is a different product when the vault is the indication.",
  "Abdominal Hysterectomy":
    "Open hysterectomy when size, adhesions or cancer staging already write a laparotomy. Minimally invasive hysterectomy keeps neighbouring Gynecology slugs.",
  "Laparoscopic Myomectomy":
    "Remove fibroids by laparoscopy when fertility or a uterus already belongs on a myomectomy list, not a hysterectomy. Robotic and hysteroscopic myomectomy sit on neighbouring slugs.",
  "Robotic Myomectomy":
    "Robotic myomectomy when a large or intramural fibroid already writes a console. Laparoscopic myomectomy is the neighbouring keyhole slug; hysterectomy is a different product.",
  "Hysteroscopic Myomectomy":
    "Remove a submucosal fibroid through the cervix when hysteroscopy already writes resection. Laparoscopic myomectomy is for serosal and intramural work.",
  "Endometriosis Surgery":
    "Excise endometriosis when pain, cysts or fertility already write surgery. Ablation versus excision, and whether hysterectomy belongs on the same list, are written after imaging — not from a stage brochure.",
  "Hysteroscopic Polypectomy":
    "Remove an endometrial polyp when hysteroscopy already writes resection. Myomectomy and hysterectomy stay neighbouring Gynecology slugs.",
  "Ovarian Cyst Surgery":
    "Remove or strip an ovarian cyst when ultrasound already writes surgery and not observation. Oophorectomy is a different slug when the ovary itself must go.",
  Oophorectomy:
    "Remove an ovary when cyst, torsion or risk already writes oophorectomy. Salpingo-oophorectomy includes the tube; cystectomy keeps the ovary on a neighbouring slug.",
  "Salpingo-Oophorectomy":
    "Remove ovary and tube when risk-reducing or adnexal disease already writes both. Isolated oophorectomy and ovarian-cyst surgery stay neighbouring slugs. Ovarian cytoreduction remains Surgical Oncology.",
  "Pelvic Organ Prolapse Surgery":
    "Repair uterine or vault prolapse when examination already writes reconstruction. Pelvic floor repair is the neighbouring support slug; vaginal hysterectomy is a different product when the uterus must come out.",
  "Pelvic Floor Repair":
    "Repair a pelvic floor when cystocele, rectocele or incontinence already writes reconstruction. Prolapse surgery is the neighbouring vault slug.",
  "Gynecologic Cancer Surgery":
    "Operate when cervical, ovarian or endometrial cancer already belongs on a named gyn-onc list in Delhi NCR, Mumbai, Bengaluru, Chennai or Hyderabad. Radical hysterectomy keeps the shared surgical-oncology slug; ovarian cytoreduction stays on that neighbouring product.",
};

export const GYNECOLOGY_CLUSTER_BY_PROCEDURE: Record<string, string> = {
  "Laparoscopic Hysterectomy": "Hysterectomy",
  "Robotic Hysterectomy": "Hysterectomy",
  "Vaginal Hysterectomy": "Hysterectomy",
  "Abdominal Hysterectomy": "Hysterectomy",
  "Laparoscopic Myomectomy": "Myomectomy",
  "Robotic Myomectomy": "Myomectomy",
  "Hysteroscopic Myomectomy": "Myomectomy",
  "Endometriosis Surgery": "Benign Gynecology",
  "Hysteroscopic Polypectomy": "Benign Gynecology",
  "Ovarian Cyst Surgery": "Benign Gynecology",
  Oophorectomy: "Benign Gynecology",
  "Salpingo-Oophorectomy": "Benign Gynecology",
  "Pelvic Organ Prolapse Surgery": "Pelvic Floor",
  "Pelvic Floor Repair": "Pelvic Floor",
  "Gynecologic Cancer Surgery": "Gynecologic Oncology",
};

export const GYNECOLOGY_CONDITIONS = [
  "Fibroids",
  "Endometriosis",
  "Adenomyosis",
  "Ovarian Cysts",
  "PCOS",
  "Uterine Prolapse",
  "Cervical Cancer",
  "Ovarian Cancer",
  "Endometrial Cancer",
];
