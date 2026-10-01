#!/usr/bin/env python3
"""Human-designed Canva-style aortic-dissection diagrams (1280x720 WebP)."""

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


def aorta_arch(draw, cx, cy, color=CORAL, width=18):
    draw.arc((cx - 90, cy - 90, cx + 90, cy + 90), 200, 340, fill=color, width=width)
    draw.line((cx - 78, cy + 20, cx - 78, cy + 160), fill=color, width=width)
    draw.line((cx + 78, cy + 20, cx + 78, cy + 80), fill=color, width=width)
    draw.ellipse((cx - 16, cy - 8, cx + 16, cy + 24), fill=PINK)


def make_hero():
    im = Image.new("RGB", (1280, 720), (8, 22, 38))
    layer = Image.new("RGBA", (1280, 720), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    for box in [
        (20, -80, 560, 420, (26, 122, 140, 50)),
        (720, 40, 1400, 740, (196, 84, 84, 42)),
        (300, 300, 1020, 900, (15, 44, 76, 72)),
    ]:
        d.ellipse(box[:4], fill=box[4])
    d.arc((360, 160, 720, 520), 200, 340, fill=(214, 96, 108, 90), width=28)
    d.line((392, 360, 392, 620), fill=(214, 96, 108, 80), width=22)
    d.arc((860, 180, 1160, 500), 20, 220, fill=(188, 214, 222, 60), width=10)
    blurred = layer.filter(ImageFilter.GaussianBlur(1.4))
    im = Image.alpha_composite(im.convert("RGBA"), blurred).convert("RGB")
    save(im, "aortic-dissection-hero.webp")


def make_types():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(d, "TYPE A IS AN EMERGENCY. TYPE B IS NOT THE SAME PRODUCT.", "Ascending involvement names open repair. Uncomplicated Type B may start with blood-pressure control.")
    tiles = [
        (64, 130, 616, 680, CORAL, "TYPE A", "The ascending aorta is involved. Neighbouring aortic root replacement is $10,000–$24,000 when the root is the honest product."),
        (664, 130, 1216, 680, TEAL, "TYPE B", "The descending aorta is involved without the ascending segment. Neighbouring aortic aneurysm surgery is $9,000–$22,000 when open or hybrid work is named."),
    ]
    title_f = font(BOLD, 24)
    body_f = font(SANS, 18)
    for x1, y1, x2, y2, accent, title, copy in tiles:
        rounded(d, (x1, y1, x2, y2), CARD, 24, outline=LINE, width=2)
        d.rounded_rectangle((x1, y1, x2, y1 + 110), radius=24, fill=accent)
        d.rectangle((x1, y1 + 78, x2, y1 + 110), fill=accent)
        center_text(d, ((x1 + x2) / 2, y1 + 55), title, title_f, WHITE)
        cx = (x1 + x2) / 2
        aorta_arch(d, cx, 300, accent, 16)
        if title == "TYPE A":
            d.ellipse((cx - 22, 286, cx + 10, 318), outline=GOLD, width=5)
        else:
            d.line((cx + 70, 330, cx + 70, 430), fill=GOLD, width=8)
        wrap_center(d, cx, 490, copy, body_f, INK, x2 - x1 - 56)
    save(im, "aortic-dissection-types.webp")


def make_lumen():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(d, "A TEAR CREATES A FALSE LUMEN", "Blood enters the wall. CTA names the tear, the true channel and any malperfusion.")
    tiles = [
        (48, 130, 424, 680, TEAL, "TRUE LUMEN", "The original channel that should feed the brain, heart, kidneys and limbs."),
        (452, 130, 828, 680, CORAL, "INTIMAL TEAR", "An inner-layer tear lets blood split the wall. Sudden chest or back pain is a local emergency."),
        (856, 130, 1232, 680, PURPLE, "FALSE LUMEN", "The new channel can enlarge, obstruct branches or rupture. Lifelong imaging still follows repair."),
    ]
    title_f = font(BOLD, 20)
    body_f = font(SANS, 17)
    for x1, y1, x2, y2, accent, title, copy in tiles:
        rounded(d, (x1, y1, x2, y2), CARD, 24, outline=LINE, width=2)
        d.rounded_rectangle((x1, y1, x2, y1 + 110), radius=24, fill=accent)
        d.rectangle((x1, y1 + 78, x2, y1 + 110), fill=accent)
        center_text(d, ((x1 + x2) / 2, y1 + 55), title, title_f, WHITE)
        cx = (x1 + x2) / 2
        d.ellipse((cx - 70, 250, cx + 70, 390), outline=accent, width=10)
        d.ellipse((cx - 36, 284, cx + 36, 356), fill=accent if title != "FALSE LUMEN" else (232, 210, 214))
        if title == "INTIMAL TEAR":
            d.line((cx - 20, 290, cx + 28, 350), fill=GOLD, width=6)
        wrap_center(d, cx, 450, copy, body_f, INK, x2 - x1 - 40)
    save(im, "aortic-dissection-lumen.webp")


def make_pathways():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(d, "OPEN REPAIR, TEVAR OR MEDICAL CONTROL", "TEVAR has no live GAF sheet. TAVR is an aortic-valve product, not a dissection stent.")
    tiles = [
        (48, 130, 424, 680, CORAL, "OPEN TYPE A", "Graft replacement of the damaged aorta. Neighbouring aortic root replacement is $10,000–$24,000."),
        (452, 130, 828, 680, TEAL, "TEVAR", "A groin stent-graft for selected complicated Type B anatomy. Quoted after CTA. No live GAF TEVAR sheet."),
        (856, 130, 1232, 680, PURPLE, "MEDICAL TYPE B", "Uncomplicated Type B starts with heart-rate and blood-pressure control plus serial imaging."),
    ]
    title_f = font(BOLD, 20)
    body_f = font(SANS, 17)
    for x1, y1, x2, y2, accent, title, copy in tiles:
        rounded(d, (x1, y1, x2, y2), CARD, 24, outline=LINE, width=2)
        d.rounded_rectangle((x1, y1, x2, y1 + 110), radius=24, fill=accent)
        d.rectangle((x1, y1 + 78, x2, y1 + 110), fill=accent)
        center_text(d, ((x1 + x2) / 2, y1 + 55), title, title_f, WHITE)
        cx = (x1 + x2) / 2
        if title == "TEVAR":
            d.rounded_rectangle((cx - 16, 250, cx + 16, 420), radius=8, fill=(232, 210, 214))
            d.rounded_rectangle((cx - 28, 270, cx + 28, 330), radius=10, fill=accent)
        else:
            aorta_arch(d, cx, 300, accent, 14)
        wrap_center(d, cx, 460, copy, body_f, INK, x2 - x1 - 40)
    save(im, "aortic-dissection-pathways.webp")


def make_steps():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(d, "AORTIC DISSECTION JOURNEY", "There is no dissection-only GAF sheet. Neighbouring aneurysm surgery is $9,000–$22,000.")
    steps = [
        ("1", "CTA", "Tear, true lumen and branch flow"),
        ("2", "STABILISE", "Heart-rate and blood-pressure control"),
        ("3", "TEAM", "Open, TEVAR or medical is named"),
        ("4", "REPAIR", "Graft, stent-graft or hybrid work"),
        ("5", "ICU", "Brain, kidney, limb and bleed watch"),
        ("6", "SURVEIL", "Lifelong imaging of residual aorta"),
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
        "Neighbouring aortic root replacement is $10,000–$24,000 when Bentall or valve-sparing root work is named.",
        font(SANS, 16),
        MUTED,
    )
    save(im, "aortic-dissection-steps.webp")


if __name__ == "__main__":
    make_hero()
    make_types()
    make_lumen()
    make_pathways()
    make_steps()
