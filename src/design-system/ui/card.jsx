import { cn } from '../lib/utils.js';

export function Card({ as: Component = 'div', className = '', ...props }) {
  return (
    <Component
      className={cn(
        'bg-white dark:bg-slate-800 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 dark:border-[0.5px] dark:border-slate-700 shadow-md rounded-lg overflow-hidden transition-transform',
        className
      )}
      {...props}
    />
  );
}

export function InteractiveCard({ as: Component = 'a', className = '', ...props }) {
  return (
    <Card
      as={Component}
      className={cn(
        'hover:shadow-xl focus:shadow-xl focus-within:shadow-xl hover:scale-[1.02] focus:scale-[1.02] focus-within:scale-[1.02]',
        className
      )}
      {...props}
    />
  );
}

export function CardBody({ className = '', ...props }) {
  return <div className={cn('p-3', className)} {...props} />;
}
