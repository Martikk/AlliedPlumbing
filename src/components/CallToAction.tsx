import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function CallToAction() {
  return (
    <section className="py-14">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-3xl max-w-6xl mx-auto"
      >
        {/* background image */}
        <img
          src="https://res.cloudinary.com/dzytbkc5l/image/upload/v1715994394/image4_s0levq.jpg"
          alt="Construction site"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />

        {/* overlay */}
        <div className="absolute inset-0 bg-neutral-900/60 backdrop-blur-[1px]" />

        {/* content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center text-white py-20 px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
            Ready to build your dream?
            <br />
            Schedule your consultation today!
          </h2>

          <Link
            to="/contact"
            className="inline-flex items-center border border-white/80 text-white font-semibold rounded-md px-6 py-2 hover:bg-white hover:text-neutral-900 transition"
          >
            Get Estimated Rate <span aria-hidden className="ml-2">↗</span>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}