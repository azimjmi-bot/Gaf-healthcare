#!/usr/bin/env python3
"""Canva-style unlabeled 16:9 diagrams for HIPEC vs chemotherapy blog.

Matches the attached medical-infographic look: soft clinical blue/white,
relatable patient figure, circular anatomical frames, peripheral icon bubbles,
red accents for pathology — no embedded text labels.
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

OUT = Path("public/uploads/articles")
W, H = 1600, 900

# Palette from the reference infographic
BG = (245, 250, 255)
SOFT_BLUE = (210, 230, 245)
SOFT_BLUE2 = (186, 220, 240)
NAVY = (30, 58, 95)
TEAL = (56, 140, 160)
CORAL = (220, 70, 80)
RED = (200, 45, 55)
SKIN = (166, 112, 86)
SKIN_DARK = (120, 78, 58)
HIJAB = (168, 132, 96)
TOP = (110, 140, 120)
GOLD = (230, 180, 70)
CREAM = (255, 252, 248)
WHITE = (255, 255, 255)
ICON_BG = (255, 255, 255)
LINE = (160, 190, 210)


def canvas():
    im = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(im)
    # Soft clinic glow
    d.ellipse((-120, -80, 520, 420), fill=SOFT_BLUE)
    d.ellipse((1080, 480, 1780, 1080), fill=(230, 242, 250))
    d.ellipse((700, -200, 1400, 280), fill=(236, 246, 255))
    return im, d


def save(im, name):
    OUT.mkdir(parents=True, exist_ok=True)
    # Slight blur on background accents already painted; keep diagram sharp
    path = OUT / name
    im.save(path, "WEBP", quality=82, method=6)
    print("wrote", path, path.stat().st_size)


def dashed_line(d, x1, y1, x2, y2, fill=LINE, width=3, dash=14):
    import math

    dx, dy = x2 - x1, y2 - y1
    length = math.hypot(dx, dy) or 1
    ux, uy = dx / length, dy / length
    t = 0.0
    draw = True
    while t < length:
        seg = min(dash, length - t)
        if draw:
            sx, sy = x1 + ux * t, y1 + uy * t
            ex, ey = x1 + ux * (t + seg), y1 + uy * (t + seg)
            d.line([(sx, sy), (ex, ey)], fill=fill, width=width)
        draw = not draw
        t += seg


def thought_bubble(d, cx, cy, r=48):
    d.ellipse((cx - r, cy - r, cx + r, cy + r), fill=WHITE, outline=SOFT_BLUE2, width=4)
    d.ellipse((cx - 18, cy + r - 6, cx - 2, cy + r + 14), fill=WHITE, outline=SOFT_BLUE2, width=2)
    d.ellipse((cx - 30, cy + r + 10, cx - 20, cy + r + 20), fill=WHITE, outline=SOFT_BLUE2, width=2)
    # Question mark as icon (graphic, not a text label)
    d.arc((cx - 18, cy - 28, cx + 18, cy + 8), 200, 20, fill=CORAL, width=8)
    d.line([(cx, cy + 4), (cx, cy + 14)], fill=CORAL, width=8)
    d.ellipse((cx - 5, cy + 22, cx + 5, cy + 32), fill=CORAL)


def draw_woman(d, ox, oy, scale=1.0):
    """Stylised woman in hijab, thoughtful pose — matches attachment composition."""
    s = scale

    def rbox(x1, y1, x2, y2, **kw):
        d.rounded_rectangle(
            (ox + x1 * s, oy + y1 * s, ox + x2 * s, oy + y2 * s), **kw
        )

    def ell(x1, y1, x2, y2, **kw):
        d.ellipse((ox + x1 * s, oy + y1 * s, ox + x2 * s, oy + y2 * s), **kw)

    def ln(pts, **kw):
        d.line([(ox + x * s, oy + y * s) for x, y in pts], **kw)

    # Shoulders / top
    rbox(40, 280, 280, 520, radius=int(40 * s), fill=TOP)
    # Hijab outer
    ell(60, 40, 260, 300, fill=HIJAB)
    # Face
    ell(95, 110, 225, 270, fill=SKIN)
    # Hijab frame over forehead
    d.pieslice(
        (ox + 70 * s, oy + 40 * s, ox + 250 * s, oy + 230 * s),
        200,
        340,
        fill=HIJAB,
    )
    # Eyes looking up
    ell(125, 160, 145, 175, fill=SKIN_DARK)
    ell(175, 155, 195, 170, fill=SKIN_DARK)
    # Brows
    ln([(120, 150), (148, 145)], fill=SKIN_DARK, width=max(2, int(3 * s)))
    ln([(172, 145), (200, 148)], fill=SKIN_DARK, width=max(2, int(3 * s)))
    # Nose / mouth soft
    ln([(160, 185), (160, 205)], fill=SKIN_DARK, width=max(2, int(2 * s)))
    ell(148, 220, 172, 232, fill=(140, 90, 75))
    # Hand under chin
    ell(190, 230, 250, 290, fill=SKIN)
    ell(210, 250, 270, 310, fill=SKIN)
    # Sleeve cuff
    rbox(200, 280, 270, 330, radius=int(16 * s), fill=TOP)


def icon_circle(d, cx, cy, r=54, fill=ICON_BG):
    d.ellipse((cx - r - 4, cy - r - 4, cx + r + 4, cy + r + 4), fill=SOFT_BLUE2)
    d.ellipse((cx - r, cy - r, cx + r, cy + r), fill=fill, outline=SOFT_BLUE2, width=3)


def abdomen_diagram(d, cx, cy, radius=210, deposits=True, heat=False):
    d.ellipse((cx - radius, cy - radius, cx + radius, cy + radius), outline=NAVY, width=8)
    d.ellipse(
        (cx - radius + 28, cy - radius + 28, cx + radius - 28, cy + radius - 28),
        fill=SOFT_BLUE,
    )
    # Organs
    d.ellipse((cx - 90, cy - 60, cx + 20, cy + 50), outline=TEAL, width=6)
    d.ellipse((cx - 10, cy - 20, cx + 100, cy + 90), outline=NAVY, width=5)
    # Peritoneal lining arc
    d.arc((cx - 150, cy - 150, cx + 150, cy + 150), 200, 340, fill=TEAL, width=5)
    if deposits:
        for dx, dy, rr in ((-70, 80, 16), (40, -70, 14), (70, 60, 18), (-20, 20, 12)):
            d.ellipse((cx + dx - rr, cy + dy - rr, cx + dx + rr, cy + dy + rr), fill=CORAL)
    if heat:
        # Heat / perfusion arcs
        d.arc((cx - 120, cy - 120, cx + 120, cy + 120), 210, 330, fill=GOLD, width=10)
        d.arc((cx - 90, cy - 90, cx + 90, cy + 90), 40, 140, fill=CORAL, width=8)
        # Inflow / outflow
        d.ellipse((cx - 20, cy - radius - 40, cx + 20, cy - radius + 10), fill=GOLD, outline=NAVY, width=3)
        d.line([(cx, cy - radius + 10), (cx, cy - 40)], fill=CORAL, width=8)


def compare_hero():
    """Patient + central abdomen + peripheral delivery icons (IV vs HIPEC)."""
    im, d = canvas()
    draw_woman(d, 40, 180, scale=1.15)
    thought_bubble(d, 340, 160, r=52)

    # Central circular anatomy
    abdomen_diagram(d, 820, 450, radius=230, deposits=True, heat=False)

    # Peripheral icons connected by dotted lines
    icons = [
        (1180, 180, "iv"),
        (1340, 320, "heat"),
        (1360, 500, "surgery"),
        (1280, 680, "body"),
        (1080, 760, "cycle"),
    ]
    for cx, cy, kind in icons:
        dashed_line(d, 980, 450, cx, cy, fill=LINE, width=3)
        icon_circle(d, cx, cy, r=58)
        if kind == "iv":
            # IV bag + drip
            d.rounded_rectangle((cx - 18, cy - 34, cx + 18, cy + 6), 6, fill=SOFT_BLUE2, outline=NAVY, width=3)
            d.ellipse((cx - 10, cy - 28, cx + 10, cy - 12), fill=CORAL)
            d.line([(cx, cy + 6), (cx, cy + 28)], fill=NAVY, width=4)
            d.ellipse((cx - 6, cy + 26, cx + 6, cy + 38), fill=CORAL)
        elif kind == "heat":
            # Thermometer / heat waves
            d.rounded_rectangle((cx - 8, cy - 30, cx + 8, cy + 28), 8, fill=WHITE, outline=NAVY, width=3)
            d.ellipse((cx - 14, cy + 18, cx + 14, cy + 42), fill=CORAL, outline=NAVY, width=3)
            d.arc((cx + 14, cy - 20, cx + 36, cy + 10), 270, 90, fill=GOLD, width=4)
            d.arc((cx + 20, cy - 10, cx + 42, cy + 20), 270, 90, fill=GOLD, width=4)
        elif kind == "surgery":
            # Scalpel / cross removal
            d.line([(cx - 22, cy + 18), (cx + 22, cy - 18)], fill=NAVY, width=6)
            d.polygon(
                [(cx + 18, cy - 24), (cx + 30, cy - 12), (cx + 22, cy - 8), (cx + 10, cy - 20)],
                fill=GOLD,
            )
            d.line([(cx - 16, cy - 16), (cx + 16, cy + 16)], fill=CORAL, width=4)
        elif kind == "body":
            # Whole-body silhouette
            d.ellipse((cx - 14, cy - 34, cx + 14, cy - 8), fill=TEAL)
            d.rounded_rectangle((cx - 22, cy - 6, cx + 22, cy + 34), 12, fill=TEAL)
        else:
            # Cycle arcs
            d.arc((cx - 26, cy - 26, cx + 26, cy + 26), 40, 300, fill=NAVY, width=5)
            d.polygon([(cx + 18, cy - 22), (cx + 34, cy - 10), (cx + 14, cy - 6)], fill=NAVY)

    save(im, "hipec-vs-chemo-compare.webp")


def systemic_chemo():
    """Systemic chemotherapy: medicine through bloodstream across the body."""
    im, d = canvas()
    draw_woman(d, 60, 200, scale=1.05)
    thought_bubble(d, 330, 170, r=46)

    # Large body silhouette circle
    cx, cy, r = 900, 450, 260
    d.ellipse((cx - r, cy - r, cx + r, cy + r), outline=NAVY, width=8)
    d.ellipse((cx - r + 24, cy - r + 24, cx + r - 24, cy + r - 24), fill=(230, 242, 250))
    # Body
    d.ellipse((cx - 36, cy - 170, cx + 36, cy - 100), fill=TEAL)
    d.rounded_rectangle((cx - 70, cy - 100, cx + 70, cy + 120), 36, fill=TEAL)
    d.rounded_rectangle((cx - 110, cy - 70, cx - 60, cy + 40), 20, fill=TEAL)
    d.rounded_rectangle((cx + 60, cy - 70, cx + 110, cy + 40), 20, fill=TEAL)
    # Bloodstream path / circulating drug
    d.arc((cx - 140, cy - 140, cx + 140, cy + 140), 200, 340, fill=CORAL, width=10)
    d.arc((cx - 100, cy - 80, cx + 100, cy + 120), 20, 160, fill=GOLD, width=8)
    for px, py in ((cx - 40, cy - 40), (cx + 50, cy + 10), (cx - 10, cy + 70), (cx + 30, cy - 90)):
        d.ellipse((px - 10, py - 10, px + 10, py + 10), fill=CORAL)

    # IV bag icon
    icon_circle(d, 1280, 220, 64)
    d.rounded_rectangle((1260, 180, 1300, 240), 8, fill=SOFT_BLUE2, outline=NAVY, width=3)
    d.ellipse((1268, 188, 1292, 212), fill=CORAL)
    d.line([(1280, 240), (1280, 270)], fill=NAVY, width=4)
    dashed_line(d, 1100, 320, 1280, 280)

    # Tablet / cycle icon
    icon_circle(d, 1320, 480, 58)
    d.ellipse((1295, 455, 1345, 505), fill=GOLD, outline=NAVY, width=3)
    d.chord((1295, 455, 1345, 505), 90, 270, fill=WHITE)
    dashed_line(d, 1120, 480, 1260, 480)

    # Multi-organ dots icon
    icon_circle(d, 1240, 720, 58)
    for ox, oy in ((-16, -10), (12, -14), (0, 14)):
        d.ellipse((1240 + ox - 10, 720 + oy - 10, 1240 + ox + 10, 720 + oy + 10), fill=CORAL)
    dashed_line(d, 1040, 620, 1200, 700)

    save(im, "hipec-vs-chemo-systemic.webp")


def hipec_procedure():
    """CRS-HIPEC: visible deposit removal + heated abdominal perfusion."""
    im, d = canvas()
    # Two-panel Canva cards
    d.rounded_rectangle((60, 80, 760, 820), 36, fill=WHITE, outline=SOFT_BLUE2, width=5)
    d.rounded_rectangle((840, 80, 1540, 820), 36, fill=WHITE, outline=SOFT_BLUE2, width=5)

    # Left: cytoreduction
    abdomen_diagram(d, 410, 420, radius=200, deposits=True, heat=False)
    # Cross marks over deposits
    for dx, dy in ((-70, 80), (40, -70), (70, 60)):
        x, y = 410 + dx, 420 + dy
        d.line([(x - 16, y - 16), (x + 16, y + 16)], fill=NAVY, width=5)
        d.line([(x + 16, y - 16), (x - 16, y + 16)], fill=NAVY, width=5)
    icon_circle(d, 410, 720, 50)
    d.line([(390, 720), (430, 720)], fill=NAVY, width=6)
    d.line([(410, 700), (410, 740)], fill=NAVY, width=6)
    d.ellipse((398, 708, 422, 732), outline=CORAL, width=4)

    # Right: HIPEC heat perfusion
    abdomen_diagram(d, 1190, 420, radius=200, deposits=False, heat=True)
    icon_circle(d, 1190, 720, 50)
    d.arc((1170, 700, 1210, 740), 210, 330, fill=GOLD, width=5)
    d.ellipse((1182, 714, 1198, 730), fill=CORAL)

    save(im, "hipec-vs-chemo-hipec.webp")


def decision_pci():
    """When each treatment is considered — PCI regions + fitness / extent icons."""
    im, d = canvas()
    draw_woman(d, 30, 220, scale=1.0)
    thought_bubble(d, 300, 180, r=44)

    # PCI-style abdomen grid in circle
    cx, cy = 820, 450
    d.ellipse((cx - 250, cy - 250, cx + 250, cy + 250), outline=NAVY, width=8)
    d.ellipse((cx - 220, cy - 220, cx + 220, cy + 220), fill=SOFT_BLUE)
    xs = (cx - 150, cx - 40, cx + 70)
    ys = (cy - 150, cy - 40, cy + 70)
    palette = [
        (200, 230, 220),
        (186, 220, 240),
        (255, 220, 200),
        (200, 230, 220),
        (255, 210, 210),
        (186, 220, 240),
        (200, 230, 220),
        (255, 230, 170),
        (186, 220, 240),
    ]
    i = 0
    for y in ys:
        for x in xs:
            d.rounded_rectangle((x, y, x + 100, y + 100), 16, fill=palette[i], outline=NAVY, width=4)
            i += 1

    # Peripheral decision icons
    icons = [
        (1220, 180, "scan"),
        (1380, 360, "heart"),
        (1360, 560, "globe"),
        (1180, 740, "scale"),
    ]
    for ix, iy, kind in icons:
        dashed_line(d, 1020, 450, ix, iy)
        icon_circle(d, ix, iy, 56)
        if kind == "scan":
            d.rounded_rectangle((ix - 22, iy - 28, ix + 22, iy + 28), 8, outline=NAVY, width=4)
            d.ellipse((ix - 12, iy - 12, ix + 12, iy + 12), fill=CORAL)
        elif kind == "heart":
            d.ellipse((ix - 22, iy - 10, ix - 2, iy + 10), fill=CORAL)
            d.ellipse((ix + 2, iy - 10, ix + 22, iy + 10), fill=CORAL)
            d.polygon([(ix - 24, iy), (ix + 24, iy), (ix, iy + 28)], fill=CORAL)
        elif kind == "globe":
            d.ellipse((ix - 24, iy - 24, ix + 24, iy + 24), outline=TEAL, width=4)
            d.arc((ix - 24, iy - 24, ix + 24, iy + 24), 200, 340, fill=NAVY, width=3)
            d.line([(ix, iy - 24), (ix, iy + 24)], fill=NAVY, width=3)
        else:
            # Balance / choose
            d.line([(ix, iy - 28), (ix, iy + 10)], fill=NAVY, width=5)
            d.line([(ix - 28, iy + 10), (ix + 28, iy + 10)], fill=NAVY, width=5)
            d.ellipse((ix - 30, iy + 12, ix - 10, iy + 32), fill=GOLD)
            d.ellipse((ix + 10, iy + 12, ix + 30, iy + 32), fill=CORAL)

    save(im, "hipec-vs-chemo-decision.webp")


if __name__ == "__main__":
    compare_hero()
    systemic_chemo()
    hipec_procedure()
    decision_pci()
