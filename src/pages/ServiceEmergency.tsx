import Breadcrumb from '../components/Breadcrumb';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Button, { PhoneIcon } from '../components/ui/Button';
import FaqItem from '../components/FaqItem';
import JsonLd from '../components/JsonLd';
import { projects } from '../lib/projects';
import content from '../data/services-content.json';
import { SERVICE_BY_KEY } from '../lib/site-links';
import { faqForService, faqSchema } from '../lib/faq';
import { serviceSchema } from '../lib/schema';
import { canonicalURL } from '../lib/site-url';
import { PHONE, PHONE_HREF } from '../config';

/** Audit H-06 — the emergency page is not a service page.
 *
 *  The first screen is one large tel: button and what to do while waiting.
 *  No form above the fold: somebody with water coming through a ceiling is
 *  not going to fill in a site address.
 *
 *  OPEN Q6: Allied has not confirmed a response-time commitment or a coverage
 *  radius, so none is stated. Publishing "within two hours" without being able
 *  to keep it would do more damage than saying nothing. Fill
 *  `services-content.json → emergency.responseCommitment` when it is agreed. */

const WHILE_YOU_WAIT = [
  {
    title: 'If you smell gas',
    copy: 'Leave the building. Do not use switches, phones or anything that sparks. From outside, call FortisBC on 1-800-663-9911, then call us.',
    urgent: true,
  },
  {
    title: 'If water is running',
    copy: 'Close the nearest isolation valve, or the building main if you can reach it safely. In a multi-unit building, tell the building manager so neighbouring suites can be checked.',
  },
  {
    title: 'If there is no heat',
    copy: 'Note what the boiler or furnace is showing — any fault code, any lockout light. Leave the plant off rather than resetting it repeatedly.',
  },
  {
    title: 'Before we arrive',
    copy: 'Have the building address, the unit or room, who is on site, and how we get in after hours. Clear a path to the mechanical room if you can.',
  },
];

export default function ServiceEmergency() {
  const link = SERVICE_BY_KEY.emergency;
  const copy = content.emergency;
  const faq = faqForService('emergency');
  const related = projects.filter(project => project.featured).slice(0, 3);

  return (
    <>
      {/* First screen: the phone number, at size, above everything else. */}
      <section className="bg-[var(--brand)] text-white">
        <div
          data-cta-anchor
          className="mx-auto w-full max-w-[1200px] px-4 py-14 text-center md:px-6 md:py-20"
        >
          <p className="text-eyebrow font-bold uppercase tracking-[0.18em] text-white/90">
            24/7 emergency service
          </p>
          <h1 className="mt-4 text-h1 font-extrabold text-white">
            No heat, a leak or a flood? Call us now.
          </h1>
          <a
            href={PHONE_HREF}
            data-cta-location="hero"
            className="mt-8 inline-flex min-h-16 w-full max-w-xl items-center justify-center gap-4 rounded-[var(--radius-lg)] bg-white px-8 text-3xl font-extrabold text-[var(--brand-ink)] shadow-md transition-transform duration-fast ease-out hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white motion-reduce:transform-none sm:text-4xl"
          >
            <PhoneIcon />
            {PHONE}
          </a>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white">
            Answered any hour, any day, across Metro Vancouver, the North Shore and the Sea-to-Sky
            corridor. A phone call reaches someone; a form sits in an inbox.
          </p>
        </div>
      </section>

      <Breadcrumb
        trail={[
          { name: 'Services', path: '/services' },
          { name: link.label, path: link.to },
        ]}
      />
      <JsonLd
        data={serviceSchema({
          path: link.to,
          name: link.label,
          description: copy.promise,
          serviceType: copy.serviceType,
        })}
      />
      <JsonLd data={faqSchema(faq, canonicalURL(link.to))} />

      <Section eyebrow="While you wait" heading="What to do before we get there">
        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          {WHILE_YOU_WAIT.map(item => (
            <article
              key={item.title}
              className={`rounded-[var(--radius-lg)] border p-6 ${
                item.urgent
                  ? 'border-[var(--brand)] border-2 bg-red-50'
                  : 'border-[var(--line)] bg-[var(--surface-alt)]'
              }`}
            >
              <h2 className="text-h3 font-bold text-[var(--ink)]">{item.title}</h2>
              <p className="mt-3 text-[var(--body)]">{item.copy}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="alt" eyebrow="What we attend" heading="Emergencies we take">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {copy.deliver.map(item => (
            <li key={item} className="flex gap-3 text-[var(--body)]">
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="mt-1 h-4 w-4 shrink-0 text-[var(--brand)]"
              >
                <path d="M7.5 13.5 3.8 9.8l1.4-1.4 2.3 2.3 6.3-6.3 1.4 1.4-7.7 7.7Z" />
              </svg>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-3xl text-[var(--body)]">{copy.equipment}</p>
      </Section>

      {faq.length > 0 && (
        <Section eyebrow="FAQ" heading="Common questions">
          <div className="divide-y divide-[var(--line)] rounded-[var(--radius-lg)] border border-[var(--line)] bg-[var(--surface)]">
            {faq.map(entry => (
              <FaqItem key={entry.q} question={entry.q}>
                {entry.a}
              </FaqItem>
            ))}
          </div>
        </Section>
      )}

      <Section
        tone="alt"
        eyebrow="Not an emergency?"
        heading="Planned work and maintenance"
        action={
          <Button href="/services/maintenance" variant="tertiary">
            View service
          </Button>
        }
      >
        <p className="max-w-2xl text-[var(--body)]">
          A maintenance program is how most of these calls stop happening. For planned work, send
          an enquiry instead — we reply within one business day.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href="/quote?type=maintenance">Get a quote</Button>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3 md:gap-6">
          {related.map(project => (
            <Card
              key={project.id}
              to={`/projects/${project.id}`}
              eyebrow={project.client}
              title={project.title}
              summary={project.summary}
              image={project.cover}
              sizes="(min-width: 768px) 368px, 100vw"
              variant="project"
            />
          ))}
        </div>
      </Section>
    </>
  );
}
