import trust from '../data/trust.json';
import { responsiveImage } from '../lib/images';

/** Audit D-04 — credibility above the fold.
 *
 * Sits directly under the hero. Static: no marquee, no autoplay (G-02).
 * Four groups — clients, years in business, credentials, equipment partners —
 * as a 2×2 grid on mobile, one row on desktop.
 *
 * Everything comes from src/data/trust.json. A group with nothing provable in
 * it renders nothing at all, so the strip never shows a placeholder claim. */

function yearsInBusiness() {
  const { sinceYears, sinceYear } = trust.experience;
  return sinceYears + Math.max(0, new Date().getFullYear() - sinceYear);
}

function GroupHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-eyebrow font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
      {children}
    </h3>
  );
}

export default function TrustStrip() {
  const clients = trust.clients.items;
  const credentials = trust.credentials.items as { label: string; detail?: string }[];
  const partners = trust.partners.items;

  return (
    <section
      aria-label="Credentials and clients"
      className="border-y border-[var(--line)] bg-[var(--surface-alt)]"
    >
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-2 gap-x-6 gap-y-8 px-4 py-8 md:px-6 md:py-10 lg:grid-cols-4 lg:gap-8">
        {clients.length > 0 && (
          <div>
            <GroupHeading>Trusted by</GroupHeading>
            <ul className="mt-3 space-y-1.5">
              {clients.map(client => (
                <li key={client.name} className="text-sm font-semibold text-[var(--ink)]">
                  {client.logo ? (
                    <img
                      src={client.logo}
                      alt={client.name}
                      height={28}
                      className="h-7 w-auto"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    client.name
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <GroupHeading>In business</GroupHeading>
          <p className="mt-3 text-3xl font-extrabold leading-none text-[var(--ink)]">
            {yearsInBusiness()}+
          </p>
          <p className="mt-2 text-sm text-[var(--body)]">
            years of mechanical work in British Columbia, from our Burnaby shop.
          </p>
        </div>

        {credentials.length > 0 && (
          <div>
            <GroupHeading>Credentials</GroupHeading>
            <ul className="mt-3 space-y-1.5 text-sm text-[var(--body)]">
              {credentials.map(item => (
                <li key={item.label}>
                  <span className="font-semibold text-[var(--ink)]">{item.label}</span>
                  {item.detail ? <> — {item.detail}</> : null}
                </li>
              ))}
            </ul>
          </div>
        )}

        {partners.length > 0 && (
          <div className={credentials.length > 0 ? '' : 'col-span-2 lg:col-span-2'}>
            <GroupHeading>Equipment we install</GroupHeading>
            <ul className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-3">
              {partners.map(partner => (
                <li key={partner.name}>
                  <img
                    src={responsiveImage(partner.src, 240)}
                    alt={partner.name}
                    width={partner.width}
                    height={partner.height}
                    loading="lazy"
                    decoding="async"
                    className="h-7 w-auto max-w-[120px] object-contain opacity-80 grayscale"
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
