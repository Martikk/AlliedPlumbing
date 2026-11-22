import Hero from '../components/Hero';
import Breadcrumb from '../components/Breadcrumb';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Button, { PhoneIcon } from '../components/ui/Button';
import FaqItem from '../components/FaqItem';
import JsonLd from '../components/JsonLd';
import { projects, type Project } from '../lib/projects';
import content from '../data/services-content.json';
import { SERVICE_BY_KEY, type ServiceKey } from '../lib/site-links';
import { faqForService, faqSchema } from '../lib/faq';
import { serviceSchema } from '../lib/schema';
import { canonicalURL } from '../lib/site-url';
import { PHONE, PHONE_HREF } from '../config';
import { useReveal } from '../hooks/useReveal';

/** Audit I-02 — the service page template, seven blocks.
 *
 *  1 Hero (A-06 H1 pattern, promise, Get a quote + Call)
 *  2 Who it is for — three building types
 *  3 What we deliver — scope in plain language, then equipment and brands
 *  4 How a job runs — five steps specific to the service
 *  5 Proof — related project cards
 *  6 FAQ (I-03) — also emitted as FAQPage JSON-LD (A-05)
 *  7 CTA with a prefilled form link (H-05)
 *
 *  Pages were ~150–180 words with no FAQ and at most one project link.
 *
 *  PENDING: block 5 should also carry one named client quote. The site has no
 *  attributed testimonial and the audit's rule is never to write or paraphrase
 *  one (I-05), so the slot stays empty until Allied supplies a real quote with
 *  permission to publish it. */

type Props = { service: ServiceKey };

type Content = {
  h1: string;
  promise: string;
  subhead: string;
  serviceType: string;
  image: string;
  alt: string;
  audiences: { title: string; copy: string }[];
  deliver: string[];
  equipment: string;
  steps: { title: string; copy: string }[];
  relatedProjects: string[];
};

export default function ServiceTemplate({ service }: Props) {
  const link = SERVICE_BY_KEY[service];
  const copy = (content as unknown as Record<ServiceKey, Content>)[service];
  const stepsRef = useReveal<HTMLOListElement>({ stagger: true });
  const faq = faqForService(service);
  const url = canonicalURL(link.to);
  const related = copy.relatedProjects
    .map(id => projects.find(project => project.id === id))
    .filter((project): project is Project => Boolean(project));

  return (
    <>
      <Hero
        compact
        eyebrow={link.label}
        heading={copy.h1}
        subhead={copy.promise}
        image={copy.image}
        alt={copy.alt}
      />
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
      <JsonLd data={faqSchema(faq, url)} />

      <Section>
        <p className="max-w-3xl text-lg leading-[var(--lh-body)] text-[var(--body)]">
          {copy.subhead}
        </p>
      </Section>

      <Section tone="alt" eyebrow="Who it is for" heading="Buildings we do this in">
        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {copy.audiences.map(audience => (
            <div key={audience.title} className="border-t-2 border-[var(--line)] pt-5">
              <h3 className="text-h3 font-bold text-[var(--ink)]">{audience.title}</h3>
              <p className="mt-3 text-sm text-[var(--body)]">{audience.copy}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="What we deliver" heading="Scope">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:gap-12">
          <ul className="grid gap-3 sm:grid-cols-2">
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
          <aside className="rounded-[var(--radius-lg)] border border-[var(--line)] bg-[var(--surface-alt)] p-6">
            <h3 className="text-h3 font-bold text-[var(--ink)]">Equipment and brands</h3>
            <p className="mt-3 text-sm text-[var(--body)]">{copy.equipment}</p>
          </aside>
        </div>
      </Section>

      <Section tone="alt" eyebrow="How a job runs" heading="From first call to turnover">
        <ol ref={stepsRef} className="grid gap-6 md:grid-cols-5">
          {copy.steps.map((step, index) => (
            <li key={step.title} data-reveal="" className="border-t-2 border-[var(--line)] pt-5">
              <span className="text-sm font-bold tracking-widest text-[var(--muted)]">
                0{index + 1}
              </span>
              <h3 className="mt-2 font-bold text-[var(--ink)]">{step.title}</h3>
              <p className="mt-2 text-sm text-[var(--body)]">{step.copy}</p>
            </li>
          ))}
        </ol>
      </Section>

      {related.length > 0 && (
        <Section
          eyebrow="Proof"
          heading="Where we have done this"
          action={
            <Button href="/projects" variant="tertiary">
              See our projects
            </Button>
          }
        >
          <div className="grid gap-5 md:grid-cols-3 md:gap-6">
            {related.map(project => (
              <Card
                key={project.id}
                to={`/projects/${project.id}`}
                eyebrow={project.client}
                title={project.title}
                summary={project.summary}
                metric={project.outcomeLine}
                image={project.cover}
                sizes="(min-width: 768px) 368px, 100vw"
                variant="project"
              />
            ))}
          </div>
        </Section>
      )}

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

      {/* H-05 — the CTA prefills the form with this service. */}
      <Section>
        <div className="scrim relative overflow-hidden rounded-[var(--radius-lg)] bg-[var(--surface-ink)] p-8 md:p-12">
          <h2 className="text-h2 font-extrabold text-white">
            Get a quote for {link.label.toLowerCase()}
          </h2>
          <p className="mt-3 max-w-2xl text-white">
            Tell us the building, the equipment and your access windows. We reply within one
            business day.
          </p>
          <div data-cta-anchor className="on-dark mt-7 flex flex-wrap gap-3">
            <Button href={`/quote?type=quote&service=${service}`} className="on-dark">
              Get a quote
            </Button>
            <Button
              href={PHONE_HREF}
              variant="secondary"
              icon={<PhoneIcon />}
              className="on-dark"
              data-cta-location="page"
            >
              Call {PHONE} (24/7)
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
