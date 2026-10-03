#!/usr/bin/env python3
"""Unlabeled 16:9 neoadjuvant chemotherapy concept diagrams."""

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
    """Large tumour shrinking under systemic treatment before a surgical field."""
    im, d = canvas()
    d.ellipse((-200, -180, 460, 420), fill=LAVENDER)
    d.ellipse((1180, 520, 1780, 1080), fill=(224, 242, 254))
    # Primary mass before treatment
    d.ellipse((180, 220, 560, 680), outline=NAVY, width=8)
    d.ellipse((230, 280, 510, 620), fill=CORAL)
    # Systemic circulation
    dashed_circle(d, 800, 450, 210)
    d.ellipse((710, 360, 890, 540), fill=SKY, outline=TEAL, width=6)
    d.ellipse((760, 410, 840, 490), fill=GOLD)
    # Reduced mass after treatment
    d.ellipse((1040, 280, 1420, 640), outline=NAVY, width=8)
    d.ellipse((1140, 360, 1320, 560), fill=MINT)
    d.ellipse((1190, 410, 1270, 490), fill=TEAL)
    # Surgical field ahead
    d.rounded_rectangle((1460, 360, 1560, 540), 18, fill=NAVY)
    save(im, "neo-hero.webp")


def cycle():
    """Infusion cycles sequenced toward a later operation."""
    im, d = canvas()
    dashed_circle(d, 800, 430, 320)
    d.rounded_rectangle((690, 140, 910, 330), 24, fill=SKY, outline=NAVY, width=6)
    d.polygon([(800, 330), (760, 400), (840, 400)], fill=TEAL)
    d.ellipse((770, 200, 830, 260), fill=GOLD)
    for i, x in enumerate((360, 560, 760, 960)):
        fill = CORAL if i == 0 else GOLD if i % 2 == 0 else MINT
        d.rounded_rectangle((x, 560, x + 150, 720), 20, fill=fill, outline=NAVY, width=5)
    d.polygon([(1220, 560), (1370, 640), (1220, 720)], fill=NAVY)
    save(im, "neo-cycle.webp")


def compare():
    """Pre-operative systemic treatment versus post-operative adjuvant timing."""
    im, d = canvas()
    for cx in (420, 1180):
        dashed_circle(d, cx, 430, 250)
    # Before surgery: large mass plus drip
    d.ellipse((300, 250, 540, 530), outline=NAVY, width=8)
    d.ellipse((340, 300, 500, 480), fill=CORAL)
    d.rounded_rectangle((360, 580, 480, 660), 14, fill=GOLD)
    # After surgery: empty field plus later systemic circle
    d.ellipse((1060, 250, 1300, 530), outline=NAVY, width=8)
    d.ellipse((1140, 350, 1220, 430), fill=MINT)
    d.rounded_rectangle((1120, 580, 1240, 660), 14, fill=TEAL)
    save(im, "neo-compare.webp")


def restage():
    """Restaging imaging after cycles, before a surgical decision."""
    im, d = canvas()
    d.ellipse((1100, -120, 1760, 420), fill=(240, 253, 250))
    dashed_circle(d, 800, 450, 310)
    d.rounded_rectangle((430, 180, 1170, 720), 32, outline=NAVY, width=8)
    d.rectangle((480, 230, 780, 660), fill=SKY)
    d.ellipse((520, 300, 740, 560), fill=CORAL)
    d.rectangle((820, 230, 1120, 660), fill=MINT)
    d.ellipse((900, 360, 1040, 530), fill=TEAL)
    d.rounded_rectangle((620, 760, 980, 840), 16, fill=GOLD)
    save(im, "neo-restage.webp")


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    hero()
    cycle()
    compare()
    restage()
