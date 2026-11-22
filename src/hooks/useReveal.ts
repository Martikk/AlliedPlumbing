import { useEffect, useRef } from 'react';

/** Audit G-02 — section reveal.
 *
 * opacity 0→1 plus translateY(16px→0), --dur-slow, --ease-out, once at 15%
 * visibility. Children stagger by 60 ms, capped at 5.
 *
 * The hidden state lives in CSS under `.js`, so prerendered HTML and
 * no-JS visitors see the content immediately. Reduced motion skips the whole
 * mechanism rather than running a 0.01 ms transition. */

const STAGGER_MS = 60;
const MAX_STAGGERED = 5;

export function useReveal<T extends HTMLElement>(options: { stagger?: boolean } = {}) {
  const ref = useRef<T>(null);
  const { stagger = false } = options;

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.querySelectorAll('[data-reveal]').forEach(node =>
        node.setAttribute('data-revealed', 'true'),
      );
      root.setAttribute('data-revealed', 'true');
      return;
    }

    const targets: Element[] = root.hasAttribute('data-reveal')
      ? [root]
      : Array.from(root.querySelectorAll('[data-reveal]'));
    if (!targets.length) return;

    if (stagger) {
      targets.forEach((node, index) => {
        if (index < MAX_STAGGERED)
          (node as HTMLElement).style.setProperty('--reveal-delay', `${index * STAGGER_MS}ms`);
      });
    }

    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute('data-revealed', 'true');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 },
    );
    targets.forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, [stagger]);

  return ref;
}
