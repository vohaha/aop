import React from 'react';
import cn from 'classnames';
import { Link, RouteComponentProps, Router } from '@reach/router';
import './index.css';
import { Practical } from '../../pages/practical';
import { DashboardPage } from '../../pages/dashboard';

export interface MainProps {}

const NotFound = (props: RouteComponentProps) => (
  <div>
    Sorry, nothing here. Please, take a look <Link to="/practical">Practical & More</Link> page.
  </div>
);

export function Main({
  children,
  className,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  MainProps) {
  return (
    <div className={cn('main', className)} {...props}>
      <Router style={{ height: '100%' }}>
        <DashboardPage path="/" />
        <Practical path="practical" />
        <NotFound default />
      </Router>
    </div>
  );
}
