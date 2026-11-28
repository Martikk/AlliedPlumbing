/// <reference types="node" />
import { PassThrough } from 'node:stream';
import { renderToPipeableStream, renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { AppContent } from './App';

/** Re-exported so generate-sitemap.mjs builds the LCP preloads from the same
 *  data and the same Cloudinary helper the pages use (B-02). */
export { preloadTags } from './lib/lcp-preload';

/** Re-exported for the same reason: the organisation JSON-LD is built from
 *  `src/config.ts` at build time instead of being kept by hand in
 *  `index.html`, where it silently went stale. */
export { organizationTag } from './lib/schema';

/** Wait for lazy route chunks before writing crawlable static HTML. No server runtime is required after build. */
export function render(path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const output = new PassThrough();
    const node = <StaticRouter location={path}><AppContent /></StaticRouter>;
    let failure: unknown;
    const timer = setTimeout(() => { stream.abort(); reject(new Error(`Prerender timeout: ${path}`)); }, 30000);
    output.resume();
    output.on('error', error => { clearTimeout(timer); reject(error); });
    output.on('end', () => { clearTimeout(timer); if (failure) reject(failure); else { try { resolve(renderToString(node)); } catch (error) { reject(error); } } });
    const stream = renderToPipeableStream(node, {
      onAllReady() { stream.pipe(output); },
      onShellError(error) { clearTimeout(timer); reject(error); },
      onError(error) { failure = error; },
    });
  });
}
