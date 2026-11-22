import Section from '../ui/Section';
import Card from '../ui/Card';
import CardRail from '../ui/CardRail';
import Button, { ArrowRight } from '../ui/Button';
import posts from '../../data/posts.json';
import { useReveal } from '../../hooks/useReveal';

/** Audit D-02 §7 / D-06 — the three latest articles.
 *
 * Dates are deliberately absent from these cards. All 18 posts carry one of
 * two publication dates, which reads as batch-published; the audit's rule is
 * not to invent earlier ones. The article page shows "Updated <date>" instead.
 * Once posts go out on a schedule (I-06), show the true date here.
 *
 * PENDING I-06: `author` is still the company. Byline each post with a real
 * person and role in src/data/posts.json — the card renders whatever is there. */

export default function InsightsGrid() {
  const ref = useReveal<HTMLDivElement>({ stagger: true });
  const latest = [...posts]
    .sort((a, b) => b.date.localeCompare(a.date))
    .filter(post => post.category !== 'Careers')
    .slice(0, 3);

  return (
    <Section
      eyebrow="Insights"
      heading="Planning notes from our projects"
      intro="What we learned delivering mechanical work around occupied schools and buildings."
      action={
        <Button href="/blog" variant="tertiary" iconAfter={<ArrowRight />} className="group">
          Read our insights
        </Button>
      }
    >
      <div ref={ref}>
        <CardRail columns={3} aria-label="Latest articles">
        {latest.map(post => (
          <li key={post.slug} data-reveal="" className="flex">
            <Card
              to={`/blog/${post.slug}`}
              eyebrow={post.category}
              title={post.title}
              summary={post.excerpt}
              metric={`${post.author} · ${post.readingMinutes} min read`}
              image={post.image}
              sizes="(min-width: 768px) 368px, 78vw"
              variant="article"
              className="w-full"
            />
          </li>
        ))}
        </CardRail>
      </div>
    </Section>
  );
}
