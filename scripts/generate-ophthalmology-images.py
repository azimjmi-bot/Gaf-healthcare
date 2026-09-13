"""Turn the three supplied realistic cataract composites into campaign WebPs."""

from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageOps

WIDTH, HEIGHT = 1200, 675
NAVY = "#073A72"
TEAL = "#008B91"
INK = "#112B46"
WHITE = "#FFFFFF"
SOURCE_FILES = {
    "anatomy": "cataract_surgery_anatomy_source.png",
    "procedure": "cataract_surgery_pathway_source.png",
    "recovery": "cataract_surgery_recovery_source.png",
}
OUTPUT_FILES = {
    "anatomy": "cataract-surgery-anatomy.webp",
    "procedure": "cataract-surgery-procedure.webp",
    "recovery": "cataract-surgery-recovery.webp",
}


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    weight = "Bold" if bold else ""
    candidates = [
        f"/usr/share/fonts/truetype/dejavu/DejaVuSans-{weight}.ttf"
        if bold
        else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        f"/usr/share/fonts/truetype/liberation2/LiberationSans-{weight}.ttf"
        if bold
        else "/usr/share/fonts/truetype/liberation2/LiberationSans-Regular.ttf",
    ]
    for candidate in candidates:
        if Path(candidate).exists():
            return ImageFont.truetype(candidate, size)
    raise FileNotFoundError("A DejaVu or Liberation Sans font is required")


def fit_source(path: Path) -> Image.Image:
    with Image.open(path) as source:
        source = ImageOps.exif_transpose(source).convert("RGB")
        return ImageOps.fit(
            source,
            (WIDTH, HEIGHT),
            method=Image.Resampling.LANCZOS,
            centering=(0.5, 0.5),
        )


def translucent_panel(
    image: Image.Image,
    box: tuple[int, int, int, int],
    radius: int = 22,
    opacity: int = 228,
) -> None:
    x1, y1, x2, y2 = box
    shadow = Image.new("RGBA", image.size)
    shadow_draw = ImageDraw.Draw(shadow)
    shadow_draw.rounded_rectangle(
        (x1 + 5, y1 + 8, x2 + 5, y2 + 8),
        radius=radius,
        fill=(7, 58, 114, 45),
    )
    shadow = shadow.filter(ImageFilter.GaussianBlur(10))
    image.paste(shadow, (0, 0), shadow)
    layer = Image.new("RGBA", image.size)
    ImageDraw.Draw(layer).rounded_rectangle(
        box,
        radius=radius,
        fill=(255, 255, 255, opacity),
        outline=(255, 255, 255, 245),
        width=2,
    )
    image.paste(layer, (0, 0), layer)


def header(
    image: Image.Image,
    section: str,
    heading: str,
    subtitle: str,
) -> None:
    translucent_panel(image, (34, 30, 575, 171))
    draw = ImageDraw.Draw(image)
    draw.rounded_rectangle((56, 48, 225, 78), radius=15, fill=TEAL)
    draw.text((71, 54), section.upper(), font=font(16, True), fill=WHITE)
    draw.text((56, 88), heading, font=font(34, True), fill=NAVY)
    draw.text((57, 135), subtitle, font=font(17), fill=INK)


def icon(draw: ImageDraw.ImageDraw, x: int, y: int, kind: str) -> None:
    """Small line icons used as secondary cues beside stage labels."""
    color = TEAL
    if kind == "eye":
        draw.arc((x - 10, y - 6, x + 10, y + 6), 190, 350, fill=color, width=2)
        draw.arc((x - 10, y - 6, x + 10, y + 6), 10, 170, fill=color, width=2)
        draw.ellipse((x - 3, y - 3, x + 3, y + 3), fill=color)
    elif kind == "drop":
        draw.polygon(((x, y - 9), (x - 6, y + 2), (x, y + 8), (x + 6, y + 2)), fill=color)
    elif kind == "shield":
        draw.polygon(((x, y - 9), (x - 8, y - 5), (x - 6, y + 5), (x, y + 10), (x + 6, y + 5), (x + 8, y - 5)), outline=color, width=2)
    elif kind == "phone":
        draw.arc((x - 8, y - 9, x + 8, y + 9), 115, 245, fill=color, width=3)
    else:
        draw.line((x - 7, y, x - 1, y + 6, x + 9, y - 7), fill=color, width=3)


