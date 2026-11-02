import { useEffect, useRef, useState } from 'react';
import { Link } from '../lib/navigation';
import { useCarousel } from '../hooks/useCarousel';
import { responsiveImage } from '../lib/images';

type Props = { slides: string[]; intervalMs?: number };
export default function Hero({ slides, intervalMs = 5500 }: Props) {
  const section = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    if (section.current) observer.observe(section.current);
    return () => observer.disconnect();
  }, []);
  const carousel = useCarousel(slides.length, intervalMs, visible);
  const [loaded,setLoaded]=useState<number[]>([0]);
  useEffect(() => { setLoaded(previous => previous.includes(carousel.index) ? previous : [...previous,carousel.index]); }, [carousel.index]);
  return <section ref={section} aria-label="Plumbing, heating and HVAC services" aria-roledescription="carousel" className="relative w-full overflow-hidden bg-neutral-900" onFocusCapture={carousel.pause} onMouseEnter={carousel.pause}>
    <div className="absolute inset-0">
      {slides.map((src, index) => loaded.includes(index) ? <img key={src} src={responsiveImage(src, 1600)} srcSet={`${responsiveImage(src, 640)} 640w, ${responsiveImage(src, 1024)} 1024w, ${responsiveImage(src, 1600)} 1600w`} sizes="100vw" alt="" width={1600} height={1000} loading={index === 0 ? 'eager' : 'lazy'} fetchPriority={index === 0 ? 'high' : 'low'} className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 motion-reduce:transition-none ${index === carousel.index ? 'opacity-100' : 'opacity-0'}`} /> : null)}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/25" />
    </div>
    <div className="relative mx-auto max-w-7xl px-4 md:px-6 pt-28 pb-20 md:pt-36 md:pb-36 min-h-[66vh] flex flex-col justify-center">
      <h1 className="max-w-4xl text-white font-extrabold leading-tight text-4xl md:text-6xl lg:text-7xl">Plumbing, Heating &amp; HVAC<br className="hidden md:block" /> in British Columbia</h1>
      <p className="mt-6 max-w-xl text-lg text-white leading-relaxed">Installation, repairs and preventive maintenance for residential and commercial properties.</p>
      <p className="mt-3 text-white/90">We Build. We Maintain. We Care.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/quote" className="inline-flex min-h-12 items-center rounded-lg bg-red-700 px-5 py-3 font-semibold text-white hover:bg-red-800">Request a Quote</Link>
        <a href="tel:+16047311000" className="inline-flex min-h-12 items-center rounded-lg bg-white px-5 py-3 font-semibold text-neutral-900 hover:bg-neutral-100">Call 604-731-1000</a>
      </div>
    </div>
    {slides.length > 1 && <div className="absolute bottom-12 md:bottom-36 right-4 md:right-6 flex flex-wrap items-center gap-1">
      {slides.map((_, index) => <button key={index} type="button" onClick={() => carousel.select(index)} aria-label={`Show image ${index + 1}`} aria-pressed={carousel.index === index} className="grid h-11 w-9 place-items-center"><span className={`h-2 w-6 rounded-full ${index === carousel.index ? 'bg-white' : 'bg-white/50'}`} /></button>)}
      {!carousel.reducedMotion && <button type="button" onClick={carousel.toggle} aria-label={carousel.paused ? 'Play background slideshow' : 'Pause background slideshow'} className="min-h-11 px-3 rounded-lg bg-black/70 text-sm font-semibold text-white">{carousel.paused ? 'Play' : 'Pause'}</button>}
    </div>}
  </section>;
}
