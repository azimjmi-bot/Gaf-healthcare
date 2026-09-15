"""Generate original 1200×675 WebP patient-education diagrams for Surgical Oncology guides.

Three diagrams per procedure, matching the alt text declared in
``src/data/cost-articles/surgical-oncology.ts``:

* ``-anatomy``   relevant anatomy, the surgical target and the structures preserved
* ``-procedure`` resection-scope comparison, because scope is what moves the estimate
* ``-recovery``  the recovery, pathology and rehabilitation pathway

Schematics are stylised and not to scale; nothing here implies an outcome.
"""

from pathlib import Path
from textwrap import wrap

from PIL import Image, ImageDraw, ImageFont

OUT = Path(__file__).parents[1] / "public/images/cost/surgical-oncology"
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
MINT = "#d9f0e5"
LINE = "#c5d4e4"


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
    size = 34
    while size > 21:
        candidate = font(size, True)
        bounds = draw.textbbox((0, 0), title, font=candidate)
        if bounds[2] - bounds[0] <= 1084:
            break
        size -= 1
    draw.text((58, 72), title, font=font(size, True), fill=INK)
    draw.text(
        (58, 124),
        "Patient-education schematic · scope and plans vary by individual",
        font=font(19),
        fill=MUTED,
    )


def fit_lines(draw, text, max_width, max_lines=4, size=18):
    """Wrap without splitting words, shrinking the font until every line fits."""
    while True:
        candidate = font(size, True)
        average = max(6.0, draw.textlength(text, font=candidate) / max(1, len(text)))
        lines = wrap(text, width=max(6, int(max_width / average)), break_long_words=False)
        fits = len(lines) <= max_lines and all(
            draw.textlength(line, font=candidate) <= max_width for line in lines
        )
        if fits or size <= 13:
            return lines[:max_lines], candidate
        size -= 1


def marker(draw, xy, number, color=None):
    x, y = xy
    fill = color or (TEAL if number % 2 else CORAL)
    draw.ellipse((x - 15, y - 15, x + 15, y + 15), fill=fill, outline=WHITE, width=3)
    draw.text((x - 6, y - 11), str(number), font=font(17, True), fill=WHITE)


def dashed_line(draw, start, end, fill=INK, width=3, dash=11, gap=8):
    (x0, y0), (x1, y1) = start, end
    length = max(1.0, ((x1 - x0) ** 2 + (y1 - y0) ** 2) ** 0.5)
    ux, uy = (x1 - x0) / length, (y1 - y0) / length
    position = 0.0
    while position < length:
        span = min(dash, length - position)
        draw.line(
            [
                (x0 + ux * position, y0 + uy * position),
                (x0 + ux * (position + span), y0 + uy * (position + span)),
            ],
            fill=fill,
            width=width,
        )
        position += dash + gap


def dashed_rect(draw, box, fill=INK, width=3):
    x0, y0, x1, y1 = box
    dashed_line(draw, (x0, y0), (x1, y0), fill, width)
    dashed_line(draw, (x1, y0), (x1, y1), fill, width)
    dashed_line(draw, (x1, y1), (x0, y1), fill, width)
    dashed_line(draw, (x0, y1), (x0, y0), fill, width)


def dashed_ellipse(draw, box, fill=INK, width=3, steps=34):
    from math import cos, pi, sin

    x0, y0, x1, y1 = box
    cx, cy = (x0 + x1) / 2, (y0 + y1) / 2
    rx, ry = (x1 - x0) / 2, (y1 - y0) / 2
    for index in range(steps):
        if index % 2:
            continue
        a0 = 2 * pi * index / steps
        a1 = 2 * pi * (index + 1) / steps
        draw.line(
            [(cx + rx * cos(a0), cy + ry * sin(a0)), (cx + rx * cos(a1), cy + ry * sin(a1))],
            fill=fill,
            width=width,
        )


# --------------------------------------------------------------------------- anatomy


def thyroid_anatomy(draw, box):
    """Anterior neck: lobes astride the trachea, the nerves and glands at risk, node levels."""
    x0, y0, x1, y1 = box
    cx, cy = (x0 + x1) // 2, y0 + 250

    for side in (-1, 1):
        band_center = cx + side * 155
        rounded(
            draw,
            (band_center - 29, cy - 145, band_center + 29, cy + 62),
            fill=SKY,
            outline="#a8c4de",
            radius=20,
            width=2,
        )
        for row in range(3):
            ny = cy - 100 + row * 60
            draw.ellipse(
                (band_center - 13, ny - 10, band_center + 13, ny + 10),
                fill=TEAL,
                outline=INK,
                width=2,
            )

    draw.rounded_rectangle((cx - 40, cy - 232, cx + 40, cy - 158), radius=16, fill=SKY, outline=INK, width=3)
    draw.rectangle((cx - 30, cy - 160, cx + 30, cy + 150), fill=SKY, outline=INK, width=3)
    for ring in range(cy - 148, cy + 148, 22):
        draw.line([(cx - 28, ring), (cx + 28, ring)], fill="#9fbad2", width=2)

    dashed_rect(draw, (cx - 56, cy + 30, cx + 56, cy + 148), fill=TEAL, width=3)
    for offset in (-26, 0, 26):
        draw.ellipse((cx + offset - 11, cy + 62, cx + offset + 11, cy + 84), fill=TEAL, outline=INK, width=2)

    draw.ellipse((cx - 104, cy - 126, cx - 20, cy + 40), fill=ROSE, outline=INK, width=4)
    draw.ellipse((cx + 20, cy - 126, cx + 104, cy + 40), fill=ROSE, outline=INK, width=4)
    draw.rectangle((cx - 26, cy - 78, cx + 26, cy - 34), fill=ROSE, outline=INK, width=3)

    for side in (-1, 1):
        draw.line(
            [(cx + side * 46, cy + 146), (cx + side * 40, cy + 20), (cx + side * 34, cy - 140)],
            fill=GOLD,
            width=6,
        )
    for side in (-1, 1):
        for gy in (cy - 104, cy + 14):
            draw.ellipse(
                (cx + side * 84 - 12, gy - 12, cx + side * 84 + 12, gy + 12),
                fill=GREEN,
                outline=WHITE,
                width=3,
            )

    return [
        (cx + 62, cy - 46),
        (cx, cy - 196),
        (cx - 47, cy + 112),
        (cx + 108, cy + 14),
        (cx - 155, cy - 70),
    ]


