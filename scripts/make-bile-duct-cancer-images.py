#!/usr/bin/env python3
"""Human-designed Canva-style bile-duct cancer diagrams (1280x720 WebP)."""

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
    center_text(draw, (640, 38), title, font(BOLD, 26), WHITE)
    center_text(draw, (640, 70), subtitle, font(SANS, 16), (188, 214, 222))


def biliary_tree(draw, cx, cy, mark="none", accent=CORAL):
    draw.ellipse((cx - 88, cy - 78, cx + 88, cy + 18), fill=(210, 226, 232))
    draw.polygon([(cx - 28, cy + 8), (cx + 8, cy + 8), (cx - 10, cy + 42)], fill=GOLD)
    draw.line((cx - 6, cy + 36, cx - 6, cy + 92), fill=TEAL, width=7)
    draw.line((cx - 40, cy - 8, cx - 6, cy + 36), fill=TEAL, width=5)
    draw.line((cx + 28, cy - 8, cx - 6, cy + 36), fill=TEAL, width=5)
    if mark == "intra":
        draw.ellipse((cx - 54, cy - 36, cx - 22, cy - 4), fill=accent)
    elif mark == "hilar":
        draw.ellipse((cx - 22, cy + 18, cx + 10, cy + 50), fill=accent)
    elif mark == "distal":
        draw.ellipse((cx - 22, cy + 70, cx + 10, cy + 102), fill=accent)
        rounded(draw, (cx + 8, cy + 62, cx + 54, cy + 108), (232, 210, 214), 16)
    elif mark == "clear":
        draw.ellipse((cx - 18, cy + 20, cx + 6, cy + 44), outline=TEAL, width=4)


