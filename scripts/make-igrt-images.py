#!/usr/bin/env python3
"""Unlabeled 16:9 IGRT concept diagrams in the IMRT Canva palette."""

from pathlib import Path

from PIL import Image, ImageDraw

OUT = Path("public/uploads/treatments")
W, H = 1600, 900
TEAL = (13, 148, 136)
NAVY = (15, 40, 72)
CORAL = (232, 93, 117)
MINT = (204, 251, 241)
SKY = (186, 230, 253)
CREAM = (255, 255, 255)
SLATE = (100, 116, 139)
SOFT = (226, 232, 240)


def canvas():
    im = Image.new("RGB", (W, H), CREAM)
    return im, ImageDraw.Draw(im)


def dashed_circle(draw, cx, cy, r, color=TEAL, width=3, dash=14, gap=10):
    steps = 72
    for i in range(steps):
        if (i * (dash + gap) // steps) % 2 == 0:
            start = (i / steps) * 360
            end = ((i + 1) / steps) * 360
            draw.arc((cx - r, cy - r, cx + r, cy + r), start, end, fill=color, width=width)


def save(im, name):
    path = OUT / name
    im.save(path, "WEBP", quality=84, method=6)
    print("wrote", path, path.stat().st_size)


def hero():
    im, d = canvas()
    d.ellipse((-220, 620, 520, 1080), fill=(240, 253, 250))
    d.ellipse((1180, -180, 1760, 360), fill=(224, 242, 254))
    # Linac head
    d.rounded_rectangle((160, 250, 430, 430), 28, fill=(226, 232, 240), outline=NAVY, width=4)
    d.rounded_rectangle((210, 180, 380, 260), 18, fill=NAVY)
    d.ellipse((268, 430, 322, 484), fill=NAVY)
    d.rectangle((286, 480, 304, 620), fill=NAVY)
    d.ellipse((248, 600, 342, 694), fill=SOFT, outline=NAVY, width=4)
    # Imaging fan (pale)
    d.polygon([(380, 330), (1040, 210), (1040, 690)], fill=(186, 230, 253))
    # Treatment beam (narrower)
    d.polygon([(380, 340), (980, 390), (980, 510)], fill=(153, 246, 228))
    # Target isodose
    d.ellipse((900, 300, 1180, 580), fill=(167, 243, 208))
    d.ellipse((940, 340, 1140, 540), fill=(94, 234, 212))
    d.ellipse((990, 390, 1090, 490), fill=NAVY)
    # Nearby organs
    d.ellipse((1220, 240, 1340, 360), fill=SOFT)
    d.ellipse((1260, 520, 1400, 660), fill=(254, 205, 211))
    d.ellipse((1180, 620, 1280, 740), fill=(191, 219, 254))
    save(im, "ig-hero.webp")


def motion():
    im, d = canvas()
    centers = [(250, 450), (600, 450), (950, 450), (1300, 450)]
    for cx, cy in centers:
        dashed_circle(d, cx, cy, 168)

    # Lung + moving target
    d.ellipse((170, 340, 330, 560), outline=TEAL, width=5)
    d.ellipse((190, 370, 250, 470), fill=SKY)
    d.ellipse((250, 400, 310, 510), fill=SKY)
    d.ellipse((248, 430, 278, 460), fill=CORAL)
    d.ellipse((278, 400, 300, 422), fill=(251, 146, 160))

    # Prostate between bladder and rectum
    d.ellipse((540, 300, 660, 400), fill=SKY, outline=NAVY, width=3)
    d.ellipse((555, 430, 645, 500), fill=CORAL)
    d.ellipse((545, 520, 655, 600), fill=(254, 205, 211), outline=CORAL, width=3)

    # Liver / diaphragm
    d.pieslice((850, 340, 1050, 560), 200, 20, fill=(167, 243, 208), outline=TEAL, width=4)
    d.arc((820, 300, 1080, 400), 200, 340, fill=NAVY, width=6)
    d.ellipse((930, 430, 980, 480), fill=CORAL)

    # Head + mask
    d.ellipse((1220, 310, 1380, 500), outline=NAVY, width=5)
    d.ellipse((1240, 340, 1360, 470), fill=MINT)
    d.ellipse((1288, 400, 1328, 440), fill=CORAL)
    d.arc((1210, 320, 1390, 620), 20, 160, fill=SLATE, width=8)
    save(im, "ig-motion.webp")


def compare():
    im, d = canvas()
    xs = [280, 800, 1320]
    for cx in xs:
        dashed_circle(d, cx, 450, 200)

    # IMRT-style modulated beams
    for angle in range(0, 360, 30):
        import math

        rad = math.radians(angle)
        x2 = 280 + int(170 * math.cos(rad))
        y2 = 450 + int(170 * math.sin(rad))
        d.line((280, 450, x2, y2), fill=TEAL, width=8 if angle % 60 == 0 else 4)
        d.rectangle((x2 - 10, y2 - 16, x2 + 10, y2 + 16), fill=NAVY)
    d.ellipse((250, 420, 310, 480), fill=CORAL)

    # IGRT: CBCT ring + couch shift
    d.ellipse((680, 330, 920, 570), outline=TEAL, width=10)
    d.ellipse((720, 370, 880, 530), outline=SKY, width=6)
    d.rounded_rectangle((730, 560, 870, 600), 8, fill=NAVY)
    d.ellipse((780, 430, 820, 470), fill=CORAL)
    d.polygon([(800, 300), (780, 340), (820, 340)], fill=CORAL)

    # SBRT: few high-dose beams
    import math

    for angle in (40, 120, 200, 280):
        rad = math.radians(angle)
        x2 = 1320 + int(170 * math.cos(rad))
        y2 = 450 + int(170 * math.sin(rad))
        d.line((1320, 450, x2, y2), fill=TEAL, width=14)
        d.rectangle((x2 - 12, y2 - 18, x2 + 12, y2 + 18), fill=NAVY)
    d.ellipse((1290, 420, 1350, 480), fill=CORAL)
    save(im, "ig-compare.webp")


def steps():
    im, d = canvas()
    xs = [220, 600, 980, 1360]
    for i, cx in enumerate(xs):
        dashed_circle(d, cx, 450, 150)
        if i < 3:
            d.polygon([(cx + 168, 440), (cx + 198, 450), (cx + 168, 460)], fill=CORAL)

    # Records clipboard
    d.rounded_rectangle((160, 360, 280, 540), 16, fill=SOFT, outline=NAVY, width=4)
    d.rectangle((185, 390, 255, 400), fill=TEAL)
    d.rectangle((185, 420, 255, 430), fill=SLATE)
    d.rectangle((185, 450, 240, 460), fill=SLATE)
    d.ellipse((240, 500, 270, 530), outline=TEAL, width=4)

    # CT simulation
    d.ellipse((530, 360, 670, 500), outline=TEAL, width=12)
    d.rounded_rectangle((545, 500, 655, 545), 10, fill=NAVY)
    d.ellipse((575, 410, 625, 460), fill=CORAL)

    # Image match / overlay
    d.rounded_rectangle((900, 350, 1060, 550), 18, fill=NAVY)
    d.ellipse((930, 390, 1030, 490), fill=TEAL)
    d.ellipse((960, 420, 1000, 460), fill=CORAL)
    d.rectangle((920, 520, 1040, 532), fill=MINT)

    # Linac delivery
    d.rectangle((1290, 330, 1430, 390), fill=NAVY)
    d.polygon([(1360, 390), (1320, 470), (1400, 470)], fill=SKY)
    d.ellipse((1335, 500, 1385, 550), fill=CORAL)
    d.rounded_rectangle((1280, 560, 1440, 600), 10, fill=SOFT, outline=NAVY, width=3)
    save(im, "ig-steps.webp")


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    hero()
    motion()
    compare()
    steps()
