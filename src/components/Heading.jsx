import React from 'react';
import { cn } from '../utils/cn';

const Heading = React.forwardRef(({ className, ...props }, ref) => (
  <hgroup
    ref={ref}
    className={cn('min-w-[7rem] flex-1 text-sm', className)}
    {...props}
  />
));
Heading.displayName = 'Heading';

Heading.h1 = React.forwardRef(({ className, ...props }, ref) => (
  <h1
    ref={ref}
    className={cn(
      'text-6xl large-headings font-black mb-2 text-highlight-gradient leading-[1.4em]',
      className
    )}
    {...props}
  />
));
Heading.h1.displayName = 'Heading.h1';

Heading.p = React.forwardRef(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('mb-2 text-base', className)} {...props} />
));
Heading.p.displayName = 'Heading.p';

export default Heading;
