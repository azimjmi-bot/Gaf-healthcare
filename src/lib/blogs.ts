export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  image: string;
  body: string[];
};

export const posts: BlogPost[] = [
  {
    slug: "imrt-vs-3d-crt",
    title: "IMRT versus 3D-CRT: what a travelling patient should ask",
    excerpt:
      "Both shape the beam. Only one modulates intensity at every gantry angle. Here is the difference that belongs in a dossier, not a brochure.",
    date: "12 August 2026",
    author: "Velora clinical desk",
    category: "Radiation Oncology",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1600&q=80",
    body: [
      "Intensity-modulated radiotherapy (IMRT) and 3D conformal radiotherapy (3D-CRT) are both external-beam techniques. 3D-CRT shapes each field to the tumour’s silhouette. IMRT splits those fields into many beamlets so dose can spare a parotid, a rectum, or a cochlea that sits in the same plane.",
      "For a patient travelling for radiation, the useful question is not which acronym sounds newer. It is whether the plan has been peer-reviewed, whether daily image guidance is included, and how many fractions the named radiation oncologist actually intends.",
      "Velora will not book IMRT as an upsell. If 3D-CRT covers the target with acceptable organ-at-risk doses, that is the plan we put in writing — with the physics QA attached.",
    ],
  },
  {
    slug: "when-proton-is-worth-the-flight",
    title: "When proton beam therapy is worth the flight",
    excerpt:
      "Protons stop. Photons do not. That physics is real — and it is not a reason to fly every paediatric or skull-base case to the first centre that answers email.",
    date: "28 July 2026",
    author: "Velora clinical desk",
    category: "Proton therapy",
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1600&q=80",
    body: [
      "Proton beam therapy deposits most of its dose at a Bragg peak and then stops. For some paediatric tumours, re-irradiation, and selected skull-base or spinal cases, that spare of exit dose is the clinical argument — not the marketing one.",
      "Capacity is scarce. Wait lists at home are often the real indication for travel. A Velora dossier for protons includes slot timing, immobilisation, and a written plan for interruption if you become unwell mid-course.",
      "If photons with IMRT or SBRT can meet the same constraints, we will say so. Crossing an ocean for a Bragg peak you do not need is not care.",
    ],
  },
  {
    slug: "srs-sbrt-and-a-short-stay",
    title: "SRS and SBRT: high dose, short stay, strict selection",
    excerpt:
      "Stereotactic radiosurgery and body radiotherapy pack a course into one to five fractions. That is attractive for travel. It is also unforgiving if the immobilisation or the indication is wrong.",
    date: "9 July 2026",
    author: "Velora clinical desk",
    category: "Stereotactic",
    image:
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1600&q=80",
    body: [
      "SRS (often Gamma Knife or linac-based) treats intracranial targets in a single session. SBRT treats body sites — lung, spine, liver — in a handful of fractions with millimetre-level image guidance.",
      "The travel implication is obvious: fewer hotel nights. The clinical implication is tighter: motion management, fiducials, and a radiation oncologist who will refuse a target that belongs in conventional fractionation.",
      "CyberKnife is one delivery platform, not a diagnosis. We match the machine to the motion problem, then the city to the machine — never the reverse.",
    ],
  },
  {
    slug: "brachytherapy-travel-logistics",
    title: "Brachytherapy: the logistics nobody puts on a landing page",
    excerpt:
      "Intracavitary, interstitial, and plaque brachytherapy are not outpatient tourism. Theatre time, applicator inventory, and a physicist who stays for the dwell are the product.",
    date: "21 June 2026",
    author: "Velora clinical desk",
    category: "Brachytherapy",
    image:
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1600&q=80",
    body: [
      "Brachytherapy places the source inside or against the tumour. Cervical intracavitary insertions, prostate interstitial implants, and ocular plaques are different operations with different stays.",
      "A travelling patient needs a campus that already runs these lists weekly — not a centre that will assemble a kit for one international case. We verify applicator inventory and HDR/LDR capability before a date is offered.",
      "IORT, when indicated, is tied to the same theatre admission as surgery. We will not sell it as a standalone day trip.",
    ],
  },
  {
    slug: "records-before-you-book-ebrt",
    title: "Bring the right records before you book EBRT abroad",
    excerpt:
      "External beam courses fail in the gaps: missing pathology, a CD that will not open, no prior DVH. This is the pack we ask for before anyone buys a ticket.",
    date: "2 June 2026",
    author: "Velora clinical desk",
    category: "Planning",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80",
    body: [
      "For EBRT, IMRT, or IGRT we want operative notes, histopathology, recent imaging in a readable format, prior radiation details if any, and your current systemic therapy list.",
      "TBI is a special case: it exists inside a transplant protocol. We will not book total body irradiation as an isolated tourist service.",
      "Once records are in, the named radiation oncologist meets you on camera. Fractions, energy, and whether you should stay home are decided there — then travel is built around the first simulation slot. City-level planning ranges and technique notes sit on the External Beam Radiation Therapy cost page.",
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
