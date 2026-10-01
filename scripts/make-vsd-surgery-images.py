#!/usr/bin/env python3
"""Human-designed Canva-style VSD diagrams (1280x720 WebP)."""

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


def two_chambers(draw, cx, cy, hole=True, patch=False, accent=CORAL):
    rounded(draw, (cx - 90, cy - 70, cx - 8, cy + 70), (232, 210, 214), 18)
    rounded(draw, (cx + 8, cy - 70, cx + 90, cy + 70), (210, 226, 232), 18)
    if hole:
        draw.ellipse((cx - 16, cy - 16, cx + 16, cy + 16), fill=accent)
    if patch:
        draw.ellipse((cx - 18, cy - 18, cx + 18, cy + 18), fill=GOLD)


def make_hero():
    im = Image.new("RGB", (1280, 720), (8, 22, 38))
    layer = Image.new("RGBA", (1280, 720), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    for box in [
        (40, -60, 540, 400, (26, 122, 140, 50)),
        (740, 60, 1380, 720, (214, 96, 108, 40)),
        (320, 280, 1000, 880, (15, 44, 76, 70)),
    ]:
        d.ellipse(box[:4], fill=box[4])
    d.rounded_rectangle((380, 220, 540, 500), radius=40, fill=(214, 96, 108, 80))
    d.rounded_rectangle((560, 220, 720, 500), radius=40, fill=(188, 214, 222, 70))
    d.ellipse((520, 330, 580, 390), fill=(196, 148, 64, 90))
    blurred = layer.filter(ImageFilter.GaussianBlur(1.4))
    im = Image.alpha_composite(im.convert("RGBA"), blurred).convert("RGB")
    save(im, "vsd-surgery-hero.webp")


def make_shunt():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(d, "A VSD LETS BLOOD CROSS THE VENTRICLES", "A small hole may close. A large hole can flood the lungs and enlarge the heart.")
    tiles = [
        (48, 130, 424, 680, TEAL, "LEFT VENTRICLE", "Oxygen-rich blood should leave for the body. A hole lets some of it leak rightward."),
        (452, 130, 828, 680, CORAL, "THE HOLE", "Size, location and shunt, not a single millimetre, decide whether closure is named."),
        (856, 130, 1232, 680, PURPLE, "LUNGS", "Extra volume can cause poor feeding, breathlessness and later pulmonary hypertension."),
    ]
    title_f = font(BOLD, 20)
    body_f = font(SANS, 17)
    for x1, y1, x2, y2, accent, title, copy in tiles:
        rounded(d, (x1, y1, x2, y2), CARD, 24, outline=LINE, width=2)
        d.rounded_rectangle((x1, y1, x2, y1 + 110), radius=24, fill=accent)
        d.rectangle((x1, y1 + 78, x2, y1 + 110), fill=accent)
        center_text(d, ((x1 + x2) / 2, y1 + 55), title, title_f, WHITE)
        cx = (x1 + x2) / 2
        two_chambers(d, cx, 320, hole=title == "THE HOLE", accent=accent)
        wrap_center(d, cx, 450, copy, body_f, INK, x2 - x1 - 40)
    save(im, "vsd-surgery-shunt.webp")


def make_types():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(d, "LOCATION NAMES THE PRODUCT", "Perimembranous, muscular, inlet and outlet defects are not interchangeable.")
    tiles = [
        (40, 130, 340, 680, CORAL, "PERIMEMBRANOUS", "Near the aortic and tricuspid valves. Conduction tissue sits close."),
        (360, 130, 660, 680, TEAL, "MUSCULAR", "In the muscle wall. Small defects more often close on their own."),
        (680, 130, 980, 680, GOLD, "INLET", "Near the atrioventricular valves. Often part of more complex anatomy."),
        (1000, 130, 1240, 680, PURPLE, "OUTLET", "Near the great arteries. Watch the aortic valve for leak."),
    ]
    title_f = font(BOLD, 16)
    body_f = font(SANS, 16)
    for x1, y1, x2, y2, accent, title, copy in tiles:
        rounded(d, (x1, y1, x2, y2), CARD, 22, outline=LINE, width=2)
        d.rounded_rectangle((x1, y1, x2, y1 + 96), radius=22, fill=accent)
        d.rectangle((x1, y1 + 70, x2, y1 + 96), fill=accent)
        center_text(d, ((x1 + x2) / 2, y1 + 48), title, title_f, WHITE)
        cx = (x1 + x2) / 2
        two_chambers(d, cx, 300, hole=True, accent=accent)
        wrap_center(d, cx, 430, copy, body_f, INK, x2 - x1 - 28)
    save(im, "vsd-surgery-types.webp")


def make_pathways():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(d, "WATCH, PATCH OR DEVICE", "There is no VSD-only GAF sheet. Neighbouring congenital heart surgery is $8,000–$28,000.")
    tiles = [
        (48, 130, 424, 680, PURPLE, "WATCH", "Many small holes close. Echo, not a brochure, says when observation is honest."),
        (452, 130, 828, 680, CORAL, "SURGICAL PATCH", "Open closure on bypass for large or complex holes. Neighbouring congenital surgery is $8,000–$28,000."),
        (856, 130, 1232, 680, TEAL, "DEVICE", "Selected muscular holes can take a catheter device. Device work is hospital-priced."),
    ]
    title_f = font(BOLD, 20)
    body_f = font(SANS, 17)
    for x1, y1, x2, y2, accent, title, copy in tiles:
        rounded(d, (x1, y1, x2, y2), CARD, 24, outline=LINE, width=2)
        d.rounded_rectangle((x1, y1, x2, y1 + 110), radius=24, fill=accent)
        d.rectangle((x1, y1 + 78, x2, y1 + 110), fill=accent)
        center_text(d, ((x1 + x2) / 2, y1 + 55), title, title_f, WHITE)
        cx = (x1 + x2) / 2
        two_chambers(d, cx, 320, hole=title == "WATCH", patch=title == "SURGICAL PATCH", accent=accent)
        if title == "DEVICE":
            d.rounded_rectangle((cx - 10, 250, cx + 10, 390), radius=6, fill=(232, 210, 214))
        wrap_center(d, cx, 450, copy, body_f, INK, x2 - x1 - 40)
    save(im, "vsd-surgery-pathways.webp")


def make_steps():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(d, "VSD CLOSURE JOURNEY", "Neighbouring congenital heart surgery is $8,000–$28,000. Parent stay is expected.")
    steps = [
        ("1", "ECHO", "Size, location and shunt"),
        ("2", "TEAM", "Watch, patch or device is named"),
        ("3", "PLAN", "Itemised estimate after records"),
        ("4", "CLOSE", "Patch on bypass or a device"),
        ("5", "ICU", "Rhythm, feeding and oxygen"),
        ("6", "FOLLOW", "Residual hole and valve watch"),
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
        "Neighbouring pacemaker implantation is $3,500–$9,000 if complete heart block is named after closure.",
        font(SANS, 16),
        MUTED,
    )
    save(im, "vsd-surgery-steps.webp")


if __name__ == "__main__":
    make_hero()
    make_shunt()
    make_types()
    make_pathways()
    make_steps()
