#!/usr/bin/env python3
"""Human-designed Canva-style LVAD diagrams (1280x720 WebP)."""

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
    center_text(draw, (640, 38), title, font(BOLD, 26), WHITE)
    center_text(draw, (640, 70), subtitle, font(SANS, 16), (188, 214, 222))


def pump(draw, cx, cy, accent=CORAL):
    draw.ellipse((cx - 42, cy - 42, cx + 42, cy + 42), fill=accent)
    draw.ellipse((cx - 18, cy - 18, cx + 18, cy + 18), fill=WHITE)
    draw.line((cx + 40, cy, cx + 90, cy - 40), fill=accent, width=10)
    draw.line((cx - 10, cy + 40, cx - 10, cy + 110), fill=GOLD, width=8)


def make_hero():
    im = Image.new("RGB", (1280, 720), (8, 22, 38))
    layer = Image.new("RGBA", (1280, 720), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    for box in [
        (20, -80, 560, 400, (26, 122, 140, 48)),
        (720, 40, 1400, 740, (196, 84, 84, 40)),
        (300, 280, 1020, 900, (15, 44, 76, 70)),
    ]:
        d.ellipse(box[:4], fill=box[4])
    d.ellipse((430, 240, 620, 430), fill=(196, 84, 84, 80))
    d.line((540, 420, 540, 620), fill=(196, 148, 64, 90), width=16)
    d.arc((780, 180, 1120, 520), 30, 240, fill=(188, 214, 222, 60), width=10)
    blurred = layer.filter(ImageFilter.GaussianBlur(1.4))
    im = Image.alpha_composite(im.convert("RGBA"), blurred).convert("RGB")
    save(im, "lvad-hero.webp")


def make_circuit():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(d, "HOW AN LVAD MOVES BLOOD", "Left ventricle to pump to aorta. The native heart stays. GAF planning is $70,000–$140,000.")
    tiles = [
        (48, 130, 424, 680, TEAL, "INFLOW", "A cannula draws blood from the failing left ventricle."),
        (452, 130, 828, 680, CORAL, "PUMP", "A continuous-flow pump moves that blood forward. It does not replace the heart."),
        (856, 130, 1232, 680, PURPLE, "OUTFLOW", "A graft returns blood to the aorta so the brain, kidneys and limbs are fed."),
    ]
    title_f = font(BOLD, 20)
    body_f = font(SANS, 17)
    for x1, y1, x2, y2, accent, title, copy in tiles:
        rounded(d, (x1, y1, x2, y2), CARD, 24, outline=LINE, width=2)
        d.rounded_rectangle((x1, y1, x2, y1 + 110), radius=24, fill=accent)
        d.rectangle((x1, y1 + 78, x2, y1 + 110), fill=accent)
        center_text(d, ((x1 + x2) / 2, y1 + 55), title, title_f, WHITE)
        cx = (x1 + x2) / 2
        pump(d, cx, 320, accent)
        wrap_center(d, cx, 460, copy, body_f, INK, x2 - x1 - 40)
    save(im, "lvad-circuit.webp")


def make_goals():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(d, "THE GOAL NAMES THE PRODUCT", "Bridge to transplant, destination therapy or recovery. Neighbouring transplant is $45,000–$95,000.")
    tiles = [
        (40, 130, 340, 680, CORAL, "BRIDGE", "Supports circulation while a donor heart is awaited. There is no live GAF transplant treatment page."),
        (360, 130, 660, 680, TEAL, "DESTINATION", "Long-term support when transplant is not the honest plan. Device clinic is lifelong."),
        (680, 130, 980, 680, GOLD, "RECOVERY", "Selected hearts may strengthen enough for later weaning. Formal testing is required."),
        (1000, 130, 1240, 680, PURPLE, "DECISION", "Buys time to judge transplant eligibility, organs and goals."),
    ]
    title_f = font(BOLD, 16)
    body_f = font(SANS, 16)
    for x1, y1, x2, y2, accent, title, copy in tiles:
        rounded(d, (x1, y1, x2, y2), CARD, 22, outline=LINE, width=2)
        d.rounded_rectangle((x1, y1, x2, y1 + 96), radius=22, fill=accent)
        d.rectangle((x1, y1 + 70, x2, y1 + 96), fill=accent)
        center_text(d, ((x1 + x2) / 2, y1 + 48), title, title_f, WHITE)
        cx = (x1 + x2) / 2
        pump(d, cx, 300, accent)
        wrap_center(d, cx, 430, copy, body_f, INK, x2 - x1 - 28)
    save(im, "lvad-goals.webp")


def make_risks():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(d, "THE RISKS THAT STAY AFTER DISCHARGE", "Bleeding, clot, driveline infection and right-heart failure are not brochure footnotes.")
    tiles = [
        (48, 130, 424, 680, CORAL, "BLEED / CLOT", "Anticoagulation balances stroke against bleeding. Never change doses on WhatsApp advice."),
        (452, 130, 828, 680, GOLD, "DRIVELINE", "The cable exits the skin. Redness, drainage or fever is a local emergency."),
        (856, 130, 1232, 680, PURPLE, "RIGHT HEART", "The pump supports the left side. The right ventricle can fail after implant."),
    ]
    title_f = font(BOLD, 20)
    body_f = font(SANS, 17)
    for x1, y1, x2, y2, accent, title, copy in tiles:
        rounded(d, (x1, y1, x2, y2), CARD, 24, outline=LINE, width=2)
        d.rounded_rectangle((x1, y1, x2, y1 + 110), radius=24, fill=accent)
        d.rectangle((x1, y1 + 78, x2, y1 + 110), fill=accent)
        center_text(d, ((x1 + x2) / 2, y1 + 55), title, title_f, WHITE)
        cx = (x1 + x2) / 2
        pump(d, cx, 320, accent)
        wrap_center(d, cx, 460, copy, body_f, INK, x2 - x1 - 40)
    save(im, "lvad-risks.webp")


def make_steps():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(d, "LVAD JOURNEY", "GAF LVAD implantation is $70,000–$140,000. Stay is typically 3–8 weeks with device training.")
    steps = [
        ("1", "RECORDS", "Echo, cath and organ tests"),
        ("2", "TEAM", "Goal and device are named"),
        ("3", "IMPLANT", "Inflow, pump, outflow, driveline"),
        ("4", "ICU", "Speed, right heart and bleed"),
        ("5", "TRAIN", "Batteries, alarms, dressings"),
        ("6", "CLINIC", "Lifelong LVAD follow-up"),
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
        "Neighbouring heart-transplant planning is $45,000–$95,000 when listing is the honest next product.",
        font(SANS, 16),
        MUTED,
    )
    save(im, "lvad-steps.webp")


if __name__ == "__main__":
    make_hero()
    make_circuit()
    make_goals()
    make_risks()
    make_steps()
