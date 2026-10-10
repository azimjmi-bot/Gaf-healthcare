#!/usr/bin/env python3
"""Unlabeled 16:9 SBRT concept diagrams in the radiation Canva palette."""

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
    # Torso silhouette
    d.ellipse((720, 160, 1080, 430), outline=NAVY, width=6)
    d.rounded_rectangle((760, 380, 1040, 780), 80, outline=NAVY, width=6)
    cx, cy = 900, 470
    for angle in range(20, 160, 14):
        rad = math.radians(angle)
        x2 = cx + int(380 * math.cos(rad))
        y2 = cy - int(260 * math.sin(rad))
        d.line((x2, y2, cx, cy), fill=TEAL if angle % 28 == 6 else SKY, width=6 if angle % 28 == 6 else 3)
        d.rectangle((x2 - 12, y2 - 16, x2 + 12, y2 + 16), fill=NAVY)
    d.ellipse((cx - 70, cy - 46, cx + 70, cy + 46), fill=MINT)
    d.ellipse((cx - 28, cy - 22, cx + 28, cy + 22), fill=CORAL)
    save(im, "sb-hero.webp")


def indications():
    im, d = canvas()
    centers = [(250, 450), (600, 450), (950, 450), (1300, 450)]
    for cx, cy in centers:
        dashed_circle(d, cx, cy, 168)

    # Lung: paired lobes + small target
    d.ellipse((175, 330, 245, 530), outline=NAVY, width=5)
    d.ellipse((255, 330, 325, 530), outline=NAVY, width=5)
    d.ellipse((228, 400, 268, 440), fill=CORAL)

    # Liver: large organ + deposit
    d.pieslice((520, 330, 680, 560), 200, 20, fill=MINT, outline=NAVY, width=5)
    d.ellipse((590, 400, 640, 450), fill=CORAL)

    # Prostate: pelvic target
    d.ellipse((870, 390, 1030, 540), outline=NAVY, width=5)
    d.ellipse((920, 430, 980, 490), fill=SKY)
    d.ellipse((938, 448, 962, 472), fill=CORAL)

    # Spine: stacked vertebrae + lesion
    for i, y in enumerate((330, 400, 470, 540)):
        d.rounded_rectangle((1268, y, 1332, y + 52), 8, outline=NAVY, width=4)
        if i == 1:
            d.ellipse((1278, y + 10, 1322, y + 42), fill=CORAL)
    save(im, "sb-indications.webp")


def compare():
    im, d = canvas()
    xs = [280, 800, 1320]
    for cx in xs:
        dashed_circle(d, cx, 450, 200)

    # SBRT: few high-dose beams
    for angle in (40, 90, 140):
        rad = math.radians(angle)
        x2 = 280 + int(160 * math.cos(rad))
        y2 = 450 - int(160 * math.sin(rad))
        d.line((280, 450, x2, y2), fill=TEAL, width=8)
        d.rectangle((x2 - 12, y2 - 16, x2 + 12, y2 + 16), fill=NAVY)
    d.ellipse((256, 426, 304, 474), fill=CORAL)
    d.rounded_rectangle((210, 520, 350, 600), 20, outline=NAVY, width=4)

    # Conventional: many thin daily fractions
    for i in range(9):
        x = 680 + i * 26
        d.line((x, 300, 800, 470), fill=SKY, width=3)
    d.ellipse((776, 446, 824, 494), fill=TEAL)
    d.rounded_rectangle((730, 520, 870, 600), 20, outline=NAVY, width=4)

    # Surgery: incision
    d.ellipse((1200, 300, 1440, 580), outline=NAVY, width=5)
    d.line((1320, 340, 1320, 540), fill=CORAL, width=7)
    d.ellipse((1298, 420, 1342, 464), fill=CORAL)
    save(im, "sb-compare.webp")


def steps():
    im, d = canvas()
    xs = [220, 600, 980, 1360]
    for i, cx in enumerate(xs):
        dashed_circle(d, cx, 450, 150)
        if i < 3:
            d.polygon([(cx + 168, 440), (cx + 198, 450), (cx + 168, 460)], fill=CORAL)

    # Planning CT
    d.rounded_rectangle((150, 380, 290, 520), 20, fill=NAVY)
    d.ellipse((175, 400, 265, 490), fill=TEAL)
    d.ellipse((200, 425, 240, 465), fill=CORAL)

    # Immobilization / body frame
    d.rounded_rectangle((520, 360, 680, 540), 18, outline=NAVY, width=6)
    d.ellipse((560, 400, 640, 500), fill=MINT)
    d.ellipse((580, 430, 620, 470), fill=CORAL)

    # Motion / breath arc
    d.arc((860, 340, 1100, 560), 200, 340, fill=TEAL, width=10)
    d.ellipse((955, 400, 1005, 450), fill=CORAL)
    d.line((980, 450, 980, 530), fill=NAVY, width=4)

    # Delivery gantry
    d.rectangle((1290, 330, 1430, 390), fill=NAVY)
    for angle in (70, 110, 250, 290):
        rad = math.radians(angle)
        x2 = 1360 + int(70 * math.cos(rad))
        y2 = 470 + int(70 * math.sin(rad))
        d.line((1360, 470, x2, y2), fill=TEAL, width=5)
    d.ellipse((1340, 450, 1380, 490), fill=CORAL)
    d.rounded_rectangle((1280, 560, 1440, 600), 10, fill=SOFT, outline=NAVY, width=3)
    save(im, "sb-steps.webp")


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    hero()
    indications()
    compare()
    steps()
