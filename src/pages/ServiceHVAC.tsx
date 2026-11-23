// src/pages/ServiceHVAC.tsx
import ServiceTemplate from "./ServiceTemplate";

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
    />
  );
}