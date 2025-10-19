// src/components/SiteNav.tsx
import { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { navClasses } from "@/utils/nav";

type Props = {
  desktopTop?: number; // отступ сверху для десктоп-пилюли (px)
  mobileTop?: number;  // отступ сверху для мобильной панели (px)
  className?: string;
};

export default function SiteNav({ desktopTop = 56, mobileTop = 96, className = "" }: Props) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // закрывать дропдаун при смене роута
  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      {/* DESKTOP: «пилюля» + кнопка Quote */}
      <div
        className={`absolute left-0 w-full z-40 hidden md:block ${className}`}
        style={{ top: desktopTop }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6">
          <nav className="mx-auto w-[88%] max-w-[720px] flex justify-between bg-white/90 backdrop-blur rounded-full px-4 py-2 shadow">
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
            <NavLink to="/careers" className={({ isActive, isPending }) => navClasses(isActive, isPending)}>
              Careers
            </NavLink>
            <NavLink to="/contact" className={({ isActive, isPending }) => navClasses(isActive, isPending)}>
              Contact us
            </NavLink>
          </nav>

          <Link
            to="/GetQuote"
            className="ml-3 inline-flex items-center rounded-lg bg-white text-neutral-900 px-5 py-3 font-semibold shadow hover:bg-neutral-200"
          >
            Get a quote <span aria-hidden className="ml-2">↗</span>
          </Link>
        </div>
      </div>

      {/* MOBILE: кнопки (бургер + Quote) + выпадающее меню */}
      <div
        className="md:hidden absolute left-0 w-full z-40"
        style={{ top: mobileTop }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen(v => !v)}
            className="inline-flex items-center rounded-full bg-white/90 backdrop-blur px-3 py-2 shadow active:scale-95"
          >
            <MenuIcon open={open} />
            <span className="ml-2 font-semibold">Menu</span>
          </button>

          <Link
            to="/GetQuote"
            className="inline-flex items-center rounded-full bg-white/95 backdrop-blur px-4 py-2 font-semibold shadow hover:bg-white"
          >
            Quote <span aria-hidden className="ml-1">↗</span>
          </Link>
        </div>

        {/* dropdown */}
        <div
          className={`absolute left-4 right-4 mt-2 origin-top rounded-2xl bg-white/95 backdrop-blur shadow-lg ring-1 ring-black/10 transition-transform transition-opacity ${
            open ? "pointer-events-auto opacity-100 scale-100" : "pointer-events-none opacity-0 scale-95"
          }`}
        >
          <nav className="flex flex-col divide-y divide-neutral-200">
            <MobileItem to="/" end>Home</MobileItem>
            <MobileItem to="/about">About</MobileItem>
            <MobileItem to="/services">Services</MobileItem>
            <MobileItem to="/projects">Projects</MobileItem>
            <MobileItem to="/careers">Careers</MobileItem>
            <MobileItem to="/contact">Contact us</MobileItem>
          </nav>

          <div className="p-4 flex items-center gap-3">
            <a
              href="tel:604-731-1000"
              className="flex-1 inline-flex items-center justify-center rounded-lg bg-red-600 text-white px-4 py-2 font-semibold"
            >
              Call 604-731-1000
            </a>
            <Link
              to="/GetQuote"
              className="flex-1 inline-flex items-center justify-center rounded-lg bg-neutral-900 text-white px-4 py-2 font-semibold"
            >
              Get a quote ↗
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

/* ---------- helpers ---------- */

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
  children,
  end,
}: {
  to: string;
  children: React.ReactNode;
  end?: boolean;
}) {
  return (
    <NavLink
      to={to}
      end={end as any}
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