import { cn } from '../lib/utils.js';

export function PageHeader({ className = '', ...props }) {
  return (
    <header
      className={cn('flex justify-between items-start flex-wrap flex-row-reverse content-end mb-4', className)}
      {...props}
    />
  );
}

export function PageHeadingGroup({ className = '', ...props }) {
  return <hgroup className={cn('min-w-[7rem] flex-1 text-sm', className)} {...props} />;
}

export function PageTitle({ className = '', ...props }) {
  return (
    <h1
      className={cn('text-6xl large-headings font-black mb-2 text-highlight-gradient leading-[1.4em]', className)}
      {...props}
    />
  );
}

export function PageLead({ className = '', ...props }) {
  return <p className={cn('mb-2 text-base', className)} {...props} />;
}

export function PageSubheading({ className = '', ...props }) {
  return <h2 className={cn('text-2xl mb-5 font-bold dark:text-gray-300', className)} {...props} />;
}

export function SubsectionHeading({ className = '', ...props }) {
  return (
    <h2
      className={cn('text-sm mb-2 mt-8 tracking-widest font-bold uppercase text-gray-600 dark:text-gray-300', className)}
      {...props}
    />
  );
}
