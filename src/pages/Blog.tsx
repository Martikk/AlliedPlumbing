import { useEffect, useState } from 'react';
import { useSearchParams } from '../lib/navigation';
import Breadcrumb from '../components/Breadcrumb';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import posts from '../data/posts.json';

/** D-06 — no dates on the cards. All 18 posts carry one of two publication
 *  dates, which reads as batch-published, and the audit's rule is not to
 *  invent earlier ones. The article page carries "Updated <date>" instead.
 *  Once posts go out on a schedule (I-06), show the real date here. */

export default function Blog() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  const [params, setParams] = useSearchParams();

  const categories = ['All', ...new Set(posts.map(post => post.category))];
  const raw = hydrated ? (params.get('category') ?? 'All') : 'All';
  const normalised = raw === 'Boiler plants' ? 'Heating & boilers' : raw;
  const category = categories.includes(normalised) ? normalised : 'All';
  const query = hydrated ? (params.get('q') ?? '') : '';

  const filtered = posts.filter(
    post =>
      (category === 'All' || post.category === category) &&
      `${post.title} ${post.excerpt} ${post.category}`.toLowerCase().includes(query.toLowerCase()),
  );

  function filter(key: string, value: string) {
    const next = new URLSearchParams(params);
    if (!value || value === 'All') next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  }

  return (
    <>
      <Breadcrumb trail={[{ name: 'Insights', path: '/blog' }]} />
      <Section
        headingLevel={1}
        eyebrow="Insights"
        heading="Planning notes from our projects"
        intro="Written for school facilities teams, strata councils and building owners: equipment interfaces, occupied-building planning and the coordination behind a mechanical upgrade."
      >
        <div className="flex flex-wrap items-end justify-between gap-5">
          <label className="w-full sm:w-80">
            <span className="mb-2 block font-semibold text-[var(--ink)]">Search articles</span>
            <input
              type="search"
              value={query}
              onChange={event => filter('q', event.target.value)}
              className="input"
              placeholder="Boilers, schools, cooling…"
            />
          </label>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by topic">
            {categories.map(topic => (
              <button
                key={topic}
                type="button"
                aria-pressed={category === topic}
                onClick={() => filter('category', topic)}
                className={`min-h-12 rounded-[var(--radius)] border px-4 text-sm font-semibold ${
                  category === topic
                    ? 'border-[var(--ink)] bg-[var(--ink)] text-white'
                    : 'border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:border-[var(--ink)]'
                }`}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        <p role="status" className="mt-6 text-[var(--muted)]">
          {filtered.length} {filtered.length === 1 ? 'article' : 'articles'}
        </p>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {filtered.map(post => (
            <Card
              key={post.slug}
              to={`/blog/${post.slug}`}
              eyebrow={post.category}
              title={post.title}
              summary={post.excerpt}
              metric={`${post.author} · ${post.readingMinutes} min read`}
              image={post.image}
              sizes="(min-width: 1024px) 368px, (min-width: 640px) 50vw, 100vw"
              variant="article"
            />
          ))}
        </div>

        {!filtered.length && (
          <p className="py-10 text-[var(--body)]">No articles match that search.</p>
        )}
      </Section>

      <Section tone="alt" eyebrow="Your building" heading="Planning your next upgrade?">
        <p className="max-w-2xl text-[var(--body)]">
          Start with the building location, the existing equipment, any drawings you have, and the
          restrictions on access or shutdowns. We will tell you what else we need.
        </p>
        <div data-cta-anchor className="mt-6 flex flex-wrap gap-3">
          <Button href="/quote">Get a quote</Button>
          <Button href="/projects" variant="secondary">
            See our projects
          </Button>
        </div>
      </Section>
    </>
  );
}
