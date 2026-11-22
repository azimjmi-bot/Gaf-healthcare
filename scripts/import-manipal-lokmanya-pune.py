#!/usr/bin/env python3
"""Import Manipal Baner (full directory) + Lokmanya Pune campuses into ginger + audits.

Reads research JSON under /tmp/manipal-lokmanya-research/ (or RESEARCH_DIR).
Does NOT upload R2, deploy, or stamp production.
"""
from __future__ import annotations

import csv
import hashlib
import json
import re
import urllib.request
from collections import Counter
from io import BytesIO
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
RESEARCH = Path(
    __import__("os").environ.get("RESEARCH_DIR", "/tmp/manipal-lokmanya-research")
)
GINGER_PATH = ROOT / "src/data/ginger-catalog.json"
NAMES_AR_PATH = ROOT / "src/data/hospital-names-ar.json"
DOCS = ROOT / "docs"
PUBLIC = ROOT / "public"

MANIPAL_SLUG = "manipal-hospitals-baner"
MANIPAL_NAME = "Manipal Hospitals, Baner"
MANIPAL_HREF = (
    "/destinations/india/hospitals/manipal-hospitals/manipal-hospitals-baner/"
)
MANIPAL_IMG_DIR = PUBLIC / "doctors/manipal-baner"
LOK_IMG_DIR = PUBLIC / "doctors/lokmanya"

UA = {"User-Agent": "Mozilla/5.0 (compatible; GAFHealthcareBot/1.0)"}

# Existing catalogue slugs for doctors who also appear at Manipal Baner.
MANIPAL_MERGE = {
    "dr-abhijit-agashe": "dr-abhijit-agashe",
    "dr-kannan-subramanian": "dr-kannan-subramanian",
    "dr-shashikant-apte": "dr-shashikant-apte",
    "dr-mangesh-u-udar": "dr-mangesh-udar",
    "dr-tushar-j-deore": "dr-tushar-deore",
}

# Existing catalogue slugs for doctors who also appear at Lokmanya.
LOK_MERGE = {
    "dr-rakshit-ahuja": "dr-rakshit-ahuja",
    "dr-hemant-sant": "dr-hemant-sant",
    "dr-nikhil-s-likhate": "dr-nikhil-likhate",
}

LOK_HOSPITALS = [
    {
        "slug": "lokmanya-hospital-sb-road",
        "name": "Lokmanya Hospital - S B Road, Pune",
        "address": "402/A Gokhale Nagar Road, Vetal Baba Chowk, off Senapati Bapat Road, Pune, Maharashtra 411016",
        "locality": "S B Road",
        "ar_name": "مستشفى لوكمانيا — إس بي رود، بونه",
        "established": "2020",
    },
    {
        "slug": "lokmanya-hospital-nigdi",
        "name": "Lokmanya Hospital - Nigdi, Pune",
        "address": "Sector 27, Tilak Rd, Sector No. 24, Pradhikaran, Nigdi, Pune, Maharashtra 411044",
        "locality": "Nigdi",
        "ar_name": "مستشفى لوكمانيا — نيغدي، بونه",
        "established": "1993",
    },
    {
        "slug": "lokmanya-hospital-chinchwad",
        "name": "Lokmanya Hospital - Chinchwad, Pune",
        "address": "314/B, Chinchwad Gaon Rd, Udyog Nagar, Chinchwad, Pune, Maharashtra 411033",
        "locality": "Chinchwad",
        "ar_name": "مستشفى لوكمانيا — تشينشواد، بونه",
        "established": "1972",
    },
]

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

URL_SPECIALTY_FIX = {
    "critical-care": "Critical Care",
    "emergency-medicine": "Emergency Medicine",
    "internal-medicine": "Internal Medicine",
    "nuclear-medicine": "Nuclear Medicine",
    "psychiatrist": "Psychiatry",
    "pathologist": "Pathology",
}


def load_json(path: Path):
    return json.loads(path.read_text(encoding="utf-8"))


