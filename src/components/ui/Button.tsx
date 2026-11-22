import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { Link } from '../../lib/navigation';

/** Audit C-02 — the only button in the codebase.
 *
 * primary   the one conversion action on a screen ("Get a quote")
 * secondary phone / call, and any second action next to a primary
 * tertiary  "View service", "See our projects" — a text link with an arrow
 *
 * Max one `primary` per viewport section. Labels come from C-03; do not invent
 * new ones. Arrow glyphs are only for links that leave the site. */

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
export type ButtonSize = 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 font-semibold rounded-[var(--radius)] ' +
  'transition-[transform,background-color,box-shadow,color] duration-fast ease-out ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)] ' +
  'disabled:opacity-60 disabled:pointer-events-none motion-reduce:transform-none';

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--brand)] text-white shadow-sm hover:bg-[var(--brand-hover)] ' +
    'hover:-translate-y-px hover:shadow-md active:translate-y-0 active:scale-[.98]',
  secondary:
    'bg-white text-[var(--ink)] border border-[var(--line)] hover:border-[var(--ink)] ' +
    'hover:-translate-y-px active:translate-y-0',
  tertiary:
    'text-[var(--ink)] underline-offset-4 hover:underline hover:text-[var(--brand-ink)] px-0',
};

const sizes: Record<ButtonSize, string> = {
  md: 'min-h-12 px-5',
  lg: 'min-h-14 px-6 text-lg',
};

/** Tertiary keeps a 44 px hit area without looking like a box (E-05). */
const tertiarySize = 'min-h-11';

type Common = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconAfter?: ReactNode;
  className?: string;
  children: ReactNode;
};

type AsLink = Common & { href: string } & Omit<
    ComponentPropsWithoutRef<'a'>,
    'href' | 'className' | 'children'
  >;
type AsButton = Common & { href?: undefined } & Omit<
    ComponentPropsWithoutRef<'button'>,
    'className' | 'children'
  >;

export type ButtonProps = AsLink | AsButton;

function classes(variant: ButtonVariant, size: ButtonSize, extra: string) {
  const sizing = variant === 'tertiary' ? tertiarySize : sizes[size];
  return [base, variants[variant], sizing, extra].filter(Boolean).join(' ');
}

/** tel:, mailto: and absolute URLs bypass the router. */
function isExternal(href: string) {
  return !href.startsWith('/') || href.startsWith('//');
}

export default function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    icon,
    iconAfter,
    className = '',
    children,
  } = props;
  const cls = classes(variant, size, className);
  const inner = (
    <>
      {icon}
      <span>{children}</span>
      {iconAfter}
    </>
  );

  if (props.href !== undefined) {
    const { href, variant: _v, size: _s, icon: _i, iconAfter: _a, className: _c, children: _ch, ...rest } = props;
    void _v, _s, _i, _a, _c, _ch;
    if (isExternal(href)) {
      return (
        <a href={href} className={cls} {...rest}>
          {inner}
        </a>
      );
    }
    return (
      <Link to={href} className={cls} {...rest}>
        {inner}
      </Link>
    );
  }

  const { variant: _v, size: _s, icon: _i, iconAfter: _a, className: _c, children: _ch, type, ...rest } = props;
  void _v, _s, _i, _a, _c, _ch;
  return (
    <button type={type ?? 'button'} className={cls} {...rest}>
      {inner}
    </button>
  );
}

/** Arrow used by tertiary links. Decorative — the label carries the meaning. */
export function ArrowRight() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="h-4 w-4 shrink-0 transition-transform duration-fast ease-out group-hover:translate-x-0.5 motion-reduce:transform-none"
    >
      <path d="M4 10h11M11 5.5 15.5 10 11 14.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Handset glyph for the "Call 604-731-1000" secondary button. */
export function PhoneIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0">
      <path d="M6.6 3.3a1.2 1.2 0 0 0-1.6-.3l-1.2.8a2.3 2.3 0 0 0-.9 2.4c.5 2.3 1.8 4.6 3.7 6.5s4.2 3.2 6.5 3.7a2.3 2.3 0 0 0 2.4-.9l.8-1.2a1.2 1.2 0 0 0-.3-1.6l-2-1.4a1.2 1.2 0 0 0-1.5.1l-.8.7a.6.6 0 0 1-.7.1 9.9 9.9 0 0 1-3.9-3.9.6.6 0 0 1 .1-.7l.7-.8a1.2 1.2 0 0 0 .1-1.5Z" />
    </svg>
  );
}
