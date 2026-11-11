#!/usr/bin/env python3
"""Canva-style unlabeled WebPs for breast cancer diagnosis blog.

Patient crop from approved cost-style reference; light blue clinical background;
breast diagram + icon arcs; NO text labels on images.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter

OUT = Path("public/uploads/articles")
REF = Path(
    "/home/ubuntu/.cursor/projects/agent-repos-Gaf-healthcare/assets/"
    "57593030-dc29-47d1-9eff-ea2f85bf863e.jpg"
)
W, H = 1600, 900
BG, SOFT, SOFT2 = (245, 250, 255), (210, 230, 245), (186, 220, 240)
NAVY, TEAL, CORAL, RED = (30, 58, 95), (56, 140, 160), (220, 70, 80), (200, 45, 55)
PINK, FLESH, GOLD, WHITE, LINE = (
    (240, 170, 175),
    (235, 190, 175),
    (230, 180, 70),
    (255, 255, 255),
    (160, 190, 210),
)


def canvas():
    im = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(im)
    d.ellipse((-120, -80, 520, 420), fill=SOFT)
    d.ellipse((1080, 480, 1780, 1080), fill=(230, 242, 250))
    d.ellipse((700, -200, 1400, 280), fill=(236, 246, 255))
    return im, d


def save(im, name):
    OUT.mkdir(parents=True, exist_ok=True)
    p = OUT / name
    im.save(p, "WEBP", quality=82, method=6)
    print("wrote", p, p.stat().st_size)


def dashed(d, x1, y1, x2, y2):
    import math

    dx, dy = x2 - x1, y2 - y1
    L = math.hypot(dx, dy) or 1
    ux, uy, t, on = dx / L, dy / L, 0.0, True
    while t < L:
        seg = min(14, L - t)
        if on:
            d.line(
                [
                    (x1 + ux * t, y1 + uy * t),
                    (x1 + ux * (t + seg), y1 + uy * (t + seg)),
                ],
                fill=LINE,
                width=3,
            )
        on = not on
        t += seg


def paste_patient(base, ox=15, oy=120, scale=1.0):
    src = Image.open(REF).convert("RGBA")
    left = src.crop((20, 40, 520, 700)).resize((520, 700), Image.Resampling.LANCZOS)
    m = Image.new("L", left.size, 0)
    ImageDraw.Draw(m).ellipse((20, 20, 500, 680), fill=255)
    ImageDraw.Draw(m).rectangle((40, 80, 360, 680), fill=255)
    left.putalpha(m.filter(ImageFilter.GaussianBlur(18)))
    if scale != 1.0:
        left = left.resize(
            (int(left.width * scale), int(left.height * scale)),
            Image.Resampling.LANCZOS,
        )
    base.paste(left, (ox, oy), left)


def icon(d, cx, cy, r=54):
    d.ellipse((cx - r - 4, cy - r - 4, cx + r + 4, cy + r + 4), fill=SOFT2)
    d.ellipse((cx - r, cy - r, cx + r, cy + r), fill=WHITE, outline=SOFT2, width=3)


def breast(d, cx, cy, r=210, tumour=True, nodes=False):
    d.ellipse((cx - r, cy - r, cx + r, cy + r), outline=NAVY, width=8)
    d.ellipse(
        (cx - r + 20, cy - r + 20, cx + r - 20, cy + r - 20), fill=(255, 235, 230)
    )
    d.ellipse((cx - 120, cy - 90, cx + 120, cy + 140), fill=FLESH, outline=PINK, width=4)
    d.ellipse((cx - 32, cy + 12, cx + 32, cy + 76), fill=PINK)
    d.ellipse((cx - 10, cy + 32, cx + 10, cy + 54), fill=(190, 100, 110))
    if tumour:
        d.ellipse((cx - 70, cy - 40, cx - 20, cy + 10), fill=CORAL, outline=RED, width=3)
        d.ellipse((cx - 55, cy - 50, cx - 35, cy - 30), fill=RED)
    if nodes:
        d.ellipse((cx + 90, cy - 80, cx + 130, cy - 40), fill=CORAL, outline=RED, width=3)
        d.ellipse((cx + 110, cy - 30, cx + 140, cy), fill=GOLD)


def triple_assessment():
    """Clinical exam + imaging + pathology triad."""
    im, d = canvas()
    paste_patient(im, 10, 100, 1.05)
    d = ImageDraw.Draw(im)
    breast(d, 780, 420, 210)
    icons = [
        (1160, 160, "exam"),
        (1400, 340, "image"),
        (1360, 560, "path"),
        (1100, 740, "plan"),
    ]
    for cx, cy, kind in icons:
        dashed(d, 960, 420, cx, cy)
        icon(d, cx, cy, 56)
        if kind == "exam":
            d.ellipse((cx - 14, cy - 28, cx + 14, cy - 2), fill=TEAL)
            d.rounded_rectangle((cx - 22, cy, cx + 22, cy + 28), 10, fill=TEAL)
            d.line([(cx - 8, cy + 10), (cx + 8, cy + 10)], fill=WHITE, width=3)
        elif kind == "image":
            d.rounded_rectangle((cx - 22, cy - 26, cx + 22, cy + 26), 6, outline=NAVY, width=4)
            d.ellipse((cx - 12, cy - 10, cx + 12, cy + 14), fill=SOFT2, outline=CORAL, width=3)
        elif kind == "path":
            d.line([(cx - 18, cy + 18), (cx + 20, cy - 20)], fill=NAVY, width=5)
            d.polygon([(cx + 14, cy - 26), (cx + 28, cy - 12), (cx + 18, cy - 8)], fill=GOLD)
            d.ellipse((cx - 8, cy + 10, cx + 8, cy + 26), fill=CORAL)
        else:
            d.rounded_rectangle((cx - 20, cy - 16, cx + 20, cy + 16), 4, outline=NAVY, width=3)
            d.line([(cx - 12, cy - 4), (cx + 12, cy - 4)], fill=CORAL, width=3)
            d.line([(cx - 12, cy + 6), (cx + 6, cy + 6)], fill=TEAL, width=3)
    save(im, "breast-cancer-diagnosis-triple.webp")


def imaging_suite():
    """Mammography / ultrasound / MRI icon arc."""
    im, d = canvas()
    paste_patient(im, 20, 130, 1.0)
    d = ImageDraw.Draw(im)
    cx, cy, r = 760, 430, 200
    d.ellipse((cx - r, cy - r, cx + r, cy + r), outline=NAVY, width=8)
    d.ellipse((cx - r + 22, cy - r + 22, cx + r - 22, cy + r - 22), fill=SOFT)
    d.ellipse((cx - 100, cy - 80, cx + 100, cy + 120), outline=TEAL, width=6)
    d.ellipse((cx - 28, cy + 16, cx + 28, cy + 72), fill=PINK)
    for dx, dy in ((-40, -20), (-28, -10), (-35, 0), (50, -40), (60, -30), (45, -20)):
        d.ellipse((cx + dx - 4, cy + dy - 4, cx + dx + 4, cy + dy + 4), fill=CORAL)

    icons = [
        (1160, 160, "mammo"),
        (1400, 320, "us"),
        (1380, 520, "mri"),
        (1120, 720, "guide"),
    ]
    for ix, iy, kind in icons:
        dashed(d, 940, 430, ix, iy)
        icon(d, ix, iy, 56)
        if kind == "mammo":
            d.rounded_rectangle((ix - 24, iy - 28, ix + 24, iy + 28), 6, outline=NAVY, width=4)
            d.ellipse((ix - 12, iy - 10, ix + 12, iy + 16), fill=SOFT2, outline=CORAL, width=3)
        elif kind == "us":
            d.ellipse((ix - 26, iy - 20, ix + 26, iy + 24), outline=TEAL, width=4)
            d.arc((ix - 18, iy - 12, ix + 18, iy + 16), 200, 340, fill=GOLD, width=5)
        elif kind == "mri":
            d.ellipse((ix - 22, iy - 22, ix + 22, iy + 22), outline=NAVY, width=4)
            d.ellipse((ix - 10, iy - 10, ix + 10, iy + 10), fill=TEAL)
            d.arc((ix - 28, iy - 16, ix + 28, iy + 16), 20, 160, fill=CORAL, width=4)
        else:
            d.line([(ix - 16, iy + 18), (ix + 18, iy - 18)], fill=NAVY, width=4)
            d.ellipse((ix - 6, iy + 8, ix + 10, iy + 24), fill=GOLD)
    save(im, "breast-cancer-diagnosis-imaging.webp")


def biopsy_pathology():
    """Needle biopsy + lab / biomarker icons."""
    im, d = canvas()
    paste_patient(im, 15, 120, 1.0)
    d = ImageDraw.Draw(im)
    breast(d, 760, 420, 200, tumour=True)
    # needle trajectory toward tumour
    d.line([(920, 280), (720, 400)], fill=NAVY, width=5)
    d.polygon([(920, 268), (940, 290), (910, 292)], fill=GOLD)

    icons = [
        (1180, 160, "needle"),
        (1400, 340, "core"),
        (1360, 540, "slide"),
        (1100, 720, "ihc"),
    ]
    for ix, iy, kind in icons:
        dashed(d, 940, 420, ix, iy)
        icon(d, ix, iy, 56)
        if kind == "needle":
            d.line([(ix - 20, iy + 20), (ix + 22, iy - 22)], fill=NAVY, width=5)
            d.polygon([(ix + 16, iy - 28), (ix + 30, iy - 14), (ix + 20, iy - 10)], fill=GOLD)
        elif kind == "core":
            d.rounded_rectangle((ix - 8, iy - 24, ix + 8, iy + 24), 4, fill=CORAL, outline=NAVY, width=2)
            d.ellipse((ix - 14, iy + 16, ix + 14, iy + 30), fill=SOFT2)
        elif kind == "slide":
            d.rounded_rectangle((ix - 20, iy - 26, ix + 20, iy + 26), 4, outline=NAVY, width=3)
            d.ellipse((ix - 10, iy - 8, ix + 10, iy + 12), fill=CORAL)
        else:
            d.rounded_rectangle((ix - 22, iy - 16, ix + 22, iy + 16), 4, outline=NAVY, width=3)
            d.line([(ix - 14, iy - 4), (ix + 14, iy - 4)], fill=CORAL, width=3)
            d.line([(ix - 14, iy + 6), (ix + 8, iy + 6)], fill=TEAL, width=3)
            d.ellipse((ix + 10, iy + 2, ix + 18, iy + 10), fill=GOLD)
    save(im, "breast-cancer-diagnosis-biopsy.webp")


def staging_map():
    """TNM / staging concept with node and distant icons."""
    im, d = canvas()
    paste_patient(im, 10, 110, 1.05)
    d = ImageDraw.Draw(im)
    breast(d, 760, 400, 190, tumour=True, nodes=True)

    icons = [
        (1160, 150, "t"),
        (1400, 300, "n"),
        (1380, 500, "m"),
        (1120, 700, "board"),
    ]
    for ix, iy, kind in icons:
        dashed(d, 930, 400, ix, iy)
        icon(d, ix, iy, 56)
        if kind == "t":
            d.ellipse((ix - 18, iy - 18, ix + 18, iy + 18), fill=CORAL, outline=RED, width=3)
        elif kind == "n":
            d.ellipse((ix - 10, iy - 22, ix + 14, iy + 2), fill=GOLD)
            d.ellipse((ix - 18, iy, ix + 6, iy + 24), fill=CORAL)
        elif kind == "m":
            d.ellipse((ix - 22, iy - 10, ix - 4, iy + 8), fill=TEAL)
            d.ellipse((ix - 2, iy - 18, ix + 16, iy), fill=CORAL)
            d.ellipse((ix + 4, iy + 4, ix + 22, iy + 22), fill=GOLD)
        else:
            d.rounded_rectangle((ix - 22, iy - 18, ix + 22, iy + 18), 6, outline=NAVY, width=3)
            for dy in (-6, 2, 10):
                d.line([(ix - 12, iy + dy), (ix + 12, iy + dy)], fill=TEAL, width=3)
    save(im, "breast-cancer-diagnosis-staging.webp")


if __name__ == "__main__":
    triple_assessment()
    imaging_suite()
    biopsy_pathology()
    staging_map()
