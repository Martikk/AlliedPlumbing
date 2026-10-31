import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

export function useCarousel(count: number, interval: number) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    if (paused || reducedMotion !== false || count < 2 || interval <= 0) return;
    const timer = window.setInterval(() => setIndex(value => (value + 1) % count), interval);
    return () => window.clearInterval(timer);
  }, [count, interval, paused, reducedMotion]);
  return { index: count ? index % count : 0, paused: paused || reducedMotion !== false, reducedMotion, pause: () => setPaused(true), toggle: () => setPaused(value => !value), select: (value: number) => { setIndex(value); setPaused(true); } };
}
