// src/components/Hero.tsx
import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { navClasses } from "@/utils/nav";

type Props = { slides: string[]; intervalMs?: number };

export default function Hero({ slides, intervalMs = 5500 }: Props) {
  const [i, setI] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % slides.length), intervalMs);
    return () => clearInterval(id);
  }, [slides.length, intervalMs]);

  return (
    <section className="relative w-screen overflow-hidden">
      {/* ---------- SLIDES ---------- */}
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

      {/* ---------- RED STRIP (fixed) ---------- */}
      <div className="fixed inset-x-0 top-0 z-50 bg-red-600 text-white">
        <div
          className="
            mx-auto max-w-7xl
            px-3 md:px-6
            pt-[env(safe-area-inset-top)]
            flex flex-col gap-1            /* мобильный стек */
            md:flex-row md:items-center md:justify-between md:gap-4
            py-2 md:py-1.5
          "
        >
          {/* Заголовок слева */}
          <span className="font-extrabold text-sm md:text-base">
            Allied Plumbing, Heating &amp; Air Conditioning
          </span>

          {/* Телефон — бейдж */}
          <a
            href="tel:604-731-1000"
            className="
              inline-flex items-center self-start md:self-auto
              rounded-full bg-white/15 px-3 py-1 text-sm font-semibold
              hover:bg-white/25 transition
            "
          >
            <span className="hidden md:inline mr-2">24/7 Emergency Line:</span>
            <span className="rounded-full bg-white text-red-700 px-2 py-0.5 leading-none">
              604-731-1000
            </span>
          </a>
        </div>
      </div>

      {/* Spacer под fixed-плашкой, чтобы контент не наезжал */}
      {/* На мобиле плашка выше (2 строки), поэтому ~80–88px; на десктопе ниже. Подгони при желании. */}
      <div className="h-[110px] sm:h-[120px] md:h-[56px]" />

      {/* ---------- DESKTOP NAV (pill) ---------- */}
      <div className="absolute left-0 w-full z-40 hidden md:block" style={{ top: 56 }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6">
          <nav className="mx-auto w-[88%] max-w-[680px] flex justify-between bg-white/90 backdrop-blur rounded-full px-4 py-2 shadow">
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

          <Link
            to="/contact"
            className="ml-3 inline-flex items-center rounded-lg bg-white text-neutral-900 px-5 py-3 font-semibold shadow hover:bg-neutral-200"
          >
            Get a quote <span aria-hidden className="ml-2">↗</span>
          </Link>
        </div>
      </div>

      {/* ---------- MOBILE TOP CONTROLS (Menu + Quote) ---------- */}
      <div className="md:hidden absolute left-0 w-full z-40" style={{ top: 80 }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
          <button
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="inline-flex items-center rounded-full bg-white/90 backdrop-blur px-3 py-2 shadow active:scale-95"
          >
            <MenuIcon open={menuOpen} />
            <span className="ml-2 font-semibold">Menu</span>
          </button>

          <Link
            to="/contact"
            className="inline-flex items-center rounded-full bg-white/95 backdrop-blur px-4 py-2 font-semibold shadow hover:bg-white"
          >
            Quote <span aria-hidden className="ml-1">↗</span>
          </Link>
        </div>

        {/* Dropdown */}
        <div
          id="mobile-menu"
          className={`absolute left-4 right-4 mt-2 origin-top rounded-2xl bg-white/95 backdrop-blur shadow-lg ring-1 ring-black/10 transition-transform transition-opacity ${
            menuOpen ? "pointer-events-auto opacity-100 scale-100" : "pointer-events-none opacity-0 scale-95"
          }`}
        >
          <nav className="flex flex-col divide-y divide-neutral-200">
            <MobileItem to="/" onSelect={() => setMenuOpen(false)} end>
              Home
            </MobileItem>
            <MobileItem to="/about" onSelect={() => setMenuOpen(false)}>
              About
            </MobileItem>
            <MobileItem to="/services" onSelect={() => setMenuOpen(false)}>
              Services
            </MobileItem>
            <MobileItem to="/projects" onSelect={() => setMenuOpen(false)}>
              Projects
            </MobileItem>
            <MobileItem to="/contact" onSelect={() => setMenuOpen(false)}>
              Contact us
            </MobileItem>
          </nav>

          <div className="p-4 flex items-center gap-3">
            <a
              href="tel:604-731-1000"
              className="flex-1 inline-flex items-center justify-center rounded-lg bg-red-600 text-white px-4 py-2 font-semibold"
            >
              Call 604-731-1000
            </a>
            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="flex-1 inline-flex items-center justify-center rounded-lg bg-neutral-900 text-white px-4 py-2 font-semibold"
            >
              Get a quote ↗
            </Link>
          </div>
        </div>
      </div>

      {/* ---------- HEADLINE + CTA ---------- */}
      <div className="absolute inset-0 flex items-center">
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

      {/* ---------- SLIDER DOTS ---------- */}
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

/* ===== helpers ===== */

function MenuIcon({ open }: { open: boolean }) {
  return open ? (
    <svg width="18" height="18" viewBox="0 0 24 24" className="text-neutral-900">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" className="text-neutral-900">
      <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function MobileItem({
  to,
  onSelect,
  children,
  end,
}: {
  to: string;
  onSelect: () => void;
  children: React.ReactNode;
  end?: boolean;
}) {
  return (
    <NavLink
      to={to}
      end={end as any}
      onClick={onSelect}
      className={({ isActive }) =>
        `block px-4 py-3 text-base ${
          isActive ? "font-semibold text-neutral-900" : "text-neutral-700 hover:bg-neutral-50"
        }`
      }
    >
      {children}
    </NavLink>
  );
}