import React from 'react';
import cn from 'classnames';
import './index.scss';

export interface ButtonProps {
  fullwidth?: boolean;
}

export type ButtonPropsAll = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  ButtonProps;

export const Button = React.forwardRef<HTMLButtonElement, ButtonPropsAll>(
  ({ children, className, fullwidth, ...props }, ref) => {
    return (
      <button
        {...props}
        ref={ref}
        className={cn('button', className, {
          'button--fullwidth': fullwidth,
        })}>
        {children}
      </button>
    );
  },
);
