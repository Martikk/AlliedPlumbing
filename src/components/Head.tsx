import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import pages from '../data/seo.json';

const origin = 'https://www.alliedplumbing.ca';
export default function Head() {
  const { pathname } = useLocation();
  const path = pathname.replace(/\/+$/, '') || '/';
  const metadata = pages[path as keyof typeof pages];
  const title = metadata?.title ?? 'Page Not Found — Allied Plumbing';
  const description = metadata?.description ?? 'This page could not be found. Explore Allied Plumbing services or contact our team.';
  useEffect(() => {
    document.title = title;
    const setMeta = (name: string, value: string, property = false) => {
      const attribute = property ? 'property' : 'name';
      let element = document.querySelector<HTMLMetaElement>(`meta[${attribute}="${name}"]`);
      if (!element) { element = document.createElement('meta'); element.setAttribute(attribute, name); document.head.append(element); }
      element.content = value;
    };
    setMeta('description', description);
    setMeta('robots', metadata ? 'index,follow' : 'noindex,follow');
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (metadata) {
      if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.append(canonical); }
      canonical.href = origin + path;
      setMeta('og:url', origin + path, true);
    } else {
      canonical?.remove();
      document.querySelector('meta[property="og:url"]')?.remove();
    }
  }, [title, description, path, metadata]);
  return null;
}
