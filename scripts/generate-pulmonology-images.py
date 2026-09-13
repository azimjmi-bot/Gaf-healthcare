"""Generate original 1200×675 WebP patient-education diagrams for Pulmonology guides."""

from pathlib import Path
from textwrap import wrap

from PIL import Image, ImageDraw, ImageFont

OUT = Path(__file__).parents[1] / "public/images/cost/pulmonology"
OUT.mkdir(parents=True, exist_ok=True)

INK = "#1b2a4a"
MUTED = "#5b6d86"
NAVY = "#1d4e89"
TEAL = "#2a7f7a"
SKY = "#d9e7f6"
PALE = "#f4f7fb"
CORAL = "#c45c5c"
ROSE = "#f3d4d0"
WHITE = "#ffffff"
GOLD = "#d4a017"
GREEN = "#3fae6a"
LINE = "#c5d4e4"

DATA = {
    "bronchoscopy": {
        "title": "Bronchoscopy",
        "family": "bronchoscopy",
        "labels": [
            "Larynx and trachea",
            "Right and left main bronchi",
            "Flexible bronchoscope with camera",
            "Working channel at the sampling target",
        ],
        "steps": [
            "Pulmonology and CT review",
            "Fasting and medication check",
            "Local anaesthetic and sedation",
            "Flexible scope airway inspection",
            "Lavage, brushing or biopsy as agreed",
            "Monitored oxygen and sedation recovery",
        ],
        "milestones": [
            "Throat and sedation precautions",
            "Oxygen and bleeding watch",
            "Samples reach the right laboratory",
            "Visual and pathology review",
            "Individual travel clearance",
        ],
        "urgent": "Worsening breathlessness · chest pain · more than small blood streaks · fever with chills · blue lips",
    },
    "ebus-endobronchial-ultrasound": {
        "title": "EBUS (Endobronchial Ultrasound)",
        "family": "ebus",
        "labels": ["Linear ultrasound bronchoscope", "Mediastinal and hilar lymph nodes", "Needle crossing the airway wall", "Cytology target beside major vessels"],
        "steps": ["CT and PET target review", "Anaesthesia and airway assessment", "Linear EBUS node mapping", "Doppler check before puncture", "TBNA passes with ROSE if available", "Cytology, histology and biomarker handling"],
        "milestones": ["Sedation and oxygen recovery", "Bleeding and fever watch", "Sample adequacy review", "Staging or diagnosis conference", "Treatment-planning handover"],
        "urgent": "Worsening breathlessness · heavy bleeding · persistent chest pain · fever with chills · fainting or blue lips",
    },
    "rigid-bronchoscopy": {
        "title": "Rigid Bronchoscopy", "family": "rigid",
        "labels": ["Metal ventilating bronchoscope", "Larynx and central trachea", "Large working and suction corridor", "Central-airway obstruction target"],
        "steps": ["CT and airway-risk planning", "General anaesthesia induction", "Rigid barrel placed through larynx", "Ventilation maintained through barrel", "Suction, extraction or therapy", "Extubation or monitored ICU recovery"],
        "milestones": ["Airway and anaesthetic recovery", "Bleeding and swelling watch", "Breathing reassessment", "Procedure findings review", "Device or disease follow-up"],
        "urgent": "Noisy or difficult breathing · coughing substantial blood · severe chest pain · confusion · blue lips",
    },
    "airway-stenting": {
        "title": "Airway Stenting", "family": "stent",
        "labels": ["Central tracheobronchial narrowing", "Expanded airway stent lumen", "Silicone or covered metal design", "Mucus and granulation surveillance zone"],
        "steps": ["CT and bronchoscopic sizing", "Benign versus malignant plan", "Airway opened before deployment", "Stent positioned across narrowing", "Ventilation and position confirmed", "Clearance and surveillance plan"],
        "milestones": ["Airway and oxygen monitoring", "Secretion-clearance teaching", "Position and patency review", "Surveillance bronchoscopy", "Removal or revision if indicated"],
        "urgent": "Sudden breathlessness · noisy breathing · inability to clear secretions · coughing blood · fever or blue lips",
    },
    "medical-thoracoscopy": {
        "title": "Medical Thoracoscopy", "family": "thoracoscopy",
        "labels": ["Lung and parietal pleura", "Created pleural working space", "Thoracoscope through chest wall port", "Pleural biopsy and poudrage surface"],
        "steps": ["CT, ultrasound and fluid review", "Local anaesthetic with sedation", "Single pleural port and inspection", "Directed parietal pleural biopsies", "Talc poudrage when consented", "Chest drain and lung expansion"],
        "milestones": ["Drain and oxygen monitoring", "Pain and air-leak review", "Drain removal when appropriate", "Pathology and culture review", "Pleural follow-up plan"],
        "urgent": "Increasing breathlessness · severe chest pain · drain disconnection · heavy bleeding · fever or blue lips",
    },
    "medical-pleuroscopy": {
        "title": "Medical Pleuroscopy", "family": "pleuroscopy",
        "labels": ["Pleural lining around the lung", "Pleural fluid and working space", "Semi-rigid pleuroscope at one port", "Abnormal pleura selected for biopsy"],
        "steps": ["Imaging and effusion assessment", "Ultrasound-guided entry planning", "Local anaesthetic and sedation", "Pleural inspection and biopsy", "Fluid drainage or talc if agreed", "Chest drain and expansion check"],
        "milestones": ["Drain output and air-leak watch", "Pain and oxygen review", "Chest imaging before discharge", "Biopsy and microbiology results", "Effusion-control follow-up"],
        "urgent": "New breathlessness · severe pleuritic pain · drain blockage or dislodgement · bleeding · fever or blue lips",
    },
    "transbronchial-lung-biopsy": {
        "title": "Transbronchial Lung Biopsy", "family": "tblb",
        "labels": ["Flexible bronchoscope", "Peripheral parenchymal target", "Forceps beyond a segmental bronchus", "Pleural edge and pneumothorax risk"],
        "steps": ["HRCT and indication review", "Clotting and respiratory assessment", "Scope wedged in target segment", "Fluoroscopy when appropriate", "Small forceps biopsies collected", "Bleeding watch and pneumothorax check"],
        "milestones": ["Oxygen and bleeding recovery", "Chest imaging when indicated", "Histology and infection studies", "ILD or transplant team review", "Activity and flight clearance"],
        "urgent": "Sudden breathlessness · sharp chest pain · increasing blood with cough · faintness · fever or blue lips",
    },
    "cryo-lung-biopsy": {
        "title": "Cryo-Lung Biopsy", "family": "cryobiopsy",
        "labels": ["Peripheral lung parenchyma", "Cryoprobe positioned under imaging", "Frozen tissue core on probe tip", "Bronchial blocker for bleeding control"],
        "steps": ["ILD multidisciplinary case selection", "HRCT target and vessel review", "General anaesthesia and blocker setup", "Fluoroscopic cryoprobe placement", "Freeze, extract and control bleeding", "Pneumothorax imaging and monitored care"],
        "milestones": ["High-acuity bleeding watch", "Pneumothorax assessment", "Larger-core pathology processing", "Multidisciplinary ILD diagnosis", "Respiratory and travel clearance"],
        "urgent": "Sudden or worsening breathlessness · chest pain · coughing significant blood · fainting · blue lips",
    },
    "endobronchial-biopsy": {
        "title": "Endobronchial Biopsy", "family": "endobronchial",
        "labels": ["Visible lesion inside an airway", "Flexible bronchoscope working channel", "Forceps taking mucosal tissue", "Bleeding-control contact site"],
        "steps": ["CT and lesion accessibility review", "Sedation and anticoagulant check", "Airway inspection and photography", "Forceps samples from visible lesion", "Local bleeding control and lavage", "Histology and molecular triage"],
        "milestones": ["Airway and bleeding recovery", "Specimen adequacy check", "Histology and biomarkers", "Diagnosis and staging handover", "Further sampling if needed"],
        "urgent": "Coughing more than small blood streaks · worsening breathlessness · chest pain · fever · fainting or blue lips",
    },
    "tbna-transbronchial-needle-aspiration": {
        "title": "TBNA (Transbronchial Needle Aspiration)", "family": "tbna",
        "labels": ["Airway-wall puncture site", "CT-defined node beside the airway", "Conventional TBNA needle and sheath", "Aspirated cells sent for cytology"],
        "steps": ["CT landmark and target selection", "Sedation and bleeding-risk review", "Bronchoscope aligned at landmark", "Needle passed through airway wall", "Multiple aspirates collected", "Cytology adequacy and recovery"],
        "milestones": ["Oxygen and bleeding watch", "Cytology processing", "Adequacy review", "EBUS or other biopsy if needed", "Diagnosis and staging discussion"],
        "urgent": "Worsening breathlessness · substantial bleeding · severe chest pain · fever with chills · blue lips",
    },
    "bronchoscopic-tumor-debulking": {
        "title": "Bronchoscopic Tumor Debulking", "family": "debulking",
        "labels": ["Tumour obstructing a central airway", "Rigid or flexible treatment corridor", "Mechanical or energy debulking tool", "Reopened lumen for immediate airflow"],
        "steps": ["CT and airway-emergency planning", "Anaesthesia and low-FiO2 strategy", "Rigid access and distal-airway check", "Mechanical or energy tumour reduction", "Bleeding control and secretion removal", "Patency check and oncology handover"],
        "milestones": ["Airway and ICU-level watch", "Bleeding and oxygen review", "Patency and secretion clearance", "Pathology if sampled", "Oncology or radiotherapy planning"],
        "urgent": "Return of severe breathlessness · noisy breathing · coughing substantial blood · chest pain · blue lips",
    },
    "foreign-body-removal-by-bronchoscopy": {
        "title": "Foreign Body Removal by Bronchoscopy", "family": "foreign-body",
        "labels": ["Object lodged in a main bronchus", "Air trapping beyond obstruction", "Flexible or rigid extraction scope", "Forceps, basket or retrieval tool"],
        "steps": ["Airway emergency and imaging review", "Age-specific anaesthesia planning", "Flexible inspection or rigid access", "Object secured and removed", "Airway inspected for fragments", "Swelling, infection and oxygen watch"],
        "milestones": ["Airway patency confirmation", "Swelling and bleeding watch", "Post-obstructive lung review", "Antibiotics only if indicated", "Swallow or aspiration evaluation"],
        "urgent": "Choking or noisy breathing · new severe breathlessness · blue lips · coughing blood · fever or reduced alertness",
    },
    "pleural-biopsy": {
        "title": "Pleural Biopsy", "family": "pleural-biopsy",
        "labels": ["Parietal pleura lining chest wall", "Pleural thickening or nodules", "Image-guided cutting biopsy needle", "Core tissue for TB or malignancy tests"],
        "steps": ["CT, ultrasound and fluid review", "Choose closed or thoracoscopic route", "Local anaesthetic and sterile entry", "Image-guided cores or visual biopsies", "Histology and microbiology allocation", "Bleeding and pneumothorax monitoring"],
        "milestones": ["Pain and breathing observation", "Pneumothorax check", "Tissue adequacy review", "Histology, culture and biomarkers", "Pleural treatment planning"],
        "urgent": "Increasing breathlessness · sharp chest pain · heavy bleeding · fever with chills · faintness or blue lips",
    },
    "chest-tube-intercostal-drainage": {
        "title": "Chest Tube / Intercostal Drainage", "family": "chest-drain",
        "labels": ["Pleural air or fluid collection", "Tube entering above a rib", "Side holes within pleural space", "Underwater-seal drainage system"],
        "steps": ["Ultrasound and indication confirmation", "Analgesia, sterile prep and monitoring", "Seldinger or blunt-dissection insertion", "Tube connected to underwater seal", "Output, air leak and imaging monitored", "Clamp-free removal plan when resolved"],
        "milestones": ["Breathing and drain-function check", "Output and air-leak tracking", "Suction only when prescribed", "Removal after clinical resolution", "Wound and recurrence follow-up"],
        "urgent": "Drain falls out or disconnects · sudden breathlessness · severe pain · brisk blood drainage · fever or blue lips",
    },
    "lung-transplantation": {
        "title": "Lung Transplantation", "family": "transplant",
        "labels": ["Native diseased lung", "Donor lung in recipient chest", "Bronchial airway anastomosis", "Pulmonary artery and vein connections"],
        "steps": ["Multidisciplinary selection and listing", "Allocation-based donor offer", "Single or bilateral transplant surgery", "Airway and vascular anastomoses", "ICU ventilation and graft surveillance", "Lifelong immunosuppression follow-up"],
        "milestones": ["ICU graft and infection monitoring", "Ventilator weaning and mobilisation", "Rehabilitation and medicine teaching", "Rejection and airway surveillance", "Lifelong transplant-centre follow-up"],
        "urgent": "New breathlessness · falling oxygen or spirometry · fever · chest pain · fainting or inability to take medicines",
    },
}


