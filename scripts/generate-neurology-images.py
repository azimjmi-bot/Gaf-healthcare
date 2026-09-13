"""Generate original patient-education diagrams for Neurology cost guides."""

from pathlib import Path
from textwrap import wrap
from PIL import Image, ImageDraw, ImageFont

OUT = Path(__file__).parents[1] / "public/images/cost/neurology"
OUT.mkdir(parents=True, exist_ok=True)

INK = "#1b2a4a"
MUTED = "#5b6d86"
NAVY = "#1d4e89"
SKY = "#d9e7f6"
PALE = "#f4f7fb"
CORAL = "#c45c5c"
ROSE = "#f3d4d0"
WHITE = "#ffffff"
GOLD = "#d4a017"
TEAL = "#2a7f7a"

DATA = {
    "eeg": ("Routine EEG", "eeg", ["Scalp electrodes", "Cerebral signal", "Multichannel trace", "Activation"], ["Place electrodes", "Record and activate", "Interpret the trace"], ["Remove paste", "Safety advice", "Signed report", "Neurology review"]),
    "video-eeg": ("Video EEG", "video", ["Continuous EEG", "Synchronized video", "Event marker", "Rescue plan"], ["Admit and connect", "Capture typical events", "Correlate video + EEG"], ["Restore medicines", "Seizure safety", "Classify events", "Epilepsy review"]),
    "electromyography-emg": ("Needle EMG", "emg", ["Motor nerve", "Muscle fibres", "Needle electrode", "Motor-unit trace"], ["Map weak muscles", "Sample rest + effort", "Localize the pattern"], ["Soreness care", "Bleeding watch", "Signed report", "Clinical correlation"]),
    "nerve-conduction-study": ("Nerve conduction study", "ncs", ["Stimulating electrode", "Peripheral nerve", "Recording electrode", "Response waveform"], ["Select nerves", "Stimulate + record", "Measure responses"], ["Skin comfort", "Technical review", "Localization", "Next-step plan"]),
    "evoked-potentials": ("Evoked potentials", "evoked", ["Visual pattern", "Auditory click", "Limb stimulus", "Cortical response"], ["Name the pathway", "Repeat stimuli", "Average + interpret"], ["No wound care", "Review limits", "Compare imaging", "Specialist follow-up"]),
    "lumbar-puncture": ("Lumbar puncture", "lp", ["Lumbar vertebrae", "CSF space", "Needle path", "Labelled tubes"], ["Check contraindications", "Measure + sample CSF", "Send tests promptly"], ["Headache watch", "Puncture care", "CSF results", "Urgent review if needed"]),
    "iv-thrombolysis": ("IV thrombolysis", "lysis", ["Brain artery", "Occluding clot", "IV medicine", "Bleeding screen"], ["Activate stroke code", "Image + assess", "Dose and monitor"], ["Haemorrhage watch", "Swallow check", "Rehabilitation", "Prevention plan"]),
    "transcranial-doppler-tcd": ("Transcranial Doppler", "tcd", ["Temporal window", "Intracranial artery", "Ultrasound beam", "Velocity waveform"], ["Find cranial window", "Acquire waveforms", "Interpret velocities"], ["Review window limits", "Compare trends", "Vascular imaging", "Stroke plan"]),
    "carotid-doppler": ("Carotid Doppler", "carotid", ["Neck carotid", "Plaque", "Colour flow", "Spectral waveform"], ["Scan both neck sides", "Measure velocities", "Grade in context"], ["Signed report", "Urgent symptom plan", "Compare CTA/MRA", "Vascular review"]),
    "mri-guided-focused-ultrasound-mrgfus": ("MR-guided focused ultrasound", "mrgfus", ["MRI guidance", "Ultrasound beams", "Thalamic target", "Thermal map"], ["Fix frame + target", "Test sonications", "Create planned lesion"], ["Pin-site care", "Gait review", "Speech + sensation", "Tremor follow-up"]),
    "botulinum-toxin-therapy": ("Botulinum toxin therapy", "botox", ["Named muscle", "Motor endplate", "Dose + dilution", "Targeted sites"], ["Define treatment goal", "Map dose + sites", "Inject precisely"], ["Delayed effect", "Weakness watch", "Therapy review", "Repeat decision"]),
    "plasmapheresis": ("Plasmapheresis", "plex", ["Blood access", "Apheresis circuit", "Removed plasma", "Replacement fluid"], ["Check access + labs", "Exchange plasma", "Monitor calcium + BP"], ["Access care", "Course sessions", "Strength review", "Immune plan"]),
    "ivig-intravenous-immunoglobulin": ("IVIG", "ivig", ["Weight-based dose", "IV line", "Immunoglobulin", "Rate monitor"], ["Calculate total grams", "Increase rate safely", "Assess response"], ["Hydration advice", "Reaction watch", "Renal + clot review", "Course planning"]),
    "nerve-and-muscle-biopsy": ("Nerve and muscle biopsy", "biopsy", ["Selected nerve", "Selected muscle", "Exact biopsy site", "Special pathology"], ["Choose viable tissue", "Remove without crush", "Handle each specimen"], ["Wound care", "Sensory change", "Pathology panel", "Integrated review"]),
    "vagus-nerve-stimulation-vns": ("Vagus nerve stimulation", "vns", ["Left vagus nerve", "Neck lead", "Chest generator", "Programmed pulses"], ["Confirm drug resistance", "Implant lead + device", "Activate later"], ["Two wound checks", "Voice + swallow", "Programming", "Battery pathway"]),
    "sleep-study-polysomnography": ("Polysomnography", "psg", ["EEG + eye channels", "Airflow + effort", "Oxygen + ECG", "Limb movement"], ["Apply all sensors", "Record attended night", "Score sleep + events"], ["Remove sensors", "Fatigue caution", "Scored report", "Sleep-clinic plan"]),
    "migraine-nerve-block": ("Migraine nerve block", "block", ["Occipital nerve", "Pericranial target", "Local anaesthetic", "Injection field"], ["Confirm headache type", "Mark nerve + side", "Inject and observe"], ["Temporary numbness", "Injection-site care", "Benefit diary", "Prevention review"]),
}


