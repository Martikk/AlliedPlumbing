import { Link } from 'react-router-dom';
import posts from '../data/posts.json';
export default function BlogTeasers() {
  return <section className="py-12 md:py-16"><div className="flex flex-wrap justify-between items-end gap-5 mb-9"><h2 className="text-3xl md:text-4xl font-extrabold leading-tight">From our projects<br /> to your next upgrade.</h2><Link to="/blog" className="rounded-lg bg-neutral-900 text-white px-5 py-3 font-semibold hover:bg-neutral-700">View all articles <span aria-hidden>↗</span></Link></div>
    <div className="grid md:grid-cols-3 gap-6">{posts.map(post=><article key={post.slug}><Link to={`/blog/${post.slug}`} className="group block"><div className="relative clip-tilt rounded-2xl overflow-hidden"><img src={post.image} alt="" width={900} height={650} loading="lazy" className="w-full h-60 md:h-64 object-cover transition-transform duration-300 group-hover:scale-[1.03]" /><time dateTime={post.date} className="absolute top-4 left-5 rounded-full bg-white px-3 py-1 text-xs font-semibold">31 October 2026</time></div><div className="clip-tilt mt-3 rounded-xl bg-neutral-100 px-5 py-4 flex items-center justify-between gap-3"><h3 className="font-semibold text-neutral-800 leading-relaxed">{post.title}</h3><span aria-hidden>↗</span></div><p className="mt-3 px-2 text-sm leading-relaxed text-neutral-600">{post.excerpt}</p></Link></article>)}</div>
  </section>;
}
