import { Link } from "../lib/navigation";

type Props = {
  className?: string;
};

export default function FeatureRibbon({ className = "" }: Props) {
  // Можно заменить src на свои картинки (статичные из /public или CDN)
  const items = [
    {
      title: "Smart methods",
      text: "Efficient, engineered solutions that save time and cost while ensuring flawless results.From value-driven plumbing layouts to HVAC system optimization, every project starts with planning that minimizes downtime and maximizes performance.",
      src: "https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_1200/v1760068455/Allied/Screenshot_2025-10-09_at_8.53.56_PM_hjz9a5.png",
    },
    {
      title: "Experienced team",
      text:
        "Led by certified trades and project managers who value precision, safety, and accountability.Our crews bring years of on-site expertise — from mechanical retrofits to new builds — delivering craftsmanship that stands the test of time.",
      src: "https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_1200/v1760068155/Allied/10_kubptf.png",
    },
    {
      title: "Modern equipment",
      text: "Advanced tools and technology for accuracy, speed, and safety.From hydraulic crimping and pipe fusion to DDC commissioning and crane lifts, we invest in equipment that keeps every project running efficiently and safely.",
      src: "https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_1200/v1760068155/Allied/11_r4dgo3.png",
    },
    {
      title: "Proven delivery",
      text:
        "Trusted performance from first bid to final handover.We stand for clear communication, reliable scheduling, and transparent execution — ensuring every client receives exactly what was promised, on time and on budget.",
      src: "https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_1200/v1760068156/Allied/14_urnogx.png",
    },
  ];

  return (
    <section aria-label="Our approach"
      className={
        "relative z-20 max-w-6xl mx-auto px-4 md:px-6 " + className
      }
    >
      <div className="grid gap-4 md:grid-cols-4">
        {items.map((it, idx) => (
          <article
            key={idx}
            className="
              group rounded-2xl overflow-hidden border bg-white/95 backdrop-blur
              shadow-sm
              transition-transform transition-shadow duration-300 ease-out
              motion-safe:hover:scale-[1.03] hover:shadow-xl
              motion-reduce:transform-none motion-reduce:transition-none
              focus-within:ring-2 focus-within:ring-red-500
            "
          >
            {/* верхняя картинка */}
            <div className="aspect-[16/9] overflow-hidden">
              <img
                src={it.src}
                alt=""
                className="
                  h-full w-full object-cover
                  transition-transform duration-500 ease-out
                  motion-safe:group-hover:scale-105
                  motion-reduce:transform-none
                "
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* текст */}
            <div className="p-4">
              <h2 className="font-semibold">{it.title}</h2>
              <p className="mt-1 text-sm text-neutral-600">{it.text}</p>

              {/* Опционально — сделать весь блок кликабельным */}
              <Link
                to="/projects"
                className="sr-only focus:not-sr-only inline-block mt-3 px-3 py-2 rounded-lg border"
              >
                Explore our projects
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}