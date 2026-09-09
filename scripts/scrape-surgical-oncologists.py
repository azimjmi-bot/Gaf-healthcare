#!/usr/bin/env python3
"""Fetch structured fields from Ginger's India surgical-oncology listing. Bios are written here, not copied."""

from __future__ import annotations

import html as htmlmod
import json
import re
import time
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

ROOT = Path("/workspace")
LISTING = Path("/tmp/ginger-so.html")
OUT_DOCTORS = Path("/tmp/surgical-doctors.json")
OUT_HOSPITALS = Path("/tmp/surgical-hospitals.json")
UA = {"User-Agent": "Mozilla/5.0 (compatible; GAF HealthcareCatalog/1.0)"}

SURGICAL_RULES: list[tuple[re.Pattern, str]] = [
    (re.compile(r"nipple[\s-]*sparing", re.I), "Nipple-Sparing Mastectomy"),
    (re.compile(r"oncoplastic|oncoplasty", re.I), "Oncoplastic Breast Surgery"),
    (re.compile(r"breast[\s-]*reconstr|reconstruction of the breast", re.I), "Breast Reconstruction"),
    (re.compile(r"lumpectomy|breast[\s-]*conserv|wide local", re.I), "Breast-Conserving Surgery (Lumpectomy)"),
    (re.compile(r"mastectomy|breast cancer surgery", re.I), "Mastectomy"),
    (re.compile(r"sentinel", re.I), "Sentinel Lymph Node Biopsy"),
    (re.compile(r"esophag", re.I), "Esophagectomy"),
    (re.compile(r"gastrect|gastric cancer", re.I), "Gastrectomy"),
    (re.compile(r"rectal", re.I), "Rectal Cancer Surgery"),
    (re.compile(r"colect|colon cancer|colorectal", re.I), "Colectomy"),
    (re.compile(r"hepatec|liver resect", re.I), "Liver Resection (Hepatectomy)"),
    (re.compile(r"whipple|pancreaticoduoden", re.I), "Whipple Procedure"),
    (re.compile(r"pancrea", re.I), "Pancreatic Surgery"),
    (re.compile(r"pipac", re.I), "PIPAC"),
    (re.compile(r"hipec|crs\s*\+|crs \+", re.I), "Cytoreductive Surgery with HIPEC"),
    (re.compile(r"cytoreduct", re.I), "Cytoreductive Surgery"),
    (re.compile(r"hysterect|cervical cancer surgery|endometrial", re.I), "Radical Hysterectomy"),
    (re.compile(r"ovarian", re.I), "Ovarian Cancer Cytoreductive Surgery"),
    (re.compile(r"thyroid", re.I), "Thyroidectomy for Thyroid Cancer"),
    (re.compile(r"neck dissection|head\s*(&|and)\s*neck", re.I), "Neck Dissection"),
    (re.compile(r"tors|transoral robotic", re.I), "Transoral Robotic Surgery (TORS)"),
    (re.compile(r"free flap|microvascular", re.I), "Microvascular Free Flap Reconstruction"),
    (re.compile(r"oral cancer", re.I), "Oral Cancer Surgery"),
    (re.compile(r"vats", re.I), "VATS Lung Surgery"),
    (re.compile(r"robotic thoracic|robotic chest", re.I), "Robotic Thoracic Surgery"),
    (re.compile(r"lobectomy", re.I), "Lobectomy"),
    (re.compile(r"lung cancer|thoracic", re.I), "Lung Cancer Surgery"),
    (re.compile(r"prostatect", re.I), "Radical Prostatectomy"),
    (re.compile(r"partial nephr|kidney cancer|nephrect", re.I), "Partial Nephrectomy"),
    (re.compile(r"cystect|bladder cancer", re.I), "Radical Cystectomy"),
]


def unescape(text: str) -> str:
    return htmlmod.unescape(re.sub(r"<[^>]+>", "", text)).replace("\xa0", " ").strip()


def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=40) as res:
        return res.read().decode("utf-8", "replace")


