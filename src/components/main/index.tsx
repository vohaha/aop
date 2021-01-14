import React from 'react';
import cn from 'classnames';
import { Router } from '@reach/router';
import './index.css';
import { Practical } from '../../pages/practical';
import { DashboardPage } from '../../pages/dashboard';

export interface MainProps {}

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
      <Router>
        <DashboardPage path="/" />
        <Practical path="practical" />
      </Router>
    </div>
  );
}
