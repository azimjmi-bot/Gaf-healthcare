#!/usr/bin/env python3
"""Human-designed Canva-style CABG cost diagrams (1280x720 WebP)."""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

OUT = Path("/workspace/public/uploads/treatments")
OUT.mkdir(parents=True, exist_ok=True)

NAVY = (15, 44, 76)
TEAL = (26, 122, 140)
CORAL = (196, 84, 84)
GOLD = (196, 148, 64)
PURPLE = (98, 78, 148)
INK = (34, 48, 62)
MUTED = (90, 108, 122)
LINE = (210, 220, 226)
CARD = (247, 250, 252)
WHITE = (255, 255, 255)
VESSEL = (196, 64, 78)
GRAFT = (26, 140, 118)

SANS = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"


def font(path: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size)


def save(im: Image.Image, name: str) -> None:
    path = OUT / name
    im.save(path, "WEBP", quality=82, method=6)
    print(path, im.size)


def rounded(draw, box, fill, radius=22, outline=None, width=1):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def center_text(draw, xy, text, fnt, fill):
    x, y = xy
    bbox = draw.textbbox((0, 0), text, font=fnt)
    w, h = bbox[2] - bbox[0], bbox[3] - bbox[1]
    draw.text((x - w / 2, y - h / 2), text, font=fnt, fill=fill)


def wrap_center(draw, cx, y, text, fnt, fill, max_w):
    words = text.split()
    lines, cur = [], ""
    for word in words:
        trial = f"{cur} {word}".strip()
        if draw.textbbox((0, 0), trial, font=fnt)[2] <= max_w:
            cur = trial
        else:
            if cur:
                lines.append(cur)
            cur = word
    if cur:
        lines.append(cur)
    lh = draw.textbbox((0, 0), "Ag", font=fnt)[3]
    for i, line in enumerate(lines):
        center_text(draw, (cx, y + i * (lh + 6)), line, fnt, fill)


def header(draw, title: str, subtitle: str):
    draw.rectangle((0, 0, 1280, 92), fill=NAVY)
    draw.rectangle((0, 92, 1280, 96), fill=TEAL)
    center_text(draw, (640, 38), title, font(BOLD, 26), WHITE)
    center_text(draw, (640, 70), subtitle, font(SANS, 16), (188, 214, 222))


def draw_heart(draw, cx, cy, scale=1.0, fill=(196, 72, 86), outline=None):
    s = scale
    draw.ellipse(
        (cx - 92 * s, cy - 78 * s, cx + 8 * s, cy + 28 * s),
        fill=fill,
        outline=outline,
        width=3 if outline else 0,
    )
    draw.ellipse(
        (cx - 8 * s, cy - 78 * s, cx + 92 * s, cy + 28 * s),
        fill=fill,
        outline=outline,
        width=3 if outline else 0,
    )
    draw.polygon(
        [
            (cx - 88 * s, cy - 4 * s),
            (cx + 88 * s, cy - 4 * s),
            (cx, cy + 110 * s),
        ],
        fill=fill,
    )


