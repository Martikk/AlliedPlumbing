import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import pages from '../data/seo.json';
import { canonicalURL } from '../lib/site-url';

type Meta = { title: string; description: string; noindex?: boolean };

/** Audit A-02 — one place that owns the head tags.
 *
 * The canonical is always built from the route path, never from
 * window.location, so a query string or a stray host can never leak into it.
 * The prerender step writes the same tags into the static HTML; this keeps
 * them right during client-side navigation.
 *
 * A route missing from seo.json, or one marked `noindex` (the thank-you page,
 * H-03), gets robots=noindex,follow and no canonical. */
export default function Head() {
  const { pathname } = useLocation();
  const path = pathname.replace(/\/+$/, '') || '/';
  const metadata = pages[path as keyof typeof pages] as Meta | undefined;
  const title = metadata?.title ?? 'Page Not Found — Allied Plumbing';
  const description =
    metadata?.description ??
    'This page could not be found. Explore Allied Plumbing services or contact our team.';
  const indexable = Boolean(metadata) && !metadata?.noindex;

  useEffect(() => {
    document.title = title;
    const setMeta = (name: string, value: string, property = false) => {
      const attribute = property ? 'property' : 'name';
      let element = document.querySelector<HTMLMetaElement>(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.append(element);
      }
      element.content = value;
    };
    setMeta('description', description);
    setMeta('robots', indexable ? 'index,follow' : 'noindex,follow');
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (indexable) {
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.append(canonical);
      }
      canonical.href = canonicalURL(path);
      setMeta('og:url', canonicalURL(path), true);
    } else {
      canonical?.remove();
      document.querySelector('meta[property="og:url"]')?.remove();
    }
  }, [title, description, path, indexable]);
  return null;
}
