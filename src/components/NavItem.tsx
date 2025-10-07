import { NavLink } from 'react-router-dom';
import cn from 'classnames';

type Props = {
  to: string;
  end?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
};

export default function NavItem({ to, end, disabled, children }: Props) {
  return (
    <NavLink
      to={disabled ? '#' : to}
      end={end}
      aria-disabled={disabled || undefined}
      className={({ isActive, isPending }) =>
        cn(
          'relative inline-flex items-center min-h-11 px-3 py-2 rounded-md text-sm md:text-base',
          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-500 focus-visible:outline-offset-2',
          disabled ? 'pointer-events-none opacity-50' : 'hover:bg-neutral-100/70',
          isPending && 'opacity-70',
          isActive ? 'font-semibold' : 'text-neutral-800 hover:text-neutral-900',
          // маркер снизу
          'after:absolute after:left-2 after:right-2 after:-bottom-1 after:h-0.5 after:rounded-full',
          isActive ? 'after:bg-red-600' : 'after:bg-transparent hover:after:bg-neutral-300'
        )
      }
    >
      {children}
    </NavLink>
  );
}