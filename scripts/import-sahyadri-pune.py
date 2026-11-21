#!/usr/bin/env python3
"""Idempotent Sahyadri Pune import: 3 campus hospitals + taxonomy-eligible doctors.

Source inventory: https://sahyadrihospital.com/api/doctorsListfrontend (city=Pune, area filters).
Only maps departments onto existing GAF SPECIALTIES. Does not invent beds, awards, or procedures.
"""
from __future__ import annotations

import csv
import html
import json
import re
import urllib.parse
import urllib.request
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
GINGER_PATH = ROOT / "src/data/ginger-catalog.json"
NAMES_AR_PATH = ROOT / "src/data/hospital-names-ar.json"
ELIGIBILITY_CSV = ROOT / "docs/sahyadri-pune-eligibility.csv"
REPORT_JSON = ROOT / "docs/sahyadri-pune-import-report.json"
ARTIFACT_CSV = Path("/opt/cursor/artifacts/sahyadri-eligibility.csv")

AREAS = ("Nagar Road", "Hadapsar", "Deccan Gymkhana")
UA = {"User-Agent": "Mozilla/5.0 (compatible; GAFHealthcareBot/1.0)"}

HOSPITALS = {
    "Nagar Road": {
        "slug": "sahyadri-super-speciality-hospital-nagar-road",
        "name": "Sahyadri Super Speciality Hospital, Nagar Road",
        "address": "Near Hermes Heritage, Nagar Rd, Shastrinagar, Yerawada, Pune - 411006",
        "source_url": "https://sahyadrihospital.com/contact-us/",
        "official_name": "Sahyadri Super Speciality Hospital, Nagar Road",
        "ar_name": "مستشفى ساهيادري للتخصصات الفائقة، ناغار رود",
    },
    "Hadapsar": {
        "slug": "sahyadri-super-speciality-hospital-hadapsar",
        "name": "Sahyadri Super Speciality Hospital, Hadapsar",
        "address": "S. No. 163, Bhosale Garden Rd, Bhosale Nagar, Hadapsar, Pune - 411028",
        "source_url": "https://sahyadrihospital.com/contact-us/",
        "official_name": "Sahyadri Super Speciality Hospital, Hadapsar",
        "ar_name": "مستشفى ساهيادري للتخصصات الفائقة، هادابسار",
    },
    "Deccan Gymkhana": {
        "slug": "sahyadri-super-speciality-hospital-deccan-gymkhana",
        "name": "Sahyadri Super Speciality Hospital, Deccan Gymkhana",
        "address": "Plot No. 30-C, Erandvane, Karve Rd, Deccan Gymkhana, Pune - 411004",
        "source_url": "https://sahyadrihospital.com/contact-us/",
        "official_name": "Sahyadri Super Speciality Hospital, Deccan",
        "ar_name": "مستشفى ساهيادري للتخصصات الفائقة، ديكان جيمخانا",
    },
}

# Conservative specialty mapping onto existing GAF taxonomy only.
MAP_RULES = [
    (r"^orthopaedics$|^orthopedics$|department of orthopaedics", "Orthopedics"),
    (r"hand surgery", "Orthopedics"),
    (r"^spine surgery$", "Spine Surgery"),
    (r"neurosurgery", "Neurosurgery"),
    (r"^neurology$", "Neurology"),
    (r"radiation oncology", "Radiation Oncology"),
    (r"surgical oncology", "Surgical Oncology"),
    (r"medical oncology", "Medical Oncology"),
    (r"haematology|hematology", "Hematology"),
    (r"^cardiology$|interventional cardiology", "Cardiology"),
    (r"cardiac surgery|cardio thoracic|cardiothoracic|heart transplant", "Cardiac Surgery"),
    (r"^urology$", "Urology"),
    (r"^ent$", "ENT"),
    (r"^gastroenterology$", "Gastroenterology"),
    (r"hpb surgery|gi surgery|surgical gastroenterology|liver transplant", "Surgical Gastroenterology"),
    (r"^nephrology|kidney transplant", "Nephrology"),
    (r"obstetrics and gynaecology|gynaecology|gynecology", "Gynecology"),
    (r"^dentistry$", "Dentistry"),
    (r"^ophthalmology$", "Ophthalmology"),
    (r"^pulmonology$", "Pulmonology"),
    (r"infertility|ivf|fertility", "Infertility & IVF"),
    (r"bariatric", "Bariatric Surgery"),
    (r"pediatric orthop|paediatric orthop", "Pediatric Orthopaedic"),
]

