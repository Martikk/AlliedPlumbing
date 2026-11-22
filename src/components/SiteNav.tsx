import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from '../lib/navigation';
import Button, { PhoneIcon } from './ui/Button';
import { PHONE, PHONE_HREF } from '../config';
import { SERVICE_LINKS } from '../lib/site-links';

/** Audit C-04 — one sticky header.
 *
 * Replaces the red top strip + floating nav pill + separate quote button with
 * a single bar: logo, navigation, then "Call 24/7" (secondary) and "Get a
 * quote" (primary). It condenses from 80 px to 64 px after 80 px of scroll,
 * driven by an IntersectionObserver on a sentinel — never a scroll listener. */

const LINKS = [
  { to: '/services', label: 'Services', children: SERVICE_LINKS },
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About' },
  { to: '/rfp', label: 'Tenders & RFPs' },
  { to: '/careers', label: 'Careers' },
  { to: '/contact', label: 'Contact' },
] as const;

export default function SiteNav() {
  const { pathname } = useLocation();
  const sentinel = useRef<HTMLDivElement>(null);
  const [condensed, setCondensed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [motion, setMotion] = useState<'pointer' | 'instant'>('instant');
  const menuButton = useRef<HTMLButtonElement>(null);
  const servicesButton = useRef<HTMLButtonElement>(null);
  const servicesWrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = sentinel.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setCondensed(!entry.isIntersecting),
      { rootMargin: '0px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Route change closes anything that is open.
  useEffect(() => {
    setMenuOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  // Outside click closes the Services dropdown (it opens on click, not hover).
  useEffect(() => {
    if (!servicesOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!servicesWrap.current?.contains(event.target as Node)) setServicesOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [servicesOpen]);

  function onKeyDown(event: React.KeyboardEvent) {
    if (event.key !== 'Escape') return;
    if (servicesOpen) {
      setServicesOpen(false);
      servicesButton.current?.focus();
    } else if (menuOpen) {
      setMotion('instant');
      setMenuOpen(false);
      menuButton.current?.focus();
    }
  }

  return (
    <>
      {/* 80 px of page above the fold; leaving it triggers the condensed state. */}
      <div ref={sentinel} aria-hidden="true" className="absolute top-0 h-20 w-px" />
      <header className="site-header" data-condensed={condensed} onKeyDown={onKeyDown}>
        <div className="relative mx-auto w-full max-w-[1200px] px-4 md:px-6">
          <div className="header-row">
            <Link
              to="/"
              className="flex min-h-11 items-center gap-2 font-extrabold leading-tight text-[var(--ink)]"
            >
              <img
                src="/icon-192.png"
                alt=""
                width={28}
                height={28}
                className="h-7 w-7 shrink-0"
              />
              <span className="text-sm sm:text-base">
                Allied Plumbing
                <span className="hidden sm:inline">, Heating &amp; Air Conditioning</span>
              </span>
            </Link>

            <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
              <div ref={servicesWrap} className="relative">
                <button
                  ref={servicesButton}
                  type="button"
                  className="nav-link gap-1"
                  aria-expanded={servicesOpen}
                  aria-controls="services-menu"
                  onClick={() => setServicesOpen(value => !value)}
                >
                  Services
                  <svg aria-hidden="true" viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor">
                    <path d="M5.5 7.5 10 12l4.5-4.5Z" />
                  </svg>
                </button>
                <div id="services-menu" hidden={!servicesOpen} className="nav-panel">
                  <Link to="/services">All services</Link>
                  {SERVICE_LINKS.map(item => (
                    <Link key={item.to} to={item.to}>
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
              {LINKS.filter(link => link.label !== 'Services').map(link => (
                <NavLink key={link.to} to={link.to} className="nav-link">
                  {link.label}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Button
                href={PHONE_HREF}
                variant="secondary"
                icon={<PhoneIcon />}
                className="hidden sm:inline-flex"
                data-cta-location="header"
              >
                <span className="hidden xl:inline">Call {PHONE} (24/7)</span>
                <span className="xl:hidden">Call 24/7</span>
              </Button>
              <a
                href={PHONE_HREF}
                aria-label={`Call Allied 24/7 on ${PHONE}`}
                data-cta-location="header"
                className="grid h-11 w-11 shrink-0 place-items-center rounded-[var(--radius)] border border-[var(--line)] text-[var(--ink)] sm:hidden"
              >
                <PhoneIcon />
              </a>
              <Button href="/quote" className="hidden md:inline-flex" data-cta-location="header">
                Get a quote
              </Button>
              <button
                ref={menuButton}
                type="button"
                aria-expanded={menuOpen}
                aria-controls="mobile-navigation"
                onClick={event => {
                  setMotion(event.detail > 0 ? 'pointer' : 'instant');
                  setMenuOpen(value => !value);
                }}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-[var(--radius)] border border-[var(--line)] text-[var(--ink)] lg:hidden"
              >
                <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
                <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  {menuOpen ? <path d="m5 5 10 10M15 5 5 15" /> : <path d="M3.5 6h13M3.5 10h13M3.5 14h13" />}
                </svg>
              </button>
            </div>
          </div>

          <nav
            id="mobile-navigation"
            aria-label="Mobile"
            hidden={!menuOpen}
            inert={!menuOpen}
            data-motion={motion}
            className="mobile-drawer lg:hidden"
          >
            <NavLink to="/services" className="nav-link w-full">
              All services
            </NavLink>
            {SERVICE_LINKS.map(item => (
              <NavLink key={item.to} to={item.to} className="nav-link w-full pl-5 text-[var(--body)]">
                {item.label}
              </NavLink>
            ))}
            {LINKS.filter(link => link.label !== 'Services').map(link => (
              <NavLink key={link.to} to={link.to} className="nav-link w-full">
                {link.label}
              </NavLink>
            ))}
            <div className="mt-2 grid gap-2 border-t border-[var(--line)] p-2 pt-3">
              <Button href="/quote" data-cta-location="mobile_menu">
                Get a quote
              </Button>
              <Button href={PHONE_HREF} variant="secondary" icon={<PhoneIcon />} data-cta-location="mobile_menu">
                Call {PHONE} (24/7)
              </Button>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
