import data from '../data/posts.json';

/** Article helpers. Only `BlogPost` imports this, because it is the only page
 *  that already pulls the full corpus — the teaser pages read the generated
 *  `posts-index.json` instead, and must keep doing so. */

export type Post = (typeof data)[number];
export const posts = data as Post[];

/** Words a reader actually reads: the intro, every section paragraph and the
 *  planning checklist.
 *
 *  `readingMinutes` used to be a hand-typed number in `posts.json`, and three
 *  of the four newest articles claimed four minutes for a body that reads in
 *  two. A number typed beside prose is wrong the moment the prose is edited,
 *  and nobody goes back to fix it. 225 words per minute is the usual figure
 *  for ordinary non-fiction. */
export function readingMinutes(post: Post): number {
  const text = [post.intro, ...post.sections.flatMap(section => section.paragraphs), ...post.checklist].join(' ');
  return Math.max(1, Math.round((text.match(/\S+/g)?.length ?? 0) / 225));
}

/** Other articles worth reading after this one.
 *
 *  Articles linked out to a project, a service and two project pages, and
 *  never to each other — twenty-two pages with no path between them except
 *  the blog index, so no topic cluster could form. Seven projects are written
 *  about more than once, which is the strongest signal available: those pieces
 *  belong together.
 *
 *  Order: same project, then same service, then same category, then a walk
 *  from this article's own position so that a piece sharing nothing still
 *  points somewhere other than the top of the file. */
export function relatedArticles(post: Post, limit = 3): Post[] {
  const picked: Post[] = [];
  const add = (candidate: Post | undefined) => {
    if (!candidate || candidate.slug === post.slug) return;
    if (picked.length >= limit) return;
    if (picked.some(already => already.slug === candidate.slug)) return;
    picked.push(candidate);
  };

  for (const other of posts) if (other.project === post.project) add(other);
  for (const other of posts) if (other.relatedService === post.relatedService) add(other);
  for (const other of posts) if (other.category === post.category) add(other);

  const start = posts.findIndex(other => other.slug === post.slug);
  for (let step = 1; step <= posts.length; step += 1) add(posts[(start + step) % posts.length]);
  return picked;
}
