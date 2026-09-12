"""Generate original patient-education diagrams for Cardiology cost guides.

Schematics explain anatomy, catheter or device concepts and recovery
without implying a patient outcome, success rate or aesthetic result.
"""

from pathlib import Path
from textwrap import wrap
from PIL import Image, ImageDraw, ImageFont

OUT = Path(__file__).parents[1] / "public/images/cost/cardiology"
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
    "coronary-angioplasty-stenting": {
        "title": "Coronary angioplasty",
        "family": "coronary",
        "labels": ["Narrowed coronary artery", "Heart muscle downstream", "Atherosclerotic plaque", "Restored lumen after stent"],
        "steps": ["Arterial access at wrist or groin", "Balloon opens the stenosis", "Drug-eluting stent scaffolds the artery"],
        "milestones": ["Puncture-site rest", "Antiplatelet plan", "CCU / symptom review", "Fit to travel"],
    },
    "coronary-angiography": {
        "title": "Coronary angiography",
        "family": "angiography",
        "labels": ["Aortic root", "Left coronary artery", "Right coronary artery", "Contrast outlines the lumen"],
        "steps": ["Catheter to the coronary ostium", "Contrast maps each artery", "Decide medicines, PCI or surgery"],
        "milestones": ["Kidney / allergy check", "Diagnostic images", "Treatment decision", "Access-site care"],
    },
    "cto-angioplasty-chronic-total-occlusion": {
        "title": "CTO angioplasty",
        "family": "cto",
        "labels": ["Chronic total occlusion", "Bridging collaterals", "Distal vessel territory", "Dual-access strategy"],
        "steps": ["Review prior angiograms", "Antegrade or retrograde wiring", "Stent if the lumen is recanalized"],
        "milestones": ["Two access sites", "Kidney-function check", "Chest-pain review", "Fit to travel"],
    },
    "atrial-fibrillation-ablation": {
        "title": "AF ablation",
        "family": "af",
        "labels": ["Left atrium", "Pulmonary veins", "AF trigger sites", "Isolation line concept"],
        "steps": ["Transseptal access", "3D map of the left atrium", "Isolate pulmonary veins"],
        "milestones": ["Groin-site rest", "Rhythm observation", "Anticoagulation review", "Fit to travel"],
    },
    "radiofrequency-ablation": {
        "title": "Radiofrequency ablation",
        "family": "rfa",
        "labels": ["Sinus node", "AV node", "Re-entry circuit", "RF target site"],
        "steps": ["Electrophysiology study", "Map the tachycardia circuit", "Deliver radiofrequency energy"],
        "milestones": ["Access-site rest", "Rhythm / block check", "Medicine review", "Fit to travel"],
    },
    "pacemaker-implantation": {
        "title": "Pacemaker implantation",
        "family": "pacemaker",
        "labels": ["Conduction system", "Right atrium", "Right ventricle", "Generator pocket"],
        "steps": ["Create a subclavian pocket", "Place and test leads", "Connect the pulse generator"],
        "milestones": ["Pocket care", "Arm restriction", "Device interrogation", "Fit to travel"],
    },
    "icd-implantation-implantable-cardioverter-defibrillator": {
        "title": "ICD implantation",
        "family": "icd",
        "labels": ["Ventricular myocardium", "Defibrillator lead", "Shock coil concept", "ICD generator"],
        "steps": ["Pocket and venous access", "Position a defibrillator lead", "Programme detection zones"],
        "milestones": ["Pocket care", "Shock-response plan", "Device check", "Fit to travel"],
    },
    "crt-crt-d-implantation": {
        "title": "CRT / CRT-D",
        "family": "crt",
        "labels": ["Atrial lead", "Right-ventricular lead", "Coronary-sinus LV lead", "Resynchronization pacing"],
        "steps": ["Place RA and RV leads", "Cannulate the coronary sinus", "Programme biventricular pacing"],
        "milestones": ["Pocket care", "Heart-failure review", "CRT optimization", "Fit to travel"],
    },
    "leadless-pacemaker-implantation": {
        "title": "Leadless pacemaker",
        "family": "leadless",
        "labels": ["Femoral venous route", "Inferior vena cava", "Right ventricle", "Pacing capsule"],
        "steps": ["Large-bore femoral access", "Advance the delivery catheter", "Fix and release the capsule"],
        "milestones": ["Groin / closure care", "Pacing thresholds", "Perforation watch", "Fit to travel"],
    },
    "mitraclip": {
        "title": "MitraClip therapy",
        "family": "mitraclip",
        "labels": ["Left atrium", "Mitral leaflets", "Regurgitant jet", "Edge-to-edge grasp"],
        "steps": ["Transseptal left-atrial access", "Steer the clip under TOE", "Grasp both leaflets"],
        "milestones": ["CCU monitoring", "Echo of residual MR", "Groin-site care", "Fit to travel"],
    },
    "balloon-mitral-valvotomy": {
        "title": "Balloon mitral valvotomy",
        "family": "bmv",
        "labels": ["Stenotic mitral valve", "Fused commissures", "Left atrium", "Balloon path"],
        "steps": ["Exclude left-atrial thrombus", "Transseptal balloon crossing", "Stepwise commissural split"],
        "milestones": ["Echo gradient review", "New regurgitation check", "Rhythm / anticoagulation", "Fit to travel"],
    },
    "asd-device-closure": {
        "title": "ASD device closure",
        "family": "asd",
        "labels": ["Right atrium", "Left atrium", "Secundum ASD", "Occluder discs"],
        "steps": ["Image defect size and rims", "Size and position the occluder", "Release if stable"],
        "milestones": ["Device-position echo", "Antiplatelet plan", "Groin-site care", "Fit to travel"],
    },
    "peripheral-angioplasty": {
        "title": "Peripheral angioplasty",
        "family": "peripheral",
        "labels": ["Iliac / femoral artery", "Focal stenosis", "Downstream runoff", "Limb blood flow"],
        "steps": ["Map the arterial territory", "Balloon the stenosis", "Stent or drug-coated balloon if planned"],
        "milestones": ["Access-site care", "Walking / pulse review", "Kidney-function check", "Fit to travel"],
    },
    "carotid-artery-stenting": {
        "title": "Carotid artery stenting",
        "family": "carotid",
        "labels": ["Common carotid artery", "Internal carotid stenosis", "Brain blood flow", "Embolic protection"],
        "steps": ["Engage the aortic arch", "Place a protection device", "Deploy the carotid stent"],
        "milestones": ["Neurological checks", "Blood-pressure control", "Puncture-site care", "Fit to travel"],
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
    draw.text((58, 72), title, font=font(36, True), fill=INK)
    draw.text((58, 124), "Patient-education schematic · anatomy and plans vary", font=font(19), fill=MUTED)


def heart(draw, cx, cy, scale=1.0, fill=ROSE):
    s = scale
    draw.ellipse((cx - 70 * s, cy - 55 * s, cx + 5 * s, cy + 35 * s), fill=fill, outline=INK, width=4)
    draw.ellipse((cx - 5 * s, cy - 55 * s, cx + 70 * s, cy + 35 * s), fill=fill, outline=INK, width=4)
    draw.polygon(
        [(cx - 72 * s, cy + 10 * s), (cx, cy + 95 * s), (cx + 72 * s, cy + 10 * s)],
        fill=fill,
        outline=INK,
    )


def coronary_tree(draw, cx, cy, occluded=False, stent=False, diagnostic=False):
    heart(draw, cx, cy + 20, 1.15)
    # LCA
    draw.line([(cx - 8, cy - 40), (cx - 70, cy + 10), (cx - 95, cy + 70)], fill=NAVY, width=7)
    draw.line([(cx - 70, cy + 10), (cx - 20, cy + 80)], fill=NAVY, width=6)
    # RCA
    draw.line([(cx + 10, cy - 38), (cx + 78, cy + 20), (cx + 88, cy + 78)], fill=NAVY, width=7)
    if occluded:
        draw.line([(cx - 78, cy + 28), (cx - 92, cy + 62)], fill=CORAL, width=10)
        draw.arc((cx - 110, cy + 40, cx - 60, cy + 95), 200, 20, fill=GOLD, width=4)
    elif diagnostic:
        draw.line([(cx - 40, cy - 90), (cx - 8, cy - 42)], fill=GOLD, width=5)
        draw.ellipse((cx - 16, cy - 50, cx, cy - 34), outline=NAVY, width=3)
        draw.ellipse((cx - 88, cy + 8, cx - 52, cy + 36), outline=CORAL, width=3)
    else:
        draw.line([(cx - 82, cy + 32), (cx - 90, cy + 58)], fill=CORAL, width=9)
        if stent:
            for i in range(4):
                y = cy + 34 + i * 7
                draw.line([(cx - 94, y), (cx - 78, y + 8)], fill=GOLD, width=3)


def conduction(draw, cx, cy, highlight="av"):
    heart(draw, cx, cy + 10, 1.1)
    draw.ellipse((cx - 18, cy - 28, cx - 2, cy - 12), fill=NAVY)  # SA
    draw.line([(cx - 8, cy - 12), (cx - 8, cy + 18)], fill=NAVY, width=4)
    draw.ellipse((cx - 16, cy + 16, cx, cy + 32), fill=CORAL if highlight == "av" else NAVY)  # AV
    draw.line([(cx - 8, cy + 32), (cx - 8, cy + 58), (cx - 40, cy + 82)], fill=NAVY, width=4)
    draw.line([(cx - 8, cy + 58), (cx + 28, cy + 82)], fill=NAVY, width=4)


def draw_family(draw, family, box):
    x0, y0, x1, y1 = box
    cx, cy = (x0 + x1) // 2, (y0 + y1) // 2
    if family in {"coronary", "angiography", "cto"}:
        coronary_tree(
            draw,
            cx,
            cy - 10,
            occluded=family == "cto",
            stent=family == "coronary",
            diagnostic=family == "angiography",
        )
    elif family == "af":
        draw.ellipse((cx - 120, cy - 70, cx + 120, cy + 90), fill=ROSE, outline=INK, width=5)
        draw.ellipse((cx - 145, cy - 40, cx - 95, cy + 10), fill=SKY, outline=NAVY, width=3)
        draw.ellipse((cx - 145, cy + 20, cx - 95, cy + 70), fill=SKY, outline=NAVY, width=3)
        draw.ellipse((cx + 95, cy - 40, cx + 145, cy + 10), fill=SKY, outline=NAVY, width=3)
        draw.ellipse((cx + 95, cy + 20, cx + 145, cy + 70), fill=SKY, outline=NAVY, width=3)
        draw.arc((cx - 80, cy - 20, cx + 80, cy + 60), 200, 340, fill=CORAL, width=6)
    elif family == "rfa":
        conduction(draw, cx, cy)
        draw.line([(cx + 70, cy + 90), (cx + 10, cy + 28)], fill=GOLD, width=5)
        draw.ellipse((cx + 2, cy + 18, cx + 18, cy + 34), outline=CORAL, width=3)
    elif family == "pacemaker":
        conduction(draw, cx + 30, cy, highlight="sa")
        draw.rounded_rectangle((cx - 150, cy - 40, cx - 90, cy + 30), radius=16, fill=SKY, outline=NAVY, width=4)
        draw.line([(cx - 90, cy - 10), (cx + 18, cy - 20)], fill=NAVY, width=4)
        draw.line([(cx - 90, cy + 10), (cx + 22, cy + 70)], fill=NAVY, width=4)
    elif family == "icd":
        heart(draw, cx + 20, cy + 8, 1.1)
        draw.rounded_rectangle((cx - 150, cy - 50, cx - 85, cy + 40), radius=14, fill="#2c3f66", outline=INK, width=4)
        draw.line([(cx - 85, cy), (cx + 10, cy + 55)], fill=GOLD, width=6)
        draw.line([(cx - 40, cy + 20), (cx + 5, cy + 70)], fill=CORAL, width=8)
    elif family == "crt":
        heart(draw, cx + 25, cy + 8, 1.1)
        draw.rounded_rectangle((cx - 155, cy - 45, cx - 90, cy + 35), radius=14, fill=SKY, outline=NAVY, width=4)
        draw.line([(cx - 90, cy - 20), (cx + 15, cy - 18)], fill=NAVY, width=3)
        draw.line([(cx - 90, cy), (cx + 20, cy + 70)], fill=NAVY, width=3)
        draw.line([(cx - 90, cy + 18), (cx - 10, cy + 55), (cx + 55, cy + 40)], fill=CORAL, width=4)
    elif family == "leadless":
        heart(draw, cx + 40, cy - 10, 1.0)
        draw.line([(cx - 110, cy + 110), (cx + 20, cy + 40)], fill=NAVY, width=6)
        draw.rounded_rectangle((cx + 12, cy + 18, cx + 48, cy + 58), radius=10, fill=GOLD, outline=INK, width=3)
        draw.ellipse((cx - 130, cy + 95, cx - 90, cy + 135), outline=CORAL, width=4)
    elif family == "mitraclip":
        draw.ellipse((cx - 90, cy - 110, cx + 90, cy - 10), fill=ROSE, outline=INK, width=4)
        draw.ellipse((cx - 100, cy + 10, cx + 100, cy + 130), fill=ROSE, outline=INK, width=4)
        draw.arc((cx - 55, cy - 20, cx + 55, cy + 40), 200, 340, fill=CORAL, width=7)
        draw.arc((cx - 55, cy + 10, cx + 55, cy + 70), 20, 160, fill=CORAL, width=7)
        draw.rounded_rectangle((cx - 14, cy + 8, cx + 14, cy + 42), radius=6, fill=GOLD, outline=INK, width=3)
    elif family == "bmv":
        draw.ellipse((cx - 90, cy - 110, cx + 90, cy - 5), fill=ROSE, outline=INK, width=4)
        draw.ellipse((cx - 100, cy + 15, cx + 100, cy + 135), fill=ROSE, outline=INK, width=4)
        draw.ellipse((cx - 28, cy - 5, cx + 28, cy + 45), outline=CORAL, width=6)
        draw.ellipse((cx - 55, cy, cx + 55, cy + 40), outline=GOLD, width=5)
    elif family == "asd":
        draw.ellipse((cx - 130, cy - 90, cx + 10, cy + 110), fill=ROSE, outline=INK, width=5)
        draw.ellipse((cx - 10, cy - 90, cx + 130, cy + 110), fill="#f8e4e0", outline=INK, width=5)
        draw.line([(cx, cy - 70), (cx, cy + 90)], fill=NAVY, width=5)
        draw.ellipse((cx - 22, cy - 8, cx + 22, cy + 28), fill=SKY, outline=CORAL, width=4)
        draw.ellipse((cx - 38, cy - 2, cx + 38, cy + 22), outline=GOLD, width=4)
    elif family == "peripheral":
        draw.polygon([(cx - 40, cy - 150), (cx + 40, cy - 150), (cx + 55, cy + 140), (cx - 55, cy + 140)], fill=ROSE, outline=INK)
        draw.line([(cx, cy - 130), (cx - 8, cy + 120)], fill=NAVY, width=10)
        draw.line([(cx - 10, cy - 10), (cx - 6, cy + 40)], fill=CORAL, width=12)
        draw.rounded_rectangle((cx - 22, cy, cx + 6, cy + 28), radius=4, fill=GOLD, outline=INK, width=2)
    elif family == "carotid":
        draw.ellipse((cx - 55, cy - 150, cx + 55, cy - 40), fill=ROSE, outline=INK, width=5)
        draw.line([(cx - 8, cy - 40), (cx - 8, cy + 130)], fill=NAVY, width=10)
        draw.line([(cx - 8, cy + 10), (cx + 40, cy - 20)], fill=NAVY, width=7)
        draw.line([(cx + 18, cy - 5), (cx + 36, cy - 16)], fill=CORAL, width=9)
        draw.ellipse((cx + 8, cy - 18, cx + 48, cy + 10), outline=GOLD, width=3)


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
    draw.text((55, 620), "The treating cardiology team may change the plan after imaging and consent.", font=font(18), fill=MUTED)
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
