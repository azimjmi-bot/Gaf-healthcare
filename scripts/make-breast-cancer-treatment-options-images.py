#!/usr/bin/env python3
"""Canva-style unlabeled WebPs for breast cancer treatment options blog."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter

OUT = Path("public/uploads/articles")
REF = Path("/home/ubuntu/.cursor/projects/agent-repos-Gaf-healthcare/assets/1c3a37fa-4306-4698-97ad-09118a1b40dd.jpg")
W, H = 1600, 900
BG, SOFT, SOFT2 = (245, 250, 255), (210, 230, 245), (186, 220, 240)
NAVY, TEAL, CORAL, RED = (30, 58, 95), (56, 140, 160), (220, 70, 80), (200, 45, 55)
PINK, FLESH, GOLD, WHITE, LINE = (240, 170, 175), (235, 190, 175), (230, 180, 70), (255, 255, 255), (160, 190, 210)


def canvas():
    im = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(im)
    d.ellipse((-120, -80, 520, 420), fill=SOFT)
    d.ellipse((1080, 480, 1780, 1080), fill=(230, 242, 250))
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
            d.line([(x1 + ux * t, y1 + uy * t), (x1 + ux * (t + seg), y1 + uy * (t + seg))], fill=LINE, width=3)
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
        left = left.resize((int(left.width * scale), int(left.height * scale)), Image.Resampling.LANCZOS)
    base.paste(left, (ox, oy), left)


def icon(d, cx, cy, r=54):
    d.ellipse((cx - r - 4, cy - r - 4, cx + r + 4, cy + r + 4), fill=SOFT2)
    d.ellipse((cx - r, cy - r, cx + r, cy + r), fill=WHITE, outline=SOFT2, width=3)


def breast(d, cx, cy, r=210, tumour=True):
    d.ellipse((cx - r, cy - r, cx + r, cy + r), outline=NAVY, width=8)
    d.ellipse((cx - r + 20, cy - r + 20, cx + r - 20, cy + r - 20), fill=(255, 235, 230))
    d.ellipse((cx - 120, cy - 90, cx + 120, cy + 140), fill=FLESH, outline=PINK, width=4)
    d.ellipse((cx - 32, cy + 12, cx + 32, cy + 76), fill=PINK)
    d.ellipse((cx - 10, cy + 32, cx + 10, cy + 54), fill=(190, 100, 110))
    if tumour:
        d.ellipse((cx - 70, cy - 40, cx - 20, cy + 10), fill=CORAL, outline=RED, width=3)


def modalities():
    im, d = canvas()
    paste_patient(im, 10, 100, 1.05)
    d = ImageDraw.Draw(im)
    breast(d, 780, 420, 210)
    icons = [
        (1160, 150, "surgery"),
        (1380, 280, "chemo"),
        (1420, 480, "rad"),
        (1280, 660, "hormone"),
        (1040, 760, "target"),
    ]
    for cx, cy, kind in icons:
        dashed(d, 960, 420, cx, cy)
        icon(d, cx, cy, 56)
        if kind == "surgery":
            d.line([(cx - 18, cy + 14), (cx + 18, cy - 14)], fill=NAVY, width=5)
            d.polygon([(cx + 14, cy - 22), (cx + 26, cy - 10), (cx + 16, cy - 6)], fill=GOLD)
        elif kind == "chemo":
            d.rounded_rectangle((cx - 14, cy - 28, cx + 14, cy + 8), 4, fill=SOFT2, outline=NAVY, width=2)
            d.ellipse((cx - 8, cy - 20, cx + 8, cy - 6), fill=CORAL)
            d.line([(cx, cy + 8), (cx, cy + 26)], fill=NAVY, width=3)
        elif kind == "rad":
            d.ellipse((cx - 20, cy - 20, cx + 20, cy + 20), outline=TEAL, width=4)
            for a in range(0, 360, 45):
                import math
                d.line([(cx, cy), (cx + 28 * math.cos(math.radians(a)), cy + 28 * math.sin(math.radians(a)))], fill=GOLD, width=2)
        elif kind == "hormone":
            d.ellipse((cx - 18, cy - 18, cx + 18, cy + 18), fill=GOLD, outline=NAVY, width=3)
            d.ellipse((cx - 8, cy - 8, cx + 8, cy + 8), fill=WHITE)
        else:
            d.polygon([(cx, cy - 22), (cx + 20, cy + 14), (cx - 20, cy + 14)], fill=CORAL)
    save(im, "breast-cancer-treatment-options-modalities.webp")


def surgery():
    im, d = canvas()
    d.rounded_rectangle((60, 80, 760, 820), 28, fill=WHITE, outline=SOFT2, width=4)
    d.rounded_rectangle((840, 80, 1540, 820), 28, fill=WHITE, outline=SOFT2, width=4)
    # lumpectomy: tumour removed, breast kept
    breast(d, 410, 380, 200, tumour=False)
    d.ellipse((360, 340, 400, 380), outline=CORAL, width=4)
    d.line([(370, 350), (390, 370)], fill=CORAL, width=4)
    d.line([(390, 350), (370, 370)], fill=CORAL, width=4)
    icon(d, 410, 700, 48)
    d.ellipse((398, 688, 422, 712), fill=GOLD)
    # mastectomy
    d.ellipse((1190 - 200, 380 - 200, 1190 + 200, 380 + 200), outline=NAVY, width=8)
    d.ellipse((1190 - 180, 380 - 180, 1190 + 180, 380 + 180), fill=(255, 235, 230))
    d.arc((1190 - 120, 380 - 40, 1190 + 120, 380 + 140), 200, 340, fill=PINK, width=8)
    icon(d, 1190, 700, 48)
    d.ellipse((1178, 688, 1202, 712), fill=CORAL)
    save(im, "breast-cancer-treatment-options-surgery.webp")


def systemic():
    im, d = canvas()
    paste_patient(im, 20, 130, 1.0)
    d = ImageDraw.Draw(im)
    breast(d, 780, 420, 200, tumour=True)
    # circulating arrows
    d.arc((780 - 160, 420 - 160, 780 + 160, 420 + 160), 200, 340, fill=CORAL, width=8)
    d.arc((780 - 120, 420 - 100, 780 + 120, 420 + 140), 20, 160, fill=GOLD, width=6)
    icons = [(1200, 180, "iv"), (1400, 360, "pill"), (1360, 580, "her2"), (1120, 740, "immuno")]
    for cx, cy, kind in icons:
        dashed(d, 960, 420, cx, cy)
        icon(d, cx, cy, 56)
        if kind == "iv":
            d.rounded_rectangle((cx - 12, cy - 28, cx + 12, cy + 4), 4, fill=SOFT2, outline=NAVY, width=2)
            d.ellipse((cx - 6, cy - 20, cx + 6, cy - 8), fill=CORAL)
            d.line([(cx, cy + 4), (cx, cy + 24)], fill=NAVY, width=3)
        elif kind == "pill":
            d.ellipse((cx - 22, cy - 12, cx + 22, cy + 12), fill=GOLD, outline=NAVY, width=2)
            d.chord((cx - 22, cy - 12, cx + 22, cy + 12), 90, 270, fill=WHITE)
        elif kind == "her2":
            d.polygon([(cx, cy - 20), (cx + 18, cy + 14), (cx - 18, cy + 14)], fill=CORAL)
        else:
            d.ellipse((cx - 20, cy - 20, cx + 20, cy + 20), outline=TEAL, width=4)
            d.ellipse((cx - 8, cy - 8, cx + 8, cy + 8), fill=GOLD)
    save(im, "breast-cancer-treatment-options-systemic.webp")


def by_stage():
    im, d = canvas()
    paste_patient(im, 15, 120, 1.0)
    d = ImageDraw.Draw(im)
    breast(d, 760, 420, 190, tumour=True)
    # stage pathway steps
    for i, cx in enumerate([1080, 1220, 1360, 1480]):
        cy = 220 + i * 120
        dashed(d, 920, 420, cx, cy)
        icon(d, cx, cy, 48)
        fill = [GOLD, TEAL, CORAL, RED][i]
        d.ellipse((cx - 14, cy - 14, cx + 14, cy + 14), fill=fill)
    save(im, "breast-cancer-treatment-options-by-stage.webp")


if __name__ == "__main__":
    modalities()
    surgery()
    systemic()
    by_stage()
