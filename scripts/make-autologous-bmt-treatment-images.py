#!/usr/bin/env python3
"""Human-designed Canva-style autologous BMT educational diagrams (1280x720 WebP)."""

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
    draw.rectangle((0, 92, 1280, 96), fill=GOLD)
    center_text(draw, (640, 38), title, font(BOLD, 32), WHITE)
    center_text(draw, (640, 70), subtitle, font(SANS, 16), (188, 214, 222))


def make_hero():
    im = Image.new("RGB", (1280, 720), (8, 24, 40))
    layer = Image.new("RGBA", (1280, 720), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    for box in [
        (60, -50, 540, 400, (196, 148, 64, 50)),
        (700, 40, 1340, 680, (26, 122, 140, 42)),
        (340, 380, 960, 860, (15, 44, 76, 40)),
    ]:
        d.ellipse(box[:4], fill=box[4])
    d.ellipse((240, 180, 520, 460), fill=(196, 148, 64, 70), outline=(252, 244, 226, 90), width=4)
    d.ellipse((300, 240, 460, 400), fill=(15, 44, 76, 90))
    d.ellipse((340, 280, 420, 360), fill=(26, 122, 140, 80))
    for x, y, r in [(820, 240, 28), (940, 300, 36), (1060, 240, 24), (1120, 380, 40)]:
        d.ellipse((x - r, y - r, x + r, y + r), fill=(26, 122, 140, 75), outline=(188, 214, 222, 90), width=3)
    blurred = layer.filter(ImageFilter.GaussianBlur(2))
    im = Image.alpha_composite(im.convert("RGBA"), blurred).convert("RGB")
    save(im, "autologous-bmt-hero.webp")


def make_rescue():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(d, "WHY THE PATIENT'S CELLS RETURN", "High-dose therapy treats the disease. Stored stem cells rescue the marrow.")
    tiles = [
        (36, 140, 420, 680, CORAL, "CONDITION", "High-dose chemotherapy also suppresses healthy blood-forming cells."),
        (446, 140, 830, 680, GOLD, "RESCUE", "The patient's own stored cells return through a vein, not a donor graft."),
        (856, 140, 1244, 680, TEAL, "ENGRAFT", "Those cells travel to the marrow and restart red cells, white cells and platelets."),
    ]
    title_f = font(BOLD, 22)
    body_f = font(SANS, 18)
    for x1, y1, x2, y2, accent, title, copy in tiles:
        rounded(d, (x1, y1, x2, y2), CARD, 24, outline=LINE, width=2)
        d.rounded_rectangle((x1, y1, x2, y1 + 120), radius=24, fill=accent)
        d.rectangle((x1, y1 + 88, x2, y1 + 120), fill=accent)
        center_text(d, ((x1 + x2) / 2, y1 + 60), title, title_f, WHITE)
        wrap_center(d, (x1 + x2) / 2, y1 + 280, copy, body_f, INK, x2 - x1 - 40)
    save(im, "autologous-bmt-rescue.webp")


def make_compare():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(d, "AUTOLOGOUS IS NOT A DONOR GRAFT", "The source of the cells names the product. Neighbouring sheets are not interchangeable.")
    tiles = [
        (36, 140, 636, 680, GOLD, "AUTOLOGOUS", "Patient's own cells. No HLA donor search. GVHD is not the typical risk. Neighbouring ASCT planning is $18,000–$48,000."),
        (652, 140, 1244, 680, TEAL, "ALLOGENEIC", "A donor graft. HLA matching and GVHD matter. Neighbouring allogeneic planning is $30,000–$80,000."),
    ]
    title_f = font(BOLD, 22)
    body_f = font(SANS, 18)
    for x1, y1, x2, y2, accent, title, copy in tiles:
        rounded(d, (x1, y1, x2, y2), CARD, 24, outline=LINE, width=2)
        d.rounded_rectangle((x1, y1, x2, y1 + 110), radius=24, fill=accent)
        d.rectangle((x1, y1 + 78, x2, y1 + 110), fill=accent)
        center_text(d, ((x1 + x2) / 2, y1 + 55), title, title_f, WHITE)
        cx, cy = (x1 + x2) / 2, y1 + 280
        if title == "AUTOLOGOUS":
            d.ellipse((cx - 54, cy - 54, cx + 54, cy + 54), outline=accent, width=8)
            d.ellipse((cx - 18, cy - 18, cx + 18, cy + 18), fill=accent)
        else:
            d.ellipse((cx - 80, cy - 40, cx - 20, cy + 20), outline=accent, width=8)
            d.ellipse((cx + 20, cy - 40, cx + 80, cy + 20), outline=accent, width=8)
            d.line((cx - 20, cy - 10, cx + 20, cy - 10), fill=accent, width=8)
        wrap_center(d, cx, y1 + 430, copy, body_f, INK, x2 - x1 - 48)
    save(im, "autologous-bmt-compare.webp")


def make_steps():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(d, "AUTOLOGOUS TRANSPLANT STEPS", "Collection, freeze, high-dose therapy, then the same cells return.")
    steps = [
        ("1", "ASSESS", "Disease, fitness, heart, lung and infection review"),
        ("2", "MOBILISE", "Growth factor, and sometimes chemotherapy, moves cells"),
        ("3", "COLLECT", "Apheresis harvests stem cells from the bloodstream"),
        ("4", "STORE", "The product is tested and cryopreserved"),
        ("5", "CONDITION", "High-dose therapy, often melphalan in myeloma"),
        ("6", "INFUSE", "Day 0 returns the patient's own cells through a vein"),
    ]
    title_f = font(BOLD, 18)
    body_f = font(SANS, 15)
    num_f = font(BOLD, 24)
    xs = [50, 250, 450, 650, 850, 1050]
    for i, x in enumerate(xs[:-1]):
        d.line((x + 140, 360, xs[i + 1] + 20, 360), fill=GOLD, width=6)
    for x, (num, title, copy) in zip(xs, steps):
        rounded(d, (x, 180, x + 180, 560), CARD, 20, outline=LINE, width=2)
        d.ellipse((x + 60, 208, x + 120, 268), fill=GOLD)
        center_text(d, (x + 90, 238), num, num_f, WHITE)
        center_text(d, (x + 90, 310), title, title_f, NAVY)
        wrap_center(d, x + 90, 360, copy, body_f, MUTED, 150)
    center_text(
        d,
        (640, 640),
        "Neighbouring autologous planning is $18,000–$48,000. It is not an allogeneic quote.",
        font(SANS, 16),
        MUTED,
    )
    save(im, "autologous-bmt-steps.webp")


def make_engraft():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(d, "COUNTS RECOVER BEFORE IMMUNITY", "Engraftment is weeks. Broader immune recovery can take months.")
    tiles = [
        (36, 140, 420, 680, TEAL, "WHITE CELLS", "Neutrophils usually return first. Fever in this window is an emergency."),
        (446, 140, 830, 680, GOLD, "PLATELETS", "Bleeding risk stays high until platelets recover. Transfusion may be needed."),
        (856, 140, 1244, 680, PURPLE, "IMMUNITY", "Broader immune recovery can take three to twelve months after discharge."),
    ]
    title_f = font(BOLD, 22)
    body_f = font(SANS, 18)
    for x1, y1, x2, y2, accent, title, copy in tiles:
        rounded(d, (x1, y1, x2, y2), CARD, 24, outline=LINE, width=2)
        d.rounded_rectangle((x1, y1, x2, y1 + 120), radius=24, fill=accent)
        d.rectangle((x1, y1 + 88, x2, y1 + 120), fill=accent)
        center_text(d, ((x1 + x2) / 2, y1 + 60), title, title_f, WHITE)
        wrap_center(d, (x1 + x2) / 2, y1 + 280, copy, body_f, INK, x2 - x1 - 40)
    save(im, "autologous-bmt-engraft.webp")


if __name__ == "__main__":
    make_hero()
    make_rescue()
    make_compare()
    make_steps()
    make_engraft()