def make_hero():
    im = Image.new("RGB", (1280, 720), (8, 22, 38))
    layer = Image.new("RGBA", (1280, 720), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    for box in [
        (40, -80, 620, 420, (26, 122, 140, 50)),
        (700, 40, 1400, 760, (196, 84, 84, 36)),
        (280, 240, 1040, 900, (15, 44, 76, 70)),
    ]:
        d.ellipse(box[:4], fill=box[4])
    d.ellipse((470, 170, 810, 430), fill=(210, 226, 232, 70))
    d.polygon([(590, 400), (670, 400), (620, 490)], fill=(196, 148, 64, 80))
    d.line((620, 470, 620, 590), fill=(26, 122, 140, 90), width=10)
    blurred = layer.filter(ImageFilter.GaussianBlur(1.4))
    im = Image.alpha_composite(im.convert("RGBA"), blurred).convert("RGB")
    save(im, "bile-duct-hero.webp")


def make_types():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(d, "LOCATION NAMES THE OPERATION", "Intrahepatic, perihilar and distal cholangiocarcinoma are not interchangeable.")
    tiles = [
        (48, 130, 424, 680, TEAL, "INTRAHEPATIC", "Starts inside the liver ducts. Surgery is usually a liver resection sized to the remnant."),
        (452, 130, 828, 680, CORAL, "PERIHILAR", "At the duct confluence. Often needs liver, caudate, nodes and a Roux bile join."),
        (856, 130, 1232, 680, GOLD, "DISTAL", "Lower common bile duct. Selected resectable cases need a Whipple, not a simple duct cut."),
    ]
    title_f = font(BOLD, 20)
    body_f = font(SANS, 17)
    marks = ["intra", "hilar", "distal"]
    for (x1, y1, x2, y2, accent, title, copy), mark in zip(tiles, marks):
        rounded(d, (x1, y1, x2, y2), CARD, 24, outline=LINE, width=2)
        d.rounded_rectangle((x1, y1, x2, y1 + 110), radius=24, fill=accent)
        d.rectangle((x1, y1 + 78, x2, y1 + 110), fill=accent)
        center_text(d, ((x1 + x2) / 2, y1 + 55), title, title_f, WHITE)
        cx = (x1 + x2) / 2
        biliary_tree(d, cx, 320, mark=mark, accent=accent)
        wrap_center(d, cx, 470, copy, body_f, INK, x2 - x1 - 40)
    save(im, "bile-duct-types.webp")


def make_operations():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(
        d,
        "THREE HONEST PRODUCTS",
        "GAF bile-duct cancer surgery is $10,000–$26,000. Neighbouring Whipple is $14,000–$32,000.",
    )
    tiles = [
        (48, 130, 424, 680, TEAL, "LIVER RESECTION", "Intrahepatic tumours: remove the involved liver while leaving a safe future remnant."),
        (452, 130, 828, 680, CORAL, "HILAR RESECTION", "Perihilar tumours: ducts, part of the liver, nodes and hepaticojejunostomy."),
        (856, 130, 1232, 680, PURPLE, "WHIPPLE", "Distal tumours near the pancreas. That sitting belongs on the Whipple sheet when named."),
    ]
    title_f = font(BOLD, 18)
    body_f = font(SANS, 17)
    marks = ["intra", "hilar", "distal"]
    for (x1, y1, x2, y2, accent, title, copy), mark in zip(tiles, marks):
        rounded(d, (x1, y1, x2, y2), CARD, 24, outline=LINE, width=2)
        d.rounded_rectangle((x1, y1, x2, y1 + 110), radius=24, fill=accent)
        d.rectangle((x1, y1 + 78, x2, y1 + 110), fill=accent)
        center_text(d, ((x1 + x2) / 2, y1 + 55), title, title_f, WHITE)
        biliary_tree(d, (x1 + x2) / 2, 320, mark=mark, accent=accent)
        wrap_center(d, (x1 + x2) / 2, 470, copy, body_f, INK, x2 - x1 - 40)
    save(im, "bile-duct-operations.webp")


def make_resectability():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(d, "R0 IS THE QUESTION", "Can the cancer come out completely while leaving enough working liver?")
    tiles = [
        (48, 130, 424, 680, TEAL, "R0 RESECTION", "Negative margins, not the largest possible cut. Imaging and remnant volume decide."),
        (452, 130, 828, 680, GOLD, "FUTURE LIVER", "If the remnant is too small, portal-vein embolization may be named before major hepatectomy."),
        (856, 130, 1232, 680, CORAL, "UNRESECTABLE", "Distant spread or unsafe vessels. Stent, drainage and systemic treatment are different products."),
    ]
    title_f = font(BOLD, 20)
    body_f = font(SANS, 17)
    marks = ["clear", "intra", "hilar"]
    for (x1, y1, x2, y2, accent, title, copy), mark in zip(tiles, marks):
        rounded(d, (x1, y1, x2, y2), CARD, 24, outline=LINE, width=2)
        d.rounded_rectangle((x1, y1, x2, y1 + 110), radius=24, fill=accent)
        d.rectangle((x1, y1 + 78, x2, y1 + 110), fill=accent)
        center_text(d, ((x1 + x2) / 2, y1 + 55), title, title_f, WHITE)
        biliary_tree(d, (x1 + x2) / 2, 320, mark=mark, accent=accent)
        wrap_center(d, (x1 + x2) / 2, 470, copy, body_f, INK, x2 - x1 - 40)
    save(im, "bile-duct-resectability.webp")


def make_steps():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(
        d,
        "BILE-DUCT CANCER JOURNEY",
        "GAF bile-duct cancer surgery is $10,000–$26,000. Stay is typically 8–16 nights.",
    )
    steps = [
        ("1", "SCANS", "CT, MRI/MRCP and bilirubin"),
        ("2", "MDT", "Resectable or not is named"),
        ("3", "PREP", "Drain or PVE if required"),
        ("4", "RESECT", "Liver, hilar or Whipple"),
        ("5", "ICU", "Remnant, leak and infection"),
        ("6", "ONCOLOGY", "Pathology and adjuvant plan"),
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
        "Neighbouring Whipple is $14,000–$32,000 when distal disease names pancreaticoduodenectomy.",
        font(SANS, 16),
        MUTED,
    )
    save(im, "bile-duct-steps.webp")


if __name__ == "__main__":
    make_hero()
    make_types()
    make_operations()
    make_resectability()
    make_steps()