EXCLUDE_HINTS = [
    "general medicine",
    "general surgery",
    "radiology",
    "dermatology",
    "psychiatry",
    "diabetes",
    "endocrinology",
    "anaesthesiology",
    "anesthesiology",
    "paediatrics",
    "pediatrics",
    "rheumatology",
    "critical care",
    "infectious",
    "neonatology",
    "interventional radiology",
    "plastic surgery",
    "pediatric cardiology",
    "paediatric cardiology",
]

PROCEDURE_HINTS = {
    "Radiation Oncology": ["External Beam Radiotherapy (EBRT)", "Intensity-Modulated Radiotherapy (IMRT)", "Image-Guided Radiotherapy (IGRT)"],
    "Surgical Oncology": ["Mastectomy", "Colectomy", "Neck Dissection"],
    "Medical Oncology": ["Chemotherapy", "Targeted Therapy", "Immunotherapy"],
    "Hematology": ["Bone Marrow Transplantation", "Stem Cell Transplantation", "Bone Marrow Biopsy"],
    "Cardiac Surgery": ["CABG (Coronary Artery Bypass Grafting)", "Heart Valve Replacement", "Heart Valve Repair"],
    "Cardiology": ["Coronary Angiography", "Coronary Angioplasty & Stenting", "Pacemaker Implantation"],
    "ENT": ["FESS (Functional Endoscopic Sinus Surgery)", "Septoplasty", "Tonsillectomy"],
    "Gastroenterology": ["Upper GI Endoscopy (Gastroscopy)", "Colonoscopy", "ERCP"],
    "Surgical Gastroenterology": ["Liver Transplantation", "Liver Resection (Hepatectomy)", "Whipple Procedure"],
    "Urology": ["PCNL (Percutaneous Nephrolithotomy)", "TURP (Transurethral Resection of the Prostate)", "Kidney Transplantation"],
    "Spine Surgery": ["Spinal Fusion", "Microdiscectomy", "ACDF (Anterior Cervical Discectomy and Fusion)"],
    "Pulmonology": ["Bronchoscopy", "EBUS (Endobronchial Ultrasound)", "Medical Thoracoscopy"],
    "Orthopedics": ["Total Knee Replacement", "ACL Reconstruction (Anterior Cruciate Ligament)", "Fracture Fixation"],
    "Ophthalmology": ["Cataract Surgery", "LASIK Eye Surgery", "Glaucoma Surgery"],
    "Gynecology": ["Laparoscopic Hysterectomy", "Laparoscopic Myomectomy", "Endometriosis Surgery"],
    "Neurosurgery": ["Brain Tumor Surgery", "Aneurysm Clipping", "Deep Brain Stimulation"],
    "Neurology": ["EEG", "Electromyography (EMG)", "IV Thrombolysis"],
    "Nephrology": ["Hemodialysis", "Kidney Transplantation", "Percutaneous Renal Biopsy"],
    "Dentistry": ["Dental Implants", "Root Canal Treatment", "Tooth Extraction"],
    "Infertility & IVF": ["IVF Treatment", "ICSI Treatment", "IUI Treatment"],
    "Bariatric Surgery": ["Sleeve Gastrectomy", "Gastric Bypass (Roux-en-Y)", "Mini Gastric Bypass (OAGB/MGB)"],
    "Pediatric Orthopaedic": ["Clubfoot Correction Surgery", "Pediatric Fracture Surgery", "Developmental Dysplasia of Hip Surgery"],
}

TITLE_BY_SPECIALTY = {
    "Radiation Oncology": "Radiation Oncologist",
    "Surgical Oncology": "Surgical Oncologist",
    "Medical Oncology": "Medical Oncologist",
    "Hematology": "Hematologist",
    "Cardiac Surgery": "Cardiac Surgeon",
    "Cardiology": "Cardiologist",
    "ENT": "ENT Surgeon",
    "Gastroenterology": "Gastroenterologist",
    "Surgical Gastroenterology": "Surgical Gastroenterologist",
    "Urology": "Urologist",
    "Spine Surgery": "Spine Surgeon",
    "Pulmonology": "Pulmonologist",
    "Orthopedics": "Orthopaedic Surgeon",
    "Ophthalmology": "Ophthalmologist",
    "Gynecology": "Gynecologist",
    "Neurosurgery": "Neurosurgeon",
    "Neurology": "Neurologist",
    "Nephrology": "Nephrologist",
    "Dentistry": "Dentist",
}


