import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  CRT_NAME,
  crtDestinationCosts,
  crtFaqs,
  crtIndiaCityCosts,
} from "@/data/crt-guide";
import { costPath, doctorsPath, hospitalsPath } from "@/lib/catalog-links";

const crtDoctors = doctorsPath({ destination: "India", procedure: CRT_NAME });
const crtHospitals = hospitalsPath({ destination: "India", procedure: CRT_NAME });

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 text-base leading-relaxed text-muted-foreground">{children}</p>;
}

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="mt-14 scroll-mt-28 font-heading text-3xl">
      {children}
    </h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="mt-8 font-heading text-2xl">{children}</h3>;
}

export function CrtGuide() {
  return (
    <article className="max-w-3xl [&_a]:underline-offset-4 [&_a]:hover:underline">
      <nav className="rounded-2xl border border-border bg-card p-6 text-sm">
        <p className="text-xs tracking-[0.18em] uppercase text-gold">On this page</p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {[
            ["what", "What is 3D-CRT"],
            ["how", "How it works"],
            ["who", "Who may need it"],
            ["process", "Treatment process"],
            ["sessions", "Sessions"],
            ["imrt", "vs IMRT"],
            ["cost", "Cost in India"],
            ["side-effects", "Side effects"],
            ["recovery", "Recovery"],
            ["faq", "FAQs"],
          ].map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`}>{label}</a>
            </li>
          ))}
        </ul>
      </nav>

      <P>
        3D Conformal Radiation Therapy (3D-CRT) is a form of{" "}
        <Link href={costPath("External Beam Radiotherapy (EBRT)")}>external beam radiation therapy</Link>{" "}
        that uses three-dimensional imaging and computer-based treatment planning to shape
        radiation beams around a cancerous tumour. The goal is to deliver the prescribed
        dose to the tumour while reducing unnecessary exposure to surrounding healthy
        tissue.
      </P>
      <P>
        It remains an important technique in many cancer centres, particularly where a
        tumour can be covered with relatively straightforward beam arrangements. Current
        Indian sources report that 3D-CRT is still commonly used, with costs varying by{" "}
        <Link href={crtHospitals}>hospital</Link>, city, cancer type and number of
        sessions. Browse{" "}
        <Link href={crtDoctors}>named radiation oncologists</Link> who list 3D-CRT before
        you buy a ticket.
      </P>

      <H2 id="what">What is 3D Conformal Radiation Therapy?</H2>
      <P>
        3D-CRT is an advanced form of conventional external beam radiation. Before
        treatment, doctors obtain three-dimensional images — usually a CT simulation —
        to understand the size, shape and location of the tumour and the surrounding
        organs. Planning software then lets the radiation team design beams that conform
        more closely to the three-dimensional shape of the target. Instead of giving
        radiation from one simple direction, the{" "}
        <Link href={doctorsPath({ destination: "India", specialty: "Radiation Oncology" })}>radiation oncologist</Link>{" "}
        can use multiple beams from different angles.
      </P>
      <P>
        The basic sequence is CT imaging → tumour mapping → computer treatment planning
        → shaped radiation beams → repeated treatment sessions. Radiation is generated
        outside the body, usually by a linear accelerator (LINAC). The patient does not
        feel the beam during delivery, and no radioactive material is left inside the
        body after a standard 3D-CRT session.
      </P>

      <H2 id="how">How does 3D-CRT work?</H2>
      <P>
        The team identifies the tumour and organs at risk. The CT allows the oncologist
        to see the treatment area in three dimensions. The planning system then
        calculates beam angles, size and shape, dose, dose distribution, number of
        fields, and organ-at-risk positions. Beams are shaped with devices such as
        multileaf collimators so the field follows the intended target. The objective is
        an adequate tumour dose with limited exposure to nearby healthy tissue.
      </P>

      <H2 id="who">Who may need 3D-CRT?</H2>
      <P>
        3D-CRT can be used for many cancers. Whether it is the right technique depends
        on location, size, shape, stage and relationship to nearby organs. It may be
        considered for prostate, breast, lung, head and neck, brain, gastrointestinal,
        pelvic and certain bone tumours, and for selected metastatic disease.
      </P>
      <P>
        Breast cases may sit on a women&apos;s-cancer floor such as{" "}
        <Link href="/hospitals/apollo-athenaa-women-s-cancer-centre">Apollo Athenaa</Link>.
        The decision belongs to a radiation oncologist after pathology and imaging —
        not because 3D-CRT is cheaper than{" "}
        <Link href={costPath("Intensity-Modulated Radiotherapy (IMRT)")}>IMRT</Link>. For
        tumours sitting against sensitive organs, a more conformal technique may be the
        honest plan. See{" "}
        <Link href="/blogs/imrt-vs-3d-crt">IMRT versus 3D-CRT</Link>.
      </P>

      <H2 id="process">3D-CRT treatment process</H2>
      <H3>1. Radiation oncology consultation</H3>
      <P>
        The oncologist reviews pathology, CT/MRI/PET, stage, prior surgery,
        chemotherapy, prior radiation, general health and treatment objective, then
        says whether radiation is appropriate and which technique.{" "}
        <Link href="/consult?treatment=3d-conformal-radiotherapy-3d-crt">Request a dossier</Link>{" "}
        to meet a named consultant on camera. Send records first —{" "}
        <Link href="/blogs/records-before-you-book-ebrt">what we ask for</Link>.
      </P>
      <H3>2. CT simulation</H3>
      <P>
        The patient is positioned exactly as they will be treated. A planning CT is
        taken. Immobilisation may include a thermoplastic mask, vacuum cushion, body
        mould, head rest or leg rest so the same set-up can be repeated every fraction.
      </P>
      <H3>3. Treatment planning</H3>
      <P>
        The oncologist identifies the target volume and organs at risk. A physicist or
        dosimetrist builds the plan. The computer calculates how radiation from
        different directions will combine.
      </P>
      <H3>4. Quality assurance</H3>
      <P>
        Before the first fraction, the plan is checked so the machine can deliver the
        prescribed dose accurately.
      </P>
      <H3>5. Radiation treatment</H3>
      <P>
        The patient lies on the table. The LINAC delivers radiation from predetermined
        directions. Beam-on time may be only a few minutes; the appointment is longer
        because of positioning and verification.
      </P>

      <H2 id="sessions">How many sessions are needed?</H2>
      <P>
        There is no universal number. It depends on cancer type and stage, tumour
        location, treatment objective, total dose, dose per fraction, and whether
        radiation is combined with chemotherapy or another treatment.
      </P>
      <P>
        A conventional course may involve approximately 15–35 sessions, often Monday
        through Friday. Some patients need fewer fractions when radiation is for
        symptom relief. “30 sessions of 3D-CRT” is not a standard that applies to
        everyone.
      </P>

      <H2 id="compare">3D-CRT vs conventional radiation and IMRT</H2>
      <P>
        Conventional 2D radiation relied more on two-dimensional imaging and simpler
        fields. 3D-CRT uses three-dimensional imaging and computer planning to shape
        fields around the target.{" "}
        <Link href={costPath("Intensity-Modulated Radiotherapy (IMRT)")}>IMRT</Link> goes
        further by modulating intensity within beams, creating more complex dose
        distributions. In short: conventional radiation → simpler fields; 3D-CRT →
        3D-shaped fields; IMRT → intensity-modulated fields. The most sophisticated
        technique is not automatically right for every patient.
      </P>

      <H2 id="imrt">3D-CRT vs IMRT</H2>
      <div className="mt-6 overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[36rem] text-left text-sm">
          <thead className="bg-secondary/60 text-xs tracking-[0.16em] uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">Feature</th>
              <th className="px-4 py-3 font-medium">3D-CRT</th>
              <th className="px-4 py-3 font-medium">IMRT</th>
            </tr>
          </thead>
          <tbody className="bg-card text-muted-foreground">
            {[
              ["Treatment planning", "3D CT-based", "Advanced 3D computer optimisation"],
              ["Beam shaping", "Yes", "Yes"],
              ["Beam intensity modulation", "Limited", "Yes"],
              ["Dose conformality", "Good", "Generally higher"],
              ["Planning complexity", "Moderate", "Higher"],
              ["Cost", "Usually lower", "Usually higher"],
              ["Appropriate for every tumour?", "No", "No"],
              ["Number of sessions", "Depends on cancer", "Depends on cancer"],
            ].map(([f, a, b]) => (
              <tr key={f} className="border-t border-border">
                <td className="px-4 py-3 font-medium text-foreground">{f}</td>
                <td className="px-4 py-3">{a}</td>
                <td className="px-4 py-3">{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <P>
        Current Indian pricing illustrates the difference: one 2026 oncology centre
        reports approximately ₹60,000–₹1,50,000 for 3D-CRT compared with
        ₹1,20,000–₹1,90,000 for IMRT at its own centre, with higher ranges at many
        corporate hospitals. Technique should follow the tumour, not the cheaper line
        on a brochure.{" "}
        <Link href={costPath("Image-Guided Radiotherapy (IGRT)")}>IGRT</Link> is imaging
        guidance and is often paired with either technique.
      </P>

      <H2 id="cost">3D-CRT cost in India</H2>
      <P>
        Cost varies substantially between hospitals. A 2026 Indian source reports
        ₹60,000–₹1,50,000 at one cancer centre and approximately ₹1,00,000–₹2,00,000 at
        many corporate hospitals. Another hospital publishes ₹75,000–₹2,25,000. A
        government-sector schedule lists a package of ₹1,09,000 for 3D conformal
        radiation — institutional and patient-category pricing can differ.
      </P>
      <P>
        For international patients considering private treatment in India, a reasonable
        broad planning range is approximately <strong className="text-foreground">$700–$2,500+</strong>.
        The final quotation can sit outside this range depending on hospital, city,
        fractions, planning complexity, imaging, immobilisation, consultation, cancer
        type and additional treatment. GAF Healthcare shows this as an indicative partner range,
        not a guaranteed price.
      </P>

      <H3>3D-CRT cost by major Indian cities</H3>
      <P>
        There is not enough standardised city-level tariff data to claim one fixed
        price per city. These are planning estimates. The final number depends on the
        hospital and the plan.
      </P>
      <div className="mt-6 overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[28rem] text-left text-sm">
          <thead className="bg-secondary/60 text-xs tracking-[0.16em] uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">City</th>
              <th className="px-4 py-3 font-medium">Indicative range</th>
              <th className="px-4 py-3 font-medium">On GAF Healthcare</th>
            </tr>
          </thead>
          <tbody>
            {crtIndiaCityCosts.map((row) => (
              <tr key={row.city} className="border-t border-border bg-card">
                <td className="px-4 py-3 font-medium">{row.city}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.range}</td>
                <td className="px-4 py-3">
                  {row.listed ? (
                    <span className="flex flex-wrap gap-3">
                      <Link
                        href={hospitalsPath({
                          destination: "India",
                          city: row.city,
                          procedure: CRT_NAME,
                        })}
                      >
                        Hospitals
                      </Link>
                      <Link
                        href={doctorsPath({
                          destination: "India",
                          city: row.city,
                          procedure: CRT_NAME,
                        })}
                      >
                        Doctors
                      </Link>
                    </span>
                  ) : (
                    <Link href="/consult">Request a match</Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H3>Indicative radiation therapy costs by destination</H3>
      <P>
        Thailand currently publishes a specific $3,000–$3,800 estimate for a full
        course of 3D conformal radiotherapy. Other international figures below are
        broader radiation-therapy market estimates, not 3D-CRT-specific tariffs, and
        should not be read as exact 3D-CRT prices. India is the destination GAF Healthcare
        currently staffs with named consultants.
      </P>
      <div className="mt-6 overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[28rem] text-left text-sm">
          <thead className="bg-secondary/60 text-xs tracking-[0.16em] uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">Destination</th>
              <th className="px-4 py-3 font-medium">Indicative full-course range</th>
            </tr>
          </thead>
          <tbody>
            {crtDestinationCosts.map((row) => (
              <tr key={row.place} className="border-t border-border bg-card">
                <td className="px-4 py-3 font-medium">
                  {row.place === "India" ? <Link href={crtHospitals}>{row.place}</Link> : row.place}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {row.range}
                  {!row.specific ? " (broader RT market)" : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H3>What is included in 3D-CRT cost?</H3>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="text-xs tracking-[0.18em] uppercase text-gold">Often included</p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            <li>Radiation oncologist consultation</li>
            <li>CT simulation</li>
            <li>Treatment planning and dosimetry</li>
            <li>Medical physics</li>
            <li>Treatment delivery</li>
            <li>Routine verification and on-treatment consultations</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="text-xs tracking-[0.18em] uppercase text-gold">Often separate</p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            <li>MRI, PET-CT, biopsy, pathology, blood tests</li>
            <li>Immobilisation devices and extra imaging</li>
            <li>Chemotherapy or hormone therapy</li>
            <li>Hospital admission and treatment of complications</li>
          </ul>
        </div>
      </div>
      <P>
        Always request an itemized quotation.{" "}
        <Link href="/consult?treatment=3d-conformal-radiotherapy-3d-crt">We will collect that quote</Link>{" "}
        against a named campus.
      </P>

      <H2 id="side-effects">Side effects of 3D-CRT</H2>
      <P>
        Side effects depend on the body area treated. Common general effects include
        fatigue, skin irritation, local changes and reduced appetite in some patients.
      </P>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
        <li>
          <span className="text-foreground">Head and neck:</span> mouth soreness,
          difficulty swallowing, dry mouth, taste changes
        </li>
        <li>
          <span className="text-foreground">Chest:</span> fatigue, skin changes, cough,
          swallowing discomfort in some patients
        </li>
        <li>
          <span className="text-foreground">Abdomen and pelvis:</span> nausea,
          diarrhoea, urinary symptoms, bowel changes, fatigue
        </li>
        <li>
          <span className="text-foreground">Brain:</span> fatigue, headache, hair loss
          in the field, swelling in selected cases
        </li>
      </ul>
      <P>
        Delivery itself is generally painless. Patients do not normally feel the
        radiation. Effects may build as the course continues. 3D-CRT is usually
        outpatient: arrive, treat, leave. Admission is the exception — when the
        patient&apos;s condition or another concurrent treatment requires a bed.
      </P>

      <H2 id="recovery">How long each session takes, and travel</H2>
      <P>
        Beam delivery may take only several minutes. The appointment is longer for
        positioning, alignment, verification imaging when required, and machine set-up.
        International patients should plan for consultation, planning, daily fractions,
        follow-up, accommodation and local transport — a conventional course can run
        several weeks even if each beam-on is short.
      </P>
      <P>
        Shorter high-dose courses are a different product:{" "}
        <Link href={costPath("Stereotactic Body Radiotherapy (SBRT)")}>SBRT</Link>,{" "}
        <Link href={costPath("Stereotactic Radiosurgery (SRS)")}>SRS</Link>. Protons are
        another argument entirely —{" "}
        <Link href={costPath("Proton Beam Therapy")}>Proton Beam Therapy</Link> and{" "}
        <Link href="/blogs/when-proton-is-worth-the-flight">when that flight is justified</Link>.
      </P>

      <H2 id="pros">Advantages and limitations</H2>
      <P>
        Advantages include three-dimensional planning, better beam shaping than 2D
        fields, wide availability, generally lower cost than IMRT, IGRT, SBRT or
        protons, and a long clinical track record.
      </P>
      <P>
        Limitations: it is not the newest technology and may not give the optimal dose
        distribution for every tumour. Targets sitting against sensitive structures may
        need IMRT or IGRT. Selected small tumours may belong on SBRT or SRS. Where
        sparing normal tissue is the clinical argument, protons may be considered. The
        radiation oncology team decides.
      </P>

      <H2 id="faq">Frequently asked questions</H2>
      <Accordion type="single" collapsible className="mt-6">
        {crtFaqs.map((item, i) => (
          <AccordionItem key={item.q} value={`faq-${i}`}>
            <AccordionTrigger className="text-base">{item.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <H2 id="glance">3D-CRT cost at a glance</H2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
        <li>Treatment: 3D Conformal Radiation Therapy</li>
        <li>
          Type:{" "}
          <Link href={costPath("External Beam Radiotherapy (EBRT)")}>
            External Beam Radiation Therapy
          </Link>
        </li>
        <li>Typical course: approximately 15–35 sessions, depending on diagnosis</li>
        <li>Setting: usually outpatient</li>
        <li>Indicative India cost: $700–$2,500+</li>
        <li>Major cost factors: hospital, city, cancer type, fractions, planning complexity</li>
      </ul>
      <P>
        A price on a medical-tourism page is an indicative range, not a quotation. A
        final price should follow after the radiation oncologist reviews the diagnosis
        and plan. Indian sources show substantial variation between hospitals. 3D-CRT
        is not necessarily the right technique for every patient — the treating
        oncologist should say whether 3D-CRT, IMRT, IGRT, VMAT, SBRT, SRS, proton
        therapy or another approach fits this cancer.
      </P>
    </article>
  );
}
