#!/usr/bin/env python3
"""Human-designed Canva-style leukemia educational diagrams (1280x720 WebP)."""

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
        (680, 40, 1280, 640, (40, 120, 140, 70)),
        (860, 180, 1260, 720, (98, 78, 148, 50)),
        (40, 380, 480, 820, (26, 122, 140, 40)),
    ]:
        d.ellipse(box[:4], fill=box[4])
    # marrow-like nested cells, no labels
    d.ellipse((160, 150, 460, 540), fill=(26, 122, 140, 60), outline=(180, 220, 230, 80), width=4)
    d.ellipse((210, 210, 410, 480), fill=(15, 44, 76, 90))
    d.ellipse((250, 270, 370, 420), fill=(196, 84, 84, 50))
    blurred = layer.filter(ImageFilter.GaussianBlur(2))
    im = Image.alpha_composite(im.convert("RGBA"), blurred).convert("RGB")
    save(im, "leukemia-hero.webp")


def make_types():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(d, "FOUR MAIN LEUKEMIA TYPES", "AML and ALL are acute. CML and CLL are usually slower.")
    tiles = [
        (40, 130, 630, 400, CORAL, SOFT_CORAL, "AML", "Acute myeloid leukemia", "Aggressive myeloid cells. Needs prompt work-up and a named protocol."),
        (650, 130, 1240, 400, TEAL, SOFT_TEAL, "ALL", "Acute lymphoblastic leukemia", "Lymphoid precursors. Children and adults use different staged protocols."),
        (40, 428, 630, 688, GOLD, SOFT_GOLD, "CML", "Chronic myeloid leukemia", "Usually BCR-ABL1 driven. Often started on oral TKI therapy."),
        (650, 428, 1240, 688, PURPLE, SOFT_PURPLE, "CLL", "Chronic lymphocytic leukemia", "Often slow-growing. Some patients are observed before treatment."),
    ]
    title_f = font(BOLD, 36)
    sub_f = font(BOLD, 18)
    body_f = font(SANS, 17)
    for x1, y1, x2, y2, accent, bg, code, name, copy in tiles:
        rounded(d, (x1, y1, x2, y2), bg, 22)
        d.rectangle((x1, y1, x1 + 14, y2), fill=accent)
        d.text((x1 + 36, y1 + 24), code, font=title_f, fill=accent)
        d.text((x1 + 140, y1 + 40), name, font=sub_f, fill=NAVY)
        wrap_center(d, (x1 + x2) / 2, y1 + 130, copy, body_f, INK, x2 - x1 - 70)
    save(im, "leukemia-types.webp")


def make_diagnosis():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(d, "HOW LEUKEMIA IS CONFIRMED", "A blood count raises suspicion. Marrow and molecular tests name the subtype.")
    steps = [
        ("1", "CBC", "Counts for red cells, white cells and platelets"),
        ("2", "SMEAR", "Microscope review of circulating cells"),
        ("3", "MARROW", "Aspiration and biopsy from pelvic bone"),
        ("4", "FLOW", "Markers that classify the clone"),
        ("5", "GENETICS", "Cytogenetics, FISH and molecular tests"),
        ("6", "MRD", "How deeply treatment has cleared disease"),
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
        "Two patients with the same broad name can need different medicines after genetics.",
        font(SANS, 16),
        MUTED,
    )
    save(im, "leukemia-diagnosis.webp")


def make_treatment():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(d, "LEUKEMIA TREATMENT BUILDING BLOCKS", "The protocol is named after the subtype, not from a package list.")
    tiles = [
        (36, 140, 328, 680, TEAL, "CHEMOTHERAPY", "Intensive or lower-intensity cycles for many acute leukemias."),
        (344, 140, 636, 680, GOLD, "TARGETED DRUGS", "TKIs, FLT3, IDH, BCL-2 and other mutation-directed medicines."),
        (652, 140, 944, 680, PURPLE, "IMMUNOTHERAPY", "Antibodies, bispecifics and selected cellular therapies."),
        (960, 140, 1244, 680, CORAL, "TRANSPLANT", "Allogeneic HSCT for selected high-risk or relapsed disease."),
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
        elif title.startswith("TARGET"):
            d.regular_polygon = None
            d.ellipse((cx - 54, cy - 54, cx + 54, cy + 54), outline=accent, width=8)
            d.ellipse((cx - 16, cy - 16, cx + 16, cy + 16), fill=accent)
            d.line((cx, cy - 70, cx, cy + 70), fill=accent, width=6)
        elif title.startswith("IMMUNO"):
            d.ellipse((cx - 40, cy - 20, cx + 10, cy + 30), outline=accent, width=7)
            d.ellipse((cx - 10, cy - 50, cx + 50, cy + 10), outline=accent, width=7)
        else:
            d.ellipse((cx - 50, cy - 50, cx + 50, cy + 50), outline=accent, width=8)
            d.ellipse((cx - 18, cy - 18, cx + 18, cy + 18), fill=accent)
            d.arc((cx - 80, cy - 20, cx - 20, cy + 40), 200, 340, fill=accent, width=7)
            d.arc((cx + 20, cy - 20, cx + 80, cy + 40), 20, 160, fill=accent, width=7)
        wrap_center(d, cx, y1 + 430, copy, body_f, INK, x2 - x1 - 36)
    save(im, "leukemia-treatment.webp")


def make_mrd():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(d, "MEASURABLE RESIDUAL DISEASE", "MRD asks how deeply the leukemia has responded after treatment.")
    rounded(d, (60, 150, 600, 640), SOFT_TEAL, 26)
    rounded(d, (680, 150, 1220, 640), SOFT_GOLD, 26)
    d.rounded_rectangle((60, 150, 600, 248), radius=26, fill=TEAL)
    d.rectangle((60, 220, 600, 248), fill=TEAL)
    d.rounded_rectangle((680, 150, 1220, 248), radius=26, fill=GOLD)
    d.rectangle((680, 220, 1220, 248), fill=GOLD)
    center_text(d, (330, 200), "BEFORE TREATMENT", font(BOLD, 22), WHITE)
    center_text(d, (950, 200), "AFTER TREATMENT", font(BOLD, 22), WHITE)
    # many cells vs few residual cells
    for xy in [(140, 320), (230, 380), (320, 300), (410, 360), (180, 470), (300, 500), (420, 460), (250, 300)]:
        d.ellipse((xy[0], xy[1], xy[0] + 54, xy[1] + 54), fill=CORAL)
    d.ellipse((900, 360, 954, 414), fill=CORAL)
    d.ellipse((1040, 470, 1084, 514), fill=TEAL)
    wrap_center(d, 330, 580, "Bulk disease seen on counts and marrow.", font(SANS, 16), INK, 480)
    wrap_center(d, 950, 560, "Sensitive tests can still find a small residual clone.", font(SANS, 16), INK, 480)
    save(im, "leukemia-mrd.webp")


if __name__ == "__main__":
    make_hero()
    make_types()
    make_diagnosis()
    make_treatment()
    make_mrd()
