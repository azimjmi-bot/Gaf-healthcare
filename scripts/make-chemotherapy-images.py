#!/usr/bin/env python3
"""Unlabeled 16:9 chemotherapy concept diagrams."""

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
    """Infusion bag feeding a circulating path around a marked cell."""
    im, d = canvas()
    d.ellipse((-180, -120, 520, 380), fill=SKY)
    d.ellipse((1160, 520, 1760, 1120), fill=LAVENDER)
    d.rounded_rectangle((180, 160, 520, 620), 36, fill=TEAL, outline=NAVY, width=8)
    d.polygon([(250, 220), (450, 220), (420, 480), (280, 480)], fill=MINT)
    d.ellipse((290, 500, 410, 620), fill=GOLD)
    d.ellipse((980, 220, 1380, 620), fill=CORAL, outline=NAVY, width=8)
    d.ellipse((1080, 320, 1280, 520), fill=CREAM)
    dashed_circle(d, 800, 450, 290)
    d.polygon([(520, 360), (900, 300), (900, 420)], fill=GOLD, outline=NAVY)
    save(im, "chemo-hero.webp")


def cycle():
    """Three arcs suggesting treatment then recovery."""
    im, d = canvas()
    dashed_circle(d, 800, 450, 340)
    d.arc((360, 110, 1240, 790), 200, 340, fill=TEAL, width=28)
    d.arc((360, 110, 1240, 790), 350, 110, fill=GOLD, width=28)
    d.arc((360, 110, 1240, 790), 120, 190, fill=CORAL, width=28)
    d.ellipse((700, 350, 900, 550), fill=NAVY)
    d.ellipse((740, 390, 860, 510), fill=MINT)
    save(im, "chemo-cycle.webp")


def types():
    """IV bag, tablet, and regional/spinal droplet."""
    im, d = canvas()
    dashed_circle(d, 800, 450, 360)
    d.rounded_rectangle((140, 220, 500, 680), 28, fill=SKY, outline=NAVY, width=8)
    d.polygon([(220, 280), (420, 280), (390, 520), (250, 520)], fill=TEAL)
    d.ellipse((270, 540, 370, 640), fill=GOLD)
    d.rounded_rectangle((620, 220, 980, 680), 28, fill=MINT, outline=NAVY, width=8)
    d.rounded_rectangle((720, 300, 880, 480), 40, fill=VIOLET)
    d.ellipse((740, 500, 860, 620), fill=GOLD)
    d.rounded_rectangle((1100, 220, 1460, 680), 28, fill=LAVENDER, outline=NAVY, width=8)
    d.ellipse((1180, 300, 1380, 500), fill=CORAL)
    d.polygon([(1280, 500), (1220, 620), (1340, 620)], fill=NAVY)
    save(im, "chemo-types.webp")


def counts():
    """Three monitoring panels for blood, gut and energy."""
    im, d = canvas()
    dashed_circle(d, 800, 450, 330)
    d.rounded_rectangle((160, 240, 500, 660), 24, fill=SKY, outline=NAVY, width=7)
    d.ellipse((230, 320, 430, 520), fill=TEAL)
    d.rectangle((290, 540, 370, 600), fill=NAVY)
    d.rounded_rectangle((640, 240, 960, 660), 24, fill=MINT, outline=NAVY, width=7)
    d.ellipse((700, 320, 900, 470), fill=CORAL)
    d.ellipse((730, 500, 870, 600), fill=GOLD)
    d.rounded_rectangle((1100, 240, 1440, 660), 24, fill=LAVENDER, outline=NAVY, width=7)
    d.polygon([(1270, 320), (1360, 500), (1180, 500)], fill=VIOLET)
    d.ellipse((1220, 530, 1320, 630), fill=NAVY)
    save(im, "chemo-counts.webp")


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    hero()
    cycle()
    types()
    counts()
