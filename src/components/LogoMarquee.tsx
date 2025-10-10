import { motion } from "framer-motion";

const logos = [
  { id: 1, src: "https://res.cloudinary.com/dzytbkc5l/image/upload/v1760074745/Allied/Rinnai_Logo_Red_uqwftm.png", alt: "Rinnai" },
  { id: 2, src: "https://res.cloudinary.com/dzytbkc5l/image/upload/v1760075323/Allied/download_y9tiqd.png", alt: "Daikin" },
  { id: 3, src: "https://res.cloudinary.com/dzytbkc5l/image/upload/v1760075211/Allied/Viessmann-Logo-1_ipdbjs.png", alt: "viessmann" },
  { id: 4, src: "https://res.cloudinary.com/dzytbkc5l/image/upload/v1760074743/Allied/IBC-Logo-for-Gallery_hsklz0.webp", alt: "IBC" },
  { id: 5, src: "https://res.cloudinary.com/dzytbkc5l/image/upload/v1760075211/Allied/Viessmann-Logo-1_ipdbjs.png", alt: "Rinnai" }, // повтор для плавности
  { id: 6, src: "https://res.cloudinary.com/dzytbkc5l/image/upload/v1760074743/Allied/IBC-Logo-for-Gallery_hsklz0.webp", alt: "IBC" },
];

export default function LogoMarquee() {
  return (
    <section className="py-10 overflow-hidden relative">
      <div className="max-w-7xl mx-auto mb-6 text-center">
        <h3 className="text-lg font-semibold text-neutral-600 tracking-wide uppercase">
          Trusted by Industry Leaders
        </h3>
      </div>

      <motion.div
        className="flex items-center gap-16 w-[200%]"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          ease: "linear",
          duration: 20,
          repeat: Infinity,
        }}
      >
        {[...logos, ...logos].map((logo, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 flex items-center justify-center w-60"
          >
            <img
              src={logo.src}
              alt={logo.alt}
              className="h-20 w-auto grayscale opacity-70 hover:opacity-100 transition"
            />
          </div>
        ))}
      </motion.div>

      {/* fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent" />
    </section>
  );
}