const measurementID = import.meta.env.VITE_GA_MEASUREMENT_ID ?? '';
const enabled = /^G-[A-Z0-9]+$/.test(measurementID);
const storageKey = 'allied:analytics-consent:v1';
let allowed = false;
let started = false;
let lastPage = '';
declare global { interface Window { gtag?: (...args: unknown[]) => void } }
export function analyticsConfigured() { return enabled; }
export function readAnalyticsConsent(): 'granted' | 'denied' | null {
  try { const value=localStorage.getItem(storageKey); return value==='granted'||value==='denied'?value:null; } catch { return null; }
}
export function analyticsAllowed() { return allowed; }
export function setAnalyticsConsent(value: 'granted' | 'denied') {
  allowed = value==='granted';
  try { localStorage.setItem(storageKey,value); } catch { /* Consent can remain session-only. */ }
  if (!enabled) return;
  (window as unknown as Record<string, unknown>)[`ga-disable-${measurementID}`] = !allowed;
  if (!allowed) {
    window.gtag?.('consent','update',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
    lastPage='';
    return;
  }
  if (!started) {
    started=true;
    window.dataLayer ??=[];
    window.gtag = function () { window.dataLayer!.push(arguments as unknown as Record<string,unknown>); };
    window.gtag('consent','default',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
    window.gtag('js',new Date());
    window.gtag('config',measurementID,{send_page_view:false,allow_google_signals:false,allow_ad_personalization_signals:false,page_location:'https://www.alliedplumbing.ca'+(location.pathname.replace(/\/+$/,'')||'')+'/',page_referrer:''});
    const script=document.createElement('script'); script.async=true; script.src=`https://www.googletagmanager.com/gtag/js?id=${measurementID}`; document.head.append(script);
  } else window.gtag?.('consent','update',{analytics_storage:'granted'});
}
export function trackAnalyticsPage(pathname: string) {
  if (!allowed || !enabled) return;
  const safePath = pathname.replace(/\/+$/, '') + '/';
  if(lastPage===safePath)return;
  lastPage=safePath;
  // No query strings, fragments, job titles, resume URLs or referrer URLs.
  window.gtag?.('event','page_view',{page_location:'https://www.alliedplumbing.ca'+safePath,page_referrer:'',send_to:measurementID});
}
export function sendAnalyticsEvent(event: string, details: Record<string,unknown>) {
  if (allowed && enabled) window.gtag?.('event',event,{...details,send_to:measurementID,page_location:'https://www.alliedplumbing.ca'+(location.pathname.replace(/\/+$/,'')||'')+'/',page_referrer:''});
}