def font(size, bold=False):
    candidates = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/liberation2/LiberationSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/liberation2/LiberationSans-Regular.ttf",
    ]
    for candidate in candidates:
        if Path(candidate).exists():
            return ImageFont.truetype(candidate, size)
    return ImageFont.load_default()


def rounded(draw, box, fill=WHITE, outline="#c5d4e4", radius=24, width=3):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def arrow(draw, start, end, color=NAVY, width=7):
    draw.line([start, end], fill=color, width=width)
    x, y = end
    draw.polygon([(x, y), (x - 17, y - 10), (x - 17, y + 10)], fill=color)


def header(draw, title, kicker):
    draw.text((58, 38), kicker.upper(), font=font(18, True), fill=TEAL)
    draw.text((58, 72), title, font=font(34, True), fill=INK)
    draw.text((58, 124), "Patient-education schematic · anatomy and plans vary", font=font(19), fill=MUTED)


def brain(draw, cx, cy):
    draw.ellipse((cx - 78, cy - 64, cx + 78, cy + 70), fill=ROSE, outline=INK, width=4)
    for offset in (-35, 0, 35):
        draw.arc((cx - 60 + offset // 3, cy - 42, cx + 20 + offset // 3, cy + 35), 200, 30, fill="#d69b95", width=3)


def draw_family(draw, family, box):
    x0, y0, x1, y1 = box
    cx, cy = (x0 + x1) // 2, (y0 + y1) // 2
    if family in {"eeg", "video"}:
        brain(draw, cx, cy)
        for dx, dy in [(-45, -35), (0, -48), (45, -30), (-30, 20), (30, 28)]:
            draw.ellipse((cx + dx - 7, cy + dy - 7, cx + dx + 7, cy + dy + 7), fill=GOLD)
        draw.line([(cx + 75, cy), (cx + 125, cy)], fill=TEAL, width=5)
        if family == "video":
            draw.rectangle((cx + 90, cy - 62, cx + 142, cy - 20), fill=SKY, outline=NAVY, width=3)
            draw.polygon([(cx + 142, cy - 52), (cx + 162, cy - 62), (cx + 162, cy - 20), (cx + 142, cy - 30)], fill=NAVY)
    elif family in {"emg", "ncs"}:
        draw.rounded_rectangle((cx - 105, cy - 40, cx + 75, cy + 45), radius=38, fill=ROSE, outline=INK, width=4)
        if family == "emg":
            draw.line([(cx - 50, cy - 105), (cx, cy + 5)], fill=GOLD, width=5)
        else:
            draw.ellipse((cx - 90, cy - 70, cx - 55, cy - 35), fill=GOLD, outline=INK)
            draw.ellipse((cx + 45, cy - 70, cx + 80, cy - 35), fill=TEAL, outline=INK)
            draw.arc((cx - 58, cy - 20, cx + 50, cy + 65), 190, 350, fill=NAVY, width=4)
    elif family == "evoked":
        brain(draw, cx + 40, cy)
        for y, color in [(cy - 65, GOLD), (cy, TEAL), (cy + 65, CORAL)]:
            arrow(draw, (cx - 125, y), (cx - 48, cy + (y - cy) // 3), color, 5)
    elif family == "lp":
        for i in range(4):
            draw.rounded_rectangle((cx - 45, cy - 100 + i * 50, cx + 45, cy - 65 + i * 50), radius=10, fill=SKY, outline=NAVY)
        draw.line([(cx + 125, cy + 5), (cx + 20, cy + 5)], fill=GOLD, width=5)
        draw.ellipse((cx + 10, cy - 6, cx + 30, cy + 14), fill=CORAL)
    elif family in {"lysis", "tcd", "carotid"}:
        if family == "carotid":
            draw.arc((cx - 70, cy - 100, cx + 80, cy + 100), 105, 255, fill=NAVY, width=13)
            draw.ellipse((cx - 5, cy - 20, cx + 28, cy + 18), fill=CORAL)
            draw.polygon([(cx + 80, cy - 80), (cx + 130, cy - 45), (cx + 80, cy - 10)], fill=SKY, outline=TEAL)
        else:
            brain(draw, cx, cy)
            draw.arc((cx - 50, cy - 20, cx + 55, cy + 70), 190, 350, fill=NAVY, width=10)
            if family == "lysis":
                draw.ellipse((cx + 12, cy + 12, cx + 42, cy + 42), fill=CORAL)
                arrow(draw, (cx + 130, cy + 25), (cx + 50, cy + 25), GOLD, 5)
            else:
                draw.polygon([(cx - 150, cy - 55), (cx - 70, cy - 15), (cx - 150, cy + 25)], fill=SKY, outline=TEAL)
    elif family == "mrgfus":
        brain(draw, cx, cy)
        draw.ellipse((cx - 8, cy - 8, cx + 10, cy + 10), fill=CORAL)
        for sy in (-80, -30, 30, 80):
            draw.line([(cx - 145, cy + sy), (cx, cy)], fill=GOLD, width=3)
    elif family == "botox":
        draw.rounded_rectangle((cx - 100, cy - 85, cx + 80, cy + 85), radius=70, fill=ROSE, outline=INK, width=4)
        for px, py in [(-50, -45), (20, -30), (-30, 20), (35, 50)]:
            draw.line([(cx + px + 60, cy + py - 70), (cx + px, cy + py)], fill=GOLD, width=4)
            draw.ellipse((cx + px - 6, cy + py - 6, cx + px + 6, cy + py + 6), fill=CORAL)
    elif family in {"plex", "ivig"}:
        rounded(draw, (cx - 105, cy - 70, cx + 105, cy + 70), fill=SKY, outline=NAVY, radius=18)
        if family == "plex":
            draw.ellipse((cx - 28, cy - 28, cx + 28, cy + 28), fill=CORAL)
            arrow(draw, (cx - 145, cy), (cx - 38, cy), GOLD, 5)
            arrow(draw, (cx + 38, cy), (cx + 145, cy), TEAL, 5)
        else:
            draw.rectangle((cx - 25, cy - 120, cx + 25, cy - 60), fill=WHITE, outline=NAVY, width=3)
            draw.line([(cx, cy - 60), (cx, cy + 55)], fill=GOLD, width=5)
            draw.ellipse((cx - 8, cy + 45, cx + 8, cy + 62), fill=CORAL)
    elif family == "biopsy":
        draw.line([(cx - 120, cy - 40), (cx + 40, cy - 40)], fill=NAVY, width=15)
        draw.rounded_rectangle((cx - 110, cy + 25, cx + 60, cy + 80), radius=25, fill=ROSE, outline=INK, width=4)
        draw.line([(cx + 120, cy - 100), (cx + 10, cy + 35)], fill=GOLD, width=5)
    elif family == "vns":
        brain(draw, cx - 40, cy - 60)
        draw.line([(cx - 5, cy - 5), (cx + 20, cy + 80)], fill=TEAL, width=6)
        rounded(draw, (cx + 20, cy + 40, cx + 105, cy + 120), fill=SKY, outline=NAVY, radius=15)
    elif family == "psg":
        draw.ellipse((cx - 80, cy - 65, cx + 80, cy + 65), fill=ROSE, outline=INK, width=4)
        for px, py, color in [(-45, -30, GOLD), (0, -45, TEAL), (45, -20, CORAL), (-25, 25, NAVY)]:
            draw.ellipse((cx + px - 8, cy + py - 8, cx + px + 8, cy + py + 8), fill=color)
        draw.line([(cx + 80, cy), (cx + 150, cy)], fill=NAVY, width=4)
    elif family == "block":
        draw.arc((cx - 80, cy - 90, cx + 80, cy + 90), 70, 290, fill=INK, width=5)
        draw.line([(cx - 50, cy + 40), (cx - 20, cy - 40)], fill=TEAL, width=6)
        draw.line([(cx - 125, cy - 80), (cx - 30, cy - 20)], fill=GOLD, width=5)
        draw.ellipse((cx - 38, cy - 28, cx - 20, cy - 10), fill=CORAL)


def anatomy_image(slug, spec):
    title, family, labels, _, _ = spec
    image = Image.new("RGB", (1200, 675), PALE)
    draw = ImageDraw.Draw(image)
    header(draw, f"{title}: anatomy or mechanism", "Anatomy")
    rounded(draw, (55, 175, 625, 625))
    draw_family(draw, family, (95, 195, 585, 605))
    rounded(draw, (660, 175, 1145, 625), fill=SKY, outline="#a8c4de")
    draw.text((700, 215), "What the diagram identifies", font=font(25, True), fill=INK)
    for i, label in enumerate(labels):
        y = 285 + i * 73
        draw.ellipse((700, y, 720, y + 20), fill=CORAL if i % 2 else TEAL)
        draw.text((742, y - 5), label, font=font(22), fill=INK)
    draw.text((700, 582), "Not to scale · no outcome implied", font=font(17), fill=MUTED)
    image.save(OUT / f"{slug}-anatomy.webp", "WEBP", quality=82, method=6)


def procedure_image(slug, spec):
    title, family, _, steps, _ = spec
    image = Image.new("RGB", (1200, 675), WHITE)
    draw = ImageDraw.Draw(image)
    header(draw, f"{title}: procedure pathway", "Procedure")
    for i, step in enumerate(steps):
        x = 55 + i * 380
        rounded(draw, (x, 195, x + 326, 575), fill=SKY if i == 1 else PALE)
        draw.ellipse((x + 24, 218, x + 74, 268), fill=NAVY)
        draw.text((x + 41, 226), str(i + 1), font=font(22, True), fill=WHITE)
        for line_no, line in enumerate(wrap(step, width=23)):
            draw.text((x + 25, 292 + line_no * 29), line, font=font(21, True), fill=INK)
        draw_family(draw, family, (x + 35, 395, x + 305, 550))
        if i < 2:
            arrow(draw, (x + 335, 386), (x + 373, 386), width=6)
    draw.text((55, 620), "The treating neurology team may change the protocol after assessment and consent.", font=font(18), fill=MUTED)
    image.save(OUT / f"{slug}-procedure.webp", "WEBP", quality=82, method=6)


def recovery_image(slug, spec):
    title, _, _, _, milestones = spec
    image = Image.new("RGB", (1200, 675), PALE)
    draw = ImageDraw.Draw(image)
    header(draw, f"{title}: recovery or ongoing care", "Recovery")
    draw.line([(125, 360), (1075, 360)], fill="#b7cce0", width=12)
    for i, item in enumerate(milestones):
        x = 140 + i * 300
        draw.ellipse((x - 42, 318, x + 42, 402), fill=NAVY if i < 3 else CORAL, outline=WHITE, width=6)
        draw.text((x - 8, 335), str(i + 1), font=font(22, True), fill=WHITE)
        rounded(draw, (x - 118, 435, x + 118, 548))
        lines = wrap(item, width=16)
        top = 463 if len(lines) == 1 else 450
        for line_no, line in enumerate(lines):
            bbox = draw.textbbox((0, 0), line, font=font(20, True))
            draw.text((x - (bbox[2] - bbox[0]) / 2, top + line_no * 26), line, font=font(20, True), fill=INK)
    rounded(draw, (55, 580, 1145, 640), fill=SKY, outline="#a8c4de", radius=18)
    draw.text((82, 598), "Discharge ≠ fitness to fly · follow procedure-specific warning signs", font=font(20, True), fill=INK)
    image.save(OUT / f"{slug}-recovery.webp", "WEBP", quality=82, method=6)


for slug, details in DATA.items():
    anatomy_image(slug, details)
    procedure_image(slug, details)
    recovery_image(slug, details)

print(f"Generated {len(DATA) * 3} WebP diagrams in {OUT}")
