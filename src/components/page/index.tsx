import React from 'react';
import cn from 'classnames';
import './index.scss';

export interface PageProps {}

export function Page({
  children,
  className,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  PageProps) {
  return (
    <div className={cn('page', className)} {...props}>
      {children}
    </div>
  );
}
