import Breadcrumb from '../components/Breadcrumb';
import Section from '../components/ui/Section';
import EnquiryForm from '../components/EnquiryForm';
import FaqItem from '../components/FaqItem';
import JsonLd from '../components/JsonLd';
import { PhoneIcon } from '../components/ui/Button';
import { PHONE, PHONE_HREF, RESPONSE_PROMISE } from '../config';
import { generalFaq, faqSchema } from '../lib/faq';
import { canonicalURL } from '../lib/site-url';

/** Audit H-02 §1 — /quote/ is the form, defaulting to type Quote.
 *
 * The Apps Script iframe, the duplicate Formspree form and the "Fast,
 * transparent pricing from certified technicians" line (H-04 — no
 * certifications are named on the page) are all gone. */

const WHAT_TO_SEND = [
  'The building address and what the space is used for',
  'Which equipment or system is involved, with nameplate data if you have it',
  'Drawings or specifications, if an engineer is involved',
  'Photos of the mechanical room or the equipment',
  'Access windows, shutdown restrictions and your target dates',
];

export default function GetQuote() {
  const faq = generalFaq().slice(0, 5);
  return (
    <>
      <Breadcrumb trail={[{ name: 'Get a quote', path: '/quote' }]} />
      <JsonLd data={faqSchema(faq, canonicalURL('/quote'))} />

      <Section
        headingLevel={1}
        eyebrow="Get a quote"
        heading="Tell us what your building needs"
        intro={RESPONSE_PROMISE}
      >
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
          <EnquiryForm defaultType="quote" title="Your enquiry" />

          <aside className="space-y-8">
            <div className="rounded-[var(--radius-lg)] border border-[var(--line)] bg-[var(--surface-alt)] p-6">
              <h2 className="text-h3 font-bold text-[var(--ink)]">Need someone today?</h2>
              <p className="mt-3 text-sm text-[var(--body)]">
                No heat, a leak, a flood or a gas smell is a phone call, not a form. Our line is
                answered around the clock.
              </p>
              <a
                href={PHONE_HREF}
                data-cta-location="page"
                className="mt-4 inline-flex min-h-12 items-center gap-2 rounded-[var(--radius)] bg-[var(--brand)] px-5 font-semibold text-white hover:bg-[var(--brand-hover)]"
              >
                <PhoneIcon />
                Call {PHONE} (24/7)
              </a>
            </div>

            <div>
              <h2 className="text-h3 font-bold text-[var(--ink)]">What helps us quote faster</h2>
              <ul className="mt-4 space-y-3 text-sm text-[var(--body)]">
                {WHAT_TO_SEND.map(item => (
                  <li key={item} className="flex gap-3">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand)]"
                    >
                      <path d="M7.5 13.5 3.8 9.8l1.4-1.4 2.3 2.3 6.3-6.3 1.4 1.4-7.7 7.7Z" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
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
