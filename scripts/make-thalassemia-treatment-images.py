#!/usr/bin/env python3
"""Human-designed Canva-style thalassemia educational diagrams (1280x720 WebP)."""

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
SOFT_TEAL = (226, 241, 244)
SOFT_CORAL = (252, 236, 236)
SOFT_GOLD = (252, 244, 226)
SOFT_PURPLE = (238, 234, 246)

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
    center_text(draw, (640, 38), title, font(BOLD, 32), WHITE)
    center_text(draw, (640, 70), subtitle, font(SANS, 16), (188, 214, 222))


def make_hero():
    im = Image.new("RGB", (1280, 720), (8, 24, 40))
    layer = Image.new("RGBA", (1280, 720), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    for box in [
        (80, -60, 560, 400, (196, 84, 84, 45)),
        (720, 40, 1340, 620, (26, 122, 140, 50)),
        (360, 380, 980, 860, (196, 148, 64, 35)),
    ]:
        d.ellipse(box[:4], fill=box[4])
    # unlabeled red-cell discs
    cells = [(240, 220, 70), (380, 340, 54), (520, 210, 62), (680, 300, 48), (820, 420, 66), (980, 250, 58)]
    for x, y, r in cells:
        d.ellipse((x - r, y - int(r * 0.62), x + r, y + int(r * 0.62)), fill=(196, 84, 84, 80), outline=(240, 200, 200, 110), width=4)
        d.ellipse((x - int(r * 0.35), y - int(r * 0.18), x + int(r * 0.35), y + int(r * 0.18)), fill=(15, 44, 76, 70))
    blurred = layer.filter(ImageFilter.GaussianBlur(2))
    im = Image.alpha_composite(im.convert("RGBA"), blurred).convert("RGB")
    save(im, "thalassemia-hero.webp")


def make_types():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(d, "TWO MAIN THALASSEMIA GROUPS", "Alpha and beta thalassemia are different gene problems, not one protocol.")
    tiles = [
        (
            40,
            130,
            630,
            688,
            CORAL,
            SOFT_CORAL,
            "ALPHA",
            "Alpha-globin genes are missing or changed. Forms range from silent trait to hemoglobin H disease and severe alpha-thalassemia major.",
        ),
        (
            650,
            130,
            1240,
            688,
            TEAL,
            SOFT_TEAL,
            "BETA",
            "Beta-globin production is reduced. Trait, non-transfusion-dependent disease and transfusion-dependent beta-thalassemia need different plans.",
        ),
    ]
    title_f = font(BOLD, 36)
    body_f = font(SANS, 18)
    for x1, y1, x2, y2, accent, bg, title, copy in tiles:
        rounded(d, (x1, y1, x2, y2), bg, 24)
        d.rectangle((x1, y1, x1 + 16, y2), fill=accent)
        d.text((x1 + 44, y1 + 36), title, font=title_f, fill=accent)
        cx, cy = (x1 + x2) / 2, y1 + 250
        if title == "ALPHA":
            for i, label in enumerate(["a", "a", "a", " "]):
                ox = cx - 90 + i * 60
                d.rounded_rectangle((ox - 22, cy - 28, ox + 22, cy + 28), radius=8, outline=accent, width=5)
                if label.strip():
                    center_text(d, (ox, cy), label, font(BOLD, 20), accent)
                else:
                    d.line((ox - 12, cy - 12, ox + 12, cy + 12), fill=accent, width=5)
        else:
            d.rounded_rectangle((cx - 80, cy - 36, cx - 8, cy + 36), radius=10, outline=accent, width=6)
            d.rounded_rectangle((cx + 8, cy - 36, cx + 80, cy + 36), radius=10, outline=accent, width=6)
            center_text(d, (cx - 44, cy), "b", font(BOLD, 22), accent)
            d.line((cx + 24, cy - 16, cx + 64, cy + 16), fill=accent, width=5)
        wrap_center(d, cx, y1 + 430, copy, body_f, INK, x2 - x1 - 80)
    save(im, "thalassemia-types.webp")


def make_care():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(d, "TRANSFUSION AND IRON CARE", "TDT care is a repeating cycle: raise hemoglobin, then remove the iron that arrives with blood.")
    steps = [
        ("1", "TYPE", "Extended red-cell typing before regular units"),
        ("2", "TRANSFUSE", "Leukodepleted red cells, often every 2 to 4 weeks"),
        ("3", "TARGET", "Pre-transfusion hemoglobin about 9.5 to 10.5 g/dL"),
        ("4", "FERRITIN", "Track iron after about 10 to 20 units"),
        ("5", "CHELATE", "Deferasirox, deferiprone or deferoxamine"),
        ("6", "MRI", "Liver iron and cardiac T2-star when indicated"),
    ]
    title_f = font(BOLD, 18)
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
        "There is no GAF transfusion or chelation package. Estimates are written after the records.",
        font(SANS, 16),
        MUTED,
    )
    save(im, "thalassemia-care.webp")


