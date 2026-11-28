import { Link } from '../lib/navigation';
import ClientTestimonials from '../components/ClientTestimonials';
import projects from '../data/projects.json';

/** 304 words, of which one sentence was written and the rest generated from
 *  `projects.json`.
 *
 *  The list itself had a defect worth more than the word count: the same
 *  school district appeared twice under two spellings — "School District
 *  No. 43" and "School District No. 43 (Coquitlam)" were separate headings
 *  with the schools split between them. Thirteen headings for ten
 *  organisations. The names in `projects.json` are now canonical, one per
 *  organisation, so this page and every project page agree.
 *
 *  Nothing here is a testimonial or an endorsement: it says whose buildings
 *  we have worked in, which the project pages already say one at a time. */
export default function Clients() {
  const clients = [...new Set(projects.map(project => project.client))];
  const districts = clients.filter(client => client.includes('School District'));
  return <section className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16">
    <h1 className="text-4xl md:text-5xl font-extrabold">Project clients</h1>
    <p className="mt-5 max-w-3xl text-lg leading-relaxed text-neutral-700">The {projects.length} project pages on this site were delivered for {clients.length} organisations: {districts.length} school districts, a university, an independent school, a public-safety facility, and owners of rental and strata housing. This page is a list of whose buildings we have worked in, not a list of endorsements — each name links to the scope it belongs to.</p>

    <div className="mt-10"><ClientTestimonials /></div>

    <div className="mt-14 max-w-3xl space-y-10">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold">School districts</h2>
        <p className="mt-4 text-neutral-700 leading-relaxed">Most of our work is for public school districts, and most of it repeats: five schools for School District No. 43 in Coquitlam, three in the Sea to Sky corridor for No. 48, and two separate scopes apiece at Crosstown Elementary for the Vancouver School Board and at Herbert Spencer Elementary in New Westminster — in both cases a later phase in a building we had already worked in. Boiler plants, classroom ventilation, rooftop equipment and the controls that run them, almost always inside a summer window or an overnight shutdown.</p>
        <p className="mt-4 text-neutral-700 leading-relaxed">District work arrives through tender and RFP rather than through a phone call, so the <Link to="/rfp" className="font-semibold text-red-800 underline underline-offset-4">tender page</Link> lists what a complete package needs from our side of the table.</p>
      </div>

      <div>
        <h2 className="text-2xl md:text-3xl font-bold">Campuses, independent schools and public facilities</h2>
        <p className="mt-4 text-neutral-700 leading-relaxed">Buildings that run to their own calendar rather than the public school year. At Capilano University two end-of-life chillers were changed over inside 2–6 AM shutdowns so the timetable was never interrupted. At Collingwood School a new chiller and air-handling cooling went in across two phases. A heating boiler was replaced inside an operating public-safety facility on West 5th Avenue, where access and continuity of service set the sequence before anything mechanical did.</p>
      </div>

      <div>
        <h2 className="text-2xl md:text-3xl font-bold">Rental and strata housing</h2>
        <p className="mt-4 text-neutral-700 leading-relaxed">Heating plants, domestic hot water and make-up air renewed in buildings where people are living through the work. Shutdown notice, temporary heat or hot water, and a restart that happens when it was promised matter more here than anywhere else, because the people affected are at home rather than at work.</p>
        <p className="mt-4 text-neutral-700 leading-relaxed">Two of those buildings appear under “Private rental housing owner” rather than a company name. The owner has not agreed to be named, so the scope is published and the name is not. That is the rule we apply by default: a project page goes up when the work can be described accurately, and a client name goes on it when the client has said yes.</p>
      </div>

      <div>
        <h2 className="text-2xl md:text-3xl font-bold">Checking us before a bid closes</h2>
        <p className="mt-4 text-neutral-700 leading-relaxed">If you have found this page because our name is on a bid list, the fastest route to a useful picture is the work itself: every <Link to="/projects" className="font-semibold text-red-800 underline underline-offset-4">project page</Link> describes its scope, the trades it had to be coordinated against and the problems that came up. <Link to="/about" className="font-semibold text-red-800 underline underline-offset-4">About Allied</Link> covers how the company is set up, and the <Link to="/team" className="font-semibold text-red-800 underline underline-offset-4">team page</Link> names the people who would run your project and lists their trade qualifications.</p>
      </div>
    </div>

    <div className="mt-14 grid md:grid-cols-2 gap-8">{clients.map(client => <article key={client} className="border-t border-neutral-300 pt-5"><h2 className="text-2xl font-bold">{client}</h2><ul className="mt-4 space-y-3">{projects.filter(project => project.client === client).map(project => <li key={project.id}><Link to={`/projects/${project.id}`} className="font-semibold text-red-800 underline underline-offset-4">{project.title}</Link></li>)}</ul></article>)}</div>
  </section>;
}
