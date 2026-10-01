#!/usr/bin/env python3
"""Human-designed Canva-style CABG educational diagrams (1280x720 WebP)."""

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
PINK = (232, 120, 132)
VESSEL = (196, 64, 78)
GRAFT = (26, 140, 118)

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
    center_text(draw, (640, 38), title, font(BOLD, 28), WHITE)
    center_text(draw, (640, 70), subtitle, font(SANS, 16), (188, 214, 222))


def draw_heart(draw, cx, cy, scale=1.0, fill=(196, 72, 86), outline=None):
    """Simple two-lobe heart used as a medical diagram, not decoration."""
    s = scale
    left = [cx - 70 * s, cy - 10 * s]
    right = [cx + 70 * s, cy - 10 * s]
    tip = [cx, cy + 110 * s]
    draw.ellipse(
        (cx - 92 * s, cy - 78 * s, cx + 8 * s, cy + 28 * s),
        fill=fill,
        outline=outline,
        width=3 if outline else 0,
    )
    draw.ellipse(
        (cx - 8 * s, cy - 78 * s, cx + 92 * s, cy + 28 * s),
        fill=fill,
        outline=outline,
        width=3 if outline else 0,
    )
    draw.polygon(
        [
            (cx - 88 * s, cy - 4 * s),
            (cx + 88 * s, cy - 4 * s),
            (tip[0], tip[1]),
        ],
        fill=fill,
    )


