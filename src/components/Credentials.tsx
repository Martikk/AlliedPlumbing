import {
  CREDENTIALS_CHECKED,
  CREDENTIALS_SOURCE_URL,
  cleanSafetyRecord,
  licensedEntities,
} from '../lib/credentials';

/** The licences, as Technical Safety BC's public register states them.
 *
 *  Audit Q3. Until now the site claimed no licence at all, because the only
 *  evidence anyone had was a drawer of wallet cards that had all passed their
 *  printed expiry. The register is the thing a procurement officer actually
 *  checks, so it is the thing the page quotes — the term and the register's
 *  own wording for the scope, with the date the register was read.
 *
 *  The licence numbers are held in `credentials.json` and deliberately not
 *  rendered. They are what the page is checked against, not what it has to
 *  advertise: anyone verifying Allied searches the register by name and
 *  finds the numbers there. Keeping them out of the HTML also keeps them out
 *  of scrapers and out of the quoting-a-number-that-has-since-changed
 *  problem.
 *
 *  Two names, on purpose. The register holds the gas licence under Allied
 *  Plumbing and Heating Ltd. and the boiler and refrigeration licences under
 *  Allied Plumbing Heating & Air Conditioning Ltd. Publishing them under one
 *  name would make the page disagree with the register that verifies it.
 *
 *  Nothing here is typed: a licence past its term is dropped by
 *  `currentLicences`, and the whole section disappears if none is current. */
export default function Credentials() {
  const groups = licensedEntities();
  if (groups.length === 0) return null;
  const clean = cleanSafetyRecord();
  const checked = new Intl.DateTimeFormat('en-CA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(CREDENTIALS_CHECKED));

  return (
    <section id="credentials" className="scroll-mt-24">
      <h2 className="text-3xl font-bold">Licences and safety record</h2>
      <p className="mt-4 leading-relaxed text-neutral-700">
        Regulated mechanical work in British Columbia is licensed by Technical Safety BC, and its
        register is public: anyone can look Allied up and read the same entries, licence numbers
        included. The terms and the scope wording below are taken from that register rather than
        from our own paperwork, and were last checked on {checked}.
      </p>

      {groups.map(({ entity, licences }) => (
        <div key={entity.key} className="mt-8">
          <h3 className="text-xl font-semibold">{entity.name}</h3>
          <dl className="mt-4 space-y-5">
            {licences.map(licence => (
              <div key={licence.number} className="rounded-xl border border-neutral-200 p-5">
                <dt className="font-semibold">{licence.technology}</dt>
                <dd className="mt-2 text-neutral-700 leading-relaxed">
                  {licence.scope}
                </dd>
                <dd className="mt-2 text-sm text-slate-600">
                  Active to{' '}
                  <time dateTime={licence.expires}>
                    {new Intl.DateTimeFormat('en-CA', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      timeZone: 'UTC',
                    }).format(new Date(licence.expires))}
                  </time>
                  .
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ))}

      {clean && (
        <p className="mt-6 leading-relaxed text-neutral-700">
          Both records show no enforcement actions and no overdue non-compliances. Technical Safety
          BC publishes enforcement history from 1 January 2022 onwards, so that is the period those
          counts cover.
        </p>
      )}

      <p className="mt-4 leading-relaxed text-neutral-700">
        The two company names are not an error on this page. The register holds the gas licence
        under Allied Plumbing and Heating Ltd. and the boiler, pressure vessel and refrigeration
        licences under Allied Plumbing Heating &amp; Air Conditioning Ltd., so each one is listed
        beside the name that holds it.
      </p>
      <p className="mt-4 leading-relaxed text-neutral-700">
        A gas contractor licence carries no class of its own — its scope is set by the certificate
        of qualification held by whoever does the work. Those are the Red Seal and Gasfitter Class
        A and B tickets listed against each person further down this page.
      </p>
      <p className="mt-5">
        <a
          href={CREDENTIALS_SOURCE_URL}
          className="font-semibold text-red-800 underline underline-offset-4"
          rel="noopener"
        >
          Look us up on Technical Safety BC&rsquo;s register
        </a>
      </p>
    </section>
  );
}
