import { responsiveImage, imageCandidates } from '../lib/images';
import { Link } from '../lib/navigation';
import team from '../data/team.json';

/** 227 words, nearly all of it the six bios in `team.json`.
 *
 *  The page is on an institutional buyer's checking route, and the useful
 *  thing it already held was buried: named individuals with named trade
 *  tickets. That is the opposite of the blanket "certified technicians" line
 *  deleted from the quote and service pages — a specific, checkable claim
 *  about a specific person rather than a slogan about a crew.
 *
 *  So the page now explains who you deal with at each stage, and what the
 *  tickets listed under each name actually certify. The Class B description
 *  is Technical Safety BC's own 120 kW certificate; no scope is stated for
 *  Class A beyond its being the broader of the two, because the regulation
 *  was not checked for this page. Nothing is claimed about the company as a
 *  whole — company-level licences, insurance and safety programme are
 *  still Q3. */
export default function Team() {
  const withPhoto = [...team].sort((a, b) => Number(Boolean(b.image)) - Number(Boolean(a.image)));
  return <section className="mx-auto max-w-6xl px-4 md:px-6 py-8 md:py-10">
    <h1 className="text-4xl md:text-5xl font-extrabold">Our team</h1>
    <p className="mt-5 max-w-3xl text-lg leading-relaxed text-neutral-700">The people who estimate the work, run it and stand on the site while it happens. There is no sales department between you and them: estimating and delivery sit in one role here, so the division that prices a project is the division that runs it.</p>

    <div className="mt-12 max-w-3xl space-y-10">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold">Who you deal with, and when</h2>
        <p className="mt-4 text-neutral-700 leading-relaxed">A mechanical project passes through the same hands in the same order, and it helps to know whose answer you are waiting for.</p>
        <ul className="mt-4 list-disc pl-5 space-y-3 text-neutral-700 leading-relaxed">
          <li><strong>Before award</strong> — the projects division reviews the drawings, the site constraints and the closing date, and prices the scope. Questions about what a tender package is missing come from here.</li>
          <li><strong>Planning and procurement</strong> — a project manager takes the schedule, the submittals, the long-lead equipment and the permits, and holds the sequence against the other trades.</li>
          <li><strong>On site</strong> — a foreman runs the daily work, the field crews and the subtrades, and books the inspections. This is who the building operator talks to about access, shutdowns and what is happening tomorrow.</li>
          <li><strong>Plumbing and plant</strong> — the plumbing division carries installations, service and plant upgrades, including the permit and subcontractor coordination that comes with them.</li>
          <li><strong>After handover</strong> — accounts and service take the building on: invoices, call-outs and any maintenance programme that follows the project.</li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl md:text-3xl font-bold">What the qualifications under each name mean</h2>
        <p className="mt-4 text-neutral-700 leading-relaxed">The tickets listed below belong to the individuals named, not to the company as a whole, and they are worth reading rather than skimming:</p>
        <ul className="mt-4 list-disc pl-5 space-y-3 text-neutral-700 leading-relaxed">
          <li><strong>Red Seal</strong> is the interprovincial endorsement on a provincial trade certificate. A Red Seal Plumber or an HVAC/R Red Seal has passed the national standard examination for that trade, and the certificate is recognised in every province without re-examination.</li>
          <li><strong>Gasfitter Class B</strong> is Technical Safety BC’s 120 kW certificate — gas appliance work up to that input rating, under permit.</li>
          <li><strong>Gasfitter Class A</strong> is the broader of the two BC gas certifications.</li>
        </ul>
        <p className="mt-4 text-neutral-700 leading-relaxed">Where a name below carries no ticket, the role is not a trade role — project management and accounts are not certified trades, and we would rather show that honestly than decorate the list.</p>
      </div>
    </div>

    <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">{withPhoto.map(member => <article key={member.name} className="border-t border-neutral-300 pt-6">{member.image ? <img src={responsiveImage(member.image, 768)} srcSet={imageCandidates(member.image)} sizes="(min-width: 1024px) 360px, (min-width: 768px) 45vw, 100vw" alt={member.name} width={600} height={600} loading="lazy" className="aspect-[4/5] w-full object-cover object-top rounded-2xl clip-tilt mb-6" /> : null}
      <h2 className="text-2xl font-bold">{member.name}</h2><p className="mt-2 font-semibold text-neutral-800">{member.role}</p><p className="mt-4 max-w-prose leading-relaxed text-neutral-700">{member.bio}</p><h3 className="mt-5 text-sm font-bold text-neutral-900">Areas of responsibility</h3><p className="mt-2 text-sm leading-relaxed text-neutral-700">{member.focus}</p>{member.credentials.length > 0 && <ul className="mt-4 list-disc pl-5 space-y-1 text-sm text-neutral-700">{member.credentials.map(credential => <li key={credential}>{credential}</li>)}</ul>}</article>)}</div>

    <div className="mt-14 max-w-3xl border-t border-neutral-200 pt-8">
      <h2 className="text-2xl md:text-3xl font-bold">Joining the team</h2>
      <p className="mt-4 text-neutral-700 leading-relaxed">Mechanical work is learned on site, and the route from apprentice to site lead runs through the same projects described on this site rather than around them. If you are a plumber, gasfitter, HVAC/R technician or apprentice, our <Link to="/careers" className="font-semibold text-red-800 underline underline-offset-4">careers page</Link> lists what is open.</p>
      <p className="mt-4 text-neutral-700 leading-relaxed"><Link to="/blog/mechanical-career-paths" className="font-semibold text-red-800 underline underline-offset-4">From apprentice to site lead</Link> describes how those roles actually progress in a company this size.</p>
    </div>

    <div className="mt-12 border-t border-neutral-200 pt-8"><h2 className="text-2xl font-bold">Speak with our team</h2><p className="mt-3 text-neutral-700">Tell us about your building, equipment or project requirements.</p><Link to="/contact" className="inline-block mt-4 rounded-lg bg-red-700 px-5 py-3 font-semibold text-white hover:bg-red-800">Contact Allied Plumbing</Link></div>
  </section>;
}
