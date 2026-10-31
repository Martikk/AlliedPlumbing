// src/components/LogoMarquee.tsx
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import clsx from "clsx";

const logos = [
  { id: 1, src: "https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_1200/v1760074745/Allied/Rinnai_Logo_Red_uqwftm.png", alt: "Rinnai" },
  { id: 2, src: "https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_1200/v1760075323/Allied/download_y9tiqd.png", alt: "Daikin" },
  { id: 3, src: "https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_1200/v1760075211/Allied/Viessmann-Logo-1_ipdbjs.png", alt: "Viessmann" },
  { id: 4, src: "https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_1200/v1760074743/Allied/IBC-Logo-for-Gallery_hsklz0.webp", alt: "IBC" },
  // дубли для бесшовного скролла
  { id: 5, src: "https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_1200/v1760074745/Allied/Rinnai_Logo_Red_uqwftm.png", alt: "Rinnai" },
  { id: 6, src: "https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_1200/v1760074743/Allied/IBC-Logo-for-Gallery_hsklz0.webp", alt: "IBC" },
];

export default function LogoMarquee({
  className,
  height = 72,          // высота логотипа в px
  speedSec = 20,        // скорость полного круга
  grayscale = true,     // обесцвечивание логотипов
}: {
  className?: string;
  height?: number;
  speedSec?: number;
  grayscale?: boolean;
}) {
  const reducedMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  return (
    <section
      className={clsx("relative overflow-hidden py-6 md:py-8", className)}
      aria-label="Equipment brands"
    >
      {!reducedMotion && <button type="button" className="mb-4 rounded-lg border border-neutral-400 px-3 py-2 text-sm font-semibold" onClick={() => setPaused(value => !value)}>{paused ? "Play logo animation" : "Pause logo animation"}</button>}
      <motion.div
        className="flex items-center gap-16 w-[200%]"
        animate={{ x: reducedMotion || paused ? "0%" : ["0%", "-50%"] }}
        transition={{ ease: "linear", duration: speedSec, repeat: Infinity }}
      >
        {[...logos, ...logos].map((logo, idx) => (
          <div key={idx} className="flex-shrink-0 w-48 md:w-60 grid place-items-center">
            <img
              src={logo.src}
              alt={logo.alt}
              style={{ height }}
              className={clsx(
                "w-auto opacity-80 transition",
                grayscale && "grayscale hover:grayscale-0",
                "hover:opacity-100"
              )}
              loading="lazy"
            />
          </div>
        ))}
      </motion.div>

      {/* плавные края */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent" />
    </section>
  );
}