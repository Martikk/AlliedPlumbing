import { useEffect, useRef, type ReactNode } from 'react';

/** Native disclosure semantics, with pointer-only visual state feedback. */
export default function FaqItem({ question, children }: { question: string; children: ReactNode }) {
  const item = useRef<HTMLDetailsElement>(null);
  const answer = useRef<HTMLParagraphElement>(null);
  const animation = useRef<Animation | null>(null);
  useEffect(() => () => animation.current?.cancel(), []);
  return <details ref={item} className="faq-item group p-5 [&_summary::-webkit-details-marker]:hidden"
    onKeyDown={() => { if (item.current) item.current.dataset.motion = 'instant'; animation.current?.cancel(); }}>
    <summary className="flex cursor-pointer items-center justify-between" onClick={event => {
      const details = item.current;
      if (!details) return;
      const pointer = event.detail > 0 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      details.dataset.motion = pointer ? 'pointer' : 'instant';
      animation.current?.cancel();
      // Native click opens the disclosure after this handler. No delayed content or height tween.
      if (pointer && !details.open) requestAnimationFrame(() => {
        if (details.open && answer.current?.animate) animation.current = answer.current.animate([{opacity:0},{opacity:1}], {duration:160,easing:'cubic-bezier(0.23, 1, 0.32, 1)'});
      });
    }}><span className="font-medium">{question}</span><span aria-hidden="true" className="faq-plus ml-4 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-neutral-100 text-neutral-700">+</span></summary>
    <p ref={answer} className="mt-3 text-neutral-600">{children}</p>
  </details>;
}
