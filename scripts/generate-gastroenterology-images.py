"""Generate original patient-education diagrams for Gastroenterology cost guides."""

from pathlib import Path
from textwrap import wrap
from PIL import Image, ImageDraw, ImageFont

OUT = Path(__file__).parents[1] / "public/images/cost/gastroenterology"
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
    "upper-gi-endoscopy-gastroscopy": {
        "title": "Upper GI endoscopy",
        "family": "uppergi",
        "labels": ["Oesophagus", "Stomach", "Pylorus", "Duodenum"],
        "steps": ["Pass the endoscope", "Inspect the lining", "Biopsy if indicated"],
        "milestones": ["Sedation observation", "Diet restart", "Histology review", "Fit to travel"],
    },
    "colonoscopy": {
        "title": "Colonoscopy",
        "family": "colon",
        "labels": ["Ascending colon", "Transverse colon", "Sigmoid / rectum", "Mucosal polyp"],
        "steps": ["Complete bowel prep", "Advance the colonoscope", "Remove named polyps"],
        "milestones": ["Prep complete", "Sedation observation", "Bleeding watch", "Fit to travel"],
    },
    "ercp": {
        "title": "ERCP",
        "family": "ercp",
        "labels": ["Bile duct", "Pancreatic duct", "Duodenal papilla", "Gallbladder"],
        "steps": ["Reach the papilla", "Cannulate the duct", "Treat stone or stricture"],
        "milestones": ["Pancreatitis watch", "Liver-test review", "Stent plan", "Fit to travel"],
    },
    "endoscopic-ultrasound-eus": {
        "title": "Endoscopic ultrasound",
        "family": "eus",
        "labels": ["Gut wall layers", "Pancreas", "Bile-duct region", "Needle path"],
        "steps": ["Image the target", "Decide if sampling", "Obtain tissue if planned"],
        "milestones": ["Sedation observation", "Pancreatitis watch", "Pathology review", "Fit to travel"],
    },
    "capsule-endoscopy": {
        "title": "Capsule endoscopy",
        "family": "capsule",
        "labels": ["Stomach", "Small-bowel loops", "Capsule camera", "Recording belt"],
        "steps": ["Confirm no stricture", "Swallow the capsule", "Read the recording"],
        "milestones": ["Swallow", "Recording period", "Transit check", "Report review"],
    },
    "enteroscopy": {
        "title": "Enteroscopy",
        "family": "enteroscopy",
        "labels": ["Jejunum", "Ileum", "Balloon overtube", "Target lesion"],
        "steps": ["Choose the route", "Advance the enteroscope", "Treat the named target"],
        "milestones": ["Anaesthesia recovery", "Bleeding watch", "Reach review", "Fit to travel"],
    },
    "biliary-stenting": {
        "title": "Biliary stenting",
        "family": "stent",
        "labels": ["Blocked bile duct", "Liver", "Stent across stricture", "Duodenum"],
        "steps": ["Confirm the level of block", "Place the named stent", "Check drainage"],
        "milestones": ["Jaundice review", "Infection watch", "Exchange plan", "Fit to travel"],
    },
    "bile-duct-stone-removal": {
        "title": "Bile-duct stone removal",
        "family": "stone",
        "labels": ["Common bile duct", "Impacted stone", "Sphincterotomy site", "Extraction balloon"],
        "steps": ["Cannulate the duct", "Perform sphincterotomy", "Extract the stone"],
        "milestones": ["Pancreatitis watch", "Clearance imaging", "Gallbladder plan", "Fit to travel"],
    },
    "cholangioscopy": {
        "title": "Cholangioscopy",
        "family": "cholangio",
        "labels": ["Bile-duct lumen", "Difficult stone", "Cholangioscope", "Stricture face"],
        "steps": ["Obtain biliary access", "Advance the cholangioscope", "Fragment or biopsy"],
        "milestones": ["Infection watch", "Clearance review", "Histology if taken", "Fit to travel"],
    },
    "peroral-endoscopic-myotomy-poem": {
        "title": "POEM",
        "family": "poem",
        "labels": ["Oesophageal lumen", "Tight sphincter", "Submucosal tunnel", "Circular muscle"],
        "steps": ["Create the tunnel", "Cut planned muscle", "Close the entry"],
        "milestones": ["Leak check", "Staged diet", "Reflux review", "Fit to travel"],
    },
    "g-poem": {
        "title": "G-POEM",
        "family": "gpoem",
        "labels": ["Stomach body", "Pylorus", "Tunnel path", "Pyloric muscle"],
        "steps": ["Create a gastric tunnel", "Perform pyloromyotomy", "Close the entry"],
        "milestones": ["Diet advancement", "Hydration review", "Symptom review", "Fit to travel"],
    },
    "z-poem": {
        "title": "Z-POEM",
        "family": "zpoem",
        "labels": ["Hypopharynx", "Zenker pouch", "Cricopharyngeal bar", "Tunnel"],
        "steps": ["Map the pouch", "Tunnel to the bar", "Complete the myotomy"],
        "milestones": ["Swallow check", "Staged diet", "Aspiration review", "Fit to travel"],
    },
    "endoscopic-mucosal-resection-emr": {
        "title": "EMR",
        "family": "emr",
        "labels": ["Mucosa", "Submucosa", "Lifted lesion", "Snare path"],
        "steps": ["Lift the lesion", "Snare the mucosa", "Inspect the defect"],
        "milestones": ["Bleeding watch", "Pathology review", "Scar check plan", "Fit to travel"],
    },
    "endoscopic-submucosal-dissection-esd": {
        "title": "ESD",
        "family": "esd",
        "labels": ["Marked lesion", "Submucosal plane", "Dissection knife", "En-bloc specimen"],
        "steps": ["Mark and inject", "Incise the mucosa", "Dissect en bloc"],
        "milestones": ["Inpatient observation", "Diet restart", "Histology review", "Fit to travel"],
    },
    "ster-submucosal-tunneling-endoscopic-resection": {
        "title": "STER",
        "family": "ster",
        "labels": ["Submucosal tumour", "Muscularis", "Tunnel", "Extraction path"],
        "steps": ["Create the tunnel", "Dissect the tumour", "Close the entry"],
        "milestones": ["Leak watch", "Diet advancement", "Pathology review", "Fit to travel"],
    },
    "endoscopic-hemostasis": {
        "title": "Endoscopic hemostasis",
        "family": "hemostasis",
        "labels": ["Ulcer crater", "Visible vessel", "Clip or probe", "Stomach lumen"],
        "steps": ["Resuscitate first", "Locate the source", "Apply named therapy"],
        "milestones": ["Rebleeding watch", "Haemoglobin trend", "Diet restart", "Fit to travel"],
    },
    "variceal-band-ligation": {
        "title": "Variceal band ligation",
        "family": "varices",
        "labels": ["Oesophageal varices", "Portal flow concept", "Banding cap", "Banded column"],
        "steps": ["Confirm the varices", "Apply bands", "Plan further sessions"],
        "milestones": ["Bleed watch", "Session planning", "Hepatology review", "Fit to travel"],
    },
    "foreign-body-removal": {
        "title": "Foreign body removal",
        "family": "foreign",
        "labels": ["Oesophagus", "Lodged object", "Airway", "Retrieval device"],
        "steps": ["Protect the airway", "Grasp the object", "Inspect the lining"],
        "milestones": ["Airway observation", "Perforation watch", "Stricture plan", "Fit to travel"],
    },
    "liver-biopsy": {
        "title": "Liver biopsy",
        "family": "liver",
        "labels": ["Liver", "Ribs", "Ultrasound window", "Core-needle path"],
        "steps": ["Check clotting", "Mark the path", "Obtain the core"],
        "milestones": ["Bleeding observation", "Pain review", "Pathology stains", "Fit to travel"],
    },
    "transjugular-liver-biopsy": {
        "title": "Transjugular liver biopsy",
        "family": "tjlb",
        "labels": ["Internal jugular vein", "Hepatic vein", "Liver parenchyma", "Pressure-study site"],
        "steps": ["Access the jugular vein", "Reach a hepatic vein", "Sample from within"],
        "milestones": ["Neck-site care", "Pressure review", "Histology", "Fit to travel"],
    },
    "ptbd-percutaneous-transhepatic-biliary-drainage": {
        "title": "PTBD",
        "family": "ptbd",
        "labels": ["Blocked intrahepatic duct", "Liver parenchyma", "Percutaneous drain", "External bag"],
        "steps": ["Map the block", "Access a duct", "Secure the drain"],
        "milestones": ["Drain-bag care", "Infection watch", "Internalization plan", "Fit to travel"],
    },
    "esophageal-manometry": {
        "title": "Esophageal manometry",
        "family": "esoman",
        "labels": ["Nasal passage", "Oesophageal body", "Lower sphincter", "Pressure sensors"],
        "steps": ["Place the catheter", "Record swallows", "Classify the pattern"],
        "milestones": ["Study complete", "Named report", "Treatment discussion", "Travel unrestricted"],
    },
    "anorectal-manometry": {
        "title": "Anorectal manometry",
        "family": "anorectal",
        "labels": ["Rectum", "Anal sphincter", "Rest pressure", "Squeeze / push"],
        "steps": ["Place the catheter", "Record manoeuvres", "Interpret sensation"],
        "milestones": ["Study complete", "Named report", "Biofeedback plan", "Travel unrestricted"],
    },
    "bariatric-metabolic-endoscopy": {
        "title": "Metabolic endoscopy",
        "family": "metabolic",
        "labels": ["Stomach volume", "Suture or balloon concept", "Gastric lumen", "Follow-up diet"],
        "steps": ["Name the method", "Perform the endoscopy", "Start staged diet"],
        "milestones": ["Hydration watch", "Diet progression", "Programme review", "Fit to travel"],
    },
}


