import { ADDRESS, EMAIL_INFO, LEGAL_NAME, PHONE } from '../config';
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

/** Q4 — the municipalities Allied has documented projects in, plus its own
 *  city. Add to this only where there is real work to point at (I-09). */
export const AREA_SERVED = [
  'Burnaby',
  'Vancouver',
  'North Vancouver',
  'West Vancouver',
  'New Westminster',
  'Coquitlam',
  'Port Coquitlam',
  'Squamish',
  // A published project page describes a Whistler school upgrade, so the
  // corridor was already being served while the schema said otherwise.
  'Whistler',
];

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

export { PHONE };
