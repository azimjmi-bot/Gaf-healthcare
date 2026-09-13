"""Generate three original patient-education diagrams for the Gynecology pilot."""

from pathlib import Path
from textwrap import wrap

from PIL import Image, ImageDraw, ImageFont

OUT = Path(__file__).parents[1] / "public/images/cost/gynecology"
OUT.mkdir(parents=True, exist_ok=True)

WIDTH, HEIGHT = 1200, 675
NAVY = "#123B70"
TEAL = "#058A91"
CYAN = "#DDF5F5"
PALE = "#F5FAFC"
INK = "#142A43"
MUTED = "#526A7C"
WHITE = "#FFFFFF"
ROSE = "#E9848C"
LIGHT_ROSE = "#F8DADD"
GOLD = "#E3A72F"
GREEN = "#4E9C76"


def font(size: int, bold: bool = False):
    candidates = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
        if bold
        else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/liberation2/LiberationSans-Bold.ttf"
        if bold
        else "/usr/share/fonts/truetype/liberation2/LiberationSans-Regular.ttf",
    ]
    for candidate in candidates:
        if Path(candidate).exists():
            return ImageFont.truetype(candidate, size)
    return ImageFont.load_default()


def rounded(draw, box, fill=WHITE, outline="#B9D6DF", radius=22, width=3):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def title(draw, kicker, heading, subtitle):
    draw.text((54, 34), kicker.upper(), font=font(18, True), fill=TEAL)
    draw.text((54, 67), heading, font=font(34, True), fill=NAVY)
    draw.text((54, 116), subtitle, font=font(18), fill=MUTED)


def centred(draw, x, y, text, size=18, color=INK, bold=False):
    face = font(size, bold)
    bounds = draw.textbbox((0, 0), text, font=face)
    draw.text((x - (bounds[2] - bounds[0]) / 2, y), text, font=face, fill=color)


def arrow(draw, start, end, color=TEAL, width=6):
    draw.line((start, end), fill=color, width=width)
    x, y = end
    draw.polygon(((x, y), (x - 15, y - 9), (x - 15, y + 9)), fill=color)


def pelvis(draw, cx, cy, scale=1.0, ovaries=True):
    """Simple frontal reproductive anatomy, deliberately schematic and not to scale."""
    # Uterus and cervix
    points = [
        (cx - 62 * scale, cy - 70 * scale),
        (cx - 48 * scale, cy + 10 * scale),
        (cx - 19 * scale, cy + 56 * scale),
        (cx - 13 * scale, cy + 102 * scale),
        (cx + 13 * scale, cy + 102 * scale),
        (cx + 19 * scale, cy + 56 * scale),
        (cx + 48 * scale, cy + 10 * scale),
        (cx + 62 * scale, cy - 70 * scale),
    ]
    draw.polygon(points, fill=ROSE, outline=NAVY)
    draw.ellipse(
        (cx - 62 * scale, cy - 96 * scale, cx + 62 * scale, cy + 35 * scale),
        fill=ROSE,
        outline=NAVY,
        width=max(2, int(3 * scale)),
    )
    draw.rounded_rectangle(
        (cx - 17 * scale, cy + 50 * scale, cx + 17 * scale, cy + 113 * scale),
        radius=int(11 * scale),
        fill=LIGHT_ROSE,
        outline=NAVY,
        width=max(2, int(3 * scale)),
    )
    # Tubes and fimbriae
    for side in (-1, 1):
        start = (cx + side * 48 * scale, cy - 50 * scale)
        mid = (cx + side * 104 * scale, cy - 89 * scale)
        end = (cx + side * 146 * scale, cy - 58 * scale)
        draw.line((start, mid, end), fill=TEAL, width=max(3, int(7 * scale)))
        for dy in (-13, 0, 13):
            draw.line(
                (
                    end,
                    (end[0] + side * 18 * scale, end[1] + dy * scale),
                ),
                fill=TEAL,
                width=max(2, int(4 * scale)),
            )
        if ovaries:
            draw.ellipse(
                (
                    cx + side * 166 * scale - 22 * scale,
                    cy - 43 * scale,
                    cx + side * 166 * scale + 22 * scale,
                    cy + 9 * scale,
                ),
                fill=GOLD,
                outline=NAVY,
                width=max(2, int(3 * scale)),
            )


