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

  return (
    <section className="pt-10 md:pt-14">
      <h2 className="text-3xl md:text-4xl font-extrabold">Who we work for</h2>
      <p className="mt-4 max-w-3xl text-neutral-700 leading-relaxed">
        Almost all of our work happens in a building that cannot close while we are in it. That
        is the constraint everything else is organised around.
      </p>

      <div className="mt-9 grid gap-8 md:grid-cols-3">
        <div className="border-t border-slate-300 pt-5">
          <h3 className="text-xl font-bold">Schools and institutions</h3>
          <p className="mt-3 text-neutral-700 leading-relaxed">
            {`${institutional} of the project pages on this site are institutional: boiler plants, classroom ventilation and cooling for school districts No. ${districts.slice(0, -1).join(', No. ')} and No. ${districts.at(-1)}, for Capilano University and for Collingwood School. Most of it is scheduled around the school calendar, because most of it happens while classes run.`}
          </p>
          <p className="mt-4">
            <Link to="/projects" className="font-semibold text-red-800 underline underline-offset-4">
              See school projects
            </Link>
          </p>
        </div>

        <div className="border-t border-slate-300 pt-5">
          <h3 className="text-xl font-bold">Strata and rental buildings</h3>
          <p className="mt-3 text-neutral-700 leading-relaxed">
            Central boiler and hot water plants replaced in occupied towers, and maintained in the
            years between replacements. Residents keep their heat and hot water through the work,
            which is what decides how a changeover is phased.
          </p>
          <p className="mt-4">
            <Link to="/strata" className="font-semibold text-red-800 underline underline-offset-4">
              Strata services
            </Link>
          </p>
        </div>

        <div className="border-t border-slate-300 pt-5">
          <h3 className="text-xl font-bold">Commercial and public buildings</h3>
          <p className="mt-3 text-neutral-700 leading-relaxed">
            Plant and controls replaced in buildings that stay in service — including a heating
            plant inside an operating police facility, where access and continuity set the
            sequence before anything mechanical did. Night and weekend shutdowns where the
            building needs them.
          </p>
          <p className="mt-4">
            <Link to="/services" className="font-semibold text-red-800 underline underline-offset-4">
              Commercial services
            </Link>
          </p>
        </div>
      </div>

      <p className="mt-9 max-w-3xl text-neutral-700 leading-relaxed">
        The organisations whose buildings we have worked in are listed on the{' '}
        <Link to="/clients" className="font-semibold text-red-800 underline underline-offset-4">
          clients page
        </Link>
        , and every project page is open to read. If you are prequalifying contractors, the{' '}
        <Link to="/rfp" className="font-semibold text-red-800 underline underline-offset-4">
          procurement page
        </Link>{' '}
        has the company facts and the licences in one place.
      </p>
    </section>
  );
}
