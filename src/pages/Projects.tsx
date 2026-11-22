import { useEffect, useState } from 'react';
import { useSearchParams } from '../lib/navigation';
import Hero from '../components/Hero';
import Breadcrumb from '../components/Breadcrumb';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { projects } from '../lib/projects';

/** Audit I-04 (last line) — filter by sector, plus a text search.
 *
 *  Filters are mirrored into the query string so a filtered view can be
 *  linked and shared. They are only read after hydration, so the prerendered
 *  HTML always shows the full list rather than a filtered snapshot. */

const SECTORS = ['All', 'Institutional', 'Commercial', 'Residential'] as const;

export default function Projects() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  const [params, setParams] = useSearchParams();

  const query = hydrated ? (params.get('q') ?? '') : '';
  const sector = hydrated ? (params.get('category') ?? 'All') : 'All';

  const filtered = projects.filter(
    project =>
      (sector === 'All' || project.category === sector) &&
      `${project.title} ${project.location} ${project.client} ${project.summary}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );

  function filter(key: string, value: string) {
    const next = new URLSearchParams(params);
    if (!value || value === 'All') next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  }

  return (
    <>
      <Hero
        compact
        eyebrow="Projects"
        heading="Mechanical upgrades in buildings that stayed open"
        subhead="School ventilation, boiler plants, chillers and heating systems across Metro Vancouver, the North Shore and the Sea-to-Sky corridor."
        image="https://res.cloudinary.com/dzytbkc5l/image/upload/v1760072887/Allied/Allied_1_n00b0m.png"
        alt="Mechanical room during a school plant upgrade"
      />
      <Breadcrumb trail={[{ name: 'Projects', path: '/projects' }]} />

      <Section>
        <div className="flex flex-wrap items-end justify-between gap-5">
          <label className="block w-full sm:w-80">
            <span className="mb-2 block font-semibold text-[var(--ink)]">Search projects</span>
            <input
              type="search"
              className="input"
              value={query}
              onChange={event => filter('q', event.target.value)}
              placeholder="School, location or system…"
            />
          </label>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by sector">
            {SECTORS.map(value => (
              <button
                type="button"
                key={value}
                aria-pressed={sector === value}
                onClick={() => filter('category', value)}
                className={`min-h-12 rounded-[var(--radius)] border px-4 font-semibold ${
                  sector === value
                    ? 'border-[var(--ink)] bg-[var(--ink)] text-white'
                    : 'border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:border-[var(--ink)]'
                }`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        <p role="status" className="mt-6 text-[var(--muted)]">
          {filtered.length} {filtered.length === 1 ? 'project' : 'projects'}
        </p>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {filtered.map(project => (
            <Card
              key={project.id}
              to={`/projects/${project.id}`}
              eyebrow={`${project.client}${project.year ? ` · ${project.year}` : ''}`}
              title={project.title}
              summary={project.summary}
              metric={project.outcomeLine}
              image={project.cover}
              sizes="(min-width: 1024px) 368px, (min-width: 640px) 50vw, 100vw"
              variant="project"
            />
          ))}
        </div>

        {!filtered.length && (
          <p className="py-10 text-[var(--body)]">
            No projects match that search. Try another school, location or system, or{' '}
            <button
              type="button"
              onClick={() => setParams(new URLSearchParams(), { replace: true })}
              className="font-semibold underline underline-offset-4"
            >
              clear the filters
            </button>
            .
          </p>
        )}
      </Section>

      <Section tone="alt" eyebrow="Your building" heading="Planning a mechanical upgrade?">
        <p className="max-w-2xl text-[var(--body)]">
          Tell us the building, the equipment and your access windows. We reply within one business
          day.
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
