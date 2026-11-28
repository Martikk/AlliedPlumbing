import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const projects = JSON.parse(readFileSync('src/data/projects.json','utf8'));
const seo = JSON.parse(readFileSync('src/data/seo.json','utf8'));

test('all documented case studies have a unique route and matching search title', () => {
  assert.equal(projects.length, 19);
  assert.equal(new Set(projects.map(project=>project.id)).size, 19);
  for (const project of projects) {
    assert.ok(project.scope.length >= 3);
    // Audit A-04/A-06: the search title no longer mirrors the H1 verbatim —
    // it has to fit 60 characters — but it must still name the building.
    const searchTitle = seo['/projects/' + project.id].title;
    assert.ok(searchTitle, project.id);
    assert.ok(searchTitle.length <= 60, `${project.id} title is ${searchTitle.length} chars`);
    const building = project.title.split(/[\u2014,-]| --/)[0].trim().split(' ').slice(0, 2).join(' ');
    assert.ok(searchTitle.includes(building), `${project.id} title should name ${building}`);
    assert.ok(project.cover.startsWith('https://res.cloudinary.com/'));
    assert.ok(project.overview && project.approach && project.outcome);
  }
});
test('corrects the school identity and the Haro boiler system from the supplied scope', () => {
  const garibaldi = projects.find(project=>project.id==='garibaldi');
  assert.equal(garibaldi.title, 'Garibaldi Highlands Elementary School');
  assert.equal(garibaldi.location, 'Squamish, BC');
  const haro = projects.find(project=>project.id==='haro');
  assert.ok(haro.scope.some(item=>item.includes('Viessmann CA3')));
  assert.ok(!haro.scope.some(item=>item.includes('furnaces')));
});
test('published articles have complete content and indexed routes', () => {
  const posts = JSON.parse(readFileSync('src/data/posts.json','utf8'));
  assert.equal(posts.length, 22);
  assert.ok(seo['/blog']);
  for (const post of posts) {
    assert.ok(seo['/blog/'+post.slug]);
    assert.ok(projects.some(project=>project.id===post.project));
    const words=[post.intro,...post.sections.flatMap(section=>section.paragraphs)].join(' ').split(/\s+/).length;
    assert.ok(words>=350, post.slug+' needs a complete article');
    assert.ok(seo['/services/'+post.relatedService]);
    if(post.checklist.length) { assert.ok(words>=500, post.slug+' needs a useful planning guide'); assert.ok(post.checklist.length>=5); }
  }
});

/** The owner's project stories replaced the placeholders these pages shipped
 *  with, and they came with publishing conditions. Those conditions are not
 *  prose anybody will reread before the next edit, so they are assertions.
 *
 *  A project still running must not read as finished. The template prints
 *  "Completed work" over `outcome` whenever `status` is absent, so an unset
 *  status IS a completion claim — which is why the in-progress four are
 *  checked by their status rather than by their wording. */
test('unfinished projects claim no completion, and withheld client names stay out', () => {
  const running = ['crosstown', 'crosstown-phase-2', 'nestor', 'glenayre'];
  for (const id of running) {
    const project = projects.find(item => item.id === id);
    assert.equal(project.status, 'In progress', `${id} must not read as finished`);
    assert.equal(project.year, undefined);
  }
  for (const id of ['collingwood', 'capilano-birch', 'herbert-spencer-ashp', 'hillcrest',
    'myrtle-philip', 'west-5th', 'jervis', 'halifax-7360']) {
    const project = projects.find(item => item.id === id);
    assert.equal(project.status, undefined, `${id} is complete, so the page says so`);
    assert.ok(project.outcome.length > 40, `${id} needs a real completed-work paragraph`);
  }
  assert.equal(projects.find(item => item.id === 'herbert-spencer').year, 2021);

  // The owner cleared Collingwood School to be named and did not clear the
  // rental client for the two new buildings, so those pages describe the owner
  // rather than naming them. 1755 Haro Street was published with that client's
  // name long before this and is left exactly as it stands — withholding
  // consent for a new page is not a reason to rewrite an old one.
  for (const id of ['jervis', 'halifax-7360']) {
    const project = projects.find(item => item.id === id);
    assert.equal(project.client, 'Private rental housing owner', `${id} must not name the owner`);
    assert.ok(!/starlight/i.test(JSON.stringify(project)), `${id} must not name the owner`);
  }
  assert.ok(projects.some(item => item.client === 'Collingwood School'));

  // 1501 Haro Street is held back: its client and equipment are unconfirmed.
  // 1755 Haro Street is a different building and stays published.
  assert.ok(!projects.some(item => /1501 Haro/.test(item.title)));
  assert.ok(projects.some(item => item.title === '1755 Haro Street'));

  // Every project names a service that exists, which is what ProjectDetail
  // now reads instead of a hand-maintained list of ids.
  for (const project of projects) {
    assert.ok(seo['/services/' + project.relatedService], `${project.id}: ${project.relatedService}`);
  }
});

