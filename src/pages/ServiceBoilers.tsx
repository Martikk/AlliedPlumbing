// src/pages/ServiceBoilers.tsx
import ServiceTemplate from "./ServiceTemplate";
import ServiceSections from "../components/ServiceSections";

/** Boiler plant replacement is the scope with the most evidence behind it —
 *  eight project pages — and it shipped as five bullets and 179 words. The
 *  body below says nothing the project pages do not already describe. */
export default function ServiceBoiler() {
  return (
    <ServiceTemplate
      title="Boiler Plants & Controls"
      subtitle="05 / Heating Systems"
      description="Design, installation, and optimization of condensing boiler plants — integrating pumps, HX, tanks, and smart controls to maximize performance and efficiency."
      heroImg="https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_1200/v1760068155/Allied/10_kubptf.png"
      highlights={[]}
      bullets={[
        "Condensing boiler design and retrofits (IBC, Viessmann, Rheem)",
        "VFD pumps, expansion tanks, and heat exchangers",
        "Combustion analysis, tuning, and safety verification",
        "DDC and BAS integration for trend and alarm control",
        "Boiler sequencing and energy optimization upgrades",
      ]}
    >
      <ServiceSections
        sections={[
          {
            title: 'Replacing a plant inside a building that already exists',
            paragraphs: [
              'A boiler replacement is rarely only boilers. The new plant has to meet distribution that was sized for different equipment, often decades ago: existing mains and risers, radiation or unit ventilators at the far end of the building, a mechanical room with a door narrower than the units that are coming out. Condensing boilers also want return water cold enough to condense, which is a question about the distribution rather than about the boilers.',
              'So the scope usually reaches past the appliances — pumps and variable-speed drives, expansion and air separation, heat exchangers where systems have to stay apart, gas supply and venting, the electrical service feeding it all, and a flush of a system carrying years of debris before anything new is commissioned. Each of those can be the item that sets the schedule.',
            ],
            list: [
              'Load and sizing checked against the building as it is operated now, not against the plant being replaced.',
              'Venting and combustion air routed for a condensing appliance, including condensate drainage and neutralisation.',
              'Gas supply and metering confirmed for the new input, and the electrical service confirmed for pumps and controls.',
              'Rigging and access planned early — how the old plant leaves the room and the new one gets in.',
              'System cleaning and water treatment before commissioning, then combustion analysis and safety verification after it.',
            ],
          },
          {
            title: 'Keeping the building warm while you change what heats it',
            paragraphs: [
              'Almost every plant we replace is in a building that cannot go cold. In schools that usually means the work is cut to fit the summer, with a hard date when classrooms have to be warm again. In residential buildings it means a planned shutdown with notice to residents, and often temporary heat or temporary domestic hot water while the changeover happens.',
              'One of our current school plants is being built around single-phase site power, which changed the equipment selection rather than the schedule. Another was installed overnight so unit ventilator fans and controls could be renewed without taking classrooms out of use. These are the constraints that decide a mechanical schedule, and they belong in the conversation before a price does.',
            ],
          },
          {
            title: 'Controls are part of the plant, not an afterthought',
            paragraphs: [
              'A new plant that the building operator cannot see is a plant that will be run badly. Boiler sequencing, outdoor reset, pump control, alarms and trends have to land in the system the site already uses, and the controls contractor has to be in the sequence discussion while the mechanical work is still being planned. Where a building has no DDC yet, that is its own scope with its own lead time.',
              'We hand over the sequence of operation along with the equipment, and the startup, balancing and commissioning records that show the plant met it.',
            ],
          },
        ]}
        cases={[
          { to: '/projects/ridgeview', label: 'Ridgeview Elementary', note: 'a six-boiler heating plant upgrade alongside a classroom ventilation conversion.' },
          { to: '/projects/herbert-spencer', label: 'Herbert Spencer Elementary', note: 'condensing boilers, hydronic pumping and digital controls in one scope.' },
          { to: '/projects/west-5th', label: '456 West 5th Avenue', note: 'a heating boiler replacement inside an operating public-safety facility.' },
          { to: '/projects/glenayre', label: 'École Glenayre Elementary', note: 'a new plant and building-wide controls designed around single-phase site power.' },
          { to: '/projects/nestor', label: 'École Nestor Elementary', note: 'a high-efficiency plant with unit ventilator fans and controls renewed overnight.' },
          { to: '/projects/jervis', label: '945 Jervis Street', note: 'heating, domestic hot water and make-up air renewed with residents at home.' },
          { to: '/projects/halifax-7360', label: '7360 Halifax Street', note: 'a failed boiler replaced and tied back into the building’s controls.' },
        ]}
        reading={[
          { to: '/blog/boiler-replacement-or-repair', label: 'Boiler replacement or repair', note: 'the information a contractor needs before answering that question.' },
          { to: '/blog/boiler-plant-upgrade-ridgeview', label: 'What goes into a school boiler plant upgrade', note: 'the sequence from survey to handover.' },
          { to: '/blog/controls-boiler-plant-coordination', label: 'Coordinating controls during a boiler plant upgrade', note: 'who owns which part of the sequence.' },
          { to: '/blog/planning-heating-shutdown-occupied-building', label: 'Planning a heating shutdown in an occupied building', note: 'notice, temporary heat and the restart.' },
        ]}
      />
    </ServiceTemplate>
  );
}
