#!/usr/bin/env python3
"""Human-designed Canva-style mitral-replacement diagrams (1280x720 WebP)."""

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
    center_text(draw, (640, 38), title, font(BOLD, 24), WHITE)
    center_text(draw, (640, 70), subtitle, font(SANS, 16), (188, 214, 222))


def valve(draw, cx, cy, kind="leak"):
    draw.ellipse((cx - 58, cy - 58, cx + 58, cy + 58), outline=NAVY, width=8)
    if kind == "stenosis":
        draw.ellipse((cx - 16, cy - 16, cx + 16, cy + 16), fill=CORAL)
    elif kind == "leak":
        draw.pieslice((cx - 22, cy - 10, cx + 30, cy + 28), 200, 20, fill=CORAL)
    elif kind == "mechanical":
        draw.ellipse((cx - 22, cy - 22, cx + 22, cy + 22), outline=TEAL, width=6)
        draw.line((cx - 28, cy, cx + 28, cy), fill=GOLD, width=8)
    else:
        draw.ellipse((cx - 28, cy - 18, cx + 28, cy + 22), fill=TEAL)


def make_hero():
    im = Image.new("RGB", (1280, 720), (8, 22, 38))
    layer = Image.new("RGBA", (1280, 720), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    for box in [
        (20, -80, 560, 400, (26, 122, 140, 48)),
        (700, 20, 1420, 720, (196, 84, 84, 38)),
        (280, 280, 1040, 900, (15, 44, 76, 70)),
    ]:
        d.ellipse(box[:4], fill=box[4])
    d.ellipse((470, 190, 810, 530), outline=(196, 84, 84, 90), width=20)
    d.ellipse((540, 260, 740, 460), fill=(26, 122, 140, 80))
    d.line((520, 360, 760, 360), fill=(196, 148, 64, 110), width=14)
    blurred = layer.filter(ImageFilter.GaussianBlur(1.4))
    im = Image.alpha_composite(im.convert("RGBA"), blurred).convert("RGB")
    save(im, "mitral-replacement-hero.webp")


def make_anatomy():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(
        d,
        "TWO WAYS THE MITRAL VALVE FAILS",
        "Stenosis narrows the opening. Regurgitation lets blood leak backward into the left atrium.",
    )
    tiles = [
        (48, 130, 424, 680, TEAL, "LEFT ATRIUM", "Receives oxygen-rich blood from the lungs. A leak or a narrow valve fills this chamber under pressure."),
        (452, 130, 828, 680, CORAL, "MITRAL VALVE", "Sits between atrium and ventricle. Stenosis restricts flow. Regurgitation sends blood backward."),
        (856, 130, 1232, 680, PURPLE, "LEFT VENTRICLE", "Pumps to the body. Prolonged valve disease can enlarge the chamber and weaken the squeeze."),
    ]
    title_f = font(BOLD, 18)
    body_f = font(SANS, 17)
    for x1, y1, x2, y2, accent, title, copy in tiles:
        rounded(d, (x1, y1, x2, y2), CARD, 24, outline=LINE, width=2)
        d.rounded_rectangle((x1, y1, x2, y1 + 104), radius=24, fill=accent)
        d.rectangle((x1, y1 + 74, x2, y1 + 104), fill=accent)
        center_text(d, ((x1 + x2) / 2, y1 + 52), title, title_f, WHITE)
        cx = (x1 + x2) / 2
        if "ATRIUM" in title:
            d.ellipse((cx - 70, 250, cx + 70, 410), outline=accent, width=10)
        elif "MITRAL" in title:
            valve(d, cx, 330, "leak")
        else:
            d.polygon([(cx, 250), (cx + 80, 410), (cx - 80, 410)], outline=accent)
        wrap_center(d, cx, 470, copy, body_f, INK, x2 - x1 - 40)
    save(im, "mitral-replacement-anatomy.webp")


def make_valves():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(
        d,
        "MECHANICAL OR TISSUE: THE TRADE-OFF",
        "Neighbouring heart-valve replacement is $7,000–$18,000. Valve type is a Heart Team choice, not a price trick.",
    )
    tiles = [
        (80, 130, 620, 680, TEAL, "MECHANICAL", "Built for long-term durability. Usually needs lifelong anticoagulation and INR checks."),
        (660, 130, 1200, 680, GOLD, "TISSUE", "Usually avoids lifelong anticoagulation solely for the valve. Can wear and later need another procedure."),
    ]
    title_f = font(BOLD, 22)
    body_f = font(SANS, 18)
    for x1, y1, x2, y2, accent, title, copy in tiles:
        rounded(d, (x1, y1, x2, y2), CARD, 24, outline=LINE, width=2)
        d.rounded_rectangle((x1, y1, x2, y1 + 110), radius=24, fill=accent)
        d.rectangle((x1, y1 + 80, x2, y1 + 110), fill=accent)
        center_text(d, ((x1 + x2) / 2, y1 + 55), title, title_f, WHITE)
        cx = (x1 + x2) / 2
        valve(d, cx, 320, "mechanical" if title == "MECHANICAL" else "tissue")
        wrap_center(d, cx, 430, copy, body_f, INK, x2 - x1 - 50)
    save(im, "mitral-replacement-valves.webp")


def make_decision():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(
        d,
        "REPAIR IS PREFERRED WHEN IT CAN HOLD",
        "Neighbouring mitral repair is $7,500–$18,000. Replacement is $7,000–$18,000 when repair cannot last.",
    )
    tiles = [
        (40, 130, 340, 680, TEAL, "REPAIR", "Keep the native valve when leaflets and chords can be reconstructed."),
        (360, 130, 660, 680, CORAL, "REPLACE", "Used when calcification, rheumatic damage or infection make repair unreliable."),
        (680, 130, 980, 680, GOLD, "BALLOON", "Selected stenosis may use balloon mitral valvotomy at $4,000–$10,000."),
        (1000, 130, 1240, 680, PURPLE, "CLIP", "Selected regurgitation may use MitraClip at $18,000–$38,000. That is not surgical MVR."),
    ]
    title_f = font(BOLD, 16)
    body_f = font(SANS, 16)
    for x1, y1, x2, y2, accent, title, copy in tiles:
        rounded(d, (x1, y1, x2, y2), CARD, 22, outline=LINE, width=2)
        d.rounded_rectangle((x1, y1, x2, y1 + 96), radius=22, fill=accent)
        d.rectangle((x1, y1 + 70, x2, y1 + 96), fill=accent)
        center_text(d, ((x1 + x2) / 2, y1 + 48), title, title_f, WHITE)
        cx = (x1 + x2) / 2
        kind = {"REPAIR": "tissue", "REPLACE": "mechanical", "BALLOON": "stenosis", "CLIP": "leak"}[title]
        valve(d, cx, 300, kind)
        wrap_center(d, cx, 430, copy, body_f, INK, x2 - x1 - 24)
    save(im, "mitral-replacement-decision.webp")


def make_steps():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(
        d,
        "MITRAL REPLACEMENT JOURNEY",
        "Neighbouring heart-valve replacement is $7,000–$18,000. Stay is typically 8–16 nights.",
    )
    steps = [
        ("1", "ECHO", "Stenosis or leak, LV size"),
        ("2", "TEAM", "Repair vs replace"),
        ("3", "VALVE", "Mechanical or tissue"),
        ("4", "THEATRE", "Bypass and implant"),
        ("5", "ICU", "Rhythm and bleed watch"),
        ("6", "INR", "Anticoagulation if needed"),
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
        "Neighbouring mitral repair is $7,500–$18,000. TAVR is an aortic product, not a mitral quote.",
        font(SANS, 16),
        MUTED,
    )
    save(im, "mitral-replacement-steps.webp")


if __name__ == "__main__":
    make_hero()
    make_anatomy()
    make_valves()
    make_decision()
    make_steps()
