// src/components/MainNav.tsx
import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import NavItem from './NavItem';
import { navClasses } from '../utils/nav';

export default function MainNav() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  // закрыть по клику вне
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!panelRef.current) return;
      if (!panelRef.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener('mousedown', onClick);
    return () => window.removeEventListener('mousedown', onClick);
  }, [open]);

  // закрыть по Esc
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <div className="relative">
      {/* Desktop */}
      <div className="hidden md:flex gap-2">
        <NavItem to="/about" end>About</NavItem>

        {/* Services через NavLink + navClasses */}
        <NavLink to="/services" className={({ isActive, isPending }) => navClasses(isActive, isPending)}>
          Services
        </NavLink>

        <NavItem to="/projects">Projects</NavItem>
        <NavItem to="/rfp" end>RFP / School Districts</NavItem>
        <NavItem to="/careers" end>Careers</NavItem>
        <NavItem to="/contact" end>Contact</NavItem>
      </div>

      {/* Mobile toggle */}
      <button
        className="md:hidden inline-flex items-center gap-2 px-3 py-2 rounded-md border border-neutral-300"
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-haspopup="true"
      >
        ☰ Menu
      </button>

      {/* Mobile panel */}
      {open && (
        <div
          id="mobile-nav"
          ref={panelRef}
          className="absolute right-0 z-40 mt-2 w-64 rounded-lg border bg-white shadow md:hidden"
          onClick={() => setOpen(false)}
        >
          <div className="flex flex-col p-2">
            <NavItem to="/about" end>About</NavItem>
            <NavItem to="/services">Services</NavItem>
            <NavItem to="/projects">Projects</NavItem>
            <NavItem to="/rfp" end>RFP / School Districts</NavItem>
            <NavItem to="/careers" end>Careers</NavItem>
            <NavItem to="/contact" end>Contact</NavItem>
          </div>
        </div>
      )}
    </div>
  );
}