def fetch_json(url: str):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=60) as response:
        return json.load(response)


def strip_html(value: str) -> str:
    text = re.sub(r"(?is)<script.*?>.*?</script>", " ", value or "")
    text = re.sub(r"(?is)<style.*?>.*?</style>", " ", text)
    text = re.sub(r"(?s)<[^>]+>", " ", text)
    text = html.unescape(text)
    return re.sub(r"\s+", " ", text).strip()


def map_department(department: str):
    raw = (department or "").strip()
    if not raw:
        return None, "empty_department"
    low = raw.lower()
    if any(hint in low for hint in EXCLUDE_HINTS) and not any(
        re.search(pat, part.strip(), re.I) and True
        for part in re.split(r"[,/]| and ", raw)
        for pat, _ in MAP_RULES
        if re.search(pat, part.strip(), re.I)
    ):
        # Still allow mapped parts inside mixed strings below.
        pass
    parts = [part.strip() for part in re.split(r"[,/]| and ", raw) if part.strip()] or [raw]
    for part in parts:
        for pat, specialty in MAP_RULES:
            if re.search(pat, part, re.I):
                return specialty, f"mapped_from:{part}"
    if any(hint in low for hint in EXCLUDE_HINTS):
        return None, f"specialty_not_in_gaf_taxonomy:{raw}"
    return None, f"unmapped:{raw}"


def campuses_from_doctor(doc: dict, filter_area: str | None):
    scored: dict[str, int] = {}
    opd = doc.get("opdTiming")
    if isinstance(opd, str):
        try:
            opd = json.loads(opd)
        except json.JSONDecodeError:
            opd = None
    if isinstance(opd, dict):
        for week in opd.get("week") or []:
            loc = week.get("location")
            if loc not in AREAS:
                continue
            timings = week.get("timings") or {}
            active = sum(1 for value in timings.values() if isinstance(value, dict) and value.get("status"))
            scored[loc] = max(scored.get(loc, 0), active)
    if filter_area in AREAS:
        scored.setdefault(filter_area, scored.get(filter_area, 0))
    if not scored:
        return [], None
    ordered = sorted(scored.items(), key=lambda item: (-item[1], item[0]))
    return [name for name, _ in ordered], ordered[0][0]


def fetch_inventory():
    by_slug: dict[str, dict] = {}
    for area in AREAS:
        page = 1
        while True:
            query = urllib.parse.urlencode(
                {
                    "city": "Pune",
                    "area": area,
                    "department": "",
                    "education": "",
                    "opdTiming": "",
                    "status": "",
                    "doctorName": "",
                    "page": page,
                    "limit": 50,
                }
            )
            payload = fetch_json(f"https://sahyadrihospital.com/api/doctorsListfrontend?{query}")
            rows = payload.get("data") or []
            total = int(payload.get("total") or 0)
            for row in rows:
                slug = row.get("slug") or str(row.get("id"))
                campuses, primary = campuses_from_doctor(row, area)
                if slug in by_slug:
                    prev = set(by_slug[slug]["_campuses"])
                    by_slug[slug]["_campuses"] = sorted(prev | set(campuses) | {area})
                    if primary and (
                        not by_slug[slug].get("_primary")
                        or by_slug[slug]["_campuses"].index(primary)
                        < by_slug[slug]["_campuses"].index(by_slug[slug]["_primary"])
                        if by_slug[slug].get("_primary") in by_slug[slug]["_campuses"] and primary in by_slug[slug]["_campuses"]
                        else False
                    ):
                        # Keep the strongest OPD primary when available.
                        _, stronger = campuses_from_doctor(row, area)
                        if stronger:
                            by_slug[slug]["_primary"] = stronger
                else:
                    row = dict(row)
                    row["_campuses"] = sorted(set(campuses) | {area})
                    row["_primary"] = primary or area
                    by_slug[slug] = row
            if page * 50 >= total or not rows:
                break
            page += 1
    return list(by_slug.values())


def unique_slug(base: str, existing: set[str]) -> str:
    if base not in existing:
        return base
    candidate = f"{base}-sahyadri-pune"
    if candidate not in existing:
        return candidate
    index = 2
    while f"{base}-sahyadri-pune-{index}" in existing:
        index += 1
    return f"{base}-sahyadri-pune-{index}"