def neck_level_anatomy(draw, box):
    """Lateral neck field divided into node levels, with the structures surgeons preserve.

    Level numerals are painted after the vessels and nerves so the overlay never hides
    which level is which.
    """
    x0, y0, x1, y1 = box
    cx, cy = (x0 + x1) // 2, y0 + 246

    # Patient faces left: head above, neck field below, mandible along the junction.
    draw.ellipse((cx - 136, cy - 244, cx + 16, cy - 92), fill=PALE, outline=LINE, width=3)
    rounded(draw, (cx - 190, cy - 92, cx + 150, cy + 180), fill=WHITE, outline=LINE, radius=28)
    draw.line([(cx - 184, cy - 90), (cx - 70, cy - 78)], fill=INK, width=7)
    draw.line([(cx - 70, cy - 78), (cx - 30, cy - 120)], fill=INK, width=7)
    draw.line([(cx - 184, cy + 164), (cx + 144, cy + 148)], fill=INK, width=6)

    levels = {
        "I": (cx - 182, cy - 70, cx - 86, cy + 6),
        "II": (cx - 74, cy - 70, cx + 26, cy + 6),
        "III": (cx - 74, cy + 16, cx + 26, cy + 72),
        "IV": (cx - 74, cy + 82, cx + 26, cy + 140),
        "V": (cx + 38, cy - 70, cx + 142, cy + 140),
    }
    for rect in levels.values():
        rounded(draw, rect, fill=SKY, outline="#a8c4de", radius=14, width=2)

    # Anterior compartment is labelled so the space reads as anatomy, not as a gap.
    draw.rectangle((cx - 150, cy + 58, cx - 118, cy + 134), fill=SKY, outline="#a8c4de", width=2)
    for ring in range(int(cy + 68), int(cy + 130), 16):
        draw.line([(cx - 148, ring), (cx - 120, ring)], fill="#9fbad2", width=2)
    for line_number, line in enumerate(("Larynx and", "trachea")):
        draw.text((cx - 180, cy + 16 + line_number * 20), line, font=font(15), fill=MUTED)

    draw.line([(cx + 14, cy - 72), (cx - 52, cy + 174)], fill="#b9c7d8", width=18)
    draw.line([(cx - 26, cy - 66), (cx - 26, cy + 136)], fill="#3f6fb5", width=9)
    draw.line([(cx + 28, cy - 52), (cx + 122, cy + 60)], fill=GOLD, width=7)
    draw.line([(cx - 178, cy - 92), (cx - 74, cy - 80)], fill=GOLD, width=6)
    draw.line([(cx - 66, cy + 140), (cx - 102, cy + 168)], fill=TEAL, width=7)

    for name, rect in levels.items():
        draw.text((rect[0] + 10, rect[1] + 6), name, font=font(22, True), fill=NAVY)

    return [
        (cx - 146, cy - 24),
        (cx + 104, cy + 38),
        (cx - 26, cy + 46),
        (cx - 150, cy - 86),
        (cx - 102, cy + 168),
    ]


def oral_cavity_anatomy(draw, box):
    """Open-mouth view: tongue lesion with its planned margin, jaw, and the draining nodes."""
    x0, y0, x1, y1 = box
    cx, cy = (x0 + x1) // 2, (y0 + y1) // 2 - 30

    draw.ellipse((cx - 196, cy - 168, cx + 196, cy + 132), fill=ROSE, outline=CORAL, width=5)
    draw.ellipse((cx - 168, cy - 142, cx + 168, cy + 106), fill="#8d4b52", outline=INK, width=3)
    draw.chord((cx - 150, cy - 158, cx + 150, cy - 10), 180, 360, fill="#f0dcd4", outline=INK, width=3)
    for index in range(9):
        tx = cx - 128 + index * 32
        draw.rounded_rectangle((tx - 12, cy - 66, tx + 12, cy - 38), radius=5, fill=WHITE, outline=INK, width=2)
        draw.rounded_rectangle((tx - 12, cy + 56, tx + 12, cy + 86), radius=5, fill=WHITE, outline=INK, width=2)
    draw.arc((cx - 158, cy + 24, cx + 158, cy + 132), 0, 180, fill=INK, width=7)

    draw.chord((cx - 116, cy - 42, cx + 116, cy + 96), 180, 360, fill="#e7a6a0", outline=INK, width=3)
    draw.line([(cx, cy - 34), (cx, cy + 40)], fill="#c98d88", width=3)

    draw.ellipse((cx - 96, cy - 26, cx - 40, cy + 26), fill=CORAL, outline=INK, width=3)
    dashed_ellipse(draw, (cx - 116, cy - 46, cx - 20, cy + 46), fill=GOLD, width=4)

    rounded(draw, (cx - 120, cy + 156, cx + 120, cy + 226), fill=SKY, outline="#a8c4de", radius=18, width=2)
    for index in range(4):
        nx = cx - 84 + index * 56
        draw.ellipse((nx - 14, cy + 180, nx + 14, cy + 204), fill=TEAL, outline=INK, width=2)

    return [
        (cx + 60, cy + 40),
        (cx + 150, cy - 96),
        (cx + 126, cy + 108),
        (cx - 134, cy - 58),
        (cx - 112, cy + 192),
    ]


def lung_anatomy(draw, box):
    """Anterior lungs with lobar divisions, a peripheral tumour and mediastinal node stations."""
    x0, y0, x1, y1 = box
    cx, cy = (x0 + x1) // 2, y0 + 252

    draw.ellipse((cx - 196, cy - 150, cx - 22, cy + 176), fill=ROSE, outline=INK, width=4)
    draw.ellipse((cx + 22, cy - 150, cx + 196, cy + 176), fill=ROSE, outline=INK, width=4)
    draw.line([(cx - 192, cy - 32), (cx - 62, cy - 32)], fill=INK, width=4)
    draw.line([(cx - 188, cy + 96), (cx - 42, cy - 18)], fill=INK, width=4)
    draw.line([(cx + 188, cy + 84), (cx + 44, cy - 34)], fill=INK, width=4)

    draw.rounded_rectangle((cx - 40, cy - 250, cx + 40, cy - 192), radius=16, fill=SKY, outline=INK, width=3)
    draw.rectangle((cx - 20, cy - 194, cx + 20, cy - 78), fill=SKY, outline=INK, width=3)
    for ring in range(cy - 182, cy - 84, 20):
        draw.line([(cx - 18, ring), (cx + 18, ring)], fill="#9fbad2", width=2)
    for side in (-1, 1):
        draw.line([(cx, cy - 78), (cx + side * 108, cy + 12)], fill=GOLD, width=14)
        draw.line([(cx + side * 94, cy + 2), (cx + side * 162, cy - 48)], fill=GOLD, width=8)
        draw.line([(cx + side * 94, cy + 2), (cx + side * 158, cy + 66)], fill=GOLD, width=8)
        draw.line([(cx + side * 94, cy + 2), (cx + side * 120, cy + 132)], fill=GOLD, width=8)
    draw.line([(cx - 88, cy + 14), (cx - 150, cy - 34)], fill=CORAL, width=6)
    draw.line([(cx - 84, cy + 30), (cx - 146, cy - 12)], fill="#3f6fb5", width=6)

    for nx, ny in ((cx - 34, cy - 134), (cx + 36, cy - 120), (cx - 40, cy - 66), (cx + 42, cy - 58)):
        draw.ellipse((nx - 19, ny - 15, nx + 19, ny + 15), fill=TEAL, outline=INK, width=2)

    draw.ellipse((cx - 172, cy - 118, cx - 116, cy - 62), fill=CORAL, outline=INK, width=3)
    dashed_ellipse(draw, (cx - 188, cy - 134, cx - 100, cy - 46), fill=GOLD, width=4)

    return [
        (cx - 150, cy + 100),
        (cx + 150, cy + 100),
        (cx - 118, cy + 6),
        (cx - 92, cy - 122),
        (cx + 74, cy - 94),
    ]


