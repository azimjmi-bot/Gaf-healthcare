#!/usr/bin/env python3
"""Human-designed Canva-style tricuspid-valve diagrams (1280x720 WebP)."""

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
PINK = (214, 96, 108)

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
    center_text(draw, (640, 38), title, font(BOLD, 26), WHITE)
    center_text(draw, (640, 70), subtitle, font(SANS, 16), (188, 214, 222))


def draw_heart(draw, cx, cy, scale=1.0, fill=PINK):
    s = scale
    draw.ellipse((cx - 92 * s, cy - 78 * s, cx + 8 * s, cy + 28 * s), fill=fill)
    draw.ellipse((cx - 8 * s, cy - 78 * s, cx + 92 * s, cy + 28 * s), fill=fill)
    draw.polygon(
        [(cx - 88 * s, cy - 4 * s), (cx + 88 * s, cy - 4 * s), (cx, cy + 110 * s)],
        fill=fill,
    )


def valve_ring(draw, cx, cy, r, leaflets=3, fill=WHITE, ring=NAVY):
    draw.ellipse((cx - r, cy - r, cx + r, cy + r), outline=ring, width=6)
    draw.ellipse((cx - r + 8, cy - r + 8, cx + r - 8, cy + r - 8), fill=fill)
    if leaflets == 3:
        import math
        for a in (90, 210, 330):
            x = cx + int((r - 18) * math.cos(math.radians(a)))
            y = cy + int((r - 18) * math.sin(math.radians(a)))
            draw.line((cx, cy, x, y), fill=ring, width=3)


