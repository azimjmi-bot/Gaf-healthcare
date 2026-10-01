#!/usr/bin/env python3
"""Human-designed Canva-style aplastic anemia educational diagrams (1280x720 WebP)."""

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
    center_text(draw, (640, 38), title, font(BOLD, 32), WHITE)
    center_text(draw, (640, 70), subtitle, font(SANS, 16), (188, 214, 222))


def make_hero():
    im = Image.new("RGB", (1280, 720), (8, 24, 40))
    layer = Image.new("RGBA", (1280, 720), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    for box in [
        (40, -60, 520, 380, (26, 122, 140, 50)),
        (720, 80, 1360, 700, (196, 84, 84, 36)),
        (360, 360, 980, 860, (98, 78, 148, 32)),
    ]:
        d.ellipse(box[:4], fill=box[4])
    d.rounded_rectangle((220, 160, 560, 560), radius=40, fill=(15, 44, 76, 90), outline=(188, 214, 222, 80), width=4)
    d.rounded_rectangle((280, 230, 500, 490), radius=24, fill=(8, 24, 40, 80))
    for x, y, r, fill in [
        (780, 250, 34, (196, 84, 84, 90)),
        (900, 330, 26, (26, 122, 140, 90)),
        (1020, 250, 30, (196, 148, 64, 90)),
        (1120, 380, 38, (98, 78, 148, 90)),
    ]:
        d.ellipse((x - r, y - r, x + r, y + r), fill=fill, outline=(210, 220, 226, 90), width=3)
    blurred = layer.filter(ImageFilter.GaussianBlur(2))
    im = Image.alpha_composite(im.convert("RGBA"), blurred).convert("RGB")
    save(im, "aplastic-anemia-hero.webp")


def make_marrow():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(d, "WHEN THE MARROW FACTORY SLOWS", "Aplastic anemia is pancytopenia from production failure, not iron-deficiency anaemia.")
    tiles = [
        (36, 140, 420, 680, CORAL, "RED CELLS", "Low haemoglobin causes fatigue, pallor and breathlessness."),
        (446, 140, 830, 680, TEAL, "WHITE CELLS", "Low neutrophils raise the risk of fever and severe infection."),
        (856, 140, 1244, 680, GOLD, "PLATELETS", "Low platelets cause bruising, gum bleeding and petechiae."),
    ]
    title_f = font(BOLD, 22)
    body_f = font(SANS, 18)
    for x1, y1, x2, y2, accent, title, copy in tiles:
        rounded(d, (x1, y1, x2, y2), CARD, 24, outline=LINE, width=2)
        d.rounded_rectangle((x1, y1, x2, y1 + 120), radius=24, fill=accent)
        d.rectangle((x1, y1 + 88, x2, y1 + 120), fill=accent)
        center_text(d, ((x1 + x2) / 2, y1 + 60), title, title_f, WHITE)
        cx, cy = (x1 + x2) / 2, y1 + 280
        if title == "RED CELLS":
            d.ellipse((cx - 54, cy - 54, cx + 54, cy + 54), outline=WHITE, width=0)
            d.ellipse((cx - 54, cy - 54, cx + 54, cy + 54), fill=accent)
            d.ellipse((cx - 22, cy - 22, cx + 22, cy + 22), fill=WHITE)
        elif title == "WHITE CELLS":
            d.ellipse((cx - 50, cy - 50, cx + 50, cy + 50), outline=accent, width=8)
            d.ellipse((cx - 16, cy - 16, cx + 16, cy + 16), fill=accent)
            d.line((cx, cy - 70, cx, cy + 70), fill=accent, width=7)
        else:
            d.polygon([(cx, cy - 62), (cx + 54, cy + 42), (cx - 54, cy + 42)], fill=accent)
        wrap_center(d, cx, y1 + 430, copy, body_f, INK, x2 - x1 - 40)
    save(im, "aplastic-anemia-marrow.webp")


def make_severity():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(d, "SEVERITY IS NAMED FROM COUNTS", "Non-severe, severe and very severe aplastic anemia are different plans.")
    tiles = [
        (36, 140, 420, 680, TEAL, "NON-SEVERE", "Counts are low but do not meet severe criteria. Observation or support may be enough."),
        (446, 140, 830, 680, GOLD, "SEVERE", "Markedly reduced production. Infection and bleeding risk rise. Prompt haematology review."),
        (856, 140, 1244, 680, CORAL, "VERY SEVERE", "Profound neutropenia. Fever is an emergency. Transplant or IST is named after work-up."),
    ]
    title_f = font(BOLD, 22)
    body_f = font(SANS, 18)
    for x1, y1, x2, y2, accent, title, copy in tiles:
        rounded(d, (x1, y1, x2, y2), CARD, 24, outline=LINE, width=2)
        d.rounded_rectangle((x1, y1, x2, y1 + 120), radius=24, fill=accent)
        d.rectangle((x1, y1 + 88, x2, y1 + 120), fill=accent)
        center_text(d, ((x1 + x2) / 2, y1 + 60), title, title_f, WHITE)
        wrap_center(d, (x1 + x2) / 2, y1 + 280, copy, body_f, INK, x2 - x1 - 40)
    save(im, "aplastic-anemia-severity.webp")


def make_treatment():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(d, "TWO DISEASE-DIRECTED PATHS", "Allogeneic transplant and immunosuppressive therapy are different products.")
    tiles = [
        (36, 140, 636, 680, TEAL, "ALLOGENEIC HSCT", "A donor graft can replace failing marrow in selected younger patients. Neighbouring allogeneic planning is $30,000–$80,000."),
        (652, 140, 1244, 680, GOLD, "IMMUNOSUPPRESSION", "ATG, cyclosporine and selected eltrombopag when a graft is not the immediate product. There is no live IST package."),
    ]
    title_f = font(BOLD, 22)
    body_f = font(SANS, 18)
    for x1, y1, x2, y2, accent, title, copy in tiles:
        rounded(d, (x1, y1, x2, y2), CARD, 24, outline=LINE, width=2)
        d.rounded_rectangle((x1, y1, x2, y1 + 110), radius=24, fill=accent)
        d.rectangle((x1, y1 + 78, x2, y1 + 110), fill=accent)
        center_text(d, ((x1 + x2) / 2, y1 + 55), title, title_f, WHITE)
        cx, cy = (x1 + x2) / 2, y1 + 280
        if title.startswith("ALLO"):
            d.ellipse((cx - 70, cy - 40, cx - 10, cy + 20), outline=accent, width=8)
            d.ellipse((cx + 10, cy - 40, cx + 70, cy + 20), outline=accent, width=8)
            d.line((cx - 10, cy - 10, cx + 10, cy - 10), fill=accent, width=8)
        else:
            d.rounded_rectangle((cx - 28, cy - 80, cx + 28, cy + 36), radius=10, outline=accent, width=7)
            d.polygon([(cx - 18, cy + 36), (cx + 18, cy + 36), (cx, cy + 86)], fill=accent)
        wrap_center(d, cx, y1 + 430, copy, body_f, INK, x2 - x1 - 48)
    save(im, "aplastic-anemia-treatment.webp")


def make_hsct():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(d, "ALLOGENEIC TRANSPLANT STEPS", "Aplastic anemia uses a donor graft. Autologous collection is not the product.")
    steps = [
        ("1", "EVALUATE", "Counts, marrow, HLA, infection and organ function"),
        ("2", "NAME DONOR", "Sibling, unrelated or haploidentical when suitable"),
        ("3", "CONDITION", "Prepare the marrow for donor-cell engraftment"),
        ("4", "INFUSE", "Donor stem cells travel through a vein"),
        ("5", "ENGRAFT", "Counts return over weeks in or near the unit"),
        ("6", "WATCH", "Infection, GVHD and graft function after discharge"),
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
        "Neighbouring allogeneic planning is $30,000–$80,000. It is not an aplastic-anemia medicine package.",
        font(SANS, 16),
        MUTED,
    )
    save(im, "aplastic-anemia-hsct.webp")


if __name__ == "__main__":
    make_hero()
    make_marrow()
    make_severity()
    make_treatment()
    make_hsct()
