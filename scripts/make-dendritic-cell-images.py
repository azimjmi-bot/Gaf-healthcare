#!/usr/bin/env python3
"""Unlabeled 16:9 dendritic-cell therapy concept diagrams."""

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


def dendrite(draw, cx, cy, r=86, fill=TEAL, arms=7):
    draw.ellipse((cx - r * 0.42, cy - r * 0.42, cx + r * 0.42, cy + r * 0.42), fill=fill)
    for i in range(arms):
        ang = math.radians(i * (360 / arms) - 18)
        x2 = cx + int(r * math.cos(ang))
        y2 = cy + int(r * math.sin(ang))
        draw.line((cx, cy, x2, y2), fill=fill, width=8)
        draw.ellipse((x2 - 10, y2 - 10, x2 + 10, y2 + 10), fill=NAVY)


def t_cell(draw, cx, cy, r=54, outline=NAVY):
    draw.ellipse((cx - r, cy - r, cx + r, cy + r), outline=outline, width=6)
    draw.ellipse((cx - 14, cy - 14, cx + 14, cy + 14), fill=CORAL)


def save(im, name):
    path = OUT / name
    im.save(path, "WEBP", quality=84, method=6)
    print("wrote", path, path.stat().st_size)


def hero():
    im, d = canvas()
    d.ellipse((-200, 560, 420, 1100), fill=(240, 253, 250))
    d.ellipse((1220, -160, 1780, 380), fill=(224, 242, 254))
    # Antigen fragment
    d.rounded_rectangle((180, 390, 280, 510), 18, fill=GOLD)
    d.polygon([(280, 420), (340, 450), (280, 480)], fill=GOLD)
    # Dendritic cell receiving antigen
    dendrite(d, 620, 450, 120, TEAL, 8)
    # Presentation arrow
    d.polygon([(780, 440), (860, 450), (780, 460)], fill=CORAL)
    # T cell activated
    t_cell(d, 1040, 450, 78)
    # Downstream tumour cell being marked
    d.ellipse((1280, 360, 1480, 560), outline=NAVY, width=6)
    d.ellipse((1350, 430, 1410, 490), fill=CORAL)
    d.line((1118, 450, 1280, 450), fill=SOFT, width=8)
    save(im, "dct-hero.webp")


def steps():
    im, d = canvas()
    xs = [220, 600, 980, 1360]
    for i, cx in enumerate(xs):
        dashed_circle(d, cx, 450, 150)
        if i < 3:
            d.polygon([(cx + 168, 440), (cx + 198, 450), (cx + 168, 460)], fill=CORAL)

    # Blood / collection bag
    d.rounded_rectangle((160, 360, 280, 540), 28, fill=NAVY)
    d.ellipse((175, 330, 265, 390), outline=TEAL, width=6)
    d.rectangle((200, 390, 240, 520), fill=CORAL)

    # Laboratory flask
    d.polygon([(540, 360), (660, 360), (630, 540), (570, 540)], fill=MINT, outline=NAVY)
    d.ellipse((575, 430, 625, 480), fill=TEAL)
    dendrite(d, 600, 455, 28, TEAL, 5)

    # Quality / release
    d.rounded_rectangle((900, 360, 1060, 540), 16, outline=NAVY, width=6)
    d.line((930, 450, 980, 500), fill=TEAL, width=10)
    d.line((980, 500, 1040, 390), fill=TEAL, width=10)

    # Administration syringe / infusion
    d.rounded_rectangle((1280, 420, 1460, 460), 8, fill=NAVY)
    d.polygon([(1460, 420), (1520, 440), (1460, 460)], fill=TEAL)
    d.ellipse((1240, 400, 1290, 480), outline=NAVY, width=6)
    save(im, "dct-steps.webp")


def compare():
    im, d = canvas()
    xs = [280, 800, 1320]
    for cx in xs:
        dashed_circle(d, cx, 450, 200)

    # Dendritic-cell vaccine: cell presenting antigen
    dendrite(d, 280, 430, 90, TEAL, 7)
    t_cell(d, 360, 530, 36)

    # Chemotherapy: cytotoxic droplets on dividing cells
    d.ellipse((740, 360, 860, 480), outline=NAVY, width=6)
    d.ellipse((780, 400, 820, 440), fill=CORAL)
    for dx, dy in ((-70, 80), (70, 80), (0, 120)):
        d.ellipse((800 + dx - 16, 400 + dy - 16, 800 + dx + 16, 400 + dy + 16), fill=SKY)

    # CAR-T: engineered receptor on T cell
    t_cell(d, 1320, 450, 70)
    d.polygon([(1320, 340), (1360, 390), (1280, 390)], fill=GOLD)
    save(im, "dct-compare.webp")


def sites():
    im, d = canvas()
    centers = [(250, 450), (600, 450), (950, 450), (1300, 450)]
    for cx, cy in centers:
        dashed_circle(d, cx, cy, 168)

    # Prostate / pelvic
    d.ellipse((190, 400, 310, 520), outline=NAVY, width=5)
    d.ellipse((228, 438, 272, 482), fill=CORAL)

    # Pancreas / abdomen
    d.ellipse((520, 390, 680, 500), outline=NAVY, width=5)
    d.ellipse((575, 420, 625, 470), fill=CORAL)

    # Breast
    d.ellipse((880, 360, 1020, 540), outline=NAVY, width=5)
    d.ellipse((930, 430, 970, 470), fill=CORAL)

    # Brain
    d.ellipse((1225, 330, 1375, 530), outline=NAVY, width=5)
    d.ellipse((1280, 410, 1320, 454), fill=CORAL)
    save(im, "dct-sites.webp")


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    hero()
    steps()
    compare()
    sites()