def font(size: int, bold: bool = False):
    paths = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
        if bold
        else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/liberation2/LiberationSans-Bold.ttf"
        if bold
        else "/usr/share/fonts/truetype/liberation2/LiberationSans-Regular.ttf",
    ]
    for path in paths:
        if Path(path).exists():
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def rounded(draw, box, fill=WHITE, outline=LINE, radius=24, width=3):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def header(draw, title, kicker):
    draw.text((58, 38), kicker.upper(), font=font(18, True), fill=TEAL)
    draw.text((58, 72), title, font=font(34, True), fill=INK)
    draw.text(
        (58, 124),
        "Patient-education schematic · anatomy and plans vary",
        font=font(19),
        fill=MUTED,
    )


def marker(draw, xy, number):
    x, y = xy
    color = TEAL if number % 2 else CORAL
    draw.ellipse((x - 15, y - 15, x + 15, y + 15), fill=color, outline=WHITE, width=3)
    draw.text((x - 6, y - 11), str(number), font=font(17, True), fill=WHITE)


def arrow(draw, start, end, color=NAVY, width=6):
    draw.line([start, end], fill=color, width=width)
    x, y = end
    draw.polygon([(x, y), (x - 16, y - 10), (x - 16, y + 10)], fill=color)


def lungs(draw, cx, cy, scale=1.0):
    """Stylised anterior respiratory tract with anatomically directional branching."""
    s = scale
    draw.ellipse(
        (cx - 190 * s, cy - 145 * s, cx - 15 * s, cy + 175 * s),
        fill=ROSE,
        outline=INK,
        width=4,
    )
    draw.ellipse(
        (cx + 15 * s, cy - 145 * s, cx + 190 * s, cy + 175 * s),
        fill=ROSE,
        outline=INK,
        width=4,
    )
    # Mediastinal notch and diaphragm
    draw.ellipse(
        (cx - 65 * s, cy - 30 * s, cx + 65 * s, cy + 150 * s),
        fill=PALE,
        outline=PALE,
    )
    draw.arc(
        (cx - 205 * s, cy + 85 * s, cx + 205 * s, cy + 215 * s),
        190,
        350,
        fill=NAVY,
        width=3,
    )
    # Larynx and trachea
    draw.rounded_rectangle(
        (cx - 30 * s, cy - 265 * s, cx + 30 * s, cy - 210 * s),
        radius=int(15 * s),
        fill=SKY,
        outline=INK,
        width=3,
    )
    draw.rectangle(
        (cx - 19 * s, cy - 212 * s, cx + 19 * s, cy - 70 * s),
        fill=SKY,
        outline=INK,
        width=3,
    )
    for y in range(int(cy - 195 * s), int(cy - 75 * s), max(8, int(18 * s))):
        draw.line([(cx - 18 * s, y), (cx + 18 * s, y)], fill="#9fbad2", width=2)
    # Main and lobar bronchi
    draw.line(
        [(cx, cy - 70 * s), (cx - 105 * s, cy + 15 * s)],
        fill=GOLD,
        width=int(14 * s),
    )
    draw.line(
        [(cx, cy - 70 * s), (cx + 105 * s, cy + 15 * s)],
        fill=GOLD,
        width=int(14 * s),
    )
    branches = [
        ((cx - 92 * s, cy + 4 * s), (cx - 160 * s, cy - 45 * s)),
        ((cx - 92 * s, cy + 4 * s), (cx - 160 * s, cy + 65 * s)),
        ((cx - 92 * s, cy + 4 * s), (cx - 120 * s, cy + 130 * s)),
        ((cx + 92 * s, cy + 4 * s), (cx + 160 * s, cy - 55 * s)),
        ((cx + 92 * s, cy + 4 * s), (cx + 160 * s, cy + 30 * s)),
        ((cx + 92 * s, cy + 4 * s), (cx + 120 * s, cy + 125 * s)),
    ]
    for start, end in branches:
        draw.line([start, end], fill=GOLD, width=int(8 * s))
    return {
        "larynx": (cx, cy - 240 * s),
        "carina": (cx, cy - 65 * s),
        "left": (cx - 105 * s, cy + 15 * s),
        "right": (cx + 105 * s, cy + 15 * s),
        "target": (cx + 160 * s, cy + 30 * s),
    }