def anatomy():
    image = Image.new("RGB", (WIDTH, HEIGHT), PALE)
    draw = ImageDraw.Draw(image)
    title(
        draw,
        "Anatomy",
        "Hysterectomy: name every structure",
        "Total refers to uterus + cervix — ovarian conservation is a separate decision",
    )
    rounded(draw, (45, 170, 680, 625))
    pelvis(draw, 325, 365, 1.15)
    labels = [
        ("Fallopian tubes", (163, 222), (210, 274), TEAL),
        ("Ovaries", (76, 344), (125, 361), GOLD),
        ("Uterus", (490, 310), (388, 355), ROSE),
        ("Cervix", (500, 478), (352, 478), NAVY),
    ]
    for text, label_pos, target, color in labels:
        draw.line((label_pos[0] + 120, label_pos[1] + 13, target[0], target[1]), fill=color, width=3)
        draw.text(label_pos, text, font=font(19, True), fill=INK)
    rounded(draw, (715, 170, 1155, 625), fill=CYAN, outline="#9DCFD2")
    draw.text((752, 207), "Removal plan", font=font(26, True), fill=NAVY)
    rows = [
        ("1", "Total hysterectomy", "Uterus + cervix"),
        ("2", "Tube decision", "Separate consent"),
        ("3", "Ovary decision", "Remove or conserve"),
        ("4", "Left and right", "Record each side"),
    ]
    for index, (number, heading, note) in enumerate(rows):
        y = 275 + index * 78
        draw.ellipse((752, y, 790, y + 38), fill=NAVY if index < 2 else TEAL)
        centred(draw, 771, y + 7, number, 18, WHITE, True)
        draw.text((810, y - 2), heading, font=font(19, True), fill=INK)
        draw.text((810, y + 27), note, font=font(17), fill=MUTED)
    draw.text((752, 580), "Schematic · not to scale", font=font(16), fill=MUTED)
    image.save(
        OUT / "laparoscopic-hysterectomy-anatomy.webp",
        "WEBP",
        quality=86,
        method=6,
    )


def procedure_icon(draw, x, y, kind):
    if kind == "review":
        draw.rounded_rectangle((x - 34, y - 42, x + 34, y + 42), radius=7, fill=WHITE, outline=NAVY, width=3)
        draw.line((x - 18, y - 15, x + 18, y - 15), fill=TEAL, width=4)
        draw.line((x - 18, y + 3, x + 13, y + 3), fill=TEAL, width=4)
        draw.line((x - 18, y + 21, x + 20, y + 21), fill=TEAL, width=4)
    elif kind == "imaging":
        pelvis(draw, x, y + 10, 0.35)
        draw.ellipse((x - 75, y - 65, x + 75, y + 70), outline=TEAL, width=4)
    elif kind == "ports":
        draw.ellipse((x - 62, y - 56, x + 62, y + 65), fill=LIGHT_ROSE, outline=NAVY, width=3)
        for px, py in [(-34, -13), (0, 28), (36, -13)]:
            draw.ellipse((x + px - 7, y + py - 7, x + px + 7, y + py + 7), fill=TEAL)
    elif kind == "control":
        draw.line((x - 70, y, x + 70, y), fill=ROSE, width=15)
        draw.line((x - 16, y - 42, x - 4, y + 40), fill=NAVY, width=6)
        draw.line((x + 16, y - 42, x + 4, y + 40), fill=NAVY, width=6)
        draw.ellipse((x - 10, y - 10, x + 10, y + 10), fill=GOLD)
    elif kind == "remove":
        pelvis(draw, x - 15, y - 10, 0.32)
        arrow(draw, (x + 10, y + 25), (x + 72, y + 25), GOLD, 5)
    else:
        draw.ellipse((x - 52, y - 48, x + 52, y + 48), fill=WHITE, outline=NAVY, width=4)
        draw.line((x - 25, y - 7, x - 5, y + 14, x + 30, y - 24), fill=GREEN, width=7)


