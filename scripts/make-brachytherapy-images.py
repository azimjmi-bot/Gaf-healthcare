#!/usr/bin/env python3
"""Unlabeled 16:9 brachytherapy concept diagrams in the radiation Canva palette."""

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
    # Pelvis / torso outline
    d.ellipse((860, 160, 1180, 420), outline=NAVY, width=6)
    d.rounded_rectangle((880, 380, 1160, 760), 90, outline=NAVY, width=6)
    # Internal source with tight dose cloud — no distant exit beam
    d.ellipse((930, 470, 1110, 650), fill=MINT)
    d.ellipse((970, 510, 1070, 610), fill=SKY)
    d.ellipse((1005, 545, 1035, 575), fill=CORAL)
    # Thin fall-off rings, unlabeled
    d.ellipse((900, 440, 1140, 680), outline=TEAL, width=3)
    save(im, "bt-hero.webp")


def types():
    im, d = canvas()
    centers = [(220, 450), (600, 450), (980, 450), (1360, 450)]
    for cx, cy in centers:
        dashed_circle(d, cx, cy, 160)

    # HDR: short pulse into applicator
    d.rounded_rectangle((150, 400, 200, 500), 10, fill=NAVY)
    d.line((200, 450, 250, 450), fill=TEAL, width=8)
    d.ellipse((240, 430, 280, 470), fill=CORAL)

    # LDR / permanent seeds
    for dx, dy in ((-30, -20), (10, -36), (28, 8), (-8, 28), (18, 36), (-36, 16)):
        d.rounded_rectangle((600 + dx - 8, 450 + dy - 4, 600 + dx + 8, 450 + dy + 4), 3, fill=CORAL)

    # Intracavitary applicator in a cavity
    d.ellipse((900, 360, 1060, 540), outline=NAVY, width=5)
    d.rounded_rectangle((968, 390, 992, 530), 6, fill=TEAL)
    d.ellipse((972, 500, 988, 516), fill=CORAL)

    # Interstitial needles
    for i, x in enumerate((1310, 1340, 1370, 1400)):
        d.line((x, 360, x, 540), fill=NAVY, width=5)
        d.ellipse((x - 8, 500 - i * 8, x + 8, 516 - i * 8), fill=CORAL)
    save(im, "bt-types.webp")


def sites():
    im, d = canvas()
    centers = [(250, 450), (600, 450), (950, 450), (1300, 450)]
    for cx, cy in centers:
        dashed_circle(d, cx, cy, 168)

    # Cervix / pelvic cavity
    d.ellipse((175, 360, 325, 540), outline=NAVY, width=5)
    d.rounded_rectangle((236, 400, 264, 510), 8, fill=TEAL)
    d.ellipse((240, 490, 260, 510), fill=CORAL)

    # Prostate
    d.ellipse((545, 400, 655, 510), outline=NAVY, width=5)
    for dx, dy in ((-16, -8), (12, -14), (8, 16), (-10, 18), (0, 0)):
        d.ellipse((598 + dx, 448 + dy, 610 + dx, 460 + dy), fill=CORAL)

    # Breast cavity after lumpectomy
    d.ellipse((875, 330, 1025, 560), outline=NAVY, width=5)
    d.ellipse((920, 410, 980, 470), fill=MINT, outline=TEAL, width=3)
    d.ellipse((942, 432, 958, 448), fill=CORAL)

    # Eye plaque
    d.ellipse((1225, 360, 1375, 510), outline=NAVY, width=5)
    d.ellipse((1270, 400, 1330, 460), fill=SKY)
    d.arc((1285, 455, 1365, 535), 200, 340, fill=CORAL, width=10)
    save(im, "bt-sites.webp")


def steps():
    im, d = canvas()
    xs = [220, 600, 980, 1360]
    for i, cx in enumerate(xs):
        dashed_circle(d, cx, 450, 150)
        if i < 3:
            d.polygon([(cx + 168, 440), (cx + 198, 450), (cx + 168, 460)], fill=CORAL)

    # Records
    d.rounded_rectangle((160, 360, 280, 540), 12, outline=NAVY, width=5)
    d.line((180, 400, 260, 400), fill=TEAL, width=4)
    d.line((180, 430, 250, 430), fill=SOFT, width=4)
    d.line((180, 460, 240, 460), fill=SOFT, width=4)
    d.ellipse((210, 490, 240, 520), fill=CORAL)

    # Applicator placement
    d.ellipse((540, 360, 660, 520), outline=NAVY, width=5)
    d.rounded_rectangle((588, 380, 612, 500), 6, fill=TEAL)
    d.ellipse((592, 488, 608, 504), fill=CORAL)

    # Planning imaging
    d.rounded_rectangle((910, 370, 1050, 530), 20, fill=NAVY)
    d.ellipse((935, 395, 1025, 485), fill=TEAL)
    d.ellipse((960, 420, 1000, 460), fill=CORAL)

    # Source dwell / afterloader cable
    d.rounded_rectangle((1280, 360, 1440, 420), 12, fill=NAVY)
    d.line((1360, 420, 1360, 500), fill=TEAL, width=8)
    d.ellipse((1344, 492, 1376, 524), fill=CORAL)
    d.rounded_rectangle((1300, 540, 1420, 580), 10, fill=SOFT, outline=NAVY, width=3)
    save(im, "bt-steps.webp")


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    hero()
    types()
    sites()
    steps()
