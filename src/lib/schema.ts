import { ADDRESS, EMAIL_INFO, LEGAL_NAME, PHONE, SERVICE_AREA_CITIES } from '../config';
import policy from './site-policy.json';
import { canonicalURL } from './site-url';

/** Audit A-05 — structured data on every template.
 *
 * Before this, HVACBusiness JSON-LD existed on the homepage only; service,
 * project and article pages carried none.
 *
 * The organisation keeps its existing `#business` @id (not the `#org` in the
 * spec) so the Article `publisher` references already in the build keep
 * resolving.
 *
 * OPEN: `geo` is omitted rather than guessed, and `sameAs` is empty until the
 * Google Business Profile is claimed (I-05). Both are valid absences — a wrong
 * coordinate is worse than none. See docs/audit/open-items.md (Q4, I-05). */

export const ORG_ID = `${policy.origin}/#business`;

/** Q4 / I-09 — the municipalities Allied serves, from `SERVICE_AREA_CITIES`.
 *  Kept under this name so the call sites below do not change. */
export const AREA_SERVED = SERVICE_AREA_CITIES;

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['HVACBusiness', 'Plumber'],
    '@id': ORG_ID,
    name: LEGAL_NAME,
    url: `${policy.origin}/`,
    telephone: '+1-604-731-1000',
    email: EMAIL_INFO,
    image: `${policy.origin}/icon-512.png`,
    logo: `${policy.origin}/icon-512.png`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: ADDRESS.street,
      addressLocality: ADDRESS.locality,
      addressRegion: ADDRESS.region,
      postalCode: ADDRESS.postalCode,
      addressCountry: ADDRESS.country,
    },
    areaServed: AREA_SERVED,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '00:00',
        closes: '23:59',
      },
    ],
  };
}

export function serviceSchema(options: {
  path: string;
  name: string;
  description: string;
  serviceType: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${canonicalURL(options.path)}#service`,
    name: options.name,
    description: options.description,
    serviceType: options.serviceType,
    provider: { '@id': ORG_ID },
    areaServed: AREA_SERVED,
    url: canonicalURL(options.path),
  };
}

/** Audit A-05 §4 — a breadcrumb trail on every page except the homepage,
 *  matching the visible breadcrumb. */
export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  if (!trail.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', path: '/' }, ...trail].map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: canonicalURL(item.path),
    })),
  };
}

/** The organisation JSON-LD as a `<script>` tag, for the prerender to write
 *  into `<head>`.
 *
 *  This exists because `index.html` carried a hand-copied snapshot of
 *  `organizationSchema()` instead, and that snapshot is what all sixty pages
 *  actually served. `organizationSchema()` was never called by anything, so
 *  the function and the page had drifted: the function listed Whistler and
 *  the page did not, and editing the function changed nothing a crawler
 *  could see.
 *
 *  Built here and injected by the prerender for the same reason as the LCP
 *  preloads (B-02): `renderToString` emits a `<script>` in place rather than
 *  hoisting it into `<head>`, so a component cannot put it there without the
 *  hydrated tree disagreeing with the markup. */
export function organizationTag() {
  const json = JSON.stringify(organizationSchema()).replace(/</g, '\\u003c');
  return `<script type="application/ld+json">${json}</script>`;
}

export { PHONE };
