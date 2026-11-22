import FaqItem from '../components/FaqItem';
import { Link } from "../lib/navigation";
import ContactLead from "@/components/ContactLead"; // твой готовый стеклянный блок с формой
import { PHONE } from "@/config";

/** The accent blue is #5272c4, not the slightly lighter #5776c6 it used to be.
 *  The old value measured 4.36:1 against white, just under the 4.5:1 minimum,
 *  in both directions — white text on the button and blue text on the page
 *  (audit F-01). This is the same hue, 1.2% darker, at 4.60:1. */
export default function Contact() {
  return (
    <div className="bg-white text-neutral-900">

      {/* ===== HERO ===== */}
      <section className="page-photo-hero relative overflow-hidden">
        <img
          src="https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_1200/v1760065876/Allied/3_gk4dl8.png"
          alt=""
          width={1200} height={800} fetchPriority="high" className="absolute inset-0 h-[40vh] md:h-[48vh] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="relative max-w-6xl mx-auto px-4 md:px-6 pt-28 md:pt-36 pb-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 text-white px-3 py-1 text-xs ring-1 ring-white/25 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-400" /> Contact us
          </div>
          <h1 className="mt-4 text-4xl md:text-6xl font-extrabold text-white leading-tight drop-shadow">
            We’re here to help — 24/7
          </h1>
          <p className="mt-2 max-w-2xl text-white/90">
            Contact us for service enquiries, project scopes and mechanical maintenance.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={`tel:${PHONE.replace(/[^+\d]/g, "")}`}
              className="inline-flex items-center gap-2 rounded-lg bg-white text-neutral-900 px-5 py-3 font-semibold shadow hover:bg-neutral-200"
            >
              Call {PHONE} <span aria-hidden>↗</span>
            </a>
            <Link
              to="/quote"
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 text-white px-5 py-3 font-semibold backdrop-blur hover:bg-white/20"
            >
              Get a quote
            </Link>
          </div>
        </div>
      </section>

      {/* ===== GLASS “LEAD” (твоя готовая форма с наклонённым бэкграундом) ===== */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 -mt-12 md:-mt-20">
        <ContactLead />
      </div>

      {/* ===== CONTACT CARDS ===== */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* 24/7 */}
          <div className="rounded-2xl border border-neutral-200/70 bg-white p-6 shadow-sm">
            <div className="text-xs uppercase tracking-widest text-neutral-500">Emergency</div>
            <h3 className="mt-1 text-xl font-extrabold">24/7 Dispatch</h3>
            <p className="mt-2 text-neutral-600">
              Leaks, no-heat/DHW, RTU/MUA failures — we’ll triage and send a crew.
            </p>
            <a
              href={`tel:${PHONE.replace(/[^+\d]/g, "")}`}
              className="mt-4 inline-flex items-center justify-center w-full rounded-lg bg-neutral-900 text-white px-4 py-2.5 font-semibold hover:brightness-110"
            >
              Call {PHONE}
            </a>
          </div>

          {/* Estimates */}
          <div className="rounded-2xl border border-neutral-200/70 bg-white p-6 shadow-sm">
            <div className="text-xs uppercase tracking-widest text-neutral-500">Estimates</div>
            <h3 className="mt-1 text-xl font-extrabold">Project estimates</h3>
            <p className="mt-2 text-neutral-600">
              Send drawings, photographs or a brief description so we can discuss your scope and next steps.
            </p>
            <Link
              to="/quote"
              className="mt-4 inline-flex items-center justify-center w-full rounded-lg bg-[#5272c4] text-white px-4 py-2.5 font-semibold hover:brightness-110"
            >
              Request a quote ↗
            </Link>
          </div>

          {/* Email */}
          <div className="rounded-2xl border border-neutral-200/70 bg-white p-6 shadow-sm">
            <div className="text-xs uppercase tracking-widest text-neutral-500">Email</div>
            <h3 className="mt-1 text-xl font-extrabold">Direct Contacts</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                Service:{" "}
                <a href="mailto:service@allied-plumbing.ca" className="underline">
                  service@allied-plumbing.ca
                </a>
              </li>
              <li>
                Quotes:{" "}
                <a href="mailto:quote@allied-plumbing.ca" className="underline">
                  quote@allied-plumbing.ca
                </a>
              </li>
              <li>
                Accounts:{" "}
                <a href="mailto:accounts@allied-plumbing.ca" className="underline">
                  accounts@allied-plumbing.ca
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Address / Hours / Map */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="rounded-2xl border border-neutral-200/70 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold">Office</h3>
            <p className="mt-2 text-neutral-700">
              4085 2nd Avenue
              <br />
              Burnaby, BC V5C 3X1
              <br />
              Canada
            </p>
            <a
              href="https://maps.google.com/?q=4085%202nd%20Ave%20Burnaby%20BC%20V5C%203X1"
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#5272c4]"
            >
              Open in Maps ↗
            </a>
          </div>

          <div className="rounded-2xl border border-neutral-200/70 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold">Plan your visit</h3>
            <p className="mt-2 text-neutral-700 text-sm leading-relaxed">Contact our team before visiting the office to confirm availability and arrange a suitable time. For urgent service, use the emergency phone line.</p>
          </div>

          <div className="rounded-2xl overflow-hidden border border-neutral-200/70 shadow-sm">
            <iframe
              title="Allied Plumbing map"
              src="https://www.google.com/maps?q=4085%202nd%20Ave%20Burnaby%20BC%20V5C%203X1&output=embed"
              className="w-full h-56"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 md:px-6 pb-12"><h2 className="text-2xl font-bold">Help us direct your enquiry</h2><p className="mt-4 max-w-3xl leading-relaxed text-neutral-700">For a service enquiry, include your location and a brief description of the issue. For planned work, tell us about the building, the equipment and your proposed timing. If you are unsure which service fits, describe the requirement and our team can help direct the enquiry.</p></section>
      {/* ===== FAQ (короткий, трендовый) ===== */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 pb-16 md:pb-24">
        <div className="mb-6">
          <span className="inline-block text-xs md:text-sm px-3 py-1 rounded-full bg-neutral-100 text-neutral-600">
            FAQ
          </span>
          <h2 className="mt-3 text-2xl md:text-4xl font-extrabold">Common questions</h2>
        </div>

        <div className="divide-y divide-neutral-200 rounded-2xl border border-neutral-200 bg-white">
          {FAQ.map((f) => (
            <FaqItem key={f.q} question={f.q}>{f.a}</FaqItem>
          ))}
        </div>
      </section>

      {/* ===== BOTTOM CTA ===== */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 pb-16">
        <div className="relative overflow-hidden rounded-2xl bg-neutral-900 text-white p-6 md:p-10">
          <div
            className="absolute -top-10 -right-10 h-56 w-56 rounded-full blur-3xl opacity-30"
            style={{ background: "radial-gradient(closest-side,#60a5fa 30%,transparent)" }}
          />
          <h3 className="text-2xl md:text-4xl font-extrabold">Ready when you are</h3>
          <p className="mt-2 text-white/80 max-w-prose">
            Call our dispatch or send a request — we’ll get you a clear plan and a fair price.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <a
              href={`tel:${PHONE.replace(/[^+\d]/g, "")}`}
              className="inline-flex items-center gap-2 rounded-lg bg-white text-neutral-900 px-5 py-3 font-semibold shadow hover:bg-neutral-200"
            >
              Call {PHONE}
            </a>
            <Link
              to="/quote"
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-5 py-3 font-semibold backdrop-blur hover:bg-white/20"
            >
              Get a quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ——— data ——— */
const FAQ = [
  {
    q: "Do you service schools and strata?",
    a: "Yes. Our documented experience includes mechanical upgrades for school districts and residential buildings. Contact us to discuss your site requirements.",
  },
  {
    q: "Can you integrate with existing DDC?",
    a: "We regularly work with Delta, Trane, and Reliable controls for trending, alarms, and commissioning.",
  },
  {
    q: "Do you offer maintenance programs?",
    a: "Absolutely. Monthly, quarterly, and annual programs with reporting and recommendations to reduce downtime.",
  },
  {
    q: "How fast can you respond?",
    a: "Call for urgent assistance. Response timing depends on your location, the issue and technician availability.",
  },
];