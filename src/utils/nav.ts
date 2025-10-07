import cn from 'classnames';

export function navClasses(isActive: boolean, isPending?: boolean) {
  return cn(
    'inline-flex items-center min-h-11 px-3 py-2 rounded-md text-sm md:text-base',
    'hover:bg-neutral-100/70',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-500 focus-visible:outline-offset-2',
    isPending && 'opacity-70',
    isActive
      ? 'font-semibold underline underline-offset-4 decoration-2'
      : 'text-neutral-800 hover:text-neutral-900 underline-offset-4 hover:underline'
  );
}