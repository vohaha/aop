import React from 'react';
import cn from 'classnames';
import './index.scss';
import { Icon } from '../icons';
import { Link } from '@reach/router';

export interface MenuItem {
  text: string;
  to: string;
  child?: MenuItem;
}

export interface MenuProps {
  list: MenuItem[];
}

export function Menu({
  children,
  className,
  list,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  MenuProps) {
  return (
    <div className={cn('menu', className)} {...props}>
      <ul className="menu__list">
        {list.map((menuItem) => (
          <li className="menu__item" key={menuItem.text}>
            <Link className="menu__btn" to={menuItem.to}>
              {menuItem.text}
              {menuItem.child != null && (
                <Icon className="menu__child-indicator">chevron-right</Icon>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
