#!/usr/bin/env python3
"""Human-designed Canva-style Fanconi anemia educational diagrams (1280x720 WebP)."""

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
    draw.rectangle((0, 92, 1280, 96), fill=PURPLE)
    center_text(draw, (640, 38), title, font(BOLD, 30), WHITE)
    center_text(draw, (640, 70), subtitle, font(SANS, 16), (188, 214, 222))


def make_hero():
    im = Image.new("RGB", (1280, 720), (8, 24, 40))
    layer = Image.new("RGBA", (1280, 720), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    for box in [
        (40, -80, 520, 360, (98, 78, 148, 55)),
        (700, 40, 1360, 700, (26, 122, 140, 40)),
        (320, 380, 980, 880, (196, 84, 84, 28)),
    ]:
        d.ellipse(box[:4], fill=box[4])
    # unlabeled helix-like rails
    d.arc((220, 160, 520, 560), 200, 340, fill=(210, 200, 230, 90), width=8)
    d.arc((260, 180, 560, 580), 20, 160, fill=(188, 214, 222, 80), width=8)
    for x, y, r in [(820, 240, 28), (940, 310, 36), (1060, 240, 22), (1140, 390, 40)]:
        d.ellipse((x - r, y - r, x + r, y + r), fill=(98, 78, 148, 70), outline=(226, 220, 240, 90), width=3)
    blurred = layer.filter(ImageFilter.GaussianBlur(2))
    im = Image.alpha_composite(im.convert("RGBA"), blurred).convert("RGB")
    save(im, "fanconi-anemia-hero.webp")


def make_pathway():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(d, "HOW FANCONI ANEMIA DAMAGES MARROW", "A DNA-repair defect can progress to pancytopenia. It is not iron-deficiency anaemia.")
    steps = [
        ("1", "DNA REPAIR", "The FA pathway fails to repair certain DNA cross-links"),
        ("2", "STEM CELLS", "Marrow stem cells accumulate damage and die"),
        ("3", "COUNTS FALL", "Red cells, white cells and platelets decline"),
        ("4", "MARROW FAIL", "Pancytopenia and transfusion need can follow"),
        ("5", "CLONE RISK", "MDS or AML can appear in a subset of patients"),
        ("6", "SOLID TUMORS", "Other tissues keep the genetic risk after a graft"),
    ]
    title_f = font(BOLD, 17)
    body_f = font(SANS, 15)
    num_f = font(BOLD, 24)
    xs = [50, 250, 450, 650, 850, 1050]
    for i, x in enumerate(xs[:-1]):
        d.line((x + 140, 360, xs[i + 1] + 20, 360), fill=PURPLE, width=6)
    for x, (num, title, copy) in zip(xs, steps):
        rounded(d, (x, 180, x + 180, 560), CARD, 20, outline=LINE, width=2)
        d.ellipse((x + 60, 208, x + 120, 268), fill=PURPLE)
        center_text(d, (x + 90, 238), num, num_f, WHITE)
        center_text(d, (x + 90, 310), title, title_f, NAVY)
        wrap_center(d, x + 90, 360, copy, body_f, MUTED, 150)
    save(im, "fanconi-anemia-pathway.webp")


def make_diagnosis():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(d, "HOW FANCONI ANEMIA IS NAMED", "Breakage testing and genetics sit together. A sibling is not a donor until screened.")
    tiles = [
        (36, 140, 328, 680, TEAL, "COUNTS", "CBC, MCV and reticulocytes show progressive cytopenias."),
        (344, 140, 636, 680, GOLD, "MARROW", "Aspiration and biopsy look for cellularity, MDS or leukemia."),
        (652, 140, 944, 680, PURPLE, "BREAKAGE", "DEB or MMC chromosome-breakage testing is a key FA test."),
        (960, 140, 1244, 680, CORAL, "GENES", "Molecular testing names the FA gene and guides family work-up."),
    ]
    title_f = font(BOLD, 20)
    body_f = font(SANS, 17)
    for x1, y1, x2, y2, accent, title, copy in tiles:
        rounded(d, (x1, y1, x2, y2), CARD, 24, outline=LINE, width=2)
        d.rounded_rectangle((x1, y1, x2, y1 + 110), radius=24, fill=accent)
        d.rectangle((x1, y1 + 78, x2, y1 + 110), fill=accent)
        center_text(d, ((x1 + x2) / 2, y1 + 55), title, title_f, WHITE)
        wrap_center(d, (x1 + x2) / 2, y1 + 280, copy, body_f, INK, x2 - x1 - 36)
    save(im, "fanconi-anemia-diagnosis.webp")


def make_treatment():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(d, "SUPPORT IS NOT A CURE", "Androgens and G-CSF can hold counts. Only a donor graft treats the marrow.")
    tiles = [
        (36, 140, 420, 680, GOLD, "SUPPORT", "Transfusion, infection care and iron watch before or instead of a graft."),
        (446, 140, 830, 680, TEAL, "MEDICINES", "Selected androgens or G-CSF may lift counts. They do not fix DNA repair."),
        (856, 140, 1244, 680, PURPLE, "ALLO HSCT", "A screened donor graft can restore blood-forming function. Neighbouring allogeneic planning is $30,000–$80,000."),
    ]
    title_f = font(BOLD, 22)
    body_f = font(SANS, 18)
    for x1, y1, x2, y2, accent, title, copy in tiles:
        rounded(d, (x1, y1, x2, y2), CARD, 24, outline=LINE, width=2)
        d.rounded_rectangle((x1, y1, x2, y1 + 120), radius=24, fill=accent)
        d.rectangle((x1, y1 + 88, x2, y1 + 120), fill=accent)
        center_text(d, ((x1 + x2) / 2, y1 + 60), title, title_f, WHITE)
        wrap_center(d, (x1 + x2) / 2, y1 + 280, copy, body_f, INK, x2 - x1 - 40)
    save(im, "fanconi-anemia-treatment.webp")


def make_hsct():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(d, "FANCONI TRANSPLANT IS FA-SPECIFIC", "Reduced-intensity conditioning matters. Autologous collection is not the product.")
    steps = [
        ("1", "EVALUATE", "Counts, marrow, breakage test, genes and organ function"),
        ("2", "SCREEN DONOR", "HLA plus FA testing before a sibling is named"),
        ("3", "CONDITION", "FA-specific, reduced-intensity regimens"),
        ("4", "INFUSE", "Donor stem cells travel through a vein"),
        ("5", "ENGRAFT", "Counts return over weeks in a paediatric unit"),
        ("6", "WATCH LIFE", "GVHD, infection and lifelong cancer surveillance"),
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
        "Neighbouring allogeneic planning is $30,000–$80,000. Neighbouring paediatric BMT is $28,000–$75,000.",
        font(SANS, 16),
        MUTED,
    )
    save(im, "fanconi-anemia-hsct.webp")


if __name__ == "__main__":
    make_hero()
    make_pathway()
    make_diagnosis()
    make_treatment()
    make_hsct()
