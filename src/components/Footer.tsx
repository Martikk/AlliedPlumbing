import { Link } from '../lib/navigation';
import { openCookieSettings } from './AnalyticsConsent';
import { ADDRESS, EMAIL_INFO, LEGAL_NAME, PHONE, PHONE_HREF } from '../config';
import { SERVICE_LINKS } from '../lib/site-links';

/** E-07 — every phone number is a tel: link, every email a mailto:, and the
 *  address links to Google Maps.
 *  E-03 — "Cookie settings" lives here, not in a floating pill. */

const MAPS = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${ADDRESS.street}, ${ADDRESS.locality}, ${ADDRESS.region} ${ADDRESS.postalCode}`,
)}`;

const COMPANY = [
  { to: '/about', label: 'About' },
  { to: '/team', label: 'Team' },
  { to: '/projects', label: 'Projects' },
  { to: '/clients', label: 'Clients' },
  { to: '/blog', label: 'Insights' },
  { to: '/careers', label: 'Careers' },
  { to: '/rfp', label: 'Tenders & RFPs' },
  { to: '/contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--line)] bg-[var(--surface-alt)] text-[var(--body)]">
      <div className="mx-auto w-full max-w-[1200px] px-4 py-12 md:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Link to="/" className="text-lg font-extrabold leading-tight text-[var(--ink)]">
              {LEGAL_NAME}
            </Link>
            <address className="mt-4 not-italic">
              <a href={MAPS} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center underline underline-offset-4">
                {ADDRESS.street}, {ADDRESS.locality}, {ADDRESS.region} {ADDRESS.postalCode}
                <span className="sr-only"> (opens Google Maps in a new tab)</span>
              </a>
              <br />
              <a
                href={PHONE_HREF}
                data-cta-location="footer"
                className="inline-flex min-h-11 items-center font-bold text-[var(--ink)] underline underline-offset-4"
              >
                {PHONE}
              </a>
              <span className="ml-2 text-sm">24/7 emergency line</span>
              <br />
              <a
                href={`mailto:${EMAIL_INFO}`}
                data-cta-location="footer"
                className="inline-flex min-h-11 items-center underline underline-offset-4"
              >
                {EMAIL_INFO}
              </a>
            </address>
          </div>

          <nav aria-label="Services">
            <h2 className="text-eyebrow font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
              Services
            </h2>
            <ul className="mt-3 grid grid-cols-2 gap-x-6 md:grid-cols-1">
              {SERVICE_LINKS.map(service => (
                <li key={service.key}>
                  <Link to={service.to} className="inline-flex min-h-11 items-center hover:underline">
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <h2 className="text-eyebrow font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
              Company
            </h2>
            <ul className="mt-3 grid grid-cols-2 gap-x-6">
              {COMPANY.map(item => (
                <li key={item.to}>
                  <Link to={item.to} className="inline-flex min-h-11 items-center hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--line)] pt-6 text-sm">
          <p>
            © {new Date().getFullYear()} {LEGAL_NAME}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <Link to="/privacy" className="inline-flex min-h-11 items-center hover:underline">
              Privacy
            </Link>
            <button
              type="button"
              onClick={openCookieSettings}
              className="inline-flex min-h-11 items-center hover:underline"
            >
              Cookie settings
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
