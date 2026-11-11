#!/usr/bin/env python3
"""Canva-style unlabeled WebPs for breast cancer stages blog.

Soft clinical blue/white, patient cutout from the approved style reference,
breast diagrams by stage concept, peripheral icon arcs — no embedded text.
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

OUT = Path("public/uploads/articles")
REF = Path(
    "/home/ubuntu/.cursor/projects/agent-repos-Gaf-healthcare/assets/"
    "57593030-dc29-47d1-9eff-ea2f85bf863e.jpg"
)
W, H = 1600, 900
BG, SOFT, SOFT2 = (245, 250, 255), (210, 230, 245), (186, 220, 240)
NAVY, TEAL, CORAL, RED = (30, 58, 95), (56, 140, 160), (220, 70, 80), (200, 45, 55)
PINK, FLESH, GOLD, WHITE, LINE = (240, 170, 175), (235, 190, 175), (230, 180, 70), (255, 255, 255), (160, 190, 210)


def canvas():
    im = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(im)
    d.ellipse((-120, -80, 520, 420), fill=SOFT)
    d.ellipse((1080, 480, 1780, 1080), fill=(230, 242, 250))
    d.ellipse((700, -200, 1400, 280), fill=(236, 246, 255))
    return im, d


def save(im, name):
    OUT.mkdir(parents=True, exist_ok=True)
    path = OUT / name
    im.save(path, "WEBP", quality=82, method=6)
    print("wrote", path, path.stat().st_size)


def dashed(d, x1, y1, x2, y2, fill=LINE, width=3, dash=14):
    import math

    dx, dy = x2 - x1, y2 - y1
    length = math.hypot(dx, dy) or 1
    ux, uy = dx / length, dy / length
    t, draw = 0.0, True
    while t < length:
        seg = min(dash, length - t)
        if draw:
            sx, sy = x1 + ux * t, y1 + uy * t
            ex, ey = x1 + ux * (t + seg), y1 + uy * (t + seg)
            d.line([(sx, sy), (ex, ey)], fill=fill, width=width)
        draw = not draw
        t += seg


def paste_patient(base, ox=15, oy=120, scale=1.0):
    src = Image.open(REF).convert("RGBA")
    # Reference is 1280x720 — take left subject area and soft-mask it
    left = src.crop((20, 20, 480, 700)).resize((500, 700), Image.Resampling.LANCZOS)
    mask = Image.new("L", left.size, 0)
    ImageDraw.Draw(mask).ellipse((20, 20, 480, 680), fill=255)
    ImageDraw.Draw(mask).rectangle((40, 80, 340, 680), fill=255)
    left.putalpha(mask.filter(ImageFilter.GaussianBlur(18)))
    if scale != 1.0:
        left = left.resize(
            (int(left.width * scale), int(left.height * scale)),
            Image.Resampling.LANCZOS,
        )
    base.paste(left, (ox, oy), left)


def icon(d, cx, cy, r=54):
    d.ellipse((cx - r - 4, cy - r - 4, cx + r + 4, cy + r + 4), fill=SOFT2)
    d.ellipse((cx - r, cy - r, cx + r, cy + r), fill=WHITE, outline=SOFT2, width=3)


def breast(d, cx, cy, r=200, tumour_size=0, nodes=0, skin=False, distant=False):
    """Draw a circular breast anatomy frame with optional stage cues."""
    d.ellipse((cx - r, cy - r, cx + r, cy + r), outline=NAVY, width=8)
    fill = (255, 220, 220) if skin else (255, 235, 230)
    d.ellipse((cx - r + 20, cy - r + 20, cx + r - 20, cy + r - 20), fill=fill)
    d.ellipse((cx - 110, cy - 80, cx + 110, cy + 130), fill=FLESH, outline=PINK, width=4)
    d.ellipse((cx - 28, cy + 16, cx + 28, cy + 72), fill=PINK)
    d.ellipse((cx - 12, cy + 32, cx + 12, cy + 56), fill=(190, 100, 110))
    if tumour_size > 0:
        tr = 10 + tumour_size * 8
        d.ellipse((cx - 70, cy - 40, cx - 70 + tr * 2, cy - 40 + tr * 2), fill=CORAL, outline=RED, width=3)
        if tumour_size >= 3:
            d.ellipse((cx - 55, cy - 50, cx - 35, cy - 30), fill=RED)
    if nodes:
        for i in range(nodes):
            nx = cx + 130 + i * 8
            ny = cy - 60 + i * 28
            d.ellipse((nx - 10, ny - 10, nx + 10, ny + 10), fill=CORAL, outline=RED, width=2)
    if skin:
        d.arc((cx - 140, cy - 120, cx + 140, cy + 120), 200, 340, fill=CORAL, width=8)
        for i in range(-3, 4):
            for j in range(-2, 3):
                px, py = cx + i * 20, cy - 10 + j * 18
                if (px - cx) ** 2 + (py - cy) ** 2 < 9000:
                    d.ellipse((px - 2, py - 2, px + 2, py + 2), fill=(180, 80, 90))
    if distant:
        # small satellite dots suggesting spread beyond the frame
        for dx, dy in ((r + 30, -40), (r + 50, 20), (r + 20, 80)):
            d.ellipse((cx + dx - 8, cy + dy - 8, cx + dx + 8, cy + dy + 8), fill=GOLD, outline=RED, width=2)


def stages_overview():
    """Patient + central breast + five progressive stage icons on an arc."""
    im, d = canvas()
    paste_patient(im, 10, 100, 1.05)
    d = ImageDraw.Draw(im)
    breast(d, 760, 420, 190, tumour_size=2, nodes=1)

    # Five stage discs: 0 (in situ) → 4 (metastatic)
    stages = [
        (1100, 150, 0, GOLD),
        (1280, 250, 1, TEAL),
        (1380, 400, 2, CORAL),
        (1300, 560, 3, NAVY),
        (1120, 720, 4, RED),
    ]
    for cx, cy, level, accent in stages:
        dashed(d, 920, 420, cx - 40, cy)
        icon(d, cx, cy, 50)
        # Mini breast cue scaling with stage
        br = 14 + level * 4
        d.ellipse((cx - br, cy - br, cx + br, cy + br), outline=accent, width=3)
        if level == 0:
            d.ellipse((cx - 6, cy - 6, cx + 6, cy + 6), outline=GOLD, width=2)
        elif level >= 1:
            d.ellipse((cx - 8, cy - 10, cx + 4, cy + 2), fill=accent)
        if level >= 2:
            d.ellipse((cx + 10, cy - 4, cx + 20, cy + 6), fill=CORAL)
        if level >= 3:
            d.arc((cx - 22, cy - 22, cx + 22, cy + 22), 200, 340, fill=RED, width=3)
        if level >= 4:
            for ox, oy in ((-18, 16), (18, 16), (0, 24)):
                d.ellipse((cx + ox - 4, cy + oy - 4, cx + ox + 4, cy + oy + 4), fill=GOLD)
    save(im, "breast-cancer-stages-overview.webp")


def stages_tnm():
    """TNM concept: tumour / nodes / metastasis icon triad."""
    im, d = canvas()
    paste_patient(im, 20, 130, 1.0)
    d = ImageDraw.Draw(im)
    breast(d, 740, 420, 180, tumour_size=2, nodes=2)

    triad = [
        (1120, 180, "T"),
        (1360, 360, "N"),
        (1280, 620, "M"),
    ]
    for cx, cy, kind in triad:
        dashed(d, 900, 420, cx - 40, cy)
        icon(d, cx, cy, 58)
        if kind == "T":
            # Primary tumour
            d.ellipse((cx - 22, cy - 18, cx + 22, cy + 22), fill=CORAL, outline=RED, width=3)
            d.ellipse((cx - 10, cy - 28, cx + 6, cy - 12), fill=RED)
        elif kind == "N":
            # Node chain
            d.ellipse((cx - 20, cy - 24, cx + 8, cy + 4), outline=TEAL, width=4)
            d.ellipse((cx - 4, cy - 4, cx + 22, cy + 22), fill=CORAL)
            d.ellipse((cx + 8, cy + 10, cx + 26, cy + 28), fill=GOLD)
        else:
            # Distant spread rays
            d.ellipse((cx - 10, cy - 10, cx + 10, cy + 10), fill=NAVY)
            for ang in (0, 60, 120, 180, 240, 300):
                import math

                rad = math.radians(ang)
                d.line(
                    [
                        (cx + 14 * math.cos(rad), cy + 14 * math.sin(rad)),
                        (cx + 30 * math.cos(rad), cy + 30 * math.sin(rad)),
                    ],
                    fill=CORAL,
                    width=3,
                )
    save(im, "breast-cancer-stages-tnm.webp")


def stages_local_advanced():
    """Locally advanced: larger tumour, skin/node cues, treatment-sequence icons."""
    im, d = canvas()
    paste_patient(im, 15, 120, 1.0)
    d = ImageDraw.Draw(im)
    breast(d, 760, 420, 200, tumour_size=4, nodes=3, skin=True)

    icons = [
        (1180, 160, "nodes"),
        (1400, 320, "skin"),
        (1360, 520, "neoadj"),
        (1140, 720, "surg"),
    ]
    for cx, cy, kind in icons:
        dashed(d, 940, 420, cx - 40, cy)
        icon(d, cx, cy, 54)
        if kind == "nodes":
            for i, (ox, oy) in enumerate(((-12, -8), (6, -14), (14, 8))):
                d.ellipse((cx + ox - 8, cy + oy - 8, cx + ox + 8, cy + oy + 8), fill=CORAL if i else TEAL)
        elif kind == "skin":
            d.ellipse((cx - 24, cy - 20, cx + 24, cy + 28), fill=(255, 200, 200), outline=CORAL, width=4)
            for a in range(-2, 3):
                for b in range(-2, 3):
                    d.ellipse(
                        (cx + a * 7 - 2, cy + b * 7 - 2, cx + a * 7 + 2, cy + b * 7 + 2),
                        fill=CORAL,
                    )
        elif kind == "neoadj":
            d.rounded_rectangle((cx - 10, cy - 22, cx + 10, cy + 4), 3, fill=CORAL)
            d.ellipse((cx - 16, cy + 8, cx + 16, cy + 24), outline=TEAL, width=3)
        else:
            d.line([(cx - 16, cy + 12), (cx + 16, cy - 12)], fill=NAVY, width=4)
            d.ellipse((cx - 8, cy + 8, cx + 8, cy + 24), fill=GOLD)
    save(im, "breast-cancer-stages-local-advanced.webp")


def stages_metastatic():
    """Metastatic: distant organ icons (bone, liver, lung, brain)."""
    im, d = canvas()
    paste_patient(im, 15, 120, 1.0)
    d = ImageDraw.Draw(im)
    breast(d, 740, 400, 180, tumour_size=3, nodes=2, distant=True)

    organs = [
        (1120, 160, "bone"),
        (1360, 300, "liver"),
        (1380, 500, "lung"),
        (1180, 700, "brain"),
    ]
    for cx, cy, kind in organs:
        dashed(d, 900, 400, cx - 40, cy)
        icon(d, cx, cy, 56)
        if kind == "bone":
            d.rounded_rectangle((cx - 8, cy - 26, cx + 8, cy + 26), 4, fill=GOLD, outline=NAVY, width=2)
            d.ellipse((cx - 14, cy - 30, cx + 14, cy - 18), fill=TEAL)
            d.ellipse((cx - 14, cy + 18, cx + 14, cy + 30), fill=TEAL)
        elif kind == "liver":
            d.ellipse((cx - 24, cy - 16, cx + 20, cy + 24), fill=(200, 90, 90), outline=NAVY, width=3)
            d.ellipse((cx + 4, cy - 10, cx + 26, cy + 18), fill=CORAL)
        elif kind == "lung":
            d.ellipse((cx - 28, cy - 16, cx - 2, cy + 20), outline=TEAL, width=4)
            d.ellipse((cx + 2, cy - 16, cx + 28, cy + 20), outline=TEAL, width=4)
            d.ellipse((cx - 8, cy - 4, cx + 8, cy + 12), fill=SOFT2)
        else:
            d.ellipse((cx - 22, cy - 22, cx + 22, cy + 22), outline=NAVY, width=4)
            d.ellipse((cx - 10, cy - 8, cx + 10, cy + 12), fill=SOFT2)
            d.line([(cx - 4, cy - 20), (cx - 4, cy + 18)], fill=CORAL, width=2)
    save(im, "breast-cancer-stages-metastatic.webp")


if __name__ == "__main__":
    stages_overview()
    stages_tnm()
    stages_local_advanced()
    stages_metastatic()
