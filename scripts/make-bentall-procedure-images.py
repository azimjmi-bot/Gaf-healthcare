#!/usr/bin/env python3
"""Human-designed Canva-style Bentall diagrams (1280x720 WebP)."""

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


def conduit(draw, cx, cy, kind="composite"):
    draw.rounded_rectangle((cx - 28, cy - 110, cx + 28, cy + 70), radius=18, outline=NAVY, width=8)
    draw.ellipse((cx - 38, cy + 48, cx + 38, cy + 108), outline=TEAL, width=8)
    if kind == "mechanical":
        draw.ellipse((cx - 16, cy + 66, cx + 16, cy + 98), outline=GOLD, width=5)
        draw.line((cx - 20, cy + 82, cx + 20, cy + 82), fill=GOLD, width=5)
    elif kind == "tissue":
        draw.pieslice((cx - 18, cy + 64, cx + 18, cy + 100), 200, 20, fill=TEAL)
    else:
        draw.ellipse((cx - 12, cy + 70, cx + 12, cy + 94), fill=CORAL)
    draw.ellipse((cx - 78, cy - 18, cx - 42, cy + 18), outline=CORAL, width=6)
    draw.ellipse((cx + 42, cy - 18, cx + 78, cy + 18), outline=CORAL, width=6)
    draw.line((cx - 42, cy, cx - 28, cy), fill=CORAL, width=5)
    draw.line((cx + 28, cy, cx + 42, cy), fill=CORAL, width=5)


