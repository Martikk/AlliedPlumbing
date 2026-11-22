import type { ReactNode } from 'react';

/** Audit C-06 — the only section wrapper.
 *
 * Owns vertical rhythm (--section-y), the 1200 px measure, and the optional
 * eyebrow / H2 / intro header. Backgrounds alternate between --surface and
 * --surface-alt only; the old light-blue bands are gone (F-01). */

type Props = {
  /** Small uppercase label above the heading. */
  eyebrow?: string;
  /** Section H2. Omit for a section whose heading lives inside `children`. */
  heading?: ReactNode;
  /** One or two lines under the heading. */
  intro?: ReactNode;
  /** Action rendered to the right of the heading on desktop. */
  action?: ReactNode;
  tone?: 'surface' | 'alt' | 'ink';
  /** `scroll-margin-top` anchor so the sticky header never covers the target. */
  id?: string;
  className?: string;
  /** Headings render as H2 by default; pass 1 for the one H1 on a page. */
  headingLevel?: 1 | 2;
  children: ReactNode;
};

const tones = {
  surface: 'bg-[var(--surface)] text-[var(--body)]',
  alt: 'bg-[var(--surface-alt)] text-[var(--body)]',
  ink: 'bg-[var(--surface-ink)] text-white',
};

export default function Section({
  eyebrow,
  heading,
  intro,
  action,
  tone = 'surface',
  id,
  className = '',
  headingLevel = 2,
  children,
}: Props) {
  const Heading = headingLevel === 1 ? 'h1' : 'h2';
  const headingClass =
    headingLevel === 1
      ? 'text-h1 font-extrabold'
      : 'text-h2 font-extrabold';
  return (
    <section
      id={id}
      className={`scroll-mt-[var(--header-h-tall)] py-[var(--section-y)] ${tones[tone]} ${className}`}
    >
      <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6">
        {(eyebrow || heading || intro || action) && (
          <div className="mb-8 flex flex-col gap-5 md:mb-12 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              {eyebrow && (
                <p className="text-eyebrow font-bold uppercase tracking-[0.18em] text-[var(--muted)]">
                  {eyebrow}
                </p>
              )}
              {heading && (
                <Heading
                  className={`${eyebrow ? 'mt-3' : ''} ${headingClass} ${
                    tone === 'ink' ? 'text-white' : 'text-[var(--ink)]'
                  }`}
                >
                  {heading}
                </Heading>
              )}
              {intro && (
                <p className="mt-4 text-[var(--fs-body)] leading-[var(--lh-body)]">
                  {intro}
                </p>
              )}
            </div>
            {action && <div className="shrink-0">{action}</div>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
