// src/pages/ServiceHeatPumps.tsx
import ServiceTemplate from './ServiceTemplate';
import ServiceSections from '../components/ServiceSections';
import FaqItem from '../components/FaqItem';
import JsonLd from '../components/JsonLd';
import { canonicalURL } from '../lib/site-url';

/** Section 5 of the November 2026 page-copy plan: the seventh service line,
 *  and the first new one since the six were written.
 *
 *  It earns a page of its own rather than a section on /services/boilers
 *  because the buyer is different. A boiler replacement is a renewal decision
 *  made from a depreciation report or a failure; a conversion is a
 *  fuel-switch decision made from an emissions target and an incentive
 *  programme, and it is lost or won on the building's emitter temperatures
 *  and electrical capacity rather than on the plant.
 *
 *  Three of the plan's figures are not published here. It claimed Herbert
 *  Spencer as "SD40's first school air-source heat pump plant", which it
 *  marked [confirm] and nothing in the repo supports; it named the mechanical
 *  engineer, marked [confirm OK to name], which needs the firm's permission;
 *  and it quantified the added electrical demand as [100-400 A], which
 *  depends entirely on the building. The two Herbert Spencer project pages
 *  are the evidence that is actually publishable, so they carry this page. */
export default function ServiceHeatPumps() {
  return (
    <ServiceTemplate
      title="Boiler-to-Heat-Pump Conversions"
      subtitle="07 / Electrification"
      description="Air-source heat pump and hybrid plants for buildings that already exist — sized to the emitters, the electrical service and the incentive programme, not to a catalogue."
      // The photography plan earmarks a heat pump array (prompts H4 and PC3)
      // for this page. Until it exists this reuses the rooftop frame the HVAC
      // page carries, rather than adding a seventh image to replace later.
      heroImg="https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_1200/v1760065876/Allied/3_gk4dl8.png"
      highlights={[]}
      bullets={[
        'Feasibility walkthrough, with a budget estimate for a hybrid and a full-electric option side by side',
        'Coordination with your mechanical engineer, or a design-assist role on smaller buildings',
        'Heat pumps, buffer tanks, hydronic re-piping, glycol or plate heat exchangers, controls and electrical coordination',
        'Quotes, equipment data and invoices in the format each incentive programme asks for',
        'Commissioning across a full heating season, with trend-log review of heat pump against boiler run hours',
      ]}
    >
      <ServiceSections
        sections={[
          {
            title: 'Three questions decide whether it works',
            paragraphs: [
              'Switching an existing building from gas boilers to heat pumps is a hydronic problem, an electrical problem and a scheduling problem at the same time, and the three are usually answered in the wrong order. The equipment selection is the last of them, not the first.',
              'What temperature do the emitters need? Air-to-water heat pumps run most efficiently at 45 to 55°C supply. A system designed around 82°C — which is most schools and towers built between the 1960s and the 1990s — needs either added emitter capacity, a lower reset curve the coldest rooms can still live with, or a boiler to carry the coldest hours. The honest answer sometimes rules out full electrification, and it is cheaper to find that out from a week of logged temperatures than from a first winter of complaints.',
              'Is there electrical capacity? A central heat pump plant adds demand on a scale that can require a service upgrade, and the service, the transformer and the utility’s own lead times decide the project schedule more often than the mechanical work does. That gets checked before the design is fixed rather than after.',
              'Where does the outdoor equipment go? Roof structure and crane access, sound at the property line, snow and drainage, and — on a school roof — working around the existing rooftop units inside the summer window.',
            ],
          },
          {
            title: 'Hybrid, full electric, or hot water first',
            paragraphs: [
              'Most existing buildings in Metro Vancouver land on a hybrid, and it is worth being clear about why: it is usually the cheapest way to remove most of the gas, not a compromise on ambition. Three arrangements cover nearly every building we are asked about.',
            ],
            list: [
              'Hybrid — the heat pump carries the base load and condensing boilers take over below the balance point and act as backup. The right answer for high-temperature emitters, limited electrical capacity, or a budget that has to land this year.',
              'Full electric with backup — heat pumps sized for the design day, with an electric boiler or element for redundancy. Needs spare electrical service, low-temperature emitters, and usually an emissions target driving it.',
              'Heat pump for domestic hot water preheat — a dedicated unit preheats domestic water ahead of the existing plant. Often the best first move in a rental or strata tower, where hot water demand is high and steady all year while space heating is seasonal.',
            ],
          },
          {
            title: 'Where we have done this',
            paragraphs: [
              'Herbert Spencer Elementary in New Westminster is the clearest example, because the two halves of it are written up separately. Allied installed the condensing boiler plant and the digital controls in an earlier phase; the air-source heat pump upgrade followed on the same building, using the plant and the controls already there. A recent condensing plant makes a good peak and backup plant in a hybrid, which is why the order those two phases happened in is the usual order.',
              'That is also why we now price a heat pump and a hybrid option alongside most of our boiler work, whether or not the owner asked for one. A building that replaces a plant without asking the question has decided against electrification for the next twenty years without meaning to.',
            ],
          },
          {
            title: 'Commissioning runs past the handover',
            paragraphs: [
              'A heat pump plant cannot be proved in a week. Balance points, reset curves and staging between the heat pump and the boilers behave differently in October than in January, and the trend logs are the only place that shows up. So commissioning on these projects runs across a heating season, with a trend review comparing heat pump run hours against boiler run hours and the control sequence adjusted against what the building actually did.',
              'It is also the only way to answer the question an owner will be asked afterwards: how much of the annual heat the heat pump actually carried. We would rather hand over that number than an estimate from the design stage.',
            ],
          },
        ]}
        cases={[
          {
            to: '/projects/herbert-spencer-ashp',
            label: 'Herbert Spencer Elementary — heat pump upgrade',
            note: 'an air-source heat pump conversion on a school that already had a condensing plant and controls.',
          },
          {
            to: '/projects/herbert-spencer',
            label: 'Herbert Spencer Elementary — boiler plant and controls',
            note: 'the earlier phase: condensing boilers, hydronic pumping and the digital controls the conversion was built on.',
          },
        ]}
        reading={[
          {
            to: '/blog/condensing-boiler-efficiency-older-buildings',
            label: 'Why your new condensing boiler isn’t condensing',
            note: 'the same return-temperature question that decides whether a heat pump will work at all.',
          },
          {
            to: '/blog/school-air-source-heat-pump-conversion',
            label: 'Planning a school air-source heat pump conversion',
            note: 'what the survey and the coordination look like on a school building.',
          },
          {
            to: '/blog/school-heat-pump-upgrade-discussion',
            label: 'Questions to settle before a school heat pump upgrade',
            note: 'the information a district needs in hand before the option can be priced.',
          },
        ]}
      />

      {/* Not a rich-result play — Google stopped showing FAQ results outside
          government and health in 2023. Bing and the answer engines read it,
          the questions are already on the page, and no answer here states a
          response time, a certification or an incentive amount. */}
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          '@id': `${canonicalURL('/services/heat-pump-conversions')}#faq`,
          mainEntity: FAQ.map(item => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: { '@type': 'Answer', text: item.a },
          })),
        }}
      />
      <section className="max-w-6xl mx-auto px-4 md:px-6 pb-12 md:pb-16">
        <div className="mb-6">
          <span className="inline-block text-xs md:text-sm px-3 py-1 rounded-full bg-neutral-100 text-neutral-600">
            FAQ
          </span>
          <h2 className="mt-3 text-2xl md:text-4xl font-extrabold">Questions owners ask first</h2>
        </div>
        <div className="divide-y divide-neutral-200 rounded-2xl border border-neutral-200 bg-white">
          {FAQ.map(item => (
            <FaqItem key={item.q} question={item.q}>
              {item.a}
            </FaqItem>
          ))}
        </div>
      </section>
    </ServiceTemplate>
  );
}

