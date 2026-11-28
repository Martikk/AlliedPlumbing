import { responsiveImage, imageCandidates } from '../lib/images';
import { Link } from "../lib/navigation";

type Props = {
  className?: string;
};

/** The band that overlaps the homepage hero — the first content under the H1,
 *  and the first four `<h2>`s a crawler reads on the site's most important
 *  page. They said "Smart methods", "Experienced team", "Modern equipment"
 *  and "Proven delivery": four labels that match no search and tell a reader
 *  nothing. They now name what actually happens on a project, and each card
 *  carries a visible link to the page that describes it.
 *
 *  They are also `<h3>` now, under one real `<h2>` for the band. Four
 *  top-level headings for four decorative cards flattened the outline of the
 *  whole page.
 *
 *  The old cards hid their only link behind `sr-only focus:not-sr-only`, so
 *  all four scaled on hover and none of them could be clicked — and the page
 *  carried four invisible duplicate links to `/projects`. */
export default function FeatureRibbon({ className = "" }: Props) {
  const items = [
    {
      title: "We survey before we sequence",
      text: "Existing equipment, access, shutdown windows and what the building cannot do without are established before an installation sequence is written.",
      to: "/services",
      cta: "See the six service lines",
      src: "https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_1200/v1760068455/Allied/Screenshot_2025-10-09_at_8.53.56_PM_hjz9a5.png",
    },
    {
      title: "One schedule, every trade",
      text: "Electrical, sheet metal, structural, roofing, insulation and controls are coordinated against one mechanical programme rather than left to the owner to reconcile.",
      to: "/rfp",
      cta: "What a tender package needs",
      src: "https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_1200/v1760068155/Allied/10_kubptf.png",
    },
    {
      title: "The building stays open",
      text: "Schools keep teaching and residents stay at home, so work is phased, shutdowns are taken at night or on weekends, and temporary heat or water covers the gap.",
      to: "/blog/working-in-occupied-schools-and-buildings",
      cta: "How that is planned",
      src: "https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_1200/v1760068155/Allied/11_r4dgo3.png",
    },
    {
      title: "Proved before we leave",
      text: "Startup, balancing, commissioning records, as-built drawings and O&M manuals, with a demonstration for the people who will operate the system.",
      to: "/projects",
      cta: "Read the project scopes",
      src: "https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_1200/v1760068156/Allied/14_urnogx.png",
    },
  ];

  return (
    <section aria-labelledby="approach-heading"
      className={
        "relative z-20 max-w-6xl mx-auto px-4 md:px-6 " + className
      }
    >
      <h2 id="approach-heading" className="sr-only">How we work</h2>
      <div className="grid gap-4 md:grid-cols-4">
        {items.map((it) => (
          <article
            key={it.title}
            className="
              group rounded-2xl overflow-hidden border bg-white/95 backdrop-blur
              shadow-sm
              transition-transform transition-shadow duration-300 ease-out
              motion-safe:hover:scale-[1.03] hover:shadow-xl
              motion-reduce:transform-none motion-reduce:transition-none
              focus-within:ring-2 focus-within:ring-red-500
            "
          >
            <div className="aspect-[16/9] overflow-hidden">
              <img
                src={responsiveImage(it.src, 768)} srcSet={imageCandidates(it.src)} sizes="(min-width: 1024px) 280px, (min-width: 768px) 45vw, 100vw" width={1200} height={675}
                alt=""
                className="
                  h-full w-full object-cover
                  transition-transform duration-500 ease-out
                  motion-safe:group-hover:scale-105
                  motion-reduce:transform-none
                "
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="p-4">
              <h3 className="font-semibold">{it.title}</h3>
              <p className="mt-1 text-sm text-neutral-600">{it.text}</p>
              <Link
                to={it.to}
                className="mt-3 inline-block text-sm font-semibold text-[#315cb4] underline underline-offset-4"
              >
                {it.cta}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