def kidney_anatomy(draw, box):
    x0, y0, x1, y1 = box
    cx, cy = (x0 + x1) // 2, y0 + 240
    draw.ellipse((cx - 70, cy - 130, cx + 70, cy + 110), fill=ROSE, outline=INK, width=4)
    draw.polygon(
        [(cx - 18, cy - 20), (cx + 18, cy - 20), (cx + 36, cy + 70), (cx - 36, cy + 70)],
        fill=SKY,
        outline=INK,
    )
    draw.line([(cx, cy + 70), (cx, cy + 150)], fill=GOLD, width=10)
    draw.line([(cx - 8, cy - 8), (cx - 90, cy - 40)], fill=CORAL, width=8)
    draw.line([(cx + 8, cy - 4), (cx - 80, cy - 18)], fill="#3f6fb5", width=8)
    draw.ellipse((cx - 62, cy - 110, cx - 10, cy - 58), fill=CORAL, outline=INK, width=3)
    dashed_ellipse(draw, (cx - 78, cy - 126, cx + 6, cy - 42), fill=GOLD, width=4)
    return [
        (cx, cy + 10),
        (cx, cy + 90),
        (cx - 90, cy - 40),
        (cx - 36, cy - 84),
        (cx - 70, cy - 18),
    ]


def prostate_anatomy(draw, box):
    x0, y0, x1, y1 = box
    cx, cy = (x0 + x1) // 2, y0 + 250
    draw.ellipse((cx - 70, cy - 150, cx + 70, cy - 70), fill=SKY, outline=INK, width=3)
    draw.ellipse((cx - 54, cy - 40, cx + 54, cy + 50), fill=ROSE, outline=INK, width=4)
    draw.ellipse((cx - 22, cy - 70, cx + 22, cy + 80), fill=PALE, outline=GOLD, width=4)
    for side in (-1, 1):
        draw.line([(cx + side * 52, cy - 10), (cx + side * 88, cy + 40)], fill=GOLD, width=7)
        nx = cx + side * 47
        draw.ellipse((nx - 11, cy - 58, nx + 11, cy - 30), fill=TEAL, outline=INK, width=2)
    draw.ellipse((cx - 90, cy + 70, cx - 50, cy + 110), fill=TEAL, outline=INK, width=2)
    draw.ellipse((cx + 50, cy + 70, cx + 90, cy + 110), fill=TEAL, outline=INK, width=2)
    return [
        (cx, cy + 6),
        (cx, cy - 110),
        (cx, cy + 40),
        (cx + 88, cy + 40),
        (cx + 70, cy + 90),
    ]


def bladder_anatomy(draw, box):
    x0, y0, x1, y1 = box
    cx, cy = (x0 + x1) // 2, y0 + 230
    draw.ellipse((cx - 80, cy - 90, cx + 80, cy + 50), fill=SKY, outline=INK, width=4)
    draw.ellipse((cx - 36, cy + 20, cx + 36, cy + 90), fill=ROSE, outline=INK, width=3)
    for side in (-1, 1):
        draw.line([(cx + side * 40, cy - 70), (cx + side * 110, cy - 150)], fill=GOLD, width=7)
    draw.polygon(
        [(cx + 90, cy - 10), (cx + 160, cy - 40), (cx + 170, cy + 20), (cx + 100, cy + 40)],
        fill=MINT,
        outline=GREEN,
        width=3,
    )
    draw.ellipse((cx + 148, cy - 8, cx + 186, cy + 30), fill=TEAL, outline=INK, width=2)
    return [
        (cx, cy - 20),
        (cx, cy + 55),
        (cx - 110, cy - 150),
        (cx + 130, cy - 10),
        (cx + 167, cy + 11),
    ]


def uterus_anatomy(draw, box):
    x0, y0, x1, y1 = box
    cx, cy = (x0 + x1) // 2, y0 + 240
    draw.ellipse((cx - 50, cy - 110, cx + 50, cy + 10), fill=ROSE, outline=INK, width=4)
    draw.polygon([(cx - 22, cy + 6), (cx + 22, cy + 6), (cx + 16, cy + 70), (cx - 16, cy + 70)], fill=ROSE, outline=INK, width=3)
    draw.rectangle((cx - 28, cy + 70, cx + 28, cy + 100), fill="#e7a6a0", outline=INK, width=3)
    for side in (-1, 1):
        draw.line([(cx + side * 28, cy + 20), (cx + side * 100, cy + 80)], fill=GOLD, width=6)
        draw.ellipse((cx + side * 70 - 24, cy - 20, cx + side * 70 + 24, cy + 50), fill=SKY, outline="#a8c4de", width=2)
    draw.ellipse((cx - 90, cy + 90, cx - 50, cy + 130), fill=TEAL, outline=INK, width=2)
    draw.ellipse((cx + 50, cy + 90, cx + 90, cy + 130), fill=TEAL, outline=INK, width=2)
    return [
        (cx, cy - 50),
        (cx, cy + 40),
        (cx + 100, cy + 80),
        (cx, cy + 85),
        (cx + 70, cy + 110),
    ]


def lobectomy_anatomy(draw, box):
    anchors = lung_anatomy(draw, box)
    x0, y0, x1, y1 = box
    cx, cy = (x0 + x1) // 2, y0 + 252
    dashed_rect(draw, (cx - 200, cy - 155, cx - 18, cy - 28), fill=CORAL, width=4)
    return anchors


def vats_anatomy(draw, box):
    x0, y0, x1, y1 = box
    cx, cy = (x0 + x1) // 2 + 40, y0 + 252
    lung_anatomy(draw, box)
    for py in (cy - 40, cy + 20, cy + 90):
        draw.line([(x0 + 30, py), (cx - 170, py)], fill=NAVY, width=10)
        draw.ellipse((cx - 184, py - 12, cx - 160, py + 12), fill=GREEN, outline=INK, width=2)
    return [
        (x0 + 40, cy - 40),
        (x0 + 40, cy + 20),
        (x0 + 40, cy + 90),
        (cx - 144, cy - 90),
        (cx + 42, cy - 58),
    ]


def robotic_thoracic_anatomy(draw, box):
    x0, y0, x1, y1 = box
    cx, cy = (x0 + x1) // 2, y0 + 260
    lung_anatomy(draw, box)
    rounded(draw, (x0 + 8, y0 + 8, x0 + 150, y0 + 90), fill=NAVY, radius=16)
    draw.text((x0 + 28, y0 + 36), "Console", font=font(18, True), fill=WHITE)
    for px, py in ((cx - 150, cy - 20), (cx - 150, cy + 50), (cx + 150, cy - 20), (cx + 150, cy + 50)):
        draw.line([(px, py), (px, py - 40)], fill=TEAL, width=8)
        draw.ellipse((px - 10, py - 54, px + 10, py - 34), fill=GOLD, outline=INK, width=2)
    return [
        (x0 + 80, y0 + 48),
        (cx - 150, cy - 20),
        (cx + 150, cy + 50),
        (cx - 144, cy - 90),
        (cx + 42, cy - 58),
    ]