def bronchoscopy_anatomy(draw, box):
    x0, y0, x1, y1 = box
    cx, cy = (x0 + x1) // 2, (y0 + y1) // 2 + 15
    anchors = lungs(draw, cx, cy, 0.78)
    # Flexible scope from mouth-side into right middle lobe.
    path = [
        (cx - 155, cy - 250),
        (cx - 60, cy - 230),
        (cx - 5, cy - 185),
        (cx, cy - 70),
        (cx + 82, cy),
        (cx + 130, cy + 20),
    ]
    draw.line(path, fill=NAVY, width=8, joint="curve")
    draw.ellipse((cx + 122, cy + 12, cx + 140, cy + 30), fill=GREEN, outline=WHITE, width=2)
    draw.line([(cx + 132, cy + 22), (cx + 160, cy + 30)], fill=GREEN, width=3)
    return [
        (anchors["larynx"][0] + 35, anchors["larynx"][1]),
        anchors["carina"],
        (cx - 105, cy - 225),
        (cx + 170, cy + 30),
    ]


def family_anatomy(draw, box, family):
    """Draw shared respiratory landmarks plus a mechanism-specific overlay."""
    if family == "bronchoscopy":
        return bronchoscopy_anatomy(draw, box)
    x0, y0, x1, y1 = box
    cx, cy = (x0 + x1) // 2, (y0 + y1) // 2 + 15
    a = lungs(draw, cx, cy, 0.72)
    anchors = [a["larynx"], a["carina"], a["right"], a["target"]]
    if family == "ebus":
        nodes = [(cx - 55, cy - 70), (cx + 58, cy - 58), (cx + 100, cy + 8)]
        for nx, ny in nodes:
            draw.ellipse((nx - 18, ny - 14, nx + 18, ny + 14), fill=TEAL, outline=INK, width=2)
        draw.line([(cx - 145, cy - 220), (cx, cy - 70), (cx + 45, cy - 60)], fill=NAVY, width=8)
        draw.line([(cx + 40, cy - 58), (cx + 58, cy - 58)], fill=CORAL, width=4)
        return [(cx - 80, cy - 180), nodes[0], (cx + 45, cy - 58), nodes[1]]
    if family == "rigid":
        draw.rounded_rectangle((cx - 32, cy - 250, cx + 32, cy + 30), 10, fill=SKY, outline=NAVY, width=7)
        draw.line([(cx + 15, cy - 80), (cx + 155, cy + 30)], fill=CORAL, width=7)
        return [(cx, cy - 210), a["larynx"], (cx, cy - 20), (cx + 155, cy + 30)]
    if family == "stent":
        draw.rounded_rectangle((cx + 25, cy - 75, cx + 125, cy - 40), 12, fill="#f6d77a", outline=INK, width=3)
        for x in range(cx + 35, cx + 120, 18):
            draw.line([(x, cy - 72), (x, cy - 43)], fill=CORAL, width=3)
        return [a["carina"], (cx + 75, cy - 57), (cx + 105, cy - 57), (cx + 128, cy - 40)]
    if family in ("thoracoscopy", "pleuroscopy"):
        # Outline the left pleural space only; do not imply a tube enters the trachea.
        draw.arc((cx - 205, cy - 160, cx - 5, cy + 190), 90, 270, fill=TEAL, width=12)
        port_y = cy + (30 if family == "thoracoscopy" else 70)
        draw.line([(cx - 255, port_y), (cx - 145, port_y)], fill=NAVY, width=12)
        draw.ellipse((cx - 150, port_y - 10, cx - 130, port_y + 10), fill=GREEN)
        return [(cx - 175, cy), (cx - 195, cy + 75), (cx - 235, port_y), (cx - 135, port_y)]
    if family in ("tblb", "cryobiopsy"):
        target = (cx + 160, cy + 35)
        draw.line([(cx - 120, cy - 220), a["carina"], target], fill=NAVY, width=7)
        if family == "tblb":
            draw.polygon([(target[0], target[1]), (target[0] + 30, target[1] - 16), (target[0] + 25, target[1] + 18)], fill=CORAL)
        else:
            draw.ellipse((target[0] - 12, target[1] - 12, target[0] + 18, target[1] + 18), fill=SKY, outline=NAVY, width=3)
            draw.rectangle((cx + 25, cy - 78, cx + 65, cy - 48), fill=CORAL, outline=INK)
        return [(cx - 80, cy - 180), target, (target[0] + 15, target[1]), (cx + 45, cy - 62)]
    if family in ("endobronchial", "debulking", "foreign-body"):
        target = (cx + 110, cy - 5)
        shape = CORAL if family != "foreign-body" else GOLD
        draw.ellipse((target[0] - 25, target[1] - 22, target[0] + 25, target[1] + 22), fill=shape, outline=INK, width=3)
        draw.line([(cx - 125, cy - 220), a["carina"], (target[0] - 18, target[1])], fill=NAVY, width=8)
        if family == "debulking":
            draw.arc((target[0] - 42, target[1] - 35, target[0] + 42, target[1] + 35), 270, 90, fill=GREEN, width=8)
        if family == "endobronchial":
            draw.polygon([(target[0] - 30, target[1]), (target[0] - 5, target[1] - 10), (target[0] - 5, target[1] + 10)], fill=GREEN)
        return [target, (cx - 70, cy - 170), (target[0] - 25, target[1]), (target[0] + 28, target[1])]
    if family == "tbna":
        node = (cx + 72, cy - 55)
        draw.ellipse((node[0] - 24, node[1] - 18, node[0] + 24, node[1] + 18), fill=TEAL, outline=INK, width=3)
        draw.line([(cx - 120, cy - 220), a["carina"], (node[0] - 25, node[1])], fill=NAVY, width=7)
        draw.line([(node[0] - 28, node[1]), node], fill=CORAL, width=4)
        return [(node[0] - 30, node[1]), node, (cx - 70, cy - 170), (node[0] + 18, node[1])]
    if family == "pleural-biopsy":
        # Right parietal pleural boundary beside the right lung.
        draw.arc((cx + 5, cy - 165, cx + 210, cy + 190), 270, 90, fill=TEAL, width=12)
        draw.line([(cx + 260, cy), (cx + 175, cy)], fill=NAVY, width=8)
        draw.polygon([(cx + 170, cy), (cx + 192, cy - 10), (cx + 192, cy + 10)], fill=CORAL)
        return [(cx + 195, cy - 70), (cx + 180, cy), (cx + 235, cy), (cx + 170, cy)]
    if family == "chest-drain":
        # Pleural boundary and a separate tube entering laterally, then descending
        # externally to the underwater seal.
        draw.arc((cx + 5, cy - 165, cx + 210, cy + 190), 270, 90, fill=TEAL, width=12)
        draw.line([(cx + 175, cy + 40), (cx + 135, cy + 10), (cx + 125, cy - 85)], fill=NAVY, width=10)
        draw.line([(cx + 175, cy + 40), (cx + 245, cy + 40), (cx + 245, cy + 210)], fill=NAVY, width=12)
        draw.rectangle((cx + 205, cy + 190, cx + 285, cy + 255), fill=SKY, outline=INK, width=3)
        draw.line([(cx + 245, cy + 210), (cx + 245, cy + 238)], fill=NAVY, width=6)
        return [(cx + 180, cy - 20), (cx + 180, cy + 40), (cx + 225, cy + 40), (cx + 245, cy + 225)]
    if family == "transplant":
        draw.ellipse((cx + 18, cy - 142, cx + 188, cy + 172), fill="#d9f0e5", outline=GREEN, width=5)
        draw.line([(cx, cy - 70), (cx + 105, cy + 15)], fill=GREEN, width=14)
        draw.ellipse((cx + 12, cy - 78, cx + 42, cy - 48), fill=CORAL, outline=INK, width=3)
        draw.line([(cx + 30, cy - 63), (cx + 80, cy - 100)], fill=CORAL, width=5)
        return [(cx - 105, cy + 15), (cx + 115, cy + 70), (cx + 28, cy - 63), (cx + 75, cy - 95)]
    raise ValueError(f"Unknown anatomy family: {family}")


