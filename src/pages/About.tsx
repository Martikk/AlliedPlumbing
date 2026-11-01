import { Link } from '../lib/navigation';
import TeamSection from '../components/TeamSection';

export default function About() {
  return <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-10">
    <div className="grid lg:grid-cols-[1.1fr_.9fr] gap-10 items-start"><div>
    <h1 className="text-4xl md:text-5xl font-extrabold">About Allied Plumbing</h1>
    <p className="mt-6 max-w-3xl text-xl leading-relaxed text-neutral-700">Based in Burnaby, Allied Plumbing, Heating &amp; Air Conditioning provides mechanical contracting, plumbing, HVAC/R and gas fitting services for residential, commercial and institutional buildings.</p>
    </div><img src="https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,w_1000/v1760068156/Allied/14_urnogx.png" alt="" width={1000} height={800} className="clip-tilt rounded-2xl h-72 md:h-96 w-full object-cover" /></div>
    <section className="mt-12 max-w-3xl"><h2 className="text-3xl font-bold">From installation to ongoing maintenance</h2><p className="mt-4 leading-relaxed text-neutral-700">Our work includes boiler plant replacements, classroom ventilation upgrades, domestic hot water systems and building maintenance. We coordinate mechanical installations with electrical, sheet metal, controls, insulation, testing and balancing trades.</p><p className="mt-4 leading-relaxed text-neutral-700">For occupied buildings and schools, planning includes phased work, site safety measures and scheduling around the people who use the facility. Project documentation, commissioning and turnover support help building teams operate the installed systems.</p><Link to="/projects" className="inline-block mt-6 font-semibold text-red-800 underline underline-offset-4">Explore our project scopes</Link></section>
    <section className="mt-12 max-w-3xl"><h2 className="text-3xl font-bold">Built around existing buildings and the people who use them.</h2><p className="mt-4 leading-relaxed text-neutral-700">Mechanical upgrades connect new equipment with existing services, spaces and operating requirements. Our project work brings together installation planning, supporting trades, technical submissions and turnover documentation. For schools and occupied buildings, access and sequencing are part of the scope discussion from the start.</p></section>
    <div className="mt-12"><TeamSection /></div>
    <section className="mt-12 border-t border-neutral-200 pt-8"><h2 className="text-2xl font-bold">Discuss your building or project</h2><p className="mt-3 text-neutral-700">Call 604-731-1000 or send your service requirements and project scope.</p><Link to="/quote" className="inline-block mt-5 rounded-lg bg-red-700 px-5 py-3 font-semibold text-white hover:bg-red-800">Request a Quote</Link></section>
  </div>;
}
