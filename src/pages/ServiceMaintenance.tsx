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
