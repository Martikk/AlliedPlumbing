import data from '../data/projects.json';

/** JSON cannot express the optional shapes the case-study template needs
 *  (audit I-04): `quote` starts as null and `gallery` as an empty array, so
 *  TypeScript infers `null` and `never[]`. This is the one place that widens
 *  them, so no component has to carry a cast. */
export type GalleryPhoto = { src: string; alt: string };
export type ProjectQuote = { text: string; name: string; title: string };

/** A problem the project actually hit, and what was done about it. Older
 *  entries carry an empty array, which JSON widens to `never[]` — hence the
 *  explicit type here, like `gallery` and `quote` above it. */
export type ProjectChallenge = { title: string; text: string };

export type Project = Omit<(typeof data)[number], 'gallery' | 'quote' | 'challenges'> & {
  gallery: GalleryPhoto[];
  quote: ProjectQuote | null;
  challenges: ProjectChallenge[];
  relatedProject?: string;
  outcomeLine?: string;
  /** Who ran it. This used to be written into `delivery`, where the template
   *  printed "Project management: Alex Martishyn, Project Manager." as the
   *  closing paragraph of a coordination section — a credit standing in for
   *  prose. It belongs beside client and location, which is where it is now. */
  projectManager?: string;
};

export const projects = data as unknown as Project[];
export const featuredProjects = projects.filter(project => project.featured);
export function findProject(id: string | undefined) {
  return projects.find(project => project.id === id);
}

/** What to put under "More from our projects".
 *
 *  The template used to take `projects.filter(other => other.id !== id)` and
 *  slice two off the front, so seventeen of the nineteen case studies
 *  recommended the same two pages — whichever happened to be first in the
 *  JSON. A reader finishing a Burnaby boiler replacement was pointed at a
 *  downtown school chiller, and every page's internal links drained into one
 *  pair.
 *
 *  Preference order: an editorial pairing (`relatedProject`, which exists in
 *  the data and was never read by anything), then the same client, then the
 *  same service, then the same category. The last resort walks the list from
 *  this project's own position rather than from the top, so pages that share
 *  nothing still spread their links instead of piling onto the first entry. */
export function relatedProjects(project: Project, limit = 2): Project[] {
  const picked: Project[] = [];
  const add = (candidate: Project | undefined) => {
    if (!candidate || candidate.id === project.id) return;
    if (picked.length >= limit) return;
    if (picked.some(already => already.id === candidate.id)) return;
    picked.push(candidate);
  };

  add(projects.find(other => other.id === project.relatedProject));
  for (const other of projects) if (other.client === project.client) add(other);
  for (const other of projects) if (other.relatedService === project.relatedService) add(other);
  for (const other of projects) if (other.category === project.category) add(other);

  const start = projects.findIndex(other => other.id === project.id);
  for (let step = 1; step <= projects.length; step += 1) {
    add(projects[(start + step) % projects.length]);
  }
  return picked;
}
