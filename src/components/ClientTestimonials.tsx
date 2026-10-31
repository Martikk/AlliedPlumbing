import { Link } from 'react-router-dom';
import projects from '../data/projects.json';
export default function ClientTestimonials() {
  return <section className="rounded-3xl bg-blue-50 p-6 md:p-10 lg:p-12"><div className="grid lg:grid-cols-[.65fr_1.35fr] gap-9">
    <div><span className="section-kicker">Our clients</span><h2 className="mt-4 text-3xl md:text-4xl font-extrabold leading-tight">Real projects.<br /> Lasting relationships.</h2><p className="mt-5 leading-relaxed text-slate-700">A closer look at the work behind our school district and residential building relationships.</p><Link to="/clients" className="btn-brand mt-6">View our clients <span aria-hidden>↗</span></Link></div>
    <div className="space-y-5">{['ridgeview','leigh','haro'].map(id=>{const project=projects.find(item=>item.id===id)!;return <article key={id} className="client-project-card"><img src={project.cover} alt="" width={160} height={160} loading="lazy" /><div><h3 className="text-xl font-bold">{project.client}</h3><p className="mt-1 text-sm font-semibold text-slate-600">{project.title}</p><p className="mt-3 leading-relaxed text-neutral-700">{project.summary} {project.delivery}</p><Link to={`/projects/${id}`} className="inline-block mt-4 font-semibold text-[#315cb4] underline underline-offset-4">Read the project story</Link></div></article>;})}</div>
  </div></section>;
}
