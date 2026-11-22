import Section from '../ui/Section';
import EnquiryForm from '../EnquiryForm';
import { PhoneIcon } from '../ui/Button';
import { ADDRESS, EMAIL_INFO, PHONE, PHONE_HREF, RESPONSE_PROMISE } from '../../config';

/** Audit D-02 §8 / H-04 — one contact block.
 *
 * Replaces the CTA band plus the separate enquiry section. Phone, address and
 * the response promise sit beside the form, so nobody has to scroll to find
 * out when they will hear back. */

const MAPS = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${ADDRESS.street}, ${ADDRESS.locality}, ${ADDRESS.region} ${ADDRESS.postalCode}`,
)}`;

export default function ContactBlock() {
  return (
    <Section id="contact" tone="alt" eyebrow="Contact" heading="Tell us about your building">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
        <div>
          <p className="text-lg leading-[var(--lh-body)] text-[var(--body)]">
            {RESPONSE_PROMISE}
          </p>

          <dl className="mt-8 space-y-6">
            <div>
              <dt className="text-eyebrow font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
                Phone — 24/7
              </dt>
              <dd className="mt-2">
                <a
                  href={PHONE_HREF}
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
              <dd className="mt-2">
                <a
                  href={`mailto:${EMAIL_INFO}`}
                  className="inline-flex min-h-11 items-center font-semibold text-[var(--ink)] underline underline-offset-4"
                >
                  {EMAIL_INFO}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-eyebrow font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
                Shop
              </dt>
              <dd className="mt-2">
                <a
                  href={MAPS}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center font-semibold text-[var(--ink)] underline underline-offset-4"
                >
                  {ADDRESS.street}, {ADDRESS.locality}, {ADDRESS.region} {ADDRESS.postalCode}{' '}
                  <span aria-hidden> ↗</span>
                  <span className="sr-only">(opens Google Maps in a new tab)</span>
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <EnquiryForm title="Send an enquiry" defaultType="quote" />
      </div>
    </Section>
  );
}
