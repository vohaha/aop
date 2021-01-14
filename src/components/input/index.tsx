import React from 'react';
import cn from 'classnames';
import { Icon } from '../icons';
import './index.scss';

export interface InputProps {
  icon?: string;
  fullwidth?: boolean;
}

export function Input({
  children,
  className,
  type = 'text',
  icon,
  fullwidth,
  placeholder,
  ...props
}: React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> &
  InputProps) {
  const isIcon = icon != null;
  return (
    <label
      className={cn('input', className, {
        'input--with-icon': isIcon,
        'input--fullwidth': fullwidth,
      })}>
      {isIcon && (
        <Icon className="input__icon" aria-hidden>
          {icon as string}
        </Icon>
      )}
      <input className="input__control" type={type} {...props} />
      <span className="input__placeholder">{placeholder}</span>
    </label>
  );
}
