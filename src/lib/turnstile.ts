import config from './enquiry-config.json';

/** Audit H-01 step 6 — Cloudflare Turnstile, invisible.
 *
 *  Inert until a site key exists. With no key the form behaves exactly as it
 *  does today (honeypot plus a minimum fill time, both re-checked server
 *  side), the script is never fetched, and nothing renders. So this can ship
 *  before the Cloudflare account exists.
 *
 *  The script is only fetched when someone actually starts filling the form,
 *  not on page load — a visitor who never touches it never pays for it
 *  (B-06, defer third parties).
 *
 *  `appearance: 'interaction-only'` is the invisible mode the audit asks for:
 *  the widget shows nothing unless Cloudflare decides this visitor needs an
 *  interactive challenge. No reCAPTCHA-style checkbox. */

const SITE_KEY = (config as { turnstileSiteKey?: string }).turnstileSiteKey ?? '';
const SCRIPT = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

export function turnstileConfigured() {
  return SITE_KEY.length > 0;
}

type TurnstileApi = {
  render: (
    el: HTMLElement,
    options: {
      sitekey: string;
      appearance?: string;
      callback?: (token: string) => void;
      'error-callback'?: () => void;
      'expired-callback'?: () => void;
    },
  ) => string;
  execute: (id: string) => void;
  reset: (id: string) => void;
  remove: (id: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

let loading: Promise<TurnstileApi> | null = null;

function loadScript(): Promise<TurnstileApi> {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  loading ??= new Promise<TurnstileApi>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = SCRIPT;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (window.turnstile) resolve(window.turnstile);
      else reject(new Error('Turnstile loaded without an API'));
    };
    script.onerror = () => reject(new Error('Turnstile script failed to load'));
    document.head.append(script);
  });
  return loading;
}

export type TurnstileHandle = {
  /** Resolves with a token, or null when Turnstile is not configured or is
   *  unreachable. A null token must never block the submit: Cloudflare being
   *  down is not a reason to lose an enquiry. */
  token: () => Promise<string | null>;
  destroy: () => void;
};

/** Renders an invisible widget into `container` and returns a handle. */
export async function mountTurnstile(container: HTMLElement): Promise<TurnstileHandle | null> {
  if (!turnstileConfigured()) return null;

  let api: TurnstileApi;
  try {
    api = await loadScript();
  } catch {
    return null;
  }

  let current: string | null = null;
  let waiting: ((token: string | null) => void) | null = null;

  const settle = (token: string | null) => {
    current = token;
    waiting?.(token);
    waiting = null;
  };

  const id = api.render(container, {
    sitekey: SITE_KEY,
    appearance: 'interaction-only',
    callback: settle,
    'error-callback': () => settle(null),
    // Tokens are short-lived. If one expires while the visitor is still
    // typing, drop it and ask for a fresh one at submit time.
    'expired-callback': () => {
      current = null;
    },
  });

  return {
    token: () =>
      new Promise<string | null>(resolve => {
        if (current) return resolve(current);
        waiting = resolve;
        try {
          api.execute(id);
        } catch {
          settle(null);
        }
        // Never hang the submit on a third party.
        setTimeout(() => {
          if (waiting) settle(null);
        }, 8000);
      }),
    destroy: () => {
      try {
        api.remove(id);
      } catch {
        /* already gone */
      }
    },
  };
}
