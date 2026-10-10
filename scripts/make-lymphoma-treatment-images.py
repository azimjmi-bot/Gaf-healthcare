#!/usr/bin/env python3
"""Human-designed Canva-style lymphoma educational diagrams (1280x720 WebP)."""

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
        (40, -40, 520, 420, (26, 122, 140, 55)),
        (780, 80, 1360, 680, (98, 78, 148, 50)),
        (420, 360, 980, 860, (196, 84, 84, 35)),
    ]:
        d.ellipse(box[:4], fill=box[4])
    # unlabeled lymph-node chain
    nodes = [(220, 180), (340, 280), (280, 400), (420, 460), (560, 340), (700, 220), (820, 300), (940, 420)]
    for i in range(len(nodes) - 1):
        d.line([nodes[i], nodes[i + 1]], fill=(180, 220, 230, 90), width=10)
    for x, y in nodes:
        d.ellipse((x - 34, y - 26, x + 34, y + 26), fill=(26, 122, 140, 90), outline=(200, 230, 236, 120), width=4)
        d.ellipse((x - 14, y - 10, x + 14, y + 10), fill=(15, 44, 76, 110))
    blurred = layer.filter(ImageFilter.GaussianBlur(2))
    im = Image.alpha_composite(im.convert("RGBA"), blurred).convert("RGB")
    save(im, "lymphoma-hero.webp")


def make_types():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(d, "TWO BROAD LYMPHOMA FAMILIES", "Hodgkin and non-Hodgkin lymphoma are different diseases, not one protocol.")
    tiles = [
        (
            40,
            130,
            630,
            688,
            CORAL,
            SOFT_CORAL,
            "HODGKIN",
            "Reed-Sternberg cells in classical HL. Often treated with chemotherapy, selected radiation and immunotherapy.",
        ),
        (
            650,
            130,
            1240,
            688,
            TEAL,
            SOFT_TEAL,
            "NON-HODGKIN",
            "Many B-cell and T-cell subtypes. Indolent disease may be watched. Aggressive disease needs prompt systemic treatment.",
        ),
    ]
    title_f = font(BOLD, 36)
    body_f = font(SANS, 18)
    for x1, y1, x2, y2, accent, bg, title, copy in tiles:
        rounded(d, (x1, y1, x2, y2), bg, 24)
        d.rectangle((x1, y1, x1 + 16, y2), fill=accent)
        d.text((x1 + 44, y1 + 36), title, font=title_f, fill=accent)
        cx, cy = (x1 + x2) / 2, y1 + 250
        if title == "HODGKIN":
            d.ellipse((cx - 70, cy - 50, cx + 10, cy + 30), outline=accent, width=8)
            d.ellipse((cx - 10, cy - 50, cx + 70, cy + 30), outline=accent, width=8)
            d.ellipse((cx - 18, cy - 18, cx + 18, cy + 18), fill=accent)
        else:
            for ox, oy, r in [(-70, -20, 28), (-10, 20, 36), (60, -30, 24), (40, 40, 20)]:
                d.ellipse((cx + ox - r, cy + oy - r, cx + ox + r, cy + oy + r), outline=accent, width=6)
        wrap_center(d, cx, y1 + 430, copy, body_f, INK, x2 - x1 - 80)
    save(im, "lymphoma-types.webp")


def make_diagnosis():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(d, "HOW LYMPHOMA IS NAMED", "A lump raises suspicion. Biopsy, markers, PET-CT and stage name the disease.")
    steps = [
        ("1", "EXAM", "Nodes, spleen and B symptoms"),
        ("2", "BIOPSY", "Tissue from a node or other site"),
        ("3", "MARKERS", "IHC and flow name B-cell or T-cell"),
        ("4", "PET-CT", "Extent and later response checks"),
        ("5", "MARROW", "Selected patients need staging marrow"),
        ("6", "GENETICS", "MYC, BCL2, BCL6 and other tests"),
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
        "Treatment is chosen after the exact subtype, not after the word lymphoma alone.",
        font(SANS, 16),
        MUTED,
    )
    save(im, "lymphoma-diagnosis.webp")


