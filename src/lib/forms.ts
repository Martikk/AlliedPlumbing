import { FORMSPREE_ENDPOINT } from '../config';

/** Require the provider's JSON acknowledgement, not a static host's HTML 200 fallback. */
export async function sendEnquiry(data: FormData) {
  let response: Response;
  try {
    response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST', body: data, headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(30000),
    });
  } catch {
    throw new Error('Your message could not be sent. Check your connection and try again, or call 604-731-1000.');
  }
  const result: unknown = await response.json().catch(() => null);
  if (!response.ok || !result || typeof result !== 'object' || !('ok' in result) || result.ok !== true) {
    throw new Error(response.status === 429 ? 'Too many requests. Please wait a moment and try again, or call 604-731-1000.' : 'Your message could not be sent. Please try again or call 604-731-1000.');
  }
}
