#!/usr/bin/env python3
"""Unlabeled 16:9 hormone-therapy concept diagrams."""

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
ROSE = (254, 226, 226)


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
    """Hormone ligand approaching a receptor, with a blocking wedge."""
    im, d = canvas()
    d.ellipse((-220, -160, 480, 400), fill=LAVENDER)
    d.ellipse((1180, 540, 1780, 1140), fill=SKY)
    d.ellipse((220, 180, 720, 720), outline=NAVY, width=8)
    d.ellipse((300, 260, 640, 640), fill=CORAL)
    d.pieslice((520, 300, 820, 600), 310, 50, fill=GOLD, outline=NAVY, width=6)
    d.ellipse((980, 340, 1180, 540), fill=TEAL)
    d.polygon([(1180, 400), (1420, 300), (1420, 580)], fill=MINT, outline=NAVY)
    dashed_circle(d, 800, 450, 280)
    save(im, "ht-hero.webp")


def types():
    """Three unlabeled endocrine-therapy modes: tablet, injection, receptor."""
    im, d = canvas()
    dashed_circle(d, 800, 450, 360)
    d.rounded_rectangle((160, 220, 480, 680), 28, fill=SKY, outline=NAVY, width=8)
    d.rounded_rectangle((250, 300, 390, 600), 18, fill=GOLD)
    d.ellipse((280, 250, 360, 330), fill=TEAL)
    d.rounded_rectangle((620, 220, 980, 680), 28, fill=MINT, outline=NAVY, width=8)
    d.rectangle((760, 280, 840, 520), fill=NAVY)
    d.ellipse((720, 500, 880, 640), fill=CORAL)
    d.rounded_rectangle((1120, 220, 1440, 680), 28, fill=LAVENDER, outline=NAVY, width=8)
    d.ellipse((1180, 320, 1380, 580), outline=VIOLET, width=10)
    d.ellipse((1230, 390, 1330, 490), fill=GOLD)
    save(im, "ht-types.webp")


def compare():
    """Two distinct panels: cancer hormone blockade versus replacement."""
    im, d = canvas()
    d.ellipse((1100, -180, 1760, 360), fill=ROSE)
    d.ellipse((-180, 560, 420, 1120), fill=(224, 242, 254))
    d.rounded_rectangle((140, 180, 740, 720), 32, fill=MINT, outline=NAVY, width=8)
    d.ellipse((280, 300, 600, 620), fill=TEAL)
    d.polygon([(360, 380), (520, 380), (440, 540)], fill=CREAM)
    d.rounded_rectangle((860, 180, 1460, 720), 32, fill=LAVENDER, outline=NAVY, width=8)
    d.ellipse((1000, 300, 1320, 620), fill=GOLD)
    d.ellipse((1080, 380, 1240, 540), fill=VIOLET)
    dashed_circle(d, 800, 450, 250)
    save(im, "ht-compare.webp")


def side_effects():
    """Bone, joint and metabolic monitoring shapes without labels."""
    im, d = canvas()
    dashed_circle(d, 800, 450, 330)
    d.rounded_rectangle((180, 260, 500, 640), 24, fill=SKY, outline=NAVY, width=7)
    d.polygon([(240, 560), (280, 360), (340, 480), (400, 320), (440, 560)], fill=GOLD)
    d.rounded_rectangle((640, 260, 960, 640), 24, fill=MINT, outline=NAVY, width=7)
    d.ellipse((700, 330, 900, 470), fill=CORAL)
    d.ellipse((720, 480, 880, 590), fill=TEAL)
    d.rounded_rectangle((1100, 260, 1420, 640), 24, fill=LAVENDER, outline=NAVY, width=7)
    d.ellipse((1180, 340, 1340, 500), fill=VIOLET)
    d.rectangle((1210, 520, 1310, 590), fill=NAVY)
    save(im, "ht-side-effects.webp")


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    hero()
    types()
    compare()
    side_effects()