def make_iron():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(d, "WHERE TRANSFUSION IRON CAN SETTLE", "Ferritin is a trend. Heart and liver iron need more specific tests.")
    tiles = [
        (36, 140, 328, 680, CORAL, "HEART", "Cardiac T2-star MRI looks for iron that can cause arrhythmia or heart failure."),
        (344, 140, 636, 680, GOLD, "LIVER", "Validated MRI can measure liver iron when ferritin is not enough."),
        (652, 140, 944, 680, PURPLE, "ENDOCRINE", "Pituitary, pancreas and thyroid iron can delay puberty or cause diabetes."),
        (960, 140, 1244, 680, TEAL, "BONE", "Low bone density, pain and fractures need haematology and endocrine follow-up."),
    ]
    title_f = font(BOLD, 20)
    body_f = font(SANS, 17)
    for x1, y1, x2, y2, accent, title, copy in tiles:
        rounded(d, (x1, y1, x2, y2), CARD, 24, outline=LINE, width=2)
        d.rounded_rectangle((x1, y1, x2, y1 + 100), radius=24, fill=accent)
        d.rectangle((x1, y1 + 72, x2, y1 + 100), fill=accent)
        center_text(d, ((x1 + x2) / 2, y1 + 50), title, title_f, WHITE)
        cx, cy = (x1 + x2) / 2, y1 + 260
        if title == "HEART":
            d.ellipse((cx - 40, cy - 30, cx + 8, cy + 28), outline=accent, width=7)
            d.ellipse((cx - 8, cy - 30, cx + 40, cy + 28), outline=accent, width=7)
            d.polygon([(cx - 44, cy + 8), (cx, cy + 58), (cx + 44, cy + 8)], outline=accent, width=7)
        elif title == "LIVER":
            d.pieslice((cx - 56, cy - 40, cx + 56, cy + 50), 200, 340, outline=accent, width=7)
            d.arc((cx - 20, cy - 10, cx + 40, cy + 40), 20, 160, fill=accent, width=7)
        elif title == "ENDOCRINE":
            d.ellipse((cx - 18, cy - 50, cx + 18, cy - 14), outline=accent, width=6)
            d.ellipse((cx - 28, cy - 8, cx + 28, cy + 48), outline=accent, width=6)
            d.line((cx, cy - 14, cx, cy - 8), fill=accent, width=6)
        else:
            d.line((cx - 8, cy - 60, cx - 8, cy + 50), fill=accent, width=8)
            d.ellipse((cx - 22, cy + 40, cx + 6, cy + 62), outline=accent, width=6)
            d.ellipse((cx - 6, cy + 40, cx + 22, cy + 62), outline=accent, width=6)
        wrap_center(d, cx, y1 + 430, copy, body_f, INK, x2 - x1 - 36)
    save(im, "thalassemia-iron.webp")


def make_hsct():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(d, "WHEN A TRANSPLANT MAY BE DISCUSSED", "Allogeneic HSCT can remove transfusion dependence. It is not a day-care infusion.")
    tiles = [
        (36, 140, 328, 680, TEAL, "EVALUATE", "Age, iron, heart, liver, infections and prior units before anyone names a graft."),
        (344, 140, 636, 680, GOLD, "DONOR", "HLA-identical sibling first. MUD or haploidentical only in experienced units."),
        (652, 140, 944, 680, PURPLE, "CONDITION", "Conditioning suppresses the old marrow so donor cells can settle."),
        (960, 140, 1244, 680, CORAL, "FOLLOW", "GVHD, infection, graft failure and late iron still need a named unit."),
    ]
    title_f = font(BOLD, 20)
    body_f = font(SANS, 17)
    for x1, y1, x2, y2, accent, title, copy in tiles:
        rounded(d, (x1, y1, x2, y2), CARD, 24, outline=LINE, width=2)
        d.rounded_rectangle((x1, y1, x2, y1 + 100), radius=24, fill=accent)
        d.rectangle((x1, y1 + 72, x2, y1 + 100), fill=accent)
        center_text(d, ((x1 + x2) / 2, y1 + 50), title, title_f, WHITE)
        cx, cy = (x1 + x2) / 2, y1 + 250
        d.ellipse((cx - 50, cy - 50, cx + 50, cy + 50), outline=accent, width=8)
        d.ellipse((cx - 18, cy - 18, cx + 18, cy + 18), fill=accent)
        if title == "DONOR":
            d.arc((cx - 80, cy - 20, cx - 20, cy + 40), 200, 340, fill=accent, width=7)
            d.arc((cx + 20, cy - 20, cx + 80, cy + 40), 20, 160, fill=accent, width=7)
        wrap_center(d, cx, y1 + 430, copy, body_f, INK, x2 - x1 - 36)
    save(im, "thalassemia-hsct.webp")


if __name__ == "__main__":
    make_hero()
    make_types()
    make_care()
    make_iron()
    make_hsct()