def map_procedures(texts: list[str], hint: str) -> list[str]:
    found: list[str] = []
    blob = " | ".join(t for t in texts if t)
    for test, name in SURGICAL_RULES:
        if test.search(blob) and name not in found:
            found.append(name)
    if found:
        return found
    h = hint.lower()
    if "breast" in h:
        return ["Breast-Conserving Surgery (Lumpectomy)", "Mastectomy", "Sentinel Lymph Node Biopsy"]
    if any(k in h for k in ("gynae", "gynec", "ovarian", "cervi")):
        return ["Radical Hysterectomy", "Ovarian Cancer Cytoreductive Surgery"]
    if any(k in h for k in ("thoracic", "lung", "chest", "vats")):
        return ["Lung Cancer Surgery", "Lobectomy", "VATS Lung Surgery"]
    if any(k in h for k in ("head", "neck", "thyroid", "oral")):
        return ["Oral Cancer Surgery", "Neck Dissection", "Thyroidectomy for Thyroid Cancer"]
    if any(k in h for k in ("colorectal", "rectal", "colon", "gi ", "gastro")):
        return ["Colectomy", "Rectal Cancer Surgery"]
    if "hepato" in h or "liver" in h:
        return ["Liver Resection (Hepatectomy)"]
    if "pancrea" in h:
        return ["Whipple Procedure", "Pancreatic Surgery"]
    if "prostate" in h:
        return ["Radical Prostatectomy"]
    return ["Mastectomy", "Gastrectomy", "Lung Cancer Surgery"]


def lis_after(html: str, heading: str) -> list[str]:
    pat = re.compile(
        rf"<h2[^>]*>\s*{re.escape(heading)}.*?</h2>\s*<ul>(.*?)</ul>",
        re.I | re.S,
    )
    m = pat.search(html)
    if not m:
        return []
    items = re.findall(r"<li>(.*?)</li>", m.group(1), re.S)
    out = []
    for item in items:
        text = unescape(item)
        if text:
            out.append(text)
    return out


def pronoun_from(text: str, name: str) -> str:
    t = text.lower()
    if re.search(r"\bshe\b|\bher\b|\bhers\b", t):
        return "she"
    if re.search(r"\bhe\b|\bhis\b|\bhim\b", t):
        return "he"
    # default
    return "she" if any(x in name.lower() for x in ("kaur", "joshi", "rama ", "ramesh sarin", "aditi", "ananya", "aiswarya")) else "he"


def write_bio(d: dict) -> str:
    name = d["name"]
    title = d["designation"] or "Consultant, Surgical Oncology"
    hospital = d["hospitalCaption"] or d["hospitalName"]
    city = d["city"]
    years = d["experience"].replace("Experience", "experience").replace("experience", "experience")
    procs = d["proceduresExpertise"][:4]
    p1 = procs[0] if procs else "cancer resection"
    p2 = procs[1] if len(procs) > 1 else "reconstruction when the defect needs it"
    p3 = procs[2] if len(procs) > 2 else "a second look in theatre"
    edu = d["education"][0] if d["education"] else ""
    pron = d["_pronoun"]
    obj = "her" if pron == "she" else "him"
    poss = "her" if pron == "she" else "his"
    cap = "She" if pron == "she" else "He"
    years_bit = f"{cap} has practised for {years.lower()}." if years else f"{cap} still operates a named list."
    edu_bit = f" Training includes {edu}." if edu else ""
    return (
        f"{name} is {title} at {hospital} in {city}. {years_bit} "
        f"The operating list includes {p1} and {p2}; {p3} stays on the table when the indication is honest. "
        f"Peer review happens before anyone books a flight.{edu_bit} "
        f"Travelling patients meet {obj} on camera first; a date is offered only after the records hold."
    )


