import { Link, useSearchParams } from 'react-router-dom';
import projects from '../data/projects.json';

export default function Projects() {
  const [params, setParams] = useSearchParams();
  const query = params.get('q') ?? '';
  const category = params.get('category') ?? 'All';
  const filtered = projects.filter(project => (category === 'All' || project.category === category) && `${project.title} ${project.location} ${project.summary}`.toLowerCase().includes(query.toLowerCase()));
  function filter(key: string, value: string) {
    const next = new URLSearchParams(params);
    if (!value || value === 'All') next.delete(key); else next.set(key, value);
    setParams(next, {replace:true});
  }
  return <div>
    <section className="bg-neutral-900 text-white"><div className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-20">
      <h1 className="text-4xl md:text-5xl font-extrabold">Mechanical projects across BC</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed">School ventilation upgrades, boiler plant replacements and residential heating systems. Explore the scope and coordination behind our work.</p>
    </div></section>
    <section className="max-w-6xl mx-auto px-4 md:px-6 py-10">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <label className="block w-full sm:w-80"><span className="block mb-2 font-semibold">Search projects</span><input type="search" className="input" value={query} onChange={event=>filter('q',event.target.value)} placeholder="School, location or system…" /></label>
        <div className="flex flex-wrap gap-2" aria-label="Project category">{['All','Institutional','Commercial','Residential'].map(value=><button type="button" key={value} aria-pressed={category===value} onClick={()=>filter('category',value)} className={`rounded-lg border px-4 py-3 font-semibold ${category===value?'bg-neutral-900 text-white border-neutral-900':'bg-white text-neutral-800 border-neutral-300 hover:bg-neutral-100'}`}>{value}</button>)}</div>
      </div>
      <p role="status" className="mt-6 text-neutral-600">{filtered.length} {filtered.length===1?'project':'projects'}</p>
      <div className="mt-5 grid md:grid-cols-2 gap-6">{filtered.map(project=><article key={project.id} className="rounded-2xl bg-white border border-neutral-200 overflow-hidden">
        <Link to={`/projects/${project.id}`} className="block clip-tilt rounded-2xl overflow-hidden" aria-label={`View ${project.title}`}><img src={project.cover} alt="" width={900} height={600} loading="lazy" className="h-60 w-full object-cover" /></Link>
        <div className="p-6">
        <p className="text-sm text-neutral-600">{project.location}{project.year ? ` · ${project.year}` : ''}</p>
        <h2 className="mt-2 text-2xl font-bold"><Link to={`/projects/${project.id}`} className="hover:underline">{project.title}</Link></h2>
        <p className="mt-2 text-sm font-semibold text-neutral-700">{project.client}</p>
        <p className="mt-4 text-neutral-700 leading-relaxed">{project.summary}</p>{project.status && <p className="mt-3 text-sm text-slate-600">{project.status}</p>}
        <Link to={`/projects/${project.id}`} className="inline-block mt-5 font-semibold text-red-800 underline underline-offset-4">View project scope</Link>
        </div>
      </article>)}</div>
      {!filtered.length && <p className="py-8">No projects match your search. Try another school, location or system.</p>}
      <div className="mt-10 border-t border-neutral-200 pt-8"><h2 className="text-2xl font-bold">Planning a mechanical upgrade?</h2><Link to="/quote" className="inline-block mt-4 rounded-lg bg-red-700 px-5 py-3 font-semibold text-white hover:bg-red-800">Request a Quote</Link></div>
    </section>
  </div>;
}
