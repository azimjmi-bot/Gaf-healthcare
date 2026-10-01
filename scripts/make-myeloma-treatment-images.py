#!/usr/bin/env python3
"""Human-designed Canva-style myeloma educational diagrams (1280x720 WebP)."""

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
        (80, -40, 560, 420, (98, 78, 148, 55)),
        (740, 60, 1340, 680, (26, 122, 140, 45)),
        (380, 380, 980, 860, (196, 84, 84, 30)),
    ]:
        d.ellipse(box[:4], fill=box[4])
    # unlabeled marrow-like nested cells
    d.ellipse((200, 160, 520, 520), fill=(98, 78, 148, 70), outline=(210, 200, 230, 90), width=4)
    d.ellipse((260, 220, 460, 460), fill=(15, 44, 76, 90))
    d.ellipse((310, 280, 410, 400), fill=(196, 84, 84, 55))
    for x, y, r in [(760, 240, 36), (860, 320, 28), (980, 260, 32), (1080, 380, 40)]:
        d.ellipse((x - r, y - r, x + r, y + r), fill=(26, 122, 140, 80), outline=(188, 214, 222, 100), width=3)
    blurred = layer.filter(ImageFilter.GaussianBlur(2))
    im = Image.alpha_composite(im.convert("RGBA"), blurred).convert("RGB")
    save(im, "myeloma-hero.webp")


def make_crab():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(d, "CRAB FEATURES IN ACTIVE MYELOMA", "Calcium, kidney, anemia and bone lesions help name active disease.")
    tiles = [
        (36, 140, 328, 680, CORAL, "C", "CALCIUM", "High calcium from bone breakdown can cause thirst, nausea or confusion."),
        (344, 140, 636, 680, GOLD, "R", "RENAL", "Light chains, dehydration or high calcium can impair the kidneys."),
        (652, 140, 944, 680, PURPLE, "A", "ANEMIA", "Abnormal plasma cells crowd the marrow and reduce red-cell production."),
        (960, 140, 1244, 680, TEAL, "B", "BONE", "Lytic lesions raise the risk of pain, fracture and selected spinal threat."),
    ]
    letter_f = font(BOLD, 48)
    title_f = font(BOLD, 22)
    body_f = font(SANS, 17)
    for x1, y1, x2, y2, accent, letter, title, copy in tiles:
        rounded(d, (x1, y1, x2, y2), CARD, 24, outline=LINE, width=2)
        d.rounded_rectangle((x1, y1, x2, y1 + 150), radius=24, fill=accent)
        d.rectangle((x1, y1 + 120, x2, y1 + 150), fill=accent)
        center_text(d, ((x1 + x2) / 2, y1 + 50), letter, letter_f, WHITE)
        center_text(d, ((x1 + x2) / 2, y1 + 110), title, title_f, WHITE)
        wrap_center(d, (x1 + x2) / 2, y1 + 280, copy, body_f, INK, x2 - x1 - 36)
    save(im, "myeloma-crab.webp")


def make_diagnosis():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(d, "HOW MYELOMA IS NAMED", "Blood, urine, marrow and imaging sit together. A single test is not the diagnosis.")
    steps = [
        ("1", "BLOOD", "CBC, calcium, creatinine, SPEP and free light chains"),
        ("2", "URINE", "Protein and light-chain studies when indicated"),
        ("3", "MARROW", "Aspiration, biopsy, flow, FISH and cytogenetics"),
        ("4", "IMAGING", "Whole-body CT, PET-CT or MRI for focal lesions"),
        ("5", "RISK", "ISS or R-ISS plus cytogenetic risk"),
        ("6", "MRD", "Depth of response after treatment, not symptoms alone"),
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
        "MGUS, smoldering myeloma and active myeloma are different plans.",
        font(SANS, 16),
        MUTED,
    )
    save(im, "myeloma-diagnosis.webp")


def make_treatment():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(d, "MYELOMA TREATMENT BUILDING BLOCKS", "The protocol is named after fitness and risk, not from a package list.")
    tiles = [
        (36, 140, 328, 680, TEAL, "INDUCTION", "Combinations of proteasome inhibitors, IMiDs, steroids and CD38 antibodies."),
        (344, 140, 636, 680, GOLD, "ASCT", "The patient's own stem cells after high-dose melphalan, when eligible."),
        (652, 140, 944, 680, PURPLE, "MAINTENANCE", "Often lenalidomide after transplant to hold a deep response."),
        (960, 140, 1244, 680, CORAL, "RELAPSE", "New combinations, bispecifics or CAR-T only when that product is named."),
    ]
    title_f = font(BOLD, 18)
    body_f = font(SANS, 17)
    for x1, y1, x2, y2, accent, title, copy in tiles:
        rounded(d, (x1, y1, x2, y2), CARD, 24, outline=LINE, width=2)
        d.rounded_rectangle((x1, y1, x2, y1 + 92), radius=24, fill=accent)
        d.rectangle((x1, y1 + 64, x2, y1 + 92), fill=accent)
        center_text(d, ((x1 + x2) / 2, y1 + 46), title, title_f, WHITE)
        cx, cy = (x1 + x2) / 2, y1 + 250
        if title == "INDUCTION":
            d.rounded_rectangle((cx - 28, cy - 80, cx + 28, cy + 40), radius=10, outline=accent, width=7)
            d.polygon([(cx - 18, cy + 40), (cx + 18, cy + 40), (cx, cy + 88)], fill=accent)
        elif title == "ASCT":
            d.ellipse((cx - 50, cy - 50, cx + 50, cy + 50), outline=accent, width=8)
            d.ellipse((cx - 18, cy - 18, cx + 18, cy + 18), fill=accent)
            d.arc((cx - 80, cy - 20, cx - 20, cy + 40), 200, 340, fill=accent, width=7)
            d.arc((cx + 20, cy - 20, cx + 80, cy + 40), 20, 160, fill=accent, width=7)
        elif title == "MAINTENANCE":
            d.ellipse((cx - 54, cy - 54, cx + 54, cy + 54), outline=accent, width=8)
            d.ellipse((cx - 16, cy - 16, cx + 16, cy + 16), fill=accent)
            d.line((cx, cy - 70, cx, cy + 70), fill=accent, width=6)
        else:
            d.polygon([(cx, cy - 70), (cx + 48, cy + 40), (cx - 48, cy + 40)], outline=accent, width=7)
        wrap_center(d, cx, y1 + 430, copy, body_f, INK, x2 - x1 - 36)
    save(im, "myeloma-treatment.webp")


def make_asct():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(d, "AUTOLOGOUS TRANSPLANT STEPS", "ASCT uses the patient's own cells. It is not an allogeneic graft and not a day-care infusion.")
    steps = [
        ("1", "INDUCE", "Several months of combination therapy first"),
        ("2", "COLLECT", "Mobilise and apheresis the patient's stem cells"),
        ("3", "CONDITION", "High-dose melphalan prepares the marrow"),
        ("4", "INFUSE", "The stored cells return through a vein"),
        ("5", "RECOVER", "Counts return over weeks in or near the unit"),
        ("6", "MAINTAIN", "Often lenalidomide to hold the response"),
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
        "Neighbouring autologous planning is $18,000–$48,000. It is not a myeloma drug package.",
        font(SANS, 16),
        MUTED,
    )
    save(im, "myeloma-asct.webp")


if __name__ == "__main__":
    make_hero()
    make_crab()
    make_diagnosis()
    make_treatment()
    make_asct()
