import FaqItem from '../components/FaqItem';
import JsonLd from '../components/JsonLd';
import { Link } from "../lib/navigation";
import LogoMarquee from "@/components/LogoMarquee";
import { canonicalURL } from '../lib/site-url';

/** The hub for the service pages, and the last page on the site under
 *  the word-count floor it sets for everything it links to.
 *
 *  Three things were removed rather than rewritten. An empty
 *  `grid-cols-2 md:grid-cols-4` div inside a bordered, tinted panel rendered
 *  as a blank box above the logo marquee — the same dead markup as the empty
 *  stat grid in `ServiceTemplate`. "Background-checked" crews, in the FAQ:
 *  nothing in the repo supports a vetting claim, and Q3 still has not come
 *  back. And "IBC / Rheem specialists", which is a claim about standing
 *  rather than about equipment — the brands stay, the word does not.
 *
 *  The H1 was "Built for uptime. Tuned for comfort.", which says nothing a
 *  search could match and nothing a buyer could check. */
export default function Services() {
  return (
    <div className="bg-white text-neutral-900">
      {/* Google stopped showing FAQ rich results for sites outside government
          and health in 2023, so this is not a rich-result play. It is read by
          Bing and by answer engines, and the questions are already on the
          page, so the markup costs one object and invents nothing. */}
      <JsonLd data={{
        '@context': 'https://schema.org', '@type': 'FAQPage',
        '@id': `${canonicalURL('/services')}#faq`,
        mainEntity: FAQ.map(item => ({
          '@type': 'Question', name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      }} />

      {/* ===== HERO ===== */}
      <section className="page-photo-hero relative overflow-hidden">
        <img
          src="https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_1200/v1760065875/Allied/1_tc9jiy.png"
          alt=""
          className="absolute inset-0 h-[42vh] md:h-[54vh] w-full object-cover"
        />
        <div className="hero-scrim absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="relative max-w-6xl mx-auto px-4 md:px-6 pt-28 md:pt-36 pb-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 text-white px-3 py-1 text-xs ring-1 ring-white/25 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Our Services
          </span>
          <h1 className="mt-4 text-4xl md:text-6xl font-extrabold text-white leading-tight drop-shadow">
            Mechanical services for Metro Vancouver buildings
          </h1>
          <p className="mt-2 max-w-2xl text-white/90">
            Plumbing, heating, ventilation and maintenance for schools, stratas, campuses and homes — from a boiler plant planned a year ahead to a no-heat call at two in the morning.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              to="/quote"
              className="inline-flex items-center gap-2 rounded-lg bg-white text-neutral-900 px-5 py-3 font-semibold shadow hover:bg-neutral-200"
            >
              Get a quote <span aria-hidden>↗</span>
            </Link>
            <a
              href="tel:+16047311000" data-cta-location="page"
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 text-white px-5 py-3 font-semibold backdrop-blur hover:bg-white/20"
            >
              24/7 Dispatch: 604-731-1000
            </a>
          </div>
        </div>
      </section>

      {/* ===== SERVICE GRID ===== */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="mb-8 md:mb-10">
          <span className="inline-block text-xs md:text-sm px-3 py-1 rounded-full bg-neutral-100 text-neutral-600">
            What we do
          </span>
          <h2 className="mt-3 text-2xl md:text-4xl font-extrabold">
            Seven lines, one mechanical contractor
          </h2>
          <p className="mt-2 text-neutral-600 max-w-prose">
            {/* Audit H-04 removed "certified technicians" from the quote page
                because no certification is named anywhere (Q3). It was still
                standing here and on the residential page, which made that fix
                half a fix. */}
            Heating, ventilation, plumbing and maintenance for buildings that stay in use — schools, stratas, campuses and municipal facilities across Metro Vancouver and the Sea to Sky corridor.
          </p>
        </div>

        <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2">
          <ServiceCard
            to="/services/residential-plumbing"
            title="Residential Plumbing"
            blurb="Repairs, fixture replacements, repipes, tank & tankless water heaters — neat work, clean handover."
            bullets={["Repairs & rough-ins", "Tankless installs", "Repipes / PEX / copper"]}
            img="https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_1200/v1760068156/Allied/14_urnogx.png"
          />
          <ServiceCard
            to="/services/commercial-plumbing"
            title="Commercial & Institutional Plumbing"
            blurb="Backflows, PRVs, booster pumps, DHW plants, tenant improvements, strata & schools."
            bullets={["Backflow testing", "Booster & PRV", "DHW plants"]}
            img="https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_1200/v1760065875/Allied/1_tc9jiy.png"
          />
          <ServiceCard
            to="/services/hvac"
            title="HVAC (RTU, MUA, AHU, Heat Pumps, VRF)"
            blurb="Design-build and service for packaged units and VRF — with DDC integration and trending."
            bullets={["RTU / MUA / AHU", "VRF & heat pumps", "DDC integration"]}
            img="https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_1200/v1760065876/Allied/3_gk4dl8.png"
          />
          <ServiceCard
            to="/services/boilers"
            title="Boiler Plants & Controls"
            blurb="Condensing boilers, burners, VFD pumps, HX, tanks, safety and controls — tuned for efficiency."
            bullets={["IBC / Viessmann / Rheem", "VFD pumps & HX", "Safety & combustion checks"]}
            img="https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_1200/v1760068155/Allied/10_kubptf.png"
          />
          <ServiceCard
            to="/services/heat-pump-conversions"
            title="Heat Pump Conversions"
            blurb="Air-source heat pump and hybrid plants for existing buildings — sized to the emitters and the electrical service."
            bullets={["Hybrid and full-electric options", "Emitter and capacity survey", "Season-long commissioning"]}
            img="https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_1200/v1760065876/Allied/3_gk4dl8.png"
          />
          <ServiceCard
            to="/services/maintenance"
            title="Preventive Maintenance Programs"
            blurb="Monthly, quarterly, annual programs with checklists, reporting and capex planning."
            bullets={["Equipment-specific checklists", "Trend reviews", "Lifecycle and capex input"]}
            img="https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_1200/v1760074307/Allied/Gemini_Generated_Image_9on55p9on55p9on5_ga0mso.png"
          />
          <ServiceCard
            to="/services/emergency"
            title="24/7 Emergency Service"
            blurb="On-call dispatch for leaks, no-heat/DHW outages, gas issues and critical alarms."
            bullets={["Answered 24/7", "Triage and isolation", "Occupied-building procedures"]}
            img="https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_1200/v1760070439/Allied/247_bs1xho.png"
          />
        </div>
      </section>

      {/* ===== HOW THE LINES FIT TOGETHER ===== */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 pb-4">
        <div className="max-w-3xl space-y-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">The lines are one job, split by when it happens</h2>
            <p className="mt-4 text-neutral-700 leading-relaxed">A building does not experience these as separate services. It experiences a plant that is installed once, commissioned once, maintained for twenty years and occasionally fails at an inconvenient hour. The split above is a split in time, not in responsibility, and the reason it matters is that each stage leaves something the next one needs.</p>
            <p className="mt-4 text-neutral-700 leading-relaxed">A project hands over the equipment data, the as-built drawings, the sequence of operation and the commissioning records. A maintenance programme starts from those rather than from a fresh survey of a building we have just finished. An out-of-hours call is faster when the person taking it can see what was installed, how it was set up and what was already deteriorating at the last visit. Where a building comes to us with none of that, the first visits are partly a survey, and we say so instead of pricing them as routine.</p>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Which page you want</h2>
            <ul className="mt-4 list-disc pl-5 space-y-3 text-neutral-700 leading-relaxed">
              <li><strong>A school district or campus with a capital project</strong> — start at <Link to="/services/boilers" className="font-semibold text-[#315cb4] underline underline-offset-4">boiler plants</Link> or <Link to="/services/hvac" className="font-semibold text-[#315cb4] underline underline-offset-4">HVAC</Link>, then the <Link to="/rfp" className="font-semibold text-[#315cb4] underline underline-offset-4">tender page</Link> for what a complete package needs.</li>
              <li><strong>A strata council or rental owner</strong> — <Link to="/services/commercial-plumbing" className="font-semibold text-[#315cb4] underline underline-offset-4">commercial plumbing</Link> covers domestic hot water, risers, booster sets and backflow; <Link to="/services/boilers" className="font-semibold text-[#315cb4] underline underline-offset-4">boiler plants</Link> covers the heating side.</li>
              <li><strong>A building operator who wants the plant looked after</strong> — <Link to="/services/maintenance" className="font-semibold text-[#315cb4] underline underline-offset-4">preventive maintenance</Link>, and what a visit report should contain to be worth filing.</li>
              <li><strong>Something failing right now</strong> — <Link to="/services/emergency" className="font-semibold text-[#315cb4] underline underline-offset-4">emergency service</Link>, though the short version is to call rather than fill in a form.</li>
              <li><strong>A house or a small multi-family building</strong> — <Link to="/services/residential-plumbing" className="font-semibold text-[#315cb4] underline underline-offset-4">residential plumbing</Link>.</li>
            </ul>
            <p className="mt-4 text-neutral-700 leading-relaxed">If you would rather see the work than read about it, every <Link to="/projects" className="font-semibold text-[#315cb4] underline underline-offset-4">project page</Link> describes a real scope, the trades it had to be coordinated against and the problems that came up, and the <Link to="/clients" className="font-semibold text-[#315cb4] underline underline-offset-4">clients page</Link> lists whose buildings those were.</p>
          </div>
        </div>
      </section>

      {/* ===== EQUIPMENT BRANDS ===== */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 pb-10 md:pb-14">
        <LogoMarquee />
      </section>

      {/* ===== MINI FAQ ===== */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 pb-12 md:pb-16">
        <div className="mb-6">
          <span className="inline-block text-xs md:text-sm px-3 py-1 rounded-full bg-neutral-100 text-neutral-600">
            FAQ
          </span>
          <h2 className="mt-3 text-2xl md:text-4xl font-extrabold">How we work</h2>
        </div>
        <div className="divide-y divide-neutral-200 rounded-2xl border border-neutral-200 bg-white">
          {FAQ.map((f) => (
            <FaqItem key={f.q} question={f.q}>{f.a}</FaqItem>
          ))}
        </div>
      </section>

      {/* ===== BOTTOM CTA ===== */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 pb-16 md:pb-24">
        <div className="relative overflow-hidden rounded-2xl bg-neutral-900 text-white p-6 md:p-10">
          <div
            className="absolute -top-10 -right-10 h-56 w-56 rounded-full blur-3xl opacity-30"
            style={{ background: "radial-gradient(closest-side,#60a5fa 30%,transparent)" }}
          />
          <h2 className="text-2xl md:text-4xl font-extrabold">Need help today?</h2>
          <p className="mt-2 text-white/80 max-w-prose">
            Request an assessment or call our team to discuss availability.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link
              to="/quote"
              className="inline-flex items-center gap-2 rounded-lg bg-white text-neutral-900 px-5 py-3 font-semibold shadow hover:bg-neutral-200"
            >
              Get a quote
            </Link>
            <a
              href="tel:+16047311000" data-cta-location="page"
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-5 py-3 font-semibold backdrop-blur hover:bg-white/20"
            >
              Call 604-731-1000
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ========= components ========= */

function ServiceCard({
  to,
  title,
  blurb,
  bullets,
  img,
}: {
  to: string;
  title: string;
  blurb: string;
  bullets: string[];
  img: string;
}) {
  return (
    <Link
      to={to}
      className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm hover:shadow-lg transition"
    >
      <div className="relative">
        <img src={img} alt="" className="h-52 w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-90" />
        <div className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-white/85 backdrop-blur px-3 py-1 text-xs font-semibold ring-1 ring-black/5">
          Learn more ↗
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="mt-2 text-neutral-600">{blurb}</p>
        <ul className="mt-3 text-sm text-neutral-700 space-y-1">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-2">
              <Check />
              {b}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5 text-neutral-900" fill="currentColor" aria-hidden>
      <path d="M7.5 13.5 3.8 9.8l1.4-1.4 2.3 2.3 6.3-6.3 1.4 1.4-7.7 7.7Z" />
    </svg>
  );
}

/* ========= data =========
 *
 * These answers are also published as FAQPage structured data above, so an
 * answer that stops being true has to be corrected in one place only. Every
 * one of them is carried by a project page; none states a response time, a
 * certification or a warranty term. */
const FAQ = [
  {
    q: "Do you handle permits and as-builts?",
    a: "Yes. That includes gas, boiler and refrigeration permits, and the street-use and crane permits a rooftop lift needs, along with booking the inspections. At the end you receive a turnover package: as-built drawings, O&M manuals, equipment data, commissioning and balancing records, and a demonstration for whoever will operate the system.",
  },
  {
    q: "Can you integrate with our existing controls?",
    a: "We work with Delta, Trane and Reliable DDC for sequencing, trending and alarms. The controls contractor needs to be in the sequence discussion while the mechanical work is still being planned rather than after it, and the sequence of operation is handed over with the equipment. Where a building has no DDC yet, that is its own scope with its own lead time.",
  },
  {
    q: "Can the work happen while the building is in use?",
    a: "That is the normal case rather than the exception. Work is phased with the building operator, taken at night, on weekends or inside an overnight window, with temporary heat or hot water where a system has to come offline, and with hoarding, dust control and access routes that keep a live site away from the people using the building.",
  },
  {
    q: "Do you work for school districts and strata councils?",
    a: "Most of our documented projects are for public school districts, with campuses, independent schools, strata and rental buildings making up the rest. District work usually arrives through tender or RFP; strata and private owners usually start with a phone call or an enquiry form.",
  },
  {
    q: "How do we send a tender or an RFP?",
    a: "Send the drawings and specifications, the closing date and how addenda will be issued, the access and shutdown constraints, and whatever records you hold on the existing equipment. The tender page lists the rest of what makes a mechanical bid firm rather than hedged.",
  },
  {
    q: "What happens after the project closes?",
    a: "The turnover package stays with the building, and a preventive maintenance programme can start from it rather than from a fresh survey. If the building is already on a programme elsewhere, the records are yours to take with you either way.",
  },
];
