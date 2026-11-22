import Breadcrumb from '../components/Breadcrumb';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import TrustStrip from '../components/TrustStrip';
import { projects } from '../lib/projects';

/** The old "Real projects. Lasting relationships." block was named
 *  ClientTestimonials but contained no testimonial — just project summaries
 *  under a heading that implied one. It is gone.
 *
 *  PENDING I-05: this page is where real, attributed client quotes and
 *  reference letters belong once Allied has them in writing. Nothing here is
 *  written or paraphrased on a client's behalf. */

export default function Clients() {
  const byClient = new Map<string, typeof projects>();
  for (const project of projects) {
    byClient.set(project.client, [...(byClient.get(project.client) ?? []), project]);
  }
  const clients = [...byClient.entries()].sort((a, b) => b[1].length - a[1].length);

  return (
    <>
      <Breadcrumb trail={[{ name: 'Clients', path: '/clients' }]} />
      <Section
        headingLevel={1}
        eyebrow="Clients"
        heading="Who we work for"
        intro="School districts, a university, public bodies and residential building owners across Metro Vancouver and the Sea-to-Sky corridor."
      >
        <div className="space-y-12">
          {clients.map(([client, jobs]) => (
            <article key={client}>
              <h2 className="text-h3 font-bold text-[var(--ink)]">{client}</h2>
              <p className="mt-1 text-sm text-[var(--muted)]">
                {jobs.length} documented {jobs.length === 1 ? 'project' : 'projects'}
              </p>
              <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                {jobs.map(project => (
                  <Card
                    key={project.id}
                    to={`/projects/${project.id}`}
                    eyebrow={project.location}
                    title={project.title}
                    summary={project.summary}
                    metric={project.outcomeLine}
                    image={project.cover}
                    sizes="(min-width: 1024px) 368px, (min-width: 640px) 50vw, 100vw"
                    variant="project"
                  />
                ))}
              </div>
            </article>
          ))}
        </div>
      </Section>

      <TrustStrip />

      <Section tone="alt" eyebrow="Next" heading="Joining this list?">
        <p className="max-w-2xl text-[var(--body)]">
          Tell us about the building and the work. For tender and RFP documents, use the tenders
          page so they reach estimating directly.
        </p>
        <div data-cta-anchor className="mt-6 flex flex-wrap gap-3">
          <Button href="/quote">Get a quote</Button>
          <Button href="/rfp" variant="secondary">
            Send tender documents
          </Button>
        </div>
      </Section>
    </>
  );
}
