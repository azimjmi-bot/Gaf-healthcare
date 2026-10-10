#!/usr/bin/env python3
"""Human-designed Canva-style heart-valve educational diagrams (1280x720 WebP)."""

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
        for a in (90, 210, 330):
            import math
            x = cx + int((r - 18) * math.cos(math.radians(a)))
            y = cy + int((r - 18) * math.sin(math.radians(a)))
            draw.line((cx, cy, x, y), fill=ring, width=3)
    elif leaflets == 2:
        draw.arc((cx - r + 12, cy - r + 12, cx + r - 12, cy + r - 12), 200, 340, fill=ring, width=4)
        draw.arc((cx - r + 12, cy - r + 12, cx + r - 12, cy + r - 12), 20, 160, fill=ring, width=4)


def make_hero():
    im = Image.new("RGB", (1280, 720), (8, 22, 38))
    layer = Image.new("RGBA", (1280, 720), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    for box in [
        (40, -40, 520, 400, (214, 96, 108, 48)),
        (740, 60, 1360, 700, (26, 122, 140, 40)),
        (360, 340, 980, 860, (15, 44, 76, 70)),
    ]:
        d.ellipse(box[:4], fill=box[4])
    draw_heart(d, 420, 330, 1.3, fill=(214, 96, 108, 95))
    for cx, cy, r in [(390, 280, 22), (450, 300, 18), (420, 340, 16), (470, 250, 14)]:
        d.ellipse((cx - r, cy - r, cx + r, cy + r), outline=(232, 210, 214, 90), width=4)
    d.arc((780, 180, 1140, 540), 40, 250, fill=(188, 214, 222, 70), width=8)
    blurred = layer.filter(ImageFilter.GaussianBlur(1.3))
    im = Image.alpha_composite(im.convert("RGBA"), blurred).convert("RGB")
    save(im, "heart-valve-hero.webp")


def make_disease():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(d, "WHAT VALVE DISEASE DOES TO FLOW", "Stenosis narrows the opening. Regurgitation lets blood leak backward.")
    tiles = [
        (48, 130, 424, 680, CORAL, "STENOSIS", "The valve cannot open fully. The chamber works harder to push blood through a tight door."),
        (452, 130, 828, 680, TEAL, "REGURGITATION", "The valve cannot close fully. Blood leaks backward and the heart volume load rises."),
        (856, 130, 1232, 680, PURPLE, "FOUR VALVES", "Aortic and mitral are most often replaced. Tricuspid and pulmonary need a named plan."),
    ]
    title_f = font(BOLD, 22)
    body_f = font(SANS, 17)
    for x1, y1, x2, y2, accent, title, copy in tiles:
        rounded(d, (x1, y1, x2, y2), CARD, 24, outline=LINE, width=2)
        d.rounded_rectangle((x1, y1, x2, y1 + 110), radius=24, fill=accent)
        d.rectangle((x1, y1 + 78, x2, y1 + 110), fill=accent)
        center_text(d, ((x1 + x2) / 2, y1 + 55), title, title_f, WHITE)
        cx = (x1 + x2) / 2
        if title == "STENOSIS":
            valve_ring(d, cx, 340, 62, 3, WHITE, accent)
            d.ellipse((cx - 18, 322, cx + 18, 358), fill=accent)
        elif title == "REGURGITATION":
            valve_ring(d, cx, 340, 62, 3, WHITE, accent)
            d.polygon([(cx - 8, 300), (cx + 8, 300), (cx, 380)], fill=accent)
        else:
            for i, (dx, dy, n) in enumerate(((-40, -20, 3), (40, -20, 2), (-40, 40, 3), (40, 40, 3))):
                valve_ring(d, cx + dx, 330 + dy, 28, n, WHITE, accent)
        wrap_center(d, cx, 470, copy, body_f, INK, x2 - x1 - 44)
    save(im, "heart-valve-disease.webp")


def make_prostheses():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(d, "TWO SURGICAL VALVE PRODUCTS", "There is no universally best valve. Anticoagulation and durability decide together.")
    tiles = [
        (64, 130, 616, 680, NAVY, "MECHANICAL", "Very durable. Generally needs lifelong warfarin and INR checks. A click can be audible."),
        (664, 130, 1216, 680, TEAL, "TISSUE / BIOLOGICAL", "Usually no lifelong warfarin solely for the valve. Leaflets can wear. Valve-in-valve may later be possible."),
    ]
    title_f = font(BOLD, 24)
    body_f = font(SANS, 18)
    for x1, y1, x2, y2, accent, title, copy in tiles:
        rounded(d, (x1, y1, x2, y2), CARD, 24, outline=LINE, width=2)
        d.rounded_rectangle((x1, y1, x2, y1 + 110), radius=24, fill=accent)
        d.rectangle((x1, y1 + 78, x2, y1 + 110), fill=accent)
        center_text(d, ((x1 + x2) / 2, y1 + 55), title, title_f, WHITE)
        cx = (x1 + x2) / 2
        if title.startswith("MECHANICAL"):
            valve_ring(d, cx, 340, 78, 2, (230, 236, 240), accent)
            d.ellipse((cx - 10, 330, cx + 10, 350), fill=GOLD)
        else:
            valve_ring(d, cx, 340, 78, 3, (255, 236, 230), accent)
        wrap_center(d, cx, 470, copy, body_f, INK, x2 - x1 - 56)
    save(im, "heart-valve-types.webp")


def make_pathways():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(d, "REPAIR, SURGICAL REPLACE OR TAVR", "The Heart Team names one product. Brochure packages are not a substitute.")
    tiles = [
        (48, 130, 424, 680, GOLD, "REPAIR", "Keep the native valve when a durable repair is feasible. Neighbouring mitral repair is $7,500–$18,000."),
        (452, 130, 828, 680, CORAL, "SURGICAL AVR / MVR", "Remove the diseased valve and sew a prosthesis. Neighbouring valve replacement is $7,000–$18,000."),
        (856, 130, 1232, 680, TEAL, "TAVR / TAVI", "A catheter valve for selected aortic stenosis. Named TAVR planning is $18,000–$42,000."),
    ]
    title_f = font(BOLD, 20)
    body_f = font(SANS, 17)
    for x1, y1, x2, y2, accent, title, copy in tiles:
        rounded(d, (x1, y1, x2, y2), CARD, 24, outline=LINE, width=2)
        d.rounded_rectangle((x1, y1, x2, y1 + 110), radius=24, fill=accent)
        d.rectangle((x1, y1 + 78, x2, y1 + 110), fill=accent)
        center_text(d, ((x1 + x2) / 2, y1 + 55), title, title_f, WHITE)
        cx = (x1 + x2) / 2
        if title == "REPAIR":
            draw_heart(d, cx, 330, 0.48)
            valve_ring(d, cx, 318, 22, 2, WHITE, accent)
        elif title.startswith("SURGICAL"):
            draw_heart(d, cx, 320, 0.48)
            d.line((cx - 40, 400, cx + 40, 400), fill=NAVY, width=8)
            d.rectangle((cx - 50, 390, cx + 50, 430), outline=NAVY, width=4)
        else:
            d.rounded_rectangle((cx - 16, 270, cx + 16, 420), radius=8, fill=(232, 210, 214))
            valve_ring(d, cx, 300, 26, 3, WHITE, accent)
        wrap_center(d, cx, 470, copy, body_f, INK, x2 - x1 - 40)
    save(im, "heart-valve-pathways.webp")


def make_steps():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(d, "SURGICAL VALVE JOURNEY", "GAF valve-replacement planning is $7,000–$18,000, typically 8–16 nights.")
    steps = [
        ("1", "ECHO", "Valve anatomy, leak, gradient and heart function"),
        ("2", "HEART TEAM", "Repair, surgical replace or TAVR is named"),
        ("3", "PROSTHESIS", "Mechanical or tissue after anticoagulation talk"),
        ("4", "OPERATE", "Bypass, remove the valve, seat the prosthesis"),
        ("5", "CARDIAC ICU", "Rhythm, bleeding and early walking"),
        ("6", "FOLLOW", "INR if mechanical; echo and dental care for life"),
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
        "Neighbouring TAVR is $18,000–$42,000. Neighbouring double-valve replacement is $12,000–$28,000.",
        font(SANS, 16),
        MUTED,
    )
    save(im, "heart-valve-steps.webp")


if __name__ == "__main__":
    make_hero()
    make_disease()
    make_prostheses()
    make_pathways()
    make_steps()
