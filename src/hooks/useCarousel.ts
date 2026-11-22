import { useEffect, useState } from 'react';
import { useReducedMotion } from './useReducedMotion';

export function useCarousel(count: number, interval: number, active = true) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();
  const [foreground, setForeground] = useState(true);
  useEffect(() => {
    const update = () => setForeground(!document.hidden);
    update(); document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);
  useEffect(() => {
    if (!active || !foreground || paused || reducedMotion !== false || count < 2 || interval <= 0) return;
    const timer = window.setInterval(() => setIndex(value => (value + 1) % count), interval);
    return () => window.clearInterval(timer);
  }, [count, interval, paused, reducedMotion, active, foreground]);
  return { index: count ? index % count : 0, paused: paused || reducedMotion !== false, reducedMotion, pause: () => setPaused(true), toggle: () => setPaused(value => !value), select: (value: number) => { setIndex(value); setPaused(true); } };
}
