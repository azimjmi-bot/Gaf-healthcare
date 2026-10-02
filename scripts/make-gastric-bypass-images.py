#!/usr/bin/env python3
"""Human-designed Canva-style gastric-bypass diagrams (1280x720 WebP)."""

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
STOMACH = (232, 176, 148)
POUCH = (210, 226, 232)
INTESTINE = (196, 148, 64)

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


def rygb(draw, cx, cy, scale=1.0, show_labels=False, accent=TEAL):
    """Draw a Roux-en-Y: small pouch, remnant stomach, Roux limb, BP limb."""
    s = scale
    pouch = (cx - 28 * s, cy - 70 * s, cx + 18 * s, cy - 18 * s)
    remnant = (cx - 8 * s, cy - 36 * s, cx + 62 * s, cy + 38 * s)
    draw.ellipse(remnant, fill=STOMACH)
    draw.ellipse(pouch, fill=POUCH, outline=accent, width=3)
    # Roux limb from pouch down then right
    draw.line((cx - 6 * s, cy - 20 * s, cx - 6 * s, cy + 78 * s), fill=accent, width=int(8 * s))
    draw.line((cx - 6 * s, cy + 78 * s, cx + 54 * s, cy + 78 * s), fill=accent, width=int(8 * s))
    # Biliopancreatic limb from remnant
    draw.line((cx + 28 * s, cy + 34 * s, cx + 28 * s, cy + 108 * s), fill=GOLD, width=int(7 * s))
    draw.line((cx + 28 * s, cy + 108 * s, cx + 54 * s, cy + 78 * s), fill=GOLD, width=int(7 * s))
    # Common channel
    draw.line((cx + 54 * s, cy + 78 * s, cx + 96 * s, cy + 78 * s), fill=PURPLE, width=int(8 * s))
    if show_labels:
        fnt = font(SANS, 13)
        draw.text((cx - 92 * s, cy - 58 * s), "Pouch", font=fnt, fill=INK)
        draw.text((cx + 68 * s, cy - 8 * s), "Remnant", font=fnt, fill=MUTED)
        draw.text((cx - 78 * s, cy + 36 * s), "Roux limb", font=fnt, fill=accent)
        draw.text((cx + 36 * s, cy + 118 * s), "BP limb", font=fnt, fill=GOLD)


def sleeve(draw, cx, cy, scale=1.0):
    draw.ellipse((cx - 8 * scale, cy - 70 * scale, cx + 62 * scale, cy + 42 * scale), fill=(236, 214, 210))
    draw.rounded_rectangle(
        (cx - 18 * scale, cy - 72 * scale, cx + 16 * scale, cy + 70 * scale),
        radius=int(18 * scale),
        fill=POUCH,
        outline=TEAL,
        width=3,
    )
    draw.line((cx - 2 * scale, cy + 68 * scale, cx - 2 * scale, cy + 118 * scale), fill=GOLD, width=int(7 * scale))


def oagb(draw, cx, cy, scale=1.0):
    draw.rounded_rectangle(
        (cx - 18 * scale, cy - 72 * scale, cx + 22 * scale, cy + 8 * scale),
        radius=int(16 * scale),
        fill=POUCH,
        outline=PURPLE,
        width=3,
    )
    draw.ellipse((cx + 6 * scale, cy - 20 * scale, cx + 70 * scale, cy + 48 * scale), fill=STOMACH)
    draw.line((cx + 2 * scale, cy + 4 * scale, cx + 2 * scale, cy + 88 * scale), fill=PURPLE, width=int(8 * scale))
    draw.arc(
        (cx - 40 * scale, cy + 40 * scale, cx + 70 * scale, cy + 130 * scale),
        start=200,
        end=340,
        fill=GOLD,
        width=int(7 * scale),
    )