def make_hero():
    im = Image.new("RGB", (1280, 720), (8, 22, 38))
    layer = Image.new("RGBA", (1280, 720), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    for box in [
        (40, -40, 520, 400, (26, 122, 140, 48)),
        (740, 80, 1360, 700, (214, 96, 108, 38)),
        (360, 340, 980, 860, (15, 44, 76, 70)),
    ]:
        d.ellipse(box[:4], fill=box[4])
    draw_heart(d, 430, 330, 1.3, fill=(214, 96, 108, 92))
    d.ellipse((400, 300, 460, 360), outline=(232, 210, 214, 90), width=5)
    d.arc((860, 200, 1140, 520), 30, 240, fill=(188, 214, 222, 70), width=8)
    blurred = layer.filter(ImageFilter.GaussianBlur(1.3))
    im = Image.alpha_composite(im.convert("RGBA"), blurred).convert("RGB")
    save(im, "tricuspid-valve-hero.webp")


def make_anatomy():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(d, "HOW THE TRICUSPID VALVE WORKS", "It sits between the right atrium and right ventricle. Leak is more common than narrowing.")
    tiles = [
        (48, 130, 424, 680, TEAL, "RIGHT ATRIUM", "Blood arrives from the body. The valve should open so the ventricle can fill."),
        (452, 130, 828, 680, CORAL, "TRICUSPID LEAK", "In regurgitation the leaflets do not meet. Blood falls backward and the right heart enlarges."),
        (856, 130, 1232, 680, PURPLE, "RIGHT VENTRICLE", "The chamber pumps to the lungs. Late dysfunction makes replacement more complex."),
    ]
    title_f = font(BOLD, 20)
    body_f = font(SANS, 17)
    for x1, y1, x2, y2, accent, title, copy in tiles:
        rounded(d, (x1, y1, x2, y2), CARD, 24, outline=LINE, width=2)
        d.rounded_rectangle((x1, y1, x2, y1 + 110), radius=24, fill=accent)
        d.rectangle((x1, y1 + 78, x2, y1 + 110), fill=accent)
        center_text(d, ((x1 + x2) / 2, y1 + 55), title, title_f, WHITE)
        cx = (x1 + x2) / 2
        if title.startswith("TRICUSPID"):
            valve_ring(d, cx, 330, 64, 3, WHITE, accent)
            d.polygon([(cx - 8, 290), (cx + 8, 290), (cx, 380)], fill=accent)
        else:
            draw_heart(d, cx, 320, 0.42)
            valve_ring(d, cx + 18, 318, 16, 3, WHITE, accent)
        wrap_center(d, cx, 460, copy, body_f, INK, x2 - x1 - 40)
    save(im, "tricuspid-valve-anatomy.webp")


def make_decision():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(d, "REPAIR FIRST WHEN IT CAN HOLD", "Replacement is named only when a durable repair is not honest.")
    tiles = [
        (64, 130, 616, 680, GOLD, "REPAIR", "Keep the native leaflets when they can be made to meet. Neighbouring valve repair is $6,500–$16,500."),
        (664, 130, 1216, 680, CORAL, "REPLACE", "A mechanical or tissue prosthesis when leaflets are destroyed. Neighbouring valve replacement is $7,000–$18,000."),
    ]
    title_f = font(BOLD, 24)
    body_f = font(SANS, 18)
    for x1, y1, x2, y2, accent, title, copy in tiles:
        rounded(d, (x1, y1, x2, y2), CARD, 24, outline=LINE, width=2)
        d.rounded_rectangle((x1, y1, x2, y1 + 110), radius=24, fill=accent)
        d.rectangle((x1, y1 + 78, x2, y1 + 110), fill=accent)
        center_text(d, ((x1 + x2) / 2, y1 + 55), title, title_f, WHITE)
        cx = (x1 + x2) / 2
        valve_ring(d, cx, 330, 72, 3, WHITE, accent)
        if title == "REPLACE":
            d.ellipse((cx - 14, 316, cx + 14, 344), fill=GOLD)
        wrap_center(d, cx, 470, copy, body_f, INK, x2 - x1 - 56)
    save(im, "tricuspid-valve-decision.webp")


def make_pathways():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(d, "SURGICAL REPLACE OR TRANSCATHETER", "Transcatheter tricuspid work is hospital-priced. TAVR is an aortic product.")
    tiles = [
        (48, 130, 424, 680, CORAL, "OPEN TVR", "Sternotomy, bypass and a sewn prosthesis. Neighbouring heart-valve replacement is $7,000–$18,000."),
        (452, 130, 828, 680, TEAL, "MINI ACCESS", "Selected mini-thoracotomy at experienced centres. Neighbouring mini-cardiac surgery is $8,000–$20,000."),
        (856, 130, 1232, 680, PURPLE, "TRANSCATHETER", "TEER or replacement for selected high-risk anatomy. No live GAF tricuspid-device sheet."),
    ]
    title_f = font(BOLD, 20)
    body_f = font(SANS, 17)
    for x1, y1, x2, y2, accent, title, copy in tiles:
        rounded(d, (x1, y1, x2, y2), CARD, 24, outline=LINE, width=2)
        d.rounded_rectangle((x1, y1, x2, y1 + 110), radius=24, fill=accent)
        d.rectangle((x1, y1 + 78, x2, y1 + 110), fill=accent)
        center_text(d, ((x1 + x2) / 2, y1 + 55), title, title_f, WHITE)
        cx = (x1 + x2) / 2
        if title == "TRANSCATHETER":
            d.rounded_rectangle((cx - 14, 270, cx + 14, 420), radius=8, fill=(232, 210, 214))
            valve_ring(d, cx, 300, 24, 3, WHITE, accent)
        else:
            draw_heart(d, cx, 320, 0.42)
        wrap_center(d, cx, 460, copy, body_f, INK, x2 - x1 - 40)
    save(im, "tricuspid-valve-pathways.webp")


def make_steps():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(d, "TRICUSPID REPLACEMENT JOURNEY", "There is no tricuspid-only GAF sheet. Neighbouring valve replacement is $7,000–$18,000.")
    steps = [
        ("1", "ECHO", "TR grade, RV size and pulmonary pressure"),
        ("2", "HEART TEAM", "Repair, replace or transcatheter is named"),
        ("3", "PROSTHESIS", "Mechanical or tissue after INR talk"),
        ("4", "OPERATE", "Bypass, inspect, replace if repair fails"),
        ("5", "ICU", "Rhythm, fluid and right-heart watch"),
        ("6", "FOLLOW", "Echo and anticoagulation for life"),
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
        "Neighbouring double-valve replacement is $12,000–$28,000 when another valve is named in the same sitting.",
        font(SANS, 16),
        MUTED,
    )
    save(im, "tricuspid-valve-steps.webp")


if __name__ == "__main__":
    make_hero()
    make_anatomy()
    make_decision()
    make_pathways()
    make_steps()
