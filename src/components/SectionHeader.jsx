import React from 'react';
import { cn } from '../utils/cn';

const SectionHeader = React.forwardRef(({ className, ...props }, ref) => (
  <header
    ref={ref}
    className={cn(
      'flex justify-between items-start flex-wrap flex-row-reverse content-end mb-4',
      className
    )}
    {...props}
  />
));

SectionHeader.displayName = 'SectionHeader';

export default SectionHeader;
