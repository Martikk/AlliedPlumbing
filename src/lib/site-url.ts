import policy from './site-policy.json';
export function canonicalPath(path: string) {
  return path === '/' ? '/' : path.replace(/\/+$/, '') + '/';
}
export function canonicalURL(path: string) { return policy.origin + canonicalPath(path); }
