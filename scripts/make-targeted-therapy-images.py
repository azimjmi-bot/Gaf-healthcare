#!/usr/bin/env python3
"""Unlabeled 16:9 targeted-therapy concept diagrams."""

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
    """Medicine docking onto a receptor on a tumour cell."""
    im, d = canvas()
    d.ellipse((-200, -140, 460, 380), fill=LAVENDER)
    d.ellipse((1200, 560, 1800, 1120), fill=SKY)
    d.ellipse((200, 180, 700, 720), outline=NAVY, width=8)
    d.ellipse((280, 260, 620, 640), fill=CORAL)
    d.polygon([(620, 360), (820, 280), (820, 520)], fill=GOLD, outline=NAVY)
    d.rounded_rectangle((980, 280, 1380, 620), 28, fill=MINT, outline=NAVY, width=8)
    d.ellipse((1080, 360, 1280, 560), fill=TEAL)
    dashed_circle(d, 800, 450, 270)
    save(im, "tt-hero.webp")


def biomarker():
    """Tissue well and liquid-biopsy vial feeding a molecular read-out."""
    im, d = canvas()
    dashed_circle(d, 800, 450, 340)
    d.rounded_rectangle((180, 220, 560, 680), 26, fill=SKY, outline=NAVY, width=8)
    d.ellipse((260, 300, 480, 600), fill=CORAL)
    d.rounded_rectangle((640, 220, 960, 680), 26, fill=MINT, outline=NAVY, width=8)
    d.rectangle((740, 280, 860, 520), fill=NAVY)
    d.ellipse((700, 500, 900, 640), fill=GOLD)
    d.rounded_rectangle((1040, 220, 1420, 680), 26, fill=LAVENDER, outline=NAVY, width=8)
    colors = (TEAL, VIOLET, GOLD, CORAL)
    for i, color in enumerate(colors):
        y = 300 + i * 80
        d.rectangle((1120, y, 1340, y + 50), fill=color)
    save(im, "tt-biomarker.webp")


def types():
    """Three unlabeled modes: oral tablet, antibody, antibody-drug conjugate."""
    im, d = canvas()
    dashed_circle(d, 800, 450, 360)
    d.rounded_rectangle((140, 220, 500, 680), 28, fill=SKY, outline=NAVY, width=8)
    d.rounded_rectangle((230, 300, 410, 600), 18, fill=GOLD)
    d.ellipse((270, 250, 370, 330), fill=TEAL)
    d.rounded_rectangle((620, 220, 980, 680), 28, fill=MINT, outline=NAVY, width=8)
    d.ellipse((700, 320, 900, 580), fill=VIOLET)
    d.ellipse((750, 390, 850, 490), fill=CREAM)
    d.rounded_rectangle((1100, 220, 1460, 680), 28, fill=LAVENDER, outline=NAVY, width=8)
    d.ellipse((1180, 300, 1380, 500), fill=CORAL)
    d.polygon([(1280, 500), (1220, 620), (1340, 620)], fill=NAVY)
    save(im, "tt-types.webp")


def compare():
    """Targeted lock-and-key versus broader cytotoxic field."""
    im, d = canvas()
    d.ellipse((1100, -180, 1760, 360), fill=(254, 226, 226))
    d.ellipse((-180, 560, 420, 1120), fill=(224, 242, 254))
    d.rounded_rectangle((140, 180, 740, 720), 32, fill=MINT, outline=NAVY, width=8)
    d.ellipse((280, 300, 600, 620), fill=TEAL)
    d.polygon([(360, 400), (520, 360), (480, 540)], fill=GOLD)
    d.rounded_rectangle((860, 180, 1460, 720), 32, fill=LAVENDER, outline=NAVY, width=8)
    for cx, cy in ((1040, 320), (1280, 360), (1100, 520), (1320, 560), (1180, 440)):
        d.ellipse((cx - 50, cy - 50, cx + 50, cy + 50), fill=CORAL)
    dashed_circle(d, 800, 450, 240)
    save(im, "tt-compare.webp")


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    hero()
    biomarker()
    types()
    compare()
