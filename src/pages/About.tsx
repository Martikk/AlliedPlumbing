import Hero from '../components/Hero';
import Breadcrumb from '../components/Breadcrumb';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';
import TrustStrip from '../components/TrustStrip';
import TeamSection from '../components/TeamSection';

/** D-02 "Delete" list — the real content from the four removed homepage
 *  cards ("Smart methods / Experienced team / Modern equipment / Proven
 *  delivery") and the unlabelled quality list now lives here, where a reader
 *  who wants it will look for it. */

const CAPABILITY = [
  {
    title: 'We plan around the building, not around us',
    copy: 'We review the existing equipment, the access and the project requirements before setting an installation sequence. For schools and occupied buildings, phasing, after-hours work and site safety are part of the scope from the first conversation — not something negotiated later.',
  },
  {
    title: 'One team coordinating the trades',
    copy: 'Our project managers coordinate mechanical installation with electrical, sheet metal, controls, insulation, and testing and balancing. On a school upgrade that is usually five or six parties working to one sequence; keeping that sequence is most of the job.',
  },
  {
    title: 'Equipment, controls and commissioning as one scope',
    copy: 'Equipment selection, piping connections, controls interfaces and commissioning requirements are considered together. A boiler that works but cannot be monitored, or a plant handed over without an O&M package, is not a finished job.',
  },
  {
    title: 'Documentation that outlives the project',
    copy: 'Shop drawings, as-built records, operation and maintenance documents, testing and balancing reports, and a turnover walkthrough with the people who will run the system.',
  },
];

export default function About() {
  return (
    <>
      <Hero
        compact
        eyebrow="About Allied"
        heading="A Burnaby mechanical contractor working in buildings that stay open"
        subhead="Plumbing, HVAC/R, boiler plants and gas fitting for school districts, strata councils, property managers and general contractors across British Columbia."
        image="https://res.cloudinary.com/dzytbkc5l/image/upload/v1760068156/Allied/14_urnogx.png"
        alt="Allied crew on site during a mechanical upgrade"
      />
      <Breadcrumb trail={[{ name: 'About', path: '/about' }]} />
      <TrustStrip />

      <Section eyebrow="What we do" heading="From installation to ongoing maintenance">
        <div className="max-w-3xl space-y-5 text-lg leading-[var(--lh-body)] text-[var(--body)]">
          <p>
            Allied Plumbing, Heating &amp; Air Conditioning provides mechanical contracting,
            plumbing, HVAC/R and gas fitting for residential, commercial and institutional
            buildings. Our work includes boiler plant replacements, classroom ventilation upgrades,
            domestic hot water systems and preventive maintenance.
          </p>
          <p>
            Most of it happens in buildings that cannot close. A school still has children in it;
            an apartment building still has residents; an office still has tenants. Planning
            therefore starts with access, shutdown windows and the people who use the facility —
            and only then with the equipment.
          </p>
        </div>
      </Section>

      <Section tone="alt" eyebrow="How we work" heading="Four things we do consistently">
        <div className="grid gap-8 md:grid-cols-2 md:gap-10">
          {CAPABILITY.map(item => (
            <article key={item.title} className="border-t-2 border-[var(--line)] pt-5">
              <h3 className="text-h3 font-bold text-[var(--ink)]">{item.title}</h3>
              <p className="mt-3 text-[var(--body)]">{item.copy}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Our team"
        heading="The people who run the work"
        action={
          <Button href="/team" variant="tertiary">
            Meet the whole team
          </Button>
        }
      >
        <TeamSection />
      </Section>

      <Section tone="alt" eyebrow="Next" heading="Discuss your building or project">
        <p className="max-w-2xl text-[var(--body)]">
          Send your service requirements or project scope, or call us — the line is answered
          around the clock.
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
