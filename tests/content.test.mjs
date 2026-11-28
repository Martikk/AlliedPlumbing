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
  // A floor, not an exact count: the corpus grows, and an exact number turns
  // every new article into a failing test. What matters is that none of the
  // published set disappears.
  assert.ok(posts.length >= 24, `only ${posts.length} articles`);
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

/** "More from our projects" must be related to the project it sits on.
 *
 *  The template took the project list, dropped the current page and sliced
 *  two off the front, so seventeen of the nineteen case studies recommended
 *  the same two pages — whichever were first in the JSON. A Burnaby boiler
 *  replacement pointed at a downtown school chiller, and the internal links
 *  of every project page drained into one pair.
 *
 *  Measured on the built pages rather than on the picker, so a template that
 *  stops calling it fails too. */
test('each project recommends projects it has something in common with', () => {
  const byId = new Map(projects.map(project => [project.id, project]));
  const pairs = new Set();
  let shared = 0;

  for (const project of projects) {
    const html = readFileSync(`dist/projects/${project.id}/index.html`, 'utf8');
    const tail = html.slice(html.indexOf('More from our projects'));
    const picked = [...tail.matchAll(/href="\/projects\/([^/"]+)\//g)].map(match => match[1]);

    assert.equal(picked.length, 2, `${project.id} should offer two further projects`);
    assert.ok(!picked.includes(project.id), `${project.id} links to itself`);
    pairs.add(picked.join('+'));

    if (project.relatedProject) {
      assert.ok(byId.has(project.relatedProject), `${project.id}.relatedProject does not resolve`);
      assert.equal(picked[0], project.relatedProject, `${project.id} ignores its editorial pairing`);
    }
    for (const id of picked) {
      const other = byId.get(id);
      assert.ok(other, `${project.id} links to a project that does not exist: ${id}`);
      if (other.client === project.client || other.relatedService === project.relatedService
        || other.category === project.category || id === project.relatedProject) shared += 1;
    }
  }

  assert.ok(pairs.size >= 12, `only ${pairs.size} distinct pairs across ${projects.length} projects`);
  assert.ok(shared >= projects.length * 2 - 4, 'most recommendations should share a client, service or category');
});

/** `delivery` is a second paragraph of coordination prose, printed under
 *  "Allied's role and coordination". Seven entries used it for a credit line
 *  instead — "Project management: Alex Martishyn, Project Manager." — and
 *  five held an empty string, which the template rendered as an empty
 *  paragraph. The credit now has its own field beside client and location. */
test('delivery carries coordination prose, never a credit line', () => {
  for (const project of projects) {
    assert.ok(!/^Project management:/i.test(project.delivery),
      `${project.id} uses delivery for a credit; set projectManager instead`);
    if (project.delivery) {
      assert.ok(project.delivery.split(/\s+/).length >= 8, `${project.id} delivery is too short to be prose`);
    }
    if (project.projectManager) {
      assert.ok(!project.projectManager.includes(','), `${project.id} projectManager should be a name, not a title line`);
    }
  }
});

/** Articles have to lead somewhere other than back to the index.
 *
 *  A published article linked out to its project, its service and two
 *  project pages, and never to another article — twenty-two pieces with no
 *  path between them, so no topic cluster could form. Its "Related projects"
 *  list also had the same defect the project template had: the first two
 *  entries of a category, so every institutional article offered the same
 *  pair.
 *
 *  Measured on the built pages, so a template that stops calling the pickers
 *  fails here too. */
