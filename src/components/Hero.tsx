import type { ReactNode } from 'react';
import Button, { PhoneIcon } from './ui/Button';
import { PHONE, PHONE_HREF } from '../config';
import { cld, srcSet, type AspectRatio } from '../lib/images';
import { trackEvent } from '../lib/analytics';

/** Audit B-02 / E-04 / F-07 — one static hero image.
 *
 * The slideshow is gone: it cost four full-size downloads, autoplayed on
 * mobile, and the LCP candidate was a 1032 px square stretched to 1614 px.
 * Now one art-directed photo — 4:5 under 768 px, 16:9 above — preloaded with
 * `fetchpriority="high"`, never lazy, with explicit width/height so CLS
 * stays at 0.
 *
 * PENDING D-01: `image` is still an AI render. Swap the public ID for a real
 * landscape photo (minimum 2400×1350) and nothing else here changes. */

type Props = {
  eyebrow?: string;
  heading: ReactNode;
  subhead?: ReactNode;
  image: string;
  /** Describes the work in the photo (A-07). Never a keyword list. */
  alt: string;
  /** Replaces the default "Get a quote" + "Call 24/7" pair when needed. */
  actions?: ReactNode;
  compact?: boolean;
};

const MOBILE: AspectRatio = '4:5';
const DESKTOP: AspectRatio = '16:9';

export default function Hero({
  eyebrow,
  heading,
  subhead,
  image,
  alt,
  actions,
  compact = false,
}: Props) {
  const desktop = { ar: DESKTOP } as const;
  const mobile = { ar: MOBILE } as const;
  return (
    <section className="scrim scrim-left relative isolate overflow-hidden bg-[var(--surface-ink)]">
      {/* React hoists this into <head>; it is the same candidate set the
          <picture> below resolves to, so the browser starts the LCP fetch
          before the component tree exists. */}
      <link
        rel="preload"
        as="image"
        fetchPriority="high"
        imageSrcSet={srcSet(image, 1920, desktop)}
        imageSizes="100vw"
      />
      <div className="absolute inset-0 -z-10">
        <picture>
          <source
            media="(max-width: 767px)"
            srcSet={srcSet(image, 960, mobile)}
            sizes="100vw"
          />
          <img
            src={cld(image, 1920, desktop)}
            srcSet={srcSet(image, 1920, desktop)}
            sizes="100vw"
            width={1920}
            height={1080}
            alt={alt}
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </picture>
      </div>

      <div
        className={`on-dark relative mx-auto flex w-full max-w-[1200px] flex-col justify-center px-4 md:px-6 ${
          compact ? 'min-h-[38vh] py-14 md:py-20' : 'min-h-[60vh] py-20 md:py-28'
        }`}
      >
        {eyebrow && (
          <p className="text-eyebrow font-bold uppercase tracking-[0.18em] text-white/85">
            {eyebrow}
          </p>
        )}
        <h1
          className={`${eyebrow ? 'mt-4' : ''} max-w-4xl text-h1 font-extrabold text-white`}
        >
          {heading}
        </h1>
        {subhead && (
          <p className="mt-5 max-w-2xl text-lg leading-[var(--lh-body)] text-white">
            {subhead}
          </p>
        )}
        <div data-cta-anchor className="mt-8 flex flex-wrap gap-3">
          {actions ?? (
            <>
              <Button
                href="/quote"
                className="on-dark"
                onClick={() => trackEvent('click_quote', { location: 'hero' })}
              >
                Get a quote
              </Button>
              <Button
                href={PHONE_HREF}
                variant="secondary"
                icon={<PhoneIcon />}
                className="on-dark"
                data-cta-location="hero"
              >
                Call {PHONE} (24/7)
              </Button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
