import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { SitemapStream, streamToPromise } from 'sitemap';

const { origin } = JSON.parse(readFileSync('src/lib/site-policy.json', 'utf8'));
const canonicalPath = path => path === '/' ? '/' : path.replace(/\/+$/, '') + '/';
const { render } = await import('../../.prerender/entry-server.js');
const pages = JSON.parse(readFileSync('src/data/seo.json', 'utf8'));
const template = readFileSync('dist/index.html', 'utf8');
const escape = text => text.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
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
const sitemap = new SitemapStream({ hostname: origin });
for (const [path, metadata] of Object.entries(pages)) {
  const directory = path === '/' ? 'dist' : join('dist', path.slice(1));
  mkdirSync(directory, { recursive: true });
  const content = await render(canonicalPath(path));
  if (!content.includes('<h1') || content.includes('>Loading…</div>')) throw new Error(`Incomplete prerender: ${path}`);
  const html = renderMetadata(path, metadata).replace('<div id="root"></div>', () => `<div id="root" data-prerendered="true">${content}</div>`);
  writeFileSync(join(directory, 'index.html'), html);
  sitemap.write({ url: canonicalPath(path) });
}
sitemap.end();
writeFileSync('dist/sitemap.xml', (await streamToPromise(sitemap)).toString());
// Netlify-compatible aliases; no SPA catch-all so unknown paths keep an HTTP 404.
const aliases = {
  '/blog/foundations': '/blog/planning-school-hvac-upgrades',
  '/blog/materials-2025': '/blog/boiler-plant-upgrade-ridgeview',
  '/blog/tech-changing-game': '/blog/haro-heating-hot-water-upgrade',
  '/GetQuote': '/quote', '/getquote': '/quote',
  '/services/boiler-plants-controls': '/services/boilers',
  '/services/maintenance-programs': '/services/maintenance',
  '/services/emergency-service': '/services/emergency',
};
writeFileSync('dist/_redirects', Object.entries(aliases).map(([from,to]) => `${from} ${canonicalPath(to)} 301`).join('\n') + '\n');
let notFound = renderMetadata('/', {title:'Page Not Found — Allied Plumbing',description:'This page could not be found. Contact Allied Plumbing or explore our services.'});
notFound = notFound.replace(/<link rel="canonical"[^>]*>/, '').replace(/<meta property="og:url"[^>]*>/, '').replace('</head>', '<meta name="robots" content="noindex,follow" /></head>');
const notFoundContent = await render('/allied-static-not-found/');
notFound = notFound.replace('<div id="root"></div>', () => `<div id="root" data-prerendered="true">${notFoundContent}</div>`);
writeFileSync('dist/404.html', notFound);
console.log(`Generated static metadata for ${Object.keys(pages).length} routes, sitemap and 404 page. Source public/sitemap.xml preserved.`);
