import { Link } from '../lib/navigation';

/** The page an institutional buyer lands on when they already know the name.
 *
 *  Nothing linked here until the footer did, and at 92 words it could not do
 *  the job it exists for. Everything stated below is carried by a project page
 *  in `projects.json`; no credential, certification or response time is
 *  claimed, because those are still open questions (Q3, Q6 in the audit
 *  follow-up). The case-study links are the evidence, so they are the point of
 *  the page rather than decoration at the bottom of it. */
export default function RFP() {
  return <section className="max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-16">
    <h1 className="text-4xl md:text-5xl font-extrabold">Tenders, RFPs and mechanical project enquiries</h1>
    <p className="mt-6 text-lg leading-relaxed text-neutral-700">Send us the scope, the drawings, the site constraints and the closing date, and our estimating team will review the project. We work on school, institutional, strata and commercial mechanical work across Metro Vancouver and the Sea to Sky corridor.</p>

    <h2 className="mt-10 text-2xl font-bold">What to send with a tender or RFP</h2>
    <p className="mt-4 text-neutral-700 leading-relaxed">A complete package lets us price the work rather than the uncertainty around it. The items below are the ones that most often decide whether a mechanical bid can be firm.</p>
    <ul className="mt-4 list-disc pl-5 space-y-3 text-neutral-700">
      <li>Drawings and specifications, including the mechanical, electrical and structural sheets that the mechanical scope depends on.</li>
      <li>The closing date, the site meeting date, and how addenda will be issued.</li>
      <li>Building access: the hours work may happen, which spaces may be taken out of service, and who confirms a shutdown.</li>
      <li>Existing equipment and services that stay in use, with any records or previous assessments you hold, even incomplete ones.</li>
      <li>Known constraints — occupied spaces, limited electrical service, street access for a crane, hazardous materials surveys.</li>
      <li>Documentation and turnover requirements, including commissioning, O&amp;M format and training expectations.</li>
    </ul>

    <h2 className="mt-10 text-2xl font-bold">What we deliver alongside the installation</h2>
    <ul className="mt-4 list-disc pl-5 space-y-3 text-neutral-700">
      <li>Coordination of electrical, sheet metal, structural, roofing, insulation and controls subtrades against one mechanical schedule.</li>
      <li>Phased work in occupied schools and buildings, including night and weekend shutdowns planned with the building operator.</li>
      <li>Permits and inspections, including gas, boiler and refrigeration permits, and the street-use and crane permitting a rooftop lift needs.</li>
      <li>Shop drawings, RFIs and submittals in the format the design team asks for, assembled as complete packages.</li>
      <li>Testing, adjusting and balancing, commissioning support, O&amp;M manuals, as-built records and an owner demonstration at handover.</li>
    </ul>

    <h2 className="mt-10 text-2xl font-bold">Recent work of this kind</h2>
    <p className="mt-4 text-neutral-700 leading-relaxed">Each page below describes the scope, the coordination it needed and the problems that came up on the way.</p>
    <ul className="mt-4 list-disc pl-5 space-y-3 text-neutral-700">
      <li><Link to="/projects/crosstown" className="font-semibold text-red-800 underline underline-offset-4">Crosstown Elementary</Link> — a rooftop chiller and new mechanical room in an occupied downtown school, with City permits for two Sunday crane lifts.</li>
      <li><Link to="/projects/herbert-spencer-ashp" className="font-semibold text-red-800 underline underline-offset-4">Herbert Spencer Elementary</Link> — a gas heating plant converted to air-source heat pumps, with the boilers kept as backup.</li>
      <li><Link to="/projects/capilano-birch" className="font-semibold text-red-800 underline underline-offset-4">Capilano University, Birch Building</Link> — two chillers replaced around the academic calendar, on 2–6 AM campus shutdowns.</li>
      <li><Link to="/projects/glenayre" className="font-semibold text-red-800 underline underline-offset-4">École Glenayre Elementary</Link> — a boiler plant and building-wide controls designed around a single-phase supply.</li>
      <li><Link to="/projects/myrtle-philip" className="font-semibold text-red-800 underline underline-offset-4">Myrtle Philip Community School</Link> — a Whistler upgrade planned around travel, deliveries and a short season.</li>
      <li><Link to="/projects/jervis" className="font-semibold text-red-800 underline underline-offset-4">945 Jervis Street</Link> — heating, domestic hot water and make-up air renewed with residents at home.</li>
    </ul>
    <p className="mt-6 text-neutral-700 leading-relaxed">The <Link to="/clients" className="font-semibold text-red-800 underline underline-offset-4">clients page</Link> lists the organisations whose buildings we work in, and <Link to="/projects" className="font-semibold text-red-800 underline underline-offset-4">all project pages</Link> are open to read. Submission deadlines, warranty terms, maintenance visits and response requirements are confirmed against the project contract and scope rather than stated here.</p>

    <Link to="/quote" className="inline-block mt-8 rounded-lg bg-red-700 px-5 py-3 font-semibold text-white hover:bg-red-800">Send a project enquiry</Link>
    <a href="tel:+16047311000" className="inline-block mt-8 ml-5 font-semibold text-red-800 underline underline-offset-4">604-731-1000</a>
  </section>;
}
