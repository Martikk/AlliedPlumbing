import Breadcrumb from '../components/Breadcrumb';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import EnquiryForm from '../components/EnquiryForm';
import projects from '../data/projects.json';
import { EMAIL_QUOTE, PHONE, PHONE_HREF } from '../config';

/** Audit H-02 §3 — "Tenders & RFPs". Good B2B content that used to be
 *  orphaned from navigation; it is now a main-nav item (C-04) and carries the
 *  enquiry form preset to Tender.
 *
 *  PENDING I-07: a one-page capability statement PDF belongs here as an
 *  ungated download — services, sectors, key references, safety program,
 *  WorkSafeBC and insurance details, bonding, licences, office contact. It
 *  needs facts only Allied can supply (Q3), so the block below appears once
 *  public/allied-capability-statement.pdf exists. */

const DELIVERY = [
  'Mechanical installation, coordinated with electrical, sheet metal, controls, insulation and testing and balancing.',
  'Phased scheduling for occupied buildings and school environments, including after-hours and holiday windows.',
  'Shop drawing coordination, engineering submittals, as-built records and O&M documentation.',
  'System testing, commissioning coordination and turnover support.',
];

const SEND_WITH_TENDER = [
  'The tender or RFP documents and addenda',
  'Drawings and the mechanical specification',
  'The closing date and the format required for submission',
  'Site visit dates, if one is mandatory',
  'Bonding, insurance and prequalification requirements',
];

export default function RFP() {
  const references = projects.filter(project => project.category === 'Institutional').slice(0, 3);

  return (
    <>
      <Breadcrumb trail={[{ name: 'Tenders & RFPs', path: '/rfp' }]} />

      <Section
        headingLevel={1}
        eyebrow="Tenders & RFPs"
        heading="Mechanical tenders, bids and prequalification"
        intro="Send your scope, drawings, site requirements and schedule. Estimating will confirm receipt and tell you what else we need."
      >
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-12">
          <div className="space-y-10">
            <div>
              <h2 className="text-h3 font-bold text-[var(--ink)]">What we deliver</h2>
              <ul className="mt-4 space-y-3 text-[var(--body)]">
                {DELIVERY.map(item => (
                  <li key={item} className="flex gap-3">
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
              <p className="mt-5 text-sm text-[var(--muted)]">
                Submission deadlines, warranty terms, maintenance visits and response requirements
                are confirmed against the project contract and scope.
              </p>
            </div>

            <div>
              <h2 className="text-h3 font-bold text-[var(--ink)]">Send these with your enquiry</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--body)]">
                {SEND_WITH_TENDER.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="mt-5 text-sm text-[var(--body)]">
                Documents too large for the form? Email{' '}
                <a
                  href={`mailto:${EMAIL_QUOTE}`}
                  data-cta-location="page"
                  className="font-semibold underline underline-offset-4"
                >
                  {EMAIL_QUOTE}
                </a>{' '}
                or call{' '}
                <a href={PHONE_HREF} data-cta-location="page" className="font-semibold underline underline-offset-4">
                  {PHONE}
                </a>
                .
              </p>
            </div>
          </div>

          <EnquiryForm defaultType="tender" title="Send tender documents" />
        </div>
      </Section>

      {references.length > 0 && (
        <Section
          tone="alt"
          eyebrow="References"
          heading="Recent institutional work"
          action={
            <Button href="/projects" variant="tertiary">
              See our projects
            </Button>
          }
        >
          <div className="grid gap-5 md:grid-cols-3 md:gap-6">
            {references.map(project => (
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
      )}
    </>
  );
}
