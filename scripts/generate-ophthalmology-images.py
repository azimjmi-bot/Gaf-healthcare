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
PROCEDURES = {
    "phacoemulsification-cataract-surgery": ("phacoemulsification_cataract_surgery_source.png", "Phaco cataract surgery", ["Cloudy lens", "Capsular bag", "Ultrasound tip", "IOL"], ["Assess", "Measure", "Anaesthetize", "Open capsule", "Phaco", "Insert IOL", "Review"], ["Drops", "Shield", "Pressure", "Vision", "Urgent signs"]),
    "femto-laser-cataract-surgery": ("femto_laser_cataract_surgery_source.png", "Femto laser cataract", ["Cornea", "Lens capsule", "Laser pattern", "IOL"], ["Map eye", "Dock", "Laser incision", "Capsulotomy", "Fragment", "Remove + IOL", "Review"], ["Drops", "Shield", "Cornea", "Pressure", "Review"]),
    "lasik-eye-surgery": ("lasik_eye_surgery_source.png", "LASIK eye surgery", ["Cornea", "Flap", "Excimer laser", "Refraction"], ["Refraction", "Tomography", "Plan", "Create flap", "Reshape", "Replace flap", "Review"], ["Drops", "No rubbing", "Flap check", "Vision", "Urgent signs"]),
    "smile-eye-surgery": ("smile_eye_surgery_source.png", "SMILE eye surgery", ["Cornea", "Lenticule", "Small incision", "Refraction"], ["Refraction", "Tomography", "Dock", "Create lenticule", "Dissect", "Extract", "Review"], ["Drops", "No rubbing", "Cornea", "Vision", "Review"]),
    "icl-implantable-collamer-lens": ("icl_implantable_collamer_lens_source.png", "ICL phakic lens", ["Natural lens", "Iris", "Anterior chamber", "Phakic ICL"], ["Measure", "Size ICL", "Dilate", "Insert", "Position", "Pressure check", "Review"], ["Drops", "Shield", "Pressure", "Lens position", "Urgent signs"]),
    "corneal-transplantation": ("corneal_transplantation_source.png", "Full-thickness corneal graft", ["Epithelium", "Stroma", "Endothelium", "Donor button"], ["Assess", "Donor tissue", "Trephine", "Remove cornea", "Place graft", "Suture", "Review"], ["Drops", "Shield", "Sutures", "Rejection signs", "Follow-up"]),
    "dmek": ("dmek_source.png", "DMEK endothelial graft", ["Descemet membrane", "Endothelium", "Stroma retained", "Air bubble"], ["Map failure", "Prepare graft", "Remove membrane", "Insert scroll", "Unfold", "Air support", "Review"], ["Positioning", "Drops", "Bubble check", "Rejection signs", "Review"]),
    "dsek": ("dsek_source.png", "DSEK lamellar graft", ["Posterior stroma", "Descemet layer", "Endothelium", "Donor disc"], ["Assess", "Prepare disc", "Remove layer", "Insert disc", "Unfold", "Air support", "Review"], ["Positioning", "Drops", "Disc check", "Rejection signs", "Review"]),
    "dalk": ("dalk_source.png", "DALK stromal graft", ["Epithelium", "Diseased stroma", "Descemet layer", "Endothelium kept"], ["Map depth", "Prepare donor", "Separate stroma", "Remove stroma", "Place graft", "Suture", "Review"], ["Drops", "Shield", "Sutures", "Interface check", "Review"]),
    "glaucoma-surgery": ("glaucoma_surgery_source.png", "Glaucoma surgery planning", ["Drainage angle", "Optic nerve", "IOP", "Visual field"], ["Confirm type", "Measure IOP", "Fields + OCT", "Choose route", "Operate", "Pressure care", "Review"], ["Drops", "Shield", "IOP checks", "Vision", "Urgent signs"]),
    "laser-glaucoma-surgery": ("laser_glaucoma_surgery_source.png", "Outpatient glaucoma laser", ["Drainage angle", "Trabecular meshwork", "Laser spots", "Optic nerve"], ["Assess angle", "Measure IOP", "Select laser", "Anaesthetic drop", "Apply laser", "IOP check", "Review"], ["Drops", "Pressure", "Inflammation", "Vision", "Follow-up"]),
    "trabeculectomy": ("trabeculectomy_source.png", "Trabeculectomy filtration", ["Scleral flap", "Drainage opening", "Filtering bleb", "Anterior chamber"], ["Assess", "Plan site", "Create flap", "Form channel", "Close flap", "Bleb care", "Review"], ["Shield", "Drops", "Bleb check", "IOP checks", "Urgent signs"]),
    "glaucoma-drainage-device-valve-implantation": ("glaucoma_drainage_device_valve_implantation_source.png", "Glaucoma tube and plate", ["Anterior chamber", "Tube", "Plate", "Conjunctiva"], ["Assess", "Choose device", "Position plate", "Insert tube", "Cover tube", "Close", "Review"], ["Shield", "Drops", "Tube check", "IOP checks", "Review"]),
    "vitrectomy": ("vitrectomy_source.png", "Pars plana vitrectomy", ["Vitreous", "Retina", "Macula", "Ports"], ["Retina exam", "Imaging", "Plan tamponade", "Place ports", "Remove vitreous", "Treat retina", "Review"], ["Positioning", "Drops", "Gas safety", "Pressure", "Retina check"]),
    "retinal-detachment-surgery": ("retinal_detachment_surgery_source.png", "Retinal detachment repair", ["Retinal break", "Detached retina", "Vitreous", "Macula"], ["Urgent exam", "Map breaks", "Select repair", "Seal break", "Support retina", "Tamponade", "Review"], ["Positioning", "Drops", "Gas safety", "Vision", "Urgent signs"]),
    "intravitreal-anti-vegf-injection": ("intravitreal_anti_vegf_injection_source.png", "Intravitreal anti-VEGF", ["Vitreous cavity", "Retina", "Macula", "Injection site"], ["OCT", "Confirm eye", "Prepare drug", "Antisepsis", "Inject", "Pressure check", "Schedule"], ["No rubbing", "Irritation", "Vision check", "Infection signs", "Next OCT"]),
    "macular-hole-surgery": ("macular_hole_surgery_source.png", "Macular hole repair", ["Macula", "Hole edges", "Vitreous", "Gas bubble"], ["OCT", "Stage hole", "Plan gas", "Vitrectomy", "Peel membrane", "Gas fill", "Review"], ["Positioning", "Drops", "Gas safety", "OCT", "Urgent signs"]),
    "pediatric-cataract-surgery": ("pediatric_cataract_surgery_source.png", "Pediatric cataract care", ["Child's lens", "Visual axis", "IOL or aphakia", "Developing vision"], ["Child exam", "Anaesthesia plan", "Measure eye", "Clear cataract", "IOL or aphakia", "Amblyopia care", "Review"], ["Drops", "Shield", "Glasses", "Patching", "Long follow-up"]),
    "squint-strabismus-surgery": ("squint_strabismus_surgery_source.png", "Strabismus muscle surgery", ["Eye alignment", "Rectus muscles", "Binocular vision", "Amblyopia"], ["Measure angle", "Refraction", "Plan muscles", "Expose muscle", "Recess/resect", "Alignment check", "Review"], ["Drops", "Redness", "Alignment", "Double vision", "Follow-up"]),
    "oculoplastic-surgery": ("oculoplastic_surgery_source.png", "Functional oculoplasty", ["Eyelid", "Orbit", "Lacrimal system", "Ocular surface"], ["Define function", "Examine", "Image if needed", "Plan structure", "Operate", "Protect eye", "Review"], ["Cold care", "Lubricate", "Vision check", "Wound care", "Review"]),
    "eyelid-reconstruction-surgery": ("eyelid_reconstruction_surgery_source.png", "Eyelid reconstruction", ["Anterior lamella", "Posterior lamella", "Lid margin", "Ocular surface"], ["Map defect", "Plan layers", "Prepare graft", "Rebuild lamella", "Align margin", "Protect cornea", "Review"], ["Lubricate", "Wound care", "Flap/graft", "Vision check", "Review"]),
    "dacryocystorhinostomy-dcr-tear-duct-surgery": ("dacryocystorhinostomy_dcr_tear_duct_surgery_source.png", "DCR tear drainage", ["Canaliculi", "Lacrimal sac", "Nasal cavity", "New drainage path"], ["Confirm block", "Syringe/test", "Choose access", "Open sac", "Create passage", "Stent if used", "Review"], ["Nasal care", "Drops", "No rubbing", "Stent check", "Review"]),
    "corneal-cross-linking-c3r": ("corneal_cross_linking_c3r_source.png", "Corneal cross-linking", ["Corneal epithelium", "Stroma", "Riboflavin", "UVA zone"], ["Tomography", "Check thickness", "Prepare cornea", "Riboflavin", "Apply UVA", "Bandage lens", "Review"], ["Pain care", "Drops", "Bandage lens", "Haze check", "Tomography"]),
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
    section_face = font(16, True)
    section_width = draw.textbbox((0, 0), section.upper(), font=section_face)[2]
    draw.rounded_rectangle((56, 48, 86 + section_width, 78), radius=15, fill=TEAL)
    draw.text((71, 54), section.upper(), font=section_face, fill=WHITE)
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
    spacing = min(
        (right - left for left, right in zip(centers, centers[1:])),
        default=210,
    )
    max_panel_width = min(190, spacing - 8)
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
        label_size = 15 if len(centers) > 5 else 17
        label_face = font(label_size, True)
        label_box = draw.textbbox((0, 0), label, font=label_face)
        while label_size > 12 and label_box[2] - label_box[0] + 42 > max_panel_width:
            label_size -= 1
            label_face = font(label_size, True)
            label_box = draw.textbbox((0, 0), label, font=label_face)
        panel_width = min(max_panel_width, (label_box[2] - label_box[0]) + 42)
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


def cataract_anatomy(source: Path) -> Image.Image:
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


def cataract_procedure(source: Path) -> Image.Image:
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


def cataract_recovery(source: Path) -> Image.Image:
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


def generic_anatomy(source: Path, heading: str, labels: list[str]) -> Image.Image:
    image = fit_source(source)
    header(image, "Anatomy + mechanism", heading, "Structures and treatment target · conceptual overview")
    draw = ImageDraw.Draw(image)
    translucent_panel(image, (42, 183, 562, 257), radius=17, opacity=215)
    draw = ImageDraw.Draw(image)
    for index, label in enumerate(labels):
        x = 62 + (index % 2) * 250
        y = 194 + (index // 2) * 31
        draw.ellipse((x, y, x + 24, y + 24), fill=NAVY if index % 2 == 0 else TEAL)
        draw.text((x + 8, y + 2), str(index + 1), font=font(12, True), fill=WHITE)
        draw.text((x + 31, y + 3), label, font=font(13, True), fill=INK)
    return image


def generic_procedure(source: Path, heading: str, stages: list[str]) -> Image.Image:
    image = fit_source(source)
    header(image, "Procedure pathway", heading, "Seven clinical checkpoints · individualized sequence")
    badges_and_labels(
        image,
        [102, 267, 430, 595, 759, 923, 1086],
        302,
        524,
        stages,
        ["eye", "check", "check", "eye", "check", "shield", "check"],
    )
    return image


def generic_recovery(source: Path, heading: str, stages: list[str]) -> Image.Image:
    base = fit_source(source)
    image = base.filter(ImageFilter.GaussianBlur(10))
    overlay = Image.new("RGBA", image.size, (245, 250, 252, 150))
    image.paste(overlay, (0, 0), overlay)
    header(image, "Recovery + monitoring", heading, "Protection, review and procedure-specific warning signs")

    # Reframe five later source scenes as larger monitoring cards.
    card_centers = [348, 512, 676, 840, 1004]
    source_centers = [430, 594, 758, 922, 1080]
    for target_x, source_x in zip(card_centers, source_centers):
        crop = base.crop((max(0, source_x - 76), 285, min(WIDTH, source_x + 76), 526))
        crop = ImageOps.fit(crop, (146, 232), method=Image.Resampling.LANCZOS)
        mask = Image.new("L", crop.size)
        ImageDraw.Draw(mask).rounded_rectangle((0, 0, 145, 231), radius=17, fill=255)
        shadow = Image.new("RGBA", image.size)
        ImageDraw.Draw(shadow).rounded_rectangle(
            (target_x - 69, 273, target_x + 81, 513),
            radius=18,
            fill=(7, 58, 114, 45),
        )
        shadow = shadow.filter(ImageFilter.GaussianBlur(8))
        image.paste(shadow, (0, 0), shadow)
        image.paste(crop, (target_x - 73, 269), mask)

    badges_and_labels(
        image,
        card_centers,
        268,
        510,
        stages,
        ["drop", "shield", "eye", "check", "phone"],
    )
    return image


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "source_dir",
        nargs="?",
        type=Path,
        default=Path("/opt/cursor/artifacts/assets"),
        help="Directory containing the supplied realistic source PNGs",
    )
    args = parser.parse_args()
    pilot_sources = {
        "anatomy": "cataract_surgery_anatomy_source.png",
        "procedure": "cataract_surgery_pathway_source.png",
        "recovery": "cataract_surgery_recovery_source.png",
    }
    filenames = [value[0] for value in PROCEDURES.values()] + list(pilot_sources.values())
    missing = [args.source_dir / filename for filename in filenames if not (args.source_dir / filename).is_file()]
    if missing:
        parser.error("missing source PNG(s): " + ", ".join(str(path) for path in missing))

    output = (
        Path(__file__).parents[1] / "public/images/cost/ophthalmology"
    )
    output.mkdir(parents=True, exist_ok=True)
    for existing in output.iterdir():
        if existing.is_file():
            existing.unlink()

    pilot_renderers = {
        "anatomy": cataract_anatomy,
        "procedure": cataract_procedure,
        "recovery": cataract_recovery,
    }
    for name, renderer in pilot_renderers.items():
        image = renderer(args.source_dir / pilot_sources[name])
        image.save(
            output / f"cataract-surgery-{name}.webp",
            "WEBP",
            quality=84,
            method=6,
        )

    for slug, (filename, heading, anatomy_labels, procedure_stages, recovery_stages) in PROCEDURES.items():
        source = args.source_dir / filename
        images = {
            "anatomy": generic_anatomy(source, heading, anatomy_labels),
            "procedure": generic_procedure(source, heading, procedure_stages),
            "recovery": generic_recovery(source, heading, recovery_stages),
        }
        for kind, image in images.items():
            image.save(output / f"{slug}-{kind}.webp", "WEBP", quality=84, method=6)

    print(f"Generated exactly 72 optimized 1200x675 WebPs in {output}")


if __name__ == "__main__":
    main()