def make_hero():
    im = Image.new("RGB", (1280, 720), (8, 22, 38))
    layer = Image.new("RGBA", (1280, 720), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    for box in [
        (80, -60, 560, 380, (196, 72, 86, 50)),
        (720, 80, 1380, 720, (26, 122, 140, 42)),
        (380, 360, 980, 860, (15, 44, 76, 70)),
    ]:
        d.ellipse(box[:4], fill=box[4])
    # unlabeled heart mass and vessel arcs
    draw_heart(d, 430, 320, 1.35, fill=(196, 72, 86, 90))
    d.arc((300, 180, 560, 420), 200, 20, fill=(232, 180, 186, 90), width=10)
    d.arc((360, 200, 640, 460), 240, 40, fill=(26, 140, 118, 110), width=12)
    d.arc((780, 220, 1120, 560), 30, 210, fill=(188, 214, 222, 70), width=8)
    for x, y, r in [(980, 210, 26), (1080, 300, 38), (1180, 420, 22)]:
        d.ellipse((x - r, y - r, x + r, y + r), fill=(26, 122, 140, 60), outline=(188, 214, 222, 80), width=3)
    blurred = layer.filter(ImageFilter.GaussianBlur(1.4))
    im = Image.alpha_composite(im.convert("RGBA"), blurred).convert("RGB")
    save(im, "cabg-hero.webp")


def make_bypass():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(d, "HOW A BYPASS GRAFT RESTORES FLOW", "CABG does not remove the blockage. It creates a new route around it.")

    # left: blocked artery
    rounded(d, (48, 130, 616, 680), CARD, 24, outline=LINE, width=2)
    center_text(d, (332, 168), "BLOCKED CORONARY", font(BOLD, 20), NAVY)
    draw_heart(d, 332, 360, 1.15, fill=(214, 96, 108))
    # coronary path with stenosis
    d.arc((250, 250, 430, 430), 200, 340, fill=VESSEL, width=14)
    d.ellipse((388, 278, 418, 308), fill=(80, 28, 36))
    d.line((404, 248, 404, 278), fill=VESSEL, width=10)
    center_text(d, (332, 560), "Plaque narrows the vessel", font(SANS, 17), MUTED)
    center_text(d, (332, 592), "Heart muscle beyond the blockage is starved", font(SANS, 16), MUTED)

    # right: grafted artery
    rounded(d, (664, 130, 1232, 680), CARD, 24, outline=LINE, width=2)
    center_text(d, (948, 168), "AFTER CABG", font(BOLD, 20), NAVY)
    draw_heart(d, 948, 360, 1.15, fill=(214, 96, 108))
    d.arc((866, 250, 1046, 430), 200, 340, fill=VESSEL, width=14)
    d.ellipse((1004, 278, 1034, 308), fill=(80, 28, 36))
    d.line((1020, 248, 1020, 278), fill=VESSEL, width=10)
    # graft looping around the blockage
    d.arc((900, 230, 1120, 390), 300, 90, fill=GRAFT, width=12)
    d.ellipse((1008, 368, 1032, 392), fill=GRAFT)
    d.ellipse((1100, 268, 1124, 292), fill=GRAFT)
    center_text(d, (948, 560), "A healthy vessel is sewn beyond the block", font(SANS, 17), MUTED)
    center_text(d, (948, 592), "Blood reaches the muscle through the graft", font(SANS, 16), MUTED)
    save(im, "cabg-bypass.webp")


def make_grafts():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(d, "WHERE CABG GRAFTS COME FROM", "The surgeon names LIMA, saphenous vein or radial artery after the angiogram.")
    tiles = [
        (48, 130, 424, 680, TEAL, "LIMA", "Left internal mammary artery", "Taken from the chest wall. Often used for the left anterior descending artery because arterial grafts can last longer."),
        (452, 130, 828, 680, GOLD, "SAPHENOUS", "Vein from the leg", "A common conduit when several grafts are needed. Vein grafts can narrow later, so risk-factor control still matters."),
        (856, 130, 1232, 680, PURPLE, "RADIAL", "Artery from the forearm", "Used as an arterial graft in selected patients after the team checks hand blood-flow."),
    ]
    title_f = font(BOLD, 22)
    sub_f = font(BOLD, 16)
    body_f = font(SANS, 17)
    for x1, y1, x2, y2, accent, title, sub, copy in tiles:
        rounded(d, (x1, y1, x2, y2), CARD, 24, outline=LINE, width=2)
        d.rounded_rectangle((x1, y1, x2, y1 + 118), radius=24, fill=accent)
        d.rectangle((x1, y1 + 86, x2, y1 + 118), fill=accent)
        center_text(d, ((x1 + x2) / 2, y1 + 58), title, title_f, WHITE)
        # simple harvest-site marks
        cx = (x1 + x2) / 2
        if title == "LIMA":
            d.ellipse((cx - 36, 290, cx + 36, 370), fill=(232, 210, 214))
            d.line((cx, 300, cx, 360), fill=accent, width=8)
        elif title == "SAPHENOUS":
            d.rounded_rectangle((cx - 18, 280, cx + 18, 430), radius=12, fill=(232, 210, 214))
            d.line((cx, 292, cx, 418), fill=accent, width=8)
        else:
            d.rounded_rectangle((cx - 70, 320, cx + 70, 356), radius=14, fill=(232, 210, 214))
            d.line((cx - 58, 338, cx + 58, 338), fill=accent, width=8)
        center_text(d, (cx, 460), sub, sub_f, NAVY)
        wrap_center(d, cx, 500, copy, body_f, INK, x2 - x1 - 48)
    save(im, "cabg-grafts.webp")


def make_types():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(d, "THREE WAYS CABG CAN BE DONE", "On-pump is most common. Off-pump and small-incision work are selected cases.")
    tiles = [
        (48, 130, 424, 680, CORAL, "ON-PUMP", "Heart-lung machine", "The machine takes over circulation so the surgeon can work on a still heart. This remains the usual CABG method."),
        (452, 130, 828, 680, TEAL, "OFF-PUMP", "Beating-heart OPCAB", "A stabilizer holds one target artery while the heart keeps beating. Suitability depends on anatomy and the surgeon."),
        (856, 130, 1232, 680, PURPLE, "MINI / ROBOTIC", "Smaller chest cuts", "Selected patients may avoid a full sternotomy. Neighbouring mini-cardiac planning is $8,000–$20,000."),
    ]
    title_f = font(BOLD, 22)
    sub_f = font(BOLD, 16)
    body_f = font(SANS, 17)
    for x1, y1, x2, y2, accent, title, sub, copy in tiles:
        rounded(d, (x1, y1, x2, y2), CARD, 24, outline=LINE, width=2)
        d.rounded_rectangle((x1, y1, x2, y1 + 118), radius=24, fill=accent)
        d.rectangle((x1, y1 + 86, x2, y1 + 118), fill=accent)
        center_text(d, ((x1 + x2) / 2, y1 + 58), title, title_f, WHITE)
        cx = (x1 + x2) / 2
        if title == "ON-PUMP":
            draw_heart(d, cx, 330, 0.55, fill=PINK)
            d.rounded_rectangle((cx - 70, 390, cx + 70, 430), radius=8, fill=NAVY)
            d.line((cx - 40, 370, cx - 40, 390), fill=NAVY, width=4)
            d.line((cx + 40, 370, cx + 40, 390), fill=NAVY, width=4)
        elif title == "OFF-PUMP":
            draw_heart(d, cx, 340, 0.55, fill=PINK)
            d.ellipse((cx + 18, 318, cx + 58, 348), outline=accent, width=5)
        else:
            d.rounded_rectangle((cx - 50, 290, cx + 50, 400), radius=10, fill=(232, 210, 214))
            d.line((cx - 18, 310, cx - 18, 380), fill=accent, width=5)
            d.line((cx + 18, 320, cx + 18, 370), fill=accent, width=5)
        center_text(d, (cx, 470), sub, sub_f, NAVY)
        wrap_center(d, cx, 508, copy, body_f, INK, x2 - x1 - 44)
    save(im, "cabg-types.webp")


def make_steps():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(d, "CABG JOURNEY IN THE HOSPITAL", "GAF CABG planning is $5,500–$14,000, typically 7–14 nights then nearby recovery.")
    steps = [
        ("1", "REVIEW", "Angiogram, echo and Heart Team decide CABG versus PCI"),
        ("2", "ANAESTHESIA", "General anaesthesia and a breathing tube"),
        ("3", "HARVEST", "LIMA, vein or radial graft is prepared"),
        ("4", "BYPASS", "The graft is sewn beyond each target blockage"),
        ("5", "CARDIAC ICU", "Usually 1–2 days of rhythm and drain watch"),
        ("6", "REHAB", "Ward walking, then 6–12 weeks of recovery"),
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
        "Redo CABG is a different product at $8,500–$20,000. Neighbouring PCI is $3,200–$8,500.",
        font(SANS, 16),
        MUTED,
    )
    save(im, "cabg-steps.webp")


if __name__ == "__main__":
    make_hero()
    make_bypass()
    make_grafts()
    make_types()
    make_steps()
