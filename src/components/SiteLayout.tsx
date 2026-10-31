import { useEffect, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import SiteNav from './SiteNav';
import Footer from './Footer';
import Head from './Head';
import { trackEvent } from '../lib/analytics';

export default function SiteLayout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest('a[href^="tel:"]') : null;
      if (link) trackEvent('phone_click');
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
  return <MotionConfig reducedMotion="user">
    <Head />
    <SiteNav />
    <main id="main" tabIndex={-1} className={pathname === '/' ? '' : 'min-h-[60vh]'}>{children}</main>
    <Footer />
  </MotionConfig>;
}
