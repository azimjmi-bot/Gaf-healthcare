"""Generate original patient-education diagrams for Surgical Gastroenterology cost guides."""

from pathlib import Path
from textwrap import wrap
from PIL import Image, ImageDraw, ImageFont

OUT = Path(__file__).parents[1] / "public/images/cost/surgical-gastroenterology"
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
OLIVE = "#6b7c3a"

DATA = {
    "liver-transplantation": {
        "title": "Liver transplantation",
        "family": "transplant",
        "labels": ["Native liver", "Hepatic vessels", "Bile duct", "Donor graft"],
        "steps": ["Remove the failing liver", "Implant the graft", "Restore bile flow"],
        "milestones": ["ICU graft checks", "Immunosuppression", "Infection watch", "Fit to travel"],
    },
    "living-donor-liver-transplantation": {
        "title": "Living-donor liver transplant",
        "family": "ldlt",
        "labels": ["Donor remnant", "Planned graft", "Recipient vessels", "Two theatre lists"],
        "steps": ["Map donor volume", "Perform donor hepatectomy", "Implant in the recipient"],
        "milestones": ["Donor remnant review", "Recipient ICU", "Drug levels", "Fit to travel"],
    },
    "deceased-donor-liver-transplantation": {
        "title": "Deceased-donor liver transplant",
        "family": "ddlt",
        "labels": ["Wait-list concept", "Whole graft", "Vascular joins", "Biliary join"],
        "steps": ["Accept a matched graft", "Explant the native liver", "Implant and monitor flow"],
        "milestones": ["Offer accepted", "ICU graft checks", "Drug levels", "Fit to travel"],
    },
    "pediatric-liver-transplantation": {
        "title": "Paediatric liver transplant",
        "family": "pediatric",
        "labels": ["Child-size liver", "Left-lateral graft", "Microvascular artery", "Roux bile join"],
        "steps": ["Size-match the graft", "Implant with fine vessels", "Start paediatric ICU care"],
        "milestones": ["Paediatric ICU", "Feeding progression", "Caregiver teaching", "Fit to travel"],
    },
    "liver-retransplantation": {
        "title": "Liver retransplantation",
        "family": "retransplant",
        "labels": ["Failed first graft", "Thrombosed vessel", "Second graft", "Hostile abdomen"],
        "steps": ["Explain first-graft failure", "Explant the failed graft", "Implant the second graft"],
        "milestones": ["Cause-of-failure review", "Reoperative ICU", "Infection watch", "Delayed travel"],
    },
    "whipple-procedure-pancreaticoduodenectomy": {
        "title": "Whipple procedure",
        "family": "whipple",
        "labels": ["Pancreatic head", "Duodenum", "Bile duct", "Reconstruction joins"],
        "steps": ["Resect the pancreatic head", "Divide bile duct and duodenum", "Reconstruct three joins"],
        "milestones": ["ICU drain amylase", "Gastric emptying", "Enzyme review", "Fit to travel"],
    },
    "distal-pancreatectomy": {
        "title": "Distal pancreatectomy",
        "family": "distal",
        "labels": ["Pancreatic body/tail", "Portal vein line", "Spleen", "Stump closure"],
        "steps": ["Mobilise body and tail", "Divide left of the portal vein", "Close and drain the stump"],
        "milestones": ["Stump-leak watch", "Spleen / vaccine plan", "Glucose review", "Fit to travel"],
    },
    "pancreatectomy": {
        "title": "Pancreatectomy",
        "family": "pancreatectomy",
        "labels": ["Head", "Neck", "Body and tail", "Named extent"],
        "steps": ["Name the extent", "Remove that pancreas", "Reconstruct or start enzymes"],
        "milestones": ["Extent confirmed", "Remnant or diabetes plan", "Nutrition review", "Fit to travel"],
    },
    "biliary-reconstruction": {
        "title": "Biliary reconstruction",
        "family": "biliary",
        "labels": ["Injured or strictured duct", "Porta hepatis", "Roux jejunal loop", "Hepaticojejunostomy"],
        "steps": ["Identify healthy duct", "Prepare a Roux loop", "Join duct to jejunum"],
        "milestones": ["Bile-drain watch", "Liver-test review", "Cholangitis watch", "Fit to travel"],
    },
    "gallbladder-cancer-surgery": {
        "title": "Gallbladder cancer surgery",
        "family": "gbcancer",
        "labels": ["Gallbladder", "Liver bed IVb/V", "Cystic duct", "Regional nodes"],
        "steps": ["Stage the fossa", "Resect gallbladder and liver bed", "Sample named nodes"],
        "milestones": ["Drain watch", "Pathology review", "Oncology discussion", "Fit to travel"],
    },
    "bile-duct-cancer-surgery": {
        "title": "Bile duct cancer surgery",
        "family": "bdcancer",
        "labels": ["Hilar or extrahepatic duct", "Cholangiocarcinoma", "Future remnant", "Roux reconstruction"],
        "steps": ["Map the Bismuth level", "Resect duct and needed liver", "Restore bile with a Roux join"],
        "milestones": ["Remnant function", "Bile-leak watch", "Pathology margins", "Fit to travel"],
    },
    "anti-reflux-surgery-nissen-fundoplication": {
        "title": "Nissen fundoplication",
        "family": "nissen",
        "labels": ["Lower oesophagus", "Gastric fundus", "Diaphragmatic hiatus", "360° wrap"],
        "steps": ["Confirm reflux physiology", "Repair the crura", "Construct the fundus wrap"],
        "milestones": ["Staged soft diet", "Swallow review", "Gas-bloat advice", "Fit to travel"],
    },
    "hiatal-hernia-surgery": {
        "title": "Hiatal hernia surgery",
        "family": "hiatal",
        "labels": ["Diaphragmatic hiatus", "Herniated stomach", "Mediastinum", "Crural repair"],
        "steps": ["Reduce the hernia", "Close the crura", "Add a wrap only if planned"],
        "milestones": ["Staged diet", "Swallow review", "Recurrence advice", "Fit to travel"],
    },
    "heller-myotomy-for-achalasia": {
        "title": "Heller myotomy",
        "family": "heller",
        "labels": ["Tight lower sphincter", "Myotomy line", "Gastric extension", "Partial wrap"],
        "steps": ["Confirm achalasia", "Divide circular muscle", "Add a partial wrap if planned"],
        "milestones": ["Leak check", "Staged diet", "Swallow review", "Fit to travel"],
    },
    "colorectal-cancer-surgery": {
        "title": "Colorectal cancer surgery",
        "family": "crc",
        "labels": ["Colon or rectum", "Tumour location", "Lymphovascular pedicle", "Join or stoma"],
        "steps": ["Map tumour height", "Resect bowel and nodes", "Join or form a stoma"],
        "milestones": ["Ileus watch", "Diet progression", "Stoma teaching", "Fit to travel"],
    },
    "colorectal-resection": {
        "title": "Colorectal resection",
        "family": "resection",
        "labels": ["Diseased segment", "Proximal bowel", "Distal bowel", "Anastomosis or Hartmann"],
        "steps": ["Name the indication", "Remove the segment", "Join or divert"],
        "milestones": ["Bowel function", "Wound review", "Stoma plan if used", "Fit to travel"],
    },
    "low-anterior-resection-lar": {
        "title": "Low anterior resection",
        "family": "lar",
        "labels": ["Mid/low rectum", "Sphincter preserved", "Stapled join", "Diverting ileostomy"],
        "steps": ["Dissect the TME plane", "Create a low anastomosis", "Divert if planned"],
        "milestones": ["Leak watch", "Stoma teaching", "Bowel-function talk", "Fit to travel"],
    },
    "abdominoperineal-resection-apr": {
        "title": "Abdominoperineal resection",
        "family": "apr",
        "labels": ["Very low rectum", "Anal sphincter", "Perineal wound", "Permanent colostomy"],
        "steps": ["Mobilise the rectum", "Remove anus and sphincter", "Mature an end colostomy"],
        "milestones": ["Perineal-wound care", "Permanent stoma teaching", "Sitting advice", "Fit to travel"],
    },
    "total-mesorectal-excision-tme": {
        "title": "Total mesorectal excision",
        "family": "tme",
        "labels": ["Mesorectal fascia", "Intact fat package", "Rectal tumour", "Pelvic nerves"],
        "steps": ["Enter the TME plane", "Keep the package intact", "Choose LAR or APR reconstruction"],
        "milestones": ["Specimen inspection", "Pathology completeness", "Pelvic-function review", "Fit to travel"],
    },
    "ostomy-stoma-surgery": {
        "title": "Ostomy / stoma surgery",
        "family": "stoma",
        "labels": ["Marked abdominal site", "Loop or end bowel", "Matured spout", "Appliance"],
        "steps": ["Mark the site", "Mature the chosen stoma", "Teach appliance care"],
        "milestones": ["Appliance fit", "Output review", "Skin-care teaching", "Fit to travel"],
    },
    "gastric-bypass-surgery": {
        "title": "Gastric bypass surgery",
        "family": "bypass",
        "labels": ["Gastric pouch", "Excluded stomach", "Roux or OAGB limb", "Staple line"],
        "steps": ["Create the pouch", "Join the named limb", "Start staged diet and vitamins"],
        "milestones": ["Leak watch", "Staged liquids", "Vitamin plan", "Fit to travel"],
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


def liver_shape(draw, cx, cy, fill=ROSE, outline=INK):
    draw.polygon(
        [(cx - 95, cy - 20), (cx - 20, cy - 80), (cx + 80, cy - 55), (cx + 95, cy + 25), (cx + 10, cy + 75), (cx - 80, cy + 50)],
        fill=fill,
        outline=outline,
        width=4,
    )


def pancreas_shape(draw, cx, cy):
    draw.ellipse((cx - 110, cy - 25, cx - 20, cy + 35), fill=ROSE, outline=INK, width=4)
    draw.polygon([(cx - 30, cy - 18), (cx + 100, cy - 8), (cx + 110, cy + 18), (cx - 25, cy + 28)], fill=ROSE, outline=INK, width=4)


def colon_shape(draw, cx, cy, tumour=False):
    draw.arc((cx - 120, cy - 90, cx + 40, cy + 80), 200, 20, fill=NAVY, width=16)
    draw.arc((cx - 40, cy - 40, cx + 110, cy + 90), 20, 200, fill=TEAL, width=14)
    if tumour:
        draw.ellipse((cx + 30, cy + 20, cx + 62, cy + 52), fill=CORAL)


def draw_family(draw, family, box):
    x0, y0, x1, y1 = box
    cx, cy = (x0 + x1) // 2, (y0 + y1) // 2
    if family == "transplant":
        liver_shape(draw, cx - 10, cy)
        draw.line([(cx - 10, cy - 10), (cx + 70, cy - 70)], fill=GOLD, width=5)
        draw.ellipse((cx + 55, cy - 95, cx + 95, cy - 55), outline=TEAL, width=4)
    elif family == "ldlt":
        liver_shape(draw, cx - 40, cy, fill=ROSE)
        draw.polygon([(cx + 20, cy - 40), (cx + 90, cy - 60), (cx + 100, cy + 10), (cx + 30, cy + 30)], fill=SKY, outline=NAVY, width=4)
        draw.line([(cx + 10, cy - 10), (cx + 55, cy - 20)], fill=GOLD, width=4)
    elif family == "ddlt":
        liver_shape(draw, cx, cy, fill=SKY)
        draw.rectangle((cx - 70, cy - 110, cx + 70, cy - 70), outline=GOLD, width=3)
        draw.text((cx - 52, cy - 104), "offer", font=font(16, True), fill=NAVY)
    elif family == "pediatric":
        liver_shape(draw, cx, cy + 20)
        draw.ellipse((cx - 35, cy - 100, cx + 35, cy - 30), outline=NAVY, width=4)
        draw.polygon([(cx - 15, cy - 20), (cx + 40, cy - 5), (cx + 20, cy + 25)], fill=GOLD, outline=INK)
    elif family == "retransplant":
        liver_shape(draw, cx - 30, cy, fill="#e8c4c0")
        draw.line([(cx - 60, cy - 20), (cx + 10, cy + 30)], fill=CORAL, width=6)
        liver_shape(draw, cx + 50, cy + 10, fill=SKY)
    elif family == "whipple":
        pancreas_shape(draw, cx - 10, cy - 10)
        draw.ellipse((cx - 40, cy + 20, cx + 30, cy + 80), outline=TEAL, width=4)
        draw.arc((cx + 20, cy - 70, cx + 90, cy + 10), 200, 20, fill=NAVY, width=8)
        draw.ellipse((cx + 40, cy + 30, cx + 70, cy + 60), outline=GOLD, width=4)
    elif family == "distal":
        pancreas_shape(draw, cx, cy)
        draw.line([(cx - 10, cy - 40), (cx - 10, cy + 40)], fill=GOLD, width=5)
        draw.ellipse((cx + 70, cy - 10, cx + 120, cy + 40), fill=SKY, outline=NAVY, width=4)
    elif family == "pancreatectomy":
        pancreas_shape(draw, cx, cy)
        for x in (-70, -10, 50):
            draw.line([(cx + x, cy - 40), (cx + x, cy + 40)], fill=TEAL if x else GOLD, width=3)
    elif family == "biliary":
        draw.polygon([(cx - 30, cy - 100), (cx + 10, cy - 100), (cx + 50, cy + 40), (cx - 10, cy + 40)], fill=ROSE, outline=INK)
        draw.arc((cx - 20, cy + 20, cx + 90, cy + 100), 200, 340, fill=NAVY, width=8)
        draw.ellipse((cx + 10, cy + 10, cx + 40, cy + 40), outline=GOLD, width=4)
    elif family == "gbcancer":
        liver_shape(draw, cx, cy - 10)
        draw.ellipse((cx + 20, cy + 10, cx + 70, cy + 55), fill=CORAL, outline=INK, width=3)
        draw.ellipse((cx + 30, cy + 60, cx + 48, cy + 78), outline=GOLD, width=3)
    elif family == "bdcancer":
        liver_shape(draw, cx - 20, cy)
        draw.line([(cx + 10, cy - 40), (cx + 30, cy + 50)], fill=GOLD, width=7)
        draw.ellipse((cx + 18, cy - 10, cx + 42, cy + 14), fill=CORAL)
    elif family == "nissen":
        draw.ellipse((cx - 80, cy - 10, cx + 70, cy + 90), fill=ROSE, outline=INK, width=5)
        draw.rectangle((cx - 16, cy - 120, cx + 16, cy + 10), fill=SKY, outline=NAVY, width=4)
        draw.arc((cx - 45, cy - 20, cx + 45, cy + 50), 200, 340, fill=TEAL, width=10)
    elif family == "hiatal":
        draw.arc((cx - 110, cy - 40, cx + 110, cy + 40), 200, 340, fill=NAVY, width=10)
        draw.ellipse((cx - 40, cy - 20, cx + 50, cy + 70), fill=ROSE, outline=INK, width=4)
        draw.polygon([(cx - 20, cy - 80), (cx + 20, cy - 80), (cx + 10, cy - 20)], fill=SKY, outline=TEAL)
    elif family == "heller":
        draw.rectangle((cx - 18, cy - 120, cx + 18, cy + 20), fill=ROSE, outline=INK, width=4)
        draw.line([(cx + 8, cy - 40), (cx + 8, cy + 30)], fill=CORAL, width=6)
        draw.ellipse((cx - 70, cy + 10, cx + 60, cy + 90), outline=NAVY, width=4)
        draw.arc((cx - 40, cy + 15, cx + 40, cy + 70), 200, 340, fill=GOLD, width=6)
    elif family == "crc":
        colon_shape(draw, cx, cy, tumour=True)
        draw.ellipse((cx - 10, cy - 10, cx + 20, cy + 20), outline=GOLD, width=3)
    elif family == "resection":
        colon_shape(draw, cx, cy)
        draw.line([(cx - 10, cy - 50), (cx - 10, cy + 60)], fill=CORAL, width=5)
        draw.line([(cx + 50, cy - 20), (cx + 50, cy + 70)], fill=CORAL, width=5)
    elif family == "lar":
        draw.ellipse((cx - 50, cy - 90, cx + 50, cy + 40), outline=NAVY, width=6)
        draw.ellipse((cx - 20, cy + 30, cx + 20, cy + 80), outline=TEAL, width=5)
        draw.ellipse((cx + 40, cy - 30, cx + 85, cy + 10), fill=SKY, outline=GOLD, width=3)
        draw.ellipse((cx - 15, cy - 20, cx + 15, cy + 10), fill=CORAL)
    elif family == "apr":
        draw.ellipse((cx - 45, cy - 90, cx + 45, cy + 20), outline=NAVY, width=6)
        draw.ellipse((cx - 28, cy + 10, cx + 28, cy + 70), fill=CORAL, outline=INK, width=4)
        draw.ellipse((cx + 50, cy - 20, cx + 95, cy + 20), fill=SKY, outline=GOLD, width=4)
    elif family == "tme":
        draw.ellipse((cx - 55, cy - 80, cx + 55, cy + 70), outline=NAVY, width=5)
        draw.ellipse((cx - 35, cy - 50, cx + 35, cy + 40), fill=ROSE, outline=TEAL, width=4)
        draw.ellipse((cx - 12, cy - 15, cx + 12, cy + 15), fill=CORAL)
    elif family == "stoma":
        draw.ellipse((cx - 80, cy - 70, cx + 80, cy + 80), fill=PALE, outline=INK, width=4)
        draw.ellipse((cx - 28, cy - 20, cx + 28, cy + 36), fill=CORAL, outline=NAVY, width=4)
        draw.rounded_rectangle((cx - 50, cy + 20, cx + 50, cy + 70), radius=12, outline=GOLD, width=4)
    elif family == "bypass":
        draw.ellipse((cx - 80, cy - 40, cx + 40, cy + 80), fill=ROSE, outline=INK, width=5)
        draw.ellipse((cx - 70, cy - 50, cx - 20, cy), fill=SKY, outline=NAVY, width=4)
        draw.arc((cx - 10, cy - 10, cx + 90, cy + 80), 200, 20, fill=TEAL, width=10)
        draw.line([(cx - 30, cy - 20), (cx + 20, cy + 20)], fill=GOLD, width=4)
    else:
        draw.ellipse((cx - 60, cy - 40, cx + 60, cy + 50), fill=ROSE, outline=INK, width=4)


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
    draw.text((55, 620), "The treating surgical gastroenterology team may change the plan after examination and consent.", font=font(18), fill=MUTED)
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
