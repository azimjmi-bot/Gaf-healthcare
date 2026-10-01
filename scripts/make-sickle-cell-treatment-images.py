#!/usr/bin/env python3
"""Human-designed Canva-style sickle-cell educational diagrams (1280x720 WebP)."""

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
        (40, -80, 520, 380, (196, 84, 84, 50)),
        (760, 80, 1360, 700, (26, 122, 140, 45)),
        (400, 400, 1000, 880, (196, 148, 64, 30)),
    ]:
        d.ellipse(box[:4], fill=box[4])
    # unlabeled discs and crescents
    for x, y, r in [(220, 240, 58), (380, 360, 46), (560, 220, 52), (900, 300, 48)]:
        d.ellipse((x - r, y - int(r * 0.62), x + r, y + int(r * 0.62)), fill=(196, 84, 84, 85), outline=(240, 200, 200, 110), width=4)
    for pts in [
        [(640, 380), (720, 340), (790, 400), (740, 470), (660, 450)],
        [(980, 430), (1060, 400), (1120, 460), (1060, 520), (990, 500)],
    ]:
        d.polygon(pts, fill=(196, 84, 84, 80), outline=(240, 200, 200, 110))
    blurred = layer.filter(ImageFilter.GaussianBlur(2))
    im = Image.alpha_composite(im.convert("RGBA"), blurred).convert("RGB")
    save(im, "sickle-cell-hero.webp")


def make_shape():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(d, "HOW SICKLE CELLS DIFFER", "Rigid crescent cells break down early and can block small vessels.")
    tiles = [
        (40, 130, 630, 688, TEAL, SOFT_TEAL, "USUAL DISC", "A flexible disc can squeeze through small vessels and carry oxygen."),
        (650, 130, 1240, 688, CORAL, SOFT_CORAL, "SICKLE SHAPE", "A rigid crescent can lodge in a vessel and trigger pain, chest crisis or stroke."),
    ]
    title_f = font(BOLD, 32)
    body_f = font(SANS, 18)
    for x1, y1, x2, y2, accent, bg, title, copy in tiles:
        rounded(d, (x1, y1, x2, y2), bg, 24)
        d.rectangle((x1, y1, x1 + 16, y2), fill=accent)
        d.text((x1 + 44, y1 + 36), title, font=title_f, fill=accent)
        cx, cy = (x1 + x2) / 2, y1 + 250
        if title.startswith("USUAL"):
            d.ellipse((cx - 90, cy - 56, cx + 90, cy + 56), outline=accent, width=8)
            d.ellipse((cx - 28, cy - 16, cx + 28, cy + 16), fill=accent)
        else:
            d.pieslice((cx - 90, cy - 70, cx + 70, cy + 70), 200, 40, outline=accent, width=8)
            d.arc((cx - 40, cy - 20, cx + 50, cy + 40), 30, 200, fill=accent, width=8)
        wrap_center(d, cx, y1 + 430, copy, body_f, INK, x2 - x1 - 80)
    save(im, "sickle-cell-shape.webp")


def make_care():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(d, "SICKLE CELL CARE BUILDING BLOCKS", "The plan is named after genotype and complications, not from a package list.")
    tiles = [
        (36, 140, 328, 680, TEAL, "HYDROXYUREA", "A disease-modifying medicine that can raise fetal hemoglobin and cut crises."),
        (344, 140, 636, 680, GOLD, "TRANSFUSION", "Used for selected crises, stroke prevention or severe anemia — not every visit."),
        (652, 140, 944, 680, PURPLE, "PREVENTION", "Vaccines, selected antibiotics and prompt fever review, especially in children."),
        (960, 140, 1244, 680, CORAL, "TCD / ORGANS", "Stroke-risk screening in children plus kidney, eye, lung and bone review."),
    ]
    title_f = font(BOLD, 18)
    body_f = font(SANS, 17)
    for x1, y1, x2, y2, accent, title, copy in tiles:
        rounded(d, (x1, y1, x2, y2), CARD, 24, outline=LINE, width=2)
        d.rounded_rectangle((x1, y1, x2, y1 + 92), radius=24, fill=accent)
        d.rectangle((x1, y1 + 64, x2, y1 + 92), fill=accent)
        center_text(d, ((x1 + x2) / 2, y1 + 46), title, title_f, WHITE)
        cx, cy = (x1 + x2) / 2, y1 + 250
        if title.startswith("HYDRO"):
            d.rounded_rectangle((cx - 28, cy - 80, cx + 28, cy + 40), radius=10, outline=accent, width=7)
            d.polygon([(cx - 18, cy + 40), (cx + 18, cy + 40), (cx, cy + 88)], fill=accent)
        elif title.startswith("TRANS"):
            d.ellipse((cx - 54, cy - 34, cx + 54, cy + 34), outline=accent, width=8)
            d.ellipse((cx - 16, cy - 10, cx + 16, cy + 10), fill=accent)
        elif title.startswith("PREV"):
            d.ellipse((cx - 40, cy - 40, cx + 40, cy + 40), outline=accent, width=8)
            d.line((cx - 8, cy, cx - 8, cy + 70), fill=accent, width=7)
            d.polygon([(cx - 8, cy + 70), (cx + 36, cy + 46), (cx + 28, cy + 34), (cx - 8, cy + 52)], fill=accent)
        else:
            d.ellipse((cx - 28, cy - 70, cx + 28, cy - 14), outline=accent, width=7)
            d.rounded_rectangle((cx - 36, cy - 10, cx + 36, cy + 70), radius=16, outline=accent, width=7)
        wrap_center(d, cx, y1 + 430, copy, body_f, INK, x2 - x1 - 36)
    save(im, "sickle-cell-care.webp")


