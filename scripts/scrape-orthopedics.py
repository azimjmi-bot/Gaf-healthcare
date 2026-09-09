#!/usr/bin/env python3
"""Fetch structured fields from Ginger's India orthopedics listing.

Bios are original Velora copy (TKR, THR, ACL, trauma, arthroscopy).
Do not paste Ginger marketing.
Source: https://ginger.healthcare/destinations/india/orthopedics/
Specialty on Velora is Orthopedics (slug orthopedics).
"""

from __future__ import annotations

import html as htmlmod
import json
import re
import time
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

LISTING = Path("/tmp/ginger-orthopedics.html")
OUT_DOCTORS = Path("/tmp/orthopedics-doctors.json")
CATALOG = Path("/workspace/src/data/ginger-catalog.json")
UA = {"User-Agent": "Mozilla/5.0 (compatible; VeloraCatalog/1.0)"}

SOURCE = "https://ginger.healthcare/destinations/india/orthopedics/"
SPECIALTY = "Orthopedics"

# Keep order in sync with src/lib/procedure-map.ts ORTHOPEDICS_RULES, plus
# listing synonyms that still resolve to those taxonomy names.
ORTHOPEDICS_RULES: list[tuple[re.Pattern, str]] = [
    (re.compile(r"robotic knee|mako.{0,12}knee|rosa knee|navio|cuvis|robotic[\s-]*assisted knee|robotic tkr", re.I), "Robotic Knee Replacement"),
    (re.compile(r"revision knee|knee revision|failed knee", re.I), "Revision Knee Replacement"),
    (re.compile(r"partial knee|unicompartmental|\buka\b|\bukr\b|unicondylar", re.I), "Partial Knee Replacement"),
    (re.compile(r"total knee|\btkr\b|\btka\b|knee replacement|knee arthroplast", re.I), "Total Knee Replacement"),
    (re.compile(r"revision hip|hip revision|failed hip", re.I), "Revision Hip Replacement"),
    (re.compile(r"hip resurfac|birmingham hip", re.I), "Hip Resurfacing"),
    (re.compile(r"total hip|\bthr\b|\btha\b|hip replacement|hip arthroplast", re.I), "Total Hip Replacement"),
    (re.compile(r"joint replacement", re.I), "Total Knee Replacement"),
    (re.compile(r"joint replacement", re.I), "Total Hip Replacement"),
    (re.compile(r"shoulder replacement|reverse shoulder|shoulder arthroplast", re.I), "Shoulder Replacement"),
    (re.compile(r"sports medicine|sports injur|sports.{0,20}orthop", re.I), "ACL Reconstruction (Anterior Cruciate Ligament)"),
    (re.compile(r"sports medicine|sports injur|sports.{0,20}orthop", re.I), "Arthroscopic Surgery"),
    (re.compile(r"\bpcl\b|posterior cruciate", re.I), "PCL Reconstruction (Posterior Cruciate Ligament)"),
    (re.compile(r"\bacl\b|anterior cruciate", re.I), "ACL Reconstruction (Anterior Cruciate Ligament)"),
    (re.compile(r"meniscus|meniscal", re.I), "Meniscus Repair"),
    (re.compile(r"rotator cuff", re.I), "Rotator Cuff Repair"),
    (re.compile(r"arthroscop|keyhole", re.I), "Arthroscopic Surgery"),
    (re.compile(r"non[\s-]*union|malunion", re.I), "Non-Union Repair"),
    (re.compile(r"\borif\b|open reduction", re.I), "ORIF (Open Reduction and Internal Fixation)"),
    (re.compile(r"fracture fixation|internal fixation|\bfracture\b|polytrauma|\btrauma\b|nailing|plating", re.I), "Fracture Fixation"),
    (re.compile(r"carpal tunnel", re.I), "Carpal Tunnel Release"),
    (re.compile(r"hand reconstr|hand surgery|hand and wrist|wrist surgery", re.I), "Hand Reconstruction"),
    (re.compile(r"tendon repair|tendon transfer", re.I), "Tendon Repair"),
    (re.compile(r"ankle replacement|ankle arthroplast", re.I), "Ankle Replacement"),
    (re.compile(r"bunion|hallux valgus", re.I), "Bunion Surgery"),
    (re.compile(r"achilles", re.I), "Achilles Repair"),
]

