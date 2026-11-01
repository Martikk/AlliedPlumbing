import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { analyticsConfigured, readAnalyticsConsent, setAnalyticsConsent, trackAnalyticsPage } from '../lib/analytics-consent';
export default function AnalyticsConsent() {
  const {pathname}=useLocation();
  const [ready,setReady]=useState(false);
  const [consent,setConsent]=useState<'granted'|'denied'|null>(null);
  const [settings,setSettings]=useState(false);
  useEffect(()=>{ const saved=readAnalyticsConsent();setConsent(saved);if(saved)setAnalyticsConsent(saved);setReady(true); },[]);
  useEffect(()=>{ if(ready&&consent==='granted')trackAnalyticsPage(pathname); },[pathname,consent,ready]);
  if(!ready||!analyticsConfigured())return null;
  function choose(value:'granted'|'denied'){setAnalyticsConsent(value);setConsent(value);setSettings(false);}
  if(consent&&!settings)return <button type="button" onClick={()=>setSettings(true)} className="fixed bottom-3 left-3 z-50 rounded-lg bg-white border border-neutral-300 px-3 py-2 text-xs shadow-sm">Analytics preferences</button>;
  return <aside aria-label="Analytics preferences" className="fixed bottom-3 inset-x-3 z-50 mx-auto max-w-3xl rounded-xl border border-neutral-300 bg-white p-5 shadow-lg"><h2 className="font-bold">Optional website analytics</h2><p className="mt-2 text-sm leading-relaxed text-neutral-700">Allow Google Analytics to help us understand page visits and completed enquiries? Form contents and resume links are not included. You can change your choice later. <a href="/privacy/" className="underline">Privacy notice</a></p><div className="flex flex-wrap gap-3 mt-4"><button type="button" onClick={()=>choose('denied')} className="rounded-lg border border-neutral-400 px-4 py-2 font-semibold">Keep analytics off</button><button type="button" onClick={()=>choose('granted')} className="rounded-lg bg-neutral-900 text-white px-4 py-2 font-semibold">Allow analytics</button></div></aside>;
}
