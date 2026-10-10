#!/usr/bin/env python3
"""Human-designed Canva-style BMT educational diagrams (1280x720 WebP)."""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

OUT = Path("/workspace/public/uploads/treatments")
OUT.mkdir(parents=True, exist_ok=True)

NAVY = (15, 44, 76)
TEAL = (26, 122, 140)
TEAL_DEEP = (18, 92, 108)
CORAL = (196, 84, 84)
GOLD = (196, 148, 64)
INK = (34, 48, 62)
MUTED = (90, 108, 122)
LINE = (210, 220, 226)
CARD = (247, 250, 252)
WHITE = (255, 255, 255)
SOFT_TEAL = (226, 241, 244)
SOFT_CORAL = (252, 236, 236)
SOFT_GOLD = (252, 244, 226)

SANS = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"


def font(path: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size)


def save(im: Image.Image, name: str) -> None:
    path = OUT / name
    im.save(path, "WEBP", quality=82, method=6)
    print(path, im.size)


def rounded(draw: ImageDraw.ImageDraw, box, fill, radius=22, outline=None, width=1):
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
    return len(lines)


def header(draw, title: str, subtitle: str):
    draw.rectangle((0, 0, 1280, 92), fill=NAVY)
    draw.rectangle((0, 92, 1280, 96), fill=TEAL)
    center_text(draw, (640, 38), title, font(BOLD, 34), WHITE)
    center_text(draw, (640, 70), subtitle, font(SANS, 16), (188, 214, 222))