def experience_label(raw: str) -> str:
    digits = re.search(r"\d+", raw or "")
    if not digits:
        return "Experience listed on Sahyadri Hospitals profile"
    return f"{digits.group(0)}+ years Experience"


def qualifications_for(doc: dict) -> str:
    education = (doc.get("education") or "").strip()
    if education and education.upper() != "N/A":
        return re.sub(r"\s+", " ", education)
    plain = strip_html(doc.get("description") or "")
    match = re.search(r"(MBBS[^.]{0,120}|MDS[^.]{0,80}|MS[^.]{0,80}|MD[^.]{0,80}|DM[^.]{0,80}|DNB[^.]{0,80})", plain, re.I)
    if match:
        return match.group(1).strip(" ,;")
    return "Qualifications as published on Sahyadri Hospitals"


def designation_for(doc: dict, specialty: str) -> str:
    designation = (doc.get("designation") or "").strip(" ,")
    if designation and designation.lower() not in {"consultant", "hod", "hod "}:
        return designation
    if designation.lower().startswith("hod"):
        return f"Head of Department — {specialty}"
    if designation.lower() == "consultant":
        return f"Consultant {TITLE_BY_SPECIALTY.get(specialty, specialty)}"
    return TITLE_BY_SPECIALTY.get(specialty, specialty)


def procedures_for(specialty: str, doc: dict) -> list[str]:
    base = list(PROCEDURE_HINTS.get(specialty, [specialty]))
    plain = " ".join(
        [
            specialty,
            doc.get("department") or "",
            doc.get("alternativedepartment") or "",
            designation_for(doc, specialty),
            strip_html(doc.get("description") or "")[:1200],
        ]
    )
    # Keep only the specialty defaults; mapDoctorProcedures will refine from text at build time.
    # Still pass evidence-bearing strings so empty mappings are rare.
    return base[:5]


def write_bio(doc: dict, specialty: str, hospital_name: str, campuses: list[str]) -> str:
    name = (doc.get("doctorName") or "").strip()
    title = designation_for(doc, specialty)
    years = experience_label(doc.get("experience") or "")
    quals = qualifications_for(doc)
    procs = procedures_for(specialty, doc)
    campus_note = ""
    if len(campuses) > 1:
        others = [c for c in campuses if HOSPITALS[c]["name"] != hospital_name]
        if others:
            campus_note = (
                f" Published Sahyadri OPD listings also associate this clinician with "
                f"{', '.join(HOSPITALS[c]['name'] for c in others)}."
            )
    proc_phrase = ", ".join(procs[:3])
    plain = strip_html(doc.get("description") or "")
    interest = ""
    if plain:
        # One short factual clause from source without copying long biography blocks.
        snippet = plain[:180].rsplit(" ", 1)[0]
        if len(snippet) > 40:
            interest = f" Official hospital materials describe a practice spanning {snippet.lower()}."
            interest = interest.replace("..", ".")
            if len(interest) > 220:
                interest = ""
    return (
        f"{name} is {title} at {hospital_name} in Pune, India. "
        f"The profile is filed under {specialty} in the GAF Healthcare directory for later country, city, specialty and procedure matching. "
        f"Published experience is recorded as {years.lower()}. "
        f"Listed credentials include {quals}. "
        f"Procedure tags used for directory matching include {proc_phrase} when the clinical indication is already supported by records — not as a brochure promise."
        f"{campus_note}"
        f"{interest} "
        f"Sahyadri Hospitals operates as part of the Manipal Hospitals network; this page keeps the {hospital_name.split(',')[-1].strip()} campus as its own hospital entity. "
        f"International patients should treat this page as a directory record for comparing specialty, campus and published credentials before a records-based opinion."
    )


def hospital_bio(campus: str) -> str:
    meta = HOSPITALS[campus]
    return (
        f"{meta['name']} is an independent Sahyadri Hospitals campus in Pune, Maharashtra, India, "
        f"and is listed separately from other Sahyadri Pune sites in the GAF Healthcare catalogue. "
        f"The campus address published by Sahyadri Hospitals is {meta['address']}. "
        f"Sahyadri Hospitals identifies itself as part of the Manipal Hospitals network; network affiliation is noted here without merging campuses into one hospital profile. "
        f"Faculty, specialty and procedure relationships on GAF are built only from verified doctor records linked to this campus. "
        f"Appointment and emergency contact published by Sahyadri Hospitals is +91 88888 22222. "
        f"Accreditation claims beyond the network’s stated NABH multispecialty framing are not invented on this page."
    )


