import { NavLink, Link } from 'react-router-dom';
import { navClasses } from '@/utils/nav';

export default function HeaderBar() {
  return (
    <header className="relative z-30">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center gap-4">
          {/* ЛОГО слева */}
          <Link to="/" className="shrink-0 flex items-center gap-2">
            <img src="/logo.png" alt="Allied Plumbing, Heating & Air Conditioning Ltd." className="h-8 w-auto" />
          </Link>

          {/* Центр: «пилюльная» навигация */}
          <nav className="mx-auto hidden md:flex">
            <div className="flex rounded-full bg-white/90 backdrop-blur px-1 py-1 shadow border">
              <NavLink to="/" end className={({isActive,isPending}) => navClasses(isActive, isPending)+' rounded-full px-4 py-2'}>
                Home
              </NavLink>
              <NavLink to="/about" className={({isActive,isPending}) => navClasses(isActive, isPending)+' rounded-full px-4 py-2'}>
                About
              </NavLink>
              <NavLink to="/services" className={({isActive,isPending}) => navClasses(isActive, isPending)+' rounded-full px-4 py-2'}>
                Services
              </NavLink>
              <NavLink to="/projects" className={({isActive,isPending}) => navClasses(isActive, isPending)+' rounded-full px-4 py-2'}>
                Projects
              </NavLink>
              <NavLink to="/contact" className={({isActive,isPending}) => navClasses(isActive, isPending)+' rounded-full px-4 py-2'}>
                Contact us
              </NavLink>
            </div>
          </nav>

          {/* Справа: CTA */}
          <Link
            to="/contact"
            className="ml-auto inline-flex items-center justify-center rounded-xl bg-neutral-900 text-white px-4 py-2 shadow hover:opacity-90"
          >
            Get a quote
            <span aria-hidden className="ml-2">↗</span>
          </Link>
        </div>
      </div>
    </header>
  );
}