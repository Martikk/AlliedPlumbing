// src/pages/ServiceEmergency.tsx
import ServiceTemplate from "./ServiceTemplate";

export default function ServiceEmergency() {
  return (
    <ServiceTemplate
      title="24/7 Emergency Service"
      subtitle="06 / Rapid Response"
      description="On-call dispatch for leaks, no-heat or DHW outages, gas issues, and critical alarms — real people, real time, ready to move when you call."
      heroImg="https://res.cloudinary.com/dzytbkc5l/image/upload/v1760070439/Allied/247_bs1xho.png"
      highlights={[
        { label: "Average Dispatch", value: "<30 min" },
        { label: "Response Coverage", value: "24/7 / 365" },
      ]}
      bullets={[
        "Live dispatch — no call centers",
        "Leak detection & emergency isolation",
        "Boiler & HVAC outage triage",
        "Gas leak response and repair",
        "School & strata safe procedures",
      ]}
    />
  );
}