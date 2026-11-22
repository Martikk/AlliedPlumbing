import { Link, useLocation } from '../lib/navigation';
import Section from '../components/ui/Section';
import Button, { PhoneIcon } from '../components/ui/Button';
import { SERVICE_LINKS } from '../lib/site-links';
import { PHONE, PHONE_HREF } from '../config';

/** C-03 / C-05 — the old 404 carried an inline SVG illustration, a
 *  "Plumbing 404" badge, two blurred gradient blobs and three one-off button
 *  styles. A facilities manager who mistyped a URL wants the way back, so
 *  this is the way back plus the phone number. */

const DESTINATIONS = [
  { to: '/services', label: 'All services' },
  { to: '/projects', label: 'Projects' },
  { to: '/rfp', label: 'Tenders & RFPs' },
  { to: '/blog', label: 'Insights' },
  { to: '/careers', label: 'Careers' },
  { to: '/contact', label: 'Contact' },
];

export default function NotFound() {
  const { pathname } = useLocation();
  return (
    <Section
      headingLevel={1}
      eyebrow="404"
      heading="We could not find that page"
      intro="The link may be broken, or the page may have moved. Everything below still works."
    >
      <p className="text-sm text-[var(--muted)]">
        Requested: <code className="font-mono text-[var(--ink)]">{pathname}</code>
      </p>

      <div data-cta-anchor className="mt-8 flex flex-wrap gap-3">
        <Button href="/quote">Get a quote</Button>
        <Button
          href={PHONE_HREF}
          variant="secondary"
          icon={<PhoneIcon />}
          data-cta-location="page"
        >
          Call {PHONE} (24/7)
        </Button>
      </div>

      <div className="mt-12 grid gap-10 md:grid-cols-2">
        <nav aria-label="Services">
          <h2 className="text-eyebrow font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
            Services
          </h2>
          <ul className="mt-3">
            {SERVICE_LINKS.map(service => (
              <li key={service.key}>
                <Link
                  to={service.to}
                  className="inline-flex min-h-11 items-center font-semibold text-[var(--ink)] hover:underline"
                >
                  {service.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Elsewhere on the site">
          <h2 className="text-eyebrow font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
            Elsewhere
          </h2>
          <ul className="mt-3">
            {DESTINATIONS.map(item => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="inline-flex min-h-11 items-center font-semibold text-[var(--ink)] hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </Section>
  );
}