def make_hero():
    im = Image.new("RGB", (1280, 720), (8, 22, 38))
    layer = Image.new("RGBA", (1280, 720), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    for box in [
        (20, -60, 560, 400, (26, 122, 140, 48)),
        (720, 80, 1420, 800, (196, 84, 84, 32)),
        (300, 220, 1080, 880, (15, 44, 76, 72)),
    ]:
        d.ellipse(box[:4], fill=box[4])
    # Unlabeled Roux-en-Y silhouette
    d.ellipse((610, 210, 790, 390), fill=(232, 176, 148, 90))
    d.ellipse((540, 170, 650, 290), fill=(210, 226, 232, 120))
    d.line((590, 270, 590, 470), fill=(26, 122, 140, 140), width=14)
    d.line((590, 470, 760, 470), fill=(26, 122, 140, 140), width=14)
    d.line((700, 360, 700, 520), fill=(196, 148, 64, 130), width=12)
    d.line((700, 520, 760, 470), fill=(196, 148, 64, 130), width=12)
    d.line((760, 470, 900, 470), fill=(98, 78, 148, 130), width=14)
    blurred = layer.filter(ImageFilter.GaussianBlur(1.3))
    im = Image.alpha_composite(im.convert("RGBA"), blurred).convert("RGB")
    save(im, "gastric-bypass-hero.webp")


def make_anatomy():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(
        d,
        "ROUX-EN-Y CHANGES THE PATH, NOT ONLY THE SIZE",
        "A small pouch joins a Roux limb. Digestive juices meet food farther downstream.",
    )
    rounded(d, (48, 130, 760, 680), CARD, 24, outline=LINE, width=2)
    rygb(d, 360, 360, scale=2.15, show_labels=True, accent=TEAL)
    tiles = [
        (800, 130, 1232, 292, TEAL, "POUCH", "The upper stomach becomes a small reservoir. Meals are smaller and fullness arrives earlier."),
        (800, 312, 1232, 474, GOLD, "BYPASS", "Food skips most of the stomach and the first small-intestine segment."),
        (800, 494, 1232, 680, PURPLE, "METABOLIC", "Gut hormones, glucose handling and satiety change. This is not a simple shrink."),
    ]
    title_f = font(BOLD, 18)
    body_f = font(SANS, 16)
    for x1, y1, x2, y2, accent, title, copy in tiles:
        rounded(d, (x1, y1, x2, y2), CARD, 20, outline=LINE, width=2)
        d.rectangle((x1, y1, x1 + 10, y2), fill=accent)
        center_text(d, ((x1 + x2) / 2 + 6, y1 + 36), title, title_f, accent)
        wrap_center(d, (x1 + x2) / 2 + 6, y1 + 68, copy, body_f, INK, x2 - x1 - 48)
    save(im, "gastric-bypass-anatomy.webp")


def make_compare():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(
        d,
        "THREE DIFFERENT ANATOMIES",
        "Sleeve, Roux-en-Y and one-anastomosis bypass are not interchangeable products.",
    )
    tiles = [
        (48, 130, 424, 680, TEAL, "SLEEVE", "Removes most of the stomach. No intestinal bypass. Reflux can worsen in some patients."),
        (452, 130, 828, 680, CORAL, "ROUX-EN-Y", "Small pouch plus two intestinal joins. Strong metabolic effect. Higher vitamin need."),
        (856, 130, 1232, 680, PURPLE, "OAGB / MINI", "One principal gastrojejunal join. Own bile-reflux and nutrition profile. Separate sheet."),
    ]
    title_f = font(BOLD, 20)
    body_f = font(SANS, 16)
    drawers = [sleeve, rygb, oagb]
    for (x1, y1, x2, y2, accent, title, copy), draw_fn in zip(tiles, drawers):
        rounded(d, (x1, y1, x2, y2), CARD, 24, outline=LINE, width=2)
        d.rounded_rectangle((x1, y1, x2, y1 + 96), radius=24, fill=accent)
        d.rectangle((x1, y1 + 70, x2, y1 + 96), fill=accent)
        center_text(d, ((x1 + x2) / 2, y1 + 48), title, title_f, WHITE)
        draw_fn(d, (x1 + x2) / 2, 360, scale=1.15)
        wrap_center(d, (x1 + x2) / 2, 520, copy, body_f, INK, x2 - x1 - 40)
    save(im, "gastric-bypass-compare.webp")


def make_diabetes():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(
        d,
        "METABOLIC EFFECT IS PART OF THE BRIEF",
        "Glucose can improve early. Remission is not a guarantee and diabetes can return.",
    )
    tiles = [
        (48, 130, 424, 680, TEAL, "INTAKE", "Smaller meals and earlier fullness reduce calorie load from the first postoperative weeks."),
        (452, 130, 828, 680, GOLD, "HORMONES", "Nutrient delivery to a lower intestinal segment changes gut-hormone signalling."),
        (856, 130, 1232, 680, CORAL, "FOLLOW-UP", "HbA1c, medicines and weight still need a named metabolic list after the theatre."),
    ]
    title_f = font(BOLD, 20)
    body_f = font(SANS, 17)
    icons = ["1", "2", "3"]
    for (x1, y1, x2, y2, accent, title, copy), num in zip(tiles, icons):
        rounded(d, (x1, y1, x2, y2), CARD, 24, outline=LINE, width=2)
        d.ellipse((x1 + 148, 170, x1 + 228, 250), fill=accent)
        center_text(d, ((x1 + x2) / 2, 210), num, font(BOLD, 32), WHITE)
        center_text(d, ((x1 + x2) / 2, 300), title, title_f, accent)
        wrap_center(d, (x1 + x2) / 2, 360, copy, body_f, INK, x2 - x1 - 48)
    save(im, "gastric-bypass-diabetes.webp")


def make_steps():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(
        d,
        "GASTRIC BYPASS JOURNEY",
        "GAF Roux-en-Y planning is $6,000–$11,000. Stay is typically 3–6 nights.",
    )
    steps = [
        ("1", "RECORDS", "BMI, HbA1c and diet history"),
        ("2", "LIST", "RYGB, sleeve or OAGB is named"),
        ("3", "PREP", "Diet, vitamins and fitness"),
        ("4", "POUCH", "Small gastric reservoir"),
        ("5", "ROUX", "Two intestinal joins"),
        ("6", "FOLLOW", "Labs, protein and vitamins"),
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
        "Neighbouring sleeve is $4,500–$8,500. Mini gastric bypass is $5,500–$10,000. No live sleeve treatment page yet.",
        font(SANS, 15),
        MUTED,
    )
    save(im, "gastric-bypass-steps.webp")


if __name__ == "__main__":
    make_hero()
    make_anatomy()
    make_compare()
    make_diabetes()
    make_steps()