def make_hero():
    im = Image.new("RGB", (1280, 720), (8, 24, 40))
    layer = Image.new("RGBA", (1280, 720), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    blobs = [
        (720, 80, 1260, 620, (40, 120, 140, 70)),
        (860, 160, 1240, 680, (20, 80, 110, 80)),
        (980, 40, 1380, 480, (90, 160, 170, 50)),
        (640, 280, 980, 780, (16, 70, 100, 60)),
        (110, 420, 520, 860, (12, 50, 80, 40)),
    ]
    for box in blobs:
        d.ellipse(box[:4], fill=box[4])
    # marrow-like stacked ovals, no labels
    d.ellipse((150, 160, 430, 520), fill=(26, 122, 140, 55), outline=(180, 220, 230, 70), width=3)
    d.ellipse((190, 210, 390, 470), fill=(15, 44, 76, 80))
    d.ellipse((230, 260, 350, 420), fill=(196, 148, 64, 45))
    blurred = layer.filter(ImageFilter.GaussianBlur(2))
    im = Image.alpha_composite(im.convert("RGBA"), blurred).convert("RGB")
    save(im, "bmt-hero.webp")


def make_types():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(d, "AUTOLOGOUS VS ALLOGENEIC TRANSPLANT", "Two graft sources used in hematopoietic stem-cell transplantation")
    cards = [
        (48, 128, 616, 688, TEAL, SOFT_TEAL, "AUTOLOGOUS", "Patient's own stem cells", [
            "Collected before high-dose therapy",
            "Returned after conditioning",
            "No donor HLA match needed",
            "No donor-derived GvHD",
            "Common in myeloma and selected lymphomas",
        ]),
        (664, 128, 1232, 688, CORAL, SOFT_CORAL, "ALLOGENEIC", "Donor stem cells", [
            "Sibling, haploidentical or unrelated donor",
            "HLA testing is required",
            "Graft-versus-tumour effect possible",
            "GvHD is a major risk",
            "Used in leukaemia, MDS and marrow failure",
        ]),
    ]
    title_f = font(BOLD, 28)
    sub_f = font(SANS, 18)
    item_f = font(SANS, 18)
    for x1, y1, x2, y2, accent, bg, title, sub, items in cards:
        rounded(d, (x1, y1, x2, y2), bg, 28)
        d.rounded_rectangle((x1, y1, x2, y1 + 118), radius=28, fill=accent)
        d.rectangle((x1, y1 + 90, x2, y1 + 118), fill=accent)
        center_text(d, ((x1 + x2) / 2, y1 + 42), title, title_f, WHITE)
        center_text(d, ((x1 + x2) / 2, y1 + 82), sub, sub_f, WHITE)
        cy = y1 + 168
        for item in items:
            d.ellipse((x1 + 36, cy - 7, x1 + 50, cy + 7), fill=accent)
            d.text((x1 + 66, cy - 12), item, font=item_f, fill=INK)
            cy += 78
    save(im, "bmt-types.webp")


def make_sources():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(d, "STEM-CELL SOURCES", "Peripheral blood, bone marrow or umbilical cord blood")
    panels = [
        (40, 140, 420, 680, TEAL, "PERIPHERAL BLOOD", "Apheresis after growth-factor mobilisation. The most common modern graft source."),
        (440, 140, 840, 680, NAVY, "BONE MARROW", "Collected from pelvic bone under anaesthesia. The original marrow harvest."),
        (860, 140, 1240, 680, GOLD, "CORD BLOOD", "Collected at birth and stored. Used in selected protocols."),
    ]
    title_f = font(BOLD, 22)
    body_f = font(SANS, 17)
    for x1, y1, x2, y2, accent, title, copy in panels:
        rounded(d, (x1, y1, x2, y2), CARD, 26, outline=LINE, width=2)
        d.rounded_rectangle((x1, y1, x2, y1 + 86), radius=26, fill=accent)
        d.rectangle((x1, y1 + 56, x2, y1 + 86), fill=accent)
        center_text(d, ((x1 + x2) / 2, y1 + 43), title, title_f, WHITE)
        cx, cy = (x1 + x2) / 2, y1 + 250
        if title.startswith("PERIPHERAL"):
            d.ellipse((cx - 70, cy - 70, cx + 70, cy + 70), outline=accent, width=8)
            d.ellipse((cx - 28, cy - 28, cx + 28, cy + 28), fill=accent)
            d.arc((cx - 96, cy - 20, cx - 40, cy + 36), 200, 340, fill=accent, width=8)
            d.arc((cx + 40, cy - 20, cx + 96, cy + 36), 20, 160, fill=accent, width=8)
        elif title.startswith("BONE"):
            d.rounded_rectangle((cx - 26, cy - 110, cx + 26, cy + 110), radius=20, outline=accent, width=8)
            d.ellipse((cx - 18, cy - 18, cx + 18, cy + 18), fill=accent)
            d.ellipse((cx - 10, cy - 70, cx + 10, cy - 50), fill=TEAL)
            d.ellipse((cx - 10, cy + 50, cx + 10, cy + 70), fill=TEAL)
        else:
            d.ellipse((cx - 54, cy - 70, cx + 54, cy + 38), outline=accent, width=8)
            d.polygon([(cx, cy + 110), (cx - 48, cy + 20), (cx + 48, cy + 20)], outline=accent)
            d.line([(cx - 48, cy + 20), (cx + 48, cy + 20)], fill=accent, width=8)
        wrap_center(d, cx, y1 + 430, copy, body_f, INK, x2 - x1 - 48)
    save(im, "bmt-sources.webp")


def make_pathway():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(d, "TRANSPLANT PATHWAY", "A treatment course, not a single operation")
    steps = [
        ("1", "EVALUATE", "Diagnosis, organ\nfunction, infection"),
        ("2", "DONOR", "HLA match or\nautologous harvest"),
        ("3", "COLLECT", "Apheresis or\nmarrow harvest"),
        ("4", "CONDITION", "Chemotherapy\nor selected TBI"),
        ("5", "INFUSE", "Stem cells given\nthrough a vein"),
        ("6", "ENGRAFT", "New blood cells\nbegin to recover"),
    ]
    title_f = font(BOLD, 18)
    body_f = font(SANS, 16)
    num_f = font(BOLD, 26)
    xs = [70, 270, 470, 670, 870, 1070]
    y1, y2 = 200, 560
    for i, x in enumerate(xs[:-1]):
        d.line((x + 130, 380, xs[i + 1] + 20, 380), fill=TEAL, width=6)
    for x, (num, title, copy) in zip(xs, steps):
        rounded(d, (x, y1, x + 150, y2), CARD, 22, outline=LINE, width=2)
        d.ellipse((x + 45, y1 + 24, x + 105, y1 + 84), fill=TEAL)
        center_text(d, (x + 75, y1 + 54), num, num_f, WHITE)
        center_text(d, (x + 75, y1 + 126), title, title_f, NAVY)
        wrap_center(d, x + 75, y1 + 180, copy.replace("\n", " "), body_f, MUTED, 128)
    note_f = font(SANS, 16)
    center_text(
        d,
        (640, 640),
        "Hospital stay and nearby housing are planned around engraftment, not the infusion hour.",
        note_f,
        MUTED,
    )
    save(im, "bmt-pathway.webp")


def make_risks():
    im = Image.new("RGB", (1280, 720), WHITE)
    d = ImageDraw.Draw(im)
    header(d, "EARLY RISKS AFTER TRANSPLANT", "Infection, bleeding and graft-versus-host disease need unit-level care")
    tiles = [
        (48, 140, 420, 420, TEAL, SOFT_TEAL, "INFECTION", "Low white cells leave the patient open to bacterial, viral and fungal infection."),
        (430, 140, 802, 420, GOLD, SOFT_GOLD, "BLEEDING", "Low platelets can cause bruising or bleeding until the graft produces new cells."),
        (812, 140, 1232, 420, CORAL, SOFT_CORAL, "GvHD", "Donor immune cells may attack skin, gut, liver or other tissues after allogeneic transplant."),
        (48, 448, 616, 688, NAVY, (232, 238, 244), "GRAFT FAILURE", "The infused cells may not establish. Counts stay low and further treatment may be needed."),
        (640, 448, 1232, 688, TEAL_DEEP, SOFT_TEAL, "GO TO A LOCAL ED", "Fever, uncontrolled bleeding, severe diarrhoea, jaundice or breathlessness is an emergency, not a WhatsApp message."),
    ]
    title_f = font(BOLD, 22)
    body_f = font(SANS, 17)
    for x1, y1, x2, y2, accent, bg, title, copy in tiles:
        rounded(d, (x1, y1, x2, y2), bg, 22)
        d.rectangle((x1, y1, x1 + 12, y2), fill=accent)
        d.text((x1 + 36, y1 + 22), title, font=title_f, fill=accent if accent != NAVY else NAVY)
        wrap_center(d, (x1 + x2) / 2, y1 + 88 if y2 - y1 > 220 else y1 + 80, copy, body_f, INK, x2 - x1 - 56)
    save(im, "bmt-risks.webp")


if __name__ == "__main__":
    make_hero()
    make_types()
    make_sources()
    make_pathway()
    make_risks()
