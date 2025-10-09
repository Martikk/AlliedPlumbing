import { motion } from "framer-motion";

const logos = [
  { id: 1, src: "/public/logos/logo.png", alt: "Quantum" },
  { id: 2, src: "/public/logos/logo.png", alt: "Chroma" },
  { id: 3, src: "/public/logos/logo.png", alt: "Spectrum" },
  { id: 4, src: "/public/logos/logo.png", alt: "Dynamo" },
  { id: 5, src: "/public/logos/logo.png", alt: "Quantum" }, // повтор для плавности
  { id: 6, src: "/public/logos/logo.png", alt: "Chroma" },
];

export default function LogoMarquee() {
  return (
    <section className="py-10 bg-neutral-50 overflow-hidden relative">
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
    className="flex-shrink-0 flex items-center justify-center w-60" // было w-48
  >
    <img
      src={logo.src}
      alt={logo.alt}
      className="h-22 w-auto grayscale opacity-70 hover:opacity-100 transition" // было h-10
    />
  </div>
))}
      </motion.div>

      {/* fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-neutral-50 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-neutral-50 to-transparent" />
    </section>
  );
}