def tors_anatomy(draw, box):
    x0, y0, x1, y1 = box
    cx, cy = (x0 + x1) // 2, y0 + 220
    draw.ellipse((cx - 150, cy - 130, cx + 150, cy + 80), fill=ROSE, outline=CORAL, width=4)
    draw.ellipse((cx - 70, cy - 40, cx + 70, cy + 90), fill="#8d4b52", outline=INK, width=3)
    draw.chord((cx - 90, cy - 110, cx + 90, cy), 180, 360, fill="#e7a6a0", outline=INK, width=3)
    draw.ellipse((cx - 86, cy - 8, cx - 30, cy + 40), fill=CORAL, outline=INK, width=3)
    dashed_ellipse(draw, (cx - 102, cy - 24, cx - 14, cy + 54), fill=GOLD, width=4)
    draw.line([(cx + 40, cy + 20), (cx + 130, cy + 70)], fill=GOLD, width=8)
    rounded(draw, (cx - 80, cy + 120, cx + 80, cy + 190), fill=SKY, outline="#a8c4de", radius=16)
    for index in range(3):
        nx = cx - 48 + index * 48
        draw.ellipse((nx - 12, cy + 142, nx + 12, cy + 166), fill=TEAL, outline=INK, width=2)
    return [
        (cx - 58, cy + 16),
        (cx + 20, cy - 40),
        (cx + 130, cy + 70),
        (cx, cy - 90),
        (cx, cy + 154),
    ]


def flap_anatomy(draw, box):
    x0, y0, x1, y1 = box
    cx, cy = (x0 + x1) // 2, y0 + 240
    rounded(draw, (cx - 200, cy - 80, cx - 40, cy + 80), fill=MINT, outline=GREEN, radius=20)
    draw.line([(cx - 120, cy + 20), (cx - 40, cy - 10)], fill=CORAL, width=7)
    draw.line([(cx - 120, cy + 36), (cx - 40, cy + 8)], fill="#3f6fb5", width=7)
    draw.ellipse((cx + 20, cy - 90, cx + 190, cy + 50), fill=ROSE, outline=INK, width=4)
    draw.polygon([(cx + 40, cy - 20), (cx + 130, cy - 60), (cx + 150, cy + 20)], fill=PALE, outline=GOLD, width=3)
    draw.line([(cx - 40, cy - 10), (cx + 70, cy - 30)], fill=CORAL, width=5)
    draw.line([(cx - 40, cy + 8), (cx + 78, cy - 8)], fill="#3f6fb5", width=5)
    draw.ellipse((cx + 62, cy - 40, cx + 86, cy - 16), fill=GOLD, outline=INK, width=2)
    return [
        (cx - 120, cy),
        (cx - 80, cy + 28),
        (cx + 90, cy - 10),
        (cx + 74, cy - 28),
        (cx + 130, cy - 40),
    ]


ANATOMY = {
    "thyroidectomy-for-thyroid-cancer": thyroid_anatomy,
    "neck-dissection": neck_level_anatomy,
    "oral-cancer-surgery": oral_cavity_anatomy,
    "lung-cancer-surgery": lung_anatomy,
    "partial-nephrectomy": kidney_anatomy,
    "radical-prostatectomy": prostate_anatomy,
    "radical-cystectomy": bladder_anatomy,
    "radical-hysterectomy": uterus_anatomy,
    "lobectomy": lobectomy_anatomy,
    "vats-lung-surgery": vats_anatomy,
    "robotic-thoracic-surgery": robotic_thoracic_anatomy,
    "transoral-robotic-surgery-tors": tors_anatomy,
    "microvascular-free-flap-reconstruction": flap_anatomy,
}


# ------------------------------------------------------------------- scope comparison


def mini_thyroid(draw, box, index):
    x0, y0, x1, y1 = box
    cx, cy = (x0 + x1) // 2, (y0 + y1) // 2
    draw.rectangle((cx - 14, cy - 60, cx + 14, cy + 64), fill=SKY, outline=INK, width=2)
    for ring in range(cy - 52, cy + 60, 16):
        draw.line([(cx - 13, ring), (cx + 13, ring)], fill="#9fbad2", width=1)
    left = (cx - 54, cy - 48, cx - 12, cy + 18)
    right = (cx + 12, cy - 48, cx + 54, cy + 18)
    removed = {0: [left], 1: [left, right], 2: [left, right], 3: []}[index]
    for lobe in (left, right):
        if lobe in removed:
            dashed_ellipse(draw, lobe, fill=CORAL, width=3)
        else:
            draw.ellipse(lobe, fill=ROSE, outline=INK, width=3)
    if index == 2:
        dashed_rect(draw, (cx - 32, cy + 22, cx + 32, cy + 66), fill=TEAL, width=3)
        for offset in (-17, 0, 17):
            draw.ellipse((cx + offset - 7, cy + 36, cx + offset + 7, cy + 50), fill=TEAL)
    if index == 3:
        for side in (-1, 1):
            draw.line([(cx + side * 22, cy + 62), (cx + side * 18, cy - 54)], fill=GOLD, width=4)
            for gy in (cy - 40, cy + 8):
                draw.ellipse((cx + side * 44 - 8, gy - 8, cx + side * 44 + 8, gy + 8), fill=GREEN, outline=WHITE, width=2)


def mini_neck(draw, box, index):
    x0, y0, x1, y1 = box
    cx, cy = (x0 + x1) // 2, (y0 + y1) // 2
    rounded(draw, (cx - 68, cy - 66, cx + 68, cy + 68), fill=WHITE, outline=LINE, radius=16, width=2)
    levels = {
        "I": (cx - 62, cy - 60, cx - 22, cy - 26),
        "II": (cx - 16, cy - 60, cx + 26, cy - 26),
        "III": (cx - 16, cy - 20, cx + 26, cy + 14),
        "IV": (cx - 16, cy + 20, cx + 26, cy + 62),
        "V": (cx + 32, cy - 20, cx + 62, cy + 62),
    }
    cleared = {0: {"II", "III", "IV"}, 1: set(levels), 2: set(levels), 3: set()}[index]
    for name, rect in levels.items():
        if name in cleared:
            draw.rounded_rectangle(rect, radius=8, fill=ROSE, outline=CORAL, width=2)
        else:
            draw.rounded_rectangle(rect, radius=8, fill=SKY, outline="#a8c4de", width=2)
    structures = [
        ((cx + 18, cy - 62), (cx - 30, cy + 66), "#b9c7d8", 12),
        ((cx - 6, cy - 58), (cx - 6, cy + 62), "#3f6fb5", 6),
        ((cx + 22, cy - 46), (cx + 58, cy + 16), GOLD, 5),
    ]
    for start, end, color, width in structures:
        if index == 2:
            dashed_line(draw, start, end, fill=color, width=width, dash=8, gap=7)
        else:
            draw.line([start, end], fill=color, width=width)
    # Numerals go on last so the vessel and nerve overlay never hides a level.
    for name, rect in levels.items():
        draw.text((rect[0] + 5, rect[1] + 3), name, font=font(15, True), fill=NAVY)


def mini_oral(draw, box, index):
    x0, y0, x1, y1 = box
    cx, cy = (x0 + x1) // 2, (y0 + y1) // 2
    if index in (0, 1):
        draw.arc((cx - 62, cy - 26, cx + 62, cy + 62), 0, 180, fill=INK, width=6)
    elif index == 2:
        draw.arc((cx - 62, cy - 26, cx + 62, cy + 62), 0, 62, fill=INK, width=6)
        draw.arc((cx - 62, cy - 26, cx + 62, cy + 62), 118, 180, fill=INK, width=6)
        draw.line([(cx - 26, cy + 44), (cx + 26, cy + 44)], fill=GOLD, width=9)
    else:
        draw.arc((cx - 62, cy - 26, cx + 62, cy + 62), 0, 180, fill=INK, width=6)
    draw.chord((cx - 44, cy - 60, cx + 44, cy + 34), 180, 360, fill="#e7a6a0", outline=INK, width=3)
    if index == 0:
        draw.ellipse((cx - 34, cy - 36, cx - 8, cy - 8), fill=CORAL, outline=INK, width=2)
        dashed_ellipse(draw, (cx - 44, cy - 48, cx + 4, cy + 2), fill=GOLD, width=3)
    if index == 1:
        dashed_line(draw, (cx - 40, cy + 28), (cx + 40, cy + 28), fill=CORAL, width=5, dash=9, gap=6)
    if index == 3:
        draw.rounded_rectangle((cx + 16, cy - 44, cx + 62, cy - 4), radius=8, fill=MINT, outline=GREEN, width=3)
        draw.line([(cx + 16, cy - 32), (cx - 12, cy - 22)], fill=CORAL, width=4)
        draw.line([(cx + 16, cy - 18), (cx - 12, cy - 8)], fill="#3f6fb5", width=4)