FALLBACK = [
    "Total Knee Replacement",
    "ACL Reconstruction (Anterior Cruciate Ligament)",
    "Fracture Fixation",
]

FEMALE_FIRST = {
    "aakanksha",
    "anita",
    "anupama",
    "deepika",
    "ishani",
    "kalpana",
    "kiran",
    "madhu",
    "manisha",
    "meenakshi",
    "neha",
    "pooja",
    "prabha",
    "preeti",
    "priya",
    "rashmi",
    "ritu",
    "seema",
    "shilpa",
    "shweta",
    "sneha",
    "sonali",
    "sushma",
    "swati",
    "uma",
    "vandana",
}


def unescape(text: str) -> str:
    return htmlmod.unescape(re.sub(r"<[^>]+>", "", text)).replace("\xa0", " ").strip()


def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=40) as res:
        return res.read().decode("utf-8", "replace")


def map_procedures(texts: list[str]) -> list[str]:
    found: list[str] = []
    blob = " | ".join(t for t in texts if t)
    for test, name in ORTHOPEDICS_RULES:
        if test.search(blob) and name not in found:
            found.append(name)
    return found or list(FALLBACK)


def lis_after(html: str, heading: str) -> list[str]:
    pat = re.compile(
        rf"<h2[^>]*>\s*{re.escape(heading)}.*?</h2>(.*?)(?=<h2[\s>]|$)",
        re.I | re.S,
    )
    m = pat.search(html)
    if not m:
        return []
    items = re.findall(r"<li>(.*?)</li>", m.group(1), re.S)
    out = []
    seen: set[str] = set()
    for item in items:
        text = unescape(item)
        if text and text not in seen:
            seen.add(text)
            out.append(text)
    return out


def pronoun_from(text: str, name: str) -> str:
    t = text.lower()
    if re.search(r"\bshe\b|\bher\b|\bhers\b", t):
        return "she"
    if re.search(r"\bhe\b|\bhis\b|\bhim\b", t):
        return "he"
    tokens = re.findall(r"[a-z]+", name.lower())
    if any(tok in FEMALE_FIRST for tok in tokens):
        return "she"
    return "he"


