#!/usr/bin/env python3
"""Canva-style unlabeled 16:9 illustrations for breast cancer symptoms blog.

Matches the attached medical-infographic look: soft clinical blue/white,
relatable patient figure (composited from the approved style reference),
circular anatomical frames, peripheral symptom icon bubbles, red accents —
no embedded text labels.
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageEnhance

OUT = Path("public/uploads/articles")
REF = Path("/home/ubuntu/.cursor/projects/agent-repos-Gaf-healthcare/assets/23bc462a-c193-497e-b582-a3a30bf098e9.jpg")
W, H = 1600, 900

BG = (245, 250, 255)
SOFT_BLUE = (210, 230, 245)
SOFT_BLUE2 = (186, 220, 240)
NAVY = (30, 58, 95)
TEAL = (56, 140, 160)
CORAL = (220, 70, 80)
RED = (200, 45, 55)
PINK = (240, 170, 175)
FLESH = (235, 190, 175)
GOLD = (230, 180, 70)
WHITE = (255, 255, 255)
LINE = (160, 190, 210)


def canvas():
    im = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(im)
    d.ellipse((-120, -80, 520, 420), fill=SOFT_BLUE)
    d.ellipse((1080, 480, 1780, 1080), fill=(230, 242, 250))
    d.ellipse((700, -200, 1400, 280), fill=(236, 246, 255))
    return im, d


def save(im, name):
    OUT.mkdir(parents=True, exist_ok=True)
    path = OUT / name
    im.save(path, "WEBP", quality=82, method=6)
    print("wrote", path, path.stat().st_size)


def dashed_line(d, x1, y1, x2, y2, fill=LINE, width=3, dash=14):
    import math

    dx, dy = x2 - x1, y2 - y1
    length = math.hypot(dx, dy) or 1
    ux, uy = dx / length, dy / length
    t = 0.0
    draw = True
    while t < length:
        seg = min(dash, length - t)
        if draw:
            sx, sy = x1 + ux * t, y1 + uy * t
            ex, ey = x1 + ux * (t + seg), y1 + uy * (t + seg)
            d.line([(sx, sy), (ex, ey)], fill=fill, width=width)
        draw = not draw
        t += seg


def patient_cutout():
    """Crop the thoughtful woman + thought bubble from the style reference."""
    src = Image.open(REF).convert("RGBA")
    # Left portion with woman + bubble (approx)
    left = src.crop((20, 40, 520, 700)).resize((520, 700), Image.Resampling.LANCZOS)
    # Soft edge: build alpha mask that keeps subject, fades right edge into bg
    mask = Image.new("L", left.size, 0)
    md = ImageDraw.Draw(mask)
    md.ellipse((20, 20, 500, 680), fill=255)
    md.rectangle((40, 80, 360, 680), fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(18))
    left.putalpha(mask)
    return left


def paste_patient(base, ox=20, oy=120, scale=1.0):
    cut = patient_cutout()
    if scale != 1.0:
        nw, nh = int(cut.width * scale), int(cut.height * scale)
        cut = cut.resize((nw, nh), Image.Resampling.LANCZOS)
    base.paste(cut, (ox, oy), cut)
    return base


def icon_circle(d, cx, cy, r=54):
    d.ellipse((cx - r - 4, cy - r - 4, cx + r + 4, cy + r + 4), fill=SOFT_BLUE2)
    d.ellipse((cx - r, cy - r, cx + r, cy + r), fill=WHITE, outline=SOFT_BLUE2, width=3)


def breast_anatomy(d, cx, cy, radius=220, tumour=True, dimple=False, discharge=False, inflam=False):
    d.ellipse((cx - radius, cy - radius, cx + radius, cy + radius), outline=NAVY, width=8)
    fill = (255, 220, 220) if inflam else (255, 235, 230)
    d.ellipse((cx - radius + 22, cy - radius + 22, cx + radius - 22, cy + radius - 22), fill=fill)
    # Breast mound
    d.ellipse((cx - 130, cy - 100, cx + 130, cy + 150), fill=FLESH, outline=PINK, width=4)
    # Areola / nipple
    d.ellipse((cx - 36, cy + 10, cx + 36, cy + 82), fill=PINK, outline=(200, 120, 120), width=3)
    d.ellipse((cx - 12, cy + 30, cx + 12, cy + 58), fill=(190, 100, 110))
    if tumour:
        d.ellipse((cx - 70, cy - 40, cx - 20, cy + 10), fill=CORAL, outline=RED, width=3)
        # irregular bumps
        d.ellipse((cx - 55, cy - 50, cx - 35, cy - 30), fill=RED)
    if dimple:
        d.arc((cx + 20, cy - 70, cx + 100, cy + 10), 200, 340, fill=NAVY, width=6)
        d.line([(cx + 50, cy - 40), (cx + 70, cy - 10)], fill=NAVY, width=4)
    if discharge:
        d.ellipse((cx + 8, cy + 70, cx + 22, cy + 88), fill=CORAL)
        d.ellipse((cx - 6, cy + 78, cx + 8, cy + 96), fill=RED)
    if inflam:
        # peau d'orange dots
        for i in range(-3, 4):
            for j in range(-2, 3):
                px = cx + i * 22
                py = cy - 20 + j * 22
                if (px - cx) ** 2 + (py - cy) ** 2 < 10000:
                    d.ellipse((px - 3, py - 3, px + 3, py + 3), fill=(180, 80, 90))


def symptoms_hero():
    """Patient + central breast anatomy + 5 symptom icons (matches attachment layout)."""
    im, d = canvas()
    paste_patient(im, ox=10, oy=100, scale=1.05)
    d = ImageDraw.Draw(im)

    breast_anatomy(d, 820, 430, radius=230, tumour=True, dimple=True)

    icons = [
        (1180, 160, "lump"),
        (1360, 300, "dimple"),
        (1380, 480, "discharge"),
        (1280, 660, "pain"),
        (1060, 760, "armpit"),
    ]
    for cx, cy, kind in icons:
        dashed_line(d, 1000, 430, cx, cy)
        icon_circle(d, cx, cy, 58)
        if kind == "lump":
            d.ellipse((cx - 22, cy - 18, cx + 22, cy + 22), fill=CORAL, outline=RED, width=3)
            d.ellipse((cx - 10, cy - 28, cx + 6, cy - 12), fill=RED)
        elif kind == "dimple":
            d.ellipse((cx - 28, cy - 24, cx + 28, cy + 28), outline=NAVY, width=4)
            d.arc((cx - 16, cy - 10, cx + 16, cy + 20), 200, 340, fill=CORAL, width=5)
        elif kind == "discharge":
            d.ellipse((cx - 10, cy - 28, cx + 10, cy - 8), fill=PINK)
            d.ellipse((cx - 8, cy - 2, cx + 8, cy + 18), fill=CORAL)
            d.ellipse((cx + 6, cy + 8, cx + 20, cy + 26), fill=RED)
        elif kind == "pain":
            d.ellipse((cx - 26, cy - 30, cx + 26, cy + 30), outline=TEAL, width=4)
            d.ellipse((cx - 16, cy - 8, cx + 16, cy + 22), fill=(255, 180, 180))
            d.ellipse((cx - 8, cy, cx + 8, cy + 14), fill=CORAL)
        else:  # armpit / node
            d.ellipse((cx - 18, cy - 28, cx + 22, cy + 26), outline=TEAL, width=4)
            d.ellipse((cx - 6, cy - 6, cx + 18, cy + 18), fill=CORAL)

    save(im, "breast-cancer-symptoms-signs.webp")


def diagnosis_path():
    """Patient + imaging/biopsy pathway icons."""
    im, d = canvas()
    paste_patient(im, ox=30, oy=140, scale=0.95)
    d = ImageDraw.Draw(im)

    # Central circle with mammogram-style breast outline
    cx, cy, r = 860, 450, 240
    d.ellipse((cx - r, cy - r, cx + r, cy + r), outline=NAVY, width=8)
    d.ellipse((cx - r + 24, cy - r + 24, cx + r - 24, cy + r - 24), fill=SOFT_BLUE)
    d.ellipse((cx - 110, cy - 90, cx + 110, cy + 140), outline=TEAL, width=6)
    d.ellipse((cx - 30, cy + 20, cx + 30, cy + 80), fill=PINK)
    # Microcalcification / suspicious cluster
    for dx, dy in ((-40, -20), (-28, -10), (-35, 0), (50, -40), (60, -30)):
        d.ellipse((cx + dx - 4, cy + dy - 4, cx + dx + 4, cy + dy + 4), fill=CORAL)

    icons = [
        (1220, 180, "mammo"),
        (1380, 380, "us"),
        (1340, 600, "biopsy"),
        (1100, 760, "labs"),
    ]
    for ix, iy, kind in icons:
        dashed_line(d, 1050, 450, ix, iy)
        icon_circle(d, ix, iy, 56)
        if kind == "mammo":
            d.rounded_rectangle((ix - 24, iy - 28, ix + 24, iy + 28), 6, outline=NAVY, width=4)
            d.ellipse((ix - 12, iy - 10, ix + 12, iy + 16), fill=SOFT_BLUE2, outline=CORAL, width=3)
        elif kind == "us":
            d.ellipse((ix - 26, iy - 20, ix + 26, iy + 24), outline=TEAL, width=4)
            d.arc((ix - 18, iy - 12, ix + 18, iy + 16), 200, 340, fill=GOLD, width=5)
        elif kind == "biopsy":
            d.line([(ix - 20, iy + 20), (ix + 22, iy - 22)], fill=NAVY, width=5)
            d.polygon([(ix + 16, iy - 28), (ix + 30, iy - 14), (ix + 20, iy - 10)], fill=GOLD)
            d.ellipse((ix - 8, iy + 10, ix + 8, iy + 26), fill=CORAL)
        else:
            d.rounded_rectangle((ix - 22, iy - 16, ix + 22, iy + 16), 4, outline=NAVY, width=3)
            d.line([(ix - 14, iy - 4), (ix + 14, iy - 4)], fill=CORAL, width=3)
            d.line([(ix - 14, iy + 6), (ix + 8, iy + 6)], fill=TEAL, width=3)

    save(im, "breast-cancer-symptoms-diagnosis.webp")


def inflammatory():
    """Inflammatory / peau d'orange concept without lump."""
    im, d = canvas()
    paste_patient(im, ox=20, oy=120, scale=1.0)
    d = ImageDraw.Draw(im)

    breast_anatomy(d, 860, 440, radius=240, tumour=False, inflam=True)
    # Warmth / redness ring
    d.arc((860 - 160, 440 - 160, 860 + 160, 440 + 160), 200, 340, fill=CORAL, width=10)

    icons = [
        (1220, 180, "swell"),
        (1380, 360, "orange"),
        (1340, 560, "heat"),
        (1120, 740, "urgent"),
    ]
    for ix, iy, kind in icons:
        dashed_line(d, 1060, 440, ix, iy)
        icon_circle(d, ix, iy, 56)
        if kind == "swell":
            d.ellipse((ix - 24, iy - 20, ix + 24, iy + 28), fill=(255, 200, 200), outline=CORAL, width=4)
        elif kind == "orange":
            d.ellipse((ix - 24, iy - 24, ix + 24, iy + 24), fill=(255, 210, 180), outline=NAVY, width=3)
            for a in range(-2, 3):
                for b in range(-2, 3):
                    d.ellipse((ix + a * 8 - 2, iy + b * 8 - 2, ix + a * 8 + 2, iy + b * 8 + 2), fill=CORAL)
        elif kind == "heat":
            d.arc((ix - 10, iy - 28, ix + 20, iy + 10), 270, 90, fill=GOLD, width=4)
            d.arc((ix - 2, iy - 18, ix + 28, iy + 18), 270, 90, fill=CORAL, width=4)
            d.ellipse((ix - 16, iy + 8, ix + 8, iy + 32), fill=CORAL)
        else:
            d.polygon([(ix, iy - 28), (ix + 24, iy + 20), (ix - 24, iy + 20)], fill=GOLD, outline=NAVY)
            d.rectangle((ix - 4, iy - 10, ix + 4, iy + 6), fill=NAVY)
            d.ellipse((ix - 4, iy + 10, ix + 4, iy + 18), fill=NAVY)

    save(im, "breast-cancer-symptoms-inflammatory.webp")