/* ========= data =========
 *
 * Published as FAQPage structured data above as well, so an answer that stops
 * being true is corrected in one place. None of these states an incentive
 * amount: the programmes change with their funding, and the incentives guide
 * is where a figure with a "last checked" date belongs. */
const FAQ = [
  {
    q: 'Will a heat pump heat our building on the coldest days in Vancouver?',
    a: 'Modern cold-climate air-to-water units keep producing heat well below freezing, but both capacity and efficiency fall as it gets colder. In Metro Vancouver a hybrid plant — sized so the heat pump carries most of the annual heat, with boilers covering the few coldest days — is usually the lowest-cost route. On the North Shore and in the Sea to Sky corridor we size for colder design temperatures.',
  },
  {
    q: 'What does it cost compared with a new boiler plant?',
    a: 'A conversion typically costs more up front than a like-for-like boiler replacement, and more again if the electrical service needs upgrading. Incentives can close part of that gap. We price both options side by side so installed cost, incentives and operating cost can be compared on the same page rather than in two separate conversations.',
  },
  {
    q: 'How long does a school conversion take?',
    a: 'Design and coordination with the electrical utility take months and start long before anything is ordered. On-site work is scheduled for the summer break, and commissioning finishes in the first heating weeks of the autumn — which is the point of starting in the autumn rather than ending there.',
  },
  {
    q: 'Can we keep our new condensing boilers?',
    a: 'Usually, yes. Recent condensing boilers make a good backup and peak plant in a hybrid, which is one reason a conversion is easier on a building whose plant has already been renewed. Whether the existing boilers stay depends on their age, their condition and how the balance point is set.',
  },
  {
    q: 'Who applies for the incentives?',
    a: 'The building owner applies. We supply the quotes, equipment specifications and invoices in the format each programme asks for. Most programmes require written pre-approval before a contract is signed or work starts, so the application comes before the order rather than after it.',
  },
];
