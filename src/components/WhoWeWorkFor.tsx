import { Link } from '../lib/navigation';
import projects from '../data/projects.json';

/** Section 2 of the November 2026 page-copy plan: who Allied works for,
 *  which is the first thing an institutional buyer wants and the one thing
 *  the homepage did not say.
 *
 *  It replaces a three-step "from first enquiry to a defined scope" block.
 *  That block explained how to send an enquiry to someone who had not yet
 *  decided to send one, and it sat above every piece of evidence on the
 *  page. The same sequence now appears where it is actually wanted — on
 *  `/quote` and on the thank-you pages, read by somebody who has just
 *  enquired.
 *
 *  It is built from the homepage's own vocabulary rather than as plain
 *  prose: the split eyebrow-and-heading of the services row, cards with the
 *  silhouette of the four approach cards directly above it, and their link
 *  colour. Written as bare text it read as an unstyled gap between two
 *  designed sections.
 *
 *  The counts and the district numbers are derived from `projects.json`, so
 *  a new project page updates this paragraph and nobody has to remember to.
 *  The plan's "[200+] residential buildings on scheduled contracts" and its
 *  sixth school district are not here: neither is evidenced yet. */
export default function WhoWeWorkFor() {
  const districts = [
    ...new Set(
      projects
        .map(project => project.client)
        .filter(client => client.includes('School District'))
        .map(client => client.match(/No\. (\d+)/)?.[1])
        .filter(Boolean),
    ),
  ].sort((a, b) => Number(a) - Number(b));
  const institutional = projects.filter(project => project.category === 'Institutional').length;

  const cards = [
    {
      icon: <HatIcon />,
      title: 'Schools and institutions',
      text: `${institutional} of the project pages on this site are institutional: boiler plants, classroom ventilation and cooling for school districts No. ${districts.slice(0, -1).join(', No. ')} and No. ${districts.at(-1)}, for Capilano University and for Collingwood School. Most of it is scheduled around the school calendar, because most of it happens while classes run.`,
      to: '/projects',
      cta: 'See school projects',
    },
    {
      icon: <TowerIcon />,
      title: 'Strata and rental buildings',
      text: 'Central boiler and hot water plants replaced in occupied towers, and maintained in the years between replacements. Residents keep their heat and hot water through the work, which is what decides how a changeover is phased.',
      to: '/strata',
      cta: 'Strata services',
    },
    {
      icon: <ShieldIcon />,
      title: 'Commercial and public buildings',
      text: 'Plant and controls replaced in buildings that stay in service — including a heating plant inside an operating police facility, where access and continuity set the sequence before anything mechanical did. Night and weekend shutdowns where the building needs them.',
      to: '/services',
      cta: 'Commercial services',
    },
  ];

  return (
    <section className="pt-10 md:pt-14">
      <div className="mb-7 md:mb-9 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.14em] text-neutral-500 mb-2">
            Who we work for
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
            Buildings that stay open
            <br className="hidden md:block" /> while we work in them
          </h2>
        </div>
        <Link
          to="/clients"
          className="shrink-0 inline-flex items-center gap-2 rounded-lg bg-[#315cb4] text-white px-4 py-2 text-sm font-semibold hover:brightness-110 transition"
        >
          See our clients <span aria-hidden>↗</span>
        </Link>
      </div>

      <p className="max-w-3xl text-neutral-700 leading-relaxed">
        Almost all of our work happens in a building that cannot close while we are in it. That is
        the constraint everything else is organised around.
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {cards.map(card => (
          <article
            key={card.title}
            className="group flex flex-col rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-xl focus-within:ring-2 focus-within:ring-red-500"
          >
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-neutral-100 text-neutral-900">
              {card.icon}
            </div>
            <h3 className="mt-4 text-xl font-bold">{card.title}</h3>
            <p className="mt-3 text-neutral-600 leading-relaxed">{card.text}</p>
            <Link
              to={card.to}
              className="mt-auto pt-4 inline-block self-start text-sm font-semibold text-[#315cb4] underline underline-offset-4"
            >
              {card.cta}
            </Link>
          </article>
        ))}
      </div>

      <p className="mt-8 max-w-3xl rounded-2xl bg-neutral-50 p-5 text-sm text-neutral-700 leading-relaxed">
        Every project page is open to read. If you are prequalifying contractors, the{' '}
        <Link to="/rfp" className="font-semibold text-[#315cb4] underline underline-offset-4">
          procurement page
        </Link>{' '}
        has the company facts and the licences in one place.
      </p>
    </section>
  );
}

function HatIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M12 3 1 9l11 6 9-4.91V17h2V9L12 3Zm-7 9.74V15c0 2.76 4.03 5 7 5s7-2.24 7-5v-2.26l-7 3.91-7-3.91Z" />
    </svg>
  );
}

function TowerIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M5 2h9a1 1 0 0 1 1 1v5h4a1 1 0 0 1 1 1v12h-2v-2h-3v2H4V3a1 1 0 0 1 1-1Zm2 3v2h2V5H7Zm4 0v2h2V5h-2ZM7 9v2h2V9H7Zm4 0v2h2V9h-2Zm-4 4v2h2v-2H7Zm4 0v2h2v-2h-2Zm6-3v7h2v-7h-2Z" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M12 2 4 5v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V5l-8-3Zm0 4.2 6 2.25V11c0 4.04-2.78 7.8-6 8.97C8.78 18.8 6 15.04 6 11V8.45L12 6.2Z" />
    </svg>
  );
}
