#!/usr/bin/env python3
"""Human-designed Canva-style tricuspid-repair diagrams (1280x720 WebP)."""

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


def valve_ring(draw, cx, cy, r=54, gap=True, accent=CORAL):
    draw.ellipse((cx - r, cy - r, cx + r, cy + r), outline=NAVY, width=8)
    draw.ellipse((cx - r + 14, cy - r + 14, cx + r - 14, cy + r - 14), outline=TEAL, width=5)
    if gap:
        draw.pieslice((cx - 18, cy - 8, cx + 26, cy + 28), 200, 20, fill=accent)
    else:
        draw.ellipse((cx - 16, cy - 10, cx + 16, cy + 14), fill=TEAL)


def make_hero():
    im = Image.new("RGB", (1280, 720), (8, 22, 38))
    layer = Image.new("RGBA", (1280, 720), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    for box in [
        (40, -70, 540, 380, (26, 122, 140, 48)),
        (680, 40, 1400, 740, (196, 84, 84, 38)),
        (300, 260, 1020, 900, (15, 44, 76, 70)),
    ]:
        d.ellipse(box[:4], fill=box[4])
    d.ellipse((430, 180, 850, 560), outline=(196, 84, 84, 90), width=18)
    d.ellipse((500, 240, 780, 500), fill=(26, 122, 140, 70))
    d.pieslice((560, 300, 760, 500), 210, 30, fill=(196, 84, 84, 90))
    blurred = layer.filter(ImageFilter.GaussianBlur(1.4))
    im = Image.alpha_composite(im.convert("RGBA"), blurred).convert("RGB")
    save(im, "tricuspid-repair-hero.webp")


def make_anatomy():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(
        d,
        "HOW TRICUSPID REGURGITATION LEAKS",
        "Blood should move right atrium to right ventricle. A leak sends it backward.",
    )
    tiles = [
        (48, 130, 424, 680, TEAL, "RIGHT ATRIUM", "Receives venous blood. A leak fills this chamber again when the ventricle squeezes."),
        (452, 130, 828, 680, CORAL, "LEAKY VALVE", "Three leaflets fail to meet. The gap is tricuspid regurgitation."),
        (856, 130, 1232, 680, PURPLE, "RIGHT VENTRICLE", "Pumps toward the lungs. Enlargement can pull the annulus wider and worsen the leak."),
    ]
    title_f = font(BOLD, 18)
    body_f = font(SANS, 17)
    for x1, y1, x2, y2, accent, title, copy in tiles:
        rounded(d, (x1, y1, x2, y2), CARD, 24, outline=LINE, width=2)
        d.rounded_rectangle((x1, y1, x2, y1 + 104), radius=24, fill=accent)
        d.rectangle((x1, y1 + 74, x2, y1 + 104), fill=accent)
        center_text(d, ((x1 + x2) / 2, y1 + 52), title, title_f, WHITE)
        cx = (x1 + x2) / 2
        if "ATRIUM" in title:
            d.ellipse((cx - 70, 250, cx + 70, 410), outline=accent, width=10)
            d.ellipse((cx - 28, 300, cx + 28, 360), fill=accent)
        elif "LEAKY" in title:
            valve_ring(d, cx, 330, 62, True, CORAL)
        else:
            d.polygon([(cx, 250), (cx + 80, 400), (cx - 80, 400)], outline=accent)
            d.line((cx, 250, cx, 400), fill=accent, width=8)
        wrap_center(d, cx, 470, copy, body_f, INK, x2 - x1 - 40)
    save(im, "tricuspid-repair-anatomy.webp")


def make_techniques():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(
        d,
        "THREE WAYS TO RESTORE CLOSURE",
        "Annuloplasty, leaflet work or selected T-TEER. Neighbouring heart-valve repair is $6,500–$16,500.",
    )
    tiles = [
        (40, 130, 430, 680, TEAL, "ANNULOPLASTY", "A ring or band shrinks an enlarged annulus so the leaflets can meet again."),
        (450, 130, 840, 680, GOLD, "LEAFLET REPAIR", "Tears, chords or gaps are reconstructed when the valve tissue itself is damaged."),
        (860, 130, 1240, 680, PURPLE, "T-TEER", "A catheter clips leaflets together in selected high-risk patients. No live GAF T-TEER sheet."),
    ]
    title_f = font(BOLD, 18)
    body_f = font(SANS, 17)
    for x1, y1, x2, y2, accent, title, copy in tiles:
        rounded(d, (x1, y1, x2, y2), CARD, 24, outline=LINE, width=2)
        d.rounded_rectangle((x1, y1, x2, y1 + 104), radius=24, fill=accent)
        d.rectangle((x1, y1 + 74, x2, y1 + 104), fill=accent)
        center_text(d, ((x1 + x2) / 2, y1 + 52), title, title_f, WHITE)
        cx = (x1 + x2) / 2
        if title == "ANNULOPLASTY":
            valve_ring(d, cx, 320, 58, False, TEAL)
            d.ellipse((cx - 72, 248, cx + 72, 392), outline=GOLD, width=8)
        elif title == "LEAFLET REPAIR":
            valve_ring(d, cx, 320, 58, True, GOLD)
            d.line((cx - 20, 300, cx + 24, 340), fill=NAVY, width=6)
        else:
            d.rectangle((cx - 10, 240, cx + 10, 400), fill=PURPLE)
            d.ellipse((cx - 28, 300, cx + 28, 356), fill=CORAL)
            d.ellipse((cx - 12, 316, cx + 12, 340), fill=WHITE)
        wrap_center(d, cx, 450, copy, body_f, INK, x2 - x1 - 36)
    save(im, "tricuspid-repair-techniques.webp")


def make_decision():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(
        d,
        "REPAIR IS PREFERRED WHEN IT CAN HOLD",
        "Guidelines favor repair over replacement when anatomy allows. Replacement sits on a neighbouring page.",
    )
    tiles = [
        (40, 130, 340, 680, TEAL, "REPAIR", "Keep the native valve. Neighbouring heart-valve repair is $6,500–$16,500."),
        (360, 130, 660, 680, CORAL, "REPLACE", "Used when leaflets cannot be reconstructed. Neighbouring replacement is $7,000–$18,000."),
        (680, 130, 980, 680, GOLD, "CATHETER", "T-TEER for selected high-risk anatomy. Quoted after imaging. No live GAF sheet."),
        (1000, 130, 1240, 680, PURPLE, "MEDICINES", "Diuretics treat congestion. They do not sew the leaflets together."),
    ]
    title_f = font(BOLD, 16)
    body_f = font(SANS, 16)
    for x1, y1, x2, y2, accent, title, copy in tiles:
        rounded(d, (x1, y1, x2, y2), CARD, 22, outline=LINE, width=2)
        d.rounded_rectangle((x1, y1, x2, y1 + 96), radius=22, fill=accent)
        d.rectangle((x1, y1 + 70, x2, y1 + 96), fill=accent)
        center_text(d, ((x1 + x2) / 2, y1 + 48), title, title_f, WHITE)
        cx = (x1 + x2) / 2
        valve_ring(d, cx, 300, 48, title != "REPAIR", accent)
        wrap_center(d, cx, 430, copy, body_f, INK, x2 - x1 - 24)
    save(im, "tricuspid-repair-decision.webp")


def make_steps():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(
        d,
        "TRICUSPID REPAIR JOURNEY",
        "Neighbouring heart-valve repair is $6,500–$16,500. Stay is typically 7–14 nights.",
    )
    steps = [
        ("1", "ECHO", "TR, RV size, annulus"),
        ("2", "TEAM", "Repair, replace or T-TEER"),
        ("3", "QUOTE", "Itemised inclusions"),
        ("4", "REPAIR", "Ring, leaflets or clip"),
        ("5", "ICU", "Rhythm and fluid watch"),
        ("6", "FOLLOW", "Repeat echo after home"),
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
        "Neighbouring replacement is $7,000–$18,000 when repair cannot hold. TAVR is an aortic product.",
        font(SANS, 16),
        MUTED,
    )
    save(im, "tricuspid-repair-steps.webp")


if __name__ == "__main__":
    make_hero()
    make_anatomy()
    make_techniques()
    make_decision()
    make_steps()
