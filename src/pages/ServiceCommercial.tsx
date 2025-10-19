// src/pages/ServiceCommercial.tsx
import ServiceTemplate from "./ServiceTemplate";

export default function ServiceCommercial() {
  return (
    <ServiceTemplate
      title="Commercial & Institutional Plumbing"
      subtitle="03 / Plumbing"
      description="Backflows, PRVs, booster pumps, DHW plants, tenant improvements and school/strata programs — engineered for uptime and safety."
      heroImg="https://res.cloudinary.com/dzytbkc5l/image/upload/v1760065875/Allied/1_tc9jiy.png"
      highlights={[
        { label: "Sites Served", value: "1.6k+" },
        { label: "SLA On-Time", value: "98%" },
        { label: "Certified Techs", value: "90+" },
      ]}
      bullets={[
        "Backflow testing & certification",
        "PRVs / booster pump systems",
        "DHW plants, recirc & mixing valves",
        "Tenant improvements & fit-outs",
        "Strata / schools / municipal facilities",
      ]}
    />
  );
}