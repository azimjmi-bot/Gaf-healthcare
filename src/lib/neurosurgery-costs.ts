export const NEUROSURGERY_COST: Record<string, { us: string; partner: string; stay: string }> = {
  "Brain Tumor Surgery": {
    us: "$50,000–$150,000",
    partner: "$6,000–$15,000",
    stay: "5–10 nights",
  },
  "Glioma Surgery": {
    us: "$55,000–$160,000",
    partner: "$7,000–$16,000",
    stay: "5–12 nights",
  },
  "Meningioma Surgery": {
    us: "$50,000–$140,000",
    partner: "$6,500–$15,000",
    stay: "5–10 nights",
  },
  "Pituitary Tumor Surgery": {
    us: "$40,000–$100,000",
    partner: "$5,000–$12,000",
    stay: "3–7 nights",
  },
  "Skull Base Surgery": {
    us: "$60,000–$180,000",
    partner: "$8,000–$20,000",
    stay: "6–12 nights",
  },
  "Endoscopic Brain Surgery": {
    us: "$30,000–$80,000",
    partner: "$5,000–$12,000",
    stay: "3–7 nights",
  },
  "Endoscopic Skull Base Surgery": {
    us: "$40,000–$110,000",
    partner: "$6,000–$15,000",
    stay: "4–8 nights",
  },
  "Stereotactic Brain Biopsy": {
    us: "$10,000–$25,000",
    partner: "$2,000–$6,000",
    stay: "1–3 nights",
  },
  "Aneurysm Clipping": {
    us: "$50,000–$120,000",
    partner: "$8,000–$18,000",
    stay: "7–14 nights",
  },
  "Aneurysm Coiling": {
    us: "$50,000–$150,000",
    partner: "$10,000–$25,000",
    stay: "3–8 nights",
  },
  "AVM Surgery": {
    us: "$50,000–$130,000",
    partner: "$8,000–$20,000",
    stay: "7–14 nights",
  },
  "AVM Embolization": {
    us: "$40,000–$100,000",
    partner: "$8,000–$18,000",
    stay: "2–6 nights",
  },
  "Stroke Thrombectomy": {
    us: "$40,000–$90,000",
    partner: "$8,000–$16,000",
    stay: "5–12 nights",
  },
  "Cerebral Bypass": {
    us: "$60,000–$150,000",
    partner: "$10,000–$22,000",
    stay: "7–14 nights",
  },
  "Deep Brain Stimulation": {
    us: "$70,000–$150,000",
    partner: "$20,000–$40,000",
    stay: "3–7 nights",
  },
  "Epilepsy Surgery": {
    us: "$50,000–$150,000",
    partner: "$8,000–$20,000",
    stay: "5–10 nights",
  },
  "Stereotactic Brain Surgery": {
    us: "$30,000–$80,000",
    partner: "$6,000–$15,000",
    stay: "2–5 nights",
  },
  "Hydrocephalus Surgery": {
    us: "$20,000–$50,000",
    partner: "$3,000–$8,000",
    stay: "3–7 nights",
  },
  "Endoscopic Third Ventriculostomy (ETV)": {
    us: "$20,000–$50,000",
    partner: "$3,000–$8,000",
    stay: "2–5 nights",
  },
  "Chiari Surgery": {
    us: "$30,000–$80,000",
    partner: "$5,000–$12,000",
    stay: "4–8 nights",
  },
  "Craniosynostosis Surgery": {
    us: "$40,000–$100,000",
    partner: "$6,000–$15,000",
    stay: "4–8 nights",
  },
};

