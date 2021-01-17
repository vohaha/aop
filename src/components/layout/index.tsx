import React, { ReactChild } from 'react';
import cn from 'classnames';
import './index.scss';
import { Button, ButtonPropsAll } from '../button';
import { useLayout } from '../../hooks/use-layout';
import { Icon } from '../icons';

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
  const { isAsideOpen } = useLayout();
  return (
    <div
      className={cn('layout', className, { 'layout--aside-open': isAsideOpen })}
      {...props}>
      <div className="layout__main">{children.main}</div>
      <div className="layout__header">{children.header}</div>
      <div className="layout__aside">
        <LayoutToggle className="layout__aside-underlay" />
        {children.aside}
      </div>
    </div>
  );
}

export interface LayoutToggleProps {}

export function LayoutToggle({
  children,
  className,
  ref,
  ...props
}: ButtonPropsAll & LayoutToggleProps) {
  const { asideToggle } = useLayout();
  return (
    <Button
      className={cn('layout__toggle', className)}
      onClick={asideToggle}
      {...props}>
      <Icon className="layout__toggle-icon">chevron-right</Icon>
      {children}
    </Button>
  );
}