def procedure():
    image = Image.new("RGB", (WIDTH, HEIGHT), WHITE)
    draw = ImageDraw.Draw(image)
    title(
        draw,
        "Procedure",
        "Laparoscopic hysterectomy pathway",
        "Six checkpoints from individualized assessment to labelled pathology",
    )
    steps = [
        ("Review", "Records + goals", "review"),
        ("Image", "Map anatomy", "imaging"),
        ("Ports", "Camera access", "ports"),
        ("Control", "Vessels + pedicles", "control"),
        ("Remove", "Planned organs", "remove"),
        ("Pathology", "Label + review", "pathology"),
    ]
    card_width = 172
    for index, (heading, note, kind) in enumerate(steps):
        x = 40 + index * 192
        rounded(
            draw,
            (x, 185, x + card_width, 558),
            fill=CYAN if index in (2, 3) else PALE,
            outline="#9FC9D2",
            radius=20,
        )
        draw.ellipse((x + 16, 202, x + 56, 242), fill=NAVY if index < 4 else TEAL)
        centred(draw, x + 36, 210, str(index + 1), 18, WHITE, True)
        centred(draw, x + 86, 267, heading, 20, INK, True)
        procedure_icon(draw, x + 86, 382, kind)
        for line_index, line in enumerate(wrap(note, width=16)):
            centred(draw, x + 86, 492 + line_index * 24, line, 17, MUTED, True)
        if index < len(steps) - 1:
            arrow(draw, (x + 174, 370), (x + 190, 370), TEAL, 4)
    rounded(draw, (40, 586, 1160, 642), fill=NAVY, outline=NAVY, radius=16)
    centred(
        draw,
        600,
        602,
        "Unexpected anatomy or bleeding may require a changed plan or open conversion",
        19,
        WHITE,
        True,
    )
    image.save(
        OUT / "laparoscopic-hysterectomy-procedure.webp",
        "WEBP",
        quality=86,
        method=6,
    )


def recovery_icon(draw, x, y, kind):
    if kind == "monitor":
        draw.line((x - 45, y, x - 20, y, x - 8, y - 25, x + 8, y + 25, x + 21, y, x + 48, y), fill=TEAL, width=5)
    elif kind == "walk":
        draw.ellipse((x - 8, y - 48, x + 8, y - 32), fill=NAVY)
        draw.line((x, y - 30, x - 8, y + 8, x + 22, y + 25), fill=NAVY, width=6)
        draw.line((x - 7, y + 7, x - 28, y + 45), fill=NAVY, width=6)
        draw.line((x + 14, y + 18, x + 2, y + 49), fill=NAVY, width=6)
    elif kind == "wound":
        draw.rounded_rectangle((x - 48, y - 35, x + 48, y + 35), radius=15, fill=LIGHT_ROSE, outline=NAVY, width=3)
        draw.rectangle((x - 18, y - 8, x + 18, y + 8), fill=WHITE, outline=TEAL, width=3)
    else:
        draw.rounded_rectangle((x - 38, y - 48, x + 38, y + 48), radius=7, fill=WHITE, outline=NAVY, width=3)
        draw.line((x - 21, y - 18, x + 21, y - 18), fill=TEAL, width=4)
        draw.line((x - 21, y, x + 15, y), fill=TEAL, width=4)
        draw.line((x - 21, y + 18, x + 21, y + 18), fill=TEAL, width=4)


