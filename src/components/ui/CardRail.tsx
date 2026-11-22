import type { ReactNode } from 'react';

/** Audit E-06 — on a phone, a row of cards is a horizontal snap-scroll with
 *  the next card peeking, not a 1,500 px stack. From 768 px it is an ordinary
 *  grid.
 *
 *  G-00 — this is native `overflow-x`, so vertical scrolling always passes
 *  through. There is no wheel listener and nothing calls preventDefault;
 *  horizontal movement happens by swipe, by Shift+wheel, or by keyboard once
 *  a card inside has focus. */

type Props = {
  /** Columns from 768 px up. */
  columns?: 2 | 3;
  'aria-label'?: string;
  children: ReactNode;
};

const GRID = {
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
};

export default function CardRail({ columns = 3, children, ...rest }: Props) {
  return (
    <ul
      {...rest}
      className={
        // Phone: one snap-scrolling row, cards 78% wide so the next one peeks.
        'm-0 flex list-none gap-4 overflow-x-auto scroll-smooth p-0 pb-3 ' +
        '[scroll-snap-type:x_mandatory] [scrollbar-width:thin] ' +
        '[&>li]:min-w-0 [&>li]:flex-[0_0_78%] [&>li]:scroll-ml-4 [&>li]:[scroll-snap-align:start] ' +
        // 768 px and up: a normal grid, no scrolling.
        `md:grid ${GRID[columns]} md:gap-6 md:overflow-visible md:pb-0 md:[&>li]:flex-none`
      }
    >
      {children}
    </ul>
  );
}