def font(size: int, bold: bool = False):
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


def draw_family(draw, family, box):
    x0, y0, x1, y1 = box
    cx, cy = (x0 + x1) // 2, (y0 + y1) // 2
    if family == "uppergi":
        draw.ellipse((cx - 70, cy - 40, cx + 90, cy + 90), fill=ROSE, outline=INK, width=5)
        draw.rectangle((cx - 12, cy - 140, cx + 12, cy - 30), fill=SKY, outline=NAVY, width=3)
        draw.ellipse((cx + 50, cy + 40, cx + 110, cy + 90), outline=GOLD, width=4)
    elif family == "colon":
        draw.arc((cx - 110, cy - 90, cx + 110, cy + 110), 200, 20, fill=NAVY, width=16)
        draw.arc((cx - 70, cy - 50, cx + 70, cy + 70), 20, 200, fill=TEAL, width=12)
        draw.ellipse((cx + 20, cy + 10, cx + 50, cy + 40), fill=CORAL)
    elif family == "ercp":
        draw.ellipse((cx - 100, cy - 80, cx - 20, cy + 20), fill=ROSE, outline=INK, width=4)
        draw.line([(cx - 20, cy - 20), (cx + 40, cy + 40), (cx + 90, cy + 10)], fill=NAVY, width=6)
        draw.line([(cx + 40, cy + 40), (cx + 70, cy + 90)], fill=GOLD, width=5)
        draw.ellipse((cx + 70, cy + 70, cx + 110, cy + 110), outline=TEAL, width=4)
    elif family == "eus":
        draw.ellipse((cx - 90, cy - 30, cx + 40, cy + 90), fill=ROSE, outline=INK, width=4)
        draw.polygon([(cx - 20, cy - 120), (cx + 10, cy - 20), (cx - 40, cy - 20)], fill=SKY, outline=NAVY)
        draw.line([(cx + 10, cy - 10), (cx + 80, cy + 40)], fill=GOLD, width=5)
    elif family == "capsule":
        draw.ellipse((cx - 30, cy - 20, cx + 30, cy + 20), fill=GOLD, outline=INK, width=3)
        for i in range(4):
            draw.arc((cx - 80 + i * 10, cy - 70 + i * 15, cx + 80 - i * 10, cy + 90 - i * 10), 200, 340, fill=NAVY, width=3)
    elif family == "enteroscopy":
        draw.arc((cx - 100, cy - 80, cx + 80, cy + 100), 160, 20, fill=NAVY, width=10)
        draw.ellipse((cx - 10, cy + 20, cx + 40, cy + 60), outline=GOLD, width=5)
    elif family == "stent":
        draw.polygon([(cx - 80, cy - 100), (cx - 20, cy - 100), (cx + 40, cy + 90), (cx - 20, cy + 90)], fill=ROSE, outline=INK)
        draw.rectangle((cx - 15, cy - 40, cx + 15, cy + 60), outline=GOLD, width=5)
    elif family == "stone":
        draw.ellipse((cx - 30, cy - 20, cx + 20, cy + 30), fill=GOLD, outline=INK, width=3)
        draw.arc((cx - 90, cy - 70, cx + 80, cy + 90), 210, 30, fill=NAVY, width=10)
    elif family == "cholangio":
        draw.rectangle((cx - 12, cy - 120, cx + 12, cy + 40), fill=SKY, outline=NAVY, width=3)
        draw.ellipse((cx - 40, cy + 20, cx + 50, cy + 90), outline=TEAL, width=5)
        draw.ellipse((cx - 10, cy + 40, cx + 20, cy + 70), fill=GOLD)
    elif family == "poem":
        draw.rectangle((cx - 25, cy - 130, cx + 25, cy + 80), fill=ROSE, outline=INK, width=4)
        draw.line([(cx - 8, cy - 40), (cx - 8, cy + 50)], fill=CORAL, width=6)
        draw.arc((cx - 50, cy + 50, cx + 50, cy + 120), 200, 340, fill=NAVY, width=6)
    elif family == "gpoem":
        draw.ellipse((cx - 90, cy - 70, cx + 80, cy + 80), fill=ROSE, outline=INK, width=5)
        draw.ellipse((cx + 20, cy + 10, cx + 70, cy + 55), outline=GOLD, width=5)
        draw.line([(cx + 45, cy + 15), (cx + 45, cy + 50)], fill=CORAL, width=5)
    elif family == "zpoem":
        draw.ellipse((cx - 40, cy - 130, cx + 40, cy - 40), fill=ROSE, outline=INK, width=4)
        draw.ellipse((cx - 10, cy - 20, cx + 70, cy + 40), fill=SKY, outline=NAVY, width=4)
        draw.line([(cx - 5, cy - 10), (cx + 25, cy + 20)], fill=GOLD, width=6)
    elif family == "emr":
        draw.arc((cx - 100, cy - 20, cx + 100, cy + 100), 200, 340, fill=NAVY, width=8)
        draw.ellipse((cx - 35, cy - 10, cx + 35, cy + 40), fill=ROSE, outline=CORAL, width=4)
        draw.ellipse((cx - 50, cy - 30, cx + 50, cy + 20), outline=GOLD, width=3)
    elif family == "esd":
        draw.polygon([(cx - 80, cy + 40), (cx + 80, cy + 40), (cx + 60, cy - 40), (cx - 60, cy - 40)], fill=ROSE, outline=INK)
        draw.line([(cx - 50, cy - 20), (cx + 50, cy - 20)], fill=GOLD, width=4)
        draw.line([(cx - 40, cy), (cx + 40, cy)], fill=CORAL, width=3)
    elif family == "ster":
        draw.ellipse((cx - 40, cy - 20, cx + 40, cy + 50), fill=CORAL, outline=INK, width=4)
        draw.arc((cx - 90, cy - 80, cx + 90, cy + 90), 200, 20, fill=NAVY, width=8)
    elif family == "hemostasis":
        draw.ellipse((cx - 80, cy - 50, cx + 80, cy + 70), fill=ROSE, outline=INK, width=5)
        draw.ellipse((cx - 25, cy - 10, cx + 25, cy + 30), fill=CORAL)
        draw.line([(cx + 10, cy - 40), (cx + 10, cy - 5)], fill=GOLD, width=5)
    elif family == "varices":
        draw.rectangle((cx - 20, cy - 130, cx + 20, cy + 80), fill=ROSE, outline=INK, width=4)
        for y in (-80, -40, 0, 40):
            draw.ellipse((cx + 10, cy + y, cx + 40, cy + y + 22), outline=NAVY, width=3)
        draw.ellipse((cx + 16, cy - 34, cx + 34, cy - 16), fill=GOLD)
    elif family == "foreign":
        draw.rectangle((cx - 18, cy - 130, cx + 18, cy + 40), fill=SKY, outline=NAVY, width=4)
        draw.rounded_rectangle((cx - 28, cy - 20, cx + 28, cy + 20), radius=8, fill=GOLD, outline=INK, width=3)
    elif family == "liver":
        draw.polygon([(cx - 90, cy - 40), (cx + 70, cy - 70), (cx + 90, cy + 40), (cx - 70, cy + 70)], fill=ROSE, outline=INK)
        draw.line([(cx + 40, cy - 90), (cx + 10, cy + 10)], fill=GOLD, width=5)
    elif family == "tjlb":
        draw.ellipse((cx - 30, cy - 140, cx + 30, cy - 80), outline=NAVY, width=4)
        draw.line([(cx, cy - 80), (cx, cy + 10), (cx + 50, cy + 40)], fill=TEAL, width=6)
        draw.polygon([(cx + 20, cy + 20), (cx + 90, cy), (cx + 80, cy + 70)], fill=ROSE, outline=INK)
    elif family == "ptbd":
        draw.polygon([(cx - 80, cy - 50), (cx + 50, cy - 80), (cx + 70, cy + 30), (cx - 60, cy + 60)], fill=ROSE, outline=INK)
        draw.line([(cx + 60, cy - 100), (cx + 10, cy + 10)], fill=GOLD, width=6)
        draw.ellipse((cx + 50, cy + 40, cx + 100, cy + 90), outline=NAVY, width=3)
    elif family == "esoman":
        draw.rectangle((cx - 16, cy - 120, cx + 16, cy + 70), fill=SKY, outline=NAVY, width=3)
        for y in (-80, -30, 20):
            draw.ellipse((cx - 6, cy + y, cx + 6, cy + y + 12), fill=GOLD)
    elif family == "anorectal":
        draw.ellipse((cx - 70, cy - 80, cx + 70, cy + 80), fill=ROSE, outline=INK, width=5)
        draw.ellipse((cx - 25, cy - 10, cx + 25, cy + 50), outline=NAVY, width=5)
        draw.line([(cx, cy - 40), (cx, cy + 40)], fill=GOLD, width=4)
    elif family == "metabolic":
        draw.ellipse((cx - 90, cy - 60, cx + 80, cy + 80), fill=ROSE, outline=INK, width=5)
        draw.arc((cx - 50, cy - 20, cx + 40, cy + 50), 200, 340, fill=TEAL, width=8)
        draw.ellipse((cx - 15, cy, cx + 15, cy + 30), outline=GOLD, width=4)


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
    header(draw, f"{spec['title']}: procedure concept", "Procedure")
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
    draw.text((55, 620), "The treating gastroenterology team may change the plan after examination and consent.", font=font(18), fill=MUTED)
    image.save(OUT / f"{slug}-procedure.webp", "WEBP", quality=82, method=6)


def recovery_image(slug, spec):
    image = Image.new("RGB", (1200, 675), PALE)
    draw = ImageDraw.Draw(image)
    header(draw, f"{spec['title']}: recovery pathway", "Recovery")
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
