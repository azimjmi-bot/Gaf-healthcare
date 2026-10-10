#!/usr/bin/env python3
"""Human-designed Canva-style PDA closure diagrams (1280x720 WebP)."""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

OUT = Path("/workspace/public/uploads/treatments")
OUT.mkdir(parents=True, exist_ok=True)

NAVY = (15, 44, 76)
TEAL = (26, 122, 140)
CORAL = (196, 84, 84)
GOLD = (196, 148, 64)
PURPLE = (98, 78, 148)
INK = (34, 48, 62)
MUTED = (90, 108, 122)
LINE = (210, 220, 226)
CARD = (247, 250, 252)
WHITE = (255, 255, 255)

SANS = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"


def font(path: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size)


def save(im: Image.Image, name: str) -> None:
    path = OUT / name
    im.save(path, "WEBP", quality=82, method=6)
    print(path, im.size)


def rounded(draw, box, fill, radius=22, outline=None, width=1):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def center_text(draw, xy, text, fnt, fill):
    x, y = xy
    bbox = draw.textbbox((0, 0), text, font=fnt)
    w, h = bbox[2] - bbox[0], bbox[3] - bbox[1]
    draw.text((x - w / 2, y - h / 2), text, font=fnt, fill=fill)


def wrap_center(draw, cx, y, text, fnt, fill, max_w):
    words = text.split()
    lines, cur = [], ""
    for word in words:
        trial = f"{cur} {word}".strip()
        if draw.textbbox((0, 0), trial, font=fnt)[2] <= max_w:
            cur = trial
        else:
            if cur:
                lines.append(cur)
            cur = word
    if cur:
        lines.append(cur)
    lh = draw.textbbox((0, 0), "Ag", font=fnt)[3]
    for i, line in enumerate(lines):
        center_text(draw, (cx, y + i * (lh + 6)), line, fnt, fill)


def header(draw, title: str, subtitle: str):
    draw.rectangle((0, 0, 1280, 92), fill=NAVY)
    draw.rectangle((0, 92, 1280, 96), fill=TEAL)
    center_text(draw, (640, 38), title, font(BOLD, 24), WHITE)
    center_text(draw, (640, 70), subtitle, font(SANS, 16), (188, 214, 222))


def vessel_pair(draw, cx, cy, open_duct=True, color=NAVY):
    """Two great vessels with an optional duct between them."""
    draw.arc((cx - 78, cy - 70, cx + 10, cy + 70), 270, 90, fill=color, width=14)
    draw.arc((cx - 10, cy - 70, cx + 78, cy + 70), 90, 270, fill=TEAL, width=14)
    draw.line((cx - 34, cy - 58, cx - 34, cy + 90), fill=color, width=14)
    draw.line((cx + 34, cy - 58, cx + 34, cy + 90), fill=TEAL, width=14)
    if open_duct:
        draw.ellipse((cx - 22, cy - 8, cx + 22, cy + 28), outline=CORAL, width=6)
        draw.line((cx - 18, cy + 10, cx + 18, cy + 10), fill=CORAL, width=8)
    else:
        draw.ellipse((cx - 16, cy - 4, cx + 16, cy + 24), fill=GOLD)
        draw.ellipse((cx - 16, cy - 4, cx + 16, cy + 24), outline=NAVY, width=3)


