#!/usr/bin/env python3
"""Human-designed Canva-style sleeve-gastrectomy diagrams (1280x720 WebP)."""

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
SLEEVE = (210, 226, 232)

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


def stomach(draw, cx, cy, scale=1.0, removed=False):
    draw.ellipse(
        (cx - 8 * scale, cy - 70 * scale, cx + 72 * scale, cy + 48 * scale),
        fill=(236, 214, 210) if not removed else (236, 220, 220),
        outline=None,
    )
    if removed:
        draw.ellipse(
            (cx + 8 * scale, cy - 56 * scale, cx + 68 * scale, cy + 36 * scale),
            fill=(247, 236, 232),
        )


def sleeve_tube(draw, cx, cy, scale=1.0, accent=TEAL):
    draw.rounded_rectangle(
        (cx - 20 * scale, cy - 74 * scale, cx + 18 * scale, cy + 72 * scale),
        radius=int(18 * scale),
        fill=SLEEVE,
        outline=accent,
        width=3,
    )
    draw.line((cx - 2 * scale, cy + 70 * scale, cx - 2 * scale, cy + 118 * scale), fill=GOLD, width=int(7 * scale))


def rygb(draw, cx, cy, scale=1.0):
    draw.ellipse((cx - 8 * scale, cy - 36 * scale, cx + 62 * scale, cy + 38 * scale), fill=STOMACH)
    draw.ellipse((cx - 28 * scale, cy - 70 * scale, cx + 18 * scale, cy - 18 * scale), fill=SLEEVE, outline=CORAL, width=3)
    draw.line((cx - 6 * scale, cy - 20 * scale, cx - 6 * scale, cy + 78 * scale), fill=CORAL, width=int(8 * scale))
    draw.line((cx - 6 * scale, cy + 78 * scale, cx + 54 * scale, cy + 78 * scale), fill=CORAL, width=int(8 * scale))
    draw.line((cx + 28 * scale, cy + 34 * scale, cx + 28 * scale, cy + 108 * scale), fill=GOLD, width=int(7 * scale))
    draw.line((cx + 54 * scale, cy + 78 * scale, cx + 96 * scale, cy + 78 * scale), fill=PURPLE, width=int(8 * scale))


def esg(draw, cx, cy, scale=1.0):
    draw.ellipse((cx - 18 * scale, cy - 70 * scale, cx + 62 * scale, cy + 48 * scale), fill=STOMACH)
    draw.rounded_rectangle(
        (cx - 8 * scale, cy - 56 * scale, cx + 22 * scale, cy + 40 * scale),
        radius=int(14 * scale),
        outline=PURPLE,
        width=3,
    )
    for y in (-30, -4, 22):
        draw.line((cx - 2 * scale, cy + y * scale, cx + 16 * scale, cy + y * scale), fill=PURPLE, width=3)


