import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
const canonicalPath = path => path === '/' ? '/' : path.replace(/\/+$/, '') + '/';
const pages = JSON.parse(readFileSync('src/data/seo.json', 'utf8'));

test('every public route ships its own canonical and readable metadata without JavaScript', () => {
  const titles = new Set();
  for (const [path, page] of Object.entries(pages)) {
    const html = readFileSync(join('dist', path === '/' ? '' : path.slice(1), 'index.html'), 'utf8');
    const canonical = [...html.matchAll(/<link rel="canonical" href="([^"]+)"/g)];
    assert.equal(canonical.length, 1, path);
    assert.equal(canonical[0][1], 'https://www.alliedplumbing.ca' + canonicalPath(path));
    assert.ok(html.includes('<title>' + page.title.replaceAll('&', '&amp;') + '</title>'), path);
    assert.ok(html.includes('name="description"'), path);
    assert.ok(!titles.has(page.title), 'Duplicate title for ' + path); titles.add(page.title);
    assert.ok(!html.includes('aggregateRating'), 'Unverified rating should not be structured data');
  }
});
test('sitemap lists only canonical routes, excluding aliases and fabricated lastmod dates', () => {
  const sitemap = readFileSync('dist/sitemap.xml', 'utf8');
  const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
  assert.deepEqual(locations.sort(), Object.keys(pages).map(path => 'https://www.alliedplumbing.ca' + canonicalPath(path)).sort());
  assert.ok(!sitemap.includes('<lastmod>'));
});
test('404 artifact is noindex and has no homepage canonical or misleading open graph URL', () => {
  const html = readFileSync('dist/404.html', 'utf8');
  assert.ok(html.includes('noindex,follow'));
  assert.ok(!html.includes('rel="canonical"'));
  assert.ok(!html.includes('property="og:url"'));
  assert.ok(!readFileSync('dist/_redirects', 'utf8').includes('/* /index.html 200'));
});

test('all public routes include visible page content without JavaScript', () => {
  for (const path of Object.keys(pages)) {
    const html=readFileSync(join('dist',path==='/'?'':path.slice(1),'index.html'),'utf8');
    assert.ok(html.includes('data-prerendered="true"'),path);
    assert.ok(html.includes('<h1'),path);
    assert.ok(html.includes('<main'),path);
    assert.ok(!html.includes('>Loading…</div>'),path);
    assert.ok(!html.includes('id="S:0"'),path+' must not require a script to reveal content');
  }
  assert.ok(readFileSync('dist/blog/integrating-commercial-boiler-controls/index.html','utf8').includes('Make controls responsibilities explicit'));
  assert.ok(readFileSync('dist/projects/ridgeview/index.html','utf8').includes('Converted 12 classrooms'));
});
