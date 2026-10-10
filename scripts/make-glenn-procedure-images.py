#!/usr/bin/env python3
"""Human-designed Canva-style Glenn diagrams (1280x720 WebP)."""

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
    im = Image.new("RGB", (1280, 720), (8, 22, 38))
    layer = Image.new("RGBA", (1280, 720), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    for box in [
        (30, -70, 560, 410, (26, 122, 140, 50)),
        (700, 30, 1400, 760, (196, 148, 64, 34)),
        (250, 210, 1080, 900, (15, 44, 76, 72)),
    ]:
        d.ellipse(box[:4], fill=box[4])
    d.line((640, 160, 640, 300), fill=(196, 148, 64, 160), width=16)
    d.line((640, 300, 520, 420), fill=(26, 122, 140, 150), width=14)
    d.line((640, 300, 760, 420), fill=(26, 122, 140, 150), width=14)
    d.ellipse((590, 430, 690, 560), outline=(188, 214, 222, 140), width=14)
    blurred = layer.filter(ImageFilter.GaussianBlur(1.4))
    im = Image.alpha_composite(im.convert("RGBA"), blurred).convert("RGB")
    save(im, "glenn-hero.webp")


def make_anatomy():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(
        d,
        "WHAT THE GLENN CONNECTION CHANGES",
        "Upper-body venous blood reaches the lungs without a ventricular pump.",
    )
    tiles = [
        (48, 130, 424, 680, GOLD, "SVC", "The superior vena cava is taken off the atrium and joined to the pulmonary arteries."),
        (452, 130, 828, 680, TEAL, "LUNGS", "Passive flow fills both lungs when the bidirectional Glenn is used."),
        (856, 130, 1232, 680, PURPLE, "LESS LOAD", "The single ventricle then pumps mainly oxygenated blood to the body."),
    ]
    title_f = font(BOLD, 18)
    body_f = font(SANS, 17)
    for x1, y1, x2, y2, accent, title, copy in tiles:
        rounded(d, (x1, y1, x2, y2), CARD, 24, outline=LINE, width=2)
        d.rounded_rectangle((x1, y1, x2, y1 + 104), radius=24, fill=accent)
        d.rectangle((x1, y1 + 74, x2, y1 + 104), fill=accent)
        center_text(d, ((x1 + x2) / 2, y1 + 52), title, title_f, WHITE)
        cx = (x1 + x2) / 2
        if title == "SVC":
            d.line((cx, 250, cx, 360), fill=accent, width=12)
            d.line((cx, 360, cx - 40, 420), fill=accent, width=10)
            d.line((cx, 360, cx + 40, 420), fill=accent, width=10)
        elif title == "LUNGS":
            d.ellipse((cx - 52, 270, cx - 8, 360), outline=accent, width=8)
            d.ellipse((cx + 8, 270, cx + 52, 360), outline=accent, width=8)
        else:
            d.ellipse((cx - 40, 280, cx + 40, 400), outline=accent, width=10)
            d.line((cx, 400, cx, 450), fill=accent, width=8)
        wrap_center(d, cx, 500, copy, body_f, INK, x2 - x1 - 40)
    save(im, "glenn-anatomy.webp")


def make_stages():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(
        d,
        "GLENN IS USUALLY STAGE TWO",
        "GAF Glenn planning is $8,000–$18,000. Fontan completion sits on its own treatment page.",
    )
    tiles = [
        (40, 128, 340, 680, CORAL, "STAGE 1", "Neonatal palliation, sometimes a Norwood-type operation, supports the infant first."),
        (360, 128, 660, 680, GOLD, "STAGE 2", "Bidirectional Glenn sends upper-body venous blood to the lungs."),
        (680, 128, 980, 680, TEAL, "STAGE 3", "Fontan completion later adds lower-body venous return when the child is suitable."),
        (1000, 128, 1240, 680, PURPLE, "WATCH", "Saturations stay below a two-ventricle normal. Interstage follow-up is not optional."),
    ]
    title_f = font(BOLD, 16)
    body_f = font(SANS, 16)
    for x1, y1, x2, y2, accent, title, copy in tiles:
        rounded(d, (x1, y1, x2, y2), CARD, 22, outline=LINE, width=2)
        d.rounded_rectangle((x1, y1, x2, y1 + 96), radius=22, fill=accent)
        d.rectangle((x1, y1 + 70, x2, y1 + 96), fill=accent)
        center_text(d, ((x1 + x2) / 2, y1 + 48), title, title_f, WHITE)
        cx = (x1 + x2) / 2
        if title == "STAGE 1":
            d.ellipse((cx - 36, 280, cx + 36, 400), outline=accent, width=9)
        elif title == "STAGE 2":
            d.line((cx, 250, cx, 340), fill=accent, width=12)
            d.line((cx, 340, cx - 36, 410), fill=accent, width=10)
            d.line((cx, 340, cx + 36, 410), fill=accent, width=10)
        elif title == "STAGE 3":
            d.line((cx, 250, cx, 420), fill=accent, width=12)
            d.arc((cx - 36, 300, cx + 36, 400), 200, 340, fill=accent, width=10)
        else:
            d.ellipse((cx - 32, 300, cx + 32, 364), outline=accent, width=8)
        wrap_center(d, cx, 470, copy, body_f, INK, x2 - x1 - 24)
    save(im, "glenn-stages.webp")


def make_operation():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(
        d,
        "HOW THE BIDIRECTIONAL GLENN IS BUILT",
        "SVC to pulmonary arteries. Extra work is named only after imaging, not from a package name.",
    )
    tiles = [
        (40, 128, 340, 680, TEAL, "DIVIDE SVC", "The superior vena cava is separated from its atrial entry."),
        (360, 128, 660, 680, GOLD, "JOIN PA", "The SVC is sewn to the pulmonary artery so flow can reach both lungs."),
        (680, 128, 980, 680, CORAL, "ADD-ONS", "Shunt takedown, PA reconstruction or valve work may be needed in the same sitting."),
        (1000, 128, 1240, 680, PURPLE, "HEMI-FONTAN", "A related superior cavopulmonary connection. The team names which one after anatomy review."),
    ]
    title_f = font(BOLD, 16)
    body_f = font(SANS, 16)
    for x1, y1, x2, y2, accent, title, copy in tiles:
        rounded(d, (x1, y1, x2, y2), CARD, 22, outline=LINE, width=2)
        d.rounded_rectangle((x1, y1, x2, y1 + 96), radius=22, fill=accent)
        d.rectangle((x1, y1 + 70, x2, y1 + 96), fill=accent)
        center_text(d, ((x1 + x2) / 2, y1 + 48), title, title_f, WHITE)
        cx = (x1 + x2) / 2
        if title == "DIVIDE SVC":
            d.line((cx, 250, cx, 400), fill=accent, width=12)
            d.line((cx - 18, 330, cx + 18, 330), fill=WHITE, width=4)
        elif title == "JOIN PA":
            d.line((cx, 250, cx, 340), fill=accent, width=12)
            d.line((cx - 40, 400, cx + 40, 400), fill=accent, width=10)
            d.line((cx, 340, cx, 400), fill=accent, width=10)
        elif title == "ADD-ONS":
            d.line((cx - 28, 300, cx + 28, 300), fill=accent, width=8)
            d.line((cx, 260, cx, 400), fill=accent, width=8)
        else:
            d.arc((cx - 36, 290, cx + 36, 380), 200, 340, fill=accent, width=10)
            d.line((cx, 250, cx, 310), fill=accent, width=8)
        wrap_center(d, cx, 470, copy, body_f, INK, x2 - x1 - 24)
    save(im, "glenn-operation.webp")


def make_steps():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(
        d,
        "GLENN JOURNEY IN INDIA",
        "GAF Glenn procedure is $8,000–$18,000. Stay is typically 8–16 nights; parent stay expected.",
    )
    steps = [
        ("1", "ECHO", "Cath if needed"),
        ("2", "STAGE", "First palliation done?"),
        ("3", "PLAN", "Name the Glenn"),
        ("4", "THEATRE", "SVC to PA"),
        ("5", "ICU", "Sats and drains"),
        ("6", "WATCH", "Toward Fontan"),
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
        "A collapsing single-ventricle infant belongs in a local emergency department. WhatsApp is for planned records.",
        font(SANS, 16),
        MUTED,
    )
    save(im, "glenn-steps.webp")


if __name__ == "__main__":
    make_hero()
    make_anatomy()
    make_stages()
    make_operation()
    make_steps()
