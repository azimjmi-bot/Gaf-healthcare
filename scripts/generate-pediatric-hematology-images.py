"""Generate original 1200×675 WebP diagrams for Pediatric Hematology exclusive guides.

Existing ``-illustration.webp`` files stay in place. This script adds the two
additional figures declared in ``src/data/cost-articles/pediatric-hematology.ts``:

* ``-pathway``  graft/donor decision and paediatric-unit sequence
* ``-recovery`` parent stay, count recovery and fitness to fly
"""

from pathlib import Path
from textwrap import wrap

from PIL import Image, ImageDraw, ImageFont

OUT = Path(__file__).parents[1] / "public/images/cost/pediatric-hematology"
OUT.mkdir(parents=True, exist_ok=True)

INK = "#1b2a4a"
MUTED = "#5b6d86"
NAVY = "#1d4e89"
TEAL = "#2a7f7a"
SKY = "#d9e7f6"
PALE = "#f4f7fb"
CORAL = "#c45c5c"
ROSE = "#f3d4d0"
WHITE = "#ffffff"
GOLD = "#d4a017"
LINE = "#c5d4e4"

DATA = {
    "pediatric-bone-marrow-transplantation": {
        "title": "Pediatric BMT",
        "steps": [
            "Paediatric record and growth review",
            "Weight-based conditioning on a children’s unit",
            "Graft infusion with a parent nearby",
        ],
        "milestones": [
            "Isolation and line care",
            "Count recovery watch",
            "Vaccines and school plan",
            "Fitness to fly",
        ],
        "labels": ["Children’s isolation ward", "Parent rooming-in", "Paediatric ICU backup", "Weight-based pharmacy"],
    },
    "matched-sibling-donor-transplant": {
        "title": "Matched sibling donor",
        "steps": [
            "Confirmatory HLA identity for both children",
            "Independent assessment of the donor child",
            "Sibling harvest then recipient isolation",
        ],
        "milestones": [
            "Donor-child recovery",
            "Recipient isolation",
            "GVHD and infection watch",
            "Two fitness-to-fly reviews",
        ],
        "labels": ["HLA-identical sibling", "Donor advocate", "Marrow harvest", "Recipient isolation"],
    },
    "hematopoietic-stem-cell-transplantation": {
        "title": "Paediatric HSCT",
        "steps": [
            "Name the graft source and cell dose per kg",
            "Collect, release or thaw the product",
            "Infuse on a paediatric transplant unit",
        ],
        "milestones": [
            "Product handling",
            "Engraftment tempo",
            "Infection precautions",
            "Fitness to fly",
        ],
        "labels": ["Marrow graft", "Peripheral-blood cells", "Cord-blood unit", "Cell dose / kg"],
    },
}


def font(size, bold=False):
    candidates = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/liberation2/LiberationSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/liberation2/LiberationSans-Regular.ttf",
    ]
    for candidate in candidates:
        if Path(candidate).exists():
            return ImageFont.truetype(candidate, size)
    return ImageFont.load_default()


def rounded(draw, box, fill=WHITE, outline=LINE, radius=24, width=3):
    x0, y0, x1, y1 = box
    draw.rounded_rectangle((min(x0, x1), min(y0, y1), max(x0, x1), max(y0, y1)), radius=radius, fill=fill, outline=outline, width=width)


def header(draw, title, kicker):
    draw.text((58, 38), kicker.upper(), font=font(18, True), fill=TEAL)
    size = 34
    while size > 21:
        candidate = font(size, True)
        bounds = draw.textbbox((0, 0), title, font=candidate)
        if bounds[2] - bounds[0] <= 1084:
            break
        size -= 1
    draw.text((58, 72), title, font=font(size, True), fill=INK)
    draw.text((58, 124), "Patient-education schematic · plans vary by child", font=font(19), fill=MUTED)


def pathway_image(slug, spec):
    image = Image.new("RGB", (1200, 675), WHITE)
    draw = ImageDraw.Draw(image)
    header(draw, f"{spec['title']}: paediatric pathway", "Pathway")
    card_w = 326
    for i, step in enumerate(spec["steps"]):
        x = 55 + i * 380
        rounded(draw, (x, 185, x + card_w, 430), fill=PALE if i != 1 else SKY)
        draw.ellipse((x + 24, 208, x + 74, 258), fill=NAVY)
        draw.text((x + 41, 216), str(i + 1), font=font(22, True), fill=WHITE)
        for line_no, line in enumerate(wrap(step, width=24, break_long_words=False)):
            draw.text((x + 24, 278 + line_no * 28), line, font=font(20, True), fill=INK)
        if i < 2:
            draw.polygon([(x + 338, 300), (x + 368, 318), (x + 338, 336)], fill=TEAL)
    rounded(draw, (55, 460, 1145, 630), fill=SKY, outline="#a8c4de")
    draw.text((82, 488), "Discuss with the paediatric team", font=font(22, True), fill=INK)
    for i, label in enumerate(spec["labels"]):
        col, row = i % 2, i // 2
        x, y = 82 + col * 530, 538 + row * 40
        draw.ellipse((x, y + 6, x + 16, y + 22), fill=CORAL if i % 2 else TEAL)
        draw.text((x + 28, y), label, font=font(20), fill=INK)
    image.save(OUT / f"{slug}-pathway.webp", "WEBP", quality=82, method=6)


def recovery_image(slug, spec):
    image = Image.new("RGB", (1200, 675), PALE)
    draw = ImageDraw.Draw(image)
    header(draw, f"{spec['title']}: recovery and travel", "Recovery")
    draw.line([(125, 340), (1075, 340)], fill="#b7cce0", width=12)
    for i, item in enumerate(spec["milestones"]):
        x = 140 + i * 260
        draw.ellipse((x - 42, 298, x + 42, 382), fill=NAVY if i < 3 else CORAL, outline=WHITE, width=6)
        draw.text((x - 8, 315), str(i + 1), font=font(22, True), fill=WHITE)
        rounded(draw, (x - 118, 415, x + 118, 548), fill=WHITE)
        wrapped = wrap(item, width=16, break_long_words=False)
        top = 448 if len(wrapped) == 1 else 432
        for line_no, line in enumerate(wrapped):
            bbox = draw.textbbox((0, 0), line, font=font(20, True))
            draw.text((x - (bbox[2] - bbox[0]) / 2, top + line_no * 26), line, font=font(20, True), fill=INK)
    rounded(draw, (55, 580, 1145, 640), fill=SKY, outline="#a8c4de", radius=18)
    draw.text((82, 598), "Discharge ≠ fitness to fly · fever during isolation is an emergency", font=font(20, True), fill=INK)
    image.save(OUT / f"{slug}-recovery.webp", "WEBP", quality=82, method=6)


for slug, spec in DATA.items():
    pathway_image(slug, spec)
    recovery_image(slug, spec)

print(f"Generated {len(DATA) * 2} WebP diagrams in {OUT}")
