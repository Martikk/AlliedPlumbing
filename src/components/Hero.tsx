import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  slides: string[];        // пути из /public (например /hero/1.jpg)
  intervalMs?: number;     // автосмена
};

export default function Hero({ slides, intervalMs = 5500 }: Props) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % slides.length), intervalMs);
    return () => clearInterval(id);
  }, [slides.length, intervalMs]);

  return (
    <section className="relative overflow-hidden rounded-2xl">
      {/* СЛАЙДЫ */}
      <div className="relative h-[52vh] min-h-[380px] w-full">
        {slides.map((src, idx) => (
          <img
            key={src}
            src={src}
            alt=""
            aria-hidden={idx !== i}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${idx === i ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
        {/* лёгкий градиент для читабельности слева */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/10 to-transparent" />
      </div>

      {/* Оверлей-контент слева */}
      <div className="pointer-events-none absolute inset-0 flex">
        <div className="pointer-events-auto flex flex-col justify-center gap-6 p-6 md:p-10 lg:p-14 max-w-2xl">
          <h1 className="text-white font-extrabold leading-tight text-3xl md:text-5xl">
            Building Your Vision<br />with Strength & Precision
          </h1>
          <div>
            <Link
              to="/projects"
              className="inline-flex items-center rounded-lg bg-white text-neutral-900 px-4 py-3 font-medium shadow hover:opacity-90"
            >
              View our projects <span aria-hidden className="ml-2">↗</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Стрелки/индикаторы по желанию */}
      <div className="absolute bottom-4 right-4 hidden md:flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            className={`h-2 w-6 rounded-full ${idx === i ? 'bg-white' : 'bg-white/50'} hover:bg-white`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}