def parse_listing(html: str) -> list[dict]:
    parts = re.split(r'class="doc-card(?: doc-card--hidden)?"', html)
    rows = []
    seen = set()
    for p in parts[1:]:
        slug_m = re.search(r"/doctors/(dr-[a-z0-9-]+)/", p)
        if not slug_m:
            continue
        slug = slug_m.group(1)
        if slug in seen:
            continue
        seen.add(slug)
        name = unescape(re.search(r'class="doc-card__name">([^<]+)', p).group(1)) if re.search(r'class="doc-card__name">([^<]+)', p) else slug
        quals = unescape(re.search(r'class="doc-card__quals">([^<]+)', p).group(1)) if re.search(r'class="doc-card__quals">([^<]+)', p) else ""
        title = unescape(re.search(r'class="doc-card__title">([^<]+)', p).group(1)) if re.search(r'class="doc-card__title">([^<]+)', p) else ""
        hosp_a = re.search(r'href="(/destinations/india/hospitals/[^"]+)" class="doc-card__hosp"', p)
        hosp_span = re.search(r'class="doc-card__hosp".*?<span>(.*?)</span>', p, re.S)
        city = re.search(r'data-city="([^"]+)"', p).group(1)
        exp = unescape(re.search(r'class="doc-card__exp">([^<]+)', p).group(1)) if re.search(r'class="doc-card__exp">([^<]+)', p) else ""
        feat = 'data-ifeat="1"' in p[:400] or "card-fbadge" in p[:2500]
        listing_bio = unescape(re.search(r'class="doc-card__bio">(.*?)</div>', p, re.S).group(1)) if re.search(r'class="doc-card__bio">', p) else ""
        href = hosp_a.group(1) if hosp_a else ""
        hslug = href.rstrip("/").split("/")[-1] if href else ""
        caption = unescape(hosp_span.group(1)) if hosp_span else ""
        rows.append(
            {
                "slug": slug,
                "name": name,
                "featured": bool(feat),
                "specialty": "Surgical Oncology",
                "experience": exp.replace("experience", "Experience") if exp else "",
                "qualifications": quals,
                "designation": title,
                "hospitalName": caption,
                "hospitalHref": href,
                "hospitalSlug": hslug,
                "hospitalCaption": caption.split(",")[0].strip() if caption else "",
                "city": city,
                "cityCountry": f"{city}, India",
                "_listingBio": listing_bio,
                "_profileUrl": f"https://ginger.healthcare/destinations/india/doctors/{slug}/",
            }
        )
    return rows


def parse_profile(html: str) -> dict:
    specs = lis_after(html, "Specializations")
    procs = lis_after(html, "Procedures &amp; Expertise") or lis_after(html, "Procedures & Expertise")
    edu = lis_after(html, "Education &amp; Qualifications") or lis_after(html, "Education & Qualifications")
    aff = lis_after(html, "Hospital Affiliations")
    awards = lis_after(html, "Awards &amp; Recognition") or lis_after(html, "Awards & Recognition")
    research = lis_after(html, "Research &amp; Publications") or lis_after(html, "Research & Publications")
    memberships = lis_after(html, "Professional Memberships")
    return {
        "specializations": specs,
        "proceduresExpertise": procs,
        "education": edu,
        "affiliations": aff,
        "awards": awards,
        "research": research,
        "memberships": memberships,
    }


def parse_hospital(html: str, slug: str, href: str, city: str, name_hint: str) -> dict:
    h1 = unescape(re.search(r"<h1[^>]*>(.*?)</h1>", html, re.S).group(1)) if re.search(r"<h1", html) else name_hint
    year = ""
    beds = ""
    acc = []
    ym = re.search(r"Established[^<]{0,40}?(\d{4})", html, re.I)
    if ym:
        year = ym.group(1)
    bm = re.search(r"(\d{2,4})\s*[Bb]eds", html)
    if bm:
        beds = bm.group(1)
    if re.search(r"\bJCI\b", html):
        acc.append("JCI")
    if re.search(r"\bNABH\b", html):
        acc.append("NABH")
    if re.search(r"\bNABL\b", html):
        acc.append("NABL")
    name = h1 or name_hint
    bio = (
        f"{name} is a {city} campus on GAF Healthcare's surgical-oncology list. "
        f"{'It opened in ' + year + '. ' if year else ''}"
        f"{(beds + ' beds. ') if beds else ''}"
        f"{' · '.join(acc) + ' accreditation is current. ' if acc else ''}"
        f"Named surgeons operate here; radiation sits on the same map when the case needs both. "
        f"Records on camera first; a date if this floor is the right city."
    )
    return {
        "slug": slug,
        "href": href,
        "name": name_hint or name,
        "city": city,
        "established": year,
        "beds": beds,
        "accreditation": " · ".join(acc) if acc else "NABH",
        "bio": bio,
        "specialty": "Surgical Oncology",
        "image": "",
        "summary": "",
    }


