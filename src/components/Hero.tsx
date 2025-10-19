// src/components/Hero.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SiteNav from "@/components/SiteNav";

type Props = { slides: string[]; intervalMs?: number };

export default function Hero({ slides, intervalMs = 5500 }: Props) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI(v => (v + 1) % slides.length), intervalMs);
    return () => clearInterval(id);
  }, [slides.length, intervalMs]);

  return (
    <section className="relative w-screen overflow-hidden">
      {/* BACKGROUND SLIDES */}
      <div className="relative h-[88vh] min-h-[560px] w-full">
        {slides.map((src, idx) => (
          <img
            key={src}
            src={src}
            alt=""
            aria-hidden={idx !== i}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              idx === i ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
      </div>

      {/* RED STRIP (fixed) */}
      <div className="fixed inset-x-0 top-0 z-50 bg-red-600 text-white">
        <div className="mx-auto max-w-7xl px-3 md:px-6 pt-[env(safe-area-inset-top)] flex flex-col gap-1 md:flex-row md:items-center md:justify-between md:gap-4 py-2 md:py-1.5">
          <span className="font-extrabold text-sm md:text-base">
            Allied Plumbing, Heating &amp; Air Conditioning
          </span>
          <a
            href="tel:604-731-1000"
            className="inline-flex items-center self-start md:self-auto rounded-full bg-white/15 px-3 py-1 text-sm font-semibold hover:bg-white/25 transition"
          >
            <span className="hidden md:inline mr-2">24/7 Emergency Line:</span>
            <span className="rounded-full bg-white text-red-700 px-2 py-0.5 leading-none">
              604-731-1000
            </span>
          </a>
        </div>
      </div>

      {/* НАВИГАЦИЯ (как отдельный компонент) */}
      <SiteNav desktopTop={56} mobileTop={96} />

      {/* HEADLINE + CTA */}
      <div className="absolute inset-0 z-10 flex items-start md:items-center pt-[calc(176px+env(safe-area-inset-top))] md:pt-0">
        <div className="max-w-7xl px-4 md:px-6">
          <h1 className="text-white font-extrabold leading-tight text-4xl md:text-6xl lg:text-7xl mb-6 drop-shadow">
            We Build. We Maintain. <br />
            We Care.
          </h1>
          <Link
            to="/projects"
            className="inline-flex items-center rounded-lg bg-white text-neutral-900 px-5 py-3 font-semibold shadow hover:bg-neutral-200"
          >
            View our projects <span aria-hidden className="ml-2">↗</span>
          </Link>
        </div>
      </div>

      {/* SLIDER DOTS */}
      <div className="absolute bottom-6 right-8 flex gap-2 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            className={`h-2 w-6 rounded-full transition-colors ${idx === i ? "bg-white" : "bg-white/50"}`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}