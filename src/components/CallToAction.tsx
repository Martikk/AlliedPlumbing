import { useEffect, useRef, useState } from 'react';
import { Link } from '../lib/navigation';

/** The same fade-up this band always had, done with a CSS transition and one
 *  IntersectionObserver instead of framer-motion. The library was pulled in
 *  for this single effect; the three other imports only wanted its
 *  reduced-motion hook.
 *
 *  Identical behaviour: opacity 0 → 1 with a 40 px rise, 600 ms, ease-out,
 *  once, when the band scrolls into view. The hidden state only applies under
 *  `html.js`, so the prerendered HTML and no-JS visitors see it immediately,
 *  and `prefers-reduced-motion` skips the movement (index.css). */
export default function CallToAction() {
  const band = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = band.current;
    if (!node) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShown(true);
        observer.disconnect();
      },
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-14">
      <div
        ref={band}
        data-reveal=""
        data-revealed={shown || undefined}
        className="relative overflow-hidden rounded-3xl max-w-6xl mx-auto"
      >
        <img
          src="https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_1200/v1760072887/Allied/Allied_1_n00b0m.png"
          alt=""
          width={1200}
          height={675}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />

        <div className="absolute inset-0 bg-neutral-900/60 backdrop-blur-[1px]" />

        <div className="relative z-10 flex flex-col items-center justify-center text-center text-white py-20 px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
            We build, we maintain, we care.
            <br />
            Let’s discuss your next project.
          </h2>

          <Link
            to="/quote"
            className="inline-flex items-center border border-white/80 text-white font-semibold rounded-md px-6 py-2 hover:bg-white hover:text-neutral-900 transition"
          >
            Get a Quote <span aria-hidden className="ml-2">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
