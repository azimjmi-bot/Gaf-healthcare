"""Generate original patient-education diagrams for Neurosurgery cost guides."""

from pathlib import Path
from textwrap import wrap
from PIL import Image, ImageDraw, ImageFont

OUT = Path(__file__).parents[1] / "public/images/cost/neurosurgery"
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
    "brain-tumor-surgery": {
        "title": "Brain tumor surgery",
        "family": "tumor",
        "labels": ["Cortex", "Tumour mass", "Craniotomy window", "White-matter tracts"],
        "steps": ["Map the lesion on MRI", "Open the planned window", "Resect or debulk safely"],
        "milestones": ["Neuro-ICU checks", "Pathology review", "Wound review", "Fit to travel"],
    },
    "glioma-surgery": {
        "title": "Glioma surgery",
        "family": "glioma",
        "labels": ["Intra-axial glioma", "Eloquent cortex", "Mapping probes", "Resection cavity"],
        "steps": ["Confirm eloquence", "Map function if needed", "Perform maximal safe resection"],
        "milestones": ["Deficit watch", "Molecular report", "Oncology discussion", "Fit to travel"],
    },
    "meningioma-surgery": {
        "title": "Meningioma surgery",
        "family": "meningioma",
        "labels": ["Dural origin", "Convexity or skull base", "Venous sinus", "Brain interface"],
        "steps": ["Define the dural origin", "Dissect from brain and sinus", "Repair dura"],
        "milestones": ["CSF-leak watch", "Seizure review", "Residual imaging", "Fit to travel"],
    },
    "pituitary-tumor-surgery": {
        "title": "Pituitary tumor surgery",
        "family": "pituitary",
        "labels": ["Sella", "Optic chiasm", "Adenoma", "Sphenoid corridor"],
        "steps": ["Confirm hormones and vision", "Enter the sella transsphenoidally", "Reconstruct the floor"],
        "milestones": ["Sodium watch", "Vision check", "CSF-leak watch", "Fit to travel"],
    },
    "endoscopic-brain-surgery": {
        "title": "Endoscopic brain surgery",
        "family": "endobrain",
        "labels": ["Burr hole", "Ventricle", "Endoscope", "Intraventricular target"],
        "steps": ["Choose a ventricular path", "Inspect with the endoscope", "Treat or convert if needed"],
        "milestones": ["CSF-leak watch", "Bleed watch", "Corridor review", "Fit to travel"],
    },
    "endoscopic-skull-base-surgery": {
        "title": "Endoscopic skull base surgery",
        "family": "endoskull",
        "labels": ["Nasal corridor", "Sella / anterior base", "Defect", "Nasoseptal flap"],
        "steps": ["Open the endonasal corridor", "Address the lesion", "Seal the skull base"],
        "milestones": ["Leak precautions", "Vision review", "Flap check", "Fit to travel"],
    },
    "stereotactic-brain-biopsy": {
        "title": "Stereotactic brain biopsy",
        "family": "biopsy",
        "labels": ["Skull entry", "Planned trajectory", "Deep lesion", "Needle cores"],
        "steps": ["Register the images", "Pass the needle", "Obtain diagnostic cores"],
        "milestones": ["Bleed watch", "Pathology result", "Next-step plan", "Fit to travel"],
    },
    "aneurysm-clipping": {
        "title": "Aneurysm clipping",
        "family": "clip",
        "labels": ["Parent artery", "Aneurysm sac", "Neck", "Microsurgical clip"],
        "steps": ["Expose the parent vessel", "Place the clip across the neck", "Confirm exclusion"],
        "milestones": ["Neuro-ICU watch", "Vasospasm review if ruptured", "Imaging confirmation", "Fit to travel"],
    },
    "aneurysm-coiling": {
        "title": "Aneurysm coiling",
        "family": "coil",
        "labels": ["Aneurysm sac", "Microcatheter", "Coils", "Optional stent"],
        "steps": ["Navigate to the aneurysm", "Deploy the named coils", "Check residual filling"],
        "milestones": ["Puncture-site care", "Neurological checks", "Follow-up angiogram plan", "Fit to travel"],
    },
    "avm-surgery": {
        "title": "AVM surgery",
        "family": "avm",
        "labels": ["Feeding arteries", "Nidus", "Draining vein", "Eloquent brain"],
        "steps": ["Map the nidus", "Disconnect feeders", "Remove the nidus last"],
        "milestones": ["Haemorrhage watch", "Angiography confirmation", "Seizure review", "Fit to travel"],
    },
    "avm-embolization": {
        "title": "AVM embolization",
        "family": "avmemb",
        "labels": ["Feeder", "Nidus", "Microcatheter", "Embolic cast"],
        "steps": ["Select the target feeder", "Inject the embolic agent", "Plan the next stage"],
        "milestones": ["Stage review", "Neurological checks", "Next sitting or surgery", "Fit to travel"],
    },
    "stroke-thrombectomy": {
        "title": "Stroke thrombectomy",
        "family": "thromb",
        "labels": ["Occluded MCA", "Clot", "Stent retriever", "Reopened vessel"],
        "steps": ["Confirm large-vessel occlusion", "Engage the clot", "Check recanalization"],
        "milestones": ["Stroke ICU", "Swallow and rehab", "Secondary prevention", "Travel if appropriate"],
    },
    "cerebral-bypass": {
        "title": "Cerebral bypass",
        "family": "bypass",
        "labels": ["STA donor", "Cortical recipient", "Anastomosis", "Ischaemic territory"],
        "steps": ["Prepare donor and recipient", "Sew the anastomosis", "Confirm graft flow"],
        "milestones": ["Graft-patency checks", "Blood-pressure control", "Wound review", "Fit to travel"],
    },
    "deep-brain-stimulation": {
        "title": "Deep brain stimulation",
        "family": "dbs",
        "labels": ["Brain target", "Electrode", "Extension", "Pulse generator"],
        "steps": ["Confirm the target", "Place the leads", "Connect the generator"],
        "milestones": ["Wound care", "First programming", "Stimulation review", "Fit to travel"],
    },
    "epilepsy-surgery": {
        "title": "Epilepsy surgery",
        "family": "epilepsy",
        "labels": ["Temporal lobe", "Hippocampus", "Seizure focus", "Resection margin"],
        "steps": ["Localise the focus", "Map language or memory if needed", "Resect or disconnect"],
        "milestones": ["Seizure watch", "Medicine review", "Neuropsychology", "Fit to travel"],
    },
    "stereotactic-brain-surgery": {
        "title": "Stereotactic brain surgery",
        "family": "stereo",
        "labels": ["Registration", "Trajectory", "Deep target", "Named payload"],
        "steps": ["Name the payload", "Register the path", "Deliver biopsy, lesion or lead"],
        "milestones": ["Tract-bleed watch", "Purpose-specific review", "Next-step plan", "Fit to travel"],
    },
    "hydrocephalus-surgery": {
        "title": "Hydrocephalus surgery",
        "family": "hydro",
        "labels": ["Enlarged ventricle", "Ventricular catheter", "Valve", "Peritoneal end"],
        "steps": ["Place the ventricular catheter", "Connect the named valve", "Tunnel to the abdomen"],
        "milestones": ["Shunt-function checks", "Infection watch", "Warning-sign teaching", "Fit to travel"],
    },
    "endoscopic-third-ventriculostomy-etv": {
        "title": "ETV",
        "family": "etv",
        "labels": ["Lateral ventricle", "Third ventricle", "Floor stoma", "Basilar artery nearby"],
        "steps": ["Enter the third ventricle", "Create the floor stoma", "Watch for delayed failure"],
        "milestones": ["Early observation", "Delayed-failure teaching", "Wound review", "Fit to travel"],
    },
    "chiari-surgery": {
        "title": "Chiari surgery",
        "family": "chiari",
        "labels": ["Cerebellar tonsils", "Foramen magnum", "Optional syrinx", "Duraplasty"],
        "steps": ["Expose the craniocervical junction", "Remove planned bone", "Open dura if written"],
        "milestones": ["CSF-leak watch", "Neck-wound care", "Syrinx imaging plan", "Fit to travel"],
    },
    "craniosynostosis-surgery": {
        "title": "Craniosynostosis surgery",
        "family": "cranio",
        "labels": ["Fused suture", "Infant vault", "Strip or remodel", "Helmet if endoscopic"],
        "steps": ["Name endoscopic vs open", "Release the suture", "Plan helmet or vault shape"],
        "milestones": ["Paediatric ICU", "Blood-count watch", "Helmet or shape review", "Fit to travel"],
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


def brain(draw, cx, cy, fill=ROSE):
    draw.ellipse((cx - 80, cy - 70, cx + 80, cy + 75), fill=fill, outline=INK, width=4)


def draw_family(draw, family, box):
    x0, y0, x1, y1 = box
    cx, cy = (x0 + x1) // 2, (y0 + y1) // 2
    if family == "tumor":
        brain(draw, cx, cy)
        draw.ellipse((cx + 5, cy - 10, cx + 50, cy + 35), fill=CORAL)
        draw.arc((cx - 90, cy - 80, cx + 90, cy + 20), 200, 340, fill=NAVY, width=6)
    elif family == "glioma":
        brain(draw, cx, cy)
        draw.polygon([(cx - 10, cy - 20), (cx + 45, cy), (cx + 10, cy + 40), (cx - 25, cy + 15)], fill=CORAL, outline=INK)
        draw.line([(cx - 50, cy - 30), (cx - 5, cy + 5)], fill=GOLD, width=4)
    elif family == "meningioma":
        brain(draw, cx, cy)
        draw.ellipse((cx - 10, cy - 65, cx + 55, cy - 10), fill=GOLD, outline=INK, width=3)
        draw.arc((cx - 85, cy - 80, cx + 85, cy + 10), 200, 340, fill=TEAL, width=6)
    elif family == "pituitary":
        brain(draw, cx, cy - 10)
        draw.ellipse((cx - 18, cy + 35, cx + 18, cy + 70), fill=CORAL, outline=INK, width=3)
        draw.polygon([(cx - 40, cy + 80), (cx + 40, cy + 80), (cx + 20, cy + 110), (cx - 20, cy + 110)], outline=NAVY, width=3)
    elif family == "endobrain":
        brain(draw, cx, cy)
        draw.ellipse((cx - 25, cy - 15, cx + 25, cy + 25), outline=TEAL, width=4)
        draw.line([(cx - 70, cy - 80), (cx - 5, cy)], fill=GOLD, width=5)
    elif family == "endoskull":
        draw.ellipse((cx - 50, cy - 90, cx + 50, cy - 10), fill=ROSE, outline=INK, width=4)
        draw.polygon([(cx - 20, cy - 10), (cx + 20, cy - 10), (cx + 8, cy + 70), (cx - 8, cy + 70)], fill=SKY, outline=NAVY)
        draw.arc((cx - 40, cy + 50, cx + 40, cy + 110), 200, 340, fill=GOLD, width=6)
    elif family == "biopsy":
        brain(draw, cx + 10, cy + 10)
        draw.line([(cx - 70, cy - 90), (cx + 20, cy + 20)], fill=GOLD, width=5)
        draw.ellipse((cx + 10, cy + 10, cx + 40, cy + 40), fill=CORAL)
    elif family == "clip":
        draw.arc((cx - 90, cy - 20, cx + 40, cy + 80), 200, 20, fill=NAVY, width=10)
        draw.ellipse((cx + 20, cy, cx + 70, cy + 45), fill=CORAL, outline=INK, width=3)
        draw.line([(cx + 15, cy + 10), (cx + 15, cy + 40)], fill=GOLD, width=7)
    elif family == "coil":
        draw.arc((cx - 90, cy - 10, cx + 30, cy + 90), 200, 20, fill=NAVY, width=10)
        draw.ellipse((cx + 15, cy + 5, cx + 70, cy + 55), outline=CORAL, width=4)
        for i in range(3):
            draw.arc((cx + 22 + i * 3, cy + 12 + i * 3, cx + 62 - i * 3, cy + 48 - i * 3), 0, 360, fill=GOLD, width=2)
    elif family == "avm":
        brain(draw, cx, cy)
        draw.ellipse((cx - 15, cy - 5, cx + 35, cy + 40), outline=CORAL, width=5)
        draw.line([(cx - 50, cy + 20), (cx - 10, cy + 15)], fill=NAVY, width=4)
        draw.line([(cx + 35, cy + 20), (cx + 75, cy + 40)], fill=TEAL, width=4)
    elif family == "avmemb":
        brain(draw, cx, cy)
        draw.line([(cx - 80, cy + 60), (cx + 10, cy + 10)], fill=GOLD, width=5)
        draw.ellipse((cx, cy - 5, cx + 40, cy + 35), fill=CORAL)
    elif family == "thromb":
        draw.arc((cx - 100, cy - 20, cx + 40, cy + 80), 200, 20, fill=NAVY, width=12)
        draw.ellipse((cx + 5, cy + 5, cx + 40, cy + 35), fill=CORAL)
        draw.line([(cx + 45, cy + 20), (cx + 90, cy + 20)], fill=GOLD, width=6)
    elif family == "bypass":
        brain(draw, cx, cy)
        draw.line([(cx - 70, cy - 60), (cx - 10, cy + 10)], fill=TEAL, width=5)
        draw.line([(cx - 10, cy + 10), (cx + 50, cy + 5)], fill=GOLD, width=5)
        draw.ellipse((cx - 20, cy, cx + 5, cy + 22), outline=NAVY, width=3)
    elif family == "dbs":
        brain(draw, cx - 10, cy - 10)
        draw.line([(cx - 5, cy - 80), (cx - 5, cy + 20)], fill=GOLD, width=5)
        draw.rounded_rectangle((cx + 40, cy + 30, cx + 95, cy + 80), radius=10, fill=SKY, outline=NAVY, width=3)
        draw.line([(cx - 5, cy + 20), (cx + 40, cy + 55)], fill=TEAL, width=4)
    elif family == "epilepsy":
        brain(draw, cx, cy)
        draw.polygon([(cx - 5, cy + 5), (cx + 55, cy + 15), (cx + 40, cy + 55), (cx - 15, cy + 40)], fill=CORAL, outline=INK)
    elif family == "stereo":
        brain(draw, cx + 15, cy + 5)
        draw.ellipse((cx - 70, cy - 90, cx - 20, cy - 40), outline=NAVY, width=4)
        draw.line([(cx - 45, cy - 40), (cx + 25, cy + 25)], fill=GOLD, width=5)
    elif family == "hydro":
        brain(draw, cx - 20, cy - 10)
        draw.ellipse((cx - 35, cy - 20, cx + 5, cy + 25), outline=TEAL, width=4)
        draw.line([(cx + 5, cy), (cx + 70, cy + 70)], fill=GOLD, width=5)
        draw.ellipse((cx + 55, cy + 55, cx + 95, cy + 95), outline=NAVY, width=3)
    elif family == "etv":
        brain(draw, cx, cy)
        draw.ellipse((cx - 20, cy - 5, cx + 20, cy + 30), outline=TEAL, width=4)
        draw.ellipse((cx - 8, cy + 20, cx + 12, cy + 40), fill=GOLD)
    elif family == "chiari":
        brain(draw, cx, cy - 25)
        draw.polygon([(cx - 25, cy + 40), (cx + 25, cy + 40), (cx + 10, cy + 85), (cx - 10, cy + 85)], fill=ROSE, outline=INK)
        draw.line([(cx - 60, cy + 50), (cx + 60, cy + 50)], fill=NAVY, width=5)
    elif family == "cranio":
        draw.ellipse((cx - 70, cy - 70, cx + 70, cy + 70), outline=INK, width=5)
        draw.line([(cx - 10, cy - 70), (cx - 10, cy + 10)], fill=CORAL, width=6)
        draw.arc((cx - 50, cy - 40, cx + 50, cy + 40), 200, 340, fill=GOLD, width=5)
    else:
        brain(draw, cx, cy)


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
    draw.text((55, 620), "The treating neurosurgery team may change the plan after examination and consent.", font=font(18), fill=MUTED)
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