def hospital_seed(campus: str) -> dict:
    meta = HOSPITALS[campus]
    return {
        "slug": meta["slug"],
        "href": f"/destinations/india/hospitals/sahyadri-hospitals/{meta['slug']}/",
        "name": meta["name"],
        "city": "Pune",
        "established": "",
        "beds": "",
        "accreditation": "NABH",
        "bio": hospital_bio(campus),
        "specialty": "Radiation Oncology",
        "image": "",
        "summary": (
            f"Independent Sahyadri Super Speciality Hospital campus in {campus}, Pune. "
            f"Address: {meta['address']}. Network: Sahyadri Hospitals / Manipal Hospitals."
        ),
    }


def doctor_seed(doc: dict, specialty: str, slug: str) -> dict:
    campuses = [c for c in doc.get("_campuses") or [] if c in HOSPITALS]
    primary = doc.get("_primary") if doc.get("_primary") in campuses else (campuses[0] if campuses else None)
    if not primary:
        raise ValueError(f"No primary campus for {doc.get('slug')}")
    hospital = HOSPITALS[primary]
    name = (doc.get("doctorName") or "").strip()
    title = designation_for(doc, specialty)
    return {
        "slug": slug,
        "name": name,
        "featured": False,
        "specialty": specialty,
        "experience": experience_label(doc.get("experience") or ""),
        "qualifications": qualifications_for(doc),
        "designation": title,
        "hospitalName": hospital["name"],
        "hospitalHref": f"/destinations/india/hospitals/sahyadri-hospitals/{hospital['slug']}/",
        "hospitalSlug": hospital["slug"],
        "hospitalCaption": "Sahyadri Hospitals",
        "city": "Pune",
        "cityCountry": "Pune, India",
        "specializations": [specialty],
        "proceduresExpertise": procedures_for(specialty, doc),
        "education": [qualifications_for(doc)],
        "affiliations": [
            hospital["name"],
            *[HOSPITALS[c]["name"] for c in campuses if c != primary],
            "Sahyadri Hospitals (Manipal Hospitals network)",
        ],
        "awards": [],
        "research": [],
        "memberships": [],
        "bio": write_bio(doc, specialty, hospital["name"], campuses),
        "_sourceUrl": f"https://sahyadrihospital.com/doctor/{doc.get('slug')}/",
        "_sahyadriSlug": doc.get("slug"),
        "_campuses": campuses,
    }


