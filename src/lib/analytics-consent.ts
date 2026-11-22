const measurementID = import.meta.env.VITE_GA_MEASUREMENT_ID ?? 'G-ZKZXJGTS54';
const enabled = /^G-[A-Z0-9]+$/.test(measurementID);
const storageKey = 'allied:analytics-consent:v1';
let allowed = false;
let started = false;
let lastPage = '';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Audit J-01 — Consent Mode v2.
 *
 *  Every storage type defaults to `denied`. The gtag script is only fetched
 *  after an explicit opt-in, and then inside requestIdleCallback after load
 *  (B-06), so no third party competes with the LCP image. */
const DENIED = {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
} as const;

/** J-02 — only these parameters reach GA4. Everything else is dropped, so a
 *  name, email, phone number or file name can never leak into a report. */
const SAFE_PARAMS = [
  'form_name',
  'enquiry_type',
  'service',
  'property_type',
  'location',
  'page_path',
  'field',
  'count',
  'metric_name',
  'metric_value',
  'metric_rating',
  'metric_id',
  'error_type',
];

function whenIdle(run: () => void) {
  const idle = (window as unknown as { requestIdleCallback?: (cb: () => void, options?: { timeout: number }) => void })
    .requestIdleCallback;
  if (idle) idle(run, { timeout: 3000 });
  else setTimeout(run, 1200);
}

export function analyticsConfigured() {
  return enabled;
}

export function readAnalyticsConsent(): 'granted' | 'denied' | null {
  try {
    const value = localStorage.getItem(storageKey);
    return value === 'granted' || value === 'denied' ? value : null;
  } catch {
    return null;
  }
}

export function analyticsAllowed() {
  return allowed;
}

export function setAnalyticsConsent(value: 'granted' | 'denied') {
  allowed = value === 'granted';
  try {
    localStorage.setItem(storageKey, value);
  } catch {
    /* Consent can remain session-only. */
  }
  if (!enabled) return;
  (window as unknown as Record<string, unknown>)[`ga-disable-${measurementID}`] = !allowed;
  if (!allowed) {
    window.gtag?.('consent', 'update', DENIED);
    lastPage = '';
    return;
  }
  if (!started) {
    started = true;
    window.dataLayer ??= [];
    window.gtag = function () {
      window.dataLayer!.push(arguments as unknown as Record<string, unknown>);
    };
    // Defaults first, then the grant — the Consent Mode v2 order.
    window.gtag('consent', 'default', DENIED);
    window.gtag('consent', 'update', { ...DENIED, analytics_storage: 'granted' });
    window.gtag('js', new Date());
    window.gtag('config', measurementID, {
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      page_location: 'https://www.alliedplumbing.ca' + (location.pathname.replace(/\/+$/, '') || '') + '/',
      page_referrer: '',
    });
    whenIdle(() => {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementID}`;
      document.head.append(script);
    });
  } else {
    window.gtag?.('consent', 'update', { analytics_storage: 'granted' });
  }
}

export function trackAnalyticsPage(pathname: string) {
  if (!allowed || !enabled) return;
  const safePath = pathname.replace(/\/+$/, '') + '/';
  if (lastPage === safePath) return;
  lastPage = safePath;
  // No query strings, fragments, job titles, resume URLs or referrer URLs.
  window.gtag?.('event', 'page_view', {
    page_location: 'https://www.alliedplumbing.ca' + safePath,
    page_referrer: '',
    send_to: measurementID,
  });
}

export function sendAnalyticsEvent(event: string, details: Record<string, unknown>) {
  const safe: Record<string, unknown> = {};
  for (const key of SAFE_PARAMS) {
    const value = details[key];
    if ((typeof value === 'string' && value.length <= 100) || (typeof value === 'number' && Number.isFinite(value)))
      safe[key] = value;
  }
  if (allowed && enabled)
    window.gtag?.('event', event, {
      ...safe,
      send_to: measurementID,
      page_location: 'https://www.alliedplumbing.ca' + (location.pathname.replace(/\/+$/, '') || '') + '/',
      page_referrer: '',
    });
}