def save_json(path: Path, data) -> None:
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def slugify_name(name: str) -> str:
    s = name.lower().strip()
    s = re.sub(r"\b(dr|dt|ms|mrs|mr)\.?\b", "", s)
    s = re.sub(r"[^a-z0-9]+", "-", s).strip("-")
    return f"dr-{s}" if s and not s.startswith("dr-") else s


def hash_int(value: str) -> int:
    return int(hashlib.md5(value.encode()).hexdigest()[:8], 16)


def to_webp(src: Path | bytes, dest: Path, size=(500, 350)) -> bool:
    try:
        if isinstance(src, Path):
            img = Image.open(src)
        else:
            img = Image.open(BytesIO(src))
        img = img.convert("RGBA")
        img.thumbnail(size, Image.Resampling.LANCZOS)
        canvas = Image.new("RGBA", size, (245, 245, 245, 255))
        x = (size[0] - img.size[0]) // 2
        y = (size[1] - img.size[1]) // 2
        canvas.paste(img, (x, y), img if img.mode == "RGBA" else None)
        dest.parent.mkdir(parents=True, exist_ok=True)
        canvas.convert("RGB").save(dest, "WEBP", quality=82, method=4)
        return True
    except Exception as exc:  # noqa: BLE001
        print(f"  image fail {dest.name}: {exc}")
        return False


def download(url: str) -> bytes | None:
    if not url:
        return None
    try:
        req = urllib.request.Request(url, headers=UA)
        with urllib.request.urlopen(req, timeout=45) as response:
            return response.read()
    except Exception as exc:  # noqa: BLE001
        print(f"  download fail {url}: {exc}")
        return None


def manipal_exclusion_reason(row: dict) -> str:
    reason = row.get("reason") or ""
    if "Select Salutations" in reason:
        url = row.get("profile_url") or ""
        for key, label in URL_SPECIALTY_FIX.items():
            if key in url:
                return f"specialty_not_in_gaf_taxonomy:{label}"
        # fallback from URL tail
        m = re.search(r"/doctors/dr-[^/]+-([a-z0-9-]+)/?", url)
        if m:
            return f"specialty_not_in_gaf_taxonomy:{m.group(1).replace('-', ' ').title()}"
    return reason


def build_manipal_bio(doc: dict, specialty: str, procedures: list[str]) -> str:
    name = doc["name"]
    designation = (doc.get("designation_exact") or TITLE_BY_SPECIALTY.get(specialty, specialty)).strip()
    quals = (doc.get("qualifications") or "").strip()
    exp = (doc.get("experience_display") or "").strip()
    expertise = [e.strip() for e in (doc.get("field_of_expertise") or []) if e and e.strip()]
    variants = [
        (
            f"{name} practises {specialty.lower()} at {MANIPAL_NAME} in Pune, India. "
            f"The GAF Healthcare directory files this profile under {specialty}."
        ),
        (
            f"{name} is listed under {specialty} at {MANIPAL_NAME}, Baner campus, Pune. "
            f"This page is a directory record for comparing specialty, campus and published credentials."
        ),
        (
            f"At {MANIPAL_NAME} in Pune, {name} works in {specialty}. "
            f"GAF Healthcare keeps Baner as an independent campus record separate from Sahyadri sites."
        ),
    ]
    lead = variants[hash_int(doc["proposed_slug"]) % len(variants)]
    parts = [lead]
    if exp:
        parts.append(f"Published experience on the official Manipal Hospitals profile is recorded as {exp.lower()}.")
    if quals:
        parts.append(f"Listed credentials include {quals}.")
    if designation and designation.lower() not in lead.lower():
        parts.append(f"The published designation is {designation}.")
    if expertise:
        focus = "; ".join(expertise[:6])
        parts.append(f"Official areas of focus include {focus}.")
    if procedures:
        parts.append(
            "Procedure associations retained for directory matching are limited to existing GAF taxonomy "
            f"names supported by individual profile evidence: {', '.join(procedures)}."
        )
    else:
        parts.append(
            "No individual procedure associations were retained where the official profile did not "
            "support a specific GAF taxonomy match."
        )
    parts.append(
        "International patients should treat this page as a directory record for comparing specialty, "
        "campus and published credentials before a records-based opinion."
    )
    return " ".join(parts)


