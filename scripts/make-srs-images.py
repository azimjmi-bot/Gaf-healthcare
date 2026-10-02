#!/usr/bin/env python3
"""Unlabeled 16:9 SRS concept diagrams in the IMRT/IGRT Canva palette."""

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
    d.ellipse((-200, 640, 480, 1100), fill=(240, 253, 250))
    d.ellipse((1200, -160, 1740, 340), fill=(224, 242, 254))
    cx, cy = 980, 450
    for angle in range(0, 360, 18):
        rad = math.radians(angle)
        x2 = cx + int(420 * math.cos(rad))
        y2 = cy + int(280 * math.sin(rad))
        d.line((x2, y2, cx, cy), fill=TEAL if angle % 36 == 0 else SKY, width=6 if angle % 36 == 0 else 3)
        d.rectangle((x2 - 10, y2 - 16, x2 + 10, y2 + 16), fill=NAVY)
    d.ellipse((cx - 90, cy - 90, cx + 90, cy + 90), fill=MINT)
    d.ellipse((cx - 50, cy - 50, cx + 50, cy + 50), fill=(94, 234, 212))
    d.ellipse((cx - 22, cy - 22, cx + 22, cy + 22), fill=CORAL)
    # Head outline, no incision
    d.ellipse((780, 230, 1180, 670), outline=NAVY, width=5)
    save(im, "sr-hero.webp")


def indications():
    im, d = canvas()
    centers = [(250, 450), (600, 450), (950, 450), (1300, 450)]
    for cx, cy in centers:
        dashed_circle(d, cx, cy, 168)

    # Brain metastasis: small round target
    d.ellipse((170, 330, 330, 570), outline=NAVY, width=5)
    d.ellipse((235, 410, 275, 450), fill=CORAL)
    d.ellipse((210, 500, 240, 530), fill=(251, 146, 160))

    # Meningioma / extra-axial
    d.ellipse((520, 330, 680, 570), outline=NAVY, width=5)
    d.pieslice((540, 350, 660, 500), 200, 10, fill=SKY, outline=TEAL, width=4)
    d.ellipse((575, 400, 625, 450), fill=CORAL)

    # Vestibular / CPA
    d.ellipse((870, 330, 1030, 570), outline=NAVY, width=5)
    d.ellipse((900, 400, 1000, 520), fill=MINT)
    d.ellipse((960, 430, 1000, 470), fill=CORAL)

    # AVM tangle
    d.ellipse((1220, 330, 1380, 570), outline=NAVY, width=5)
    for dx, dy in ((-20, -10), (10, 20), (25, -15), (-10, 25), (0, 0)):
        d.ellipse((1288 + dx, 430 + dy, 1328 + dx, 470 + dy), outline=CORAL, width=4)
    d.line((1240, 420, 1360, 480), fill=TEAL, width=4)
    d.line((1250, 490, 1350, 410), fill=TEAL, width=4)
    save(im, "sr-indications.webp")


def compare():
    im, d = canvas()
    xs = [280, 800, 1320]
    for cx in xs:
        dashed_circle(d, cx, 450, 200)

    # SRS: many thin beams, no skull cut
    for angle in range(0, 360, 20):
        rad = math.radians(angle)
        x2 = 280 + int(170 * math.cos(rad))
        y2 = 450 + int(170 * math.sin(rad))
        d.line((280, 450, x2, y2), fill=TEAL, width=4)
    d.ellipse((258, 428, 302, 472), fill=CORAL)
    d.ellipse((160, 300, 400, 600), outline=NAVY, width=4)

    # Open surgery: bone flap
    d.ellipse((680, 300, 920, 600), outline=NAVY, width=5)
    d.pieslice((700, 320, 900, 520), 220, 40, fill=SOFT, outline=CORAL, width=6)
    d.line((790, 360, 850, 430), fill=NAVY, width=5)
    d.ellipse((820, 440, 860, 480), fill=CORAL)

    # Whole-brain: broad wash
    d.ellipse((1180, 300, 1460, 600), fill=SKY, outline=NAVY, width=5)
    d.ellipse((1240, 360, 1400, 540), fill=(125, 211, 252))
    d.ellipse((1290, 420, 1350, 480), fill=CORAL)
    save(im, "sr-compare.webp")


def steps():
    im, d = canvas()
    xs = [220, 600, 980, 1360]
    for i, cx in enumerate(xs):
        dashed_circle(d, cx, 450, 150)
        if i < 3:
            d.polygon([(cx + 168, 440), (cx + 198, 450), (cx + 168, 460)], fill=CORAL)

    # MRI
    d.rounded_rectangle((150, 380, 290, 520), 20, fill=NAVY)
    d.ellipse((175, 400, 265, 490), fill=TEAL)
    d.ellipse((200, 425, 240, 465), fill=CORAL)

    # Mask / frame immobilization
    d.ellipse((530, 340, 670, 520), outline=NAVY, width=6)
    d.arc((520, 360, 680, 600), 20, 160, fill=TEAL, width=10)
    d.ellipse((580, 400, 620, 440), fill=CORAL)

    # Planning isodose
    d.rounded_rectangle((900, 350, 1060, 550), 18, fill=NAVY)
    d.ellipse((930, 380, 1030, 480), fill=MINT)
    d.ellipse((955, 405, 1005, 455), fill=CORAL)
    d.rectangle((920, 510, 1040, 524), fill=SKY)

    # Delivery gantry
    d.rectangle((1290, 330, 1430, 390), fill=NAVY)
    for angle in (70, 110, 250, 290):
        rad = math.radians(angle)
        x2 = 1360 + int(70 * math.cos(rad))
        y2 = 470 + int(70 * math.sin(rad))
        d.line((1360, 470, x2, y2), fill=TEAL, width=5)
    d.ellipse((1340, 450, 1380, 490), fill=CORAL)
    d.rounded_rectangle((1280, 560, 1440, 600), 10, fill=SOFT, outline=NAVY, width=3)
    save(im, "sr-steps.webp")


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    hero()
    indications()
    compare()
    steps()
