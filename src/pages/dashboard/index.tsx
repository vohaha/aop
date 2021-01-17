import React from 'react';
import cn from 'classnames';
import { Link, RouteComponentProps } from '@reach/router';

export interface DashboardPageProps {}

export function DashboardPage({
  children,
  className,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  RouteComponentProps &
  DashboardPageProps) {
  return (
    <div className={cn('dashboard-page', className)}>
      Dashboard page. Please, take a look{' '}
      <Link to="/aop/practical">Practical & More</Link> page.
    </div>
  );
}
