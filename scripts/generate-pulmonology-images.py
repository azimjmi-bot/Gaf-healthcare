"""Generate original 1200×675 WebP patient-education diagrams for Pulmonology guides."""

from pathlib import Path
from textwrap import wrap

from PIL import Image, ImageDraw, ImageFont

OUT = Path(__file__).parents[1] / "public/images/cost/pulmonology"
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
GREEN = "#3fae6a"
LINE = "#c5d4e4"

DATA = {
    "bronchoscopy": {
        "title": "Bronchoscopy",
        "family": "bronchoscopy",
        "labels": [
            "Larynx and trachea",
            "Right and left main bronchi",
            "Flexible bronchoscope with camera",
            "Working channel at the sampling target",
        ],
        "steps": [
            "Pulmonology and CT review",
            "Fasting and medication check",
            "Local anaesthetic and sedation",
            "Flexible scope airway inspection",
            "Lavage, brushing or biopsy as agreed",
            "Monitored oxygen and sedation recovery",
        ],
        "milestones": [
            "Throat and sedation precautions",
            "Oxygen and bleeding watch",
            "Samples reach the right laboratory",
            "Visual and pathology review",
            "Individual travel clearance",
        ],
        "urgent": "Worsening breathlessness · chest pain · more than small blood streaks · fever with chills · blue lips",
    },
}


def font(size: int, bold: bool = False):
    paths = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
        if bold
        else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/liberation2/LiberationSans-Bold.ttf"
        if bold
        else "/usr/share/fonts/truetype/liberation2/LiberationSans-Regular.ttf",
    ]
    for path in paths:
        if Path(path).exists():
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def rounded(draw, box, fill=WHITE, outline=LINE, radius=24, width=3):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def header(draw, title, kicker):
    draw.text((58, 38), kicker.upper(), font=font(18, True), fill=TEAL)
    draw.text((58, 72), title, font=font(34, True), fill=INK)
    draw.text(
        (58, 124),
        "Patient-education schematic · anatomy and plans vary",
        font=font(19),
        fill=MUTED,
    )


def marker(draw, xy, number):
    x, y = xy
    color = TEAL if number % 2 else CORAL
    draw.ellipse((x - 15, y - 15, x + 15, y + 15), fill=color, outline=WHITE, width=3)
    draw.text((x - 6, y - 11), str(number), font=font(17, True), fill=WHITE)


def arrow(draw, start, end, color=NAVY, width=6):
    draw.line([start, end], fill=color, width=width)
    x, y = end
    draw.polygon([(x, y), (x - 16, y - 10), (x - 16, y + 10)], fill=color)


def lungs(draw, cx, cy, scale=1.0):
    """Stylised anterior respiratory tract with anatomically directional branching."""
    s = scale
    draw.ellipse(
        (cx - 190 * s, cy - 145 * s, cx - 15 * s, cy + 175 * s),
        fill=ROSE,
        outline=INK,
        width=4,
    )
    draw.ellipse(
        (cx + 15 * s, cy - 145 * s, cx + 190 * s, cy + 175 * s),
        fill=ROSE,
        outline=INK,
        width=4,
    )
    # Mediastinal notch and diaphragm
    draw.ellipse(
        (cx - 65 * s, cy - 30 * s, cx + 65 * s, cy + 150 * s),
        fill=PALE,
        outline=PALE,
    )
    draw.arc(
        (cx - 205 * s, cy + 85 * s, cx + 205 * s, cy + 215 * s),
        190,
        350,
        fill=NAVY,
        width=3,
    )
    # Larynx and trachea
    draw.rounded_rectangle(
        (cx - 30 * s, cy - 265 * s, cx + 30 * s, cy - 210 * s),
        radius=int(15 * s),
        fill=SKY,
        outline=INK,
        width=3,
    )
    draw.rectangle(
        (cx - 19 * s, cy - 212 * s, cx + 19 * s, cy - 70 * s),
        fill=SKY,
        outline=INK,
        width=3,
    )
    for y in range(int(cy - 195 * s), int(cy - 75 * s), max(8, int(18 * s))):
        draw.line([(cx - 18 * s, y), (cx + 18 * s, y)], fill="#9fbad2", width=2)
    # Main and lobar bronchi
    draw.line(
        [(cx, cy - 70 * s), (cx - 105 * s, cy + 15 * s)],
        fill=GOLD,
        width=int(14 * s),
    )
    draw.line(
        [(cx, cy - 70 * s), (cx + 105 * s, cy + 15 * s)],
        fill=GOLD,
        width=int(14 * s),
    )
    branches = [
        ((cx - 92 * s, cy + 4 * s), (cx - 160 * s, cy - 45 * s)),
        ((cx - 92 * s, cy + 4 * s), (cx - 160 * s, cy + 65 * s)),
        ((cx - 92 * s, cy + 4 * s), (cx - 120 * s, cy + 130 * s)),
        ((cx + 92 * s, cy + 4 * s), (cx + 160 * s, cy - 55 * s)),
        ((cx + 92 * s, cy + 4 * s), (cx + 160 * s, cy + 30 * s)),
        ((cx + 92 * s, cy + 4 * s), (cx + 120 * s, cy + 125 * s)),
    ]
    for start, end in branches:
        draw.line([start, end], fill=GOLD, width=int(8 * s))
    return {
        "larynx": (cx, cy - 240 * s),
        "carina": (cx, cy - 65 * s),
        "left": (cx - 105 * s, cy + 15 * s),
        "right": (cx + 105 * s, cy + 15 * s),
        "target": (cx + 160 * s, cy + 30 * s),
    }


