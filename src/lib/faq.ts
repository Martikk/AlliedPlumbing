import faq from '../data/faq.json';
import type { ServiceKey } from './site-links';

export type FaqEntry = { q: string; a: string };

/** Entries marked `confirm` make a claim Allied has not verified in writing,
 *  and entries with an empty answer are placeholders. Neither is ever
 *  rendered or put into JSON-LD. */
function publishable(entry: { q: string; a: string; confirm?: boolean }): entry is FaqEntry {
  return !entry.confirm && Boolean(entry.a.trim());
}

const ALL = (faq.general as { q: string; a: string; confirm?: boolean }[]).filter(publishable);

export function generalFaq(): FaqEntry[] {
  return ALL;
}

/** Audit I-03 — four to six real questions per service page. */
export function faqForService(key: ServiceKey): FaqEntry[] {
  const wanted = (faq.byService as Record<string, string[]>)[key] ?? [];
  return wanted
    .map(question => ALL.find(entry => entry.q === question))
    .filter((entry): entry is FaqEntry => Boolean(entry))
    .slice(0, 6);
}

/** Audit A-05 — FAQPage structured data. Returns null when there is nothing
 *  publishable, so a page never emits an empty FAQPage block. */
export function faqSchema(entries: FaqEntry[], pageUrl: string) {
  if (!entries.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    mainEntity: entries.map(entry => ({
      '@type': 'Question',
      name: entry.q,
      acceptedAnswer: { '@type': 'Answer', text: entry.a },
    })),
  };
}
