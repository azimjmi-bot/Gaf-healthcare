#!/usr/bin/env python3
"""Unlabeled 16:9 precision oncology concept diagrams."""

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
LAVENDER = (237, 233, 254)
VIOLET = (124, 58, 237)


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
    """Tumour specimen feeding a matched molecular plan."""
    im, d = canvas()
    d.ellipse((-200, -140, 460, 380), fill=LAVENDER)
    d.ellipse((1200, 560, 1800, 1120), fill=(224, 242, 254))
    d.ellipse((180, 240, 560, 660), outline=NAVY, width=8)
    d.ellipse((240, 310, 500, 590), fill=CORAL)
    dashed_circle(d, 800, 450, 200)
    d.ellipse((720, 370, 880, 530), fill=SKY, outline=TEAL, width=6)
    d.rounded_rectangle((1040, 260, 1440, 640), 28, fill=MINT, outline=NAVY, width=8)
    d.ellipse((1140, 340, 1340, 540), fill=GOLD)
    d.ellipse((1190, 390, 1290, 490), fill=VIOLET)
    save(im, "po-hero.webp")


def ngs():
    """NGS panel wells and a sequencing lane."""
    im, d = canvas()
    dashed_circle(d, 800, 450, 340)
    colors = (SKY, MINT, GOLD, LAVENDER, CORAL, TEAL)
    idx = 0
    for row in range(4):
        for col in range(6):
            x = 280 + col * 180
            y = 160 + row * 160
            d.ellipse((x, y, x + 120, y + 120), fill=colors[idx % len(colors)], outline=NAVY, width=5)
            idx += 1
    save(im, "po-ngs.webp")


def board():
    """Multidisciplinary review around a genomic report."""
    im, d = canvas()
    d.ellipse((1100, -160, 1760, 380), fill=(240, 253, 250))
    dashed_circle(d, 800, 450, 300)
    d.rounded_rectangle((560, 280, 1040, 620), 26, fill=SKY, outline=NAVY, width=8)
    d.rectangle((620, 340, 980, 400), fill=GOLD)
    d.rectangle((620, 430, 820, 560), fill=MINT)
    d.ellipse((860, 430, 980, 560), fill=CORAL)
    for cx in (280, 800, 1320):
        d.ellipse((cx - 70, 120, cx + 70, 260), fill=LAVENDER, outline=NAVY, width=6)
    save(im, "po-board.webp")


def liquid():
    """Blood sample with circulating tumour fragments."""
    im, d = canvas()
    dashed_circle(d, 800, 450, 320)
    d.rounded_rectangle((430, 160, 670, 740), 80, fill=SKY, outline=NAVY, width=8)
    d.ellipse((470, 200, 630, 360), fill=CORAL)
    d.rectangle((490, 400, 610, 680), fill=GOLD)
    for xy in ((860, 240, 980, 360), (1040, 360, 1160, 480), (900, 500, 1020, 620), (1180, 520, 1300, 640)):
        d.ellipse(xy, fill=TEAL if xy[0] > 1000 else VIOLET)
    save(im, "po-liquid.webp")


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    hero()
    ngs()
    board()
    liquid()
