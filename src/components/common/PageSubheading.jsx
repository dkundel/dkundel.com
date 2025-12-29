import React from 'react';
import { cn } from '../../utils/cn';

const PageSubheading = {};
PageSubheading.h2 = React.forwardRef(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn('text-2xl mb-5 font-bold dark:text-gray-300', className)}
    {...props}
  />
));

PageSubheading.h2.displayName = 'PageSubheading.h2';

export default PageSubheading;
