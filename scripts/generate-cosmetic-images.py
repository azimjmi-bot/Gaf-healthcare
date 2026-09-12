"""Generate original patient-education diagrams for Cosmetic Surgery cost guides.

The diagrams are deliberately schematic: they explain anatomy, procedural scope
and recovery without simulating a patient's outcome or an aesthetic ideal.
"""

from pathlib import Path
from textwrap import wrap
from PIL import Image, ImageDraw, ImageFont

OUT = Path(__file__).parents[1] / "public/images/cost/cosmetic-surgery"
OUT.mkdir(parents=True, exist_ok=True)

INK = "#163936"
MUTED = "#55706d"
TEAL = "#1f7770"
MINT = "#dff2ed"
PALE = "#f4faf8"
CORAL = "#d87868"
SKIN = "#f3c8ad"
WHITE = "#ffffff"

DATA = {
    "rhinoplasty": ("Rhinoplasty", "nose", ["Nasal bone", "Septum", "Tip cartilage", "Airway"], ["Open or closed access", "Bone / cartilage plan", "Preserve support & airflow"], ["Splint care", "Breathing check", "Swelling review", "Fit to travel"]),
    "liposuction": ("Liposuction", "torso", ["Skin", "Subcutaneous fat", "Fascia", "Deeper structures"], ["Map selected zones", "Tumescent infiltration", "Cannula in fat plane"], ["Compression", "Early mobility", "Fluid / clot review", "Contour settles"]),
    "breast-augmentation": ("Breast augmentation", "breast", ["Breast tissue", "Pectoral muscle", "Chest wall", "Implant planes"], ["Choose implant or fat", "Create planned pocket", "Record implant details"], ["Support garment", "Wound / implant check", "Limit lifting", "Surveillance plan"]),
    "tummy-tuck": ("Tummy tuck", "abdomen", ["Skin envelope", "Subcutaneous fat", "Rectus fascia", "Umbilicus"], ["Plan skin excision", "Selected fascial repair", "Layered closure"], ["Flexed posture", "Drain / garment care", "Clot prevention", "Wound review"]),
    "breast-reduction": ("Breast reduction", "breast", ["Skin envelope", "Gland & fat", "Nipple–areola", "Tissue pedicle"], ["Select scar pattern", "Preserve blood supply", "Reshape remaining tissue"], ["Support bra", "Nipple / wound check", "Limit lifting", "Scar follow-up"]),
    "facelift": ("Facelift", "face", ["Skin", "SMAS", "Retaining tissues", "Facial nerve region"], ["Plan incision zones", "Reposition tissue plane", "Redrape without tension"], ["Head elevation", "Hematoma check", "Movement review", "Swelling settles"]),
    "hair-transplant": ("Hair transplant", "scalp", ["Hair shaft", "Follicle", "Donor zone", "Recipient zone"], ["FUE or strip harvest", "Prepare follicular units", "Place by direction"], ["Protect grafts", "Washing plan", "Temporary shedding", "Growth review"]),
    "breast-lift": ("Breast lift", "breast", ["Skin envelope", "Supporting tissue", "Nipple–areola", "Inframammary fold"], ["Select scar pattern", "Reshape support", "Reposition nipple–areola"], ["Support bra", "Blood-supply check", "Limit lifting", "Scar maturation"]),
    "blepharoplasty": ("Blepharoplasty", "eye", ["Eyelid skin", "Orbicularis muscle", "Orbital septum", "Fat compartments"], ["Upper or lower plan", "Preserve lid support", "Remove / reposition tissue"], ["Lubrication", "Vision check", "Swelling review", "Fit to travel"]),
    "gynecomastia-surgery": ("Gynecomastia surgery", "chest", ["Skin", "Subcutaneous fat", "Glandular tissue", "Pectoral muscle"], ["Define gland / fat / skin", "Liposuction or excision", "Check tissue if indicated"], ["Compression", "Hematoma check", "Limit lifting", "Contour review"]),
    "brazilian-butt-lift": ("Brazilian butt lift", "buttock", ["Skin", "Subcutaneous fat", "Gluteal fascia", "Muscle & vessels"], ["Harvest donor fat", "Prepare small parcels", "Subcutaneous-only placement"], ["Pressure precautions", "Early mobility", "Breathing / clot check", "Travel review"]),
    "fat-transfer": ("Fat transfer", "fat", ["Donor fat", "Processing stage", "Recipient tissue", "Vascular safety"], ["Controlled harvest", "Prepare graft", "Small-aliquot placement"], ["Donor garment", "Protect recipient", "Check nodules / skin", "Retention review"]),
    "otoplasty": ("Otoplasty", "ear", ["Helix", "Antihelix", "Concha", "Posterior cartilage"], ["Posterior access", "Fold sutures / scoring", "Selected conchal setback"], ["Protective dressing", "Hematoma check", "Headband", "Contact limits"]),
    "neck-lift": ("Neck lift", "neck", ["Submental fat", "Platysma", "Jawline", "Neck skin"], ["Submental / lateral access", "Treat selected layers", "Redrape skin"], ["Head elevation", "Neck swelling check", "Drain / wound care", "Travel review"]),
    "arm-lift": ("Arm lift", "arm", ["Skin envelope", "Subcutaneous fat", "Fascia", "Nerve / lymph region"], ["Limited / standard / extended", "Excise selected tissue", "Layered closure"], ["Compression", "Hand circulation check", "Limit lifting", "Scar follow-up"]),
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


def rounded(draw, box, fill=WHITE, outline="#c5ddd8", radius=24, width=3):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def arrow(draw, start, end, color=TEAL, width=8):
    draw.line([start, end], fill=color, width=width)
    x, y = end
    draw.polygon([(x, y), (x - 18, y - 11), (x - 18, y + 11)], fill=color)


def header(draw, title, kicker):
    draw.text((58, 38), kicker.upper(), font=font(18, True), fill=TEAL)
    draw.text((58, 72), title, font=font(38, True), fill=INK)
    draw.text((58, 124), "Patient-education schematic · anatomy and plans vary", font=font(19), fill=MUTED)


def draw_region(draw, region, box):
    x0, y0, x1, y1 = box
    cx, cy = (x0+x1)//2, (y0+y1)//2
    if region in {"face", "nose", "eye", "neck", "scalp", "ear"}:
        draw.ellipse((cx-115, cy-165, cx+115, cy+150), fill=SKIN, outline=INK, width=5)
        if region == "nose":
            draw.line([(cx, cy-75), (cx-28, cy+35), (cx+18, cy+43)], fill=INK, width=7)
            draw.arc((cx-42, cy+25, cx+8, cy+70), 10, 160, fill=CORAL, width=5)
            draw.line([(cx, cy-70), (cx, cy+35)], fill=TEAL, width=6)
        elif region == "eye":
            draw.arc((cx-75, cy-55, cx+75, cy+15), 190, 350, fill=INK, width=7)
            draw.ellipse((cx-12, cy-28, cx+12, cy-4), fill=TEAL)
            draw.arc((cx-82, cy-68, cx+82, cy+32), 5, 175, fill=CORAL, width=5)
        elif region == "ear":
            draw.ellipse((cx+82, cy-65, cx+155, cy+55), fill=SKIN, outline=INK, width=5)
            draw.arc((cx+98, cy-42, cx+140, cy+36), 80, 285, fill=TEAL, width=5)
        elif region == "scalp":
            for i in range(-90, 91, 18):
                draw.line([(cx+i, cy-145), (cx+i-8, cy-195)], fill=INK, width=4)
            draw.arc((cx-110, cy-168, cx+110, cy+100), 185, 355, fill=TEAL, width=7)
        elif region == "neck":
            draw.line([(cx-75, cy+90), (cx-92, cy+205)], fill=INK, width=7)
            draw.line([(cx+75, cy+90), (cx+92, cy+205)], fill=INK, width=7)
            draw.line([(cx-70, cy+120), (cx, cy+190), (cx+70, cy+120)], fill=TEAL, width=7)
        else:
            draw.arc((cx-75, cy-50, cx+75, cy+75), 195, 345, fill=TEAL, width=8)
            draw.line([(cx-90, cy+10), (cx+90, cy+10)], fill=CORAL, width=5)
    elif region in {"breast", "chest", "torso", "abdomen"}:
        draw.rounded_rectangle((cx-140, cy-180, cx+140, cy+190), radius=100, fill=SKIN, outline=INK, width=5)
        draw.line([(cx, cy-120), (cx, cy+170)], fill="#dba98e", width=4)
        if region in {"breast", "chest"}:
            draw.ellipse((cx-105, cy-90, cx-5, cy+30), outline=TEAL, width=7)
            draw.ellipse((cx+5, cy-90, cx+105, cy+30), outline=TEAL, width=7)
            if region == "chest":
                draw.ellipse((cx-62, cy-48, cx-22, cy-8), fill=CORAL)
        elif region == "abdomen":
            draw.ellipse((cx-10, cy-12, cx+10, cy+8), fill=INK)
            draw.line([(cx-100, cy+95), (cx+100, cy+95)], fill=CORAL, width=8)
            draw.line([(cx-40, cy-120), (cx-40, cy+85)], fill=TEAL, width=5)
            draw.line([(cx+40, cy-120), (cx+40, cy+85)], fill=TEAL, width=5)
        else:
            for yy in (-80, 5, 90):
                draw.line([(cx-100, cy+yy), (cx+100, cy+yy)], fill=TEAL if yy == 5 else CORAL, width=5)
    elif region == "buttock":
        draw.ellipse((cx-145, cy-80, cx, cy+150), fill=SKIN, outline=INK, width=5)
        draw.ellipse((cx, cy-80, cx+145, cy+150), fill=SKIN, outline=INK, width=5)
        draw.line([(cx-130, cy+25), (cx+130, cy+25)], fill=TEAL, width=7)
        draw.line([(cx-115, cy+75), (cx+115, cy+75)], fill=CORAL, width=7)
    elif region == "arm":
        draw.rounded_rectangle((cx-65, cy-190, cx+65, cy+190), radius=60, fill=SKIN, outline=INK, width=5)
        draw.line([(cx-45, cy-150), (cx-45, cy+145)], fill=TEAL, width=7)
        draw.line([(cx+8, cy-150), (cx+8, cy+145)], fill=CORAL, width=5)
    elif region == "fat":
        draw.ellipse((cx-130, cy-100, cx-20, cy+10), fill="#f2d37b", outline=INK, width=4)
        draw.ellipse((cx+20, cy-20, cx+130, cy+90), fill=SKIN, outline=INK, width=4)
        arrow(draw, (cx-10, cy-40), (cx+28, cy-5))


def anatomy_image(slug, title, region, labels):
    image = Image.new("RGB", (1200, 675), PALE)
    draw = ImageDraw.Draw(image)
    header(draw, f"{title}: relevant anatomy", "Anatomy")
    rounded(draw, (55, 175, 625, 625), fill=WHITE)
    draw_region(draw, region, (95, 195, 585, 605))
    rounded(draw, (660, 175, 1145, 625), fill=MINT, outline="#acd4cb")
    draw.text((700, 215), "Structures to discuss", font=font(25, True), fill=INK)
    for i, label in enumerate(labels):
        y = 285 + i*73
        draw.ellipse((700, y, 720, y+20), fill=CORAL if i % 2 else TEAL)
        draw.text((742, y-5), label, font=font(23), fill=INK)
    draw.text((700, 582), "Not to scale · no outcome implied", font=font(17), fill=MUTED)
    image.save(OUT / f"{slug}-anatomy.webp", "WEBP", quality=82, method=6)


def procedure_image(slug, title, region, steps):
    image = Image.new("RGB", (1200, 675), WHITE)
    draw = ImageDraw.Draw(image)
    header(draw, f"{title}: procedure concept", "Procedure")
    card_w = 326
    for i, step in enumerate(steps):
        x = 55 + i*380
        rounded(draw, (x, 195, x+card_w, 575), fill=PALE if i != 1 else MINT)
        draw.ellipse((x+24, 218, x+74, 268), fill=TEAL)
        draw.text((x+41, 226), str(i+1), font=font(22, True), fill=WHITE)
        for line_no, line in enumerate(wrap(step, width=23)):
            draw.text((x+25, 292 + line_no*30), line, font=font(21, True), fill=INK)
        # A compact tissue-plane motif keeps the process readable without
        # depicting a fabricated before/after result.
        cy = 454
        if i == 0:
            draw.ellipse((x+102, cy-60, x+224, cy+62), fill=SKIN, outline=INK, width=5)
            draw.line((x+115, cy, x+211, cy), fill=TEAL, width=8)
        elif i == 1:
            draw.ellipse((x+86, cy-52, x+170, cy+32), fill="#f2d37b", outline=INK, width=4)
            arrow(draw, (x+175, cy-10), (x+226, cy-10), width=6)
            draw.ellipse((x+235, cy-44, x+285, cy+6), fill=MINT, outline=TEAL, width=4)
        else:
            draw.rounded_rectangle((x+82, cy-68, x+282, cy+62), radius=28, fill=SKIN, outline=INK, width=5)
            draw.line((x+98, cy-24, x+266, cy-24), fill=TEAL, width=8)
            draw.line((x+98, cy+18, x+266, cy+18), fill=CORAL, width=7)
        if i < 2:
            arrow(draw, (x+335, 386), (x+373, 386), width=6)
    draw.text((55, 620), "The treating surgeon may recommend a different approach after examination.", font=font(18), fill=MUTED)
    image.save(OUT / f"{slug}-procedure.webp", "WEBP", quality=82, method=6)


def recovery_image(slug, title, milestones):
    image = Image.new("RGB", (1200, 675), PALE)
    draw = ImageDraw.Draw(image)
    header(draw, f"{title}: recovery pathway", "Recovery")
    draw.line([(125, 360), (1075, 360)], fill="#b7d9d2", width=12)
    for i, item in enumerate(milestones):
        x = 140 + i*300
        draw.ellipse((x-42, 318, x+42, 402), fill=TEAL if i < 3 else CORAL, outline=WHITE, width=6)
        draw.text((x-8, 335), str(i+1), font=font(22, True), fill=WHITE)
        rounded(draw, (x-112, 435, x+112, 548), fill=WHITE)
        bbox = draw.textbbox((0, 0), item, font=font(20, True))
        draw.text((x-(bbox[2]-bbox[0])/2, 463), item, font=font(20, True), fill=INK)
    rounded(draw, (55, 580, 1145, 640), fill=MINT, outline="#acd4cb", radius=18)
    draw.text((82, 598), "Discharge ≠ fitness to fly · seek help for procedure-specific warning signs", font=font(20, True), fill=INK)
    image.save(OUT / f"{slug}-recovery.webp", "WEBP", quality=82, method=6)


for slug, (title, region, labels, steps, milestones) in DATA.items():
    anatomy_image(slug, title, region, labels)
    procedure_image(slug, title, region, steps)
    recovery_image(slug, title, milestones)

print(f"Generated {len(DATA) * 3} WebP diagrams in {OUT}")
