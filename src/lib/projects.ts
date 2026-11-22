import data from '../data/projects.json';

/** JSON cannot express the optional shapes the case-study template needs
 *  (audit I-04): `quote` starts as null and `gallery` as an empty array, so
 *  TypeScript infers `null` and `never[]`. This is the one place that widens
 *  them, so no component has to carry a cast. */
export type GalleryPhoto = { src: string; alt: string };
export type ProjectQuote = { text: string; name: string; title: string };

export type Project = Omit<(typeof data)[number], 'gallery' | 'quote'> & {
  gallery: GalleryPhoto[];
  quote: ProjectQuote | null;
  relatedProject?: string;
  outcomeLine?: string;
};

export const projects = data as unknown as Project[];
export const featuredProjects = projects.filter(project => project.featured);
export function findProject(id: string | undefined) {
  return projects.find(project => project.id === id);
}
