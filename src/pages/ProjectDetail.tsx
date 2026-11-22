import { Link, useParams } from '../lib/navigation';
import projects from '../data/projects.json';
import posts from '../data/posts.json';
import NotFound from './NotFound';
import servicesSEO from '../data/seo.json';
import JsonLd from '../components/JsonLd';
import { breadcrumbSchema, ORG_ID } from '../lib/schema';
import { canonicalURL } from '../lib/site-url';
export default function ProjectDetail() {
  const {slug}=useParams();
  const project=projects.find(item=>item.id===slug);
  if(!project)return <NotFound />;
  const service = ['ridgeview','herbert-spencer','glenayre','icbc'].includes(project.id) ? 'boilers' : project.id === 'haro' ? 'commercial-plumbing' : 'hvac';
  const servicePath = `/services/${service}` as keyof typeof servicesSEO;
  const related=posts.find(post=>post.project===project.id);
  const projectPath = `/projects/${project.id}`;
  return <article className="max-w-6xl mx-auto px-4 md:px-6 py-7 md:py-10">
    {/* Audit A-05 — structured data per template. Invisible to the page. */}
    <JsonLd data={{
      '@context': 'https://schema.org', '@type': 'Project',
      '@id': `${canonicalURL(projectPath)}#project`,
      name: project.title, description: project.summary,
      url: canonicalURL(projectPath),
      ...(project.year ? { startDate: String(project.year) } : {}),
      participant: { '@id': ORG_ID },
    }} />
    <JsonLd data={breadcrumbSchema([
      { name: 'Projects', path: '/projects' },
      { name: project.title, path: projectPath },
    ])} />
    <nav aria-label="Breadcrumb"><Link to="/projects" className="text-sm font-semibold text-[#315cb4] underline underline-offset-4">All projects</Link></nav>
    <div className="mt-6 grid lg:grid-cols-[1fr_.9fr] gap-9 items-center">
      <div><span className="section-kicker">{project.category}</span><h1 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight">{project.title}</h1><p className="mt-5 text-lg text-slate-700 leading-relaxed">{project.summary}</p><dl className="mt-7 flex flex-wrap gap-x-8 gap-y-4"><div><dt className="text-sm text-slate-600">Client</dt><dd className="mt-1 font-semibold">{project.client}</dd></div><div><dt className="text-sm text-slate-600">Location</dt><dd className="mt-1 font-semibold">{project.location}</dd></div>{project.status && <div><dt className="text-sm text-slate-600">Status</dt><dd className="mt-1 font-semibold">{project.status}</dd></div>}{project.year && <div><dt className="text-sm text-slate-600">Completed</dt><dd className="mt-1 font-semibold">{project.year}</dd></div>}</dl></div>
      <figure><img src={project.cover} alt="" width={1000} height={800} fetchPriority="high" className="clip-tilt rounded-2xl w-full h-72 md:h-96 object-cover" /><figcaption className="mt-3 px-3 text-xs text-slate-600">{project.imageCaption}</figcaption></figure>
    </div>
    <div className="mt-12 grid lg:grid-cols-[1fr_300px] gap-10">
      <div className="article-copy"><section><h2 className="!mt-0">{project.heading}</h2><p>{project.overview}</p></section><section><h2>Scope of work</h2><ul className="mt-5 space-y-3 list-disc pl-5 text-neutral-700 leading-relaxed">{project.scope.map(item=><li key={item}>{item}</li>)}</ul></section><section><h2>Allied’s role and coordination</h2><p>{project.approach}</p><p>{project.delivery}</p></section><section><h2>{project.status ? 'Project status' : 'Completed work'}</h2><p>{project.outcome}</p></section>{related && <Link to={`/blog/${related.slug}`} className="inline-block mt-7 font-semibold text-[#315cb4] underline underline-offset-4">Related article: {related.title}</Link>}</div>
      <aside className="self-start rounded-2xl bg-[#eff6fb] p-6"><h2 className="text-xl font-bold">Planning a similar upgrade?</h2><p className="mt-3 text-sm text-slate-700 leading-relaxed">Bring these points into the scope discussion for your building.</p><ul className="mt-5 space-y-4 list-disc pl-4 text-sm text-slate-700 leading-relaxed">{project.planning.map(item=><li key={item}>{item}</li>)}</ul><h3 className="mt-6 font-bold">Related service</h3><Link to={servicePath} className="block mt-3 text-sm font-semibold underline underline-offset-4">{servicesSEO[servicePath].title.replace(' — Allied Plumbing','')}</Link><Link to="/quote" className="btn-brand mt-6 w-full">Discuss your project</Link><a href="tel:+16047311000" className="block text-center mt-4 font-semibold underline underline-offset-4">604-731-1000</a></aside>
    </div>
    <section className="mt-14 border-t border-slate-200 pt-8"><h2 className="text-2xl font-bold">More from our projects</h2><div className="mt-6 grid sm:grid-cols-2 gap-5">{projects.filter(item=>item.id!==project.id).slice(0,2).map(item=><Link key={item.id} to={`/projects/${item.id}`} className="rounded-xl bg-slate-50 p-5 hover:bg-slate-100"><h3 className="font-bold">{item.title}</h3><p className="mt-2 text-sm text-slate-700 leading-relaxed">{item.summary}</p></Link>)}</div></section>
  </article>;
}