def mini_lung(draw, box, index):
    x0, y0, x1, y1 = box
    cx, cy = (x0 + x1) // 2, (y0 + y1) // 2
    right = (cx - 62, cy - 50, cx - 8, cy + 62)
    left = (cx + 8, cy - 50, cx + 62, cy + 62)
    draw.ellipse(left, fill=ROSE, outline=INK, width=3)
    if index == 3:
        dashed_ellipse(draw, right, fill=CORAL, width=3)
    else:
        draw.ellipse(right, fill=ROSE, outline=INK, width=3)
        draw.line([(cx - 60, cy - 6), (cx - 18, cy - 6)], fill=INK, width=3)
    draw.rectangle((cx - 6, cy - 78, cx + 6, cy - 50), fill=SKY, outline=INK, width=2)
    for side in (-1, 1):
        draw.line([(cx, cy - 50), (cx + side * 36, cy - 12)], fill=GOLD, width=7)
    if index == 0:
        dashed_line(draw, (cx - 58, cy - 44), (cx - 30, cy - 18), fill=CORAL, width=4, dash=8, gap=6)
        dashed_line(draw, (cx - 30, cy - 18), (cx - 56, cy - 8), fill=CORAL, width=4, dash=8, gap=6)
    if index == 1:
        draw.chord(right, 180, 352, fill=WHITE, outline=CORAL, width=3)
        dashed_line(draw, (cx - 60, cy - 6), (cx - 18, cy - 6), fill=CORAL, width=4, dash=8, gap=6)
    if index == 2:
        draw.line([(cx - 26, cy - 22), (cx - 14, cy - 34)], fill=WHITE, width=9)
        draw.ellipse((cx - 28, cy - 34, cx - 12, cy - 18), fill=MINT, outline=GREEN, width=3)


def mini_kidney(draw, box, index):
    x0, y0, x1, y1 = box
    cx, cy = (x0 + x1) // 2, (y0 + y1) // 2
    draw.ellipse((cx - 36, cy - 52, cx + 36, cy + 52), fill=ROSE, outline=INK, width=3)
    if index == 0:
        dashed_ellipse(draw, (cx - 30, cy - 48, cx + 4, cy - 8), fill=CORAL, width=3)
    elif index == 1:
        dashed_rect(draw, (cx - 16, cy - 8, cx + 16, cy + 28), fill=GOLD, width=3)
    elif index == 2:
        draw.line([(cx - 8, cy - 6), (cx - 40, cy - 20)], fill=GOLD, width=4)
    else:
        dashed_ellipse(draw, (cx - 36, cy - 52, cx + 36, cy + 52), fill=CORAL, width=3)


def mini_prostate(draw, box, index):
    x0, y0, x1, y1 = box
    cx, cy = (x0 + x1) // 2, (y0 + y1) // 2
    draw.ellipse((cx - 28, cy - 24, cx + 28, cy + 28), fill=ROSE, outline=INK, width=3)
    draw.ellipse((cx - 10, cy - 36, cx + 10, cy + 40), fill=PALE, outline=GOLD, width=2)
    if index in (0, 1):
        for side in (-1, 1):
            if index == 1:
                dashed_line(draw, (cx + side * 28, cy), (cx + side * 48, cy + 18), GOLD, 4)
            else:
                draw.line([(cx + side * 28, cy), (cx + side * 48, cy + 18)], fill=GOLD, width=4)
    if index == 2:
        draw.ellipse((cx - 48, cy + 22, cx - 28, cy + 42), fill=TEAL, outline=INK, width=2)
        draw.ellipse((cx + 28, cy + 22, cx + 48, cy + 42), fill=TEAL, outline=INK, width=2)
    if index == 3:
        draw.ellipse((cx - 40, cy - 48, cx + 40, cy - 28), fill=SKY, outline=INK, width=2)


def mini_bladder(draw, box, index):
    x0, y0, x1, y1 = box
    cx, cy = (x0 + x1) // 2, (y0 + y1) // 2
    draw.ellipse((cx - 36, cy - 32, cx + 36, cy + 24), fill=SKY, outline=INK, width=3)
    if index == 0:
        dashed_ellipse(draw, (cx - 36, cy - 32, cx + 36, cy + 24), fill=CORAL, width=3)
    elif index == 1:
        draw.polygon([(cx + 20, cy), (cx + 48, cy - 16), (cx + 52, cy + 16)], fill=MINT, outline=GREEN, width=2)
    elif index == 2:
        draw.ellipse((cx + 28, cy - 8, cx + 52, cy + 16), fill=TEAL, outline=INK, width=2)
    else:
        draw.ellipse((cx - 14, cy + 12, cx + 14, cy + 40), fill=ROSE, outline=INK, width=2)


def mini_uterus(draw, box, index):
    x0, y0, x1, y1 = box
    cx, cy = (x0 + x1) // 2, (y0 + y1) // 2
    draw.ellipse((cx - 24, cy - 36, cx + 24, cy + 8), fill=ROSE, outline=INK, width=3)
    draw.polygon([(cx - 10, cy + 6), (cx + 10, cy + 6), (cx + 8, cy + 36), (cx - 8, cy + 36)], fill=ROSE, outline=INK, width=2)
    if index == 0:
        dashed_ellipse(draw, (cx - 24, cy - 36, cx + 24, cy + 8), fill=CORAL, width=3)
    elif index == 1:
        dashed_rect(draw, (cx - 34, cy - 6, cx + 34, cy + 28), fill=GOLD, width=3)
    elif index == 2:
        for side in (-1, 1):
            draw.line([(cx + side * 12, cy + 10), (cx + side * 40, cy + 32)], fill=GOLD, width=3)
    else:
        draw.ellipse((cx - 24, cy - 36, cx + 24, cy + 8), fill=MINT, outline=GREEN, width=3)


def mini_lobe(draw, box, index):
    mini_lung(draw, box, min(index, 3))


def mini_vats(draw, box, index):
    x0, y0, x1, y1 = box
    cx, cy = (x0 + x1) // 2, (y0 + y1) // 2
    draw.ellipse((cx - 8, cy - 44, cx + 50, cy + 44), fill=ROSE, outline=INK, width=3)
    if index < 3:
        for py in (cy - 18, cy + 8, cy + 30):
            draw.line([(cx - 48, py), (cx - 8, py)], fill=NAVY, width=5)
    else:
        draw.line([(cx - 50, cy - 30), (cx - 8, cy)], fill=CORAL, width=6)


