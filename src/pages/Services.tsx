import { Link } from "react-router-dom";
import LogoMarquee from "@/components/LogoMarquee";

export default function Services() {
  return (
    <div className="bg-white text-neutral-900">

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden">
        <img
          src="https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_1200/v1760065875/Allied/1_tc9jiy.png"
          alt=""
          className="absolute inset-0 h-[42vh] md:h-[54vh] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="relative max-w-6xl mx-auto px-4 md:px-6 pt-28 md:pt-36 pb-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 text-white px-3 py-1 text-xs ring-1 ring-white/25 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Our Services
          </span>
          <h1 className="mt-4 text-4xl md:text-6xl font-extrabold text-white leading-tight drop-shadow">
            Built for uptime. Tuned for comfort.
          </h1>
          <p className="mt-2 max-w-2xl text-white/90">
            From emergency fixes to multi-site programs — one team, coast-ready solutions.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              to="/GetQuote"
              className="inline-flex items-center gap-2 rounded-lg bg-white text-neutral-900 px-5 py-3 font-semibold shadow hover:bg-neutral-200"
            >
              Get a quote <span aria-hidden>↗</span>
            </Link>
            <a
              href="tel:604-731-1000"
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
            Full-stack mechanical, from taps to rooftops
          </h2>
          <p className="mt-2 text-neutral-600 max-w-prose">
            Certified technicians, school-approved crews, DDC-ready controls and proactive programs that keep sites running.
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
            bullets={["IBC / Rheem specialists", "VFD pumps & HX", "Safety & combustion checks"]}
            img="https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_1200/v1760068155/Allied/10_kubptf.png"
          />
          <ServiceCard
            to="/services/maintenance"
            title="Preventive Maintenance Programs"
            blurb="Monthly, quarterly, annual programs with checklists, reporting and capex planning."
            bullets={["Bespoke PM checklists", "Trend reviews", "Capex forecasting"]}
            img="https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_1200/v1760074307/Allied/Gemini_Generated_Image_9on55p9on55p9on5_ga0mso.png"
          />
          <ServiceCard
            to="/services/emergency"
            title="24/7 Emergency Service"
            blurb="On-call dispatch for leaks, no-heat/DHW outages, gas issues and critical alarms."
            bullets={["Real person 24/7", "Rapid triage", "School-safe crews"]}
            img="https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_1200/v1760070439/Allied/247_bs1xho.png"
          />
        </div>
      </section>

{/* ===== TRUST STRIP / LOGOS ===== */}
<section className="max-w-6xl mx-auto px-4 md:px-6 pb-10 md:pb-14">
  <div className="rounded-2xl border border-neutral-200 bg-[rgb(240_249_255_/_0.8)] p-5 md:p-7">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
      <Stat n="8k+" label="Projects completed" />
      <Stat n="5k+" label="Customers served" />
      <Stat n="12" label="Years experience" />
      <Stat n="92" label="Team engineers" />
    </div>
  </div>

  {/* вместо статической сетки логотипов */}
  <LogoMarquee className="mt-6" height={56} speedSec={22} grayscale />
</section>

      {/* ===== MINI FAQ ===== */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 pb-12 md:pb-16">
        <div className="mb-6">
          <span className="inline-block text-xs md:text-sm px-3 py-1 rounded-full bg-neutral-100 text-neutral-600">
            FAQ
          </span>
          <h3 className="mt-3 text-2xl md:text-4xl font-extrabold">How we work</h3>
        </div>
        <div className="divide-y divide-neutral-200 rounded-2xl border border-neutral-200 bg-white">
          {FAQ.map((f) => (
            <details key={f.q} className="group p-5 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between">
                <span className="font-medium">{f.q}</span>
                <span className="ml-4 grid h-6 w-6 place-items-center rounded-full bg-neutral-100 text-neutral-700 group-open:rotate-45 transition">
                  +
                </span>
              </summary>
              <p className="mt-3 text-neutral-600">{f.a}</p>
            </details>
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
          <h3 className="text-2xl md:text-4xl font-extrabold">Need help today?</h3>
          <p className="mt-2 text-white/80 max-w-prose">
            Book a same-day assessment or call dispatch — we’ll move fast and keep you updated.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link
              to="/GetQuote"
              className="inline-flex items-center gap-2 rounded-lg bg-white text-neutral-900 px-5 py-3 font-semibold shadow hover:bg-neutral-200"
            >
              Get a quote
            </Link>
            <a
              href="tel:604-731-1000"
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

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div className="space-y-1">
      <div className="text-3xl md:text-4xl font-extrabold text-neutral-900">{n}</div>
      <div className="text-sm md:text-base text-neutral-600">{label}</div>
    </div>
  );
}

function Logo({ src }: { src: string }) {
  return <img src={src} alt="" className="h-8 w-auto object-contain mx-auto" />;
}

function Check() {
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5 text-neutral-900" fill="currentColor" aria-hidden>
      <path d="M7.5 13.5 3.8 9.8l1.4-1.4 2.3 2.3 6.3-6.3 1.4 1.4-7.7 7.7Z" />
    </svg>
  );
}

/* ========= data ========= */
const FAQ = [
  {
    q: "Do you handle permits and as-builts?",
    a: "Yes — we manage permits, provide photo logs, and deliver turnover packages with as-builts and O&M docs.",
  },
  {
    q: "Can you integrate with our existing controls?",
    a: "We work with Delta, Trane, and Reliable DDC for trending, alarms, and remote commissioning.",
  },
  {
    q: "Do you offer strata and school programs?",
    a: "Absolutely. Background-checked, school-approved crews; structured PM with reporting for councils and districts.",
  },
];