def make_complications():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(d, "ORGANS SCD CAN AFFECT", "SCD is a multisystem disease. Chest pain, fever or sudden weakness is an emergency.")
    tiles = [
        (36, 140, 328, 680, CORAL, "BRAIN", "Stroke and silent injury. Children with SCA may need yearly TCD from about age two."),
        (344, 140, 636, 680, GOLD, "LUNGS", "Acute chest syndrome is an emergency: chest pain, fever, cough or low oxygen."),
        (652, 140, 944, 680, PURPLE, "KIDNEY", "Albuminuria and chronic kidney disease need blood pressure and urine checks."),
        (960, 140, 1244, 680, TEAL, "BONE", "Avascular necrosis and bone pain need haematology and orthopedic review."),
    ]
    title_f = font(BOLD, 22)
    body_f = font(SANS, 17)
    for x1, y1, x2, y2, accent, title, copy in tiles:
        rounded(d, (x1, y1, x2, y2), CARD, 24, outline=LINE, width=2)
        d.rounded_rectangle((x1, y1, x2, y1 + 100), radius=24, fill=accent)
        d.rectangle((x1, y1 + 72, x2, y1 + 100), fill=accent)
        center_text(d, ((x1 + x2) / 2, y1 + 50), title, title_f, WHITE)
        cx, cy = (x1 + x2) / 2, y1 + 250
        if title == "BRAIN":
            d.ellipse((cx - 40, cy - 50, cx + 40, cy + 40), outline=accent, width=7)
        elif title == "LUNGS":
            d.ellipse((cx - 60, cy - 30, cx - 8, cy + 40), outline=accent, width=7)
            d.ellipse((cx + 8, cy - 30, cx + 60, cy + 40), outline=accent, width=7)
        elif title == "KIDNEY":
            d.ellipse((cx - 28, cy - 50, cx + 28, cy + 40), outline=accent, width=7)
            d.line((cx, cy - 20, cx, cy + 20), fill=accent, width=6)
        else:
            d.line((cx - 8, cy - 60, cx - 8, cy + 50), fill=accent, width=8)
            d.ellipse((cx - 22, cy + 40, cx + 6, cy + 62), outline=accent, width=6)
            d.ellipse((cx - 6, cy + 40, cx + 22, cy + 62), outline=accent, width=6)
        wrap_center(d, cx, y1 + 430, copy, body_f, INK, x2 - x1 - 36)
    save(im, "sickle-cell-organs.webp")


def make_hsct():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(d, "WHEN A TRANSPLANT MAY BE DISCUSSED", "Allogeneic HSCT can remove the sickling clone. It is not automatic for every patient.")
    tiles = [
        (36, 140, 328, 680, TEAL, "SEVERITY", "Stroke, recurrent ACS or frequent crises despite hydroxyurea may trigger review."),
        (344, 140, 636, 680, GOLD, "DONOR", "A matched sibling is an important option. Alternative donors need extra risk review."),
        (652, 140, 944, 680, PURPLE, "CONDITION", "Conditioning prepares the marrow so donor cells can settle."),
        (960, 140, 1244, 680, CORAL, "FOLLOW", "Infection, GVHD, fertility and late organ effects still need a named unit."),
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
        wrap_center(d, cx, y1 + 430, copy, body_f, INK, x2 - x1 - 36)
    save(im, "sickle-cell-hsct.webp")


if __name__ == "__main__":
    make_hero()
    make_shape()
    make_care()
    make_complications()
    make_hsct()
