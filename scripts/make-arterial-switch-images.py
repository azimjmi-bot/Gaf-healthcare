#!/usr/bin/env python3
"""Human-designed Canva-style arterial-switch diagrams (1280x720 WebP)."""

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


def crossed_vessels(draw, cx, cy, swapped=True):
    left = CORAL if swapped else TEAL
    right = TEAL if swapped else NAVY
    draw.line((cx - 28, cy - 70, cx - 28, cy + 80), fill=left, width=14)
    draw.line((cx + 28, cy - 70, cx + 28, cy + 80), fill=right, width=14)
    if swapped:
        draw.line((cx - 28, cy - 10, cx + 28, cy + 20), fill=GOLD, width=6)
        draw.ellipse((cx - 12, cy - 8, cx + 12, cy + 16), outline=CORAL, width=5)
    else:
        draw.ellipse((cx - 10, cy + 8, cx - 2, cy + 16), fill=GOLD)
        draw.ellipse((cx + 2, cy + 8, cx + 10, cy + 16), fill=GOLD)


def make_hero():
    im = Image.new("RGB", (1280, 720), (8, 22, 38))
    layer = Image.new("RGBA", (1280, 720), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    for box in [
        (10, -90, 520, 390, (26, 122, 140, 50)),
        (740, 10, 1440, 760, (196, 84, 84, 36)),
        (250, 210, 1070, 900, (15, 44, 76, 72)),
    ]:
        d.ellipse(box[:4], fill=box[4])
    d.line((560, 180, 560, 560), fill=(196, 84, 84, 150), width=22)
    d.line((720, 180, 720, 560), fill=(26, 122, 140, 150), width=22)
    d.line((560, 320, 720, 400), fill=(196, 148, 64, 160), width=10)
    d.ellipse((610, 330, 670, 390), outline=(188, 214, 222, 160), width=8)
    blurred = layer.filter(ImageFilter.GaussianBlur(1.4))
    im = Image.alpha_composite(im.convert("RGBA"), blurred).convert("RGB")
    save(im, "aso-hero.webp")


def make_anatomy():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(
        d,
        "WHAT d-TGA DOES TO CIRCULATION",
        "The great arteries leave the wrong ventricles. The baby depends on mixing to stay oxygenated.",
    )
    tiles = [
        (48, 130, 424, 680, TEAL, "NORMAL", "Left ventricle to aorta. Right ventricle to lungs. Two sequential loops."),
        (452, 130, 828, 680, CORAL, "d-TGA", "The connections are reversed. Body and lungs run as two separate loops."),
        (856, 130, 1232, 680, PURPLE, "MIXING", "PDA, PFO, ASD or VSD can let oxygenated blood reach the body until repair."),
    ]
    title_f = font(BOLD, 18)
    body_f = font(SANS, 17)
    for x1, y1, x2, y2, accent, title, copy in tiles:
        rounded(d, (x1, y1, x2, y2), CARD, 24, outline=LINE, width=2)
        d.rounded_rectangle((x1, y1, x2, y1 + 104), radius=24, fill=accent)
        d.rectangle((x1, y1 + 74, x2, y1 + 104), fill=accent)
        center_text(d, ((x1 + x2) / 2, y1 + 52), title, title_f, WHITE)
        cx = (x1 + x2) / 2
        if title == "NORMAL":
            crossed_vessels(d, cx, 340, False)
        elif title == "d-TGA":
            crossed_vessels(d, cx, 340, True)
        else:
            d.ellipse((cx - 40, 280, cx + 40, 360), outline=accent, width=8)
            d.arc((cx - 18, 300, cx + 18, 336), 40, 300, fill=accent, width=6)
        wrap_center(d, cx, 500, copy, body_f, INK, x2 - x1 - 40)
    save(im, "aso-anatomy.webp")


def make_decision():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(
        d,
        "ASO IS THE NAMED ANATOMICAL REPAIR",
        "GAF arterial switch planning is $12,000–$26,000. Mustard, Senning and ECMO are not live treatment pages.",
    )
    tiles = [
        (40, 128, 340, 680, TEAL, "ASO", "Switch the arteries and transfer coronaries so the left ventricle pumps to the body."),
        (360, 128, 660, 680, GOLD, "BAS", "Balloon atrial septostomy can raise mixing before surgery. It is not the repair."),
        (680, 128, 980, 680, CORAL, "WITH VSD", "Selected babies have ASO plus VSD closure in the same sitting after imaging."),
        (1000, 128, 1240, 680, PURPLE, "ATRIAL", "Mustard or Senning baffle the atria. They are older options, not this page."),
    ]
    title_f = font(BOLD, 16)
    body_f = font(SANS, 16)
    for x1, y1, x2, y2, accent, title, copy in tiles:
        rounded(d, (x1, y1, x2, y2), CARD, 22, outline=LINE, width=2)
        d.rounded_rectangle((x1, y1, x2, y1 + 96), radius=22, fill=accent)
        d.rectangle((x1, y1 + 70, x2, y1 + 96), fill=accent)
        center_text(d, ((x1 + x2) / 2, y1 + 48), title, title_f, WHITE)
        cx = (x1 + x2) / 2
        if title == "ASO":
            crossed_vessels(d, cx, 330, False)
        elif title == "BAS":
            d.ellipse((cx - 36, 290, cx + 36, 360), outline=accent, width=7)
            d.line((cx - 20, 325, cx + 20, 325), fill=accent, width=6)
        elif title == "WITH VSD":
            d.rounded_rectangle((cx - 40, 280, cx + 40, 380), radius=12, outline=accent, width=7)
            d.ellipse((cx - 10, 318, cx + 10, 338), outline=CORAL, width=4)
        else:
            d.arc((cx - 34, 290, cx + 34, 358), 200, 520, fill=accent, width=8)
        wrap_center(d, cx, 470, copy, body_f, INK, x2 - x1 - 24)
    save(im, "aso-decision.webp")


def make_operation():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(
        d,
        "WHAT THE ARTERIAL SWITCH ACTUALLY MOVES",
        "Open-heart bypass, coronary transfer, arterial reconnection, then a pediatric cardiac ICU.",
    )
    tiles = [
        (40, 128, 340, 680, TEAL, "BYPASS", "A heart-lung machine supports the baby while the great arteries are divided."),
        (360, 128, 660, 680, GOLD, "CORONARIES", "The coronary buttons are moved to the new aortic root. This is the critical step."),
        (680, 128, 980, 680, CORAL, "SWITCH", "Aorta to the left ventricle. Pulmonary artery to the right. LeCompte when used."),
        (1000, 128, 1240, 680, PURPLE, "ICU", "Ventilation, saturation, heart function and feeding decide the stay, not a brochure."),
    ]
    title_f = font(BOLD, 16)
    body_f = font(SANS, 16)
    for x1, y1, x2, y2, accent, title, copy in tiles:
        rounded(d, (x1, y1, x2, y2), CARD, 22, outline=LINE, width=2)
        d.rounded_rectangle((x1, y1, x2, y1 + 96), radius=22, fill=accent)
        d.rectangle((x1, y1 + 70, x2, y1 + 96), fill=accent)
        center_text(d, ((x1 + x2) / 2, y1 + 48), title, title_f, WHITE)
        cx = (x1 + x2) / 2
        if title == "BYPASS":
            d.ellipse((cx - 34, 280, cx + 34, 348), outline=accent, width=8)
            d.arc((cx - 18, 296, cx + 18, 332), 40, 300, fill=accent, width=6)
        elif title == "CORONARIES":
            d.line((cx, 250, cx, 420), fill=accent, width=12)
            d.ellipse((cx - 22, 300, cx - 6, 316), fill=GOLD)
            d.ellipse((cx + 6, 300, cx + 22, 316), fill=GOLD)
        elif title == "SWITCH":
            crossed_vessels(d, cx, 330, False)
        else:
            d.rounded_rectangle((cx - 28, 270, cx + 28, 410), radius=10, outline=accent, width=7)
            d.line((cx - 12, 300, cx + 12, 300), fill=accent, width=4)
        wrap_center(d, cx, 470, copy, body_f, INK, x2 - x1 - 24)
    save(im, "aso-operation.webp")


def make_steps():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(
        d,
        "ARTERIAL SWITCH JOURNEY IN INDIA",
        "GAF arterial switch is $12,000–$26,000. Stay is typically 10–21 nights; parent stay expected.",
    )
    steps = [
        ("1", "ECHO", "Coronaries and mix"),
        ("2", "STABILISE", "BAS or prostaglandin"),
        ("3", "PLAN", "Name ASO plus extras"),
        ("4", "THEATRE", "Switch and transfer"),
        ("5", "CICU", "Ventilator and feeds"),
        ("6", "WATCH", "Lifelong imaging"),
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
        "A cyanotic or collapsing newborn belongs in a local emergency department. WhatsApp is for planned records.",
        font(SANS, 16),
        MUTED,
    )
    save(im, "aso-steps.webp")


if __name__ == "__main__":
    make_hero()
    make_anatomy()
    make_decision()
    make_operation()
    make_steps()