def make_hero():
    im = Image.new("RGB", (1280, 720), (8, 22, 38))
    layer = Image.new("RGBA", (1280, 720), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    for box in [
        (40, -90, 520, 360, (26, 122, 140, 46)),
        (700, 20, 1420, 700, (196, 72, 86, 38)),
        (280, 300, 1040, 900, (15, 44, 76, 72)),
    ]:
        d.ellipse(box[:4], fill=box[4])
    draw_heart(d, 640, 330, 1.55, fill=(196, 72, 86, 88))
    d.arc((430, 160, 850, 520), 200, 40, fill=(232, 180, 186, 90), width=14)
    d.arc((470, 190, 900, 560), 220, 20, fill=(26, 140, 118, 120), width=16)
    d.arc((180, 240, 420, 500), 40, 220, fill=(188, 214, 222, 70), width=8)
    d.arc((860, 200, 1180, 540), 10, 200, fill=(188, 214, 222, 55), width=8)
    blurred = layer.filter(ImageFilter.GaussianBlur(1.4))
    im = Image.alpha_composite(im.convert("RGBA"), blurred).convert("RGB")
    save(im, "cabg-cost-hero.webp")


def make_circuit():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(
        d,
        "HOW A BYPASS GRAFT RESTORES FLOW",
        "The graft does not remove plaque. It opens a new route. GAF CABG planning is $5,500–$14,000.",
    )
    tiles = [
        (48, 130, 424, 680, CORAL, "BLOCKED ARTERY", "Plaque narrows a coronary artery so the heart muscle is starved of oxygen-rich blood."),
        (452, 130, 828, 680, TEAL, "GRAFT HARVEST", "A chest, arm or leg vessel is taken and prepared as a conduit."),
        (856, 130, 1232, 680, PURPLE, "NEW ROUTE", "The graft is sewn beyond the blockage so blood reaches the heart muscle again."),
    ]
    title_f = font(BOLD, 18)
    body_f = font(SANS, 17)
    for x1, y1, x2, y2, accent, title, copy in tiles:
        rounded(d, (x1, y1, x2, y2), CARD, 24, outline=LINE, width=2)
        d.rounded_rectangle((x1, y1, x2, y1 + 104), radius=24, fill=accent)
        d.rectangle((x1, y1 + 74, x2, y1 + 104), fill=accent)
        center_text(d, ((x1 + x2) / 2, y1 + 52), title, title_f, WHITE)
        cx = (x1 + x2) / 2
        if title.startswith("BLOCKED"):
            d.ellipse((cx - 70, 250, cx + 70, 430), outline=VESSEL, width=16)
            d.line((cx - 4, 290, cx + 18, 390), fill=CORAL, width=22)
        elif title.startswith("GRAFT"):
            d.arc((cx - 80, 250, cx + 80, 430), 200, 20, fill=GRAFT, width=16)
            d.ellipse((cx - 16, 248, cx + 16, 280), fill=GRAFT)
            d.ellipse((cx - 16, 400, cx + 16, 432), fill=GRAFT)
        else:
            d.ellipse((cx - 70, 250, cx + 70, 430), outline=VESSEL, width=12)
            d.arc((cx - 90, 240, cx + 90, 450), 200, 10, fill=GRAFT, width=16)
        wrap_center(d, cx, 470, copy, body_f, INK, x2 - x1 - 40)
    save(im, "cabg-cost-circuit.webp")


def make_grafts():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(
        d,
        "GRAFT COUNT NAMES THE OPERATION, NOT THE BILL",
        "Single, double, triple or quadruple names how many grafts. A complex single can cost more than a simple triple.",
    )
    tiles = [
        (36, 130, 336, 680, TEAL, "SINGLE", "1 graft", "One new route around one important blockage."),
        (352, 130, 652, 680, GOLD, "DOUBLE", "2 grafts", "Two conduits when two territories need flow."),
        (668, 130, 968, 680, CORAL, "TRIPLE", "3 grafts", "Three grafts for multivessel disease."),
        (984, 130, 1244, 680, PURPLE, "QUADRUPLE", "4 grafts", "Four grafts. Complexity still depends on anatomy."),
    ]
    title_f = font(BOLD, 18)
    count_f = font(BOLD, 22)
    body_f = font(SANS, 16)
    for x1, y1, x2, y2, accent, title, count, copy in tiles:
        rounded(d, (x1, y1, x2, y2), CARD, 22, outline=LINE, width=2)
        d.rounded_rectangle((x1, y1, x2, y1 + 96), radius=22, fill=accent)
        d.rectangle((x1, y1 + 70, x2, y1 + 96), fill=accent)
        center_text(d, ((x1 + x2) / 2, y1 + 48), title, title_f, WHITE)
        cx = (x1 + x2) / 2
        draw_heart(d, cx, 300, 0.55, fill=accent)
        n = {"SINGLE": 1, "DOUBLE": 2, "TRIPLE": 3, "QUADRUPLE": 4}[title]
        for i in range(n):
            y = 390 + i * 18
            d.arc((cx - 48, y - 20, cx + 48, y + 28), 200, 20, fill=GRAFT, width=6)
        center_text(d, (cx, 480), count, count_f, NAVY)
        wrap_center(d, cx, 520, copy, body_f, INK, x2 - x1 - 24)
    save(im, "cabg-cost-grafts.webp")


def make_drivers():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(
        d,
        "WHAT MOVES A CABG QUOTATION",
        "First-time CABG is $5,500–$14,000. Redo, mini and PCI sit on neighbouring sheets.",
    )
    tiles = [
        (40, 130, 340, 680, CORAL, "GRAFTS & ANATOMY", "Left-main, multivessel or redo work changes theatre time and risk."),
        (360, 130, 660, 680, TEAL, "ON- vs OFF-PUMP", "A heart-lung machine or beating-heart technique is a clinical choice, not a price trick."),
        (680, 130, 980, 680, GOLD, "ICU DAYS", "Routine ICU is often 1–2 days. Ventilation or bleeding extends the bill."),
        (1000, 130, 1240, 680, PURPLE, "PCI vs CABG", "Stents are $3,200–$8,500. The cheaper option is not always the right artery plan."),
    ]
    title_f = font(BOLD, 16)
    body_f = font(SANS, 16)
    for x1, y1, x2, y2, accent, title, copy in tiles:
        rounded(d, (x1, y1, x2, y2), CARD, 22, outline=LINE, width=2)
        d.rounded_rectangle((x1, y1, x2, y1 + 96), radius=22, fill=accent)
        d.rectangle((x1, y1 + 70, x2, y1 + 96), fill=accent)
        center_text(d, ((x1 + x2) / 2, y1 + 48), title, title_f, WHITE)
        cx = (x1 + x2) / 2
        if "GRAFT" in title:
            draw_heart(d, cx, 300, 0.62, fill=accent)
        elif "PUMP" in title:
            d.ellipse((cx - 46, 250, cx + 46, 342), outline=accent, width=10)
            d.ellipse((cx - 18, 278, cx + 18, 314), fill=accent)
            d.rectangle((cx - 8, 340, cx + 8, 410), fill=GOLD)
        elif "ICU" in title:
            rounded(d, (cx - 70, 250, cx + 70, 410), accent, 16)
            d.rectangle((cx - 50, 280, cx + 50, 300), fill=WHITE)
            d.rectangle((cx - 50, 320, cx + 20, 336), fill=WHITE)
            d.rectangle((cx - 50, 352, cx + 40, 368), fill=(255, 226, 180))
        else:
            d.rectangle((cx - 70, 260, cx - 8, 400), fill=TEAL)
            d.rectangle((cx + 8, 260, cx + 70, 400), fill=CORAL)
            center_text(d, (cx - 39, 330), "PCI", font(BOLD, 14), WHITE)
            center_text(d, (cx + 39, 330), "CABG", font(BOLD, 13), WHITE)
        wrap_center(d, cx, 450, copy, body_f, INK, x2 - x1 - 28)
    save(im, "cabg-cost-drivers.webp")


def make_steps():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(
        d,
        "CABG COST JOURNEY",
        "GAF first-time CABG is $5,500–$14,000. Stay is typically 7–14 nights, then nearby recovery.",
    )
    steps = [
        ("1", "RECORDS", "Angiogram, echo, ECG"),
        ("2", "HEART TEAM", "CABG, PCI or medicines"),
        ("3", "QUOTE", "Itemised inclusions"),
        ("4", "THEATRE", "Grafts sewn in 3–6 hours"),
        ("5", "ICU", "Usually 1–2 days"),
        ("6", "REHAB", "6 weeks to 3 months"),
    ]
    title_f = font(BOLD, 16)
    body_f = font(SANS, 15)
    num_f = font(BOLD, 24)
    xs = [50, 250, 450, 650, 850, 1050]
    for i, x in enumerate(xs[:-1]):
        d.line((x + 140, 360, xs[i + 1] + 20, 360), fill=TEAL, width=6)
    for x, (num, title, copy) in zip(xs, steps):
        rounded(d, (x, 180, x + 180, 560), CARD, 20, outline=LINE, width=2)
        d.ellipse((x + 60, 208, x + 120, 268), fill=TEAL)
        center_text(d, (x + 90, 238), num, num_f, WHITE)
        center_text(d, (x + 90, 310), title, title_f, NAVY)
        wrap_center(d, x + 90, 360, copy, body_f, MUTED, 150)
    center_text(
        d,
        (640, 640),
        "Neighbouring redo CABG is $8,500–$20,000. Neighbouring PCI is $3,200–$8,500.",
        font(SANS, 16),
        MUTED,
    )
    save(im, "cabg-cost-steps.webp")


if __name__ == "__main__":
    make_hero()
    make_circuit()
    make_grafts()
    make_drivers()
    make_steps()