def anatomy_image(slug, spec):
    image = Image.new("RGB", (1200, 675), PALE)
    draw = ImageDraw.Draw(image)
    header(draw, f"{spec['title']}: relevant anatomy", "Anatomy")
    rounded(draw, (55, 165, 640, 635), fill=WHITE)
    anchors = family_anatomy(draw, (85, 185, 610, 615), spec["family"])
    for index, xy in enumerate(anchors):
        marker(draw, xy, index + 1)
    rounded(draw, (670, 165, 1145, 635), fill=SKY, outline="#a8c4de")
    draw.text((705, 200), "Structures to discuss", font=font(25, True), fill=INK)
    for index, label in enumerate(spec["labels"]):
        y = 262 + index * 82
        marker(draw, (720, y + 12), index + 1)
        for line_number, line in enumerate(wrap(label, width=30)[:2]):
            draw.text((748, y - 2 + line_number * 26), line, font=font(21), fill=INK)
    draw.text((705, 596), "Not to scale · no outcome implied", font=font(17), fill=MUTED)
    image.save(OUT / f"{slug}-anatomy.webp", "WEBP", quality=82, method=6)


def step_icon(draw, box, index):
    x0, y0, x1, y1 = box
    cx, cy = (x0 + x1) // 2, (y0 + y1) // 2
    if index == 0:
        draw.rounded_rectangle((cx - 22, cy - 28, cx + 22, cy + 28), 6, WHITE, NAVY, 3)
        for offset in (-12, 0, 12):
            draw.line([(cx - 12, cy + offset), (cx + 12, cy + offset)], fill=LINE, width=3)
    elif index == 1:
        draw.ellipse((cx - 25, cy - 25, cx + 25, cy + 25), fill=WHITE, outline=NAVY, width=3)
        draw.line([(cx - 17, cy), (cx + 17, cy)], fill=TEAL, width=4)
    elif index == 2:
        draw.arc((cx - 28, cy - 22, cx + 28, cy + 28), 200, 340, fill=NAVY, width=6)
        draw.ellipse((cx - 7, cy - 28, cx + 7, cy - 14), fill=GOLD)
    elif index == 3:
        draw.line([(cx - 28, cy - 24), (cx + 24, cy + 20)], fill=NAVY, width=7)
        draw.ellipse((cx + 17, cy + 13, cx + 31, cy + 27), fill=GREEN)
    elif index == 4:
        draw.ellipse((cx - 25, cy - 25, cx + 25, cy + 25), fill=ROSE, outline=CORAL, width=3)
        draw.line([(cx - 30, cy), (cx + 30, cy)], fill=NAVY, width=4)
    else:
        draw.rounded_rectangle((cx - 30, cy - 8, cx + 30, cy + 18), 6, SKY, NAVY, 3)
        draw.rectangle((cx - 30, cy - 24, cx - 8, cy - 8), fill=CORAL)


