import { useEffect, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import SiteNav from './SiteNav';
import Footer from './Footer';
import Head from './Head';
import AnalyticsConsent from './AnalyticsConsent';
import { trackEvent, type CtaLocation } from '../lib/analytics';

/** Delegated tracking for J-02's `click_call` and `click_email`.
 *
 * Invisible: it only listens. A link can name where it sits with
 * `data-cta-location`; otherwise the event is attributed to "page". Links
 * that fire their own event set `data-tracked` so nothing is double-counted.
 *
 * The audit's sticky mobile action bar (E-02) is not mounted here — it was
 * part of the redesign that was rolled back. To bring it back, restore
 * src/components/MobileActionBar.tsx from git and render it below <Footer>. */
function useLinkTracking() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest<HTMLAnchorElement>('a[href^="tel:"], a[href^="mailto:"]');
      if (!link || link.dataset.tracked === 'true') return;
      const location = (link.dataset.ctaLocation as CtaLocation) ?? 'page';
      trackEvent(link.href.startsWith('tel:') ? 'click_call' : 'click_email', { location });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
}

export default function SiteLayout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  useLinkTracking();
  return (
    <MotionConfig reducedMotion="user">
      <Head />
      <SiteNav />
      <main id="main" tabIndex={-1} className={pathname === '/' ? '' : 'min-h-[60vh]'}>
        {children}
      </main>
      <Footer />
      <AnalyticsConsent />
    </MotionConfig>
  );
}