def mini_robot(draw, box, index):
    x0, y0, x1, y1 = box
    cx, cy = (x0 + x1) // 2, (y0 + y1) // 2
    rounded(draw, (cx - 50, cy - 48, cx - 8, cy - 16), fill=NAVY, radius=8)
    draw.ellipse((cx - 4, cy - 36, cx + 48, cy + 36), fill=ROSE, outline=INK, width=3)
    if index != 3:
        draw.line([(cx - 28, cy - 16), (cx + 8, cy)], fill=TEAL, width=4)
    else:
        dashed_line(draw, (cx - 28, cy - 16), (cx + 8, cy), CORAL, 4)


def mini_tors(draw, box, index):
    x0, y0, x1, y1 = box
    cx, cy = (x0 + x1) // 2, (y0 + y1) // 2
    draw.arc((cx - 40, cy - 10, cx + 40, cy + 50), 0, 180, fill=INK, width=5)
    draw.chord((cx - 28, cy - 36, cx + 28, cy + 16), 180, 360, fill="#e7a6a0", outline=INK, width=2)
    if index in (0, 1):
        draw.ellipse((cx - 22, cy - 18, cx - 2, cy + 2), fill=CORAL, outline=INK, width=2)
    if index == 2:
        rounded(draw, (cx - 24, cy + 28, cx + 24, cy + 48), fill=SKY, radius=8)
    if index == 3:
        dashed_line(draw, (cx - 36, cy + 8), (cx + 36, cy + 8), CORAL, 4)


def mini_flap(draw, box, index):
    x0, y0, x1, y1 = box
    cx, cy = (x0 + x1) // 2, (y0 + y1) // 2
    rounded(draw, (cx - 52, cy - 18, cx - 8, cy + 28), fill=MINT, outline=GREEN, radius=10)
    draw.ellipse((cx + 4, cy - 28, cx + 52, cy + 20), fill=ROSE, outline=INK, width=3)
    if index < 3:
        draw.line([(cx - 8, cy), (cx + 12, cy - 6)], fill=CORAL, width=4)
    else:
        dashed_line(draw, (cx - 8, cy), (cx + 12, cy - 6), CORAL, 4)


MINIS = {
    "thyroidectomy-for-thyroid-cancer": mini_thyroid,
    "neck-dissection": mini_neck,
    "oral-cancer-surgery": mini_oral,
    "lung-cancer-surgery": mini_lung,
    "partial-nephrectomy": mini_kidney,
    "radical-prostatectomy": mini_prostate,
    "radical-cystectomy": mini_bladder,
    "radical-hysterectomy": mini_uterus,
    "lobectomy": mini_lobe,
    "vats-lung-surgery": mini_vats,
    "robotic-thoracic-surgery": mini_robot,
    "transoral-robotic-surgery-tors": mini_tors,
    "microvascular-free-flap-reconstruction": mini_flap,
}


