// src/pages/ServiceBoiler.tsx
import ServiceTemplate from "./ServiceTemplate";

export default function ServiceBoiler() {
  return (
    <ServiceTemplate
      title="Boiler Plants & Controls"
      subtitle="05 / Heating Systems"
      description="Design, installation, and optimization of condensing boiler plants — integrating pumps, HX, tanks, and smart controls to maximize performance and efficiency."
      heroImg="https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_1200/v1760068155/Allied/10_kubptf.png"
      highlights={[
        { label: "Plants Installed", value: "400+" },
        { label: "Efficiency Range", value: "92–97%" },
      ]}
      bullets={[
        "Condensing boiler design and retrofits (IBC, Viessmann, Rheem)",
        "VFD pumps, expansion tanks, and heat exchangers",
        "Combustion analysis, tuning, and safety verification",
        "DDC and BAS integration for trend and alarm control",
        "Boiler sequencing and energy optimization upgrades",
      ]}
    />
  );
}