def procedure_image(slug, spec):
    image = Image.new("RGB", (1200, 675), WHITE)
    draw = ImageDraw.Draw(image)
    header(draw, f"{spec['title']}: procedure pathway", "Procedure")
    for index, step in enumerate(spec["steps"]):
        column, row = index % 3, index // 3
        x, y = 55 + column * 375, 170 + row * 225
        rounded(draw, (x, y, x + 340, y + 200), fill=PALE if row == 0 else SKY)
        draw.ellipse((x + 20, y + 18, x + 62, y + 60), fill=NAVY)
        draw.text((x + 34, y + 27), str(index + 1), font=font(20, True), fill=WHITE)
        step_icon(draw, (x + 250, y + 10, x + 330, y + 80), index)
        for line_number, line in enumerate(wrap(step, width=26)[:3]):
            draw.text((x + 22, y + 88 + line_number * 29), line, font=font(20, True), fill=INK)
        if column < 2:
            arrow(draw, (x + 344, y + 100), (x + 370, y + 100), width=5)
    draw.text(
        (55, 630),
        "The respiratory team may change the plan after examination, imaging and consent.",
        font=font(18),
        fill=MUTED,
    )
    image.save(OUT / f"{slug}-procedure.webp", "WEBP", quality=82, method=6)


def recovery_image(slug, spec):
    image = Image.new("RGB", (1200, 675), PALE)
    draw = ImageDraw.Draw(image)
    header(draw, f"{spec['title']}: recovery and results", "Recovery")
    draw.text(
        (58, 175),
        "Discharge ≠ fitness to fly · timings depend on respiratory status and samples",
        font=font(18),
        fill=MUTED,
    )
    draw.line([(110, 290), (1090, 290)], fill="#b7cce0", width=12)
    count = len(spec["milestones"])
    for index, item in enumerate(spec["milestones"]):
        x = 120 + index * (960 // (count - 1))
        draw.ellipse(
            (x - 38, 252, x + 38, 328),
            fill=NAVY if index < count - 1 else CORAL,
            outline=WHITE,
            width=6,
        )
        draw.text((x - 7, 276), str(index + 1), font=font(21, True), fill=WHITE)
        rounded(draw, (x - 100, 355, x + 100, 475), fill=WHITE)
        lines = wrap(item, width=17)[:3]
        top = 402 if len(lines) == 1 else 390 if len(lines) == 2 else 378
        for line_number, line in enumerate(lines):
            bounds = draw.textbbox((0, 0), line, font=font(18, True))
            draw.text(
                (x - (bounds[2] - bounds[0]) / 2, top + line_number * 25),
                line,
                font=font(18, True),
                fill=INK,
            )
    rounded(draw, (55, 520, 1145, 640), fill="#fdf1ef", outline=CORAL, radius=18)
    draw.text((82, 540), "Seek urgent respiratory review for:", font=font(19, True), fill=CORAL)
    for line_number, line in enumerate(wrap(spec["urgent"], width=95)[:2]):
        draw.text((82, 572 + line_number * 26), line, font=font(19), fill=INK)
    image.save(OUT / f"{slug}-recovery.webp", "WEBP", quality=82, method=6)


for slug, specification in DATA.items():
    anatomy_image(slug, specification)
    procedure_image(slug, specification)
    recovery_image(slug, specification)

print(f"Generated {len(DATA) * 3} WebP diagrams in {OUT}")
