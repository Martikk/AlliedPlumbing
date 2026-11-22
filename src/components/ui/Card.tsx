import type { ReactNode } from 'react';
import { Link } from '../../lib/navigation';
import { cld, srcSet } from '../../lib/images';

/** Audit C-06 + F-04 — the only card.
 *
 * The whole card is one link (stretched-link pattern), so a card is one tab
 * stop with the title as its accessible name. No separate arrow link, no
 * nested interactive elements. The image is always 4:3 and always decorative
 * (`alt=""`), because the title beside it already names the destination. */

type Variant = 'service' | 'project' | 'article';

type Props = {
  to: string;
  title: string;
  /** Small label above the title — service number, client, sector, date. */
  eyebrow?: ReactNode;
  summary?: ReactNode;
  /** One outcome line: a number or a constraint met (D-05). */
  metric?: ReactNode;
  image?: string;
  /** Real layout width, for the `sizes` attribute (B-03). */
  sizes?: string;
  variant?: Variant;
  /** Hides the summary below 640 px. For a two-up grid of small cards, where
   *  the summary wraps to eight lines in a 175 px column and the title
   *  already says where the card goes (E-06: "image 4:3, title, one line"). */
  compact?: boolean;
  className?: string;
};

export default function Card({
  to,
  title,
  eyebrow,
  summary,
  metric,
  image,
  sizes = '(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw',
  variant = 'service',
  compact = false,
  className = '',
}: Props) {
  return (
    <article
      className={`card group relative flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--line)] bg-[var(--surface)] shadow-sm transition-shadow duration-base ease-out hover:shadow-md ${className}`}
    >
      {image && (
        <div className="aspect-[4/3] overflow-hidden bg-[var(--surface-alt)]">
          <img
            src={cld(image, 960, { ar: '4:3' })}
            srcSet={srcSet(image, 1280, { ar: '4:3' })}
            sizes={sizes}
            alt=""
            width={960}
            height={720}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-slow ease-out motion-safe:group-hover:scale-[1.03] motion-reduce:transform-none"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        {eyebrow && (
          <p className="text-eyebrow font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
            {eyebrow}
          </p>
        )}
        <h3 className={`${eyebrow ? 'mt-2' : ''} text-h3 font-bold text-[var(--ink)]`}>
          <Link to={to} className="card-link">
            {title}
          </Link>
        </h3>
        {summary && (
          <p
            className={`mt-2 text-sm leading-[var(--lh-body)] text-[var(--body)] ${
              compact ? 'hidden sm:block' : ''
            }`}
          >
            {summary}
          </p>
        )}
        {metric && (
          <p className="mt-4 border-t border-[var(--line)] pt-4 text-sm font-semibold text-[var(--ink)]">
            {metric}
          </p>
        )}
        {variant === 'article' && <span className="flex-1" />}
      </div>
    </article>
  );
}
