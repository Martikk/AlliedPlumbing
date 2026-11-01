import { Link } from '../lib/navigation';
import ClientTestimonials from '../components/ClientTestimonials';
import projects from '../data/projects.json';

export default function Clients() {
  const clients = [...new Set(projects.map(project=>project.client))];
  return <section className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16">
    <h1 className="text-4xl md:text-5xl font-extrabold">Project clients</h1>
    <p className="mt-5 max-w-2xl text-lg leading-relaxed text-neutral-700">Our documented work includes school mechanical upgrades and residential heating plant replacements.</p>
    <div className="mt-10"><ClientTestimonials /></div>
    <div className="mt-10 grid md:grid-cols-2 gap-8">{clients.map(client=><article key={client} className="border-t border-neutral-300 pt-5"><h2 className="text-2xl font-bold">{client}</h2><ul className="mt-4 space-y-3">{projects.filter(project=>project.client===client).map(project=><li key={project.id}><Link to={`/projects/${project.id}`} className="font-semibold text-red-800 underline underline-offset-4">{project.title}</Link></li>)}</ul></article>)}</div>
  </section>;
}
