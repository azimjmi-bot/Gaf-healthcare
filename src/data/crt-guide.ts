export const CRT_NAME = "3D Conformal Radiotherapy (3D-CRT)";

export const crtMeta = {
  title: "3D Conformal Radiation Therapy (3D-CRT): Cost, Procedure, Sessions, Benefits & Recovery",
  description:
    "3D-CRT shapes external-beam radiation around a tumour using CT-based planning. Compare India city costs, sessions versus IMRT, and named radiation oncologists at GAF Healthcare partner campuses.",
};

export const crtIndiaCityCosts: { city: string; range: string; listed: boolean }[] = [
  { city: "Delhi NCR", range: "$900–$2,500", listed: true },
  { city: "Mumbai", range: "$900–$2,500", listed: true },
  { city: "Bengaluru", range: "$850–$2,400", listed: true },
  { city: "Chennai", range: "$800–$2,400", listed: true },
  { city: "Hyderabad", range: "$800–$2,400", listed: true },
  { city: "Kolkata", range: "$700–$2,200", listed: false },
  { city: "Pune", range: "$800–$2,300", listed: false },
  { city: "Ahmedabad", range: "$750–$2,300", listed: false },
  { city: "Kochi", range: "$800–$2,300", listed: false },
  { city: "Jaipur", range: "$800–$2,300", listed: false },
];

export const crtDestinationCosts: { place: string; range: string; specific: boolean }[] = [
  { place: "India", range: "$700–$2,500+", specific: true },
  { place: "Thailand", range: "$3,000–$3,800", specific: true },
  { place: "Türkiye", range: "$840–$2,800*", specific: false },
  { place: "Malaysia", range: "$900–$3,000*", specific: false },
  { place: "United Arab Emirates", range: "$1,500–$5,000*", specific: false },
  { place: "South Korea", range: "$1,650–$5,500*", specific: false },
  { place: "Singapore", range: "$1,950–$6,500*", specific: false },
  { place: "Germany", range: "$2,250–$7,500*", specific: false },
  { place: "Japan", range: "$1,800–$6,000*", specific: false },
  { place: "Mexico", range: "$1,050–$3,500*", specific: false },
];

export const crtFaqs: { q: string; a: string }[] = [
  {
    q: "Is 3D-CRT the same as EBRT?",
    a: "No. 3D-CRT is a type of external beam radiation therapy.",
  },
  {
    q: "How many sessions are required for 3D-CRT?",
    a: "Many conventional courses involve approximately 15–35 sessions, although the exact number depends on the cancer and treatment plan.",
  },
  {
    q: "What is the cost of 3D-CRT in India?",
    a: "Published Indian prices vary widely. Current sources report approximately ₹60,000–₹1,50,000 at some centres and up to approximately ₹2,25,000 at other hospitals. For private international-patient planning, GAF Healthcare uses about $700–$2,500+.",
  },
  {
    q: "Is 3D-CRT better than IMRT?",
    a: "Not necessarily. IMRT can provide more sophisticated dose shaping, but the best technique depends on the tumour and the organs surrounding it.",
  },
  {
    q: "Is 3D-CRT safe?",
    a: "3D-CRT is an established radiation treatment. Like all radiation therapy, it has potential short- and long-term side effects, which depend on the treated area and radiation dose.",
  },
  {
    q: "Can 3D-CRT cure cancer?",
    a: "It can be part of curative treatment for many cancers. Whether it is curative depends on the cancer type, stage and overall treatment strategy.",
  },
  {
    q: "Can I travel to India for 3D-CRT?",
    a: "Yes. Because a conventional course may involve several weeks of daily treatment, patients should arrange medical evaluation and the treatment schedule before travelling.",
  },
];
