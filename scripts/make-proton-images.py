#!/usr/bin/env python3
"""Unlabeled 16:9 proton-therapy concept diagrams in the radiation Canva palette."""

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


def save(im, name):
    path = OUT / name
    im.save(path, "WEBP", quality=84, method=6)
    print("wrote", path, path.stat().st_size)


def hero():
    im, d = canvas()
    d.ellipse((-220, 620, 460, 1120), fill=(240, 253, 250))
    d.ellipse((1180, -180, 1760, 360), fill=(224, 242, 254))
    # Torso
    d.ellipse((860, 180, 1180, 430), outline=NAVY, width=6)
    d.rounded_rectangle((900, 400, 1140, 760), 80, outline=NAVY, width=6)
    # Proton beam from left, stopping at target
    d.rounded_rectangle((80, 400, 220, 500), 16, fill=NAVY)
    d.polygon([(220, 420), (280, 450), (220, 480)], fill=TEAL)
    d.rectangle((280, 438, 980, 462), fill=TEAL)
    # Bragg peak flare at target, no exit beam
    d.ellipse((930, 400, 1070, 500), fill=MINT)
    d.ellipse((980, 430, 1020, 470), fill=CORAL)
    # Faint photon-style ghost continuing past would be wrong — leave empty beyond target
    d.line((1070, 450, 1180, 450), fill=SOFT, width=4)
    save(im, "pb-hero.webp")


def sites():
    im, d = canvas()
    centers = [(250, 450), (600, 450), (950, 450), (1300, 450)]
    for cx, cy in centers:
        dashed_circle(d, cx, cy, 168)

    # Brain
    d.ellipse((175, 330, 325, 530), outline=NAVY, width=5)
    d.ellipse((228, 400, 272, 444), fill=CORAL)

    # Spine near cord
    for i, y in enumerate((330, 400, 470, 540)):
        d.rounded_rectangle((568, y, 632, y + 52), 8, outline=NAVY, width=4)
        if i == 1:
            d.ellipse((578, y + 10, 622, y + 42), fill=CORAL)
    d.line((546, 340, 546, 560), fill=SKY, width=6)

    # Paediatric smaller silhouette
    d.ellipse((905, 310, 995, 400), outline=NAVY, width=5)
    d.rounded_rectangle((915, 390, 985, 540), 40, outline=NAVY, width=5)
    d.ellipse((938, 430, 962, 454), fill=CORAL)

    # Skull-base / confined anatomy
    d.ellipse((1225, 330, 1375, 500), outline=NAVY, width=5)
    d.arc((1240, 430, 1360, 560), 200, 340, fill=NAVY, width=6)
    d.ellipse((1288, 448, 1312, 472), fill=CORAL)
    save(im, "pb-sites.webp")


def compare():
    im, d = canvas()
    xs = [280, 800, 1320]
    for cx in xs:
        dashed_circle(d, cx, 450, 200)

    # Proton: beam stops
    d.rounded_rectangle((120, 420, 170, 480), 8, fill=NAVY)
    d.rectangle((170, 438, 300, 462), fill=TEAL)
    d.ellipse((268, 426, 316, 474), fill=CORAL)
    # empty beyond

    # Photon: continues through
    d.rounded_rectangle((640, 300, 690, 360), 8, fill=NAVY)
    d.line((690, 330, 800, 450), fill=SKY, width=10)
    d.line((800, 450, 930, 600), fill=SKY, width=6)
    d.ellipse((776, 426, 824, 474), fill=TEAL)

    # IMRT wrap
    for angle in (40, 90, 140, 220, 320):
        rad = math.radians(angle)
        x2 = 1320 + int(150 * math.cos(rad))
        y2 = 450 - int(150 * math.sin(rad))
        d.line((1320, 450, x2, y2), fill=TEAL if angle % 80 == 40 else SKY, width=6)
    d.ellipse((1296, 426, 1344, 474), fill=CORAL)
    save(im, "pb-compare.webp")


def steps():
    im, d = canvas()
    xs = [220, 600, 980, 1360]
    for i, cx in enumerate(xs):
        dashed_circle(d, cx, 450, 150)
        if i < 3:
            d.polygon([(cx + 168, 440), (cx + 198, 450), (cx + 168, 460)], fill=CORAL)

    # Simulation CT
    d.rounded_rectangle((150, 380, 290, 520), 20, fill=NAVY)
    d.ellipse((175, 400, 265, 490), fill=TEAL)
    d.ellipse((200, 425, 240, 465), fill=CORAL)

    # Mask / immobilisation
    d.ellipse((540, 360, 660, 500), outline=NAVY, width=6)
    d.arc((545, 350, 655, 470), 200, 340, fill=TEAL, width=8)
    d.ellipse((580, 410, 620, 450), fill=CORAL)

    # Bragg plan curve
    pts = []
    for i in range(12):
        x = 900 + i * 14
        y = 520 - int(20 + (i**1.6) * 3.2)
        pts.append((x, y))
    d.line(pts, fill=TEAL, width=6)
    last = pts[-1]
    d.ellipse((last[0] - 16, last[1] - 16, last[0] + 16, last[1] + 16), fill=CORAL)

    # Gantry delivery
    d.arc((1240, 320, 1480, 560), 200, 340, fill=NAVY, width=10)
    d.rounded_rectangle((1410, 330, 1470, 390), 8, fill=NAVY)
    d.line((1440, 390, 1360, 470), fill=TEAL, width=8)
    d.ellipse((1340, 450, 1380, 490), fill=CORAL)
    d.rounded_rectangle((1280, 560, 1440, 600), 10, fill=SOFT, outline=NAVY, width=3)
    save(im, "pb-steps.webp")


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    hero()
    sites()
    compare()
    steps()
