#!/usr/bin/env python3
"""Unlabeled 16:9 molecular targeted therapy concept diagrams."""

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
    """Lock-and-key: tumour receptor and a matching small-molecule fit."""
    im, d = canvas()
    d.ellipse((-220, -160, 480, 400), fill=LAVENDER)
    d.ellipse((1180, 540, 1780, 1100), fill=(224, 242, 254))
    # Tumour body
    d.ellipse((220, 180, 820, 760), outline=NAVY, width=8)
    d.ellipse((280, 240, 760, 700), fill=CORAL)
    # Receptor notch
    d.pieslice((520, 300, 900, 680), 310, 50, fill=CREAM)
    d.ellipse((610, 360, 790, 540), fill=MINT, outline=TEAL, width=6)
    # Matching key / drug
    d.rounded_rectangle((980, 360, 1280, 540), 40, fill=GOLD, outline=NAVY, width=6)
    d.polygon([(1280, 390), (1480, 450), (1280, 510)], fill=TEAL)
    save(im, "mtt-hero.webp")


def panel():
    """Biomarker / NGS panel tiles feeding a matched medicine."""
    im, d = canvas()
    dashed_circle(d, 800, 450, 330)
    colors = (SKY, MINT, GOLD, LAVENDER, CORAL, TEAL)
    idx = 0
    for row in range(3):
        for col in range(4):
            x = 360 + col * 160
            y = 210 + row * 150
            d.rounded_rectangle((x, y, x + 130, y + 120), 18, fill=colors[idx % len(colors)], outline=NAVY, width=5)
            idx += 1
    d.ellipse((1320, 360, 1500, 540), fill=VIOLET)
    d.ellipse((1360, 400, 1460, 500), fill=GOLD)
    save(im, "mtt-panel.webp")


def compare():
    """Broad cytotoxic exposure versus a single matched target."""
    im, d = canvas()
    for cx in (400, 1200):
        dashed_circle(d, cx, 430, 250)
    # Broad scatter
    d.ellipse((250, 250, 550, 550), outline=NAVY, width=8)
    for xy in ((300, 300, 360, 360), (400, 280, 470, 350), (320, 420, 400, 500), (430, 400, 500, 480)):
        d.ellipse(xy, fill=CORAL)
    d.rounded_rectangle((320, 600, 480, 680), 14, fill=GOLD)
    # Single matched hit
    d.ellipse((1050, 250, 1350, 550), outline=NAVY, width=8)
    d.ellipse((1140, 340, 1260, 460), fill=TEAL)
    d.rounded_rectangle((1120, 600, 1280, 680), 14, fill=MINT)
    save(im, "mtt-compare.webp")


def resist():
    """Blocked primary pathway with an alternate signalling route."""
    im, d = canvas()
    d.ellipse((1100, -140, 1760, 400), fill=(240, 253, 250))
    dashed_circle(d, 800, 450, 320)
    d.rounded_rectangle((280, 200, 520, 360), 24, fill=SKY, outline=NAVY, width=6)
    d.rounded_rectangle((1080, 200, 1320, 360), 24, fill=MINT, outline=NAVY, width=6)
    d.line((520, 280, 1080, 280), fill=NAVY, width=10)
    d.ellipse((720, 220, 880, 340), fill=CORAL)
    # Alternate route
    d.arc((520, 280, 1080, 700), 0, 180, fill=GOLD, width=12)
    d.ellipse((740, 620, 860, 740), fill=VIOLET)
    save(im, "mtt-resist.webp")


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    hero()
    panel()
    compare()
    resist()
