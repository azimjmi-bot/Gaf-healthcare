#!/usr/bin/env python3
"""Human-designed Canva-style Fontan diagrams (1280x720 WebP)."""

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


def single_ventricle(draw, cx, cy, accent=NAVY):
    draw.ellipse((cx - 42, cy - 20, cx + 42, cy + 70), outline=accent, width=10)
    draw.arc((cx - 28, cy - 70, cx + 28, cy - 8), 200, 340, fill=accent, width=10)
    draw.line((cx, cy + 70, cx, cy + 110), fill=accent, width=10)


def make_hero():
    im = Image.new("RGB", (1280, 720), (8, 22, 38))
    layer = Image.new("RGBA", (1280, 720), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    for box in [
        (20, -80, 540, 400, (26, 122, 140, 50)),
        (720, 20, 1420, 760, (98, 78, 148, 36)),
        (260, 220, 1080, 900, (15, 44, 76, 72)),
    ]:
        d.ellipse(box[:4], fill=box[4])
    d.ellipse((560, 280, 720, 500), outline=(188, 214, 222, 140), width=16)
    d.line((640, 180, 640, 280), fill=(26, 122, 140, 150), width=14)
    d.line((520, 240, 640, 300), fill=(196, 148, 64, 160), width=10)
    d.line((760, 240, 640, 300), fill=(196, 84, 84, 150), width=10)
    blurred = layer.filter(ImageFilter.GaussianBlur(1.4))
    im = Image.alpha_composite(im.convert("RGBA"), blurred).convert("RGB")
    save(im, "fontan-hero.webp")


def make_anatomy():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(
        d,
        "WHAT FONTAN CIRCULATION CHANGES",
        "Venous blood reaches the lungs without a pumping ventricle. The single ventricle serves the body.",
    )
    tiles = [
        (48, 130, 424, 680, TEAL, "ONE VENTRICLE", "One chamber must do the work of two. A two-ventricle repair is not assumed."),
        (452, 130, 828, 680, GOLD, "PASSIVE LUNGS", "Body veins go to the pulmonary arteries. There is no dedicated lung pump."),
        (856, 130, 1232, 680, PURPLE, "BODY PUMP", "The functioning ventricle then sends oxygen-rich blood to the aorta."),
    ]
    title_f = font(BOLD, 18)
    body_f = font(SANS, 17)
    for x1, y1, x2, y2, accent, title, copy in tiles:
        rounded(d, (x1, y1, x2, y2), CARD, 24, outline=LINE, width=2)
        d.rounded_rectangle((x1, y1, x2, y1 + 104), radius=24, fill=accent)
        d.rectangle((x1, y1 + 74, x2, y1 + 104), fill=accent)
        center_text(d, ((x1 + x2) / 2, y1 + 52), title, title_f, WHITE)
        cx = (x1 + x2) / 2
        if "VENTRICLE" in title and "ONE" in title:
            single_ventricle(d, cx, 320, accent)
        elif "LUNGS" in title:
            d.ellipse((cx - 50, 270, cx - 8, 360), outline=accent, width=8)
            d.ellipse((cx + 8, 270, cx + 50, 360), outline=accent, width=8)
            d.line((cx, 250, cx, 400), fill=GOLD, width=8)
        else:
            d.rounded_rectangle((cx - 16, 250, cx + 16, 430), radius=10, outline=accent, width=8)
            d.ellipse((cx - 28, 410, cx + 28, 460), outline=accent, width=6)
        wrap_center(d, cx, 500, copy, body_f, INK, x2 - x1 - 40)
    save(im, "fontan-anatomy.webp")


def make_stages():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(
        d,
        "FONTAN IS USUALLY STAGE THREE",
        "GAF Fontan planning is $9,000–$22,000. Glenn and Norwood have sheets, not live treatment pages.",
    )
    tiles = [
        (40, 128, 340, 680, CORAL, "STAGE 1", "Neonatal palliation, sometimes a Norwood-type operation, supports the infant first."),
        (360, 128, 660, 680, GOLD, "STAGE 2", "Bidirectional Glenn sends upper-body venous blood to the lungs."),
        (680, 128, 980, 680, TEAL, "STAGE 3", "Fontan completion adds lower-body venous return to the pulmonary arteries."),
        (1000, 128, 1240, 680, PURPLE, "WATCH", "Fontan circulation is lifelong. Liver, rhythm and the ventricle stay under review."),
    ]
    title_f = font(BOLD, 16)
    body_f = font(SANS, 16)
    for x1, y1, x2, y2, accent, title, copy in tiles:
        rounded(d, (x1, y1, x2, y2), CARD, 22, outline=LINE, width=2)
        d.rounded_rectangle((x1, y1, x2, y1 + 96), radius=22, fill=accent)
        d.rectangle((x1, y1 + 70, x2, y1 + 96), fill=accent)
        center_text(d, ((x1 + x2) / 2, y1 + 48), title, title_f, WHITE)
        cx = (x1 + x2) / 2
        if title == "STAGE 1":
            single_ventricle(d, cx, 310, accent)
        elif title == "STAGE 2":
            d.line((cx - 30, 260, cx, 340), fill=accent, width=10)
            d.line((cx + 30, 260, cx, 340), fill=accent, width=10)
            d.ellipse((cx - 16, 340, cx + 16, 400), outline=accent, width=7)
        elif title == "STAGE 3":
            d.line((cx, 250, cx, 420), fill=accent, width=12)
            d.arc((cx - 36, 300, cx + 36, 400), 200, 340, fill=accent, width=10)
        else:
            d.ellipse((cx - 34, 290, cx + 34, 358), outline=accent, width=8)
            d.arc((cx - 16, 308, cx + 16, 340), 40, 300, fill=accent, width=5)
        wrap_center(d, cx, 470, copy, body_f, INK, x2 - x1 - 24)
    save(im, "fontan-stages.webp")


def make_types():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(
        d,
        "HOW SURGEONS COMPLETE THE FONTAN",
        "Extracardiac conduit, lateral tunnel or a fenestration. Anatomy and previous stages decide.",
    )
    tiles = [
        (40, 128, 340, 680, TEAL, "CONDUIT", "An extracardiac tube connects the inferior vena cava to the pulmonary arteries."),
        (360, 128, 660, 680, GOLD, "TUNNEL", "A lateral tunnel inside the atrium redirects lower-body venous blood."),
        (680, 128, 980, 680, CORAL, "FENESTRATION", "A small controlled leak can lower venous pressure early after completion."),
        (1000, 128, 1240, 680, PURPLE, "ADD-ONS", "Valve work, pulmonary-artery reconstruction or collaterals may be named in the same sitting."),
    ]
    title_f = font(BOLD, 16)
    body_f = font(SANS, 16)
    for x1, y1, x2, y2, accent, title, copy in tiles:
        rounded(d, (x1, y1, x2, y2), CARD, 22, outline=LINE, width=2)
        d.rounded_rectangle((x1, y1, x2, y1 + 96), radius=22, fill=accent)
        d.rectangle((x1, y1 + 70, x2, y1 + 96), fill=accent)
        center_text(d, ((x1 + x2) / 2, y1 + 48), title, title_f, WHITE)
        cx = (x1 + x2) / 2
        if title == "CONDUIT":
            d.rounded_rectangle((cx - 14, 250, cx + 14, 420), radius=8, outline=accent, width=8)
        elif title == "TUNNEL":
            d.arc((cx - 40, 270, cx + 40, 410), 200, 340, fill=accent, width=10)
            d.line((cx - 30, 400, cx + 30, 400), fill=accent, width=8)
        elif title == "FENESTRATION":
            d.ellipse((cx - 36, 290, cx + 36, 370), outline=accent, width=8)
            d.ellipse((cx - 8, 322, cx + 8, 338), fill=CORAL)
        else:
            d.line((cx - 28, 300, cx + 28, 300), fill=accent, width=8)
            d.line((cx, 260, cx, 400), fill=accent, width=8)
        wrap_center(d, cx, 470, copy, body_f, INK, x2 - x1 - 24)
    save(im, "fontan-types.webp")


def make_steps():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(
        d,
        "FONTAN JOURNEY IN INDIA",
        "GAF Fontan procedure is $9,000–$22,000. Stay is typically 10–18 nights; parent stay expected.",
    )
    steps = [
        ("1", "ECHO", "Cath and veins"),
        ("2", "STAGE", "Glenn already done?"),
        ("3", "PLAN", "Name the Fontan"),
        ("4", "THEATRE", "Complete TCPC"),
        ("5", "ICU", "Fluid and drains"),
        ("6", "WATCH", "Heart and liver"),
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
        "A collapsing single-ventricle child belongs in a local emergency department. WhatsApp is for planned records.",
        font(SANS, 16),
        MUTED,
    )
    save(im, "fontan-steps.webp")


if __name__ == "__main__":
    make_hero()
    make_anatomy()
    make_stages()
    make_types()
    make_steps()
