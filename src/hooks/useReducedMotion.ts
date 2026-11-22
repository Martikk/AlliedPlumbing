import { useEffect, useState } from 'react';

/** Does this visitor ask for reduced motion?
 *
 *  Returns `null` until mounted, so a component can tell "not known yet" from
 *  "no". That matters during hydration: the server cannot know the preference,
 *  so anything that would animate must wait rather than guess, or the markup
 *  disagrees with the first client render.
 *
 *  This replaces framer-motion's hook of the same name. It was the only thing
 *  three of the four framer-motion imports in this codebase were for. */
export function useReducedMotion(): boolean | null {
  const [reduced, setReduced] = useState<boolean | null>(null);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return reduced;
}
