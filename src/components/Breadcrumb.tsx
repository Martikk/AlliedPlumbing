import { Link } from '../lib/navigation';
import JsonLd from './JsonLd';
import { breadcrumbSchema } from '../lib/schema';

/** Audit A-05 §4 — a visible breadcrumb and the matching BreadcrumbList.
 *  The last item is the current page: text, not a link. */
export default function Breadcrumb({ trail }: { trail: { name: string; path: string }[] }) {
  if (!trail.length) return null;
  const items = [{ name: 'Home', path: '/' }, ...trail];
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />
      <nav aria-label="Breadcrumb" className="mx-auto w-full max-w-[1200px] px-4 pt-6 md:px-6">
        <ol className="flex flex-wrap items-center gap-x-2 text-sm text-[var(--muted)]">
          {items.map((item, index) => {
            const last = index === items.length - 1;
            return (
              <li key={item.path} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className="font-semibold text-[var(--ink)]">
                    {item.name}
                  </span>
                ) : (
                  <Link to={item.path} className="inline-flex min-h-11 items-center hover:underline">
                    {item.name}
                  </Link>
                )}
                {!last && <span aria-hidden>/</span>}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
