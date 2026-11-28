import { Link } from '../lib/navigation';
import JsonLd from '../components/JsonLd';
import { breadcrumbSchema } from '../lib/schema';
import data from '../data/incentives.json';

/** Section 7a of the November 2026 page-copy plan: what pays for a fuel
 *  switch, and what Allied supplies for each programme.
 *
 *  The plan's own table listed CleanBC Custom, Custom-Lite and Commercial
 *  Express as live routes. Checking Better Buildings BC on 28 November 2026,
 *  all three say "not currently accepting new applications" — so the page as
 *  drafted would have sent a strata council and a school district to three
 *  closed programmes and dated itself the week it shipped. This page says
 *  which are open, which are closed, and when that was last checked.
 *
 *  That makes the closed list the most useful part rather than an omission.
 *  Owners arrive having read a 2024 article, and being told plainly that the
 *  programme ended saves them the phone call they would otherwise make to
 *  find out.
 *
 *  Everything here is data in `src/data/incentives.json` with the date it was
 *  read. `npm run check:head` warns once that date is older than the
 *  re-check interval, because an incentives page nobody revisits is worse
 *  than no incentives page — it is wrong with authority. */
export default function Incentives() {
  const checked = new Intl.DateTimeFormat('en-CA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(data.checked));

  return (
    <section className="max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-16">
      <JsonLd data={breadcrumbSchema([{ name: 'Incentives', path: '/incentives' }])} />

      <h1 className="text-4xl md:text-5xl font-extrabold">
        Funding a heat pump or electrification project in BC
      </h1>
      <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-900 ring-1 ring-amber-600/20">
        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-amber-600" />
        Programmes last checked on {checked}
      </p>
      <p className="mt-6 text-lg leading-relaxed text-neutral-700">
        In British Columbia most building incentives now pay for switching away from gas rather
        than for new gas equipment. Programmes also open and close with their funding, which is
        the single most important thing to know before you plan around one: three of the
        programmes most often cited in articles about BC retrofits are closed to new applications
        today.
      </p>
      <p className="mt-4 leading-relaxed text-neutral-700">
        The building owner applies. We supply the quotes, the equipment specifications and the
        invoices each programme asks for, in the format it asks for them.
      </p>

      <h2 className="mt-12 text-2xl md:text-3xl font-bold">Open to new applications</h2>
      <div className="mt-6 space-y-6">
        {data.open.map(programme => (
          <div key={programme.name} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-xl font-bold">{programme.name}</h3>
                <p className="mt-1 text-sm font-semibold text-slate-600">{programme.provider}</p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-800 ring-1 ring-emerald-600/20">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                Open
              </span>
            </div>
            <p className="mt-4 text-neutral-700 leading-relaxed">
              <strong className="font-semibold">Who it is for.</strong> {programme.who}
            </p>
            <p className="mt-4 font-semibold">What it funds</p>
            <ul className="mt-2 list-disc pl-5 space-y-2 text-neutral-700 leading-relaxed">
              {programme.funds.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-4 text-neutral-700 leading-relaxed">
              <strong className="font-semibold">Not eligible.</strong> {programme.excluded}
            </p>
            <p className="mt-4 text-neutral-700 leading-relaxed">
              <strong className="font-semibold">What we do.</strong> {programme.role}
            </p>
            <p className="mt-4">
              <a
                href={programme.url}
                rel="noopener"
                className="font-semibold text-red-800 underline underline-offset-4"
              >
                Programme details and eligibility
              </a>
            </p>
          </div>
        ))}
      </div>

      <h2 className="mt-12 text-2xl md:text-3xl font-bold">Closed to new applications</h2>
      <p className="mt-4 leading-relaxed text-neutral-700">
        These are the programmes most often named in articles and board papers about BC retrofits,
        and they are the reason a budget built from last year&rsquo;s reading can be out by six
        figures. If a business case depends on one of them, it needs rebuilding.
      </p>
      <div className="mt-6 space-y-4">
        {data.closed.map(programme => (
          <div key={programme.name} className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h3 className="text-lg font-bold">{programme.name}</h3>
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-slate-200 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-700">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-slate-500" />
                Closed
              </span>
            </div>
            <p className="mt-3 text-neutral-700 leading-relaxed">{programme.note}</p>
            <p className="mt-3">
              <a
                href={programme.url}
                rel="noopener"
                className="font-semibold text-red-800 underline underline-offset-4"
              >
                Programme page
              </a>
            </p>
          </div>
        ))}
      </div>

      <h2 className="mt-12 text-2xl md:text-3xl font-bold">
        If your building is a school, campus or commercial property
      </h2>
      <p className="mt-4 leading-relaxed text-neutral-700">
        With CleanBC Custom and Commercial Express closed, there is no open provincial capital
        programme aimed at those buildings today. That does not mean there is nothing: BC Hydro and
        FortisBC run their own commercial offers, and a public-sector building may have funding
        routes of its own. The place to start is your BC Hydro Key Account Manager, who will know
        what is open this quarter — which is also why we price a heat pump option whether or not
        an incentive is available for it, so the decision does not sit on a programme that may
        close.
      </p>

      <h2 className="mt-12 text-2xl md:text-3xl font-bold">
        The order of operations that keeps you eligible
      </h2>
      <ol className="mt-5 list-decimal pl-5 space-y-3 text-neutral-700 leading-relaxed">
        <li>
          Talk to the programme — your BC Hydro Key Account Manager or the programme team — before
          you sign anything. Most programmes require pre-approval in writing.
        </li>
        <li>Get the opportunity assessment or feasibility study where the programme funds one. It sets the savings the capital incentive is calculated from.</li>
        <li>Get contractor pricing on the measures that study identifies. That is where we come in.</li>
        <li>Receive pre-approval in writing before the contract is signed or any work starts.</li>
        <li>Install, commission, then submit the invoices and equipment data in the format the programme specifies.</li>
      </ol>

      <h2 className="mt-12 text-2xl md:text-3xl font-bold">Why applications fail</h2>
      <ul className="mt-5 list-disc pl-5 space-y-3 text-neutral-700 leading-relaxed">
        <li>The contract was signed, or the work started, before pre-approval came through. This is the common one, and it cannot be fixed afterwards.</li>
        <li>The equipment model is not on the programme&rsquo;s eligible list — which is worth checking before the order, not after.</li>
        <li>The invoice does not itemise equipment, labour and model numbers the way the programme asks.</li>
        <li>The building&rsquo;s utility account is outside the programme&rsquo;s territory.</li>
        <li>The programme closed between the business case and the application.</li>
      </ul>

      <h2 className="mt-12 text-2xl md:text-3xl font-bold">Ask us to price both options</h2>
      <p className="mt-4 leading-relaxed text-neutral-700">
        Send the boiler size, a photograph of the electrical service nameplate and the heating
        drawings if you have them. We will price a hybrid and a full-electric option beside a
        like-for-like replacement, and say which programmes each may qualify for as things stand
        when you ask. See{' '}
        <Link to="/services/heat-pump-conversions" className="font-semibold text-red-800 underline underline-offset-4">
          heat pump conversions
        </Link>{' '}
        for what the work involves, or{' '}
        <Link to="/strata" className="font-semibold text-red-800 underline underline-offset-4">
          the strata page
        </Link>{' '}
        if a council has to vote on it.
      </p>
      <p className="mt-4 text-sm text-slate-600">
        Programme details above are summarised from{' '}
        <a href={data.sourceUrl} rel="noopener" className="underline underline-offset-4">
          {data.source}
        </a>{' '}
        and were last checked on {checked}. Amounts, eligibility and status change with programme
        funding — confirm with the programme before you rely on any of it.
      </p>
      <Link to="/quote?type=quote&amp;service=heat-pump-conversions" className="inline-block mt-8 rounded-lg bg-red-700 px-5 py-3 font-semibold text-white hover:bg-red-800">
        Price a heat pump option
      </Link>
    </section>
  );
}
