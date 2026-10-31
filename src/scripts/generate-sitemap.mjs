import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { SitemapStream, streamToPromise } from 'sitemap';

const origin = 'https://www.alliedplumbing.ca';
const pages = JSON.parse(readFileSync('src/data/seo.json', 'utf8'));
const template = readFileSync('dist/index.html', 'utf8');
const escape = text => text.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
function renderMetadata(path, metadata) {
  const canonical = origin + path;
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
  writeFileSync(join(directory, 'index.html'), renderMetadata(path, metadata));
  sitemap.write({ url: path });
}
sitemap.end();
writeFileSync('dist/sitemap.xml', (await streamToPromise(sitemap)).toString());
// Netlify-compatible aliases; no SPA catch-all so unknown paths keep an HTTP 404.
const aliases = {
  '/GetQuote': '/quote', '/getquote': '/quote',
  '/services/boiler-plants-controls': '/services/boilers',
  '/services/maintenance-programs': '/services/maintenance',
  '/services/emergency-service': '/services/emergency',
};
writeFileSync('dist/_redirects', Object.entries(aliases).map(([from,to]) => `${from} ${to} 301`).join('\n') + '\n');
let notFound = renderMetadata('/', {title:'Page Not Found — Allied Plumbing',description:'This page could not be found. Contact Allied Plumbing or explore our services.'});
notFound = notFound.replace(/<link rel="canonical"[^>]*>/, '').replace(/<meta property="og:url"[^>]*>/, '').replace('</head>', '<meta name="robots" content="noindex,follow" /></head>');
writeFileSync('dist/404.html', notFound);
console.log(`Generated static metadata for ${Object.keys(pages).length} routes, sitemap and 404 page. Source public/sitemap.xml preserved.`);
