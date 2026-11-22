import { useEffect, useRef, useState } from 'react';
const logos=[
  {name:'Rinnai',width:360,height:137,src:'v1760074745/Allied/Rinnai_Logo_Red_uqwftm.png'},
  {name:'Daikin',width:360,height:99,src:'v1760075323/Allied/download_y9tiqd.png'},
  {name:'Viessmann',width:360,height:95,src:'v1760075211/Allied/Viessmann-Logo-1_ipdbjs.png'},
  {name:'IBC',width:360,height:246,src:'v1760074743/Allied/IBC-Logo-for-Gallery_hsklz0.webp'},
];
export default function LogoMarquee() {
  const [paused,setPaused]=useState(false);
  const section = useRef<HTMLElement>(null);
  const [active,setActive]=useState(false);
  useEffect(()=>{
    let visible=false;
    const update=()=>setActive(visible && !document.hidden);
    const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;update();});
    if(section.current)observer.observe(section.current);
    document.addEventListener('visibilitychange',update);
    return()=>{observer.disconnect();document.removeEventListener('visibilitychange',update);};
  },[]);
  return <section ref={section} aria-label="Equipment brands" className="py-8 md:py-12">
    <div className="flex flex-wrap justify-between items-center gap-4 mb-6"><p className="text-sm font-semibold text-slate-600">Equipment we work with</p><button type="button" className="brand-pause rounded-lg border border-neutral-300 px-4 min-h-11 text-sm font-semibold" aria-pressed={paused} onClick={()=>setPaused(value=>!value)}>{paused?'Resume':'Pause'} logo animation</button></div>
    <div className="brand-window"><div className="brand-track" data-paused={paused || !active}>{[false,true,true].map((duplicate,index)=><div className="brand-group" aria-hidden={duplicate || undefined} key={index}>{logos.map(logo=><div key={logo.name} className="brand-logo"><img src={`https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,w_360/${logo.src}`} alt={duplicate?'':logo.name} width={logo.width} height={logo.height} decoding="async" loading="lazy" /></div>)}</div>)}</div></div>
  </section>;
}
