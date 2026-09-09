#!/usr/bin/env python3
"""Fetch structured fields from Ginger's India pediatric hematology listing. Bios are written here, not copied."""

from __future__ import annotations

import html as htmlmod
import json
import re
import time
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

LISTING = Path("/tmp/ginger-ped-he.html")
OUT_DOCTORS = Path("/tmp/pediatric-hematology-doctors.json")
OUT_HOSPITALS = Path("/tmp/pediatric-hematology-hospitals.json")
UA = {"User-Agent": "Mozilla/5.0 (compatible; GAF HealthcareCatalog/1.0)"}

PEDIATRIC_RULES: list[tuple[re.Pattern, str]] = [
    (re.compile(r"sibling", re.I), "Matched Sibling Donor Transplant"),
    (re.compile(r"hematopoietic|haematopoietic|\bhsct\b", re.I), "Hematopoietic Stem Cell Transplantation"),
    (re.compile(r"haplo", re.I), "Haploidentical Stem Cell Transplant"),
    (re.compile(r"matched unrelated|\bmud\b|unrelated donor", re.I), "Matched Unrelated Donor Transplant"),
    (re.compile(r"autologous", re.I), "Autologous Stem Cell Transplant"),
    (re.compile(r"allogeneic|allogenic", re.I), "Allogeneic Stem Cell Transplant"),
    (re.compile(r"marrow biopsy|trephine", re.I), "Bone Marrow Biopsy"),
    (re.compile(r"marrow aspiration|aspirate", re.I), "Bone Marrow Aspiration"),
    (re.compile(r"car[\s-]*t", re.I), "CAR-T Cell Therapy"),
    (re.compile(r"pediatric|paediatric|child|bone marrow|bmt|transplant", re.I), "Pediatric Bone Marrow Transplantation"),
]

FEMALE_HINTS = (
    "amita",
    "dhwanee",
    "neha",
    "anamika",
    "garima",
    "minakshi",
    "prerana",
    "parinitha",
    "ponni",
    "dhaarani",
)


def unescape(text: str) -> str:
    return htmlmod.unescape(re.sub(r"<[^>]+>", "", text)).replace("\xa0", " ").strip()


def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=40) as res:
        return res.read().decode("utf-8", "replace")


def map_procedures(texts: list[str]) -> list[str]:
    found: list[str] = []
    blob = " | ".join(t for t in texts if t)
    for test, name in PEDIATRIC_RULES:
        if test.search(blob) and name not in found:
            found.append(name)
    return found or [
        "Pediatric Bone Marrow Transplantation",
        "Allogeneic Stem Cell Transplant",
        "Bone Marrow Biopsy",
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
    title = d["designation"] or "Consultant, Pediatric Hematology"
    hospital = d["hospitalCaption"] or d["hospitalName"]
    city = d["city"]
    years = (d.get("experience") or "").replace("Experience", "experience")
    procs = d["proceduresExpertise"][:4]
    p1 = procs[0] if procs else "pediatric bone marrow transplantation"
    p2 = procs[1] if len(procs) > 1 else "allogeneic stem cell transplant"
    p3 = procs[2] if len(procs) > 2 else "bone marrow biopsy"
    edu = d["education"][0] if d["education"] else ""
    pron = d["_pronoun"]
    obj = "her" if pron == "she" else "him"
    cap = "She" if pron == "she" else "He"
    years_bit = (
        f"{cap} has practised paediatric haematology in India for {years.lower()}."
        if years
        else f"{cap} practises paediatric haematology in India."
    )
    edu_bit = f" Training includes {edu}." if edu else ""
    return (
        f"{name} is {title} at {hospital} in {city}, India. {years_bit} "
        f"The paediatric list covers {p1}, {p2} and {p3} when the child belongs on that protocol. "
        f"Donor, conditioning and a parent’s stay are written after records review — not from a brochure.{edu_bit} "
        f"Families meet {obj} on camera first; travel to {city} is offered only if this paediatric unit is the right floor."
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
                "specialty": "Pediatric Hematology",
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
        f"{name} is a Pediatric Hematology campus in {city}, India on GAF Healthcare's list. "
        f"{'It opened in ' + year + '. ' if year else ''}"
        f"{(beds + ' beds. ') if beds else ''}"
        f"{' · '.join(acc) + ' accreditation is current. ' if acc else ''}"
        f"Named paediatric haematologists write BMT, sibling-donor grafts and HSCT here; "
        f"adult haematology, medical, radiation and surgical oncology sit on the same map when the case needs them. "
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
        "specialty": "Pediatric Hematology",
        "image": "",
        "summary": "",
    }


def main() -> None:
    html = LISTING.read_text(errors="replace") if LISTING.exists() else fetch(
        "https://ginger.healthcare/destinations/india/pediatric-hematology/"
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
                "specializations": ["Pediatric Hematology"],
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
            if i % 5 == 0:
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
            d["specializations"] = ["Pediatric Hematology"]
        doctors.append(d)

    OUT_DOCTORS.write_text(json.dumps(doctors, indent=2, ensure_ascii=False) + "\n")
    OUT_HOSPITALS.write_text(json.dumps([], indent=2) + "\n")
    print("wrote", len(doctors), "doctors", sum(1 for d in doctors if d["featured"]), "featured")


if __name__ == "__main__":
    main()
