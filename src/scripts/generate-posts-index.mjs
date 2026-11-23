import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

/** Audit B-08 — keep the blog corpus out of pages that only list it.
 *
 *  posts.json carries every article in full: intro, sections, checklists,
 *  reviews. That is 22.6 KB gzipped. The home page, /blog/ and every project
 *  page imported it to render teaser cards, so a visitor who never opens an
 *  article downloaded all eighteen of them anyway — bundlers cannot tree-shake
 *  fields out of a JSON import.
 *
 *  This derives the teaser fields into posts-index.json (~2 KB gzipped). Only
 *  BlogPost.tsx, which actually renders an article, still imports the full
 *  file, and it is a route chunk of its own.
 *
 *  The index is generated and COMMITTED so that dev, typecheck and tests work
 *  without a build step. tests/content.test.mjs regenerates it in memory and
 *  fails if the committed copy has drifted, so posts.json stays the one source
 *  of truth. */

const here = dirname(fileURLToPath(import.meta.url));
const SOURCE = resolve(here, '../data/posts.json');
const TARGET = resolve(here, '../data/posts-index.json');

/** The fields a listing needs. Deliberately minimal: adding one here costs
 *  every visitor who never opens an article, so add only what a card shows. */
export const INDEX_FIELDS = ['slug', 'title', 'category', 'excerpt', 'image', 'date', 'project'];

export function buildIndex(posts) {
  return posts.map(post => {
    const entry = {};
    for (const field of INDEX_FIELDS) if (post[field] !== undefined) entry[field] = post[field];
    return entry;
  });
}

export function readPosts() {
  return JSON.parse(readFileSync(SOURCE, 'utf8'));
}

export function serialise(index) {
  return JSON.stringify(index, null, 2) + '\n';
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const index = buildIndex(readPosts());
  writeFileSync(TARGET, serialise(index));
  console.log(`posts-index.json: ${index.length} posts, ${INDEX_FIELDS.join(', ')}`);
}