test('every article leads to three others, and to projects that vary', () => {
  const posts = JSON.parse(readFileSync('src/data/posts.json','utf8'));
  const bySlug = new Map(posts.map(post => [post.slug, post]));
  const readingSets = new Set();
  const projectPairs = new Set();

  for (const post of posts) {
    const html = readFileSync(`dist/blog/${post.slug}/index.html`, 'utf8');

    const reading = html.slice(html.indexOf('Keep reading'));
    const further = [...reading.matchAll(/href="\/blog\/([^/"]+)\//g)].map(match => match[1]);
    assert.equal(further.length, 3, `${post.slug} should lead to three further articles`);
    assert.ok(!further.includes(post.slug), `${post.slug} links to itself`);
    assert.equal(new Set(further).size, 3, `${post.slug} repeats an article`);
    for (const slug of further) assert.ok(bySlug.has(slug), `${post.slug} links to a missing article: ${slug}`);
    readingSets.add(further.join('+'));

    const related = html.slice(html.indexOf('Related projects'));
    projectPairs.add([...related.matchAll(/href="\/projects\/([^/"]+)\//g)].map(match => match[1]).join('+'));
  }

  assert.ok(readingSets.size >= 15, `only ${readingSets.size} distinct reading lists across ${posts.length} articles`);
  assert.ok(projectPairs.size >= 8, `only ${projectPairs.size} distinct project pairs across ${posts.length} articles`);
});

/** Reading time is derived, not typed.
 *
 *  It was a number in `posts.json`, and three of the four newest articles
 *  claimed four minutes for a body that reads in two. A figure written beside
 *  prose goes stale the first time the prose is edited. */
test('no article carries a hand-typed reading time, and the printed one is right', () => {
  const posts = JSON.parse(readFileSync('src/data/posts.json','utf8'));
  for (const post of posts) {
    assert.equal(post.readingMinutes, undefined,
      `${post.slug} still carries readingMinutes; the template computes it`);

    const words = [post.intro, ...post.sections.flatMap(section => section.paragraphs), ...post.checklist]
      .join(' ').match(/\S+/g).length;
    const expected = Math.max(1, Math.round(words / 225));
    const html = readFileSync(`dist/blog/${post.slug}/index.html`, 'utf8');
    const printed = Number(html.match(/(\d+)<!-- --> min read/)[1]);
    assert.equal(printed, expected, `${post.slug} prints ${printed} min for ${words} words`);
  }
});

/** The licences, which are the one set of claims on this site that a reader
 *  verifies against somebody else's database.
 *
 *  Two failure modes are locked here. A licence must never be published past
 *  its term — the page filters on the build date, so this checks the filter
 *  rather than today's data, and no date can turn it red on its own. And a
 *  licence must appear beside the entity the register says holds it, because
 *  the gas licence sits under a second company name and publishing all three
 *  under one would make the page disagree with the register. */
test('no licence is published past its term, and each is shown under its own holder', () => {
  const credentials = JSON.parse(readFileSync('src/data/credentials.json', 'utf8'));
  assert.ok(credentials.licences.length >= 3, 'the register check found three licences');
  for (const licence of credentials.licences) {
    assert.match(licence.number, /^L[A-Z]{2}\d{7}$/, licence.number);
    assert.ok(licence.issued < licence.expires, `${licence.number} term runs backwards`);
    assert.ok(
      credentials.entities.some(entity => entity.key === licence.entity),
      `${licence.number} names an entity that does not exist`,
    );
  }

  // Measured on the built page rather than by importing `lib/credentials.ts`:
  // Node's ESM loader will not take that module's JSON import without an
  // attribute, and the built page is the stronger subject anyway — it is what
  // a reader sees. The page is rendered through `currentLicences`, so the
  // relation below exercises the filter: a licence appears if and only if its
  // term covers the build date.
  const html = readFileSync('dist/about/index.html', 'utf8');
  // Keyed on the scope sentence, not the licence number: the numbers are in
  // the data and deliberately not rendered, and the scope is unique per
  // licence and is what a reader sees.
  const fingerprint = licence => licence.scope.slice(0, 60).replaceAll('&', '&amp;');
  const shown = credentials.licences.filter(licence => html.includes(fingerprint(licence)));
  assert.ok(shown.length > 0, '/about must publish the current licences');
  assert.ok(
    credentials.licences.every(licence => !html.includes(licence.number)),
    'licence numbers are deliberately not rendered',
  );
  const today = new Date().toISOString().slice(0, 10);
  for (const licence of credentials.licences) {
    const current = licence.issued <= today && today < licence.expires;
    assert.equal(
      html.includes(fingerprint(licence)),
      current,
      `${licence.number} is ${current ? 'current but missing from' : 'lapsed but still on'} /about`,
    );
    if (!current) continue;
    const holder = credentials.entities
      .find(entity => entity.key === licence.entity)
      .name.replaceAll('&', '&amp;');
    const heading = html.indexOf(`>${holder}<`);
    assert.ok(heading !== -1, `${holder} must have its own heading on /about`);
    // The licence has to sit between its holder's heading and the next one,
    // not merely somewhere on the page.
    const nextHeading = html.indexOf('<h3', heading + 1);
    const block = html.slice(heading, nextHeading === -1 ? undefined : nextHeading);
    assert.ok(block.includes(fingerprint(licence)), `${licence.number} must appear under ${holder}`);
  }
});
