type EventName = 'phone_click' | 'form_start' | 'generate_lead' | 'form_error' | 'web_vital';
type FormName = 'contact' | 'quote';
type Details = { form_name?: FormName; metric_name?: string; metric_value?: number; metric_rating?: string; metric_id?: string; error_type?: 'network_or_server' };

declare global {
  interface Window { dataLayer?: Record<string, unknown>[] }
}
/** No field values, filenames, phone numbers, emails or query strings enter analytics. */
export function trackEvent(event: EventName, details: Details = {}) {
  window.dataLayer ??= [];
  window.dataLayer.push({ event, ...details });
}
