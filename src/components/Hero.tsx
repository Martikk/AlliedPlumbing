// src/components/Hero.tsx
import { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { navClasses } from '@/utils/nav';

type Props = { slides: string[]; intervalMs?: number };

export default function Hero({ slides, intervalMs = 5500 }: Props) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI(v => (v + 1) % slides.length), intervalMs);
    return () => clearInterval(id);
  }, [slides.length, intervalMs]);

  return (
    <section className="relative w-screen overflow-hidden">
      {/* SLIDES */}
      <div className="relative h-[88vh] min-h-[560px] w-full">
        {slides.map((src, idx) => (
          <img
            key={src}
            src={src}
            alt=""
            aria-hidden={idx !== i}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              idx === i ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        {/* readable overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
      </div>

      {/* RED STRIP */}
<div className="absolute top-0 left-0 w-full bg-red-600 text-white text-center text-sm font-semibold py-1.5 z-30">
  <div className="relative flex items-center justify-center">
    {/* Allied Plumbing — слева, крупнее */}
    <span className="absolute left-4 md:left-6 font-extrabold text-base md:text-lg">
      Allied Plumbing, Heating & Air Conditioning
    </span>

    {/* остальной текст по центру */}
    <div>
      24/7 Emergency:{' '}
      <a
        href="tel:604-731-1000"
        className="underline hover:text-neutral-100"
      >
        604-731-1000
      </a>
      {' '}— calls us
    </div>
  </div>
</div>

      {/* NAV + CTA over hero (sticks right under the red strip) */}
      <div className="absolute left-0 w-full z-20" style={{ top: 40 }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6">
          <nav className="mx-auto flex gap-2 md:gap-4 bg-white/90 backdrop-blur rounded-full px-3 py-1.5 shadow">
            <NavLink to="/" end className={({ isActive, isPending }) => navClasses(isActive, isPending)}>
              Home
            </NavLink>
            <NavLink to="/about" className={({ isActive, isPending }) => navClasses(isActive, isPending)}>
              About
            </NavLink>
            <NavLink to="/services" className={({ isActive, isPending }) => navClasses(isActive, isPending)}>
              Services
            </NavLink>
            <NavLink to="/projects" className={({ isActive, isPending }) => navClasses(isActive, isPending)}>
              Projects
            </NavLink>
            <NavLink to="/contact" className={({ isActive, isPending }) => navClasses(isActive, isPending)}>
              Contact us
            </NavLink>
          </nav>

          {/* Get a quote — same look as "View our projects" */}
          <Link
            to="/contact"
            className="hidden md:inline-flex items-center rounded-lg bg-white text-neutral-900 px-5 py-3 font-semibold shadow hover:bg-neutral-200 ml-3" // ← same as View button
          >
            Get a quote <span aria-hidden className="ml-2">↗</span>
          </Link>
        </div>
      </div>

      {/* HEADLINE + PRIMARY CTA */}
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl px-4 md:px-6">
          <h1 className="text-white font-extrabold leading-tight text-4xl md:text-6xl lg:text-7xl mb-6 drop-shadow">
            Building Your Vision<br />with Strength &amp; Precision
          </h1>
          <Link
            to="/projects"
            className="inline-flex items-center rounded-lg bg-white text-neutral-900 px-5 py-3 font-semibold shadow hover:bg-neutral-200"
          >
            View our projects <span aria-hidden className="ml-2">↗</span>
          </Link>
        </div>
      </div>

      {/* DOTS */}
      <div className="absolute bottom-6 right-8 flex gap-2 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            className={`h-2 w-6 rounded-full transition-colors ${idx === i ? 'bg-white' : 'bg-white/50'}`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}