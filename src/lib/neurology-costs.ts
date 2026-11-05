export { NEUROLOGY_COST, NEUROLOGY_CLUSTER_BY_PROCEDURE, NEUROLOGY_SHARED } from "./treatment-cost-ranges";
export const NEUROLOGY_SUMMARIES: Record<string, string> = {
  EEG: "Record cortical rhythms when seizures, encephalopathy or a first unprovoked event already write an EEG list in Delhi NCR, Mumbai, Bengaluru, Chennai or Hyderabad. Video EEG keeps a neighbouring Neurology slug when a captured event is the question. This is a planning range, not a quote.",
  "Video EEG":
    "Capture events on camera with continuous EEG when the history already writes inpatient monitoring, not a ten-minute outpatient tracing. EEG remains the routine slug. Vagus nerve stimulation stays a neighbouring epilepsy product.",
  "Electromyography (EMG)":
    "Needle EMG when weakness, denervation or a myopathy already write electrodiagnosis. Nerve conduction study is a neighbouring slug; EMG/NCS on a faculty list maps to this pair, not a third product.",
  "Nerve Conduction Study":
    "Surface conduction when neuropathy, entrapment or CIDP already write NCS. EMG stays the needle slug. Plasmapheresis and IVIG sit under neuromuscular therapy, not under this diagnostic sheet.",
  "Evoked Potentials":
    "Visual, auditory or somatosensory potentials when MS, optic pathway or intraoperative monitoring already write an EP list. EEG is a different diagnostic slug.",
  "Lumbar Puncture":
    "CSF when meningitis, Guillain-Barré, MS or idiopathic intracranial hypertension already write an LP. This is not a neurosurgical drain sheet.",
  "IV Thrombolysis":
    "Intravenous alteplase or tenecteplase when a clock and non-contrast CT already write lytic therapy. Mechanical thrombectomy remains the shared Stroke Thrombectomy slug with Neurosurgery.",
  "Transcranial Doppler (TCD)":
    "Bedside intracranial flow when vasospasm, sickle-cell stroke risk or intracranial stenosis already write TCD. Carotid Doppler is a neck vessel slug, not this window.",
  "Carotid Doppler":
    "Extracranial carotid duplex when TIA, bruit or pre-operative risk already write a neck Doppler. TCD remains the intracranial window.",
  "MRI-Guided Focused Ultrasound (MRgFUS)":
    "Incisionless thalamotomy when tremor already writes focused ultrasound and not a DBS implant. Deep brain stimulation remains the shared Neurosurgery slug.",
  "Botulinum Toxin Therapy":
    "Targeted toxin when cervical dystonia, hemifacial spasm, spasticity or chronic migraine already write injections. Migraine nerve block is a neighbouring headache slug, not this toxin product.",
  Plasmapheresis:
    "Plasma exchange when GBS, myasthenia crisis or antibody-mediated disease already write a course of sessions. IVIG is a neighbouring infusion slug, not the same product.",
  "IVIG (Intravenous Immunoglobulin)":
    "Immunoglobulin when CIDP, myasthenia or antibody-mediated neuropathy already write IVIG rather than plasma exchange. Plasmapheresis keeps its own sheet.",
  "Nerve and Muscle Biopsy":
    "Tissue when electrodiagnosis and MRI still leave vasculitis, myositis or an unexplained neuropathy unanswered. EMG and NCS stay diagnostic neighbours.",
  "Vagus Nerve Stimulation (VNS)":
    "Implant a vagus stimulator when drug-resistant epilepsy already writes neuromodulation and not resective epilepsy surgery. Epilepsy surgery remains on Neurosurgery. EEG and video EEG stay diagnostic neighbours.",
  "Sleep Study (Polysomnography)":
    "Overnight polysomnography when OSA, narcolepsy work-up or REM behaviour already write a sleep lab night. This is a Neurology sheet, not a pulmonology airway stent product.",
  "Migraine Nerve Block":
    "Occipital or pericranial block when chronic migraine already writes a block clinic. Botulinum toxin therapy is a neighbouring movement and headache slug.",
};

export const NEUROLOGY_CONDITIONS = [
  "Epilepsy and first seizure",
  "Ischaemic stroke and TIA",
  "Parkinson disease and tremor",
  "Dystonia and spasticity",
  "Guillain-Barré and CIDP",
  "Myasthenia gravis",
  "Peripheral neuropathy",
  "Multiple sclerosis",
  "Migraine",
  "Obstructive sleep apnoea work-up",
];