def make_hero():
    im = Image.new("RGB", (1280, 720), (8, 22, 38))
    layer = Image.new("RGBA", (1280, 720), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    for box in [
        (40, -90, 620, 380, (26, 122, 140, 48)),
        (680, 40, 1400, 760, (196, 84, 84, 36)),
        (260, 240, 1080, 880, (15, 44, 76, 72)),
    ]:
        d.ellipse(box[:4], fill=box[4])
    d.rounded_rectangle((590, 150, 690, 430), radius=40, outline=(188, 214, 222, 120), width=18)
    d.ellipse((560, 400, 720, 560), outline=(26, 122, 140, 130), width=16)
    d.ellipse((470, 300, 540, 370), outline=(196, 84, 84, 120), width=10)
    d.ellipse((740, 300, 810, 370), outline=(196, 84, 84, 120), width=10)
    d.line((540, 335, 590, 335), fill=(196, 84, 84, 110), width=10)
    d.line((690, 335, 740, 335), fill=(196, 84, 84, 110), width=10)
    blurred = layer.filter(ImageFilter.GaussianBlur(1.4))
    im = Image.alpha_composite(im.convert("RGBA"), blurred).convert("RGB")
    save(im, "bentall-hero.webp")


def make_anatomy():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(
        d,
        "WHAT THE AORTIC ROOT CONTAINS",
        "Bentall replaces the root and valve together, then reattaches the coronary arteries.",
    )
    tiles = [
        (40, 128, 340, 680, TEAL, "AORTIC VALVE", "Three leaflets that stop blood falling back into the left ventricle."),
        (360, 128, 660, 680, CORAL, "ANNULUS AND SINUSES", "The ring and sinuses of Valsalva that form the root wall."),
        (680, 128, 980, 680, GOLD, "CORONARY OSTIA", "The left and right coronary openings that must be reimplanted."),
        (1000, 128, 1240, 680, PURPLE, "ASCENDING AORTA", "May be replaced in the same sitting when the wall is diseased."),
    ]
    title_f = font(BOLD, 15)
    body_f = font(SANS, 16)
    for x1, y1, x2, y2, accent, title, copy in tiles:
        rounded(d, (x1, y1, x2, y2), CARD, 22, outline=LINE, width=2)
        d.rounded_rectangle((x1, y1, x2, y1 + 96), radius=22, fill=accent)
        d.rectangle((x1, y1 + 70, x2, y1 + 96), fill=accent)
        center_text(d, ((x1 + x2) / 2, y1 + 48), title, title_f, WHITE)
        cx = (x1 + x2) / 2
        if "VALVE" in title:
            d.ellipse((cx - 52, 280, cx + 52, 384), outline=accent, width=8)
            d.pieslice((cx - 24, 308, cx + 24, 356), 200, 20, fill=accent)
        elif "ANNULUS" in title:
            d.rounded_rectangle((cx - 26, 250, cx + 26, 410), radius=16, outline=accent, width=8)
            d.ellipse((cx - 40, 380, cx + 40, 440), outline=accent, width=8)
        elif "CORONARY" in title:
            conduit(d, cx, 330, "composite")
        else:
            d.rounded_rectangle((cx - 22, 250, cx + 22, 430), radius=14, outline=accent, width=8)
        wrap_center(d, cx, 480, copy, body_f, INK, x2 - x1 - 28)
    save(im, "bentall-anatomy.webp")


def make_decision():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(
        d,
        "BENTALL IS NOT EVERY ROOT OPERATION",
        "Neighbouring root replacement is $10,000–$24,000. Isolated AVR is $7,000–$18,500.",
    )
    tiles = [
        (40, 128, 340, 680, CORAL, "BENTALL", "Root and valve replaced with a composite graft. Coronaries are reattached."),
        (360, 128, 660, 680, TEAL, "VALVE-SPARING", "Root replaced, native valve kept when leaflets can hold. No David page is live."),
        (680, 128, 980, 680, GOLD, "ISOLATED AVR", "Valve only. The root stays. Neighbouring SAVR is $7,000–$18,500."),
        (1000, 128, 1240, 680, PURPLE, "ASCENDING ONLY", "Tube graft above a sound root and valve. Not a Bentall."),
    ]
    title_f = font(BOLD, 15)
    body_f = font(SANS, 16)
    for x1, y1, x2, y2, accent, title, copy in tiles:
        rounded(d, (x1, y1, x2, y2), CARD, 22, outline=LINE, width=2)
        d.rounded_rectangle((x1, y1, x2, y1 + 96), radius=22, fill=accent)
        d.rectangle((x1, y1 + 70, x2, y1 + 96), fill=accent)
        center_text(d, ((x1 + x2) / 2, y1 + 48), title, title_f, WHITE)
        cx = (x1 + x2) / 2
        if title == "BENTALL":
            conduit(d, cx, 330, "composite")
        elif title == "VALVE-SPARING":
            d.rounded_rectangle((cx - 24, 250, cx + 24, 400), radius=14, outline=accent, width=8)
            d.ellipse((cx - 34, 390, cx + 34, 450), outline=TEAL, width=7)
        elif title == "ISOLATED AVR":
            d.ellipse((cx - 48, 300, cx + 48, 396), outline=accent, width=8)
            d.ellipse((cx - 16, 332, cx + 16, 364), outline=GOLD, width=5)
        else:
            d.rounded_rectangle((cx - 20, 250, cx + 20, 430), radius=12, outline=accent, width=8)
        wrap_center(d, cx, 490, copy, body_f, INK, x2 - x1 - 24)
    save(im, "bentall-decision.webp")


def make_conduit():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(
        d,
        "THE CONDUIT CARRIES A VALVE CHOICE",
        "Neighbouring aortic root replacement is $10,000–$24,000. Valve type is not a price trick.",
    )
    tiles = [
        (80, 130, 620, 680, TEAL, "MECHANICAL CONDUIT", "Built for long-term durability. Usually needs lifelong anticoagulation and INR checks."),
        (660, 130, 1200, 680, GOLD, "TISSUE CONDUIT", "Usually avoids lifelong anticoagulation solely for the valve. Can wear and later need another procedure."),
    ]
    title_f = font(BOLD, 20)
    body_f = font(SANS, 18)
    for x1, y1, x2, y2, accent, title, copy in tiles:
        rounded(d, (x1, y1, x2, y2), CARD, 24, outline=LINE, width=2)
        d.rounded_rectangle((x1, y1, x2, y1 + 110), radius=24, fill=accent)
        d.rectangle((x1, y1 + 80, x2, y1 + 110), fill=accent)
        center_text(d, ((x1 + x2) / 2, y1 + 55), title, title_f, WHITE)
        cx = (x1 + x2) / 2
        conduit(d, cx, 330, "mechanical" if "MECHANICAL" in title else "tissue")
        wrap_center(d, cx, 480, copy, body_f, INK, x2 - x1 - 50)
    save(im, "bentall-conduit.webp")


def make_steps():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(
        d,
        "BENTALL JOURNEY IN INDIA",
        "Neighbouring aortic root replacement is $10,000–$24,000. Stay is typically 10–18 nights.",
    )
    steps = [
        ("1", "CTA", "Root size and coronaries"),
        ("2", "TEAM", "Bentall vs valve-sparing"),
        ("3", "VALVE", "Mechanical or tissue"),
        ("4", "THEATRE", "Graft and reimplant"),
        ("5", "ICU", "Bleed, brain, kidney"),
        ("6", "WATCH", "Lifelong aorta imaging"),
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
        "TAVR is a catheter aortic valve, not TEVAR and not a Bentall quote. Acute chest pain is a local emergency.",
        font(SANS, 16),
        MUTED,
    )
    save(im, "bentall-steps.webp")


if __name__ == "__main__":
    make_hero()
    make_anatomy()
    make_decision()
    make_conduit()
    make_steps()
