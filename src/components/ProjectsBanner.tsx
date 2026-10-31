// src/components/ProjectsBanner.tsx
import { useMemo } from 'react';
import { useCarousel } from '../hooks/useCarousel';
import { responsiveImage } from '../lib/images';
import { Link } from 'react-router-dom';

type Project = { title: string; image: string; href: string };
type Props = { projects?: Project[]; autoMs?: number };

export default function ProjectsBanner({ autoMs = 6000, projects }: Props) {
  const items = useMemo<Project[]>(
    () =>
      projects ?? [
        { title: 'Garibaldi', image: 'https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_1200/v1760065876/Allied/3_gk4dl8.png', href: '/projects/garibaldi' },
        { title: 'Ridgeview', image: 'https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_1200/v1760071289/Allied/123_clbeb3.png', href: '/projects/ridgeview' },
        { title: 'Leigh', image: 'https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_1200/v1760071233/Allied/2025-10-09_21.40.08_wxp8bk.jpg', href: '/projects/leigh' },
        { title: 'Haro Street', image: 'https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_1200/v1760071564/Allied/2025-10-09_21.39.57_tne1oo.jpg', href: '/projects/haro' },
      ],
    [projects]
  );

  const carousel = useCarousel(items.length, autoMs);
  if (!items.length) return null;
  const i = carousel.index;

  return (
    <section aria-label="Featured projects" aria-roledescription="carousel" onFocusCapture={carousel.pause} onMouseEnter={carousel.pause} className="relative rounded-3xl bg-[#e6f0f7] px-5 py-10 md:px-8 md:py-12">
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
          <div className="px-2 py-3">
            <ProjectCard {...items[i]} active />
          </div>

          {/* Индикаторы */}
          <div className="mt-5 flex flex-wrap items-center gap-2 pl-2">
            {!carousel.reducedMotion && <button type="button" onClick={carousel.toggle} className="min-h-11 rounded-lg border border-slate-400 px-3 text-sm font-semibold">{carousel.paused ? 'Play projects' : 'Pause projects'}</button>}
            {items.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-pressed={idx === i}
                onClick={() => carousel.select(idx)}
                className={`h-11 w-11 border-2 border-white rounded-full transition-colors ${idx === i ? 'bg-slate-800' : 'bg-slate-300'}`}
                aria-label={`Go to project ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

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
        group relative block
        w-full aspect-[4/3]
        [clip-path:polygon(8%_0,100%_0,92%_100%,0_100%)]
        rounded-[1.25rem] shadow-md
        transition-transform duration-300
        hover:-translate-y-1 hover:shadow-lg
        ${active ? 'rotate-0' : 'rotate-2'}
      `}
      style={{ transformOrigin: 'center bottom' }}
    >
      <img src={responsiveImage(image, 900)} alt="" width={900} height={675} loading="lazy" className="absolute inset-0 h-full w-full object-cover rounded-[1.25rem]" />

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