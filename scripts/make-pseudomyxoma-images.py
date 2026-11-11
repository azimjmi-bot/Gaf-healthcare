#!/usr/bin/env python3
"""Unlabeled 16:9 Canva-style medical concept diagrams for PMP blog."""

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


def mucin_abdomen():
    """Mucin filling the abdominal cavity — jelly-belly concept."""
    im, d = canvas()
    d.ellipse((460, 140, 1140, 820), outline=NAVY, width=10)
    d.ellipse((520, 210, 1080, 760), fill=MINT)
    # Mucin pools
    for box, color in (
        ((580, 280, 760, 420), AMBER),
        ((780, 320, 980, 500), GOLD),
        ((620, 460, 900, 640), (253, 224, 71)),
        ((700, 560, 1020, 700), AMBER),
    ):
        d.ellipse(box, fill=color)
    # Organ silhouettes under mucin
    d.ellipse((640, 360, 820, 480), outline=TEAL, width=5)
    d.ellipse((820, 430, 980, 560), outline=NAVY, width=5)
    save(im, "pmp-mucin-abdomen.webp")


def appendix_spread():
    """Appendiceal mucinous tumour releasing mucin into the peritoneum."""
    im, d = canvas()
    d.ellipse((520, 160, 1080, 760), outline=NAVY, width=10)
    d.ellipse((580, 230, 1020, 700), fill=SKY)
    # Caecum / bowel curve
    d.arc((620, 360, 900, 620), 200, 40, fill=TEAL, width=18)
    # Appendix
    d.rounded_rectangle((760, 500, 820, 680), 24, fill=CORAL, outline=NAVY, width=4)
    # Escape droplets
    for cx, cy, r in ((860, 540, 28), (920, 480, 36), (980, 420, 30), (1040, 360, 24), (700, 300, 22)):
        d.ellipse((cx - r, cy - r, cx + r, cy + r), fill=GOLD)
    # Arrow-like spray
    d.polygon([(820, 560), (980, 340), (940, 340), (1020, 280), (980, 380), (950, 360)], fill=AMBER)
    save(im, "pmp-appendix-spread.webp")


def crs_hipec():
    """Two-panel CRS cytoreduction then HIPEC heated perfusion."""
    im, d = canvas()
    # Left: CRS
    d.rounded_rectangle((80, 120, 740, 780), 28, outline=NAVY, width=8, fill=SOFT)
    d.ellipse((220, 240, 600, 660), outline=TEAL, width=8)
    d.ellipse((280, 320, 540, 580), fill=MINT)
    # Removed deposits (empty circles)
    for cx, cy in ((340, 400), (420, 460), (480, 380)):
        d.ellipse((cx - 18, cy - 18, cx + 18, cy + 18), outline=CORAL, width=4)
    d.line((360, 380, 400, 420), fill=CORAL, width=4)
    d.line((400, 380, 360, 420), fill=CORAL, width=4)
    # Right: HIPEC
    d.rounded_rectangle((860, 120, 1520, 780), 28, outline=NAVY, width=8, fill=SOFT)
    d.ellipse((1000, 240, 1380, 660), outline=NAVY, width=8)
    d.ellipse((1060, 310, 1320, 590), fill=(254, 226, 226))
    # Perfusion circuit
    d.arc((1040, 280, 1340, 580), 200, 340, fill=CORAL, width=14)
    d.ellipse((1160, 200, 1260, 300), fill=GOLD, outline=NAVY, width=4)
    d.line((1210, 300, 1210, 360), fill=CORAL, width=10)
    d.ellipse((1188, 480, 1232, 524), fill=CORAL)
    # Heat waves
    for y in (360, 400, 440):
        d.arc((1100, y, 1280, y + 60), 200, 340, fill=AMBER, width=5)
    save(im, "pmp-crs-hipec.webp")


def pci_regions():
    """PCI-style abdominal region grid without text labels."""
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
    # Four small-bowel strips
    for j, y in enumerate((700, 740, 780, 820)):
        fill = GOLD if j % 2 == 0 else AMBER
        d.rounded_rectangle((620, y - 20, 980, y + 12), 10, fill=fill, outline=NAVY, width=3)
    save(im, "pmp-pci-regions.webp")


if __name__ == "__main__":
    mucin_abdomen()
    appendix_spread()
    crs_hipec()
    pci_regions()