def recovery():
    image = Image.new("RGB", (WIDTH, HEIGHT), PALE)
    draw = ImageDraw.Draw(image)
    title(
        draw,
        "Recovery",
        "Recovery is a monitored pathway",
        "Hospital milestones, nearby review and handover — not a fixed flight date",
    )
    stages = [
        ("Monitor", "Pain · bladder", "monitor"),
        ("Mobilize", "Walk · VTE plan", "walk"),
        ("Wound care", "Ports · bleeding", "wound"),
        ("Pathology", "Result review", "report"),
        ("Follow-up", "Handover home", "report"),
    ]
    draw.line((120, 346, 1080, 346), fill="#A9D4D6", width=12)
    for index, (heading, note, kind) in enumerate(stages):
        x = 120 + index * 240
        draw.ellipse((x - 40, 306, x + 40, 386), fill=NAVY if index < 3 else TEAL, outline=WHITE, width=6)
        centred(draw, x, 326, str(index + 1), 20, WHITE, True)
        rounded(draw, (x - 95, 176, x + 95, 290), fill=WHITE, outline="#AFCED7")
        recovery_icon(draw, x, 233, kind)
        centred(draw, x, 422, heading, 20, INK, True)
        centred(draw, x, 455, note, 17, MUTED)
    rounded(draw, (55, 520, 1145, 630), fill=CYAN, outline="#9DCFD2", radius=20)
    draw.text((83, 545), "Urgent review", font=font(20, True), fill=NAVY)
    draw.text(
        (83, 579),
        "Heavy bleeding · fever · worsening pain · breathlessness · leg swelling · urinary difficulty",
        font=font(18, True),
        fill=INK,
    )
    draw.text((900, 545), "Travel only after clearance", font=font(17, True), fill=TEAL)
    image.save(
        OUT / "laparoscopic-hysterectomy-recovery.webp",
        "WEBP",
        quality=86,
        method=6,
    )