def build_lok_bio(row: dict, hospital_names: list[str], specialty: str, procedures: list[str]) -> str:
    name = row["name"]
    designation = (row.get("designation") or TITLE_BY_SPECIALTY.get(specialty, specialty)).strip()
    quals = (row.get("education") or "").strip()
    years = row.get("experience_years")
    hospitals = ", ".join(hospital_names)
    variants = [
        (
            f"{name} practises {specialty.lower()} at {hospitals} in Pune, India. "
            f"The GAF Healthcare directory files this profile under {specialty}."
        ),
        (
            f"{name} is affiliated with {hospitals}. "
            f"This GAF Healthcare profile is organised under {specialty} for Pune, Maharashtra, India."
        ),
        (
            f"In Pune, {name} is listed for {specialty} with verified Lokmanya Hospitals campus affiliations "
            f"covering {hospitals}."
        ),
    ]
    lead = variants[hash_int(row["slug"]) % len(variants)]
    parts = [lead]
    if years not in (None, "", 0, "0"):
        parts.append(f"Published experience on the official Lokmanya Hospitals profile is recorded as {years}+ years.")
    if quals:
        parts.append(f"Listed credentials include {quals}.")
    if designation:
        parts.append(f"The published designation is {designation}.")
    tag = (row.get("expertTagline") or "").strip()
    if tag and len(tag) < 120:
        parts.append(f"Published clinical focus wording includes: {tag}.")
    # Use a short, rewritten summary from description — not a copy of marketing paragraphs.
    desc = (row.get("description_text") or "").strip()
    if desc:
        # Take first factual sentence fragments without superlatives.
        cleaned = re.sub(
            r"\b(leading|top|best|renowned|highly (?:skilled|experienced|accomplished)|world[- ]class)\b",
            "",
            desc,
            flags=re.I,
        )
        cleaned = re.sub(r"\s+", " ", cleaned).strip()
        # Prefer sentences mentioning years/credentials already covered; add one clinical sentence.
        sentences = [s.strip() for s in re.split(r"(?<=[.!?])\s+", cleaned) if len(s.strip()) > 40]
        pick = None
        for s in sentences:
            low = s.lower()
            if "about dr" in low or "is a" in low[:40]:
                continue
            if any(k in low for k in ("specialis", "focus", "manag", "treat", "surg", "care for")):
                pick = s
                break
        if pick and len(pick) < 280:
            parts.append(pick if pick.endswith(".") else pick + ".")
    if procedures:
        parts.append(
            "Procedure associations retained for directory matching are limited to existing GAF taxonomy "
            f"names supported by individual profile evidence: {', '.join(procedures)}."
        )
    else:
        parts.append(
            "No individual procedure associations were retained where the official profile did not "
            "support a specific GAF taxonomy match."
        )
    parts.append(
        "Lokmanya campus relationships on GAF are limited to OPD locations published on the official "
        "doctor record. International patients should treat this page as a directory record before a "
        "records-based opinion."
    )
    return " ".join(parts)


def map_lok_procedures(row: dict, taxonomy: dict) -> list[str]:
    """Conservative: only map when description/designation explicitly mentions a taxonomy procedure."""
    specialty = row["gafSpecialty"]
    candidates = taxonomy.get(specialty) or []
    names = []
    for item in candidates:
        names.append(item if isinstance(item, str) else item.get("name"))
    names = [n for n in names if n]
    blob = " ".join(
        [
            row.get("description_text") or "",
            row.get("designation") or "",
            row.get("expertTagline") or "",
            row.get("education") or "",
        ]
    ).lower()
    matched = []
    for name in names:
        # Require a reasonably specific token from the procedure name (skip ultra-generic).
        key = re.sub(r"\([^)]*\)", "", name).strip().lower()
        tokens = [t for t in re.split(r"[^a-z0-9]+", key) if len(t) >= 5]
        if len(tokens) < 1:
            continue
        # Prefer multi-token / distinctive matches
        if key in blob or all(t in blob for t in tokens[:2] if len(tokens) >= 2):
            # Avoid assigning entire specialty menus: require at least one distinctive token present
            distinctive = [t for t in tokens if t not in {"surgery", "repair", "treatment", "therapy", "procedure"}]
            if distinctive and any(t in blob for t in distinctive):
                matched.append(name)
        if len(matched) >= 6:
            break
    return matched


