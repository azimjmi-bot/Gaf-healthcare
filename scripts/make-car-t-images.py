#!/usr/bin/env python3
"""Unlabeled 16:9 CAR-T therapy concept diagrams."""

from pathlib import Path
import math

from PIL import Image, ImageDraw

OUT = Path("public/uploads/treatments")
W, H = 1600, 900
TEAL = (13, 148, 136)
NAVY = (15, 40, 72)
CORAL = (232, 93, 117)
MINT = (204, 251, 241)
SKY = (186, 230, 253)
GOLD = (212, 168, 75)
CREAM = (255, 255, 255)
SOFT = (226, 232, 240)


def canvas():
    im = Image.new("RGB", (W, H), CREAM)
    return im, ImageDraw.Draw(im)


def dashed_circle(draw, cx, cy, r, color=TEAL, width=3):
    steps = 72
    for i in range(steps):
        if i % 2 == 0:
            start = (i / steps) * 360
            end = ((i + 1) / steps) * 360
            draw.arc((cx - r, cy - r, cx + r, cy + r), start, end, fill=color, width=width)


def t_cell(draw, cx, cy, r=54, outline=NAVY):
    draw.ellipse((cx - r, cy - r, cx + r, cy + r), outline=outline, width=6)
    draw.ellipse((cx - 14, cy - 14, cx + 14, cy + 14), fill=TEAL)


def receptor(draw, cx, cy, r=70):
    draw.polygon([(cx, cy - r - 28), (cx + 28, cy - r + 8), (cx - 28, cy - r + 8)], fill=GOLD)


def tumour(draw, cx, cy, r=86):
    draw.ellipse((cx - r, cy - r, cx + r, cy + r), outline=NAVY, width=6)
    draw.ellipse((cx - 22, cy - 22, cx + 22, cy + 22), fill=CORAL)


def save(im, name):
    path = OUT / name
    im.save(path, "WEBP", quality=84, method=6)
    print("wrote", path, path.stat().st_size)


def hero():
    im, d = canvas()
    d.ellipse((-200, 540, 420, 1100), fill=(240, 253, 250))
    d.ellipse((1220, -160, 1780, 380), fill=(224, 242, 254))
    t_cell(d, 520, 460, 90)
    receptor(d, 520, 460, 90)
    d.polygon([(680, 440), (780, 460), (680, 480)], fill=CORAL)
    tumour(d, 1080, 450, 110)
    d.line((980, 390, 1020, 420), fill=GOLD, width=8)
    d.line((980, 510, 1020, 480), fill=GOLD, width=8)
    save(im, "cart-hero.webp")


def steps():
    im, d = canvas()
    xs = [220, 600, 980, 1360]
    for i, cx in enumerate(xs):
        dashed_circle(d, cx, 450, 150)
        if i < 3:
            d.polygon([(cx + 168, 440), (cx + 198, 450), (cx + 168, 460)], fill=CORAL)

    # Leukapheresis bag
    d.rounded_rectangle((160, 360, 280, 540), 28, fill=NAVY)
    d.ellipse((175, 330, 265, 390), outline=TEAL, width=6)
    d.rectangle((200, 390, 240, 520), fill=CORAL)

    # Gene insert / flask
    d.polygon([(540, 360), (660, 360), (630, 540), (570, 540)], fill=MINT, outline=NAVY)
    t_cell(d, 600, 450, 28)
    receptor(d, 600, 450, 28)

    # Expansion cluster
    for dx, dy in ((-30, -20), (20, -30), (0, 20), (35, 15), (-25, 30)):
        t_cell(d, 980 + dx, 450 + dy, 22)

    # Infusion
    d.rounded_rectangle((1280, 420, 1460, 460), 8, fill=NAVY)
    d.polygon([(1460, 420), (1520, 440), (1460, 460)], fill=TEAL)
    d.ellipse((1240, 400, 1290, 480), outline=NAVY, width=6)
    save(im, "cart-steps.webp")


def monitor():
    im, d = canvas()
    dashed_circle(d, 800, 450, 280)
    t_cell(d, 800, 450, 70)
    receptor(d, 800, 450, 70)
    # Inflammatory rings
    for r, color in ((160, CORAL), (210, GOLD), (260, TEAL)):
        dashed_circle(d, 800, 450, r, color, 4)
    # Vital dots around
    for i in range(8):
        ang = math.radians(i * 45)
        x = 800 + int(300 * math.cos(ang))
        y = 450 + int(220 * math.sin(ang))
        d.ellipse((x - 16, y - 16, x + 16, y + 16), fill=SKY if i % 2 == 0 else CORAL)
    save(im, "cart-monitor.webp")


def compare():
    im, d = canvas()
    xs = [280, 800, 1320]
    for cx in xs:
        dashed_circle(d, cx, 450, 200)

    # CAR-T
    t_cell(d, 280, 450, 60)
    receptor(d, 280, 450, 60)

    # Chemotherapy droplets
    d.ellipse((740, 360, 860, 480), outline=NAVY, width=6)
    d.ellipse((780, 400, 820, 440), fill=CORAL)
    for dx, dy in ((-70, 80), (70, 80), (0, 120)):
        d.ellipse((800 + dx - 16, 400 + dy - 16, 800 + dx + 16, 400 + dy + 16), fill=SKY)

    # Transplant / marrow rescue
    d.rounded_rectangle((1220, 280, 1420, 620), 80, outline=NAVY, width=6)
    d.ellipse((1288, 400, 1352, 464), fill=TEAL)
    d.ellipse((1300, 500, 1340, 540), fill=CORAL)
    save(im, "cart-compare.webp")


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    hero()
    steps()
    monitor()
    compare()
