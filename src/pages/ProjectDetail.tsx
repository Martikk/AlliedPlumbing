import { useParams } from '../lib/navigation';
import Breadcrumb from '../components/Breadcrumb';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Button, { PhoneIcon } from '../components/ui/Button';
import JsonLd from '../components/JsonLd';
import NotFound from './NotFound';
import { projects, findProject, type Project } from '../lib/projects';
import posts from '../data/posts.json';
import { SERVICE_BY_KEY, type ServiceKey } from '../lib/site-links';
import { cld, srcSet } from '../lib/images';
import { canonicalURL } from '../lib/site-url';
import { ORG_ID } from '../lib/schema';
import { PHONE, PHONE_HREF } from '../config';

/** Audit I-04 — the case-study template.
 *
 *  Header · fact panel · the challenge · what we did · how we managed it ·
 *  result · gallery · quote · next.
 *
 *  Every block below renders only when its data exists, so the page is never
 *  padded with empty rows. The fields Allied's PMs still need to fill —
 *  contractType, engineer, valueRange, duration, challenge, result, gallery
 *  and quote — are present but blank in src/data/projects.json.
 *
 *  Never write a client quote. It appears only when a real, attributed one
 *  with permission is added to `quote` (I-05). */

const SERVICE_BY_PROJECT: Record<string, ServiceKey> = {
  ridgeview: 'boilers',
  'herbert-spencer': 'boilers',
  'herbert-spencer-ashp': 'hvac',
  glenayre: 'boilers',
  icbc: 'boilers',
  haro: 'commercial-plumbing',
};

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = findProject(slug);
  if (!project) return <NotFound />;

  const serviceKey = SERVICE_BY_PROJECT[project.id] ?? 'hvac';
  const service = SERVICE_BY_KEY[serviceKey];
  const article = posts.find(post => post.project === project.id);
  const sibling = project.relatedProject
    ? projects.find(item => item.id === project.relatedProject)
    : undefined;
  const more = projects
    .filter(item => item.id !== project.id && item.id !== sibling?.id)
    .filter(item => item.category === project.category)
    .slice(0, 2);

  const facts: [string, string][] = [
    ['Client', project.client],
    ['Location', project.location],
    ['Year', project.year ? String(project.year) : ''],
    ['Contract type', project.contractType],
    ['Engineer', project.engineer],
    ['Value', project.valueRange],
    ['Duration', project.duration],
    ['Status', project.status ?? ''],
  ].filter((entry): entry is [string, string] => Boolean(entry[1]));

  return (
    <>
      <Breadcrumb
        trail={[
          { name: 'Projects', path: '/projects' },
          { name: project.title, path: `/projects/${project.id}` },
        ]}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Project',
          '@id': `${canonicalURL(`/projects/${project.id}`)}#project`,
          name: project.title,
          description: project.summary,
          url: canonicalURL(`/projects/${project.id}`),
          ...(project.year ? { startDate: String(project.year) } : {}),
          participant: { '@id': ORG_ID },
        }}
      />

      <Section headingLevel={1} eyebrow={project.category} heading={project.title}>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <div>
            <p className="text-lg leading-[var(--lh-body)] text-[var(--body)]">{project.summary}</p>
            {facts.length > 0 && (
              <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-[var(--line)] pt-6 sm:grid-cols-3">
                {facts.map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-eyebrow font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
                      {label}
                    </dt>
                    <dd className="mt-1 font-semibold text-[var(--ink)]">{value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
          <figure className="m-0">
            <img
              src={cld(project.cover, 1280, { ar: '4:3' })}
              srcSet={srcSet(project.cover, 1280, { ar: '4:3' })}
              sizes="(min-width: 1024px) 520px, 100vw"
              alt={project.imageAlt || ''}
              width={1280}
              height={960}
              fetchPriority="high"
              className="w-full rounded-[var(--radius-lg)] object-cover"
            />
            {project.imageCaption && (
              <figcaption className="mt-3 text-sm text-[var(--muted)]">
                {project.imageCaption}
              </figcaption>
            )}
          </figure>
        </div>
      </Section>

      {project.challenge && (
        <Section tone="alt" eyebrow="The challenge" heading="What made this one difficult">
          <p className="max-w-3xl text-lg leading-[var(--lh-body)] text-[var(--body)]">
            {project.challenge}
          </p>
        </Section>
      )}

      <Section eyebrow="What we did" heading={project.heading}>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
          <div>
            <p className="text-[var(--body)]">{project.overview}</p>
            <ul className="mt-6 space-y-3">
              {project.scope.map(item => (
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
            <h3 className="mt-10 text-h3 font-bold text-[var(--ink)]">How we managed it</h3>
            <p className="mt-3 text-[var(--body)]">{project.approach}</p>
            <p className="mt-3 text-[var(--body)]">{project.delivery}</p>
          </div>

          <aside className="self-start rounded-[var(--radius-lg)] border border-[var(--line)] bg-[var(--surface-alt)] p-6">
            <h3 className="text-h3 font-bold text-[var(--ink)]">Planning a similar upgrade?</h3>
            <p className="mt-3 text-sm text-[var(--body)]">
              Bring these into the scope discussion for your building.
            </p>
            <ul className="mt-5 list-disc space-y-3 pl-4 text-sm text-[var(--body)]">
              {project.planning.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div data-cta-anchor className="mt-6 grid gap-3">
              {/* H-05 — prefilled with the service this project used. */}
              <Button href={`/quote?type=quote&service=${serviceKey}`}>Get a quote</Button>
              <Button href="/rfp" variant="secondary">
                Send tender documents
              </Button>
              <Button
                href={PHONE_HREF}
                variant="tertiary"
                icon={<PhoneIcon />}
                data-cta-location="page"
              >
                {PHONE}
              </Button>
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="alt" eyebrow="Result" heading={project.status ? 'Project status' : 'Outcome'}>
        <p className="max-w-3xl text-lg leading-[var(--lh-body)] text-[var(--body)]">
          {project.result || project.outcome}
        </p>
        {project.outcomeLine && (
          <p className="mt-6 max-w-3xl border-l-4 border-[var(--brand)] pl-5 text-lg font-semibold text-[var(--ink)]">
            {project.outcomeLine}
          </p>
        )}
      </Section>

      {project.gallery.length > 0 && (
        <Section eyebrow="On site" heading="Photographs from the job">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {project.gallery.map((photo: { src: string; alt: string }) => (
              <figure key={photo.src} className="m-0">
                <img
                  src={cld(photo.src, 960, { ar: '4:3' })}
                  srcSet={srcSet(photo.src, 960, { ar: '4:3' })}
                  sizes="(min-width: 1024px) 368px, (min-width: 640px) 50vw, 100vw"
                  alt={photo.alt}
                  width={960}
                  height={720}
                  loading="lazy"
                  decoding="async"
                  className="w-full rounded-[var(--radius-lg)] object-cover"
                />
              </figure>
            ))}
          </div>
        </Section>
      )}

      {project.quote && (
        <Section tone="alt">
          <blockquote className="mx-auto max-w-3xl text-center">
            <p className="text-h3 font-semibold leading-snug text-[var(--ink)]">
              “{project.quote.text}”
            </p>
            <footer className="mt-5 text-sm text-[var(--muted)]">
              — {project.quote.name}, {project.quote.title}
            </footer>
          </blockquote>
        </Section>
      )}

      <Section
        eyebrow="Next"
        heading="Related work"
        action={
          <Button href="/projects" variant="tertiary">
            See our projects
          </Button>
        }
      >
        <div className="grid gap-5 md:grid-cols-3 md:gap-6">
          <Card
            to={service.to}
            eyebrow="Service"
            title={service.label}
            summary={service.summary}
            image={service.image}
            sizes="(min-width: 768px) 368px, 100vw"
            variant="service"
          />
          {[sibling, ...more]
            .filter((item): item is Project => Boolean(item))
            .slice(0, 2)
            .map(item => (
              <Card
                key={item.id}
                to={`/projects/${item.id}`}
                eyebrow={item.client}
                title={item.title}
                summary={item.summary}
                image={item.cover}
                sizes="(min-width: 768px) 368px, 100vw"
                variant="project"
              />
            ))}
        </div>
        {article && (
          <p className="mt-8">
            <Button href={`/blog/${article.slug}`} variant="tertiary">
              Read the planning note: {article.title}
            </Button>
          </p>
        )}
      </Section>
    </>
  );
}