def write_bio(d: dict) -> str:
    name = d["name"]
    title = d["designation"] or "Consultant, Orthopaedic Surgery"
    hospital = d["hospitalCaption"] or d["hospitalName"]
    city = d["city"]
    years = (d.get("experience") or "").replace("Experience", "experience")
    procs = d["proceduresExpertise"][:4]
    p1 = procs[0] if procs else FALLBACK[0]
    p2 = procs[1] if len(procs) > 1 else FALLBACK[1]
    p3 = procs[2] if len(procs) > 2 else FALLBACK[2]
    edu = d["education"][0] if d["education"] else ""
    pron = d["_pronoun"]
    obj = "her" if pron == "she" else "him"
    cap = "She" if pron == "she" else "He"
    years_bit = (
        f"{cap} has practised adult orthopaedics in India for {years.lower()}."
        if years
        else f"{cap} practises adult orthopaedics in India."
    )
    edu_bit = f" Training includes {edu}." if edu else ""
    featured_bit = (
        f" Velora lists {obj} among featured India orthopaedic surgeons for high-volume joint replacement and sports reconstruction."
        if d.get("featured")
        else ""
    )
    return (
        f"{name} is {title} at {hospital} in {city}, India. {years_bit}{featured_bit} "
        f"Adult joint, sports and trauma lists are tagged for later pSEO under country, city, specialty and procedure — "
        f"{p1}, {p2} and {p3} when films, alignment and activity already make the indication honest. "
        f"Primary versus revision arthroplasty, robotic versus conventional knee, ACL versus PCL, and fracture fixation versus non-union repair "
        f"are written after records review — not from a brochure implant count.{edu_bit} "
        f"International patients meet {obj} on camera first; travel to {city} is offered only if this orthopaedic floor is the right list."
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
        city_m = re.search(r'data-city="([^"]+)"', p)
        city = city_m.group(1) if city_m else "Delhi NCR"
        exp = unescape(re.search(r'class="doc-card__exp">([^<]+)', p).group(1)) if re.search(r'class="doc-card__exp">([^<]+)', p) else ""
        feat = 'data-ifeat="1"' in p[:800]
        listing_bio = unescape(re.search(r'class="doc-card__bio">(.*?)</div>', p, re.S).group(1)) if re.search(r'class="doc-card__bio">', p) else ""
        href = hosp_a.group(1) if hosp_a else ""
        hslug = href.rstrip("/").split("/")[-1] if href else ""
        caption = unescape(hosp_span.group(1)) if hosp_span else ""
        rows.append(
            {
                "slug": slug,
                "name": name,
                "featured": bool(feat),
                "specialty": SPECIALTY,
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
    research = lis_after(html, "Research & Publications") or lis_after(html, "Research &amp; Publications")
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


def main() -> None:
    html = LISTING.read_text(errors="replace") if LISTING.exists() else fetch(SOURCE)
    rows = parse_listing(html)
    print(f"listing {len(rows)} doctors", flush=True)

    def load(row: dict) -> dict:
        try:
            page = fetch(row["_profileUrl"])
            extra = parse_profile(page)
        except Exception as exc:
            print("fail", row["slug"], exc, flush=True)
            extra = {
                "specializations": [SPECIALTY],
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
            print(f"profiles {i}/{len(rows)}", flush=True)

    doctors = []
    listing_order = {row["slug"]: i for i, row in enumerate(rows)}
    for d in sorted(enriched, key=lambda x: listing_order.get(x["slug"], 10_000)):
        mapped = map_procedures(
            d.get("proceduresExpertise", [])
            + d.get("specializations", [])
            + [d.get("designation", ""), d.get("_listingBio", "")]
        )
        ginger_procs = d.get("proceduresExpertise") or []
        d["proceduresExpertise"] = list(dict.fromkeys([*ginger_procs, *mapped]))
        d["_pronoun"] = pronoun_from(d.get("_listingBio", ""), d["name"])
        d["bio"] = write_bio({**d, "proceduresExpertise": mapped})
        d.pop("_listingBio", None)
        d.pop("_profileUrl", None)
        d.pop("_pronoun", None)
        if not d.get("specializations"):
            d["specializations"] = [SPECIALTY]
        doctors.append(d)

    OUT_DOCTORS.write_text(json.dumps(doctors, indent=2, ensure_ascii=False) + "\n")
    print("wrote", len(doctors), "doctors", sum(1 for d in doctors if d["featured"]), "featured", flush=True)

    catalog = json.loads(CATALOG.read_text())
    catalog["doctors"] = [d for d in catalog["doctors"] if d.get("specialty") != SPECIALTY]
    existing = {d["slug"] for d in catalog["doctors"]}
    clash = [d["slug"] for d in doctors if d["slug"] in existing]
    if clash:
        raise SystemExit(f"slug collisions: {clash[:12]}")
    known_h = {h["slug"] for h in catalog["hospitals"]}
    missing_h = sorted({d["hospitalSlug"] for d in doctors if d["hospitalSlug"] not in known_h})
    if missing_h:
        raise SystemExit(f"unknown hospitals: {missing_h}")
    catalog["doctors"].extend(doctors)
    sources = catalog.get("sources") or []
    if SOURCE not in sources:
        sources.append(SOURCE)
        catalog["sources"] = sources
    CATALOG.write_text(json.dumps(catalog, indent=2, ensure_ascii=False) + "\n")
    print("merged catalog", len(catalog["doctors"]), "doctors", len(catalog["hospitals"]), "hospitals", flush=True)


if __name__ == "__main__":
    main()
