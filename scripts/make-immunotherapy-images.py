#!/usr/bin/env python3
"""Unlabeled 16:9 immunotherapy concept diagrams."""

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
    """T cell approaching a tumour cell with a blocking wedge at the checkpoint."""
    im, d = canvas()
    d.ellipse((-200, -140, 480, 400), fill=LAVENDER)
    d.ellipse((1180, 540, 1780, 1140), fill=SKY)
    d.ellipse((180, 200, 620, 700), fill=TEAL, outline=NAVY, width=8)
    d.ellipse((280, 300, 520, 600), fill=MINT)
    d.ellipse((980, 200, 1420, 700), fill=CORAL, outline=NAVY, width=8)
    d.polygon([(620, 360), (860, 280), (860, 520)], fill=GOLD, outline=NAVY)
    dashed_circle(d, 800, 450, 280)
    save(im, "io-hero.webp")


def checkpoint():
    """Two receptors facing each other with a blocking bar."""
    im, d = canvas()
    dashed_circle(d, 800, 450, 330)
    d.ellipse((220, 240, 620, 660), outline=NAVY, width=10)
    d.ellipse((300, 320, 540, 580), fill=TEAL)
    d.ellipse((980, 240, 1380, 660), outline=NAVY, width=10)
    d.ellipse((1060, 320, 1300, 580), fill=CORAL)
    d.rounded_rectangle((700, 280, 900, 620), 20, fill=GOLD)
    save(im, "io-checkpoint.webp")


def types():
    """Infusion bag, engineered cell, and antibody shape."""
    im, d = canvas()
    dashed_circle(d, 800, 450, 360)
    d.rounded_rectangle((140, 220, 500, 680), 28, fill=SKY, outline=NAVY, width=8)
    d.polygon([(220, 280), (420, 280), (390, 520), (250, 520)], fill=TEAL)
    d.ellipse((270, 540, 370, 640), fill=GOLD)
    d.rounded_rectangle((620, 220, 980, 680), 28, fill=MINT, outline=NAVY, width=8)
    d.ellipse((700, 320, 900, 580), fill=VIOLET)
    d.ellipse((750, 390, 850, 490), fill=CREAM)
    d.rounded_rectangle((1100, 220, 1460, 680), 28, fill=LAVENDER, outline=NAVY, width=8)
    d.ellipse((1180, 300, 1380, 500), fill=CORAL)
    d.polygon([(1280, 500), (1220, 620), (1340, 620)], fill=NAVY)
    save(im, "io-types.webp")


def monitor():
    """Lung, gut and endocrine monitoring shapes for immune-related effects."""
    im, d = canvas()
    dashed_circle(d, 800, 450, 330)
    d.rounded_rectangle((160, 240, 500, 660), 24, fill=SKY, outline=NAVY, width=7)
    d.ellipse((210, 320, 340, 560), fill=TEAL)
    d.ellipse((330, 320, 460, 560), fill=MINT)
    d.rounded_rectangle((640, 240, 960, 660), 24, fill=MINT, outline=NAVY, width=7)
    d.ellipse((700, 330, 900, 470), fill=CORAL)
    d.ellipse((720, 490, 880, 600), fill=GOLD)
    d.rounded_rectangle((1100, 240, 1440, 660), 24, fill=LAVENDER, outline=NAVY, width=7)
    d.ellipse((1180, 320, 1360, 480), fill=VIOLET)
    d.rectangle((1220, 500, 1320, 600), fill=NAVY)
    save(im, "io-monitor.webp")


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    hero()
    checkpoint()
    types()
    monitor()
