import { responsiveImage, imageCandidates } from '../lib/images';
import { useRef } from 'react';
import { Link } from '../lib/navigation';
import projects from '../data/projects.json';
export default function ProjectsBanner() {
  const rail=useRef<HTMLDivElement>(null);
  const selected=projects.filter(project=>['garibaldi','ridgeview','leigh','haro'].includes(project.id));
  return <section className="projects-banner rounded-3xl bg-[#e6f0f7] p-6 md:p-10 lg:p-12">
    <div className="grid lg:grid-cols-[.9fr_1.1fr] gap-10 items-center">
      <div><span className="section-kicker">Our projects</span><h2 className="mt-4 text-3xl md:text-5xl font-extrabold leading-tight text-slate-900">Quality that speaks<br className="hidden md:block" /> through our work.</h2><p className="mt-5 text-slate-700 leading-relaxed">From classroom ventilation to central boiler plants, explore the mechanical upgrades we have delivered for schools and residential buildings.</p><Link to="/projects" className="btn-brand mt-7">Explore all projects <span aria-hidden>↗</span></Link></div>
      <div className="min-w-0"><div ref={rail} className="project-photo-rail">{selected.map(project=><Link key={project.id} to={`/projects/${project.id}`} className="project-photo-card clip-tilt"><img src={responsiveImage(project.cover, 768)} srcSet={imageCandidates(project.cover)} sizes="(min-width: 768px) 340px, 80vw"  alt="" width={900} height={675} loading="lazy" /><span>{project.title}<b aria-hidden>↗</b></span></Link>)}</div>
      <div className="flex justify-center gap-2 mt-4">{selected.map((project,index)=><button key={project.id} type="button" aria-label={`Show ${project.title}`} className="project-rail-dot" onClick={()=>{const el=rail.current; if(el){const target=el.children[index] as HTMLElement;const first=el.children[0] as HTMLElement;el.scrollTo({left:target.offsetLeft-first.offsetLeft,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});}}}><span /></button>)}</div></div>
    </div>
  </section>;
}
