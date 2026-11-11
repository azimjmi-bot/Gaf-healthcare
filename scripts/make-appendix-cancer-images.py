#!/usr/bin/env python3
"""Unlabeled 16:9 Canva-style diagrams for appendix cancer / HIPEC blog."""

from pathlib import Path

from PIL import Image, ImageDraw

OUT = Path("public/uploads/articles")
W, H = 1600, 900
TEAL = (13, 148, 136)
NAVY = (15, 40, 72)
CORAL = (232, 93, 117)
MINT = (204, 251, 241)
SKY = (186, 230, 253)
GOLD = (212, 168, 75)
AMBER = (251, 191, 36)
CREAM = (255, 255, 255)
SOFT = (248, 250, 252)


def canvas():
    im = Image.new("RGB", (W, H), CREAM)
    d = ImageDraw.Draw(im)
    d.ellipse((-180, 560, 480, 1180), fill=(240, 253, 250))
    d.ellipse((1180, -200, 1780, 360), fill=(255, 247, 237))
    return im, d


def save(im, name):
    OUT.mkdir(parents=True, exist_ok=True)
    path = OUT / name
    im.save(path, "WEBP", quality=84, method=6)
    print("wrote", path, path.stat().st_size)


def appendix_anatomy():
    im, d = canvas()
    d.ellipse((480, 140, 1120, 820), outline=NAVY, width=10)
    d.ellipse((540, 210, 1060, 760), fill=SKY)
    # Caecum curve
    d.arc((600, 320, 980, 680), 200, 40, fill=TEAL, width=22)
    # Appendix pouch
    d.rounded_rectangle((780, 520, 860, 720), 28, fill=CORAL, outline=NAVY, width=5)
    d.ellipse((760, 500, 880, 560), fill=CORAL, outline=NAVY, width=4)
    # Tumour focus
    d.ellipse((800, 580, 840, 620), fill=GOLD)
    save(im, "appendix-cancer-anatomy.webp")


def peritoneal_spread():
    im, d = canvas()
    d.ellipse((460, 140, 1140, 820), outline=NAVY, width=10)
    d.ellipse((520, 210, 1080, 760), fill=MINT)
    # Appendix source
    d.rounded_rectangle((740, 520, 820, 680), 24, fill=CORAL, outline=NAVY, width=4)
    # Mucin / deposits
    for box in (
        (560, 280, 700, 400),
        (760, 260, 920, 380),
        (900, 420, 1040, 560),
        (600, 480, 760, 620),
        (820, 560, 980, 700),
    ):
        d.ellipse(box, fill=AMBER if box[0] % 40 else GOLD)
    d.polygon([(820, 560), (980, 340), (940, 340), (1020, 280), (980, 380), (950, 360)], fill=GOLD)
    save(im, "appendix-peritoneal-spread.webp")


def crs_hipec():
    im, d = canvas()
    d.rounded_rectangle((80, 120, 740, 780), 28, outline=NAVY, width=8, fill=SOFT)
    d.ellipse((220, 240, 600, 660), outline=TEAL, width=8)
    d.ellipse((280, 320, 540, 580), fill=MINT)
    for cx, cy in ((340, 400), (420, 460), (480, 380)):
        d.ellipse((cx - 18, cy - 18, cx + 18, cy + 18), outline=CORAL, width=4)
        d.line((cx - 12, cy - 12, cx + 12, cy + 12), fill=CORAL, width=4)
        d.line((cx + 12, cy - 12, cx - 12, cy + 12), fill=CORAL, width=4)
    d.rounded_rectangle((860, 120, 1520, 780), 28, outline=NAVY, width=8, fill=SOFT)
    d.ellipse((1000, 240, 1380, 660), outline=NAVY, width=8)
    d.ellipse((1060, 310, 1320, 590), fill=(254, 226, 226))
    d.arc((1040, 280, 1340, 580), 200, 340, fill=CORAL, width=14)
    d.ellipse((1160, 200, 1260, 300), fill=GOLD, outline=NAVY, width=4)
    d.line((1210, 300, 1210, 360), fill=CORAL, width=10)
    for y in (360, 400, 440):
        d.arc((1100, y, 1280, y + 60), 200, 340, fill=AMBER, width=5)
    save(im, "appendix-crs-hipec.webp")


def pci_grid():
    im, d = canvas()
    d.ellipse((480, 120, 1120, 820), outline=NAVY, width=8)
    xs = (560, 720, 880)
    ys = (220, 380, 540)
    palette = (MINT, SKY, (254, 215, 170), MINT, (253, 224, 71), SKY, MINT, (254, 202, 202), SKY)
    i = 0
    for y in ys:
        for x in xs:
            d.rounded_rectangle((x, y, x + 140, y + 140), 18, fill=palette[i], outline=NAVY, width=5)
            i += 1
    for j, y in enumerate((700, 740, 780, 820)):
        fill = GOLD if j % 2 == 0 else AMBER
        d.rounded_rectangle((620, y - 20, 980, y + 12), 10, fill=fill, outline=NAVY, width=3)
    save(im, "appendix-pci-assessment.webp")


if __name__ == "__main__":
    appendix_anatomy()
    peritoneal_spread()
    crs_hipec()
    pci_grid()
