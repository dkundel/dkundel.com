import { cn } from '../lib/utils.js';

export function PageHeader({ className = '', ...props }) {
  return (
    <header
      className={cn('page-header', className)}
      {...props}
    />
  );
}

export function PageHeadingGroup({ className = '', ...props }) {
  return <hgroup className={cn('page-heading-group', className)} {...props} />;
}

export function PageTitle({ className = '', ...props }) {
  return (
    <h1
      className={cn('page-title', className)}
      {...props}
    />
  );
}

export function PageLead({ className = '', ...props }) {
  return <p className={cn('page-lead', className)} {...props} />;
}

export function PageSubheading({ className = '', ...props }) {
  return <h2 className={cn('page-subheading', className)} {...props} />;
}

export function SubsectionHeading({ className = '', ...props }) {
  return (
    <h2
      className={cn('subsection-heading', className)}
      {...props}
    />
  );
}
