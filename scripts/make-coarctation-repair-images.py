#!/usr/bin/env python3
"""Human-designed Canva-style coarctation diagrams (1280x720 WebP)."""

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


def aorta(draw, cx, cy, narrow=True, color=NAVY):
    draw.arc((cx - 70, cy - 90, cx + 70, cy + 50), 200, 340, fill=color, width=16)
    draw.line((cx + 62, cy - 20, cx + 62, cy + 110), fill=color, width=16)
    if narrow:
        draw.line((cx + 62, cy + 8, cx + 62, cy + 42), fill=CORAL, width=6)
        draw.ellipse((cx + 48, cy + 14, cx + 76, cy + 42), outline=CORAL, width=5)
    else:
        draw.line((cx + 62, cy - 20, cx + 62, cy + 110), fill=TEAL, width=16)


def make_hero():
    im = Image.new("RGB", (1280, 720), (8, 22, 38))
    layer = Image.new("RGBA", (1280, 720), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    for box in [
        (20, -70, 540, 380, (26, 122, 140, 48)),
        (720, 40, 1420, 760, (196, 84, 84, 36)),
        (280, 240, 1060, 880, (15, 44, 76, 70)),
    ]:
        d.ellipse(box[:4], fill=box[4])
    d.arc((500, 160, 780, 440), 200, 340, fill=(188, 214, 222, 130), width=22)
    d.line((742, 300, 742, 560), fill=(188, 214, 222, 130), width=22)
    d.ellipse((710, 360, 774, 424), outline=(196, 84, 84, 160), width=10)
    blurred = layer.filter(ImageFilter.GaussianBlur(1.4))
    im = Image.alpha_composite(im.convert("RGBA"), blurred).convert("RGB")
    save(im, "coarctation-hero.webp")


def make_anatomy():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(
        d,
        "WHAT COARCTATION DOES TO BLOOD FLOW",
        "A narrow aorta raises pressure in the arms and reduces flow to the legs.",
    )
    tiles = [
        (48, 130, 424, 680, TEAL, "UPPER BODY", "Arms and head see higher pressure. Headaches and hypertension are common clues."),
        (452, 130, 828, 680, CORAL, "THE NARROWING", "Usually near the ductus site. The left ventricle must pump harder through the pinch."),
        (856, 130, 1232, 680, PURPLE, "LOWER BODY", "Legs may have weak pulses, cold feet and a lower blood-pressure reading."),
    ]
    title_f = font(BOLD, 18)
    body_f = font(SANS, 17)
    for x1, y1, x2, y2, accent, title, copy in tiles:
        rounded(d, (x1, y1, x2, y2), CARD, 24, outline=LINE, width=2)
        d.rounded_rectangle((x1, y1, x2, y1 + 104), radius=24, fill=accent)
        d.rectangle((x1, y1 + 74, x2, y1 + 104), fill=accent)
        center_text(d, ((x1 + x2) / 2, y1 + 52), title, title_f, WHITE)
        cx = (x1 + x2) / 2
        if "UPPER" in title:
            d.ellipse((cx - 54, 250, cx + 54, 358), outline=accent, width=10)
        elif "NARROW" in title:
            aorta(d, cx, 330, True, accent)
        else:
            d.rounded_rectangle((cx - 18, 250, cx + 18, 430), radius=12, outline=accent, width=8)
        wrap_center(d, cx, 480, copy, body_f, INK, x2 - x1 - 40)
    save(im, "coarctation-anatomy.webp")


def make_decision():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(
        d,
        "SURGERY, BALLOON OR STENT",
        "GAF coarctation repair planning is $6,000–$15,000. Age and anatomy decide the product.",
    )
    tiles = [
        (40, 128, 340, 680, CORAL, "SURGERY", "Common in newborns and young children with significant obstruction."),
        (360, 128, 660, 680, TEAL, "BALLOON", "A catheter inflates the narrow segment. Often used for selected older or recurrent cases."),
        (680, 128, 980, 680, GOLD, "STENT", "A metal scaffold holds the aorta open in suitable older children and adults."),
        (1000, 128, 1240, 680, PURPLE, "RE-DO", "Recoarctation may need balloon, stent or another operation after imaging."),
    ]
    title_f = font(BOLD, 16)
    body_f = font(SANS, 16)
    for x1, y1, x2, y2, accent, title, copy in tiles:
        rounded(d, (x1, y1, x2, y2), CARD, 22, outline=LINE, width=2)
        d.rounded_rectangle((x1, y1, x2, y1 + 96), radius=22, fill=accent)
        d.rectangle((x1, y1 + 70, x2, y1 + 96), fill=accent)
        center_text(d, ((x1 + x2) / 2, y1 + 48), title, title_f, WHITE)
        cx = (x1 + x2) / 2
        if title == "SURGERY":
            aorta(d, cx, 320, False, accent)
        elif title == "BALLOON":
            d.ellipse((cx - 28, 290, cx + 28, 390), outline=accent, width=8)
        elif title == "STENT":
            d.rounded_rectangle((cx - 16, 260, cx + 16, 420), radius=8, outline=accent, width=6)
            for y in range(280, 410, 22):
                d.line((cx - 16, y, cx + 16, y), fill=accent, width=3)
        else:
            d.arc((cx - 40, 290, cx + 40, 370), 40, 300, fill=accent, width=8)
        wrap_center(d, cx, 480, copy, body_f, INK, x2 - x1 - 24)
    save(im, "coarctation-decision.webp")


def make_techniques():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(
        d,
        "HOW SURGEONS WIDEN THE AORTA",
        "End-to-end, extended repair, patch or graft. The congenital team names the technique after imaging.",
    )
    tiles = [
        (40, 128, 340, 680, TEAL, "END-TO-END", "The narrow piece is removed and the healthy ends are joined."),
        (360, 128, 660, 680, CORAL, "EXTENDED", "The join is carried into a small arch so the pathway stays wide."),
        (680, 128, 980, 680, GOLD, "PATCH", "A patch enlarges a longer narrow segment when a simple join will not fit."),
        (1000, 128, 1240, 680, PURPLE, "GRAFT", "A tube or bypass graft may be used in older or complex anatomy."),
    ]
    title_f = font(BOLD, 16)
    body_f = font(SANS, 16)
    for x1, y1, x2, y2, accent, title, copy in tiles:
        rounded(d, (x1, y1, x2, y2), CARD, 22, outline=LINE, width=2)
        d.rounded_rectangle((x1, y1, x2, y1 + 96), radius=22, fill=accent)
        d.rectangle((x1, y1 + 70, x2, y1 + 96), fill=accent)
        center_text(d, ((x1 + x2) / 2, y1 + 48), title, title_f, WHITE)
        cx = (x1 + x2) / 2
        d.line((cx, 250, cx, 420), fill=accent, width=14)
        if title == "END-TO-END":
            d.line((cx - 18, 330, cx + 18, 330), fill=WHITE, width=4)
        elif title == "EXTENDED":
            d.arc((cx - 30, 250, cx + 30, 330), 200, 340, fill=accent, width=10)
        elif title == "PATCH":
            d.ellipse((cx - 22, 310, cx + 22, 370), fill=GOLD)
        else:
            d.line((cx + 22, 270, cx + 22, 400), fill=PURPLE, width=8)
            d.line((cx, 280, cx + 22, 300), fill=PURPLE, width=6)
            d.line((cx, 390, cx + 22, 370), fill=PURPLE, width=6)
        wrap_center(d, cx, 470, copy, body_f, INK, x2 - x1 - 24)
    save(im, "coarctation-techniques.webp")


def make_steps():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(
        d,
        "COARCTATION JOURNEY IN INDIA",
        "GAF coarctation repair is $6,000–$15,000. Stay is typically 6–14 nights; parent stay expected.",
    )
    steps = [
        ("1", "ECHO", "Four-limb BP and scan"),
        ("2", "TEAM", "Surgery vs balloon"),
        ("3", "PLAN", "Name the repair"),
        ("4", "THEATRE", "Widen the aorta"),
        ("5", "ICU", "Pressure and pulses"),
        ("6", "WATCH", "Lifelong BP imaging"),
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
        "A critically ill newborn belongs in a local emergency department. WhatsApp is for planned records, not shock.",
        font(SANS, 16),
        MUTED,
    )
    save(im, "coarctation-steps.webp")


if __name__ == "__main__":
    make_hero()
    make_anatomy()
    make_decision()
    make_techniques()
    make_steps()
