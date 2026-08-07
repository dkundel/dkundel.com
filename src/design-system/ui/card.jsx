import { cn } from '../lib/utils.js';

export function Card({ as: Component = 'div', className = '', ...props }) {
  return (
    <Component
      className={cn('card', className)}
      {...props}
    />
  );
}

export function InteractiveCard({ as: Component = 'a', className = '', ...props }) {
  return (
    <Card
      as={Component}
      className={cn('interactive-card', className)}
      {...props}
    />
  );
}

export function CardBody({ className = '', ...props }) {
  return <div className={cn('card-body', className)} {...props} />;
}
