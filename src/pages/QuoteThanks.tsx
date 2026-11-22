import { useSearchParams } from 'react-router-dom';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Button, { PhoneIcon } from '../components/ui/Button';
import projects from '../data/projects.json';
import { PHONE, PHONE_HREF } from '../config';

/** Audit H-03 — the thank-you page.
 *
 * noindex (handled by Head.tsx, which marks any route missing from seo.json
 * as noindex,follow). This page is also the GA4 conversion destination, as a
 * backup to the `generate_lead` event. */

const STEPS = [
  {
    title: 'We read it the same day',
    copy: 'Your enquiry goes to the person who handles that type of work — dispatch for service calls, estimating for tenders, the quote desk for everything else.',
  },
  {
    title: 'We reply within one business day',
    copy: 'Usually with questions: access windows, equipment details, or a time for a site visit. Urgent service calls are answered by phone, not email.',
  },
  {
    title: 'You get a written scope',
    copy: 'Sequence, submittals and turnover documents, priced. Nothing starts until you have agreed it.',
  },
];

export default function QuoteThanks() {
  const [params] = useSearchParams();
  const reference = params.get('ref');
  const related = projects.filter(project => project.featured).slice(0, 2);

  return (
    <>
      <Section
        headingLevel={1}
        eyebrow="Enquiry received"
        heading="Thank you — we have your enquiry"
        intro="A copy is on its way to your inbox."
      >
        {reference && (
          <p className="rounded-[var(--radius-lg)] border border-[var(--line)] bg-[var(--surface-alt)] p-5">
            <span className="text-eyebrow font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
              Your reference
            </span>
            <strong className="mt-1 block text-2xl font-extrabold text-[var(--ink)]">
              {reference}
            </strong>
            <span className="mt-2 block text-sm text-[var(--body)]">
              Quote this if you call us about this enquiry.
            </span>
          </p>
        )}

        <h2 className="mt-12 text-h2 font-extrabold text-[var(--ink)]">What happens next</h2>
        <ol className="mt-6 grid gap-8 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <li key={step.title} className="border-t-2 border-[var(--line)] pt-5">
              <span className="text-sm font-bold tracking-widest text-[var(--muted)]">
                0{index + 1}
              </span>
              <h3 className="mt-3 text-h3 font-bold text-[var(--ink)]">{step.title}</h3>
              <p className="mt-3 text-sm text-[var(--body)]">{step.copy}</p>
            </li>
          ))}
        </ol>

        <div data-cta-anchor className="mt-10 flex flex-wrap gap-3">
          <Button href={PHONE_HREF} variant="secondary" icon={<PhoneIcon />}>
            Call {PHONE} (24/7)
          </Button>
          <Button href="/projects" variant="tertiary">
            See our projects
          </Button>
        </div>
      </Section>

      {related.length > 0 && (
        <Section tone="alt" eyebrow="While you wait" heading="Work like yours">
          <div className="grid gap-5 md:grid-cols-2 md:gap-6">
            {related.map(project => (
              <Card
                key={project.id}
                to={`/projects/${project.id}`}
                eyebrow={project.client}
                title={project.title}
                summary={project.summary}
                metric={project.outcomeLine}
                image={project.cover}
                sizes="(min-width: 768px) 568px, 100vw"
                variant="project"
              />
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
