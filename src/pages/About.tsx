import { Link } from '../lib/navigation';
import TeamSection from '../components/TeamSection';
import projects from '../data/projects.json';
import { RESPONSE_PROMISE, yearsInBusiness } from '../config';

/** The page someone reads when they are deciding whether to trust Allied with
 *  a building. At 189 words it could not do that, and it was the thinnest page
 *  on the site after /rfp.
 *
 *  Everything stated here is carried elsewhere: the service lines by
 *  `/services`, the districts and campuses by `projects.json`, the handover
 *  list by the project pages that describe it happening. No licence,
 *  certification, insurance limit, staff count or founding year is claimed —
 *  all of those are open questions (Q3, Q6), and the meta description used to
 *  claim "since the late 1990s" with nothing behind it.
 *
 *  Years in business is the exception, and it was already on the homepage
 *  counter while this page said nothing: the January 2025 RFPQ states 25+
 *  years, so `yearsInBusiness()` carries that lower bound forward. A
 *  founding year is still not documented and is still not claimed.
 *
 *  The two counts are derived rather than typed, so adding a project or
 *  finishing one cannot leave a stale number on the page. */
export default function About() {
  const inProgress = projects.filter(project => project.status).length;
  return <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-10">
    <div className="grid lg:grid-cols-[1.1fr_.9fr] gap-10 items-start"><div>
    <h1 className="text-4xl md:text-5xl font-extrabold">About Allied Plumbing</h1>
    <p className="mt-6 max-w-3xl text-xl leading-relaxed text-neutral-700">Allied Plumbing, Heating &amp; Air Conditioning is a mechanical contractor based on 2nd Avenue in Burnaby. We install, replace and maintain heating, ventilation, air conditioning, refrigeration and plumbing systems in buildings that are already in use — schools, campuses, rental and strata buildings, and commercial and institutional facilities across Metro Vancouver and the Sea to Sky corridor. The company has been doing that work for more than {yearsInBusiness()} years.</p>
    <Link to="/quote" className="btn-brand mt-6">Discuss your project <span aria-hidden>↗</span></Link></div><img src="https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,w_1000/v1760068156/Allied/14_urnogx.png" alt="" width={1000} height={800} className="clip-tilt rounded-2xl h-72 md:h-96 w-full object-cover" /></div>

    <section className="mt-12 max-w-3xl">
      <h2 className="text-3xl font-bold">The work itself</h2>
      <p className="mt-4 leading-relaxed text-neutral-700">On site the work is mechanical: boiler plant replacements, air-source heat pump conversions, rooftop chillers, classroom and gymnasium ventilation, domestic hot water plants, make-up air units, and the gas fitting, piping and controls that tie them together. We also carry out the plumbing and the preventive maintenance that keep those systems running after the project closes, so the handover records stay with the people who hold them.</p>
      <ul className="mt-6 space-y-3 text-neutral-700">
        <li><Link to="/services/hvac" className="font-semibold text-red-800 underline underline-offset-4">Commercial HVAC</Link> — ventilation, cooling, heat pumps and rooftop equipment.</li>
        <li><Link to="/services/boilers" className="font-semibold text-red-800 underline underline-offset-4">Boiler plants</Link> — replacements, conversions and hydronic distribution.</li>
        <li><Link to="/services/commercial-plumbing" className="font-semibold text-red-800 underline underline-offset-4">Commercial plumbing</Link> — domestic water, drainage and hot water systems.</li>
        <li><Link to="/services/maintenance" className="font-semibold text-red-800 underline underline-offset-4">Preventive maintenance</Link> — scheduled programs for the plant we and others installed.</li>
        <li><Link to="/services/emergency" className="font-semibold text-red-800 underline underline-offset-4">Emergency service</Link> — no heat, leaks and gas problems, around the clock.</li>
        <li><Link to="/services/residential-plumbing" className="font-semibold text-red-800 underline underline-offset-4">Residential plumbing</Link> — houses and small multi-family buildings.</li>
      </ul>
    </section>

    <section className="mt-12 max-w-3xl">
      <h2 className="text-3xl font-bold">Where we work, and for whom</h2>
      <p className="mt-4 leading-relaxed text-neutral-700">The {projects.length} project pages on this site describe work in Vancouver, Burnaby, New Westminster, Coquitlam, North and West Vancouver, Squamish and Whistler, and {inProgress} of those projects are running now.</p>
      <p className="mt-4 leading-relaxed text-neutral-700">Most of it is institutional. We work in the buildings of school districts No. 39 (Vancouver), No. 40 (New Westminster), No. 43 (Coquitlam), No. 45 (West Vancouver) and No. 48 (Sea to Sky), at Capilano University and at Collingwood School. The rest is residential and rental: heating plants, domestic hot water and make-up air renewed in buildings where people are living through the work.</p>
      <p className="mt-4 leading-relaxed text-neutral-700">Distance is part of the scope rather than an afterthought. A Whistler school upgrade is planned around the season, the delivery window and crew travel; a downtown Vancouver roof is planned around a street closure and a crane permit. Both of those are written up on their own pages.</p>
      <p className="mt-6"><Link to="/clients" className="font-semibold text-red-800 underline underline-offset-4">See the organisations we work for</Link> or <Link to="/projects" className="font-semibold text-red-800 underline underline-offset-4">read the project scopes</Link>.</p>
    </section>

    <section className="mt-12 max-w-3xl">
      <h2 className="text-3xl font-bold">Buildings that stay open while we work</h2>
      <p className="mt-4 leading-relaxed text-neutral-700">Most of our projects happen in a building that cannot close for them. A school keeps teaching, a residential building keeps its tenants, a campus keeps its timetable. That decides the shape of the work: phasing agreed with the building operator, shutdowns taken at night, on weekends or inside a 2–6 AM window, temporary heat or water where a system has to come offline, and hoarding, dust control and access routes that keep a live site separate from the people using it.</p>
      <p className="mt-4 leading-relaxed text-neutral-700">It also decides who has to be in the room early. Mechanical work of this kind pulls in electrical, sheet metal, structural, roofing, insulation, controls and testing-and-balancing trades, and the permits — gas, boiler, refrigeration, and the street-use and crane permits a rooftop lift needs. We coordinate those against one mechanical schedule rather than leaving the owner to reconcile several.</p>
      <p className="mt-6"><Link to="/blog/working-in-occupied-schools-and-buildings" className="font-semibold text-red-800 underline underline-offset-4">How we plan work in occupied schools and buildings</Link></p>
    </section>

    <section className="mt-12 max-w-3xl">
      <h2 className="text-3xl font-bold">What the owner has at the end</h2>
      <p className="mt-4 leading-relaxed text-neutral-700">A mechanical project is not finished when the equipment runs. Shop drawings, RFIs and submittals go out in the format the design team asks for; testing, adjusting and balancing and commissioning are carried out and recorded; O&amp;M manuals and as-built drawings are handed over; and the people who will operate the system are shown how it works before we leave. Where a maintenance program follows, it starts from those records rather than from a fresh survey.</p>
      <p className="mt-6"><Link to="/blog/commissioning-and-handover" className="font-semibold text-red-800 underline underline-offset-4">What commissioning and handover should include</Link></p>
    </section>

    <div className="mt-12"><TeamSection /></div>

    <section className="mt-12 border-t border-neutral-200 pt-8">
      <h2 className="text-2xl font-bold">Discuss your building or project</h2>
      <p className="mt-3 text-neutral-700">Send the scope and the drawings, or call and describe the problem. {RESPONSE_PROMISE}</p>
      <p className="mt-3 text-neutral-700">For a tender or RFP, the <Link to="/rfp" className="font-semibold text-red-800 underline underline-offset-4">tender page</Link> lists what to include in the package.</p>
      <Link to="/quote" className="inline-block mt-5 rounded-lg bg-red-700 px-5 py-3 font-semibold text-white hover:bg-red-800">Request a Quote</Link>
    </section>
  </div>;
}