test('new planning guides use real local placeholders and honest review status', () => {
  const posts = JSON.parse(readFileSync('src/data/posts.json','utf8'));
  const guides = posts.filter(post=>post.date==='2026-11-01');
  assert.equal(guides.length, 8);
  assert.equal(new Set(posts.map(post=>post.slug)).size, posts.length);
  for (const post of guides) {
    assert.equal(post.image, '/images/article-placeholder.svg');
    assert.ok(readFileSync('public'+post.image,'utf8').includes('Image coming soon'));
    assert.equal(post.review.status, 'pending');
    assert.equal(post.review.reviewer, null);
    assert.equal(post.review.reviewedAt, null);
    const html=readFileSync('dist/blog/'+post.slug+'/index.html','utf8');
    assert.ok(html.includes('Temporary image placeholder'));
    assert.ok(html.includes(post.title));
    if(post.category==='Careers') assert.ok(html.includes('Explore career opportunities'));
  }
});

/** Audit B-08 — the derived teaser index must not drift from posts.json.
 *
 *  posts-index.json is generated and committed so dev and typecheck work
 *  without a build. That is only safe while the committed copy matches what
 *  the generator would produce, so this regenerates it in memory and compares.
 *  Edit posts.json, then run `npm run gen:posts`. */
test('the posts index matches posts.json', async () => {
  const { buildIndex, readPosts, serialise, INDEX_FIELDS } = await import(
    '../src/scripts/generate-posts-index.mjs'
  );
  const committed = readFileSync('src/data/posts-index.json', 'utf8');
  assert.equal(
    serialise(buildIndex(readPosts())),
    committed,
    'src/data/posts-index.json is stale — run `npm run gen:posts`',
  );

  // The index exists to keep the article bodies off the listing pages. If a
  // body field ever appears here, it has stopped doing its job.
  for (const heavy of ['sections', 'intro', 'checklist', 'review']) {
    assert.ok(!INDEX_FIELDS.includes(heavy), `the index must not carry ${heavy}`);
  }

  // Only the page that renders an article may import the full corpus.
  const importers = ['src/components/BlogTeasers.tsx', 'src/pages/Blog.tsx',
    'src/pages/ProjectDetail.tsx', 'src/lib/lcp-preload.ts'];
  for (const file of importers) {
    assert.ok(
      !/from '[^']*data\/posts\.json'/.test(readFileSync(file, 'utf8')),
      `${file} must import the index, not the full corpus`,
    );
  }
});

/** One organisation, one name.
 *
 *  `/clients` groups by the raw `client` string, so "School District No. 43"
 *  and "School District No. 43 (Coquitlam)" rendered as two headings with the
 *  district's schools split between them — thirteen headings for ten
 *  organisations. The fix is canonical names in the data rather than fuzzy
 *  matching in the page, which this keeps that way. */
test('a school district appears under exactly one name', () => {
  const byNumber = new Map();
  for (const project of projects) {
    const number = project.client.match(/School District No\. (\d+)/)?.[1];
    if (!number) continue;
    const seen = byNumber.get(number);
    assert.ok(seen === undefined || seen === project.client,
      `district ${number} is written both as "${seen}" and "${project.client}"`);
    byNumber.set(number, project.client);
    assert.match(project.client, /\(/, `${project.client} should name its district, e.g. "(Coquitlam)"`);
  }
});
