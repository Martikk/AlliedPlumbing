import { sendAnalyticsEvent } from './analytics-consent';

/** Audit J-02 — the event plan. One helper, `trackEvent`, which no-ops while
 *  consent is denied. Never send a name, email, phone number, file name or
 *  query string to GA4; only the parameters listed in SAFE_PARAMS survive. */

export type EventName =
  | 'generate_lead' // successful form submit (server returned ok) — key event
  | 'click_call' // any tel: link — key event
  | 'click_quote' // any CTA that opens the enquiry form
  | 'click_email' // any mailto: link
  | 'form_start' // first field focus
  | 'form_error' // submit blocked by validation, or a network/server failure
  | 'file_upload' // attachment added
  | 'download_capability' // capability statement PDF click
  | 'phone_click' // retained alias of click_call for historic GA4 reports
  | 'enquiry_success'
  | 'careers_success'
  | 'web_vital';

export type FormName = 'contact' | 'quote' | 'careers';

/** Where a CTA was clicked. Matches the audit's `location` parameter. */
export type CtaLocation =
  | 'header'
  | 'hero'
  | 'mobile_bar'
  | 'mobile_menu'
  | 'footer'
  | 'page';

export type Details = {
  form_name?: FormName;
  enquiry_type?: string;
  service?: string;
  property_type?: string;
  location?: CtaLocation;
  page_path?: string;
  field?: string;
  count?: number;
  metric_name?: string;
  metric_value?: number;
  metric_rating?: string;
  metric_id?: string;
  error_type?: 'network_or_server' | 'validation';
};

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/** Path only — never the query string, which can carry a service or a token. */
export function pagePath() {
  if (typeof location === 'undefined') return '/';
  return (location.pathname.replace(/\/+$/, '') || '') + '/';
}

export function trackEvent(event: EventName, details: Details = {}) {
  const payload = { page_path: pagePath(), ...details };
  window.dataLayer ??= [];
  window.dataLayer.push({ event, ...payload });
  sendAnalyticsEvent(event, payload);
}
