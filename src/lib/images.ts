/** Cloudinary transformations only; preserve other image URLs. */
export function responsiveImage(src: string, width: number) {
  return src.includes('/image/upload/') ? src.replace(/\/image\/upload\/(?:f_auto,q_auto,c_limit,w_\d+\/)?/, `/image/upload/f_auto,q_auto,c_limit,w_${width}/`) : src;
}
