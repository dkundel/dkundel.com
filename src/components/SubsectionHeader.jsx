import React from 'react';
import { cn } from '../utils/cn';

const SubsectionHeader = React.forwardRef(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      'text-sm mb-2 mt-8 tracking-widest font-bold uppercase text-gray-600 dark:text-gray-300',
      className
    )}
    {...props}
  />
));

SubsectionHeader.displayName = 'SubsectionHeader';

export default SubsectionHeader;
