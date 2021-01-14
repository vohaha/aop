import React from 'react';
import cn from 'classnames';
import './index.scss';

export interface ButtonProps {
  tag?: string;
  fullwidth?: boolean;
}

export type ButtonPropsAll = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  ButtonProps;

export const Button = React.forwardRef<HTMLElement, ButtonPropsAll>(
  ({ children, className, fullwidth, tag = 'button', ...props }, ref) => {
    const Tag: any = tag;
    return (
      <Tag
        {...props}
        ref={ref}
        className={cn('button', className, {
          'button--fullwidth': fullwidth,
        })}>
        {children}
      </Tag>
    );
  },
);
