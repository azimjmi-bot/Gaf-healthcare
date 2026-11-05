export { NEUROSURGERY_COST, NEUROSURGERY_CLUSTER_BY_PROCEDURE, NEUROSURGERY_SHARED } from "./treatment-cost-ranges";
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

