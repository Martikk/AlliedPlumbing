// src/pages/ServiceHVAC.tsx
import ServiceTemplate from "./ServiceTemplate";
import ServiceSections from "../components/ServiceSections";

/** Ten project pages sit behind this scope and the page carried 182 words.
 *  Everything below is drawn from those pages and the articles about them. */
export default function ServiceHVAC() {
  return (
    <ServiceTemplate
      title="Commercial HVAC for schools and commercial buildings"
      subtitle="04 / Air Systems"
      description="RTU, MUA, AHU, unit ventilators, heat pumps and VRF across Metro Vancouver — designed, installed and serviced around the people still using the building, with DDC integration to Delta, Reliable and Trane."
      heroImg="https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_1200/v1760065876/Allied/3_gk4dl8.png"
      highlights={[]}
      bullets={[
        "RTU / MUA / AHU installs & retrofits",
        "Heat pumps & VRF multi-zone systems",
        "DDC integration with Delta / Reliable / Trane",
        "Air balance & performance verification",
        "Smart trending & fault diagnostics",
      ]}
    >
      <ServiceSections
        sections={[
          {
            title: 'What the work covers',
            paragraphs: [
              'Rooftop units, make-up air and air-handling units, classroom unit ventilators, exhaust systems, air-source heat pumps, VRF and chilled water — installed new, replaced at end of life, or converted from one kind of system to another. Air-side work almost always arrives with water-side and electrical work attached, and with controls that have to recognise the new equipment.',
              'Cooling added to a building that never had it is the request we see most often in schools. It is rarely a matter of hanging equipment: a chiller needs structure to stand on, power that exists, a path for piping, and a plan for the heat it rejects.',
            ],
            list: [
              'Rooftop units, make-up air units and air handlers, including curb adaptation and structural review.',
              'Unit ventilator replacement in occupied classrooms, with the hydronic and electrical work that follows.',
              'Air-source heat pumps and VRF, including conversions from gas heating.',
              'Chillers, cooling towers and chilled-water distribution.',
              'Ductwork, exhaust, controls integration, and testing, adjusting and balancing on completion.',
            ],
          },
          {
            title: 'Rooftop equipment decides the schedule more often than the equipment does',
            paragraphs: [
              'Landing a chiller on a downtown roof is a logistics scope wearing a mechanical hat. It needs a structural review of what the roof can carry, a crane position that exists on a real street, a street-use closure from the City, a roofing trade to open and close the membrane, and a day when the building below can be kept clear. On one downtown school that meant two Sunday lifts, permitted separately.',
              'None of that is visible in an equipment schedule, which is why we raise it during the scope discussion rather than after award.',
            ],
          },
          {
            title: 'Classrooms and campuses that stay in use',
            paragraphs: [
              'School HVAC work is shaped by the calendar before anything else: a summer window with a fixed end, or term-time work that has to leave every classroom usable the next morning. Campus work can be tighter still — the two chillers at Capilano University were changed over inside 2–6 AM shutdowns so the academic timetable was never interrupted.',
              'Distance adds its own constraint. A Whistler school upgrade is planned around the delivery window, crew travel and a short season, and those decisions are made when the programme is written, not when the trucks are loaded.',
              'Whatever the window, the system has to be proved before we leave it: startup, air balance, controls verification and the trend data that shows the building is running the way the sequence says it should.',
            ],
          },
        ]}
        cases={[
          { to: '/projects/crosstown', label: 'Crosstown Elementary, Phase 1', note: 'a rooftop chiller and new cooling plant for an occupied downtown school.' },
          { to: '/projects/crosstown-phase-2', label: 'Crosstown Elementary, Phase 2', note: 'air-handling and terminal work completing the cooling conversion.' },
          { to: '/projects/capilano-birch', label: 'Capilano University, Birch Building', note: 'two end-of-life chillers replaced on overnight campus shutdowns.' },
          { to: '/projects/collingwood', label: 'Collingwood School', note: 'a new chiller and air-handling cooling delivered across two phases.' },
          { to: '/projects/hillcrest', label: 'Hillcrest Middle School', note: 'rooftop units and exhaust fans replaced at a busy middle school.' },
          { to: '/projects/myrtle-philip', label: 'Myrtle Philip Community School', note: 'heating and ventilation upgraded for a mountain-community school in Whistler.' },
          { to: '/projects/leigh', label: 'Leigh Elementary', note: 'unit ventilator replacement with rooftop air handling and hydronic work.' },
        ]}
        reading={[
          { to: '/blog/planning-school-hvac-upgrades', label: 'Planning a school HVAC upgrade around the school day', note: 'how the calendar shapes the programme.' },
          { to: '/blog/rooftop-chiller-downtown-vancouver', label: 'Landing a rooftop chiller in downtown Vancouver', note: 'crane, permits and the Sunday lift.' },
          { to: '/blog/preparing-chiller-replacement', label: 'Preparing a building for a chiller replacement', note: 'what to confirm before the equipment is ordered.' },
          { to: '/blog/school-air-source-heat-pump-conversion', label: 'Converting school heating to air-source heat pumps', note: 'what changes when the gas plant stops being the primary source.' },
          { to: '/blog/testing-balancing-programme', label: 'Why testing and balancing belongs in the programme', note: 'and what it cannot fix afterwards.' },
        ]}
      />
    </ServiceTemplate>
  );
}
