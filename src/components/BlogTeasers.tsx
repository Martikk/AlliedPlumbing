import { motion } from "framer-motion";
import { Link } from "react-router-dom";

type Post = {
  id: string;
  date: string;
  title: string;
  href: string;
  image: string;
};

const posts: Post[] = [
  {
    id: "p1",
    date: "10 May, 2025",
    title: "Building Strong Foundations, Why It Matters",
    href: "/blog/foundations",
    image: "/public/blog/1.jpg",
  },
  {
    id: "p2",
    date: "10 May, 2025",
    title: "Top 5 Modern Construction Materials in 2025",
    href: "/blog/materials-2025",
    image: "/public/blog/1.jpg",
  },
  {
    id: "p3",
    date: "10 May, 2025",
    title: "Technology That’s Changing the Game",
    href: "/blog/tech-changing-game",
    image: "/public/blog/1.jpg",
  },
];

export default function BlogTeasers() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-14">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Get More Update from
            <br /> Blog and Articles
          </h2>
        </div>
        <Link
          to="/blog"
          className="shrink-0 inline-flex items-center rounded-md bg-neutral-900 text-white px-4 py-2 font-semibold hover:opacity-90"
        >
          View all <span aria-hidden className="ml-2">↗</span>
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((p, idx) => (
          <motion.article
            key={p.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08, duration: 0.45, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            className="relative"
          >
            {/* ВЕРХНЯЯ НАКЛОНЁННАЯ КАРТИНКА */}
            <Link
              to={p.href}
              className="group block relative rounded-2xl overflow-visible"
            >
              <div className="relative clip-tilt rounded-2xl overflow-hidden shadow-sm">
                <img
                  src={p.image}
                  alt={p.title}
                  className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  loading="lazy"
                  decoding="async"
                />
                {/* soft vignette */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-black/0" />
                {/* дата */}
                <div className="absolute left-4 top-4">
                  <span className="rounded-full bg-white/90 backdrop-blur px-3 py-1 text-[12px] font-medium text-neutral-800 shadow">
                    {p.date}
                  </span>
                </div>
              </div>

              {/* НИЖНЯЯ ПАНЕЛЬ С ТАЙТЛОМ — тоже “скошенная” */}
              <div className="clip-tilt rounded-xl bg-neutral-100 mt-3 px-5 py-3 flex items-center justify-between text-[15px] font-medium text-neutral-800 shadow-sm transition-colors group-hover:bg-neutral-200">
                <span className="line-clamp-2 pr-3">{p.title}</span>
                <span aria-hidden className="ml-2">↗</span>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  );
}