// src/pages/ServiceCommercial.tsx
import ServiceTemplate from "./ServiceTemplate";
import ServiceSections from "../components/ServiceSections";

/** 159 words before this, the thinnest page on the site, and the one a
 *  commercial or strata buyer is most likely to reach from a search.
 *
 *  Only one project page carries `relatedService: 'commercial-plumbing'`, so
 *  the case list below also links two buildings whose domestic hot water work
 *  is described on their own pages. Each note says what that page actually
 *  shows; none of them is presented as a plumbing-only project. */
export default function ServiceCommercial() {
  return (
    <ServiceTemplate
      title="Commercial & Institutional Plumbing"
      subtitle="03 / Plumbing"
      description="Backflows, PRVs, booster pumps, DHW plants, tenant improvements and school/strata programs — engineered for uptime and safety."
      heroImg="https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_1200/v1760065875/Allied/1_tc9jiy.png"
      highlights={[]}
      bullets={[
        "Backflow testing & certification",
        "PRVs / booster pump systems",
        "DHW plants, recirc & mixing valves",
        "Tenant improvements & fit-outs",
        "Strata / schools / municipal facilities",
      ]}
    >
      <ServiceSections
        sections={[
          {
            title: 'What the work covers',
            paragraphs: [
              'Domestic water and drainage in buildings that other people depend on daily — schools, strata and rental buildings, campuses and municipal facilities. That ranges from a domestic hot water plant serving a whole building to the pressure-reducing station, the booster set, the backflow assemblies, the recirculation loop and the mixing valves that decide whether hot water arrives at the right temperature on the top floor.',
              'Tenant improvements and fit-outs sit in the same bracket: new fixtures and branches tied into a live building, with the isolation, testing and reinstatement that implies.',
            ],
            list: [
              'Domestic hot water plants, storage, recirculation and mixing valves.',
              'Pressure-reducing stations and booster pump sets.',
              'Backflow prevention assemblies, with the test records the authority having jurisdiction expects.',
              'Domestic water distribution, drainage, venting and fixture work.',
              'Tenant improvements, fit-outs and small capital replacements in occupied space.',
            ],
          },
          {
            title: 'The water stays on for everyone else',
            paragraphs: [
              'Plumbing work in an occupied building is planned around the shutdown, not around the fixture. Which risers can be isolated, how long the building can be without domestic hot water, whether the work can be done overnight, what notice residents or a school office need, and whether temporary supply is required — those answers set the sequence.',
              'They also decide the risk. Changing a mixing valve or recommissioning a hot water plant changes delivered temperature, so scald protection has to be verified before the system is handed back, not after a complaint. In a rental high-rise we renewed heating, domestic hot water and make-up air with residents living in the building throughout, which is the normal case rather than the hard one.',
            ],
          },
          {
            title: 'What the building team is left holding',
            paragraphs: [
              'A plumbing scope closes with records, not just with working fixtures: valve and isolation locations marked up, test and disinfection results, backflow test reports, equipment data and warranties, and a walk-through with whoever will operate it. Where a preventive maintenance programme follows, it starts from those records instead of a fresh survey of the same building.',
            ],
          },
        ]}
        cases={[
          { to: '/projects/haro', label: '1755 Haro Street', note: 'a condensing plant serving both heating and domestic hot water for an apartment building.' },
          { to: '/projects/jervis', label: '945 Jervis Street', note: 'heating, domestic hot water and make-up air renewed in an occupied rental high-rise.' },
          { to: '/projects/halifax-7360', label: '7360 Halifax Street', note: 'a failed boiler replaced and tied back into the building’s controls.' },
        ]}
        reading={[
          { to: '/blog/hydronic-heating-domestic-hot-water', label: 'Hydronic heating and domestic hot water', note: 'two different building needs, often sharing one plant.' },
          { to: '/blog/haro-heating-hot-water-upgrade', label: 'Upgrading heating and hot water in an existing apartment building', note: 'the sequence from survey to restart.' },
          { to: '/blog/planning-heating-shutdown-occupied-building', label: 'Planning a shutdown in an occupied building', note: 'notice, temporary service and the restart.' },
          { to: '/blog/mechanical-upgrade-request-checklist', label: 'What to include in a mechanical upgrade request', note: 'so the first reply is a question about scope and not about basics.' },
        ]}
      />
    </ServiceTemplate>
  );
}
