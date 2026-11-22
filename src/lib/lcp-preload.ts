import { responsiveImage, imageCandidates } from './images';
import { projects } from './projects';
import posts from '../data/posts.json';

/** Audit B-02 — the LCP image preload, declared per route.
 *
 *  These links have to land in <head>, before the stylesheet, or they give
 *  the LCP image no head start. They cannot be rendered from a React
 *  component: `renderToString` emits `<link>` in place rather than hoisting
 *  it, so the prerendered markup would disagree with the hydrated tree
 *  (React #418) and the page would re-render on the client. So the prerender
 *  step asks this module what to preload and writes the tags itself.
 *
 *  Every candidate set below must match, character for character, what the
 *  page actually renders — otherwise the browser downloads one image and
 *  displays another. That is why this only covers the three data-driven
 *  heroes. The remaining pages hard-code their hero URL in the component and
 *  already carry `fetchpriority="high"` on it, which is most of the benefit;
 *  adding them here would mean duplicating those strings in two places and
 *  silently losing the preload the first time one is edited. */

type Preload = { srcset?: string; href?: string; sizes?: string };

/** The homepage hero slides. Home.tsx imports this, so the preload and the
 *  first slide can never drift apart. */
export const HOME_SLIDES = [
  'https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_1200/v1760074307/Allied/Gemini_Generated_Image_9on55p9on55p9on5_ga0mso.png',
  'https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_1200/v1760065876/Allied/3_gk4dl8.png',
  'https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_1200/v1760065875/Allied/1_tc9jiy.png',
  'https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_1200/v1760068156/Allied/14_urnogx.png',
];

/** `path` has no trailing slash, matching the keys in seo.json. */
export function preloadsFor(path: string): Preload[] {
  if (path === '/') {
    // Hero.tsx renders slide 0 at w_1600 with a 640/1024/1600 srcSet.
    const first = HOME_SLIDES[0];
    return [
      {
        srcset: `${responsiveImage(first, 640)} 640w, ${responsiveImage(first, 1024)} 1024w, ${responsiveImage(first, 1600)} 1600w`,
        sizes: '100vw',
      },
    ];
  }

  if (path.startsWith('/projects/')) {
    // ProjectDetail renders `project.cover` untransformed.
    const project = projects.find(item => item.id === path.slice('/projects/'.length));
    return project ? [{ href: project.cover }] : [];
  }

  if (path.startsWith('/blog/')) {
    // BlogPost renders `post.image` untransformed, and some are local paths.
    const post = posts.find(item => item.slug === path.slice('/blog/'.length));
    return post && post.image.startsWith('https://') ? [{ href: post.image }] : [];
  }

  return [];
}

const escape = (value: string) => value.replace(/"/g, '&quot;');

/** Renders the <link> tags for a route as a string, for the prerender step. */
export function preloadTags(path: string) {
  return preloadsFor(path)
    .map(item => {
      if (item.srcset)
        return `<link rel="preload" as="image" fetchpriority="high" imagesrcset="${escape(item.srcset)}" imagesizes="${item.sizes ?? '100vw'}">`;
      if (item.href)
        return `<link rel="preload" as="image" fetchpriority="high" href="${escape(item.href)}">`;
      return '';
    })
    .filter(Boolean)
    .join('');
}

export { imageCandidates };
