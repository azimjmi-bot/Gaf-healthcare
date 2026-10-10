#!/usr/bin/env python3
"""Human-designed Canva-style ASD diagrams (1280x720 WebP)."""

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
PINK = (214, 96, 108)

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


def atria(draw, cx, cy, hole=True, device=False, patch=False, accent=CORAL):
    rounded(draw, (cx - 96, cy - 58, cx - 6, cy + 58), (232, 210, 214), 28)
    rounded(draw, (cx + 6, cy - 58, cx + 96, cy + 58), (210, 226, 232), 28)
    if hole:
        draw.ellipse((cx - 14, cy - 14, cx + 14, cy + 14), fill=accent)
    if patch:
        draw.ellipse((cx - 16, cy - 16, cx + 16, cy + 16), fill=GOLD)
    if device:
        draw.ellipse((cx - 28, cy - 22, cx + 28, cy + 22), outline=TEAL, width=5)
        draw.ellipse((cx - 10, cy - 10, cx + 10, cy + 10), fill=TEAL)


def make_hero():
    im = Image.new("RGB", (1280, 720), (8, 22, 38))
    layer = Image.new("RGBA", (1280, 720), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    for box in [
        (20, -80, 560, 380, (26, 122, 140, 48)),
        (720, 80, 1400, 760, (214, 96, 108, 38)),
        (300, 260, 1020, 900, (15, 44, 76, 68)),
    ]:
        d.ellipse(box[:4], fill=box[4])
    d.ellipse((390, 230, 610, 470), fill=(214, 96, 108, 78))
    d.ellipse((670, 230, 890, 470), fill=(188, 214, 222, 68))
    d.ellipse((610, 320, 670, 380), fill=(196, 148, 64, 88))
    blurred = layer.filter(ImageFilter.GaussianBlur(1.4))
    im = Image.alpha_composite(im.convert("RGBA"), blurred).convert("RGB")
    save(im, "asd-hero.webp")


def make_anatomy():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(
        d,
        "AN ASD LETS BLOOD CROSS THE ATRIA",
        "A small hole may be watched. A large hole can flood the lungs and enlarge the right heart.",
    )
    tiles = [
        (48, 130, 424, 680, TEAL, "LEFT ATRIUM", "Oxygen-rich blood should stay on the left. A hole lets some of it leak rightward."),
        (452, 130, 828, 680, CORAL, "THE HOLE", "Type, rims and shunt, not a single millimetre, decide whether closure is named."),
        (856, 130, 1232, 680, PURPLE, "RIGHT HEART", "Extra volume can enlarge the right atrium and ventricle and later raise lung pressure."),
    ]
    title_f = font(BOLD, 20)
    body_f = font(SANS, 17)
    for x1, y1, x2, y2, accent, title, copy in tiles:
        rounded(d, (x1, y1, x2, y2), CARD, 24, outline=LINE, width=2)
        d.rounded_rectangle((x1, y1, x2, y1 + 110), radius=24, fill=accent)
        d.rectangle((x1, y1 + 78, x2, y1 + 110), fill=accent)
        center_text(d, ((x1 + x2) / 2, y1 + 55), title, title_f, WHITE)
        cx = (x1 + x2) / 2
        atria(d, cx, 320, hole=title == "THE HOLE", accent=accent)
        wrap_center(d, cx, 450, copy, body_f, INK, x2 - x1 - 40)
    save(im, "asd-anatomy.webp")


def make_types():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(d, "LOCATION NAMES THE PRODUCT", "Secundum, primum, sinus venosus and coronary sinus defects are not interchangeable.")
    tiles = [
        (40, 130, 340, 680, TEAL, "SECUNDUM", "Central septum. The type most often considered for a catheter device when rims are adequate."),
        (360, 130, 660, 680, CORAL, "PRIMUM", "Lower septum, often with AV-valve issues. Usually a surgical repair, not a routine device."),
        (680, 130, 980, 680, GOLD, "SINUS VENOSUS", "Near a vena cava. Often paired with abnormal pulmonary veins. Surgery is usual."),
        (1000, 130, 1240, 680, PURPLE, "CORONARY SINUS", "Uncommon anatomy around the coronary sinus. Surgical treatment may be required."),
    ]
    title_f = font(BOLD, 15)
    body_f = font(SANS, 15)
    for x1, y1, x2, y2, accent, title, copy in tiles:
        rounded(d, (x1, y1, x2, y2), CARD, 22, outline=LINE, width=2)
        d.rounded_rectangle((x1, y1, x2, y1 + 96), radius=22, fill=accent)
        d.rectangle((x1, y1 + 70, x2, y1 + 96), fill=accent)
        center_text(d, ((x1 + x2) / 2, y1 + 48), title, title_f, WHITE)
        cx = (x1 + x2) / 2
        atria(d, cx, 300, hole=True, accent=accent)
        wrap_center(d, cx, 430, copy, body_f, INK, x2 - x1 - 28)
    save(im, "asd-types.webp")


def make_options():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(
        d,
        "WATCH, DEVICE OR SURGERY",
        "GAF ASD closure is $4,000–$9,500. Neighbouring congenital heart surgery is $8,000–$28,000.",
    )
    tiles = [
        (48, 130, 424, 680, PURPLE, "WATCH", "Many small holes stay harmless. Echo, not a brochure, says when observation is honest."),
        (452, 130, 828, 680, TEAL, "DEVICE", "Selected secundum holes can take a catheter device. Anatomy and rims decide, not brand."),
        (856, 130, 1232, 680, CORAL, "SURGERY", "Primum, sinus venosus, coronary sinus and unsuitable secundum holes need a surgical list."),
    ]
    title_f = font(BOLD, 20)
    body_f = font(SANS, 17)
    for x1, y1, x2, y2, accent, title, copy in tiles:
        rounded(d, (x1, y1, x2, y2), CARD, 24, outline=LINE, width=2)
        d.rounded_rectangle((x1, y1, x2, y1 + 110), radius=24, fill=accent)
        d.rectangle((x1, y1 + 78, x2, y1 + 110), fill=accent)
        center_text(d, ((x1 + x2) / 2, y1 + 55), title, title_f, WHITE)
        cx = (x1 + x2) / 2
        atria(
            d,
            cx,
            320,
            hole=title == "WATCH",
            device=title == "DEVICE",
            patch=title == "SURGERY",
            accent=accent,
        )
        wrap_center(d, cx, 450, copy, body_f, INK, x2 - x1 - 40)
    save(im, "asd-options.webp")


def make_steps():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(
        d,
        "ASD CLOSURE JOURNEY",
        "GAF ASD closure is $4,000–$9,500. Stay is typically 5–10 nights; parent stay expected.",
    )
    steps = [
        ("1", "ECHO", "Type, size, rims and shunt"),
        ("2", "TEAM", "Watch, device or surgery"),
        ("3", "PLAN", "Itemised estimate after records"),
        ("4", "CLOSE", "Device or surgical patch"),
        ("5", "RECOVER", "Rhythm, wound and oxygen"),
        ("6", "FOLLOW", "Residual hole and right-heart watch"),
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
        "Neighbouring VSD closure is $4,500–$11,000. PDA closure is $3,500–$8,500 when a second hole is named.",
        font(SANS, 16),
        MUTED,
    )
    save(im, "asd-steps.webp")


if __name__ == "__main__":
    make_hero()
    make_anatomy()
    make_types()
    make_options()
    make_steps()
