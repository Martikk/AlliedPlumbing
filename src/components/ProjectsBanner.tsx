// src/components/ProjectsBanner.tsx
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

type Project = { title: string; image: string; href: string };
type Props = { projects?: Project[]; autoMs?: number };

export default function ProjectsBanner({ autoMs = 6000, projects }: Props) {
  const items = useMemo<Project[]>(
    () =>
      projects ?? [
        { title: 'The Arcadia Rise', image: 'https://res.cloudinary.com/dzytbkc5l/image/upload/v1760065876/Allied/3_gk4dl8.png', href: '/projects/ridgevie' },
        { title: 'Metrolink Business Tower', image: 'https://res.cloudinary.com/dzytbkc5l/image/upload/v1760071289/Allied/123_clbeb3.png', href: '/projects/ridgeview' },
        { title: 'GreenVista Eco Homes', image: 'https://res.cloudinary.com/dzytbkc5l/image/upload/v1760071233/Allied/2025-10-09_21.40.08_wxp8bk.jpg', href: '/projects/leigh' },
        { title: 'GreenVista Eco Homes', image: 'https://res.cloudinary.com/dzytbkc5l/image/upload/v1760071564/Allied/2025-10-09_21.39.57_tne1oo.jpg', href: '/projects/leigh' },
      ],
    [projects]
  );

  const [i, setI] = useState(0);

  useEffect(() => {
    if (items.length <= 1 || autoMs <= 0) return;
    const id = setInterval(() => setI((v) => (v + 1) % items.length), autoMs);
    return () => clearInterval(id);
  }, [items.length, autoMs]);

  return (
    <section className="relative rounded-3xl bg-[#e6f0f7] px-5 py-10 md:px-8 md:py-12">
      <div className="mx-auto max-w-7xl grid gap-10 lg:grid-cols-[1fr,1.2fr] items-center">
        {/* LEFT */}
        <div>
          <div className="tracking-[0.2em] text-xs font-semibold text-slate-500 mb-3">OUR PROJECTS</div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-slate-900">
            Quality that speaks
            <br />
            through our work.
          </h2>
          <p className="mt-4 text-slate-600 max-w-xl">
            Over the years, we&apos;ve completed a wide range of successful residential, commercial, and industrial
            projects.
          </p>

          <Link
            to="/projects"
            className="mt-6 inline-flex items-center rounded-xl bg-[#3b67c6] text-white px-5 py-3 font-semibold shadow hover:opacity-95"
          >
            Explore all <span aria-hidden className="ml-2">↗</span>
          </Link>
        </div>

        {/* RIGHT (slider) */}
        <div className="relative md:pl-2 md:pr-6 overflow-hidden">
          {/* Карточки: ширину фиксируем переменной, чтобы сдвиг считать точно */}
          <div
            className="flex gap-6 pl-4 md:pl-8 will-change-transform transition-transform duration-500 ease-out"
            style={
              {
                // --card: визуальная ширина одной карточки (проценты от контейнера)
                // На мобильных карточка шире, на десктопе уже.
                // transform: смещаем на i * (--card + gap).
                ['--card' as any]: '60%', // base, переопределим ниже через @container/брейкпоинт
                transform: `translateX(calc(${i} * -1 * (var(--card) + 1.5rem)))`,
              } as React.CSSProperties
            }
          >
            {items.map((p, idx) => (
              <ProjectCard key={p.title} {...p} active={idx === i} />
            ))}
          </div>

          {/* Индикаторы */}
          <div className="mt-5 flex items-center gap-4 pl-4 md:pl-8">
            {items.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                className={`h-1.5 w-14 rounded-full transition-colors ${idx === i ? 'bg-slate-800' : 'bg-slate-300'}`}
                aria-label={`Go to project ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Адаптивная подстройка ширины карточек через встроенный <style> (без Tailwind-плагинов) */}
      <style>{`
        @media (min-width: 640px) { /* sm */
          section:has(> div) div[style] { --card: 52%; }
        }
        @media (min-width: 768px) { /* md */
          section:has(> div) div[style] { --card: 44%; }
        }
        @media (min-width: 1024px) { /* lg */
          section:has(> div) div[style] { --card: 36%; }
        }
      `}</style>
    </section>
  );
}

function ProjectCard({
  title,
  image,
  href,
  active,
}: Project & { active?: boolean }) {
  return (
    <Link
      to={href}
      className={`
        group relative shrink-0
        w-[var(--card)] aspect-[4/3]
        [clip-path:polygon(8%_0,100%_0,92%_100%,0_100%)]
        rounded-[1.25rem] shadow-md
        transition-transform duration-300
        hover:-translate-y-1 hover:shadow-lg
        ${active ? 'rotate-0' : 'rotate-2'}
      `}
      style={{ transformOrigin: 'center bottom' }}
    >
      <img src={image} alt={title} className="absolute inset-0 h-full w-full object-cover rounded-[1.25rem]" />

      <div
        className="
          absolute bottom-3 left-3 right-3
          rounded-xl bg-[rgba(45,45,45,0.72)] text-white
          px-4 py-2.5 text-base font-medium
          flex items-center justify-between
          backdrop-blur-sm
        "
      >
        <span className="truncate">{title}</span>
        <span aria-hidden className="ml-3">↗</span>
      </div>

      <div className="absolute -bottom-2 left-4 right-4 h-3 rounded-full bg-black/10 blur-[2px] pointer-events-none" />
    </Link>
  );
}