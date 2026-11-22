import Hero from '../components/Hero';
import Breadcrumb from '../components/Breadcrumb';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import FaqItem from '../components/FaqItem';
import TrustStrip from '../components/TrustStrip';
import JsonLd from '../components/JsonLd';
import { SERVICE_LINKS } from '../lib/site-links';
import { generalFaq, faqSchema } from '../lib/faq';
import { canonicalURL } from '../lib/site-url';

/** Audit A-06 / I-01 — the services hub, written for the buyer who actually
 *  reads it.
 *
 *  The old page carried "Built for uptime. Tuned for comfort." and
 *  "Full-stack mechanical, from taps to rooftops", plus its own hard-coded
 *  copy of the service list that had already drifted from the navigation.
 *  Everything now reads SERVICE_LINKS, so there is one list.
 *
 *  The logo marquee is gone (G-02): the same four logos sit in the static
 *  trust strip. */

export default function Services() {
  const faq = generalFaq().slice(0, 6);
  return (
    <>
      <Hero
        compact
        eyebrow="Our services"
        heading="Mechanical services for occupied buildings in Metro Vancouver"
        subhead="Plumbing, heating, boiler plants and HVAC for school districts, strata councils, property managers and general contractors — plus 24/7 emergency response."
        image="https://res.cloudinary.com/dzytbkc5l/image/upload/v1760065875/Allied/1_tc9jiy.png"
        alt="Allied technician working on commercial plumbing risers"
      />
      <Breadcrumb trail={[{ name: 'Services', path: '/services' }]} />
      <JsonLd data={faqSchema(faq, canonicalURL('/services'))} />

      <Section
        eyebrow="What we do"
        heading="Six service lines, one crew"
        intro="Most of our work happens in buildings that stay open: schools during term, apartments with residents in them, offices mid-tenancy. Phasing and access are part of the scope, not an afterthought."
      >
        <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3">
          {SERVICE_LINKS.map(service => (
            <Card
              key={service.key}
              to={service.to}
              title={service.label}
              summary={service.summary}
              image={service.image}
              sizes="(min-width: 1024px) 368px, 50vw"
              variant="service"
            />
          ))}
        </div>
      </Section>

      <TrustStrip />

      {faq.length > 0 && (
        <Section eyebrow="FAQ" heading="Common questions">
          <div className="divide-y divide-[var(--line)] rounded-[var(--radius-lg)] border border-[var(--line)] bg-[var(--surface)]">
            {faq.map(entry => (
              <FaqItem key={entry.q} question={entry.q}>
                {entry.a}
              </FaqItem>
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
