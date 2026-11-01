import { Link as RouterLink, NavLink as RouterNavLink, type LinkProps, type NavLinkProps, type To } from 'react-router-dom';
import { canonicalPath } from './site-url';
export * from 'react-router-dom';
function normalizeTo(to: To): To {
  if (typeof to !== 'string') return { ...to, pathname: to.pathname?.startsWith('/') ? canonicalPath(to.pathname) : to.pathname };
  if (!to.startsWith('/') || to.startsWith('//')) return to;
  const boundary = to.search(/[?#]/);
  const pathname = boundary < 0 ? to : to.slice(0, boundary);
  return canonicalPath(pathname) + (boundary < 0 ? '' : to.slice(boundary));
}
export function Link({ to, ...props }: LinkProps) { return <RouterLink {...props} to={normalizeTo(to)} />; }
export function NavLink({ to, ...props }: NavLinkProps) { return <RouterNavLink {...props} to={normalizeTo(to)} />; }
