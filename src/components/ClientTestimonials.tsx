import { motion } from "framer-motion";
import { FaStar, FaRegStar } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "John Thompson",
    role: "Homeowner, GreenVista Eco Homes",
    text: "Working with Allied Plumbing was an exceptional experience. Their professionalism, timely delivery, and attention to detail truly set them apart. I couldn’t be happier with the final result!",
    rating: 4,
    image: "https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_1200/v1717289363/DreamDate/Mohan_bfss7q.jpg",
  },
  {
    id: 2,
    name: "Michael Harris",
    role: "Project Manager, Arcadia Rise",
    text: "Dependable and detail-oriented. The Allied team was fantastic to work with from start to finish.",
    rating: 5,
    image: "https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_1200/v1717289347/DreamDate/unnamed_1_dm93bq.png",
  },
  {
    id: 3,
    name: "Ethan Miller",
    role: "Developer, Metrolink Tower",
    text: "They handled everything efficiently, and the communication was always clear. Highly recommended!",
    rating: 5,
    image: "https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_1200/v1717289347/DreamDate/unnamed_xvfdz9.png",
  },
];

export default function ClientTestimonials() {
  return (
    <section className="bg-blue-50 rounded-3xl py-12 px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
        {/* LEFT SIDE — Heading */}
        <div className="flex flex-col items-start max-w-md">
          <span className="text-sm font-semibold uppercase tracking-wider text-neutral-600 mb-2">
            Our Clients
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 mb-6">
            Hear From Our Clients
          </h2>
          <a
            href="clients"
            className="bg-blue-600 text-white text-sm font-semibold px-6 py-2.5 rounded-md hover:bg-blue-700 transition"
          >
            View All →
          </a>
        </div>

        {/* RIGHT SIDE — Testimonials */}
        <div className="flex flex-col gap-6 w-full md:w-2/3">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              viewport={{ once: true }}
              className="flex items-start gap-4 bg-white rounded-xl shadow-sm p-6"
            >
              <img
                src={t.image}
                alt={t.name}
                className="w-16 h-16 rounded-full object-cover border border-neutral-200"
              />
              <div>
                <h3 className="text-lg font-semibold text-neutral-900">
                  {t.name}
                </h3>
                <p className="text-sm text-neutral-500 mb-3">{t.role}</p>
                <p className="text-neutral-700 mb-3">{t.text}</p>
                <div className="flex text-yellow-500">
                  {Array.from({ length: 5 }, (_, i) =>
                    i < t.rating ? <FaStar key={i} /> : <FaRegStar key={i} />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}