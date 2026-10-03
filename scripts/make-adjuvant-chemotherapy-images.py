#!/usr/bin/env python3
"""Unlabeled 16:9 adjuvant chemotherapy concept diagrams."""

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
    d.ellipse((-180, 540, 420, 1100), fill=(240, 253, 250))
    d.ellipse((1240, -160, 1800, 360), fill=(224, 242, 254))
    # Local tumour site
    d.ellipse((280, 260, 560, 560), outline=NAVY, width=8)
    d.ellipse((360, 340, 480, 460), fill=GOLD)
    # Systemic circulation
    d.ellipse((780, 220, 1320, 720), outline=TEAL, width=8)
    d.ellipse((900, 340, 1200, 600), fill=MINT)
    d.ellipse((980, 400, 1120, 540), fill=CORAL)
    save(im, "adj-hero.webp")


def cycle():
    im, d = canvas()
    dashed_circle(d, 800, 450, 300)
    # Infusion bag
    d.rounded_rectangle((700, 180, 900, 360), 24, fill=SKY, outline=NAVY, width=6)
    d.polygon([(800, 360), (760, 420), (840, 420)], fill=TEAL)
    # Cycle blocks
    for i, x in enumerate((520, 700, 880, 1060)):
        fill = GOLD if i % 2 == 0 else MINT
        d.rounded_rectangle((x, 560, x + 140, 700), 18, fill=fill, outline=NAVY, width=5)
    save(im, "adj-cycle.webp")


def compare():
    im, d = canvas()
    for cx in (400, 1200):
        dashed_circle(d, cx, 450, 240)
    # Before surgery / neoadjuvant
    d.ellipse((300, 300, 500, 500), outline=NAVY, width=8)
    d.ellipse((360, 360, 440, 440), fill=CORAL)
    d.rounded_rectangle((320, 560, 480, 620), 12, fill=GOLD)
    # After surgery / adjuvant
    d.ellipse((1100, 300, 1300, 500), outline=NAVY, width=8)
    d.ellipse((1180, 380, 1220, 420), fill=MINT)
    d.rounded_rectangle((1120, 560, 1280, 620), 12, fill=TEAL)
    save(im, "adj-compare.webp")


def monitor():
    im, d = canvas()
    dashed_circle(d, 800, 450, 300)
    d.rounded_rectangle((520, 240, 1080, 660), 28, outline=NAVY, width=8)
    d.rectangle((560, 300, 1040, 360), fill=SKY)
    d.rectangle((560, 400, 780, 600), fill=MINT)
    d.ellipse((840, 420, 1000, 580), fill=GOLD)
    d.ellipse((880, 460, 960, 540), fill=CORAL)
    save(im, "adj-monitor.webp")


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    hero()
    cycle()
    compare()
    monitor()
