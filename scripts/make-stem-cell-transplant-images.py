#!/usr/bin/env python3
"""Unlabeled 16:9 stem-cell transplantation concept diagrams."""

from pathlib import Path
import math

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
SOFT = (226, 232, 240)


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


def marrow(draw, cx, cy, w=210, h=360, fill=NAVY):
    draw.rounded_rectangle((cx - w // 2, cy - h // 2, cx + w // 2, cy + h // 2), 90, outline=fill, width=8)
    draw.ellipse((cx - 36, cy - 70, cx + 36, cy + 10), fill=CORAL)
    draw.ellipse((cx - 22, cy + 40, cx + 22, cy + 84), fill=TEAL)


def cell(draw, cx, cy, r=22, fill=TEAL):
    draw.ellipse((cx - r, cy - r, cx + r, cy + r), fill=fill)
    draw.ellipse((cx - 7, cy - 7, cx + 7, cy + 7), fill=NAVY)


def save(im, name):
    path = OUT / name
    im.save(path, "WEBP", quality=84, method=6)
    print("wrote", path, path.stat().st_size)


def hero():
    im, d = canvas()
    d.ellipse((-180, 520, 460, 1120), fill=(240, 253, 250))
    d.ellipse((1180, -180, 1760, 360), fill=(224, 242, 254))
    marrow(d, 430, 450)
    for i in range(7):
        ang = math.radians(-20 + i * 18)
        x = 640 + int(140 * math.cos(ang))
        y = 450 + int(90 * math.sin(ang))
        cell(d, x, y, 18, TEAL if i % 2 == 0 else GOLD)
    d.polygon([(820, 430), (920, 450), (820, 470)], fill=CORAL)
    d.rounded_rectangle((980, 320, 1420, 580), 40, outline=NAVY, width=8)
    for dx, dy in ((80, 40), (180, -10), (260, 50), (140, 80)):
        cell(d, 1080 + dx, 430 + dy, 20, TEAL)
    save(im, "hsct-hero.webp")


def types():
    im, d = canvas()
    xs = [280, 800, 1320]
    for cx in xs:
        dashed_circle(d, cx, 450, 200)

    # Autologous: same person, cells out and back
    d.ellipse((210, 360, 350, 540), outline=NAVY, width=6)
    cell(d, 280, 430, 28, TEAL)
    d.arc((200, 300, 360, 600), 200, 340, fill=GOLD, width=8)

    # Allogeneic: two figures, graft arrow
    d.ellipse((700, 340, 800, 500), outline=NAVY, width=6)
    d.ellipse((820, 360, 920, 540), outline=TEAL, width=6)
    cell(d, 750, 410, 18, GOLD)
    cell(d, 870, 440, 22, TEAL)
    d.polygon([(800, 430), (830, 450), (800, 470)], fill=CORAL)

    # Haploidentical: half-filled donor
    d.pieslice((1220, 350, 1420, 550), 180, 360, fill=MINT, outline=NAVY)
    d.pieslice((1220, 350, 1420, 550), 0, 180, fill=SKY, outline=NAVY)
    cell(d, 1320, 450, 26, CORAL)
    save(im, "hsct-types.webp")


def steps():
    im, d = canvas()
    xs = [220, 600, 980, 1360]
    for i, cx in enumerate(xs):
        dashed_circle(d, cx, 450, 150)
        if i < 3:
            d.polygon([(cx + 168, 440), (cx + 198, 450), (cx + 168, 460)], fill=CORAL)

    # Collection / apheresis bag
    d.rounded_rectangle((160, 360, 280, 540), 28, fill=NAVY)
    d.ellipse((175, 330, 265, 390), outline=TEAL, width=6)
    d.rectangle((200, 390, 240, 520), fill=CORAL)

    # Conditioning flask
    d.polygon([(540, 360), (660, 360), (630, 540), (570, 540)], fill=MINT, outline=NAVY)
    d.ellipse((575, 430, 625, 480), fill=GOLD)

    # Infusion
    d.rounded_rectangle((900, 420, 1080, 460), 8, fill=NAVY)
    d.polygon([(1080, 420), (1140, 440), (1080, 460)], fill=TEAL)
    d.ellipse((860, 400, 910, 480), outline=NAVY, width=6)

    # Engraftment / counts rising
    d.line((1260, 540, 1260, 360, 1460, 360), fill=NAVY, width=6)
    d.polygon([(1280, 500), (1340, 460), (1390, 480), (1450, 390)], fill=None, outline=TEAL)
    d.line((1280, 500, 1340, 460, 1390, 480, 1450, 390), fill=TEAL, width=8)
    cell(d, 1450, 390, 14, CORAL)
    save(im, "hsct-steps.webp")


def engraft():
    im, d = canvas()
    # Empty then filling marrow
    marrow(d, 420, 450, 240, 400, NAVY)
    d.rounded_rectangle((980, 250, 1220, 650), 90, outline=TEAL, width=8)
    for y in range(300, 620, 46):
        cell(d, 1100, y, 16, TEAL if y < 500 else GOLD)
        cell(d, 1040, y + 16, 12, CORAL)
        cell(d, 1160, y + 8, 14, SKY)
    d.polygon([(680, 430), (820, 450), (680, 470)], fill=CORAL)
    save(im, "hsct-engraft.webp")


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    hero()
    types()
    steps()
    engraft()