DATA = {
    "robotic-hysterectomy": ("Robotic hysterectomy", "robot", ["Uterus + cervix", "Tubes separate", "Ovaries separate", "Robotic ports"], ["Review scope", "Plan ports", "Dock robot", "Console surgery", "Remove tissue", "Pathology"], ["Port checks", "Walk + VTE", "Cuff care", "Pathology", "Follow-up"]),
    "vaginal-hysterectomy": ("Vaginal hysterectomy", "vaginal", ["Uterine descent", "Vaginal route", "Bladder", "Rectum"], ["Assess prolapse", "Confirm route", "Control pedicles", "Remove uterus", "Close + support", "Pathology"], ["Bladder check", "Bleeding watch", "Mobility", "Cuff review", "Pathology"]),
    "abdominal-hysterectomy": ("Abdominal hysterectomy", "open", ["Laparotomy", "Uterus", "Bladder + bowel", "Pelvic vessels"], ["Assess anatomy", "Plan incision", "Open exposure", "Control vessels", "Remove scope", "Pathology"], ["Ward monitor", "Walk + VTE", "Bowel + bladder", "Wound care", "Pathology"]),
    "laparoscopic-myomectomy": ("Laparoscopic myomectomy", "fibroids", ["Subserosal", "Intramural", "Cavity relation", "Uterus retained"], ["Map FIGO type", "Place ports", "Open uterine wall", "Remove fibroid", "Layered repair", "Pathology"], ["Bleeding check", "Port care", "Uterine healing", "Pathology", "Pregnancy advice"]),
    "robotic-myomectomy": ("Robotic myomectomy", "robot-fibroids", ["Mapped fibroids", "Uterine layers", "Robotic arms", "Uterus retained"], ["Map FIGO type", "Dock robot", "Console incision", "Enucleate", "Layered repair", "Pathology"], ["Port checks", "Anaemia review", "Uterine healing", "Pathology", "Pregnancy advice"]),
    "hysteroscopic-myomectomy": ("Hysteroscopic myomectomy", "cavity-fibroid", ["Cavity fibroid", "Myometrium", "Hysteroscope", "Fluid inflow"], ["Map FIGO type", "Cervical entry", "Track fluid", "Resect directly", "Check cavity", "Pathology"], ["Fluid balance", "Bleeding watch", "Perforation signs", "Pathology", "Stage if needed"]),
    "endometriosis-surgery": ("Endometriosis surgery", "endometriosis", ["Superficial lesion", "Deep disease", "Endometrioma", "Adhesions"], ["Map disease", "Plan teams", "Laparoscopy", "Treat lesions", "Check organs", "Pathology"], ["Pain review", "Organ function", "Port care", "Pathology", "Reserve + follow-up"]),
    "hysteroscopic-polypectomy": ("Hysteroscopic polypectomy", "polyp", ["Endometrial polyp", "Polyp base", "Uterine cavity", "Hysteroscope"], ["Review imaging", "Enter cervix", "Track fluid", "Resect base", "Retrieve tissue", "Pathology"], ["Fluid balance", "Cramp care", "Bleeding watch", "Pathology", "Follow-up"]),
    "ovarian-cyst-surgery": ("Ovarian cyst surgery", "cyst", ["Ovarian cyst", "Preserved ovary", "Fallopian tube", "Torsion warning"], ["Assess imaging", "Check urgency", "Plan preservation", "Separate cyst", "Control bleeding", "Pathology"], ["Bleeding check", "Wound care", "Ovary review", "Pathology", "Follow-up"]),
    "oophorectomy": ("Oophorectomy", "ovary", ["Left ovary", "Right ovary", "Ureter", "One vs both"], ["Confirm side", "Hormone review", "Identify ureter", "Control supply", "Remove ovary", "Pathology"], ["Wound care", "Bleeding watch", "Pathology", "Hormone plan", "Follow-up"]),
    "salpingo-oophorectomy": ("Salpingo-oophorectomy", "adnexa", ["Tube + ovary", "Left side", "Right side", "Ureter"], ["Confirm sides", "Genetics review", "Identify ureter", "Control supply", "Remove adnexa", "Pathology"], ["Wound care", "Bleeding watch", "Pathology", "Menopause plan", "Follow-up"]),
    "pelvic-organ-prolapse-surgery": ("Pelvic organ prolapse surgery", "prolapse", ["Anterior wall", "Apical support", "Posterior wall", "Pessary option"], ["Map compartments", "Discuss pessary", "Select support", "Repair defect", "Check bladder", "Follow-up"], ["Voiding check", "Bowel care", "Lifting limits", "Mesh review", "Recurrence review"]),
    "pelvic-floor-repair": ("Pelvic floor repair", "floor", ["Cystocele", "Rectocele", "Perineal body", "Apical check"], ["Map symptoms", "Examine defects", "Discuss therapy", "Select repair", "Check function", "Follow-up"], ["Voiding check", "Bowel function", "Perineal care", "Activity limits", "Symptom review"]),
    "gynecologic-cancer-surgery": ("Gynecologic cancer surgery", "cancer", ["Primary tumour", "Pelvic nodes", "Omentum", "Peritoneum"], ["Confirm type", "Stage imaging", "Team review", "Surgery + nodes", "Stage/debulk", "Final pathology"], ["Organ monitor", "VTE prevention", "Nutrition + wound", "Final stage", "Next therapy"]),
}


