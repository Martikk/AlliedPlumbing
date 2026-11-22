import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  analyticsConfigured,
  readAnalyticsConsent,
  setAnalyticsConsent,
  trackAnalyticsPage,
} from '../lib/analytics-consent';
import { Link } from '../lib/navigation';

/** Audit E-03 — the banner shows once, then disappears for good.
 *
 * The floating "Analytics preferences" pill is gone: it was the only fixed
 * element in the thumb zone on mobile, where the 24/7 call button belongs
 * (E-02). The footer's "Cookie settings" link reopens the banner by
 * dispatching OPEN_EVENT. */

export const OPEN_EVENT = 'allied:cookie-settings';

export function openCookieSettings() {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT));
}

export default function AnalyticsConsent() {
  const { pathname } = useLocation();
  const [ready, setReady] = useState(false);
  const [consent, setConsent] = useState<'granted' | 'denied' | null>(null);
  const [reopened, setReopened] = useState(false);

  useEffect(() => {
    const saved = readAnalyticsConsent();
    setConsent(saved);
    if (saved) setAnalyticsConsent(saved);
    setReady(true);
  }, []);

  useEffect(() => {
    const open = () => setReopened(true);
    window.addEventListener(OPEN_EVENT, open);
    return () => window.removeEventListener(OPEN_EVENT, open);
  }, []);

  useEffect(() => {
    if (ready && consent === 'granted') trackAnalyticsPage(pathname);
  }, [pathname, consent, ready]);

  if (!ready || !analyticsConfigured()) return null;
  if (consent && !reopened) return null;

  function choose(value: 'granted' | 'denied') {
    setAnalyticsConsent(value);
    setConsent(value);
    setReopened(false);
  }

  return (
    <aside
      aria-label="Analytics preferences"
      className="fixed inset-x-3 bottom-[calc(0.75rem+var(--mobile-bar-space,0px))] z-[60] mx-auto max-w-3xl rounded-[var(--radius-lg)] border border-[var(--line)] bg-[var(--surface)] p-5 shadow-md md:bottom-3"
    >
      <h2 className="font-bold text-[var(--ink)]">Optional website analytics</h2>
      <p className="mt-2 text-sm leading-[var(--lh-body)] text-[var(--body)]">
        Allow Google Analytics to help us understand page visits and completed enquiries? Form
        contents and resume links are never included. You can change this later from the footer.{' '}
        <Link to="/privacy" className="underline underline-offset-2">
          Privacy notice
        </Link>
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => choose('denied')}
          className="min-h-12 rounded-[var(--radius)] border border-[var(--line)] px-4 font-semibold text-[var(--ink)] hover:border-[var(--ink)]"
        >
          Keep analytics off
        </button>
        <button
          type="button"
          onClick={() => choose('granted')}
          className="min-h-12 rounded-[var(--radius)] bg-[var(--ink)] px-4 font-semibold text-white hover:opacity-90"
        >
          Allow analytics
        </button>
      </div>
    </aside>
  );
}