DATA = {
    "thyroidectomy-for-thyroid-cancer": {
        "title": "Thyroidectomy for Thyroid Cancer",
        "labels": [
            "Thyroid lobes and isthmus",
            "Larynx and trachea in front",
            "Recurrent laryngeal nerves behind the gland",
            "Four parathyroid glands controlling calcium",
            "Central and lateral neck node levels",
        ],
        "panels": [
            ("Thyroid lobectomy", "Removes the affected lobe and isthmus. Enough gland may remain to avoid lifelong hormone replacement."),
            ("Total thyroidectomy", "Removes both lobes. Usual for multifocal or higher-risk disease, and required before radioiodine."),
            ("With central compartment dissection", "Adds the node group around the trachea and oesophagus when those nodes are involved or at risk."),
            ("Nerve and parathyroid preservation", "Identifying the recurrent laryngeal nerves and parathyroid glands is part of every version of the operation."),
        ],
        "milestones": [
            "Airway and drain observation",
            "Voice and calcium monitoring",
            "Histopathology review",
            "Hormone replacement titration",
            "Radioiodine decision",
            "Long-term surveillance",
        ],
        "urgent": "Rapid neck swelling · difficulty breathing · worsening voice change · tingling or cramps · fever or wound discharge",
    },
    "neck-dissection": {
        "title": "Neck Dissection",
        "labels": [
            "Node levels I to V in the neck",
            "Spinal accessory nerve to the shoulder",
            "Internal jugular vein and sternocleidomastoid",
            "Marginal mandibular nerve to the lower lip",
            "Thoracic duct at the left neck base",
        ],
        "panels": [
            ("Selective neck dissection", "Removes only the levels predicted to be at risk for that primary site, leaving the others in place."),
            ("Modified radical dissection", "Clears levels I to V while preserving the shoulder nerve, jugular vein and muscle."),
            ("Radical neck dissection", "Clears levels I to V and removes the nerve, vein or muscle when preserving them would leave tumour behind."),
            ("Structures surgeons work to keep", "Shoulder nerve, jugular vein, muscle, lip nerve and thoracic duct are preserved wherever disease allows."),
        ],
        "milestones": [
            "Drain and wound monitoring",
            "Level-by-level histopathology",
            "Radiotherapy decision",
            "Shoulder physiotherapy",
            "Neck surveillance",
        ],
        "urgent": "Expanding neck swelling · difficulty breathing · milky or heavy drain fluid · fever · sudden inability to lift the arm",
    },
    "oral-cancer-surgery": {
        "title": "Oral Cancer Surgery",
        "labels": [
            "Tongue and floor of the mouth",
            "Hard palate and inner cheek",
            "Mandible and lower teeth",
            "Tongue tumour with its planned margin",
            "Draining neck node levels",
        ],
        "panels": [
            ("Transoral wide local excision", "Removes a smaller tumour through the mouth with a measured margin, closed directly or with a graft."),
            ("Marginal mandibulectomy", "Takes the inner rim of jawbone when disease abuts the bone but has not invaded it."),
            ("Segmental mandibulectomy", "Removes an invaded jaw segment; bony reconstruction restores jaw contour and continuity."),
            ("Free flap reconstruction", "Tissue with its own artery and vein is transferred to rebuild tongue bulk or jaw."),
        ],
        "strip": (
            "Frozen-section margin assessment",
            "Margins can be checked during surgery, and the resection may be widened before closure if a margin returns positive.",
        ),
        "milestones": [
            "Airway and tracheostomy care",
            "Flap and wound monitoring",
            "Feeding tube nutrition",
            "Margin histopathology",
            "Radiotherapy decision",
            "Speech and dental rehabilitation",
        ],
        "urgent": "Difficulty breathing · bleeding from mouth or wound · colour change in a reconstructed area · saliva leaking through the neck",
    },
    "lung-cancer-surgery": {
        "title": "Lung Cancer Surgery",
        "labels": [
            "Right upper, middle and lower lobes",
            "Left upper and lower lobes",
            "Lobar bronchus, artery and vein",
            "Peripheral tumour with its resection margin",
            "Mediastinal node stations for staging",
        ],
        "panels": [
            ("Anatomical segmentectomy", "Removes a single anatomical segment to preserve lung function for a small peripheral tumour."),
            ("Lobectomy", "Removes the whole lobe with its bronchus, artery and vein. The standard anatomical resection."),
            ("Sleeve resection", "The airway is divided and rejoined so a whole lung need not be removed."),
            ("Pneumonectomy", "Removes an entire lung, reserved for tumours that cannot be cleared any other way."),
        ],
        "strip": (
            "Access routes for the same resection",
            "Keyhole (VATS) ports · robotic console · open thoracotomy. Access is a clinical decision, not a quality ladder.",
        ),
        "milestones": [
            "Chest drain and air leak monitoring",
            "Breathing exercises",
            "Nodal and molecular histopathology",
            "Adjuvant therapy decision",
            "Pulmonary rehabilitation",
        ],
        "urgent": "Worsening breathlessness · fever or productive cough · chest pain · palpitations · air under the skin of chest or neck",
    },
    "partial-nephrectomy": {
        "title": "Partial Nephrectomy",
        "labels": [
            "Kidney cortex and remnant",
            "Collecting system",
            "Renal artery that may be clamped",
            "Kidney tumour with its parenchymal margin",
            "Renal vein at the hilum",
        ],
        "panels": [
            ("Polar excision", "Removes a peripheral tumour and leaves a useful remnant."),
            ("Central reconstruction", "Repairs the collecting system after a deeper tumour is taken."),
            ("Off-clamp or selective clamp", "Reduces ischaemia to the remnant when anatomy allows."),
            ("Conversion to radical nephrectomy", "Removes the whole kidney when a remnant cannot be saved."),
        ],
        "milestones": [
            "Drain and urine monitoring",
            "Kidney-function checks",
            "Histopathology review",
            "Remnant surveillance imaging",
            "Blood-pressure follow-up",
        ],
        "urgent": "Heavy blood in the urine · rapidly increasing abdominal swelling · fever · inability to pass urine · sudden breathlessness",
    },
    "radical-prostatectomy": {
        "title": "Radical Prostatectomy",
        "labels": [
            "Prostate gland",
            "Bladder above the prostate",
            "Urethra through the gland",
            "Neurovascular bundles",
            "Pelvic lymph nodes",
        ],
        "panels": [
            ("Nerve-sparing dissection", "Keeps one or both neurovascular bundles when oncology allows."),
            ("Wider extra-prostatic resection", "Takes more tissue when extension beyond the capsule is likely."),
            ("Pelvic node dissection", "Adds staging of the pelvic nodes at risk."),
            ("Open or robotic access", "The same anatomical resection through different entries."),
        ],
        "milestones": [
            "Catheter care",
            "Pelvic-floor exercises",
            "Histopathology review",
            "First PSA result",
            "Adjuvant therapy decision",
        ],
        "urgent": "Inability to pass urine after catheter removal · heavy bleeding · fever · calf swelling · sudden breathlessness",
    },
    "radical-cystectomy": {
        "title": "Radical Cystectomy",
        "labels": [
            "Bladder in the pelvis",
            "Prostate in the male diagram",
            "Ureters from the kidneys",
            "Bowel segment for diversion",
            "Abdominal stoma or neobladder",
        ],
        "panels": [
            ("Bladder removal", "Removes the bladder and planned adjacent organs."),
            ("Ileal conduit", "A bowel segment brings urine to a permanent stoma."),
            ("Orthotopic neobladder", "Bowel is reshaped and joined to the urethra in selected patients."),
            ("Pelvic node dissection", "Stages and treats the pelvic nodes."),
        ],
        "milestones": [
            "Bowel recovery",
            "Stoma or catheter teaching",
            "Histopathology review",
            "Kidney-function checks",
            "Adjuvant therapy decision",
        ],
        "urgent": "No urine in the stoma bag · abdominal swelling · fever · vomiting · wound breakdown · sudden breathlessness",
    },
    "radical-hysterectomy": {
        "title": "Radical Hysterectomy",
        "labels": [
            "Uterus and cervix",
            "Parametrial tissue beside the cervix",
            "Ureters in the parametrium",
            "Vaginal cuff",
            "Pelvic node basins",
        ],
        "panels": [
            ("Simple hysterectomy", "Removes uterus and cervix without parametrium — not this operation."),
            ("Radical hysterectomy", "Takes parametrium and a vaginal cuff with the uterus."),
            ("Nerve-sparing dissection", "Protects pelvic nerves that influence bladder emptying when oncology allows."),
            ("Fertility-sparing trachelectomy", "Removes cervix and parametrium while keeping the uterine body in selected early cases."),
        ],
        "milestones": [
            "Catheter and bladder emptying",
            "Wound healing",
            "Parametrial histopathology",
            "Nodal results",
            "Adjuvant radiation decision",
        ],
        "urgent": "Heavy vaginal bleeding · inability to pass urine · fever · calf swelling · sudden breathlessness",
    },
    "lobectomy": {
        "title": "Lobectomy",
        "labels": [
            "Right upper, middle and lower lobes",
            "Left upper and lower lobes",
            "Lobar bronchus, artery and vein",
            "Tumour confined to one lobe",
            "Remaining lobes that stay in the chest",
        ],
        "panels": [
            ("Right-sided lobectomy", "Removes the named right lobe as an anatomical unit."),
            ("Left-sided lobectomy", "Removes the named left lobe; the upper lobe includes the lingula."),
            ("Sleeve lobectomy", "Reconstructs the airway so a whole lung need not be removed."),
            ("Conversion to pneumonectomy", "Removes the entire lung when a lobe is not enough."),
        ],
        "milestones": [
            "Chest drain and air leak monitoring",
            "Breathing exercises",
            "Lobar histopathology",
            "Nodal and molecular results",
            "Pulmonary rehabilitation",
        ],
        "urgent": "Worsening breathlessness · fever · productive cough · palpitations · air under the skin of chest or neck",
    },
    "vats-lung-surgery": {
        "title": "VATS Lung Surgery",
        "labels": [
            "Camera port between the ribs",
            "Working ports in the pleural space",
            "Fissure of the target lobe",
            "Endoscopic stapler on a vessel",
            "Chest drain at the end of the case",
        ],
        "panels": [
            ("VATS lobectomy", "Anatomical lobe removal through ports."),
            ("VATS segmentectomy", "Keyhole removal of one anatomical segment."),
            ("Uniportal VATS", "Camera and instruments share one intercostal space."),
            ("Conversion to thoracotomy", "Open completion when keyhole dissection is unsafe."),
        ],
        "strip": (
            "Access is not the resection",
            "Compare VATS quotes only against the same named lung operation. Conversion is planned for, not treated as a scandal.",
        ),
        "milestones": [
            "Port-site and drain care",
            "Air leak monitoring",
            "Histopathology of the resection",
            "Breathing exercises",
            "Fitness-to-fly review",
        ],
        "urgent": "Worsening breathlessness · heavy bleeding · fever · sudden chest wall swelling · air under the skin",
    },
    "robotic-thoracic-surgery": {
        "title": "Robotic Thoracic Surgery",
        "labels": [
            "Surgeon console",
            "Ports docked to the platform",
            "Articulated instruments at the fissure",
            "Target lobe or mediastinum",
            "Chest drains after undocking",
        ],
        "panels": [
            ("Robotic lobectomy", "Anatomical lobe removal from the console."),
            ("Robotic segmentectomy", "Console-based removal of one segment."),
            ("Undocking to VATS", "Completes the same resection without the platform."),
            ("Conversion to open", "Direct access when the console pathway is unsafe."),
        ],
        "strip": (
            "A robot in the building is not the indication",
            "Compare robotic quotes only against the same named resection, including platform time and conversion terms.",
        ),
        "milestones": [
            "Undocking and drain care",
            "Air leak monitoring",
            "Histopathology review",
            "Adjuvant therapy decision",
            "Pulmonary rehabilitation",
        ],
        "urgent": "Worsening breathlessness · heavy bleeding · fever · sudden chest swelling",
    },
    "transoral-robotic-surgery-tors": {
        "title": "Transoral Robotic Surgery (TORS)",
        "labels": [
            "Tonsil and tonsil fossa",
            "Base of tongue",
            "Open-mouth robotic corridor",
            "Carotid artery laterally",
            "Draining neck node levels",
        ],
        "panels": [
            ("TORS tonsil resection", "Removes a tonsil primary through the mouth."),
            ("TORS base-of-tongue resection", "Removes a base-of-tongue tumour with a measured margin."),
            ("Combined neck dissection", "The neck is opened separately in the same plan."),
            ("Open conversion", "Mandibulotomy or other open access if the mouth corridor fails."),
        ],
        "milestones": [
            "Airway and bleeding watch",
            "Swallow therapy",
            "Three-dimensional margin pathology",
            "Neck-node results",
            "Radiation decision",
        ],
        "urgent": "Bleeding from the mouth · difficulty breathing · inability to swallow saliva · fever · sudden neck swelling",
    },
    "microvascular-free-flap-reconstruction": {
        "title": "Microvascular Free Flap Reconstruction",
        "labels": [
            "Donor flap with its artery and vein",
            "Defect after cancer resection",
            "Recipient vessels in the neck",
            "Microscopic arterial join",
            "Microscopic venous join",
        ],
        "panels": [
            ("Radial forearm flap", "Thin lining for tongue or mouth defects."),
            ("Anterolateral thigh flap", "Soft-tissue bulk from the thigh."),
            ("Fibula bone flap", "Rebuilds a jaw segment with bone and skin."),
            ("Salvage second flap", "A backup transfer if the first anastomosis fails."),
        ],
        "milestones": [
            "Hourly flap colour and Doppler checks",
            "Donor-site care",
            "Cancer histopathology",
            "Speech or walking therapy",
            "Fitness-to-fly review",
        ],
        "urgent": "Colour or temperature change in the reconstructed area · sudden swelling · bleeding · fever · loss of the Doppler signal",
    },
}


