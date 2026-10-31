import { useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const links = [['/', 'Home'], ['/about', 'About'], ['/services', 'Services'], ['/projects', 'Projects'], ['/careers', 'Careers'], ['/contact', 'Contact']] as const;

export default function SiteNav() {
  const { pathname } = useLocation();
  return <Navigation key={pathname} />;
}

function Navigation() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  return (
    <header className="relative z-40 bg-white text-neutral-900 shadow-sm" onKeyDown={e => {
      if (e.key === 'Escape' && open) { setOpen(false); toggle.current?.focus(); }
    }}>
      <div className="bg-red-700 text-white">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-2 flex flex-wrap justify-between gap-x-4 gap-y-1 text-sm">
          <Link to="/" className="font-bold">Allied Plumbing, Heating &amp; Air Conditioning</Link>
          <a href="tel:+16047311000" className="font-semibold underline underline-offset-4">Call 604-731-1000</a>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-3 flex items-center justify-between gap-4">
        <Link to="/" className="font-extrabold text-xl"><span className="sm:hidden">Allied</span><span className="hidden sm:inline">Allied Plumbing</span></Link>
        <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-5 text-sm font-semibold">
          {links.map(([to, label]) => <NavLink key={to} to={to} end={to === '/'} className={({isActive}) => isActive ? 'text-red-700 underline underline-offset-8' : 'hover:text-red-700'}>{label}</NavLink>)}
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/quote" className="inline-flex min-h-11 items-center justify-center rounded-lg bg-red-700 px-4 py-2 text-sm font-semibold text-white hover:bg-red-800"><span className="sm:hidden">Quote</span><span className="hidden sm:inline">Request a Quote</span></Link>
          <button ref={toggle} type="button" aria-expanded={open} aria-controls="mobile-navigation" className="lg:hidden min-h-11 rounded-lg border border-neutral-300 px-3 font-semibold" onClick={() => setOpen(v => !v)}>{open ? 'Close' : 'Menu'}</button>
        </div>
      </div>
      <nav id="mobile-navigation" aria-label="Mobile navigation" hidden={!open} className="lg:hidden border-t border-neutral-200 px-4 pb-4">
        {links.map(([to,label]) => <NavLink key={to} to={to} end={to === '/'} className={({isActive}) => `block rounded-lg px-3 py-3 ${isActive ? 'bg-red-50 font-semibold text-red-800' : 'hover:bg-neutral-100'}`}>{label}</NavLink>)}
        <a href="tel:+16047311000" className="block px-3 py-3 font-semibold text-red-700">Call 604-731-1000</a>
      </nav>
    </header>
  );
}
