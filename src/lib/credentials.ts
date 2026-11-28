import data from '../data/credentials.json';

/** Contractor licences, read from Technical Safety BC's public register
 *  rather than from the certificates in the filing cabinet.
 *
 *  That distinction is the reason this file exists. The wallet cards Allied
 *  holds had all passed their printed expiry — the gas card in March 2025,
 *  the boiler card in May 2025 — while the register showed every licence
 *  active under a later term. A credential typed into a page from a
 *  certificate is a credential that goes stale silently, and this is the one
 *  claim on the site that a procurement officer verifies first.
 *
 *  So no page states a licence. Pages ask this module, and a licence whose
 *  term has ended is simply not returned: the page then says less rather
 *  than saying something untrue. `npm run check:head` warns while a licence
 *  is inside its last sixty days, which is the signal to re-check the
 *  register and update `src/data/credentials.json`.
 *
 *  Two entities, deliberately. The gas licence is held by Allied Plumbing and
 *  Heating Ltd. and the boiler and refrigeration licences by Allied Plumbing
 *  Heating & Air Conditioning Ltd. That is what the register says — two
 *  records, two contact addresses — so each licence is published beside the
 *  name that holds it. A bidders-list check compares the licence holder
 *  against the legal name on the bid, and finding the mismatch here is worse
 *  for Allied than reading it on the page. */

export type Entity = (typeof data.entities)[number];
export type Licence = (typeof data.licences)[number];

export const CREDENTIALS_SOURCE = data.source;
export const CREDENTIALS_SOURCE_URL = data.sourceUrl;
export const CREDENTIALS_CHECKED = data.checked;

export const ENTITIES = data.entities as Entity[];

/** Licences whose term covers `on` — the build date in practice. A lapsed
 *  licence disappears from the page instead of being advertised. */
export function currentLicences(on: Date = new Date()): Licence[] {
  const today = on.toISOString().slice(0, 10);
  return (data.licences as Licence[]).filter(
    licence => licence.issued <= today && today < licence.expires,
  );
}

/** Current licences inside their last `days`. Nothing renders these: the
 *  head check prints them so a renewal is noticed before a page goes quiet. */
export function expiringSoon(days = 60, on: Date = new Date()): Licence[] {
  const horizon = new Date(on.getTime() + days * 86_400_000).toISOString().slice(0, 10);
  return currentLicences(on).filter(licence => licence.expires <= horizon);
}

export function entityFor(licence: Licence): Entity | undefined {
  return ENTITIES.find(entity => entity.key === licence.entity);
}

/** The entities that hold at least one current licence, each with those
 *  licences. Empty when nothing is current, which is what collapses the
 *  credentials section rather than leaving an empty heading. */
export function licensedEntities(on: Date = new Date()) {
  const licences = currentLicences(on);
  return ENTITIES.map(entity => ({
    entity,
    licences: licences.filter(licence => licence.entity === entity.key),
  })).filter(group => group.licences.length > 0);
}

/** True only when every entity holding a current licence has a clean record.
 *  One enforcement action anywhere and the claim is not made at all. */
export function cleanSafetyRecord(on: Date = new Date()): boolean {
  const groups = licensedEntities(on);
  return (
    groups.length > 0 &&
    groups.every(
      ({ entity }) => entity.enforcementActions === 0 && entity.overdueNonCompliances === 0,
    )
  );
}

/** The one-line summary for the utility bar: the technologies currently
 *  licensed, in a readable order. Empty when nothing is current, which is
 *  what removes the line from the strip rather than leaving "licensed:"
 *  followed by nothing. */
export function licensedSummary(on: Date = new Date()): string {
  const licences = currentLicences(on);
  const parts: string[] = [];
  if (licences.some(licence => licence.technology === 'Gas')) parts.push('gas');
  if (licences.some(licence => licence.technology.startsWith('Boiler')))
    parts.push('boiler and refrigeration');
  return parts.join(', ');
}
