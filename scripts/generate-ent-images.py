"""Generate original patient-education diagrams for ENT cost guides."""

from pathlib import Path
from textwrap import wrap
from PIL import Image, ImageDraw, ImageFont

OUT = Path(__file__).parents[1] / "public/images/cost/ent"
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

DATA = {
    "septoplasty": {
        "title": "Septoplasty",
        "family": "septum",
        "labels": ["Nasal septum", "Deviated segment", "Left nasal airway", "Right nasal airway"],
        "steps": ["Examine the septum", "Reposition selected cartilage", "Support the lining"],
        "milestones": ["Packing / splint care", "Saline rinses", "Bleeding review", "Fit to travel"],
    },
    "fess-functional-endoscopic-sinus-surgery": {
        "title": "Endoscopic sinus surgery",
        "family": "sinus",
        "labels": ["Maxillary sinus", "Ethmoid cells", "Frontal sinus", "Sphenoid sinus"],
        "steps": ["Map disease on CT", "Open planned ostia", "Preserve healthy mucosa"],
        "milestones": ["Nasal rinses", "Debridement visit", "Symptom review", "Fit to travel"],
    },
    "balloon-sinuplasty": {
        "title": "Balloon sinuplasty",
        "family": "balloon",
        "labels": ["Sinus cavity", "Narrowed ostium", "Balloon path", "Dilated opening"],
        "steps": ["Confirm ostial disease", "Advance the balloon", "Dilate the opening"],
        "milestones": ["Rinse care", "Ostial review", "Decide if FESS needed", "Fit to travel"],
    },
    "tympanoplasty": {
        "title": "Tympanoplasty",
        "family": "drum",
        "labels": ["Eardrum perforation", "Middle-ear space", "Ossicles", "Ear canal"],
        "steps": ["Assess the perforation", "Place a graft", "Protect the canal"],
        "milestones": ["Dry-ear care", "Dressing review", "Audiogram", "Fit to travel"],
    },
    "mastoidectomy": {
        "title": "Mastoidectomy",
        "family": "mastoid",
        "labels": ["Mastoid air cells", "Middle ear", "Facial-nerve region", "Ear canal"],
        "steps": ["Map disease on CT", "Clear diseased cells", "Decide canal-wall plan"],
        "milestones": ["Dressing care", "Dizziness review", "Cavity cleaning", "Fit to travel"],
    },
    "stapedectomy-stapedotomy": {
        "title": "Stapes surgery",
        "family": "stapes",
        "labels": ["Incus", "Fixed stapes", "Oval window", "Prosthesis concept"],
        "steps": ["Confirm stapes fixation", "Create a fenestra", "Place the prosthesis"],
        "milestones": ["Dizziness watch", "Dry-ear care", "Audiogram", "Fit to travel"],
    },
    "cochlear-implantation": {
        "title": "Cochlear implantation",
        "family": "cochlea",
        "labels": ["Cochlea", "Auditory nerve", "Receiver-stimulator", "Electrode array"],
        "steps": ["Seat the receiver", "Open the cochlea", "Insert the electrode"],
        "milestones": ["Wound care", "Processor switch-on", "Mapping", "Rehabilitation"],
    },
    "baha-implantation-bone-anchored-hearing-aid": {
        "title": "BAHA implantation",
        "family": "baha",
        "labels": ["Temporal bone", "Osseointegrated fixture", "Processor", "Bone-conduction path"],
        "steps": ["Plan the fixture site", "Place the implant", "Fit the processor later"],
        "milestones": ["Skin / implant care", "Osseointegration wait", "Processor fitting", "Fit to travel"],
    },
    "tonsillectomy": {
        "title": "Tonsillectomy",
        "family": "tonsil",
        "labels": ["Palatine tonsil", "Tonsillar fossa", "Soft palate", "Oropharyngeal airway"],
        "steps": ["Expose the tonsil", "Dissect the fossa", "Confirm haemostasis"],
        "milestones": ["Pain / hydration", "Bleeding watch", "Soft diet", "Fit to travel"],
    },
    "adenoidectomy": {
        "title": "Adenoidectomy",
        "family": "adenoid",
        "labels": ["Adenoid pad", "Nasopharynx", "Nasal airway", "Eustachian region"],
        "steps": ["Inspect the nasopharynx", "Remove adenoid tissue", "Check the bed"],
        "milestones": ["Nasal-breathing review", "Bleeding watch", "Hearing review if needed", "Fit to travel"],
    },
    "sleep-apnea-surgery": {
        "title": "Sleep apnea surgery",
        "family": "airway",
        "labels": ["Soft palate", "Tonsils", "Tongue base", "Pharyngeal airway"],
        "steps": ["Identify collapse sites", "Treat named levels", "Observe the airway"],
        "milestones": ["Airway observation", "Swallow / pain care", "Later sleep study", "Fit to travel"],
    },
    "vocal-cord-surgery": {
        "title": "Vocal cord surgery",
        "family": "cord",
        "labels": ["True vocal fold", "Lesion", "Glottic airway", "False fold"],
        "steps": ["Examine with stroboscopy", "Treat the named lesion", "Protect the layered fold"],
        "milestones": ["Voice rest", "Airway watch", "Therapy review", "Fit to travel"],
    },
    "microlaryngeal-surgery": {
        "title": "Microlaryngeal surgery",
        "family": "scope",
        "labels": ["Laryngoscope view", "Vocal-fold layers", "Target lesion", "Airway lumen"],
        "steps": ["Suspend the laryngoscope", "Magnify the larynx", "Biopsy or excise"],
        "milestones": ["Airway watch", "Voice rest", "Pathology review", "Fit to travel"],
    },
    "thyroid-surgery": {
        "title": "Thyroid surgery",
        "family": "thyroid",
        "labels": ["Thyroid lobe", "Recurrent laryngeal nerve", "Parathyroid glands", "Trachea"],
        "steps": ["Expose the gland", "Protect nerve and parathyroids", "Remove the planned lobe"],
        "milestones": ["Calcium checks", "Voice review", "Wound care", "Fit to travel"],
    },
    "head-neck-cancer-surgery": {
        "title": "Head and neck cancer surgery",
        "family": "neck",
        "labels": ["Primary site region", "Neck nodal levels", "Airway", "Swallow pathway"],
        "steps": ["Confirm tumour-board plan", "Resect the named primary", "Address planned neck levels"],
        "milestones": ["Airway / swallow care", "Wound review", "Histology / adjuvant plan", "Fit to travel"],
    },
    "skull-base-surgery": {
        "title": "Skull base surgery",
        "family": "skull",
        "labels": ["Sinonasal corridor", "Skull-base plate", "Cranial contents", "Reconstruction zone"],
        "steps": ["Joint ENT–neurosurgery plan", "Use the named corridor", "Reconstruct the defect"],
        "milestones": ["CSF-leak watch", "ICU observation", "Nasal care", "Fit to travel"],
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
    draw.text((58, 38), kicker.upper(), font=font(18, True), fill=NAVY)
    draw.text((58, 72), title, font=font(34, True), fill=INK)
    draw.text((58, 124), "Patient-education schematic · anatomy and plans vary", font=font(19), fill=MUTED)


def draw_family(draw, family, box):
    x0, y0, x1, y1 = box
    cx, cy = (x0 + x1) // 2, (y0 + y1) // 2
    if family == "septum":
        draw.ellipse((cx - 70, cy - 140, cx + 70, cy + 130), fill=ROSE, outline=INK, width=5)
        draw.line([(cx, cy - 120), (cx + 18, cy - 20), (cx - 12, cy + 40), (cx, cy + 110)], fill=CORAL, width=8)
        draw.line([(cx - 40, cy - 30), (cx - 40, cy + 70)], fill=NAVY, width=3)
        draw.line([(cx + 40, cy - 30), (cx + 40, cy + 70)], fill=NAVY, width=3)
    elif family in {"sinus", "balloon"}:
        draw.ellipse((cx - 55, cy - 150, cx + 55, cy - 40), fill=ROSE, outline=INK, width=4)
        draw.ellipse((cx - 130, cy - 20, cx - 20, cy + 90), fill=SKY, outline=NAVY, width=4)
        draw.ellipse((cx + 20, cy - 20, cx + 130, cy + 90), fill=SKY, outline=NAVY, width=4)
        draw.ellipse((cx - 40, cy + 70, cx + 40, cy + 140), fill=ROSE, outline=INK, width=4)
        if family == "balloon":
            draw.ellipse((cx - 95, cy + 10, cx - 55, cy + 50), outline=GOLD, width=5)
    elif family == "drum":
        draw.ellipse((cx - 110, cy - 80, cx + 110, cy + 100), fill=ROSE, outline=INK, width=5)
        draw.ellipse((cx - 45, cy - 20, cx + 45, cy + 50), outline=NAVY, width=5)
        draw.arc((cx - 20, cy, cx + 25, cy + 30), 200, 20, fill=CORAL, width=6)
    elif family == "mastoid":
        draw.ellipse((cx - 40, cy - 130, cx + 80, cy - 10), fill=ROSE, outline=INK, width=4)
        for i in range(4):
            for j in range(3):
                draw.ellipse((cx - 10 + i * 18, cy - 90 + j * 18, cx + i * 18, cy - 80 + j * 18), outline=NAVY, width=2)
        draw.line([(cx - 80, cy + 20), (cx + 20, cy + 90)], fill=GOLD, width=5)
    elif family == "stapes":
        draw.ellipse((cx - 100, cy - 70, cx + 100, cy + 90), fill=ROSE, outline=INK, width=4)
        draw.line([(cx - 30, cy - 20), (cx, cy + 10), (cx + 20, cy + 40)], fill=NAVY, width=6)
        draw.ellipse((cx + 10, cy + 35, cx + 40, cy + 55), outline=GOLD, width=4)
    elif family == "cochlea":
        draw.arc((cx - 40, cy - 40, cx + 70, cy + 70), 40, 300, fill=NAVY, width=10)
        draw.arc((cx - 15, cy - 15, cx + 45, cy + 45), 40, 300, fill=CORAL, width=8)
        draw.rounded_rectangle((cx - 130, cy - 30, cx - 70, cy + 30), radius=12, fill=SKY, outline=NAVY, width=4)
        draw.line([(cx - 70, cy), (cx - 20, cy + 10)], fill=GOLD, width=5)
    elif family == "baha":
        draw.ellipse((cx - 90, cy - 120, cx + 70, cy + 80), fill=ROSE, outline=INK, width=5)
        draw.ellipse((cx + 20, cy - 20, cx + 80, cy + 40), fill=SKY, outline=NAVY, width=4)
        draw.ellipse((cx + 35, cy - 5, cx + 65, cy + 25), fill=GOLD)
    elif family == "tonsil":
        draw.ellipse((cx - 90, cy - 80, cx + 90, cy + 100), fill=ROSE, outline=INK, width=5)
        draw.ellipse((cx - 70, cy - 10, cx - 15, cy + 55), fill=CORAL, outline=INK, width=3)
        draw.ellipse((cx + 15, cy - 10, cx + 70, cy + 55), fill=CORAL, outline=INK, width=3)
    elif family == "adenoid":
        draw.ellipse((cx - 70, cy - 140, cx + 70, cy + 10), fill=ROSE, outline=INK, width=4)
        draw.ellipse((cx - 50, cy + 20, cx + 50, cy + 90), fill=SKY, outline=NAVY, width=4)
        draw.ellipse((cx - 30, cy + 35, cx + 30, cy + 70), fill=CORAL)
    elif family == "airway":
        draw.polygon([(cx - 50, cy - 130), (cx + 50, cy - 130), (cx + 35, cy + 120), (cx - 35, cy + 120)], fill=ROSE, outline=INK)
        draw.line([(cx - 20, cy - 40), (cx + 20, cy - 10), (cx - 15, cy + 40)], fill=CORAL, width=8)
    elif family in {"cord", "scope"}:
        draw.ellipse((cx - 80, cy - 50, cx + 80, cy + 70), fill=ROSE, outline=INK, width=5)
        draw.arc((cx - 50, cy - 10, cx, cy + 30), 200, 340, fill=NAVY, width=6)
        draw.arc((cx, cy - 10, cx + 50, cy + 30), 200, 340, fill=NAVY, width=6)
        draw.ellipse((cx - 28, cy, cx - 12, cy + 14), fill=CORAL)
        if family == "scope":
            draw.rectangle((cx - 8, cy - 120, cx + 8, cy - 40), outline=GOLD, width=4)
    elif family == "thyroid":
        draw.ellipse((cx - 90, cy - 20, cx - 10, cy + 70), fill=ROSE, outline=INK, width=4)
        draw.ellipse((cx + 10, cy - 20, cx + 90, cy + 70), fill=ROSE, outline=INK, width=4)
        draw.line([(cx, cy - 80), (cx, cy + 110)], fill=NAVY, width=6)
        draw.line([(cx - 40, cy + 80), (cx - 20, cy + 20)], fill=GOLD, width=4)
    elif family == "neck":
        draw.ellipse((cx - 55, cy - 150, cx + 55, cy - 50), fill=ROSE, outline=INK, width=4)
        draw.rounded_rectangle((cx - 80, cy - 40, cx + 80, cy + 130), radius=40, fill=ROSE, outline=INK, width=4)
        for y in (-10, 30, 70):
            draw.ellipse((cx - 50, cy + y, cx - 20, cy + y + 22), outline=NAVY, width=3)
            draw.ellipse((cx + 20, cy + y, cx + 50, cy + y + 22), outline=NAVY, width=3)
    elif family == "skull":
        draw.ellipse((cx - 90, cy - 130, cx + 90, cy + 20), fill=ROSE, outline=INK, width=5)
        draw.polygon([(cx - 70, cy + 10), (cx + 70, cy + 10), (cx + 40, cy + 110), (cx - 40, cy + 110)], fill=SKY, outline=NAVY)
        draw.line([(cx - 60, cy + 20), (cx + 60, cy + 20)], fill=GOLD, width=6)


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
        draw.ellipse((700, y, 720, y + 20), fill=CORAL if i % 2 else NAVY)
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
    draw.text((55, 620), "The treating ENT team may change the plan after examination and consent.", font=font(18), fill=MUTED)
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