def make_hero():
    im = Image.new("RGB", (1280, 720), (8, 22, 38))
    layer = Image.new("RGBA", (1280, 720), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    for box in [
        (40, -80, 620, 420, (26, 122, 140, 50)),
        (700, 40, 1400, 760, (196, 84, 84, 34)),
        (280, 240, 1040, 900, (15, 44, 76, 70)),
    ]:
        d.ellipse(box[:4], fill=box[4])
    d.ellipse((620, 160, 860, 430), fill=(232, 176, 148, 55))
    d.rounded_rectangle((575, 150, 655, 470), radius=36, fill=(210, 226, 232, 150))
    d.line((615, 460, 615, 560), fill=(196, 148, 64, 120), width=12)
    blurred = layer.filter(ImageFilter.GaussianBlur(1.3))
    im = Image.alpha_composite(im.convert("RGBA"), blurred).convert("RGB")
    save(im, "sleeve-hero.webp")


def make_anatomy():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(
        d,
        "MOST OF THE STOMACH COMES OUT. THE INTESTINE STAYS.",
        "About 70–80% is removed. Food still follows the normal route through a narrow sleeve.",
    )
    tiles = [
        (48, 130, 424, 680, MUTED, "BEFORE", "A full stomach holds large meals. Ghrelin-producing fundus sits on the outer curve."),
        (452, 130, 828, 680, CORAL, "REMOVED", "The greater curve is stapled off and taken out. That tissue does not grow back."),
        (856, 130, 1232, 680, TEAL, "SLEEVE", "A banana-shaped tube remains. Capacity falls. Hunger signalling can change."),
    ]
    title_f = font(BOLD, 20)
    body_f = font(SANS, 16)
    for i, (x1, y1, x2, y2, accent, title, copy) in enumerate(tiles):
        rounded(d, (x1, y1, x2, y2), CARD, 24, outline=LINE, width=2)
        d.rounded_rectangle((x1, y1, x2, y1 + 96), radius=24, fill=accent)
        d.rectangle((x1, y1 + 70, x2, y1 + 96), fill=accent)
        center_text(d, ((x1 + x2) / 2, y1 + 48), title, title_f, WHITE)
        cx = (x1 + x2) / 2
        if i == 0:
            stomach(d, cx - 20, 340, scale=1.35)
        elif i == 1:
            stomach(d, cx - 20, 340, scale=1.35, removed=True)
            d.line((cx - 70, 250, cx + 70, 430), fill=CORAL, width=5)
        else:
            sleeve_tube(d, cx, 340, scale=1.35, accent=TEAL)
        wrap_center(d, cx, 520, copy, body_f, INK, x2 - x1 - 40)
    save(im, "sleeve-anatomy.webp")


def make_compare():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(
        d,
        "SLEEVE IS NOT BYPASS AND NOT ESG",
        "Intestine stays. Stomach is removed. Endoscopic sutures are a different product.",
    )
    tiles = [
        (48, 130, 424, 680, TEAL, "SLEEVE", "Removes most of the stomach. No intestinal bypass. Reflux can worsen in some patients."),
        (452, 130, 828, 680, CORAL, "ROUX-EN-Y", "Small pouch plus two intestinal joins. Stronger malabsorption and often better reflux."),
        (856, 130, 1232, 680, PURPLE, "ESG", "Endoscopic sutures reshape the stomach. No surgical removal. Separate sheet."),
    ]
    title_f = font(BOLD, 20)
    body_f = font(SANS, 16)
    drawers = [
        lambda dd, cx, cy: sleeve_tube(dd, cx, cy, scale=1.15),
        lambda dd, cx, cy: rygb(dd, cx, cy, scale=1.05),
        lambda dd, cx, cy: esg(dd, cx, cy, scale=1.15),
    ]
    for (x1, y1, x2, y2, accent, title, copy), draw_fn in zip(tiles, drawers):
        rounded(d, (x1, y1, x2, y2), CARD, 24, outline=LINE, width=2)
        d.rounded_rectangle((x1, y1, x2, y1 + 96), radius=24, fill=accent)
        d.rectangle((x1, y1 + 70, x2, y1 + 96), fill=accent)
        center_text(d, ((x1 + x2) / 2, y1 + 48), title, title_f, WHITE)
        draw_fn(d, (x1 + x2) / 2, 350)
        wrap_center(d, (x1 + x2) / 2, 520, copy, body_f, INK, x2 - x1 - 40)
    save(im, "sleeve-compare.webp")


def make_reflux():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(
        d,
        "REFLUX CAN NAME A DIFFERENT OPERATION",
        "A sleeve can worsen GERD. Significant reflux may belong on a Roux-en-Y list instead.",
    )
    tiles = [
        (48, 130, 424, 680, TEAL, "SLEEVE FIT", "BMI, eating pattern and no severe reflux can make a primary sleeve the honest product."),
        (452, 130, 828, 680, GOLD, "ASSESS GERD", "Heartburn, regurgitation or a hiatus hernia should be reviewed before anyone books a sleeve."),
        (856, 130, 1232, 680, CORAL, "BYPASS FIT", "Severe reflux, diabetes or prior anatomy may name Roux-en-Y. That list sits on the bypass page."),
    ]
    title_f = font(BOLD, 20)
    body_f = font(SANS, 17)
    for (x1, y1, x2, y2, accent, title, copy), num in zip(tiles, ["1", "2", "3"]):
        rounded(d, (x1, y1, x2, y2), CARD, 24, outline=LINE, width=2)
        d.ellipse((x1 + 148, 170, x1 + 228, 250), fill=accent)
        center_text(d, ((x1 + x2) / 2, 210), num, font(BOLD, 32), WHITE)
        center_text(d, ((x1 + x2) / 2, 300), title, title_f, accent)
        wrap_center(d, (x1 + x2) / 2, 360, copy, body_f, INK, x2 - x1 - 48)
    save(im, "sleeve-reflux.webp")


def make_steps():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(
        d,
        "SLEEVE GASTRECTOMY JOURNEY",
        "GAF sleeve planning is $4,500–$8,500. Stay is typically 2–5 nights.",
    )
    steps = [
        ("1", "RECORDS", "BMI, reflux and HbA1c"),
        ("2", "LIST", "Sleeve, bypass or ESG"),
        ("3", "PREP", "Diet, vitamins, fitness"),
        ("4", "STAPLE", "Greater curve comes out"),
        ("5", "CHECK", "Leak and bleed review"),
        ("6", "FOLLOW", "Diet, labs, reflux watch"),
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
        "Neighbouring Roux-en-Y is $6,000–$11,000. ESG is $4,500–$9,000. Sleeve revision is a different sheet.",
        font(SANS, 15),
        MUTED,
    )
    save(im, "sleeve-steps.webp")


if __name__ == "__main__":
    make_hero()
    make_anatomy()
    make_compare()
    make_reflux()
    make_steps()
