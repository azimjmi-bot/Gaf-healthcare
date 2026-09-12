#!/usr/bin/env python3
"""Fallback Spine Surgery WebP sketches.

Published files in public/costs/*spine* and the procedure illustrations are
labeled educational artwork. Do not run this script unless those assets are
missing; it overwrites them with simpler unlabeled diagrams.
"""

from pathlib import Path

from PIL import Image, ImageDraw

OUT = Path("/workspace/public/costs")
W, H = 1280, 720
BG = (248, 246, 240)
NAVY = (32, 52, 82)
TEAL = (56, 128, 138)
CORAL = (196, 86, 78)
BONE = (232, 222, 204)
DISC = (168, 196, 202)
NERVE = (232, 176, 96)
METAL = (90, 104, 118)
SOFT = (214, 226, 228)
INK = (40, 48, 58)


def new():
    img = Image.new("RGB", (W, H), BG)
    return img, ImageDraw.Draw(img)


def rrect(d, box, r, fill, outline=NAVY, w=3):
    d.rounded_rectangle(box, r, fill=fill, outline=outline, width=w)


def body(d, cx, cy, w=92, h=38, fill=BONE):
    rrect(d, (cx - w // 2, cy - h // 2, cx + w // 2, cy + h // 2), 10, fill)


def pedicle(d, cx, cy, side=1):
    x = cx + side * 48
    d.ellipse((x - 10, cy - 10, x + 10, cy + 10), fill=BONE, outline=NAVY, width=2)


def disc(d, cx, y, w=70, h=16, fill=DISC):
    rrect(d, (cx - w // 2, y - h // 2, cx + w // 2, y + h // 2), 6, fill, w=2)


def nerve(d, x, y, dx=90, dy=-18):
    d.line((x, y, x + dx, y + dy), fill=NERVE, width=5)
    d.ellipse((x + dx - 6, y + dy - 6, x + dx + 6, y + dy + 6), fill=NERVE, outline=NAVY, width=2)


def column(d, cx, top, n=5, gap=86, herniated=None, collapsed=None, tumor=None, highlight=None):
    ys = [top + i * gap for i in range(n)]
    for i, y in enumerate(ys):
        fill = CORAL if highlight == i or collapsed == i else BONE
        h = 26 if collapsed == i else 38
        body(d, cx, y, h=h, fill=fill)
        pedicle(d, cx, y, 1)
        if i < n - 1:
            mid = (y + ys[i + 1]) // 2
            color = CORAL if herniated == i else DISC
            disc(d, cx, mid, fill=color)
            if herniated == i:
                d.ellipse((cx + 28, mid - 16, cx + 62, mid + 16), fill=CORAL, outline=NAVY, width=2)
                nerve(d, cx + 60, mid)
            else:
                nerve(d, cx + 56, mid, dx=70, dy=-10)
        if tumor == i:
            d.ellipse((cx + 10, y - 22, cx + 52, y + 22), fill=CORAL, outline=NAVY, width=3)
    return ys


def screws_rods(d, cx, ys):
    x = cx + 48
    if len(ys) > 1:
        d.line((x, ys[0], x, ys[-1]), fill=METAL, width=8)
    for y in ys:
        d.ellipse((x - 12, y - 12, x + 12, y + 12), fill=METAL, outline=NAVY, width=2)
        d.line((cx + 20, y, x - 12, y), fill=METAL, width=5)


def cage_box(d, cx, y):
    rrect(d, (cx - 22, y - 10, cx + 22, y + 10), 4, TEAL, w=2)


def save(img, name):
    path = OUT / name
    img.save(path, "WEBP", quality=84, method=6)
    print(f"{path.name:48} {path.stat().st_size:>6}")


def panel(d, title_y=48):
    d.rectangle((0, 0, W, 8), fill=TEAL)
    d.rectangle((0, H - 8, W, H), fill=TEAL)


def fusion():
    img, d = new()
    panel(d)
    column(d, 360, 150, herniated=1, highlight=2)
    ys = column(d, 920, 150)
    screws_rods(d, 920, ys[1:4])
    cage_box(d, 920, 150 + 86 + 43)
    cage_box(d, 920, 150 + 86 * 2 + 43)
    d.line((500, 360, 760, 360), fill=NAVY, width=3)
    save(img, "spinal-fusion-illustration.webp")


def plif():
    img, d = new()
    panel(d)
    column(d, 340, 160, n=4, herniated=1)
    ys = column(d, 940, 160, n=4)
    screws_rods(d, 940, ys[1:3])
    cage_box(d, 940, 160 + 86 + 43)
    d.polygon([(520, 330), (780, 280), (780, 400)], fill=SOFT, outline=NAVY, width=3)
    save(img, "plif-illustration.webp")


def tlif():
    img, d = new()
    panel(d)
    column(d, 340, 160, n=4, herniated=1)
    ys = column(d, 940, 160, n=4)
    screws_rods(d, 940, ys[1:3])
    cage_box(d, 940, 160 + 86 + 43)
    d.polygon([(540, 220), (800, 330), (540, 300)], fill=SOFT, outline=CORAL, width=3)
    save(img, "tlif-illustration.webp")


def alif():
    img, d = new()
    panel(d)
    d.ellipse((160, 210, 420, 530), fill=SOFT, outline=NAVY, width=3)
    d.polygon([(430, 360), (760, 330), (760, 410)], fill=TEAL, outline=NAVY, width=3)
    ys = column(d, 980, 160, n=4)
    cage_box(d, 980, 160 + 86 + 43)
    save(img, "alif-illustration.webp")


def acdf():
    img, d = new()
    panel(d)
    d.ellipse((300, 70, 500, 230), outline=NAVY, width=4)
    column(d, 400, 250, n=4, gap=70, herniated=0)
    ys = column(d, 920, 250, n=4, gap=70)
    rrect(d, (868, 250, 972, 460), 6, None if False else (236, 236, 236), w=3)
    # plate
    rrect(d, (900, 268, 940, 430), 4, METAL, w=2)
    cage_box(d, 920, 250 + 35)
    save(img, "acdf-illustration.webp")


def discectomy():
    img, d = new()
    panel(d)
    column(d, 640, 140, n=4, herniated=1)
    save(img, "discectomy-illustration.webp")


def microdiscectomy():
    img, d = new()
    panel(d)
    column(d, 420, 180, n=3, gap=100, herniated=0)
    d.ellipse((760, 140, 1180, 580), outline=TEAL, width=8)
    d.ellipse((880, 250, 1060, 430), outline=NAVY, width=4)
    d.ellipse((940, 310, 1000, 370), fill=CORAL, outline=NAVY, width=2)
    save(img, "microdiscectomy-illustration.webp")


def laminectomy():
    img, d = new()
    panel(d)
    column(d, 360, 150)
    ys = column(d, 920, 150)
    for y in ys[1:3]:
        d.rectangle((872, y - 22, 968, y + 22), fill=BG, outline=TEAL, width=3)
        d.ellipse((930, y - 14, 958, y + 14), fill=TEAL, outline=NAVY, width=2)
    save(img, "laminectomy-illustration.webp")


def decompression():
    img, d = new()
    panel(d)
    column(d, 640, 140, n=4)
    d.arc((560, 250, 760, 430), 200, 340, fill=CORAL, width=10)
    nerve(d, 720, 330, dx=120, dy=-30)
    save(img, "spinal-decompression-illustration.webp")


def disc_replacement():
    img, d = new()
    panel(d)
    column(d, 360, 150, n=4, herniated=1)
    column(d, 920, 150, n=4)
    d.ellipse((878, 150 + 86 + 22, 962, 150 + 86 + 64), fill=TEAL, outline=NAVY, width=3)
    rrect(d, (886, 150 + 86 + 28, 954, 150 + 86 + 40), 2, BONE, w=2)
    rrect(d, (886, 150 + 86 + 48, 954, 150 + 86 + 60), 2, BONE, w=2)
    save(img, "disc-replacement-illustration.webp")


def scoliosis():
    img, d = new()
    panel(d)
    xs = [480, 580, 430, 600, 500]
    ys = [140, 250, 360, 470, 580]
    for i, (x, y) in enumerate(zip(xs, ys)):
        body(d, x, y, w=88)
        pedicle(d, x, y, 1)
        if i < 4:
            disc(d, (x + xs[i + 1]) // 2, (y + ys[i + 1]) // 2)
        d.line((x, y, xs[min(i + 1, 4)], ys[min(i + 1, 4)]), fill=CORAL, width=6)
    cxs = [960] * 5
    cys = ys
    for i, (x, y) in enumerate(zip(cxs, cys)):
        body(d, x, y, w=88)
    screws_rods(d, 960, cys)
    save(img, "scoliosis-correction-illustration.webp")


def deformity():
    img, d = new()
    panel(d)
    xs = [380, 340, 400, 500, 560]
    ys = [150, 270, 390, 510, 620]
    for i, (x, y) in enumerate(zip(xs, ys)):
        body(d, x, y, w=84)
        if i < 4:
            disc(d, (x + xs[i + 1]) // 2, (y + ys[i + 1]) // 2)
    for x, y in zip([960] * 5, ys):
        body(d, x, y, w=84)
    screws_rods(d, 960, ys[:-1])
    save(img, "spinal-deformity-correction-illustration.webp")


def vertebroplasty():
    img, d = new()
    panel(d)
    column(d, 400, 180, n=3, gap=110, collapsed=1)
    ys = column(d, 940, 180, n=3, gap=110)
    body(d, 940, ys[1], h=28, fill=CORAL)
    d.polygon([(620, 180), (900, 280), (620, 210)], fill=TEAL, outline=NAVY, width=3)
    d.ellipse((924, ys[1] - 8, 956, ys[1] + 8), fill=METAL)
    save(img, "vertebroplasty-illustration.webp")


def kyphoplasty():
    img, d = new()
    panel(d)
    column(d, 360, 180, n=3, gap=110, collapsed=1)
    ys = column(d, 960, 180, n=3, gap=110)
    body(d, 960, ys[1], h=42, fill=TEAL)
    d.ellipse((860, ys[1] - 50, 1060, ys[1] + 50), outline=NAVY, width=3)
    d.polygon([(580, 170), (860, 270), (580, 200)], fill=CORAL, outline=NAVY, width=3)
    save(img, "kyphoplasty-illustration.webp")


def tumor():
    img, d = new()
    panel(d)
    column(d, 400, 150, n=4, tumor=2)
    column(d, 940, 150, n=4)
    d.ellipse((900, 150 + 86 * 2 - 28, 990, 150 + 86 * 2 + 28), outline=TEAL, width=5)
    save(img, "spinal-tumor-surgery-illustration.webp")


def revision():
    img, d = new()
    panel(d)
    ys = column(d, 360, 150)
    screws_rods(d, 360, ys[1:3])
    d.line((320, 220, 430, 500), fill=CORAL, width=5)
    ys2 = column(d, 960, 150)
    screws_rods(d, 960, ys2)
    save(img, "revision-spine-surgery-illustration.webp")


def pathway():
    img, d = new()
    panel(d)
    steps = [
        (180, "MRI / records"),
        (460, "Plan"),
        (740, "Theatre"),
        (1020, "Rehab"),
    ]
    for i, (x, _) in enumerate(steps):
        d.ellipse((x - 78, 280, x + 78, 436), outline=[NAVY, TEAL, CORAL, METAL][i], width=7)
        if i == 0:
            rrect(d, (x - 28, 330, x + 28, 386), 4, None and BG or (236, 236, 236), w=3)
            d.line((x - 16, 358, x + 16, 358), fill=NAVY, width=2)
        elif i == 1:
            d.polygon([(x - 8, 320), (x + 22, 358), (x - 8, 396)], outline=TEAL, width=3)
        elif i == 2:
            rrect(d, (x - 34, 348, x + 34, 392), 6, SOFT, w=3)
            d.ellipse((x - 12, 318, x + 12, 346), outline=CORAL, width=3)
        else:
            d.arc((x - 28, 340, x + 28, 400), 200, 340, fill=METAL, width=5)
        if i < 3:
            d.line((x + 86, 358, steps[i + 1][0] - 86, 358), fill=METAL, width=5)
    save(img, "spine-treatment-pathway.webp")


def journey():
    img, d = new()
    panel(d)
    rrect(d, (110, 200, 340, 520), 18, SOFT, w=4)
    rrect(d, (140, 240, 310, 300), 6, DISC, w=2)
    rrect(d, (140, 320, 310, 344), 4, METAL, w=0)
    rrect(d, (140, 360, 270, 384), 4, METAL, w=0)
    d.polygon([(380, 300), (540, 250), (540, 370)], fill=NAVY)
    rrect(d, (600, 210, 900, 520), 12, SOFT, w=4)
    rrect(d, (660, 270, 840, 470), 8, BONE, w=3)
    d.line((760, 270, 760, 210), fill=NAVY, width=4)
    d.ellipse((1040, 360, 1160, 560), outline=CORAL, width=5)
    d.line((1100, 560, 1100, 630), fill=NAVY, width=5)
    d.line((1100, 630, 1140, 680), fill=NAVY, width=5)
    d.line((1100, 630, 1060, 680), fill=NAVY, width=5)
    save(img, "spine-international-journey.webp")


if __name__ == "__main__":
    fusion()
    plif()
    tlif()
    alif()
    acdf()
    discectomy()
    microdiscectomy()
    laminectomy()
    decompression()
    disc_replacement()
    scoliosis()
    deformity()
    vertebroplasty()
    kyphoplasty()
    tumor()
    revision()
    pathway()
    journey()
