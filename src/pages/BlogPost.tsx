import { useParams } from '../lib/navigation';
import Breadcrumb from '../components/Breadcrumb';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import JsonLd from '../components/JsonLd';
import NotFound from './NotFound';
import posts from '../data/posts.json';
import { projects } from '../lib/projects';
import servicesSEO from '../data/seo.json';
import { SERVICE_BY_KEY, type ServiceKey } from '../lib/site-links';
import { cld, srcSet } from '../lib/images';
import { canonicalURL } from '../lib/site-url';
import { ORG_ID } from '../lib/schema';

const FORMAT = new Intl.DateTimeFormat('en-CA', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

/** D-06 — the date is shown here as "Updated", not as a publication date.
 *  Every post carries one of two dates from a single batch publish, and the
 *  audit's rule is not to invent earlier ones.
 *
 *  PENDING I-06: `author` is still the company. Byline each post with a real
 *  person and role in src/data/posts.json — this page renders whatever is
 *  there, and the Article schema follows it. */
export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find(item => item.slug === slug);
  if (!post) return <NotFound />;

  const project = projects.find(item => item.id === post.project);
  const serviceKey = post.relatedService as ServiceKey;
  const service = SERVICE_BY_KEY[serviceKey];
  const servicePath = `/services/${post.relatedService}` as keyof typeof servicesSEO;
  const review = post.review;
  const related = projects
    .filter(item => item.id !== project?.id && item.category === project?.category)
    .slice(0, 2);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${canonicalURL(`/blog/${post.slug}`)}#article`,
    mainEntityOfPage: canonicalURL(`/blog/${post.slug}`),
    headline: post.title,
    description: post.excerpt,
    ...(post.image.startsWith('https://') ? { image: [post.image] } : {}),
    datePublished: post.date,
    inLanguage: 'en-CA',
    author: { '@type': 'Organization', name: post.author, url: canonicalURL('/about') },
    publisher: { '@id': ORG_ID },
  };

  return (
    <>
      <Breadcrumb
        trail={[
          { name: 'Insights', path: '/blog' },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      />
      <JsonLd data={articleSchema} />

      <Section headingLevel={1} eyebrow={post.category} heading={post.title}>
        <p className="text-sm text-[var(--muted)]">
          By {post.author} · {post.readingMinutes} min read · Updated{' '}
          <time dateTime={post.date}>{FORMAT.format(new Date(post.date))}</time>
        </p>
        <p className="mt-2 text-sm text-[var(--muted)]">
          {review.status === 'reviewed' && review.reviewer && review.reviewedAt
            ? `Technical review: ${review.reviewer} · ${FORMAT.format(new Date(review.reviewedAt))}`
            : post.category === 'Careers'
              ? 'General career guide. Hiring-team review pending; confirm current roles with our team.'
              : 'Technical review pending. Project scope and planning information, not installation instructions.'}
        </p>

        <figure className="mt-8 m-0">
          <img
            src={cld(post.image, 1280, { ar: '16:9' })}
            srcSet={srcSet(post.image, 1280, { ar: '16:9' })}
            sizes="(min-width: 1200px) 1152px, 100vw"
            alt=""
            width={1280}
            height={720}
            fetchPriority="high"
            className="w-full rounded-[var(--radius-lg)] object-cover clip-tilt"
          />
          {post.image.startsWith('/images/') && (
            <figcaption className="mt-2 text-sm text-[var(--muted)]">
              Temporary image placeholder. Article photography to follow.
            </figcaption>
          )}
        </figure>

        <div className="article-copy mx-auto mt-10 max-w-3xl">
          <p className="text-lg">{post.intro}</p>
          {post.sections.map(section => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map(paragraph => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}

          {post.checklist.length > 0 && (
            <section className="mt-10 rounded-[var(--radius-lg)] border border-[var(--line)] bg-[var(--surface-alt)] p-6">
              <h2 className="!mt-0">Planning checklist</h2>
              <ul className="mt-4 list-disc space-y-3 pl-5">
                {post.checklist.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </Section>

      <Section tone="alt" eyebrow="Next" heading="Related work">
        <div className="grid gap-5 md:grid-cols-3 md:gap-6">
          {service && (
            <Card
              to={servicePath}
              eyebrow="Service"
              title={service.label}
              summary={service.summary}
              image={service.image}
              sizes="(min-width: 768px) 368px, 100vw"
              variant="service"
            />
          )}
          {[project, ...related]
            .filter((item): item is (typeof projects)[number] => Boolean(item))
            .slice(0, 2)
            .map(item => (
              <Card
                key={item.id}
                to={`/projects/${item.id}`}
                eyebrow={item.client}
                title={item.title}
                summary={item.summary}
                metric={item.outcomeLine}
                image={item.cover}
                sizes="(min-width: 768px) 368px, 100vw"
                variant="project"
              />
            ))}
        </div>
        <div data-cta-anchor className="mt-10 flex flex-wrap gap-3">
          {post.category === 'Careers' ? (
            <Button href="/careers">Explore career opportunities</Button>
          ) : (
            <Button href={`/quote?type=quote&service=${post.relatedService}`}>Get a quote</Button>
          )}
          <Button href="/blog" variant="secondary">
            Read our insights
          </Button>
        </div>
      </Section>
    </>
  );
}
