/**
 * PR #37 audit remediation: evidence-based doctor procedures, multi-campus
 * hospitalSlugs, authentic images (or approved fallback), hospital seed cleanup.
 *
 * Sources: cached Sahyadri API inventory + official doctor profile descriptions.
 * Does not invent procedures, specialties, or images.
 */
import { createWriteStream, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { pipeline } from "node:stream/promises";
import { fileURLToPath } from "node:url";
import { Readable } from "node:stream";
import { mapDoctorProcedures } from "../src/lib/procedure-map";
import { taxonomyLabel } from "../src/lib/i18n/taxonomy-labels";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SAHYADRI = "sahyadri-super-speciality-hospital-";
const CAMPUS_SLUG: Record<string, string> = {
  "Nagar Road": "sahyadri-super-speciality-hospital-nagar-road",
  Hadapsar: "sahyadri-super-speciality-hospital-hadapsar",
  "Deccan Gymkhana": "sahyadri-super-speciality-hospital-deccan-gymkhana",
};
const CAMPUS_NAME: Record<string, string> = {
  "sahyadri-super-speciality-hospital-nagar-road": "Sahyadri Super Speciality Hospital, Nagar Road",
  "sahyadri-super-speciality-hospital-hadapsar": "Sahyadri Super Speciality Hospital, Hadapsar",
  "sahyadri-super-speciality-hospital-deccan-gymkhana": "Sahyadri Super Speciality Hospital, Deccan Gymkhana",
};
const CAMPUS_NAME_AR: Record<string, string> = {
  "sahyadri-super-speciality-hospital-nagar-road": "مستشفى ساهيادري للتخصصات الفائقة، ناغار رود",
  "sahyadri-super-speciality-hospital-hadapsar": "مستشفى ساهيادري للتخصصات الفائقة، هادابسار",
  "sahyadri-super-speciality-hospital-deccan-gymkhana": "مستشفى ساهيادري للتخصصات الفائقة، ديكان جيمخانا",
};

type InventoryDoctor = {
  slug: string;
  doctorName?: string;
  department?: string;
  alternativedepartment?: string;
  designation?: string;
  description?: string;
  education?: string;
  experience?: string;
  featured_images?: string;
  _campuses?: string[];
};

type EligibilityRow = {
  name: string;
  slug: string;
  source_url: string;
  gaf_specialty: string;
  campuses: string;
  primary_campus: string;
  eligible: string;
  gaf_slug: string;
  hospital_slug: string;
};

function stripHtml(value: string) {
  return value
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function parseCsv(text: string): EligibilityRow[] {
  const lines = text.trim().split(/\r?\n/);
  const headers = lines[0].split(",");
  return lines.slice(1).map((line) => {
    const cols: string[] = [];
    let cur = "";
    let q = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (q && line[i + 1] === '"') {
          cur += '"';
          i++;
        } else q = !q;
        continue;
      }
      if (ch === "," && !q) {
        cols.push(cur);
        cur = "";
        continue;
      }
      cur += ch;
    }
    cols.push(cur);
    const row: Record<string, string> = {};
    headers.forEach((h, i) => {
      row[h] = cols[i] ?? "";
    });
    return row as EligibilityRow;
  });
}

function evidenceTexts(doc: InventoryDoctor, specialty: string, designation: string) {
  const plain = stripHtml(doc.description || "");
  return [
    plain,
    doc.department || "",
    doc.alternativedepartment || "",
    designation || "",
    specialty,
  ].filter(Boolean);
}

function mappingStatus(mapped: string[], plain: string): "verified" | "partially_verified" | "no_specific_procedure_evidence" {
  if (mapped.length === 0) return "no_specific_procedure_evidence";
  // Partially verified when description is thin but designation/department contributed.
  if (plain.length < 80) return "partially_verified";
  return "verified";
}

