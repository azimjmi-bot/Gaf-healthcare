export {
  INFERTILITY_IVF_COST,
  INFERTILITY_IVF_CLUSTER_BY_PROCEDURE,
} from "./treatment-cost-ranges";

export const INFERTILITY_IVF_SUMMARIES: Record<string, string> = {
  "IVF Treatment":
    "Retrieve eggs, fertilise them in the laboratory and transfer an embryo when ovarian reserve, uterus and laboratory findings already write an IVF cycle. ICSI, donor pathways and FET keep neighbouring Infertility & IVF slugs.",
  "ICSI Treatment":
    "Inject a single sperm into each mature egg when male-factor infertility or prior fertilisation failure already writes micro-injection. Conventional IVF stays on the neighbouring slug; surgical sperm retrieval is a different product.",
  "IUI Treatment":
    "Place prepared sperm into the uterus around ovulation when tubes are open and semen parameters already support intrauterine insemination. IVF remains the neighbouring escalation slug.",
  "IMSI Treatment":
    "Select sperm under ultra-high magnification before ICSI when laboratory indication and prior ICSI results already write IMSI. Standard ICSI keeps the neighbouring slug.",
  "Frozen Embryo Transfer (FET)":
    "Thaw and transfer a cryopreserved embryo when suitable frozen embryos already exist and the lining plan is written. Fresh blastocyst transfer and embryo freezing sit on neighbouring slugs.",
  "Blastocyst Transfer":
    "Transfer a day-5–6 blastocyst when extended culture already belongs on the laboratory plan. FET is the neighbouring frozen pathway; cleavage transfer remains inside IVF when that is the named stage.",
  "Donor Egg IVF":
    "Use screened donor eggs inside an IVF pathway when autologous egg prognosis already writes third-party eggs and legal clearances allow. Donor sperm IVF and autologous IVF stay neighbouring slugs.",
  "Donor Sperm IVF":
    "Fertilise eggs with screened donor sperm inside IVF/ICSI when azoospermia or other indications already write donor sperm. IUI with donor sperm may be a simpler neighbouring discussion when tubes are open.",
  "Ovulation Induction":
    "Prompt ovulation with monitored medicines when anovulation already writes induction and tubes plus sperm support timed intercourse or IUI. Ovarian stimulation for IVF is a different product.",
  "Ovarian Stimulation":
    "Use gonadotropin stimulation for multi-follicular growth when an IVF, egg-freezing or preservation cycle already writes injectables and monitoring. Ovulation induction for anovulation stays neighbouring.",
  "Egg Freezing":
    "Stimulate, retrieve and vitrify mature eggs when deferred fertility or medical preservation already writes oocyte cryopreservation. Embryo freezing and fertility-preservation programmes keep neighbouring slugs.",
  "Embryo Freezing":
    "Vitrify surplus or deferred embryos after IVF/ICSI when freeze-all, surplus storage or PGT workflows already write cryopreservation. FET is the neighbouring thaw-and-transfer product.",
  "Fertility Preservation":
    "Coordinate egg, embryo or sperm banking before gonadotoxic therapy when oncology or surgical timelines already write preservation. Egg freezing and embryo freezing remain the concrete laboratory slugs.",
  "PGT-A Testing":
    "Screen biopsied embryos for aneuploidy when counselling already writes PGT-A after IVF. PGT-M is the neighbouring monogenic product; embryo biopsy is the laboratory step slug.",
  "PGT-M / PGD Testing":
    "Test embryos for a known monogenic disorder when genetic counselling and probe work-up already write PGT-M. PGT-A stays the neighbouring aneuploidy slug.",
  "Embryo Biopsy":
    "Remove trophectoderm cells from a blastocyst when PGT-A or PGT-M already writes biopsy and freeze-all. Genetic analysis fees sit on the neighbouring PGT slugs.",
  Hysteroscopy:
    "Inspect and treat the uterine cavity when imaging already writes an intracavitary fertility problem. Laparoscopy is the neighbouring pelvic surgery slug; myomectomy remains a different fibroid product when that is the named plan.",
  Laparoscopy:
    "Assess and treat selected pelvic fertility disease through ports when endometriosis, adhesions or cysts already write surgery. Hysteroscopy stays neighbouring for cavity work; IVF may proceed without laparoscopy when that is the wiser plan.",
  "Micro-TESE":
    "Retrieve testicular sperm under a microscope for ICSI when non-obstructive azoospermia already writes micro-TESE. TESE/TESA and PESA/MESA remain neighbouring male-retrieval slugs.",
  "TESE / TESA":
    "Aspirate or extract testicular sperm for ICSI when obstructive or selected azoospermia already writes conventional retrieval. Micro-TESE is the neighbouring mapped technique for non-obstructive disease.",
  "PESA / MESA":
    "Aspirate epididymal sperm for ICSI when obstructive azoospermia already writes epididymal retrieval. TESE/TESA and micro-TESE stay neighbouring testicular products.",
  "Fibroid Removal (Myomectomy)":
    "Remove cavity-distorting or fertility-impairing fibroids while preserving the uterus when imaging already writes myomectomy before IVF or conception. Gynecology myomectomy approach slugs remain neighbouring catalog products for technique-specific lists.",
  "Ovarian Cyst Removal":
    "Excise selected benign ovarian cysts with ovary sparing when fertility goals and imaging already write cystectomy rather than observation. Endometriosis surgery and laparoscopy sit on neighbouring fertility-surgery slugs.",
};

export const INFERTILITY_IVF_CONDITIONS = [
  "Female Factor Infertility",
  "Male Factor Infertility",
  "Unexplained Infertility",
  "PCOS-Related Anovulation",
  "Diminished Ovarian Reserve",
  "Blocked Fallopian Tubes",
  "Endometriosis-Related Infertility",
  "Recurrent Implantation Failure",
  "Azoospermia",
  "Fertility Preservation Need",
];