def make_treatment():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(d, "LYMPHOMA TREATMENT BUILDING BLOCKS", "The protocol is named after the subtype, not from a package list.")
    tiles = [
        (36, 140, 328, 680, TEAL, "CHEMOTHERAPY", "Cycle-based regimens such as ABVD or R-CHOP after the subtype is named."),
        (344, 140, 636, 680, GOLD, "IMMUNE / TARGETED", "CD20 antibodies, checkpoint drugs, BTK or BCL2 medicines and ADCs."),
        (652, 140, 944, 680, PURPLE, "RADIATION", "Selected early-stage, bulky or residual sites. Technique is chosen after planning."),
        (960, 140, 1244, 680, CORAL, "CELLULAR", "Autologous or allogeneic transplant, or CAR-T for selected relapsed B-cell disease."),
    ]
    title_f = font(BOLD, 18)
    body_f = font(SANS, 17)
    for x1, y1, x2, y2, accent, title, copy in tiles:
        rounded(d, (x1, y1, x2, y2), CARD, 24, outline=LINE, width=2)
        d.rounded_rectangle((x1, y1, x2, y1 + 92), radius=24, fill=accent)
        d.rectangle((x1, y1 + 64, x2, y1 + 92), fill=accent)
        center_text(d, ((x1 + x2) / 2, y1 + 46), title, title_f, WHITE)
        cx, cy = (x1 + x2) / 2, y1 + 250
        if title.startswith("CHEMO"):
            d.rounded_rectangle((cx - 28, cy - 80, cx + 28, cy + 40), radius=10, outline=accent, width=7)
            d.polygon([(cx - 18, cy + 40), (cx + 18, cy + 40), (cx, cy + 88)], fill=accent)
        elif title.startswith("IMMUNE"):
            d.ellipse((cx - 54, cy - 54, cx + 54, cy + 54), outline=accent, width=8)
            d.ellipse((cx - 16, cy - 16, cx + 16, cy + 16), fill=accent)
            d.line((cx, cy - 70, cx, cy + 70), fill=accent, width=6)
        elif title.startswith("RADIA"):
            d.polygon([(cx, cy - 70), (cx + 48, cy + 40), (cx - 48, cy + 40)], outline=accent, width=7)
            d.line((cx - 40, cy + 70, cx + 40, cy + 70), fill=accent, width=7)
        else:
            d.ellipse((cx - 50, cy - 50, cx + 50, cy + 50), outline=accent, width=8)
            d.ellipse((cx - 18, cy - 18, cx + 18, cy + 18), fill=accent)
            d.arc((cx - 80, cy - 20, cx - 20, cy + 40), 200, 340, fill=accent, width=7)
            d.arc((cx + 20, cy - 20, cx + 80, cy + 40), 20, 160, fill=accent, width=7)
        wrap_center(d, cx, y1 + 430, copy, body_f, INK, x2 - x1 - 36)
    save(im, "lymphoma-treatment.webp")


def make_stages():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(d, "LYMPHOMA STAGES I TO IV", "Stage describes extent. It does not, by itself, decide whether treatment can work.")
    tiles = [
        (36, 140, 328, 680, TEAL, "STAGE I", "One lymph-node region or a single extranodal site."),
        (344, 140, 636, 680, GOLD, "STAGE II", "More than one region, usually on the same side of the diaphragm."),
        (652, 140, 944, 680, PURPLE, "STAGE III", "Nodes on both sides of the diaphragm. Spleen may be involved."),
        (960, 140, 1244, 680, CORAL, "STAGE IV", "Spread to marrow or other organs. Some Stage IV lymphomas remain highly treatable."),
    ]
    title_f = font(BOLD, 22)
    body_f = font(SANS, 17)
    for x1, y1, x2, y2, accent, title, copy in tiles:
        rounded(d, (x1, y1, x2, y2), CARD, 24, outline=LINE, width=2)
        d.rounded_rectangle((x1, y1, x2, y1 + 110), radius=24, fill=accent)
        d.rectangle((x1, y1 + 80, x2, y1 + 110), fill=accent)
        center_text(d, ((x1 + x2) / 2, y1 + 56), title, title_f, WHITE)
        cx = (x1 + x2) / 2
        # simple body silhouette with node marks
        d.ellipse((cx - 28, y1 + 160, cx + 28, y1 + 216), outline=accent, width=5)
        d.rounded_rectangle((cx - 36, y1 + 220, cx + 36, y1 + 360), radius=18, outline=accent, width=5)
        d.line((cx - 70, y1 + 250, cx - 36, y1 + 280), fill=accent, width=5)
        d.line((cx + 36, y1 + 280, cx + 70, y1 + 250), fill=accent, width=5)
        if title.endswith("I"):
            d.ellipse((cx + 18, y1 + 236, cx + 38, y1 + 256), fill=accent)
        elif title.endswith("II"):
            d.ellipse((cx + 18, y1 + 236, cx + 38, y1 + 256), fill=accent)
            d.ellipse((cx - 38, y1 + 236, cx - 18, y1 + 256), fill=accent)
        elif title.endswith("III"):
            d.ellipse((cx + 18, y1 + 236, cx + 38, y1 + 256), fill=accent)
            d.ellipse((cx - 38, y1 + 236, cx - 18, y1 + 256), fill=accent)
            d.ellipse((cx + 10, y1 + 320, cx + 30, y1 + 340), fill=accent)
        else:
            d.ellipse((cx + 18, y1 + 236, cx + 38, y1 + 256), fill=accent)
            d.ellipse((cx - 38, y1 + 236, cx - 18, y1 + 256), fill=accent)
            d.ellipse((cx - 12, y1 + 300, cx + 12, y1 + 324), fill=accent)
            d.ellipse((cx + 40, y1 + 340, cx + 60, y1 + 360), fill=accent)
        wrap_center(d, cx, y1 + 430, copy, body_f, INK, x2 - x1 - 36)
    save(im, "lymphoma-stages.webp")


if __name__ == "__main__":
    make_hero()
    make_types()
    make_diagnosis()
    make_treatment()
    make_stages()
