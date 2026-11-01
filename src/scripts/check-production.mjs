import { readFileSync, readdirSync, writeFileSync } from 'node:fs';

const origin = 'https://www.alliedplumbing.ca';
const pages = JSON.parse(readFileSync('src/data/seo.json', 'utf8'));
const failures = [];
async function request(path) {
  const response = await fetch(origin + path, { signal: AbortSignal.timeout(35000), headers: { 'Cache-Control': 'no-cache' } });
  return { status: response.status, body: await response.text(), type: response.headers.get('content-type') };
}
async function mapLimit(items, callback) {
  let cursor = 0;
  const output = [];
  await Promise.all(Array.from({ length: Math.min(5, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor++;
      try { output[index] = await callback(items[index]); }
      catch (error) { output[index] = { path: items[index], error: String(error) }; failures.push(output[index]); }
    }
  }));
  return output;
}
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const routes = await mapLimit(Object.keys(pages), async path => {
  const response = await request(path);
  const canonical = response.body.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)/)?.[1];
  const result = { path, status: response.status, canonicalOK: canonical === origin + path, titleOK: response.body.includes(`<title>${escape(pages[path].title)}</title>`) };
  if (result.status !== 200 || !result.canonicalOK || !result.titleOK) failures.push(result);
  return result;
});
const home = await request('/');
const entries = body => [...body.matchAll(/<script[^>]*src="([^"]+)/g)].map(match => match[1]);
const localEntry = entries(readFileSync('dist/index.html', 'utf8'));
const productionEntry = entries(home.body);
const entryMatches = JSON.stringify(localEntry) === JSON.stringify(productionEntry);
if (!entryMatches) failures.push({ issue: 'Production entry differs from the local build', localEntry, productionEntry });
const assets = await mapLimit(readdirSync('dist/assets').filter(name => /\.(js|css)$/.test(name)).map(name => '/assets/' + name), async path => {
  const response = await request(path);
  const typeOK = path.endsWith('.css') ? response.type?.includes('text/css') : /javascript/.test(response.type ?? '');
  const result = { path, status: response.status, typeOK, bytes: response.body.length };
  if (result.status !== 200 || !typeOK || !result.bytes) failures.push(result);
  return result;
});
const sitemap = await request('/sitemap.xml');
const sitemapURLs = [...sitemap.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
const sitemapOK = sitemap.status === 200 && sitemapURLs.length === routes.length && Object.keys(pages).every(path => sitemapURLs.includes(origin + path));
if (!sitemapOK) failures.push({ issue: 'Sitemap does not match canonical routes' });
const missing = await request('/allied-verification-missing-page-20261031');
if (missing.status !== 404) failures.push({ issue: 'Unknown page does not return HTTP 404', status: missing.status });
const result = { checkedAt: new Date().toISOString(), origin, entryMatches, localEntry, productionEntry, routes, assets, sitemapOK, sitemapURLs: sitemapURLs.length, unknownStatus: missing.status, failures };
if (process.argv[2]) writeFileSync(process.argv[2], JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify({ checkedAt: result.checkedAt, routes: routes.length, assets: assets.length, entryMatches, sitemapOK, unknownStatus: missing.status, failures }, null, 2));
process.exitCode = failures.length ? 1 : 0;
