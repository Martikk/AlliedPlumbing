import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import BlogTeasers from '../components/BlogTeasers';
import posts from '../data/posts.json';
export default function Blog() {
  const [hydrated,setHydrated]=useState(false);
  useEffect(()=>setHydrated(true),[]);
  const [params,setParams]=useSearchParams();
  const categories = ['All',...new Set(posts.map(post=>post.category))];
  const rawCategory = hydrated ? params.get('category') ?? 'All' : 'All';
  const category = categories.includes(rawCategory) ? rawCategory : 'All';
  const query = hydrated ? params.get('q') ?? '' : '';
  function filter(key: string, value: string) {
    const next = new URLSearchParams(params);
    if (!value || value === 'All') next.delete(key); else next.set(key,value);
    setParams(next,{replace:true});
  }
  return <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-10"><h1 className="text-4xl md:text-5xl font-extrabold">Plumbing, heating &amp; HVAC insights</h1><p className="mt-5 text-lg leading-relaxed text-neutral-700 max-w-2xl">Practical project stories for school facilities teams, strata councils and building owners. Explore equipment interfaces, occupied-building planning and the coordination behind mechanical upgrades.</p>
    <p className="mt-4 max-w-2xl text-sm text-slate-600">Project stories and planning guides for building owners, facility teams and mechanical project stakeholders.</p>
    <div className="mt-8 flex flex-wrap items-end gap-5 justify-between"><label className="w-full sm:w-80"><span className="block mb-2 font-semibold">Search articles</span><input type="search" value={query} onChange={event=>filter('q',event.target.value)} className="input" placeholder="Boilers, schools, cooling…" /></label><div className="flex flex-wrap gap-2" aria-label="Article topics">{categories.map(topic=><button key={topic} type="button" aria-pressed={category===topic} onClick={()=>filter('category',topic)} className={`min-h-11 px-4 py-2 rounded-full border font-semibold text-sm ${category===topic?'bg-neutral-900 text-white border-neutral-900':'border-neutral-300 hover:bg-neutral-50'}`}>{topic}</button>)}</div></div>
    <BlogTeasers all category={category} query={query} />
    <section className="border-t border-neutral-200 pt-8 pb-8"><h2 className="text-2xl font-bold">Planning your next upgrade?</h2><p className="mt-3 max-w-2xl leading-relaxed text-neutral-700">Start with your building location, existing equipment, available drawings and any restrictions on access or shutdowns. Our team can discuss the scope and the information needed for a site review.</p><a href="/quote/" className="btn-brand mt-5">Discuss your project</a></section>
  </div>;
}