def bronchoscopy_anatomy(draw, box):
    x0, y0, x1, y1 = box
    cx, cy = (x0 + x1) // 2, (y0 + y1) // 2 + 15
    anchors = lungs(draw, cx, cy, 0.78)
    # Flexible scope from mouth-side into right middle lobe.
    path = [
        (cx - 155, cy - 250),
        (cx - 60, cy - 230),
        (cx - 5, cy - 185),
        (cx, cy - 70),
        (cx + 82, cy),
        (cx + 130, cy + 20),
    ]
    draw.line(path, fill=NAVY, width=8, joint="curve")
    draw.ellipse((cx + 122, cy + 12, cx + 140, cy + 30), fill=GREEN, outline=WHITE, width=2)
    draw.line([(cx + 132, cy + 22), (cx + 160, cy + 30)], fill=GREEN, width=3)
    return [
        (anchors["larynx"][0] + 35, anchors["larynx"][1]),
        anchors["carina"],
        (cx - 105, cy - 225),
        (cx + 170, cy + 30),
    ]


def anatomy_image(slug, spec):
    image = Image.new("RGB", (1200, 675), PALE)
    draw = ImageDraw.Draw(image)
    header(draw, f"{spec['title']}: relevant anatomy", "Anatomy")
    rounded(draw, (55, 165, 640, 635), fill=WHITE)
    anchors = bronchoscopy_anatomy(draw, (85, 185, 610, 615))
    for index, xy in enumerate(anchors):
        marker(draw, xy, index + 1)
    rounded(draw, (670, 165, 1145, 635), fill=SKY, outline="#a8c4de")
    draw.text((705, 200), "Structures to discuss", font=font(25, True), fill=INK)
    for index, label in enumerate(spec["labels"]):
        y = 262 + index * 82
        marker(draw, (720, y + 12), index + 1)
        for line_number, line in enumerate(wrap(label, width=30)[:2]):
            draw.text((748, y - 2 + line_number * 26), line, font=font(21), fill=INK)
    draw.text((705, 596), "Not to scale · no outcome implied", font=font(17), fill=MUTED)
    image.save(OUT / f"{slug}-anatomy.webp", "WEBP", quality=82, method=6)


