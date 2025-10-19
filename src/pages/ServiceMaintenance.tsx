// src/pages/ServiceMaintenance.tsx
import ServiceTemplate from "./ServiceTemplate";

export default function ServiceMaintenance() {
  return (
    <ServiceTemplate
      title="Preventive Maintenance Programs"
      subtitle="01 / Mechanical PM"
      description="Planned maintenance for peace of mind. Monthly, quarterly, and annual programs with DDC trend reviews, safety checks, and lifecycle forecasting — ensuring your systems run efficiently, safely, and within budget."
      heroImg="https://res.cloudinary.com/dzytbkc5l/image/upload/v1760074307/Allied/Gemini_Generated_Image_9on55p9on55p9on5_ga0mso.png"
      highlights={[
        { label: "Sites Monitored", value: "180+" },
        { label: "Avg. Response Time", value: "2 h" },
        { label: "Uptime Target", value: "99.5%" },
      ]}
      bullets={[
        "Custom PM checklists aligned with equipment type and manufacturer specs",
        "DDC trend reviews and performance optimization reports",
        "Capex forecasting and lifecycle planning tools",
        "Predictive alerts and pre-season inspections",
        "Detailed documentation for compliance and budgeting",
      ]}
    />
  );
}