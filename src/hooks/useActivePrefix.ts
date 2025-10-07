import { useLocation } from 'react-router-dom';
export function useActivePrefix(prefix: string) {
  const { pathname } = useLocation();
  return pathname === prefix || pathname.startsWith(prefix + '/');
}