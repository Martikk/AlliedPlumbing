// src/pages/ServiceEmergency.tsx
import ServiceTemplate from "./ServiceTemplate";

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
    />
  );
}