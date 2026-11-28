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
 *  checks, so it is the thing the page quotes — the register's own wording
 *  for the scope, with the date the register was read.
 *
 *  Licence numbers and expiry dates are held in `credentials.json` and
 *  deliberately not rendered. The card says "Active" and the section says
 *  when the register was last read, which together are the honest claim; a
 *  printed expiry invites a reader to check the arithmetic on a page that
 *  was built weeks earlier. They are what the page is checked against, not what it has to
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
        and dates included. Each licence below is active, and the scope wording is the register&rsquo;s
        own rather than ours. Last checked on {checked}.
      </p>

      {groups.map(({ entity, licences }) => (
        <div key={entity.key} className="mt-10">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Held by {entity.name}
          </h3>
          <dl className="mt-4 grid gap-5 md:grid-cols-2">
            {licences.map(licence => (
              <div
                key={licence.number}
                className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                {/* A seal, not a photograph of one: a quiet brand-coloured
                    wash behind the corner so the card reads as a credential
                    rather than as another bordered box on the page. */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-[0.07] transition group-hover:opacity-[0.12]"
                  style={{ background: 'radial-gradient(closest-side,#991b1b 60%,transparent)' }}
                />
                <div className="relative flex items-start justify-between gap-4">
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600">
                    <Seal />
                    Technical Safety BC
                  </span>
                  <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-800 ring-1 ring-emerald-600/20">
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                    Active
                  </span>
                </div>
                <dt className="relative mt-4 text-lg font-bold leading-snug">
                  {licence.label}
                </dt>
                <dd className="relative mt-3 border-t border-neutral-100 pt-3 text-neutral-700 leading-relaxed">
                  {licence.scope}
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

function Seal() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-red-800" fill="currentColor" aria-hidden>
      <path d="M12 2 4 5v6.2c0 4.9 3.4 9.5 8 10.8 4.6-1.3 8-5.9 8-10.8V5l-8-3Zm0 2.2 6 2.2v4.8c0 3.8-2.5 7.5-6 8.7-3.5-1.2-6-4.9-6-8.7V6.4l6-2.2Zm-1 11.1-3-3 1.4-1.4L11 12.5l4.6-4.6L17 9.3l-6 6Z" />
    </svg>
  );
}
