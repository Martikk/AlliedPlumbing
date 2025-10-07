import { Link } from 'react-router-dom';
import MainNav from './MainNav';

const PHONE = '604-731-1000';
const EMAIL_QUOTE = 'quote@allied-plumbing.ca';

export default function MainHeader() {
  return (
    <header className="pt-[var(--bar-h)]">
      <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <img src="/public/Logo.png" alt="Allied Plumbing, Heating & Air Conditioning Ltd." className="h-8 w-auto" />
          <span className="font-bold">Allied Plumbing</span>
        </Link>

        {/* Nav */}
        <MainNav />

        {/* Actions */}
        <div className="flex gap-3">
          <a
            href={`mailto:${EMAIL_QUOTE}`}
            className="px-3 py-2 rounded-lg border border-neutral-300 hover:bg-neutral-50 text-sm"
          >
            Request a Quote
          </a>
          <a
            href={`tel:${PHONE}`}
            className="px-3 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 text-sm"
          >
            Call 24/7
          </a>
        </div>
      </nav>
    </header>
  );
}