def step_icon(draw, box, index):
    x0, y0, x1, y1 = box
    cx, cy = (x0 + x1) // 2, (y0 + y1) // 2
    if index == 0:
        draw.rounded_rectangle((cx - 22, cy - 28, cx + 22, cy + 28), 6, WHITE, NAVY, 3)
        for offset in (-12, 0, 12):
            draw.line([(cx - 12, cy + offset), (cx + 12, cy + offset)], fill=LINE, width=3)
    elif index == 1:
        draw.ellipse((cx - 25, cy - 25, cx + 25, cy + 25), fill=WHITE, outline=NAVY, width=3)
        draw.line([(cx - 17, cy), (cx + 17, cy)], fill=TEAL, width=4)
    elif index == 2:
        draw.arc((cx - 28, cy - 22, cx + 28, cy + 28), 200, 340, fill=NAVY, width=6)
        draw.ellipse((cx - 7, cy - 28, cx + 7, cy - 14), fill=GOLD)
    elif index == 3:
        draw.line([(cx - 28, cy - 24), (cx + 24, cy + 20)], fill=NAVY, width=7)
        draw.ellipse((cx + 17, cy + 13, cx + 31, cy + 27), fill=GREEN)
    elif index == 4:
        draw.ellipse((cx - 25, cy - 25, cx + 25, cy + 25), fill=ROSE, outline=CORAL, width=3)
        draw.line([(cx - 30, cy), (cx + 30, cy)], fill=NAVY, width=4)
    else:
        draw.rounded_rectangle((cx - 30, cy - 8, cx + 30, cy + 18), 6, SKY, NAVY, 3)
        draw.rectangle((cx - 30, cy - 24, cx - 8, cy - 8), fill=CORAL)


def procedure_image(slug, spec):
    image = Image.new("RGB", (1200, 675), WHITE)
    draw = ImageDraw.Draw(image)
    header(draw, f"{spec['title']}: procedure pathway", "Procedure")
    for index, step in enumerate(spec["steps"]):
        column, row = index % 3, index // 3
        x, y = 55 + column * 375, 170 + row * 225
        rounded(draw, (x, y, x + 340, y + 200), fill=PALE if row == 0 else SKY)
        draw.ellipse((x + 20, y + 18, x + 62, y + 60), fill=NAVY)
        draw.text((x + 34, y + 27), str(index + 1), font=font(20, True), fill=WHITE)
        step_icon(draw, (x + 250, y + 10, x + 330, y + 80), index)
        for line_number, line in enumerate(wrap(step, width=26)[:3]):
            draw.text((x + 22, y + 88 + line_number * 29), line, font=font(20, True), fill=INK)
        if column < 2:
            arrow(draw, (x + 344, y + 100), (x + 370, y + 100), width=5)
    draw.text(
        (55, 630),
        "The respiratory team may change the plan after examination, imaging and consent.",
        font=font(18),
        fill=MUTED,
    )
    image.save(OUT / f"{slug}-procedure.webp", "WEBP", quality=82, method=6)


def recovery_image(slug, spec):
    image = Image.new("RGB", (1200, 675), PALE)
    draw = ImageDraw.Draw(image)
    header(draw, f"{spec['title']}: recovery and results", "Recovery")
    draw.text(
        (58, 175),
        "Discharge ≠ fitness to fly · timings depend on respiratory status and samples",
        font=font(18),
        fill=MUTED,
    )
    draw.line([(110, 290), (1090, 290)], fill="#b7cce0", width=12)
    count = len(spec["milestones"])
    for index, item in enumerate(spec["milestones"]):
        x = 120 + index * (960 // (count - 1))
        draw.ellipse(
            (x - 38, 252, x + 38, 328),
            fill=NAVY if index < count - 1 else CORAL,
            outline=WHITE,
            width=6,
        )
        draw.text((x - 7, 276), str(index + 1), font=font(21, True), fill=WHITE)
        rounded(draw, (x - 100, 355, x + 100, 475), fill=WHITE)
        lines = wrap(item, width=17)[:3]
        top = 402 if len(lines) == 1 else 390 if len(lines) == 2 else 378
        for line_number, line in enumerate(lines):
            bounds = draw.textbbox((0, 0), line, font=font(18, True))
            draw.text(
                (x - (bounds[2] - bounds[0]) / 2, top + line_number * 25),
                line,
                font=font(18, True),
                fill=INK,
            )
    rounded(draw, (55, 520, 1145, 640), fill="#fdf1ef", outline=CORAL, radius=18)
    draw.text((82, 540), "Seek urgent respiratory review for:", font=font(19, True), fill=CORAL)
    for line_number, line in enumerate(wrap(spec["urgent"], width=95)[:2]):
        draw.text((82, 572 + line_number * 26), line, font=font(19), fill=INK)
    image.save(OUT / f"{slug}-recovery.webp", "WEBP", quality=82, method=6)


for slug, specification in DATA.items():
    anatomy_image(slug, specification)
    procedure_image(slug, specification)
    recovery_image(slug, specification)

print(f"Generated {len(DATA) * 3} WebP diagrams in {OUT}")
