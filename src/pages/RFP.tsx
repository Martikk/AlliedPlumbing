import { Link } from '../lib/navigation';

export default function RFP() {
  return <section className="max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-16">
    <h1 className="text-4xl md:text-5xl font-extrabold">Mechanical project enquiries</h1>
    <p className="mt-6 text-lg leading-relaxed text-neutral-700">Discuss school, strata and commercial mechanical work with our team. Share your scope, drawings, site requirements and proposed schedule so we can review the project.</p>
    <h2 className="mt-10 text-2xl font-bold">Project delivery</h2>
    <ul className="mt-4 list-disc pl-5 space-y-3 text-neutral-700"><li>Mechanical installation and coordination with electrical, sheet metal, controls and other supporting trades.</li><li>Phased scheduling for occupied buildings and school environments.</li><li>Shop drawing coordination, as-built records and operation and maintenance documentation.</li><li>System testing, commissioning coordination and turnover support.</li></ul>
    <p className="mt-6 text-neutral-700 leading-relaxed">Submission deadlines, warranty terms, maintenance visits and response requirements are confirmed against the project contract and scope.</p>
    <Link to="/quote" className="inline-block mt-8 rounded-lg bg-red-700 px-5 py-3 font-semibold text-white hover:bg-red-800">Send a project enquiry</Link>
    <Link to="/projects" className="inline-block mt-8 ml-5 font-semibold text-red-800 underline underline-offset-4">View project experience</Link>
  </section>;
}
