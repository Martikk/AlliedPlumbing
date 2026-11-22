import { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import Section from '../components/ui/Section';
import EnquiryForm from '../components/EnquiryForm';
import FaqItem from '../components/FaqItem';
import JsonLd from '../components/JsonLd';
import { PhoneIcon } from '../components/ui/Button';
import { ADDRESS, EMAIL_INFO, EMAIL_QUOTE, PHONE, PHONE_HREF, RESPONSE_PROMISE } from '../config';
import { generalFaq, faqSchema } from '../lib/faq';
import { canonicalURL } from '../lib/site-url';

/** Audit H-02 §2 — /contact/ is address, map, phones, emails and hours, plus
 *  the same form defaulting to "Other".
 *
 *  B-06 §3 — the map is behind a static placeholder and a "Show map" button,
 *  so Google Maps never loads on first paint. */

const QUERY = encodeURIComponent(
  `${ADDRESS.street}, ${ADDRESS.locality}, ${ADDRESS.region} ${ADDRESS.postalCode}`,
);
const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${QUERY}`;
const MAPS_EMBED = `https://www.google.com/maps?q=${QUERY}&output=embed`;

function LazyMap() {
  const [shown, setShown] = useState(false);
  if (!shown)
    return (
      <div className="flex flex-col items-start gap-3 rounded-[var(--radius-lg)] border border-[var(--line)] bg-[var(--surface-alt)] p-6">
        <p className="text-sm text-[var(--body)]">
          {ADDRESS.street}, {ADDRESS.locality}, {ADDRESS.region} {ADDRESS.postalCode}
        </p>
        <button
          type="button"
          onClick={() => setShown(true)}
          className="min-h-12 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] px-4 font-semibold text-[var(--ink)] hover:border-[var(--ink)]"
        >
          Show map
        </button>
        <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" className="text-sm underline underline-offset-4">
          Open in Google Maps
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
    );
  return (
    <iframe
      title={`Map of ${ADDRESS.street}, ${ADDRESS.locality}`}
      src={MAPS_EMBED}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className="h-80 w-full rounded-[var(--radius-lg)] border border-[var(--line)]"
    />
  );
}

export default function Contact() {
  const faq = generalFaq().slice(0, 5);
  return (
    <>
      <Breadcrumb trail={[{ name: 'Contact', path: '/contact' }]} />
      <JsonLd data={faqSchema(faq, canonicalURL('/contact'))} />

      <Section
        headingLevel={1}
        eyebrow="Contact"
        heading="Talk to Allied"
        intro={RESPONSE_PROMISE}
      >
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
          <div className="space-y-8">
            <dl className="space-y-6">
              <div>
                <dt className="text-eyebrow font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
                  Phone — answered 24/7
                </dt>
                <dd className="mt-2">
                  <a
                    href={PHONE_HREF}
                    data-cta-location="page"
                    className="inline-flex min-h-11 items-center gap-2 text-xl font-bold text-[var(--ink)] underline underline-offset-4"
                  >
                    <PhoneIcon />
                    {PHONE}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-eyebrow font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
                  Email
                </dt>
                <dd className="mt-2 space-y-1">
                  <a
                    href={`mailto:${EMAIL_INFO}`}
                    data-cta-location="page"
                    className="block min-h-11 font-semibold text-[var(--ink)] underline underline-offset-4"
                  >
                    {EMAIL_INFO}
                  </a>
                  <a
                    href={`mailto:${EMAIL_QUOTE}`}
                    data-cta-location="page"
                    className="block min-h-11 font-semibold text-[var(--ink)] underline underline-offset-4"
                  >
                    {EMAIL_QUOTE} — quotes and tenders
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-eyebrow font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
                  Office hours
                </dt>
                <dd className="mt-2 text-[var(--body)]">
                  Monday to Friday, 7:30&nbsp;am – 4:00&nbsp;pm.
                  <br />
                  Emergency service, any hour, any day.
                </dd>
              </div>
            </dl>
            <LazyMap />
          </div>

          <EnquiryForm defaultType="other" title="Send a message" />
        </div>
      </Section>

      {faq.length > 0 && (
        <Section tone="alt" eyebrow="FAQ" heading="Common questions">
          <div className="divide-y divide-[var(--line)] rounded-[var(--radius-lg)] border border-[var(--line)] bg-[var(--surface)]">
            {faq.map(entry => (
              <FaqItem key={entry.q} question={entry.q}>
                {entry.a}
              </FaqItem>
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