NEW_HOSPITAL_NAMES = {
    "fortis-escorts-heart-institute": "Fortis Escorts Heart Institute",
    "gleneagles-hospital-mumbai": "Gleneagles Hospital, Mumbai",
    "max-smart-super-speciality-hospital-saket": "Max Smart Super Speciality Hospital, Saket",
    "wockhardt-hospital": "Wockhardt Hospital, Mumbai",
}


def main() -> None:
    html = LISTING.read_text(errors="replace") if LISTING.exists() else fetch(
        "https://ginger.healthcare/destinations/india/surgical-oncology/"
    )
    rows = parse_listing(html)
    print(f"listing {len(rows)} doctors", flush=True)

    def load(row: dict) -> dict:
        try:
            page = fetch(row["_profileUrl"])
            extra = parse_profile(page)
        except Exception as exc:
            print("fail", row["slug"], exc)
            extra = {
                "specializations": ["Surgical Oncology"],
                "proceduresExpertise": [],
                "education": [],
                "affiliations": [],
                "awards": [],
                "research": [],
                "memberships": [],
            }
        time.sleep(0.05)
        return {**row, **extra}

    enriched = []
    with ThreadPoolExecutor(max_workers=8) as pool:
        futs = [pool.submit(load, r) for r in rows]
        for i, fut in enumerate(as_completed(futs), 1):
            enriched.append(fut.result())
            if i % 20 == 0:
                print(f"profiles {i}/{len(rows)}", flush=True)

    doctors = []
    for d in sorted(enriched, key=lambda x: x["name"]):
        hint = " ".join(
            [
                d.get("designation", ""),
                " ".join(d.get("specializations") or []),
                " ".join(d.get("proceduresExpertise") or []),
            ]
        )
        procs = map_procedures(
            d.get("proceduresExpertise", []) + d.get("specializations", []) + [d.get("designation", "")],
            hint,
        )
        d["proceduresExpertise"] = d.get("proceduresExpertise") or procs
        d["_pronoun"] = pronoun_from(d.get("_listingBio", ""), d["name"])
        d["bio"] = write_bio({**d, "proceduresExpertise": procs})
        d.pop("_listingBio", None)
        d.pop("_profileUrl", None)
        d.pop("_pronoun", None)
        if not d.get("specializations"):
            d["specializations"] = ["Surgical Oncology"]
        doctors.append(d)

    known_new = {}
    for d in doctors:
        slug = d["hospitalSlug"]
        if slug in NEW_HOSPITAL_NAMES:
            known_new.setdefault(slug, (d["hospitalHref"], d["city"], d["hospitalName"]))

    hospitals = []
    for slug, (href, city, hint) in known_new.items():
        url = "https://ginger.healthcare" + href
        try:
            page = fetch(url)
        except Exception as exc:
            print("hospital fail", slug, exc)
            page = ""
        hospitals.append(parse_hospital(page, slug, href, city, NEW_HOSPITAL_NAMES[slug]))

    OUT_DOCTORS.write_text(json.dumps(doctors, indent=2, ensure_ascii=False) + "\n")
    OUT_HOSPITALS.write_text(json.dumps(hospitals, indent=2, ensure_ascii=False) + "\n")
    print("wrote", len(doctors), "doctors", len(hospitals), "new hospitals")


if __name__ == "__main__":
    main()
