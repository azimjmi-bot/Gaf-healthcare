"""Generate original patient-education diagrams for Urology cost guides.

Three 1200x675 WebP figures per procedure:
  *-anatomy.webp    urinary-tract schematic with the procedure-specific highlight
  *-procedure.webp  six-step treatment pathway
  *-recovery.webp   recovery milestones and warning signs
"""

from pathlib import Path
from textwrap import wrap

from PIL import Image, ImageDraw, ImageFont

OUT = Path(__file__).parents[1] / "public/images/cost/urology"
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
GREEN = "#3fae6a"
STONE = "#8d8d8d"
LINE = "#c5d4e4"

DATA = {
    "pcnl-percutaneous-nephrolithotomy": {
        "title": "PCNL",
        "family": "pcnl",
        "labels": ["Staghorn stone in the renal pelvis", "Percutaneous tract through the back", "Nephroscope and laser / ultrasonic probe", "Nephrostomy tube or stent"],
        "steps": ["CT KUB: stone size, density and calyces", "Urine culture and clotting", "Prone or supine positioning", "Puncture and tract dilation", "Fragment and remove the stone", "Nephrostomy, stent or tubeless"],
        "milestones": ["Bleeding and fever watch", "Nephrostomy out (1–3 days)", "Imaging for clearance", "Stent removal (1–4 weeks)", "Travel clearance"],
        "urgent": "Heavy bleeding or clots · fever with chills · severe flank pain · breathlessness",
    },
    "rirs-retrograde-intrarenal-surgery": {
        "title": "RIRS",
        "family": "rirs",
        "labels": ["Kidney stone in a calyx", "Ureter as the natural corridor", "Flexible ureteroscope with laser fibre", "Ureteral access sheath and stent"],
        "steps": ["CT KUB and urine culture", "Pre-stent if the ureter is tight", "Guidewire and access sheath", "Flexible scope into the kidney", "Laser dusting or basket retrieval", "Stent for days to weeks"],
        "milestones": ["Stent symptoms expected", "Fever and bleeding checks", "Imaging for clearance", "Stent removal date fixed", "Travel clearance"],
        "urgent": "Fever with chills · unrelieved flank pain · heavy bleeding · unable to pass urine",
    },
    "ureteroscopy": {
        "title": "Ureteroscopy",
        "family": "urs",
        "labels": ["Stone lodged in the ureter", "Kidney swelling above the block", "Semi-rigid ureteroscope", "Laser or pneumatic probe and basket"],
        "steps": ["CT confirms stone and swelling", "Drain first if infected", "Guidewire beyond the stone", "Ureteroscope to the stone", "Fragment and basket out", "Optional short-term stent"],
        "milestones": ["Same-day or overnight discharge", "Burning and pink urine settle", "Fever warning", "Stent removal if placed", "Travel clearance"],
        "urgent": "Fever with chills · uncontrolled pain · heavy bleeding · unable to pass urine",
    },
    "eswl-extracorporeal-shock-wave-lithotripsy": {
        "title": "ESWL",
        "family": "eswl",
        "labels": ["Stone in the renal pelvis", "External shock-wave head on the flank", "Focused shock waves converge on the stone", "Fragments pass down the ureter"],
        "steps": ["CT: size, density, skin-to-stone distance", "X-ray shows the stone is visible", "Sedation and positioning", "Target under fluoroscopy or ultrasound", "Deliver a few thousand shocks", "Follow-up imaging in 2–4 weeks"],
        "milestones": ["Same-day discharge", "Fragments pass with pain control", "Fever or blockage warning", "Imaging confirms clearance", "Repeat session or switch"],
        "urgent": "Fever with chills · severe pain · heavy bleeding · no urine output",
    },
    "pyeloplasty": {
        "title": "Pyeloplasty",
        "family": "pyelo",
        "labels": ["Dilated renal pelvis (hydronephrosis)", "Narrow ureteropelvic junction", "Crossing blood vessel", "New wide join over a stent"],
        "steps": ["CT or MR urogram", "Nuclear scan: function and drainage", "Laparoscopic or robotic ports", "Excise the narrow segment", "Re-join pelvis to ureter over a stent", "Drain and catheter"],
        "milestones": ["Catheter out (1–2 days)", "Drain out when dry", "Urine-leak and fever watch", "Stent removal (4–6 weeks)", "Nuclear scan months later"],
        "urgent": "Fever with chills · worsening pain · urine-like drain fluid · vomiting with distension",
    },
    "radical-nephrectomy": {
        "title": "Radical nephrectomy",
        "family": "nephrectomy",
        "labels": ["Large or central kidney tumour", "Renal artery and vein", "Gerota's fascia removed with the kidney", "Healthy opposite kidney"],
        "steps": ["Contrast CT staging", "Chest CT and kidney function", "Laparoscopic, robotic or open access", "Control artery and vein", "Remove kidney within its fascia", "Histopathology"],
        "milestones": ["ICU or ward monitoring", "Creatinine and urine output", "Drain and staples out", "Histopathology review", "Surveillance plan"],
        "urgent": "Heavy bleeding · fever · breathlessness or chest pain · swollen painful leg · low urine output",
    },
    "turp-transurethral-resection-of-the-prostate": {
        "title": "TURP",
        "family": "turp",
        "labels": ["Bladder", "Enlarged prostate compressing the urethra", "Resectoscope loop shaving tissue", "External sphincter preserved below"],
        "steps": ["Symptom score and flow test", "Prostate ultrasound and PSA", "Urine culture", "Resectoscope along the urethra", "Shave tissue, seal bleeding", "Catheter with irrigation"],
        "milestones": ["Overnight irrigation", "Catheter out (1–3 days)", "Voiding trial", "Burning settles over weeks", "Travel clearance"],
        "urgent": "Heavy bleeding or clots · unable to pass urine · fever with chills · confusion",
    },
    "holep-holmium-laser-enucleation": {
        "title": "HoLEP",
        "family": "holep",
        "labels": ["Bladder", "Adenoma inside its thin capsule", "Laser fibre in the plane adenoma–capsule", "Morcellator removes lobes from the bladder"],
        "steps": ["Prostate volume and PSA", "Urine culture and anticoagulant plan", "Laser incision at bladder neck", "Enucleate lobes into the bladder", "Morcellate and remove", "Laser haemostasis and catheter"],
        "milestones": ["Catheter out (1–2 days)", "Voiding trial", "Pelvic-floor exercises", "Leakage improves over weeks", "Histopathology and travel"],
        "urgent": "Heavy bleeding · unable to pass urine · fever with chills · severe pain",
    },
    "greenlight-laser-surgery": {
        "title": "GreenLight laser",
        "family": "greenlight",
        "labels": ["Bladder", "Enlarged prostate narrowing the urethra", "Side-firing green laser beam", "Vaporized surface with sealed vessels"],
        "steps": ["Symptom score and flow test", "Volume, PSA and cancer exclusion", "Anticoagulation plan", "Cystoscope with side-firing fibre", "Vaporize lobes layer by layer", "Short catheter"],
        "milestones": ["Catheter out (same/next day)", "Irritative symptoms 2–6 weeks", "Bleeding and fever warning", "Flow check", "Travel clearance"],
        "urgent": "Unable to pass urine · fever with chills · heavy bleeding · severe pelvic pain",
    },
    "turbt-transurethral-resection-of-bladder-tumor": {
        "title": "TURBT",
        "family": "turbt",
        "labels": ["Papillary tumour on the bladder lining", "Bladder wall layers incl. detrusor muscle", "Resectoscope loop at the tumour base", "Specimen with muscle for staging"],
        "steps": ["Urine cytology and cystoscopy", "CT urography", "Map the bladder (blue light / NBI)", "Resect tumour including muscle", "Labelled specimens to pathology", "Optional single-dose chemotherapy"],
        "milestones": ["Catheter out (1–2 days)", "Bleeding and perforation watch", "Histopathology and risk group", "Re-staging TURBT or BCG plan", "Surveillance cystoscopy"],
        "urgent": "Heavy bleeding or clots · unable to pass urine · fever with chills · severe abdominal pain",
    },
    "bladder-reconstruction": {
        "title": "Bladder reconstruction",
        "family": "recon",
        "labels": ["Small high-pressure bladder", "Bowel segment on its blood supply", "Augmentation patch or neobladder pouch", "Ureters and urethra joined over stents"],
        "steps": ["Video-urodynamics and cystoscopy", "Kidney imaging and bowel history", "Isolate a bowel segment", "Detubularise and fold into a patch or pouch", "Join to bladder or ureters and urethra", "Stents, catheters and drain"],
        "milestones": ["ICU and bowel recovery", "Catheter flushing for mucus", "Contrast study before removal", "Voiding or self-catheterisation training", "Electrolyte follow-up"],
        "urgent": "Fever with chills · severe abdominal pain or distension · vomiting · no catheter output",
    },
    "urinary-diversion": {
        "title": "Urinary diversion",
        "family": "diversion",
        "labels": ["Both ureters joined to a bowel segment", "Ileal conduit", "Stoma on the abdominal wall", "External collection appliance"],
        "steps": ["Kidney imaging and function", "Stoma-site marking by stoma nurse", "Isolate an ileal segment", "Join ureters over stents", "Form the spouted stoma", "Fit the appliance and teach"],
        "milestones": ["Bowel recovery", "Stent removal (1–3 weeks)", "Stoma and skin care training", "Electrolyte and kidney checks", "Supplies handover and travel"],
        "urgent": "Fever with chills · dusky stoma · no output into the appliance · severe abdominal pain · flank pain",
    },
    "kidney-transplantation": {
        "title": "Kidney transplantation",
        "family": "transplant",
        "labels": ["Failed native kidneys left in place", "Donor kidney in the lower abdomen", "Artery and vein joined to iliac vessels", "Donor ureter joined to the bladder"],
        "steps": ["Blood group, HLA and crossmatch", "Legal authorisation committee", "Recipient fitness work-up", "Implant: vessels then ureter", "ICU monitoring and immunosuppression", "Frequent laboratories"],
        "milestones": ["Urine output and creatinine", "Drug-level adjustment", "Stent removal (2–6 weeks)", "Infection precautions", "Home clinic handover"],
        "urgent": "Fever · sudden fall in urine output · pain or swelling over the graft · missed doses",
    },
    "living-donor-kidney-transplantation": {
        "title": "Living donor transplant",
        "family": "living",
        "labels": ["Donor: one kidney removed laparoscopically", "Donor's remaining kidney adapts", "Recipient: kidney implanted in the pelvis", "Vessels and ureter joined"],
        "steps": ["Donor and recipient compatibility", "Donor safety evaluation", "Legal approval of the relationship", "Coordinated donor nephrectomy", "Recipient implantation", "ICU and immunosuppression"],
        "milestones": ["Donor discharged in days", "Recipient creatinine trend", "Drug levels and stent removal", "Clinic visits for both", "Travel clearance for both"],
        "urgent": "Recipient: fever, falling urine, graft pain, missed doses · Donor: fever, bleeding, severe pain",
    },
    "deceased-donor-kidney-transplantation": {
        "title": "Deceased donor transplant",
        "family": "deceased",
        "labels": ["Donor kidney preserved in cold storage", "Registry allocation to domestic wait-lists", "Recipient implantation in the pelvis", "Delayed graft function may need dialysis"],
        "steps": ["Registry listing and antibody screen", "Urgent organ offer", "Final crossmatch, dialysis if needed", "Implant: vessels then ureter", "ICU and induction immunosuppression", "Dialysis if the graft starts slowly"],
        "milestones": ["Delayed function watch", "Creatinine and urine output", "Drug-level adjustment", "Stent removal", "Home clinic handover"],
        "urgent": "Fever · sudden fall in urine output · pain over the graft · breathlessness · missed doses",
    },
    "abo-incompatible-kidney-transplantation": {
        "title": "ABO-incompatible transplant",
        "family": "abo",
        "labels": ["Incompatible donor and recipient blood groups", "Plasma exchange removes antibodies", "Rituximab and immunoglobulin", "Transplant once the titre is low"],
        "steps": ["Baseline anti-A/anti-B titre", "Rituximab", "Plasma-exchange sessions", "Titre below threshold", "Donor and recipient operations", "Daily titres for 2 weeks"],
        "milestones": ["Titre and creatinine watch", "Rebound exchanges if needed", "Infection precautions", "Accommodation phase", "Home protocol handover"],
        "urgent": "Fever · falling urine output · graft pain · unusual bleeding or bruising · missed doses",
    },
    "urethroplasty": {
        "title": "Urethroplasty",
        "family": "urethroplasty",
        "labels": ["Male urethra from bladder to tip", "Scarred narrowed bulbar segment", "Excise and re-join, or widen with a graft", "Buccal graft from the inner cheek"],
        "steps": ["Urethrogram and flow test", "Perineal exposure", "Excise scar or open the stricture", "Harvest buccal graft if needed", "Anastomosis or graft onlay", "Catheter splint 2–3 weeks"],
        "milestones": ["Perineal and cheek care", "Catheter for 2–3 weeks", "Contrast study before removal", "Voiding check", "Flow surveillance for years"],
        "urgent": "Fever with chills · heavy bleeding · catheter stops draining · severe perineal swelling",
    },
    "viu-visual-internal-urethrotomy": {
        "title": "VIU",
        "family": "viu",
        "labels": ["Short ring of scar in the bulbar urethra", "Urethrotome passed under vision", "Cold-knife or laser incision of the scar", "Catheter for a few days"],
        "steps": ["Urethrogram and flow test", "Urine culture", "Guidewire through the stricture", "Incise the scar under vision", "Pass a cystoscope to confirm", "Catheter 1–5 days"],
        "milestones": ["Catheter out in days", "Voiding check", "Self-dilatation teaching (optional)", "Flow-rate surveillance", "Urethroplasty if it recurs"],
        "urgent": "Fever with chills · heavy bleeding · unable to pass urine · perineal or scrotal swelling",
    },
    "urinary-tract-reconstruction": {
        "title": "Urinary tract reconstruction",
        "family": "ureter",
        "labels": ["Narrowed or injured ureteric segment", "Kidney protected by stent or nephrostomy", "Re-implant with a bladder flap or re-join", "Bowel or graft substitute for long defects"],
        "steps": ["CT urogram and nuclear scan", "Preliminary stent or nephrostomy", "Expose the damaged segment", "Excise and re-implant or re-join", "Substitute if the defect is long", "Stent and drain"],
        "milestones": ["Drain and catheter out", "Urine-leak and fever watch", "Stent removal (4–8 weeks)", "Follow-up imaging", "Travel clearance"],
        "urgent": "Fever with chills · urine-like drain fluid · worsening flank pain · vomiting with distension",
    },
    "hypospadias-repair": {
        "title": "Hypospadias repair",
        "family": "hypospadias",
        "labels": ["Normal opening at the tip", "Distal, mid-shaft or proximal opening", "Downward curvature (chordee)", "Hooded foreskin used for repair"],
        "steps": ["Paediatric urology assessment", "Anaesthesia and nerve block", "Deglove and straighten", "Tubularise the urethral plate over a stent", "Reconstruct glans and skin", "Dressing and stent"],
        "milestones": ["Double-nappy drainage", "Dressing and stent out (5–10 days)", "Watch for fistula or thin stream", "Voiding comfortably", "Follow-up plan and travel"],
        "urgent": "No urine for many hours · bleeding through the dressing · fever · slipped dressing or stent",
    },
    "pediatric-urological-surgery": {
        "title": "Paediatric urology",
        "family": "pediatric",
        "labels": ["Child's kidneys, ureters and bladder", "Vesicoureteral reflux on one side", "Undescended testis in the groin", "Normal scrotal position"],
        "steps": ["Paediatric urology consultation", "Ultrasound and cystogram", "Paediatric anaesthesia and block", "The named operation", "Ward recovery with a parent", "First review"],
        "milestones": ["Pain control and feeding", "Catheter or wound check", "Fever warning", "Follow-up imaging months later", "Travel clearance"],
        "urgent": "Fever · no urine for many hours · vomiting with distension · swollen discoloured scrotum",
    },
    "penile-implant": {
        "title": "Penile implant",
        "family": "implant",
        "labels": ["Paired erectile cylinders (corpora)", "Inflatable cylinders inside the corpora", "Pump in the scrotum", "Fluid reservoir in the lower abdomen"],
        "steps": ["Andrology assessment and HbA1c", "Device selection", "Infection precautions", "Small penoscrotal incision", "Cylinders, pump and reservoir", "Wound closure and catheter"],
        "milestones": ["Catheter out next morning", "Swelling and infection watch", "Device kept deflated", "Activation teaching (4–6 weeks)", "Travel clearance"],
        "urgent": "Fever · increasing pain or redness · wound discharge · component felt through the skin",
    },
    "varicocele-surgery": {
        "title": "Varicocele surgery",
        "family": "varicocele",
        "labels": ["Testis and spermatic cord", "Dilated tortuous testicular veins", "Testicular artery and vas deferens preserved", "Small subinguinal incision"],
        "steps": ["Examination and scrotal ultrasound", "Semen analysis if fertility indication", "Subinguinal incision", "Lift the cord under the microscope", "Ligate dilated veins, spare artery", "Close the wound"],
        "milestones": ["Same-day discharge", "Scrotal support and rest", "Activity limits 2–4 weeks", "Swelling or hydrocele watch", "Semen analysis at 3–6 months"],
        "urgent": "Fever · rapidly increasing scrotal swelling · severe pain · wound discharge",
    },
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


def rounded(draw, box, fill=WHITE, outline=LINE, radius=24, width=3):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def arrow(draw, start, end, color=NAVY, width=6):
    draw.line([start, end], fill=color, width=width)
    x, y = end
    draw.polygon([(x, y), (x - 16, y - 10), (x - 16, y + 10)], fill=color)


def header(draw, title, kicker):
    draw.text((58, 38), kicker.upper(), font=font(18, True), fill=TEAL)
    draw.text((58, 72), title, font=font(34, True), fill=INK)
    draw.text((58, 124), "Patient-education schematic · anatomy and plans vary", font=font(19), fill=MUTED)


def marker(draw, xy, n):
    x, y = xy
    draw.ellipse((x - 15, y - 15, x + 15, y + 15), fill=CORAL if n % 2 == 0 else TEAL, outline=WHITE, width=3)
    draw.text((x - 6, y - 11), str(n), font=font(17, True), fill=WHITE)


# ---------------------------------------------------------------- anatomy primitives

def kidney(draw, cx, cy, r=42, fill=ROSE, outline=INK, mirror=False, dashed=False):
    """Bean-shaped kidney; the hilum faces the midline."""
    draw.ellipse((cx - r * 0.75, cy - r * 1.35, cx + r * 0.75, cy + r * 1.35), fill=fill, outline=outline, width=4)
    hx = cx + (r * 0.55 if not mirror else -r * 0.55)
    draw.ellipse((hx - r * 0.3, cy - r * 0.4, hx + r * 0.3, cy + r * 0.4), fill=PALE, outline=outline, width=3)


def urinary_tract(draw, cx, top, scale=1.0, faded=False, prostate=True):
    """Two kidneys, ureters, bladder and (optionally) prostate/urethra. Returns anchors."""
    ink = "#a9b4c4" if faded else INK
    rose = "#f7e6e3" if faded else ROSE
    s = scale
    ky = top + 70 * s
    lkx, rkx = cx - 120 * s, cx + 120 * s
    kidney(draw, lkx, ky, r=42 * s, fill=rose, outline=ink)
    kidney(draw, rkx, ky, r=42 * s, fill=rose, outline=ink, mirror=True)
    by = top + 300 * s
    # ureters
    draw.line([(lkx + 25 * s, ky + 15 * s), (cx - 45 * s, by - 20 * s)], fill=GOLD if not faded else "#e9d9a8", width=int(6 * s))
    draw.line([(rkx - 25 * s, ky + 15 * s), (cx + 45 * s, by - 20 * s)], fill=GOLD if not faded else "#e9d9a8", width=int(6 * s))
    # bladder
    draw.ellipse((cx - 70 * s, by - 55 * s, cx + 70 * s, by + 45 * s), fill=SKY if not faded else "#eef3f9", outline=ink, width=4)
    anchors = {"lk": (lkx, ky), "rk": (rkx, ky), "bladder": (cx, by), "lu": ((lkx + cx) / 2 - 10 * s, (ky + by) / 2), "ru": ((rkx + cx) / 2 + 10 * s, (ky + by) / 2)}
    if prostate:
        py = by + 70 * s
        draw.ellipse((cx - 32 * s, py - 24 * s, cx + 32 * s, py + 24 * s), fill=ROSE if not faded else "#f7e6e3", outline=ink, width=3)
        draw.line([(cx, py + 24 * s), (cx, py + 75 * s)], fill=ink, width=int(5 * s))
        anchors["prostate"] = (cx, py)
        anchors["urethra"] = (cx, py + 60 * s)
    return anchors


def stone(draw, xy, r=14, points=8):
    import math
    x, y = xy
    pts = []
    for i in range(points):
        a = 2 * math.pi * i / points
        rr = r * (1.0 if i % 2 == 0 else 0.72)
        pts.append((x + rr * math.cos(a), y + rr * math.sin(a)))
    draw.polygon(pts, fill=STONE, outline=INK)


def scope(draw, path, color=NAVY, width=6, tip=TEAL):
    draw.line(path, fill=color, width=width, joint="curve")
    x, y = path[-1]
    draw.ellipse((x - 7, y - 7, x + 7, y + 7), fill=tip)


def prostate_zoom(draw, cx, cy, adenoma_r=70, urethra_w=10):
    """Bladder above, enlarged prostate surrounding the urethra, sphincter below."""
    draw.ellipse((cx - 110, cy - 200, cx + 110, cy - 60), fill=SKY, outline=INK, width=4)
    draw.ellipse((cx - adenoma_r - 22, cy - adenoma_r - 10, cx + adenoma_r + 22, cy + adenoma_r + 10), fill="#f8e3df", outline=INK, width=4)
    draw.ellipse((cx - adenoma_r, cy - adenoma_r, cx + adenoma_r, cy + adenoma_r), fill=ROSE, outline=CORAL, width=3)
    draw.rectangle((cx - urethra_w // 2, cy - 70, cx + urethra_w // 2, cy + adenoma_r + 60), fill=PALE, outline=INK, width=2)
    draw.rounded_rectangle((cx - 40, cy + adenoma_r + 22, cx + 40, cy + adenoma_r + 44), radius=8, fill=SKY, outline=NAVY, width=3)
    return {"bladder": (cx + 70, cy - 150), "prostate": (cx - adenoma_r - 5, cy), "urethra": (cx, cy + adenoma_r + 5), "sphincter": (cx + 40, cy + adenoma_r + 33)}


def draw_family(draw, family, box):
    """Draw the procedure-specific anatomy inside box; return 4 marker anchors."""
    x0, y0, x1, y1 = box
    cx = (x0 + x1) // 2
    top = y0 + 10
    if family in ("pcnl", "rirs", "urs", "eswl"):
        a = urinary_tract(draw, cx, top, 0.9)
        lk = a["lk"]
        if family == "pcnl":
            stone(draw, (lk[0] + 12, lk[1] - 8), r=26, points=10)
            draw.line([(x0 + 20, lk[1] + 70), (lk[0] + 5, lk[1] + 5)], fill=NAVY, width=8)
            draw.ellipse((lk[0] - 4, lk[1] - 4, lk[0] + 14, lk[1] + 14), fill=TEAL)
            draw.line([(lk[0] + 20, lk[1] + 12), (cx - 45, a["bladder"][1] - 20)], fill=GREEN, width=3)
            return [(lk[0] + 40, lk[1] - 40), (x0 + 40, lk[1] + 62), (lk[0] - 50, lk[1] + 30), (cx - 60, a["bladder"][1] - 70)]
        if family == "rirs":
            stone(draw, (lk[0] - 8, lk[1] - 30), r=13)
            path = [a["urethra"], (cx, a["bladder"][1] + 10), (cx - 45, a["bladder"][1] - 20), (lk[0] + 25, lk[1] + 15), (lk[0], lk[1] - 20)]
            scope(draw, path)
            return [(lk[0] - 8, lk[1] - 30), a["lu"], (cx - 30, a["bladder"][1] - 5), (cx - 10, a["bladder"][1] + 60)]
        if family == "urs":
            lu = a["lu"]
            stone(draw, lu, r=12)
            draw.ellipse((lk[0] + 8, lk[1] - 22, lk[0] + 44, lk[1] + 22), outline=CORAL, width=3)
            path = [a["urethra"], (cx, a["bladder"][1] + 10), (cx - 45, a["bladder"][1] - 20), (lu[0] + 8, lu[1] + 10)]
            scope(draw, path)
            return [lu, (lk[0] + 26, lk[1]), (cx - 40, a["bladder"][1] - 40), (cx, a["bladder"][1] + 55)]
        if family == "eswl":
            import math
            stone(draw, (lk[0] + 10, lk[1] - 5), r=16)
            hx, hy = x0 + 40, lk[1] + 40
            draw.rounded_rectangle((hx - 22, hy - 40, hx + 22, hy + 40), radius=10, fill=NAVY)
            for r in (60, 95, 130):
                draw.arc((hx - r, hy - r, hx + r, hy + r), -40, 40, fill=TEAL, width=4)
            for i in range(3):
                t = 0.25 + 0.25 * i
                fx = lk[0] + 25 + (cx - 45 - lk[0] - 25) * t
                fy = lk[1] + 15 + (a["bladder"][1] - 20 - lk[1] - 15) * t
                draw.ellipse((fx - 4, fy - 4, fx + 4, fy + 4), fill=STONE)
            return [(lk[0] + 10, lk[1] - 5), (hx, hy - 55), (hx + 80, hy - 10), (cx - 70, a["bladder"][1] - 75)]
    if family == "pyelo":
        a = urinary_tract(draw, cx, top, 1.0, prostate=False)
        lk = a["lk"]
        draw.ellipse((lk[0] + 10, lk[1] - 30, lk[0] + 70, lk[1] + 30), fill=SKY, outline=NAVY, width=3)
        draw.line([(lk[0] + 65, lk[1] + 10), (lk[0] + 75, lk[1] + 40)], fill=CORAL, width=10)
        draw.line([(lk[0] + 40, lk[1] + 45), (lk[0] + 110, lk[1] + 20)], fill=CORAL, width=5)
        draw.ellipse((lk[0] + 60, lk[1] + 30, lk[0] + 86, lk[1] + 56), outline=GREEN, width=4)
        return [(lk[0] + 40, lk[1] - 5), (lk[0] + 72, lk[1] + 25), (lk[0] + 105, lk[1] + 22), (lk[0] + 73, lk[1] + 65)]
    if family == "nephrectomy":
        a = urinary_tract(draw, cx, top, 1.0, prostate=False)
        lk = a["lk"]
        draw.ellipse((lk[0] - 28, lk[1] - 38, lk[0] + 24, lk[1] + 14), fill="#7a3b4e", outline=INK, width=3)
        draw.line([(lk[0] + 25, lk[1] - 12), (cx - 10, lk[1] - 12)], fill=CORAL, width=7)
        draw.line([(lk[0] + 25, lk[1] + 2), (cx - 10, lk[1] + 2)], fill=NAVY, width=7)
        for i in range(0, 360, 20):
            import math
            rx, ry = 62, 82
            draw.arc((lk[0] - rx, lk[1] - ry, lk[0] + rx, lk[1] + ry), i, i + 10, fill=CORAL, width=3)
        return [(lk[0] - 4, lk[1] - 14), (cx - 30, lk[1] - 5), (lk[0] - 60, lk[1] - 70), a["rk"]]
    if family in ("turp", "holep", "greenlight"):
        p = prostate_zoom(draw, cx, top + 250)
        if family == "turp":
            draw.line([(cx, p["urethra"][1] + 60), (cx, p["urethra"][1] - 90)], fill=NAVY, width=6)
            draw.arc((cx - 26, p["urethra"][1] - 130, cx + 26, p["urethra"][1] - 90), 0, 180, fill=GOLD, width=5)
            return [p["bladder"], p["prostate"], (cx + 30, p["urethra"][1] - 100), p["sphincter"]]
        if family == "holep":
            draw.ellipse((cx - 70, p["prostate"][1] - 70, cx + 70, p["prostate"][1] + 70), outline=GREEN, width=4)
            draw.line([(cx, p["urethra"][1] + 60), (cx - 62, p["prostate"][1] - 30)], fill=NAVY, width=5)
            draw.ellipse((cx - 68, p["prostate"][1] - 36, cx - 56, p["prostate"][1] - 24), fill=GOLD)
            draw.ellipse((cx - 40, p["bladder"][1] - 20, cx + 10, p["bladder"][1] + 25), fill=ROSE, outline=CORAL, width=2)
            return [p["bladder"], p["prostate"], (cx - 62, p["prostate"][1] - 30), (cx - 15, p["bladder"][1] + 2)]
        if family == "greenlight":
            draw.line([(cx, p["urethra"][1] + 60), (cx, p["prostate"][1] + 10)], fill=NAVY, width=5)
            for dx in (-1, 1):
                draw.polygon([(cx, p["prostate"][1] + 10), (cx + dx * 45, p["prostate"][1] - 35), (cx + dx * 50, p["prostate"][1] + 5)], fill="#b9f0c9", outline=GREEN)
            draw.arc((cx - 40, p["prostate"][1] - 40, cx + 40, p["prostate"][1] + 40), 200, 340, fill=GREEN, width=6)
            return [p["bladder"], p["prostate"], (cx + 45, p["prostate"][1] - 15), (cx + 5, p["prostate"][1] - 50)]
    if family == "turbt":
        by = top + 230
        draw.ellipse((cx - 150, by - 150, cx + 150, by + 130), fill="#f8e3df", outline=INK, width=4)
        draw.ellipse((cx - 130, by - 130, cx + 130, by + 110), fill=ROSE, outline=CORAL, width=3)
        draw.ellipse((cx - 110, by - 110, cx + 110, by + 90), fill=SKY, outline=INK, width=3)
        for dx, dy in ((0, -70), (-18, -84), (18, -84), (-8, -98), (10, -100)):
            draw.ellipse((cx + dx - 14, by + dy - 14, cx + dx + 14, by + dy + 14), fill=CORAL, outline=INK, width=2)
        draw.line([(cx, by + 140), (cx, by - 40)], fill=NAVY, width=6)
        draw.arc((cx - 24, by - 76, cx + 24, by - 36), 180, 360, fill=GOLD, width=5)
        return [(cx + 40, by - 92), (cx + 140, by - 20), (cx + 30, by - 50), (cx - 40, by - 55)]
    if family == "recon":
        by = top + 210
        draw.ellipse((cx - 175, by - 45, cx - 95, by + 45), fill=SKY, outline=INK, width=4)
        arrow(draw, (cx - 80, by), (cx - 30, by))
        draw.ellipse((cx - 20, by - 90, cx + 140, by + 90), fill=SKY, outline=INK, width=4)
        draw.chord((cx - 20, by - 90, cx + 140, by + 90), 200, 340, fill="#f1dcb8", outline=GOLD, width=4)
        draw.line([(cx + 20, by - 150), (cx + 30, by - 88)], fill=GOLD, width=6)
        draw.line([(cx + 100, by - 150), (cx + 90, by - 88)], fill=GOLD, width=6)
        draw.line([(cx + 60, by + 90), (cx + 60, by + 150)], fill=INK, width=6)
        return [(cx - 135, by), (cx + 60, by - 60), (cx + 60, by + 20), (cx + 60, by + 125)]
    if family == "diversion":
        a = urinary_tract(draw, cx - 60, top, 0.9, prostate=False)
        by = a["bladder"][1]
        draw.ellipse((cx - 60 - 63, by - 50, cx - 60 + 63, by + 40), fill=WHITE, outline="#c8c8c8", width=2)
        draw.line([(cx - 60 - 63, by - 50), (cx - 60 + 63, by + 40)], fill="#c8c8c8", width=2)
        draw.line([(cx - 60 + 63, by - 50), (cx - 60 - 63, by + 40)], fill="#c8c8c8", width=2)
        cy = by - 60
        draw.rounded_rectangle((cx - 40, cy - 22, cx + 120, cy + 22), radius=16, fill="#f1dcb8", outline=GOLD, width=4)
        draw.line([(cx - 60 - 40, by - 20), (cx - 40, cy)], fill=GOLD, width=6)
        draw.line([(cx - 60 + 40, by - 20), (cx - 40, cy)], fill=GOLD, width=6)
        draw.line([(cx + 150, cy - 110), (cx + 150, cy + 110)], fill=INK, width=4)
        draw.ellipse((cx + 130, cy - 20, cx + 170, cy + 20), fill=CORAL, outline=INK, width=3)
        draw.rounded_rectangle((cx + 165, cy - 30, cx + 235, cy + 90), radius=14, fill=SKY, outline=NAVY, width=3)
        return [(cx - 40, cy - 40), (cx + 40, cy), (cx + 150, cy - 45), (cx + 200, cy + 30)]
    if family in ("transplant", "living", "deceased", "abo"):
        cx = cx if family == "transplant" else cx + 75
        a = urinary_tract(draw, cx, top + (0 if family == "transplant" else 40), 0.8, faded=True, prostate=False)
        by = a["bladder"][1]
        gx, gy = cx + 95, by - 45
        kidney(draw, gx, gy, r=34, fill=ROSE, outline=INK, mirror=True)
        draw.line([(gx - 20, gy - 10), (cx + 40, gy - 60)], fill=CORAL, width=6)
        draw.line([(gx - 20, gy + 6), (cx + 40, gy - 40)], fill=NAVY, width=6)
        draw.line([(cx + 40, gy - 120), (cx + 40, by + 30)], fill=CORAL, width=5)
        draw.line([(cx + 58, gy - 120), (cx + 58, by + 30)], fill=NAVY, width=5)
        draw.line([(gx - 10, gy + 35), (cx + 25, by - 5)], fill=GOLD, width=5)
        anchors = [a["lk"], (gx, gy), (cx + 49, gy - 90), (cx + 25, by - 10)]
        if family == "living":
            dx = x0 + 95
            kidney(draw, dx, top + 60, r=34, fill="#e9eef5", outline="#a9b4c4")
            draw.line([(dx - 30, top + 20), (dx + 30, top + 100)], fill=CORAL, width=4)
            kidney(draw, dx + 90, top + 60, r=38, fill=ROSE, outline=INK, mirror=True)
            arrow(draw, (dx + 40, top + 150), (gx - 30, gy - 40), color=TEAL, width=5)
            anchors = [(dx, top + 60), (dx + 90, top + 60), (gx, gy), (cx + 40, by - 15)]
        if family == "deceased":
            bx, byy = x0 + 110, top + 70
            draw.rounded_rectangle((bx - 60, byy - 45, bx + 60, byy + 45), radius=12, fill=SKY, outline=NAVY, width=3)
            kidney(draw, bx, byy, r=26, fill=ROSE, outline=INK)
            draw.text((bx - 40, byy + 50), "cold storage", font=font(15), fill=MUTED)
            arrow(draw, (bx + 65, byy), (gx - 40, gy - 30), color=TEAL, width=5)
            draw.rounded_rectangle((x0 + 20, y1 - 70, x0 + 190, y1 - 30), radius=8, fill=PALE, outline=CORAL, width=2)
            draw.text((x0 + 30, y1 - 60), "registry allocation", font=font(15, True), fill=CORAL)
            anchors = [(bx, byy), (x0 + 100, y1 - 50), (gx, gy), (cx + 49, gy - 90)]
        if family == "abo":
            draw.ellipse((x0 + 30, top + 30, x0 + 100, top + 100), fill=ROSE, outline=CORAL, width=3)
            draw.text((x0 + 52, top + 48), "A", font=font(26, True), fill=INK)
            draw.ellipse((x0 + 120, top + 30, x0 + 190, top + 100), fill=SKY, outline=NAVY, width=3)
            draw.text((x0 + 142, top + 48), "B", font=font(26, True), fill=INK)
            draw.rounded_rectangle((x0 + 40, top + 130, x0 + 180, top + 200), radius=12, fill=PALE, outline=TEAL, width=3)
            draw.text((x0 + 52, top + 140), "plasma", font=font(17, True), fill=TEAL)
            draw.text((x0 + 52, top + 165), "exchange", font=font(17, True), fill=TEAL)
            arrow(draw, (x0 + 185, top + 165), (gx - 45, gy - 20), color=TEAL, width=5)
            anchors = [(x0 + 110, top + 65), (x0 + 110, top + 205), (x0 + 200, top + 120), (gx, gy)]
        return anchors
    if family in ("urethroplasty", "viu"):
        by = top + 60
        draw.ellipse((cx - 90, by - 50, cx + 90, by + 40), fill=SKY, outline=INK, width=4)
        draw.ellipse((cx - 32, by + 40, cx + 32, by + 80), fill=ROSE, outline=INK, width=3)
        path_y = by + 80
        draw.rounded_rectangle((cx - 14, path_y, cx + 14, path_y + 90), radius=6, fill=PALE, outline=INK, width=3)
        draw.polygon([(cx - 14, path_y + 90), (cx + 14, path_y + 90), (cx + 5, path_y + 130), (cx - 5, path_y + 130)], fill="#f8e3df", outline=CORAL)
        draw.rounded_rectangle((cx - 14, path_y + 130, cx + 14, path_y + 260), radius=6, fill=PALE, outline=INK, width=3)
        draw.polygon([(cx - 14, path_y + 90), (cx - 4, path_y + 110), (cx - 14, path_y + 130)], fill=CORAL)
        draw.polygon([(cx + 14, path_y + 90), (cx + 4, path_y + 110), (cx + 14, path_y + 130)], fill=CORAL)
        if family == "urethroplasty":
            draw.rounded_rectangle((cx + 60, path_y + 60, cx + 160, path_y + 160), radius=10, fill=PALE, outline=GREEN, width=3)
            draw.rounded_rectangle((cx + 92, path_y + 80, cx + 128, path_y + 140), radius=6, fill="#dff3e6", outline=GREEN, width=3)
            draw.text((cx + 66, path_y + 165), "buccal graft", font=font(15), fill=MUTED)
            draw.rounded_rectangle((cx - 160, path_y + 60, cx - 60, path_y + 160), radius=10, fill=PALE, outline=NAVY, width=3)
            draw.line([(cx - 135, path_y + 80), (cx - 85, path_y + 140)], fill=NAVY, width=4)
            draw.line([(cx - 85, path_y + 80), (cx - 135, path_y + 140)], fill=NAVY, width=4)
            draw.text((cx - 158, path_y + 165), "excise & re-join", font=font(15), fill=MUTED)
            return [(cx, by), (cx, path_y + 110), (cx - 110, path_y + 45), (cx + 110, path_y + 45)]
        draw.line([(cx, path_y + 260), (cx, path_y + 125)], fill=NAVY, width=6)
        draw.polygon([(cx - 3, path_y + 125), (cx + 3, path_y + 125), (cx + 10, path_y + 100)], fill=GOLD)
        return [(cx, path_y + 110), (cx + 40, path_y + 230), (cx + 30, path_y + 100), (cx - 40, path_y + 30)]
    if family == "ureter":
        a = urinary_tract(draw, cx, top, 1.0, prostate=False)
        lu = a["lu"]
        draw.ellipse((lu[0] - 16, lu[1] + 18, lu[0] + 16, lu[1] + 50), outline=CORAL, width=4)
        draw.line([(lu[0] - 2, lu[1] + 20), (lu[0] + 2, lu[1] + 48)], fill=CORAL, width=3)
        lk = a["lk"]
        draw.line([(lk[0] + 10, lk[1] - 60), (lk[0] + 30, lk[1] - 10)], fill=NAVY, width=4)
        b = a["bladder"]
        draw.polygon([(b[0] - 70, b[1] - 20), (b[0] - 95, b[1] - 90), (b[0] - 60, b[1] - 60)], fill=SKY, outline=GREEN, width=3)
        draw.rounded_rectangle((b[0] + 80, b[1] - 120, b[0] + 120, b[1] - 20), radius=12, fill="#f1dcb8", outline=GOLD, width=3)
        return [(lu[0], lu[1] + 34), (lk[0] + 12, lk[1] - 62), (b[0] - 90, b[1] - 55), (b[0] + 100, b[1] - 70)]
    if family == "hypospadias":
        py = top + 200
        draw.rounded_rectangle((cx - 40, py - 160, cx + 40, py + 110), radius=36, fill="#f8e3df", outline=INK, width=4)
        draw.ellipse((cx - 44, py - 190, cx + 44, py - 120), fill=ROSE, outline=INK, width=4)
        draw.ellipse((cx - 5, py - 160, cx + 5, py - 150), fill=INK)
        for i, dy in enumerate((-110, -40, 40)):
            draw.ellipse((cx - 7, py + dy - 7, cx + 7, py + dy + 7), fill=CORAL, outline=INK, width=2)
        draw.arc((cx - 140, py - 150, cx + 60, py + 120), 250, 330, fill=NAVY, width=4)
        draw.pieslice((cx - 70, py - 215, cx + 70, py - 105), 190, 350, fill=SKY, outline=NAVY, width=3)
        return [(cx, py - 155), (cx + 45, py - 40), (cx - 75, py - 40), (cx + 50, py - 175)]
    if family == "pediatric":
        a = urinary_tract(draw, cx - 30, top, 0.8, prostate=False)
        lu = a["lu"]
        for i in range(3):
            arrow(draw, (lu[0] + 20 - i * 14, lu[1] + 60 - i * 26), (lu[0] - 5 - i * 14, lu[1] + 30 - i * 26), color=CORAL, width=4)
        b = a["bladder"]
        draw.ellipse((b[0] + 150, b[1] - 40, b[0] + 190, b[1] + 10), fill=ROSE, outline=INK, width=3)
        draw.line([(b[0] + 60, b[1] + 30), (b[0] + 170, b[1] - 15)], fill=LINE, width=3)
        draw.ellipse((b[0] + 40, b[1] + 60, b[0] + 100, b[1] + 130), fill=PALE, outline=INK, width=3)
        draw.ellipse((b[0] + 55, b[1] + 80, b[0] + 85, b[1] + 115), outline=GREEN, width=3)
        return [a["rk"], (lu[0] - 20, lu[1] + 40), (b[0] + 170, b[1] - 15), (b[0] + 70, b[1] + 95)]
    if family == "implant":
        py = top + 150
        draw.rounded_rectangle((cx - 90, py - 60, cx + 210, py + 60), radius=50, fill="#f8e3df", outline=INK, width=4)
        for dy in (-25, 25):
            draw.rounded_rectangle((cx - 70, py + dy - 16, cx + 190, py + dy + 16), radius=14, fill=SKY, outline=NAVY, width=3)
        draw.ellipse((cx - 150, py + 60, cx - 30, py + 180), fill=ROSE, outline=INK, width=3)
        draw.rounded_rectangle((cx - 105, py + 95, cx - 75, py + 145), radius=10, fill=NAVY)
        draw.rounded_rectangle((cx - 160, py - 190, cx - 80, py - 110), radius=16, fill=SKY, outline=NAVY, width=3)
        draw.line([(cx - 120, py - 110), (cx - 90, py + 95)], fill=NAVY, width=3)
        draw.line([(cx - 75, py + 120), (cx - 60, py + 25)], fill=NAVY, width=3)
        return [(cx + 60, py - 75), (cx + 60, py), (cx - 90, py + 120), (cx - 120, py - 150)]
    if family == "varicocele":
        ty = top + 260
        draw.ellipse((cx - 60, ty - 70, cx + 60, ty + 70), fill=ROSE, outline=INK, width=4)
        for i, dx in enumerate((-30, -10, 10, 30)):
            pts = [(cx + dx + (12 if j % 2 else -12), ty - 70 - j * 30) for j in range(7)]
            draw.line(pts, fill=NAVY if i % 2 else "#4c6fae", width=8 if i in (1, 2) else 5, joint="curve")
        draw.line([(cx + 45, ty - 70), (cx + 45, ty - 260)], fill=CORAL, width=4)
        draw.line([(cx - 45, ty - 70), (cx - 45, ty - 260)], fill=GREEN, width=4)
        draw.rounded_rectangle((cx - 90, ty - 275, cx + 90, ty - 245), radius=8, fill=PALE, outline=GOLD, width=3)
        return [(cx, ty), (cx + 5, ty - 150), (cx + 45, ty - 200), (cx, ty - 260)]
    return [(cx, top + 100)] * 4


# ---------------------------------------------------------------- images

def anatomy_image(slug, spec):
    image = Image.new("RGB", (1200, 675), PALE)
    draw = ImageDraw.Draw(image)
    header(draw, f"{spec['title']}: relevant anatomy", "Anatomy")
    rounded(draw, (55, 165, 640, 635), fill=WHITE)
    anchors = draw_family(draw, spec["family"], (85, 185, 610, 615))
    for i, xy in enumerate(anchors):
        marker(draw, xy, i + 1)
    rounded(draw, (670, 165, 1145, 635), fill=SKY, outline="#a8c4de")
    draw.text((705, 200), "Structures to discuss", font=font(25, True), fill=INK)
    for i, label in enumerate(spec["labels"]):
        y = 262 + i * 82
        marker(draw, (720, y + 12), i + 1)
        lines = wrap(label, width=30)
        for j, line in enumerate(lines[:2]):
            draw.text((748, y - 2 + j * 26), line, font=font(21), fill=INK)
    draw.text((705, 596), "Not to scale · no outcome implied", font=font(17), fill=MUTED)
    image.save(OUT / f"{slug}-anatomy.webp", "WEBP", quality=82, method=6)


def step_icon(draw, box, index):
    x0, y0, x1, y1 = box
    cx, cy = (x0 + x1) // 2, (y0 + y1) // 2
    if index == 0:  # records
        draw.rounded_rectangle((cx - 22, cy - 28, cx + 22, cy + 28), radius=6, fill=WHITE, outline=NAVY, width=3)
        for dy in (-12, 0, 12):
            draw.line([(cx - 12, cy + dy), (cx + 12, cy + dy)], fill=LINE, width=3)
    elif index == 1:  # imaging / lab
        draw.ellipse((cx - 26, cy - 26, cx + 26, cy + 26), fill=WHITE, outline=NAVY, width=3)
        draw.ellipse((cx - 10, cy - 10, cx + 10, cy + 10), fill=TEAL)
    elif index == 2:  # theatre
        draw.rounded_rectangle((cx - 30, cy - 12, cx + 30, cy + 12), radius=6, fill=SKY, outline=NAVY, width=3)
        draw.ellipse((cx - 8, cy - 30, cx + 8, cy - 14), fill=NAVY)
    elif index == 3:  # instrument
        draw.line([(cx - 28, cy + 20), (cx + 20, cy - 20)], fill=NAVY, width=6)
        draw.ellipse((cx + 14, cy - 28, cx + 30, cy - 12), fill=GOLD)
    elif index == 4:  # device / stent
        draw.arc((cx - 26, cy - 30, cx + 26, cy + 30), 200, 340, fill=GOLD, width=6)
        draw.arc((cx - 26, cy - 30, cx + 26, cy + 30), 20, 160, fill=GOLD, width=6)
    else:  # ward / follow-up
        draw.rounded_rectangle((cx - 30, cy - 8, cx + 30, cy + 18), radius=6, fill=SKY, outline=NAVY, width=3)
        draw.rectangle((cx - 30, cy - 24, cx - 8, cy - 8), fill=CORAL)


def procedure_image(slug, spec):
    image = Image.new("RGB", (1200, 675), WHITE)
    draw = ImageDraw.Draw(image)
    header(draw, f"{spec['title']}: treatment pathway", "Procedure")
    card_w, card_h = 340, 200
    for i, step in enumerate(spec["steps"]):
        col, row = i % 3, i // 3
        x = 55 + col * 375
        y = 170 + row * 225
        rounded(draw, (x, y, x + card_w, y + card_h), fill=PALE if row == 0 else SKY)
        draw.ellipse((x + 20, y + 18, x + 62, y + 60), fill=NAVY)
        draw.text((x + 34 if i < 9 else x + 28, y + 27), str(i + 1), font=font(20, True), fill=WHITE)
        step_icon(draw, (x + card_w - 90, y + 10, x + card_w - 10, y + 80), i)
        for line_no, line in enumerate(wrap(step, width=26)[:3]):
            draw.text((x + 22, y + 88 + line_no * 29), line, font=font(20, True), fill=INK)
        if col < 2:
            arrow(draw, (x + card_w + 4, y + card_h // 2), (x + card_w + 30, y + card_h // 2), width=5)
    draw.text((55, 630), "The treating urology team may change the plan after examination, imaging and consent.", font=font(18), fill=MUTED)
    image.save(OUT / f"{slug}-procedure.webp", "WEBP", quality=82, method=6)


def recovery_image(slug, spec):
    image = Image.new("RGB", (1200, 675), PALE)
    draw = ImageDraw.Draw(image)
    header(draw, f"{spec['title']}: recovery and follow-up", "Recovery")
    draw.text((58, 175), "Discharge ≠ fitness to fly · timings are typical, not promised", font=font(18), fill=MUTED)
    draw.line([(110, 290), (1090, 290)], fill="#b7cce0", width=12)
    n = len(spec["milestones"])
    for i, item in enumerate(spec["milestones"]):
        x = 120 + i * (960 // (n - 1))
        draw.ellipse((x - 38, 252, x + 38, 328), fill=NAVY if i < n - 1 else CORAL, outline=WHITE, width=6)
        draw.text((x - 7, 276), str(i + 1), font=font(21, True), fill=WHITE)
        rounded(draw, (x - 100, 355, x + 100, 475), fill=WHITE)
        wrapped = wrap(item, width=17)[:3]
        top = 402 if len(wrapped) == 1 else 390 if len(wrapped) == 2 else 378
        for line_no, line in enumerate(wrapped):
            bbox = draw.textbbox((0, 0), line, font=font(18, True))
            draw.text((x - (bbox[2] - bbox[0]) / 2, top + line_no * 25), line, font=font(18, True), fill=INK)
    rounded(draw, (55, 520, 1145, 640), fill="#fdf1ef", outline=CORAL, radius=18)
    draw.text((82, 540), "Seek urgent urology review for:", font=font(19, True), fill=CORAL)
    for line_no, line in enumerate(wrap(spec["urgent"], width=95)[:2]):
        draw.text((82, 572 + line_no * 26), line, font=font(19), fill=INK)
    image.save(OUT / f"{slug}-recovery.webp", "WEBP", quality=82, method=6)


for slug, spec in DATA.items():
    anatomy_image(slug, spec)
    procedure_image(slug, spec)
    recovery_image(slug, spec)

print(f"Generated {len(DATA) * 3} WebP diagrams in {OUT}")
