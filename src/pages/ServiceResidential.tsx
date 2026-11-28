// src/pages/ServiceResidential.tsx
import ServiceTemplate from "./ServiceTemplate";
import ServiceSections from "../components/ServiceSections";

/** Three things were removed from this page along with the rewrite.
 *
 *  "Certified Technicians • School-Approved Crews • Guaranteed Workmanship"
 *  closed the page: three claims, none of them supported anywhere in the
 *  repo. H-04 already deleted "certified technicians" from the quote page for
 *  exactly that reason, and leaving it standing here made that fix half a
 *  fix. Which licences, certifications and warranty terms may be stated is
 *  still Q3.
 *
 *  A "zero drywall dust policy" went with it — an absolute promise about site
 *  conditions that nobody can keep on a repipe.
 *
 *  And the image collage labelled two manufacturer logos as "High-efficiency
 *  systems" and "Tankless water heater install", with an AI-generated render
 *  captioned "Repiping system detail". A logo is not a photograph of our
 *  work. The logos stay, named as logos (audit A-07); the render is gone. */
export default function ServiceResidential() {
  return (
    <ServiceTemplate
      title="Residential Plumbing"
      subtitle="02 / Plumbing"
      description="Repairs, fixture replacements, repipes, and tankless installations — all delivered with craftsmanship, precision, and respect for your home."
      heroImg="https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_1200/v1760068156/Allied/14_urnogx.png"
      highlights={[]}
      bullets={[
        "Repairs & rough-ins — done right the first time",
        "Tankless installations with high-efficiency systems",
        "PEX and copper repiping",
      ]}
    >
      <ServiceSections
        sections={[
          {
            title: 'What we do in houses and small buildings',
            paragraphs: [
              'Repairs and replacements, fixture and valve work, rough-ins for renovations, drainage problems, and the two jobs that take a house apart for a day or more — a repipe and a water heater changeover. Most of our work is in larger buildings, and the same habits come with us: the water goes off when we say it will, and the day ends with the system working rather than capped.',
            ],
            list: [
              'Leaks, failed valves, and fixture or tap replacement.',
              'Rough-ins and relocations for kitchen and bathroom renovations.',
              'Tank and tankless water heater replacement, including venting and gas supply.',
              'PEX and copper repiping, in whole or by section.',
              'Drainage faults, and the investigation needed to find them before anything is opened up.',
            ],
          },
          {
            title: 'Water heaters: the install is rarely just the appliance',
            paragraphs: [
              'Swapping a tank for a tankless unit changes more than the box on the wall. A tankless appliance wants a gas supply sized for a much higher input, its own venting, a condensate drain, and sometimes an electrical circuit that is not there yet. Where the house has a recirculation loop, that has to be re-thought too, or the hot water arrives slower than it did before.',
              'None of that is a reason not to do it. It is a reason to confirm the gas line, the vent route and the permit before the equipment is ordered, so the day of the install is an install and not a discovery.',
            ],
          },
          {
            title: 'Repiping an occupied house',
            paragraphs: [
              'A repipe is planned backwards from how long you can live without water. We agree the sections, the order they are done in, and how long the supply is off each day; where walls and ceilings have to be opened, we agree who closes them before the first hole is made. Expect dust and expect openings — the honest promise is containment and a clean-up at the end of each day, not that neither will happen.',
              'At the end you should have working fixtures, pressure tested and flushed, and a note of where the new isolation valves are. That last one saves a call-out the first time something drips.',
            ],
          },
        ]}
        reading={[
          { to: '/blog/hydronic-heating-domestic-hot-water', label: 'Hydronic heating and domestic hot water', note: 'why one appliance serving both is a design decision, not a shortcut.' },
          { to: '/blog/mechanical-upgrade-request-checklist', label: 'What to include when you ask for a quote', note: 'the details that let us answer without a second visit.' },
        ]}
      />
      <Equipment />
    </ServiceTemplate>
  );
}

/** Manufacturer logos, named as manufacturer logos. */
function Equipment() {
  return (
    <section className="max-w-6xl mx-auto px-4 md:px-6 pb-12">
      <div className="max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-bold">Equipment we install</h2>
        <p className="mt-4 text-neutral-700 leading-relaxed">
          Selection follows the building rather than the badge, but these are the makes we fit and service most often in houses and small multi-family buildings. If you already have a preference, or a warranty that depends on one, tell us before the quote.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-8">
          <img
            src="https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_320/v1760074743/Allied/IBC-Logo-for-Gallery_hsklz0.webp"
            alt="IBC"
            width={160}
            height={64}
            loading="lazy"
            decoding="async"
            className="h-12 w-auto object-contain"
          />
          <img
            src="https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_320/v1760074745/Allied/Rinnai_Logo_Red_uqwftm.png"
            alt="Rinnai"
            width={160}
            height={64}
            loading="lazy"
            decoding="async"
            className="h-12 w-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
}
