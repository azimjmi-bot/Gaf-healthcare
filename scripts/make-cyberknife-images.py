#!/usr/bin/env python3
"""Unlabeled 16:9 CyberKnife concept diagrams in the radiation Canva palette."""

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
    # Couch and torso
    d.rounded_rectangle((430, 620, 1170, 710), 24, fill=SOFT, outline=NAVY, width=5)
    d.ellipse((690, 250, 910, 470), outline=NAVY, width=6)
    d.rounded_rectangle((720, 440, 880, 640), 70, outline=NAVY, width=6)
    cx, cy = 800, 430
    # Robotic arm arc with LINAC head
    d.arc((430, 80, 1170, 780), 200, 340, fill=NAVY, width=16)
    for angle in range(210, 340, 16):
        rad = math.radians(angle)
        x2 = cx + int(340 * math.cos(rad))
        y2 = cy - int(250 * math.sin(rad - math.radians(90)))
        x2 = 800 + int(360 * math.cos(rad))
        y2 = 430 + int(280 * math.sin(rad))
        d.line((x2, y2, cx, cy), fill=TEAL if angle % 32 == 18 else SKY, width=6 if angle % 32 == 18 else 3)
        d.rectangle((x2 - 14, y2 - 18, x2 + 14, y2 + 18), fill=NAVY)
    d.rounded_rectangle((1040, 120, 1160, 210), 12, fill=NAVY)
    d.polygon([(1100, 210), (1070, 270), (1130, 270)], fill=TEAL)
    d.ellipse((cx - 62, cy - 42, cx + 62, cy + 42), fill=MINT)
    d.ellipse((cx - 24, cy - 20, cx + 24, cy + 20), fill=CORAL)
    save(im, "ck-hero.webp")


def indications():
    im, d = canvas()
    centers = [(250, 450), (600, 450), (950, 450), (1300, 450)]
    for cx, cy in centers:
        dashed_circle(d, cx, cy, 168)

    # Brain target
    d.ellipse((175, 330, 325, 530), outline=NAVY, width=5)
    d.ellipse((228, 400, 272, 444), fill=CORAL)

    # Spine vertebrae + lesion
    for i, y in enumerate((330, 400, 470, 540)):
        d.rounded_rectangle((568, y, 632, y + 52), 8, outline=NAVY, width=4)
        if i == 1:
            d.ellipse((578, y + 10, 622, y + 42), fill=CORAL)

    # Lung lobes
    d.ellipse((875, 330, 945, 530), outline=NAVY, width=5)
    d.ellipse((955, 330, 1025, 530), outline=NAVY, width=5)
    d.ellipse((928, 400, 968, 440), fill=CORAL)

    # Prostate / pelvic target
    d.ellipse((1220, 390, 1380, 540), outline=NAVY, width=5)
    d.ellipse((1270, 430, 1330, 490), fill=SKY)
    d.ellipse((1288, 448, 1312, 472), fill=CORAL)
    save(im, "ck-indications.webp")


def compare():
    im, d = canvas()
    xs = [280, 800, 1320]
    for cx in xs:
        dashed_circle(d, cx, 450, 200)

    # Robotic multi-angle beams
    for angle in (40, 90, 140, 210, 330):
        rad = math.radians(angle)
        x2 = 280 + int(160 * math.cos(rad))
        y2 = 450 - int(160 * math.sin(rad))
        d.line((280, 450, x2, y2), fill=TEAL, width=7)
        d.rectangle((x2 - 12, y2 - 16, x2 + 12, y2 + 16), fill=NAVY)
    d.ellipse((256, 426, 304, 474), fill=CORAL)
    d.arc((180, 250, 380, 430), 200, 340, fill=NAVY, width=10)

    # Conventional many thin daily fractions
    for i in range(9):
        x = 680 + i * 26
        d.line((x, 300, 800, 470), fill=SKY, width=3)
    d.ellipse((776, 446, 824, 494), fill=TEAL)
    d.rounded_rectangle((730, 520, 870, 600), 20, outline=NAVY, width=4)

    # Intracranial helmet / many fixed sources
    d.ellipse((1200, 280, 1440, 560), outline=NAVY, width=6)
    for angle in range(20, 340, 28):
        rad = math.radians(angle)
        x1 = 1320 + int(90 * math.cos(rad))
        y1 = 420 + int(110 * math.sin(rad))
        d.line((x1, y1, 1320, 420), fill=SKY, width=3)
    d.ellipse((1298, 398, 1342, 442), fill=CORAL)
    save(im, "ck-compare.webp")


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

    # Frameless mask / immobilization
    d.ellipse((540, 360, 660, 500), outline=NAVY, width=6)
    d.arc((545, 350, 655, 470), 200, 340, fill=TEAL, width=8)
    d.ellipse((580, 410, 620, 450), fill=CORAL)

    # Image guidance camera pair
    d.polygon([(910, 340), (1050, 340), (1020, 390), (940, 390)], fill=NAVY)
    d.ellipse((955, 430, 1005, 480), fill=CORAL)
    d.line((920, 390, 960, 450), fill=TEAL, width=4)
    d.line((1040, 390, 1000, 450), fill=TEAL, width=4)

    # Robotic delivery
    d.arc((1240, 320, 1480, 560), 200, 340, fill=NAVY, width=10)
    d.rounded_rectangle((1410, 330, 1470, 390), 8, fill=NAVY)
    for angle in (70, 110, 250, 290):
        rad = math.radians(angle)
        x2 = 1360 + int(70 * math.cos(rad))
        y2 = 470 + int(70 * math.sin(rad))
        d.line((1360, 470, x2, y2), fill=TEAL, width=5)
    d.ellipse((1340, 450, 1380, 490), fill=CORAL)
    d.rounded_rectangle((1280, 560, 1440, 600), 10, fill=SOFT, outline=NAVY, width=3)
    save(im, "ck-steps.webp")


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    hero()
    indications()
    compare()
    steps()