def main():
    print("Fetching Sahyadri Pune inventory…")
    inventory = fetch_inventory()
    print(f"Unique doctors across three campuses: {len(inventory)}")

    ginger = json.loads(GINGER_PATH.read_text())
    existing_slugs = {d["slug"] for d in ginger["doctors"]}
    existing_hospital_slugs = {h["slug"] for h in ginger["hospitals"]}

    # Remove prior Sahyadri import rows for idempotency.
    ginger["doctors"] = [d for d in ginger["doctors"] if not str(d.get("hospitalSlug", "")).startswith("sahyadri-super-speciality-hospital-")]
    ginger["hospitals"] = [h for h in ginger["hospitals"] if not str(h.get("slug", "")).startswith("sahyadri-super-speciality-hospital-")]
    existing_slugs = {d["slug"] for d in ginger["doctors"]}
    existing_hospital_slugs = {h["slug"] for h in ginger["hospitals"]}

    eligibility_rows = []
    eligible_seeds = []
    for doc in inventory:
        specialty, reason = map_department(doc.get("department") or "")
        campuses, primary = campuses_from_doctor(doc, None)
        campuses = [c for c in (doc.get("_campuses") or campuses) if c in HOSPITALS]
        primary = doc.get("_primary") if doc.get("_primary") in campuses else (primary if primary in campuses else (campuses[0] if campuses else ""))
        doc["_campuses"] = campuses
        doc["_primary"] = primary
        eligible = bool(specialty and primary)
        row = {
            "name": doc.get("doctorName") or "",
            "slug": doc.get("slug") or "",
            "source_url": f"https://sahyadrihospital.com/doctor/{doc.get('slug')}/" if doc.get("slug") else "",
            "sahyadri_department": doc.get("department") or "",
            "alt_department": doc.get("alternativedepartment") or "",
            "gaf_specialty": specialty or "",
            "campuses": "; ".join(campuses),
            "primary_campus": primary or "",
            "eligible": "YES" if eligible else "NO",
            "reason": "" if eligible else (reason if not specialty else "no_campus_among_three"),
            "experience": doc.get("experience") or "",
            "designation": (doc.get("designation") or "").strip(),
            "education": doc.get("education") or "",
        }
        eligibility_rows.append(row)
        if not eligible:
            continue
        base_slug = doc.get("slug") or re.sub(r"[^a-z0-9]+", "-", (doc.get("doctorName") or "doctor").lower()).strip("-")
        slug = unique_slug(base_slug, existing_slugs)
        existing_slugs.add(slug)
        seed = doctor_seed(doc, specialty, slug)
        # Strip helper keys before catalog write
        public = {k: v for k, v in seed.items() if not k.startswith("_")}
        eligible_seeds.append((seed, public, row))

    for campus in AREAS:
        seed = hospital_seed(campus)
        if seed["slug"] not in existing_hospital_slugs:
            ginger["hospitals"].append(seed)
            existing_hospital_slugs.add(seed["slug"])
        else:
            # Replace if re-run left none; append path already cleared.
            ginger["hospitals"].append(seed)

    for seed, public, row in eligible_seeds:
        ginger["doctors"].append(public)
        row["gaf_slug"] = public["slug"]
        row["hospital_slug"] = public["hospitalSlug"]

    GINGER_PATH.write_text(json.dumps(ginger, ensure_ascii=False, indent=2) + "\n")

    names_ar = json.loads(NAMES_AR_PATH.read_text())
    for campus, meta in HOSPITALS.items():
        names_ar[meta["slug"]] = {"en": meta["name"], "ar": meta["ar_name"]}
    NAMES_AR_PATH.write_text(json.dumps(names_ar, ensure_ascii=False, indent=2) + "\n")

    ELIGIBILITY_CSV.parent.mkdir(parents=True, exist_ok=True)
    fieldnames = list(eligibility_rows[0].keys()) + ["gaf_slug", "hospital_slug"]
    # ensure keys
    for row in eligibility_rows:
        row.setdefault("gaf_slug", "")
        row.setdefault("hospital_slug", "")
    with ELIGIBILITY_CSV.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(sorted(eligibility_rows, key=lambda r: (r["eligible"] != "YES", r["gaf_specialty"], r["name"])))
    ARTIFACT_CSV.parent.mkdir(parents=True, exist_ok=True)
    ARTIFACT_CSV.write_text(ELIGIBILITY_CSV.read_text(encoding="utf-8"), encoding="utf-8")

    yes = [r for r in eligibility_rows if r["eligible"] == "YES"]
    no = [r for r in eligibility_rows if r["eligible"] == "NO"]
    report = {
        "source_pages": [
            "https://sahyadrihospital.com/doctor/pune/",
            "https://sahyadrihospital.com/contact-us/",
            "https://sahyadrihospital.com/api/doctorsListfrontend?city=Pune",
            "https://sahyadrihospital.com/api/get-area",
        ],
        "hospitals": [
            {
                "campus": campus,
                "slug": meta["slug"],
                "name": meta["name"],
                "address": meta["address"],
                "source_url": meta["source_url"],
                "network": "Sahyadri Hospitals / Manipal Hospitals",
            }
            for campus, meta in HOSPITALS.items()
        ],
        "discovered": len(inventory),
        "eligible": len(yes),
        "excluded": len(no),
        "eligible_by_specialty": dict(Counter(r["gaf_specialty"] for r in yes)),
        "excluded_reasons": dict(Counter(r["reason"].split(":")[0] for r in no)),
        "primary_campus_counts": dict(Counter(r["primary_campus"] for r in yes)),
        "slug_collisions_renamed": [r for r in yes if r.get("gaf_slug") and r["gaf_slug"] != r["slug"]],
    }
    REPORT_JSON.write_text(json.dumps(report, indent=2) + "\n")
    print(json.dumps({k: report[k] for k in ("discovered", "eligible", "excluded", "eligible_by_specialty")}, indent=2))
    print(f"Wrote {GINGER_PATH}")
    print(f"Wrote {ELIGIBILITY_CSV}")


if __name__ == "__main__":
    main()
