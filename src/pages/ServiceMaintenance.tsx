// src/pages/ServiceMaintenance.tsx
import ServiceTemplate from "./ServiceTemplate";
import ServiceSections from "../components/ServiceSections";

/** No project page carries `relatedService: 'maintenance'`, so this page
 *  shows no case list — a programme is not a project, and inventing one
 *  would be the first false thing on the page. The articles it links to are
 *  about records and turnover, which is what a programme actually runs on. */
export default function ServiceMaintenance() {
  return (
    <ServiceTemplate
      title="Preventive Maintenance Programs"
      subtitle="01 / Mechanical PM"
      description="Planned maintenance for peace of mind. Monthly, quarterly, and annual programs with DDC trend reviews, safety checks, and lifecycle forecasting — ensuring your systems run efficiently, safely, and within budget."
      heroImg="https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_1200/v1760074307/Allied/Gemini_Generated_Image_9on55p9on55p9on5_ga0mso.png"
      highlights={[]}
      bullets={[
        "Custom PM checklists aligned with equipment type and manufacturer specs",
        "DDC trend reviews and performance optimization reports",
        "Capex forecasting and lifecycle planning tools",
        "Predictive alerts and pre-season inspections",
        "Detailed documentation for compliance and budgeting",
      ]}
    >
      <ServiceSections
        sections={[
          {
            title: 'A programme is a list of equipment before it is a schedule',
            paragraphs: [
              'Useful preventive maintenance starts from what is actually in the building: the boilers, pumps, rooftop units, air handlers, unit ventilators, exhaust fans, domestic hot water plant and backflow assemblies, each with its make, model, age and location. Until that list exists, a maintenance quote is a guess, and the visits that follow are a tour rather than a programme.',
              'Visit frequency then comes from the equipment and the season rather than from a flat monthly habit. Heating plant is checked before the heating season, cooling before the cooling season; filters, belts and water treatment run on their own intervals; safety devices and combustion checks run on theirs.',
            ],
            list: [
              'An equipment register with location, make, model, age and service history where it exists.',
              'Task lists built from the manufacturer’s requirements for that equipment, not a generic checklist.',
              'Seasonal inspections scheduled before the season that will test the equipment.',
              'Trend and alarm review where the building has DDC, so a fault is found before a call-out.',
              'A written record after each visit, with what was found, what was done and what is deteriorating.',
            ],
          },
          {
            title: 'The value is in the records, not the visit',
            paragraphs: [
              'A maintenance programme earns its place when it changes a budget decision. Readings taken on the same equipment over several seasons show what is drifting; a repair log shows what keeps being repaired; a sequence that keeps being overridden shows a control problem rather than a mechanical one. That is the material a building team takes into a capital planning conversation.',
              'It is also what makes the next contractor cheap rather than expensive. A building with a complete equipment register and a consistent service history can be priced from the records. A building without one gets priced from a survey, with the uncertainty included.',
            ],
          },
          {
            title: 'Starting from a project we handed over',
            paragraphs: [
              'Where a programme follows our own installation, it begins from the turnover package — equipment data, as-built drawings, the sequence of operation and the commissioning records — rather than from a fresh inspection of a building we have just finished. Where it follows someone else’s work, the first visits are partly a survey, and we say so rather than pricing them as routine.',
              'Either way the programme belongs to the building. If you move it elsewhere, the register and the service history go with it.',
            ],
          },
        ]}
      />

      <section className="max-w-6xl mx-auto px-4 md:px-6 pb-4">
        <div className="max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold">Three programme levels</h2>
          <p className="mt-4 text-neutral-700 leading-relaxed">
            Most buildings land on one of these three. They differ in how often we come and how
            deep each visit goes; every level produces the same written record, because a visit
            nobody can read afterwards is a visit you paid for twice.
          </p>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {LEVELS.map(level => (
            <article
              key={level.name}
              className="flex flex-col rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-xl font-bold">{level.name}</h3>
              <p className="mt-1 text-sm font-semibold text-slate-600">{level.visits}</p>
              <p className="mt-3 text-neutral-700 leading-relaxed">{level.fit}</p>
              <ul className="mt-5 space-y-3 text-sm text-neutral-700 leading-relaxed">
                {level.includes.map(item => (
                  <li key={item} className="flex gap-2.5">
                    <svg className="mt-[3px] h-4 w-4 shrink-0 text-[#5272c4]" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                      <path d="M7.5 13.5 3.8 9.8l1.4-1.4 2.3 2.3 6.3-6.3 1.4 1.4-7.7 7.7Z" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="mt-8 max-w-3xl space-y-4">
          <p className="text-neutral-700 leading-relaxed">
            Response targets and after-hours labour rates are agreed in the contract rather than
            advertised here. A number on a web page that dispatch cannot hold in February is worth
            less than none.
          </p>
          <h3 className="pt-2 text-xl font-bold">Contract terms, in plain words</h3>
          <p className="text-neutral-700 leading-relaxed">
            A twelve-month term that renews annually, with a written notice period either side. A
            fixed annual price covers the scheduled visits. Anything found during a visit is
            quoted before it is done, except for a small pre-approved threshold you set, so a
            twenty-minute fix does not wait a fortnight for a signature. The notice period, the
            invoicing schedule and that threshold are the three numbers to settle when the
            programme is written.
          </p>
          <h3 className="pt-2 text-xl font-bold">The records belong to the building</h3>
          <p className="text-neutral-700 leading-relaxed">
            Inventories, visit reports and as-builts are yours. If you change contractors, we hand
            them over — no fee, no delay. That is worth asking of whoever maintains your building
            now, because the answer decides how much of your building&rsquo;s history survives the
            change.
          </p>
        </div>
      </section>

      <ServiceSections
        sections={[]}
        reading={[
          { to: '/blog/preventive-maintenance-records-building-teams', label: 'Preventive maintenance records that help building teams', note: 'what a visit report should contain to be worth filing.' },
          { to: '/blog/project-turnover-om-package', label: 'What belongs in an O&M package', note: 'the documents a programme starts from.' },
          { to: '/blog/commissioning-and-handover', label: 'From startup to handover', note: 'how commissioning records become maintenance baselines.' },
          { to: '/blog/testing-balancing-programme', label: 'Why testing and balancing belongs in the programme', note: 'and why the balance report is worth keeping.' },
        ]}
      />
    </ServiceTemplate>
  );
}

/* ========= data =========
 *
 * Section 6a of the November 2026 page-copy plan. Two of its rows are not
 * here: the emergency response target and the after-hours rate, both
 * bracketed, and the plan's own note says to set them to what dispatch can
 * actually deliver before publishing. Nobody has. */
const LEVELS = [
  {
    name: 'Essential',
    visits: 'Two visits a year',
    fit: 'Pre-heating and pre-cooling season. The minimum that still catches a failing plant before the weather finds it.',
    includes: [
      'Boilers, domestic hot water, pumps and PRVs: inspect, test and clean',
      'Rooftop units, make-up air, air handlers and heat pumps: filter and belt check',
      'Backflow testing available as an add-on',
      'Written visit report with photographs',
      'Equipment inventory with a condition rating',
    ],
  },
  {
    name: 'Standard',
    visits: 'Quarterly',
    fit: 'The usual choice for a strata or a commercial building with a central plant and mixed equipment.',
    includes: [
      'Everything in Essential, plus combustion analysis on the plant',
      'Full preventive maintenance to the manufacturer schedule on air equipment',
      'Annual certified backflow testing included',
      'Annual DDC and BAS trend review',
      'Five-year capital forecast you can hand to a council or a budget committee',
    ],
  },
  {
    name: 'Complete',
    visits: 'Monthly, plus seasonal',
    fit: 'Buildings where a failure is expensive or disruptive — larger plants, district energy, and portfolios where the plant runs hard all year.',
    includes: [
      'Everything in Standard, plus water treatment testing',
      'Coil cleaning on air equipment',
      'Quarterly DDC and BAS trend review',
      'Capital forecast updated every year',
      'Priority dispatch',
    ],
  },
];
