import React, { forwardRef } from 'react';
import cn from 'classnames';
import { Icon } from '../icons';
import './index.scss';

export interface InputProps {
  icon?: string;
  fullwidth?: boolean;
  label?: string;
}

export const Input = forwardRef<HTMLInputElement & InputProps, any>(
  (
    {
      children,
      className,
      type = 'text',
      label,
      icon,
      fullwidth,
      placeholder,
      ...props
    },
    ref,
  ) => {
    const isIcon = icon != null;
    return (
      <label
        className={cn('input', className, {
          'input--with-icon': isIcon,
          'input--fullwidth': fullwidth,
        })}>
        {label && <span className="input__label">{label}</span>}
        <span className="input__inner">
          {isIcon && (
            <Icon className="input__icon" aria-hidden>
              {icon as string}
            </Icon>
          )}
          <input ref={ref} className="input__control" type={type} {...props} />
          <span className="input__placeholder">{placeholder}</span>
        </span>
      </label>
    );
  },
);