def hospital_seed(h: dict) -> dict:
    slug = h["slug"]
    locality = h["locality"]
    return {
        "slug": slug,
        "href": f"/destinations/india/hospitals/lokmanya-hospitals/{slug}/",
        "name": h["name"],
        "city": "Pune",
        "established": h.get("established") or "",
        "beds": "",
        "accreditation": "",
        "bio": (
            f"{h['name']} is an independent Lokmanya Hospitals campus in {locality}, Pune, "
            f"Maharashtra, India, and is listed separately from other Lokmanya Pune sites in the "
            f"GAF Healthcare catalogue. The campus address published by Lokmanya Hospitals is "
            f"{h['address']}. Group appointment telephone published by Lokmanya Hospitals is "
            f"93 0707 6767 (+91 93070 76767); emergency helpline 1066. Faculty, specialty and "
            f"procedure relationships on GAF are built only from verified doctor records linked to "
            f"this campus. Bed counts, ICU capacity and campus service lines beyond faculty evidence "
            f"are not invented on this page."
        ),
        "specialty": "",
        "image": "",
        "summary": (
            f"Independent Lokmanya Hospitals campus in {locality}, Pune. Address: {h['address']}. "
            "Faculty relationships are derived from verified affiliated doctors only."
        ),
        "imageAlt": "",
    }


def doctor_record(
    *,
    slug: str,
    name: str,
    specialty: str,
    experience: str,
    qualifications: str,
    designation: str,
    hospital_slug: str,
    hospital_name: str,
    hospital_href: str,
    hospital_caption: str,
    hospital_slugs: list[str],
    affiliations: list[str],
    specializations: list[str],
    procedures: list[str],
    education: list[str],
    bio: str,
    image: str,
    image_alt: str,
) -> dict:
    return {
        "slug": slug,
        "name": name,
        "featured": False,
        "specialty": specialty,
        "experience": experience,
        "qualifications": qualifications,
        "designation": designation,
        "hospitalName": hospital_name,
        "hospitalHref": hospital_href,
        "hospitalSlug": hospital_slug,
        "hospitalCaption": hospital_caption,
        "city": "Pune",
        "cityCountry": "Pune, India",
        "specializations": specializations,
        "proceduresExpertise": procedures,
        "education": education,
        "affiliations": affiliations,
        "awards": [],
        "research": [],
        "memberships": [],
        "bio": bio,
        "hospitalSlugs": hospital_slugs,
        "image": image,
        "imageAlt": image_alt,
    }


def primary_hospital_fields(slugs: list[str], hospitals_by_slug: dict) -> tuple[str, str, str, str]:
    """Prefer first listed campus for display fields."""
    primary = slugs[0]
    h = hospitals_by_slug[primary]
    caption = "Lokmanya Hospitals" if primary.startswith("lokmanya-") else (
        "Manipal Hospitals" if primary == MANIPAL_SLUG else "Sahyadri Hospitals"
    )
    return primary, h["name"], h["href"], caption


