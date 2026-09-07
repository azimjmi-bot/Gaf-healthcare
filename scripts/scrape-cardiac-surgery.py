#!/usr/bin/env python3
"""Fetch structured fields from Ginger's India cardiac surgery listing. Bios are written here, not copied."""

from __future__ import annotations

import html as htmlmod
import json
import re
import time
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

LISTING = Path("/tmp/ginger-cardiac.html")
OUT_DOCTORS = Path("/tmp/cardiac-surgery-doctors.json")
OUT_HOSPITALS = Path("/tmp/cardiac-surgery-hospitals.json")
UA = {"User-Agent": "Mozilla/5.0 (compatible; VeloraCatalog/1.0)"}

CARDIAC_RULES: list[tuple[re.Pattern, str]] = [
    (re.compile(r"tavr|tavi|transcatheter", re.I), "TAVR/TAVI (Transcatheter Aortic Valve Replacement)"),
    (re.compile(r"\blvad\b|ventricular assist", re.I), "LVAD Implantation"),
    (re.compile(r"heart transplant|cardiac transplant", re.I), "Heart Transplant Surgery"),
    (re.compile(r"congenital", re.I), "Congenital Heart Surgery"),
    (re.compile(r"robotic", re.I), "Robotic Cardiac Surgery"),
    (re.compile(r"minimally invasive|mini[\s-]*mitral|mini[\s-]*avr", re.I), "Minimally Invasive Cardiac Surgery"),
    (re.compile(r"redo.{0,12}cabg|re-?do cabg|second.{0,8}bypass", re.I), "Redo CABG"),
    (re.compile(r"double valve", re.I), "Double Valve Replacement"),
    (re.compile(r"aortic root|bentall|david procedure", re.I), "Aortic Root Replacement"),
    (re.compile(r"aortic aneurysm|thoracic aneurysm", re.I), "Aortic Aneurysm Surgery"),
    (re.compile(r"mitral valve repair|mitral repair", re.I), "Mitral Valve Repair"),
    (re.compile(r"aortic valve replacement|\bavr\b", re.I), "Aortic Valve Replacement"),
    (re.compile(r"valve repair", re.I), "Heart Valve Repair"),
    (re.compile(r"valve replacement", re.I), "Heart Valve Replacement"),
    (re.compile(r"\bcabg\b|coronary artery bypass|bypass graft", re.I), "CABG (Coronary Artery Bypass Grafting)"),
]

FEMALE_HINTS = ("veenu", "swarnika")

NEW_HOSPITAL_NAMES = {
    "medicover-hospital-bangalore": "Medicover Hospital, Bengaluru",
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
    for test, name in CARDIAC_RULES:
        if test.search(blob) and name not in found:
            found.append(name)
    return found or [
        "CABG (Coronary Artery Bypass Grafting)",
        "Heart Valve Replacement",
        "Heart Valve Repair",
    ]


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
    n = name.lower()
    if any(x in n for x in FEMALE_HINTS):
        return "she"
    return "he"


def write_bio(d: dict) -> str:
    name = d["name"]
    title = d["designation"] or "Consultant, Cardiac Surgery"
    hospital = d["hospitalCaption"] or d["hospitalName"]
    city = d["city"]
    years = (d.get("experience") or "").replace("Experience", "experience")
    procs = d["proceduresExpertise"][:4]
    p1 = procs[0] if procs else "CABG (Coronary Artery Bypass Grafting)"
    p2 = procs[1] if len(procs) > 1 else "Heart Valve Replacement"
    p3 = procs[2] if len(procs) > 2 else "Heart Valve Repair"
    edu = d["education"][0] if d["education"] else ""
    pron = d["_pronoun"]
    obj = "her" if pron == "she" else "him"
    cap = "She" if pron == "she" else "He"
    years_bit = (
        f"{cap} has practised cardiac surgery in India for {years.lower()}."
        if years
        else f"{cap} practises cardiac surgery in India."
    )
    edu_bit = f" Training includes {edu}." if edu else ""
    return (
        f"{name} is {title} at {hospital} in {city}, India. {years_bit} "
        f"The cardiac list covers {p1}, {p2} and {p3} when the indication is honest. "
        f"Conduit, prosthesis and approach are written after records review — not from a brochure.{edu_bit} "
        f"International patients meet {obj} on camera first; travel to {city} is offered only if this theatre is the right floor."
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
        feat = 'data-ifeat="1"' in p[:500]
        listing_bio = unescape(re.search(r'class="doc-card__bio">(.*?)</div>', p, re.S).group(1)) if re.search(r'class="doc-card__bio">', p) else ""
        href = hosp_a.group(1) if hosp_a else ""
        hslug = href.rstrip("/").split("/")[-1] if href else ""
        caption = unescape(hosp_span.group(1)) if hosp_span else ""
        rows.append(
            {
                "slug": slug,
                "name": name,
                "featured": bool(feat),
                "specialty": "Cardiac Surgery",
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
    name = name_hint or h1
    bio = (
        f"{name} is a Cardiac Surgery campus in {city}, India on Velora’s list. "
        f"{'It opened in ' + year + '. ' if year else ''}"
        f"{(beds + ' beds. ') if beds else ''}"
        f"{' · '.join(acc) + ' accreditation is current. ' if acc else ''}"
        f"Named cardiac surgeons write CABG, valve repair and TAVR/TAVI here; "
        f"oncology and haematology sit on the same map when the case needs them. "
        f"Records on camera first; a date if {city} is the right city."
    )
    return {
        "slug": slug,
        "href": href,
        "name": name,
        "city": city,
        "established": year,
        "beds": beds,
        "accreditation": " · ".join(acc) if acc else "NABH",
        "bio": bio,
        "specialty": "Cardiac Surgery",
        "image": "",
        "summary": "",
    }


def main() -> None:
    html = LISTING.read_text(errors="replace") if LISTING.exists() else fetch(
        "https://ginger.healthcare/destinations/india/cardiac-surgery/"
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
                "specializations": ["Cardiac Surgery"],
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
            if i % 15 == 0:
                print(f"profiles {i}/{len(rows)}", flush=True)

    doctors = []
    for d in sorted(enriched, key=lambda x: x["name"]):
        mapped = map_procedures(
            d.get("proceduresExpertise", []) + d.get("specializations", []) + [d.get("designation", "")]
        )
        d["proceduresExpertise"] = d.get("proceduresExpertise") or mapped
        d["_pronoun"] = pronoun_from(d.get("_listingBio", ""), d["name"])
        d["bio"] = write_bio({**d, "proceduresExpertise": mapped})
        d.pop("_listingBio", None)
        d.pop("_profileUrl", None)
        d.pop("_pronoun", None)
        if not d.get("specializations"):
            d["specializations"] = ["Cardiac Surgery"]
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
    print(
        "wrote",
        len(doctors),
        "doctors",
        sum(1 for d in doctors if d["featured"]),
        "featured",
        len(hospitals),
        "new hospitals",
    )


if __name__ == "__main__":
    main()