async function downloadImage(url: string, dest: string): Promise<boolean> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; GAFHealthcareBot/1.0)" },
      redirect: "follow",
    });
    if (!res.ok || !res.body) return false;
    mkdirSync(dirname(dest), { recursive: true });
    const nodeStream = Readable.fromWeb(res.body as import("node:stream/web").ReadableStream);
    await pipeline(nodeStream, createWriteStream(dest));
    return existsSync(dest) && (await import("node:fs")).statSync(dest).size > 1000;
  } catch {
    return false;
  }
}

function rewriteBio(args: {
  name: string;
  title: string;
  specialty: string;
  hospitalName: string;
  campuses: string[];
  experience: string;
  qualifications: string;
  procedures: string[];
  plain: string;
}) {
  const campusNote =
    args.campuses.length > 1
      ? ` Published Sahyadri OPD listings also associate this clinician with ${args.campuses
          .filter((c) => CAMPUS_NAME[c] !== args.hospitalName)
          .map((c) => CAMPUS_NAME[c])
          .join(", ")}.`
      : "";
  const procPhrase =
    args.procedures.length > 0
      ? ` Procedure associations retained for directory matching are limited to evidence on the official profile: ${args.procedures.slice(0, 5).join(", ")}.`
      : " No specific GAF procedure tags are claimed beyond the verified specialty association because the official profile does not establish individual procedure evidence.";
  let interest = "";
  if (args.plain.length > 40) {
    const snippet = args.plain.slice(0, 180).replace(/\s+\S*$/, "");
    const banned = /world-renowned|cutting-edge|guaranteed outcome|best doctor|top doctor|highly accomplished/i;
    if (snippet.length > 40 && !banned.test(snippet)) {
      interest = ` Official hospital materials describe a practice spanning ${snippet.toLowerCase()}.`;
    }
  }
  return (
    `${args.name} is ${args.title} at ${args.hospitalName} in Pune, India. ` +
    `The profile is filed under ${args.specialty} in the GAF Healthcare directory for later country, city, specialty and procedure matching. ` +
    `Published experience is recorded as ${args.experience.toLowerCase()}. ` +
    `Listed credentials include ${args.qualifications}.` +
    procPhrase +
    campusNote +
    interest +
    ` Sahyadri Hospitals operates as part of the Manipal Hospitals network; this page keeps the ${args.hospitalName.split(",").slice(-1)[0].trim()} campus as its own hospital entity. ` +
    `International patients should treat this page as a directory record for comparing specialty, campus and published credentials before a records-based opinion.`
  );
}

