#!/usr/bin/env python3
"""Unlabeled 16:9 intraperitoneal chemotherapy concept diagrams."""

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
    d.ellipse((-200, 520, 420, 1100), fill=(240, 253, 250))
    d.ellipse((1220, -160, 1780, 380), fill=(255, 247, 237))
    # Abdominal cavity
    d.ellipse((480, 180, 1120, 780), outline=NAVY, width=8)
    d.ellipse((560, 260, 1040, 700), fill=MINT)
    # Organ ovals
    d.ellipse((640, 340, 820, 500), outline=TEAL, width=6)
    d.ellipse((780, 420, 960, 600), outline=NAVY, width=6)
    # Drug droplet
    d.ellipse((1180, 240, 1320, 400), fill=GOLD)
    d.polygon([(1250, 400), (1220, 470), (1280, 470)], fill=GOLD)
    d.polygon([(1280, 320), (1460, 360), (1280, 380)], fill=CORAL)
    save(im, "ip-hero.webp")


def catheter():
    im, d = canvas()
    dashed_circle(d, 800, 450, 310)
    d.ellipse((560, 220, 1040, 720), outline=NAVY, width=8)
    d.ellipse((640, 320, 960, 620), fill=SKY)
    # Port dome
    d.ellipse((700, 140, 900, 280), fill=GOLD, outline=NAVY, width=6)
    # Catheter into cavity
    d.line((800, 280, 800, 500), fill=CORAL, width=10)
    d.ellipse((776, 490, 824, 538), fill=CORAL)
    # Access needle
    d.line((1080, 80, 820, 180), fill=NAVY, width=8)
    save(im, "ip-catheter.webp")


def compare():
    im, d = canvas()
    for cx in (400, 1200):
        dashed_circle(d, cx, 450, 240)
    # Catheter / room-temperature IP
    d.ellipse((300, 300, 500, 600), outline=NAVY, width=8)
    d.ellipse((360, 180, 440, 260), fill=GOLD)
    d.line((400, 260, 400, 460), fill=CORAL, width=8)
    # Heated operative HIPEC
    d.rounded_rectangle((1080, 280, 1320, 620), 20, outline=NAVY, width=8)
    d.ellipse((1140, 340, 1260, 460), fill=CORAL)
    d.arc((1100, 300, 1300, 500), 200, 340, fill=GOLD, width=10)
    save(im, "ip-compare.webp")


def pci():
    im, d = canvas()
    dashed_circle(d, 800, 450, 300)
    # Nine abdominal regions
    xs = (620, 760, 900)
    ys = (260, 400, 540)
    for i, x in enumerate(xs):
        for j, y in enumerate(ys):
            fill = MINT if (i + j) % 2 == 0 else SKY
            d.rounded_rectangle((x, y, x + 120, y + 120), 16, fill=fill, outline=NAVY, width=5)
    d.ellipse((760, 180, 840, 240), fill=GOLD)
    save(im, "ip-pci.webp")


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    hero()
    catheter()
    compare()
    pci()