def write_csv(path: Path, rows: list[dict], fieldnames: list[str]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8", newline="") as fh:
        writer = csv.DictWriter(fh, fieldnames=fieldnames, extrasaction="ignore")
        writer.writeheader()
        for row in rows:
            writer.writerow(row)


def main() -> None:
    ginger = load_json(GINGER_PATH)
    names_ar = load_json(NAMES_AR_PATH)
    manipal_profiles = load_json(RESEARCH / "manipal-new-profiles.json")["doctors"]
    manipal_elig = load_json(RESEARCH / "manipal-eligibility.json")
    lok_elig = load_json(RESEARCH / "lokmanya-eligibility-final.json")
    taxonomy = load_json(RESEARCH / "gaf-procedure-taxonomy.json")

    doctors_by_slug = {d["slug"]: d for d in ginger["doctors"]}
    hospitals_by_slug = {h["slug"]: h for h in ginger["hospitals"]}

    # --- Lokmanya hospitals ---
    for h in LOK_HOSPITALS:
        seed = hospital_seed(h)
        if h["slug"] in hospitals_by_slug:
            hospitals_by_slug[h["slug"]].update(seed)
        else:
            ginger["hospitals"].append(seed)
            hospitals_by_slug[h["slug"]] = seed
        names_ar[h["slug"]] = {"en": h["name"], "ar": h["ar_name"]}

    image_audit = []
    proc_audit = []
    eligibility_rows = []
    multi_campus_audit = []

    # --- Manipal eligibility CSV (full directory) ---
    already_names = {a["name"] for a in manipal_elig.get("already", [])}
    for row in manipal_elig.get("eligible", []):
        eligibility_rows.append(
            {
                "source": "manipal-baner",
                "name": row.get("name"),
                "eligible": "YES",
                "gaf_specialty": row.get("gafSpecialty") or row.get("mapped_specialty") or "",
                "hospital": MANIPAL_NAME,
                "city": "Pune",
                "source_url": row.get("profile_url") or "",
                "exclusion_reason": "",
                "status": "already_present" if row.get("name") in already_names else "new_or_merge",
            }
        )
    for row in manipal_elig.get("excluded", []):
        eligibility_rows.append(
            {
                "source": "manipal-baner",
                "name": row.get("name"),
                "eligible": "NO",
                "gaf_specialty": "",
                "hospital": MANIPAL_NAME,
                "city": "Pune",
                "source_url": row.get("profile_url") or "",
                "exclusion_reason": manipal_exclusion_reason(row),
                "status": "excluded",
            }
        )

    # --- Manipal new/merge doctors ---
    MANIPAL_IMG_DIR.mkdir(parents=True, exist_ok=True)
    manipal_added = 0
    manipal_merged = 0
    for idx, doc in enumerate(manipal_profiles):
        proposed = doc["proposed_slug"]
        specialty = doc["recommended_gaf_specialty"]
        procedures = [p["gaf_procedure"] for p in (doc.get("procedures_verified") or [])]
        merge_slug = MANIPAL_MERGE.get(proposed)

        # Image
        img_rel = ""
        src_png = RESEARCH / "imgs" / f"{idx:02d}.png"
        target_slug = merge_slug or proposed
        dest = MANIPAL_IMG_DIR / f"{target_slug}.webp"
        if src_png.exists() and to_webp(src_png, dest):
            img_rel = f"/doctors/manipal-baner/{target_slug}.webp"
            image_audit.append(
                {
                    "slug": target_slug,
                    "source": "manipal-baner",
                    "status": "verified_imported",
                    "image": img_rel,
                    "source_url": doc.get("image_url") or "",
                }
            )
        else:
            image_audit.append(
                {
                    "slug": target_slug,
                    "source": "manipal-baner",
                    "status": "avatar_fallback",
                    "image": "",
                    "source_url": doc.get("image_url") or "",
                }
            )

        for proc in procedures:
            proc_audit.append(
                {
                    "slug": target_slug,
                    "name": doc["name"],
                    "specialty": specialty,
                    "procedure": proc,
                    "mapping_status": "verified",
                    "evidence": "manipal_official_profile",
                    "source_url": doc.get("profile_url") or "",
                }
            )
        if not procedures:
            proc_audit.append(
                {
                    "slug": target_slug,
                    "name": doc["name"],
                    "specialty": specialty,
                    "procedure": "",
                    "mapping_status": "no_specific_procedure_evidence",
                    "evidence": "",
                    "source_url": doc.get("profile_url") or "",
                }
            )

        if merge_slug and merge_slug in doctors_by_slug:
            existing = doctors_by_slug[merge_slug]
            slugs = list(existing.get("hospitalSlugs") or [existing["hospitalSlug"]])
            if MANIPAL_SLUG not in slugs:
                slugs.append(MANIPAL_SLUG)
            existing["hospitalSlugs"] = slugs
            aff = list(existing.get("affiliations") or [])
            if MANIPAL_NAME not in aff:
                aff.append(MANIPAL_NAME)
            existing["affiliations"] = aff
            # Keep existing specialty/procedures; optionally enrich empty procedure lists.
            if not existing.get("proceduresExpertise") and procedures:
                existing["proceduresExpertise"] = procedures
            if img_rel and not existing.get("image"):
                existing["image"] = img_rel
                existing["imageAlt"] = (
                    f"{existing['name']}, {existing['specialty']} at {MANIPAL_NAME}, Pune"
                )
            # Note Baner affiliation in bio if missing
            if MANIPAL_NAME not in (existing.get("bio") or ""):
                existing["bio"] = (
                    (existing.get("bio") or "").rstrip()
                    + f" Published Manipal Hospitals Baner materials also associate this clinician with {MANIPAL_NAME}."
                )
            multi_campus_audit.append(
                {
                    "slug": merge_slug,
                    "name": existing["name"],
                    "action": "append_manipal_baner",
                    "hospitalSlugs": "|".join(slugs),
                    "kept_specialty": existing["specialty"],
                    "manipal_specialty": specialty,
                }
            )
            manipal_merged += 1
            continue

        # New doctor
        if proposed in doctors_by_slug:
            # Unexpected collision — suffix with -baner
            proposed = f"{proposed}-baner"
        bio = build_manipal_bio(doc, specialty, procedures)
        designation = doc.get("designation_exact") or TITLE_BY_SPECIALTY.get(specialty, specialty)
        quals = doc.get("qualifications") or ""
        exp = doc.get("experience_display") or "Experience listed on Manipal Hospitals profile"
        rec = doctor_record(
            slug=proposed,
            name=doc["name"],
            specialty=specialty,
            experience=exp,
            qualifications=quals,
            designation=designation,
            hospital_slug=MANIPAL_SLUG,
            hospital_name=MANIPAL_NAME,
            hospital_href=MANIPAL_HREF,
            hospital_caption="Manipal Hospitals",
            hospital_slugs=[MANIPAL_SLUG],
            affiliations=[MANIPAL_NAME, "Manipal Hospitals"],
            specializations=[specialty] + ([doc.get("card_specialty_raw")] if doc.get("card_specialty_raw") and doc.get("card_specialty_raw") != specialty else []),
            procedures=procedures,
            education=[quals] if quals else [],
            bio=bio,
            image=img_rel,
            image_alt=f"{doc['name']}, {specialty} at {MANIPAL_NAME}, Pune",
        )
        # Deduplicate specializations
        seen = set()
        rec["specializations"] = [s for s in rec["specializations"] if s and not (s in seen or seen.add(s))]
        ginger["doctors"].append(rec)
        doctors_by_slug[proposed] = rec
        manipal_added += 1

    # --- Lokmanya doctors ---
    LOK_IMG_DIR.mkdir(parents=True, exist_ok=True)
    lok_hosp_names = {h["slug"]: h["name"] for h in LOK_HOSPITALS}
    lok_added = 0
    lok_merged = 0

    for row in lok_elig["eligible"]:
        eligibility_rows.append(
            {
                "source": "lokmanya",
                "name": row["name"],
                "eligible": "YES",
                "gaf_specialty": row["gafSpecialty"],
                "hospital": "|".join(lok_hosp_names[s] for s in row["campusSlugs"]),
                "city": "Pune",
                "source_url": row.get("sourceUrl") or "",
                "exclusion_reason": "",
                "status": "merge" if row["slug"] in LOK_MERGE else "new",
            }
        )
    for row in lok_elig["excluded"]:
        eligibility_rows.append(
            {
                "source": "lokmanya",
                "name": row["name"],
                "eligible": "NO",
                "gaf_specialty": "",
                "hospital": "|".join(lok_hosp_names.get(s, s) for s in (row.get("campusSlugs") or [])),
                "city": "Pune",
                "source_url": row.get("sourceUrl") or "",
                "exclusion_reason": row.get("reason") or "",
                "status": "excluded",
            }
        )

    for row in lok_elig["eligible"]:
        proposed = row["slug"]
        specialty = row["gafSpecialty"]
        campuses = list(row["campusSlugs"])
        merge_slug = LOK_MERGE.get(proposed)
        procedures = map_lok_procedures(row, taxonomy)
        target_slug = merge_slug or proposed

        img_rel = ""
        photo = row.get("photo") or ""
        if photo:
            blob = download(photo)
            dest = LOK_IMG_DIR / f"{target_slug}.webp"
            if blob and to_webp(blob, dest):
                img_rel = f"/doctors/lokmanya/{target_slug}.webp"
                image_audit.append(
                    {
                        "slug": target_slug,
                        "source": "lokmanya",
                        "status": "verified_imported",
                        "image": img_rel,
                        "source_url": photo,
                    }
                )
            else:
                image_audit.append(
                    {
                        "slug": target_slug,
                        "source": "lokmanya",
                        "status": "avatar_fallback",
                        "image": "",
                        "source_url": photo,
                    }
                )
        else:
            image_audit.append(
                {
                    "slug": target_slug,
                    "source": "lokmanya",
                    "status": "avatar_fallback",
                    "image": "",
                    "source_url": "",
                }
            )

        for proc in procedures:
            proc_audit.append(
                {
                    "slug": target_slug,
                    "name": row["name"],
                    "specialty": specialty,
                    "procedure": proc,
                    "mapping_status": "verified",
                    "evidence": "lokmanya_official_profile_text",
                    "source_url": row.get("sourceUrl") or "",
                }
            )
        if not procedures:
            proc_audit.append(
                {
                    "slug": target_slug,
                    "name": row["name"],
                    "specialty": specialty,
                    "procedure": "",
                    "mapping_status": "no_specific_procedure_evidence",
                    "evidence": "",
                    "source_url": row.get("sourceUrl") or "",
                }
            )

        if merge_slug and merge_slug in doctors_by_slug:
            existing = doctors_by_slug[merge_slug]
            slugs = list(existing.get("hospitalSlugs") or [existing["hospitalSlug"]])
            for c in campuses:
                if c not in slugs:
                    slugs.append(c)
            existing["hospitalSlugs"] = slugs
            aff = list(existing.get("affiliations") or [])
            for c in campuses:
                n = lok_hosp_names[c]
                if n not in aff:
                    aff.append(n)
            existing["affiliations"] = aff
            if "Lokmanya Hospitals" not in aff:
                aff.append("Lokmanya Hospitals")
            existing["affiliations"] = aff
            if img_rel and not existing.get("image"):
                existing["image"] = img_rel
            if "Lokmanya" not in (existing.get("bio") or ""):
                existing["bio"] = (
                    (existing.get("bio") or "").rstrip()
                    + " Published Lokmanya Hospitals OPD listings also associate this clinician with "
                    + ", ".join(lok_hosp_names[c] for c in campuses)
                    + "."
                )
            multi_campus_audit.append(
                {
                    "slug": merge_slug,
                    "name": existing["name"],
                    "action": "append_lokmanya_campuses",
                    "hospitalSlugs": "|".join(slugs),
                    "kept_specialty": existing["specialty"],
                    "lokmanya_specialty": specialty,
                }
            )
            lok_merged += 1
            continue

        if proposed in doctors_by_slug:
            proposed = f"{proposed}-lokmanya"

        hospital_names = [lok_hosp_names[c] for c in campuses]
        primary, pname, phref, pcap = primary_hospital_fields(campuses, hospitals_by_slug)
        quals = (row.get("education") or "").strip()
        years = row.get("experience_years")
        exp = f"{years}+ years Experience" if years not in (None, "", 0, "0") else "Experience listed on Lokmanya Hospitals profile"
        designation = (row.get("designation") or TITLE_BY_SPECIALTY.get(specialty, specialty)).strip()
        bio = build_lok_bio(row, hospital_names, specialty, procedures)
        rec = doctor_record(
            slug=proposed,
            name=row["name"].strip(),
            specialty=specialty,
            experience=exp,
            qualifications=quals,
            designation=designation,
            hospital_slug=primary,
            hospital_name=pname,
            hospital_href=phref,
            hospital_caption=pcap,
            hospital_slugs=campuses,
            affiliations=hospital_names + ["Lokmanya Hospitals"],
            specializations=[specialty],
            procedures=procedures,
            education=[quals] if quals else [],
            bio=bio,
            image=img_rel,
            image_alt=f"{row['name'].strip()}, {specialty} at {pname}, Pune",
        )
        ginger["doctors"].append(rec)
        doctors_by_slug[proposed] = rec
        lok_added += 1

    # Persist catalogues
    save_json(GINGER_PATH, ginger)
    save_json(NAMES_AR_PATH, names_ar)

    # Audits
    write_csv(
        DOCS / "manipal-lokmanya-eligibility.csv",
        eligibility_rows,
        [
            "source",
            "name",
            "eligible",
            "gaf_specialty",
            "hospital",
            "city",
            "source_url",
            "exclusion_reason",
            "status",
        ],
    )
    write_csv(
        DOCS / "manipal-lokmanya-image-audit.csv",
        image_audit,
        ["slug", "source", "status", "image", "source_url"],
    )
    write_csv(
        DOCS / "manipal-lokmanya-doctor-procedure-audit.csv",
        proc_audit,
        ["slug", "name", "specialty", "procedure", "mapping_status", "evidence", "source_url"],
    )
    write_csv(
        DOCS / "manipal-lokmanya-multicampus-audit.csv",
        multi_campus_audit,
        ["slug", "name", "action", "hospitalSlugs", "kept_specialty", "manipal_specialty", "lokmanya_specialty"],
    )

    baner_docs = [
        d
        for d in ginger["doctors"]
        if MANIPAL_SLUG in (d.get("hospitalSlugs") or [d.get("hospitalSlug")])
    ]
    lok_docs = [
        d
        for d in ginger["doctors"]
        if any(s.startswith("lokmanya-") for s in (d.get("hospitalSlugs") or [d.get("hospitalSlug")]))
    ]
    report = {
        "branch": "cursor/manipal-lokmanya-pune-doctors-hospitals-6064",
        "baseline": "2b49d2cfcef57427c3ade02852cb7efe27d25473",
        "manipal": {
            "discovered": len(manipal_elig.get("eligible", [])) + len(manipal_elig.get("excluded", [])),
            "eligible": len(manipal_elig.get("eligible", [])),
            "already_present": len(manipal_elig.get("already", [])),
            "new_records_added": manipal_added,
            "multi_campus_merged": manipal_merged,
            "excluded": len(manipal_elig.get("excluded", [])),
            "baner_faculty_after": len(baner_docs),
        },
        "lokmanya": {
            "discovered": len(lok_elig["eligible"]) + len(lok_elig["excluded"]),
            "eligible": len(lok_elig["eligible"]),
            "new_records_added": lok_added,
            "multi_campus_merged": lok_merged,
            "excluded": len(lok_elig["excluded"]),
            "faculty_after": len(lok_docs),
            "campuses_added": [h["slug"] for h in LOK_HOSPITALS],
        },
        "images": {
            "verified_imported": sum(1 for r in image_audit if r["status"] == "verified_imported"),
            "avatar_fallback": sum(1 for r in image_audit if r["status"] == "avatar_fallback"),
        },
        "specialty_counts_manipal_baner": dict(Counter(d["specialty"] for d in baner_docs)),
        "specialty_counts_lokmanya": dict(Counter(d["specialty"] for d in lok_docs)),
        "inventory": {
            "hospitals": len(ginger["hospitals"]),
            "doctors": len(ginger["doctors"]),
            "pune_doctors": sum(1 for d in ginger["doctors"] if d.get("city") == "Pune"),
            "pune_hospitals": sum(1 for h in ginger["hospitals"] if h.get("city") == "Pune"),
        },
    }
    save_json(DOCS / "manipal-lokmanya-import-report.json", report)
    print(json.dumps(report, indent=2))


if __name__ == "__main__":
    main()
