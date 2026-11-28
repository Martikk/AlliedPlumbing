import { useEffect, useRef, useState } from 'react';
import QualityBadges from './QualityBadges';
import { yearsInBusiness } from '../config';
const tabs = {
  Materials: ['Hydronic piping and equipment for boiler plants and mechanical rooms','Condensing boiler installations, pumps and heat exchangers','Ventilation equipment, unit ventilators and rooftop air handling units','Connections to existing heating and domestic hot water systems'],
  Technology: ['Direct digital control integration and system coordination','Hydronic pumps, heat exchangers and building heating equipment','Testing, balancing and commissioning coordination','Shop drawings, as-built records and operation and maintenance documents'],
  Experience: ['School projects across districts 40, 43, 45 and 48','Mechanical upgrades in occupied educational and residential buildings','Coordination with electrical, sheet metal, controls and insulation trades','Phased work and after-hours scheduling to suit site requirements'],
};
export default function AboutCompany() {
  const [tab,setTab]=useState<keyof typeof tabs>('Materials');
  const list = useRef<HTMLUListElement>(null);
  const listAnimation = useRef<Animation | null>(null);
  const pointerChange = useRef(false);
  useEffect(() => {
    const element = list.current;
    const from = listAnimation.current?.playState === 'running' && element ? getComputedStyle(element).opacity : '0.6';
    listAnimation.current?.cancel();
    if (!pointerChange.current || !element?.animate || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    listAnimation.current = element.animate([{opacity:from},{opacity:1}], {duration:140,easing:'cubic-bezier(0.23, 1, 0.32, 1)'});
  }, [tab]);
  useEffect(() => () => listAnimation.current?.cancel(), []);
  const video = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const player = video.current;
    if (!player) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    const update = () => {
      if (visible && !preference.matches && !document.hidden) void player.play().catch(() => { /* Native controls remain available if autoplay is blocked. */ });
      else player.pause();
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); }, { threshold: 0.25 });
    observer.observe(player);
    const pageVisibility = () => { if (document.hidden) player.pause(); else update(); };
    document.addEventListener('visibilitychange', pageVisibility);
    preference.addEventListener('change', update);
    return () => { observer.disconnect(); preference.removeEventListener('change', update); document.removeEventListener('visibilitychange', pageVisibility); player.pause(); };
  }, []);
  return <section className="about-company py-14 md:py-20">
    <span className="section-eyebrow">About our company</span>
    <h2 className="mt-4 text-3xl md:text-5xl font-extrabold leading-tight">Building with trust,<br className="hidden md:block" /> driven by experience</h2>
    <div className="mt-10 grid lg:grid-cols-2 gap-10 md:gap-14 items-center">
      <div><div className="flex flex-wrap gap-3 mb-7">{Object.keys(tabs).map(name=><button key={name} type="button" aria-pressed={tab===name} onClick={event=>{pointerChange.current=event.detail>0;setTab(name as keyof typeof tabs);}} className={`rounded-lg border px-4 py-3 font-semibold ${tab===name?'bg-neutral-900 border-neutral-900 text-white':'border-neutral-300 bg-white hover:bg-neutral-100'}`}>{name}</button>)}</div>
      <ul ref={list} className="space-y-5 min-h-[250px]">{tabs[tab].map(text=><li key={text} className="flex gap-4 text-neutral-700 leading-relaxed"><svg aria-hidden="true" className="h-5 w-5 shrink-0 mt-1 text-neutral-900" viewBox="0 0 20 20" fill="currentColor"><path d="M7.5 13.5 3.8 9.8l1.4-1.4 2.3 2.3 6.3-6.3 1.4 1.4-7.7 7.7Z"/></svg><span>{text}</span></li>)}</ul></div>
      <div className="about-visual clip-tilt rounded-2xl overflow-hidden"><video ref={video} controls muted loop playsInline preload="none" poster="https://res.cloudinary.com/dzytbkc5l/video/upload/c_crop,ar_1:1,g_center/so_1,f_auto,q_auto:eco,w_640/v1760069369/Allied/Allied_Plumbing_Video_Script_Generation_qz6an9.jpg" src="https://res.cloudinary.com/dzytbkc5l/video/upload/c_crop,ar_1:1,g_center/q_auto/v1760069369/Allied/Allied_Plumbing_Video_Script_Generation_qz6an9.mp4" aria-label="Allied mechanical services brand video" className="h-full w-full object-cover" /></div>
    </div>
    <div className="mt-14"><QualityBadges /></div>
    <div className="project-metrics company-experience mt-12"><div><strong>{yearsInBusiness()}+</strong><span>Years in business</span></div></div>
  </section>;
}
