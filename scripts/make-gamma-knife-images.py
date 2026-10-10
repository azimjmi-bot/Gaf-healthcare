#!/usr/bin/env python3
"""Unlabeled 16:9 Gamma Knife concept diagrams in the radiation Canva palette."""

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
    # Couch
    d.rounded_rectangle((520, 640, 1080, 720), 24, fill=SOFT, outline=NAVY, width=5)
    # Helmet / collimator dome
    d.ellipse((560, 120, 1040, 600), outline=NAVY, width=8)
    d.arc((580, 90, 1020, 430), 200, 340, fill=NAVY, width=18)
    cx, cy = 800, 360
    for angle in range(0, 360, 18):
        rad = math.radians(angle)
        x1 = cx + int(210 * math.cos(rad))
        y1 = cy + int(210 * math.sin(rad))
        d.line((x1, y1, cx, cy), fill=TEAL if angle % 36 == 0 else SKY, width=5 if angle % 36 == 0 else 2)
        d.ellipse((x1 - 10, y1 - 10, x1 + 10, y1 + 10), fill=NAVY)
    d.ellipse((cx - 48, cy - 36, cx + 48, cy + 36), fill=MINT)
    d.ellipse((cx - 18, cy - 16, cx + 18, cy + 16), fill=CORAL)
    # Neck / shoulders
    d.rounded_rectangle((740, 500, 860, 650), 40, outline=NAVY, width=5)
    save(im, "gk-hero.webp")


def indications():
    im, d = canvas()
    centers = [(250, 450), (600, 450), (950, 450), (1300, 450)]
    for cx, cy in centers:
        dashed_circle(d, cx, cy, 168)

    # Brain metastasis
    d.ellipse((175, 330, 325, 530), outline=NAVY, width=5)
    d.ellipse((228, 400, 272, 444), fill=CORAL)

    # Extra-axial meningioma along the rim
    d.ellipse((525, 330, 675, 530), outline=NAVY, width=5)
    d.pieslice((525, 330, 675, 530), 300, 40, fill=MINT, outline=NAVY, width=4)
    d.ellipse((610, 350, 650, 390), fill=CORAL)

    # AVM tangle
    d.ellipse((875, 330, 1025, 530), outline=NAVY, width=5)
    d.arc((900, 370, 1000, 470), 20, 220, fill=TEAL, width=6)
    d.arc((910, 390, 990, 490), 200, 40, fill=NAVY, width=5)
    d.ellipse((938, 418, 962, 442), fill=CORAL)

    # Trigeminal / nerve path
    d.ellipse((1225, 330, 1375, 530), outline=NAVY, width=5)
    d.line((1250, 450, 1350, 390), fill=NAVY, width=6)
    d.line((1250, 450, 1350, 510), fill=NAVY, width=6)
    d.ellipse((1238, 432, 1262, 468), fill=CORAL)
    save(im, "gk-indications.webp")


def compare():
    im, d = canvas()
    xs = [280, 800, 1320]
    for cx in xs:
        dashed_circle(d, cx, 450, 200)

    # Gamma Knife helmet beams
    d.ellipse((160, 280, 400, 560), outline=NAVY, width=6)
    for angle in range(20, 340, 28):
        rad = math.radians(angle)
        x1 = 280 + int(90 * math.cos(rad))
        y1 = 420 + int(110 * math.sin(rad))
        d.line((x1, y1, 280, 420), fill=SKY, width=3)
    d.ellipse((258, 398, 302, 442), fill=CORAL)

    # Open craniotomy
    d.ellipse((680, 300, 920, 580), outline=NAVY, width=5)
    d.arc((700, 300, 900, 500), 200, 340, fill=CORAL, width=8)
    d.line((800, 340, 800, 540), fill=CORAL, width=6)
    d.ellipse((778, 420, 822, 464), fill=CORAL)

    # Robotic multi-angle
    for angle in (40, 90, 140, 210, 330):
        rad = math.radians(angle)
        x2 = 1320 + int(150 * math.cos(rad))
        y2 = 450 - int(150 * math.sin(rad))
        d.line((1320, 450, x2, y2), fill=TEAL, width=6)
        d.rectangle((x2 - 12, y2 - 16, x2 + 12, y2 + 16), fill=NAVY)
    d.ellipse((1296, 426, 1344, 474), fill=CORAL)
    d.arc((1220, 250, 1420, 430), 200, 340, fill=NAVY, width=10)
    save(im, "gk-compare.webp")


def steps():
    im, d = canvas()
    xs = [220, 600, 980, 1360]
    for i, cx in enumerate(xs):
        dashed_circle(d, cx, 450, 150)
        if i < 3:
            d.polygon([(cx + 168, 440), (cx + 198, 450), (cx + 168, 460)], fill=CORAL)

    # MRI / planning
    d.rounded_rectangle((150, 380, 290, 520), 20, fill=NAVY)
    d.ellipse((175, 400, 265, 490), fill=TEAL)
    d.ellipse((200, 425, 240, 465), fill=CORAL)

    # Frame or mask
    d.ellipse((540, 360, 660, 500), outline=NAVY, width=6)
    d.line((540, 390, 520, 340), fill=NAVY, width=5)
    d.line((660, 390, 680, 340), fill=NAVY, width=5)
    d.rectangle((512, 322, 528, 350), fill=TEAL)
    d.rectangle((672, 322, 688, 350), fill=TEAL)
    d.ellipse((580, 410, 620, 450), fill=CORAL)

    # Coordinate check
    d.ellipse((905, 360, 1055, 540), outline=NAVY, width=5)
    d.line((905, 450, 1055, 450), fill=SKY, width=3)
    d.line((980, 360, 980, 540), fill=SKY, width=3)
    d.ellipse((960, 430, 1000, 470), fill=CORAL)

    # Delivery helmet
    d.ellipse((1235, 320, 1485, 570), outline=NAVY, width=6)
    for angle in range(30, 330, 40):
        rad = math.radians(angle)
        x2 = 1360 + int(80 * math.cos(rad))
        y2 = 445 + int(80 * math.sin(rad))
        d.line((1360, 445, x2, y2), fill=TEAL, width=4)
    d.ellipse((1340, 425, 1380, 465), fill=CORAL)
    d.rounded_rectangle((1280, 560, 1440, 600), 10, fill=SOFT, outline=NAVY, width=3)
    save(im, "gk-steps.webp")


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    hero()
    indications()
    compare()
    steps()
