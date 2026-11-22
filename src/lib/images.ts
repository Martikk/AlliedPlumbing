/** Audit B-03 — the only place Cloudinary URLs are built.
 *
 *  Hand-written Cloudinary URLs in components are banned: they are how the
 *  site ended up serving a 1032 px square stretched to 1614 px and photography
 *  through `q_auto:eco`. Everything goes through `cld()` or the helpers below.
 *
 *  Rules enforced here:
 *   - `q_auto` for photographs; `q_auto:eco` only under 400 px (thumbnails).
 *   - one width ladder: 320 / 480 / 640 / 960 / 1280 / 1920. No other widths.
 *   - `c_fill,g_auto` with an explicit aspect ratio for art-directed crops,
 *     `c_limit` when the source ratio should be kept. */

export const WIDTHS = [320, 480, 640, 960, 1280, 1920] as const;

export type AspectRatio = '16:9' | '4:3' | '4:5' | '1:1';

type Options = {
  /** Crop to this ratio with smart gravity. Omit to keep the source ratio. */
  ar?: AspectRatio;
  /** Force a quality level. Defaults to the width rule above. */
  quality?: 'auto' | 'auto:eco';
};

const UPLOAD = '/image/upload/';

/** True for any Cloudinary delivery URL we are allowed to transform. */
function isCloudinary(src: string) {
  return src.includes(UPLOAD);
}

/** Strips any transformation segment already in the URL so callers cannot
 *  accidentally stack `q_auto:eco` on top of `q_auto`. */
function stripTransforms(src: string) {
  return src.replace(/\/image\/upload\/(?:[^/]*[,_][^/]*\/)*/, UPLOAD);
}

export function cld(src: string, width: number, options: Options = {}) {
  if (!isCloudinary(src)) return src;
  const quality = options.quality ?? (width < 400 ? 'q_auto:eco' : 'q_auto');
  const crop = options.ar ? `c_fill,g_auto,ar_${options.ar.replace(':', ':')}` : 'c_limit';
  return stripTransforms(src).replace(UPLOAD, `${UPLOAD}f_auto,${quality},${crop},w_${width}/`);
}

/** A `srcSet` across the width ladder, capped at `max`. */
export function srcSet(src: string, max = 1920, options: Options = {}) {
  if (!isCloudinary(src)) return undefined;
  return WIDTHS.filter(width => width <= max)
    .map(width => `${cld(src, width, options)} ${width}w`)
    .join(', ');
}

/* ---- backwards-compatible helpers used across existing pages ------------ */

/** @deprecated Use `cld`. Kept so existing call sites keep working. */
export function responsiveImage(src: string, width: number) {
  return cld(src, width);
}

/** @deprecated Use `srcSet`. */
export function imageCandidates(src: string, widths: readonly number[] = [480, 960, 1280]) {
  if (!isCloudinary(src)) return undefined;
  return widths.map(width => `${cld(src, width)} ${width}w`).join(', ');
}
