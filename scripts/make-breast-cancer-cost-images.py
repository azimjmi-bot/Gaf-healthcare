#!/usr/bin/env python3
"""Canva-style unlabeled WebPs for breast cancer cost blog refresh."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter

OUT = Path("public/uploads/articles")
REF = Path("/home/ubuntu/.cursor/projects/agent-repos-Gaf-healthcare/assets/57593030-dc29-47d1-9eff-ea2f85bf863e.jpg")
W, H = 1600, 900
BG, SOFT, SOFT2 = (245, 250, 255), (210, 230, 245), (186, 220, 240)
NAVY, TEAL, CORAL, RED = (30, 58, 95), (56, 140, 160), (220, 70, 80), (200, 45, 55)
PINK, FLESH, GOLD, WHITE, LINE = (240, 170, 175), (235, 190, 175), (230, 180, 70), (255, 255, 255), (160, 190, 210)


def canvas():
    im = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(im)
    d.ellipse((-120, -80, 520, 420), fill=SOFT)
    d.ellipse((1080, 480, 1780, 1080), fill=(230, 242, 250))
    return im, d


def save(im, name):
    OUT.mkdir(parents=True, exist_ok=True)
    p = OUT / name
    im.save(p, "WEBP", quality=82, method=6)
    print("wrote", p, p.stat().st_size)


def dashed(d, x1, y1, x2, y2):
    import math
    dx, dy = x2 - x1, y2 - y1
    L = math.hypot(dx, dy) or 1
    ux, uy, t, on = dx / L, dy / L, 0.0, True
    while t < L:
        seg = min(14, L - t)
        if on:
            d.line([(x1 + ux * t, y1 + uy * t), (x1 + ux * (t + seg), y1 + uy * (t + seg))], fill=LINE, width=3)
        on = not on
        t += seg


def paste_patient(base, ox=15, oy=120, scale=1.0):
    src = Image.open(REF).convert("RGBA")
    left = src.crop((20, 40, 520, 700)).resize((520, 700), Image.Resampling.LANCZOS)
    m = Image.new("L", left.size, 0)
    ImageDraw.Draw(m).ellipse((20, 20, 500, 680), fill=255)
    ImageDraw.Draw(m).rectangle((40, 80, 360, 680), fill=255)
    left.putalpha(m.filter(ImageFilter.GaussianBlur(18)))
    if scale != 1.0:
        left = left.resize((int(left.width * scale), int(left.height * scale)), Image.Resampling.LANCZOS)
    base.paste(left, (ox, oy), left)


def icon(d, cx, cy, r=54):
    d.ellipse((cx - r - 4, cy - r - 4, cx + r + 4, cy + r + 4), fill=SOFT2)
    d.ellipse((cx - r, cy - r, cx + r, cy + r), fill=WHITE, outline=SOFT2, width=3)


def breast(d, cx, cy, r=200):
    d.ellipse((cx - r, cy - r, cx + r, cy + r), outline=NAVY, width=8)
    d.ellipse((cx - r + 20, cy - r + 20, cx + r - 20, cy + r - 20), fill=(255, 235, 230))
    d.ellipse((cx - 110, cy - 80, cx + 110, cy + 130), fill=FLESH, outline=PINK, width=4)
    d.ellipse((cx - 28, cy + 16, cx + 28, cy + 72), fill=PINK)
    d.ellipse((cx - 60, cy - 30, cx - 20, cy + 10), fill=CORAL)


def cost_stack():
    im, d = canvas()
    paste_patient(im, 10, 100, 1.05)
    d = ImageDraw.Draw(im)
    breast(d, 760, 420, 190)
    # stacked cost bars
    bars = [(GOLD, 180), (TEAL, 240), (CORAL, 300), (NAVY, 360), (RED, 420)]
    x0, y0 = 1080, 700
    for i, (fill, w) in enumerate(bars):
        y = y0 - i * 70
        d.rounded_rectangle((x0, y - 40, x0 + w, y + 10), 12, fill=fill)
    icons = [(1500, 200, "surg"), (1500, 360, "chemo"), (1500, 520, "rad"), (1500, 680, "drug")]
    for cx, cy, kind in icons:
        dashed(d, 930, 420, cx - 40, cy)
        icon(d, cx, cy, 48)
        if kind == "surg":
            d.line([(cx - 14, cy + 10), (cx + 14, cy - 10)], fill=NAVY, width=4)
        elif kind == "chemo":
            d.rounded_rectangle((cx - 10, cy - 20, cx + 10, cy + 4), 3, fill=CORAL)
        elif kind == "rad":
            d.ellipse((cx - 16, cy - 16, cx + 16, cy + 16), outline=TEAL, width=3)
        else:
            d.ellipse((cx - 14, cy - 10, cx + 14, cy + 10), fill=GOLD)
    save(im, "breast-cancer-cost-stack.webp")


def surgery_options():
    im, d = canvas()
    d.rounded_rectangle((60, 80, 760, 820), 28, fill=WHITE, outline=SOFT2, width=4)
    d.rounded_rectangle((840, 80, 1540, 820), 28, fill=WHITE, outline=SOFT2, width=4)
    breast(d, 410, 380, 180)
    d.ellipse((360, 340, 400, 380), outline=GOLD, width=4)
    breast(d, 1190, 380, 180)
    d.arc((1190 - 100, 380 - 20, 1190 + 100, 380 + 120), 200, 340, fill=CORAL, width=8)
    icon(d, 410, 700, 48)
    d.ellipse((398, 688, 422, 712), fill=GOLD)
    icon(d, 1190, 700, 48)
    d.ellipse((1178, 688, 1202, 712), fill=CORAL)
    save(im, "breast-cancer-cost-surgery.webp")


def estimate_pathway():
    im, d = canvas()
    paste_patient(im, 20, 130, 1.0)
    d = ImageDraw.Draw(im)
    breast(d, 740, 420, 180)
    steps = [(1080, 180), (1240, 340), (1380, 500), (1240, 680), (1080, 780)]
    for i, (cx, cy) in enumerate(steps):
        dashed(d, 900, 420, cx, cy)
        icon(d, cx, cy, 50)
        d.ellipse((cx - 12, cy - 12, cx + 12, cy + 12), fill=[GOLD, TEAL, CORAL, NAVY, RED][i])
    save(im, "breast-cancer-cost-estimate.webp")


def international():
    im, d = canvas()
    paste_patient(im, 15, 120, 1.0)
    d = ImageDraw.Draw(im)
    breast(d, 760, 400, 180)
    # travel / stay icons
    icons = [(1180, 180, "plane"), (1400, 340, "hotel"), (1360, 540, "docs"), (1120, 720, "follow")]
    for cx, cy, kind in icons:
        dashed(d, 920, 400, cx, cy)
        icon(d, cx, cy, 54)
        if kind == "plane":
            d.polygon([(cx - 24, cy), (cx + 24, cy - 8), (cx + 24, cy + 8)], fill=TEAL)
        elif kind == "hotel":
            d.rounded_rectangle((cx - 18, cy - 20, cx + 18, cy + 22), 4, outline=NAVY, width=3)
            d.rectangle((cx - 6, cy + 4, cx + 6, cy + 22), fill=CORAL)
        elif kind == "docs":
            d.rounded_rectangle((cx - 16, cy - 22, cx + 16, cy + 22), 4, outline=NAVY, width=3)
            d.line([(cx - 8, cy - 8), (cx + 8, cy - 8)], fill=CORAL, width=3)
        else:
            d.arc((cx - 18, cy - 18, cx + 18, cy + 18), 40, 300, fill=GOLD, width=4)
    save(im, "breast-cancer-cost-international.webp")


if __name__ == "__main__":
    cost_stack()
    surgery_options()
    estimate_pathway()
    international()
