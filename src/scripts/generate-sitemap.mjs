import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { SitemapStream, streamToPromise } from 'sitemap';

const { origin } = JSON.parse(readFileSync('src/lib/site-policy.json', 'utf8'));
const canonicalPath = path => (path === '/' ? '/' : path.replace(/\/+$/, '') + '/');
const { render, preloadTags, organizationTag } = await import('../../.prerender/entry-server.js');
const pages = JSON.parse(readFileSync('src/data/seo.json', 'utf8'));
// The organisation JSON-LD is substituted into the template once, not per
// page: `index.html` used to carry a hand-written copy of it, which is the
// copy all sixty pages served while `organizationSchema()` sat uncalled and
// drifted away from it. The placeholder must be there, or every page would
// quietly ship without the schema.
const shell = readFileSync('dist/index.html', 'utf8');
if (!shell.includes('<!--organization-jsonld-->'))
  throw new Error('index.html is missing the <!--organization-jsonld--> placeholder');
const template = shell.replace('<!--organization-jsonld-->', organizationTag());
const escape = text =>
  text.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

/* ---- A-03: lastmod from git, not from the build clock ------------------ */

/** The content file whose history decides a route's lastmod. A build does not
 *  change a page's content, so `new Date()` would tell Google every URL
 *  changed on every deploy and nothing would be prioritised. */
function sourceFor(path) {
  if (path.startsWith('/blog/')) return 'src/data/posts.json';
  if (path.startsWith('/projects/')) return 'src/data/projects.json';
  const page = path === '/' ? 'src/pages/Home.tsx' : null;
  if (page && existsSync(page)) return page;
  if (path.startsWith('/services')) return 'src/data/services-content.json';
  return 'src/data/seo.json';
}

const lastmodCache = new Map();
function lastmod(path) {
  const file = sourceFor(path);
  if (!lastmodCache.has(file)) {
    let value = null;
    try {
      value =
        execFileSync('git', ['log', '-1', '--format=%cI', '--', file], {
          encoding: 'utf8',
          stdio: ['ignore', 'pipe', 'ignore'],
        }).trim() || null;
    } catch {
      // Not a git checkout (some CI images do a tarball export). Leaving
      // lastmod off is correct; a wrong date is worse than none.
    }
    lastmodCache.set(file, value);
  }
  return lastmodCache.get(file);
}

function renderMetadata(path, metadata) {
  const canonical = origin + canonicalPath(path);
  return template
    .replace(/<title>.*?<\/title>/s, `<title>${escape(metadata.title)}</title>`)
    .replace(/(<meta\s+name="description"\s+content=")[^"]*/, `$1${escape(metadata.description)}`)
    .replace(/(<link rel="canonical" href=")[^"]*/, `$1${canonical}`)
    .replace(/(<meta property="og:url" content=")[^"]*/, `$1${canonical}`)
    .replace(/(<meta property="og:title" content=")[^"]*/, `$1${escape(metadata.title)}`)
    .replace(/(<meta\s+property="og:description"\s+content=")[^"]*/, `$1${escape(metadata.description)}`)
    .replace(/(<meta name="twitter:title" content=")[^"]*/, `$1${escape(metadata.title)}`)
    .replace(/(<meta name="twitter:description" content=")[^"]*/, `$1${escape(metadata.description)}`);
}

function noindexed(html) {
  return html
    .replace(/<link rel="canonical"[^>]*>/, '')
    .replace(/<meta property="og:url"[^>]*>/, '')
    .replace('</head>', '<meta name="robots" content="noindex,follow" /></head>');
}

const sitemap = new SitemapStream({ hostname: origin });
let indexed = 0;
for (const [path, metadata] of Object.entries(pages)) {
  const directory = path === '/' ? 'dist' : join('dist', path.slice(1));
  mkdirSync(directory, { recursive: true });
  const content = await render(canonicalPath(path));
  if (!content.includes('<h1') || content.includes('>Loading…</div>'))
    throw new Error(`Incomplete prerender: ${path}`);
  let html = renderMetadata(path, metadata).replace(
    '<div id="root"></div>',
    () => `<div id="root" data-prerendered="true">${content}</div>`,
  );
  // B-02 — the LCP preload goes in <head>, ahead of the stylesheet. It is
  // built here rather than rendered by a component, because renderToString
  // emits <link> in place and the hydrated tree would then disagree.
  const preloads = preloadTags(path);
  if (preloads) html = html.replace('</head>', `${preloads}</head>`);
  // A noindex route is still prerendered, so a direct hit or a refresh works
  // (H-03), but it stays out of the sitemap and carries robots=noindex.
  if (metadata.noindex) html = noindexed(html);
  writeFileSync(join(directory, 'index.html'), html);
  if (!metadata.noindex) {
    // A-03: no <priority>, no <changefreq> — Google ignores both.
    const modified = lastmod(path);
    sitemap.write({ url: canonicalPath(path), ...(modified ? { lastmod: modified } : {}) });
    indexed += 1;
  }
}
sitemap.end();
writeFileSync('dist/sitemap.xml', (await streamToPromise(sitemap)).toString());

// Netlify-compatible aliases; no SPA catch-all so unknown paths keep an HTTP 404.
const aliases = {
  '/blog/foundations': '/blog/planning-school-hvac-upgrades',
  '/blog/materials-2025': '/blog/boiler-plant-upgrade-ridgeview',
  '/blog/tech-changing-game': '/blog/haro-heating-hot-water-upgrade',
  '/GetQuote': '/quote',
  '/getquote': '/quote',
  '/services/boiler-plants-controls': '/services/boilers',
  '/services/maintenance-programs': '/services/maintenance',
  '/services/emergency-service': '/services/emergency',
  // The page was published under the wrong client. The building — 456 West 5th
  // Avenue — did not change, so the old URL keeps its value and redirects.
  '/projects/icbc': '/projects/west-5th',
};
writeFileSync(
  'dist/_redirects',
  Object.entries(aliases)
    .map(([from, to]) => `${from} ${canonicalPath(to)} 301`)
    .join('\n') + '\n',
);

let notFound = renderMetadata('/', {
  title: 'Page Not Found — Allied Plumbing',
  description: 'This page could not be found. Contact Allied Plumbing or explore our services.',
});
notFound = noindexed(notFound);
const notFoundContent = await render('/allied-static-not-found/');
notFound = notFound.replace(
  '<div id="root"></div>',
  () => `<div id="root" data-prerendered="true">${notFoundContent}</div>`,
);
writeFileSync('dist/404.html', notFound);

const withLastmod = [...lastmodCache.values()].filter(Boolean).length;
console.log(
  `Prerendered ${Object.keys(pages).length} routes (${indexed} in the sitemap), ` +
    `lastmod resolved for ${withLastmod}/${lastmodCache.size} content sources, plus the 404 page.`,
);