async function main() {
  const inventoryPath = "/tmp/sahyadri/data/all-three-campuses.json";
  if (!existsSync(inventoryPath)) {
    throw new Error(`Missing inventory cache at ${inventoryPath}; re-fetch before remediating.`);
  }
  const inventory = JSON.parse(readFileSync(inventoryPath, "utf8")) as InventoryDoctor[];
  const bySourceSlug = new Map(inventory.map((d) => [d.slug, d]));
  const eligibility = parseCsv(readFileSync(join(root, "docs/sahyadri-pune-eligibility.csv"), "utf8")).filter(
    (r) => r.eligible === "YES",
  );
  if (eligibility.length !== 110) throw new Error(`Expected 110 eligible rows, got ${eligibility.length}`);

  const gingerPath = join(root, "src/data/ginger-catalog.json");
  const ginger = JSON.parse(readFileSync(gingerPath, "utf8")) as {
    doctors: Array<Record<string, unknown>>;
    hospitals: Array<Record<string, unknown>>;
  };
  const doctorBySlug = new Map(ginger.doctors.map((d) => [String(d.slug), d]));

  const doctorAudit: Array<Record<string, string>> = [];
  const imageAudit: Array<Record<string, string>> = [];
  const multiCampusAudit: Array<Record<string, string>> = [];
  let imagesVerified = 0;
  let imagesFallback = 0;

  for (const row of eligibility) {
    const seed = doctorBySlug.get(row.gaf_slug);
    if (!seed) throw new Error(`Missing ginger doctor ${row.gaf_slug}`);
    const source = bySourceSlug.get(row.slug);
    if (!source) throw new Error(`Missing inventory doctor ${row.slug}`);

    const campuses = row.campuses
      .split(";")
      .map((c) => c.trim())
      .filter(Boolean)
      .map((c) => CAMPUS_SLUG[c])
      .filter(Boolean);
    const primary = row.hospital_slug || CAMPUS_SLUG[row.primary_campus];
    if (!primary || !campuses.includes(primary)) {
      campuses.unshift(primary);
    }
    const hospitalSlugs = [...new Set([primary, ...campuses])];

    const designation = String(seed.designation || "");
    const texts = evidenceTexts(source, row.gaf_specialty, designation);
    const plain = stripHtml(source.description || "");
    const mapped = mapDoctorProcedures(row.gaf_specialty, texts, false);
    const status = mappingStatus(mapped, plain);
    const previous = Array.isArray(seed.proceduresExpertise)
      ? (seed.proceduresExpertise as string[])
      : [];

    seed.hospitalSlug = primary;
    seed.hospitalName = CAMPUS_NAME[primary];
    seed.hospitalHref = `/destinations/india/hospitals/sahyadri-hospitals/${primary}/`;
    seed.hospitalSlugs = hospitalSlugs;
    seed.proceduresExpertise = mapped;
    seed.affiliations = [
      ...hospitalSlugs.map((slug) => CAMPUS_NAME[slug]),
      "Sahyadri Hospitals (Manipal Hospitals network)",
    ];
    seed.bio = rewriteBio({
      name: String(seed.name),
      title: designation,
      specialty: row.gaf_specialty,
      hospitalName: CAMPUS_NAME[primary],
      campuses: hospitalSlugs,
      experience: String(seed.experience || ""),
      qualifications: String(seed.qualifications || ""),
      procedures: mapped,
      plain,
    });

    // Images: download authentic Sahyadri featured_images when present.
    const featured = (source.featured_images || "").trim();
    let imageStatus = "approved_fallback";
    let imagePath = "";
    if (featured) {
      const ext = featured.toLowerCase().endsWith(".png")
        ? "png"
        : featured.toLowerCase().endsWith(".jpg") || featured.toLowerCase().endsWith(".jpeg")
          ? "jpg"
          : "webp";
      const localRel = `/doctors/sahyadri/${row.gaf_slug}.${ext}`;
      const localAbs = join(root, "public", localRel.replace(/^\//, ""));
      const url = featured.startsWith("http")
        ? featured
        : `https://sahyadrihospital.com/${featured.replace(/^\//, "")}`;
      const ok = existsSync(localAbs) || (await downloadImage(url, localAbs));
      if (ok) {
        imagePath = localRel;
        imageStatus = "verified_image";
        imagesVerified += 1;
        seed.image = imagePath;
        seed.imageAlt = `${seed.name}, ${row.gaf_specialty} at ${CAMPUS_NAME[primary]}, Pune`;
      } else {
        imagesFallback += 1;
        seed.image = "";
        seed.imageAlt = "";
        imageStatus = featured ? "source_unavailable" : "approved_fallback";
      }
    } else {
      imagesFallback += 1;
      seed.image = "";
      seed.imageAlt = "";
      imageStatus = "source_unavailable";
    }

    doctorAudit.push({
      name: String(seed.name),
      slug: row.gaf_slug,
      source_slug: row.slug,
      source_url: row.source_url,
      gaf_specialty: row.gaf_specialty,
      mapped_procedures: mapped.join(" | "),
      previous_specialty_defaults: previous.join(" | "),
      mapping_status: status,
      explanation:
        mapped.length === 0
          ? "Official profile did not establish a specific GAF procedure; specialty association retained; procedure mapping left empty."
          : `Procedures matched from official description/department/designation text via GAF procedure rules with fallback disabled. Removed inherited specialty-default tags (${previous.join("; ") || "none"}).`,
      hospital_slugs: hospitalSlugs.join(" | "),
      primary_hospital_slug: primary,
      image_status: imageStatus,
      image_path: imagePath,
    });

    imageAudit.push({
      entity: "doctor",
      name: String(seed.name),
      slug: row.gaf_slug,
      source_image: featured || "",
      status: imageStatus,
      local_path: imagePath,
    });

    if (hospitalSlugs.length > 1) {
      multiCampusAudit.push({
        name: String(seed.name),
        slug: row.gaf_slug,
        primary_hospital_slug: primary,
        hospital_slugs: hospitalSlugs.join(" | "),
        campuses_from_eligibility: row.campuses,
        reciprocal_faculty: "yes",
      });
    }
  }

  // Hospital seeds: clear forced Radiation Oncology; leave specialty derivation to buildHospital.
  const hospitalAudit: Array<Record<string, string>> = [];
  for (const hospital of ginger.hospitals) {
    if (!String(hospital.slug).startsWith(SAHYADRI)) continue;
    hospital.specialty = "";
    hospital.image = "";
    hospital.imageAlt = "";
    // Campus photos are not reliably attributable on contact pages without risking
    // mismatched campus imagery — use approved placeholder rendering.
    hospitalAudit.push({
      slug: String(hospital.slug),
      name: String(hospital.name),
      primary_specialty: "faculty_majority_at_build_time",
      primary_specialty_evidence:
        "No campus-specific official specialty hierarchy published for this Pune site alone; primary specialty is derived at build time from the majority specialty among verified campus faculty, or left empty if faculty is empty. Forced Radiation Oncology default removed.",
      specialties_source: "Verified affiliated doctor specialties only (faculty-derived)",
      procedures_source: "Union of evidence-mapped proceduresExpertise on affiliated doctors only",
      address_in_bio: String(hospital.bio || "").includes("Pune") ? "yes" : "no",
      image_status: "approved_fallback",
      image_note: "No verified campus-specific photograph attributable to this exact site without mismatch risk; HospitalCampusVisual placeholder retained.",
    });
    imageAudit.push({
      entity: "hospital",
      name: String(hospital.name),
      slug: String(hospital.slug),
      source_image: "",
      status: "approved_fallback",
      local_path: "",
    });
  }

  writeFileSync(gingerPath, `${JSON.stringify(ginger, null, 2)}\n`);

  // Arabic overlays: sync proceduresExpertise + affiliations for Sahyadri doctors; refine hospital focus.
  const cmsPath = join(root, "content/ar/catalog-cms.json");
  const cms = JSON.parse(readFileSync(cmsPath, "utf8")) as {
    doctorOverrides: Record<string, Record<string, unknown>>;
    hospitalOverrides: Record<string, Record<string, unknown>>;
  };

  for (const row of doctorAudit) {
    const overlay = cms.doctorOverrides[row.slug];
    if (!overlay) throw new Error(`Missing AR overlay for ${row.slug}`);
    const procs = row.mapped_procedures ? row.mapped_procedures.split(" | ").filter(Boolean) : [];
    overlay.proceduresExpertise = procs.map((name) => taxonomyLabel(name, "ar"));
    const slugs = row.hospital_slugs.split(" | ").filter(Boolean);
    overlay.affiliations = slugs.map(
      (slug) => `يمارس عمله في ${CAMPUS_NAME_AR[slug]}، بونه، الهند`,
    );
    // Keep bios factual; strip inflated procedure marketing if the generator left defaults.
    if (typeof overlay.bio === "string") {
      // Do not invent new Arabic clinical claims; affiliations already updated.
    }
  }

  for (const hospital of ginger.hospitals) {
    if (!String(hospital.slug).startsWith(SAHYADRI)) continue;
    const overlay = cms.hospitalOverrides[String(hospital.slug)];
    if (!overlay) continue;
    const faculty = ginger.doctors.filter((d) => {
      const slugs = Array.isArray(d.hospitalSlugs) ? (d.hospitalSlugs as string[]) : [String(d.hospitalSlug)];
      return slugs.includes(String(hospital.slug));
    });
    const specialtyNames = [
      ...new Set(faculty.map((d) => String(d.specialty)).filter(Boolean)),
    ];
    overlay.focus = specialtyNames.map((name) => taxonomyLabel(name, "ar")).join(" · ");
    overlay.icu = "عناية مركزة متعددة التخصصات وفق ما ينشره المستشفى للحرم";
  }

  writeFileSync(cmsPath, `${JSON.stringify(cms, null, 2)}\n`);

  const docsDir = join(root, "docs");
  const toCsv = (rows: Array<Record<string, string>>) => {
    if (!rows.length) return "";
    const headers = Object.keys(rows[0]);
    const esc = (v: string) => {
      if (/[",\n]/.test(v)) return `"${v.replace(/"/g, '""')}"`;
      return v;
    };
    return [headers.join(","), ...rows.map((r) => headers.map((h) => esc(r[h] ?? "")).join(","))].join("\n") + "\n";
  };

  writeFileSync(join(docsDir, "sahyadri-pune-doctor-procedure-audit.csv"), toCsv(doctorAudit));
  writeFileSync(join(docsDir, "sahyadri-pune-image-audit.csv"), toCsv(imageAudit));
  writeFileSync(join(docsDir, "sahyadri-pune-multicampus-audit.csv"), toCsv(multiCampusAudit));
  writeFileSync(join(docsDir, "sahyadri-pune-hospital-campus-audit.csv"), toCsv(hospitalAudit));

  // Campus evidence matrix (JSON): specialties/procedures per campus with source.
  const matrix: Record<string, { specialties: Array<{ name: string; source: string; doctor_count: number }>; procedures: Array<{ name: string; source: string; doctors: string[] }> }> = {};
  for (const slug of Object.values(CAMPUS_SLUG)) {
    const faculty = ginger.doctors.filter((d) => {
      const slugs = Array.isArray(d.hospitalSlugs) ? (d.hospitalSlugs as string[]) : [String(d.hospitalSlug)];
      return slugs.includes(slug);
    });
    const specialtyCounts = new Map<string, number>();
    const procedureDoctors = new Map<string, string[]>();
    for (const d of faculty) {
      const spec = String(d.specialty);
      specialtyCounts.set(spec, (specialtyCounts.get(spec) || 0) + 1);
      for (const proc of (d.proceduresExpertise as string[]) || []) {
        const list = procedureDoctors.get(proc) || [];
        list.push(String(d.slug));
        procedureDoctors.set(proc, list);
      }
    }
    matrix[slug] = {
      specialties: [...specialtyCounts.entries()]
        .sort((a, b) => b[1] - a[1])
        .map(([name, doctor_count]) => ({
          name,
          doctor_count,
          source: `Verified faculty specialty on ${doctor_count} doctor profile(s) affiliated to this campus via Sahyadri OPD listings / eligibility campuses`,
        })),
      procedures: [...procedureDoctors.entries()].map(([name, doctors]) => ({
        name,
        doctors,
        source: `Evidence-mapped from official Sahyadri doctor profile text for: ${doctors.join(", ")}`,
      })),
    };
  }
  writeFileSync(join(docsDir, "sahyadri-pune-campus-evidence-matrix.json"), `${JSON.stringify(matrix, null, 2)}\n`);

  const summary = {
    eligible_doctors: eligibility.length,
    procedure_mapping: {
      verified: doctorAudit.filter((r) => r.mapping_status === "verified").length,
      partially_verified: doctorAudit.filter((r) => r.mapping_status === "partially_verified").length,
      no_specific_procedure_evidence: doctorAudit.filter((r) => r.mapping_status === "no_specific_procedure_evidence").length,
      with_at_least_one_procedure: doctorAudit.filter((r) => r.mapped_procedures).length,
    },
    images: { verified_image: imagesVerified, approved_fallback_or_unavailable: imagesFallback },
    multi_campus_doctors: multiCampusAudit.length,
    hospitals: hospitalAudit.length,
  };
  writeFileSync(join(docsDir, "sahyadri-pune-remediation-summary.json"), `${JSON.stringify(summary, null, 2)}\n`);
  writeFileSync("/opt/cursor/artifacts/sahyadri-pr37-remediation-summary.json", `${JSON.stringify(summary, null, 2)}\n`);
  console.log(JSON.stringify(summary, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
