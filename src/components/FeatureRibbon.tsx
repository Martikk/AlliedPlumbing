import { Link } from "react-router-dom";

type Props = {
  className?: string;
};

export default function FeatureRibbon({ className = "" }: Props) {
  // Можно заменить src на свои картинки (статичные из /public или CDN)
  const items = [
    {
      title: "Smart methods",
      text: "Techniques that reduce cost, time, and enhance project quality.",
      src: "/public/features/1.jpg",
    },
    {
      title: "Experienced team",
      text:
        "Led by seasoned professionals committed to precision and safety.",
      src: "/public/features/2.jpg",
    },
    {
      title: "Modern equipment",
      text: "From automated tools to heavy-duty machinery.",
      src: "/public/features/3.jpg",
    },
    {
      title: "Proven delivery",
      text:
        "Reliability and transparency from bid to handover.",
      src: "/public/features/4.jpg",
    },
  ];

  return (
    <div
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
              <h3 className="font-semibold">{it.title}</h3>
              <p className="mt-1 text-sm text-neutral-600">{it.text}</p>

              {/* Опционально — сделать весь блок кликабельным */}
              <Link
                to="/projects"
                className="sr-only focus:not-sr-only inline-block mt-3 px-3 py-2 rounded-lg border"
              >
                Learn more
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}