// src/pages/ServiceHVAC.tsx
import ServiceTemplate from "./ServiceTemplate";

export default function ServiceHVAC() {
  return (
    <ServiceTemplate
      title="HVAC (RTU, MUA, AHU, Heat Pumps, VRF)"
      subtitle="04 / Air Systems"
      description="Design, installation, and service of advanced HVAC systems — RTU, MUA, AHU, heat pumps, and VRF — built for comfort, efficiency, and DDC integration."
      heroImg="https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_1200/v1760065876/Allied/3_gk4dl8.png"
      highlights={[
        { label: "Systems Commissioned", value: "950+" },
        { label: "Energy Savings", value: "up to 35%" },
      ]}
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