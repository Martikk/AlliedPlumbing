import { useEffect, useRef, useState } from 'react';
import EnquiryForm from '../components/EnquiryForm';
import { PHONE, PHONE_HREF } from '../config';

/** The quote page in its original layout — photographic hero, the form card
 *  on the left, the sticky trust / contact / map column on the right.
 *
 *  What changed is inside the card: the cross-origin Apps Script iframe (and
 *  the duplicate Formspree form behind it) are replaced by the one native
 *  EnquiryForm (audit H-01). It branches by enquiry type, validates in the
 *  page, prefills from ?type= and ?service=, and fires `generate_lead`.
 *
 *  H-04: "Fast, transparent pricing from certified technicians" is gone —
 *  no certification is named on this page, so the claim could not be backed. */
export default function GetQuote() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="page-photo-hero relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_1200/v1760068155/Allied/10_kubptf.png"
            alt=""
            width={1200}
            height={675}
            fetchPriority="high"
            className="h-64 md:h-80 w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 md:px-6 h-64 md:h-80 flex items-end pb-6">
          <div>
            <h1 className="text-white text-4xl md:text-5xl font-extrabold drop-shadow">
              Get a Quote
            </h1>
            <p className="text-white/90 mt-2 max-w-2xl">
              Tell us about the building and the work. We reply within one business day — and for
              no-heat, leaks or gas issues, call{' '}
              <a href={PHONE_HREF} data-cta-location="hero" className="underline underline-offset-2">
                {PHONE}
              </a>{' '}
              any hour.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 rounded-2xl border border-neutral-200/70 bg-white p-5 md:p-6 shadow-sm">
            <FormHeader />
            <EnquiryForm defaultType="quote" title="Your enquiry" className="mt-4 border-0 p-0" />
          </div>

          {/* Sticky trust / contact column */}
          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-8 space-y-6">
              <TrustCard />
              <ContactCard />
              <SmallMap />
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

/* ---------- UI pieces ---------- */
function FormHeader() {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <span className="inline-block text-xs px-2 py-1 rounded-full bg-neutral-100 text-neutral-600">
          Request a quote
        </span>
        <h2 className="mt-2 text-2xl md:text-3xl font-extrabold text-neutral-900">
          Tell us what you need
        </h2>
        <p className="text-neutral-600 mt-1">
          A clear description helps us review your request. Tell us what is happening, where the equipment is located and whether there are access or scheduling restrictions. For urgent assistance, call 604-731-1000.
        </p>
      </div>
      <img
        src="https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_1200/v1760074743/Allied/IBC-Logo-for-Gallery_hsklz0.webp"
        alt="IBC"
        className="h-10 w-auto opacity-80 hidden sm:block"
      />
    </div>
  );
}

function TrustCard() {
  return (
    <div className="rounded-2xl border border-neutral-200/70 bg-white p-5 shadow-sm">
      <h3 className="font-semibold text-neutral-900">Why Allied</h3>
      <ul className="mt-3 space-y-2 text-sm text-neutral-700">
        <li className="flex items-start gap-2">
          <Check /> Site-specific safety planning
        </li>
        <li className="flex items-start gap-2">
          <Check /> School mechanical project experience
        </li>
        <li className="flex items-start gap-2">
          <Check /> Project-specific warranty terms
        </li>
        <li className="flex items-start gap-2">
          <Check /> Boiler, plumbing and HVAC/R experience
        </li>
      </ul>
      <div className="mt-4 grid grid-cols-3 gap-3">
        <img
          src="https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_1200/v1760074745/Allied/Rinnai_Logo_Red_uqwftm.png"
          alt="Rinnai"
          className="h-6 object-contain opacity-70"
        />
        <img
          src="https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_1200/v1760075323/Allied/download_y9tiqd.png"
          alt="Daikin"
          className="h-6 object-contain opacity-70"
        />
        <img
          src="https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_1200/v1760074743/Allied/IBC-Logo-for-Gallery_hsklz0.webp"
          alt="IBC"
          className="h-6 object-contain opacity-70"
        />
      </div>
    </div>
  );
}

function ContactCard() {
  return (
    <div className="rounded-2xl border border-neutral-200/70 bg-white p-5 shadow-sm">
      <h3 className="font-semibold text-neutral-900">Talk to a human</h3>
      <p className="text-sm text-neutral-600 mt-1">
        Dispatch line operates 24/7 for emergencies.
      </p>
      <div className="mt-4 space-y-2">
        <a href="tel:+16047311000" data-cta-location="page" className="btn-secondary block text-center">
          Call 604-731-1000
        </a>
        <a href="mailto:quote@allied-plumbing.ca" className="btn-tertiary block text-center">
          quote@allied-plumbing.ca
        </a>
      </div>
      <div className="mt-4 text-xs text-neutral-500">
        Address: 4085 2nd Ave, Burnaby, BC V5C 3X1
      </div>
    </div>
  );
}

/** Audit B-06 §3 — the map used to pull ~187 KB of Google Maps JavaScript on
 *  first paint, which made it the heaviest thing on the page after the hero.
 *  `loading="lazy"` alone did not stop it: Chrome's threshold is generous and
 *  this sits in a sticky column.
 *
 *  So the iframe mounts only once its container comes within 400 px of the
 *  viewport. Nothing about the look or the behaviour changes — scroll to it
 *  and the map is there — it simply stops competing with the LCP image. */
function SmallMap() {
  const container = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const node = container.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setNear(true);
        observer.disconnect();
      },
      { rootMargin: '400px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={container}
      className="rounded-2xl overflow-hidden border border-neutral-200/70 shadow-sm bg-neutral-100"
    >
      {near ? (
        <iframe
          title="Allied Plumbing map"
          src="https://www.google.com/maps?q=4085%202nd%20Ave%20Burnaby%20BC&output=embed"
          className="w-full h-56"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div className="h-56 grid place-items-center text-sm text-neutral-600">
          4085 2nd Avenue, Burnaby
        </div>
      )}
    </div>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5 text-neutral-900" fill="currentColor" aria-hidden>
      <path d="M7.5 13.5 3.8 9.8l1.4-1.4 2.3 2.3 6.3-6.3 1.4 1.4-7.7 7.7Z" />
    </svg>
  );
}