export const NEUROSURGERY_SUMMARIES: Record<string, string> = {
  "Brain Tumor Surgery":
    "Remove or debulk an intracranial tumour when MRI already writes a craniotomy list in Delhi NCR, Mumbai, Bengaluru, Chennai or Hyderabad. Glioma, meningioma and pituitary keep neighbouring Neurosurgery slugs. Gamma Knife remains the shared radiation-oncology radiosurgery product.",
  "Glioma Surgery":
    "Resect glioma when mapping, fluorescence or awake craniotomy already belongs on a named India list. Brain tumour surgery is the neighbouring umbrella slug; radiosurgery stays on Gamma Knife, CyberKnife and SRS.",
  "Meningioma Surgery":
    "Remove meningioma when location and grade already write a skull-base or convexity list. Skull base surgery is the neighbouring corridor slug; radiosurgery is a different product when observation or GK is still honest.",
  "Pituitary Tumor Surgery":
    "Resect a pituitary adenoma when endocrinology and MRI already write transsphenoidal work. Endoscopic skull base surgery is the neighbouring corridor slug — not a brochure endoscope count.",
  "Skull Base Surgery":
    "Operate a skull-base lesion when corridor, vessel and cranial-nerve risk already write an open or combined list. Endoscopic skull base surgery stays the neighbouring keyhole slug.",
  "Endoscopic Brain Surgery":
    "Reach an intracranial target through an endoscope when the anatomy already makes that route honest. Open brain tumour surgery remains the neighbouring craniotomy slug.",
  "Endoscopic Skull Base Surgery":
    "Reach the sella or anterior skull base through the nose when reconstruction and CSF risk already belong on that list. Open skull base surgery is the neighbouring corridor slug.",
  "Stereotactic Brain Biopsy":
    "Sample an intracranial lesion when a frame or frameless trajectory already writes biopsy and not resection. Stereotactic brain surgery is the neighbouring functional slug; radiosurgery is a different product.",
  "Aneurysm Clipping":
    "Clip an intracranial aneurysm when angiography already writes an open list. Coiling is the neighbouring endovascular slug — not a brochure coil count.",
  "Aneurysm Coiling":
    "Coil an intracranial aneurysm when the neck and vessel already write an endovascular list. Clipping remains the neighbouring open slug.",
  "AVM Surgery":
    "Resect an arteriovenous malformation when grade and location already write an open list. Embolization and radiosurgery stay neighbouring products.",
  "AVM Embolization":
    "Embolise an AVM when angiography already writes an endovascular first step. Open AVM surgery and Gamma Knife remain neighbouring slugs.",
  "Stroke Thrombectomy":
    "Retrieve an intracranial clot when CTA or angiogram already writes large-vessel occlusion. Cerebral bypass is a different product when chronic ischaemia, not hyperacute stroke, is the indication.",
  "Cerebral Bypass":
    "Bypass intracranial vessels when moyamoya or chronic ischaemia already writes a STA-MCA or similar list. Acute thrombectomy is the neighbouring stroke slug.",
  "Deep Brain Stimulation":
    "Implant DBS when Parkinson, tremor or dystonia already writes a named functional-neurosurgery list in India. Device, laterality and programming are set after records review — not from a brochure battery count.",
  "Epilepsy Surgery":
    "Resect or disconnect an epileptogenic zone when video-EEG and MRI already write surgery. Stereotactic brain surgery is the neighbouring trajectory slug; radiosurgery is a different product.",
  "Stereotactic Brain Surgery":
    "Reach a deep target with a stereotactic trajectory when biopsy, lesioning or lead placement already writes that list. Radiosurgery (SRS, Gamma Knife, CyberKnife) stays on the shared radiation-oncology slugs.",
  "Hydrocephalus Surgery":
    "Treat hydrocephalus when imaging already writes a shunt list. Endoscopic third ventriculostomy is the neighbouring ETV slug when anatomy still allows it.",
  "Endoscopic Third Ventriculostomy (ETV)":
    "Open a third-ventricle stoma when obstructive hydrocephalus already writes ETV and not a first shunt. Hydrocephalus surgery remains the neighbouring shunt slug.",
  "Chiari Surgery":
    "Decompress Chiari malformation when MRI already writes foramen-magnum work. Hydrocephalus and syringomyelia lists are neighbouring products when they already belong on the same dossier.",
  "Craniosynostosis Surgery":
    "Remodel a fused suture when paediatric examination and CT already write craniosynostosis surgery. This is a Neurosurgery slug, not a cosmetic cranioplasty brochure.",
};

export const NEUROSURGERY_CLUSTER_BY_PROCEDURE: Record<string, string> = {
  "Brain Tumor Surgery": "Neuro-Oncology",
  "Glioma Surgery": "Neuro-Oncology",
  "Meningioma Surgery": "Neuro-Oncology",
  "Pituitary Tumor Surgery": "Neuro-Oncology",
  "Spinal Tumor Surgery": "Neuro-Oncology",
  "Skull Base Surgery": "Skull Base & Neuroendoscopy",
  "Endoscopic Brain Surgery": "Skull Base & Neuroendoscopy",
  "Endoscopic Skull Base Surgery": "Skull Base & Neuroendoscopy",
  "Stereotactic Brain Biopsy": "Skull Base & Neuroendoscopy",
  "Aneurysm Clipping": "Neurovascular",
  "Aneurysm Coiling": "Neurovascular",
  "AVM Surgery": "Neurovascular",
  "AVM Embolization": "Neurovascular",
  "Stroke Thrombectomy": "Neurovascular",
  "Cerebral Bypass": "Neurovascular",
  "Deep Brain Stimulation": "Functional Neurosurgery",
  "Epilepsy Surgery": "Functional Neurosurgery",
  "Stereotactic Brain Surgery": "Functional Neurosurgery",
  "Gamma Knife": "Radiosurgery",
  CyberKnife: "Radiosurgery",
  "Stereotactic Radiosurgery (SRS)": "Radiosurgery",
  "Hydrocephalus Surgery": "Pediatric Neurosurgery",
  "Endoscopic Third Ventriculostomy (ETV)": "Pediatric Neurosurgery",
  "Chiari Surgery": "Pediatric Neurosurgery",
  "Craniosynostosis Surgery": "Pediatric Neurosurgery",
};

export const NEUROSURGERY_CONDITIONS = [
  "Brain tumours",
  "Glioma",
  "Meningioma",
  "Pituitary adenoma",
  "Spinal tumours",
  "Aneurysm",
  "AVM",
  "Stroke",
  "Epilepsy",
  "Parkinson disease and tremor",
  "Hydrocephalus",
  "Chiari malformation",
  "Craniosynostosis",
];

export const NEUROSURGERY_SHARED = [
  "Gamma Knife",
  "CyberKnife",
  "Stereotactic Radiosurgery (SRS)",
  "Spinal Tumor Surgery",
  "Skull Base Surgery",
] as const;
