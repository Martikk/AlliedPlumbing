/** Cloudinary transformations only; preserve other image URLs. */
export function responsiveImage(src: string, width: number) {
  return src.includes('/image/upload/') ? src.replace(/\/image\/upload\/(?:[^/]*,[^/]*\/)?/, `/image/upload/f_auto,q_auto:eco,c_limit,w_${width}/`) : src;
}

export function imageCandidates(src: string, widths = [480, 768, 1200]) {
  return src.includes('/image/upload/') ? widths.map(width => `${responsiveImage(src, width)} ${width}w`).join(', ') : undefined;
}
