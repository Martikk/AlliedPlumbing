// src/config.ts
export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xblzarjb';

export const PHONE = '604-731-1000';
export const PHONE_HREF = 'tel:+16047311000';
export const EMAIL_INFO = 'info@allied-plumbing.ca';
export const EMAIL_QUOTE = 'quote@allied-plumbing.ca';
// Enable only after file-upload support is verified for the receiving Formspree account.
export const QUOTE_FILE_UPLOADS_ENABLED = false;

/** Audit I-08 — one display name, used identically here, on the Google
 *  Business Profile, HomeStars, LinkedIn and every directory. The legal name
 *  is kept for schema.org and the footer. */
export const BRAND_NAME = 'Allied Plumbing, Heating & Air Conditioning';
export const LEGAL_NAME = 'Allied Plumbing, Heating & Air Conditioning Ltd.';

export const ADDRESS = {
  street: '4085 2nd Avenue',
  locality: 'Burnaby',
  region: 'BC',
  postalCode: 'V5C 3X1',
  country: 'CA',
} as const;

/** Audit H-04 — a promise Allied can keep, on every form and acknowledgement.
 *  Replaces "Acceptance by our system does not mean a team member has read
 *  your message." */
export const RESPONSE_PROMISE =
  'We reply within one business day. For no-heat, leaks or gas issues, call 604-731-1000 — 24/7.';

/** Audit C-03 — one label per action. Import these; do not retype them.
 *  Sentence case everywhere. No ↗ glyph on internal links. */
export const LABEL = {
  quote: 'Get a quote',
  call: `Call ${PHONE} (24/7)`,
  callShort: 'Call 24/7',
  tender: 'Send tender documents',
  projects: 'See our projects',
  service: 'View service',
  articles: 'Read our insights',
} as const;
