// src/components/MainHeader.tsx
import { useState, useRef, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { navClasses } from '@/utils/nav';

const LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About us' },
  { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact us' },
];

const EMAIL_QUOTE = 'quote@allied-plumbing.ca';

export default function MainHeader() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  // click outside
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!panelRef.current) return;
      if (!panelRef.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener('mousedown', onClick);
    return () => window.removeEventListener('mousedown', onClick);
  }, [open]);

  // esc
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50">
      {/* верхняя полоса (опционально можно убрать) */}
      <div className="hidden md:flex items-center justify-center h-9 bg-red-600 text-white text-sm">
        24/7 Emergency:&nbsp;<a className="underline" href="tel:604-731-1000">604-731-1000</a> — calls only after-hours
      </div>

      {/* навбар */}
      <div className="backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/95">
        <div className="max-w-6xl mx-auto px-4">
          <div className="h-16 md:h-20 flex items-center gap-3">
            {/* logo */}
            <Link to="/" className="flex items-center gap-3 shrink-0">
              <img src="/logo.png" alt="Allied Plumbing, Heating & Air Conditioning Ltd." className="h-9 w-auto" />
              <span className="font-bold hidden sm:block">Allied Plumbing</span>
            </Link>

            {/* center nav */}
            <nav className="mx-auto hidden md:flex">
              <ul className="flex items-center gap-2 rounded-full border bg-white px-2 py-1 shadow-sm">
                {LINKS.map(({ to, label, end }) => (
                  <li key={to}>
                    <NavLink
                      to={to}
                      end={end}
                      className={({ isActive, isPending }) =>
                        [
                          'inline-flex h-10 items-center rounded-full px-4 text-sm',
                          isActive ? 'bg-neutral-100 font-semibold' : 'hover:bg-neutral-50',
                          isPending ? 'opacity-70' : '',
                        ].join(' ')
                      }
                    >
                      {label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* CTA */}
            <div className="ml-auto hidden md:flex">
              <div className="flex items-center gap-2">
                <Link
                  to="/contact"
                  className="inline-flex h-11 items-center rounded-xl border px-4 text-sm font-semibold hover:bg-neutral-50"
                >
                  Get a Quote
                  <span aria-hidden className="ml-2">↗</span>
                </Link>
              </div>
            </div>

            {/* mobile toggle */}
            <button
              className="md:hidden ml-auto inline-flex items-center gap-2 px-3 py-2 rounded-md border border-neutral-300"
              onClick={() => setOpen(v => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-haspopup="true"
            >
              ☰ Menu
            </button>
          </div>
        </div>

        {/* mobile panel */}
        {open && (
          <div className="md:hidden border-t">
            <div id="mobile-nav" ref={panelRef} className="max-w-6xl mx-auto px-4 py-3">
              <ul className="flex flex-col divide-y">
                {LINKS.map(({ to, label, end }) => (
                  <li key={to}>
                    <NavLink
                      to={to}
                      end={end}
                      onClick={() => setOpen(false)}
                      className={({ isActive, isPending }) =>
                        navClasses(isActive, isPending) + ' w-full justify-start rounded-md'
                      }
                    >
                      {label}
                    </NavLink>
                  </li>
                ))}
                <li className="pt-2">
                  <a
                    href={`mailto:${EMAIL_QUOTE}`}
                    className="inline-flex items-center min-h-11 px-3 py-2 rounded-md text-sm underline underline-offset-4"
                    onClick={() => setOpen(false)}
                  >
                    Request a Quote (Email)
                  </a>
                </li>
              </ul>
              <div className="pt-3">
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="inline-flex w-full h-11 items-center justify-center rounded-lg bg-red-600 text-white font-semibold"
                >
                  Get a Quote
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}