def badges_and_labels(
    image: Image.Image,
    centers: list[int],
    card_top: int,
    card_bottom: int,
    labels: list[str],
    icons: list[str],
) -> None:
    draw = ImageDraw.Draw(image)
    for index, (x, label, symbol) in enumerate(zip(centers, labels, icons), start=1):
        badge_y = card_top - 8
        draw.ellipse(
            (x - 22, badge_y - 22, x + 22, badge_y + 22),
            fill=NAVY if index % 2 else TEAL,
            outline=WHITE,
            width=3,
        )
        number_face = font(19, True)
        number_box = draw.textbbox((0, 0), str(index), font=number_face)
        draw.text(
            (x - (number_box[2] - number_box[0]) / 2, badge_y - 12),
            str(index),
            font=number_face,
            fill=WHITE,
        )
        label_face = font(15 if len(centers) > 5 else 17, True)
        label_box = draw.textbbox((0, 0), label, font=label_face)
        panel_width = min(
            155 if len(centers) > 5 else 190,
            (label_box[2] - label_box[0]) + 42,
        )
        y1 = card_bottom - 38
        layer = Image.new("RGBA", image.size)
        layer_draw = ImageDraw.Draw(layer)
        layer_draw.rounded_rectangle(
            (x - panel_width / 2, y1, x + panel_width / 2, y1 + 31),
            radius=12,
            fill=(255, 255, 255, 226),
        )
        image.paste(layer, (0, 0), layer)
        draw = ImageDraw.Draw(image)
        icon(draw, int(x - panel_width / 2 + 17), y1 + 15, symbol)
        draw.text(
            (x - (label_box[2] - label_box[0]) / 2 + 8, y1 + 6),
            label,
            font=label_face,
            fill=INK,
        )


def anatomy(source: Path) -> Image.Image:
    image = fit_source(source)
    header(
        image,
        "Cataract anatomy",
        "Cloudy lens to clear IOL",
        "Examine · measure · remove · replace",
    )
    badges_and_labels(
        image,
        [168, 458, 744, 1028],
        302,
        535,
        ["Eye exam", "Lens measure", "Cloudy lens", "IOL choice"],
        ["eye", "check", "eye", "check"],
    )
    return image


def procedure(source: Path) -> Image.Image:
    image = fit_source(source)
    header(
        image,
        "Patient journey",
        "Cataract surgery pathway",
        "Seven named checkpoints · each eye planned separately",
    )
    badges_and_labels(
        image,
        [103, 268, 427, 592, 758, 923, 1084],
        319,
        533,
        ["Consult", "Examine", "Measure", "Select IOL", "Procedure", "Protect", "Review"],
        ["eye", "eye", "check", "check", "eye", "shield", "check"],
    )
    return image


def recovery(source: Path) -> Image.Image:
    image = fit_source(source)
    header(
        image,
        "Recovery",
        "Protect healing vision",
        "Drops · shield · gradual activity · review",
    )
    badges_and_labels(
        image,
        [133, 362, 592, 821, 1050],
        314,
        541,
        ["Use drops", "Wear shield", "Ease activity", "Follow up", "Urgent review"],
        ["drop", "shield", "check", "eye", "phone"],
    )
    return image


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "source_dir",
        nargs="?",
        type=Path,
        default=Path("/opt/cursor/artifacts/assets"),
        help="Directory containing the three supplied source PNGs",
    )
    args = parser.parse_args()
    missing = [
        args.source_dir / filename
        for filename in SOURCE_FILES.values()
        if not (args.source_dir / filename).is_file()
    ]
    if missing:
        parser.error("missing source PNG(s): " + ", ".join(str(path) for path in missing))

    output = (
        Path(__file__).parents[1] / "public/images/cost/ophthalmology"
    )
    output.mkdir(parents=True, exist_ok=True)
    for existing in output.iterdir():
        if existing.is_file():
            existing.unlink()

    renderers = {"anatomy": anatomy, "procedure": procedure, "recovery": recovery}
    for name, renderer in renderers.items():
        image = renderer(args.source_dir / SOURCE_FILES[name])
        image.save(
            output / OUTPUT_FILES[name],
            "WEBP",
            quality=84,
            method=6,
        )

    print(f"Generated exactly 3 optimized 1200x675 WebPs in {output}")


if __name__ == "__main__":
    main()