def anatomy_image(slug, spec):
    image = Image.new("RGB", (1200, 675), PALE)
    draw = ImageDraw.Draw(image)
    header(draw, f"{spec['title']}: relevant anatomy", "Anatomy")
    rounded(draw, (55, 165, 640, 635), fill=WHITE)
    anchors = ANATOMY[slug](draw, (85, 185, 610, 615))
    for index, xy in enumerate(anchors):
        marker(draw, xy, index + 1)
    rounded(draw, (670, 165, 1145, 635), fill=SKY, outline="#a8c4de")
    draw.text((705, 200), "Structures to discuss", font=font(25, True), fill=INK)
    for index, label in enumerate(spec["labels"]):
        y = 250 + index * 68
        marker(draw, (720, y + 12), index + 1)
        for line_number, line in enumerate(wrap(label, width=29)[:2]):
            draw.text((748, y - 2 + line_number * 26), line, font=font(20), fill=INK)
    draw.text((705, 596), "Not to scale · no outcome implied", font=font(17), fill=MUTED)
    image.save(OUT / f"{slug}-anatomy.webp", "WEBP", quality=82, method=6)


def procedure_image(slug, spec):
    image = Image.new("RGB", (1200, 675), WHITE)
    draw = ImageDraw.Draw(image)
    header(draw, f"{spec['title']}: resection scope options", "Approaches")
    for index, (name, note) in enumerate(spec["panels"]):
        column, row = index % 2, index // 2
        x, y = 55 + column * 560, 170 + row * 205
        rounded(draw, (x, y, x + 530, y + 195), fill=PALE if row == 0 else SKY)
        rounded(draw, (x + 14, y + 14, x + 182, y + 181), fill=WHITE, radius=16, width=2)
        MINIS[slug](draw, (x + 14, y + 14, x + 182, y + 181), index)
        draw.ellipse((x + 200, y + 20, x + 234, y + 54), fill=NAVY)
        draw.text((x + 211, y + 27), str(index + 1), font=font(19, True), fill=WHITE)
        name_lines = wrap(name, width=22)[:2]
        for line_number, line in enumerate(name_lines):
            draw.text((x + 246, y + 24 + line_number * 27), line, font=font(21, True), fill=INK)
        top = y + 82 if len(name_lines) == 1 else y + 88
        for line_number, line in enumerate(wrap(note, width=33)[:4]):
            draw.text((x + 200, top + line_number * 23), line, font=font(17), fill=MUTED)
    if "strip" in spec:
        title, note = spec["strip"]
        rounded(draw, (55, 590, 1145, 646), fill="#fff8e8", outline=GOLD, radius=18)
        draw.text((80, 601), f"{title}:", font=font(18, True), fill=INK)
        draw.text((80, 623), note, font=font(17), fill=MUTED)
    else:
        draw.text(
            (55, 604),
            "The surgical team may change the planned scope after examination, imaging, consent and findings during surgery.",
            font=font(18),
            fill=MUTED,
        )
    image.save(OUT / f"{slug}-procedure.webp", "WEBP", quality=82, method=6)


def recovery_image(slug, spec):
    image = Image.new("RGB", (1200, 675), PALE)
    draw = ImageDraw.Draw(image)
    header(draw, f"{spec['title']}: recovery and follow-up", "Recovery")
    draw.text(
        (58, 175),
        "Discharge ≠ fitness to fly · histopathology, not the operation, decides what follows",
        font=font(18),
        fill=MUTED,
    )
    count = len(spec["milestones"])
    spacing = 900 // (count - 1)
    half = min(100, spacing // 2 - 7)
    draw.line([(145, 290), (1045, 290)], fill="#b7cce0", width=12)
    for index, item in enumerate(spec["milestones"]):
        x = 145 + index * spacing
        draw.ellipse(
            (x - 38, 252, x + 38, 328),
            fill=NAVY if index < count - 1 else CORAL,
            outline=WHITE,
            width=6,
        )
        draw.text((x - 7, 276), str(index + 1), font=font(21, True), fill=WHITE)
        rounded(draw, (x - half, 355, x + half, 480), fill=WHITE, radius=18)
        lines, label_font = fit_lines(draw, item, 2 * half - 26)
        top = 402 - (len(lines) - 1) * 13
        for line_number, line in enumerate(lines):
            bounds = draw.textbbox((0, 0), line, font=label_font)
            draw.text(
                (x - (bounds[2] - bounds[0]) / 2, top + line_number * 26),
                line,
                font=label_font,
                fill=INK,
            )
    rounded(draw, (55, 520, 1145, 640), fill="#fdf1ef", outline=CORAL, radius=18)
    draw.text((82, 540), "Seek urgent surgical review for:", font=font(19, True), fill=CORAL)
    for line_number, line in enumerate(wrap(spec["urgent"], width=95)[:2]):
        draw.text((82, 572 + line_number * 26), line, font=font(19), fill=INK)
    image.save(OUT / f"{slug}-recovery.webp", "WEBP", quality=82, method=6)


for slug, specification in DATA.items():
    anatomy_image(slug, specification)
    procedure_image(slug, specification)
    recovery_image(slug, specification)

print(f"Generated {len(DATA) * 3} WebP diagrams in {OUT}")
