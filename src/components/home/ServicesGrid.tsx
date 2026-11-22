import Section from '../ui/Section';
import Card from '../ui/Card';
import Button, { ArrowRight } from '../ui/Button';
import { SERVICE_LINKS } from '../../lib/site-links';
import { useReveal } from '../../hooks/useReveal';

/** Audit D-02 §3 / E-06 — six services as a 3×2 grid.
 *
 * Replaces the alternating zig-zag list, which ran to roughly 2,000 px on its
 * own. Two columns on mobile, three from 1024 px. Each card is one link
 * (F-04) with a 4:3 image. */

export default function ServicesGrid() {
  const ref = useReveal<HTMLDivElement>({ stagger: true });
  return (
    <Section
      id="services"
      eyebrow="Our services"
      heading="Plumbing, heating and HVAC for occupied buildings"
      intro="Six service lines, delivered around the people who use the building — from a single service call to a phased plant replacement."
      action={
        <Button href="/services" variant="tertiary" iconAfter={<ArrowRight />} className="group">
          View all services
        </Button>
      }
    >
      <div ref={ref} className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3">
        {SERVICE_LINKS.map(service => (
          <div key={service.key} data-reveal="" className="flex">
            <Card
              to={service.to}
              title={service.label}
              summary={service.summary}
              image={service.image}
              sizes="(min-width: 1024px) 368px, 50vw"
              variant="service"
              className="w-full"
            />
          </div>
        ))}
      </div>
    </Section>
  );
}
