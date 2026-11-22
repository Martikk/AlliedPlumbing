import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';
const canonicalPath = path => path === '/' ? '/' : path.replace(/\/+$/, '') + '/';
const pages = JSON.parse(readFileSync('src/data/seo.json', 'utf8'));

test('every public route ships its own canonical and readable metadata without JavaScript', () => {
  const titles = new Set();
  for (const [path, page] of Object.entries(pages)) {
    const html = readFileSync(join('dist', path === '/' ? '' : path.slice(1), 'index.html'), 'utf8');
    const canonical = [...html.matchAll(/<link rel="canonical" href="([^"]+)"/g)];
    if (page.noindex) {
      // Audit H-03: a noindex route is still prerendered so a direct hit or a
      // refresh works, but it must not claim a canonical or an og:url.
      assert.equal(canonical.length, 0, path);
      assert.ok(html.includes('name="robots" content="noindex,follow"'), path);
      assert.ok(!html.includes('property="og:url"'), path);
    } else {
      assert.equal(canonical.length, 1, path);
      assert.equal(canonical[0][1], 'https://www.alliedplumbing.ca' + canonicalPath(path));
    }
    assert.ok(html.includes('<title>' + page.title.replaceAll('&', '&amp;') + '</title>'), path);
    assert.ok(html.includes('name="description"'), path);
    assert.ok(!titles.has(page.title), 'Duplicate title for ' + path); titles.add(page.title);
    assert.ok(!html.includes('aggregateRating'), 'Unverified rating should not be structured data');
  }
});

test('titles and descriptions stay inside the limits in audit A-02', () => {
  const descriptions = new Set();
  for (const [path, page] of Object.entries(pages)) {
    assert.ok(page.title.length <= 60, `Title ${page.title.length} chars at ${path}`);
    assert.ok(
      page.description.length >= 120 && page.description.length <= 155,
      `Description ${page.description.length} chars at ${path}`,
    );
    assert.ok(!descriptions.has(page.description), 'Duplicate description for ' + path);
    descriptions.add(page.description);
  }
});
test('sitemap lists only indexable canonical routes, with lastmod from content history', () => {
  const sitemap = readFileSync('dist/sitemap.xml', 'utf8');
  const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
  const indexable = Object.entries(pages).filter(([, page]) => !page.noindex).map(([path]) => path);
  assert.deepEqual(
    locations.sort(),
    indexable.map(path => 'https://www.alliedplumbing.ca' + canonicalPath(path)).sort(),
  );
  // Audit A-03: lastmod is the content file's last commit date, never the
  // build clock, so a redeploy must not look like a content change.
  const dates = [...sitemap.matchAll(/<lastmod>(.*?)<\/lastmod>/g)].map(match => match[1]);
  assert.ok(dates.length > 0, 'sitemap should carry lastmod');
  for (const date of dates) assert.ok(!Number.isNaN(Date.parse(date)), `invalid lastmod: ${date}`);

  const commitDate = file =>
    execFileSync('git', ['log', '-1', '--format=%cI', '--', file], { encoding: 'utf8' }).trim();
  const lastmodFor = path => {
    const entry = sitemap.match(
      new RegExp(`<loc>https://www\\.alliedplumbing\\.ca${path}</loc><lastmod>(.*?)</lastmod>`),
    );
    return entry && entry[1];
  };
  // The sitemap library normalises to UTC, so compare instants, not strings.
  const sameInstant = (a, b) => assert.equal(Date.parse(a), Date.parse(b));
  sameInstant(lastmodFor('/blog/planning-school-hvac-upgrades/'), commitDate('src/data/posts.json'));
  sameInstant(lastmodFor('/projects/ridgeview/'), commitDate('src/data/projects.json'));
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


test('business and article structured data match visible facts without invented review or hours', () => {
  const posts = JSON.parse(readFileSync('src/data/posts.json', 'utf8'));
  const schemas = path => [...readFileSync(path, 'utf8').matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(match => JSON.parse(match[1]));
  const types = item => [item['@type']].flat();
  const business = schemas('dist/index.html').find(item => types(item).includes('HVACBusiness'));
  assert.ok(business, 'homepage must carry the organisation schema');
  assert.ok(types(business).includes('Plumber'), 'audit A-05: also a Plumber');
  assert.equal(business.address.streetAddress, '4085 2nd Avenue');
  assert.equal(business.address.addressLocality, 'Burnaby');
  assert.equal(business.openingHours, undefined);
  assert.equal(business.aggregateRating, undefined);
  for (const post of posts) {
    const article = schemas(`dist/blog/${post.slug}/index.html`).find(item => types(item).includes('BlogPosting'));
    assert.ok(article, post.slug);
    assert.equal(article.headline, post.title);
    assert.equal(article.mainEntityOfPage, `https://www.alliedplumbing.ca/blog/${post.slug}/`);
    assert.equal(article.datePublished, post.date);
    assert.equal(article.author.name, post.author);
    assert.equal(article.reviewedBy, undefined);
    assert.equal(article.dateModified, undefined);
  }
});
