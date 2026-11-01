import { useEffect, type RefObject } from 'react';

/** Status text is rendered/announced immediately; this only adds visual feedback. */
export function useFeedbackMotion(ref: RefObject<HTMLElement | null>, message: string) {
  useEffect(() => {
    const element = ref.current;
    if (!element || !message || !element.animate) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const animation = element.animate([
      { opacity: 0, transform: reduced ? 'none' : 'translateY(6px)' },
      { opacity: 1, transform: reduced ? 'none' : 'translateY(0)' },
    ], { duration: reduced ? 100 : 180, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' });
    return () => animation.cancel();
  }, [ref, message]);
}
