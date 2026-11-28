// src/pages/ServiceEmergency.tsx
import ServiceTemplate from "./ServiceTemplate";
import ServiceSections from "../components/ServiceSections";

/** The highest-intent page on the site, and it shipped 173 words.
 *
 *  Two things it deliberately does not say. No response time or coverage
 *  radius is stated anywhere — that is Q6, still unanswered, and a number
 *  invented here would be a promise nobody agreed to keep. And no gas
 *  emergency phone number is printed, because publishing a safety number we
 *  have not verified is worse than telling the reader to leave the building
 *  and call from outside. */
export default function ServiceEmergency() {
  return (
    <ServiceTemplate
      title="24/7 Emergency Service"
      subtitle="06 / Rapid Response"
      description="On-call dispatch for leaks, no-heat or DHW outages, gas issues, and critical alarms — real people, real time, ready to move when you call."
      heroImg="https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_1200/v1760070439/Allied/247_bs1xho.png"
      highlights={[]}
      bullets={[
        "Emergency service coordination",
        "Leak detection & emergency isolation",
        "Boiler & HVAC outage triage",
        "Gas leak response and repair",
        "School & strata safe procedures",
      ]}
    >
      <ServiceSections
        sections={[
          {
            title: 'Call, do not use the form',
            paragraphs: [
              'The enquiry form on this site goes to an inbox and is answered within a business day. That is the wrong channel for water coming through a ceiling or a school with no heat on a Monday morning. For anything urgent, call 604-731-1000.',
              'If you can smell gas, leave the building first and call from outside — the gas utility’s 24-hour emergency line, or 911. Do not switch anything on or off on the way out, including light switches, and do not wait for a contractor before you evacuate. Call us once the building is safe and the utility has been notified.',
            ],
          },
          {
            title: 'What we need in the first minute',
            paragraphs: [
              'An emergency call is triaged before anyone is dispatched, and the quality of that triage depends entirely on what you can tell us. Four things matter more than the rest:',
            ],
            list: [
              'The building address, and how to get in out of hours — door codes, keys, whether a caretaker or security is on site.',
              'What has failed: no heat, no hot water, a leak, a flood, a gas smell, a plant alarm.',
              'Whether it has been isolated, and whether you know where the isolation valve or the main shut-off is.',
              'Who is on site and reachable, and whether occupants, classrooms or units are affected right now.',
            ],
          },
          {
            title: 'What the first visit is for',
            paragraphs: [
              'An out-of-hours attendance is about stopping the damage and getting the building back to something workable: isolating the failure, draining or containing water, restoring heat or hot water temporarily where the permanent fix cannot happen that night, and making anything unsafe safe. Parts availability at 2 AM is what it is, so a temporary measure is often the right answer rather than a compromise.',
              'What follows is a written account of what was found and what was done, and a scope for the permanent repair. If that repair turns out to be a plant replacement rather than a part, it is quoted as a project, with the same shutdown planning any other project would get — not decided in the middle of the night.',
            ],
          },
          {
            title: 'Schools, stratas and buildings with their own rules',
            paragraphs: [
              'An occupied building usually has procedures that apply even in an emergency: who may be called out of hours, which areas crews may enter, whether a caretaker must be present, how residents or staff are notified, and what has to be recorded afterwards. We would rather have those written down before the first call than work them out during it.',
              'If your building has an after-hours procedure, send it with your contact details and we will hold it against the address.',
            ],
          },
        ]}
        reading={[
          { to: '/blog/working-in-occupied-schools-and-buildings', label: 'Working in occupied schools and buildings', note: 'access, notice and the rules that still apply out of hours.' },
          { to: '/blog/boiler-replacement-or-repair', label: 'Boiler replacement or repair', note: 'what decides it once the immediate failure is contained.' },
          { to: '/blog/planning-heating-shutdown-occupied-building', label: 'Planning a heating shutdown in an occupied building', note: 'for the permanent fix that follows the call-out.' },
        ]}
      />
    </ServiceTemplate>
  );
}
