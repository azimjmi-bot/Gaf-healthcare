#!/usr/bin/env python3
"""Unlabeled 16:9 intrathecal chemotherapy concept diagrams."""

from pathlib import Path

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
    d.ellipse((-180, 540, 440, 1120), fill=(240, 253, 250))
    d.ellipse((1200, -180, 1760, 360), fill=(224, 242, 254))
    # Brain outline
    d.ellipse((240, 220, 560, 560), outline=NAVY, width=8)
    d.ellipse((320, 300, 480, 460), fill=SKY)
    # Spinal canal
    d.rounded_rectangle((360, 540, 440, 820), 30, outline=NAVY, width=8)
    d.rectangle((385, 560, 415, 800), fill=TEAL)
    # Drug droplet into canal
    d.ellipse((720, 380, 840, 520), fill=GOLD)
    d.polygon([(780, 520), (760, 580), (800, 580)], fill=GOLD)
    d.polygon([(820, 450), (980, 470), (820, 490)], fill=CORAL)
    # CSF space around cord
    d.ellipse((1100, 300, 1420, 640), outline=TEAL, width=8)
    d.ellipse((1200, 400, 1320, 540), fill=MINT)
    save(im, "itc-hero.webp")


def lumbar():
    im, d = canvas()
    dashed_circle(d, 800, 450, 300)
    # Vertebral blocks
    for i, y in enumerate((260, 360, 460, 560)):
        d.rounded_rectangle((620, y, 980, y + 70), 16, outline=NAVY, width=6)
        d.ellipse((760, y + 18, 840, y + 52), fill=SKY)
    # Needle
    d.line((1180, 220, 800, 490), fill=CORAL, width=10)
    d.polygon([(800, 490), (780, 530), (820, 530)], fill=NAVY)
    d.rounded_rectangle((1160, 160, 1280, 240), 12, fill=GOLD)
    save(im, "itc-lp.webp")


def ommaya():
    im, d = canvas()
    # Scalp / skull arc
    d.arc((360, 80, 1240, 900), 200, 340, fill=NAVY, width=10)
    d.ellipse((620, 220, 980, 580), outline=TEAL, width=8)
    d.ellipse((720, 320, 880, 480), fill=MINT)
    # Reservoir dome under scalp
    d.ellipse((700, 140, 900, 280), fill=GOLD, outline=NAVY, width=6)
    # Catheter into ventricle
    d.line((800, 280, 800, 400), fill=CORAL, width=8)
    d.ellipse((776, 390, 824, 438), fill=CORAL)
    # Access needle
    d.line((1040, 80, 820, 180), fill=NAVY, width=8)
    save(im, "itc-ommaya.webp")


def compare():
    im, d = canvas()
    xs = [400, 1200]
    for cx in xs:
        dashed_circle(d, cx, 450, 240)
    # IV / systemic
    d.rounded_rectangle((280, 400, 520, 440), 8, fill=NAVY)
    d.polygon([(520, 400), (580, 420), (520, 440)], fill=TEAL)
    d.ellipse((360, 300, 440, 380), outline=NAVY, width=6)
    d.ellipse((380, 320, 420, 360), fill=CORAL)
    # CSF / spinal
    d.rounded_rectangle((1140, 260, 1260, 640), 40, outline=NAVY, width=8)
    d.rectangle((1175, 300, 1225, 600), fill=TEAL)
    d.ellipse((1160, 200, 1240, 280), fill=GOLD)
    save(im, "itc-compare.webp")


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    hero()
    lumbar()
    ommaya()
    compare()
