import { useRef, useState } from 'react';
import { Link, NavLink, useLocation } from '../lib/navigation';
import { licensedSummary } from '../lib/credentials';
const links = [['/', 'Home'], ['/about', 'About'], ['/services', 'Services'], ['/projects', 'Projects'], ['/careers', 'Careers'], ['/contact', 'Contact us']] as const;

export default function SiteNav() {
  const { pathname: rawPath } = useLocation();
  const pathname = rawPath.replace(/\/+$/, '') || '/';
  return <Navigation key={pathname} overlay={pathname === '/' || pathname === '/projects' || ['/services', '/quote', '/contact', '/careers'].some(route => pathname === route || pathname.startsWith(route + '/'))} />;
}
function Navigation({overlay}:{overlay:boolean}) {
  const licensed = licensedSummary();
  const [open,setOpen]=useState(false);
  const [motion,setMotion]=useState<'pointer'|'instant'>('instant');
  const toggle=useRef<HTMLButtonElement>(null);
  return <header className={`site-header ${overlay?'site-header-home':''}`} onKeyDown={event=>{if(event.key==='Escape' && open){setMotion('instant');setOpen(false);toggle.current?.focus();}}}>
    <div className="emergency-strip"><div className="mx-auto max-w-7xl px-4 md:px-6 py-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-sm">
      <Link to="/" className="font-extrabold">Allied Plumbing, Heating &amp; Air Conditioning</Link>
      {/* The page-copy plan wants a credential line in this strip. It says
          only what Technical Safety BC's register says today, and renders
          nothing at all once no licence is current — see lib/credentials.ts.
          WorkSafeBC registration and COR are not here: neither is evidenced
          yet (Q3), and an unverified line in the one strip on every page is
          the worst place on the site to guess. */}
      {licensed && <Link to="/about#credentials" className="hidden lg:inline hover:underline">Technical Safety BC licensed: {licensed}</Link>}
      <a href="tel:+16047311000" className="emergency-phone"><span className="hidden md:inline">24/7 Emergency Line:</span><strong>604-731-1000</strong></a>
    </div></div>
    <div className="navigation-shell"><div className="mx-auto max-w-7xl px-4 md:px-6 flex items-center justify-between gap-4">
      <nav aria-label="Main navigation" className="desktop-pill hidden lg:flex">{links.map(([to,label])=><NavLink key={to} to={to} end={to==='/'} className={({isActive})=>`nav-pill-link ${isActive?'nav-pill-active':''}`}>{label}</NavLink>)}</nav>
      <button ref={toggle} type="button" aria-expanded={open} aria-controls="mobile-navigation" className="lg:hidden min-h-11 rounded-full bg-white px-4 py-2 font-semibold shadow-sm" onClick={event=>{setMotion(event.detail>0?'pointer':'instant');setOpen(value=>!value);}}>{open?'Close':'Menu'}</button>
      <Link to="/quote" className="quote-nav">Get a quote <span aria-hidden>↗</span></Link>
    </div>
    <nav id="mobile-navigation" aria-label="Mobile navigation" hidden={!open} inert={!open} aria-hidden={!open} data-motion={motion} className="mobile-dropdown lg:hidden">{links.map(([to,label])=><NavLink key={to} to={to} end={to==='/'} className={({isActive})=>`block rounded-lg px-4 py-3 ${isActive?'bg-slate-100 font-bold':'hover:bg-slate-50'}`}>{label}</NavLink>)}<a href="tel:+16047311000" className="block px-4 py-3 font-semibold text-red-700">Call 604-731-1000</a></nav>
    </div>
  </header>;
}
