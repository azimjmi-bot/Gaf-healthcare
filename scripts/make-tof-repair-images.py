#!/usr/bin/env python3
"""Human-designed Canva-style TOF diagrams (1280x720 WebP)."""

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
    center_text(draw, (640, 38), title, font(BOLD, 24), WHITE)
    center_text(draw, (640, 70), subtitle, font(SANS, 16), (188, 214, 222))


def make_hero():
    im = Image.new("RGB", (1280, 720), (10, 24, 40))
    layer = Image.new("RGBA", (1280, 720), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    for box in [
        (40, -80, 520, 380, (196, 84, 84, 48)),
        (720, 40, 1420, 780, (26, 122, 140, 40)),
        (280, 220, 1040, 900, (15, 44, 76, 70)),
    ]:
        d.ellipse(box[:4], fill=box[4])
    d.ellipse((520, 250, 760, 540), outline=(188, 214, 222, 150), width=14)
    d.line((640, 250, 640, 540), fill=(196, 84, 84, 150), width=10)
    d.polygon([(720, 220), (860, 180), (840, 300)], fill=(196, 148, 64, 120))
    d.rectangle((560, 160, 720, 230), fill=(26, 122, 140, 120))
    blurred = layer.filter(ImageFilter.GaussianBlur(1.4))
    im = Image.alpha_composite(im.convert("RGBA"), blurred).convert("RGB")
    save(im, "tof-hero.webp")


def make_anatomy():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(
        d,
        "FOUR PARTS OF TETRALOGY OF FALLOT",
        "A VSD plus blocked lung flow, not four separate diseases.",
    )
    tiles = [
        (40, 128, 340, 680, CORAL, "VSD", "A hole between the ventricles lets blood mix instead of staying in two circuits."),
        (360, 128, 660, 680, GOLD, "RVOT BLOCK", "Narrowing from the right ventricle to the lungs reduces oxygen uptake."),
        (680, 128, 980, 680, TEAL, "OVERRIDE", "The aorta sits over the VSD and can receive mixed blood."),
        (1000, 128, 1240, 680, PURPLE, "THICK RV", "The right ventricle thickens because it pumps against extra resistance."),
    ]
    title_f = font(BOLD, 16)
    body_f = font(SANS, 16)
    for x1, y1, x2, y2, accent, title, copy in tiles:
        rounded(d, (x1, y1, x2, y2), CARD, 22, outline=LINE, width=2)
        d.rounded_rectangle((x1, y1, x2, y1 + 96), radius=22, fill=accent)
        d.rectangle((x1, y1 + 70, x2, y1 + 96), fill=accent)
        center_text(d, ((x1 + x2) / 2, y1 + 48), title, title_f, WHITE)
        cx = (x1 + x2) / 2
        if title == "VSD":
            d.ellipse((cx - 40, 280, cx + 40, 400), outline=accent, width=10)
            d.line((cx, 300, cx, 380), fill=accent, width=8)
        elif title == "RVOT BLOCK":
            d.polygon([(cx - 28, 280), (cx + 28, 280), (cx, 410)], outline=accent, width=8)
        elif title == "OVERRIDE":
            d.arc((cx - 40, 280, cx + 40, 400), 200, 20, fill=accent, width=10)
            d.line((cx, 250, cx, 320), fill=accent, width=8)
        else:
            d.ellipse((cx - 36, 280, cx + 36, 400), outline=accent, width=12)
        wrap_center(d, cx, 470, copy, body_f, INK, x2 - x1 - 24)
    save(im, "tof-anatomy.webp")


def make_repair():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(
        d,
        "WHAT COMPLETE TOF REPAIR CHANGES",
        "Close the VSD. Open the path to the lungs. Name the valve plan only after imaging.",
    )
    tiles = [
        (48, 130, 424, 680, TEAL, "CLOSE VSD", "A patch separates the ventricles so mixed blood no longer crosses the hole."),
        (452, 130, 828, 680, GOLD, "OPEN RVOT", "Muscle, valve or annulus work restores flow from the right ventricle to the lungs."),
        (856, 130, 1232, 680, PURPLE, "THEN WATCH", "Residual leak, obstruction and pulmonary regurgitation decide later review."),
    ]
    title_f = font(BOLD, 18)
    body_f = font(SANS, 17)
    for x1, y1, x2, y2, accent, title, copy in tiles:
        rounded(d, (x1, y1, x2, y2), CARD, 24, outline=LINE, width=2)
        d.rounded_rectangle((x1, y1, x2, y1 + 104), radius=24, fill=accent)
        d.rectangle((x1, y1 + 74, x2, y1 + 104), fill=accent)
        center_text(d, ((x1 + x2) / 2, y1 + 52), title, title_f, WHITE)
        cx = (x1 + x2) / 2
        if title == "CLOSE VSD":
            d.ellipse((cx - 44, 270, cx + 44, 400), outline=accent, width=10)
            d.line((cx - 16, 320, cx + 16, 360), fill=WHITE, width=6)
            d.line((cx + 16, 320, cx - 16, 360), fill=WHITE, width=6)
        elif title == "OPEN RVOT":
            d.polygon([(cx - 36, 280), (cx + 36, 280), (cx, 420)], fill=accent)
        else:
            d.ellipse((cx - 36, 300, cx + 36, 400), outline=accent, width=10)
            d.arc((cx - 28, 320, cx + 28, 380), 200, 340, fill=accent, width=8)
        wrap_center(d, cx, 500, copy, body_f, INK, x2 - x1 - 40)
    save(im, "tof-repair.webp")


def make_options():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(
        d,
        "THE TEAM NAMES THE REPAIR, NOT THE BROCHURE",
        "GAF TOF planning is $6,500–$16,000. Valve-sparing, transannular patch and conduit are not the same product.",
    )
    tiles = [
        (40, 128, 340, 680, TEAL, "VALVE-SPARE", "Keep the native pulmonary valve when the annulus can still pass enough flow."),
        (360, 128, 660, 680, GOLD, "TAP", "A transannular patch opens a tight outflow and can leave more regurgitation."),
        (680, 128, 980, 680, CORAL, "CONDUIT", "An RV-to-PA tube is used when the native path or a crossing coronary is unsafe."),
        (1000, 128, 1240, 680, PURPLE, "STAGED", "A shunt or stent may come first in a tiny or unstable infant. That is not complete repair."),
    ]
    title_f = font(BOLD, 16)
    body_f = font(SANS, 16)
    for x1, y1, x2, y2, accent, title, copy in tiles:
        rounded(d, (x1, y1, x2, y2), CARD, 22, outline=LINE, width=2)
        d.rounded_rectangle((x1, y1, x2, y1 + 96), radius=22, fill=accent)
        d.rectangle((x1, y1 + 70, x2, y1 + 96), fill=accent)
        center_text(d, ((x1 + x2) / 2, y1 + 48), title, title_f, WHITE)
        cx = (x1 + x2) / 2
        if title == "VALVE-SPARE":
            d.ellipse((cx - 28, 300, cx + 28, 380), outline=accent, width=8)
            d.arc((cx - 20, 320, cx + 20, 360), 200, 340, fill=accent, width=6)
        elif title == "TAP":
            d.polygon([(cx - 30, 280), (cx + 30, 300), (cx + 20, 410), (cx - 20, 400)], outline=accent, width=8)
        elif title == "CONDUIT":
            d.line((cx, 260, cx, 420), fill=accent, width=14)
            d.ellipse((cx - 16, 250, cx + 16, 282), outline=accent, width=6)
            d.ellipse((cx - 16, 400, cx + 16, 432), outline=accent, width=6)
        else:
            d.line((cx - 20, 320, cx + 20, 360), fill=accent, width=8)
            d.line((cx + 20, 360, cx - 20, 400), fill=accent, width=8)
        wrap_center(d, cx, 470, copy, body_f, INK, x2 - x1 - 24)
    save(im, "tof-options.webp")


def make_steps():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(
        d,
        "TOF JOURNEY IN INDIA",
        "GAF TOF repair is $6,500–$16,000. Stay is typically 8–16 nights; parent stay expected.",
    )
    steps = [
        ("1", "ECHO", "Coronaries if needed"),
        ("2", "SPELLS", "Local emergency first"),
        ("3", "PLAN", "Complete or staged"),
        ("4", "THEATRE", "VSD plus RVOT"),
        ("5", "ICU", "RV and rhythm"),
        ("6", "WATCH", "Lifelong review"),
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
        "A Tet spell or collapsing cyanotic infant belongs in a local emergency department. WhatsApp is for planned records.",
        font(SANS, 16),
        MUTED,
    )
    save(im, "tof-steps.webp")


if __name__ == "__main__":
    make_hero()
    make_anatomy()
    make_repair()
    make_options()
    make_steps()
