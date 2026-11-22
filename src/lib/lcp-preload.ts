import { srcSet, type AspectRatio } from './images';
import { projects } from './projects';
import posts from '../data/posts.json';
import servicesContent from '../data/services-content.json';
import { SERVICE_LINKS } from './site-links';

/** Audit B-02 — the LCP image preload, declared per route.
 *
 *  These links must end up in <head>, before the stylesheet, or they give the
 *  LCP image no head start. They cannot be rendered from a React component:
 *  `renderToString` emits `<link>` in place rather than hoisting it, so the
 *  prerendered markup would disagree with the hydrated tree (React #418) and
 *  the page would re-render on the client.
 *
 *  So the prerender step asks this module what to preload and writes the tags
 *  into <head> itself. The components render the <img>/<picture> only.
 *  Keep the candidate sets here identical to the ones the components use, or
 *  the browser downloads one image and displays another. */

type Preload = {
  srcset: string;
  sizes: string;
  /** Matches the <picture> source's media query, when the page art-directs. */
  media?: string;
};

function hero(image: string): Preload[] {
  return [
    { media: '(max-width: 767px)', srcset: srcSet(image, 960, { ar: '4:5' }) ?? '', sizes: '100vw' },
    { media: '(min-width: 768px)', srcset: srcSet(image, 1920, { ar: '16:9' }) ?? '', sizes: '100vw' },
  ];
}

function single(image: string, max: number, ar: AspectRatio, sizes: string): Preload[] {
  return [{ srcset: srcSet(image, max, { ar }) ?? '', sizes }];
}

const HOME_HERO =
  'https://res.cloudinary.com/dzytbkc5l/image/upload/v1760065876/Allied/3_gk4dl8.png';
const SERVICES_HERO =
  'https://res.cloudinary.com/dzytbkc5l/image/upload/v1760065875/Allied/1_tc9jiy.png';
const PROJECTS_HERO =
  'https://res.cloudinary.com/dzytbkc5l/image/upload/v1760072887/Allied/Allied_1_n00b0m.png';
const ABOUT_HERO =
  'https://res.cloudinary.com/dzytbkc5l/image/upload/v1760068156/Allied/14_urnogx.png';
const CAREERS_HERO =
  'https://res.cloudinary.com/dzytbkc5l/image/upload/v1760065876/Allied/3_gk4dl8.png';

/** `path` has no trailing slash, matching the keys in seo.json. */
export function preloadsFor(path: string): Preload[] {
  if (path === '/') return hero(HOME_HERO);
  if (path === '/services') return hero(SERVICES_HERO);
  if (path === '/projects') return hero(PROJECTS_HERO);
  if (path === '/about') return hero(ABOUT_HERO);
  if (path === '/careers') return hero(CAREERS_HERO);

  const service = SERVICE_LINKS.find(item => item.to === path);
  if (service) {
    // The emergency page has no hero image — it opens on the phone number.
    if (service.key === 'emergency') return [];
    const copy = (servicesContent as unknown as Record<string, { image: string }>)[service.key];
    return copy ? hero(copy.image) : [];
  }

  if (path.startsWith('/projects/')) {
    const project = projects.find(item => item.id === path.slice('/projects/'.length));
    return project
      ? single(project.cover, 1280, '4:3', '(min-width: 1024px) 520px, 100vw')
      : [];
  }

  if (path.startsWith('/blog/')) {
    const post = posts.find(item => item.slug === path.slice('/blog/'.length));
    return post ? single(post.image, 1280, '16:9', '(min-width: 1200px) 1152px, 100vw') : [];
  }

  return [];
}

/** Renders the <link> tags for a route as a string, for the prerender step. */
export function preloadTags(path: string) {
  return preloadsFor(path)
    .filter(item => item.srcset)
    .map(
      item =>
        `<link rel="preload" as="image" fetchpriority="high"${
          item.media ? ` media="${item.media}"` : ''
        } imagesrcset="${item.srcset.replace(/"/g, '&quot;')}" imagesizes="${item.sizes}">`,
    )
    .join('');
}
