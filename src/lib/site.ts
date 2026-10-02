export const site = {
  name: "GAF Healthcare",
  tagline: "Named oncologists in India, quietly arranged.",
  description:
    "GAF Healthcare lists named radiation, surgical and medical oncologists, haematologists, cardiac surgeons, cardiologists, bariatric surgeons, cosmetic surgeons, ENT surgeons, gastroenterologists, surgical gastroenterologists, urologists, spine surgeons, pulmonologists, paediatric orthopaedic surgeons, orthopaedic surgeons, ophthalmologists, gynecologists, neurosurgeons, neurologists and nephrologists in India — Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad — including Dr. Sanjeev Gulati, Dr. Ajit Singh Narula and Dr. Alka Bhasin for dialysis and transplant lists, Dr. Sumit Singh, Dr. M V Padma Srivastava and Dr. Vinay Goyal for stroke, epilepsy and movement lists, Dr. Sandeep Vaishya, Dr. Aditya Gupta and Dr. Varindera Paul Singh for brain tumour and radiosurgery, Dr. Usha M Kumar, Dr. Suneeta Mittal and Dr. Alka Kriplani for hysterectomy and endometriosis, and Dr. Sudipto Pakrasi, Dr. Jeewan Singh Titiyal and Dr. Sameer Kaushal for cataract and cornea — with JCI partner hospitals and USD planning ranges for chemotherapy, IMRT, mastectomy, BMT, CABG, sleeve gastrectomy, liver transplant, Whipple, kidney transplant, hemodialysis, PCNL, TURP, spinal fusion, ACDF, bronchoscopy, EBUS, lung transplant, clubfoot, DDH, SCFE, total knee replacement, ACL reconstruction, cataract surgery, LASIK, laparoscopic hysterectomy, endometriosis surgery, brain tumor surgery, aneurysm clipping, DBS, EEG, EMG, IV thrombolysis, VNS, Gamma Knife, rhinoplasty, cochlear implants, ERCP, colonoscopy, TAVR and CAR-T. Meet the consultant on camera before you travel.",
  email: "care@gaf.healthcare",
  phone: "+91 90443 46292",
  whatsapp: "919044346292",
  hours: "Coordinators available 24/7",
};

export function whatsappHref(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** Hide the floating WhatsApp CTA on CMS screens. */
export function isPublicWhatsAppFloatPath(pathname: string) {
  const path = pathname.split(/[?#]/)[0] || "/";
  return !/(^|\/)cms(\/|$)/i.test(path);
}

function prettyConsultValue(value: string) {
  try {
    return decodeURIComponent(value).replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
  } catch {
    return value.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
  }
}

/** Turn a /consult CTA into a prefilled WhatsApp chat. Other hrefs are unchanged. */
export function consultToWhatsappHref(href: string, fallbackMessage?: string) {
  const pathAndQuery = href.replace(/^https?:\/\/[^/]+/i, "");
  if (!/(?:^|\/)consult(?:\?|$)/i.test(pathAndQuery)) return href;
  const query = href.includes("?") ? href.slice(href.indexOf("?") + 1) : "";
  const params = new URLSearchParams(query);
  const treatment = params.get("treatment")?.trim();
  const doctor = params.get("doctor")?.trim();
  const hospital = params.get("hospital")?.trim();
  const specialty = params.get("specialty")?.trim();
  const city = params.get("city")?.trim();
  const place = city ? prettyConsultValue(city) : "India";
  let message = fallbackMessage;
  if (!message) {
    if (treatment) {
      message = `Please review my medical records and advise on ${prettyConsultValue(treatment)} in ${place}. I would like a case-specific estimate.`;
    } else if (doctor) {
      message = `Please review my medical records. I would like to discuss care with ${prettyConsultValue(doctor)} in ${place}.`;
    } else if (hospital) {
      message = `Please review my medical records. I would like a case-specific estimate at ${prettyConsultValue(hospital)} in ${place}.`;
    } else if (specialty) {
      message = `Please review my medical records and advise on ${prettyConsultValue(specialty)} in ${place}. I would like a case-specific estimate.`;
    } else {
      message =
        "Please review my medical records and share a case-specific treatment estimate in India.";
    }
  }
  return whatsappHref(message);
}

export function blogCtaSubject(title: string) {
  const trimmed = title.replace(/\s+in India\b.*$/i, "").split(":")[0]?.trim();
  return trimmed || "treatment";
}

export function blogEstimateWhatsapp(subject: string, place = "India") {
  return {
    primary: whatsappHref(
      `Please review my medical records and share a case-specific estimate for ${subject} in ${place}.`,
    ),
    secondary: whatsappHref(`I would like to speak with GAF Healthcare about ${subject} in ${place}.`),
  };
}