def when_to_see():
    """When to see a doctor — breast change icons around decision circle."""
    im, d = canvas()
    paste_patient(im, ox=15, oy=130, scale=1.0)
    d = ImageDraw.Draw(im)

    breast_anatomy(d, 820, 430, radius=210, tumour=True, discharge=True, dimple=True)

    icons = [
        (1160, 150, "calendar"),
        (1360, 300, "doctor"),
        (1380, 500, "scan"),
        (1240, 700, "no_wait"),
    ]
    for ix, iy, kind in icons:
        dashed_line(d, 1000, 430, ix, iy)
        icon_circle(d, ix, iy, 56)
        if kind == "calendar":
            d.rounded_rectangle((ix - 22, iy - 24, ix + 22, iy + 24), 6, outline=NAVY, width=3)
            d.rectangle((ix - 22, iy - 24, ix + 22, iy - 10), fill=CORAL)
            d.ellipse((ix - 6, iy + 2, ix + 6, iy + 14), fill=GOLD)
        elif kind == "doctor":
            d.ellipse((ix - 14, iy - 30, ix + 14, iy - 4), fill=TEAL)
            d.rounded_rectangle((ix - 24, iy - 2, ix + 24, iy + 30), 12, fill=TEAL)
            d.line([(ix - 10, iy + 8), (ix + 10, iy + 8)], fill=WHITE, width=4)
            d.line([(ix, iy - 2), (ix, iy + 18)], fill=WHITE, width=4)
        elif kind == "scan":
            d.rounded_rectangle((ix - 24, iy - 28, ix + 24, iy + 28), 8, outline=NAVY, width=4)
            d.ellipse((ix - 12, iy - 10, ix + 12, iy + 14), fill=CORAL)
        else:
            d.ellipse((ix - 24, iy - 24, ix + 24, iy + 24), outline=CORAL, width=5)
            d.line([(ix - 12, iy - 12), (ix + 12, iy + 12)], fill=CORAL, width=5)
            d.line([(ix + 12, iy - 12), (ix - 12, iy + 12)], fill=CORAL, width=5)

    save(im, "breast-cancer-symptoms-when-to-see.webp")


if __name__ == "__main__":
    symptoms_hero()
    diagnosis_path()
    inflammatory()
    when_to_see()
