import { Link, useParams } from 'react-router-dom';
import posts from '../data/posts.json';
import projects from '../data/projects.json';
import NotFound from './NotFound';
export default function BlogPost() {
  const {slug}=useParams();
  const post=posts.find(item=>item.slug===slug);
  if(!post)return <NotFound />;
  const project=projects.find(item=>item.id===post.project)!;
  return <article className="max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-14">
    <nav aria-label="Breadcrumb"><Link to="/blog" className="font-semibold text-[#315cb4] underline underline-offset-4">All articles</Link></nav>
    <div className="mt-6 max-w-4xl"><p className="text-sm font-semibold text-slate-600">{post.category} · <time dateTime={post.date}>31 October 2026</time> · {post.readingMinutes} min read</p><h1 className="mt-4 text-3xl md:text-5xl font-extrabold leading-tight">{post.title}</h1><p className="mt-5 text-lg text-neutral-600">By {post.author}</p></div>
    <img src={post.image} alt="" width={1200} height={675} fetchPriority="high" className="mt-8 w-full h-64 md:h-[430px] object-cover clip-tilt rounded-2xl" />
    <div className="max-w-3xl mx-auto mt-10 article-copy"><p className="text-lg">{post.intro}</p>{post.sections.map(section=><section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map(paragraph=><p key={paragraph}>{paragraph}</p>)}</section>)}
      <aside className="mt-10 rounded-2xl bg-sky-50 p-6"><h2 className="!mt-0">Explore the project</h2><p>{project.title} — {project.summary}</p><Link to={`/projects/${project.id}`} className="inline-block mt-4 font-semibold text-[#315cb4] underline underline-offset-4">View the full project scope</Link></aside>
      <div className="mt-10 flex flex-wrap gap-4"><Link to="/quote" className="btn-brand">Discuss your project <span aria-hidden>↗</span></Link><Link to="/blog" className="rounded-xl border border-neutral-300 px-5 py-3 font-semibold">More articles</Link></div>
    </div>
  </article>;
}
