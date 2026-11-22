import Hero from '@/components/Hero';
import TrustStrip from '@/components/TrustStrip';
import ServicesGrid from '@/components/home/ServicesGrid';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import HowWeWork from '@/components/home/HowWeWork';
import TeamSection from '@/components/TeamSection';
import InsightsGrid from '@/components/home/InsightsGrid';
import ContactBlock from '@/components/home/ContactBlock';
import Section from '@/components/ui/Section';

/** Audit D-02 — eight sections, in the order a facilities manager asks their
 *  three questions: can you do my job, have you done it before, how do I start.
 *
 *  1 Hero · 2 Trust strip · 3 Services · 4 Featured projects ·
 *  5 How we work · 6 Team · 7 Insights · 8 Contact
 *
 *  Removed from the old thirteen-block page: the four "Smart methods /
 *  Experienced team / Modern equipment / Proven delivery" cards (generic, and
 *  they repeated the process block), the "We build, we maintain, we care" CTA
 *  band, the unlabelled "Quality control system / Project coordination…" list,
 *  the separate Clients block (folded into the project cards) and the logo
 *  marquee (now static, inside the trust strip).
 *
 *  I-01 — this page is written for the institutional and commercial buyer
 *  (Option A). Residential is one service page, not the headline. If Allied
 *  decides otherwise, the hero copy below and the service page H1s (A-06) are
 *  the two places to change. */

export default function Home() {
  return (
    <>
      <Hero
        eyebrow="We build. We maintain. We care."
        heading="Mechanical contractor for schools, strata and commercial buildings"
        subhead="Plumbing, heating, boiler plants and HVAC across Metro Vancouver, the North Shore and Sea-to-Sky — installed, maintained and on call 24/7."
        image="https://res.cloudinary.com/dzytbkc5l/image/upload/v1760065876/Allied/3_gk4dl8.png"
        alt="Allied crew working in a school mechanical room"
      />
      <TrustStrip />
      <ServicesGrid />
      <FeaturedProjects />
      <HowWeWork />
      <Section eyebrow="Our team" heading="The people who run the work">
        <TeamSection />
      </Section>
      <InsightsGrid />
      <ContactBlock />
    </>
  );
}
