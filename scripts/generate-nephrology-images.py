"""Generate original patient-education diagrams for Nephrology cost guides."""

from pathlib import Path
from textwrap import wrap
from PIL import Image, ImageDraw, ImageFont

OUT = Path(__file__).parents[1] / "public/images/cost/nephrology"
OUT.mkdir(parents=True, exist_ok=True)

INK = "#1b2a4a"
MUTED = "#5b6d86"
NAVY = "#1d4e89"
SKY = "#d9e7f6"
PALE = "#f4f7fb"
CORAL = "#c45c5c"
ROSE = "#f3d4d0"
WHITE = "#ffffff"
GOLD = "#d4a017"
TEAL = "#2a7f7a"

DATA = {
    "hemodialysis": {
        "title": "Hemodialysis",
        "family": "hd",
        "labels": ["Vascular access", "Blood to dialyzer", "Dialyzer membrane", "Cleaned blood return"],
        "steps": ["Confirm kidney function", "Check the access", "Run the HD session"],
        "milestones": ["Session monitoring", "Fluid and BP review", "Laboratories", "Ongoing HD plan"],
    },
    "peritoneal-dialysis": {
        "title": "Peritoneal dialysis",
        "family": "pd",
        "labels": ["PD catheter", "Peritoneal cavity", "Dialysis fluid", "Drain / ultrafiltrate"],
        "steps": ["Complete PD training", "Fill and dwell", "Drain and inspect the bag"],
        "milestones": ["Exit-site care", "Supply plan", "Peritonitis teaching", "Home follow-up"],
    },
    "continuous-renal-replacement-therapy-crrt": {
        "title": "CRRT",
        "family": "crrt",
        "labels": ["ICU circuit", "Replacement fluid", "Slow continuous filter", "Haemodynamic monitor"],
        "steps": ["Confirm ICU indication", "Start the continuous circuit", "Titrate fluid removal"],
        "milestones": ["Filter checks", "Electrolyte review", "Step-down plan", "Later HD if needed"],
    },
    "sustained-low-efficiency-dialysis-sled": {
        "title": "SLED",
        "family": "sled",
        "labels": ["Hybrid machine", "Longer slower hours", "ICU or HDU", "Step-down option"],
        "steps": ["Review blood pressure support", "Run extended SLED hours", "Recheck potassium"],
        "milestones": ["Haemodynamic watch", "Laboratory checks", "Modality review", "Step-down or CRRT"],
    },
    "dialysis-catheter-placement": {
        "title": "Dialysis catheter placement",
        "family": "cath",
        "labels": ["Central vein", "Temporary catheter", "Ultrasound window", "First HD use"],
        "steps": ["Map the vein", "Place the catheter", "Confirm it will flow"],
        "milestones": ["Site care", "Infection watch", "First HD", "Plan durable access"],
    },
    "av-fistula-creation": {
        "title": "AV fistula creation",
        "family": "avf",
        "labels": ["Artery", "Vein", "Anastomosis", "Maturing thrill"],
        "steps": ["Map the vessels", "Create the anastomosis", "Protect the arm while it matures"],
        "milestones": ["Thrill checks", "Wound review", "First-needle plan", "HD use later"],
    },
    "dialysis-access-management": {
        "title": "Dialysis access management",
        "family": "access",
        "labels": ["Stenosis or clot", "Fistulogram", "Balloon salvage", "Restored flow"],
        "steps": ["Examine the access", "Image the problem", "Angioplasty or thrombectomy"],
        "milestones": ["Flow check", "Next HD sitting", "Surveillance", "New access if needed"],
    },
    "percutaneous-renal-biopsy": {
        "title": "Percutaneous renal biopsy",
        "family": "biopsy",
        "labels": ["Native kidney", "Lower-pole target", "Needle path", "Tissue cores"],
        "steps": ["Check clotting and BP", "Sample under ultrasound", "Send tissue to pathology"],
        "milestones": ["Bleed watch", "Haematuria review", "Histology result", "Treatment plan"],
    },
    "kidney-transplant-graft-biopsy": {
        "title": "Graft biopsy",
        "family": "graftbx",
        "labels": ["Allograft in iliac fossa", "Ultrasound window", "Needle cores", "Banff / C4d work-up"],
        "steps": ["Review creatinine and DSA", "Biopsy the graft", "Score rejection if present"],
        "milestones": ["Bleed watch", "Immunosuppression review", "Rejection plan", "Clinic follow-up"],
    },
    "capd-catheter-insertion": {
        "title": "CAPD catheter insertion",
        "family": "capd",
        "labels": ["Abdominal wall tunnel", "Pelvic coil", "Exit site", "Flush check"],
        "steps": ["Plan the exit site", "Insert the catheter", "Confirm inflow and drain"],
        "milestones": ["Exit-site care", "Delayed first fill", "PD training", "Home start"],
    },
    "central-venous-catheter-permcath-insertion": {
        "title": "Permcath insertion",
        "family": "permcath",
        "labels": ["Tunnel and cuff", "Internal jugular entry", "Cavo-atrial tip", "Chest exit site"],
        "steps": ["Map the neck vein", "Tunnel the cuffed line", "Check tip position"],
        "milestones": ["Tunnel care", "First HD", "Infection watch", "Fistula timeline"],
    },
    "paired-kidney-exchange-swap-transplant": {
        "title": "Paired kidney exchange",
        "family": "paired",
        "labels": ["Incompatible pair A", "Incompatible pair B", "Crossed compatible grafts", "HLA match"],
        "steps": ["Confirm the immunology block", "Find a reciprocal match", "Coordinate both operations"],
        "milestones": ["Crossmatch lock", "Dual-recipient ICU", "Immunosuppression", "Dual follow-up"],
    },
    "kidney-transplant-evaluation-and-follow-up": {
        "title": "Transplant evaluation",
        "family": "eval",
        "labels": ["Recipient work-up", "Donor work-up", "HLA / crossmatch", "Graft clinic later"],
        "steps": ["Review kidney function", "Complete compatibility tests", "Plan listing or follow-up"],
        "milestones": ["Cardiac / infection screen", "HLA result", "Clinic plan", "Graft labs later"],
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


def rounded(draw, box, fill=WHITE, outline="#c5d4e4", radius=24, width=3):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def arrow(draw, start, end, color=NAVY, width=8):
    draw.line([start, end], fill=color, width=width)
    x, y = end
    draw.polygon([(x, y), (x - 18, y - 11), (x - 18, y + 11)], fill=color)


def header(draw, title, kicker):
    draw.text((58, 38), kicker.upper(), font=font(18, True), fill=TEAL)
    draw.text((58, 72), title, font=font(34, True), fill=INK)
    draw.text((58, 124), "Patient-education schematic · anatomy and plans vary", font=font(19), fill=MUTED)


def kidney(draw, cx, cy, fill=ROSE):
    draw.ellipse((cx - 38, cy - 62, cx + 38, cy + 62), fill=fill, outline=INK, width=4)
    draw.polygon([(cx + 30, cy - 10), (cx + 70, cy - 28), (cx + 70, cy + 8)], outline=TEAL, width=3)


def draw_family(draw, family, box):
    x0, y0, x1, y1 = box
    cx, cy = (x0 + x1) // 2, (y0 + y1) // 2
    if family == "hd":
        kidney(draw, cx - 70, cy)
        draw.rounded_rectangle((cx + 10, cy - 55, cx + 95, cy + 55), radius=12, fill=SKY, outline=NAVY, width=3)
        draw.line([(cx - 32, cy + 10), (cx + 10, cy + 10)], fill=GOLD, width=5)
        draw.line([(cx + 95, cy - 10), (cx + 130, cy - 10)], fill=TEAL, width=5)
    elif family == "pd":
        draw.ellipse((cx - 55, cy - 40, cx + 55, cy + 70), fill=ROSE, outline=INK, width=4)
        draw.line([(cx + 20, cy - 80), (cx + 10, cy + 20)], fill=GOLD, width=5)
        draw.ellipse((cx - 15, cy + 5, cx + 25, cy + 40), outline=TEAL, width=3)
    elif family == "crrt":
        draw.rounded_rectangle((cx - 90, cy - 50, cx + 90, cy + 50), radius=16, fill=SKY, outline=NAVY, width=3)
        draw.ellipse((cx - 20, cy - 20, cx + 20, cy + 20), fill=CORAL)
        draw.line([(cx - 80, cy), (cx - 20, cy)], fill=GOLD, width=5)
        draw.line([(cx + 20, cy), (cx + 80, cy)], fill=TEAL, width=5)
    elif family == "sled":
        draw.rounded_rectangle((cx - 80, cy - 40, cx + 80, cy + 40), radius=14, fill=PALE, outline=NAVY, width=3)
        draw.arc((cx - 50, cy - 25, cx + 50, cy + 25), 200, 20, fill=GOLD, width=6)
    elif family == "cath":
        draw.ellipse((cx - 40, cy - 70, cx + 40, cy - 5), outline=INK, width=4)
        draw.line([(cx + 10, cy - 80), (cx + 10, cy + 70)], fill=GOLD, width=5)
        draw.ellipse((cx + 2, cy + 55, cx + 18, cy + 72), fill=CORAL)
    elif family == "avf":
        draw.arc((cx - 80, cy - 10, cx + 10, cy + 70), 200, 20, fill=NAVY, width=8)
        draw.arc((cx - 10, cy - 30, cx + 80, cy + 50), 200, 20, fill=TEAL, width=8)
        draw.ellipse((cx - 8, cy + 8, cx + 18, cy + 32), outline=GOLD, width=4)
    elif family == "access":
        draw.arc((cx - 70, cy, cx + 40, cy + 70), 200, 20, fill=CORAL, width=8)
        draw.ellipse((cx + 20, cy + 10, cx + 55, cy + 40), outline=GOLD, width=4)
        draw.line([(cx + 55, cy + 25), (cx + 95, cy + 25)], fill=NAVY, width=5)
    elif family == "biopsy":
        kidney(draw, cx + 10, cy)
        draw.line([(cx - 70, cy - 80), (cx + 5, cy + 10)], fill=GOLD, width=5)
        draw.ellipse((cx - 5, cy + 5, cx + 18, cy + 28), fill=CORAL)
    elif family == "graftbx":
        draw.ellipse((cx - 30, cy + 10, cx + 45, cy + 80), fill=ROSE, outline=INK, width=4)
        draw.line([(cx - 60, cy - 70), (cx + 5, cy + 30)], fill=GOLD, width=5)
        draw.polygon([(cx - 80, cy + 40), (cx - 20, cy + 70), (cx - 70, cy + 85)], outline=NAVY, width=3)
    elif family == "capd":
        draw.ellipse((cx - 50, cy - 20, cx + 50, cy + 75), fill=ROSE, outline=INK, width=4)
        draw.line([(cx + 25, cy - 75), (cx + 15, cy + 25)], fill=GOLD, width=5)
        draw.ellipse((cx + 5, cy + 15, cx + 28, cy + 40), outline=TEAL, width=3)
    elif family == "permcath":
        draw.ellipse((cx - 35, cy - 75, cx + 35, cy - 15), outline=INK, width=4)
        draw.line([(cx + 40, cy - 40), (cx + 15, cy + 55)], fill=GOLD, width=5)
        draw.rounded_rectangle((cx + 30, cy - 55, cx + 70, cy - 25), radius=6, fill=SKY, outline=NAVY, width=2)
    elif family == "paired":
        kidney(draw, cx - 55, cy - 10)
        kidney(draw, cx + 55, cy - 10)
        draw.line([(cx - 20, cy + 10), (cx + 20, cy + 40)], fill=GOLD, width=4)
        draw.line([(cx + 20, cy + 10), (cx - 20, cy + 40)], fill=TEAL, width=4)
    elif family == "eval":
        kidney(draw, cx, cy - 15)
        draw.rounded_rectangle((cx - 90, cy + 40, cx - 10, cy + 85), radius=10, fill=SKY, outline=NAVY, width=2)
        draw.rounded_rectangle((cx + 10, cy + 40, cx + 90, cy + 85), radius=10, fill=PALE, outline=TEAL, width=2)
    else:
        kidney(draw, cx, cy)


def anatomy_image(slug, spec):
    image = Image.new("RGB", (1200, 675), PALE)
    draw = ImageDraw.Draw(image)
    header(draw, f"{spec['title']}: relevant anatomy", "Anatomy")
    rounded(draw, (55, 175, 625, 625), fill=WHITE)
    draw_family(draw, spec["family"], (95, 195, 585, 605))
    rounded(draw, (660, 175, 1145, 625), fill=SKY, outline="#a8c4de")
    draw.text((700, 215), "Structures to discuss", font=font(25, True), fill=INK)
    for i, label in enumerate(spec["labels"]):
        y = 285 + i * 73
        draw.ellipse((700, y, 720, y + 20), fill=CORAL if i % 2 else TEAL)
        draw.text((742, y - 5), label, font=font(22), fill=INK)
    draw.text((700, 582), "Not to scale · no outcome implied", font=font(17), fill=MUTED)
    image.save(OUT / f"{slug}-anatomy.webp", "WEBP", quality=82, method=6)


def procedure_image(slug, spec):
    image = Image.new("RGB", (1200, 675), WHITE)
    draw = ImageDraw.Draw(image)
    header(draw, f"{spec['title']}: treatment pathway", "Procedure")
    card_w = 326
    for i, step in enumerate(spec["steps"]):
        x = 55 + i * 380
        rounded(draw, (x, 195, x + card_w, 575), fill=PALE if i != 1 else SKY)
        draw.ellipse((x + 24, 218, x + 74, 268), fill=NAVY)
        draw.text((x + 41, 226), str(i + 1), font=font(22, True), fill=WHITE)
        for line_no, line in enumerate(wrap(step, width=23)):
            draw.text((x + 25, 292 + line_no * 30), line, font=font(21, True), fill=INK)
        draw_family(draw, spec["family"], (x + 40, 400, x + card_w - 20, 555))
        if i < 2:
            arrow(draw, (x + 335, 386), (x + 373, 386), width=6)
    draw.text((55, 620), "The treating nephrology team may change the plan after examination and consent.", font=font(18), fill=MUTED)
    image.save(OUT / f"{slug}-procedure.webp", "WEBP", quality=82, method=6)


def recovery_image(slug, spec):
    image = Image.new("RGB", (1200, 675), PALE)
    draw = ImageDraw.Draw(image)
    header(draw, f"{spec['title']}: ongoing care", "Recovery")
    draw.line([(125, 360), (1075, 360)], fill="#b7cce0", width=12)
    for i, item in enumerate(spec["milestones"]):
        x = 140 + i * 300
        draw.ellipse((x - 42, 318, x + 42, 402), fill=NAVY if i < 3 else CORAL, outline=WHITE, width=6)
        draw.text((x - 8, 335), str(i + 1), font=font(22, True), fill=WHITE)
        rounded(draw, (x - 118, 435, x + 118, 548), fill=WHITE)
        wrapped = wrap(item, width=16)
        top = 463 if len(wrapped) == 1 else 450
        for line_no, line in enumerate(wrapped):
            bbox = draw.textbbox((0, 0), line, font=font(20, True))
            draw.text((x - (bbox[2] - bbox[0]) / 2, top + line_no * 26), line, font=font(20, True), fill=INK)
    rounded(draw, (55, 580, 1145, 640), fill=SKY, outline="#a8c4de", radius=18)
    draw.text((82, 598), "Discharge ≠ fitness to fly · seek help for procedure-specific warning signs", font=font(20, True), fill=INK)
    image.save(OUT / f"{slug}-recovery.webp", "WEBP", quality=82, method=6)


for slug, spec in DATA.items():
    anatomy_image(slug, spec)
    procedure_image(slug, spec)
    recovery_image(slug, spec)

print(f"Generated {len(DATA) * 3} WebP diagrams in {OUT}")
