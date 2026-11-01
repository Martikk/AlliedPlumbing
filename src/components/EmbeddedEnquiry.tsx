import { useEffect, useRef, useState } from 'react';
import config from '../lib/enquiry-config.json';
import { trackEvent } from '../lib/analytics';
export const APPS_SCRIPT_URL = /^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(config.appsScriptUrl) ? config.appsScriptUrl : '';
type Type = 'contact' | 'quote' | 'careers';
/** HTML Service owns upload + acknowledgement. No opaque no-cors POST or public Drive links. */
export default function EmbeddedEnquiry({type,role=''}:{type:Type;role?:string}) {
  const [token,setToken]=useState('');
  const [height,setHeight]=useState(type==='quote'?1500:type==='careers'?1200:950);
  const [loaded,setLoaded]=useState(false);
  const events=useRef(new Set<string>());
  useEffect(()=>{setToken(crypto.randomUUID());},[]);
  useEffect(()=>{
    if(!token)return;
    function receive(event:MessageEvent){
      // Apps Script HTML Service renders in a nested Google-owned sandbox frame.
      if(!/^https:\/\/(?:[a-z0-9-]+-)?script\.googleusercontent\.com$/.test(event.origin))return;
      const data=event.data;
      if(!data || data.source!=='allied-enquiry' || data.token!==token || data.type!==type)return;
      if(Number.isFinite(data.height))setHeight(Math.max(300,Math.min(2400,data.height)));
      const name=data.event==='success'?'generate_lead':data.event==='start'?'form_start':['error','stored'].includes(data.event)?'form_error':null;
      if(name && (name==='form_error'||!events.current.has(name))){events.current.add(name);trackEvent(name,{form_name:type,...(name==='form_error'?{error_type:'network_or_server' as const}:{})});}
    }
    window.addEventListener('message',receive);
    return()=>window.removeEventListener('message',receive);
  },[token,type]);
  const query=new URLSearchParams({type,token,...(role?{role}: {})});
  const email=type==='contact'?'info@allied-plumbing.ca':`${type}@allied-plumbing.ca`;
  return <div className="rounded-xl bg-white text-neutral-900 overflow-hidden">
    {!loaded && <p role="status" className="p-4 text-sm text-neutral-600">Loading secure enquiry form…</p>}
    {token && <iframe title={`${type==='careers'?'Careers application':type==='quote'?'Quote request':'Contact enquiry'} with private file processing`} src={`${APPS_SCRIPT_URL}?${query}`} onLoad={()=>setLoaded(true)} style={{height}} className="w-full border-0" referrerPolicy="strict-origin-when-cross-origin" />}
    <p className="p-4 text-sm leading-relaxed text-neutral-600">If the form cannot load, <a className="underline" href={`${APPS_SCRIPT_URL}?type=${type}`} target="_blank" rel="noopener noreferrer">open it in a new tab</a>, email <a className="underline" href={`mailto:${email}`}>{email}</a> or call <a className="underline" href="tel:+16047311000">604-731-1000</a>.</p>
  </div>;
}