def disease_diagram(draw, kind, cx, cy):
    """Procedure-specific anatomy or disease overlay; conceptual and not to scale."""
    if kind in {"prolapse", "floor"}:
        draw.ellipse((cx - 135, cy - 115, cx + 120, cy + 125), fill=LIGHT_ROSE, outline=NAVY, width=4)
        draw.line((cx - 30, cy - 90, cx - 55, cy + 85), fill=TEAL, width=12)
        draw.line((cx + 35, cy - 80, cx + 60, cy + 88), fill=ROSE, width=12)
        draw.arc((cx - 85, cy + 20, cx + 90, cy + 145), 185, 350, fill=GOLD, width=8)
        if kind == "prolapse":
            arrow(draw, (cx, cy - 15), (cx, cy + 105), ROSE, 7)
        else:
            draw.line((cx - 95, cy + 92, cx + 95, cy + 92), fill=TEAL, width=10)
        return
    pelvis(draw, cx, cy + 15, 0.72)
    if kind in {"fibroids", "robot-fibroids", "cavity-fibroid"}:
        spots = [(-38, -32, 24), (30, 12, 19), (3, -65, 16)]
        for dx, dy, radius in spots:
            draw.ellipse((cx + dx - radius, cy + dy - radius, cx + dx + radius, cy + dy + radius), fill=GOLD, outline=NAVY, width=3)
    if kind == "cavity-fibroid":
        draw.line((cx - 150, cy - 90, cx - 45, cy - 25), fill=TEAL, width=8)
    elif kind == "polyp":
        draw.ellipse((cx - 20, cy - 42, cx + 24, cy + 18), fill=GOLD, outline=NAVY, width=3)
        draw.line((cx, cy + 18, cx, cy + 48), fill=GOLD, width=6)
    elif kind == "endometriosis":
        for dx, dy in [(-115, -25), (92, 38), (-28, 65), (125, -55)]:
            draw.ellipse((cx + dx - 10, cy + dy - 10, cx + dx + 10, cy + dy + 10), fill=NAVY)
        draw.ellipse((cx + 85, cy - 28, cx + 135, cy + 30), fill=ROSE, outline=GOLD, width=7)
    elif kind == "cyst":
        draw.ellipse((cx + 72, cy - 48, cx + 154, cy + 42), fill=CYAN, outline=NAVY, width=5)
        draw.arc((cx + 55, cy - 78, cx + 165, cy + 65), 30, 310, fill=ROSE, width=5)
    elif kind == "ovary":
        draw.line((cx - 155, cy - 45, cx - 105, cy + 15), fill=ROSE, width=8)
        draw.ellipse((cx - 175, cy - 72, cx - 125, cy - 12), outline=NAVY, width=5)
    elif kind == "adnexa":
        draw.rounded_rectangle((cx + 72, cy - 85, cx + 190, cy + 55), radius=20, outline=GOLD, width=6)
    elif kind == "robot" or kind == "robot-fibroids":
        for x in (cx - 120, cx + 120):
            draw.line((x, cy - 135, x // 2 + cx // 2, cy - 30), fill=NAVY, width=9)
            draw.ellipse((x - 10, cy - 145, x + 10, cy - 125), fill=TEAL)
    elif kind == "vaginal":
        arrow(draw, (cx, cy - 10), (cx, cy + 155), ROSE, 8)
    elif kind == "open":
        draw.line((cx - 135, cy + 135, cx + 135, cy + 135), fill=ROSE, width=10)
        draw.line((cx, cy + 95, cx, cy + 172), fill=NAVY, width=5)
    elif kind == "cancer":
        draw.ellipse((cx - 34, cy - 55, cx + 35, cy + 20), fill=NAVY, outline=GOLD, width=5)
        for dx, dy in [(-115, 65), (-80, 90), (85, 90), (120, 65)]:
            draw.ellipse((cx + dx - 9, cy + dy - 9, cx + dx + 9, cy + dy + 9), fill=TEAL)


def generic_anatomy(slug, spec):
    heading, kind, labels, _, _ = spec
    image = Image.new("RGB", (WIDTH, HEIGHT), PALE)
    draw = ImageDraw.Draw(image)
    title(draw, "Anatomy", f"{heading}: anatomy and scope", "Procedure-specific schematic · individualized plans vary")
    rounded(draw, (45, 170, 680, 625))
    disease_diagram(draw, kind, 350, 370)
    rounded(draw, (715, 170, 1155, 625), fill=CYAN, outline="#9DCFD2")
    draw.text((752, 207), "Key distinctions", font=font(26, True), fill=NAVY)
    for index, label in enumerate(labels):
        y = 282 + index * 72
        draw.ellipse((752, y, 790, y + 38), fill=NAVY if index < 2 else TEAL)
        centred(draw, 771, y + 7, str(index + 1), 18, WHITE, True)
        draw.text((810, y + 5), label, font=font(18, True), fill=INK)
    draw.text((752, 580), "Conceptual · not to scale", font=font(16), fill=MUTED)
    image.save(OUT / f"{slug}-anatomy.webp", "WEBP", quality=86, method=6)


def generic_procedure(slug, spec):
    heading, kind, _, steps, _ = spec
    image = Image.new("RGB", (WIDTH, HEIGHT), WHITE)
    draw = ImageDraw.Draw(image)
    title(draw, "Procedure", f"{heading}: planned pathway", "Six checkpoints · scope can change after clinical review")
    for index, step in enumerate(steps):
        x = 40 + index * 192
        rounded(draw, (x, 185, x + 172, 558), fill=CYAN if index in (2, 3) else PALE)
        draw.ellipse((x + 16, 202, x + 56, 242), fill=NAVY if index < 4 else TEAL)
        centred(draw, x + 36, 210, str(index + 1), 18, WHITE, True)
        for line_index, line in enumerate(wrap(step, width=15)):
            centred(draw, x + 86, 274 + line_index * 25, line, 18, INK, True)
        draw.ellipse((x + 42, 350, x + 130, 438), fill=WHITE, outline=TEAL, width=4)
        symbol = {
            "robot": "CONSOLE", "robot-fibroids": "ROBOT", "vaginal": "VAGINAL",
            "open": "OPEN", "fibroids": "FIBROID", "cavity-fibroid": "CAVITY",
            "endometriosis": "LESIONS", "polyp": "POLYP", "cyst": "CYST",
            "ovary": "OVARY", "adnexa": "TUBE + OVARY", "prolapse": "SUPPORT",
            "floor": "REPAIR", "cancer": "STAGING",
        }[kind]
        centred(draw, x + 86, 386, symbol, 13, NAVY, True)
        if index < 5:
            arrow(draw, (x + 174, 365), (x + 190, 365), TEAL, 4)
    rounded(draw, (40, 586, 1160, 642), fill=NAVY, outline=NAVY, radius=16)
    centred(draw, 600, 602, "Assessment, consent and safety findings determine the final procedure", 19, WHITE, True)
    image.save(OUT / f"{slug}-procedure.webp", "WEBP", quality=86, method=6)


def generic_recovery(slug, spec):
    heading, _, _, _, stages = spec
    image = Image.new("RGB", (WIDTH, HEIGHT), PALE)
    draw = ImageDraw.Draw(image)
    title(draw, "Recovery", f"{heading}: recovery pathway", "Monitoring, pathology and handover · no fixed flight date")
    draw.line((120, 346, 1080, 346), fill="#A9D4D6", width=12)
    for index, (x, stage) in enumerate(zip(range(120, 1081, 240), stages)):
        rounded(draw, (x - 95, 185, x + 95, 286), fill=WHITE)
        recovery_icon(draw, x, 235, ["monitor", "walk", "wound", "report", "report"][index])
        draw.ellipse((x - 40, 306, x + 40, 386), fill=NAVY if index < 3 else TEAL, outline=WHITE, width=6)
        centred(draw, x, 326, str(index + 1), 20, WHITE, True)
        for line_index, line in enumerate(wrap(stage, width=17)):
            centred(draw, x, 425 + line_index * 25, line, 18, INK, True)
    rounded(draw, (55, 530, 1145, 630), fill=CYAN, outline="#9DCFD2", radius=20)
    centred(draw, 600, 552, "Urgent symptoms need local review · travel requires treating-team clearance", 19, NAVY, True)
    centred(draw, 600, 588, "Written procedure-specific instructions take priority", 17, MUTED)
    image.save(OUT / f"{slug}-recovery.webp", "WEBP", quality=86, method=6)


for existing in OUT.iterdir():
    if existing.is_file():
        existing.unlink()

anatomy()
procedure()
recovery()
for slug, details in DATA.items():
    generic_anatomy(slug, details)
    generic_procedure(slug, details)
    generic_recovery(slug, details)

print(f"Generated exactly {3 + len(DATA) * 3} WebP diagrams in {OUT}")
