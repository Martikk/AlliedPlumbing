// src/pages/ServiceResidential.tsx
import { motion } from "framer-motion";
import ServiceTemplate from "./ServiceTemplate";

export default function ServiceResidential() {
  return (
    <ServiceTemplate
      title="Residential Plumbing"
      subtitle="02 / Plumbing"
      description="Repairs, fixture replacements, repipes, and tankless installations — all delivered with craftsmanship, precision, and respect for your home."
      heroImg="https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_1200/v1760068156/Allied/14_urnogx.png"
      highlights={[]}
      bullets={[
        "Repairs & rough-ins — done right the first time",
        "Tankless installations with high-efficiency systems",
        "PEX and copper repiping",
      ]}
    >
      <ExtraContent />
    </ServiceTemplate>
  );
}

/* ===== ADDITIONAL PREMIUM SECTION ===== */
function ExtraContent() {
  return (
    <section className="max-w-6xl mx-auto px-4 md:px-6 pb-16 md:pb-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left side – copy */}
        <div>
          <h2 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4">
            Where precision meets comfort.
          </h2>
          <p className="text-neutral-600 text-lg mb-5 max-w-prose">
            Every home deserves systems that simply work — quietly, reliably, and efficiently. 
            Our residential division blends craftsmanship with modern diagnostic tools to ensure 
            your plumbing stands the test of time.
          </p>

          <ul className="space-y-3 text-neutral-700">
            {[
              "Fixture installation and testing",
              "Smart home ready (tankless + sensors)",
              "Clean job sites — zero drywall dust policy",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <svg
                  className="h-5 w-5 text-[#5272c4] mt-[3px]"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M7.5 13.5 3.8 9.8l1.4-1.4 2.3 2.3 6.3-6.3 1.4 1.4-7.7 7.7Z" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Right side – animated image collage */}
        <div className="relative grid grid-cols-2 gap-4">
          <motion.img
            src="https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_1200/v1760074743/Allied/IBC-Logo-for-Gallery_hsklz0.webp"
            alt="High-efficiency systems"
            className="rounded-2xl object-cover h-56 md:h-64 shadow-lg"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          />
          <motion.img
            src="https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_1200/v1760074745/Allied/Rinnai_Logo_Red_uqwftm.png"
            alt="Tankless water heater install"
            className="rounded-2xl object-cover h-56 md:h-64 shadow-lg"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          />
          <motion.img
            src="https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_1200/v1760074307/Allied/Gemini_Generated_Image_9on55p9on55p9on5_ga0mso.png"
            alt="Repiping system detail"
            className="col-span-2 rounded-2xl object-cover h-60 md:h-72 shadow-xl"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          />
        </div>
      </div>

      {/* subtle divider */}
      <div className="mt-16 border-t border-neutral-200 pt-10 text-center">
        <p className="text-neutral-600 text-sm tracking-wide uppercase">
          Certified Technicians • School-Approved Crews • Guaranteed Workmanship
        </p>
      </div>
    </section>
  );
}