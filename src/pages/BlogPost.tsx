import { Link, useParams } from '../lib/navigation';
import posts from '../data/posts.json';
import projects from '../data/projects.json';
import servicesSEO from '../data/seo.json';
import NotFound from './NotFound';
export default function BlogPost() {
  const {slug}=useParams();
  const post=posts.find(item=>item.slug===slug);
  if(!post)return <NotFound />;
  const project=projects.find(item=>item.id===post.project)!;
  const servicePath = `/services/${post.relatedService}` as keyof typeof servicesSEO;
  const date = new Intl.DateTimeFormat('en-CA',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'});
  const review = post.review;
  const relatedProjects = projects.filter(item=>item.id!==project.id && (item.category===project.category)).slice(0,2);
  const articleSchema = {
    '@context': 'https://schema.org', '@type': 'BlogPosting',
    '@id': `https://www.alliedplumbing.ca/blog/${post.slug}/#article`,
    mainEntityOfPage: `https://www.alliedplumbing.ca/blog/${post.slug}/`,
    headline: post.title, description: post.excerpt, ...(post.image.startsWith('https://') ? { image: [post.image] } : {}),
    datePublished: post.date, inLanguage: 'en-CA',
    author: { '@type': 'Organization', name: post.author, url: 'https://www.alliedplumbing.ca/about/' },
    publisher: { '@id': 'https://www.alliedplumbing.ca/#business' },
  };
  return <article className="max-w-6xl mx-auto px-4 md:px-6 py-7 md:py-10">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(articleSchema).replace(/</g,'\\u003c')}} />
    <nav aria-label="Breadcrumb"><Link to="/blog" className="font-semibold text-[#315cb4] underline underline-offset-4">All articles</Link></nav>
    <div className="mt-6 max-w-4xl"><p className="text-sm font-semibold text-slate-600">{post.category} · <time dateTime={post.date}>{date.format(new Date(post.date))}</time> · {post.readingMinutes} min read</p><h1 className="mt-4 text-3xl md:text-5xl font-extrabold leading-tight">{post.title}</h1><p className="mt-5 text-lg text-neutral-600">By {post.author}</p><p className="mt-2 text-sm text-slate-600">{review.status === 'reviewed' && review.reviewer && review.reviewedAt ? `Technical review: ${review.reviewer} · ${date.format(new Date(review.reviewedAt))}` : 'Technical review pending. Project scope and planning information; not installation instructions.'}</p></div>
    <figure><img src={post.image} alt="" width={1200} height={675} fetchPriority="high" className="mt-8 w-full h-64 md:h-[430px] object-cover clip-tilt rounded-2xl" />{post.image.startsWith('/images/') && <figcaption className="mt-2 text-sm text-slate-600">Temporary image placeholder. Article photography to follow.</figcaption>}</figure>
    <div className="max-w-3xl mx-auto mt-10 article-copy"><p className="text-lg">{post.intro}</p>{post.sections.map(section=><section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map(paragraph=><p key={paragraph}>{paragraph}</p>)}</section>)}
      {post.checklist.length > 0 && <section className="mt-8 rounded-xl border border-slate-200 p-6"><h2 className="!mt-0">Planning checklist</h2><ul className="list-disc pl-5 space-y-3">{post.checklist.map(item=><li key={item}>{item}</li>)}</ul></section>}
      <aside className="mt-10 rounded-2xl bg-sky-50 p-6"><h2 className="!mt-0">Explore the project</h2><p>{project.title} — {project.summary}</p><Link to={`/projects/${project.id}`} className="inline-block mt-4 font-semibold text-[#315cb4] underline underline-offset-4">View the full project scope</Link></aside>
      <section className="mt-8 border-t border-neutral-200 pt-6"><h2 className="!mt-0">Related service</h2><Link to={servicePath} className="inline-block mt-3 font-semibold text-[#315cb4] underline underline-offset-4">{servicesSEO[servicePath].title.replace(' — Allied Plumbing','')}</Link><h2>Related projects</h2><ul className="mt-4 space-y-3">{relatedProjects.map(item=><li key={item.id}><Link to={`/projects/${item.id}`} className="font-semibold underline underline-offset-4">{item.title}</Link></li>)}</ul></section>
      <div className="mt-10 flex flex-wrap gap-4"><Link to={post.category === 'Careers' ? '/careers' : '/quote'} className="btn-brand">{post.category === 'Careers' ? 'Explore career opportunities' : 'Discuss your project'} <span aria-hidden>↗</span></Link><Link to="/blog" className="rounded-xl border border-neutral-300 px-5 py-3 font-semibold">More articles</Link></div>
    </div>
  </article>;
}
