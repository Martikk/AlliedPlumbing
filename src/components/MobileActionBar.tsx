import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button, { PhoneIcon } from './ui/Button';
import { PHONE_HREF } from '../config';
import { trackEvent } from '../lib/analytics';

/** Audit E-02 — sticky bottom action bar, phones only.
 *
 * Emergency callers are mostly on mobile, and the 24/7 number used to scroll
 * away. Two equal buttons sit in the thumb zone on every route.
 *
 * It hides itself whenever the hero CTAs or the enquiry form are on screen, so
 * it never duplicates a visible button. Mark those with `data-cta-anchor`. */

const ANCHOR = '[data-cta-anchor]';

export default function MobileActionBar() {
  const { pathname } = useLocation();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Reserve the bar's height on <body> so the footer is never covered.
    document.body.style.setProperty('--mobile-bar-space', 'calc(72px + env(safe-area-inset-bottom))');
    return () => {
      document.body.style.removeProperty('--mobile-bar-space');
    };
  }, []);

  useEffect(() => {
    setHidden(false);
    const anchors = Array.from(document.querySelectorAll(ANCHOR));
    if (!anchors.length) return;
    const onScreen = new Set<Element>();
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) onScreen.add(entry.target);
          else onScreen.delete(entry.target);
        }
        setHidden(onScreen.size > 0);
      },
      { threshold: 0.2 },
    );
    anchors.forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, [pathname]);

  if (hidden) return null;

  return (
    <div className="mobile-bar" role="group" aria-label="Contact Allied">
      <Button
        href={PHONE_HREF}
        variant="secondary"
        icon={<PhoneIcon />}
        className="w-full"
        data-cta-location="mobile_bar"
      >
        Call 24/7
      </Button>
      <Button
        href="/quote"
        className="w-full"
        onClick={() => trackEvent('click_quote', { location: 'mobile_bar' })}
      >
        Get a quote
      </Button>
    </div>
  );
}
