import Section from '../ui/Section';
import Card from '../ui/Card';
import CardRail from '../ui/CardRail';
import Button, { ArrowRight } from '../ui/Button';
import { featuredProjects } from '../../lib/projects';
import { useReveal } from '../../hooks/useReveal';
import { LABEL } from '../../config';

/** Audit D-02 §4 / D-05 — three case studies, each with one outcome line.
 *
 * The separate "Clients" block is folded in: the client name is the card's
 * eyebrow, so proof of who Allied works for sits with the work itself instead
 * of at 65% scroll.
 *
 * `outcomeLine` comes from src/data/projects.json and states only what that
 * project's documented scope supports — a quantity, a client and a year. */

export default function FeaturedProjects() {
  const ref = useReveal<HTMLDivElement>({ stagger: true });
  const featured = featuredProjects.slice(0, 3);
  if (!featured.length) return null;

  return (
    <Section
      id="projects"
      tone="alt"
      eyebrow="Selected projects"
      heading="Delivered around occupied buildings"
      intro="School districts, strata councils and property managers, with the scope and the constraint stated plainly."
      action={
        <Button href="/projects" variant="tertiary" iconAfter={<ArrowRight />} className="group">
          {LABEL.projects}
        </Button>
      }
    >
      <div ref={ref}>
        <CardRail columns={3} aria-label="Selected projects">
        {featured.map(project => (
          <li key={project.id} data-reveal="" className="flex">
            <Card
              to={`/projects/${project.id}`}
              eyebrow={project.client}
              title={project.title}
              summary={project.summary}
              metric={project.outcomeLine}
              image={project.cover}
              sizes="(min-width: 768px) 368px, 78vw"
              variant="project"
              className="w-full"
            />
          </li>
        ))}
        </CardRail>
      </div>
    </Section>
  );
}
