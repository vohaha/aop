import React, { ReactChild } from 'react';
import cn from 'classnames';
import './index.css';

export interface LayoutProps {
  children: {
    aside: ReactChild;
    main: ReactChild;
    header: ReactChild;
  };
}

export function Layout({
  children,
  className,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  LayoutProps) {
  return (
    <div className={cn('layout', className)} {...props}>
      <div className="layout__main">{children.main}</div>
      <div className="layout__header">{children.header}</div>
      <div className="layout__aside">{children.aside}</div>
    </div>
  );
}
