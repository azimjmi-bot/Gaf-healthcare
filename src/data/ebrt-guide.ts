export const EBRT_NAME = "External Beam Radiotherapy (EBRT)";

export const ebrtMeta = {
  title: "External Beam Radiation Therapy (EBRT): Cost, Treatment, Procedure, Sessions & Recovery",
  description:
    "EBRT uses a linear accelerator outside the body to treat cancer. Compare India city costs, sessions, IMRT/IGRT/SBRT options, and named radiation oncologists at GAF Healthcare partner campuses.",
};

export const indiaCityCosts: {
  city: string;
  range: string;
  listed: boolean;
}[] = [
  { city: "Delhi NCR", range: "$1,500 – $6,000", listed: true },
  { city: "Mumbai", range: "$1,200 – $6,000", listed: true },
  { city: "Bengaluru", range: "$1,100 – $6,000", listed: true },
  { city: "Chennai", range: "$1,000 – $6,000", listed: true },
  { city: "Hyderabad", range: "$1,000 – $6,000", listed: true },
  { city: "Kolkata", range: "$850 – $6,000", listed: false },
  { city: "Pune", range: "$1,000 – $5,400", listed: false },
  { city: "Ahmedabad", range: "$900 – $5,400", listed: false },
  { city: "Kochi", range: "$1,500 – $6,000", listed: false },
  { city: "Jaipur", range: "$1,600 – $8,400", listed: false },
];

export const destinationCosts: { place: string; range: string }[] = [
  { place: "India", range: "$1,000 – $6,000+" },
  { place: "Thailand", range: "$3,000 – $5,400+" },
  { place: "Türkiye", range: "$3,000 – $7,000" },
  { place: "Malaysia", range: "$2,400 – $7,300" },
  { place: "United Arab Emirates", range: "$2,700 – $10,900" },
  { place: "Singapore", range: "$4,000 – $20,000+" },
  { place: "South Korea", range: "$1,650 – $5,500+" },
  { place: "Japan", range: "$2,100 – $7,000+" },
  { place: "Mexico", range: "$5,000 – $20,000+*" },
  { place: "Germany", range: "$2,600 – $8,700+" },
];

export const techniques: { name: string; what: string; procedure?: string }[] = [
  { name: "3D-CRT", what: "Shapes radiation beams to the three-dimensional tumour", procedure: "3D Conformal Radiotherapy (3D-CRT)" },
  { name: "IMRT", what: "Modulates radiation intensity to better conform the dose to the tumour", procedure: "Intensity-Modulated Radiotherapy (IMRT)" },
  { name: "IGRT", what: "Uses imaging immediately before or during treatment to improve targeting", procedure: "Image-Guided Radiotherapy (IGRT)" },
  { name: "VMAT", what: "Delivers modulated radiation while the machine rotates around the patient" },
  { name: "SRS", what: "Delivers highly focused radiation, generally in one or a few fractions", procedure: "Stereotactic Radiosurgery (SRS)" },
  { name: "SBRT", what: "Delivers high-dose, highly precise radiation to selected tumours outside the brain", procedure: "Stereotactic Body Radiotherapy (SBRT)" },
  { name: "Proton therapy", what: "Uses protons rather than conventional photon radiation", procedure: "Proton Beam Therapy" },
  { name: "CyberKnife", what: "Robotic radiosurgery platform used for selected SRS/SBRT indications", procedure: "CyberKnife" },
];

export const ebrtFaqs: { q: string; a: string }[] = [
  {
    q: "Is external beam radiation therapy painful?",
    a: "The radiation delivery itself is generally painless. Patients may experience side effects during or after treatment depending on the body area receiving radiation.",
  },
  {
    q: "How many EBRT sessions are needed?",
    a: "It varies widely. Some treatments require only a few sessions, while conventional curative courses may require 20–35 or more fractions.",
  },
  {
    q: "Can EBRT cure cancer?",
    a: "Yes, EBRT can be part of curative treatment for many cancers. Whether radiation alone can cure a particular cancer depends on its type, stage and location.",
  },
  {
    q: "Is EBRT the same as IMRT?",
    a: "No. EBRT is the broader category. IMRT is one advanced technique used to deliver external-beam radiation.",
  },
  {
    q: "Is EBRT the same as IGRT?",
    a: "No. IGRT refers to the use of imaging to improve treatment positioning and targeting. IMRT and IGRT are frequently combined.",
  },
  {
    q: "How much does EBRT cost in India?",
    a: "A broad planning range is approximately $1,000–$6,000+, but premium private-hospital and advanced-technique treatment can cost considerably more. Published estimates vary substantially by technique and hospital.",
  },
  {
    q: "Which Indian cities are popular for radiation oncology?",
    a: "Major centres are concentrated in Delhi NCR, Mumbai, Chennai, Bengaluru and Hyderabad. Published markets also include Kolkata, Pune, Ahmedabad, Kochi and Jaipur; GAF Healthcare currently lists named faculty in the first five.",
  },
  {
    q: "Does EBRT require hospital admission?",
    a: "Usually not. Most external-beam radiation is delivered on an outpatient basis. Admission may be required because of the patient's condition or when radiation is combined with another treatment.",
  },
  {
    q: "Can international patients receive EBRT in India?",
    a: "Yes. Major Indian cancer centres treat international patients. The treatment plan should be reviewed by a radiation oncologist before travel, particularly because a conventional course may require several weeks.",
  },
];
