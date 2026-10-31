import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const projects = JSON.parse(readFileSync('src/data/projects.json','utf8'));
const seo = JSON.parse(readFileSync('src/data/seo.json','utf8'));

test('all documented case studies have a unique route and matching search title', () => {
  assert.equal(projects.length, 14);
  assert.equal(new Set(projects.map(project=>project.id)).size, 14);
  for (const project of projects) {
    assert.ok(project.scope.length >= 3);
    assert.ok(seo['/projects/'+project.id].title.startsWith(project.title));
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
  assert.equal(posts.length, 6);
  assert.ok(seo['/blog']);
  for (const post of posts) {
    assert.ok(seo['/blog/'+post.slug]);
    assert.ok(projects.some(project=>project.id===post.project));
    const words=[post.intro,...post.sections.flatMap(section=>section.paragraphs)].join(' ').split(/\s+/).length;
    assert.ok(words>=350, post.slug+' needs a complete article');
  }
});

test('new projects preserve unconfirmed completion and separate Herbert Spencer phases', () => {
  for (const id of ['icbc','crosstown','glenayre','collingwood','capilano-birch','herbert-spencer-ashp','hillcrest']) {
    const project=projects.find(item=>item.id===id);
    assert.equal(project.status, 'Completion to be confirmed');
    assert.equal(project.year, undefined);
  }
  assert.equal(projects.find(item=>item.id==='herbert-spencer').year, 2021);
});