def make_hero():
    im = Image.new("RGB", (1280, 720), (8, 22, 38))
    layer = Image.new("RGBA", (1280, 720), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    for box in [
        (40, -80, 560, 400, (26, 122, 140, 50)),
        (700, 20, 1400, 740, (196, 84, 84, 34)),
        (260, 220, 1080, 900, (15, 44, 76, 72)),
    ]:
        d.ellipse(box[:4], fill=box[4])
    d.arc((430, 180, 620, 520), 270, 90, fill=(188, 214, 222, 140), width=20)
    d.arc((660, 180, 850, 520), 90, 270, fill=(26, 122, 140, 150), width=20)
    d.line((525, 200, 525, 560), fill=(188, 214, 222, 140), width=20)
    d.line((755, 200, 755, 560), fill=(26, 122, 140, 150), width=20)
    d.ellipse((600, 310, 680, 390), outline=(196, 84, 84, 170), width=10)
    d.line((618, 350, 662, 350), fill=(196, 84, 84, 170), width=10)
    blurred = layer.filter(ImageFilter.GaussianBlur(1.4))
    im = Image.alpha_composite(im.convert("RGBA"), blurred).convert("RGB")
    save(im, "pda-hero.webp")


def make_anatomy():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(
        d,
        "WHAT A PATENT DUCTUS DOES",
        "An open fetal vessel lets aortic blood flood the lungs and load the left heart.",
    )
    tiles = [
        (48, 130, 424, 680, TEAL, "AORTA", "High-pressure blood should go to the body. A PDA leaks some of it into the lungs."),
        (452, 130, 828, 680, CORAL, "THE DUCT", "The ductus should close after birth. When it stays open, a left-to-right shunt remains."),
        (856, 130, 1232, 680, PURPLE, "LUNGS AND LEFT HEART", "Extra lung flow can enlarge the left atrium and ventricle and raise pulmonary pressure."),
    ]
    title_f = font(BOLD, 18)
    body_f = font(SANS, 17)
    for x1, y1, x2, y2, accent, title, copy in tiles:
        rounded(d, (x1, y1, x2, y2), CARD, 24, outline=LINE, width=2)
        d.rounded_rectangle((x1, y1, x2, y1 + 104), radius=24, fill=accent)
        d.rectangle((x1, y1 + 74, x2, y1 + 104), fill=accent)
        center_text(d, ((x1 + x2) / 2, y1 + 52), title, title_f, WHITE)
        cx = (x1 + x2) / 2
        if title == "AORTA":
            d.arc((cx - 54, 250, cx + 54, 420), 200, 340, fill=accent, width=12)
            d.line((cx + 46, 330, cx + 46, 450), fill=accent, width=12)
        elif "DUCT" in title:
            vessel_pair(d, cx, 340, True, accent)
        else:
            d.ellipse((cx - 48, 260, cx + 48, 356), outline=accent, width=8)
            d.ellipse((cx - 22, 380, cx + 22, 450), outline=accent, width=6)
        wrap_center(d, cx, 500, copy, body_f, INK, x2 - x1 - 40)
    save(im, "pda-anatomy.webp")


def make_decision():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(
        d,
        "DEVICE, COIL, SURGERY OR WATCH",
        "GAF PDA closure planning is $3,500–$8,500. Anatomy, weight and pulmonary pressure decide.",
    )
    tiles = [
        (40, 128, 340, 680, TEAL, "DEVICE", "A catheter occluder closes many suitable PDAs without a chest incision."),
        (360, 128, 660, 680, GOLD, "COIL", "A small coil can close selected tiny ducts. Device choice follows echo, not age alone."),
        (680, 128, 980, 680, CORAL, "LIGATION", "Surgery remains important for tiny infants and unusual or failed catheter anatomy."),
        (1000, 128, 1240, 680, PURPLE, "OBSERVE", "A small, quiet PDA may close on its own. Not every duct needs a procedure."),
    ]
    title_f = font(BOLD, 16)
    body_f = font(SANS, 16)
    for x1, y1, x2, y2, accent, title, copy in tiles:
        rounded(d, (x1, y1, x2, y2), CARD, 22, outline=LINE, width=2)
        d.rounded_rectangle((x1, y1, x2, y1 + 96), radius=22, fill=accent)
        d.rectangle((x1, y1 + 70, x2, y1 + 96), fill=accent)
        center_text(d, ((x1 + x2) / 2, y1 + 48), title, title_f, WHITE)
        cx = (x1 + x2) / 2
        if title == "DEVICE":
            vessel_pair(d, cx, 330, False, accent)
        elif title == "COIL":
            d.arc((cx - 28, 290, cx + 28, 350), 40, 320, fill=accent, width=8)
            d.arc((cx - 16, 304, cx + 16, 336), 200, 500, fill=accent, width=6)
        elif title == "LIGATION":
            d.line((cx - 40, 300, cx + 40, 300), fill=accent, width=10)
            d.line((cx, 260, cx, 400), fill=accent, width=8)
            d.line((cx - 16, 292, cx + 16, 308), fill=WHITE, width=4)
        else:
            d.ellipse((cx - 34, 290, cx + 34, 358), outline=accent, width=8)
            d.arc((cx - 18, 308, cx + 18, 344), 200, 340, fill=accent, width=5)
        wrap_center(d, cx, 480, copy, body_f, INK, x2 - x1 - 24)
    save(im, "pda-decision.webp")


def make_device():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(
        d,
        "HOW TRANSCATHETER PDA CLOSURE WORKS",
        "Groin access, imaging, device seating, then a check that nearby vessels stay open.",
    )
    tiles = [
        (40, 128, 340, 680, TEAL, "ACCESS", "A thin catheter enters a groin vessel and is guided to the duct."),
        (360, 128, 660, 680, GOLD, "MAP", "Contrast and echo show length, diameter and nearby aorta and pulmonary artery."),
        (680, 128, 980, 680, CORAL, "SEAT", "The occluder expands across the duct so abnormal flow stops."),
        (1000, 128, 1240, 680, PURPLE, "CHECK", "The team confirms stability and looks for residual leak or vessel pinch."),
    ]
    title_f = font(BOLD, 16)
    body_f = font(SANS, 16)
    for x1, y1, x2, y2, accent, title, copy in tiles:
        rounded(d, (x1, y1, x2, y2), CARD, 22, outline=LINE, width=2)
        d.rounded_rectangle((x1, y1, x2, y1 + 96), radius=22, fill=accent)
        d.rectangle((x1, y1 + 70, x2, y1 + 96), fill=accent)
        center_text(d, ((x1 + x2) / 2, y1 + 48), title, title_f, WHITE)
        cx = (x1 + x2) / 2
        if title == "ACCESS":
            d.line((cx, 250, cx, 420), fill=accent, width=6)
            d.ellipse((cx - 10, 410, cx + 10, 430), fill=accent)
        elif title == "MAP":
            vessel_pair(d, cx, 330, True, accent)
        elif title == "SEAT":
            vessel_pair(d, cx, 330, False, accent)
        else:
            d.ellipse((cx - 36, 280, cx + 36, 352), outline=accent, width=7)
            d.line((cx - 8, 316, cx - 2, 328), fill=accent, width=5)
            d.line((cx - 2, 328, cx + 16, 300), fill=accent, width=5)
        wrap_center(d, cx, 470, copy, body_f, INK, x2 - x1 - 24)
    save(im, "pda-device.webp")


def make_steps():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(
        d,
        "PDA CLOSURE JOURNEY IN INDIA",
        "GAF PDA closure is $3,500–$8,500. Stay is typically 3–8 nights; parent stay expected.",
    )
    steps = [
        ("1", "ECHO", "Size, shunt, lungs"),
        ("2", "TEAM", "Device vs ligation"),
        ("3", "PLAN", "Name the product"),
        ("4", "LAB", "Close the duct"),
        ("5", "WATCH", "Site and residual"),
        ("6", "REVIEW", "Follow-up echo"),
    ]
    title_f = font(BOLD, 16)
    body_f = font(SANS, 15)
    num_f = font(BOLD, 24)
    xs = [50, 250, 450, 650, 850, 1050]
    for i, x in enumerate(xs[:-1]):
        d.line((x + 140, 360, xs[i + 1] + 20, 360), fill=TEAL, width=6)
    for x, (num, title, copy) in zip(xs, steps):
        rounded(d, (x, 180, x + 180, 560), CARD, 20, outline=LINE, width=2)
        d.ellipse((x + 60, 208, x + 120, 268), fill=TEAL)
        center_text(d, (x + 90, 238), num, num_f, WHITE)
        center_text(d, (x + 90, 310), title, title_f, NAVY)
        wrap_center(d, x + 90, 360, copy, body_f, MUTED, 150)
    center_text(
        d,
        (640, 640),
        "A premature or collapsing infant belongs in a local emergency department. WhatsApp is for planned records.",
        font(SANS, 16),
        MUTED,
    )
    save(im, "pda-steps.webp")


if __name__ == "__main__":
    make_hero()
    make_anatomy()
    make_decision()
    make_device()
    make_steps()
